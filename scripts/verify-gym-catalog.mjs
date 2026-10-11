/**
 * Verifies src/data/gymProducts.ts against the workbook rows captured by
 * scripts/extract-gym-images.mjs (docs/gym-catalog-source-rows.json) and the
 * image manifest. Exits non-zero on any mismatch.
 */
import fs from 'fs';
import os from 'os';
import path from 'path';
import { pathToFileURL } from 'url';
import { buildSync } from 'esbuild';

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gymv-'));
const out = path.join(tmp, 'gym.mjs');
buildSync({ entryPoints: ['src/data/gymProducts.ts'], bundle: true, format: 'esm', outfile: out, logLevel: 'error' });
const { GYM_PRODUCTS } = await import(pathToFileURL(out).href);

const rows = JSON.parse(fs.readFileSync('docs/gym-catalog-source-rows.json', 'utf8'));
const manifest = JSON.parse(fs.readFileSync('public/images/products/gym-equipment/image_manifest.json', 'utf8'));
let failures = 0;
const fail = (m) => { failures++; console.error('FAIL', m); };

if (rows.length !== 18) fail(`expected 18 workbook rows, found ${rows.length}`);
if (GYM_PRODUCTS.length !== 18) fail(`expected 18 products, found ${GYM_PRODUCTS.length}`);
const count = (sub) => GYM_PRODUCTS.filter((p) => p.subcategory === sub).length;
if (count('commercial-treadmills') !== 10) fail('commercial count != 10');
if (count('domestic-treadmills') !== 8) fail('domestic count != 8');
if (new Set(GYM_PRODUCTS.map((p) => p.slug)).size !== 18) fail('duplicate slugs');

for (const r of rows) {
  const p = GYM_PRODUCTS.find((x) => x.name === r.name);
  if (!p) { fail(`no product named "${r.name}"`); continue; }
  const sub = r.category === 'Commercial Treadmills' ? 'commercial-treadmills' : 'domestic-treadmills';
  if (p.subcategory !== sub) fail(`${r.name}: subcategory ${p.subcategory}`);
  if (p.price !== r.mrp) fail(`${r.name}: price ${p.price} != ${r.mrp}`);
  if (r.discountPrice || r.discountPercent) fail(`${r.name}: workbook has a discount value`);
  if (p.originalPrice || p.discountPrice) fail(`${r.name}: fabricated discount fields`);
  if (r.description && p.description !== r.description) fail(`${r.name}: description "${p.description}" != "${r.description}"`);
  if (!r.description && !/not listed/.test(p.description)) fail(`${r.name}: missing-description fallback absent`);
  if (r.qty !== p.quantityUnit) fail(`${r.name}: qty "${p.quantityUnit}" != "${r.qty}"`);
  const m = manifest.find((x) => x.product === r.name && x.row === r.row);
  if (!m?.file) fail(`${r.name}: no manifest image for row ${r.row}`);
  else {
    if (p.images[0] !== `/images/products/gym-equipment/${m.file}`) fail(`${r.name}: image ${p.images[0]} != ${m.file}`);
    if (!fs.existsSync(path.join('public/images/products/gym-equipment', m.file))) fail(`${r.name}: file missing on disk`);
  }
  const mentionsBrand = /\((.+)\)$/.exec(r.name)?.[1] ?? '';
  if (p.brand !== mentionsBrand) fail(`${r.name}: brand "${p.brand}" != "${mentionsBrand}"`);
}
fs.rmSync(tmp, { recursive: true, force: true });
console.log(failures ? `${failures} failure(s)` : 'OK: 18 products (10 commercial, 8 domestic) match the workbook rows, prices, descriptions, brands and image mappings');
process.exit(failures ? 1 : 0);
