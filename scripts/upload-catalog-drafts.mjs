#!/usr/bin/env node
/**
 * Uploads the reviewed product queue (docs/catalog-upload-queue.json, built from
 * docs/Oriental-Sports-Master-Catalog.xlsx) into the live Supabase `products`
 * table as HIDDEN DRAFTS: name, brand, price, description, category and SEO
 * text filled in, no photos, stock 0. The storefront only lists
 * `metadata.status = 'published'` rows, and the admin refuses to publish a
 * product with no photo, so nothing here can reach customers by accident.
 *
 * Next steps for each draft: attach photos (scripts/import-product-images.mjs
 * matches files to products by slug), set the real stock, publish in the admin.
 *
 *   node scripts/upload-catalog-drafts.mjs                    # dry run: checks everything, writes nothing
 *   node scripts/upload-catalog-drafts.mjs --apply            # back up the table, then insert the drafts
 *   node scripts/upload-catalog-drafts.mjs --apply --limit=1  # insert only the first row (a canary)
 *   node scripts/upload-catalog-drafts.mjs --rollback         # delete the rows THIS import added, but only
 *                                                             # while they are still untouched drafts
 *
 * SAFETY
 *   - Insert only. Never updates or deletes an existing product.
 *   - A queue row whose slug already exists is skipped, not overwritten.
 *   - Every row inserted is recorded in backups/catalog-draft-import-<batch>.json
 *     (id + slug), which is what --rollback reads. Rollback leaves a row alone
 *     if it has been published or has photos, so nobody's edits are lost.
 *   - The full table is saved to backups/ before the first write.
 *
 * Reads SUPABASE_SERVICE_ROLE_KEY from apps/admin/.env.local (gitignored).
 */
import fs from 'node:fs';

const argv = process.argv.slice(2);
const APPLY = argv.includes('--apply');
const ROLLBACK = argv.includes('--rollback');
const LIMIT = Number((argv.find((a) => a.startsWith('--limit=')) || '').split('=')[1]) || Infinity;
const CHUNK = 20;
const PAUSE_MS = 600; // gap between inserts: every open storefront tab refetches the catalog per change

const SUPA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tvfzfvurqewgvnnhhhad.supabase.co';
const KEY = (fs.readFileSync('apps/admin/.env.local', 'utf8').match(/^SUPABASE_SERVICE_ROLE_KEY=(.+)$/m) || [])[1]?.trim();
if (!KEY) throw new Error('SUPABASE_SERVICE_ROLE_KEY missing in apps/admin/.env.local');
const H = { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getAll(table, select) {
  const rows = [];
  for (let from = 0; ; from += 1000) {
    const res = await fetch(`${SUPA_URL}/rest/v1/${table}?select=${encodeURIComponent(select)}&order=created_at.asc`, {
      headers: { ...H, Range: `${from}-${from + 999}`, 'Range-Unit': 'items' },
    });
    if (!res.ok) throw new Error(`${table}: ${res.status} ${await res.text()}`);
    const chunk = await res.json();
    rows.push(...chunk);
    if (chunk.length < 1000) break;
  }
  return rows;
}

const queue = JSON.parse(fs.readFileSync('docs/catalog-upload-queue.json', 'utf8'));
const manifestPath = `backups/catalog-draft-import-${queue.batch}.json`;

// ---------------------------------------------------------------- rollback
if (ROLLBACK) {
  if (!fs.existsSync(manifestPath)) throw new Error(`No manifest at ${manifestPath}; nothing to roll back.`);
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  console.log(`Rollback of batch ${manifest.batch}: ${manifest.inserted.length} rows were inserted.`);
  let deleted = 0;
  for (let i = 0; i < manifest.inserted.length; i += CHUNK) {
    const ids = manifest.inserted.slice(i, i + CHUNK).map((r) => r.id);
    if (!APPLY) continue;
    // only rows that are still untouched drafts: status draft AND no photos
    const url = `${SUPA_URL}/rest/v1/products?id=in.(${ids.join(',')})&metadata->>status=eq.draft&images=eq.%7B%7D`;
    const res = await fetch(url, { method: 'DELETE', headers: { ...H, Prefer: 'return=representation' } });
    if (!res.ok) throw new Error(`delete failed: ${res.status} ${await res.text()}`);
    deleted += (await res.json()).length;
    await sleep(PAUSE_MS);
  }
  console.log(APPLY ? `Deleted ${deleted} untouched drafts. ${manifest.inserted.length - deleted} were left alone (edited, photographed or published).` : 'Dry run. Add --apply to delete the untouched drafts.');
  process.exit(0);
}

// ---------------------------------------------------------------- checks
const [cats, existing] = await Promise.all([getAll('categories', 'slug'), getAll('products', 'id,slug')]);
const catSlugs = new Set(cats.map((c) => c.slug));
const existingSlugs = new Set(existing.map((p) => p.slug));

const problems = [];
const toInsert = [];
const skipped = [];
const seen = new Set();
for (const r of queue.rows) {
  const why = [];
  if (!r.name?.trim()) why.push('empty name');
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(r.slug || '')) why.push(`bad slug "${r.slug}"`);
  if (!catSlugs.has(r.category_slug)) why.push(`category "${r.category_slug}" does not exist`);
  if (!(Number(r.price) >= 0)) why.push('bad price');
  if (seen.has(r.slug)) why.push('slug repeated inside the queue');
  seen.add(r.slug);
  if (why.length) { problems.push(`#${r.sr} ${r.name}: ${why.join(', ')}`); continue; }
  if (existingSlugs.has(r.slug)) { skipped.push(`#${r.sr} ${r.slug} (already exists)`); continue; }
  toInsert.push({ sr: r.sr, slug: r.slug, name: r.name, category_slug: r.category_slug, brand: r.brand, description: r.description, price: r.price, compare_at_price: r.compare_at_price, images: r.images, in_stock: r.in_stock, metadata: r.metadata });
}
const batch = toInsert.slice(0, LIMIT);

