-- Atomic, all-or-nothing stock decrement for every line item in one order.
-- A PL/pgSQL function body executes inside the same transaction as the
-- calling statement; raising an exception partway through rolls back every
-- decrement already applied within this call, so the razorpay verify route
-- never has to manually "undo" earlier successful decrements if a later
-- item is out of stock — Postgres does it by rolling back the whole
-- function invocation (an inner EXCEPTION block below then returns a clean
-- structured result instead of propagating a raw Postgres error).
--
-- `items` is a jsonb array of {"product_id": uuid, "quantity": int}.
-- Returns jsonb: {"ok": true} on success, or
-- {"ok": false, "out_of_stock_product_id": "<uuid>"} if any item didn't
-- have enough stock — in which case no row this call touched is left
-- decremented.
create or replace function public.decrement_stock_for_order(items jsonb)
returns jsonb
language plpgsql
security definer set search_path = public
as $$
declare
  item jsonb;
  v_product_id uuid;
  v_quantity int;
  v_rows_updated int;
  v_failed_detail text;
begin
  for item in select * from jsonb_array_elements(items)
  loop
    v_product_id := (item->>'product_id')::uuid;
    v_quantity := (item->>'quantity')::int;

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

  return jsonb_build_object('ok', true);
exception
  when others then
    if sqlerrm = 'INSUFFICIENT_STOCK' then
      get stacked diagnostics v_failed_detail = pg_exception_detail;
      return jsonb_build_object('ok', false, 'out_of_stock_product_id', v_failed_detail);
    end if;
    raise;
end;
$$;

revoke all on function public.decrement_stock_for_order(jsonb) from public, anon, authenticated;
