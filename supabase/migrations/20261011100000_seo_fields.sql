-- Phase 2 shared contract: SEO fields on products, created up front so the
-- AI SEO (admin editor) and Technical SEO (storefront metadata/structured
-- data) workstreams can both build against a fixed schema without either
-- one owning/blocking the other via a migration file.

alter table public.products
  add column if not exists seo_title text;
alter table public.products
  add column if not exists seo_description text;
alter table public.products
  add column if not exists seo_keywords text[] default '{}';
alter table public.products
  add column if not exists og_title text;
alter table public.products
  add column if not exists og_description text;
-- Keyed by image URL (the string already in products.images) -> alt text.
alter table public.products
  add column if not exists image_alt_text jsonb default '{}'::jsonb;

alter table public.categories
  add column if not exists seo_title text;
alter table public.categories
  add column if not exists seo_description text;

-- Slug-change history: when an admin changes a product's slug, the storefront
-- product page should 301-redirect old links instead of 404ing. Populated by
-- a trigger so it can't be bypassed by a direct update that skips app code.
create table if not exists public.product_slug_history (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  old_slug text not null,
  created_at timestamptz not null default now()
);

alter table public.product_slug_history enable row level security;
create policy "Slug history is publicly readable"
  on public.product_slug_history for select
  using (true);
-- No public write policy — service-role (the trigger, security definer) only.

create index if not exists product_slug_history_old_slug_idx
  on public.product_slug_history (old_slug);

create or replace function public.log_product_slug_change()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if old.slug is distinct from new.slug then
    insert into public.product_slug_history (product_id, old_slug)
    values (old.id, old.slug);
  end if;
  return new;
end;
$$;

drop trigger if exists log_product_slug_change_trigger on public.products;
create trigger log_product_slug_change_trigger
  before update on public.products
  for each row execute procedure public.log_product_slug_change();
