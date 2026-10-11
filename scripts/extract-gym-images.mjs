/**
 * Extracts the original embedded product images from "Gym Equipments.xlsx",
 * maps each to its product row via the drawing anchor, copies the untouched
 * bytes into public/images/products/gym-equipment/, and writes a manifest
 * (image_manifest.json) plus the workbook's product rows (source-rows.json).
 *
 * Usage: node scripts/extract-gym-images.mjs "<path to Gym Equipments.xlsx>"
 * The workbook is only read; it is unzipped into a temp folder.
 */
import fs from 'fs';
import os from 'os';
import path from 'path';
import { execFileSync } from 'child_process';
import sharp from 'sharp';

const xlsx = process.argv[2];
if (!xlsx || !fs.existsSync(xlsx)) {
  console.error('Usage: node scripts/extract-gym-images.mjs "<path to Gym Equipments.xlsx>"');
  process.exit(1);
}

const OUT = path.resolve('public/images/products/gym-equipment');
fs.mkdirSync(OUT, { recursive: true });

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gymx-'));
// bsdtar (ships with Windows 10+, macOS, most Linux) reads zip containers.
// Use Windows' bsdtar explicitly (Git Bash's GNU tar cannot read zip), and run from the
// workbook's folder with a relative name.
const TAR = process.platform === 'win32' ? path.join(process.env.SystemRoot ?? 'C:\\Windows', 'System32', 'tar.exe') : 'tar';
execFileSync(TAR,['-xf', path.basename(xlsx), '-C', tmp], { cwd: path.dirname(path.resolve(xlsx)) });

const read = (p) => fs.readFileSync(path.join(tmp, p), 'utf8');
const decode = (s) => s.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&apos;/g, "'");

const sharedStrings = [...read('xl/sharedStrings.xml').matchAll(/<si>([\s\S]*?)<\/si>/g)].map((m) =>
  decode([...m[1].matchAll(/<t[^>]*>([^<]*)<\/t>/g)].map((t) => t[1]).join('')),
);

/** Product-name normaliser: "T- 6666 Curve Treadmill" -> "T-6666 Curve Treadmill", "Q 8" -> "Q8". */
const cleanName = (s) =>
  s.trim().replace(/\s+/g, ' ').replace(/-\s+/g, '-').replace(/^(Q)\s(\d)/, '$1$2');
const slugify = (s) => s.toLowerCase().replace(/[()"]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const sheets = [
  { n: 1, name: 'Commercial Treadmill', category: 'Commercial Treadmills' },
  { n: 2, name: 'Domestic Treadmill', category: 'Domestic Treadmills' },
];

const manifest = [];
const sourceRows = [];

for (const sheet of sheets) {
  const cells = {};
  for (const c of read(`xl/worksheets/sheet${sheet.n}.xml`).matchAll(/<c r="([A-Z]+)(\d+)"([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
    const v = c[4]?.match(/<v>([^<]*)<\/v>/)?.[1];
    if (v == null) continue;
    cells[`${c[1]}${c[2]}`] = /t="s"/.test(c[3]) ? sharedStrings[+v] : v;
  }

  // Product rows: numeric Sr No in column A with a name in column B.
  const rows = Object.keys(cells)
    .filter((k) => k.startsWith('A') && /^\d+$/.test(cells[k]) && cells[`B${k.slice(1)}`])
    .map((k) => +k.slice(1))
    .sort((a, b) => a - b);

  const rels = Object.fromEntries(
    [...read(`xl/drawings/_rels/drawing${sheet.n}.xml.rels`).matchAll(/Id="(rId\d+)"[^>]*Target="([^"]+)"/g)].map((m) => [m[1], m[2]]),
  );
  const anchors = [...read(`xl/drawings/drawing${sheet.n}.xml`).matchAll(/<xdr:(?:twoCellAnchor|oneCellAnchor)[\s\S]*?<\/xdr:(?:twoCellAnchor|oneCellAnchor)>/g)].map((a) => ({
    row: +a[0].match(/<xdr:from>[\s\S]*?<xdr:row>(\d+)<\/xdr:row>/)[1] + 1,
    col: +a[0].match(/<xdr:from><xdr:col>(\d+)<\/xdr:col>/)[1],
    media: path.join('xl/drawings', rels[a[0].match(/r:embed="(rId\d+)"/)[1]]),
  }));

  for (const row of rows) {
    const name = cleanName(decode(cells[`B${row}`]));
    const description = (cells[`C${row}`] ?? '').trim();
    const mrp = Number(cells[`G${row}`]);
    sourceRows.push({
      sheet: sheet.name, row, srNo: Number(cells[`A${row}`]), name, sourceName: cells[`B${row}`], description,
      qty: (cells[`D${row}`] ?? '').trim(), mrp, category: sheet.category,
      discountPrice: cells[`I${row}`] ?? null, discountPercent: cells[`J${row}`] ?? null,
    });

    // An image belongs to a row when its top-left anchor lies on that row (column H = index 7).
    const hits = anchors.filter((a) => a.col === 7 && a.row === row);
    if (hits.length !== 1) {
      manifest.push({ product: name, sheet: sheet.name, row, file: null, status: `REVIEW: ${hits.length} anchored images` });
      continue;
    }
    const src = path.join(tmp, hits[0].media);
    const ext = path.extname(src).toLowerCase();
    const file = `${slugify(name)}${ext}`;
    fs.copyFileSync(src, path.join(OUT, file)); // byte-for-byte copy, no recompression
    const meta = await sharp(src).metadata();
    manifest.push({
      product: name, sheet: sheet.name, row, file, sourceMedia: path.basename(src),
      width: meta.width, height: meta.height, bytes: fs.statSync(src).size, status: 'mapped (anchor row = product row)',
    });
  }
}

fs.writeFileSync(path.join(OUT, 'image_manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
fs.writeFileSync(path.resolve('docs/gym-catalog-source-rows.json'), JSON.stringify(sourceRows, null, 2) + '\n');
fs.rmSync(tmp, { recursive: true, force: true });

console.table(manifest.map(({ product, sheet, row, file, width, height, status }) => ({ product, sheet, row, file, size: width ? `${width}x${height}` : '-', status })));
const bad = manifest.filter((m) => !m.file);
if (bad.length) { console.error(`${bad.length} image(s) need manual review`); process.exit(2); }
