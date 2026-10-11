# Admin app setup (`apps/admin/`)

Stage 2 Phase 1 adds an internal admin app for product/inventory and order
management, on top of the Stage 1 Supabase schema. This doc covers: applying
the new migration, promoting a user to admin, and running the admin app
locally.

## 1. Apply the migration

The admin foundation lives in two migration files (after Stage 1's
`20261011090000_init_schema.sql`):

- `supabase/migrations/20261011091500_admin_foundation.sql` — `profiles.role`
  (+ a trigger blocking client self-promotion), `products.status` /
  `stock_quantity` / `low_stock_threshold`, the restricted public-read policy
  on `products`, the `inventory_adjustments` table, and the
  `adjust_product_stock` function.
- `supabase/migrations/20261011093000_order_stock_decrement_batch.sql` — the
  `decrement_stock_for_order` function used by the storefront's Razorpay
  verify route.

With the local stack already running (`npx supabase status` from the repo
root), apply them with:

```sh
npx supabase migration up
```

or, to rebuild the local database from scratch (drops all local data —
re-run `npm run seed` from `apps/storefront/` afterwards):

```sh
npx supabase db reset
```

Both were verified against the local stack while building this feature;
`supabase db reset` applies all three migrations cleanly in order.

## 2. Promote a user to admin

There is no self-serve path — `profiles.role` can only be changed by the
service-role key (see the trigger in `20261011091500_admin_foundation.sql`).
Promote a user after they've signed in at least once (so their `profiles`
row exists) by running this against the local Postgres instance:

```sql
update profiles set role = 'admin' where email = 'you@example.com';
```

Run it via Supabase Studio's SQL editor (`http://127.0.0.1:54323` when
running locally — see `npx supabase status` for the exact URL) against the
`public` schema, or via any Postgres client connected with the
`SUPABASE_SERVICE_ROLE_KEY`/direct DB URL from `npx supabase status`.

## 3. Run the admin app locally

```sh
cd apps/admin
npm install
cp .env.example .env.local   # fill in the same Supabase URL/keys as apps/storefront/.env.local
npm run dev
```

The admin app runs on **port 3001** (`apps/storefront` uses the Next.js
default, 3000), so both can run side by side.

Sign in at `http://localhost:3001/login` with the email you promoted above —
Supabase sends a magic link (same `signInWithOtp` method the storefront
uses). In local dev, magic-link emails land in Mailpit/Inbucket
(`http://127.0.0.1:54324`, per `npx supabase status`) rather than a real
inbox.

Any signed-in user who is not `role = 'admin'` is redirected to
`/not-authorized`; anyone without a session is redirected to `/login`. This
check (`apps/admin/lib/require-admin.ts`) runs server-side on every request
to a route under `app/(admin)/`, not as client-side state.

## Notes

- `apps/admin` duplicates `apps/storefront`'s Supabase client setup
  (`lib/supabase/client.ts` + `lib/supabase/server.ts`) rather than sharing a
  package — intentional, per the approved plan.
- Every admin read/write (products, categories, orders, inventory
  adjustments) goes through the service-role client, which bypasses RLS —
  this is why drafts/archived products are visible to admins even though the
  storefront's public-read policy only exposes `status = 'published'` rows.
- Products seed as `status = 'draft'` with `stock_quantity = 0` by default
  (`apps/storefront/scripts/seed-supabase.mjs` does not set either column, so
  they fall back to their schema defaults) — publish and stock a product via
  the admin app (or SQL) before it will appear on the storefront.
