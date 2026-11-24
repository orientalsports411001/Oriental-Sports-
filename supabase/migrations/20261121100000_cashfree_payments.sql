-- Adds Cashfree as a second payment provider alongside Razorpay.
--
-- Design: the order lifecycle (pending -> paid, atomic stock decrement,
-- order_items materialisation) is provider-independent, so it lives in ONE
-- pair of functions parameterised by provider:
--   finalize_paid_order_for_provider(provider, provider_order_id, payment_id)
--   fail_pending_order_for_provider(provider, provider_order_id)
-- The original Razorpay-named functions are kept with their exact
-- signatures as thin wrappers, so the existing Razorpay routes keep working
-- unchanged and share the same concurrency gate (`where status = 'pending'`).

-- ---------------------------------------------------------------------------
-- orders: provider columns
-- ---------------------------------------------------------------------------
alter table public.orders
  add column if not exists payment_provider text not null default 'razorpay'
    check (payment_provider in ('razorpay', 'cashfree')),
  add column if not exists cashfree_order_id text unique,
  add column if not exists cashfree_payment_id text;

-- A Cashfree order has no Razorpay order id, so this can no longer be
-- NOT NULL. "At least one" (not "exactly one") because the admin order-sync
-- route upserts razorpay_order_id = order_number onto existing rows.
alter table public.orders
  alter column razorpay_order_id drop not null;

alter table public.orders
  drop constraint if exists orders_has_provider_order_id;
alter table public.orders
  add constraint orders_has_provider_order_id
  check (razorpay_order_id is not null or cashfree_order_id is not null);

-- ---------------------------------------------------------------------------
-- finalize_paid_order_for_provider
-- ---------------------------------------------------------------------------
create or replace function public.finalize_paid_order_for_provider(
  p_provider text,
  p_provider_order_id text,
  p_payment_id text
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
  if p_provider not in ('razorpay', 'cashfree') then
    raise exception 'Unknown payment provider: %', p_provider;
  end if;

  -- Concurrency gate: only one concurrent caller can flip this specific
  -- row from pending -> paid. The loser's UPDATE matches zero rows.
  update public.orders
    set status = 'paid',
        razorpay_payment_id = case when p_provider = 'razorpay' then p_payment_id else razorpay_payment_id end,
        cashfree_payment_id = case when p_provider = 'cashfree' then p_payment_id else cashfree_payment_id end,
        status_label = case
          when delivery_method = 'camp_pickup' then 'Ready for Camp Store Collection'
          else 'Confirmed · Preparing at MG Road Workshop'
        end,
        timeline = timeline || jsonb_build_array(jsonb_build_object(
          'status', 'confirmed',
          'title', 'Order Confirmed',
          'description', format('Payment of ₹%s verified via %s (%s).', total_amount, initcap(p_provider), p_payment_id),
          'date', now(),
          'completed', true,
          'current', true
        )),
        updated_at = now()
    where status = 'pending'
      and payment_provider = p_provider
      and case p_provider
            when 'razorpay' then razorpay_order_id
            else cashfree_order_id
          end = p_provider_order_id
    returning * into v_order;

  if v_order is null then
    -- Lost the race, or arrived after someone else finalized it (webhook
    -- after verify, retried verify). Report current state idempotently and
    -- do NOT touch stock or order_items again.
    select * into v_order
      from public.orders
      where payment_provider = p_provider
        and case p_provider
              when 'razorpay' then razorpay_order_id
              else cashfree_order_id
            end = p_provider_order_id;

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

  -- Won the race: decrement stock for every snapshot item. All-or-nothing —
  -- raising rolls back the decrements AND the status update above.
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

revoke all on function public.finalize_paid_order_for_provider(text, text, text)
  from public, anon, authenticated;

-- ---------------------------------------------------------------------------
-- fail_pending_order_for_provider
-- ---------------------------------------------------------------------------
create or replace function public.fail_pending_order_for_provider(
  p_provider text,
  p_provider_order_id text
)
returns jsonb
language plpgsql
security definer set search_path = public
as $$
declare
  v_rows_updated int;
begin
  if p_provider not in ('razorpay', 'cashfree') then
    raise exception 'Unknown payment provider: %', p_provider;
  end if;

  update public.orders
    set status = 'failed', updated_at = now()
    where status = 'pending'
      and payment_provider = p_provider
      and case p_provider
            when 'razorpay' then razorpay_order_id
            else cashfree_order_id
          end = p_provider_order_id;

  get diagnostics v_rows_updated = row_count;
  return jsonb_build_object('ok', true, 'updated', v_rows_updated > 0);
end;
$$;

revoke all on function public.fail_pending_order_for_provider(text, text)
  from public, anon, authenticated;

-- ---------------------------------------------------------------------------
-- Razorpay wrappers: same names + signatures as before, now delegating.
-- ---------------------------------------------------------------------------
create or replace function public.finalize_paid_order(
  p_razorpay_order_id text,
  p_razorpay_payment_id text
)
returns jsonb
language sql
security definer set search_path = public
as $$
  select public.finalize_paid_order_for_provider('razorpay', p_razorpay_order_id, p_razorpay_payment_id);
$$;

create or replace function public.fail_pending_order(p_razorpay_order_id text)
returns jsonb
language sql
security definer set search_path = public
as $$
  select public.fail_pending_order_for_provider('razorpay', p_razorpay_order_id);
$$;

revoke all on function public.finalize_paid_order(text, text) from public, anon, authenticated;
revoke all on function public.fail_pending_order(text) from public, anon, authenticated;
