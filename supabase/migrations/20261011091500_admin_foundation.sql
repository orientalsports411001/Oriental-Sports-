-- Oriental Sports Pune — Stage 2 Phase 1: admin foundation
-- Adds: profiles.role (admin gate), products draft/publish workflow + stock
-- tracking, inventory_adjustments ledger, and atomic stock-adjustment /
-- order-time-decrement helper functions.

-- ---------------------------------------------------------------------------
-- profiles.role — customer vs admin
-- ---------------------------------------------------------------------------
alter table public.profiles
  add column if not exists role text not null default 'customer'
    check (role in ('customer', 'admin'));

-- The Stage 1 "Profiles are updatable by owner" policy (`using (auth.uid() =
-- id)`) has no `with check`, so Postgres reuses the USING clause as the check
-- — it would otherwise let a signed-in user PATCH their own `role` to
-- 'admin'. Simplest correct fix: a BEFORE UPDATE trigger that silently resets
-- `role` back to its previous value unless the session is service_role (the
-- seed/admin-promotion path, which always uses the service-role key and so
-- bypasses RLS *and* this trigger's restriction is irrelevant to it anyway —
-- the trigger only needs to stop the anon/authenticated path). This is
-- simpler than carving the single UPDATE policy into column-level grants.
create or replace function public.prevent_self_role_change()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if new.role is distinct from old.role and auth.role() <> 'service_role' then
    new.role := old.role;
  end if;
  return new;
end;
$$;

drop trigger if exists prevent_self_role_change_trigger on public.profiles;
create trigger prevent_self_role_change_trigger
  before update on public.profiles
  for each row execute procedure public.prevent_self_role_change();

-- ---------------------------------------------------------------------------
-- products: draft/publish workflow + stock tracking
-- ---------------------------------------------------------------------------
alter table public.products
  add column if not exists status text not null default 'draft'
    check (status in ('draft', 'published', 'archived'));

alter table public.products
  add column if not exists stock_quantity int not null default 0;

alter table public.products
  add column if not exists low_stock_threshold int not null default 5;

-- Replace the Stage 1 "publicly readable" policy (`using (true)`) so the
-- anon/authenticated public-read path only ever sees published products.
-- The admin app reads via the service-role client, which bypasses RLS
-- entirely, so this does not block admin access to drafts/archived rows.
drop policy if exists "Products are publicly readable" on public.products;
create policy "Published products are publicly readable"
  on public.products for select
  using (status = 'published');

-- ---------------------------------------------------------------------------
-- inventory_adjustments: ledger of every stock change, service-role only
-- ---------------------------------------------------------------------------
create table if not exists public.inventory_adjustments (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products (id) on delete cascade,
  delta int not null,
  reason text,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now()
);

alter table public.inventory_adjustments enable row level security;
-- Intentionally no policies at all: readable/writable only via the
-- service-role key (same pattern as products/categories writes).

create index if not exists inventory_adjustments_product_id_idx
  on public.inventory_adjustments (product_id);

-- ---------------------------------------------------------------------------
-- adjust_product_stock: atomic manual stock adjustment + ledger entry
-- ---------------------------------------------------------------------------
create or replace function public.adjust_product_stock(
  p_product_id uuid,
  p_delta int,
  p_reason text,
  p_created_by uuid
)
returns public.products
language plpgsql
security definer set search_path = public
as $$
declare
  v_product public.products;
begin
  update public.products
    set stock_quantity = stock_quantity + p_delta,
        updated_at = now()
    where id = p_product_id
    returning * into v_product;

  if v_product is null then
    raise exception 'Product % not found', p_product_id;
  end if;

  if v_product.stock_quantity < 0 then
    raise exception 'Adjustment would result in negative stock for product %', p_product_id;
  end if;

  insert into public.inventory_adjustments (product_id, delta, reason, created_by)
  values (p_product_id, p_delta, p_reason, p_created_by);

  return v_product;
end;
$$;

-- No grants to anon/authenticated — only callable via the service-role key
-- in practice (service_role bypasses the grant system entirely as superuser
-- of its own session context through PostgREST's RPC path with the secret
-- key), matching the "service-role only" pattern used elsewhere.
revoke all on function public.adjust_product_stock(uuid, int, text, uuid) from public, anon, authenticated;

-- The atomic order-time stock decrement (used by the Razorpay verify route)
-- is a separate function, `decrement_stock_for_order`, defined in
-- 20261011093000_order_stock_decrement_batch.sql — it decrements every line
-- item of an order in one all-or-nothing transaction, which a single-item
-- function here couldn't do on its own.
