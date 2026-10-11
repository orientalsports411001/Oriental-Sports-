# Migration: Vite SPA (`src/`) -> Next.js App Router (`apps/storefront/`)

This documents the move from the original Vite + React Router single-page
app at the repo root (`src/`) to the Next.js 14 App Router app at
`apps/storefront/`, with Supabase as the backing store and Razorpay for
payments (replacing the Shopify Storefront API scaffolding that briefly
existed in `src/`).

## Why

- Server-rendered product/category pages (better SEO, no client-side
  waterfall fetch for the catalog).
- A real database (Supabase/Postgres) instead of static TS arrays bundled
  into the client.
- Razorpay direct integration (order creation, signature verification,
  webhook) instead of Shopify checkout handoff — the business doesn't run
  on Shopify; Razorpay against Supabase-backed orders is the correct model.

## What moved

| Old (`src/`) | New (`apps/storefront/`) |
|---|---|
| `src/pages/*.tsx` | `components/pages/*.tsx` (same components, now consumed by `app/**/page.tsx` route files) |
| `src/components/**` | `components/**` (ported 1:1) |
| `src/context/**` | `context/**` (ported 1:1; Shopify fields removed) |
| `react-router-dom` (`Link`, `useNavigate`, `useParams`, `useSearchParams`, ...) | `lib/router-shim.tsx` — a same-shaped shim over `next/navigation` + `next/link`, so ported components didn't need their call sites rewritten |
| `src/App.tsx` route table | `app/**/page.tsx` files (one per route — see table below) + `app/app-shell.tsx` (header/footer/cart-drawer/bottom-nav chrome, mirrors the old `AppContent` shell) |
| `src/data/products.ts`, `src/data/gymProducts.ts`, `src/data/categories.ts` | Kept at `apps/storefront/data/*.ts`, but **only** as the input to `scripts/seed-supabase.mjs`. No page or component in the render path imports them for data — products/categories are read from Supabase via `lib/supabase/queries.ts` (server-only). |
| `src/services/shopify.ts`, `src/types/shopify.ts` | Deleted (from both `src/` and never ported to `apps/storefront/`). `src/context/CartContext.tsx` had its Shopify cart sync removed; local-storage cart + Razorpay checkout is now the only path, matching `apps/storefront`. |
| N/A | `supabase/migrations/20261011090000_init_schema.sql` — `profiles`, `categories`, `products`, `orders`, `order_items`, with RLS policies (public read on catalog tables, owner-only on orders/profile) |
| N/A | `lib/supabase/client.ts` (browser), `lib/supabase/server.ts` (server components / route handlers, cookie-based session + a service-role client for privileged writes) |
| N/A | `lib/razorpay-server.ts`, `lib/razorpay-client.ts`, `app/api/razorpay/{create-order,verify,webhook}/route.ts` |

## Route table (`src/App.tsx` -> `app/**/page.tsx`)

```
/                           -> app/page.tsx
/shop                       -> app/shop/page.tsx
/shop/:category             -> app/shop/[category]/page.tsx
/products                   -> app/products/page.tsx
/products/:category         -> app/products/[category]/page.tsx
/product/:slug              -> app/product/[slug]/page.tsx
/courts                     -> app/courts/page.tsx
/courts/projects            -> app/courts/projects/page.tsx
/courts/:slug                -> app/courts/[slug]/page.tsx
/about                       -> app/about/page.tsx
/visit                       -> app/visit/page.tsx
/contact                     -> app/contact/page.tsx
/search                      -> app/search/page.tsx
/cart                        -> app/cart/page.tsx
/checkout                    -> app/checkout/page.tsx
/order-success                -> app/order-success/page.tsx
/account                     -> app/account/page.tsx                    (tab="overview")
/account/login                -> app/account/login/page.tsx              (tab="login")
/account/signup               -> app/account/signup/page.tsx             (tab="signup")
/account/verify                -> app/account/verify/page.tsx             (tab="verify")
/account/orders                -> app/account/orders/page.tsx             (tab="orders")
/account/orders/:orderId       -> app/account/orders/[orderId]/page.tsx   (tab="orders")
/account/profile               -> app/account/profile/page.tsx            (tab="profile")
/account/addresses             -> app/account/addresses/page.tsx          (tab="addresses")
/account/wishlist              -> app/account/wishlist/page.tsx           (tab="wishlist")
/wishlist                      -> app/wishlist/page.tsx                   (tab="wishlist")
/shipping                      -> app/shipping/page.tsx
/returns                       -> app/returns/page.tsx
/privacy                       -> app/privacy/page.tsx
/terms                         -> app/terms/page.tsx
/404, *                        -> app/not-found.tsx (+ app/404/page.tsx for the explicit path)
```

## Catalog: Supabase, not static arrays

`lib/supabase/queries.ts` exposes `getCategories`, `getCategoryBySlug`,
`getProducts({ categorySlug })`, `getProductBySlug`,
`getProductsBySubcategorySlug` and `getFeaturedProductsExcludingCategory`.
Each maps a Postgres row back onto the existing `Product` / `CategoryInfo`
TypeScript shapes (extra fields — specs, features, badge, isFeatured, etc.
— live in a `metadata jsonb` column) so the ported page components didn't
need their internal logic rewritten, only their data source.

`ShopPage`, `CategoryPage`, `ProductDetailPage` and `SearchPage` now take
`products`/`categories` as props instead of importing the static arrays
directly. The corresponding `app/**/page.tsx` files are `async` Server
Components that call `lib/supabase/queries.ts` and pass the results down.
Because `lib/supabase/server.ts` reads the request's cookies, these routes
are implicitly dynamic (no build-time DB calls, so `next build` succeeds
even with no database reachable) and marked `export const dynamic =
'force-dynamic'` explicitly.

If a query fails (e.g. Supabase isn't running yet), the helpers fail soft
and return `[]`/`null` rather than throwing, so pages render their existing
"nothing found" empty states instead of 500ing.

**Not migrated to Supabase (left on static data), and why:** `GearEdit`
(homepage curated picks), `SearchModal` (header autocomplete), `AccountPage`
(wishlist product lookup) and `OrderTracker` (order-line product lookup)
still import `data/products.ts` directly. These are secondary/supporting
surfaces rather than the primary catalog/listing/detail pages the migration
targeted; moving them to Supabase is a follow-up, not a blocker.

## Seeding

`scripts/seed-supabase.mjs` (run via `npm run seed`, which shells out to
`tsx` so the script can import the `.ts` data files directly) upserts
`data/categories.ts` and `data/products.ts` (which itself pulls in
`data/gymProducts.ts`) into the `categories` and `products` tables, keyed
on `slug`. Safe to re-run after editing the static source files.

## Manual steps still required

1. Start Docker Desktop, then `supabase start` from the repo root (not run
   in this environment — Docker was down).
2. `supabase db push` (or let `supabase start` apply
   `supabase/migrations/20261011090000_init_schema.sql` automatically).
3. Copy `apps/storefront/.env.example` to `apps/storefront/.env.local` and
   fill in the Supabase URL/anon key/service-role key (printed by
   `supabase start`, or from the hosted project's dashboard) and the
   Razorpay keys.
4. `cd apps/storefront && npm install && npm run seed` to populate the
   catalog.
5. `npm run dev` to run the new app locally.

## Stage 2 Phase 1: admin app

See `docs/ADMIN_SETUP.md` for the admin-foundation migration
(`profiles.role`, product draft/publish + stock tracking,
`inventory_adjustments`), promoting a user to admin, and running
`apps/admin/` locally.
