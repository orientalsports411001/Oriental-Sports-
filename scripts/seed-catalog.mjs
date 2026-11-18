/**
 * One-time (idempotent) seed: copies the built-in 131-product catalog into the
 * Supabase `products` table so Supabase is the single source of truth.
 *
 *   node scripts/seed-catalog.mjs            # dry run: prints what it would do
 *   node scripts/seed-catalog.mjs --apply    # writes (upsert on slug)
 *
 * Reads SUPABASE_SERVICE_ROLE_KEY from apps/admin/.env.local. Each row keeps
 * the product's full original record in metadata.storefront, so the storefront
 * renders it exactly as before. Existing rows with the same slug are updated
 * only if they have no metadata.storefront yet (never overwrites admin edits).
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const esbuild = require('esbuild');
const apply = process.argv.includes('--apply');
const SUPA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tvfzfvurqewgvnnhhhad.supabase.co';

const envFile = fs.readFileSync('apps/admin/.env.local', 'utf8');
const KEY = (envFile.match(/^SUPABASE_SERVICE_ROLE_KEY=(.+)$/m) || [])[1]?.trim();
if (!KEY) throw new Error('SUPABASE_SERVICE_ROLE_KEY missing in apps/admin/.env.local');
const headers = { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' };

// 1. Load the static catalog exactly as the storefront ships it.
const out = path.join(os.tmpdir(), 'os-seed-products.cjs');
esbuild.buildSync({
  entryPoints: ['src/data/products.ts'], bundle: true, platform: 'node', format: 'cjs', outfile: out,
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(SUPA_URL),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': '"seed"',
    'import.meta.env': '{}',
  },
  loader: { '.json': 'json', '.webp': 'dataurl', '.png': 'dataurl', '.jpg': 'dataurl', '.svg': 'dataurl', '.mp4': 'dataurl' },
  logLevel: 'error',
});
const BASE = require(out).PRODUCTS;
const adminBySlug = new Map(JSON.parse(fs.readFileSync('apps/admin/lib/all-products.json', 'utf8')).map((p) => [p.slug, p]));

const rows = BASE.map((p) => {
  const a = adminBySlug.get(p.slug);
  const status = a?.status || 'published';
  const stock = Number(a?.stock_quantity ?? 10);
  return {
    slug: p.slug,
    name: p.name,
    category_slug: p.category,
    brand: p.brand || 'Oriental Sports',
    description: p.description || '',
    price: p.price,
    compare_at_price: p.originalPrice ?? null,
    images: p.images || [],
    variants: p.variants || [],
    sizes: p.sizes || null,
    in_stock: status === 'published' && stock > 0 && p.inStock !== false,
    rating: p.rating ?? null,
    review_count: p.reviewsCount ?? 0,
    tags: [],
    metadata: {
      status,
      stock_quantity: stock,
      low_stock_threshold: Number(a?.low_stock_threshold ?? 5),
      seo_title: p.seoTitle || a?.seo_title || null,
      seo_description: p.seoDescription || a?.seo_description || null,
      legacy_id: p.id,
      storefront: p,
    },
  };
});

const missing = BASE.filter((p) => !adminBySlug.has(p.slug)).map((p) => p.slug);
console.log(`built-in products: ${BASE.length}; matched admin records: ${BASE.length - missing.length}`);
if (missing.length) console.log('  no admin record (defaults used):', missing.join(', '));
console.log(`categories used: ${[...new Set(rows.map((r) => r.category_slug))].join(', ')}`);

// 2. Check categories FK and existing rows.
const cats = await (await fetch(`${SUPA_URL}/rest/v1/categories?select=slug`, { headers })).json();
const catSet = new Set(cats.map((c) => c.slug));
const badCats = [...new Set(rows.map((r) => r.category_slug))].filter((c) => !catSet.has(c));
if (badCats.length) console.log('WARNING categories missing in DB (category_slug will be null):', badCats.join(', '));
for (const r of rows) if (!catSet.has(r.category_slug)) r.category_slug = null;

const existing = await (await fetch(`${SUPA_URL}/rest/v1/products?select=id,slug,metadata`, { headers })).json();
const existingBySlug = new Map(existing.map((e) => [e.slug, e]));
const toWrite = rows.filter((r) => {
  const e = existingBySlug.get(r.slug);
  return !e || !e.metadata?.storefront; // never clobber an already-seeded (possibly admin-edited) row
});
console.log(`existing rows: ${existing.length}; to insert/update: ${toWrite.length}; already seeded (skipped): ${rows.length - toWrite.length}`);

if (!apply) { console.log('\nDry run only. Re-run with --apply to write.'); process.exit(0); }

for (let i = 0; i < toWrite.length; i += 25) {
  const chunk = toWrite.slice(i, i + 25);
  const res = await fetch(`${SUPA_URL}/rest/v1/products?on_conflict=slug`, {
    method: 'POST',
    headers: { ...headers, Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify(chunk),
  });
  if (!res.ok) throw new Error(`batch ${i} failed: ${res.status} ${await res.text()}`);
  console.log(`wrote ${i + chunk.length}/${toWrite.length}`);
}
const after = await (await fetch(`${SUPA_URL}/rest/v1/products?select=slug,metadata`, { headers })).json();
console.log(`DONE. rows in Supabase: ${after.length}; seeded: ${after.filter((r) => r.metadata?.storefront).length}`);
