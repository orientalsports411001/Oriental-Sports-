-- Fixes the concurrent duplicate-verification race left open after Stage 2
-- Phase 1: two simultaneous requests verifying the same razorpay_order_id
-- could both pass an application-level "does this order exist yet?" check
-- before either had written a row, double-decrementing stock.
--
-- Redesign: the order row is created with status='pending' at
-- create-order time (server-computed prices/items snapshotted then, not
-- trusted from the client again at verify time), and verify/webhook both
-- call ONE Postgres function, finalize_paid_order, which does the
-- pending -> paid transition with `where status = 'pending'` as the
-- concurrency gate. Postgres only lets one of two simultaneous UPDATEs
-- matching that WHERE clause succeed (row-level lock); the other sees
-- rowcount = 0 and takes the idempotent "already finalized" path without
-- touching stock. Both verify and the webhook call the same function, so
-- whichever arrives first wins and the second is a no-op confirmation —
-- there is no longer a separate client-side existence check to race.

-- ---------------------------------------------------------------------------
-- orders: snapshot of server-computed items, captured at create-order time
-- ---------------------------------------------------------------------------
alter table public.orders
  add column if not exists items_snapshot jsonb not null default '[]'::jsonb;

-- razorpay_order_id must be set from the moment the row is created (it's the
-- concurrency/idempotency key), not nullable-then-filled-in later.
alter table public.orders
  alter column razorpay_order_id set not null;

-- ---------------------------------------------------------------------------
-- finalize_paid_order: the ONLY place a pending order becomes paid + stock is
-- decremented + order_items are materialized. Called by both the verify
-- route (after signature check) and the webhook (after signature check) —
-- whichever call wins the `where status = 'pending'` race does the work;
-- the other gets back the already-finalized order untouched.
-- ---------------------------------------------------------------------------
create or replace function public.finalize_paid_order(
  p_razorpay_order_id text,
  p_razorpay_payment_id text
)
returns jsonb
language plpgsql
security definer set search_path = public
as $$
declare
  v_order public.orders;
  v_item jsonb;
  v_product_id uuid;
  v_quantity int;
  v_rows_updated int;
  v_failed_detail text;
begin
  -- Concurrency gate: only one concurrent caller can flip this specific
  -- row from pending -> paid. The loser's UPDATE matches zero rows.
  update public.orders
    set status = 'paid',
        razorpay_payment_id = p_razorpay_payment_id,
        status_label = case
          when delivery_method = 'camp_pickup' then 'Ready for Camp Store Collection'
          else 'Confirmed · Preparing at MG Road Workshop'
        end,
        timeline = timeline || jsonb_build_array(jsonb_build_object(
          'status', 'confirmed',
          'title', 'Order Confirmed',
          'description', format('Payment of ₹%s verified via Razorpay (%s).', total_amount, p_razorpay_payment_id),
          'date', now(),
          'completed', true,
          'current', true
        )),
        updated_at = now()
    where razorpay_order_id = p_razorpay_order_id
      and status = 'pending'
    returning * into v_order;

  if v_order is null then
    -- We didn't win the race (or this call arrived after someone else
    -- already finalized it, e.g. webhook after verify, or a retried
    -- verify call). Look the order up as-is and report its current state
    -- idempotently — we must NOT touch stock or order_items again.
    select * into v_order from public.orders where razorpay_order_id = p_razorpay_order_id;

    if v_order is null then
      return jsonb_build_object('ok', false, 'error', 'order_not_found');
    end if;

    return jsonb_build_object(
      'ok', true,
      'already_finalized', true,
      'order_id', v_order.id,
      'order_number', v_order.order_number,
      'status', v_order.status
    );
  end if;

  -- We won the race: decrement stock for every item in the snapshot taken
  -- at create-order time. All-or-nothing — raising here rolls back BOTH
  -- any decrements already applied in this loop AND the status update
  -- above, since it's all one function invocation/transaction. The order
  -- is left exactly as it was (status = 'pending'), so it can be retried.
  for v_item in select * from jsonb_array_elements(v_order.items_snapshot)
  loop
    v_product_id := (v_item->>'productId')::uuid;
    v_quantity := (v_item->>'quantity')::int;

    update public.products
      set stock_quantity = stock_quantity - v_quantity,
          updated_at = now()
      where id = v_product_id
        and stock_quantity >= v_quantity;

    get diagnostics v_rows_updated = row_count;

    if v_rows_updated = 0 then
      raise exception 'INSUFFICIENT_STOCK' using detail = v_product_id::text;
    end if;
  end loop;

  insert into public.order_items (
    order_id, user_id, product_id, product_slug, product_name,
    product_image, price, quantity, selected_variant, selected_size
  )
  select
    v_order.id,
    v_order.user_id,
    (item->>'productId')::uuid,
    item->>'productSlug',
    item->>'productName',
    item->>'productImage',
    (item->>'price')::numeric,
    (item->>'quantity')::int,
    item->>'selectedVariant',
    item->>'selectedSize'
  from jsonb_array_elements(v_order.items_snapshot) as item;

  return jsonb_build_object(
    'ok', true,
    'already_finalized', false,
    'order_id', v_order.id,
    'order_number', v_order.order_number,
    'status', 'paid'
  );
exception
  when others then
    if sqlerrm = 'INSUFFICIENT_STOCK' then
      get stacked diagnostics v_failed_detail = pg_exception_detail;
      return jsonb_build_object(
        'ok', false,
        'error', 'out_of_stock',
        'out_of_stock_product_id', v_failed_detail
      );
    end if;
    raise;
end;
$$;

revoke all on function public.finalize_paid_order(text, text) from public, anon, authenticated;

-- mark a pending order as failed (used by the webhook's payment.failed
-- handler and by the create-order route's cleanup path). Also gated on
-- status = 'pending' so a payment that later actually succeeds can't be
-- clobbered by a stale/out-of-order failure event.
create or replace function public.fail_pending_order(p_razorpay_order_id text)
returns jsonb
language plpgsql
security definer set search_path = public
as $$
declare
  v_rows_updated int;
begin
  update public.orders
    set status = 'failed', updated_at = now()
    where razorpay_order_id = p_razorpay_order_id
      and status = 'pending';

  get diagnostics v_rows_updated = row_count;
  return jsonb_build_object('ok', true, 'updated', v_rows_updated > 0);
end;
$$;

revoke all on function public.fail_pending_order(text) from public, anon, authenticated;

-- decrement_stock_for_order (from the previous migration) is now superseded
-- by finalize_paid_order for the payment-verification path, but it's left
-- in place rather than dropped since it's a generally-useful atomic
-- primitive and dropping it is not required to fix the race.
