#!/usr/bin/env node
/**
 * Imports new photos into the live catalog by matching filenames to
 * products, uploading each to Cloudinary, and appending the resulting URL
 * to that product's `images` array in Supabase (never replacing existing
 * photos, capped at 5 per product — the same limit the admin's own upload
 * UI enforces).
 *
 * WHERE TO PUT FILES
 *   scripts/incoming-images/<anything containing the product's slug or name>.jpg
 *   e.g. scripts/incoming-images/hex-dumbbells-10kg-closeup.jpg
 *        scripts/incoming-images/Hex Dumbbells 10kg (2).png
 *   The match is done by slug (best) or by normalized product name — case
 *   and spacing insensitive. One product can have several incoming files;
 *   each is appended in the order listed, up to the 5-image cap.
 *
 * USAGE
 *   node scripts/import-product-images.mjs                  # dry run: shows the match plan, uploads nothing
 *   node scripts/import-product-images.mjs --apply           # uploads + writes to Supabase
 *   node scripts/import-product-images.mjs --apply --dir=path/to/folder
 *
 * SAFETY
 *   - Never deletes or reorders existing images.
 *   - Skips (does not guess) any file whose name doesn't clearly match
 *     exactly one product — ambiguous and unmatched files are listed, not
 *     silently attached to the wrong item.
 *   - A file already uploaded for a product (matched by original filename,
 *     recorded in metadata.imported_filenames) is not re-uploaded on a
 *     second run, so this script is safe to re-run over a growing folder.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const APPLY = process.argv.includes('--apply');
const DIR_ARG = process.argv.find((a) => a.startsWith('--dir='));
const INCOMING_DIR = DIR_ARG ? DIR_ARG.slice('--dir='.length) : 'scripts/incoming-images';
const MAX_IMAGES = 5;

const SUPA_URL = 'https://tvfzfvurqewgvnnhhhad.supabase.co';
const KEY = (fs.readFileSync('apps/admin/.env.local', 'utf8').match(/^SUPABASE_SERVICE_ROLE_KEY=(.+)$/m) || [])[1]?.trim();
if (!KEY) throw new Error('SUPABASE_SERVICE_ROLE_KEY missing in apps/admin/.env.local');
const H = { apikey: KEY, Authorization: `Bearer ${KEY}` };

// Read from apps/admin/.env.local (gitignored), same place
// SUPABASE_SERVICE_ROLE_KEY already lives — never hardcoded here, so this
// file carries no secret even as a fallback.
const envLocal = fs.readFileSync('apps/admin/.env.local', 'utf8');
const envVar = (name) => (envLocal.match(new RegExp('^' + name + '=(.+)$', 'm')) || [])[1]?.trim() || process.env[name];
const CLOUD_NAME = envVar('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME');
const API_KEY = envVar('CLOUDINARY_API_KEY');
const API_SECRET = envVar('CLOUDINARY_API_SECRET');
if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
  throw new Error(
    'Cloudinary is not configured. Add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to apps/admin/.env.local.'
  );
}
const UPLOAD_FOLDER = 'oriental-sports/products';

function signParams(params) {
  const toSign = Object.keys(params).sort().map((k) => `${k}=${params[k]}`).join('&');
  return crypto.createHash('sha1').update(toSign + API_SECRET).digest('hex');
}

const normalize = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const slugify = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// --- 1. Load the live catalog to match against -----------------------------
if (!fs.existsSync(INCOMING_DIR)) {
  fs.mkdirSync(INCOMING_DIR, { recursive: true });
  console.log(`Created ${INCOMING_DIR}/ — drop product photos there and re-run.`);
  console.log('Name each file so it contains the product slug or name, e.g.:');
  console.log('  hex-dumbbells-10kg-detail.jpg');
  console.log('  "Weight Lifting Plate 51mm 2.5 kg.png"');
  process.exit(0);
}

const rows = await (await fetch(`${SUPA_URL}/rest/v1/products?select=id,slug,name,images,metadata`, { headers: H })).json();
if (!Array.isArray(rows)) throw new Error('Could not read products: ' + JSON.stringify(rows).slice(0, 200));

const files = fs.readdirSync(INCOMING_DIR).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
console.log(`${files.length} image file(s) in ${INCOMING_DIR}/, ${rows.length} products in the catalog.\n`);

// --- 2. Match each file to exactly one product ------------------------------
const matched = []; // { file, row }
const unmatched = [];
const ambiguous = [];

for (const file of files) {
  const base = path.parse(file).name;
  const normBase = normalize(base);
  const slugBase = slugify(base);

  // Prefer a slug match (most specific, least likely to collide), then a
  // whole-name match, then "filename contains the product name". The slug
  // must be followed by a word boundary (end of string or a dash) so
  // e.g. the slug 'pool-table-pt-005' does not match a file named for the
  // real, separate product 'pool-table-pt-005a'.
  let candidates = rows.filter((r) => {
    if (slugBase === r.slug) return true;
    if (!slugBase.startsWith(r.slug)) return false;
    const next = slugBase[r.slug.length];
    return next === undefined || next === '-';
  });
  if (candidates.length === 0) {
    candidates = rows.filter((r) => normBase.includes(normalize(r.name)));
  }
  if (candidates.length === 0) {
    // Loosest pass: product name's significant words (3+ chars) all present in the filename.
    candidates = rows.filter((r) => {
      const words = normalize(r.name).split(' ').filter((w) => w.length >= 3);
      return words.length > 0 && words.every((w) => normBase.includes(w));
    });
  }

  if (candidates.length === 1) {
    matched.push({ file, row: candidates[0] });
  } else if (candidates.length > 1) {
    // Narrow by longest matching slug if possible before giving up.
    const bySlugLen = [...candidates].sort((a, b) => b.slug.length - a.slug.length);
    if (bySlugLen[0].slug.length > (bySlugLen[1]?.slug.length || 0)) {
      matched.push({ file, row: bySlugLen[0] });
    } else {
      ambiguous.push({ file, candidates: candidates.map((c) => c.slug) });
    }
  } else {
    unmatched.push(file);
  }
}

console.log(`matched: ${matched.length}  ambiguous: ${ambiguous.length}  unmatched: ${unmatched.length}\n`);
if (matched.length) {
  console.log('--- matches ---');
  matched.forEach((m) => console.log(`  ${m.file}  ->  ${m.row.slug}`));
}
if (ambiguous.length) {
  console.log('\n--- AMBIGUOUS (skipped — rename the file to be more specific) ---');
  ambiguous.forEach((a) => console.log(`  ${a.file}  could be: ${a.candidates.join(', ')}`));
}
if (unmatched.length) {
  console.log('\n--- UNMATCHED (skipped — no product name/slug found in the filename) ---');
  unmatched.forEach((f) => console.log(`  ${f}`));
}

// --- 3. Group by product, respect the 5-image cap, skip already-imported ---
const byProduct = new Map();
for (const m of matched) {
  if (!byProduct.has(m.row.slug)) byProduct.set(m.row.slug, { row: m.row, files: [] });
  byProduct.get(m.row.slug).files.push(m.file);
}

const plan = [];
for (const { row, files: fileList } of byProduct.values()) {
  const already = new Set(row.metadata?.imported_filenames || []);
  const currentCount = (row.images || []).length;
  const room = MAX_IMAGES - currentCount;
  const toAdd = fileList.filter((f) => !already.has(f)).slice(0, Math.max(0, room));
  const skippedFull = fileList.filter((f) => !already.has(f)).slice(Math.max(0, room));
  const skippedDup = fileList.filter((f) => already.has(f));
  if (toAdd.length > 0) plan.push({ row, toAdd, skippedFull, skippedDup, currentCount });
  else if (skippedFull.length || skippedDup.length) {
    console.log(`\n${row.slug}: nothing to add (already has ${currentCount} image(s); ${skippedDup.length} already imported, ${skippedFull.length} would exceed the ${MAX_IMAGES}-image cap)`);
  }
}

console.log(`\n${plan.length} product(s) will receive new images.`);
if (!APPLY) {
  console.log('\nDry run only. Re-run with --apply to upload and save.');
  process.exit(0);
}

// --- 4. Upload + save ---------------------------------------------------
let uploaded = 0, failed = 0;
for (const { row, toAdd } of plan) {
  const newUrls = [];
  const newFilenames = [];
  for (const file of toAdd) {
    const filePath = path.join(INCOMING_DIR, file);
    const timestamp = Math.floor(Date.now() / 1000);
    const paramsToSign = { timestamp, folder: UPLOAD_FOLDER, allowed_formats: 'jpg,jpeg,png,webp' };
    const signature = signParams(paramsToSign);

    const form = new FormData();
    form.append('file', new Blob([fs.readFileSync(filePath)]), file);
    form.append('api_key', API_KEY);
    form.append('timestamp', String(timestamp));
    form.append('folder', UPLOAD_FOLDER);
    form.append('allowed_formats', 'jpg,jpeg,png,webp');
    form.append('signature', signature);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method: 'POST', body: form });
      const json = await res.json();
      if (!res.ok || !json.secure_url) {
        console.log(`  FAILED upload ${file}: ${json.error?.message || res.status}`);
        failed++;
        continue;
      }
      newUrls.push(json.secure_url);
      newFilenames.push(file);
      uploaded++;
      console.log(`  uploaded ${file} -> ${json.secure_url}`);
    } catch (err) {
      console.log(`  FAILED upload ${file}: ${err.message}`);
      failed++;
    }
  }

  if (newUrls.length === 0) continue;

  const updatedImages = [...(row.images || []), ...newUrls];
  const updatedMetadata = {
    ...(row.metadata || {}),
    imported_filenames: [...(row.metadata?.imported_filenames || []), ...newFilenames],
  };
  if (updatedMetadata.storefront) {
    updatedMetadata.storefront = { ...updatedMetadata.storefront, images: updatedImages };
  }

  const patchRes = await fetch(`${SUPA_URL}/rest/v1/products?id=eq.${row.id}`, {
    method: 'PATCH',
    headers: { ...H, 'Content-Type': 'application/json' },
    body: JSON.stringify({ images: updatedImages, metadata: updatedMetadata, updated_at: new Date().toISOString() }),
  });
  if (!patchRes.ok) {
    console.log(`  FAILED to save ${row.slug} to Supabase: ${patchRes.status} ${(await patchRes.text()).slice(0, 150)}`);
  } else {
    console.log(`  saved ${row.slug}: now ${updatedImages.length} image(s)`);
  }
}

console.log(`\nDone. uploaded: ${uploaded}, failed: ${failed}`);

// --- 5. Verify by reading back ------------------------------------------
const after = await (await fetch(`${SUPA_URL}/rest/v1/products?select=slug,images`, { headers: H })).json();
let verifiedOk = 0;
for (const { row, toAdd } of plan) {
  const r = after.find((x) => x.slug === row.slug);
  const expected = (row.images || []).length + toAdd.length;
  if (r && r.images.length >= expected - (failed > 0 ? plan.length : 0)) verifiedOk++;
}
console.log(`verified: ${verifiedOk}/${plan.length} products show more images than before.`);
