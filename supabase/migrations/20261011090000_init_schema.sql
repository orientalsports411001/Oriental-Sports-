-- Oriental Sports Pune — initial schema
-- Tables: profiles, categories, products, orders, order_items
-- Run with: supabase db push  (or supabase migration up, once `supabase start` is running)

-- ---------------------------------------------------------------------------
-- profiles: 1:1 with auth.users
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  first_name text,
  last_name text,
  full_name text,
  email text,
  phone text,
  sport_preferences text[] default '{}',
  membership_tier text default 'Club Athlete' check (membership_tier in ('Club Athlete', 'Pro Member', 'Elite Partner')),
  addresses jsonb default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by owner"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Profiles are updatable by owner"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Profiles are insertable by owner"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create a profile row when a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------------------------
-- categories: public read, service-role write only
-- ---------------------------------------------------------------------------
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  image text,
  sort_order int default 0,
  -- tagline / itemCount / featuredEquipments — fields with no dedicated column.
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.categories enable row level security;

create policy "Categories are publicly readable"
  on public.categories for select
  using (true);

-- Intentionally no insert/update/delete policy: writes only via service_role key
-- (service_role bypasses RLS entirely), so no public write path exists.

-- ---------------------------------------------------------------------------
-- products: public read, service-role write only
-- ---------------------------------------------------------------------------
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category_slug text references public.categories (slug) on update cascade,
  brand text,
  description text,
  price numeric(10, 2) not null,
  compare_at_price numeric(10, 2),
  images text[] default '{}',
  variants jsonb default '[]'::jsonb,
  sizes jsonb default '[]'::jsonb,
  in_stock boolean not null default true,
  rating numeric(2, 1),
  review_count int default 0,
  tags text[] default '{}',
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products enable row level security;

create policy "Products are publicly readable"
  on public.products for select
  using (true);

-- No public write policy — products/categories are only writable with the
-- service_role key (e.g. the seed script), since there is no admin UI yet.

-- ---------------------------------------------------------------------------
-- orders: user can select/insert own rows only; no client update/delete
-- ---------------------------------------------------------------------------
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  order_number text not null unique,
  razorpay_order_id text unique,
  razorpay_payment_id text,
  status text not null default 'pending' check (
    status in ('pending', 'paid', 'failed', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled')
  ),
  status_label text,
  subtotal numeric(10, 2) not null default 0,
  shipping numeric(10, 2) not null default 0,
  tax numeric(10, 2) not null default 0,
  total_amount numeric(10, 2) not null default 0,
  currency text not null default 'INR',
  payment_method text,
  delivery_method text default 'doorstep' check (delivery_method in ('doorstep', 'camp_pickup')),
  shipping_address jsonb,
  tracking_number text,
  carrier text,
  estimated_delivery text,
  timeline jsonb default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.orders enable row level security;

create policy "Users can view own orders"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "Users can insert own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

-- No update/delete policy for the client: status transitions (paid, shipped,
-- etc.) happen server-side only, via the service-role client in the
-- razorpay verify/webhook route handlers.

-- ---------------------------------------------------------------------------
-- order_items: user can select/insert own rows only (via parent order)
-- ---------------------------------------------------------------------------
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  user_id uuid references auth.users (id) on delete set null,
  product_id uuid references public.products (id) on delete set null,
  product_slug text,
  product_name text not null,
  product_image text,
  price numeric(10, 2) not null,
  quantity int not null default 1,
  selected_variant text,
  selected_size text,
  created_at timestamptz not null default now()
);

alter table public.order_items enable row level security;

create policy "Users can view own order items"
  on public.order_items for select
  using (auth.uid() = user_id);

create policy "Users can insert own order items"
  on public.order_items for insert
  with check (auth.uid() = user_id);

-- No update/delete policy for the client, same rationale as orders.

create index if not exists order_items_order_id_idx on public.order_items (order_id);
create index if not exists orders_user_id_idx on public.orders (user_id);
create index if not exists products_category_slug_idx on public.products (category_slug);
