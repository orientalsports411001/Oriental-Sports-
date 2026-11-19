/**
 * Pushes the updated name/description/specs for weight-bearing Cougar
 * products into Supabase. Touches `name`, `description` and
 * `metadata.storefront`; price, stock and status (which staff may have
 * edited in the admin) are left alone. Skips any row whose current `name`
 * no longer matches what seeding first wrote (i.e. staff already renamed it)
 * so a later run of this script can't silently undo a manual edit.
 *
 *   node scripts/sync-product-weights.mjs          # dry run
 *   node scripts/sync-product-weights.mjs --apply
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const esbuild = require('esbuild');
const apply = process.argv.includes('--apply');
const URL_ = 'https://tvfzfvurqewgvnnhhhad.supabase.co';
const KEY = (fs.readFileSync('apps/admin/.env.local', 'utf8').match(/^SUPABASE_SERVICE_ROLE_KEY=(.+)$/m) || [])[1]?.trim();
if (!KEY) throw new Error('SUPABASE_SERVICE_ROLE_KEY missing');
const H = { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' };

const out = path.join(os.tmpdir(), 'os-weights-products.cjs');
esbuild.buildSync({
  entryPoints: ['src/data/products.ts'], bundle: true, platform: 'node', format: 'cjs', outfile: out,
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(URL_),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': '"sync"',
    'import.meta.env': '{}',
  },
  loader: { '.json': 'json', '.webp': 'dataurl', '.png': 'dataurl', '.jpg': 'dataurl', '.jpeg': 'dataurl', '.svg': 'dataurl', '.mp4': 'dataurl' },
  logLevel: 'error',
});
const BASE = require(out).PRODUCTS;

// Weight-bearing products are identified by slug (the OLD all-caps/no-space
// names no longer contain "KG" as a word once renamed, so slug is the only
// stable key across the rename).
const WEIGHT_SLUGS = new Set(BASE.filter(p => /\b\d+(\.\d+)?\s*kg\b/i.test(p.name)).map(p => p.slug));
const targets = BASE.filter(p => WEIGHT_SLUGS.has(p.slug));
console.log(`products carrying a weight: ${targets.length}`);

const rows = await (await fetch(`${URL_}/rest/v1/products?select=id,slug,name,metadata,description`, { headers: H })).json();
const bySlug = new Map(rows.map(r => [r.slug, r]));

const OLD_NAME_PATTERN = /^[A-Z0-9 .\-"]+$/; // the shouty seeded names, before any admin edit

const plan = [];
let skippedEdited = 0;
for (const p of targets) {
  const row = bySlug.get(p.slug);
  if (!row) { console.log('  NOT IN DB (skipped):', p.slug); continue; }
  const alreadyRenamed = row.name === p.name && row.description === p.description;
  if (alreadyRenamed) continue;
  const looksHandEdited = row.metadata?.storefront && !OLD_NAME_PATTERN.test(row.name) && row.name !== p.name;
  if (looksHandEdited) { skippedEdited++; console.log('  SKIPPED (name looks hand-edited already):', row.name); continue; }
  plan.push({ row, product: p });
}
console.log(`rows needing an update: ${plan.length}; skipped as already hand-edited: ${skippedEdited}`);
if (plan[0]) console.log('example ->', JSON.stringify(plan[0].row.name), '->', JSON.stringify(plan[0].product.name));

if (!apply) { console.log('\nDry run. Re-run with --apply to write.'); process.exit(0); }

let done = 0, failed = 0;
for (const { row, product } of plan) {
  const body = JSON.stringify({
    name: product.name,
    description: product.description,
    metadata: { ...(row.metadata || {}), storefront: product },
    updated_at: new Date().toISOString(),
  });
  const res = await fetch(`${URL_}/rest/v1/products?id=eq.${row.id}`, { method: 'PATCH', headers: H, body });
  if (res.ok) done++; else { failed++; console.log('  FAILED', product.slug, res.status, (await res.text()).slice(0, 120)); }
}
console.log(`updated: ${done}, failed: ${failed}`);

const after = await (await fetch(`${URL_}/rest/v1/products?select=slug,name,description`, { headers: H })).json();
let mismatched = 0;
for (const p of targets) {
  const r = after.find(x => x.slug === p.slug);
  if (!r || r.name !== p.name) { mismatched++; console.log('  name still wrong:', p.slug, '->', r?.name); }
}
console.log(`verified: ${targets.length - mismatched}/${targets.length} names match`);
