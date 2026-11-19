/**
 * Pushes the updated descriptions/specs for weight-bearing Cougar products
 * into Supabase. Touches only `description` and `metadata.storefront`; price,
 * stock and status (which staff may have edited in the admin) are left alone.
 *
 *   node scripts-tmp/sync-weights.mjs          # dry run
 *   node scripts-tmp/sync-weights.mjs --apply
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

const targets = BASE.filter(p => /([\d.]+)\s*KG\b/i.test(p.name));
console.log(`products carrying a weight: ${targets.length}`);

const rows = await (await fetch(`${URL_}/rest/v1/products?select=id,slug,metadata,description`, { headers: H })).json();
const bySlug = new Map(rows.map(r => [r.slug, r]));

const plan = [];
for (const p of targets) {
  const row = bySlug.get(p.slug);
  if (!row) { console.log('  NOT IN DB (skipped):', p.slug); continue; }
  if (row.description === p.description && JSON.stringify(row.metadata?.storefront) === JSON.stringify(p)) continue;
  plan.push({ row, product: p });
}
console.log(`rows needing an update: ${plan.length}`);
if (plan[0]) console.log('example ->', plan[0].product.name, '\n  ', plan[0].product.description);

if (!apply) { console.log('\nDry run. Re-run with --apply to write.'); process.exit(0); }

let done = 0, failed = 0;
for (const { row, product } of plan) {
  const body = JSON.stringify({
    description: product.description,
    metadata: { ...(row.metadata || {}), storefront: product },
    updated_at: new Date().toISOString(),
  });
  const res = await fetch(`${URL_}/rest/v1/products?id=eq.${row.id}`, { method: 'PATCH', headers: H, body });
  if (res.ok) done++; else { failed++; console.log('  FAILED', product.slug, res.status, (await res.text()).slice(0, 120)); }
}
console.log(`updated: ${done}, failed: ${failed}`);

// Verify by reading back.
const after = await (await fetch(`${URL_}/rest/v1/products?select=slug,name,description,metadata`, { headers: H })).json();
let missing = 0;
for (const p of targets) {
  const r = after.find(x => x.slug === p.slug);
  const m = p.name.match(/([\d.]+)\s*KG\b/i);
  let kg = m[1]; if (/^0\d+$/.test(kg)) kg = '0.' + kg.slice(1);
  const ok = r && new RegExp(`${String(Number(kg)).replace('.', '\\.')}\\s*kg`, 'i').test(r.description || '');
  if (!ok) { missing++; console.log('  weight still missing:', p.slug); }
}
console.log(`verified: ${targets.length - missing}/${targets.length} descriptions state the weight`);