const byCat = {};
batch.forEach((r) => (byCat[r.category_slug] = (byCat[r.category_slug] || 0) + 1));
console.log(`Queue: ${queue.rows.length} rows | live products now: ${existing.length}`);
console.log(`Problems: ${problems.length} | already exist (skipped): ${skipped.length} | to insert: ${batch.length}`);
console.log('By category:', byCat);
problems.forEach((p) => console.log('  PROBLEM', p));
skipped.forEach((p) => console.log('  SKIP', p));
if (problems.length) { console.error('Fix the problems above before applying.'); process.exit(1); }
if (!APPLY) { console.log('\nDry run only. Add --apply to write.'); process.exit(0); }

// ---------------------------------------------------------------- apply
fs.mkdirSync('backups', { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupPath = `backups/supabase-products-${stamp}-before-draft-import.json`;
const full = await (await fetch(`${SUPA_URL}/rest/v1/products?select=*&order=created_at.asc`, { headers: { ...H, Range: '0-4999', 'Range-Unit': 'items' } })).json();
if (!Array.isArray(full) || full.length !== existing.length) throw new Error(`Backup count ${full?.length} != ${existing.length}; aborting before any write.`);
fs.writeFileSync(backupPath, JSON.stringify(full));
console.log(`Backed up ${full.length} products to ${backupPath}`);

const manifest = fs.existsSync(manifestPath)
  ? JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  : { batch: queue.batch, startedAt: new Date().toISOString(), inserted: [] };

for (let i = 0; i < batch.length; i += CHUNK) {
  const chunk = batch.slice(i, i + CHUNK).map(({ sr, ...row }) => row);
  const res = await fetch(`${SUPA_URL}/rest/v1/products`, { method: 'POST', headers: { ...H, Prefer: 'return=representation' }, body: JSON.stringify(chunk) });
  if (!res.ok) throw new Error(`insert failed at chunk ${i / CHUNK}: ${res.status} ${await res.text()} (manifest so far: ${manifestPath})`);
  const got = await res.json();
  if (got.length !== chunk.length) throw new Error(`chunk ${i / CHUNK}: sent ${chunk.length}, got back ${got.length}`);
  got.forEach((g, k) => manifest.inserted.push({ id: g.id, slug: g.slug, sr: batch[i + k].sr }));
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 1));
  console.log(`  inserted ${manifest.inserted.length} so far`);
  if (i + CHUNK < batch.length) await sleep(PAUSE_MS);
}

// ---------------------------------------------------------------- verify
const after = await getAll('products', 'id,slug,metadata');
const mine = after.filter((p) => p.metadata?.import?.batch === queue.batch);
console.log(`\nVerified: ${mine.length} rows carry batch ${queue.batch}; table now has ${after.length} products (was ${existing.length}).`);
console.log(`Manifest: ${manifestPath}`);
console.log(`Undo any time with: node scripts/upload-catalog-drafts.mjs --rollback --apply`);
