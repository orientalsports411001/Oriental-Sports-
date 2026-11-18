/**
 * Confirms admin and storefront see the same catalog. Both read the Supabase
 * `products` table, so this compares what the storefront can read (anon key)
 * with what the admin reads (service-role key) and checks for duplicates.
 *   node scripts/verify-catalog-parity.mjs
 */
import fs from 'node:fs';
const URL_ = 'https://tvfzfvurqewgvnnhhhad.supabase.co';
const ANON = 'sb_publishable_WAr2l8gZ0bvYJSY0x1murQ_OGSoDB50';
const KEY = (fs.readFileSync('apps/admin/.env.local', 'utf8').match(/^SUPABASE_SERVICE_ROLE_KEY=(.+)$/m) || [])[1]?.trim();
const get = async (k) => (await fetch(`${URL_}/rest/v1/products?select=id,slug,metadata,in_stock`, { headers: { apikey: k, Authorization: `Bearer ${k}` } })).json();
const [anon, admin] = [await get(ANON), await get(KEY)];
const published = (rows) => rows.filter((r) => (r.metadata?.status ?? 'published') === 'published');
const slugs = admin.map((r) => r.slug);
const checks = [
  ['storefront rows == admin rows', anon.length === admin.length, `${anon.length} vs ${admin.length}`],
  ['no duplicate slugs', new Set(slugs).size === slugs.length, `${slugs.length - new Set(slugs).size} duplicates`],
  ['published count matches', published(anon).length === published(admin).length, `${published(anon).length} vs ${published(admin).length}`],
];
let ok = true;
for (const [name, pass, detail] of checks) { console.log(pass ? 'PASS' : 'FAIL', name, '-', detail); ok &&= pass; }
console.log(`catalog: ${admin.length} products (${published(admin).length} published)`);
process.exit(ok ? 0 : 1);
