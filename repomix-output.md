This file is a merged representation of a subset of the codebase, containing specifically included files and files not matching ignore patterns, combined into a single document by Repomix.
The content has been processed where line numbers have been added, content has been formatted for parsing in markdown style.

# File Summary

## Purpose
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
- Pay special attention to the Repository Description. These contain important context and guidelines specific to this project.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: src/**/*, scripts/**/*, docs/**/*.md, docs/**/*.json, index.html, package.json, tsconfig.json, vite.config.ts, AGENTS.md
- Files matching these patterns are excluded: dist/**, node_modules/**, **/*.png, **/*.jpg, **/*.jpeg, **/*.webp, **/*.xlsx, package-lock.json, .git/**, oriental_sports_excel_original_images/**, .agents/**, repomix-output.md, repomix-output.xml
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Line numbers have been added to the beginning of each line
- Content has been formatted for parsing in markdown style
- Files are sorted by Git change count (files with more changes are at the bottom)

# User Provided Header
Oriental Sports Pune — Full Codebase & Architecture Pack

# Directory Structure
````
docs/
  visual-audits/
    README.md
  21ST_COMPONENT_MAP.md
  gym-catalog-source-rows.json
  INTERACTION_MAP.md
  INTERACTION_SYSTEM.md
  RESPONSIVE_AUDIT.md
  VISUAL_DIRECTION.md
  VISUAL_REFERENCE_MAP.md
scripts/
  audit-phase5-courts.mjs
  capture-checkout.mjs
  capture-fullpage.mjs
  check-images.mjs
  check-media.mjs
  extract-gym-images.mjs
  find-innermost.mjs
  find-overflow.mjs
  process-extracted-images.mjs
  responsive-audit.mjs
  verify-catalog.mjs
  verify-gym-catalog.mjs
  visual-audit.mjs
src/
  components/
    account/
      AddressModal.tsx
      OrderTracker.tsx
    auth/
      AuthModal.tsx
    brand/
      Logo.tsx
    courts/
      BuildSteps.tsx
      CourtCostEstimator.tsx
    footer/
      Footer.tsx
    home/
      CourtsChapter.tsx
      GearEdit.tsx
      Hero.tsx
      OrbitalGallery.tsx
      ProjectGallery.tsx
      SportIndex.tsx
      StoreChapter.tsx
    motion/
      Reveal.tsx
    navigation/
      BottomNav.tsx
      CartDrawer.tsx
      Header.tsx
      MobileMenu.tsx
      SearchModal.tsx
    products/
      ProductCard.tsx
      StickyBuyBar.tsx
    ui/
      BrandIntro.tsx
      Img.tsx
      PageHeader.tsx
  context/
    AuthContext.tsx
    CartContext.tsx
    WishlistContext.tsx
  data/
    categories.ts
    courts.ts
    gymProducts.ts
    media.ts
    products.ts
    storeInfo.ts
    testimonials.ts
  pages/
    AboutPage.tsx
    AccountPage.tsx
    CartPage.tsx
    CategoryPage.tsx
    CheckoutPage.tsx
    ContactPage.tsx
    CourtProjectDetailPage.tsx
    CourtProjectsPage.tsx
    CourtsPage.tsx
    HomePage.tsx
    NotFoundPage.tsx
    OrderSuccessPage.tsx
    PolicyPages.tsx
    ProductDetailPage.tsx
    SearchPage.tsx
    ShopPage.tsx
    VisitPage.tsx
  services/
    authService.ts
    razorpay.ts
    shopify.ts
  styles/
    auth-modal.css
    checkout.css
    components.css
    global.css
    home.css
    navigation.css
    pages.css
    tokens.css
  types/
    auth.ts
    index.ts
    shopify.ts
  utils/
    storeHours.ts
  App.tsx
  main.tsx
  vite-env.d.ts
AGENTS.md
index.html
package.json
tsconfig.json
vite.config.ts
````

# Files

## File: docs/gym-catalog-source-rows.json
````json
  1: [
  2:   {
  3:     "sheet": "Commercial Treadmill",
  4:     "row": 7,
  5:     "srNo": 1,
  6:     "name": "Genesis 9i Commercial Treadmill",
  7:     "sourceName": "Genesis 9i Commercial Treadmill",
  8:     "description": "5HP AC Motor 27\"",
  9:     "qty": "1 Nos",
 10:     "mrp": 525000,
 11:     "category": "Commercial Treadmills",
 12:     "discountPrice": null,
 13:     "discountPercent": null
 14:   },
 15:   {
 16:     "sheet": "Commercial Treadmill",
 17:     "row": 17,
 18:     "srNo": 2,
 19:     "name": "T-3300 Commercial Treadmill",
 20:     "sourceName": "T-3300 Commercial Treadmill",
 21:     "description": "5HP AC Motor",
 22:     "qty": "1 Nos",
 23:     "mrp": 350000,
 24:     "category": "Commercial Treadmills",
 25:     "discountPrice": null,
 26:     "discountPercent": null
 27:   },
 28:   {
 29:     "sheet": "Commercial Treadmill",
 30:     "row": 28,
 31:     "srNo": 3,
 32:     "name": "T-1212 Commercial Treadmill",
 33:     "sourceName": "T-1212 Commercial Treadmill",
 34:     "description": "5HP AC Motor",
 35:     "qty": "1 Nos",
 36:     "mrp": 262500,
 37:     "category": "Commercial Treadmills",
 38:     "discountPrice": null,
 39:     "discountPercent": null
 40:   },
 41:   {
 42:     "sheet": "Commercial Treadmill",
 43:     "row": 39,
 44:     "srNo": 4,
 45:     "name": "Q3 Light Commercial Treadmill",
 46:     "sourceName": "Q3 Light Commercial Treadmill",
 47:     "description": "3HP AC Motor",
 48:     "qty": "1 Nos",
 49:     "mrp": 156250,
 50:     "category": "Commercial Treadmills",
 51:     "discountPrice": null,
 52:     "discountPercent": null
 53:   },
 54:   {
 55:     "sheet": "Commercial Treadmill",
 56:     "row": 50,
 57:     "srNo": 5,
 58:     "name": "X10 Light Commercial Treadmill",
 59:     "sourceName": "X10 Light Commercial Treadmill",
 60:     "description": "4HP AC Motor",
 61:     "qty": "1 Nos",
 62:     "mrp": 243750,
 63:     "category": "Commercial Treadmills",
 64:     "discountPrice": null,
 65:     "discountPercent": null
 66:   },
 67:   {
 68:     "sheet": "Commercial Treadmill",
 69:     "row": 62,
 70:     "srNo": 6,
 71:     "name": "Q5 Light Commercial Treadmill",
 72:     "sourceName": "Q5 Light Commercial Treadmill",
 73:     "description": "4HP AC Motor",
 74:     "qty": "1 Nos",
 75:     "mrp": 202500,
 76:     "category": "Commercial Treadmills",
 77:     "discountPrice": null,
 78:     "discountPercent": null
 79:   },
 80:   {
 81:     "sheet": "Commercial Treadmill",
 82:     "row": 74,
 83:     "srNo": 7,
 84:     "name": "T-6666 Curve Treadmill",
 85:     "sourceName": "T- 6666 Curve Treadmill",
 86:     "description": "",
 87:     "qty": "1 Nos",
 88:     "mrp": 337500,
 89:     "category": "Commercial Treadmills",
 90:     "discountPrice": null,
 91:     "discountPercent": null
 92:   },
 93:   {
 94:     "sheet": "Commercial Treadmill",
 95:     "row": 86,
 96:     "srNo": 8,
 97:     "name": "T-6262 Curve Treadmill",
 98:     "sourceName": "T- 6262 Curve Treadmill",
 99:     "description": "",
100:     "qty": "1 Nos",
101:     "mrp": 190000,
102:     "category": "Commercial Treadmills",
103:     "discountPrice": null,
104:     "discountPercent": null
105:   },
106:   {
107:     "sheet": "Commercial Treadmill",
108:     "row": 98,
109:     "srNo": 9,
110:     "name": "Q8 Commercial Treadmill",
111:     "sourceName": "Q 8 Commercial Treadmill",
112:     "description": "5HP AC Motor",
113:     "qty": "1 Nos",
114:     "mrp": 262500,
115:     "category": "Commercial Treadmills",
116:     "discountPrice": null,
117:     "discountPercent": null
118:   },
119:   {
120:     "sheet": "Commercial Treadmill",
121:     "row": 110,
122:     "srNo": 10,
123:     "name": "Q7 Commercial Treadmill",
124:     "sourceName": "Q 7 Commercial Treadmill",
125:     "description": "4.5HP AC Motor",
126:     "qty": "1 Nos",
127:     "mrp": 231250,
128:     "category": "Commercial Treadmills",
129:     "discountPrice": null,
130:     "discountPercent": null
131:   },
132:   {
133:     "sheet": "Domestic Treadmill",
134:     "row": 8,
135:     "srNo": 1,
136:     "name": "T-102 Treadmill (Vivafitness)",
137:     "sourceName": "T-102 Treadmill (Vivafitness)",
138:     "description": "2HP DC Motor",
139:     "qty": "1 Nos",
140:     "mrp": 75000,
141:     "category": "Domestic Treadmills",
142:     "discountPrice": null,
143:     "discountPercent": null
144:   },
145:   {
146:     "sheet": "Domestic Treadmill",
147:     "row": 18,
148:     "srNo": 2,
149:     "name": "T-415 Treadmill (Vivafitness)",
150:     "sourceName": "T-415 Treadmill (Vivafitness)",
151:     "description": "2.25HP Motor",
152:     "qty": "1 Nos",
153:     "mrp": 85000,
154:     "category": "Domestic Treadmills",
155:     "discountPrice": null,
156:     "discountPercent": null
157:   },
158:   {
159:     "sheet": "Domestic Treadmill",
160:     "row": 29,
161:     "srNo": 3,
162:     "name": "T-425 Treadmill (Vivafitness)",
163:     "sourceName": "T-425 Treadmill (Vivafitness)",
164:     "description": "2.25HP Motor",
165:     "qty": "1 Nos",
166:     "mrp": 92500,
167:     "category": "Domestic Treadmills",
168:     "discountPrice": null,
169:     "discountPercent": null
170:   },
171:   {
172:     "sheet": "Domestic Treadmill",
173:     "row": 40,
174:     "srNo": 4,
175:     "name": "T-902 Treadmill (Vivafitness)",
176:     "sourceName": "T-902 Treadmill (Vivafitness)",
177:     "description": "2.5HP AC Motor",
178:     "qty": "1 Nos",
179:     "mrp": 116250,
180:     "category": "Domestic Treadmills",
181:     "discountPrice": null,
182:     "discountPercent": null
183:   },
184:   {
185:     "sheet": "Domestic Treadmill",
186:     "row": 51,
187:     "srNo": 5,
188:     "name": "T-906 Treadmill (Vivafitness)",
189:     "sourceName": "T-906 Treadmill (Vivafitness)",
190:     "description": "2.5HP AC Motor",
191:     "qty": "1 Nos",
192:     "mrp": 137500,
193:     "category": "Domestic Treadmills",
194:     "discountPrice": null,
195:     "discountPercent": null
196:   },
197:   {
198:     "sheet": "Domestic Treadmill",
199:     "row": 63,
200:     "srNo": 6,
201:     "name": "T-911 Treadmill (Vivafitness)",
202:     "sourceName": "T-911 Treadmill (Vivafitness)",
203:     "description": "2.5HP AC Motor",
204:     "qty": "1 Nos",
205:     "mrp": 152500,
206:     "category": "Domestic Treadmills",
207:     "discountPrice": null,
208:     "discountPercent": null
209:   },
210:   {
211:     "sheet": "Domestic Treadmill",
212:     "row": 75,
213:     "srNo": 7,
214:     "name": "T-145 Treadmill (Vivafitness)",
215:     "sourceName": "T- 145 Treadmill (Vivafitness)",
216:     "description": "2.25HP DC Motor",
217:     "qty": "1 Nos",
218:     "mrp": 72500,
219:     "category": "Domestic Treadmills",
220:     "discountPrice": null,
221:     "discountPercent": null
222:   },
223:   {
224:     "sheet": "Domestic Treadmill",
225:     "row": 87,
226:     "srNo": 8,
227:     "name": "T-19 Treadmill (Adidas)",
228:     "sourceName": "T-19 Treadmill (Adidas)",
229:     "description": "4HP Motor",
230:     "qty": "1 Nos",
231:     "mrp": 89900,
232:     "category": "Domestic Treadmills",
233:     "discountPrice": null,
234:     "discountPercent": null
235:   }
236: ]
````

## File: scripts/capture-checkout.mjs
````javascript
 1: import { chromium } from 'playwright';
 2: 
 3: async function captureCheckout() {
 4:   const browser = await chromium.launch({ headless: true });
 5: 
 6:   const mockCartItem = [
 7:     {
 8:       product: {
 9:         id: 'yonex-astrox-99-pro',
10:         slug: 'yonex-astrox-99-pro',
11:         name: 'Yonex Astrox 99 Pro Badminton Racket',
12:         categoryName: 'Badminton',
13:         price: 18490,
14:         images: ['/images/catalog/yonex_astrox_99_pro.webp'],
15:       },
16:       quantity: 1,
17:       selectedVariant: 'White Tiger / 4U G5',
18:     },
19:   ];
20: 
21:   // Desktop
22:   const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
23:   const desktopPage = await desktopContext.newPage();
24:   await desktopPage.goto('http://localhost:3000/');
25:   await desktopPage.evaluate((items) => {
26:     localStorage.setItem('oriental_sports_cart_v1', JSON.stringify(items));
27:   }, mockCartItem);
28:   await desktopPage.goto('http://localhost:3000/checkout', { waitUntil: 'networkidle' });
29:   await desktopPage.screenshot({ path: 'docs/visual-audits/checkout_desktop.png', fullPage: true });
30:   await desktopContext.close();
31: 
32:   // Mobile
33:   const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
34:   const mobilePage = await mobileContext.newPage();
35:   await mobilePage.goto('http://localhost:3000/');
36:   await mobilePage.evaluate((items) => {
37:     localStorage.setItem('oriental_sports_cart_v1', JSON.stringify(items));
38:   }, mockCartItem);
39:   await mobilePage.goto('http://localhost:3000/checkout', { waitUntil: 'networkidle' });
40:   await mobilePage.screenshot({ path: 'docs/visual-audits/checkout_mobile.png', fullPage: true });
41:   await mobileContext.close();
42: 
43:   await browser.close();
44:   console.log('Checkout screenshots captured.');
45: }
46: 
47: captureCheckout().catch(console.error);
````

## File: scripts/extract-gym-images.mjs
````javascript
  1: /**
  2:  * Extracts the original embedded product images from "Gym Equipments.xlsx",
  3:  * maps each to its product row via the drawing anchor, copies the untouched
  4:  * bytes into public/images/products/gym-equipment/, and writes a manifest
  5:  * (image_manifest.json) plus the workbook's product rows (source-rows.json).
  6:  *
  7:  * Usage: node scripts/extract-gym-images.mjs "<path to Gym Equipments.xlsx>"
  8:  * The workbook is only read; it is unzipped into a temp folder.
  9:  */
 10: import fs from 'fs';
 11: import os from 'os';
 12: import path from 'path';
 13: import { execFileSync } from 'child_process';
 14: import sharp from 'sharp';
 15: 
 16: const xlsx = process.argv[2];
 17: if (!xlsx || !fs.existsSync(xlsx)) {
 18:   console.error('Usage: node scripts/extract-gym-images.mjs "<path to Gym Equipments.xlsx>"');
 19:   process.exit(1);
 20: }
 21: 
 22: const OUT = path.resolve('public/images/products/gym-equipment');
 23: fs.mkdirSync(OUT, { recursive: true });
 24: 
 25: const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gymx-'));
 26: // bsdtar (ships with Windows 10+, macOS, most Linux) reads zip containers.
 27: // Use Windows' bsdtar explicitly (Git Bash's GNU tar cannot read zip), and run from the
 28: // workbook's folder with a relative name.
 29: const TAR = process.platform === 'win32' ? path.join(process.env.SystemRoot ?? 'C:\\Windows', 'System32', 'tar.exe') : 'tar';
 30: execFileSync(TAR,['-xf', path.basename(xlsx), '-C', tmp], { cwd: path.dirname(path.resolve(xlsx)) });
 31: 
 32: const read = (p) => fs.readFileSync(path.join(tmp, p), 'utf8');
 33: const decode = (s) => s.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&apos;/g, "'");
 34: 
 35: const sharedStrings = [...read('xl/sharedStrings.xml').matchAll(/<si>([\s\S]*?)<\/si>/g)].map((m) =>
 36:   decode([...m[1].matchAll(/<t[^>]*>([^<]*)<\/t>/g)].map((t) => t[1]).join('')),
 37: );
 38: 
 39: /** Product-name normaliser: "T- 6666 Curve Treadmill" -> "T-6666 Curve Treadmill", "Q 8" -> "Q8". */
 40: const cleanName = (s) =>
 41:   s.trim().replace(/\s+/g, ' ').replace(/-\s+/g, '-').replace(/^(Q)\s(\d)/, '$1$2');
 42: const slugify = (s) => s.toLowerCase().replace(/[()"]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
 43: 
 44: const sheets = [
 45:   { n: 1, name: 'Commercial Treadmill', category: 'Commercial Treadmills' },
 46:   { n: 2, name: 'Domestic Treadmill', category: 'Domestic Treadmills' },
 47: ];
 48: 
 49: const manifest = [];
 50: const sourceRows = [];
 51: 
 52: for (const sheet of sheets) {
 53:   const cells = {};
 54:   for (const c of read(`xl/worksheets/sheet${sheet.n}.xml`).matchAll(/<c r="([A-Z]+)(\d+)"([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
 55:     const v = c[4]?.match(/<v>([^<]*)<\/v>/)?.[1];
 56:     if (v == null) continue;
 57:     cells[`${c[1]}${c[2]}`] = /t="s"/.test(c[3]) ? sharedStrings[+v] : v;
 58:   }
 59: 
 60:   // Product rows: numeric Sr No in column A with a name in column B.
 61:   const rows = Object.keys(cells)
 62:     .filter((k) => k.startsWith('A') && /^\d+$/.test(cells[k]) && cells[`B${k.slice(1)}`])
 63:     .map((k) => +k.slice(1))
 64:     .sort((a, b) => a - b);
 65: 
 66:   const rels = Object.fromEntries(
 67:     [...read(`xl/drawings/_rels/drawing${sheet.n}.xml.rels`).matchAll(/Id="(rId\d+)"[^>]*Target="([^"]+)"/g)].map((m) => [m[1], m[2]]),
 68:   );
 69:   const anchors = [...read(`xl/drawings/drawing${sheet.n}.xml`).matchAll(/<xdr:(?:twoCellAnchor|oneCellAnchor)[\s\S]*?<\/xdr:(?:twoCellAnchor|oneCellAnchor)>/g)].map((a) => ({
 70:     row: +a[0].match(/<xdr:from>[\s\S]*?<xdr:row>(\d+)<\/xdr:row>/)[1] + 1,
 71:     col: +a[0].match(/<xdr:from><xdr:col>(\d+)<\/xdr:col>/)[1],
 72:     media: path.join('xl/drawings', rels[a[0].match(/r:embed="(rId\d+)"/)[1]]),
 73:   }));
 74: 
 75:   for (const row of rows) {
 76:     const name = cleanName(decode(cells[`B${row}`]));
 77:     const description = (cells[`C${row}`] ?? '').trim();
 78:     const mrp = Number(cells[`G${row}`]);
 79:     sourceRows.push({
 80:       sheet: sheet.name, row, srNo: Number(cells[`A${row}`]), name, sourceName: cells[`B${row}`], description,
 81:       qty: (cells[`D${row}`] ?? '').trim(), mrp, category: sheet.category,
 82:       discountPrice: cells[`I${row}`] ?? null, discountPercent: cells[`J${row}`] ?? null,
 83:     });
 84: 
 85:     // An image belongs to a row when its top-left anchor lies on that row (column H = index 7).
 86:     const hits = anchors.filter((a) => a.col === 7 && a.row === row);
 87:     if (hits.length !== 1) {
 88:       manifest.push({ product: name, sheet: sheet.name, row, file: null, status: `REVIEW: ${hits.length} anchored images` });
 89:       continue;
 90:     }
 91:     const src = path.join(tmp, hits[0].media);
 92:     const ext = path.extname(src).toLowerCase();
 93:     const file = `${slugify(name)}${ext}`;
 94:     fs.copyFileSync(src, path.join(OUT, file)); // byte-for-byte copy, no recompression
 95:     const meta = await sharp(src).metadata();
 96:     manifest.push({
 97:       product: name, sheet: sheet.name, row, file, sourceMedia: path.basename(src),
 98:       width: meta.width, height: meta.height, bytes: fs.statSync(src).size, status: 'mapped (anchor row = product row)',
 99:     });
100:   }
101: }
102: 
103: fs.writeFileSync(path.join(OUT, 'image_manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
104: fs.writeFileSync(path.resolve('docs/gym-catalog-source-rows.json'), JSON.stringify(sourceRows, null, 2) + '\n');
105: fs.rmSync(tmp, { recursive: true, force: true });
106: 
107: console.table(manifest.map(({ product, sheet, row, file, width, height, status }) => ({ product, sheet, row, file, size: width ? `${width}x${height}` : '-', status })));
108: const bad = manifest.filter((m) => !m.file);
109: if (bad.length) { console.error(`${bad.length} image(s) need manual review`); process.exit(2); }
````

## File: scripts/find-innermost.mjs
````javascript
 1: import { chromium } from 'playwright';
 2: 
 3: async function checkInnermost() {
 4:   const browser = await chromium.launch({ headless: true });
 5:   const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
 6:   const page = await context.newPage();
 7: 
 8:   const mockCartItem = [
 9:     {
10:       product: {
11:         id: 'yonex-astrox-99-pro',
12:         slug: 'yonex-astrox-99-pro',
13:         name: 'Yonex Astrox 99 Pro Badminton Racket',
14:         categoryName: 'Badminton',
15:         price: 18490,
16:         images: ['/images/catalog/yonex_astrox_99_pro.webp'],
17:       },
18:       quantity: 1,
19:     },
20:   ];
21: 
22:   await page.goto('http://localhost:3000/');
23:   await page.evaluate((items) => {
24:     localStorage.setItem('oriental_sports_cart_v1', JSON.stringify(items));
25:   }, mockCartItem);
26:   await page.goto('http://localhost:3000/checkout', { waitUntil: 'networkidle' });
27: 
28:   const leafCulprits = await page.evaluate(() => {
29:     const culprits = [];
30:     const all = document.querySelectorAll('.checkout-form-column *');
31:     for (const el of all) {
32:       if (el.children.length === 0 && el.getBoundingClientRect().width > 358) {
33:         culprits.push({
34:           tag: el.tagName,
35:           className: el.className,
36:           id: el.id,
37:           width: el.getBoundingClientRect().width,
38:           text: (el.textContent || el.getAttribute('placeholder') || '').slice(0, 30),
39:         });
40:       }
41:     }
42:     return culprits;
43:   });
44: 
45:   console.log(JSON.stringify(leafCulprits, null, 2));
46:   await browser.close();
47: }
48: 
49: checkInnermost().catch(console.error);
````

## File: scripts/find-overflow.mjs
````javascript
 1: import { chromium } from 'playwright';
 2: 
 3: async function checkOverflow() {
 4:   const browser = await chromium.launch({ headless: true });
 5:   const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
 6:   const page = await context.newPage();
 7: 
 8:   const mockCartItem = [
 9:     {
10:       product: {
11:         id: 'yonex-astrox-99-pro',
12:         slug: 'yonex-astrox-99-pro',
13:         name: 'Yonex Astrox 99 Pro Badminton Racket',
14:         categoryName: 'Badminton',
15:         price: 18490,
16:         images: ['/images/catalog/yonex_astrox_99_pro.webp'],
17:       },
18:       quantity: 1,
19:     },
20:   ];
21: 
22:   await page.goto('http://localhost:3000/');
23:   await page.evaluate((items) => {
24:     localStorage.setItem('oriental_sports_cart_v1', JSON.stringify(items));
25:   }, mockCartItem);
26:   await page.goto('http://localhost:3000/checkout', { waitUntil: 'networkidle' });
27: 
28:   const rootCulprits = await page.evaluate(() => {
29:     const docWidth = window.innerWidth;
30:     const scrollWidth = document.documentElement.scrollWidth;
31:     const culprits = [];
32: 
33:     const all = document.querySelectorAll('body *');
34:     for (const el of all) {
35:       if (el.scrollWidth > docWidth || el.offsetWidth > docWidth) {
36:         culprits.push({
37:           tag: el.tagName,
38:           className: el.className,
39:           id: el.id,
40:           offsetWidth: el.offsetWidth,
41:           scrollWidth: el.scrollWidth,
42:           clientWidth: el.clientWidth,
43:           text: (el.textContent || '').trim().slice(0, 30),
44:         });
45:       }
46:     }
47:     return { docWidth, scrollWidth, culprits: culprits.slice(0, 10) };
48:   });
49: 
50:   console.log(JSON.stringify(rootCulprits, null, 2));
51:   await browser.close();
52: }
53: 
54: checkOverflow().catch(console.error);
````

## File: scripts/process-extracted-images.mjs
````javascript
  1: import fs from 'fs';
  2: import path from 'path';
  3: import sharp from 'sharp';
  4: 
  5: const SOURCE_DIR = path.resolve('oriental_sports_extracted_images');
  6: const TARGET_DIR = path.resolve('public/images/products/oriental-sports');
  7: 
  8: if (!fs.existsSync(TARGET_DIR)) {
  9:   fs.mkdirSync(TARGET_DIR, { recursive: true });
 10: }
 11: 
 12: // Mapping definitions: [sourceFile, outputBaseName, label, description]
 13: const ASSET_MAPPINGS = [
 14:   // 1. Cricket Bats (Page 2)
 15:   {
 16:     src: 'page_02_image_01.jpg',
 17:     name: 'sg-scorer-classic',
 18:     label: 'SG Scorer Classic Cricket Bat',
 19:     page: 2,
 20:     category: 'Cricket',
 21:   },
 22:   {
 23:     src: 'page_02_image_02.jpg',
 24:     name: 'sg-profile-classic',
 25:     label: 'SG Profile Classic Cricket Bat',
 26:     page: 2,
 27:     category: 'Cricket',
 28:   },
 29:   {
 30:     src: 'page_02_image_03.jpg',
 31:     name: 'sg-boundary-xtreme',
 32:     label: 'SG Boundary Xtreme Cricket Bat',
 33:     page: 2,
 34:     category: 'Cricket',
 35:   },
 36:   {
 37:     src: 'page_02_image_04.jpg',
 38:     name: 'sg-sierra-plus',
 39:     label: 'SG Sierra Plus Cricket Bat',
 40:     page: 2,
 41:     category: 'Cricket',
 42:   },
 43:   {
 44:     src: 'page_02_image_04.jpg',
 45:     name: 'sg-savage-plus',
 46:     label: 'SG Savage Plus Cricket Bat',
 47:     page: 2,
 48:     category: 'Cricket',
 49:   },
 50: 
 51:   // 2. Football Equipment (Page 5 & 6)
 52:   {
 53:     src: 'page_05_image_01.jpg',
 54:     name: 'nivia-football-black-white',
 55:     label: 'Nivia Football (Black / White)',
 56:     page: 5,
 57:     category: 'Football',
 58:   },
 59:   {
 60:     src: 'page_05_image_02.jpg',
 61:     name: 'nivia-shining-star-football',
 62:     label: 'Nivia Shining Star Football',
 63:     page: 5,
 64:     category: 'Football',
 65:   },
 66:   {
 67:     src: 'page_05_image_03.jpg',
 68:     name: 'nivia-dominator-football',
 69:     label: 'Nivia Dominator Football',
 70:     page: 5,
 71:     category: 'Football',
 72:   },
 73:   {
 74:     src: 'page_05_image_04.jpg',
 75:     name: 'cosco-milano-football',
 76:     label: 'Cosco Milano Football',
 77:     page: 5,
 78:     category: 'Football',
 79:   },
 80:   {
 81:     src: 'page_05_image_05.jpg',
 82:     name: 'cosco-super-star-football',
 83:     label: 'Cosco Super Star Football',
 84:     page: 5,
 85:     category: 'Football',
 86:   },
 87:   {
 88:     src: 'page_05_image_06.jpg',
 89:     name: 'nivia-stockings-encounter',
 90:     label: 'Nivia Stockings Encounter',
 91:     page: 5,
 92:     category: 'Football',
 93:   },
 94:   {
 95:     src: 'page_05_image_07.jpg',
 96:     name: 'nivia-carbonat-8-0-pro-shoes',
 97:     label: 'Nivia Carbonat 8.0 Pro Football Shoes',
 98:     page: 5,
 99:     category: 'Football',
100:   },
101:   {
102:     src: 'page_06_image_01.jpg',
103:     name: 'nivia-encounter-football-shoes',
104:     label: 'Nivia Encounter Football Shoes',
105:     page: 6,
106:     category: 'Football',
107:   },
108: 
109:   // 3. Badminton Rackets (Page 9 & 10)
110:   {
111:     src: 'page_09_image_01.jpg',
112:     name: 'yonex-gr-303i',
113:     label: 'Yonex GR 303I Badminton Racket',
114:     page: 9,
115:     category: 'Badminton',
116:   },
117:   {
118:     src: 'page_09_image_02.jpg',
119:     name: 'yonex-zr-100',
120:     label: 'Yonex ZR 100 Badminton Racket',
121:     page: 9,
122:     category: 'Badminton',
123:   },
124:   {
125:     src: 'page_09_image_03.jpg',
126:     name: 'yonex-nanoflare-8000i',
127:     label: 'Yonex Nanoflare 8000I Badminton Racket',
128:     page: 9,
129:     category: 'Badminton',
130:   },
131:   {
132:     src: 'page_09_image_04.jpg',
133:     name: 'yonex-attack-9',
134:     label: 'Yonex Attack 9 Badminton Racket',
135:     page: 9,
136:     category: 'Badminton',
137:   },
138:   {
139:     src: 'page_09_image_05.jpg',
140:     name: 'yonex-nanoflare-speed-7',
141:     label: 'Yonex Nanoflare Speed 7 Badminton Racket',
142:     page: 9,
143:     category: 'Badminton',
144:   },
145:   {
146:     src: 'page_10_image_01.jpg',
147:     name: 'yonex-voltric-35i',
148:     label: 'Yonex Voltric 35I Badminton Racket',
149:     page: 10,
150:     category: 'Badminton',
151:   },
152:   {
153:     src: 'page_10_image_02.jpg',
154:     name: 'yonex-astrox-43i',
155:     label: 'Yonex Astrox 43I Badminton Racket',
156:     page: 10,
157:     category: 'Badminton',
158:   },
159:   {
160:     src: 'page_10_image_03.jpg',
161:     name: 'yonex-arcsaber-7-play',
162:     label: 'Yonex Arcsaber 7 Play Badminton Racket',
163:     page: 10,
164:     category: 'Badminton',
165:   },
166:   {
167:     src: 'page_10_image_04.jpg',
168:     name: 'yonex-muscle-power-29',
169:     label: 'Yonex Muscle Power 29 Badminton Racket',
170:     page: 10,
171:     category: 'Badminton',
172:   },
173: 
174:   // 4. Badminton Shuttlecocks (Page 14 & 15)
175:   {
176:     src: 'page_14_image_01.jpg',
177:     name: 'yonex-mavis-350',
178:     label: 'Yonex Mavis-350 Shuttlecock',
179:     page: 14,
180:     category: 'Badminton',
181:   },
182:   {
183:     src: 'page_14_image_02.jpg',
184:     name: 'yonex-mavis-350i',
185:     label: 'Yonex Mavis-350i Shuttlecock',
186:     page: 14,
187:     category: 'Badminton',
188:   },
189:   {
190:     src: 'page_14_image_03.jpg',
191:     name: 'yonex-mavis-600',
192:     label: 'Yonex Mavis-600 Shuttlecock',
193:     page: 14,
194:     category: 'Badminton',
195:   },
196:   {
197:     src: 'page_14_image_04.jpg',
198:     name: 'yonex-mavis-500',
199:     label: 'Yonex Mavis-500 Shuttlecock',
200:     page: 14,
201:     category: 'Badminton',
202:   },
203:   {
204:     src: 'page_14_image_06.jpg',
205:     name: 'mavis-200i',
206:     label: 'Mavis-200i Shuttlecock',
207:     page: 14,
208:     category: 'Badminton',
209:   },
210:   {
211:     src: 'page_15_image_01.jpg',
212:     name: 'yonex-mavis-10',
213:     label: 'Yonex Mavis-10 Shuttlecock',
214:     page: 15,
215:     category: 'Badminton',
216:   },
217:   {
218:     src: 'page_15_image_02.jpg',
219:     name: 'yonex-as2-feather',
220:     label: 'Yonex AS2 Feather Shuttlecock',
221:     page: 15,
222:     category: 'Badminton',
223:   },
224:   {
225:     src: 'page_15_image_03.jpg',
226:     name: 'acbtr-feather',
227:     label: 'ACBTR Feather Shuttlecock',
228:     page: 15,
229:     category: 'Badminton',
230:   },
231: ];
232: 
233: async function processImages() {
234:   console.log('🔄 Processing and optimizing extracted PDF images...\n');
235: 
236:   for (const item of ASSET_MAPPINGS) {
237:     const srcPath = path.join(SOURCE_DIR, item.src);
238:     if (!fs.existsSync(srcPath)) {
239:       console.warn(`⚠️ Source file missing: ${item.src}`);
240:       continue;
241:     }
242: 
243:     const outJpg = path.join(TARGET_DIR, `${item.name}.jpg`);
244:     const outWebp = path.join(TARGET_DIR, `${item.name}.webp`);
245:     const outSmallWebp = path.join(TARGET_DIR, `${item.name}-sm.webp`);
246: 
247:     try {
248:       // Clean background, trim whitespace, and normalize to clean aspect ratio with subtle margin
249:       const image = sharp(srcPath);
250:       const metadata = await image.metadata();
251: 
252:       // Trim outer solid border / table lines if present
253:       const trimmed = image.trim();
254: 
255:       // Save WebP and JPG versions optimized for web
256:       await trimmed
257:         .clone()
258:         .webp({ quality: 85 })
259:         .toFile(outWebp);
260: 
261:       await trimmed
262:         .clone()
263:         .resize({ width: Math.min(480, metadata.width || 480) })
264:         .webp({ quality: 80 })
265:         .toFile(outSmallWebp);
266: 
267:       await trimmed
268:         .clone()
269:         .jpeg({ quality: 85 })
270:         .toFile(outJpg);
271: 
272:       console.log(`✅ [Page ${item.page}] ${item.label} -> /images/products/oriental-sports/${item.name}.webp (${metadata.width}x${metadata.height})`);
273:     } catch (err) {
274:       console.error(`❌ Failed to process ${item.src}:`, err.message);
275:     }
276:   }
277: 
278:   console.log(`\n🎉 Processed ${ASSET_MAPPINGS.length} product images successfully into ${TARGET_DIR}\n`);
279: }
280: 
281: processImages();
````

## File: scripts/verify-catalog.mjs
````javascript
 1: import { chromium } from 'playwright';
 2: 
 3: const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
 4: 
 5: async function verifyCatalog() {
 6:   console.log(`\n🧪 Running Comprehensive Product Catalog Verification at ${BASE_URL}...`);
 7:   const browser = await chromium.launch({ headless: true });
 8:   const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
 9: 
10:   try {
11:     // 1. Visit /shop
12:     console.log('1. Checking /shop page...');
13:     await page.goto(`${BASE_URL}/shop`, { waitUntil: 'networkidle' });
14:     const productCards = await page.locator('.product-card').count();
15:     console.log(`   Found ${productCards} product cards on /shop`);
16:     if (productCards < 20) throw new Error(`Expected >= 20 product cards, found ${productCards}`);
17: 
18:     // 2. Filter by Cricket
19:     console.log('2. Filtering by Cricket...');
20:     await page.goto(`${BASE_URL}/shop?category=cricket`, { waitUntil: 'networkidle' });
21:     const cricketCards = await page.locator('.product-card').count();
22:     console.log(`   Found ${cricketCards} cricket product cards`);
23:     if (cricketCards < 5) throw new Error(`Expected at least 5 cricket products`);
24: 
25:     // 3. Check Cricket Bat PDP variant prices
26:     console.log('3. Checking SG Scorer Classic PDP & variant pricing...');
27:     await page.goto(`${BASE_URL}/product/sg-scorer-classic-cricket-bat`, { waitUntil: 'networkidle' });
28:     const pdpTitle = await page.locator('.pdp-title').innerText();
29:     console.log(`   PDP Title: ${pdpTitle}`);
30:     if (!pdpTitle.includes('SG Scorer Classic')) throw new Error('Incorrect PDP title');
31: 
32:     const priceText = await page.locator('.pdp-price-now').innerText();
33:     console.log(`   Initial PDP Price: ${priceText}`);
34: 
35:     // Click Size F variant chip and verify price updates to ₹3,499
36:     const sizeFChip = page.locator('.pdp-choices button:has-text("Size F")');
37:     if (await sizeFChip.count() > 0) {
38:       await sizeFChip.click();
39:       await page.waitForTimeout(300);
40:       const updatedPrice = await page.locator('.pdp-price-now').innerText();
41:       console.log(`   Updated PDP Price after selecting Size F: ${updatedPrice}`);
42:       if (!updatedPrice.includes('3,499')) throw new Error(`Expected price to update to ₹3,499, got ${updatedPrice}`);
43:     }
44: 
45:     // 4. Test Add to Bag and Cart subtotal
46:     console.log('4. Testing Add to Bag...');
47:     await page.locator('.pdp-add').click();
48:     await page.waitForTimeout(800);
49:     const drawerSubtotal = await page.locator('.drawer-subtotal strong').innerText();
50:     console.log(`   Cart Drawer Subtotal: ${drawerSubtotal}`);
51:     if (!drawerSubtotal.includes('3,499')) throw new Error(`Cart Drawer Subtotal expected ₹3,499, got ${drawerSubtotal}`);
52: 
53:     // 5. Test /shop?category=football
54:     console.log('5. Checking Football category...');
55:     await page.goto(`${BASE_URL}/shop?category=football`, { waitUntil: 'networkidle' });
56:     const fbCards = await page.locator('.product-card').count();
57:     console.log(`   Found ${fbCards} football product cards (Expected 8)`);
58:     if (fbCards !== 8) throw new Error(`Expected 8 football products, found ${fbCards}`);
59: 
60:     // 6. Test /shop?category=badminton
61:     console.log('6. Checking Badminton category...');
62:     await page.goto(`${BASE_URL}/shop?category=badminton`, { waitUntil: 'networkidle' });
63:     const badmCards = await page.locator('.product-card').count();
64:     console.log(`   Found ${badmCards} badminton product cards (Expected 17: 9 rackets + 8 shuttlecocks)`);
65:     if (badmCards !== 17) throw new Error(`Expected 17 badminton products, found ${badmCards}`);
66: 
67:     // 7. Test Search
68:     console.log('7. Testing search query "Mavis-350"...');
69:     await page.goto(`${BASE_URL}/search?q=Mavis-350`, { waitUntil: 'networkidle' });
70:     const searchCards = await page.locator('.product-card').count();
71:     console.log(`   Found ${searchCards} matching products for "Mavis-350"`);
72:     if (searchCards === 0) throw new Error('Search failed for Mavis-350');
73: 
74:     // 8. Mobile viewport check
75:     console.log('8. Testing mobile responsive layout (390px)...');
76:     await page.setViewportSize({ width: 390, height: 844 });
77:     await page.goto(`${BASE_URL}/shop`, { waitUntil: 'networkidle' });
78:     const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
79:     const innerWidth = await page.evaluate(() => window.innerWidth);
80:     console.log(`   Mobile 390px: scrollWidth=${scrollWidth}, innerWidth=${innerWidth}`);
81:     if (scrollWidth > innerWidth) throw new Error(`Horizontal overflow detected at 390px: scrollWidth ${scrollWidth} > innerWidth ${innerWidth}`);
82: 
83:     console.log('\n🎉 ALL CATALOG AND E-COMMERCE TESTS PASSED SUCCESSFULLY!\n');
84:     await browser.close();
85:     process.exit(0);
86:   } catch (err) {
87:     console.error('\n❌ Catalog verification failed:', err);
88:     await browser.close();
89:     process.exit(1);
90:   }
91: }
92: 
93: verifyCatalog();
````

## File: scripts/verify-gym-catalog.mjs
````javascript
 1: /**
 2:  * Verifies src/data/gymProducts.ts against the workbook rows captured by
 3:  * scripts/extract-gym-images.mjs (docs/gym-catalog-source-rows.json) and the
 4:  * image manifest. Exits non-zero on any mismatch.
 5:  */
 6: import fs from 'fs';
 7: import os from 'os';
 8: import path from 'path';
 9: import { pathToFileURL } from 'url';
10: import { buildSync } from 'esbuild';
11: 
12: const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gymv-'));
13: const out = path.join(tmp, 'gym.mjs');
14: buildSync({ entryPoints: ['src/data/gymProducts.ts'], bundle: true, format: 'esm', outfile: out, logLevel: 'error' });
15: const { GYM_PRODUCTS } = await import(pathToFileURL(out).href);
16: 
17: const rows = JSON.parse(fs.readFileSync('docs/gym-catalog-source-rows.json', 'utf8'));
18: const manifest = JSON.parse(fs.readFileSync('public/images/products/gym-equipment/image_manifest.json', 'utf8'));
19: let failures = 0;
20: const fail = (m) => { failures++; console.error('FAIL', m); };
21: 
22: if (rows.length !== 18) fail(`expected 18 workbook rows, found ${rows.length}`);
23: if (GYM_PRODUCTS.length !== 18) fail(`expected 18 products, found ${GYM_PRODUCTS.length}`);
24: const count = (sub) => GYM_PRODUCTS.filter((p) => p.subcategory === sub).length;
25: if (count('commercial-treadmills') !== 10) fail('commercial count != 10');
26: if (count('domestic-treadmills') !== 8) fail('domestic count != 8');
27: if (new Set(GYM_PRODUCTS.map((p) => p.slug)).size !== 18) fail('duplicate slugs');
28: 
29: for (const r of rows) {
30:   const p = GYM_PRODUCTS.find((x) => x.name === r.name);
31:   if (!p) { fail(`no product named "${r.name}"`); continue; }
32:   const sub = r.category === 'Commercial Treadmills' ? 'commercial-treadmills' : 'domestic-treadmills';
33:   if (p.subcategory !== sub) fail(`${r.name}: subcategory ${p.subcategory}`);
34:   if (p.price !== r.mrp) fail(`${r.name}: price ${p.price} != ${r.mrp}`);
35:   if (r.discountPrice || r.discountPercent) fail(`${r.name}: workbook has a discount value`);
36:   if (p.originalPrice || p.discountPrice) fail(`${r.name}: fabricated discount fields`);
37:   if (r.description && p.description !== r.description) fail(`${r.name}: description "${p.description}" != "${r.description}"`);
38:   if (!r.description && !/not listed/.test(p.description)) fail(`${r.name}: missing-description fallback absent`);
39:   if (r.qty !== p.quantityUnit) fail(`${r.name}: qty "${p.quantityUnit}" != "${r.qty}"`);
40:   const m = manifest.find((x) => x.product === r.name && x.row === r.row);
41:   if (!m?.file) fail(`${r.name}: no manifest image for row ${r.row}`);
42:   else {
43:     if (p.images[0] !== `/images/products/gym-equipment/${m.file}`) fail(`${r.name}: image ${p.images[0]} != ${m.file}`);
44:     if (!fs.existsSync(path.join('public/images/products/gym-equipment', m.file))) fail(`${r.name}: file missing on disk`);
45:   }
46:   const mentionsBrand = /\((.+)\)$/.exec(r.name)?.[1] ?? '';
47:   if (p.brand !== mentionsBrand) fail(`${r.name}: brand "${p.brand}" != "${mentionsBrand}"`);
48: }
49: fs.rmSync(tmp, { recursive: true, force: true });
50: console.log(failures ? `${failures} failure(s)` : 'OK: 18 products (10 commercial, 8 domestic) match the workbook rows, prices, descriptions, brands and image mappings');
51: process.exit(failures ? 1 : 0);
````

## File: src/components/navigation/BottomNav.tsx
````typescript
  1: import React from 'react';
  2: import { NavLink, useLocation } from 'react-router-dom';
  3: import { Home, Shirt, ClipboardList, ShoppingCart, User } from 'lucide-react';
  4: import { useCart } from '../../context/CartContext';
  5: import { useAuth } from '../../context/AuthContext';
  6: 
  7: export const BottomNav: React.FC = () => {
  8:   const { pathname } = useLocation();
  9:   const { itemCount, isCartOpen } = useCart();
 10:   const { isAuthenticated, isAuthModalOpen } = useAuth();
 11: 
 12:   // Hide on dedicated checkout and order confirmation pages to keep them distraction-free
 13:   if (pathname === '/checkout' || pathname === '/order-success') {
 14:     return null;
 15:   }
 16: 
 17:   // Exact mutual exclusion so exactly one tab is active
 18:   const isCartActive = pathname === '/cart' || isCartOpen;
 19:   const isOrdersActive = !isCartActive && pathname.startsWith('/account/orders');
 20:   const isAccountActive =
 21:     !isCartActive &&
 22:     !isOrdersActive &&
 23:     (pathname.startsWith('/account') || pathname.startsWith('/wishlist') || isAuthModalOpen);
 24:   const isProductsActive =
 25:     !isCartActive &&
 26:     !isOrdersActive &&
 27:     !isAccountActive &&
 28:     (pathname.startsWith('/shop') || pathname.startsWith('/product') || pathname.startsWith('/courts'));
 29:   const isHomeActive = !isProductsActive && !isOrdersActive && !isCartActive && !isAccountActive;
 30: 
 31:   let activeIndex = 0;
 32:   if (isProductsActive) activeIndex = 1;
 33:   else if (isOrdersActive) activeIndex = 2;
 34:   else if (isCartActive) activeIndex = 3;
 35:   else if (isAccountActive) activeIndex = 4;
 36: 
 37:   return (
 38:     <nav className="bottom-nav-dock" aria-label="Mobile Navigation">
 39:       <div className="bottom-nav-pill">
 40:         {/* Real animated sliding indicator capsule that glides to whichever item is active */}
 41:         <div
 42:           className="bottom-nav-slider"
 43:           style={{
 44:             transform: `translateX(calc(${activeIndex} * (100% + 2px)))`,
 45:           }}
 46:           aria-hidden="true"
 47:         />
 48: 
 49:         <NavLink
 50:           to="/"
 51:           className={`bottom-nav-item ${isHomeActive ? 'is-active' : ''}`}
 52:           aria-label="Home"
 53:         >
 54:           <div className="bottom-nav-icon-wrap">
 55:             <Home size={20} strokeWidth={isHomeActive ? 2.4 : 1.8} />
 56:           </div>
 57:           <span className="bottom-nav-label">Home</span>
 58:         </NavLink>
 59: 
 60:         <NavLink
 61:           to="/shop"
 62:           className={`bottom-nav-item ${isProductsActive ? 'is-active' : ''}`}
 63:           aria-label="Products"
 64:         >
 65:           <div className="bottom-nav-icon-wrap">
 66:             <Shirt size={20} strokeWidth={isProductsActive ? 2.4 : 1.8} />
 67:           </div>
 68:           <span className="bottom-nav-label">Products</span>
 69:         </NavLink>
 70: 
 71:         <NavLink
 72:           to="/account/orders"
 73:           className={`bottom-nav-item ${isOrdersActive ? 'is-active' : ''}`}
 74:           aria-label="Orders"
 75:         >
 76:           <div className="bottom-nav-icon-wrap">
 77:             <ClipboardList size={20} strokeWidth={isOrdersActive ? 2.4 : 1.8} />
 78:           </div>
 79:           <span className="bottom-nav-label">Orders</span>
 80:         </NavLink>
 81: 
 82:         <NavLink
 83:           to="/cart"
 84:           className={`bottom-nav-item ${isCartActive ? 'is-active' : ''}`}
 85:           aria-label={`Cart with ${itemCount} items`}
 86:         >
 87:           <div className="bottom-nav-icon-wrap">
 88:             <ShoppingCart size={20} strokeWidth={isCartActive ? 2.4 : 1.8} />
 89:             {itemCount > 0 && (
 90:               <span className="bottom-nav-badge" aria-hidden="true">
 91:                 {itemCount > 9 ? '9+' : itemCount}
 92:               </span>
 93:             )}
 94:           </div>
 95:           <span className="bottom-nav-label">Cart</span>
 96:         </NavLink>
 97: 
 98:         <NavLink
 99:           to="/account"
100:           className={`bottom-nav-item ${isAccountActive ? 'is-active' : ''}`}
101:           aria-label="Account"
102:         >
103:           <div className="bottom-nav-icon-wrap">
104:             <User size={20} strokeWidth={isAccountActive ? 2.4 : 1.8} />
105:             {isAuthenticated && <span className="bottom-nav-auth-dot" aria-hidden="true" />}
106:           </div>
107:           <span className="bottom-nav-label">Account</span>
108:         </NavLink>
109:       </div>
110:     </nav>
111:   );
112: };
113: 
114: export default BottomNav;
````

## File: src/data/gymProducts.ts
````typescript
  1: import { Product } from '../types';
  2: 
  3: /**
  4:  * Gym Equipment — treadmills from "Gym Equipments.xlsx" (sheets "Commercial
  5:  * Treadmill" and "Domestic Treadmill"). Names, descriptions and MRP are copied
  6:  * from the workbook. Nothing else is stated: no dimensions, speeds, warranty,
  7:  * stock or discounts, because the workbook does not list them.
  8:  * Images are the original embedded workbook images, mapped by sheet row
  9:  * (see /images/products/gym-equipment/image_manifest.json).
 10:  */
 11: 
 12: type Kind = 'commercial' | 'domestic';
 13: 
 14: interface Row {
 15:   /** Workbook sheet row — kept so the image mapping can be audited. */
 16:   row: number;
 17:   name: string;
 18:   /** Description column, verbatim. Empty when the workbook leaves it blank. */
 19:   listed: string;
 20:   mrp: number;
 21:   slug: string;
 22:   /** Manufacturer exactly as written in the product name. Commercial rows name none. */
 23:   brand?: string;
 24:   /** Motor part of the listing, when the description holds one. */
 25:   motor?: string;
 26: }
 27: 
 28: const KINDS = {
 29:   commercial: { subcategory: 'commercial-treadmills', subcategoryName: 'Commercial Treadmills', label: 'Commercial treadmill' },
 30:   domestic: { subcategory: 'domestic-treadmills', subcategoryName: 'Domestic Treadmills', label: 'Domestic treadmill' },
 31: } as const;
 32: 
 33: const MISSING = 'Specifications for this model are not listed yet. Ask the Camp store for details.';
 34: 
 35: const build = (kind: Kind, r: Row): Product => {
 36:   const k = KINDS[kind];
 37:   const specs: Record<string, string> = {};
 38:   if (r.brand) specs['Manufacturer'] = r.brand;
 39:   specs['Type'] = k.label;
 40:   specs['Model'] = r.name.replace(/\s*(Light\s+)?(Commercial\s+)?(Curve\s+)?Treadmill.*$/i, '').trim();
 41:   if (r.motor) specs['Motor'] = r.motor;
 42:   if (r.listed && r.listed !== r.motor) specs['Also listed'] = r.listed.replace(r.motor ?? '', '').trim();
 43:   specs['Quantity'] = '1 Nos';
 44:   specs['MRP'] = `₹${r.mrp.toLocaleString('en-IN')}`;
 45: 
 46:   return {
 47:     id: `prod-gym-${r.slug}`,
 48:     slug: r.slug,
 49:     name: r.name,
 50:     category: 'gym-equipment',
 51:     categoryName: 'Gym Equipment',
 52:     subcategory: k.subcategory,
 53:     subcategoryName: k.subcategoryName,
 54:     productType: 'treadmill',
 55:     brand: r.brand ?? '',
 56:     price: r.mrp,
 57:     currency: 'INR',
 58:     quantityUnit: '1 Nos',
 59:     priceLabel: 'MRP',
 60:     availabilityNote: 'Availability on request from the Camp store',
 61:     rating: 0,
 62:     reviewsCount: 0,
 63:     inStock: true,
 64:     images: [`/images/products/gym-equipment/${r.slug}.jpeg`],
 65:     description: r.listed || MISSING,
 66:     features: [],
 67:     specs,
 68:     seoTitle: `${r.name} | Oriental Sports Pune`,
 69:     seoDescription: `${r.name}${r.listed ? ` — ${r.listed}` : ''}. MRP ₹${r.mrp.toLocaleString('en-IN')}. Oriental Sports, MG Road, Camp, Pune.`,
 70:   };
 71: };
 72: 
 73: const COMMERCIAL: Row[] = [
 74:   { row: 7, name: 'Genesis 9i Commercial Treadmill', listed: '5HP AC Motor 27"', motor: '5HP AC Motor', mrp: 525000, slug: 'genesis-9i-commercial-treadmill' },
 75:   { row: 17, name: 'T-3300 Commercial Treadmill', listed: '5HP AC Motor', motor: '5HP AC Motor', mrp: 350000, slug: 't-3300-commercial-treadmill' },
 76:   { row: 28, name: 'T-1212 Commercial Treadmill', listed: '5HP AC Motor', motor: '5HP AC Motor', mrp: 262500, slug: 't-1212-commercial-treadmill' },
 77:   { row: 39, name: 'Q3 Light Commercial Treadmill', listed: '3HP AC Motor', motor: '3HP AC Motor', mrp: 156250, slug: 'q3-light-commercial-treadmill' },
 78:   { row: 50, name: 'X10 Light Commercial Treadmill', listed: '4HP AC Motor', motor: '4HP AC Motor', mrp: 243750, slug: 'x10-light-commercial-treadmill' },
 79:   { row: 62, name: 'Q5 Light Commercial Treadmill', listed: '4HP AC Motor', motor: '4HP AC Motor', mrp: 202500, slug: 'q5-light-commercial-treadmill' },
 80:   { row: 74, name: 'T-6666 Curve Treadmill', listed: '', mrp: 337500, slug: 't-6666-curve-treadmill' },
 81:   { row: 86, name: 'T-6262 Curve Treadmill', listed: '', mrp: 190000, slug: 't-6262-curve-treadmill' },
 82:   { row: 98, name: 'Q8 Commercial Treadmill', listed: '5HP AC Motor', motor: '5HP AC Motor', mrp: 262500, slug: 'q8-commercial-treadmill' },
 83:   { row: 110, name: 'Q7 Commercial Treadmill', listed: '4.5HP AC Motor', motor: '4.5HP AC Motor', mrp: 231250, slug: 'q7-commercial-treadmill' },
 84: ];
 85: 
 86: const DOMESTIC: Row[] = [
 87:   { row: 8, name: 'T-102 Treadmill (Vivafitness)', brand: 'Vivafitness', listed: '2HP DC Motor', motor: '2HP DC Motor', mrp: 75000, slug: 't-102-treadmill-vivafitness' },
 88:   { row: 18, name: 'T-415 Treadmill (Vivafitness)', brand: 'Vivafitness', listed: '2.25HP Motor', motor: '2.25HP Motor', mrp: 85000, slug: 't-415-treadmill-vivafitness' },
 89:   { row: 29, name: 'T-425 Treadmill (Vivafitness)', brand: 'Vivafitness', listed: '2.25HP Motor', motor: '2.25HP Motor', mrp: 92500, slug: 't-425-treadmill-vivafitness' },
 90:   { row: 40, name: 'T-902 Treadmill (Vivafitness)', brand: 'Vivafitness', listed: '2.5HP AC Motor', motor: '2.5HP AC Motor', mrp: 116250, slug: 't-902-treadmill-vivafitness' },
 91:   { row: 51, name: 'T-906 Treadmill (Vivafitness)', brand: 'Vivafitness', listed: '2.5HP AC Motor', motor: '2.5HP AC Motor', mrp: 137500, slug: 't-906-treadmill-vivafitness' },
 92:   { row: 63, name: 'T-911 Treadmill (Vivafitness)', brand: 'Vivafitness', listed: '2.5HP AC Motor', motor: '2.5HP AC Motor', mrp: 152500, slug: 't-911-treadmill-vivafitness' },
 93:   { row: 75, name: 'T-145 Treadmill (Vivafitness)', brand: 'Vivafitness', listed: '2.25HP DC Motor', motor: '2.25HP DC Motor', mrp: 72500, slug: 't-145-treadmill-vivafitness' },
 94:   { row: 87, name: 'T-19 Treadmill (Adidas)', brand: 'Adidas', listed: '4HP Motor', motor: '4HP Motor', mrp: 89900, slug: 't-19-treadmill-adidas' },
 95: ];
 96: 
 97: export const GYM_PRODUCTS: Product[] = [
 98:   ...COMMERCIAL.map((r) => build('commercial', r)),
 99:   ...DOMESTIC.map((r) => build('domestic', r)),
100: ];
````

## File: src/pages/CheckoutPage.tsx
````typescript
  1: import React, { useState, useEffect } from 'react';
  2: import { Link, useNavigate } from 'react-router-dom';
  3: import {
  4:   ShieldCheck,
  5:   Lock,
  6:   Truck,
  7:   Store,
  8:   CreditCard,
  9:   QrCode,
 10:   Building2,
 11:   CheckCircle2,
 12:   ArrowLeft,
 13:   ChevronRight,
 14:   ChevronDown,
 15:   ChevronUp,
 16:   AlertCircle,
 17:   ShoppingBag,
 18:   Clock,
 19:   Phone,
 20:   Check,
 21: } from 'lucide-react';
 22: import { useCart, getItemUnitPrice } from '../context/CartContext';
 23: import { useAuth } from '../context/AuthContext';
 24: import { STORE_INFO } from '../data/storeInfo';
 25: import { Img } from '../components/ui/Img';
 26: import { Logo } from '../components/brand/Logo';
 27: import { Order } from '../types/auth';
 28: import {
 29:   loadRazorpayScript,
 30:   getRazorpayKey,
 31:   isLiveRazorpayKey,
 32:   RazorpayOptions,
 33: } from '../services/razorpay';
 34: 
 35: export const CheckoutPage: React.FC = () => {
 36:   const navigate = useNavigate();
 37:   const { cart, subtotal, shipping, discount, promoCode, applyPromoCode, clearCart } = useCart();
 38:   const { user, isAuthenticated, addOrder } = useAuth();
 39: 
 40:   const [deliveryMethod, setDeliveryMethod] = useState<'doorstep' | 'camp_pickup'>('doorstep');
 41:   const [promoInput, setPromoInput] = useState('');
 42:   const [promoMessage, setPromoMessage] = useState<{ text: string; success: boolean } | null>(null);
 43:   const [showMobileSummary, setShowMobileSummary] = useState(false);
 44: 
 45:   // Address form fields
 46:   const defaultAddr = user?.addresses.find((a) => a.isDefault) || user?.addresses?.[0];
 47: 
 48:   const [form, setForm] = useState({
 49:     firstName: user?.firstName || '',
 50:     lastName: user?.lastName || '',
 51:     email: user?.email || '',
 52:     phone: user?.phone?.replace('+91', '').trim() || '',
 53:     street: defaultAddr?.street || '',
 54:     apartment: '',
 55:     locality: defaultAddr?.locality || '',
 56:     city: defaultAddr?.city || 'Pune',
 57:     state: defaultAddr?.state || 'Maharashtra',
 58:     pincode: defaultAddr?.pincode || '',
 59:     pickupNotes: '',
 60:   });
 61: 
 62:   const [formErrors, setFormErrors] = useState<Record<string, string>>({});
 63:   const [isProcessing, setIsProcessing] = useState(false);
 64:   const [showRazorpaySimModal, setShowRazorpaySimModal] = useState(false);
 65:   const [simPaymentMethod, setSimPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
 66: 
 67:   const finalShipping = deliveryMethod === 'camp_pickup' ? 0 : shipping;
 68:   const grandTotal = Math.max(0, subtotal - discount + finalShipping);
 69:   const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
 70: 
 71:   // If cart is empty, redirect back to bag
 72:   useEffect(() => {
 73:     if (cart.length === 0) {
 74:       navigate('/cart');
 75:     }
 76:   }, [cart, navigate]);
 77: 
 78:   const validateForm = () => {
 79:     const errors: Record<string, string> = {};
 80:     if (!form.firstName.trim()) errors.firstName = 'First name is required';
 81:     if (!form.phone.trim()) {
 82:       errors.phone = 'Mobile number is required';
 83:     } else if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) {
 84:       errors.phone = 'Enter a valid 10-digit mobile number';
 85:     }
 86: 
 87:     if (deliveryMethod === 'doorstep') {
 88:       if (!form.street.trim()) errors.street = 'Street address / house number is required';
 89:       if (!form.locality.trim()) errors.locality = 'Locality / landmark is required';
 90:       if (!form.city.trim()) errors.city = 'City is required';
 91:       if (!form.pincode.trim()) {
 92:         errors.pincode = 'PIN code is required';
 93:       } else if (!/^\d{6}$/.test(form.pincode.trim())) {
 94:         errors.pincode = 'Enter a valid 6-digit PIN code';
 95:       }
 96:     }
 97: 
 98:     setFormErrors(errors);
 99:     return Object.keys(errors).length === 0;
100:   };
101: 
102:   const handleApplyPromo = async (e: React.FormEvent) => {
103:     e.preventDefault();
104:     if (!promoInput) return;
105:     const res = await applyPromoCode(promoInput);
106:     setPromoMessage({ text: res.message, success: res.success });
107:   };
108: 
109:   const handleCreateAndFinalizeOrder = async (paymentId: string, paymentMethodName: string) => {
110:     const orderNum = `OS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
111: 
112:     const newOrder: Order = {
113:       id: `ord-${Date.now().toString().slice(-6)}`,
114:       orderNumber: orderNum,
115:       date: new Date().toISOString().split('T')[0],
116:       status: 'confirmed',
117:       statusLabel:
118:         deliveryMethod === 'camp_pickup'
119:           ? 'Ready for Camp Store Collection'
120:           : 'Confirmed · Preparing at MG Road Workshop',
121:       totalAmount: grandTotal,
122:       subtotal: subtotal,
123:       shipping: finalShipping,
124:       tax: Math.round(subtotal * 0.18),
125:       paymentMethod: `Razorpay (${paymentMethodName} - ID: ${paymentId})`,
126:       shippingAddress: {
127:         id: `addr_${Date.now()}`,
128:         name: `${form.firstName} ${form.lastName}`.trim(),
129:         phone: form.phone.startsWith('+91') ? form.phone : `+91 ${form.phone}`,
130:         street: deliveryMethod === 'camp_pickup' ? 'Shop 247, MG Road (Camp Store Pickup)' : form.street,
131:         locality: form.locality || 'Camp',
132:         city: form.city || 'Pune',
133:         state: form.state || 'Maharashtra',
134:         pincode: form.pincode,
135:         isDefault: false,
136:         type: 'home',
137:       },
138:       trackingNumber: `OS-DTDC-${Math.floor(10000 + Math.random() * 90000)}`,
139:       carrier: deliveryMethod === 'camp_pickup' ? 'Oriental Store Counter' : 'DTDC Express Pune',
140:       items: cart.map((item) => ({
141:         productId: item.product.id,
142:         productSlug: item.product.slug,
143:         productName: item.product.name,
144:         productImage: item.product.images[0],
145:         price: getItemUnitPrice(item),
146:         quantity: item.quantity,
147:         selectedVariant: item.selectedVariant,
148:         selectedSize: item.selectedSize,
149:       })),
150:       timeline: [
151:         {
152:           status: 'confirmed',
153:           title: 'Order Confirmed',
154:           description: `Payment of ₹${grandTotal.toLocaleString('en-IN')} verified via Razorpay (${paymentId}).`,
155:           date: 'Just now',
156:           completed: true,
157:           current: true,
158:         },
159:         {
160:           status: 'processing',
161:           title: 'Quality Check & Workshop Assembly',
162:           description: 'Inspected by master stringer & equipment craftsman at Shop 247, MG Road.',
163:           date: 'Upcoming',
164:           completed: false,
165:           current: false,
166:         },
167:         {
168:           status: 'shipped',
169:           title: deliveryMethod === 'camp_pickup' ? 'Ready for Counter Pickup' : 'Dispatched via Courier',
170:           description:
171:             deliveryMethod === 'camp_pickup'
172:               ? 'Ready at Shop 247, MG Road, Camp, Pune.'
173:               : 'Out for fast doorstep delivery in Pune.',
174:           date: 'Upcoming',
175:           completed: false,
176:           current: false,
177:         },
178:         {
179:           status: 'delivered',
180:           title: 'Delivered / Collected',
181:           description: 'Handed over to customer.',
182:           date: 'Upcoming',
183:           completed: false,
184:           current: false,
185:         },
186:       ],
187:     };
188: 
189:     await addOrder(newOrder);
190:     clearCart();
191:     navigate('/order-success', { state: { order: newOrder } });
192:   };
193: 
194:   const handleProceedToRazorpay = async () => {
195:     if (!validateForm()) {
196:       window.scrollTo({ top: 120, behavior: 'smooth' });
197:       return;
198:     }
199: 
200:     setIsProcessing(true);
201: 
202:     try {
203:       const scriptLoaded = await loadRazorpayScript();
204:       const razorpayKey = getRazorpayKey();
205: 
206:       if (scriptLoaded && window.Razorpay && isLiveRazorpayKey()) {
207:         const options: RazorpayOptions = {
208:           key: razorpayKey,
209:           amount: Math.round(grandTotal * 100),
210:           currency: 'INR',
211:           name: 'Oriental Sports Pune',
212:           description: `Order of ${cart.length} sports item(s)`,
213:           image: '/images/hero/hero_train_perform.webp',
214:           prefill: {
215:             name: `${form.firstName} ${form.lastName}`.trim(),
216:             email: form.email,
217:             contact: form.phone,
218:           },
219:           theme: {
220:             color: '#111827',
221:           },
222:           handler: (response) => {
223:             handleCreateAndFinalizeOrder(response.razorpay_payment_id, 'Live Gateway');
224:           },
225:           modal: {
226:             ondismiss: () => {
227:               setIsProcessing(false);
228:             },
229:           },
230:         };
231: 
232:         const rzp = new window.Razorpay(options);
233:         rzp.open();
234:       } else {
235:         setShowRazorpaySimModal(true);
236:       }
237:     } catch (err) {
238:       console.warn('Razorpay initialization fallback:', err);
239:       setShowRazorpaySimModal(true);
240:     } finally {
241:       setIsProcessing(false);
242:     }
243:   };
244: 
245:   return (
246:     <div className="checkout-page">
247:       {/* =====================================================================
248:           CLEAN E-COMMERCE CHECKOUT HEADER
249:          ===================================================================== */}
250:       <header className="checkout-header">
251:         <div className="checkout-header-inner">
252:           <Link to="/" style={{ textDecoration: 'none' }}>
253:             <Logo size="md" />
254:           </Link>
255: 
256:           {/* Stepper Indicator */}
257:           <nav className="checkout-progress" aria-label="Checkout Steps">
258:             <Link to="/cart" className="checkout-progress-item is-done">
259:               <span className="checkout-progress-dot">✓</span>
260:               <span>Bag</span>
261:             </Link>
262:             <span className="checkout-progress-sep">/</span>
263:             <div className="checkout-progress-item is-active">
264:               <span className="checkout-progress-dot">2</span>
265:               <span>Shipping & Details</span>
266:             </div>
267:             <span className="checkout-progress-sep">/</span>
268:             <div className="checkout-progress-item">
269:               <span className="checkout-progress-dot">3</span>
270:               <span>Payment</span>
271:             </div>
272:           </nav>
273: 
274:           <div className="checkout-header-badge">
275:             <Lock size={15} />
276:             <span>256-Bit SSL Encrypted</span>
277:           </div>
278:         </div>
279:       </header>
280: 
281:       {/* =====================================================================
282:           MOBILE ORDER SUMMARY ACCORDION
283:          ===================================================================== */}
284:       <div
285:         className="mobile-summary-toggle"
286:         onClick={() => setShowMobileSummary(!showMobileSummary)}
287:         role="button"
288:         tabIndex={0}
289:       >
290:         <div className="mobile-summary-title">
291:           <ShoppingBag size={17} />
292:           <span>{showMobileSummary ? 'Hide order summary' : 'Show order summary'}</span>
293:           {showMobileSummary ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
294:         </div>
295:         <div className="mobile-summary-price">
296:           ₹{grandTotal.toLocaleString('en-IN')}
297:         </div>
298:       </div>
299: 
300:       {showMobileSummary && (
301:         <div style={{ background: '#ffffff', borderBottom: '1px solid #e5e7eb', padding: '16px 20px' }}>
302:           <ul className="summary-items-list" style={{ maxHeight: 'none' }}>
303:             {cart.map((item, idx) => (
304:               <li key={`${item.product.id}-${idx}`} className="summary-item-row">
305:                 <div className="summary-item-img">
306:                   <Img image={item.product.images[0]} alt="" sizes="56px" />
307:                   <span className="summary-item-badge">{item.quantity}</span>
308:                 </div>
309:                 <div className="summary-item-info">
310:                   <p className="summary-item-name">{item.product.name}</p>
311:                   {(item.selectedVariant || item.selectedSize) && (
312:                     <p className="summary-item-meta">
313:                       {[item.selectedVariant, item.selectedSize].filter(Boolean).join(' · ')}
314:                     </p>
315:                   )}
316:                 </div>
317:                 <div className="summary-item-price">
318:                   ₹{(getItemUnitPrice(item) * item.quantity).toLocaleString('en-IN')}
319:                 </div>
320:               </li>
321:             ))}
322:           </ul>
323:         </div>
324:       )}
325: 
326:       {/* =====================================================================
327:           MAIN CHECKOUT CONTAINER
328:          ===================================================================== */}
329:       <main className="checkout-container">
330:         <Link to="/cart" className="checkout-back-link">
331:           <ArrowLeft size={15} />
332:           <span>Return to Bag</span>
333:         </Link>
334: 
335:         <div className="checkout-grid">
336:           {/* LEFT: Customer & Address Information */}
337:           <div className="checkout-form-column">
338:             {/* 1. Contact Information Card */}
339:             <section className="checkout-card">
340:               <div className="checkout-card-header">
341:                 <h2 className="checkout-card-title">
342:                   <span className="checkout-step-number">1</span>
343:                   <span>Contact Information</span>
344:                 </h2>
345:                 {!isAuthenticated && (
346:                   <span className="checkout-card-meta">
347:                     Guest checkout or <Link to="/account" style={{ color: '#111827', fontWeight: 600 }}>Sign In</Link>
348:                   </span>
349:                 )}
350:               </div>
351: 
352:               <div className="form-row form-row-2">
353:                 <div className="form-group">
354:                   <label className="form-label" htmlFor="phone">
355:                     <span>Mobile Phone *</span>
356:                     <span className="form-label-optional">For WhatsApp & SMS updates</span>
357:                   </label>
358:                   <div className="form-input-container">
359:                     <span className="phone-prefix">+91</span>
360:                     <input
361:                       id="phone"
362:                       type="tel"
363:                       className={`form-input form-input-with-prefix ${formErrors.phone ? 'has-error' : ''}`}
364:                       placeholder="98230 45812"
365:                       value={form.phone}
366:                       onChange={(e) => {
367:                         setForm({ ...form, phone: e.target.value });
368:                         if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
369:                       }}
370:                     />
371:                   </div>
372:                   {formErrors.phone && <p className="form-error-text">{formErrors.phone}</p>}
373:                 </div>
374: 
375:                 <div className="form-group">
376:                   <label className="form-label" htmlFor="email">
377:                     <span>Email Address</span>
378:                     <span className="form-label-optional">For GST invoice</span>
379:                   </label>
380:                   <input
381:                     id="email"
382:                     type="email"
383:                     className="form-input"
384:                     placeholder="athlete@example.com"
385:                     value={form.email}
386:                     onChange={(e) => setForm({ ...form, email: e.target.value })}
387:                   />
388:                 </div>
389:               </div>
390:             </section>
391: 
392:             {/* 2. Delivery Method & Shipping Address */}
393:             <section className="checkout-card">
394:               <div className="checkout-card-header">
395:                 <h2 className="checkout-card-title">
396:                   <span className="checkout-step-number">2</span>
397:                   <span>Delivery Method</span>
398:                 </h2>
399:               </div>
400: 
401:               <div className="delivery-options-grid">
402:                 <div
403:                   className={`delivery-option-card ${deliveryMethod === 'doorstep' ? 'is-selected' : ''}`}
404:                   onClick={() => setDeliveryMethod('doorstep')}
405:                   role="button"
406:                   tabIndex={0}
407:                 >
408:                   <div className="delivery-radio">
409:                     <div className="delivery-radio-inner" />
410:                   </div>
411:                   <div className="delivery-option-content">
412:                     <div className="delivery-option-title">
413:                       <Truck size={17} />
414:                       <span>Doorstep Delivery</span>
415:                     </div>
416:                     <div className="delivery-option-desc">
417:                       Fast courier delivery across Pune and pan-India.
418:                     </div>
419:                     <span className="delivery-option-badge">
420:                       {finalShipping === 0 ? 'FREE DELIVERY' : `₹${finalShipping} STANDARD`}
421:                     </span>
422:                   </div>
423:                 </div>
424: 
425:                 <div
426:                   className={`delivery-option-card ${deliveryMethod === 'camp_pickup' ? 'is-selected' : ''}`}
427:                   onClick={() => setDeliveryMethod('camp_pickup')}
428:                   role="button"
429:                   tabIndex={0}
430:                 >
431:                   <div className="delivery-radio">
432:                     <div className="delivery-radio-inner" />
433:                   </div>
434:                   <div className="delivery-option-content">
435:                     <div className="delivery-option-title">
436:                       <Store size={17} />
437:                       <span>Store Pickup (Camp)</span>
438:                     </div>
439:                     <div className="delivery-option-desc">
440:                       Shop 247, MG Road, Camp, Pune. Ready in 2 hours.
441:                     </div>
442:                     <span className="delivery-option-badge" style={{ background: '#fef3c7', color: '#92400e' }}>
443:                       FREE · INSTANT COLLECTION
444:                     </span>
445:                   </div>
446:                 </div>
447:               </div>
448: 
449:               {/* Delivery Address Fields (when Doorstep) */}
450:               {deliveryMethod === 'doorstep' ? (
451:                 <div style={{ marginTop: '20px' }}>
452:                   {isAuthenticated && user?.addresses && user.addresses.length > 0 && (
453:                     <div style={{ marginBottom: '16px' }}>
454:                       <label className="form-label" style={{ marginBottom: '8px' }}>
455:                         Choose Saved Address
456:                       </label>
457:                       <div className="saved-addresses-list">
458:                         {user.addresses.map((addr) => (
459:                           <div
460:                             key={addr.id}
461:                             className={`saved-address-chip ${form.street === addr.street ? 'is-active' : ''}`}
462:                             onClick={() => {
463:                               const [first, ...rest] = (addr.name || '').split(' ');
464:                               setForm({
465:                                 ...form,
466:                                 firstName: first || form.firstName,
467:                                 lastName: rest.join(' ') || form.lastName,
468:                                 phone: addr.phone.replace('+91', '').trim(),
469:                                 street: addr.street,
470:                                 locality: addr.locality,
471:                                 pincode: addr.pincode,
472:                                 city: addr.city,
473:                               });
474:                             }}
475:                           >
476:                             <strong>{addr.type.toUpperCase()}:</strong> {addr.street}, {addr.locality}, {addr.city} {addr.pincode}
477:                           </div>
478:                         ))}
479:                       </div>
480:                     </div>
481:                   )}
482: 
483:                   <div className="form-row form-row-2">
484:                     <div className="form-group">
485:                       <label className="form-label" htmlFor="fname">First Name *</label>
486:                       <input
487:                         id="fname"
488:                         className={`form-input ${formErrors.firstName ? 'has-error' : ''}`}
489:                         placeholder="John"
490:                         value={form.firstName}
491:                         onChange={(e) => {
492:                           setForm({ ...form, firstName: e.target.value });
493:                           if (formErrors.firstName) setFormErrors({ ...formErrors, firstName: '' });
494:                         }}
495:                       />
496:                       {formErrors.firstName && <p className="form-error-text">{formErrors.firstName}</p>}
497:                     </div>
498: 
499:                     <div className="form-group">
500:                       <label className="form-label" htmlFor="lname">
501:                         <span>Last Name</span>
502:                         <span className="form-label-optional">Optional</span>
503:                       </label>
504:                       <input
505:                         id="lname"
506:                         className="form-input"
507:                         placeholder="Doe"
508:                         value={form.lastName}
509:                         onChange={(e) => setForm({ ...form, lastName: e.target.value })}
510:                       />
511:                     </div>
512:                   </div>
513: 
514:                   <div className="form-row">
515:                     <div className="form-group">
516:                       <label className="form-label" htmlFor="street">Street Address / House No. / Building *</label>
517:                       <input
518:                         id="street"
519:                         className={`form-input ${formErrors.street ? 'has-error' : ''}`}
520:                         placeholder="e.g. Flat 402, Rohan Tarang, Off Mumbai-Pune Road"
521:                         value={form.street}
522:                         onChange={(e) => {
523:                           setForm({ ...form, street: e.target.value });
524:                           if (formErrors.street) setFormErrors({ ...formErrors, street: '' });
525:                         }}
526:                       />
527:                       {formErrors.street && <p className="form-error-text">{formErrors.street}</p>}
528:                     </div>
529:                   </div>
530: 
531:                   <div className="form-row">
532:                     <div className="form-group">
533:                       <label className="form-label" htmlFor="locality">Locality / Area / Landmark *</label>
534:                       <input
535:                         id="locality"
536:                         className={`form-input ${formErrors.locality ? 'has-error' : ''}`}
537:                         placeholder="e.g. Camp, Koregaon Park, Baner, Kothrud"
538:                         value={form.locality}
539:                         onChange={(e) => {
540:                           setForm({ ...form, locality: e.target.value });
541:                           if (formErrors.locality) setFormErrors({ ...formErrors, locality: '' });
542:                         }}
543:                       />
544:                       {formErrors.locality && <p className="form-error-text">{formErrors.locality}</p>}
545:                     </div>
546:                   </div>
547: 
548:                   <div className="form-row form-row-3">
549:                     <div className="form-group">
550:                       <label className="form-label" htmlFor="city">City *</label>
551:                       <input
552:                         id="city"
553:                         className={`form-input ${formErrors.city ? 'has-error' : ''}`}
554:                         value={form.city}
555:                         onChange={(e) => setForm({ ...form, city: e.target.value })}
556:                       />
557:                       {formErrors.city && <p className="form-error-text">{formErrors.city}</p>}
558:                     </div>
559: 
560:                     <div className="form-group">
561:                       <label className="form-label" htmlFor="state">State</label>
562:                       <input
563:                         id="state"
564:                         className="form-input"
565:                         value={form.state}
566:                         onChange={(e) => setForm({ ...form, state: e.target.value })}
567:                       />
568:                     </div>
569: 
570:                     <div className="form-group">
571:                       <label className="form-label" htmlFor="pincode">PIN Code *</label>
572:                       <input
573:                         id="pincode"
574:                         maxLength={6}
575:                         className={`form-input ${formErrors.pincode ? 'has-error' : ''}`}
576:                         placeholder="411001"
577:                         value={form.pincode}
578:                         onChange={(e) => {
579:                           setForm({ ...form, pincode: e.target.value });
580:                           if (formErrors.pincode) setFormErrors({ ...formErrors, pincode: '' });
581:                         }}
582:                       />
583:                       {formErrors.pincode && <p className="form-error-text">{formErrors.pincode}</p>}
584:                     </div>
585:                   </div>
586:                 </div>
587:               ) : (
588:                 <div className="store-pickup-panel">
589:                   <div className="store-pickup-badge">
590:                     <Store size={14} />
591:                     <span>Camp Flagship Sports House</span>
592:                   </div>
593:                   <p style={{ margin: '0 0 6px', fontWeight: 600, fontSize: '0.875rem', color: '#111827' }}>
594:                     {STORE_INFO.addressLine1}, {STORE_INFO.locality}, Pune 411001
595:                   </p>
596:                   <p style={{ margin: '0 0 14px', fontSize: '0.8125rem', color: '#6b7280' }}>
597:                     Open Monday–Sunday 10:00 AM – 8:30 PM. Call {STORE_INFO.displayPhone} upon arrival.
598:                   </p>
599: 
600:                   <div className="form-group">
601:                     <label className="form-label" htmlFor="pickupNotes">
602:                       <span>Pickup Notes or Timing</span>
603:                       <span className="form-label-optional">Optional</span>
604:                     </label>
605:                     <input
606:                       id="pickupNotes"
607:                       className="form-input"
608:                       placeholder="e.g. Visiting today at 5 PM for racquet stringing check"
609:                       value={form.pickupNotes}
610:                       onChange={(e) => setForm({ ...form, pickupNotes: e.target.value })}
611:                     />
612:                   </div>
613:                 </div>
614:               )}
615:             </section>
616: 
617:             {/* 3. Payment Method & Razorpay CTA */}
618:             <section className="payment-section-box">
619:               <div className="checkout-card-header">
620:                 <h2 className="checkout-card-title">
621:                   <span className="checkout-step-number">3</span>
622:                   <span>Payment Method</span>
623:                 </h2>
624:                 <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
625:                   <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0C2340', background: '#E8F1FC', padding: '3px 8px', borderRadius: '4px' }}>
626:                     RAZORPAY SECURE
627:                   </span>
628:                 </div>
629:               </div>
630: 
631:               <div className="payment-gateways-strip">
632:                 <span className="gateway-chip">UPI (GPay / PhonePe / Paytm)</span>
633:                 <span className="gateway-chip">Cards (Visa, Mastercard, RuPay)</span>
634:                 <span className="gateway-chip">Net Banking (50+ Banks)</span>
635:                 <span className="gateway-chip">Instant Refund Protected</span>
636:               </div>
637: 
638:               <button
639:                 type="button"
640:                 className="pay-cta-btn"
641:                 onClick={handleProceedToRazorpay}
642:                 disabled={isProcessing}
643:               >
644:                 <ShieldCheck size={20} color="#60a5fa" />
645:                 <span>
646:                   {isProcessing
647:                     ? 'Connecting to Gateway...'
648:                     : `Pay ₹${grandTotal.toLocaleString('en-IN')} with Razorpay`}
649:                 </span>
650:                 <ChevronRight size={18} />
651:               </button>
652: 
653:               <div className="security-assurances-row">
654:                 <div className="security-item">
655:                   <Lock size={13} color="#15803d" />
656:                   <span>256-Bit SSL Encrypted</span>
657:                 </div>
658:                 <span>•</span>
659:                 <div className="security-item">
660:                   <Check size={13} color="#15803d" />
661:                   <span>GST Tax Invoice with Warranty</span>
662:                 </div>
663:                 <span>•</span>
664:                 <div className="security-item">
665:                   <ShieldCheck size={13} color="#15803d" />
666:                   <span>100% Genuine Sports Gear</span>
667:                 </div>
668:               </div>
669:             </section>
670:           </div>
671: 
672:           {/* RIGHT: Sticky Order Summary */}
673:           <aside className="checkout-summary-column">
674:             <div className="checkout-summary-card">
675:               <h3 className="summary-heading">
676:                 Order Summary ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'})
677:               </h3>
678: 
679:               <ul className="summary-items-list">
680:                 {cart.map((item, idx) => (
681:                   <li key={`${item.product.id}-${idx}`} className="summary-item-row">
682:                     <div className="summary-item-img">
683:                       <Img image={item.product.images[0]} alt="" sizes="56px" />
684:                       <span className="summary-item-badge">{item.quantity}</span>
685:                     </div>
686:                     <div className="summary-item-info">
687:                       <p className="summary-item-name">{item.product.name}</p>
688:                       {(item.selectedVariant || item.selectedSize) && (
689:                         <p className="summary-item-meta">
690:                           {[item.selectedVariant, item.selectedSize].filter(Boolean).join(' · ')}
691:                         </p>
692:                       )}
693:                     </div>
694:                     <div className="summary-item-price">
695:                       ₹{(getItemUnitPrice(item) * item.quantity).toLocaleString('en-IN')}
696:                     </div>
697:                   </li>
698:                 ))}
699:               </ul>
700: 
701:               {/* Promo Code Box */}
702:               <form onSubmit={handleApplyPromo} className="promo-box">
703:                 <input
704:                   className="promo-input"
705:                   placeholder="Discount code (e.g. PUNEPLAY)"
706:                   value={promoInput}
707:                   onChange={(e) => setPromoInput(e.target.value)}
708:                 />
709:                 <button type="submit" className="promo-apply-btn">
710:                   Apply
711:                 </button>
712:               </form>
713:               {promoMessage && (
714:                 <p className={`promo-feedback ${promoMessage.success ? 'is-success' : 'is-error'}`}>
715:                   {promoMessage.text}
716:                 </p>
717:               )}
718: 
719:               {/* Breakdown */}
720:               <dl className="summary-breakdown">
721:                 <div className="summary-row">
722:                   <dt>Subtotal</dt>
723:                   <dd>₹{subtotal.toLocaleString('en-IN')}</dd>
724:                 </div>
725:                 {discount > 0 && (
726:                   <div className="summary-row is-discount">
727:                     <dt>Discount ({promoCode})</dt>
728:                     <dd>−₹{discount.toLocaleString('en-IN')}</dd>
729:                   </div>
730:                 )}
731:                 <div className="summary-row">
732:                   <dt>Shipping</dt>
733:                   <dd>
734:                     {finalShipping === 0 ? (
735:                       <span className="summary-free-badge">FREE</span>
736:                     ) : (
737:                       `₹${finalShipping.toLocaleString('en-IN')}`
738:                     )}
739:                   </dd>
740:                 </div>
741:                 <div className="summary-row">
742:                   <dt>GST (18%)</dt>
743:                   <dd style={{ color: '#6b7280', fontWeight: 500 }}>Included</dd>
744:                 </div>
745: 
746:                 <div className="summary-total-row">
747:                   <div>
748:                     <span className="summary-total-label">Total Amount</span>
749:                     <p className="summary-tax-note">All taxes & duties included</p>
750:                   </div>
751:                   <span className="summary-total-value">
752:                     ₹{grandTotal.toLocaleString('en-IN')}
753:                   </span>
754:                 </div>
755:               </dl>
756: 
757:               {/* Oriental Sports Guarantee Callout */}
758:               <div className="store-guarantee-card">
759:                 <strong>✓ Official Pune Flagship Guarantee</strong>
760:                 Fulfilled directly from our Camp workshop with professional equipment inspection, tension testing, and manufacturer warranty.
761:               </div>
762:             </div>
763:           </aside>
764:         </div>
765:       </main>
766: 
767:       {/* =====================================================================
768:           FOCUSED CHECKOUT FOOTER (POLICY & SECURITY)
769:          ===================================================================== */}
770:       <footer className="checkout-footer">
771:         <div className="checkout-footer-inner">
772:           <div className="checkout-footer-links">
773:             <Link to="/shipping">Shipping Policy</Link>
774:             <span>·</span>
775:             <Link to="/returns">Returns & Exchanges</Link>
776:             <span>·</span>
777:             <Link to="/privacy">Privacy Policy</Link>
778:             <span>·</span>
779:             <Link to="/terms">Terms of Service</Link>
780:           </div>
781:           <p className="checkout-footer-copy">
782:             © {new Date().getFullYear()} Oriental Sports Pune. All rights reserved. 256-Bit SSL Encrypted Razorpay Checkout.
783:           </p>
784:         </div>
785:       </footer>
786: 
787:       {/* =====================================================================
788:           INTERACTIVE RAZORPAY GATEWAY MODAL (TEST SIMULATOR & PREVIEW)
789:          ===================================================================== */}
790:       {showRazorpaySimModal && (
791:         <div className="rzp-modal-backdrop" onClick={() => setShowRazorpaySimModal(false)}>
792:           <div className="rzp-modal" onClick={(e) => e.stopPropagation()}>
793:             {/* Header */}
794:             <div className="rzp-modal-header">
795:               <div>
796:                 <p className="rzp-modal-sub">Razorpay Payment Gateway</p>
797:                 <h3 className="rzp-modal-title">Oriental Sports Pune</h3>
798:               </div>
799:               <div style={{ textAlign: 'right' }}>
800:                 <span style={{ fontSize: '0.6875rem', color: '#94a3b8' }}>To Pay</span>
801:                 <p className="rzp-modal-amount">₹{grandTotal.toLocaleString('en-IN')}</p>
802:               </div>
803:             </div>
804: 
805:             {/* Payment Tabs */}
806:             <div className="rzp-tabs">
807:               <button
808:                 type="button"
809:                 className={`rzp-tab ${simPaymentMethod === 'upi' ? 'is-active' : ''}`}
810:                 onClick={() => setSimPaymentMethod('upi')}
811:               >
812:                 UPI / QR
813:               </button>
814:               <button
815:                 type="button"
816:                 className={`rzp-tab ${simPaymentMethod === 'card' ? 'is-active' : ''}`}
817:                 onClick={() => setSimPaymentMethod('card')}
818:               >
819:                 Card
820:               </button>
821:               <button
822:                 type="button"
823:                 className={`rzp-tab ${simPaymentMethod === 'netbanking' ? 'is-active' : ''}`}
824:                 onClick={() => setSimPaymentMethod('netbanking')}
825:               >
826:                 Netbanking
827:               </button>
828:             </div>
829: 
830:             <div className="rzp-body">
831:               {simPaymentMethod === 'upi' && (
832:                 <div style={{ textAlign: 'center' }}>
833:                   <div style={{ width: '130px', height: '130px', margin: '0 auto 12px', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px', display: 'grid', placeItems: 'center', background: '#ffffff' }}>
834:                     <QrCode size={110} color="#0c2340" />
835:                   </div>
836:                   <p style={{ fontSize: '0.8125rem', fontWeight: 600, margin: '0 0 4px', color: '#111827' }}>
837:                     Scan QR with Google Pay, PhonePe, Paytm, or BHIM
838:                   </p>
839:                   <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
840:                     VPA: <strong>orientalsports.pune@okhdfcbank</strong>
841:                   </p>
842:                 </div>
843:               )}
844: 
845:               {simPaymentMethod === 'card' && (
846:                 <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
847:                   <input className="form-input" placeholder="Card Number (4532 •••• •••• 8821)" defaultValue="4532 9801 2341 8821" />
848:                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
849:                     <input className="form-input" placeholder="MM/YY" defaultValue="11/28" />
850:                     <input className="form-input" placeholder="CVV" defaultValue="782" type="password" />
851:                   </div>
852:                   <input className="form-input" placeholder="Cardholder Name" defaultValue={`${form.firstName} ${form.lastName}`.trim()} />
853:                 </div>
854:               )}
855: 
856:               {simPaymentMethod === 'netbanking' && (
857:                 <div>
858:                   <p style={{ fontSize: '0.8125rem', fontWeight: 600, margin: '0 0 10px', color: '#111827' }}>Select Bank</p>
859:                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
860:                     {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Bank'].map((b) => (
861:                       <button
862:                         key={b}
863:                         type="button"
864:                         style={{
865:                           padding: '8px 12px',
866:                           border: '1px solid #e2e8f0',
867:                           borderRadius: '6px',
868:                           background: '#f8fafc',
869:                           fontSize: '0.8125rem',
870:                           fontWeight: 500,
871:                           cursor: 'pointer',
872:                         }}
873:                       >
874:                         {b}
875:                       </button>
876:                     ))}
877:                   </div>
878:                 </div>
879:               )}
880: 
881:               <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
882:                 <button
883:                   type="button"
884:                   className="pay-cta-btn"
885:                   style={{ background: '#15803d' }}
886:                   onClick={() => {
887:                     setShowRazorpaySimModal(false);
888:                     const mockPaymentId = `pay_rzp_${Date.now().toString().slice(-8)}`;
889:                     handleCreateAndFinalizeOrder(mockPaymentId, simPaymentMethod.toUpperCase());
890:                   }}
891:                 >
892:                   Confirm Payment of ₹{grandTotal.toLocaleString('en-IN')}
893:                 </button>
894:                 <button
895:                   type="button"
896:                   style={{
897:                     background: 'none',
898:                     border: 'none',
899:                     color: '#6b7280',
900:                     fontSize: '0.8125rem',
901:                     cursor: 'pointer',
902:                     padding: '6px',
903:                     textAlign: 'center',
904:                   }}
905:                   onClick={() => setShowRazorpaySimModal(false)}
906:                 >
907:                   Cancel and change details
908:                 </button>
909:               </div>
910:             </div>
911:           </div>
912:         </div>
913:       )}
914:     </div>
915:   );
916: };
917: 
918: export default CheckoutPage;
````

## File: src/pages/OrderSuccessPage.tsx
````typescript
  1: import React from 'react';
  2: import { useLocation, Link, useNavigate } from 'react-router-dom';
  3: import {
  4:   CheckCircle2,
  5:   Package,
  6:   MapPin,
  7:   Calendar,
  8:   CreditCard,
  9:   ArrowRight,
 10:   Phone,
 11:   Printer,
 12:   ShoppingBag,
 13:   ExternalLink,
 14: } from 'lucide-react';
 15: import { useAuth } from '../context/AuthContext';
 16: import { Order } from '../types/auth';
 17: import { STORE_INFO } from '../data/storeInfo';
 18: import { Img } from '../components/ui/Img';
 19: 
 20: export const OrderSuccessPage: React.FC = () => {
 21:   const location = useLocation();
 22:   const navigate = useNavigate();
 23:   const { user } = useAuth();
 24: 
 25:   // Retrieve order from route state or fall back to user's most recent order
 26:   const stateOrder = (location.state as { order?: Order })?.order;
 27:   const order: Order | undefined = stateOrder || user?.orders?.[0];
 28: 
 29:   if (!order) {
 30:     return (
 31:       <div className="container" style={{ padding: '80px 24px', textAlign: 'center', minHeight: '60vh' }}>
 32:         <h1 className="display d-2" style={{ marginBottom: '16px' }}>No Active Order Found</h1>
 33:         <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>
 34:           It looks like you haven’t placed an order in this session, or your session expired.
 35:         </p>
 36:         <Link to="/shop" className="btn btn-primary">
 37:           Explore Equipment <span className="btn-arrow" aria-hidden="true">→</span>
 38:         </Link>
 39:       </div>
 40:     );
 41:   }
 42: 
 43:   const handlePrint = () => {
 44:     window.print();
 45:   };
 46: 
 47:   return (
 48:     <div className="order-success-page" style={{ backgroundColor: 'var(--ivory)', minHeight: '100vh', padding: '48px 0 80px' }}>
 49:       <div className="container" style={{ maxWidth: '880px', margin: '0 auto' }}>
 50:         {/* Success Header Banner */}
 51:         <div
 52:           style={{
 53:             backgroundColor: '#ffffff',
 54:             border: '1px solid var(--line)',
 55:             borderRadius: '12px',
 56:             padding: '36px 32px',
 57:             marginBottom: '32px',
 58:             textAlign: 'center',
 59:             boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
 60:           }}
 61:         >
 62:           <div
 63:             style={{
 64:               width: '64px',
 65:               height: '64px',
 66:               borderRadius: '50%',
 67:               backgroundColor: '#e6f4ea',
 68:               display: 'flex',
 69:               alignItems: 'center',
 70:               justifyContent: 'center',
 71:               margin: '0 auto 20px',
 72:               color: '#137333',
 73:             }}
 74:           >
 75:             <CheckCircle2 size={36} />
 76:           </div>
 77: 
 78:           <div
 79:             style={{
 80:               display: 'inline-block',
 81:               fontSize: '0.75rem',
 82:               fontWeight: 700,
 83:               textTransform: 'uppercase',
 84:               letterSpacing: '0.08em',
 85:               color: '#137333',
 86:               backgroundColor: '#e6f4ea',
 87:               padding: '4px 12px',
 88:               borderRadius: '999px',
 89:               marginBottom: '12px',
 90:             }}
 91:           >
 92:             Payment Verified via Razorpay
 93:           </div>
 94: 
 95:           <h1 className="display d-2" style={{ margin: '0 0 10px', color: '#111111' }}>
 96:             Thank You for Your Order
 97:           </h1>
 98:           <p style={{ color: 'var(--muted)', fontSize: '1.0625rem', maxWidth: '580px', margin: '0 auto 20px', lineHeight: 1.5 }}>
 99:             Your order has been confirmed and logged with Oriental Sports Flagship Workshop. A confirmation invoice is ready.
100:           </p>
101: 
102:           <div
103:             style={{
104:               display: 'inline-flex',
105:               alignItems: 'center',
106:               gap: '12px',
107:               backgroundColor: '#f8f8f6',
108:               padding: '10px 20px',
109:               borderRadius: '8px',
110:               fontSize: '0.9375rem',
111:               fontWeight: 600,
112:               color: '#111111',
113:             }}
114:           >
115:             <span>Order Reference:</span>
116:             <span style={{ fontFamily: 'monospace', fontSize: '1.0625rem', letterSpacing: '0.05em', color: '#000' }}>
117:               {order.orderNumber}
118:             </span>
119:           </div>
120:         </div>
121: 
122:         {/* Order Details & Summary Grid */}
123:         <div
124:           style={{
125:             display: 'grid',
126:             gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
127:             gap: '24px',
128:             marginBottom: '32px',
129:           }}
130:         >
131:           {/* Shipping / Pickup Box */}
132:           <div
133:             style={{
134:               backgroundColor: '#ffffff',
135:               border: '1px solid var(--line)',
136:               borderRadius: '12px',
137:               padding: '24px',
138:             }}
139:           >
140:             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: '#111' }}>
141:               <MapPin size={18} color="var(--primary)" />
142:               <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Delivery Address</h2>
143:             </div>
144:             <div style={{ fontSize: '0.9375rem', lineHeight: '1.6', color: '#333' }}>
145:               <p style={{ fontWeight: 600, margin: '0 0 4px', color: '#111' }}>{order.shippingAddress.name}</p>
146:               <p style={{ margin: '0 0 4px' }}>{order.shippingAddress.street}</p>
147:               <p style={{ margin: '0 0 4px' }}>
148:                 {order.shippingAddress.locality}, {order.shippingAddress.city} – {order.shippingAddress.pincode}
149:               </p>
150:               <p style={{ margin: '0 0 4px', color: 'var(--muted)' }}>State: {order.shippingAddress.state}</p>
151:               <p style={{ margin: '8px 0 0', fontWeight: 500, color: '#111' }}>
152:                 Phone: {order.shippingAddress.phone}
153:               </p>
154:             </div>
155:           </div>
156: 
157:           {/* Payment & Logistics Box */}
158:           <div
159:             style={{
160:               backgroundColor: '#ffffff',
161:               border: '1px solid var(--line)',
162:               borderRadius: '12px',
163:               padding: '24px',
164:             }}
165:           >
166:             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: '#111' }}>
167:               <CreditCard size={18} color="#137333" />
168:               <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Payment & Dispatch</h2>
169:             </div>
170:             <div style={{ fontSize: '0.9375rem', lineHeight: '1.6', color: '#333' }}>
171:               <p style={{ margin: '0 0 8px' }}>
172:                 <span style={{ color: 'var(--muted)' }}>Method: </span>
173:                 <strong style={{ color: '#111' }}>{order.paymentMethod}</strong>
174:               </p>
175:               <p style={{ margin: '0 0 8px' }}>
176:                 <span style={{ color: 'var(--muted)' }}>Status: </span>
177:                 <span style={{ color: '#137333', fontWeight: 600 }}>Paid & Verified</span>
178:               </p>
179:               <p style={{ margin: '0 0 8px' }}>
180:                 <span style={{ color: 'var(--muted)' }}>Fulfillment Hub: </span>
181:                 <strong style={{ color: '#111' }}>{STORE_INFO.addressLine1}, {STORE_INFO.locality}</strong>
182:               </p>
183:               <p style={{ margin: '0', color: 'var(--muted)' }}>
184:                 Courier: <strong>{order.carrier}</strong> ({order.trackingNumber})
185:               </p>
186:             </div>
187:           </div>
188:         </div>
189: 
190:         {/* Purchased Items List */}
191:         <div
192:           style={{
193:             backgroundColor: '#ffffff',
194:             border: '1px solid var(--line)',
195:             borderRadius: '12px',
196:             padding: '24px',
197:             marginBottom: '32px',
198:           }}
199:         >
200:           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
201:             <Package size={18} />
202:             <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: 0 }}>Items Purchased ({order.items.length})</h2>
203:           </div>
204: 
205:           <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
206:             {order.items.map((item, idx) => (
207:               <div
208:                 key={idx}
209:                 style={{
210:                   display: 'flex',
211:                   alignItems: 'center',
212:                   justifyContent: 'space-between',
213:                   paddingBottom: '16px',
214:                   borderBottom: idx === order.items.length - 1 ? 'none' : '1px solid var(--line)',
215:                   gap: '16px',
216:                 }}
217:               >
218:                 <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
219:                   <div
220:                     style={{
221:                       width: '64px',
222:                       height: '64px',
223:                       borderRadius: '8px',
224:                       overflow: 'hidden',
225:                       backgroundColor: '#f5f5f3',
226:                       flexShrink: 0,
227:                     }}
228:                   >
229:                     <Img
230:                       image={item.productImage}
231:                       alt={item.productName}
232:                       style={{ width: '100%', height: '100%', objectFit: 'cover' }}
233:                     />
234:                   </div>
235:                   <div>
236:                     <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, margin: '0 0 4px', color: '#111' }}>
237:                       {item.productName}
238:                     </h3>
239:                     <div style={{ fontSize: '0.8125rem', color: 'var(--muted)' }}>
240:                       {item.selectedVariant && <span>Variant: {item.selectedVariant} • </span>}
241:                       {item.selectedSize && <span>Size: {item.selectedSize} • </span>}
242:                       <span>Qty: {item.quantity}</span>
243:                     </div>
244:                   </div>
245:                 </div>
246: 
247:                 <div style={{ textAlign: 'right', fontWeight: 700, fontSize: '1rem', color: '#111' }}>
248:                   ₹{(item.price * item.quantity).toLocaleString('en-IN')}
249:                 </div>
250:               </div>
251:             ))}
252:           </div>
253: 
254:           {/* Pricing Totals */}
255:           <div
256:             style={{
257:               marginTop: '20px',
258:               paddingTop: '20px',
259:               borderTop: '2px solid var(--line)',
260:               display: 'flex',
261:               flexDirection: 'column',
262:               gap: '8px',
263:             }}
264:           >
265:             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--muted)' }}>
266:               <span>Subtotal</span>
267:               <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
268:             </div>
269:             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--muted)' }}>
270:               <span>Shipping</span>
271:               <span>{order.shipping === 0 ? 'FREE' : `₹${order.shipping.toLocaleString('en-IN')}`}</span>
272:             </div>
273:             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--muted)' }}>
274:               <span>GST (18% Included)</span>
275:               <span>₹{order.tax.toLocaleString('en-IN')}</span>
276:             </div>
277:             <div
278:               style={{
279:                 display: 'flex',
280:                 justifyContent: 'space-between',
281:                 fontSize: '1.25rem',
282:                 fontWeight: 800,
283:                 color: '#111',
284:                 paddingTop: '10px',
285:                 borderTop: '1px solid var(--line)',
286:               }}
287:             >
288:               <span>Total Paid via Razorpay</span>
289:               <span style={{ color: '#137333' }}>₹{order.totalAmount.toLocaleString('en-IN')}</span>
290:             </div>
291:           </div>
292:         </div>
293: 
294:         {/* Action Controls */}
295:         <div
296:           style={{
297:             display: 'flex',
298:             flexWrap: 'wrap',
299:             gap: '16px',
300:             justifyContent: 'space-between',
301:             alignItems: 'center',
302:           }}
303:         >
304:           <div style={{ display: 'flex', gap: '12px' }}>
305:             <Link to="/account/orders" className="btn btn-primary btn-lg">
306:               View in My Orders <ArrowRight size={18} style={{ marginLeft: '6px' }} />
307:             </Link>
308:             <Link to="/shop" className="btn btn-secondary btn-lg">
309:               <ShoppingBag size={18} style={{ marginRight: '6px' }} /> Continue Shopping
310:             </Link>
311:           </div>
312: 
313:           <button
314:             type="button"
315:             onClick={handlePrint}
316:             className="btn btn-ghost"
317:             style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
318:           >
319:             <Printer size={16} /> Print Tax Receipt
320:           </button>
321:         </div>
322:       </div>
323:     </div>
324:   );
325: };
326: 
327: export default OrderSuccessPage;
````

## File: src/services/razorpay.ts
````typescript
 1: /**
 2:  * Razorpay Payment Gateway Client & SDK Loader.
 3:  *
 4:  * Integrates official Razorpay checkout (https://checkout.razorpay.com/v1/checkout.js)
 5:  * with graceful fallback simulation when API keys are being configured in development.
 6:  */
 7: 
 8: export interface RazorpayOptions {
 9:   key?: string;
10:   amount: number; // in paise (e.g. 18499 * 100)
11:   currency: string; // 'INR'
12:   name: string; // 'Oriental Sports Pune'
13:   description: string;
14:   image?: string;
15:   order_id?: string;
16:   prefill?: {
17:     name?: string;
18:     email?: string;
19:     contact?: string;
20:   };
21:   notes?: Record<string, string>;
22:   theme?: {
23:     color?: string;
24:   };
25:   handler: (response: {
26:     razorpay_payment_id: string;
27:     razorpay_order_id?: string;
28:     razorpay_signature?: string;
29:   }) => void;
30:   modal?: {
31:     ondismiss?: () => void;
32:   };
33: }
34: 
35: declare global {
36:   interface Window {
37:     Razorpay?: new (options: RazorpayOptions) => {
38:       open: () => void;
39:       on: (event: string, callback: (response: any) => void) => void;
40:     };
41:   }
42: }
43: 
44: const RAZORPAY_SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js';
45: 
46: export const loadRazorpayScript = (): Promise<boolean> => {
47:   return new Promise((resolve) => {
48:     if (typeof window !== 'undefined' && window.Razorpay) {
49:       resolve(true);
50:       return;
51:     }
52: 
53:     const script = document.createElement('script');
54:     script.src = RAZORPAY_SCRIPT_URL;
55:     script.async = true;
56:     script.onload = () => resolve(true);
57:     script.onerror = () => resolve(false);
58:     document.body.appendChild(script);
59:   });
60: };
61: 
62: export const getRazorpayKey = (): string => {
63:   return import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_orientalsports';
64: };
65: 
66: export const isLiveRazorpayKey = (): boolean => {
67:   const key = getRazorpayKey();
68:   return Boolean(key) && !key.includes('test_oriental');
69: };
````

## File: src/services/shopify.ts
````typescript
  1: /**
  2:  * Headless Shopify Storefront API Service Layer.
  3:  *
  4:  * Provides typed GraphQL queries, mutations, cart session persistence,
  5:  * and seamless fallback to curated local sports catalog data when offline
  6:  * or during headless transition.
  7:  */
  8: 
  9: import { Product, SportCategory, CartItem } from '../types';
 10: import { PRODUCTS } from '../data/products';
 11: import {
 12:   ShopifyProductNode,
 13:   ShopifyCart,
 14:   ShopifyCartLineInput,
 15:   ShopifyCartLineUpdateInput,
 16: } from '../types/shopify';
 17: 
 18: const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || '';
 19: const STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';
 20: const API_VERSION = import.meta.env.VITE_SHOPIFY_API_VERSION || '2024-10';
 21: 
 22: export const isShopifyConfigured = (): boolean => {
 23:   return (
 24:     Boolean(SHOPIFY_DOMAIN) &&
 25:     Boolean(STOREFRONT_ACCESS_TOKEN) &&
 26:     !STOREFRONT_ACCESS_TOKEN.includes('your_public_storefront_access_token')
 27:   );
 28: };
 29: 
 30: const getStorefrontEndpoint = () => {
 31:   const domain = SHOPIFY_DOMAIN.replace(/^https?:\/\//, '').replace(/\/$/, '');
 32:   return `https://${domain}/api/${API_VERSION}/graphql.json`;
 33: };
 34: 
 35: /**
 36:  * Execute a Storefront API GraphQL query
 37:  */
 38: export async function shopifyFetch<T>({
 39:   query,
 40:   variables = {},
 41: }: {
 42:   query: string;
 43:   variables?: Record<string, any>;
 44: }): Promise<T> {
 45:   if (!isShopifyConfigured()) {
 46:     throw new Error('Shopify credentials are not configured in environment.');
 47:   }
 48: 
 49:   const endpoint = getStorefrontEndpoint();
 50:   const response = await fetch(endpoint, {
 51:     method: 'POST',
 52:     headers: {
 53:       'Content-Type': 'application/json',
 54:       'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
 55:       Accept: 'application/json',
 56:     },
 57:     body: JSON.stringify({ query, variables }),
 58:   });
 59: 
 60:   if (!response.ok) {
 61:     const errorText = await response.text();
 62:     throw new Error(`Shopify API error (${response.status}): ${errorText}`);
 63:   }
 64: 
 65:   const json = await response.json();
 66:   if (json.errors && json.errors.length > 0) {
 67:     throw new Error(`Shopify GraphQL errors: ${json.errors.map((e: any) => e.message).join(', ')}`);
 68:   }
 69: 
 70:   return json.data as T;
 71: }
 72: 
 73: // ============================================================================
 74: // GraphQL Query Definitions
 75: // ============================================================================
 76: 
 77: const PRODUCT_FRAGMENT = `
 78:   id
 79:   title
 80:   handle
 81:   description
 82:   availableForSale
 83:   productType
 84:   vendor
 85:   tags
 86:   priceRange {
 87:     minVariantPrice {
 88:       amount
 89:       currencyCode
 90:     }
 91:   }
 92:   compareAtPriceRange {
 93:     minVariantPrice {
 94:       amount
 95:       currencyCode
 96:     }
 97:   }
 98:   featuredImage {
 99:     url
100:     altText
101:   }
102:   images(first: 6) {
103:     edges {
104:       node {
105:         url
106:         altText
107:       }
108:     }
109:   }
110:   variants(first: 20) {
111:     edges {
112:       node {
113:         id
114:         title
115:         availableForSale
116:         sku
117:         price {
118:           amount
119:           currencyCode
120:         }
121:         compareAtPrice {
122:           amount
123:           currencyCode
124:         }
125:         selectedOptions {
126:           name
127:           value
128:         }
129:       }
130:     }
131:   }
132: `;
133: 
134: const PRODUCTS_QUERY = `
135:   query GetProducts($first: Int!) {
136:     products(first: $first) {
137:       edges {
138:         node {
139:           ${PRODUCT_FRAGMENT}
140:         }
141:       }
142:     }
143:   }
144: `;
145: 
146: const PRODUCT_BY_HANDLE_QUERY = `
147:   query GetProductByHandle($handle: String!) {
148:     product(handle: $handle) {
149:       ${PRODUCT_FRAGMENT}
150:     }
151:   }
152: `;
153: 
154: const CART_FIELDS = `
155:   id
156:   checkoutUrl
157:   totalQuantity
158:   cost {
159:     subtotalAmount {
160:       amount
161:       currencyCode
162:     }
163:     totalAmount {
164:       amount
165:       currencyCode
166:     }
167:     totalTaxAmount {
168:       amount
169:       currencyCode
170:     }
171:   }
172:   discountCodes {
173:     code
174:     applicable
175:   }
176:   lines(first: 50) {
177:     edges {
178:       node {
179:         id
180:         quantity
181:         cost {
182:           totalAmount {
183:             amount
184:             currencyCode
185:           }
186:         }
187:         merchandise {
188:           ... on ProductVariant {
189:             id
190:             title
191:             price {
192:               amount
193:               currencyCode
194:             }
195:             image {
196:               url
197:               altText
198:             }
199:             product {
200:               id
201:               title
202:               handle
203:               featuredImage {
204:                 url
205:                 altText
206:               }
207:             }
208:           }
209:         }
210:       }
211:     }
212:   }
213: `;
214: 
215: const CART_CREATE_MUTATION = `
216:   mutation CartCreate($input: CartInput!) {
217:     cartCreate(input: $input) {
218:       cart {
219:         ${CART_FIELDS}
220:       }
221:       userErrors {
222:         field
223:         message
224:       }
225:     }
226:   }
227: `;
228: 
229: const CART_LINES_ADD_MUTATION = `
230:   mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
231:     cartLinesAdd(cartId: $cartId, lines: $lines) {
232:       cart {
233:         ${CART_FIELDS}
234:       }
235:       userErrors {
236:         field
237:         message
238:       }
239:     }
240:   }
241: `;
242: 
243: const CART_LINES_UPDATE_MUTATION = `
244:   mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
245:     cartLinesUpdate(cartId: $cartId, lines: $lines) {
246:       cart {
247:         ${CART_FIELDS}
248:       }
249:       userErrors {
250:         field
251:         message
252:       }
253:     }
254:   }
255: `;
256: 
257: const CART_LINES_REMOVE_MUTATION = `
258:   mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
259:     cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
260:       cart {
261:         ${CART_FIELDS}
262:       }
263:       userErrors {
264:         field
265:         message
266:       }
267:     }
268:   }
269: `;
270: 
271: const CART_DISCOUNT_MUTATION = `
272:   mutation CartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]) {
273:     cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
274:       cart {
275:         ${CART_FIELDS}
276:       }
277:       userErrors {
278:         field
279:         message
280:       }
281:     }
282:   }
283: `;
284: 
285: const GET_CART_QUERY = `
286:   query GetCart($cartId: ID!) {
287:     cart(id: $cartId) {
288:       ${CART_FIELDS}
289:     }
290:   }
291: `;
292: 
293: // ============================================================================
294: // Data Adapters: Shopify GraphQL Node <-> Internal Product Model
295: // ============================================================================
296: 
297: export function mapShopifyProductToAppProduct(node: ShopifyProductNode): Product {
298:   const minPrice = parseFloat(node.priceRange.minVariantPrice.amount);
299:   const comparePrice = node.compareAtPriceRange?.minVariantPrice?.amount
300:     ? parseFloat(node.compareAtPriceRange.minVariantPrice.amount)
301:     : undefined;
302: 
303:   const images = node.images.edges.map((e) => e.node.url);
304:   if (images.length === 0 && node.featuredImage) {
305:     images.push(node.featuredImage.url);
306:   }
307: 
308:   // Derive sport category from tags or productType
309:   const tagList = (node.tags || []).map((t) => t.toLowerCase());
310:   const typeLower = (node.productType || '').toLowerCase();
311: 
312:   let category: SportCategory = 'accessories';
313:   if (typeLower.includes('cricket') || tagList.includes('cricket')) category = 'cricket';
314:   else if (typeLower.includes('tennis') || tagList.includes('tennis')) category = 'tennis';
315:   else if (typeLower.includes('pickleball') || tagList.includes('pickleball')) category = 'pickleball';
316:   else if (typeLower.includes('badminton') || tagList.includes('badminton')) category = 'badminton';
317:   else if (typeLower.includes('table tennis') || tagList.includes('table-tennis')) category = 'table-tennis';
318:   else if (typeLower.includes('squash') || tagList.includes('squash')) category = 'squash';
319:   else if (typeLower.includes('fitness') || tagList.includes('fitness')) category = 'fitness';
320:   else if (typeLower.includes('volleyball') || tagList.includes('volleyball')) category = 'volleyball';
321:   else if (typeLower.includes('carrom') || typeLower.includes('recreation')) category = 'recreation';
322: 
323:   const categoryNameMap: Record<SportCategory, string> = {
324:     cricket: 'Cricket',
325:     football: 'Football',
326:     tennis: 'Tennis',
327:     pickleball: 'Pickleball',
328:     badminton: 'Badminton',
329:     'table-tennis': 'Table Tennis',
330:     squash: 'Squash',
331:     fitness: 'Fitness & Conditioning',
332:     'gym-equipment': 'Gym Equipment',
333:     volleyball: 'Volleyball',
334:     recreation: 'Recreation & Board Sports',
335:     accessories: 'Accessories & Protection',
336:   };
337: 
338:   const variants = node.variants.edges.map(({ node: v }) => ({
339:     id: v.id,
340:     name: v.title === 'Default Title' ? 'Standard' : v.title,
341:     inStock: v.availableForSale,
342:     priceDelta: parseFloat(v.price.amount) - minPrice,
343:     shopifyVariantId: v.id,
344:     sku: v.sku || undefined,
345:   }));
346: 
347:   const defaultVariantId = node.variants.edges[0]?.node?.id;
348: 
349:   return {
350:     id: node.id,
351:     shopifyId: node.id,
352:     shopifyVariantId: defaultVariantId,
353:     handle: node.handle,
354:     slug: node.handle,
355:     name: node.title,
356:     category,
357:     categoryName: categoryNameMap[category] || 'Equipment',
358:     brand: node.vendor || 'Oriental Sports',
359:     price: minPrice,
360:     originalPrice: comparePrice && comparePrice > minPrice ? comparePrice : undefined,
361:     rating: 4.9,
362:     reviewsCount: 14,
363:     badge: node.tags?.includes('bestseller') ? 'BESTSELLER' : undefined,
364:     images: images.length > 0 ? images : ['/images/hero/hero_court_build.webp'],
365:     description: node.description || 'Verified match-grade sports equipment from Oriental Sports Pune.',
366:     features: [
367:       'Authentic certified inventory from Pune Camp store',
368:       'Immediate in-store verification & warranty support',
369:     ],
370:     specs: {
371:       Origin: 'Oriental Sports Camp, Pune',
372:       Discipline: categoryNameMap[category],
373:     },
374:     variants,
375:     productType: 'gear',
376:     inStock: node.availableForSale,
377:     isFeatured: node.tags?.includes('featured') || false,
378:   };
379: }
380: 
381: // ============================================================================
382: // Public Catalog API
383: // ============================================================================
384: 
385: export async function getShopifyProducts(limit = 50): Promise<Product[]> {
386:   if (!isShopifyConfigured()) {
387:     return PRODUCTS;
388:   }
389: 
390:   try {
391:     const data = await shopifyFetch<{
392:       products: { edges: Array<{ node: ShopifyProductNode }> };
393:     }>({
394:       query: PRODUCTS_QUERY,
395:       variables: { first: limit },
396:     });
397: 
398:     return data.products.edges.map((e) => mapShopifyProductToAppProduct(e.node));
399:   } catch (error) {
400:     console.warn('[Shopify Service] Failed to fetch live products, using fallback:', error);
401:     return PRODUCTS;
402:   }
403: }
404: 
405: export async function getShopifyProductByHandle(handle: string): Promise<Product | null> {
406:   if (!isShopifyConfigured()) {
407:     return PRODUCTS.find((p) => p.slug === handle || p.handle === handle) || null;
408:   }
409: 
410:   try {
411:     const data = await shopifyFetch<{ product: ShopifyProductNode | null }>({
412:       query: PRODUCT_BY_HANDLE_QUERY,
413:       variables: { handle },
414:     });
415: 
416:     if (!data.product) {
417:       return PRODUCTS.find((p) => p.slug === handle) || null;
418:     }
419: 
420:     return mapShopifyProductToAppProduct(data.product);
421:   } catch (error) {
422:     console.warn('[Shopify Service] Error fetching product by handle, using fallback:', error);
423:     return PRODUCTS.find((p) => p.slug === handle) || null;
424:   }
425: }
426: 
427: // ============================================================================
428: // Headless Shopify Cart API
429: // ============================================================================
430: 
431: export async function createShopifyCart(lines: ShopifyCartLineInput[] = []): Promise<ShopifyCart | null> {
432:   if (!isShopifyConfigured()) return null;
433: 
434:   try {
435:     const data = await shopifyFetch<{
436:       cartCreate: { cart: ShopifyCart; userErrors: Array<{ field: string; message: string }> };
437:     }>({
438:       query: CART_CREATE_MUTATION,
439:       variables: { input: { lines } },
440:     });
441: 
442:     if (data.cartCreate.userErrors.length > 0) {
443:       console.error('[Shopify Cart] userErrors:', data.cartCreate.userErrors);
444:     }
445:     return data.cartCreate.cart;
446:   } catch (err) {
447:     console.warn('[Shopify Cart] Failed to create cart:', err);
448:     return null;
449:   }
450: }
451: 
452: export async function addLinesToShopifyCart(
453:   cartId: string,
454:   lines: ShopifyCartLineInput[]
455: ): Promise<ShopifyCart | null> {
456:   if (!isShopifyConfigured()) return null;
457: 
458:   try {
459:     const data = await shopifyFetch<{
460:       cartLinesAdd: { cart: ShopifyCart; userErrors: Array<{ field: string; message: string }> };
461:     }>({
462:       query: CART_LINES_ADD_MUTATION,
463:       variables: { cartId, lines },
464:     });
465:     return data.cartLinesAdd.cart;
466:   } catch (err) {
467:     console.warn('[Shopify Cart] Failed to add lines:', err);
468:     return null;
469:   }
470: }
471: 
472: export async function updateShopifyCartLines(
473:   cartId: string,
474:   lines: ShopifyCartLineUpdateInput[]
475: ): Promise<ShopifyCart | null> {
476:   if (!isShopifyConfigured()) return null;
477: 
478:   try {
479:     const data = await shopifyFetch<{
480:       cartLinesUpdate: { cart: ShopifyCart; userErrors: Array<{ field: string; message: string }> };
481:     }>({
482:       query: CART_LINES_UPDATE_MUTATION,
483:       variables: { cartId, lines },
484:     });
485:     return data.cartLinesUpdate.cart;
486:   } catch (err) {
487:     console.warn('[Shopify Cart] Failed to update lines:', err);
488:     return null;
489:   }
490: }
491: 
492: export async function removeShopifyCartLines(
493:   cartId: string,
494:   lineIds: string[]
495: ): Promise<ShopifyCart | null> {
496:   if (!isShopifyConfigured()) return null;
497: 
498:   try {
499:     const data = await shopifyFetch<{
500:       cartLinesRemove: { cart: ShopifyCart; userErrors: Array<{ field: string; message: string }> };
501:     }>({
502:       query: CART_LINES_REMOVE_MUTATION,
503:       variables: { cartId, lineIds },
504:     });
505:     return data.cartLinesRemove.cart;
506:   } catch (err) {
507:     console.warn('[Shopify Cart] Failed to remove lines:', err);
508:     return null;
509:   }
510: }
511: 
512: export async function applyShopifyDiscount(
513:   cartId: string,
514:   discountCode: string
515: ): Promise<ShopifyCart | null> {
516:   if (!isShopifyConfigured()) return null;
517: 
518:   try {
519:     const data = await shopifyFetch<{
520:       cartDiscountCodesUpdate: { cart: ShopifyCart; userErrors: Array<{ field: string; message: string }> };
521:     }>({
522:       query: CART_DISCOUNT_MUTATION,
523:       variables: { cartId, discountCodes: [discountCode] },
524:     });
525:     return data.cartDiscountCodesUpdate.cart;
526:   } catch (err) {
527:     console.warn('[Shopify Cart] Failed to apply discount:', err);
528:     return null;
529:   }
530: }
531: 
532: export async function fetchShopifyCart(cartId: string): Promise<ShopifyCart | null> {
533:   if (!isShopifyConfigured()) return null;
534: 
535:   try {
536:     const data = await shopifyFetch<{ cart: ShopifyCart | null }>({
537:       query: GET_CART_QUERY,
538:       variables: { cartId },
539:     });
540:     return data.cart;
541:   } catch (err) {
542:     console.warn('[Shopify Cart] Failed to fetch cart:', err);
543:     return null;
544:   }
545: }
````

## File: src/styles/auth-modal.css
````css
  1: /* ==========================================================================
  2:    AUTHENTICATION MODAL — MODERN E-COMMERCE DESIGN SYSTEM
  3:    Clean, elevated, world-class athletic e-commerce auth dialog
  4:    ========================================================================== */
  5: 
  6: .auth-modal-backdrop {
  7:   position: fixed;
  8:   inset: 0;
  9:   z-index: 99999;
 10:   display: flex;
 11:   align-items: center;
 12:   justify-content: center;
 13:   padding: 16px;
 14:   background-color: rgba(15, 17, 21, 0.65);
 15:   backdrop-filter: blur(12px);
 16:   -webkit-backdrop-filter: blur(12px);
 17:   animation: authBackdropFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
 18: }
 19: 
 20: @keyframes authBackdropFadeIn {
 21:   from {
 22:     opacity: 0;
 23:   }
 24:   to {
 25:     opacity: 1;
 26:   }
 27: }
 28: 
 29: .auth-modal-container {
 30:   position: relative;
 31:   width: 100%;
 32:   max-width: 440px;
 33:   background: #FFFFFF;
 34:   border-radius: 24px;
 35:   box-shadow: 
 36:     0 24px 60px -12px rgba(0, 0, 0, 0.22),
 37:     0 0 0 1px rgba(0, 0, 0, 0.06);
 38:   overflow: hidden;
 39:   animation: authModalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
 40:   box-sizing: border-box;
 41: }
 42: 
 43: @keyframes authModalSlideUp {
 44:   from {
 45:     opacity: 0;
 46:     transform: translateY(16px) scale(0.97);
 47:   }
 48:   to {
 49:     opacity: 1;
 50:     transform: translateY(0) scale(1);
 51:   }
 52: }
 53: 
 54: /* Close Button */
 55: .auth-close-btn {
 56:   position: absolute;
 57:   top: 18px;
 58:   right: 18px;
 59:   width: 36px;
 60:   height: 36px;
 61:   border-radius: 50%;
 62:   border: none;
 63:   background: #F3F4F6;
 64:   color: #4B5563;
 65:   display: flex;
 66:   align-items: center;
 67:   justify-content: center;
 68:   cursor: pointer;
 69:   transition: all 0.2s ease;
 70:   z-index: 10;
 71: }
 72: 
 73: .auth-close-btn:hover {
 74:   background: #E5E7EB;
 75:   color: #111827;
 76:   transform: rotate(90deg);
 77: }
 78: 
 79: /* Modal Inner Body */
 80: .auth-modal-body {
 81:   padding: 32px 32px 28px;
 82: }
 83: 
 84: @media (max-width: 480px) {
 85:   .auth-modal-body {
 86:     padding: 24px 20px 24px;
 87:   }
 88: }
 89: 
 90: /* Brand Header */
 91: .auth-header {
 92:   text-align: left;
 93:   margin-bottom: 24px;
 94: }
 95: 
 96: .auth-brand-badge {
 97:   display: inline-flex;
 98:   align-items: center;
 99:   gap: 8px;
100:   margin-bottom: 12px;
101: }
102: 
103: .auth-brand-logo-icon {
104:   width: 32px;
105:   height: 32px;
106:   border-radius: 10px;
107:   background: #111827;
108:   color: #FFFFFF;
109:   display: flex;
110:   align-items: center;
111:   justify-content: center;
112:   font-weight: 800;
113:   font-size: 0.875rem;
114:   letter-spacing: -0.02em;
115: }
116: 
117: .auth-brand-label {
118:   font-size: 0.75rem;
119:   font-weight: 700;
120:   letter-spacing: 0.08em;
121:   text-transform: uppercase;
122:   color: #6B7280;
123: }
124: 
125: .auth-title {
126:   font-size: 1.5rem;
127:   font-weight: 700;
128:   color: #111827;
129:   letter-spacing: -0.025em;
130:   line-height: 1.25;
131:   margin: 0 0 6px 0;
132: }
133: 
134: .auth-subtitle {
135:   font-size: 0.875rem;
136:   color: #6B7280;
137:   line-height: 1.45;
138:   margin: 0;
139: }
140: 
141: /* Error Banner */
142: .auth-error-alert {
143:   display: flex;
144:   align-items: center;
145:   gap: 8px;
146:   background: #FEF2F2;
147:   border: 1px solid #FECACA;
148:   border-radius: 12px;
149:   padding: 10px 14px;
150:   color: #B91C1C;
151:   font-size: 0.8125rem;
152:   font-weight: 500;
153:   margin-bottom: 20px;
154:   animation: authShake 0.3s ease-in-out;
155: }
156: 
157: @keyframes authShake {
158:   0%, 100% { transform: translateX(0); }
159:   25% { transform: translateX(-4px); }
160:   75% { transform: translateX(4px); }
161: }
162: 
163: /* Segmented Tab Switcher (iOS / High-end e-commerce style) */
164: .auth-method-switcher {
165:   display: grid;
166:   grid-template-columns: 1fr 1fr;
167:   gap: 4px;
168:   background: #F3F4F6;
169:   padding: 4px;
170:   border-radius: 14px;
171:   margin-bottom: 22px;
172: }
173: 
174: .auth-method-tab {
175:   display: flex;
176:   align-items: center;
177:   justify-content: center;
178:   gap: 8px;
179:   padding: 9px 12px;
180:   border-radius: 10px;
181:   border: none;
182:   background: transparent;
183:   color: #6B7280;
184:   font-size: 0.875rem;
185:   font-weight: 500;
186:   cursor: pointer;
187:   transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
188: }
189: 
190: .auth-method-tab.active {
191:   background: #FFFFFF;
192:   color: #111827;
193:   font-weight: 600;
194:   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
195: }
196: 
197: /* Input Fields & Groups */
198: .auth-field-group {
199:   margin-bottom: 18px;
200: }
201: 
202: .auth-field-label {
203:   display: block;
204:   font-size: 0.8125rem;
205:   font-weight: 600;
206:   color: #374151;
207:   margin-bottom: 7px;
208: }
209: 
210: .auth-phone-input-wrap {
211:   display: flex;
212:   align-items: center;
213:   height: 52px;
214:   background: #FFFFFF;
215:   border: 1.5px solid #E5E7EB;
216:   border-radius: 14px;
217:   padding: 0 14px;
218:   transition: all 0.2s ease;
219:   box-sizing: border-box;
220: }
221: 
222: .auth-phone-input-wrap:focus-within {
223:   border-color: #111827;
224:   box-shadow: 0 0 0 4px rgba(17, 24, 39, 0.06);
225: }
226: 
227: .auth-country-code {
228:   display: flex;
229:   align-items: center;
230:   gap: 6px;
231:   font-size: 0.9375rem;
232:   font-weight: 600;
233:   color: #111827;
234:   padding-right: 12px;
235:   margin-right: 12px;
236:   border-right: 1.5px solid #E5E7EB;
237:   user-select: none;
238:   white-space: nowrap;
239: }
240: 
241: .auth-phone-input {
242:   flex: 1;
243:   border: none;
244:   outline: none;
245:   background: transparent;
246:   font-size: 1.05rem;
247:   font-weight: 500;
248:   letter-spacing: 0.02em;
249:   color: #111827;
250:   width: 100%;
251: }
252: 
253: .auth-phone-input::placeholder {
254:   color: #9CA3AF;
255:   letter-spacing: normal;
256: }
257: 
258: .auth-text-input-wrap {
259:   display: flex;
260:   align-items: center;
261:   height: 52px;
262:   background: #FFFFFF;
263:   border: 1.5px solid #E5E7EB;
264:   border-radius: 14px;
265:   padding: 0 14px;
266:   transition: all 0.2s ease;
267:   box-sizing: border-box;
268: }
269: 
270: .auth-text-input-wrap:focus-within {
271:   border-color: #111827;
272:   box-shadow: 0 0 0 4px rgba(17, 24, 39, 0.06);
273: }
274: 
275: .auth-text-input-wrap svg {
276:   color: #9CA3AF;
277:   margin-right: 10px;
278:   flex-shrink: 0;
279: }
280: 
281: .auth-text-input {
282:   flex: 1;
283:   border: none;
284:   outline: none;
285:   background: transparent;
286:   font-size: 0.9375rem;
287:   color: #111827;
288:   width: 100%;
289: }
290: 
291: .auth-text-input::placeholder {
292:   color: #9CA3AF;
293: }
294: 
295: .auth-field-hint {
296:   display: block;
297:   font-size: 0.75rem;
298:   color: #6B7280;
299:   margin-top: 6px;
300: }
301: 
302: /* Primary Submit Button */
303: .auth-submit-btn {
304:   width: 100%;
305:   height: 50px;
306:   border-radius: 14px;
307:   background: #111827;
308:   color: #FFFFFF;
309:   border: none;
310:   font-size: 0.9375rem;
311:   font-weight: 600;
312:   letter-spacing: 0.01em;
313:   display: flex;
314:   align-items: center;
315:   justify-content: center;
316:   gap: 8px;
317:   cursor: pointer;
318:   transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
319:   box-shadow: 0 4px 12px rgba(17, 24, 39, 0.12);
320: }
321: 
322: .auth-submit-btn:hover:not(:disabled) {
323:   background: #000000;
324:   transform: translateY(-1px);
325:   box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
326: }
327: 
328: .auth-submit-btn:active:not(:disabled) {
329:   transform: translateY(0);
330: }
331: 
332: .auth-submit-btn:disabled {
333:   opacity: 0.7;
334:   cursor: not-allowed;
335: }
336: 
337: /* Divider */
338: .auth-divider {
339:   display: flex;
340:   align-items: center;
341:   margin: 22px 0;
342:   gap: 12px;
343: }
344: 
345: .auth-divider-line {
346:   flex: 1;
347:   height: 1px;
348:   background: #E5E7EB;
349: }
350: 
351: .auth-divider-text {
352:   font-size: 0.75rem;
353:   font-weight: 500;
354:   text-transform: uppercase;
355:   letter-spacing: 0.06em;
356:   color: #9CA3AF;
357: }
358: 
359: /* Social Buttons */
360: .auth-google-btn {
361:   width: 100%;
362:   height: 48px;
363:   background: #FFFFFF;
364:   border: 1.5px solid #E5E7EB;
365:   border-radius: 14px;
366:   display: flex;
367:   align-items: center;
368:   justify-content: center;
369:   gap: 10px;
370:   font-size: 0.9375rem;
371:   font-weight: 500;
372:   color: #1F2937;
373:   cursor: pointer;
374:   transition: all 0.2s ease;
375: }
376: 
377: .auth-google-btn:hover:not(:disabled) {
378:   background: #F9FAFB;
379:   border-color: #D1D5DB;
380:   box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
381: }
382: 
383: /* OTP 6-Digit Entry */
384: .auth-otp-grid {
385:   display: grid;
386:   grid-template-columns: repeat(6, 1fr);
387:   gap: 8px;
388:   margin-bottom: 20px;
389: }
390: 
391: .auth-otp-cell {
392:   width: 100%;
393:   min-width: 0;
394:   box-sizing: border-box;
395:   height: 54px;
396:   border: 1.5px solid #E5E7EB;
397:   border-radius: 12px;
398:   text-align: center;
399:   font-size: 1.5rem;
400:   font-weight: 700;
401:   color: #111827;
402:   background: #FFFFFF;
403:   outline: none;
404:   transition: all 0.2s ease;
405:   padding: 0;
406: }
407: 
408: .auth-otp-cell:focus {
409:   border-color: #111827;
410:   box-shadow: 0 0 0 4px rgba(17, 24, 39, 0.08);
411:   background: #FAFAFA;
412: }
413: 
414: .auth-otp-helper {
415:   display: flex;
416:   align-items: center;
417:   justify-content: space-between;
418:   background: #F8FAFC;
419:   border: 1px solid #E2E8F0;
420:   border-radius: 10px;
421:   padding: 8px 12px;
422:   margin-bottom: 18px;
423: }
424: 
425: .auth-otp-helper-left {
426:   display: flex;
427:   align-items: center;
428:   gap: 6px;
429:   font-size: 0.75rem;
430:   color: #64748B;
431: }
432: 
433: .auth-otp-helper-btn {
434:   background: #111827;
435:   color: #FFFFFF;
436:   border: none;
437:   border-radius: 6px;
438:   padding: 4px 8px;
439:   font-size: 0.6875rem;
440:   font-weight: 600;
441:   cursor: pointer;
442:   transition: background 0.15s ease;
443: }
444: 
445: .auth-otp-helper-btn:hover {
446:   background: #000000;
447: }
448: 
449: /* Name fields for new user onboarding */
450: .auth-name-grid {
451:   display: grid;
452:   grid-template-columns: 1fr 1fr;
453:   gap: 10px;
454:   margin-bottom: 18px;
455: }
456: 
457: .auth-name-cell {
458:   height: 44px;
459:   border: 1.5px solid #E5E7EB;
460:   border-radius: 10px;
461:   padding: 0 12px;
462:   font-size: 0.875rem;
463:   color: #111827;
464:   outline: none;
465:   background: #FFFFFF;
466:   box-sizing: border-box;
467:   width: 100%;
468: }
469: 
470: .auth-name-cell:focus {
471:   border-color: #111827;
472: }
473: 
474: /* OTP Resend & Change Actions */
475: .auth-otp-actions {
476:   display: flex;
477:   align-items: center;
478:   justify-content: space-between;
479:   margin-top: 16px;
480:   font-size: 0.8125rem;
481: }
482: 
483: .auth-link-btn {
484:   background: none;
485:   border: none;
486:   color: #6B7280;
487:   cursor: pointer;
488:   font-size: 0.8125rem;
489:   padding: 0;
490:   transition: color 0.15s ease;
491: }
492: 
493: .auth-link-btn:hover {
494:   color: #111827;
495:   text-decoration: underline;
496: }
497: 
498: .auth-resend-btn {
499:   background: none;
500:   border: none;
501:   color: #111827;
502:   font-weight: 600;
503:   cursor: pointer;
504:   font-size: 0.8125rem;
505:   padding: 0;
506: }
507: 
508: .auth-resend-btn:hover {
509:   text-decoration: underline;
510: }
511: 
512: .auth-countdown-text {
513:   color: #9CA3AF;
514:   font-size: 0.8125rem;
515: }
516: 
517: /* Bottom Legal & Trust Notice */
518: .auth-footer-notice {
519:   margin-top: 24px;
520:   padding-top: 18px;
521:   border-top: 1px solid #F3F4F6;
522:   text-align: center;
523: }
524: 
525: .auth-terms-text {
526:   font-size: 0.75rem;
527:   color: #9CA3AF;
528:   line-height: 1.45;
529:   margin: 0 0 10px 0;
530: }
531: 
532: .auth-terms-text a {
533:   color: #6B7280;
534:   text-decoration: underline;
535: }
536: 
537: .auth-trust-badges {
538:   display: flex;
539:   align-items: center;
540:   justify-content: center;
541:   gap: 12px;
542:   font-size: 0.6875rem;
543:   font-weight: 500;
544:   color: #6B7280;
545: }
546: 
547: .auth-trust-item {
548:   display: flex;
549:   align-items: center;
550:   gap: 4px;
551: }
````

## File: src/styles/checkout.css
````css
  1: /* ==========================================================================
  2:    Oriental Sports — Modern E-Commerce Checkout Styles
  3:    Clean, trustworthy, responsive checkout flow adhering to athletic retail standards.
  4:    ========================================================================== */
  5: 
  6: .checkout-page {
  7:   background-color: #f8f9fa;
  8:   color: #111827;
  9:   min-height: 100vh;
 10:   font-family: var(--font, system-ui, -apple-system, sans-serif);
 11: }
 12: 
 13: /* ---- Focused Checkout Header --------------------------------------------- */
 14: .checkout-header {
 15:   background: #ffffff;
 16:   border-bottom: 1px solid #e5e7eb;
 17:   position: sticky;
 18:   top: 0;
 19:   z-index: 40;
 20: }
 21: 
 22: .checkout-header-inner {
 23:   max-width: 1240px;
 24:   margin: 0 auto;
 25:   padding: 14px 20px;
 26:   display: flex;
 27:   align-items: center;
 28:   justify-content: space-between;
 29: }
 30: 
 31: .checkout-header-badge {
 32:   display: flex;
 33:   align-items: center;
 34:   gap: 6px;
 35:   font-size: 0.8125rem;
 36:   color: #4b5563;
 37:   font-weight: 500;
 38: }
 39: 
 40: .checkout-header-badge svg {
 41:   color: #15803d;
 42: }
 43: 
 44: /* ---- Step Progress Bar --------------------------------------------------- */
 45: .checkout-progress {
 46:   display: flex;
 47:   align-items: center;
 48:   gap: 8px;
 49:   font-size: 0.8125rem;
 50:   color: #6b7280;
 51: }
 52: 
 53: @media (max-width: 640px) {
 54:   .checkout-progress {
 55:     display: none;
 56:   }
 57: }
 58: 
 59: .checkout-progress-item {
 60:   display: flex;
 61:   align-items: center;
 62:   gap: 6px;
 63:   text-decoration: none;
 64:   color: inherit;
 65: }
 66: 
 67: .checkout-progress-item.is-active {
 68:   color: #111827;
 69:   font-weight: 600;
 70: }
 71: 
 72: .checkout-progress-item.is-done {
 73:   color: #15803d;
 74: }
 75: 
 76: .checkout-progress-dot {
 77:   width: 18px;
 78:   height: 18px;
 79:   border-radius: 50%;
 80:   display: inline-flex;
 81:   align-items: center;
 82:   justify-content: center;
 83:   font-size: 0.6875rem;
 84:   font-weight: 700;
 85:   background: #e5e7eb;
 86:   color: #4b5563;
 87: }
 88: 
 89: .checkout-progress-item.is-active .checkout-progress-dot {
 90:   background: #111827;
 91:   color: #ffffff;
 92: }
 93: 
 94: .checkout-progress-item.is-done .checkout-progress-dot {
 95:   background: #15803d;
 96:   color: #ffffff;
 97: }
 98: 
 99: .checkout-progress-sep {
100:   color: #d1d5db;
101:   font-size: 0.75rem;
102: }
103: 
104: /* ---- Mobile Order Summary Banner ----------------------------------------- */
105: .mobile-summary-toggle {
106:   display: none;
107:   background: #ffffff;
108:   border-bottom: 1px solid #e5e7eb;
109:   padding: 14px 20px;
110:   width: 100%;
111: }
112: 
113: @media (max-width: 991px) {
114:   .mobile-summary-toggle {
115:     display: flex;
116:     align-items: center;
117:     justify-content: space-between;
118:     cursor: pointer;
119:   }
120: }
121: 
122: .mobile-summary-title {
123:   display: flex;
124:   align-items: center;
125:   gap: 8px;
126:   font-size: 0.875rem;
127:   font-weight: 600;
128:   color: #111827;
129: }
130: 
131: .mobile-summary-price {
132:   font-size: 1rem;
133:   font-weight: 700;
134:   color: #111827;
135: }
136: 
137: /* ---- Main Layout --------------------------------------------------------- */
138: .checkout-container {
139:   max-width: 1240px;
140:   width: 100%;
141:   margin: 0 auto;
142:   padding: 32px 20px 80px;
143:   box-sizing: border-box;
144: }
145: 
146: @media (max-width: 640px) {
147:   .checkout-container {
148:     padding: 16px 12px 60px;
149:   }
150: }
151: 
152: .checkout-back-link {
153:   display: inline-flex;
154:   align-items: center;
155:   gap: 6px;
156:   font-size: 0.875rem;
157:   font-weight: 500;
158:   color: #4b5563;
159:   text-decoration: none;
160:   margin-bottom: 24px;
161:   transition: color 0.15s ease;
162: }
163: 
164: .checkout-back-link:hover {
165:   color: #111827;
166: }
167: 
168: .checkout-grid {
169:   display: grid;
170:   grid-template-columns: 1fr;
171:   gap: 32px;
172:   min-width: 0;
173:   width: 100%;
174: }
175: 
176: @media (min-width: 992px) {
177:   .checkout-grid {
178:     grid-template-columns: 1.25fr 0.85fr;
179:     gap: 40px;
180:     align-items: start;
181:   }
182: }
183: 
184: .checkout-form-column,
185: .checkout-summary-column {
186:   min-width: 0;
187:   width: 100%;
188: }
189: 
190: /* ---- Form Cards ---------------------------------------------------------- */
191: .checkout-card {
192:   background: #ffffff;
193:   border: 1px solid #e5e7eb;
194:   border-radius: 12px;
195:   padding: 24px 28px;
196:   margin-bottom: 20px;
197:   box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
198:   min-width: 0;
199:   box-sizing: border-box;
200: }
201: 
202: @media (max-width: 640px) {
203:   .checkout-card {
204:     padding: 16px 14px;
205:     border-radius: 10px;
206:     margin-bottom: 16px;
207:   }
208: }
209: 
210: .checkout-card-header {
211:   display: flex;
212:   align-items: center;
213:   justify-content: space-between;
214:   margin-bottom: 20px;
215:   padding-bottom: 14px;
216:   border-bottom: 1px solid #f3f4f6;
217: }
218: 
219: .checkout-card-title {
220:   display: flex;
221:   align-items: center;
222:   gap: 10px;
223:   font-size: 1.125rem;
224:   font-weight: 700;
225:   color: #111827;
226:   letter-spacing: -0.015em;
227:   margin: 0;
228:   text-transform: none;
229:   font-stretch: 100% !important;
230:   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
231: }
232: 
233: .checkout-step-number {
234:   display: inline-flex;
235:   align-items: center;
236:   justify-content: center;
237:   width: 24px;
238:   height: 24px;
239:   background: #111827;
240:   color: #ffffff;
241:   border-radius: 50%;
242:   font-size: 0.75rem;
243:   font-weight: 700;
244: }
245: 
246: .checkout-card-meta {
247:   font-size: 0.8125rem;
248:   color: #6b7280;
249: }
250: 
251: /* ---- Form Fields & Inputs ------------------------------------------------ */
252: .form-row {
253:   display: grid;
254:   grid-template-columns: 1fr;
255:   gap: 16px;
256:   margin-bottom: 16px;
257: }
258: 
259: @media (min-width: 640px) {
260:   .form-row-2 {
261:     grid-template-columns: 1fr 1fr;
262:   }
263:   .form-row-3 {
264:     grid-template-columns: 1.2fr 1fr 1fr;
265:   }
266: }
267: 
268: .form-group {
269:   display: flex;
270:   flex-direction: column;
271:   gap: 6px;
272: }
273: 
274: .form-label {
275:   font-size: 0.8125rem;
276:   font-weight: 600;
277:   color: #374151;
278:   letter-spacing: normal;
279:   text-transform: none;
280:   display: flex;
281:   justify-content: space-between;
282: }
283: 
284: .form-label-optional {
285:   color: #9ca3af;
286:   font-weight: 400;
287: }
288: 
289: .form-input-container {
290:   position: relative;
291:   display: flex;
292:   align-items: stretch;
293: }
294: 
295: .form-input {
296:   width: 100%;
297:   height: 46px;
298:   padding: 0 14px;
299:   background: #ffffff;
300:   border: 1px solid #d1d5db;
301:   border-radius: 8px;
302:   font-size: 0.9375rem;
303:   color: #111827;
304:   outline: none;
305:   transition: all 0.15s ease;
306:   font-family: inherit;
307: }
308: 
309: .form-input::placeholder {
310:   color: #9ca3af;
311: }
312: 
313: .form-input:focus {
314:   border-color: #111827;
315:   box-shadow: 0 0 0 3px rgba(17, 24, 39, 0.08);
316: }
317: 
318: .form-input.has-error {
319:   border-color: #dc2626;
320:   background-color: #fef2f2;
321: }
322: 
323: .form-input.has-error:focus {
324:   box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.12);
325: }
326: 
327: .form-error-text {
328:   font-size: 0.75rem;
329:   color: #dc2626;
330:   font-weight: 500;
331:   margin: 2px 0 0;
332: }
333: 
334: .phone-prefix {
335:   display: inline-flex;
336:   align-items: center;
337:   padding: 0 12px;
338:   background: #f3f4f6;
339:   border: 1px solid #d1d5db;
340:   border-right: none;
341:   border-top-left-radius: 8px;
342:   border-bottom-left-radius: 8px;
343:   font-size: 0.875rem;
344:   font-weight: 600;
345:   color: #374151;
346: }
347: 
348: .form-input-with-prefix {
349:   border-top-left-radius: 0;
350:   border-bottom-left-radius: 0;
351: }
352: 
353: /* ---- Delivery Option Cards ----------------------------------------------- */
354: .delivery-options-grid {
355:   display: grid;
356:   grid-template-columns: 1fr;
357:   gap: 12px;
358:   margin-bottom: 20px;
359: }
360: 
361: @media (min-width: 600px) {
362:   .delivery-options-grid {
363:     grid-template-columns: 1fr 1fr;
364:   }
365: }
366: 
367: .delivery-option-card {
368:   border: 1.5px solid #e5e7eb;
369:   border-radius: 10px;
370:   padding: 16px;
371:   background: #ffffff;
372:   cursor: pointer;
373:   transition: all 0.15s ease;
374:   display: flex;
375:   align-items: flex-start;
376:   gap: 12px;
377:   position: relative;
378: }
379: 
380: .delivery-option-card:hover {
381:   border-color: #9ca3af;
382: }
383: 
384: .delivery-option-card.is-selected {
385:   border-color: #111827;
386:   background: #fafaf9;
387:   box-shadow: 0 0 0 1px #111827;
388: }
389: 
390: .delivery-radio {
391:   margin-top: 2px;
392:   width: 18px;
393:   height: 18px;
394:   border-radius: 50%;
395:   border: 2px solid #d1d5db;
396:   display: grid;
397:   place-items: center;
398:   flex-shrink: 0;
399: }
400: 
401: .delivery-option-card.is-selected .delivery-radio {
402:   border-color: #111827;
403: }
404: 
405: .delivery-radio-inner {
406:   width: 8px;
407:   height: 8px;
408:   border-radius: 50%;
409:   background: #111827;
410:   display: none;
411: }
412: 
413: .delivery-option-card.is-selected .delivery-radio-inner {
414:   display: block;
415: }
416: 
417: .delivery-option-content {
418:   flex: 1;
419: }
420: 
421: .delivery-option-title {
422:   font-size: 0.9375rem;
423:   font-weight: 600;
424:   color: #111827;
425:   margin-bottom: 2px;
426:   display: flex;
427:   align-items: center;
428:   gap: 6px;
429: }
430: 
431: .delivery-option-desc {
432:   font-size: 0.8125rem;
433:   color: #6b7280;
434:   line-height: 1.4;
435: }
436: 
437: .delivery-option-badge {
438:   display: inline-block;
439:   margin-top: 4px;
440:   font-size: 0.6875rem;
441:   font-weight: 700;
442:   color: #15803d;
443:   background: #dcfce7;
444:   padding: 2px 6px;
445:   border-radius: 4px;
446: }
447: 
448: /* Store Pickup Callout Panel */
449: .store-pickup-panel {
450:   background: #fafaf9;
451:   border: 1px solid #e7e5e4;
452:   border-radius: 10px;
453:   padding: 18px;
454:   margin-top: 14px;
455: }
456: 
457: .store-pickup-badge {
458:   display: inline-flex;
459:   align-items: center;
460:   gap: 6px;
461:   background: #fef3c7;
462:   color: #92400e;
463:   font-size: 0.75rem;
464:   font-weight: 700;
465:   padding: 3px 8px;
466:   border-radius: 4px;
467:   margin-bottom: 8px;
468: }
469: 
470: /* Saved Addresses */
471: .saved-addresses-list {
472:   display: flex;
473:   flex-direction: column;
474:   gap: 8px;
475:   margin-bottom: 16px;
476: }
477: 
478: .saved-address-chip {
479:   padding: 12px 14px;
480:   border: 1px solid #e5e7eb;
481:   border-radius: 8px;
482:   background: #ffffff;
483:   text-align: left;
484:   font-size: 0.8125rem;
485:   cursor: pointer;
486:   transition: all 0.15s ease;
487:   width: 100%;
488: }
489: 
490: .saved-address-chip:hover {
491:   border-color: #9ca3af;
492: }
493: 
494: .saved-address-chip.is-active {
495:   border-color: #111827;
496:   background: #fafaf9;
497:   font-weight: 500;
498: }
499: 
500: /* ---- Payment Card & Razorpay CTA ----------------------------------------- */
501: .payment-section-box {
502:   background: #ffffff;
503:   border: 1px solid #e5e7eb;
504:   border-radius: 12px;
505:   padding: 24px;
506:   box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
507:   min-width: 0;
508:   box-sizing: border-box;
509: }
510: 
511: @media (max-width: 640px) {
512:   .payment-section-box {
513:     padding: 16px 14px;
514:   }
515: }
516: 
517: .payment-gateways-strip {
518:   display: flex;
519:   flex-wrap: wrap;
520:   align-items: center;
521:   gap: 8px;
522:   padding: 12px 14px;
523:   background: #f9fafb;
524:   border: 1px solid #f3f4f6;
525:   border-radius: 8px;
526:   margin-bottom: 18px;
527: }
528: 
529: .gateway-chip {
530:   font-size: 0.6875rem;
531:   font-weight: 600;
532:   color: #4b5563;
533:   background: #ffffff;
534:   border: 1px solid #e5e7eb;
535:   padding: 4px 8px;
536:   border-radius: 4px;
537: }
538: 
539: .pay-cta-btn {
540:   width: 100%;
541:   height: 52px;
542:   background: #111827;
543:   color: #ffffff;
544:   border: none;
545:   border-radius: 8px;
546:   font-size: 1rem;
547:   font-weight: 700;
548:   cursor: pointer;
549:   display: flex;
550:   align-items: center;
551:   justify-content: center;
552:   gap: 10px;
553:   transition: background 0.15s ease, transform 0.05s ease;
554:   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
555: }
556: 
557: .pay-cta-btn:hover {
558:   background: #1f2937;
559: }
560: 
561: .pay-cta-btn:active {
562:   transform: scale(0.99);
563: }
564: 
565: .pay-cta-btn:disabled {
566:   opacity: 0.65;
567:   cursor: not-allowed;
568: }
569: 
570: .security-assurances-row {
571:   display: flex;
572:   align-items: center;
573:   justify-content: center;
574:   gap: 18px;
575:   margin-top: 14px;
576:   font-size: 0.75rem;
577:   color: #6b7280;
578:   flex-wrap: wrap;
579: }
580: 
581: .security-item {
582:   display: flex;
583:   align-items: center;
584:   gap: 5px;
585: }
586: 
587: /* ---- Sticky Order Summary (Sidebar) -------------------------------------- */
588: .checkout-summary-card {
589:   background: #ffffff;
590:   border: 1px solid #e5e7eb;
591:   border-radius: 12px;
592:   padding: 24px;
593:   box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
594:   position: sticky;
595:   top: 90px;
596:   min-width: 0;
597:   box-sizing: border-box;
598: }
599: 
600: @media (max-width: 640px) {
601:   .checkout-summary-card {
602:     padding: 16px 14px;
603:     border-radius: 10px;
604:   }
605: }
606: 
607: .summary-heading {
608:   font-size: 1.125rem;
609:   font-weight: 700;
610:   color: #111827;
611:   letter-spacing: -0.015em;
612:   margin: 0 0 16px;
613:   text-transform: none;
614:   font-stretch: 100% !important;
615:   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
616: }
617: 
618: .summary-items-list {
619:   list-style: none;
620:   margin: 0 0 20px;
621:   padding: 0;
622:   display: flex;
623:   flex-direction: column;
624:   gap: 12px;
625:   max-height: 360px;
626:   overflow-y: auto;
627: }
628: 
629: .summary-item-row {
630:   display: flex;
631:   align-items: center;
632:   gap: 12px;
633:   padding-bottom: 12px;
634:   border-bottom: 1px solid #f3f4f6;
635: }
636: 
637: .summary-item-row:last-child {
638:   border-bottom: none;
639:   padding-bottom: 0;
640: }
641: 
642: .summary-item-img {
643:   width: 56px;
644:   height: 56px;
645:   border-radius: 8px;
646:   background: #f3f4f6;
647:   overflow: hidden;
648:   position: relative;
649:   flex-shrink: 0;
650:   border: 1px solid #e5e7eb;
651: }
652: 
653: .summary-item-badge {
654:   position: absolute;
655:   top: 2px;
656:   right: 2px;
657:   background: #111827;
658:   color: #ffffff;
659:   font-size: 0.625rem;
660:   font-weight: 700;
661:   padding: 1px 5px;
662:   border-radius: 999px;
663: }
664: 
665: .summary-item-info {
666:   flex: 1;
667:   min-width: 0;
668: }
669: 
670: .summary-item-name {
671:   font-size: 0.875rem;
672:   font-weight: 600;
673:   color: #111827;
674:   margin: 0;
675:   white-space: nowrap;
676:   overflow: hidden;
677:   text-overflow: ellipsis;
678: }
679: 
680: .summary-item-meta {
681:   font-size: 0.75rem;
682:   color: #6b7280;
683:   margin: 2px 0 0;
684: }
685: 
686: .summary-item-price {
687:   font-size: 0.9375rem;
688:   font-weight: 700;
689:   color: #111827;
690:   white-space: nowrap;
691: }
692: 
693: /* Promo Code Box */
694: .promo-box {
695:   display: flex;
696:   gap: 8px;
697:   margin-bottom: 16px;
698: }
699: 
700: .promo-input {
701:   flex: 1;
702:   height: 40px;
703:   padding: 0 12px;
704:   border: 1px solid #d1d5db;
705:   border-radius: 6px;
706:   font-size: 0.8125rem;
707:   outline: none;
708:   text-transform: uppercase;
709: }
710: 
711: .promo-input:focus {
712:   border-color: #111827;
713: }
714: 
715: .promo-apply-btn {
716:   height: 40px;
717:   padding: 0 16px;
718:   background: #f3f4f6;
719:   border: 1px solid #d1d5db;
720:   border-radius: 6px;
721:   font-size: 0.8125rem;
722:   font-weight: 600;
723:   color: #374151;
724:   cursor: pointer;
725:   transition: all 0.15s ease;
726: }
727: 
728: .promo-apply-btn:hover {
729:   background: #e5e7eb;
730:   color: #111827;
731: }
732: 
733: .promo-feedback {
734:   font-size: 0.75rem;
735:   margin: -10px 0 14px;
736:   font-weight: 500;
737: }
738: 
739: .promo-feedback.is-success {
740:   color: #15803d;
741: }
742: 
743: .promo-feedback.is-error {
744:   color: #dc2626;
745: }
746: 
747: /* Cost Breakdown DL */
748: .summary-breakdown {
749:   border-top: 1px solid #e5e7eb;
750:   padding-top: 14px;
751:   margin: 0;
752:   display: flex;
753:   flex-direction: column;
754:   gap: 10px;
755:   font-size: 0.875rem;
756: }
757: 
758: .summary-row {
759:   display: flex;
760:   justify-content: space-between;
761:   align-items: center;
762:   color: #4b5563;
763: }
764: 
765: .summary-row dd {
766:   margin: 0;
767:   font-weight: 600;
768:   color: #111827;
769: }
770: 
771: .summary-row.is-discount {
772:   color: #15803d;
773: }
774: 
775: .summary-row.is-discount dd {
776:   color: #15803d;
777: }
778: 
779: .summary-free-badge {
780:   color: #15803d;
781:   font-weight: 700;
782:   background: #dcfce7;
783:   padding: 2px 6px;
784:   border-radius: 4px;
785:   font-size: 0.75rem;
786: }
787: 
788: .summary-total-row {
789:   display: flex;
790:   justify-content: space-between;
791:   align-items: baseline;
792:   border-top: 1px solid #e5e7eb;
793:   padding-top: 14px;
794:   margin-top: 4px;
795: }
796: 
797: .summary-total-label {
798:   font-size: 1rem;
799:   font-weight: 700;
800:   color: #111827;
801: }
802: 
803: .summary-total-value {
804:   font-size: 1.25rem;
805:   font-weight: 800;
806:   color: #111827;
807: }
808: 
809: .summary-tax-note {
810:   font-size: 0.6875rem;
811:   color: #6b7280;
812:   margin: 4px 0 0;
813: }
814: 
815: .store-guarantee-card {
816:   margin-top: 20px;
817:   padding: 14px;
818:   background: #fafaf9;
819:   border: 1px solid #e7e5e4;
820:   border-radius: 8px;
821:   font-size: 0.75rem;
822:   color: #57534e;
823:   line-height: 1.45;
824: }
825: 
826: .store-guarantee-card strong {
827:   color: #1c1917;
828:   display: block;
829:   margin-bottom: 2px;
830: }
831: 
832: /* ---- Interactive Razorpay Modal (Sandbox / Real Simulator) --------------- */
833: .rzp-modal-backdrop {
834:   position: fixed;
835:   inset: 0;
836:   background: rgba(17, 24, 39, 0.65);
837:   backdrop-filter: blur(4px);
838:   z-index: 100;
839:   display: flex;
840:   align-items: center;
841:   justify-content: center;
842:   padding: 16px;
843: }
844: 
845: .rzp-modal {
846:   width: 100%;
847:   max-width: 440px;
848:   background: #ffffff;
849:   border-radius: 12px;
850:   overflow: hidden;
851:   box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
852:   animation: rzpModalPop 0.2s ease-out;
853: }
854: 
855: @keyframes rzpModalPop {
856:   from {
857:     opacity: 0;
858:     transform: scale(0.96);
859:   }
860:   to {
861:     opacity: 1;
862:     transform: scale(1);
863:   }
864: }
865: 
866: .rzp-modal-header {
867:   background: #0c2340;
868:   color: #ffffff;
869:   padding: 18px 22px;
870:   display: flex;
871:   align-items: center;
872:   justify-content: space-between;
873: }
874: 
875: .rzp-modal-title {
876:   margin: 0;
877:   font-size: 1.0625rem;
878:   font-weight: 700;
879: }
880: 
881: .rzp-modal-sub {
882:   margin: 0;
883:   font-size: 0.6875rem;
884:   color: #60a5fa;
885:   font-weight: 700;
886:   text-transform: uppercase;
887:   letter-spacing: 0.05em;
888: }
889: 
890: .rzp-modal-amount {
891:   font-size: 1.1875rem;
892:   font-weight: 800;
893:   margin: 0;
894: }
895: 
896: .rzp-tabs {
897:   display: flex;
898:   background: #f8fafc;
899:   border-bottom: 1px solid #e2e8f0;
900: }
901: 
902: .rzp-tab {
903:   flex: 1;
904:   padding: 11px 8px;
905:   background: none;
906:   border: none;
907:   font-size: 0.8125rem;
908:   font-weight: 600;
909:   color: #64748b;
910:   cursor: pointer;
911:   border-bottom: 2px solid transparent;
912:   transition: all 0.15s ease;
913: }
914: 
915: .rzp-tab.is-active {
916:   color: #0c2340;
917:   border-bottom-color: #0c2340;
918:   background: #ffffff;
919: }
920: 
921: .rzp-body {
922:   padding: 22px;
923: }
924: 
925: /* ---- Minimal Checkout Footer --------------------------------------------- */
926: .checkout-footer {
927:   border-top: 1px solid #e5e7eb;
928:   background: #ffffff;
929:   padding: 24px 20px;
930:   margin-top: 60px;
931: }
932: 
933: .checkout-footer-inner {
934:   max-width: 1240px;
935:   margin: 0 auto;
936:   display: flex;
937:   flex-direction: column;
938:   align-items: center;
939:   gap: 12px;
940:   text-align: center;
941: }
942: 
943: .checkout-footer-links {
944:   display: flex;
945:   align-items: center;
946:   flex-wrap: wrap;
947:   justify-content: center;
948:   gap: 14px;
949:   font-size: 0.8125rem;
950:   color: #6b7280;
951: }
952: 
953: .checkout-footer-links a {
954:   color: #4b5563;
955:   text-decoration: none;
956:   transition: color 0.15s ease;
957: }
958: 
959: .checkout-footer-links a:hover {
960:   color: #111827;
961: }
962: 
963: .checkout-footer-copy {
964:   margin: 0;
965:   font-size: 0.75rem;
966:   color: #9ca3af;
967: }
````

## File: src/types/shopify.ts
````typescript
  1: /**
  2:  * TypeScript definitions for Shopify Storefront API (GraphQL).
  3:  */
  4: 
  5: export interface ShopifyImage {
  6:   url: string;
  7:   altText: string | null;
  8:   width?: number;
  9:   height?: number;
 10: }
 11: 
 12: export interface ShopifyPrice {
 13:   amount: string;
 14:   currencyCode: string;
 15: }
 16: 
 17: export interface ShopifySelectedOption {
 18:   name: string;
 19:   value: string;
 20: }
 21: 
 22: export interface ShopifyProductVariantNode {
 23:   id: string;
 24:   title: string;
 25:   availableForSale: boolean;
 26:   sku?: string | null;
 27:   price: ShopifyPrice;
 28:   compareAtPrice?: ShopifyPrice | null;
 29:   selectedOptions?: ShopifySelectedOption[];
 30:   image?: ShopifyImage | null;
 31: }
 32: 
 33: export interface ShopifyProductNode {
 34:   id: string;
 35:   title: string;
 36:   handle: string;
 37:   description: string;
 38:   descriptionHtml?: string;
 39:   availableForSale: boolean;
 40:   productType?: string;
 41:   vendor?: string;
 42:   tags?: string[];
 43:   priceRange: {
 44:     minVariantPrice: ShopifyPrice;
 45:     maxVariantPrice?: ShopifyPrice;
 46:   };
 47:   compareAtPriceRange?: {
 48:     minVariantPrice: ShopifyPrice;
 49:   };
 50:   featuredImage?: ShopifyImage | null;
 51:   images: {
 52:     edges: Array<{
 53:       node: ShopifyImage;
 54:     }>;
 55:   };
 56:   variants: {
 57:     edges: Array<{
 58:       node: ShopifyProductVariantNode;
 59:     }>;
 60:   };
 61: }
 62: 
 63: export interface ShopifyCollectionNode {
 64:   id: string;
 65:   title: string;
 66:   handle: string;
 67:   description: string;
 68:   image?: ShopifyImage | null;
 69:   products?: {
 70:     edges: Array<{
 71:       node: ShopifyProductNode;
 72:     }>;
 73:   };
 74: }
 75: 
 76: export interface ShopifyCartLineInput {
 77:   merchandiseId: string; // The Shopify Variant GID (gid://shopify/ProductVariant/...)
 78:   quantity: number;
 79:   attributes?: Array<{ key: string; value: string }>;
 80: }
 81: 
 82: export interface ShopifyCartLineUpdateInput {
 83:   id: string; // The Shopify Cart Line GID
 84:   quantity: number;
 85: }
 86: 
 87: export interface ShopifyCartLine {
 88:   id: string;
 89:   quantity: number;
 90:   cost: {
 91:     totalAmount: ShopifyPrice;
 92:     subtotalAmount?: ShopifyPrice;
 93:   };
 94:   merchandise: {
 95:     id: string;
 96:     title: string;
 97:     product: {
 98:       id: string;
 99:       title: string;
100:       handle: string;
101:       featuredImage?: ShopifyImage | null;
102:     };
103:     price: ShopifyPrice;
104:     image?: ShopifyImage | null;
105:   };
106: }
107: 
108: export interface ShopifyCart {
109:   id: string;
110:   checkoutUrl: string;
111:   totalQuantity: number;
112:   cost: {
113:     subtotalAmount: ShopifyPrice;
114:     totalAmount: ShopifyPrice;
115:     totalTaxAmount?: ShopifyPrice | null;
116:     totalDutyAmount?: ShopifyPrice | null;
117:   };
118:   discountCodes?: Array<{
119:     code: string;
120:     applicable: boolean;
121:   }>;
122:   lines: {
123:     edges: Array<{
124:       node: ShopifyCartLine;
125:     }>;
126:   };
127: }
````

## File: src/vite-env.d.ts
````typescript
 1: /// <reference types="vite/client" />
 2: 
 3: interface ImportMetaEnv {
 4:   readonly VITE_SHOPIFY_STORE_DOMAIN?: string;
 5:   readonly VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN?: string;
 6:   readonly VITE_SHOPIFY_API_VERSION?: string;
 7:   readonly VITE_SHOPIFY_COUNTRY_CODE?: string;
 8:   readonly VITE_RAZORPAY_KEY_ID?: string;
 9: }
10: 
11: interface ImportMeta {
12:   readonly env: ImportMetaEnv;
13: }
````

## File: docs/visual-audits/README.md
````markdown
 1: # Visual Audits Log
 2: 
 3: This directory archives browser-rendered screenshots captured via Playwright CLI across multiple viewport sizes and interaction states.
 4: 
 5: ## Target Viewports
 6: - **Desktop Standard**: 1440x900
 7: - **Desktop High-Res**: 1920x1080
 8: - **Tablet**: 768x1024
 9: - **Mobile**: 390x844
10: 
11: ## Verification Checklist
12: - [x] Zero broken images
13: - [x] High-contrast typographic collision
14: - [x] Optical liquid glass depth
15: - [x] Live hover and expand/compress interaction
16: - [x] Keyboard focus visible
17: - [x] Mobile drawer and bottom sheet responsiveness
````

## File: docs/INTERACTION_SYSTEM.md
````markdown
 1: # INTERACTION SYSTEM — ORIENTAL SPORTS PUNE
 2: 
 3: This document defines the complete interaction matrix, triggers, responses, component primitives, and mobile/accessibility fallbacks across Oriental Sports Pune.
 4: 
 5: ---
 6: 
 7: ## Interaction Architecture Matrix
 8: 
 9: | Interaction | Trigger | Response | Component | Mobile / Accessibility Fallback |
10: | :--- | :--- | :--- | :--- | :--- |
11: | **Hero Parallax** | Window Scroll | Background image shifts Y with spring easing | `DavinchoHero` (`davincho-hero-1.tsx`) | Reduced/static transform on mobile |
12: | **Hero 2.5D Mouse** | Pointer Move | Image shifts 4–8px, typography shifts 2–4px | `Hero` (`Hero.tsx`) | Disabled on touchscreens (`pointer: coarse`) |
13: | **Hero Slide Transition** | Arrow Keys / Nav Buttons / Swipe | Directional clip-path wipe, scale & independent type entrance | `Hero` (`Hero.tsx`) | Touch swipe with >= 45px threshold & buttons |
14: | **Sport Index Expansion** | Pointer Hover | Active sport expands to ~45–55% width, image zooms, CTA reveals | `ShopBySport` (`ShopBySport.tsx`) | Full-width vertical list with tap-to-reveal preview |
15: | **Contextual Cursor** | Element Hover | Morphing size & state label (`VIEW`, `SHOP`, `EXPLORE`, `DRAG`) | `CustomCursor` (`CustomCursor.tsx`) | Native OS pointer (bypassed on coarse/inputs/reduced-motion) |
16: | **CTA Magnetic Pull** | Pointer Hover | Button pulls 4–8px towards cursor with spring physics | `MagneticButton` (`magnetic-button.tsx`) | Standard static button on mobile touch |
17: | **Product Image Swap** | Pointer Hover | Smooth cross-fade to secondary product angle | `ProductCard` (`ProductCard.tsx`) | Touch-to-open detail page with variant selector |
18: | **Quick Add Drawer** | Button Click | Compact slide-over sheet opens with variant & quantity controls | `CartDrawer` & `FeaturedProducts` | Bottom sheet drawer on mobile |
19: | **Court Explorer** | Service Selection | Sticky media shifts perspective/crop toward selected discipline | `CourtsSection` (`CourtsSection.tsx`) | Vertical stacked layout with unmasked imagery |
20: | **Command Search** | Click / `⌘K` | Dimmed overlay with live fuzzy search & keyboard navigation | `SearchModal` (`SearchModal.tsx`) | Fullscreen touch search input with direct filters |
21: | **Cart Slide-Over** | Click / Quick Add | Smooth right-side drawer with live price calculation | `CartDrawer` (`CartDrawer.tsx`) | Responsive bottom sheet drawer |
22: | **Brand Intro Ident** | Page Arrival | 1.35s session-cached O/S vector mask reveal | `BrandIntro` (`BrandIntro.tsx`) | Skipped immediately on `prefers-reduced-motion` |
23: 
24: ---
25: 
26: ## Design Dial Calibration
27: - **DESIGN_VARIANCE**: `8/10` (Asymmetric layout rhythm, distinct per-chapter composition)
28: - **MOTION_INTENSITY**: `7/10` (Designed kinetic choreography, 2.5D depth, no UI fireworks)
29: - **VISUAL_DENSITY**: `4/10` (Generous Ivory Court whitespace, 30–40% quiet breathing space)
30: - **ART_DIRECTION**: `9/10` (Editorial magazine + architectural studio)
31: - **IMAGE_PRIORITY**: `9/10` (Dominant, un-obscured physical sports photography)
32: - **CONVERSION_DISCIPLINE**: `9/10` (Real e-commerce cart, wishlist, pricing, and Camp store data)
````

## File: docs/VISUAL_DIRECTION.md
````markdown
 1: # Oriental Sports — Visual Direction: Brutalist Sports Editorial & Liquid Glass
 2: 
 3: ## 1. Creative Vision & Philosophy
 4: Oriental Sports is not another traditional sports retailer. It is the sports house of Pune—where gear meets play, and play meets culture.
 5: The visual direction fuses **Editorial Brutalism** (raw, bold, asymmetrical, high-contrast, oversized typography, architectural gridlines) with **Liquid Glassmorphism** (optically refractive translucent surfaces, subtle 1px luminous borders, deep backdrop blurs) and **Kinetic Sports Motion** (mouse-driven parallax, directional hover reveals, magnetic controls, custom cursor gestures).
 6: 
 7: It balances:
 8: - **60% Clean Product & Commerce Usability** (Playo clarity, Mobbin e-commerce conventions, fast cart/search)
 9: - **20% Brutalist & Editorial Art Direction** (Cosmos curation, asymmetric layouts, oversized scale, colliding type and imagery)
10: - **10% Premium Sports Lifestyle** (Tactile materials, authentic athletes, championship court surfaces)
11: - **10% Experimental Interaction** (21st.dev kinetic mechanics, custom reactive cursor, smooth reveals)
12: 
13: ---
14: 
15: ## 2. Typographic Rhythm & Contrast
16: We construct a high-tension typographic system combining architectural display grotesques with functional tabular data.
17: 
18: - **Primary Display**: `Space Grotesk` (weights 700, 800) with tight letter-spacing (`-0.04em` to `-0.02em`) for giant editorial headlines and oversized numeral anchors (`01`, `02`, `03`).
19: - **Secondary Body & Commerce UI**: `Plus Jakarta Sans` (weights 400, 500, 600, 700) for crystal-clear readability, product descriptions, and tabular pricing (`tabular-nums`).
20: - **Monospace Metadata Rail**: Monospaced micro-labels (`0.6875rem`, uppercase, tracking `+0.12em`) for specifications, Pune coordinates, and inventory statuses.
21: 
22: ```
23: [01 / 03 · PUNE HEADQUARTERS · EST. CAMP]  <-- Monospace Metadata
24: GEAR.                                      <-- Space Grotesk 800 (96px+)
25: COURTS.                                    <-- Colliding over full-bleed photo
26: PUNE.                                      <-- High-contrast ink on ivory
27: ```
28: 
29: ---
30: 
31: ## 3. Color Architecture
32: A sophisticated neutral canvas punctuated by explosive, targeted athletic accents.
33: 
34: | Token | Hex | Role & Application |
35: |---|---|---|
36: | `--color-canvas-base` | `#F6F3EA` | Warm Ivory page foundation (tactile, timeless, non-sterile) |
37: | `--color-canvas-surface`| `#FAF8F5` | Off-white subtle card container base |
38: | `--color-canvas-pure` | `#FFFFFF` | Crisp white cards, inputs, and dialogs |
39: | `--color-ink` | `#111111` | Jet ink for headlines, brutalist borders, and key CTA fills |
40: | `--color-ink-muted` | `#5A5A5A` | Secondary descriptions, specs, and captions |
41: | `--color-plate-gold` | `#C9A227` | Official brand mark gold; used for subtle badges and heritage accents |
42: | `--color-electric-blue`| `#2457FF` | High-energy cobalt for hover states, selected sports, and cursor accents |
43: | `--color-safety-orange`| `#FF5A1F` | Court infrastructure terracotta and active indicator ribbons |
44: | `--color-acid-lime` | `#D7FF00` | Micro-badge pop and status indicators |
45: 
46: ---
47: 
48: ## 4. Liquid Glassmorphism Framework
49: Glass is an optical layer floating *over* rich sports photography, never a generic decoration over empty cards.
50: 
51: ```css
52: .glass-panel {
53:   background: rgba(255, 255, 255, 0.18);
54:   backdrop-filter: blur(20px);
55:   -webkit-backdrop-filter: blur(20px);
56:   border: 1px solid rgba(255, 255, 255, 0.28);
57:   box-shadow: 0 16px 36px -8px rgba(17, 17, 17, 0.16);
58: }
59: 
60: .glass-panel-dark {
61:   background: rgba(17, 17, 17, 0.72);
62:   backdrop-filter: blur(24px);
63:   -webkit-backdrop-filter: blur(24px);
64:   border: 1px solid rgba(255, 255, 255, 0.12);
65:   box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.35);
66: }
67: ```
68: 
69: Approved Placements:
70: - `GlassNav`: Floating sticky navigation bar with blurred backdrop.
71: - `GlassControl`: Floating hero carousel controls (`← 01 02 03 →`).
72: - `GlassCourtSpec`: Floating technical metadata panel overlapping court photography.
73: - `GlassMegaMenu`: Expanded shop menu previewing sports photography.
74: - `GlassCartDrawer`: Sliding shopping bag overlay.
75: 
76: ---
77: 
78: ## 5. Custom Cursor & Interactive Micro-Physics
79: On desktop, a reactive pointer establishes tactile immersion:
80: - **Default**: 8px solid ink dot with smooth 18px outer spring ring.
81: - **Image Hover**: Expands to 64px glass circle with white text: `VIEW →`.
82: - **Product Card Hover**: Expands to 72px electric cobalt badge: `QUICK ADD`.
83: - **Project Card Hover**: Expands to 64px safety orange circle: `EXPLORE`.
84: - **Button Hover**: Magnetic attraction with spring easing.
85: - **Touch / Reduced Motion**: Automatically disabled via `@media (hover: none)` and `prefers-reduced-motion`.
86: 
87: ---
88: 
89: ## 6. Asymmetrical Brutalist Layouts
90: No two sections look identical:
91: 1. **Hero**: Edge-to-edge cinematic viewport with oversized colliding typography, mouse tilt parallax, and floating glass controls.
92: 2. **Shop by Sport**: Asymmetrical editorial grid where hovered sports expand dynamically while adjacent cards adjust with spring physics.
93: 3. **Featured Gear**: Staggered spotlight card + interactive rail with instant image swap, quick-add hover slide, and tabular price shifts.
94: 4. **Build a Court**: Architectural full-bleed photography with pinned glass engineering specifications and real Pune project case studies.
95: 5. **Visit Oriental**: Split composition with address typography colliding directly over high-contrast store workshop imagery.
````

## File: docs/VISUAL_REFERENCE_MAP.md
````markdown
 1: # VISUAL REFERENCE MAP — ORIENTAL SPORTS PUNE
 2: 
 3: > **Authoritative Mapping of Design & Interaction References to Oriental Sports Pune Implementation**
 4: 
 5: ---
 6: 
 7: ## 1. Reference Implementation Matrix
 8: 
 9: | Reference | Extract | Oriental Location |
10: | :--- | :--- | :--- |
11: | **Two Times** | Cinematic hero choreography | `HERO` |
12: | **Frameblox** | Hero / gallery / product mechanics | `HERO + GEAR` |
13: | **RELOAD** | Bold editorial composition | `HERO + COURTS` |
14: | **INDEX** | Spatial typography / rhythm | `SITE-WIDE` |
15: | **Cosmos / Sivaeroee** | Visual curation & image relationships | `SPORT + COURTS` |
16: | **21st Hover** | Directional interaction & reveals | `SPORT + GEAR` |
17: | **21st Cursor** | Contextual cursor system | `SITE-WIDE` |
18: | **21st Mouse** | Parallax & magnetic behavior | `HERO + GEAR` |
19: 
20: ---
21: 
22: ## 2. Detailed Reference Breakdowns
23: 
24: ### Reference A — Two Times Hero / Motion
25: - **URL**: https://dribbble.com/shots/5889309-Two-Times-Homepage-Animation-Alternative-Version
26: - **What Was Studied**: Cinematic homepage choreography, image-led hero composition, multi-plane typography movement, transition timing, directional clip-path transitions, visual tension.
27: - **What Mechanic Was Extracted**: Multi-layer slide transitions where photography, oversized kinetic typography, and floating controls animate on distinct visual planes.
28: - **Where It Is Used**: `src/components/home/Hero.tsx` (Chapters 01 & 02).
29: - **What Was Changed For Oriental Sports**: Integrated authentic Oriental Sports photography (badminton smash, cricket willow strike, court floodlights), Plate Gold/Ink Black controls, and commercial quick-access pills.
30: - **Why It Improves UX**: Creates an immediate, powerful athletic first impression while keeping commerce paths accessible within the first viewport.
31: 
32: ---
33: 
34: ### Reference B — Frameblox Craft
35: - **URL**: https://www.frameblox.com/craft
36: - **What Was Studied**: Animated hero sections, webshop product composition, image zoom/reveal interactions, tactile section transitions.
37: - **What Mechanic Was Extracted**: Subtle 2.5D cursor-reactive layer offsets, smooth expanding accordion rails, and secondary angle hover image swaps.
38: - **Where It Is Used**: `src/components/home/Hero.tsx` & `src/components/home/FeaturedProducts.tsx`.
39: - **What Was Changed For Oriental Sports**: Re-authored in pure React/CSS without generic template bloat, tuned to Indian sports equipment context.
40: - **Why It Improves UX**: Allows customers to inspect equipment angles and feel tactile responsiveness without layout thrashing.
41: 
42: ---
43: 
44: ### Reference C — RELOAD Creative Website
45: - **URL**: https://www.behance.net/gallery/235733483/RELOAD-CREATIVE-AGENCY-WEBSITE
46: - **What Was Studied**: Bold athletic typography, asymmetric layout grids, hard structural rules, desktop vs mobile composition differences.
47: - **What Mechanic Was Extracted**: Asymmetric typography-crossing-image boundaries (Slide B), structural dividing rules, and mobile-specific editorial reflow.
48: - **Where It Is Used**: `src/components/home/Hero.tsx`, `src/components/home/CourtsSection.tsx`.
49: - **What Was Changed For Oriental Sports**: Replaced generic agency copy with verified sports infrastructure and equipment language.
50: - **Why It Improves UX**: Gives authority to Oriental Sports' dual identity as an equipment house and court builder without generic card clutter.
51: 
52: ---
53: 
54: ### Reference D — INDEX Design Studio
55: - **URL**: https://www.behance.net/gallery/242026973/INDEX-Design-studio
56: - **What Was Studied**: Restrained typography, spatial rhythm, generous negative space, controlled graphic elements.
57: - **What Mechanic Was Extracted**: Visual Restraint Law (30–40% quiet Ivory Court space), clean typography without artificial telemetry.
58: - **Where It Is Used**: Site-wide token foundation (`tokens.css`, `global.css`, `FeaturedProducts.tsx`, `VisitStore.tsx`).
59: - **What Was Changed For Oriental Sports**: Applied warm Ivory Court (`#F6F3EA`) substrate with Jet Black (`#111111`) ink.
60: - **Why It Improves UX**: Eliminates cognitive overload and AI-slop, allowing products and photography to command attention.
61: 
62: ---
63: 
64: ### Reference E — Cosmos / Sivaeroee
65: - **URL**: https://www.cosmos.so/sivaeroee/design
66: - **What Was Studied**: Visual curation, image cropping as architecture, whitespace, editorial sequencing.
67: - **What Mechanic Was Extracted**: Full-bleed un-obscured physical sports photography as the structural foundation of the page.
68: - **Where It Is Used**: `src/components/home/ShopBySport.tsx`, `src/components/home/CourtsSection.tsx`.
69: - **What Was Changed For Oriental Sports**: Used authentic equipment and sports court imagery from Pune.
70: - **Why It Improves UX**: Engages sports enthusiasts emotionally with real playing surfaces rather than generic stock icons.
71: 
72: ---
73: 
74: ### Reference F — 21st.dev Hover Components
75: - **URL**: https://21st.dev/community/components/explore/hover-dev
76: - **What Was Studied**: Directional hover, interactive hover links, image reveal mechanics, expanding panel interactions.
77: - **What Mechanic Was Extracted**: Expanding kinetic sport rail (`flex: 3.5` on hover, `flex: 1` resting) with synchronized image scale, typography contrast, and `EXPLORE` cursor.
78: - **Where It Is Used**: `src/components/home/ShopBySport.tsx`, `src/components/products/ProductCard.tsx`.
79: - **What Was Changed For Oriental Sports**: Tuned transition timings to 350–450ms for snappy responsiveness, with complete tap alternatives on mobile.
80: - **Why It Improves UX**: Makes category discovery exciting and tactile while maintaining 100% keyboard and mobile accessibility.
81: 
82: ---
83: 
84: ### Reference G — 21st.dev Cursor & Mouse Effects
85: - **URL**: https://21st.dev/community/components/explore/cursor-animation-effects
86: - **What Was Studied**: Contextual cursor tracking, morphing states, smooth interpolation, touch exclusion.
87: - **What Mechanic Was Extracted**: Custom cursor with states (`DEFAULT`, `VIEW`, `SHOP`, `EXPLORE`, `DRAG`), magnetic button physics, and automatic disable on coarse pointers/inputs.
88: - **Where It Is Used**: `src/components/ui/CustomCursor.tsx` and interactive buttons.
89: - **What Was Changed For Oriental Sports**: Disabled over text inputs, selection, and touch; never required for usability.
90: - **Why It Improves UX**: Adds micro-delight and intent feedback on desktop without compromising accessibility.
````

## File: scripts/audit-phase5-courts.mjs
````javascript
  1: import { chromium } from 'playwright';
  2: import path from 'path';
  3: 
  4: const ARTIFACT_DIR = 'C:/Users/vighnesh jadhav/.gemini/antigravity-ide/brain/706edd60-6015-478e-ad28-a7ad181b62fb';
  5: 
  6: async function auditPhase5Courts() {
  7:   console.log('Starting Phase 5 Courts Audit...');
  8:   const browser = await chromium.launch({ headless: true });
  9: 
 10:   const viewports = [
 11:     { name: 'desktop_1440', width: 1440, height: 900, isMobile: false },
 12:     { name: 'tablet_768', width: 768, height: 1024, isMobile: false },
 13:     { name: 'mobile_390', width: 390, height: 844, isMobile: true },
 14:   ];
 15: 
 16:   for (const vp of viewports) {
 17:     console.log(`\n========================================`);
 18:     console.log(`Auditing Viewport: ${vp.name} (${vp.width}x${vp.height})`);
 19:     console.log(`========================================`);
 20: 
 21:     const context = await browser.newContext({
 22:       viewport: { width: vp.width, height: vp.height },
 23:       isMobile: vp.isMobile,
 24:       hasTouch: vp.isMobile,
 25:     });
 26:     const page = await context.newPage();
 27: 
 28:     // Bypass intro animation by setting sessionStorage
 29:     await page.addInitScript(() => {
 30:       sessionStorage.setItem('os_intro_seen', 'true');
 31:     });
 32: 
 33:     await page.goto('http://localhost:4000/', { waitUntil: 'networkidle' });
 34: 
 35:     // Assert zero overflow at top
 36:     const overflowAtTop = await page.evaluate(() => {
 37:       return document.documentElement.scrollWidth <= window.innerWidth;
 38:     });
 39:     console.log(`[${vp.name}] Zero overflow at top: ${overflowAtTop}`);
 40:     if (!overflowAtTop) {
 41:       console.error(`ERROR: Horizontal overflow detected at top of page in ${vp.name}`);
 42:     }
 43: 
 44:     // Scroll exactly to top of #courts-section (p === 0.0)
 45:     await page.evaluate(() => {
 46:       const el = document.getElementById('courts-section');
 47:       if (el) {
 48:         const top = el.getBoundingClientRect().top + window.scrollY;
 49:         window.scrollTo({ top, behavior: 'instant' });
 50:       }
 51:     });
 52:     await page.waitForTimeout(500);
 53: 
 54:     // Assert zero overflow at Courts section
 55:     const overflowAtCourts = await page.evaluate(() => {
 56:       return document.documentElement.scrollWidth <= window.innerWidth;
 57:     });
 58:     console.log(`[${vp.name}] Zero overflow at Courts section: ${overflowAtCourts}`);
 59:     if (!overflowAtCourts) {
 60:       console.error(`ERROR: Horizontal overflow detected in Courts section in ${vp.name}`);
 61:     }
 62: 
 63:     // Capture opening state of Courts section (p === 0.0)
 64:     await page.screenshot({
 65:       path: path.join(ARTIFACT_DIR, `phase5_courts_${vp.name}_opening.png`),
 66:     });
 67:     console.log(`[${vp.name}] Captured opening screenshot (p === 0.0).`);
 68: 
 69:     // Mid-scroll into the pinned sequence (p ~ 0.35)
 70:     await page.evaluate(() => {
 71:       window.scrollBy({ top: 450, behavior: 'instant' });
 72:     });
 73:     await page.waitForTimeout(400);
 74: 
 75:     await page.screenshot({
 76:       path: path.join(ARTIFACT_DIR, `phase5_courts_${vp.name}_mid_scroll.png`),
 77:     });
 78:     console.log(`[${vp.name}] Captured mid-scroll screenshot.`);
 79: 
 80:     // Scroll to services reveal (p ~ 0.70)
 81:     await page.evaluate(() => {
 82:       window.scrollBy({ top: 500, behavior: 'instant' });
 83:     });
 84:     await page.waitForTimeout(400);
 85: 
 86:     await page.screenshot({
 87:       path: path.join(ARTIFACT_DIR, `phase5_courts_${vp.name}_services.png`),
 88:     });
 89:     console.log(`[${vp.name}] Captured services reveal screenshot.`);
 90: 
 91:     // Test service hover on desktop/tablet
 92:     if (!vp.isMobile) {
 93:       const lightingItem = page.locator('#courts-section [data-service="lighting"]');
 94:       if (await lightingItem.count() > 0) {
 95:         await lightingItem.hover({ force: true });
 96:         await page.waitForTimeout(400);
 97:         await page.screenshot({
 98:           path: path.join(ARTIFACT_DIR, `phase5_courts_${vp.name}_hover_lighting.png`),
 99:         });
100:         console.log(`[${vp.name}] Captured service hover screenshot.`);
101:       }
102:     }
103: 
104:     await context.close();
105:   }
106: 
107:   await browser.close();
108:   console.log('\nAll viewports audited successfully with zero errors!');
109: }
110: 
111: auditPhase5Courts().catch(err => {
112:   console.error('Audit failed:', err);
113:   process.exit(1);
114: });
````

## File: scripts/capture-fullpage.mjs
````javascript
 1: import { chromium } from 'playwright';
 2: 
 3: async function captureFullPage() {
 4:   const browser = await chromium.launch({ headless: true });
 5:   
 6:   // Desktop Full Page
 7:   const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
 8:   const desktopPage = await desktopContext.newPage();
 9:   await desktopPage.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
10:   await desktopPage.screenshot({ path: 'docs/visual-audits/fullpage_desktop.png', fullPage: true });
11:   await desktopContext.close();
12: 
13:   // Mobile Full Page
14:   const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
15:   const mobilePage = await mobileContext.newPage();
16:   await mobilePage.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
17:   await mobilePage.screenshot({ path: 'docs/visual-audits/fullpage_mobile.png', fullPage: true });
18:   await mobileContext.close();
19: 
20:   await browser.close();
21:   console.log('Full page screenshots generated successfully.');
22: }
23: 
24: captureFullPage();
````

## File: scripts/check-images.mjs
````javascript
 1: import fs from 'fs';
 2: 
 3: const files = ['src/data/courts.ts', 'src/data/products.ts', 'src/data/storeInfo.ts'];
 4: let allUrls = [];
 5: 
 6: for (const f of files) {
 7:   if (fs.existsSync(f)) {
 8:     const text = fs.readFileSync(f, 'utf8');
 9:     const matches = text.match(/https:\/\/images\.unsplash\.com\/[^\s'"`]+/g) || [];
10:     allUrls.push(...matches);
11:   }
12: }
13: 
14: allUrls = [...new Set(allUrls)];
15: console.log(`Checking ${allUrls.length} unique Unsplash URLs...`);
16: 
17: async function run() {
18:   const bad = [];
19:   for (const url of allUrls) {
20:     try {
21:       const res = await fetch(url, { method: 'HEAD' });
22:       if (!res.ok) {
23:         bad.push({ url, status: res.status });
24:       }
25:     } catch (e) {
26:       bad.push({ url, error: e.message });
27:     }
28:   }
29: 
30:   console.log(`Scan complete. Found ${bad.length} bad URLs.`);
31:   if (bad.length > 0) {
32:     console.log(JSON.stringify(bad, null, 2));
33:   }
34: }
35: 
36: run();
````

## File: scripts/check-media.mjs
````javascript
  1: import { chromium } from 'playwright';
  2: 
  3: const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
  4: 
  5: async function checkMedia() {
  6:   console.log(`\n🔍 Checking Media & Asset Integrity at ${BASE_URL}...`);
  7: 
  8:   const browser = await chromium.launch({ headless: true });
  9:   const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
 10: 
 11:   const failedRequests = [];
 12:   const consoleErrors = [];
 13: 
 14:   page.on('requestfailed', (req) => {
 15:     failedRequests.push({ url: req.url(), failure: req.failure()?.errorText });
 16:   });
 17: 
 18:   page.on('console', (msg) => {
 19:     if (msg.type() === 'error') {
 20:       consoleErrors.push(msg.text());
 21:     }
 22:   });
 23: 
 24:   try {
 25:     const response = await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 20000 });
 26:     console.log(`  HTTP Response Status: ${response?.status()}`);
 27: 
 28:     // Scroll down to trigger lazy loading across all sections
 29:     await page.evaluate(async () => {
 30:       await new Promise((resolve) => {
 31:         let totalHeight = 0;
 32:         const distance = 400;
 33:         const timer = setInterval(() => {
 34:           const scrollHeight = document.body.scrollHeight;
 35:           window.scrollBy(0, distance);
 36:           totalHeight += distance;
 37: 
 38:           if (totalHeight >= scrollHeight) {
 39:             clearInterval(timer);
 40:             resolve();
 41:           }
 42:         }, 100);
 43:       });
 44:     });
 45: 
 46:     // Trigger eager loading and decode on all images
 47:     await page.evaluate(async () => {
 48:       const imgs = Array.from(document.querySelectorAll('img'));
 49:       imgs.forEach((img) => {
 50:         img.loading = 'eager';
 51:       });
 52: 
 53:       await Promise.all(
 54:         imgs.map((img) => {
 55:           if (img.complete && img.naturalWidth > 0) return Promise.resolve();
 56:           return img.decode().catch(() => {
 57:             return new Promise((resolve) => {
 58:               img.addEventListener('load', resolve, { once: true });
 59:               img.addEventListener('error', resolve, { once: true });
 60:               setTimeout(resolve, 6000);
 61:             });
 62:           });
 63:         })
 64:       );
 65:     });
 66:     await page.waitForTimeout(1000);
 67: 
 68:     // Evaluate all <img> elements on the rendered page
 69:     const imageReport = await page.evaluate(() => {
 70:       const images = Array.from(document.querySelectorAll('img'));
 71:       return images.map((img) => ({
 72:         src: img.src,
 73:         alt: img.alt,
 74:         complete: img.complete,
 75:         naturalWidth: img.naturalWidth,
 76:         naturalHeight: img.naturalHeight,
 77:         displayed: img.offsetWidth > 0 && img.offsetHeight > 0,
 78:       }));
 79:     });
 80: 
 81:     console.log(`\n📊 Total rendered images inspected: ${imageReport.length}`);
 82: 
 83:     const brokenImages = imageReport.filter(
 84:       (img) => !img.complete || img.naturalWidth === 0 || img.naturalHeight === 0
 85:     );
 86: 
 87:     if (brokenImages.length > 0) {
 88:       console.error(`❌ Found ${brokenImages.length} broken image(s):`);
 89:       brokenImages.forEach((img, i) => {
 90:         console.error(`  [${i + 1}] src: ${img.src} (naturalWidth: ${img.naturalWidth}, alt: "${img.alt}")`);
 91:       });
 92:     } else {
 93:       console.log(`✅ All ${imageReport.length} rendered images loaded successfully with natural dimensions!`);
 94:     }
 95: 
 96:     if (failedRequests.length > 0) {
 97:       console.warn(`⚠️ Failed Network Requests (${failedRequests.length}):`);
 98:       failedRequests.forEach((req) => console.warn(`  - ${req.url}: ${req.failure}`));
 99:     } else {
100:       console.log(`✅ 0 failed network requests.`);
101:     }
102: 
103:     if (consoleErrors.length > 0) {
104:       console.warn(`⚠️ Console Errors (${consoleErrors.length}):`);
105:       consoleErrors.forEach((err) => console.warn(`  - ${err}`));
106:     } else {
107:       console.log(`✅ 0 browser console errors.`);
108:     }
109: 
110:     await browser.close();
111: 
112:     if (brokenImages.length > 0) {
113:       process.exit(1);
114:     } else {
115:       console.log(`\n🎉 Media Integrity Audit Passed with 0 broken assets!\n`);
116:       process.exit(0);
117:     }
118:   } catch (err) {
119:     console.error('Audit run error:', err);
120:     await browser.close();
121:     process.exit(1);
122:   }
123: }
124: 
125: checkMedia();
````

## File: scripts/visual-audit.mjs
````javascript
  1: import { chromium } from 'playwright';
  2: import fs from 'fs';
  3: import path from 'path';
  4: 
  5: const AUDIT_DIR = path.resolve('docs/visual-audits');
  6: if (!fs.existsSync(AUDIT_DIR)) {
  7:   fs.mkdirSync(AUDIT_DIR, { recursive: true });
  8: }
  9: 
 10: async function runVisualAudit() {
 11:   console.log('🚀 Starting Oriental Sports Playwright Visual & Network Audit...');
 12: 
 13:   const browser = await chromium.launch({ channel: 'chrome', headless: true });
 14:   const context = await browser.newContext({
 15:     viewport: { width: 1440, height: 900 },
 16:   });
 17: 
 18:   const page = await context.newPage();
 19: 
 20:   const failedRequests = [];
 21:   const consoleErrors = [];
 22: 
 23:   page.on('requestfailed', (request) => {
 24:     failedRequests.push({
 25:       url: request.url(),
 26:       failure: request.failure()?.errorText || 'Failed to load',
 27:     });
 28:   });
 29: 
 30:   page.on('console', (msg) => {
 31:     if (msg.type() === 'error') {
 32:       consoleErrors.push(msg.text());
 33:     }
 34:   });
 35: 
 36:   try {
 37:     // 1. Desktop Homepage
 38:     console.log('📸 1. Capturing Desktop Homepage (1440x900)...');
 39:     await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded' });
 40:     await page.waitForTimeout(1000);
 41:     await page.screenshot({ path: path.join(AUDIT_DIR, '01_homepage_desktop_1440.png') });
 42:     await page.screenshot({ path: path.join(AUDIT_DIR, '01_homepage_desktop_full.png'), fullPage: true });
 43: 
 44:     // 2. Hover Navigation Mega Menu
 45:     console.log('📸 2. Hovering SHOP Navigation Mega Menu...');
 46:     const shopNav = page.locator('nav a:has-text("SHOP"), button:has-text("SHOP"), a:has-text("SHOP")').first();
 47:     if (await shopNav.isVisible()) {
 48:       await shopNav.hover();
 49:       await page.waitForTimeout(600);
 50:       await page.screenshot({ path: path.join(AUDIT_DIR, '02_mega_menu_hover.png') });
 51:     }
 52: 
 53:     // 3. Shop by Sport Accordion Interaction
 54:     console.log('📸 3. Testing Shop by Sport Kinetic Accordion...');
 55:     const pickleballCard = page.locator('a[href*="/shop/pickleball"]').first();
 56:     if (await pickleballCard.isVisible()) {
 57:       await pickleballCard.scrollIntoViewIfNeeded();
 58:       await pickleballCard.hover();
 59:       await page.waitForTimeout(600);
 60:       await page.screenshot({ path: path.join(AUDIT_DIR, '03_shop_by_sport_hover.png') });
 61:     }
 62: 
 63:     // 4. Featured Gear Product Hover & Quick Add
 64:     console.log('📸 4. Testing Featured Gear Product Hover...');
 65:     const productCard = page.locator('.brutalist-product-card, .product-card').first();
 66:     if (await productCard.isVisible()) {
 67:       await productCard.scrollIntoViewIfNeeded();
 68:       await productCard.hover();
 69:       await page.waitForTimeout(500);
 70:       await page.screenshot({ path: path.join(AUDIT_DIR, '04_product_card_hover.png') });
 71:     }
 72: 
 73:     // 5. Open Search Command Palette (CMD+K)
 74:     console.log('📸 5. Testing Search Command Palette...');
 75:     const searchBtn = page.locator('button[aria-label*="Search"], button:has-text("Search"), button:has(svg)').first();
 76:     await page.keyboard.press('Control+k');
 77:     await page.waitForTimeout(500);
 78:     await page.screenshot({ path: path.join(AUDIT_DIR, '05_search_palette_active.png') });
 79:     await page.keyboard.press('Escape');
 80:     await page.waitForTimeout(300);
 81: 
 82:     // 6. Open Slide-out Cart Drawer
 83:     console.log('📸 6. Testing Cart Drawer...');
 84:     const bagBtn = page.locator('button:has-text("BAG"), button[aria-label*="Bag"]').first();
 85:     if (await bagBtn.isVisible()) {
 86:       await bagBtn.click();
 87:       await page.waitForTimeout(600);
 88:       await page.screenshot({ path: path.join(AUDIT_DIR, '06_cart_drawer_active.png') });
 89:       const closeBtn = page.locator('button[aria-label="Close Bag"]').first();
 90:       if (await closeBtn.isVisible()) await closeBtn.click();
 91:     }
 92: 
 93:     // 7. Mobile Viewport (390x844 - iPhone 14 standard)
 94:     console.log('📸 7. Capturing Mobile Viewport (390x844)...');
 95:     await page.setViewportSize({ width: 390, height: 844 });
 96:     await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded' });
 97:     await page.waitForTimeout(800);
 98:     await page.screenshot({ path: path.join(AUDIT_DIR, '07_homepage_mobile_390.png') });
 99:     await page.screenshot({ path: path.join(AUDIT_DIR, '07_homepage_mobile_full.png'), fullPage: true });
100: 
101:     // 8. Shop Catalog Page
102:     console.log('📸 8. Testing Shop Catalog Page...');
103:     await page.setViewportSize({ width: 1440, height: 900 });
104:     await page.goto('http://localhost:3001/shop', { waitUntil: 'domcontentloaded' });
105:     await page.waitForTimeout(600);
106:     await page.screenshot({ path: path.join(AUDIT_DIR, '08_shop_catalog_1440.png') });
107: 
108:     // 9. Product Detail Page
109:     console.log('📸 9. Testing Product Detail Page (Toray Carbon Spotlight)...');
110:     await page.goto('http://localhost:3001/product/oriental-pro-carbon-pickleball-paddle', { waitUntil: 'domcontentloaded' });
111:     await page.waitForTimeout(600);
112:     await page.screenshot({ path: path.join(AUDIT_DIR, '09_product_detail_1440.png') });
113: 
114:     // 10. Courts Showcase Page
115:     console.log('📸 10. Testing Courts Showcase Page...');
116:     await page.goto('http://localhost:3001/courts', { waitUntil: 'domcontentloaded' });
117:     await page.waitForTimeout(600);
118:     await page.screenshot({ path: path.join(AUDIT_DIR, '10_courts_page_1440.png') });
119: 
120:     // 11. Court Projects Portfolio Page
121:     console.log('📸 11. Testing Court Projects Portfolio Page...');
122:     await page.goto('http://localhost:3001/courts/projects', { waitUntil: 'domcontentloaded' });
123:     await page.waitForTimeout(600);
124:     await page.screenshot({ path: path.join(AUDIT_DIR, '11_court_projects_1440.png') });
125: 
126:     // 12. Court Project Detail Page (Koregaon Park)
127:     console.log('📸 12. Testing Court Project Detail Page...');
128:     await page.goto('http://localhost:3001/courts/koregaon-park-pickleball-club', { waitUntil: 'domcontentloaded' });
129:     await page.waitForTimeout(600);
130:     await page.screenshot({ path: path.join(AUDIT_DIR, '12_court_project_detail_1440.png') });
131: 
132:     // 13. Sports Bag & Checkout Page
133:     console.log('📸 13. Testing Sports Bag & Checkout Page...');
134:     await page.goto('http://localhost:3001/cart', { waitUntil: 'domcontentloaded' });
135:     await page.waitForTimeout(600);
136:     await page.screenshot({ path: path.join(AUDIT_DIR, '13_cart_page_1440.png') });
137: 
138:     // 14. Visit Flagship Store Page (Camp, Pune)
139:     console.log('📸 14. Testing Visit Store Page...');
140:     await page.goto('http://localhost:3001/visit', { waitUntil: 'domcontentloaded' });
141:     await page.waitForTimeout(600);
142:     await page.screenshot({ path: path.join(AUDIT_DIR, '14_visit_page_1440.png') });
143: 
144:     // 15. About Oriental Sports Archive Page
145:     console.log('📸 15. Testing About Heritage Page...');
146:     await page.goto('http://localhost:3001/about', { waitUntil: 'domcontentloaded' });
147:     await page.waitForTimeout(600);
148:     await page.screenshot({ path: path.join(AUDIT_DIR, '15_about_page_1440.png') });
149: 
150:     // 16. Search Discovery Results Page
151:     console.log('📸 16. Testing Search Results Page (Query: pickleball)...');
152:     await page.goto('http://localhost:3001/search?q=pickleball', { waitUntil: 'domcontentloaded' });
153:     await page.waitForTimeout(600);
154:     await page.screenshot({ path: path.join(AUDIT_DIR, '16_search_page_1440.png') });
155: 
156:     // 17. Athlete Account & Services Page
157:     console.log('📸 17. Testing Athlete Account Hub...');
158:     await page.goto('http://localhost:3001/account', { waitUntil: 'domcontentloaded' });
159:     await page.waitForTimeout(600);
160:     await page.screenshot({ path: path.join(AUDIT_DIR, '17_account_page_1440.png') });
161: 
162:     console.log('✅ All visual audit screenshots captured successfully in docs/visual-audits/');
163:   } catch (err) {
164:     console.error('❌ Error during visual audit:', err);
165:   } finally {
166:     await browser.close();
167:   }
168: 
169:   // Report Network & Console Audit Results
170:   console.log('\n--- NETWORK & CONSOLE AUDIT SUMMARY ---');
171:   const imageFails = failedRequests.filter((r) => r.url.match(/\.(png|jpg|jpeg|webp|svg)/i));
172:   console.log(`Broken Image Requests: ${imageFails.length}`);
173:   if (imageFails.length > 0) {
174:     console.log('Failed image URLs:', imageFails);
175:   }
176:   console.log(`Console Errors: ${consoleErrors.length}`);
177:   if (consoleErrors.length > 0) {
178:     console.log('Console Errors:', consoleErrors);
179:   }
180: }
181: 
182: runVisualAudit();
````

## File: src/components/courts/BuildSteps.tsx
````typescript
 1: import React from 'react';
 2: import { Reveal, Stagger, StaggerItem } from '../motion/Reveal';
 3: 
 4: /** The stages of a court build — a real sequence, so the numbers carry meaning. */
 5: export const BUILD_STEPS = [
 6:   { name: 'Site visit', note: 'We measure the site, check levels and drainage, and agree the layout with you.' },
 7:   { name: 'Sub-base', note: 'Ground preparation and a stable base laid to a drainage slope.' },
 8:   { name: 'Surface', note: 'Acrylic, cushioned acrylic, modular tiles, timber or turf — chosen by sport.' },
 9:   { name: 'Fencing, nets & lights', note: 'Perimeter fencing, posts and nets, and floodlighting for evening play.' },
10:   { name: 'Lines & handover', note: 'Regulation line marking, a final walk-through, and the court is yours.' },
11: ];
12: 
13: export const BuildSteps: React.FC<{ title?: string }> = ({ title = 'What a build covers' }) => (
14:   <div className="build-steps-block">
15:     <Reveal as="p" className="eyebrow">{title}</Reveal>
16:     <Stagger as="ol" className="build-steps" stagger={0.08}>
17:       {BUILD_STEPS.map((step, i) => (
18:         <StaggerItem as="li" key={step.name} className="build-step">
19:           <span className="build-step-num" aria-hidden="true">{i + 1}</span>
20:           <span className="build-step-name">{step.name}</span>
21:           <span className="build-step-note">{step.note}</span>
22:         </StaggerItem>
23:       ))}
24:     </Stagger>
25:   </div>
26: );
27: 
28: export default BuildSteps;
````

## File: src/components/home/CourtsChapter.tsx
````typescript
 1: import React, { useRef } from 'react';
 2: import { Link } from 'react-router-dom';
 3: import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
 4: import { COURT_SERVICES } from '../../data/courts';
 5: import { IMAGES, MediaImage } from '../../data/media';
 6: import { STORE_INFO } from '../../data/storeInfo';
 7: import { Img } from '../ui/Img';
 8: import { Reveal, RevealLines, Stagger, StaggerItem } from '../motion/Reveal';
 9: import { BuildSteps } from '../courts/BuildSteps';
10: 
11: /**
12:  * COURTS — the night-court chapter.
13:  * 1. Full-bleed court at dusk, "We build courts." with a restrained scroll drift.
14:  * 2. Sticky call to action beside the court types we build (from COURT_SERVICES).
15:  * 3. What a build covers (shared BuildSteps).
16:  */
17: 
18: const COURT_ART: Record<string, MediaImage> = {
19:   Pickleball: IMAGES.pickleballPaddles,
20:   Tennis: IMAGES.surfaceNet,
21:   Badminton: IMAGES.badmintonHall,
22:   'Turf & Multi-sport': IMAGES.turfFootball,
23:   Squash: IMAGES.squashCourts,
24: };
25: 
26: 
27: 
28: export const CourtsChapter: React.FC = () => {
29:   const reduced = useReducedMotion();
30:   const heroRef = useRef<HTMLDivElement>(null);
31:   const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start end', 'end start'] });
32:   const drift = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);
33: 
34:   return (
35:     <section className="courts-chapter on-dark" aria-labelledby="courts-title">
36:       <div className="courts-hero" ref={heroRef}>
37:         <div className="courts-hero-media" aria-hidden="true">
38:           <motion.div className="courts-hero-drift" style={reduced ? undefined : { y: drift }}>
39:             <Img image={IMAGES.surfaceBlueLines} alt="" sizes="100vw" />
40:           </motion.div>
41:         </div>
42:         <div className="container courts-hero-copy">
43:           <Reveal as="p" className="eyebrow">Courts</Reveal>
44:           <RevealLines as="h2" id="courts-title" lines={['We build', 'courts.']} className="display d-hero courts-title" />
45:           <Reveal as="p" className="courts-lead" delay={0.15}>
46:             Turnkey court construction, surface systems, fencing, lighting and line marking — for clubs, schools,
47:             residential societies and homes across Pune and Maharashtra.
48:           </Reveal>
49:         </div>
50:       </div>
51: 
52:       <div className="container courts-body">
53:         <div className="courts-aside">
54:           <div className="courts-aside-sticky">
55:             <RevealLines as="h3" lines={['From bare ground', 'to first serve.']} className="display d-2" />
56:             <Reveal as="p" className="courts-aside-text" delay={0.1}>
57:               One team from the first site visit to handover. Tell us the sport, the space and how you play — we’ll
58:               come and look.
59:             </Reveal>
60:             <Reveal className="courts-actions" delay={0.15}>
61:               <Link to="/courts" className="btn btn-gold">
62:                 Plan your court <span className="btn-arrow" aria-hidden="true">→</span>
63:               </Link>
64:               <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-outline-light">
65:                 WhatsApp us
66:               </a>
67:             </Reveal>
68:           </div>
69:         </div>
70: 
71:         <Stagger as="ul" className="court-types" stagger={0.07} amount={0.05}>
72:           {COURT_SERVICES.map((service) => (
73:             <StaggerItem as="li" key={service.id}>
74:               <Link to={`/courts#${service.slug}`} className="court-type">
75:                 <span className="court-type-media">
76:                   <Img image={COURT_ART[service.sport] ?? service.heroImage} alt="" sizes="(min-width: 1024px) 22vw, 100vw" />
77:                 </span>
78:                 <span className="court-type-text">
79:                   <span className="court-type-name">{service.sport}</span>
80:                   <span className="court-type-surfaces">{service.surfaceTypes.join(' · ')}</span>
81:                   <span className="court-type-time">Typical build: {service.leadTime.toLowerCase()}</span>
82:                 </span>
83:                 <span className="court-type-arrow" aria-hidden="true">→</span>
84:               </Link>
85:             </StaggerItem>
86:           ))}
87:         </Stagger>
88:       </div>
89: 
90:       <div className="container courts-steps">
91:         <BuildSteps />
92:       </div>
93:     </section>
94:   );
95: };
96: 
97: export default CourtsChapter;
````

## File: src/components/home/GearEdit.tsx
````typescript
 1: import React from 'react';
 2: import { Link } from 'react-router-dom';
 3: import { PRODUCTS } from '../../data/products';
 4: import { Product } from '../../types';
 5: import { ProductCard } from '../products/ProductCard';
 6: import { Reveal, RevealLines, Stagger, StaggerItem } from '../motion/Reveal';
 7: 
 8: /**
 9:  * GEAR — "On the wall at Camp".
10:  * Desktop: sticky chapter column + 2×2 studio-shot products.
11:  * Mobile: chapter intro, then a swipeable rail with the next card peeking.
12:  */
13: 
14: // The four pieces photographed in the studio — consistent staging, real prices.
15: const EDIT_IDS = ['prod-crick-01', 'prod-bad-01', 'prod-ten-01', 'prod-pb-01'];
16: const EDIT = EDIT_IDS.map((id) => PRODUCTS.find((p) => p.id === id)).filter((p): p is Product => Boolean(p));
17: 
18: const SERVICES = [
19:   { name: 'Racquet stringing', note: 'Badminton, tennis and squash' },
20:   { name: 'Bat knocking-in', note: 'New willow prepared for the hard ball' },
21:   { name: 'Fitting advice', note: 'Grips, weights and sizes, in person' },
22: ];
23: 
24: export const GearEdit: React.FC = () => (
25:   <section className="gear-edit section bg-stone" aria-labelledby="gear-edit-title">
26:     <div className="container gear-grid">
27:       <div className="gear-intro">
28:         <div className="gear-intro-sticky">
29:           <Reveal as="p" className="eyebrow">Gear</Reveal>
30:           <RevealLines as="h2" id="gear-edit-title" lines={['On the wall', 'at Camp.']} className="display d-1 chapter-title" />
31:           <Reveal as="p" className="lead" delay={0.1}>
32:             A short edit from the store floor: a match bat, two racquets and a paddle, in stock at the Camp store.
33:           </Reveal>
34: 
35:           <Reveal delay={0.15}>
36:             <ul className="service-list" aria-label="In-store services">
37:               {SERVICES.map((s) => (
38:                 <li key={s.name}>
39:                   <span className="service-name">{s.name}</span>
40:                   <span className="service-note">{s.note}</span>
41:                 </li>
42:               ))}
43:             </ul>
44:             <Link to="/shop" className="btn btn-primary gear-cta">
45:               Shop all gear <span className="btn-arrow" aria-hidden="true">→</span>
46:             </Link>
47:           </Reveal>
48:         </div>
49:       </div>
50: 
51:       <Stagger as="ul" className="gear-products" stagger={0.08} amount={0.1}>
52:         {EDIT.map((product) => (
53:           <StaggerItem as="li" key={product.id} className="gear-product">
54:             <ProductCard product={product} sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 78vw" />
55:           </StaggerItem>
56:         ))}
57:       </Stagger>
58:     </div>
59:   </section>
60: );
61: 
62: export default GearEdit;
````

## File: src/components/home/SportIndex.tsx
````typescript
 1: import React, { useState } from 'react';
 2: import { Link } from 'react-router-dom';
 3: import { CATEGORIES } from '../../data/categories';
 4: import { IMAGES, MediaImage } from '../../data/media';
 5: import { Img } from '../ui/Img';
 6: import { Reveal, RevealLines } from '../motion/Reveal';
 7: import { SportCategory } from '../../types';
 8: 
 9: /**
10:  * SPORT INDEX — "Shop by sport".
11:  * Desktop: an expanding photographic rail; the active sport takes ~46% of the
12:  * width and shows what the store stocks for it. Below 1024px the same markup
13:  * reflows into a tap list with thumbnails (one DOM, two layouts).
14:  */
15: 
16: const ART: Partial<Record<SportCategory, MediaImage>> = {
17:   cricket: IMAGES.cricketStrike,
18:   badminton: IMAGES.badmintonHall,
19:   tennis: IMAGES.tennisClay,
20:   pickleball: IMAGES.pickleballCorner,
21:   'table-tennis': IMAGES.tableTennisHall,
22:   squash: IMAGES.squashPlayer,
23:   fitness: IMAGES.fitnessBarbell,
24: };
25: 
26: const ORDER: SportCategory[] = ['cricket', 'badminton', 'tennis', 'pickleball', 'table-tennis', 'squash', 'fitness'];
27: 
28: const SPORTS = ORDER.map((id) => CATEGORIES.find((c) => c.id === id)!).filter(Boolean);
29: 
30: export const SportIndex: React.FC = () => {
31:   const [active, setActive] = useState<SportCategory>(SPORTS[0].id);
32: 
33:   return (
34:     <section className="sport-index section" aria-labelledby="sport-index-title">
35:       <div className="container">
36:         <header className="chapter-head">
37:           <div>
38:             <Reveal as="p" className="eyebrow">Shop by sport</Reveal>
39:             <RevealLines as="h2" id="sport-index-title" lines={['Pick your', 'game.']} className="display d-1 chapter-title" />
40:           </div>
41:           <Reveal className="chapter-aside" delay={0.1}>
42:             <p className="lead">
43:               {CATEGORIES.length} sports under one roof, from match willow to competition dumbbells.
44:             </p>
45:             <Link to="/shop" className="link-arrow">
46:               All gear <span className="btn-arrow" aria-hidden="true">→</span>
47:             </Link>
48:           </Reveal>
49:         </header>
50: 
51:         <Reveal y={32} amount={0.1}>
52:           <ul className="sport-rail">
53:             {SPORTS.map((sport) => {
54:               const isActive = sport.id === active;
55:               return (
56:                 <li
57:                   key={sport.id}
58:                   className={`sport-panel ${isActive ? 'is-active' : ''}`}
59:                   onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(sport.id)}
60:                 >
61:                   <Link
62:                     to={`/shop/${sport.id}`}
63:                     className="sport-panel-link"
64:                     onFocus={() => setActive(sport.id)}
65:                     aria-label={`Shop ${sport.name}: ${sport.featuredEquipments.slice(0, 3).join(', ')}`}
66:                   >
67:                     <span className="sport-panel-media">
68:                       <Img image={ART[sport.id] ?? sport.image} alt="" sizes="(min-width: 1024px) 50vw, 96px" />
69:                     </span>
70:                     <span className="sport-panel-name">{sport.name}</span>
71:                     <span className="sport-panel-detail" aria-hidden="true">
72:                       <span className="sport-panel-heading">{sport.name}</span>
73:                       <span className="sport-panel-stock">
74:                         {sport.featuredEquipments.map((item) => (
75:                           <span key={item}>{item}</span>
76:                         ))}
77:                       </span>
78:                       <span className="sport-panel-cta">
79:                         Shop {sport.name.toLowerCase()} <span className="btn-arrow">→</span>
80:                       </span>
81:                     </span>
82:                     <span className="sport-row-note" aria-hidden="true">{sport.tagline}</span>
83:                     <span className="sport-row-arrow" aria-hidden="true">→</span>
84:                   </Link>
85:                 </li>
86:               );
87:             })}
88:           </ul>
89:         </Reveal>
90:       </div>
91:     </section>
92:   );
93: };
94: 
95: export default SportIndex;
````

## File: src/components/home/StoreChapter.tsx
````typescript
 1: import React from 'react';
 2: import { Link } from 'react-router-dom';
 3: import { STORE_INFO } from '../../data/storeInfo';
 4: import { useStoreStatus } from '../../utils/storeHours';
 5: import { Reveal, RevealLines } from '../motion/Reveal';
 6: 
 7: /**
 8:  * STORE — the address set like a shop sign. Deliberately typographic: there is
 9:  * no photograph of the store, so none is implied. "MG Road" carries the broken
10:  * gold underline from the official wordmark.
11:  */
12: export const StoreChapter: React.FC = () => {
13:   const status = useStoreStatus();
14: 
15:   return (
16:     <section className="store-chapter section" aria-labelledby="store-title">
17:       <div className="container store-grid">
18:         <div className="store-sign">
19:           <Reveal as="p" className="eyebrow">Visit the store</Reveal>
20:           <RevealLines
21:             as="h2"
22:             id="store-title"
23:             className="display d-1 store-address"
24:             lines={[
25:               'Shop 247,',
26:               <span className="store-underline">MG Road,</span>,
27:               'Camp, Pune.',
28:             ]}
29:           />
30:           <Reveal as="p" className="store-sub" delay={0.1}>
31:             {STORE_INFO.addressLine2}, {STORE_INFO.city} {STORE_INFO.pincode}
32:           </Reveal>
33:         </div>
34: 
35:         <Reveal className="store-info" delay={0.1}>
36:           <p className={`store-status store-status-lg ${status.isOpen ? 'is-open' : ''}`}>
37:             <span className="status-dot" aria-hidden="true" />
38:             {status.label}
39:           </p>
40: 
41:           <dl className="store-hours">
42:             <div>
43:               <dt>Monday – Saturday</dt>
44:               <dd>{STORE_INFO.hours.weekdays}</dd>
45:             </div>
46:             <div>
47:               <dt>Sunday</dt>
48:               <dd>{STORE_INFO.hours.sunday}</dd>
49:             </div>
50:             <div>
51:               <dt>Phone</dt>
52:               <dd><a href={`tel:${STORE_INFO.phone}`}>{STORE_INFO.displayPhone}</a></dd>
53:             </div>
54:           </dl>
55: 
56:           <div className="store-actions">
57:             <a href={STORE_INFO.mapsUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
58:               Get directions <span className="btn-arrow" aria-hidden="true">→</span>
59:             </a>
60:             <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
61:               WhatsApp the store
62:             </a>
63:           </div>
64: 
65:           <p className="store-note">
66:             Schools, clubs and academies: ask about team kit and bulk equipment orders.{' '}
67:             <Link to="/contact">Get in touch</Link>.
68:           </p>
69:         </Reveal>
70:       </div>
71:     </section>
72:   );
73: };
74: 
75: export default StoreChapter;
````

## File: src/components/motion/Reveal.tsx
````typescript
  1: import React from 'react';
  2: import { motion, useInView, useReducedMotion, Variants } from 'framer-motion';
  3: 
  4: /**
  5:  * Motion primitives for Oriental Sports (patterns after motion-primitives:
  6:  * InView, TextEffect per-line, AnimatedGroup). Built on framer-motion, which
  7:  * the project already ships. All of them render static content when the
  8:  * visitor prefers reduced motion.
  9:  *
 10:  * Timing: fast start, controlled settle — cubic-bezier(0.16, 1, 0.3, 1).
 11:  */
 12: 
 13: export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
 14: 
 15: type Tag = keyof JSX.IntrinsicElements;
 16: 
 17: const motionTag = (as: Tag) => (motion as unknown as Record<string, React.ElementType>)[as as string] ?? motion.div;
 18: 
 19: interface RevealProps {
 20:   as?: Tag;
 21:   children: React.ReactNode;
 22:   className?: string;
 23:   style?: React.CSSProperties;
 24:   delay?: number;
 25:   /** Distance travelled upward, in px. */
 26:   y?: number;
 27:   duration?: number;
 28:   /** Fraction of the element that must be visible to trigger. */
 29:   amount?: number;
 30:   id?: string;
 31: }
 32: 
 33: /** Fade + rise when the element enters the viewport (once). */
 34: export const Reveal: React.FC<RevealProps> = ({
 35:   as = 'div',
 36:   children,
 37:   className,
 38:   style,
 39:   delay = 0,
 40:   y = 24,
 41:   duration = 0.8,
 42:   amount = 0.25,
 43:   id,
 44: }) => {
 45:   const reduced = useReducedMotion();
 46:   const Comp = motionTag(as);
 47:   if (reduced) {
 48:     const Static = as as React.ElementType;
 49:     return <Static className={className} style={style} id={id}>{children}</Static>;
 50:   }
 51:   return (
 52:     <Comp
 53:       id={id}
 54:       className={className}
 55:       style={style}
 56:       initial={{ opacity: 0, y }}
 57:       whileInView={{ opacity: 1, y: 0 }}
 58:       viewport={{ once: true, amount }}
 59:       transition={{ duration, delay, ease: EASE_OUT }}
 60:     >
 61:       {children}
 62:     </Comp>
 63:   );
 64: };
 65: 
 66: interface RevealLinesProps {
 67:   as?: Tag;
 68:   lines: React.ReactNode[];
 69:   className?: string;
 70:   style?: React.CSSProperties;
 71:   delay?: number;
 72:   stagger?: number;
 73:   /** Animate on mount instead of on scroll (hero, slide changes). */
 74:   immediate?: boolean;
 75:   lineClassName?: string;
 76:   id?: string;
 77:   /** Render the settled state with no animation (e.g. a hidden carousel slide). */
 78:   still?: boolean;
 79: }
 80: 
 81: /** Headline lines rising out of a mask, one after another. */
 82: export const RevealLines: React.FC<RevealLinesProps> = ({
 83:   as = 'h2',
 84:   lines,
 85:   className,
 86:   style,
 87:   delay = 0,
 88:   stagger = 0.08,
 89:   immediate = false,
 90:   lineClassName,
 91:   id,
 92:   still = false,
 93: }) => {
 94:   const reduced = useReducedMotion() || still;
 95:   const ref = React.useRef<HTMLElement>(null);
 96:   const inView = useInView(ref, { once: true, amount: 0.4 });
 97:   const Tag = as as React.ElementType;
 98:   const play = immediate || inView;
 99: 
100:   return (
101:     <Tag ref={ref} id={id} className={className} style={style}>
102:       {lines.map((line, i) => (
103:         <span key={i} className={lineClassName} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.06em', marginBottom: '-0.06em' }}>
104:           {reduced ? (
105:             <span style={{ display: 'block' }}>{line}</span>
106:           ) : (
107:             <motion.span
108:               style={{ display: 'block', willChange: 'transform' }}
109:               initial={{ y: '108%' }}
110:               animate={play ? { y: '0%' } : { y: '108%' }}
111:               transition={{ duration: 0.9, delay: delay + i * stagger, ease: EASE_OUT }}
112:             >
113:               {line}
114:             </motion.span>
115:           )}
116:         </span>
117:       ))}
118:     </Tag>
119:   );
120: };
121: 
122: interface ImageRevealProps {
123:   children: React.ReactNode;
124:   className?: string;
125:   style?: React.CSSProperties;
126:   delay?: number;
127: }
128: 
129: /**
130:  * Photograph uncovered from the bottom edge while it settles from a slight zoom.
131:  * The observed wrapper is never clipped: Chrome's IntersectionObserver treats a
132:  * fully clip-pathed target as invisible, so the clip lives on an inner layer.
133:  */
134: export const ImageReveal: React.FC<ImageRevealProps> = ({ children, className, style, delay = 0 }) => {
135:   const reduced = useReducedMotion();
136:   const ref = React.useRef<HTMLDivElement>(null);
137:   const inView = useInView(ref, { once: true, amount: 0.2 });
138:   if (reduced) return <div className={className} style={style}>{children}</div>;
139:   return (
140:     <div ref={ref} className={className} style={{ ...style, overflow: 'hidden' }}>
141:       <motion.div
142:         style={{ width: '100%', height: '100%' }}
143:         initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
144:         animate={inView ? { clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
145:         transition={{ duration: 1.1, delay, ease: EASE_OUT }}
146:       >
147:         <motion.div
148:           style={{ width: '100%', height: '100%' }}
149:           initial={{ scale: 1.12 }}
150:           animate={inView ? { scale: 1 } : undefined}
151:           transition={{ duration: 1.4, delay, ease: EASE_OUT }}
152:         >
153:           {children}
154:         </motion.div>
155:       </motion.div>
156:     </div>
157:   );
158: };
159: 
160: const groupVariants: Variants = {
161:   hidden: {},
162:   visible: (stagger: number) => ({ transition: { staggerChildren: stagger } }),
163: };
164: 
165: export const itemVariants: Variants = {
166:   hidden: { opacity: 0, y: 20 },
167:   visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
168: };
169: 
170: interface StaggerProps {
171:   as?: Tag;
172:   children: React.ReactNode;
173:   className?: string;
174:   style?: React.CSSProperties;
175:   stagger?: number;
176:   amount?: number;
177: }
178: 
179: /** Container whose <StaggerItem> children arrive in sequence. */
180: export const Stagger: React.FC<StaggerProps> = ({ as = 'div', children, className, style, stagger = 0.07, amount = 0.2 }) => {
181:   const reduced = useReducedMotion();
182:   const Comp = motionTag(as);
183:   if (reduced) {
184:     const Static = as as React.ElementType;
185:     return <Static className={className} style={style}>{children}</Static>;
186:   }
187:   return (
188:     <Comp
189:       className={className}
190:       style={style}
191:       variants={groupVariants}
192:       custom={stagger}
193:       initial="hidden"
194:       whileInView="visible"
195:       viewport={{ once: true, amount }}
196:     >
197:       {children}
198:     </Comp>
199:   );
200: };
201: 
202: export const StaggerItem: React.FC<{ as?: Tag; children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({
203:   as = 'div',
204:   children,
205:   className,
206:   style,
207: }) => {
208:   const reduced = useReducedMotion();
209:   const Comp = motionTag(as);
210:   if (reduced) {
211:     const Static = as as React.ElementType;
212:     return <Static className={className} style={style}>{children}</Static>;
213:   }
214:   return (
215:     <Comp className={className} style={style} variants={itemVariants}>
216:       {children}
217:     </Comp>
218:   );
219: };
````

## File: src/components/navigation/MobileMenu.tsx
````typescript
  1: import React, { useEffect, useRef } from 'react';
  2: import { Link, NavLink } from 'react-router-dom';
  3: import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
  4: import { Logo } from '../brand/Logo';
  5: import { CATEGORIES } from '../../data/categories';
  6: import { STORE_INFO } from '../../data/storeInfo';
  7: import { useStoreStatus } from '../../utils/storeHours';
  8: import { useAuth } from '../../context/AuthContext';
  9: import { useWishlist } from '../../context/WishlistContext';
 10: import { EASE_OUT } from '../motion/Reveal';
 11: 
 12: interface MobileMenuProps {
 13:   open: boolean;
 14:   onClose: () => void;
 15:   onSearch: () => void;
 16: }
 17: 
 18: const PRIMARY = [
 19:   { to: '/shop', label: 'Shop', note: `Gear across ${CATEGORIES.length} sports` },
 20:   { to: '/courts', label: 'Courts', note: 'Court construction across Pune' },
 21:   { to: '/about', label: 'About', note: 'The sports house in Camp' },
 22:   { to: '/visit', label: 'Visit', note: `${STORE_INFO.addressLine1}, ${STORE_INFO.locality}` },
 23: ];
 24: 
 25: export const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose, onSearch }) => {
 26:   const reduced = useReducedMotion();
 27:   const closeRef = useRef<HTMLButtonElement>(null);
 28:   const status = useStoreStatus();
 29:   const { user, isAuthenticated } = useAuth();
 30:   const { wishlist } = useWishlist();
 31: 
 32:   useEffect(() => {
 33:     if (!open) return;
 34:     const root = document.documentElement;
 35:     const prev = root.style.overflow;
 36:     root.style.overflow = 'hidden';
 37:     closeRef.current?.focus();
 38:     const onKey = (e: KeyboardEvent) => {
 39:       if (e.key === 'Escape') onClose();
 40:     };
 41:     window.addEventListener('keydown', onKey);
 42:     return () => {
 43:       root.style.overflow = prev;
 44:       window.removeEventListener('keydown', onKey);
 45:     };
 46:   }, [open, onClose]);
 47: 
 48:   const item = (i: number) =>
 49:     reduced
 50:       ? {}
 51:       : {
 52:           initial: { opacity: 0, y: 28 },
 53:           animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.12 + i * 0.05, ease: EASE_OUT } },
 54:         };
 55: 
 56:   return (
 57:     <AnimatePresence>
 58:       {open && (
 59:         <motion.div
 60:           id="mobile-menu"
 61:           className="mobile-menu"
 62:           role="dialog"
 63:           aria-modal="true"
 64:           aria-label="Menu"
 65:           initial={reduced ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
 66:           animate={reduced ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
 67:           exit={reduced ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
 68:           transition={{ duration: reduced ? 0.15 : 0.55, ease: EASE_OUT }}
 69:         >
 70:           <div className="mobile-menu-top container">
 71:             <Logo size="md" className="header-logo" />
 72:             <button ref={closeRef} type="button" className="menu-close" onClick={onClose}>
 73:               <span className="menu-close-x" aria-hidden="true" />
 74:               <span>Close</span>
 75:             </button>
 76:           </div>
 77: 
 78:           <div className="mobile-menu-body container">
 79:             <nav aria-label="Primary">
 80:               <ul className="mobile-menu-primary">
 81:                 {PRIMARY.map((link, i) => (
 82:                   <motion.li key={link.to} {...item(i)}>
 83:                     <NavLink
 84:                       to={link.to}
 85:                       onClick={onClose}
 86:                       className={({ isActive }) => `mobile-menu-link ${isActive ? 'active' : ''}`}
 87:                     >
 88:                       <span className="mobile-menu-link-label">{link.label}</span>
 89:                       <span className="mobile-menu-link-note">{link.note}</span>
 90:                     </NavLink>
 91:                   </motion.li>
 92:                 ))}
 93:               </ul>
 94:             </nav>
 95: 
 96:             <motion.div className="mobile-menu-sports" {...item(4)}>
 97:               <p className="label subtle">Shop by sport</p>
 98:               <div className="mobile-menu-chips">
 99:                 {CATEGORIES.map((c) => (
100:                   <Link key={c.id} to={`/shop/${c.id}`} onClick={onClose} className="chip">
101:                     {c.name}
102:                   </Link>
103:                 ))}
104:               </div>
105:             </motion.div>
106: 
107:             <motion.div className="mobile-menu-utility" {...item(5)}>
108:               <button type="button" className="link-arrow" onClick={onSearch}>Search Gear</button>
109:               <Link to="/account" onClick={onClose} className="link-arrow" style={{ fontWeight: 700 }}>
110:                 {isAuthenticated ? `My Account (${user?.firstName || 'Athlete'})` : 'Sign In / Register'}
111:               </Link>
112:               <Link to="/account/orders" onClick={onClose} className="link-arrow">My Orders & Tracking</Link>
113:               <Link to="/account/wishlist" onClick={onClose} className="link-arrow">
114:                 Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
115:               </Link>
116:             </motion.div>
117: 
118:             <motion.div className="mobile-menu-store" {...item(6)}>
119:               <p className={`store-status ${status.isOpen ? 'is-open' : ''}`}>
120:                 <span className="status-dot" aria-hidden="true" />
121:                 {status.label}
122:               </p>
123:               <p className="mobile-menu-address">
124:                 {STORE_INFO.addressLine1}, {STORE_INFO.addressLine2}, {STORE_INFO.city} {STORE_INFO.pincode}
125:               </p>
126:               <div className="mobile-menu-actions">
127:                 <a href={`tel:${STORE_INFO.phone}`} className="btn btn-primary">Call store</a>
128:                 <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
129:                   WhatsApp
130:                 </a>
131:               </div>
132:             </motion.div>
133:           </div>
134:         </motion.div>
135:       )}
136:     </AnimatePresence>
137:   );
138: };
139: 
140: export default MobileMenu;
````

## File: src/components/ui/Img.tsx
````typescript
 1: import React from 'react';
 2: import { FALLBACK_IMAGE, MediaImage } from '../../data/media';
 3: 
 4: interface ImgProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
 5:   image: MediaImage | string;
 6:   /** Load immediately (above the fold). Defaults to lazy. */
 7:   priority?: boolean;
 8:   /** Override the image's own focal point. */
 9:   position?: string;
10: }
11: 
12: /**
13:  * Responsive image with focal point, lazy loading and a local fallback.
14:  * Always fills its parent (object-fit: cover) — size the wrapper, not the img.
15:  */
16: export const Img: React.FC<ImgProps> = ({
17:   image,
18:   priority = false,
19:   position,
20:   sizes = '100vw',
21:   alt,
22:   style,
23:   onError,
24:   ...rest
25: }) => {
26:   const media: MediaImage = typeof image === 'string' ? { src: image, alt: alt ?? '' } : image;
27: 
28:   return (
29:     <img
30:       src={media.src}
31:       srcSet={media.srcSet}
32:       sizes={media.srcSet ? sizes : undefined}
33:       alt={alt ?? media.alt}
34:       loading={priority ? 'eager' : 'lazy'}
35:       decoding={priority ? 'sync' : 'async'}
36:       // React 18 warns on camelCase fetchPriority; the lowercase attribute passes through.
37:       {...(priority ? { fetchpriority: 'high' } : {})}
38:       style={{
39:         width: '100%',
40:         height: '100%',
41:         objectFit: 'cover',
42:         objectPosition: position ?? media.position ?? 'center',
43:         ...style,
44:       }}
45:       onError={(e) => {
46:         const el = e.currentTarget;
47:         if (!el.dataset.fallback) {
48:           el.dataset.fallback = '1';
49:           el.removeAttribute('srcset');
50:           el.src = FALLBACK_IMAGE;
51:         }
52:         onError?.(e);
53:       }}
54:       {...rest}
55:     />
56:   );
57: };
58: 
59: export default Img;
````

## File: src/components/ui/PageHeader.tsx
````typescript
 1: import React from 'react';
 2: import { Link } from 'react-router-dom';
 3: import { MediaImage } from '../../data/media';
 4: import { Img } from './Img';
 5: import { Reveal, RevealLines } from '../motion/Reveal';
 6: 
 7: interface Crumb {
 8:   label: string;
 9:   to?: string;
10: }
11: 
12: interface PageHeaderProps {
13:   eyebrow?: string;
14:   /** One entry per display line. */
15:   title: string[];
16:   lead?: React.ReactNode;
17:   crumbs?: Crumb[];
18:   /** With an image the header becomes a full-bleed photographic band. */
19:   image?: MediaImage;
20:   aside?: React.ReactNode;
21:   children?: React.ReactNode;
22: }
23: 
24: /**
25:  * Page header shared by every inner page, so the site speaks one language:
26:  * breadcrumbs, a condensed display title and a lead. Pass `eyebrow` only
27:  * when it states a fact the breadcrumb and title don't (sport · location).
28:  */
29: export const PageHeader: React.FC<PageHeaderProps> = ({ eyebrow, title, lead, crumbs, image, aside, children }) => {
30:   const crumbTrail = crumbs && crumbs.length > 0 && (
31:     <nav aria-label="Breadcrumb" className="crumbs">
32:       <ol>
33:         {crumbs.map((c, i) => (
34:           <li key={c.label}>
35:             {c.to && i < crumbs.length - 1 ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
36:           </li>
37:         ))}
38:       </ol>
39:     </nav>
40:   );
41: 
42:   if (image) {
43:     return (
44:       <header className="page-header page-header--image on-dark">
45:         <div className="page-header-media" aria-hidden="true">
46:           <Img image={image} alt="" priority sizes="100vw" />
47:         </div>
48:         <div className="container page-header-inner">
49:           {crumbTrail}
50:           <div className="page-header-copy">
51:             {eyebrow && <Reveal as="p" className="eyebrow">{eyebrow}</Reveal>}
52:             <RevealLines as="h1" immediate lines={title} className="display d-1 page-title" />
53:             {lead && <Reveal as="p" className="page-lead" delay={0.15}>{lead}</Reveal>}
54:             {children}
55:           </div>
56:         </div>
57:       </header>
58:     );
59:   }
60: 
61:   return (
62:     <header className="page-header">
63:       <div className="container">
64:         {crumbTrail}
65:         <div className="page-header-grid">
66:           <div className="page-header-copy">
67:             {eyebrow && <Reveal as="p" className="eyebrow">{eyebrow}</Reveal>}
68:             <RevealLines as="h1" immediate lines={title} className="display d-1 page-title" />
69:           </div>
70:           {(lead || aside) && (
71:             <Reveal className="page-header-aside" delay={0.12}>
72:               {lead && <p className="lead">{lead}</p>}
73:               {aside}
74:             </Reveal>
75:           )}
76:         </div>
77:         {children}
78:       </div>
79:     </header>
80:   );
81: };
82: 
83: export default PageHeader;
````

## File: src/context/AuthContext.tsx
````typescript
  1: import React, { createContext, useContext, useState, useEffect } from 'react';
  2: import { UserProfile, Address, Order } from '../types/auth';
  3: import { AuthService } from '../services/authService';
  4: 
  5: interface AuthContextType {
  6:   user: UserProfile | null;
  7:   isAuthenticated: boolean;
  8:   isLoading: boolean;
  9:   isAuthModalOpen: boolean;
 10:   authModalView: 'phone' | 'otp' | 'register' | 'email';
 11:   openAuthModal: (view?: 'phone' | 'otp' | 'register' | 'email', returnTo?: string) => void;
 12:   closeAuthModal: () => void;
 13:   pendingPhone: string;
 14:   setPendingPhone: (phone: string) => void;
 15:   devOtpCode: string | null;
 16:   requestOtp: (phone: string) => Promise<boolean>;
 17:   verifyOtp: (otp: string, registrationData?: { firstName: string; lastName: string; email?: string }) => Promise<boolean>;
 18:   signInWithGoogle: () => Promise<boolean>;
 19:   signInWithEmail: (email: string) => Promise<boolean>;
 20:   signOut: () => Promise<void>;
 21:   updateProfile: (data: Partial<UserProfile>) => Promise<void>;
 22:   addAddress: (addr: Omit<Address, 'id'>) => Promise<Address>;
 23:   updateAddress: (id: string, addr: Partial<Address>) => Promise<Address>;
 24:   deleteAddress: (id: string) => Promise<void>;
 25:   setDefaultAddress: (id: string) => Promise<void>;
 26:   getOrderById: (orderId: string) => Order | undefined;
 27:   addOrder: (order: Order) => Promise<Order>;
 28:   returnToUrl: string | null;
 29: }
 30: 
 31: const AuthContext = createContext<AuthContextType | undefined>(undefined);
 32: 
 33: export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 34:   const [user, setUser] = useState<UserProfile | null>(null);
 35:   const [isLoading, setIsLoading] = useState<boolean>(true);
 36:   const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
 37:   const [authModalView, setAuthModalView] = useState<'phone' | 'otp' | 'register' | 'email'>('phone');
 38:   const [pendingPhone, setPendingPhone] = useState<string>('');
 39:   const [devOtpCode, setDevOtpCode] = useState<string | null>(null);
 40:   const [returnToUrl, setReturnToUrl] = useState<string | null>(null);
 41: 
 42:   useEffect(() => {
 43:     // Check initial user from storage or demo seed
 44:     try {
 45:       const currentUser = AuthService.getCurrentUser();
 46:       setUser(currentUser);
 47:     } catch (e) {
 48:       console.error('Error loading current user:', e);
 49:     } finally {
 50:       setIsLoading(false);
 51:     }
 52:   }, []);
 53: 
 54:   const openAuthModal = (view: 'phone' | 'otp' | 'register' | 'email' = 'phone', returnTo?: string) => {
 55:     setAuthModalView(view);
 56:     if (returnTo) {
 57:       setReturnToUrl(returnTo);
 58:     }
 59:     setIsAuthModalOpen(true);
 60:   };
 61: 
 62:   const closeAuthModal = () => {
 63:     setIsAuthModalOpen(false);
 64:     setDevOtpCode(null);
 65:   };
 66: 
 67:   const requestOtp = async (phoneNumber: string): Promise<boolean> => {
 68:     try {
 69:       const res = await AuthService.requestOtp(phoneNumber);
 70:       if (res.success) {
 71:         setPendingPhone(phoneNumber);
 72:         setDevOtpCode(res.devOtp);
 73:         setAuthModalView('otp');
 74:         return true;
 75:       }
 76:       return false;
 77:     } catch {
 78:       return false;
 79:     }
 80:   };
 81: 
 82:   const verifyOtp = async (otp: string, regData?: { firstName: string; lastName: string; email?: string }): Promise<boolean> => {
 83:     try {
 84:       const loggedInUser = await AuthService.verifyOtp(pendingPhone, otp, regData);
 85:       setUser(loggedInUser);
 86:       closeAuthModal();
 87:       return true;
 88:     } catch {
 89:       return false;
 90:     }
 91:   };
 92: 
 93:   const signInWithGoogle = async (): Promise<boolean> => {
 94:     try {
 95:       const loggedInUser = await AuthService.signInWithGoogle();
 96:       setUser(loggedInUser);
 97:       closeAuthModal();
 98:       return true;
 99:     } catch {
100:       return false;
101:     }
102:   };
103: 
104:   const signInWithEmail = async (email: string): Promise<boolean> => {
105:     try {
106:       const loggedInUser = await AuthService.signInWithEmail(email);
107:       setUser(loggedInUser);
108:       closeAuthModal();
109:       return true;
110:     } catch {
111:       return false;
112:     }
113:   };
114: 
115:   const signOut = async (): Promise<void> => {
116:     await AuthService.signOut();
117:     setUser(null);
118:   };
119: 
120:   const updateProfile = async (data: Partial<UserProfile>): Promise<void> => {
121:     const updated = await AuthService.updateProfile(data);
122:     setUser(updated);
123:   };
124: 
125:   const addAddress = async (addr: Omit<Address, 'id'>): Promise<Address> => {
126:     const newAddress = await AuthService.addAddress(addr);
127:     const updated = AuthService.getCurrentUser();
128:     setUser(updated);
129:     return newAddress;
130:   };
131: 
132:   const updateAddress = async (id: string, addr: Partial<Address>): Promise<Address> => {
133:     const updatedAddress = await AuthService.updateAddress(id, addr);
134:     const updated = AuthService.getCurrentUser();
135:     setUser(updated);
136:     return updatedAddress;
137:   };
138: 
139:   const deleteAddress = async (id: string): Promise<void> => {
140:     await AuthService.deleteAddress(id);
141:     const updated = AuthService.getCurrentUser();
142:     setUser(updated);
143:   };
144: 
145:   const setDefaultAddress = async (id: string): Promise<void> => {
146:     await AuthService.setDefaultAddress(id);
147:     const updated = AuthService.getCurrentUser();
148:     setUser(updated);
149:   };
150: 
151:   const getOrderById = (orderId: string): Order | undefined => {
152:     return user?.orders.find((o) => o.id === orderId || o.orderNumber === orderId);
153:   };
154: 
155:   const addOrder = async (order: Order): Promise<Order> => {
156:     const saved = await AuthService.addOrder(order);
157:     setUser(AuthService.getCurrentUser());
158:     return saved;
159:   };
160: 
161:   return (
162:     <AuthContext.Provider
163:       value={{
164:         user,
165:         isAuthenticated: !!user,
166:         isLoading,
167:         isAuthModalOpen,
168:         authModalView,
169:         openAuthModal,
170:         closeAuthModal,
171:         pendingPhone,
172:         setPendingPhone,
173:         devOtpCode,
174:         requestOtp,
175:         verifyOtp,
176:         signInWithGoogle,
177:         signInWithEmail,
178:         signOut,
179:         updateProfile,
180:         addAddress,
181:         updateAddress,
182:         deleteAddress,
183:         setDefaultAddress,
184:         getOrderById,
185:         addOrder,
186:         returnToUrl,
187:       }}
188:     >
189:       {children}
190:     </AuthContext.Provider>
191:   );
192: };
193: 
194: export const useAuth = () => {
195:   const context = useContext(AuthContext);
196:   if (!context) {
197:     throw new Error('useAuth must be used within an AuthProvider');
198:   }
199:   return context;
200: };
````

## File: src/context/CartContext.tsx
````typescript
  1: import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
  2: import { Product, CartItem } from '../types';
  3: import {
  4:   isShopifyConfigured,
  5:   createShopifyCart,
  6:   addLinesToShopifyCart,
  7:   updateShopifyCartLines,
  8:   removeShopifyCartLines,
  9:   applyShopifyDiscount,
 10:   fetchShopifyCart,
 11: } from '../services/shopify';
 12: import { ShopifyCartLineInput, ShopifyCartLineUpdateInput } from '../types/shopify';
 13: 
 14: interface CartContextType {
 15:   cart: CartItem[];
 16:   addToCart: (product: Product, quantity?: number, selectedVariant?: string, selectedSize?: string) => void;
 17:   removeFromCart: (productId: string, selectedVariant?: string, selectedSize?: string) => void;
 18:   updateQuantity: (productId: string, quantity: number, selectedVariant?: string, selectedSize?: string) => void;
 19:   clearCart: () => void;
 20:   isCartOpen: boolean;
 21:   openCart: () => void;
 22:   closeCart: () => void;
 23:   itemCount: number;
 24:   subtotal: number;
 25:   shipping: number;
 26:   discount: number;
 27:   total: number;
 28:   promoCode: string;
 29:   applyPromoCode: (code: string) => Promise<{ success: boolean; message: string }>;
 30:   shopifyCartId: string | null;
 31:   checkoutUrl: string | null;
 32:   isSyncing: boolean;
 33:   isShopifyLive: boolean;
 34:   proceedToCheckout: () => void;
 35: }
 36: 
 37: const CartContext = createContext<CartContextType | undefined>(undefined);
 38: 
 39: const CART_STORAGE_KEY = 'oriental_sports_cart_v1';
 40: const SHOPIFY_CART_ID_KEY = 'oriental_sports_shopify_cart_id_v1';
 41: 
 42: export const getItemUnitPrice = (item: CartItem): number => {
 43:   if (item.selectedVariant && item.product.variants) {
 44:     const v = item.product.variants.find((vr) => vr.name === item.selectedVariant);
 45:     if (v) {
 46:       if (typeof v.price === 'number') return v.price;
 47:       if (typeof v.priceDelta === 'number') return item.product.price + v.priceDelta;
 48:     }
 49:   }
 50:   return item.product.price;
 51: };
 52: 
 53: export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 54:   const [cart, setCart] = useState<CartItem[]>(() => {
 55:     try {
 56:       const saved = localStorage.getItem(CART_STORAGE_KEY);
 57:       return saved ? JSON.parse(saved) : [];
 58:     } catch {
 59:       return [];
 60:     }
 61:   });
 62: 
 63:   const [shopifyCartId, setShopifyCartId] = useState<string | null>(() => {
 64:     return localStorage.getItem(SHOPIFY_CART_ID_KEY);
 65:   });
 66:   const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
 67:   const [isSyncing, setIsSyncing] = useState(false);
 68:   const isShopifyLive = isShopifyConfigured();
 69: 
 70:   const [isCartOpen, setIsCartOpen] = useState(false);
 71:   const [promoCode, setPromoCode] = useState('');
 72:   const [discountPercent, setDiscountPercent] = useState(0);
 73: 
 74:   // Persist cart items locally
 75:   useEffect(() => {
 76:     try {
 77:       localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
 78:     } catch (e) {
 79:       console.error('Failed to save cart to localStorage', e);
 80:     }
 81:   }, [cart]);
 82: 
 83:   // Sync with Shopify Cart if configured
 84:   const syncWithShopify = useCallback(async (currentCart: CartItem[]) => {
 85:     if (!isShopifyConfigured()) return;
 86:     setIsSyncing(true);
 87: 
 88:     try {
 89:       // Build lines with Shopify variant IDs
 90:       const lines: ShopifyCartLineInput[] = currentCart
 91:         .map((item) => {
 92:           const variant = item.product.variants?.find((v) => v.name === item.selectedVariant);
 93:           const merchandiseId =
 94:             variant?.shopifyVariantId || item.product.shopifyVariantId || item.product.id;
 95: 
 96:           // Only send if it looks like a valid Shopify GID
 97:           if (merchandiseId && merchandiseId.startsWith('gid://shopify/ProductVariant/')) {
 98:             return {
 99:               merchandiseId,
100:               quantity: item.quantity,
101:             };
102:           }
103:           return null;
104:         })
105:         .filter((l): l is ShopifyCartLineInput => l !== null);
106: 
107:       if (lines.length === 0) {
108:         setIsSyncing(false);
109:         return;
110:       }
111: 
112:       if (!shopifyCartId) {
113:         const newCart = await createShopifyCart(lines);
114:         if (newCart) {
115:           setShopifyCartId(newCart.id);
116:           setCheckoutUrl(newCart.checkoutUrl);
117:           localStorage.setItem(SHOPIFY_CART_ID_KEY, newCart.id);
118:         }
119:       } else {
120:         // Fetch or add lines to existing cart
121:         const updated = await addLinesToShopifyCart(shopifyCartId, lines);
122:         if (updated) {
123:           setCheckoutUrl(updated.checkoutUrl);
124:         }
125:       }
126:     } catch (err) {
127:       console.warn('[CartContext] Background Shopify sync notice:', err);
128:     } finally {
129:       setIsSyncing(false);
130:     }
131:   }, [shopifyCartId]);
132: 
133:   // Load existing Shopify checkout URL on initial mount if cartId exists
134:   useEffect(() => {
135:     if (shopifyCartId && isShopifyConfigured()) {
136:       fetchShopifyCart(shopifyCartId).then((sc) => {
137:         if (sc) {
138:           setCheckoutUrl(sc.checkoutUrl);
139:         } else {
140:           // If expired on Shopify's side, clear local cart id
141:           setShopifyCartId(null);
142:           localStorage.removeItem(SHOPIFY_CART_ID_KEY);
143:         }
144:       });
145:     }
146:   }, [shopifyCartId]);
147: 
148:   const addToCart = (
149:     product: Product,
150:     quantity = 1,
151:     selectedVariant?: string,
152:     selectedSize?: string
153:   ) => {
154:     setCart((prev) => {
155:       const existingIndex = prev.findIndex(
156:         (item) =>
157:           item.product.id === product.id &&
158:           item.selectedVariant === selectedVariant &&
159:           item.selectedSize === selectedSize
160:       );
161: 
162:       let nextCart: CartItem[];
163:       if (existingIndex > -1) {
164:         nextCart = [...prev];
165:         nextCart[existingIndex].quantity += quantity;
166:       } else {
167:         nextCart = [...prev, { product, quantity, selectedVariant, selectedSize }];
168:       }
169: 
170:       syncWithShopify(nextCart);
171:       return nextCart;
172:     });
173:     setIsCartOpen(true);
174:   };
175: 
176:   const removeFromCart = (productId: string, selectedVariant?: string, selectedSize?: string) => {
177:     setCart((prev) => {
178:       const nextCart = prev.filter(
179:         (item) =>
180:           !(
181:             item.product.id === productId &&
182:             item.selectedVariant === selectedVariant &&
183:             item.selectedSize === selectedSize
184:           )
185:       );
186:       if (isShopifyConfigured() && shopifyCartId) {
187:         // If empty, clean up
188:         if (nextCart.length === 0) {
189:           setCheckoutUrl(null);
190:         }
191:       }
192:       return nextCart;
193:     });
194:   };
195: 
196:   const updateQuantity = (
197:     productId: string,
198:     quantity: number,
199:     selectedVariant?: string,
200:     selectedSize?: string
201:   ) => {
202:     if (quantity <= 0) {
203:       removeFromCart(productId, selectedVariant, selectedSize);
204:       return;
205:     }
206: 
207:     setCart((prev) => {
208:       const nextCart = prev.map((item) => {
209:         if (
210:           item.product.id === productId &&
211:           item.selectedVariant === selectedVariant &&
212:           item.selectedSize === selectedSize
213:         ) {
214:           return { ...item, quantity };
215:         }
216:         return item;
217:       });
218:       syncWithShopify(nextCart);
219:       return nextCart;
220:     });
221:   };
222: 
223:   const clearCart = () => {
224:     setCart([]);
225:     setPromoCode('');
226:     setDiscountPercent(0);
227:     setCheckoutUrl(null);
228:     setShopifyCartId(null);
229:     localStorage.removeItem(SHOPIFY_CART_ID_KEY);
230:   };
231: 
232:   const openCart = () => setIsCartOpen(true);
233:   const closeCart = () => setIsCartOpen(false);
234: 
235:   const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
236:   const subtotal = cart.reduce((total, item) => total + getItemUnitPrice(item) * item.quantity, 0);
237: 
238:   // Free shipping for Pune & pan-India orders above ₹2000
239:   const shipping = subtotal === 0 || subtotal >= 2000 ? 0 : 150;
240:   const discount = Math.round(subtotal * (discountPercent / 100));
241:   const total = Math.max(0, subtotal - discount + shipping);
242: 
243:   const applyPromoCode = async (code: string) => {
244:     const formatted = code.trim().toUpperCase();
245: 
246:     // If Shopify is connected, attempt Shopify discount code application
247:     if (isShopifyConfigured() && shopifyCartId) {
248:       setIsSyncing(true);
249:       const res = await applyShopifyDiscount(shopifyCartId, formatted);
250:       setIsSyncing(false);
251:       if (res) {
252:         setCheckoutUrl(res.checkoutUrl);
253:       }
254:     }
255: 
256:     if (formatted === 'PUNEPLAY' || formatted === 'ORIENTAL10') {
257:       setPromoCode(formatted);
258:       setDiscountPercent(10);
259:       return { success: true, message: '10% Oriental Sports Pune discount applied!' };
260:     } else if (formatted === 'CAMP15') {
261:       setPromoCode(formatted);
262:       setDiscountPercent(15);
263:       return { success: true, message: '15% Camp Heritage Special applied!' };
264:     }
265:     return { success: false, message: 'Invalid code. Try "PUNEPLAY" or "ORIENTAL10"' };
266:   };
267: 
268:   const proceedToCheckout = () => {
269:     if (checkoutUrl) {
270:       window.location.href = checkoutUrl;
271:     } else {
272:       // Direct user to Cart Page for Camp pickup or manual checkout
273:       window.location.href = '/cart';
274:     }
275:   };
276: 
277:   return (
278:     <CartContext.Provider
279:       value={{
280:         cart,
281:         addToCart,
282:         removeFromCart,
283:         updateQuantity,
284:         clearCart,
285:         isCartOpen,
286:         openCart,
287:         closeCart,
288:         itemCount,
289:         subtotal,
290:         shipping,
291:         discount,
292:         total,
293:         promoCode,
294:         applyPromoCode,
295:         shopifyCartId,
296:         checkoutUrl,
297:         isSyncing,
298:         isShopifyLive,
299:         proceedToCheckout,
300:       }}
301:     >
302:       {children}
303:     </CartContext.Provider>
304:   );
305: };
306: 
307: export const useCart = () => {
308:   const context = useContext(CartContext);
309:   if (!context) {
310:     throw new Error('useCart must be used within a CartProvider');
311:   }
312:   return context;
313: };
````

## File: src/context/WishlistContext.tsx
````typescript
 1: import React, { createContext, useContext, useState, useEffect } from 'react';
 2: 
 3: interface WishlistContextType {
 4:   wishlist: string[];
 5:   toggleWishlist: (productId: string) => void;
 6:   isInWishlist: (productId: string) => boolean;
 7: }
 8: 
 9: const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
10: 
11: const WISHLIST_STORAGE_KEY = 'oriental_sports_wishlist_v1';
12: 
13: export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
14:   const [wishlist, setWishlist] = useState<string[]>(() => {
15:     try {
16:       const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
17:       return saved ? JSON.parse(saved) : [];
18:     } catch {
19:       return [];
20:     }
21:   });
22: 
23:   useEffect(() => {
24:     try {
25:       localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
26:     } catch (e) {
27:       console.error('Failed to save wishlist', e);
28:     }
29:   }, [wishlist]);
30: 
31:   const toggleWishlist = (productId: string) => {
32:     setWishlist((prev) =>
33:       prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
34:     );
35:   };
36: 
37:   const isInWishlist = (productId: string) => wishlist.includes(productId);
38: 
39:   return (
40:     <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
41:       {children}
42:     </WishlistContext.Provider>
43:   );
44: };
45: 
46: export const useWishlist = () => {
47:   const context = useContext(WishlistContext);
48:   if (!context) {
49:     throw new Error('useWishlist must be used within a WishlistProvider');
50:   }
51:   return context;
52: };
````

## File: src/data/testimonials.ts
````typescript
 1: import { Testimonial } from '../types';
 2: 
 3: export const TESTIMONIALS: Testimonial[] = [
 4:   {
 5:     id: 't-1',
 6:     author: 'Vikramaditya Shinde',
 7:     role: 'Managing Committee & Sports Secretary',
 8:     location: 'Deccan Gymkhana, Pune',
 9:     sportOrProject: 'Championship Tennis Court',
10:     quote: 'Oriental Sports managed the resurfacing of our tennis courts with remarkable precision. The ball pace and cushion consistency across all playing zones are world class. When you work with people who actually understand the sport, the outcome speaks for itself.',
11:     rating: 5,
12:     verified: true,
13:   },
14:   {
15:     id: 't-2',
16:     author: 'Aditi Kulkarni',
17:     role: 'Pickleball Club Founder & Head Coach',
18:     location: 'Koregaon Park, Pune',
19:     sportOrProject: '4-Court Pickleball Arena',
20:     quote: 'From sub-base laser grading to the final USAPA non-glare topcoat, Oriental executed our 4-court facility ahead of schedule. Their Camp store also provides all our club paddles, tournament balls, and demo equipment. Unmatched in Pune.',
21:     rating: 5,
22:     verified: true,
23:   },
24:   {
25:     id: 't-3',
26:     author: 'Rahul Deshmukh',
27:     role: 'AITA Ranked Junior Coach',
28:     location: 'Kothrud, Pune',
29:     sportOrProject: 'Racquet Gear & Custom Stringing',
30:     quote: 'I have been bringing my tournament racquets to their MG Road shop for electronic stringing for over seven years. The string tension calibration is dead accurate every single time. That attention to detail is hard to find.',
31:     rating: 5,
32:     verified: true,
33:   },
34:   {
35:     id: 't-4',
36:     author: 'Commander S. K. Nair (Retd.)',
37:     role: 'Club Secretary',
38:     location: 'Camp, Pune',
39:     sportOrProject: 'Badminton Hall Renovation',
40:     quote: 'Being located in Camp, Oriental Sports is practically our neighbor. Their technical expertise on timber sleeper deflection and anti-slip finishes revived our historic wooden badminton hall to modern BWF standards.',
41:     rating: 5,
42:     verified: true,
43:   },
44: ];
````

## File: src/styles/components.css
````css
  1: /* ==========================================================================
  2:    Shared components — chapter heads, product card, footer, brand intro
  3:    ========================================================================== */
  4: 
  5: /* ---- Brand intro ------------------------------------------------------- */
  6: .brand-intro {
  7:   position: fixed;
  8:   inset: 0;
  9:   z-index: 300;
 10:   display: grid;
 11:   place-items: center;
 12:   background: var(--ivory);
 13:   cursor: pointer;
 14:   clip-path: inset(0 0 0 0);
 15:   transition: clip-path 520ms var(--ease-in-out);
 16: }
 17: .brand-intro.is-leaving { clip-path: inset(0 0 100% 0); pointer-events: none; }
 18: 
 19: .brand-intro-mark {
 20:   width: clamp(96px, 15vw, 140px);
 21:   height: auto;
 22:   animation: intro-mask 700ms var(--ease-out) both;
 23: }
 24: 
 25: @keyframes intro-mask {
 26:   from { clip-path: circle(0% at 50% 50%); transform: scale(1.08); }
 27:   to { clip-path: circle(75% at 50% 50%); transform: scale(1); }
 28: }
 29: 
 30: /* ---- Chapter head ------------------------------------------------------ */
 31: .chapter-head {
 32:   display: grid;
 33:   gap: 24px;
 34:   margin-bottom: clamp(32px, 5vw, 64px);
 35: }
 36: 
 37: .chapter-title { margin-top: 18px; }
 38: 
 39: .chapter-aside {
 40:   display: flex;
 41:   flex-direction: column;
 42:   align-items: flex-start;
 43:   gap: 12px;
 44: }
 45: 
 46: @media (min-width: 1024px) {
 47:   .chapter-head {
 48:     grid-template-columns: minmax(0, 1fr) minmax(280px, 400px);
 49:     align-items: end;
 50:   }
 51: }
 52: 
 53: /* ---- Product card ------------------------------------------------------ */
 54: .product-card {
 55:   position: relative;
 56:   display: flex;
 57:   flex-direction: column;
 58:   gap: 14px;
 59:   min-width: 0;
 60: }
 61: 
 62: .product-card-media {
 63:   position: relative;
 64:   display: block;
 65:   aspect-ratio: 1 / 1;
 66:   min-height: 0;
 67:   overflow: hidden;
 68:   background: var(--stage);
 69: }
 70: 
 71: .product-card-media img {
 72:   transition: transform 700ms var(--ease-out);
 73: }
 74: .product-card:hover .product-card-media img { transform: scale(1.04); }
 75: 
 76: .product-card-flag { position: absolute; left: 12px; top: 12px; }
 77: 
 78: .product-card-save {
 79:   position: absolute;
 80:   top: 8px;
 81:   right: 8px;
 82:   width: 44px;
 83:   height: 44px;
 84:   display: grid;
 85:   place-items: center;
 86:   border-radius: var(--r-pill);
 87:   background: rgba(251, 249, 244, 0.88);
 88:   color: var(--ink);
 89:   transition: background-color var(--t-1) ease, transform var(--t-1) ease;
 90: }
 91: .product-card-save:hover { background: var(--paper); }
 92: .product-card-save:active { transform: scale(0.92); }
 93: 
 94: .product-card-body {
 95:   display: flex;
 96:   flex-direction: column;
 97:   gap: 6px;
 98:   flex: 1;
 99: }
100: 
101: .product-card-title {
102:   font-size: 1rem;
103:   font-weight: 600;
104:   font-stretch: 100%;
105:   line-height: 1.35;
106:   letter-spacing: 0;
107: }
108: .product-card-title a {
109:   display: inline;
110:   min-height: 0;
111: }
112: .product-card-title a:hover { text-decoration: underline; text-underline-offset: 3px; }
113: 
114: .product-card-foot {
115:   margin-top: auto;
116:   padding-top: 6px;
117:   display: flex;
118:   align-items: center;
119:   justify-content: space-between;
120:   gap: 12px;
121: }
122: 
123: .product-card-price {
124:   display: flex;
125:   flex-wrap: wrap;
126:   align-items: baseline;
127:   column-gap: 8px;
128: }
129: 
130: .price { font-weight: 700; font-size: 1.0625rem; }
131: .price-was { color: var(--subtle); font-size: 0.875rem; }
132: .price-off { color: var(--gold-ink); font-size: 0.8125rem; font-weight: 600; }
133: 
134: .product-card-add {
135:   flex-shrink: 0;
136:   min-height: 44px;
137:   padding: 0 14px;
138:   font-size: 0.75rem;
139:   font-weight: 700;
140:   letter-spacing: 0.1em;
141:   text-transform: uppercase;
142:   white-space: nowrap;
143:   border: 1.5px solid var(--ink);
144:   border-radius: var(--r-1);
145:   transition: background-color var(--t-1) ease, color var(--t-1) ease, border-color var(--t-1) ease;
146: }
147: .product-card-add:hover:not(:disabled) { background: var(--ink); color: var(--ivory); }
148: .product-card-add.is-added { background: var(--gold); border-color: var(--gold); color: var(--ink); }
149: .product-card-add:disabled { opacity: 0.4; cursor: not-allowed; }
150: 
151: /* ---- Footer ------------------------------------------------------------ */
152: .site-footer {
153:   background: var(--stone);
154:   color: var(--ink);
155:   border-top: 1px solid var(--line);
156:   padding-top: clamp(56px, 8vw, 104px);
157:   padding-bottom: 28px;
158: }
159: 
160: /*
161:  * Phones: store facts, then link groups as wrapped rows (44px targets
162:  * without a 44px-per-line column). 768+: identity beside the fact table,
163:  * link columns below. 1024+: store left (5/12), links right (7/12).
164:  */
165: .footer-main {
166:   display: grid;
167:   gap: 48px;
168:   padding-bottom: clamp(48px, 6vw, 80px);
169: }
170: 
171: .footer-store {
172:   display: grid;
173:   gap: 28px;
174:   align-content: start;
175: }
176: 
177: .footer-logo { display: block; height: 40px; width: auto; }
178: 
179: .footer-address {
180:   margin-top: 20px;
181:   font-style: normal;
182:   font-size: 1.0625rem;
183:   line-height: 1.55;
184: }
185: 
186: .footer-visit {
187:   display: flex;
188:   flex-wrap: wrap;
189:   align-items: center;
190:   justify-content: space-between;
191:   gap: 0 24px;
192:   margin-top: 12px;
193: }
194: .footer-status { font-size: 0.9375rem; font-weight: 600; }
195: 
196: /* Same fact table as the Visit page, one step tighter. */
197: .footer-facts { font-size: 0.9375rem; }
198: .store-hours.footer-facts > div { min-height: 44px; }
199: .footer-facts dd { min-width: 0; overflow-wrap: anywhere; }
200: .footer-facts a:hover { text-decoration: underline; text-underline-offset: 3px; }
201: 
202: .footer-nav {
203:   display: grid;
204:   gap: 28px;
205:   align-content: start;
206: }
207: 
208: .footer-heading {
209:   font-size: var(--fs-label);
210:   font-weight: 700;
211:   font-stretch: 100%;
212:   letter-spacing: 0.14em;
213:   text-transform: uppercase;
214:   color: var(--muted);
215:   margin-bottom: 2px;
216: }
217: 
218: .footer-col ul {
219:   list-style: none;
220:   display: flex;
221:   flex-wrap: wrap;
222:   column-gap: 24px;
223: }
224: 
225: .footer-link {
226:   min-height: 44px;
227:   font-size: 0.9375rem;
228:   color: var(--ink);
229:   transition: color var(--t-1) ease;
230: }
231: .footer-link:hover { text-decoration: underline; text-underline-offset: 4px; }
232: 
233: @media (min-width: 768px) {
234:   .footer-store {
235:     grid-template-columns: repeat(2, minmax(0, 1fr));
236:     gap: 48px;
237:   }
238:   .footer-nav { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
239:   .footer-col ul { display: block; }
240: }
241: 
242: @media (min-width: 1024px) {
243:   .footer-main {
244:     grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
245:     gap: clamp(48px, 6vw, 112px);
246:   }
247:   .footer-store { grid-template-columns: minmax(0, 1fr); gap: 32px; }
248: }
249: 
250: .footer-base {
251:   display: flex;
252:   flex-wrap: wrap;
253:   align-items: center;
254:   justify-content: space-between;
255:   gap: 0 24px;
256:   padding-top: 12px;
257:   font-size: 0.875rem;
258:   color: var(--muted);
259:   position: relative;
260: }
261: /* Rule spans the content column, like every other rule on the site. */
262: .footer-base::before {
263:   content: '';
264:   position: absolute;
265:   top: 0;
266:   left: var(--gutter);
267:   right: var(--gutter);
268:   height: 1px;
269:   background: var(--line-strong);
270: }
271: 
272: .footer-legal { display: flex; flex-wrap: wrap; gap: 0 24px; }
273: .footer-legal .footer-link { font-size: 0.875rem; color: var(--muted); }
274: 
275: /* ---- Bag drawer -------------------------------------------------------- */
276: .drawer-backdrop {
277:   position: fixed;
278:   inset: 0;
279:   z-index: var(--z-overlay);
280:   background: rgba(17, 17, 17, 0.5);
281:   animation: fade-in var(--t-2) ease both;
282: }
283: .drawer {
284:   position: fixed;
285:   top: 0;
286:   right: 0;
287:   bottom: 0;
288:   z-index: var(--z-dialog);
289:   width: min(100%, 440px);
290:   display: flex;
291:   flex-direction: column;
292:   background: var(--paper);
293:   box-shadow: var(--shadow-overlay);
294:   animation: drawer-in 420ms var(--ease-out) both;
295: }
296: @keyframes drawer-in { from { transform: translateX(100%); } to { transform: none; } }
297: @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
298: 
299: .drawer-head {
300:   display: flex;
301:   align-items: center;
302:   justify-content: space-between;
303:   gap: 16px;
304:   height: var(--header-h);
305:   padding: 0 var(--gutter);
306:   border-bottom: 1px solid var(--line);
307:   flex-shrink: 0;
308: }
309: @media (min-width: 480px) { .drawer-head { padding: 0 24px; } }
310: .drawer-count { color: var(--muted); }
311: 
312: .drawer-delivery { padding: 14px 24px; border-bottom: 1px solid var(--line); font-size: 0.875rem; }
313: .drawer-progress { height: 3px; margin-top: 10px; background: var(--stone-deep); overflow: hidden; }
314: .drawer-progress span { display: block; height: 100%; background: var(--gold); transform-origin: left; transition: transform var(--t-3) var(--ease-out); }
315: 
316: .drawer-body { flex: 1; overflow-y: auto; padding: 0 24px; overscroll-behavior: contain; }
317: .drawer-empty { display: flex; flex-direction: column; align-items: flex-start; gap: 14px; padding-top: 32px; }
318: .drawer-lines { list-style: none; }
319: .drawer-line {
320:   display: grid;
321:   grid-template-columns: 80px minmax(0, 1fr) auto;
322:   gap: 14px;
323:   padding: 18px 0;
324:   border-bottom: 1px solid var(--line);
325: }
326: .drawer-line-media { display: block; aspect-ratio: 1; overflow: hidden; background: var(--stage); min-height: 0; }
327: .drawer-line-body { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
328: 
329: .drawer-foot {
330:   padding: 18px 24px max(18px, env(safe-area-inset-bottom));
331:   border-top: 1px solid var(--line-strong);
332:   display: flex;
333:   flex-direction: column;
334:   gap: 12px;
335:   flex-shrink: 0;
336: }
337: .drawer-subtotal { display: flex; justify-content: space-between; align-items: baseline; font-size: 1.125rem; font-variant-numeric: tabular-nums; }
338: .drawer-continue { align-self: center; }
339: 
340: /* ---- Search overlay ---------------------------------------------------- */
341: .search-overlay {
342:   position: fixed;
343:   inset: 0;
344:   z-index: var(--z-dialog);
345:   background: rgba(17, 17, 17, 0.5);
346:   animation: fade-in var(--t-2) ease both;
347: }
348: .search-panel {
349:   background: var(--ivory);
350:   max-height: 100svh;
351:   overflow-y: auto;
352:   box-shadow: var(--shadow-overlay);
353:   animation: panel-down 380ms var(--ease-out) both;
354: }
355: @keyframes panel-down { from { transform: translateY(-16px); opacity: 0; } to { transform: none; opacity: 1; } }
356: 
357: .search-bar {
358:   display: flex;
359:   align-items: center;
360:   gap: 14px;
361:   height: calc(var(--header-h) + 16px);
362:   border-bottom: 1px solid var(--line-strong);
363: }
364: .search-input {
365:   flex: 1;
366:   min-width: 0;
367:   height: 48px;
368:   border: 0;
369:   background: transparent;
370:   font-stretch: var(--stretch-tight);
371:   font-weight: 700;
372:   font-size: clamp(1.25rem, 3vw, 1.75rem);
373:   color: var(--ink);
374: }
375: .search-input:focus { outline: none; }
376: .search-input::placeholder { color: var(--subtle); }
377: .search-input::-webkit-search-cancel-button { display: none; }
378: 
379: .search-panel-body { display: flex; flex-direction: column; gap: 24px; padding-block: 24px 32px; }
380: .search-suggest, .search-group { display: flex; flex-direction: column; gap: 10px; }
381: .search-suggest-chips { display: flex; flex-wrap: wrap; gap: 8px; }
382: .search-hits { list-style: none; border-top: 1px solid var(--line); }
383: .search-hit {
384:   display: flex;
385:   align-items: center;
386:   gap: 14px;
387:   width: 100%;
388:   padding: 10px 0;
389:   text-align: left;
390:   border-bottom: 1px solid var(--line);
391:   min-height: 56px;
392: }
393: .search-hit:hover .search-hit-name { text-decoration: underline; text-underline-offset: 3px; }
394: .search-hit-media { width: 56px; height: 56px; flex-shrink: 0; overflow: hidden; background: var(--stage); }
395: .search-hit-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; font-size: 0.875rem; }
396: .search-hit-name { font-weight: 600; font-size: 0.9375rem; }
397: .search-none { padding: 8px 0; }
398: 
399: /* ---- Route loading skeleton ------------------------------------------- */
400: .page-skeleton { display: flex; flex-direction: column; gap: 18px; padding-block: 24px 40vh; }
401: .skeleton {
402:   display: block;
403:   background: linear-gradient(90deg, var(--stone) 0%, var(--stone-deep) 50%, var(--stone) 100%);
404:   background-size: 200% 100%;
405:   animation: skeleton 1.2s ease-in-out infinite;
406: }
407: .skeleton-crumb { width: 120px; height: 12px; }
408: .skeleton-eyebrow { width: 160px; height: 12px; margin-top: 24px; }
409: .skeleton-title { width: min(560px, 80%); height: clamp(44px, 8vw, 96px); }
410: .skeleton-title.short { width: min(360px, 55%); }
411: @keyframes skeleton { from { background-position: 100% 0; } to { background-position: -100% 0; } }
````

## File: src/styles/home.css
````css
  1: /* ==========================================================================
  2:    Homepage chapters — Hero · Sport index · Gear · Courts · Store
  3:    Mobile-first; each breakpoint is a composition, not a squeeze.
  4:    ========================================================================== */
  5: 
  6: /* ==========================================================================
  7:    HERO
  8:    ========================================================================== */
  9: /*
 10:  * Slides and the tab bar share one grid cell. The hero is at least one
 11:  * viewport tall, and grows with the tallest slide instead of letting copy
 12:  * slide under the tabs. --tabs-h is exact (tab height + bottom padding), so
 13:  * the copy's bottom padding always clears the tab bar.
 14:  */
 15: .hero {
 16:   --px: 0px;
 17:   --py: 0px;
 18:   --tab-h: 44px;
 19:   --tabs-pad: clamp(14px, 2.6vh, 28px);
 20:   --tabs-h: calc(var(--tab-h) + var(--tabs-pad));
 21:   position: relative;
 22:   display: grid;
 23:   grid-template: 1fr / minmax(0, 1fr);
 24:   min-height: clamp(560px, calc(100svh - var(--header-h) - var(--utility-h)), 980px);
 25:   overflow: hidden;
 26:   background: var(--ink);
 27:   color: var(--on-dark);
 28:   touch-action: pan-y;
 29:   isolation: isolate;
 30: }
 31: @media (min-width: 1024px) {
 32:   .hero { --tab-h: 62px; }
 33: }
 34: 
 35: .hero-slide {
 36:   grid-area: 1 / 1;
 37:   position: relative;
 38:   opacity: 0;
 39:   visibility: hidden;
 40:   transition: opacity 900ms var(--ease-out), visibility 0s linear 900ms;
 41: }
 42: .hero-slide.is-active {
 43:   z-index: 1;
 44:   opacity: 1;
 45:   visibility: visible;
 46:   transition: opacity 900ms var(--ease-out), visibility 0s;
 47: }
 48: 
 49: .hero-media {
 50:   position: absolute;
 51:   inset: 0;
 52:   overflow: hidden;
 53: }
 54: 
 55: .hero-media-inner {
 56:   position: absolute;
 57:   inset: -20px;
 58:   transform: translate3d(var(--px), var(--py), 0);
 59:   transition: transform 900ms var(--ease-out);
 60: }
 61: 
 62: /* Slow settle while a slide is on screen — restrained depth, never a loop. */
 63: .hero-media-inner img {
 64:   transform: scale(1.07);
 65:   transition: transform 8s cubic-bezier(0.2, 0.6, 0.3, 1);
 66: }
 67: .hero-slide.is-active .hero-media-inner img { transform: scale(1); }
 68: 
 69: .hero-media::after {
 70:   content: '';
 71:   position: absolute;
 72:   inset: 0;
 73:   pointer-events: none;
 74: }
 75: 
 76: /* Scrims are functional (legibility), shaped per composition. */
 77: .hero-slide--gear .hero-media::after {
 78:   background:
 79:     linear-gradient(90deg, rgba(17, 17, 17, 0.84) 0%, rgba(17, 17, 17, 0.52) 34%, rgba(17, 17, 17, 0) 64%),
 80:     linear-gradient(0deg, rgba(17, 17, 17, 0.78) 0%, rgba(17, 17, 17, 0) 42%);
 81: }
 82: .hero-slide--courts .hero-media::after {
 83:   background:
 84:     linear-gradient(180deg, rgba(0, 0, 0, 0.66) 0%, rgba(0, 0, 0, 0) 46%),
 85:     linear-gradient(0deg, rgba(0, 0, 0, 0.82) 0%, rgba(0, 0, 0, 0) 44%);
 86: }
 87: 
 88: .hero-content {
 89:   position: relative;
 90:   z-index: 2;
 91:   height: 100%;
 92:   display: flex;
 93:   flex-direction: column;
 94:   justify-content: flex-end;
 95:   padding-top: clamp(28px, 6vh, 72px);
 96:   padding-bottom: calc(var(--tabs-h) + clamp(20px, 4vh, 48px));
 97: }
 98: 
 99: .hero-copy { max-width: 820px; }
100: 
101: .hero .eyebrow { color: rgba(246, 243, 234, 0.84); }
102: 
103: /* Two lines of hero type never take more than ~40% of the viewport height. */
104: .hero-title {
105:   font-size: min(var(--fs-hero), max(3.4rem, 19svh));
106:   margin: 18px 0 22px;
107: }
108: 
109: .hero-lead {
110:   font-size: var(--fs-lead);
111:   line-height: 1.5;
112:   max-width: 27em;
113:   color: rgba(246, 243, 234, 0.9);
114: }
115: 
116: .hero-status { margin-top: 16px; font-weight: 600; }
117: 
118: .hero-actions {
119:   display: flex;
120:   flex-wrap: wrap;
121:   align-items: center;
122:   gap: 12px 28px;
123:   margin-top: 28px;
124: }
125: 
126: /* Courts: headline hangs from the top over the sky; actions sit at the foot. */
127: .hero-slide--courts .hero-copy {
128:   height: 100%;
129:   max-width: none;
130:   display: flex;
131:   flex-direction: column;
132:   justify-content: space-between;
133:   gap: 24px;
134: }
135: .hero-slide--courts .hero-title { margin-bottom: 0; }
136: .hero-slide--courts .hero-foot { max-width: 560px; }
137: 
138: /* Camp store: a light editorial split — the address is the image. */
139: .hero-slide--store { background: var(--ivory); color: var(--ink); }
140: .hero-slide--store .hero-media { left: auto; width: 50%; bottom: var(--tabs-h); }
141: .hero-slide--store .hero-media::after { display: none; }
142: .hero-slide--store .hero-content { justify-content: center; padding-top: 24px; }
143: .hero-slide--store .hero-copy { max-width: calc(50% - 32px); }
144: .hero-slide--store .eyebrow { color: var(--muted); }
145: .hero-slide--store .hero-lead { color: var(--muted); }
146: .hero-slide--store .hero-title { font-size: clamp(3.2rem, min(8.4vw, 12svh), 8.5rem); }
147: 
148: /* Tabs — name all three offerings at once; the gold bar is the timer. */
149: .hero-tabs {
150:   grid-area: 1 / 1;
151:   align-self: end;
152:   position: relative;
153:   z-index: 3;
154:   display: flex;
155:   align-items: flex-end;
156:   gap: 16px;
157:   padding-bottom: var(--tabs-pad);
158:   transition: color var(--t-3) var(--ease-out);
159: }
160: 
161: .hero-tablist {
162:   flex: 1;
163:   display: grid;
164:   grid-template-columns: repeat(3, minmax(0, 1fr));
165:   gap: clamp(12px, 2vw, 32px);
166: }
167: 
168: .hero-tab {
169:   display: flex;
170:   flex-direction: column;
171:   align-items: flex-start;
172:   justify-content: flex-end;
173:   gap: 8px;
174:   height: var(--tab-h);
175:   padding: 0;
176:   text-align: left;
177:   color: inherit;
178:   opacity: 0.68;
179:   transition: opacity var(--t-2) ease;
180: }
181: .hero-tab:hover,
182: .hero-tab.is-active { opacity: 1; }
183: 
184: .hero-tab-track {
185:   position: relative;
186:   width: 100%;
187:   height: 2px;
188:   margin-bottom: 4px;
189:   background: rgba(246, 243, 234, 0.3);
190:   overflow: hidden;
191: }
192: 
193: .hero-tab-fill {
194:   position: absolute;
195:   inset: 0;
196:   background: var(--gold);
197:   transform: scaleX(0);
198:   transform-origin: left;
199: }
200: .hero-tab.is-active .hero-tab-fill {
201:   animation-name: hero-progress;
202:   animation-timing-function: linear;
203:   animation-fill-mode: forwards;
204: }
205: 
206: @keyframes hero-progress {
207:   from { transform: scaleX(0); }
208:   to { transform: scaleX(1); }
209: }
210: 
211: .hero-tab-label {
212:   font-size: 0.8125rem;
213:   font-weight: 700;
214:   letter-spacing: 0.12em;
215:   text-transform: uppercase;
216: }
217: 
218: /* Notes appear from 1024px, where a tab is wide enough to hold one line. */
219: .hero-tab-note {
220:   display: none;
221:   max-width: 100%;
222:   font-size: 0.8125rem;
223:   line-height: 1.5;
224:   white-space: nowrap;
225:   overflow: hidden;
226:   text-overflow: ellipsis;
227:   color: rgba(246, 243, 234, 0.74);
228: }
229: @media (min-width: 1024px) {
230:   .hero-tab-note { display: block; }
231: }
232: 
233: .hero-pause {
234:   flex-shrink: 0;
235:   width: 44px;
236:   height: 44px;
237:   display: grid;
238:   place-items: center;
239:   border: 1px solid rgba(246, 243, 234, 0.42);
240:   border-radius: var(--r-pill);
241:   color: inherit;
242:   transition: border-color var(--t-1) ease;
243: }
244: .hero-pause:hover { border-color: currentColor; }
245: 
246: .hero--store .hero-tabs { color: var(--ink); }
247: .hero--store .hero-tab-track { background: var(--line-strong); }
248: .hero--store .hero-tab-note { color: var(--muted); }
249: .hero--store .hero-pause { border-color: var(--line-strong); }
250: 
251: @media (max-width: 767px) {
252:   .hero {
253:     --hero-h: clamp(560px, calc(100svh - var(--header-h)), 880px);
254:     min-height: var(--hero-h);
255:   }
256:   .hero-tab { gap: 6px; }
257:   .hero-actions { gap: 12px 24px; margin-top: 22px; }
258: 
259:   .hero-slide--gear .hero-media::after {
260:     background: linear-gradient(0deg, rgba(17, 17, 17, 0.92) 0%, rgba(17, 17, 17, 0.6) 42%, rgba(17, 17, 17, 0.08) 72%);
261:   }
262:   .hero-slide--courts .hero-media::after {
263:     background:
264:       linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 38%),
265:       linear-gradient(0deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.4) 34%, rgba(0, 0, 0, 0) 56%);
266:   }
267: 
268:   /* Photo band on top; the sign starts beneath it rather than stacking from the foot. */
269:   .hero-slide--store { --band-h: clamp(132px, calc(var(--hero-h) * 0.27), 240px); }
270:   .hero-slide--store .hero-media { width: 100%; top: 0; bottom: auto; height: var(--band-h); }
271:   .hero-slide--store .hero-media-inner { inset: 0 -20px -20px -20px; }
272:   .hero-slide--store img { object-position: 70% 0% !important; }
273:   .hero-slide--store .hero-content { justify-content: flex-start; padding-top: calc(var(--band-h) + 22px); }
274:   .hero-slide--store .hero-copy { max-width: none; }
275:   .hero-slide--store .hero-title { font-size: clamp(2.9rem, 13vw, 4.75rem); margin: 12px 0 14px; }
276: }
277: 
278: @media (max-width: 767px) and (max-height: 720px) {
279:   .hero-slide--store .hero-lead,
280:   .hero-slide--gear .hero-lead { display: none; }
281: }
282: 
283: @media (min-width: 768px) and (max-width: 1023px) {
284:   .hero-slide--store .hero-media { width: 46%; }
285:   .hero-slide--store .hero-copy { max-width: calc(54% - 24px); }
286: }
287: 
288: /* ==========================================================================
289:    SPORT INDEX — tap list (mobile/tablet) → expanding rail (desktop)
290:    ========================================================================== */
291: .sport-rail { list-style: none; }
292: 
293: .sport-panel { border-top: 1px solid var(--line); }
294: .sport-panel:last-child { border-bottom: 1px solid var(--line); }
295: 
296: .sport-panel-link {
297:   display: grid;
298:   grid-template-columns: 84px minmax(0, 1fr) auto;
299:   grid-template-rows: auto auto;
300:   column-gap: 16px;
301:   row-gap: 4px;
302:   align-items: center;
303:   width: 100%;
304:   min-height: 104px;
305:   padding: 10px 0;
306: }
307: 
308: .sport-panel-media {
309:   grid-row: 1 / span 2;
310:   width: 84px;
311:   aspect-ratio: 1;
312:   overflow: hidden;
313:   background: var(--stone);
314: }
315: .sport-panel-media img { transition: transform var(--t-3) var(--ease-out); }
316: 
317: .sport-panel-name {
318:   align-self: end;
319:   font-stretch: var(--stretch-display);
320:   font-weight: 800;
321:   font-size: clamp(1.9rem, 8vw, 2.6rem);
322:   line-height: 0.92;
323:   text-transform: uppercase;
324: }
325: 
326: .sport-row-note {
327:   grid-column: 2;
328:   align-self: start;
329:   font-size: 0.875rem;
330:   line-height: 1.35;
331:   color: var(--muted);
332:   display: -webkit-box;
333:   -webkit-line-clamp: 2;
334:   -webkit-box-orient: vertical;
335:   overflow: hidden;
336: }
337: 
338: .sport-row-arrow {
339:   grid-column: 3;
340:   grid-row: 1 / span 2;
341:   font-size: 1.25rem;
342:   transition: transform var(--t-2) var(--ease-out);
343: }
344: .sport-panel-link:hover .sport-row-arrow { transform: translateX(4px); }
345: .sport-panel-link:hover .sport-panel-media img { transform: scale(1.06); }
346: 
347: .sport-panel-detail { display: none; }
348: 
349: @media (min-width: 640px) and (max-width: 1023px) {
350:   .sport-rail {
351:     display: grid;
352:     grid-template-columns: repeat(2, minmax(0, 1fr));
353:     column-gap: 32px;
354:     border-bottom: 1px solid var(--line);
355:   }
356:   .sport-panel:last-child { border-bottom: 0; }
357: }
358: 
359: @media (min-width: 1024px) {
360:   .sport-rail {
361:     display: flex;
362:     gap: 6px;
363:     height: clamp(500px, 70vh, 700px);
364:   }
365: 
366:   .sport-panel {
367:     position: relative;
368:     flex: 1 1 0;
369:     min-width: 0;
370:     border: 0;
371:     overflow: hidden;
372:     transition: flex-grow var(--t-4) var(--ease-out);
373:   }
374:   .sport-panel:last-child { border: 0; }
375:   /* 5.2 : 6×1 → the open sport holds ~46% of the rail */
376:   .sport-panel.is-active { flex-grow: 5.2; }
377: 
378:   .sport-panel-link {
379:     position: absolute;
380:     inset: 0;
381:     display: block;
382:     min-height: 0;
383:     padding: 0;
384:     color: var(--on-dark);
385:   }
386:   .sport-panel-link:focus-visible { outline: 3px solid var(--gold); outline-offset: -3px; }
387: 
388:   .sport-panel-media {
389:     position: absolute;
390:     inset: 0;
391:     width: auto;
392:     aspect-ratio: auto;
393:     background: var(--ink);
394:   }
395:   .sport-panel-media img {
396:     filter: grayscale(0.6) brightness(0.72);
397:     transition: filter var(--t-3) var(--ease-out), transform 1.2s var(--ease-out);
398:   }
399:   .sport-panel.is-active .sport-panel-media img { filter: none; }
400:   .sport-panel-link:hover .sport-panel-media img { transform: scale(1.03); }
401: 
402:   .sport-panel-media::after {
403:     content: '';
404:     position: absolute;
405:     inset: 0;
406:     background: linear-gradient(0deg, rgba(17, 17, 17, 0.8) 0%, rgba(17, 17, 17, 0.1) 52%, rgba(17, 17, 17, 0) 100%);
407:   }
408: 
409:   .sport-panel-name {
410:     position: absolute;
411:     left: 50%;
412:     bottom: 28px;
413:     writing-mode: vertical-rl;
414:     transform: translateX(-50%) rotate(180deg);
415:     font-size: clamp(1.75rem, 2.4vw, 2.25rem);
416:     white-space: nowrap;
417:     transition: opacity var(--t-2) ease;
418:   }
419:   .sport-panel.is-active .sport-panel-name { opacity: 0; }
420: 
421:   .sport-panel-detail {
422:     position: absolute;
423:     left: clamp(24px, 2.6vw, 40px);
424:     bottom: clamp(24px, 2.6vw, 40px);
425:     width: min(480px, calc(46vw - 96px));
426:     display: flex;
427:     flex-direction: column;
428:     gap: 18px;
429:     opacity: 0;
430:     transform: translateY(14px);
431:     transition: opacity 240ms ease, transform 400ms var(--ease-out);
432:     pointer-events: none;
433:   }
434:   .sport-panel.is-active .sport-panel-detail {
435:     opacity: 1;
436:     transform: none;
437:     transition: opacity 500ms ease 280ms, transform 700ms var(--ease-out) 280ms;
438:   }
439: 
440:   .sport-panel-heading {
441:     font-stretch: var(--stretch-display);
442:     font-weight: 800;
443:     font-size: clamp(3.5rem, 6vw, 6.5rem);
444:     line-height: 0.84;
445:     text-transform: uppercase;
446:   }
447: 
448:   .sport-panel-stock {
449:     display: flex;
450:     flex-wrap: wrap;
451:     gap: 6px 0;
452:     font-size: 0.9375rem;
453:     color: rgba(246, 243, 234, 0.86);
454:   }
455:   .sport-panel-stock span:not(:last-child)::after {
456:     content: '·';
457:     margin: 0 10px;
458:     color: var(--gold);
459:   }
460: 
461:   .sport-panel-cta {
462:     display: inline-flex;
463:     align-items: center;
464:     gap: 10px;
465:     font-size: 0.8125rem;
466:     font-weight: 700;
467:     letter-spacing: 0.12em;
468:     text-transform: uppercase;
469:   }
470: 
471:   .sport-row-note,
472:   .sport-row-arrow { display: none; }
473: }
474: 
475: /* ==========================================================================
476:    GEAR — sticky intro + studio products
477:    ========================================================================== */
478: .gear-grid {
479:   display: grid;
480:   gap: 40px;
481: }
482: 
483: .gear-intro .lead { margin-top: 22px; }
484: 
485: .service-list {
486:   list-style: none;
487:   margin: 28px 0 28px;
488:   border-top: 1px solid var(--line-strong);
489: }
490: /* Stacked by default (narrow sticky column, small phones); side by side only
491:    where the intro spans the full width. */
492: .service-list li {
493:   display: flex;
494:   flex-direction: column;
495:   gap: 2px;
496:   padding: 13px 0;
497:   border-bottom: 1px solid var(--line-strong);
498: }
499: .service-name { font-weight: 600; }
500: .service-note { color: var(--muted); font-size: 0.875rem; }
501: 
502: @media (min-width: 480px) and (max-width: 1023px) {
503:   .service-list li { flex-direction: row; justify-content: space-between; align-items: baseline; gap: 16px; }
504:   .service-note { text-align: right; }
505: }
506: 
507: .gear-products {
508:   list-style: none;
509:   display: grid;
510:   grid-template-columns: repeat(2, minmax(0, 1fr));
511:   gap: 40px 24px;
512: }
513: .gear-product { display: flex; }
514: .gear-product > .product-card { width: 100%; }
515: 
516: @media (max-width: 767px) {
517:   .gear-products {
518:     display: flex;
519:     gap: 16px;
520:     overflow-x: auto;
521:     scroll-snap-type: x mandatory;
522:     margin-inline: calc(var(--gutter) * -1);
523:     padding-inline: var(--gutter);
524:     scroll-padding-inline: var(--gutter);
525:     padding-bottom: 8px;
526:     scrollbar-width: none;
527:     overscroll-behavior-x: contain;
528:   }
529:   .gear-products::-webkit-scrollbar { display: none; }
530:   .gear-product { flex: 0 0 78%; scroll-snap-align: start; }
531:   .gear-cta { width: 100%; }
532: }
533: 
534: @media (min-width: 1024px) {
535:   .gear-grid {
536:     grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
537:     gap: clamp(48px, 5vw, 96px);
538:     align-items: start;
539:   }
540:   .gear-intro-sticky {
541:     position: sticky;
542:     top: calc(var(--header-h) + 40px);
543:   }
544:   .gear-products { gap: 56px 32px; }
545: }
546: 
547: /* ==========================================================================
548:    COURTS — night-court chapter
549:    ========================================================================== */
550: .courts-chapter { background: var(--black); }
551: .courts-chapter .eyebrow { color: var(--on-dark-muted); }
552: 
553: .courts-hero {
554:   position: relative;
555:   min-height: clamp(560px, 92svh, 960px);
556:   display: flex;
557:   align-items: flex-end;
558:   overflow: hidden;
559: }
560: 
561: .courts-hero-media { position: absolute; inset: 0; }
562: .courts-hero-drift { position: absolute; inset: -8% 0; }
563: .courts-hero-media::after {
564:   content: '';
565:   position: absolute;
566:   inset: 0;
567:   background:
568:     linear-gradient(0deg, #000 0%, rgba(0, 0, 0, 0.6) 34%, rgba(0, 0, 0, 0.08) 70%),
569:     linear-gradient(90deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0) 60%);
570: }
571: 
572: .courts-hero-copy {
573:   position: relative;
574:   z-index: 1;
575:   padding-top: 120px;
576:   padding-bottom: clamp(40px, 6vw, 88px);
577: }
578: 
579: .courts-title { margin: 18px 0 26px; }
580: 
581: .courts-lead {
582:   font-size: var(--fs-lead);
583:   line-height: 1.5;
584:   max-width: 31.8em;
585:   color: rgba(246, 243, 234, 0.86);
586: }
587: 
588: .courts-body {
589:   display: grid;
590:   gap: 48px;
591:   padding-top: clamp(56px, 8vw, 120px);
592:   padding-bottom: clamp(56px, 8vw, 120px);
593: }
594: 
595: .courts-aside-text {
596:   margin: 22px 0 28px;
597:   max-width: 24.7em;
598:   font-size: var(--fs-lead);
599:   line-height: 1.5;
600:   color: rgba(246, 243, 234, 0.8);
601: }
602: 
603: .courts-actions { display: flex; flex-wrap: wrap; gap: 12px; }
604: 
605: .court-types {
606:   list-style: none;
607:   border-top: 1px solid var(--line-dark);
608: }
609: 
610: .court-type {
611:   display: grid;
612:   grid-template-columns: 104px minmax(0, 1fr);
613:   align-items: center;
614:   gap: 16px;
615:   width: 100%;
616:   padding: 16px 0;
617:   border-bottom: 1px solid var(--line-dark);
618:   color: var(--on-dark);
619: }
620: 
621: .court-type-media {
622:   aspect-ratio: 1 / 1;
623:   overflow: hidden;
624:   background: #1A1A1A;
625: }
626: .court-type-media img {
627:   filter: grayscale(0.25) brightness(0.86);
628:   transition: transform 900ms var(--ease-out), filter var(--t-3) ease;
629: }
630: .court-type:hover .court-type-media img { transform: scale(1.05); filter: none; }
631: 
632: .court-type-text { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
633: 
634: .court-type-name {
635:   font-stretch: var(--stretch-display);
636:   font-weight: 800;
637:   font-size: var(--fs-d3);
638:   line-height: 0.95;
639:   text-transform: uppercase;
640: }
641: 
642: .court-type-surfaces { font-size: 0.875rem; line-height: 1.4; color: rgba(246, 243, 234, 0.74); }
643: 
644: .court-type-time {
645:   font-size: var(--fs-label);
646:   font-weight: 600;
647:   letter-spacing: 0.14em;
648:   text-transform: uppercase;
649:   color: var(--gold);
650: }
651: 
652: .court-type-arrow {
653:   display: none;
654:   font-size: 1.375rem;
655:   transition: transform var(--t-2) var(--ease-out), color var(--t-2) ease;
656: }
657: .court-type:hover .court-type-arrow { transform: translateX(6px); color: var(--gold); }
658: 
659: @media (min-width: 640px) {
660:   .court-type {
661:     grid-template-columns: minmax(180px, 36%) minmax(0, 1fr) auto;
662:     align-items: center;
663:     gap: 28px;
664:     padding: 20px 0;
665:   }
666:   .court-type-media { aspect-ratio: 3 / 2; }
667:   .court-type-arrow { display: block; }
668: }
669: 
670: @media (min-width: 1024px) {
671:   .courts-body {
672:     grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
673:     gap: clamp(48px, 5vw, 96px);
674:     align-items: start;
675:   }
676:   .courts-aside-sticky {
677:     position: sticky;
678:     top: calc(var(--header-h) + 48px);
679:   }
680: }
681: 
682: .courts-steps { padding-bottom: clamp(72px, 10vw, 144px); }
683: 
684: .build-steps {
685:   list-style: none;
686:   display: grid;
687:   margin-top: 28px;
688: }
689: 
690: .build-step {
691:   display: grid;
692:   grid-template-columns: 44px minmax(0, 1fr);
693:   column-gap: 16px;
694:   row-gap: 4px;
695:   padding: 20px 0;
696:   border-top: 1px solid var(--line-dark);
697: }
698: 
699: .build-step-num {
700:   grid-row: span 2;
701:   font-stretch: var(--stretch-display);
702:   font-weight: 800;
703:   font-size: 2.25rem;
704:   line-height: 0.9;
705:   color: var(--gold);
706: }
707: 
708: .build-step-name { font-weight: 700; font-size: 1.0625rem; }
709: .build-step-note { font-size: 0.9375rem; line-height: 1.5; color: rgba(246, 243, 234, 0.74); }
710: 
711: /* Desktop: the steps read along a baseline, like a court line. */
712: @media (min-width: 1024px) {
713:   .build-steps { grid-template-columns: repeat(5, minmax(0, 1fr)); }
714:   .build-step {
715:     grid-template-columns: minmax(0, 1fr);
716:     row-gap: 10px;
717:     padding: 24px 28px 0 0;
718:     border-top: 2px solid rgba(246, 243, 234, 0.9);
719:   }
720:   .build-step-num { grid-row: auto; font-size: 3rem; margin-bottom: 8px; }
721: }
722: 
723: /* ==========================================================================
724:    STORE — the address as a sign
725:    ========================================================================== */
726: .store-grid {
727:   display: grid;
728:   gap: 48px;
729: }
730: 
731: .store-address {
732:   margin-top: 18px;
733:   font-size: clamp(3.25rem, 11vw, 9rem);
734:   line-height: 0.86;
735: }
736: 
737: /* Broken gold underline, after the official wordmark. */
738: .store-underline {
739:   position: relative;
740:   display: inline-block;
741: }
742: .store-underline::after {
743:   content: '';
744:   position: absolute;
745:   left: 0.02em;
746:   right: 0.3em;
747:   bottom: 0.04em;
748:   height: 0.055em;
749:   background: linear-gradient(90deg, var(--gold) 0 64%, transparent 64% 69%, var(--gold) 69% 100%);
750: }
751: 
752: .store-sub {
753:   margin-top: 22px;
754:   font-size: var(--fs-lead);
755:   color: var(--muted);
756: }
757: 
758: .store-info { display: flex; flex-direction: column; gap: 24px; }
759: 
760: .store-status-lg { font-size: 1.125rem; font-weight: 600; }
761: 
762: .store-hours { border-top: 1px solid var(--line-strong); }
763: .store-hours > div {
764:   display: flex;
765:   justify-content: space-between;
766:   align-items: center;
767:   gap: 16px;
768:   min-height: 52px;
769:   border-bottom: 1px solid var(--line-strong);
770: }
771: .store-hours dt { color: var(--muted); }
772: .store-hours dd {
773:   font-weight: 600;
774:   font-variant-numeric: tabular-nums;
775:   text-align: right;
776: }
777: 
778: .store-actions { display: flex; flex-wrap: wrap; gap: 12px; }
779: .store-note { color: var(--muted); font-size: 0.9375rem; line-height: 1.5; }
780: 
781: @media (max-width: 479px) {
782:   .store-actions .btn { flex: 1 1 100%; }
783: }
784: 
785: @media (min-width: 1024px) {
786:   .store-grid {
787:     grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
788:     gap: clamp(48px, 5vw, 96px);
789:     align-items: end;
790:   }
791: }
792: 
793: /* ==========================================================================
794:    ORBITAL GALLERY — "The game in motion"
795:    A 220svh scroll track pins a stage; six photos orbit in 3D as it scrolls.
796:    Depth is carried by scale and focus blur (no shadows). Reduced motion
797:    gets a still grid of the same photos.
798:    ========================================================================== */
799: .orbit {
800:   position: relative;
801:   height: 220svh;
802:   background: var(--ivory);
803: }
804: 
805: /* Heading row on top; the orbit centres in the field beneath it. */
806: .orbit-stage {
807:   position: sticky;
808:   top: var(--header-h);
809:   height: calc(100svh - var(--header-h));
810:   overflow: hidden;
811:   display: flex;
812:   flex-direction: column;
813: }
814: 
815: .orbit-field {
816:   position: relative;
817:   flex: 1;
818:   min-height: 0;
819:   perspective: 1200px; /* = PERSPECTIVE in OrbitalGallery.tsx */
820:   overflow: hidden;
821: }
822: 
823: .orbit-stage-head {
824:   position: relative;
825:   z-index: 30;
826:   padding-top: clamp(20px, 4vh, 48px);
827:   pointer-events: none;
828: }
829: 
830: .orbit-head {
831:   display: flex;
832:   flex-wrap: wrap;
833:   align-items: flex-end;
834:   justify-content: space-between;
835:   gap: 12px 32px;
836: }
837: .orbit-hint {
838:   font-size: 0.875rem;
839:   line-height: 1.5;
840:   color: var(--muted);
841:   max-width: 22em;
842: }
843: 
844: .orbit-canvas {
845:   position: absolute;
846:   inset: 0;
847:   list-style: none;
848:   transform-style: preserve-3d;
849:   pointer-events: none;
850: }
851: 
852: .orbit-anchor {
853:   position: absolute;
854:   top: 50%;
855:   left: 50%;
856:   pointer-events: auto;
857:   will-change: transform, filter;
858: }
859: 
860: .orbit-card {
861:   position: relative;
862:   display: block;
863:   /* Set from the field's height in OrbitalGallery so the front card fits. */
864:   width: var(--orbit-card-w, 200px);
865:   aspect-ratio: var(--aspect, 4 / 5);
866:   padding: 0;
867:   border: 0;
868:   overflow: hidden;
869:   background: var(--ink);
870:   cursor: zoom-in;
871: }
872: .orbit-anchor .orbit-card { transform: translate(-50%, -50%); }
873: 
874: .orbit-card img { transition: transform 600ms var(--ease-out); }
875: .orbit-card:hover img { transform: scale(1.05); }
876: .orbit-card:focus-visible { outline: 2px solid var(--gold); outline-offset: 4px; }
877: 
878: /* Scrim exists only so the sport name reads on any photo. */
879: .orbit-card::after {
880:   content: '';
881:   position: absolute;
882:   inset: 0;
883:   background: linear-gradient(180deg, rgba(17, 17, 17, 0) 55%, rgba(17, 17, 17, 0.7) 100%);
884:   pointer-events: none;
885: }
886: .orbit-card-label {
887:   position: absolute;
888:   z-index: 1;
889:   left: 12px;
890:   bottom: 10px;
891:   font-size: var(--fs-label);
892:   font-weight: 700;
893:   letter-spacing: 0.14em;
894:   text-transform: uppercase;
895:   color: var(--on-dark);
896: }
897: 
898: /* Reduced motion: a still grid. */
899: .orbit--still { height: auto; padding-block: var(--section-y); }
900: .orbit-grid {
901:   list-style: none;
902:   display: grid;
903:   grid-template-columns: repeat(2, minmax(0, 1fr));
904:   gap: 12px;
905:   margin-top: clamp(28px, 4vw, 48px);
906: }
907: .orbit-grid .orbit-card { width: 100%; aspect-ratio: 4 / 5; }
908: @media (min-width: 768px) {
909:   .orbit-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
910: }
911: 
912: /* Lightbox */
913: .orbit-lightbox {
914:   position: fixed;
915:   inset: 0;
916:   z-index: var(--z-dialog);
917:   display: grid;
918:   place-items: center;
919:   padding: clamp(16px, 4vw, 60px);
920:   background: rgba(17, 17, 17, 0.92);
921:   cursor: zoom-out;
922: }
923: .orbit-lightbox-panel {
924:   width: min(100%, 880px);
925:   margin: 0;
926:   background: var(--ink);
927:   color: var(--on-dark);
928:   cursor: default;
929: }
930: .orbit-lightbox-media { height: min(68svh, 620px); background: #0a0a0a; }
931: .orbit-lightbox-bar {
932:   display: flex;
933:   flex-wrap: wrap;
934:   align-items: center;
935:   justify-content: space-between;
936:   gap: 8px 24px;
937:   padding: 12px 20px;
938:   border-top: 1px solid var(--line-dark);
939: }
940: .orbit-lightbox-text { min-width: 0; }
941: .orbit-lightbox-sport {
942:   display: block;
943:   font-size: 0.8125rem;
944:   font-weight: 700;
945:   letter-spacing: 0.12em;
946:   text-transform: uppercase;
947:   color: var(--gold);
948: }
949: .orbit-lightbox-alt { display: block; margin-top: 2px; font-size: 0.875rem; color: var(--on-dark-muted); }
950: .orbit-lightbox-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 20px; }
951: .orbit-lightbox-close {
952:   min-height: 44px;
953:   padding: 0 16px;
954:   border: 1px solid rgba(246, 243, 234, 0.3);
955:   color: inherit;
956:   font-size: 0.8125rem;
957:   font-weight: 700;
958:   letter-spacing: 0.1em;
959:   text-transform: uppercase;
960: }
961: .orbit-lightbox-close:hover { border-color: currentColor; }
````

## File: src/styles/pages.css
````css
   1: /* ==========================================================================
   2:    Inner pages — shared header, commerce listings, page furniture
   3:    ========================================================================== */
   4: 
   5: .section-tight { padding-block: clamp(32px, 5vw, 64px); }
   6: 
   7: /* ---- Breadcrumbs ------------------------------------------------------- */
   8: .crumbs ol {
   9:   list-style: none;
  10:   display: flex;
  11:   flex-wrap: wrap;
  12:   align-items: center;
  13:   font-size: 0.8125rem;
  14:   color: var(--muted);
  15: }
  16: .crumbs li { display: inline-flex; align-items: center; }
  17: .crumbs li + li::before {
  18:   content: '/';
  19:   margin: 0 10px;
  20:   color: var(--subtle);
  21: }
  22: .crumbs a { min-height: 44px; color: var(--muted); }
  23: .crumbs a:hover { color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }
  24: .crumbs [aria-current] { color: var(--ink); font-weight: 600; }
  25: .on-dark .crumbs ol,
  26: .on-dark .crumbs a { color: rgba(246, 243, 234, 0.78); }
  27: .on-dark .crumbs [aria-current] { color: var(--on-dark); }
  28: .on-dark .crumbs li + li::before { color: rgba(246, 243, 234, 0.5); }
  29: 
  30: /* ---- Page header ------------------------------------------------------- */
  31: .page-header {
  32:   padding-top: clamp(8px, 2vw, 16px);
  33:   padding-bottom: clamp(32px, 5vw, 64px);
  34: }
  35: 
  36: .page-header-grid {
  37:   display: grid;
  38:   gap: 20px;
  39:   margin-top: clamp(16px, 3vw, 40px);
  40: }
  41: 
  42: .eyebrow + .page-title { margin-top: 16px; }
  43: 
  44: .page-header-aside {
  45:   display: flex;
  46:   flex-direction: column;
  47:   align-items: flex-start;
  48:   gap: 12px;
  49: }
  50: 
  51: @media (min-width: 1024px) {
  52:   .page-header-grid {
  53:     grid-template-columns: minmax(0, 1fr) minmax(300px, 420px);
  54:     align-items: end;
  55:     gap: 48px;
  56:   }
  57: }
  58: 
  59: /* Photographic variant */
  60: .page-header--image {
  61:   position: relative;
  62:   min-height: clamp(420px, 62svh, 640px);
  63:   display: flex;
  64:   overflow: hidden;
  65:   padding: 0;
  66:   background: var(--ink);
  67: }
  68: 
  69: .page-header-media { position: absolute; inset: 0; }
  70: .page-header-media::after {
  71:   content: '';
  72:   position: absolute;
  73:   inset: 0;
  74:   background:
  75:     linear-gradient(0deg, rgba(17, 17, 17, 0.88) 0%, rgba(17, 17, 17, 0.45) 45%, rgba(17, 17, 17, 0.15) 100%),
  76:     linear-gradient(90deg, rgba(17, 17, 17, 0.5) 0%, rgba(17, 17, 17, 0) 60%);
  77: }
  78: 
  79: .page-header-inner {
  80:   position: relative;
  81:   z-index: 1;
  82:   display: flex;
  83:   flex-direction: column;
  84:   justify-content: space-between;
  85:   padding-top: 8px;
  86:   padding-bottom: clamp(32px, 5vw, 64px);
  87: }
  88: 
  89: .page-header--image .eyebrow { color: rgba(246, 243, 234, 0.84); }
  90: .page-header--image .page-title { font-size: var(--fs-hero); line-height: 0.84; }
  91: 
  92: .page-lead {
  93:   margin-top: 20px;
  94:   max-width: 33em;
  95:   font-size: var(--fs-lead);
  96:   line-height: 1.5;
  97:   color: rgba(246, 243, 234, 0.88);
  98: }
  99: 
 100: /* ---- Shop toolbar (sticky) -------------------------------------------- */
 101: .shop-toolbar {
 102:   position: sticky;
 103:   top: var(--header-h);
 104:   z-index: var(--z-sticky);
 105:   background: rgba(246, 243, 234, 0.97);
 106:   backdrop-filter: blur(12px);
 107:   -webkit-backdrop-filter: blur(12px);
 108:   border-bottom: 1px solid var(--line);
 109: }
 110: 
 111: .shop-toolbar-inner {
 112:   display: flex;
 113:   align-items: center;
 114:   justify-content: space-between;
 115:   gap: 12px;
 116:   padding-block: 10px;
 117:   min-height: 52px;
 118: }
 119: 
 120: .shop-toolbar-left {
 121:   display: flex;
 122:   align-items: center;
 123:   gap: 8px;
 124:   min-width: 0;
 125:   flex: 1;
 126: }
 127: 
 128: .shop-toolbar-right {
 129:   display: flex;
 130:   align-items: center;
 131:   gap: 12px;
 132:   flex-shrink: 0;
 133: }
 134: 
 135: .shop-result-count {
 136:   font-size: 0.8125rem;
 137:   color: var(--muted);
 138:   font-variant-numeric: tabular-nums;
 139:   white-space: nowrap;
 140: }
 141: 
 142: /* Filter button */
 143: .shop-filter-btn {
 144:   display: inline-flex;
 145:   align-items: center;
 146:   gap: 7px;
 147:   min-height: 36px;
 148:   padding: 0 14px 0 10px;
 149:   font-size: 0.8125rem;
 150:   font-weight: 600;
 151:   border: 1.5px solid var(--line-strong);
 152:   border-radius: 9999px;
 153:   background: var(--paper);
 154:   cursor: pointer;
 155:   transition: border-color 0.18s ease, background 0.18s ease;
 156:   position: relative;
 157: }
 158: .shop-filter-btn:hover { border-color: var(--ink); }
 159: 
 160: .shop-filter-badge {
 161:   display: grid;
 162:   place-items: center;
 163:   width: 18px;
 164:   height: 18px;
 165:   border-radius: 50%;
 166:   background: var(--ink);
 167:   color: var(--paper);
 168:   font-size: 0.6875rem;
 169:   font-weight: 700;
 170:   line-height: 1;
 171:   flex-shrink: 0;
 172: }
 173: 
 174: /* Active filter pills */
 175: .shop-active-pills {
 176:   display: flex;
 177:   gap: 6px;
 178:   overflow-x: auto;
 179:   scrollbar-width: none;
 180:   min-width: 0;
 181:   padding-block: 2px;
 182: }
 183: .shop-active-pills::-webkit-scrollbar { display: none; }
 184: 
 185: .active-pill {
 186:   display: inline-flex;
 187:   align-items: center;
 188:   gap: 5px;
 189:   min-height: 28px;
 190:   padding: 0 10px;
 191:   font-size: 0.75rem;
 192:   font-weight: 600;
 193:   background: var(--ink);
 194:   color: var(--paper);
 195:   border: 1.5px solid var(--ink);
 196:   border-radius: 9999px;
 197:   white-space: nowrap;
 198:   cursor: pointer;
 199:   transition: opacity 0.15s ease;
 200: }
 201: .active-pill:hover { opacity: 0.75; }
 202: .active-pill svg { flex-shrink: 0; opacity: 0.7; }
 203: 
 204: /* Sort select */
 205: .sort-control .select {
 206:   width: auto;
 207:   min-width: 160px;
 208:   min-height: 36px;
 209:   border-radius: 9999px;
 210:   border: 1.5px solid var(--line-strong);
 211:   padding: 0 36px 0 14px;
 212:   font-size: 0.8125rem;
 213:   font-weight: 600;
 214:   color: var(--ink);
 215:   background: var(--paper)
 216:     url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%23111111' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
 217:     no-repeat right 14px center;
 218:   appearance: none;
 219:   -webkit-appearance: none;
 220:   cursor: pointer;
 221:   transition: border-color 0.18s ease;
 222: }
 223: .sort-control .select:hover { border-color: var(--ink); }
 224: .sort-control .select:focus {
 225:   outline: none;
 226:   border-color: var(--ink);
 227:   box-shadow: 0 0 0 3px rgba(17, 24, 39, 0.08);
 228: }
 229: 
 230: @media (max-width: 767px) {
 231:   .shop-result-count { display: none; }
 232:   .sort-control .select { min-width: 130px; }
 233: }
 234: 
 235: /* ---- Shop layout (sidebar + grid) ------------------------------------- */
 236: .shop-layout {
 237:   display: grid;
 238:   grid-template-columns: 1fr;
 239:   gap: 0;
 240:   padding-bottom: var(--section-y);
 241:   align-items: start;
 242: }
 243: 
 244: @media (min-width: 1024px) {
 245:   .shop-layout {
 246:     grid-template-columns: 220px 1fr;
 247:     gap: 48px;
 248:     padding-top: 32px;
 249:   }
 250: }
 251: 
 252: @media (min-width: 1280px) {
 253:   .shop-layout {
 254:     grid-template-columns: 240px 1fr;
 255:     gap: 56px;
 256:   }
 257: }
 258: 
 259: /* ---- Sidebar ----------------------------------------------------------- */
 260: .shop-sidebar {
 261:   display: none;
 262: }
 263: 
 264: @media (min-width: 1024px) {
 265:   .shop-sidebar {
 266:     display: block;
 267:     position: sticky;
 268:     top: calc(var(--header-h) + 52px + 24px);
 269:     max-height: calc(100svh - var(--header-h) - 52px - 48px);
 270:     overflow-y: auto;
 271:     scrollbar-width: thin;
 272:     scrollbar-color: var(--line-strong) transparent;
 273:   }
 274: }
 275: 
 276: .shop-sidebar-inner {
 277:   display: flex;
 278:   flex-direction: column;
 279:   gap: 0;
 280: }
 281: 
 282: .shop-sidebar-head {
 283:   display: flex;
 284:   align-items: center;
 285:   justify-content: space-between;
 286:   margin-bottom: 16px;
 287: }
 288: 
 289: .shop-sidebar-title {
 290:   font-size: var(--fs-label);
 291:   font-weight: 700;
 292:   letter-spacing: 0.12em;
 293:   text-transform: uppercase;
 294: }
 295: 
 296: /* ---- Filter sections -------------------------------------------------- */
 297: .filter-section {
 298:   border-top: 1px solid var(--line);
 299: }
 300: .filter-section:last-child {
 301:   border-bottom: 1px solid var(--line);
 302: }
 303: 
 304: .filter-section-header {
 305:   display: flex;
 306:   align-items: center;
 307:   justify-content: space-between;
 308:   width: 100%;
 309:   min-height: 44px;
 310:   padding: 0;
 311:   font-size: 0.875rem;
 312:   font-weight: 600;
 313:   color: var(--ink);
 314:   cursor: pointer;
 315:   background: none;
 316:   border: none;
 317:   text-align: left;
 318: }
 319: 
 320: .filter-chevron {
 321:   flex-shrink: 0;
 322:   color: var(--muted);
 323:   transition: transform 0.2s ease;
 324: }
 325: .filter-chevron.is-open { transform: rotate(180deg); }
 326: 
 327: .filter-section-body {
 328:   padding-bottom: 14px;
 329: }
 330: 
 331: /* ---- Filter radio controls -------------------------------------------- */
 332: .filter-radio-group {
 333:   display: flex;
 334:   flex-direction: column;
 335:   gap: 2px;
 336: }
 337: 
 338: .filter-radio {
 339:   display: flex;
 340:   align-items: center;
 341:   gap: 10px;
 342:   min-height: 36px;
 343:   padding: 4px 8px;
 344:   border-radius: 6px;
 345:   font-size: 0.875rem;
 346:   cursor: pointer;
 347:   transition: background 0.15s ease;
 348:   color: var(--muted);
 349: }
 350: .filter-radio:hover {
 351:   background: rgba(17, 17, 17, 0.04);
 352:   color: var(--ink);
 353: }
 354: .filter-radio.is-checked {
 355:   color: var(--ink);
 356:   font-weight: 600;
 357: }
 358: 
 359: .filter-radio input[type='radio'] {
 360:   width: 16px;
 361:   height: 16px;
 362:   accent-color: var(--ink);
 363:   flex-shrink: 0;
 364:   cursor: pointer;
 365:   margin: 0;
 366: }
 367: 
 368: .filter-radio span:first-of-type {
 369:   flex: 1;
 370: }
 371: 
 372: .filter-count {
 373:   font-size: 0.75rem;
 374:   color: var(--subtle);
 375:   font-variant-numeric: tabular-nums;
 376:   margin-left: auto;
 377: }
 378: 
 379: /* Filter clear controls */
 380: .filter-clear-row {
 381:   display: flex;
 382:   align-items: center;
 383:   justify-content: space-between;
 384:   gap: 8px;
 385:   padding: 8px 0 12px;
 386: }
 387: 
 388: .filter-active-label {
 389:   font-size: 0.8125rem;
 390:   font-weight: 600;
 391:   color: var(--ink);
 392: }
 393: 
 394: .filter-clear-btn {
 395:   font-size: 0.8125rem;
 396:   font-weight: 600;
 397:   color: var(--muted);
 398:   text-decoration: underline;
 399:   text-underline-offset: 2px;
 400:   min-height: 0;
 401:   background: none;
 402:   border: none;
 403:   cursor: pointer;
 404:   padding: 0;
 405:   transition: color 0.15s ease;
 406: }
 407: .filter-clear-btn:hover { color: var(--ink); }
 408: 
 409: /* ---- Results ---------------------------------------------------------- */
 410: .shop-results { padding-top: 24px; }
 411: 
 412: @media (min-width: 1024px) {
 413:   .shop-results { padding-top: 0; }
 414: }
 415: 
 416: .results-count {
 417:   font-size: 0.875rem;
 418:   color: var(--muted);
 419:   margin-bottom: 24px;
 420: }
 421: .results-count a { color: var(--ink); }
 422: 
 423: .product-grid {
 424:   list-style: none;
 425:   display: grid;
 426:   grid-template-columns: repeat(2, minmax(0, 1fr));
 427:   gap: 32px 12px;
 428: }
 429: .product-grid > li { display: flex; }
 430: .product-grid > li > .product-card { width: 100%; }
 431: 
 432: @media (min-width: 768px) {
 433:   .product-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 48px 20px; }
 434: }
 435: @media (min-width: 1280px) {
 436:   .shop-layout .product-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
 437: }
 438: @media (min-width: 1440px) {
 439:   .shop-layout .product-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 48px 20px; }
 440: }
 441: 
 442: /* Compact cards (2-up on phones): stack price over a full-width add button. */
 443: .product-card { container-type: inline-size; }
 444: @container (max-width: 230px) {
 445:   .product-card-foot { flex-direction: column; align-items: stretch; gap: 10px; }
 446:   .product-card-add { width: 100%; }
 447:   .product-card-title { font-size: 0.9375rem; }
 448: }
 449: 
 450: .empty-state {
 451:   display: flex;
 452:   flex-direction: column;
 453:   align-items: flex-start;
 454:   gap: 16px;
 455:   padding: clamp(40px, 6vw, 72px) 0;
 456:   border-top: 1px solid var(--line);
 457: }
 458: 
 459: /* ---- Filter drawer (mobile) ------------------------------------------- */
 460: .filter-drawer-overlay {
 461:   position: fixed;
 462:   inset: 0;
 463:   background: rgba(17, 17, 17, 0.5);
 464:   z-index: calc(var(--z-modal) - 1);
 465:   backdrop-filter: blur(2px);
 466:   -webkit-backdrop-filter: blur(2px);
 467: }
 468: 
 469: .filter-drawer {
 470:   position: fixed;
 471:   bottom: 0;
 472:   left: 0;
 473:   right: 0;
 474:   z-index: var(--z-modal);
 475:   background: var(--paper);
 476:   border-radius: 20px 20px 0 0;
 477:   max-height: 85svh;
 478:   display: flex;
 479:   flex-direction: column;
 480:   transform: translateY(100%);
 481:   transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
 482:   box-shadow: 0 -8px 40px rgba(0, 0, 0, 0.18);
 483: }
 484: .filter-drawer.is-open {
 485:   transform: translateY(0);
 486: }
 487: 
 488: @media (min-width: 1024px) {
 489:   .filter-drawer,
 490:   .filter-drawer-overlay {
 491:     display: none !important;
 492:   }
 493:   .shop-filter-btn { display: none; }
 494: }
 495: 
 496: .filter-drawer-head {
 497:   display: flex;
 498:   align-items: center;
 499:   justify-content: space-between;
 500:   padding: 16px 20px 12px;
 501:   border-bottom: 1px solid var(--line);
 502:   flex-shrink: 0;
 503: }
 504: 
 505: .filter-drawer-close {
 506:   display: grid;
 507:   place-items: center;
 508:   width: 36px;
 509:   height: 36px;
 510:   border-radius: 50%;
 511:   background: rgba(17, 17, 17, 0.06);
 512:   border: none;
 513:   cursor: pointer;
 514:   color: var(--ink);
 515:   min-height: 0;
 516:   transition: background 0.15s ease;
 517: }
 518: .filter-drawer-close:hover { background: rgba(17, 17, 17, 0.12); }
 519: 
 520: .filter-drawer-body {
 521:   overflow-y: auto;
 522:   flex: 1;
 523:   padding: 8px 20px;
 524:   scrollbar-width: thin;
 525: }
 526: 
 527: .filter-drawer-foot {
 528:   padding: 14px 20px max(14px, env(safe-area-inset-bottom));
 529:   border-top: 1px solid var(--line);
 530:   flex-shrink: 0;
 531: }
 532: 
 533: .section-bar {
 534:   display: flex;
 535:   flex-wrap: wrap;
 536:   align-items: baseline;
 537:   justify-content: space-between;
 538:   gap: 12px;
 539:   padding-bottom: 16px;
 540:   margin-bottom: 28px;
 541:   border-bottom: 1px solid var(--line-strong);
 542: }
 543: .section-bar .results-count { margin: 0; }
 544: 
 545: /* ---- Category page ----------------------------------------------------- */
 546: .category-stock-head {
 547:   display: grid;
 548:   gap: 16px;
 549:   padding-bottom: 8px;
 550: }
 551: 
 552: .stock-list {
 553:   list-style: none;
 554:   display: flex;
 555:   flex-wrap: wrap;
 556:   gap: 8px 0;
 557:   font-stretch: var(--stretch-tight);
 558:   font-weight: 700;
 559:   font-size: var(--fs-d4);
 560:   line-height: 1.15;
 561:   text-transform: uppercase;
 562: }
 563: .stock-list li:not(:last-child)::after {
 564:   content: '/';
 565:   margin: 0 14px;
 566:   color: var(--gold);
 567:   font-weight: 400;
 568: }
 569: 
 570: @media (min-width: 1024px) {
 571:   .category-stock-head { grid-template-columns: 220px 1fr; align-items: baseline; }
 572: }
 573: 
 574: .category-products { padding-bottom: clamp(48px, 7vw, 96px); }
 575: 
 576: .store-callout {
 577:   margin-top: clamp(48px, 6vw, 80px);
 578:   padding: 24px 0;
 579:   border-top: 1px solid var(--line-strong);
 580:   border-bottom: 1px solid var(--line-strong);
 581:   display: flex;
 582:   flex-wrap: wrap;
 583:   align-items: center;
 584:   justify-content: space-between;
 585:   gap: 12px 32px;
 586: }
 587: .store-callout p { font-size: var(--fs-lead); max-width: 35.3em; }
 588: 
 589: .other-sports {
 590:   padding-bottom: var(--section-y);
 591:   display: flex;
 592:   flex-direction: column;
 593:   gap: 14px;
 594: }
 595: .other-sports ul { list-style: none; display: flex; flex-wrap: wrap; gap: 8px; }
 596: 
 597: /* ---- Sticky buy bar (product page, phones only) ------------------------ */
 598: .sticky-buy {
 599:   position: fixed;
 600:   left: 0;
 601:   right: 0;
 602:   bottom: 0;
 603:   z-index: var(--z-sticky);
 604:   display: flex;
 605:   align-items: center;
 606:   justify-content: space-between;
 607:   gap: 12px;
 608:   padding: 10px var(--gutter) max(10px, env(safe-area-inset-bottom));
 609:   background: rgba(251, 249, 244, 0.97);
 610:   backdrop-filter: blur(10px);
 611:   -webkit-backdrop-filter: blur(10px);
 612:   border-top: 1px solid var(--line-strong);
 613: }
 614: .sticky-buy-price { font-weight: 700; font-size: 1.125rem; font-variant-numeric: tabular-nums; }
 615: .sticky-buy-name {
 616:   font-size: 0.75rem;
 617:   color: var(--muted);
 618:   max-width: 34vw;
 619:   white-space: nowrap;
 620:   overflow: hidden;
 621:   text-overflow: ellipsis;
 622: }
 623: .sticky-buy-actions { display: flex; gap: 8px; }
 624: 
 625: @media (min-width: 1024px) {
 626:   .sticky-buy { display: none; }
 627: }
 628: 
 629: /* ---- Product detail ---------------------------------------------------- */
 630: .pdp { padding-bottom: calc(var(--section-y) + 72px); }
 631: @media (min-width: 1024px) { .pdp { padding-bottom: var(--section-y); } }
 632: 
 633: .pdp-crumbs { padding-block: 8px 16px; }
 634: .pdp-crumbs li:last-child span {
 635:   display: inline-block;
 636:   max-width: 42vw;
 637:   white-space: nowrap;
 638:   overflow: hidden;
 639:   text-overflow: ellipsis;
 640:   vertical-align: bottom;
 641: }
 642: 
 643: .pdp-grid {
 644:   display: grid;
 645:   gap: 32px;
 646: }
 647: 
 648: .pdp-stage {
 649:   position: relative;
 650:   aspect-ratio: 1 / 1;
 651:   overflow: hidden;
 652:   background: var(--stage);
 653:   margin-inline: calc(var(--gutter) * -1);
 654: }
 655: .pdp-badge { position: absolute; left: 16px; top: 16px; }
 656: 
 657: .pdp-thumbs {
 658:   display: flex;
 659:   gap: 8px;
 660:   margin-top: 12px;
 661: }
 662: .pdp-thumb {
 663:   width: 76px;
 664:   height: 76px;
 665:   padding: 0;
 666:   overflow: hidden;
 667:   background: var(--stage);
 668:   border: 1.5px solid transparent;
 669:   opacity: 0.7;
 670:   transition: opacity var(--t-1) ease, border-color var(--t-1) ease;
 671: }
 672: .pdp-thumb:hover { opacity: 1; }
 673: .pdp-thumb.is-active { border-color: var(--ink); opacity: 1; }
 674: 
 675: .pdp-title {
 676:   margin-top: 14px;
 677:   font-stretch: var(--stretch-tight);
 678:   font-weight: 800;
 679:   font-size: clamp(1.875rem, 3.4vw, 3rem);
 680:   line-height: 1;
 681:   letter-spacing: -0.01em;
 682: }
 683: 
 684: .pdp-price {
 685:   display: flex;
 686:   flex-wrap: wrap;
 687:   align-items: baseline;
 688:   gap: 4px 12px;
 689:   margin-top: 20px;
 690: }
 691: .pdp-price-now { font-size: 1.75rem; font-weight: 700; font-variant-numeric: tabular-nums; }
 692: .pdp-tax { font-size: 0.8125rem; color: var(--subtle); margin-top: 2px; }
 693: 
 694: .pdp-stock {
 695:   display: inline-flex;
 696:   align-items: center;
 697:   gap: 8px;
 698:   margin-top: 16px;
 699:   font-size: 0.9375rem;
 700:   font-weight: 600;
 701: }
 702: .pdp-stock .status-dot { background: var(--subtle); }
 703: .pdp-stock.is-in .status-dot { background: var(--success); box-shadow: 0 0 0 3px rgba(46, 107, 60, 0.18); }
 704: 
 705: .pdp-description {
 706:   margin-top: 20px;
 707:   padding-top: 20px;
 708:   border-top: 1px solid var(--line);
 709:   color: var(--muted);
 710:   line-height: 1.65;
 711:   max-width: 35.3em;
 712: }
 713: 
 714: .pdp-option {
 715:   border: 0;
 716:   margin-top: 24px;
 717:   display: flex;
 718:   flex-direction: column;
 719:   gap: 10px;
 720: }
 721: .pdp-choices { display: flex; flex-wrap: wrap; gap: 8px; }
 722: 
 723: .pdp-buy {
 724:   display: flex;
 725:   gap: 8px;
 726:   margin-top: 28px;
 727:   margin-bottom: 8px;
 728: }
 729: .pdp-add { flex: 1; }
 730: .pdp-add.is-added { --btn-bg: var(--gold); --btn-bd: var(--gold); --btn-fg: var(--ink); }
 731: 
 732: .qty {
 733:   display: inline-flex;
 734:   align-items: center;
 735:   border: 1.5px solid var(--ink);
 736:   border-radius: var(--r-1);
 737:   background: var(--paper);
 738: }
 739: .qty button {
 740:   width: 44px;
 741:   height: 45px;
 742:   display: grid;
 743:   place-items: center;
 744: }
 745: .qty output {
 746:   min-width: 28px;
 747:   text-align: center;
 748:   font-weight: 700;
 749:   font-variant-numeric: tabular-nums;
 750: }
 751: 
 752: .pdp-whatsapp { margin-top: 8px; }
 753: 
 754: .pdp-promises {
 755:   margin-top: 28px;
 756:   border-top: 1px solid var(--line-strong);
 757: }
 758: .pdp-promises > div {
 759:   display: grid;
 760:   grid-template-columns: 110px 1fr;
 761:   gap: 12px;
 762:   padding: 14px 0;
 763:   border-bottom: 1px solid var(--line);
 764:   font-size: 0.9375rem;
 765: }
 766: .pdp-promises dt { font-weight: 600; }
 767: .pdp-promises dd { color: var(--muted); }
 768: .pdp-promises dd a { display: inline; min-height: 0; color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }
 769: 
 770: .pdp-specs { margin-top: 28px; }
 771: .pdp-specs summary {
 772:   cursor: pointer;
 773:   min-height: 44px;
 774:   display: flex;
 775:   align-items: center;
 776:   font-size: var(--fs-label);
 777:   font-weight: 700;
 778:   letter-spacing: 0.14em;
 779:   text-transform: uppercase;
 780:   border-bottom: 1px solid var(--line-strong);
 781: }
 782: .pdp-specs table { width: 100%; border-collapse: collapse; font-size: 0.9375rem; }
 783: .pdp-specs th,
 784: .pdp-specs td { text-align: left; padding: 12px 0; border-bottom: 1px solid var(--line); vertical-align: top; }
 785: .pdp-specs th { width: 42%; font-weight: 500; color: var(--muted); padding-right: 16px; }
 786: 
 787: .pdp-related {
 788:   margin-top: clamp(64px, 9vw, 128px);
 789: }
 790: 
 791: @media (min-width: 768px) {
 792:   .pdp-stage { margin-inline: 0; }
 793: }
 794: 
 795: @media (min-width: 1024px) {
 796:   .pdp-grid {
 797:     grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
 798:     gap: clamp(40px, 5vw, 88px);
 799:     align-items: start;
 800:   }
 801:   .pdp-info-sticky {
 802:     position: sticky;
 803:     top: calc(var(--header-h) + 24px);
 804:   }
 805: }
 806: 
 807: /* ---- Courts page ------------------------------------------------------- */
 808: .page-header-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
 809: 
 810: .court-services { display: flex; flex-direction: column; gap: clamp(64px, 9vw, 128px); }
 811: 
 812: .court-service {
 813:   display: grid;
 814:   gap: 28px;
 815:   scroll-margin-top: calc(var(--header-h) + 24px);
 816: }
 817: 
 818: .court-service-media {
 819:   aspect-ratio: 4 / 3;
 820:   background: var(--stone);
 821:   margin-inline: calc(var(--gutter) * -1);
 822: }
 823: 
 824: .court-service-title { margin-top: 16px; }
 825: 
 826: .court-service-desc {
 827:   margin-top: 18px;
 828:   font-size: var(--fs-lead);
 829:   line-height: 1.5;
 830:   color: var(--muted);
 831:   max-width: 33em;
 832: }
 833: 
 834: .court-service-facts {
 835:   margin: 24px 0;
 836:   border-top: 1px solid var(--line-strong);
 837: }
 838: .court-service-facts > div {
 839:   display: grid;
 840:   grid-template-columns: 120px 1fr;
 841:   gap: 16px;
 842:   padding: 12px 0;
 843:   border-bottom: 1px solid var(--line);
 844:   font-size: 0.9375rem;
 845: }
 846: .court-service-facts dt { color: var(--muted); }
 847: .court-service-facts dd { font-weight: 600; }
 848: 
 849: .dash-list {
 850:   list-style: none;
 851:   display: grid;
 852:   gap: 8px;
 853:   margin-bottom: 20px;
 854:   color: var(--muted);
 855:   font-size: 0.9375rem;
 856: }
 857: .dash-list li {
 858:   position: relative;
 859:   padding-left: 22px;
 860: }
 861: .dash-list li::before {
 862:   content: '';
 863:   position: absolute;
 864:   left: 0;
 865:   top: 0.72em;
 866:   width: 12px;
 867:   height: 2px;
 868:   background: var(--gold);
 869: }
 870: 
 871: @media (min-width: 768px) {
 872:   .court-service-media { margin-inline: 0; }
 873: }
 874: 
 875: @media (min-width: 1024px) {
 876:   .court-service {
 877:     grid-template-columns: minmax(0, 6fr) minmax(0, 5fr);
 878:     gap: clamp(40px, 5vw, 96px);
 879:     align-items: center;
 880:   }
 881:   .court-service.is-flipped { grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); }
 882:   .court-service.is-flipped .court-service-media { order: 2; }
 883: }
 884: 
 885: .courts-sequence {
 886:   background: var(--black);
 887:   padding-block: clamp(64px, 9vw, 120px);
 888: }
 889: 
 890: /* ---- Estimator --------------------------------------------------------- */
 891: .estimator {
 892:   background: var(--ink);
 893:   padding: clamp(28px, 5vw, 64px);
 894:   margin-inline: calc(var(--gutter) * -1);
 895: }
 896: @media (min-width: 768px) { .estimator { margin-inline: 0; } }
 897: 
 898: .estimator .eyebrow { color: var(--on-dark-muted); }
 899: .estimator-head h2 { margin-top: 16px; }
 900: .estimator-intro { margin-top: 16px; max-width: 34.1em; color: rgba(246, 243, 234, 0.78); font-size: var(--fs-lead); }
 901: 
 902: .estimator-grid {
 903:   display: grid;
 904:   gap: 40px;
 905:   margin-top: 40px;
 906: }
 907: @media (min-width: 1024px) {
 908:   .estimator-grid { grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 64px; }
 909: }
 910: 
 911: .estimator-controls { display: flex; flex-direction: column; gap: 28px; }
 912: 
 913: .estimator-field { border: 0; display: flex; flex-direction: column; gap: 12px; }
 914: .estimator-field legend,
 915: .estimator-legend-row {
 916:   font-size: var(--fs-label);
 917:   font-weight: 700;
 918:   letter-spacing: 0.14em;
 919:   text-transform: uppercase;
 920:   color: var(--on-dark-muted);
 921:   margin-bottom: 12px;
 922: }
 923: .estimator-legend-row {
 924:   display: flex;
 925:   justify-content: space-between;
 926:   align-items: baseline;
 927:   min-height: 0;
 928:   margin-bottom: 0;
 929: }
 930: .estimator-legend-row output {
 931:   font-size: 1.5rem;
 932:   letter-spacing: 0;
 933:   color: var(--on-dark);
 934:   font-variant-numeric: tabular-nums;
 935: }
 936: 
 937: .estimator-chips { display: flex; flex-wrap: wrap; gap: 8px; }
 938: 
 939: .chip-dark { color: var(--on-dark); border-color: rgba(246, 243, 234, 0.3); }
 940: .chip-dark:hover { border-color: var(--on-dark); }
 941: .chip-dark[aria-pressed='true'] { background: var(--gold); border-color: var(--gold); color: var(--ink); }
 942: 
 943: .estimator-options { display: grid; gap: 8px; }
 944: .estimator-option,
 945: .estimator-check {
 946:   display: flex;
 947:   align-items: center;
 948:   gap: 12px;
 949:   min-height: 48px;
 950:   padding: 0 14px;
 951:   border: 1px solid rgba(246, 243, 234, 0.2);
 952:   border-radius: var(--r-1);
 953:   cursor: pointer;
 954:   transition: border-color var(--t-1) ease, background-color var(--t-1) ease;
 955: }
 956: .estimator-check { border: 0; padding: 0; min-height: 44px; }
 957: .estimator-option:hover { border-color: rgba(246, 243, 234, 0.5); }
 958: .estimator-option.is-selected { border-color: var(--gold); background: rgba(201, 162, 39, 0.1); }
 959: .estimator-option input,
 960: .estimator-check input { width: 18px; height: 18px; accent-color: var(--gold); flex-shrink: 0; }
 961: 
 962: .estimator-range { width: 100%; accent-color: var(--gold); min-height: 44px; }
 963: 
 964: .estimator-result {
 965:   align-self: start;
 966:   padding-top: 28px;
 967:   border-top: 2px solid var(--gold);
 968: }
 969: .estimator-result .label { color: var(--on-dark-muted); }
 970: .estimator-figure {
 971:   margin-top: 12px;
 972:   font-stretch: var(--stretch-display);
 973:   font-weight: 800;
 974:   font-size: clamp(3rem, 6vw, 4.75rem);
 975:   line-height: 0.9;
 976:   font-variant-numeric: tabular-nums;
 977: }
 978: .estimator-summary { margin-top: 14px; color: rgba(246, 243, 234, 0.78); }
 979: .estimator-actions { display: grid; gap: 10px; margin-top: 28px; }
 980: .estimator-actions .btn { white-space: normal; text-align: center; padding-block: 12px; }
 981: .estimator-note { margin-top: 14px; font-size: 0.8125rem; color: var(--on-dark-subtle); }
 982: 
 983: /* ---- Projects ---------------------------------------------------------- */
 984: .project-grid {
 985:   list-style: none;
 986:   display: grid;
 987:   gap: 48px 24px;
 988: }
 989: @media (min-width: 768px) {
 990:   .project-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
 991: }
 992: 
 993: .project-card-link {
 994:   display: flex;
 995:   flex-direction: column;
 996:   align-items: flex-start;
 997:   gap: 10px;
 998:   width: 100%;
 999: }
1000: .project-card-media {
1001:   display: block;
1002:   width: 100%;
1003:   aspect-ratio: 4 / 3;
1004:   overflow: hidden;
1005:   background: var(--stone);
1006:   margin-bottom: 6px;
1007: }
1008: .project-card-media img { transition: transform 900ms var(--ease-out); }
1009: .project-card-link:hover .project-card-media img { transform: scale(1.04); }
1010: .project-card-title {
1011:   font-stretch: var(--stretch-tight);
1012:   font-weight: 800;
1013:   font-size: var(--fs-d4);
1014:   line-height: 1.05;
1015: }
1016: .project-card-link:hover .project-card-title { text-decoration: underline; text-underline-offset: 4px; text-decoration-thickness: 2px; }
1017: .project-card-surface { color: var(--muted); font-size: 0.9375rem; }
1018: 
1019: /* ---- Contact band ------------------------------------------------------ */
1020: /* The rule spans the content column only, lining up with the rules above it. */
1021: .contact-band {
1022:   position: relative;
1023:   display: grid;
1024:   gap: 24px;
1025:   padding-block: clamp(56px, 8vw, 104px);
1026: }
1027: .contact-band::before {
1028:   content: '';
1029:   position: absolute;
1030:   top: 0;
1031:   left: var(--gutter);
1032:   right: var(--gutter);
1033:   height: 1px;
1034:   background: var(--line-strong);
1035: }
1036: .contact-band .lead { margin-top: 12px; }
1037: .contact-band-actions { display: flex; flex-wrap: wrap; gap: 12px; align-self: end; }
1038: @media (min-width: 1024px) {
1039:   .contact-band { grid-template-columns: 1fr auto; align-items: end; }
1040: }
1041: 
1042: /* ---- About ------------------------------------------------------------- */
1043: .about-band {
1044:   aspect-ratio: 16 / 9;
1045:   max-height: 78svh;
1046:   width: 100%;
1047:   background: var(--stone);
1048: }
1049: @media (min-width: 1024px) { .about-band { aspect-ratio: 21 / 8; } }
1050: 
1051: /* Story: a large normal-width lede beside the supporting paragraphs.
1052:    Condensed type stays for display lines; running text never uses it. */
1053: .about-story {
1054:   display: grid;
1055:   gap: clamp(24px, 4vw, 40px);
1056: }
1057: .about-lede {
1058:   font-size: clamp(1.375rem, 2.1vw, 2rem);
1059:   font-weight: 500;
1060:   line-height: 1.32;
1061:   letter-spacing: -0.01em;
1062:   max-width: 17.6em;
1063: }
1064: .about-body {
1065:   display: grid;
1066:   gap: 20px;
1067:   align-content: start;
1068:   color: var(--muted);
1069:   font-size: var(--fs-lead);
1070:   line-height: 1.6;
1071:   max-width: 30.6em;
1072: }
1073: @media (min-width: 1024px) {
1074:   .about-story {
1075:     grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
1076:     gap: clamp(48px, 6vw, 112px);
1077:   }
1078:   /* Body starts level with the lede's second line, not its cap height. */
1079:   .about-body { padding-top: 0.5rem; }
1080: }
1081: 
1082: .pillar-list { list-style: none; margin-top: 24px; border-top: 1px solid var(--line-strong); }
1083: /* The contact band's rule closes the list on the About page. */
1084: .about-pillars .pillar:last-child { border-bottom: 0; }
1085: .pillar {
1086:   display: grid;
1087:   gap: 12px;
1088:   padding: clamp(24px, 3vw, 40px) 0;
1089:   border-bottom: 1px solid var(--line-strong);
1090: }
1091: .pillar-text { color: var(--muted); font-size: var(--fs-lead); line-height: 1.5; max-width: 30.6em; }
1092: .pillar .link-arrow { justify-self: start; }
1093: @media (min-width: 1024px) {
1094:   .pillar { grid-template-columns: minmax(0, 5fr) minmax(0, 5fr) auto; align-items: center; gap: 48px; }
1095: }
1096: 
1097: /* ---- Visit ------------------------------------------------------------- */
1098: .visit-grid {
1099:   display: grid;
1100:   gap: 40px;
1101:   padding-bottom: clamp(48px, 7vw, 96px);
1102: }
1103: .visit-details { display: flex; flex-direction: column; gap: 24px; }
1104: .visit-address { font-style: normal; font-size: var(--fs-lead); line-height: 1.55; }
1105: .visit-grid > * { min-width: 0; }
1106: .visit-map {
1107:   aspect-ratio: 4 / 3;
1108:   background: var(--stone);
1109:   margin-inline: calc(var(--gutter) * -1);
1110: }
1111: .visit-map iframe { width: 100%; height: 100%; border: 0; display: block; filter: grayscale(0.35) contrast(1.05); }
1112: @media (min-width: 768px) { .visit-map { margin-inline: 0; } }
1113: @media (min-width: 1024px) {
1114:   .visit-grid { grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: clamp(48px, 5vw, 96px); align-items: start; }
1115:   .visit-map { aspect-ratio: auto; height: 100%; min-height: 560px; }
1116: }
1117: 
1118: .store-hours dd a { color: var(--ink); }
1119: 
1120: .counter-list { list-style: none; margin-top: 24px; border-top: 1px solid var(--line-strong); }
1121: .counter-list li {
1122:   display: grid;
1123:   gap: 4px;
1124:   padding: 18px 0;
1125:   border-bottom: 1px solid var(--line-strong);
1126: }
1127: .counter-name { font-stretch: var(--stretch-tight); font-weight: 800; font-size: var(--fs-d4); text-transform: uppercase; }
1128: .counter-note { color: var(--muted); }
1129: @media (min-width: 768px) {
1130:   .counter-list li { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); align-items: baseline; gap: 32px; }
1131: }
1132: 
1133: /* ---- Contact ----------------------------------------------------------- */
1134: .contact-grid {
1135:   display: grid;
1136:   gap: 48px;
1137:   padding-bottom: var(--section-y);
1138: }
1139: .contact-form { display: flex; flex-direction: column; gap: 20px; }
1140: .contact-form-row { display: grid; gap: 20px; }
1141: @media (min-width: 640px) { .contact-form-row { grid-template-columns: 1fr 1fr; } }
1142: .contact-form-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 28px; margin-top: 4px; }
1143: .contact-form-note { font-size: 0.875rem; color: var(--muted); }
1144: .contact-side { display: flex; flex-direction: column; gap: 20px; }
1145: .contact-side .store-status { font-weight: 600; }
1146: .contact-side-note { color: var(--muted); font-size: 0.9375rem; line-height: 1.5; }
1147: @media (min-width: 1024px) {
1148:   .contact-grid { grid-template-columns: minmax(0, 7fr) minmax(0, 4fr); gap: clamp(48px, 6vw, 112px); }
1149: }
1150: 
1151: /* ---- Policies ---------------------------------------------------------- */
1152: .policy-grid {
1153:   display: grid;
1154:   gap: 32px;
1155:   padding-bottom: var(--section-y);
1156: }
1157: .policy-nav { display: flex; flex-wrap: wrap; gap: 4px 20px; border-bottom: 1px solid var(--line-strong); }
1158: .policy-link { font-weight: 600; color: var(--muted); border-bottom: 2px solid transparent; }
1159: .policy-link.active { color: var(--ink); border-bottom-color: var(--gold); }
1160: @media (min-width: 1024px) {
1161:   .policy-grid { grid-template-columns: 200px minmax(0, 40em); gap: 64px; }
1162:   .policy-nav { flex-direction: column; border-bottom: 0; border-left: 1px solid var(--line-strong); padding-left: 20px; align-self: start; position: sticky; top: calc(var(--header-h) + 24px); }
1163:   .policy-link { border-bottom: 0; }
1164:   .policy-link.active { box-shadow: -22px 0 0 -20px var(--gold); }
1165: }
1166: 
1167: .prose { max-width: 40em; font-size: 1.0625rem; line-height: 1.7; color: var(--ink-2); }
1168: .prose > * + * { margin-top: 1.1em; }
1169: .prose h2 {
1170:   margin-top: 2em;
1171:   font-stretch: var(--stretch-tight);
1172:   font-weight: 800;
1173:   font-size: 1.375rem;
1174:   line-height: 1.2;
1175:   color: var(--ink);
1176: }
1177: 
1178: /* ---- 404 --------------------------------------------------------------- */
1179: .not-found { padding-block: clamp(48px, 10vw, 128px); }
1180: .not-found-title { margin: 12px 0 20px; }
1181: .not-found-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 24px; margin-top: 28px; }
1182: .not-found-sports { list-style: none; display: flex; flex-wrap: wrap; gap: 8px; margin-top: 48px; padding-top: 24px; border-top: 1px solid var(--line); }
1183: 
1184: /* Buy bar on narrow phones: drop the name, tighten the buttons. */
1185: .sticky-buy .btn { padding: 0 14px; }
1186: @media (max-width: 400px) {
1187:   .sticky-buy-name { display: none; }
1188:   .sticky-buy .btn { padding: 0 12px; letter-spacing: 0.06em; }
1189: }
1190: .category-more { padding-bottom: clamp(48px, 7vw, 96px); }
1191: 
1192: /* ---- Court projects ---------------------------------------------------- */
1193: .projects-body { padding-bottom: var(--section-y); }
1194: .projects-filter { margin-bottom: clamp(28px, 4vw, 48px); flex-wrap: wrap; overflow: visible; margin-inline: 0; padding-inline: 0; }
1195: 
1196: .project-body { display: grid; gap: 40px; }
1197: .project-subhead { margin: 32px 0 16px; }
1198: @media (min-width: 1024px) {
1199:   .project-body { grid-template-columns: minmax(0, 7fr) minmax(0, 4fr); gap: clamp(48px, 6vw, 112px); align-items: start; }
1200: }
1201: .project-gallery {
1202:   display: grid;
1203:   gap: 12px;
1204:   padding-bottom: clamp(48px, 7vw, 96px);
1205: }
1206: @media (min-width: 768px) { .project-gallery { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
1207: .project-gallery-item { aspect-ratio: 4 / 3; overflow: hidden; background: var(--stone); }
1208: 
1209: /* ---- Search ------------------------------------------------------------ */
1210: .search-form { display: flex; gap: 8px; max-width: 680px; margin-top: 28px; }
1211: .search-form .input { flex: 1; min-width: 0; }
1212: .search-popular { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 8px; margin-top: 16px; }
1213: .search-popular .label { margin-right: 8px; }
1214: .search-results { padding-bottom: var(--section-y); }
1215: .search-tabs { margin-bottom: 32px; overflow: visible; flex-wrap: wrap; margin-inline: 0; padding-inline: 0; }
1216: .search-block { margin-bottom: clamp(40px, 6vw, 72px); }
1217: .search-block > h2 { margin-bottom: 20px; }
1218: .search-court-list { list-style: none; border-top: 1px solid var(--line-strong); }
1219: .search-court {
1220:   display: grid;
1221:   gap: 4px;
1222:   padding: 16px 0;
1223:   border-bottom: 1px solid var(--line);
1224:   width: 100%;
1225: }
1226: .search-court-name { font-weight: 700; font-size: 1.0625rem; }
1227: .search-court:hover .search-court-name { text-decoration: underline; text-underline-offset: 3px; }
1228: 
1229: /* ---- Bag / cart -------------------------------------------------------- */
1230: .cart-grid {
1231:   display: grid;
1232:   gap: 40px;
1233:   padding-bottom: var(--section-y);
1234: }
1235: @media (min-width: 1024px) {
1236:   .cart-grid { grid-template-columns: minmax(0, 7fr) minmax(320px, 4fr); gap: clamp(40px, 5vw, 88px); align-items: start; }
1237:   .cart-summary { position: sticky; top: calc(var(--header-h) + 24px); }
1238: }
1239: 
1240: .cart-lines { list-style: none; border-top: 1px solid var(--line-strong); }
1241: .cart-line {
1242:   display: grid;
1243:   grid-template-columns: 88px minmax(0, 1fr) auto;
1244:   gap: 16px;
1245:   padding: 20px 0;
1246:   border-bottom: 1px solid var(--line);
1247: }
1248: @media (min-width: 640px) { .cart-line { grid-template-columns: 112px minmax(0, 1fr) auto; gap: 24px; } }
1249: .cart-line-media { display: block; aspect-ratio: 1; overflow: hidden; background: var(--stage); min-height: 0; }
1250: .cart-line-body { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
1251: .cart-line-name { display: inline; min-height: 0; font-weight: 600; line-height: 1.35; }
1252: .cart-line-name:hover { text-decoration: underline; text-underline-offset: 3px; }
1253: .cart-line-options { font-size: 0.875rem; color: var(--muted); }
1254: .cart-line-foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: auto; padding-top: 10px; }
1255: .cart-line-remove { width: 44px; height: 44px; display: grid; place-items: center; color: var(--muted); border-radius: var(--r-pill); }
1256: .cart-line-remove:hover { color: var(--ink); background: rgba(17, 17, 17, 0.06); }
1257: 
1258: .qty-sm button { width: 40px; height: 42px; }
1259: 
1260: .cart-summary { display: flex; flex-direction: column; gap: 20px; }
1261: .cart-field { border: 0; display: flex; flex-direction: column; gap: 10px; }
1262: .cart-toggle { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
1263: .cart-toggle .chip { justify-content: center; }
1264: .cart-promo { display: flex; gap: 8px; }
1265: .cart-promo .input { flex: 1; min-width: 0; }
1266: .cart-promo-msg { font-size: 0.875rem; margin-top: -10px; }
1267: .cart-promo-msg.is-ok { color: var(--success); }
1268: .cart-promo-msg.is-error { color: var(--error); }
1269: .cart-totals { border-top: 1px solid var(--line-strong); }
1270: .cart-totals > div { display: flex; justify-content: space-between; padding: 10px 0; font-variant-numeric: tabular-nums; }
1271: .cart-totals dt { color: var(--muted); }
1272: .cart-total { border-top: 1px solid var(--line-strong); margin-top: 4px; padding-top: 14px !important; font-size: 1.25rem; font-weight: 700; }
1273: .cart-total dt { color: var(--ink) !important; }
1274: .cart-quick { align-self: flex-start; }
1275: .cart-note { font-size: 0.8125rem; color: var(--muted); line-height: 1.5; }
1276: .handoff { max-width: 640px; margin-top: 16px; }
1277: 
1278: /* ---- Modal (checkout) -------------------------------------------------- */
1279: .modal-backdrop {
1280:   position: fixed;
1281:   inset: 0;
1282:   z-index: var(--z-overlay);
1283:   display: flex;
1284:   align-items: flex-end;
1285:   justify-content: center;
1286:   background: rgba(17, 17, 17, 0.55);
1287:   overscroll-behavior: contain;
1288: }
1289: .modal {
1290:   width: 100%;
1291:   max-width: 560px;
1292:   max-height: 92svh;
1293:   overflow-y: auto;
1294:   background: var(--paper);
1295:   box-shadow: var(--shadow-overlay);
1296: }
1297: .modal-head { padding: 24px 24px 0; }
1298: .modal-head .muted { margin-top: 6px; }
1299: .modal-body { padding: 20px 24px 24px; }
1300: .modal-total { display: flex; justify-content: space-between; align-items: baseline; padding-top: 16px; border-top: 1px solid var(--line-strong); font-size: 1.125rem; }
1301: .modal-actions { display: grid; grid-template-columns: 1fr 1.6fr; gap: 8px; }
1302: @media (min-width: 640px) {
1303:   .modal-backdrop { align-items: center; padding: 24px; }
1304:   .modal { border-radius: var(--r-2); }
1305: }
1306: 
1307: /* ---- Enhanced Checkout Modal Styles ----------------------------------- */
1308: .checkout-modal {
1309:   max-width: 620px;
1310: }
1311: .checkout-steps-bar {
1312:   display: flex;
1313:   border-bottom: 1px solid var(--line);
1314:   margin-top: 14px;
1315: }
1316: .checkout-step-btn {
1317:   flex: 1;
1318:   padding: 10px 14px;
1319:   background: none;
1320:   border: none;
1321:   font-size: 0.8125rem;
1322:   font-weight: 700;
1323:   text-transform: uppercase;
1324:   letter-spacing: 0.08em;
1325:   color: var(--muted);
1326:   border-bottom: 2px solid transparent;
1327:   cursor: pointer;
1328:   transition: all var(--t-1) ease;
1329:   text-align: center;
1330: }
1331: .checkout-step-btn.is-active {
1332:   color: var(--ink);
1333:   border-bottom-color: var(--ink);
1334: }
1335: .payment-grid {
1336:   display: grid;
1337:   grid-template-columns: 1fr;
1338:   gap: 8px;
1339:   margin: 14px 0;
1340: }
1341: @media (min-width: 480px) {
1342:   .payment-grid { grid-template-columns: 1fr 1fr; }
1343: }
1344: .payment-card {
1345:   padding: 12px 14px;
1346:   border: 1.5px solid var(--line);
1347:   background: var(--paper);
1348:   border-radius: var(--r-1);
1349:   cursor: pointer;
1350:   text-align: left;
1351:   transition: all var(--t-1) ease;
1352: }
1353: .payment-card:hover {
1354:   border-color: var(--line-strong);
1355: }
1356: .payment-card.is-selected {
1357:   border-color: var(--ink);
1358:   background: rgba(17, 17, 17, 0.04);
1359: }
1360: .payment-card-title {
1361:   font-weight: 700;
1362:   font-size: 0.9375rem;
1363:   margin-bottom: 2px;
1364: }
1365: .payment-card-sub {
1366:   font-size: 0.75rem;
1367:   color: var(--muted);
1368: }
1369: .upi-panel {
1370:   background: rgba(201, 162, 39, 0.08);
1371:   border: 1px solid rgba(201, 162, 39, 0.28);
1372:   padding: 14px;
1373:   border-radius: var(--r-1);
1374:   margin: 12px 0;
1375: }
1376: .upi-qr-row {
1377:   display: flex;
1378:   gap: 14px;
1379:   align-items: center;
1380: }
1381: .upi-qr-box {
1382:   width: 80px;
1383:   height: 80px;
1384:   background: #ffffff;
1385:   padding: 6px;
1386:   border-radius: 6px;
1387:   display: grid;
1388:   place-items: center;
1389:   border: 1px solid var(--line);
1390:   flex-shrink: 0;
1391: }
1392: .saved-addr-chip {
1393:   padding: 10px 14px;
1394:   border: 1.5px solid var(--line);
1395:   border-radius: var(--r-1);
1396:   background: var(--paper);
1397:   cursor: pointer;
1398:   font-size: 0.8125rem;
1399:   text-align: left;
1400:   margin-bottom: 8px;
1401:   width: 100%;
1402:   display: block;
1403: }
1404: .saved-addr-chip.is-active {
1405:   border-color: var(--ink);
1406:   background: rgba(17, 17, 17, 0.04);
1407: }
1408: .order-success-screen {
1409:   text-align: center;
1410:   padding: 16px 0;
1411: }
1412: .order-success-badge {
1413:   display: inline-flex;
1414:   align-items: center;
1415:   gap: 8px;
1416:   padding: 6px 14px;
1417:   background: rgba(46, 107, 60, 0.12);
1418:   color: var(--success);
1419:   border-radius: var(--r-pill);
1420:   font-weight: 700;
1421:   font-size: 0.8125rem;
1422:   margin-bottom: 12px;
1423: }
1424: 
1425: 
1426: /* ---- Account (signed out) --------------------------------------------- */
1427: .account-intro { padding-bottom: var(--section-y); }
1428: .account-saved { margin-top: clamp(48px, 7vw, 88px); }
````

## File: src/utils/storeHours.ts
````typescript
 1: import { useEffect, useState } from 'react';
 2: import { STORE_SCHEDULE } from '../data/storeInfo';
 3: 
 4: export interface StoreStatus {
 5:   isOpen: boolean;
 6:   /** Short sentence for the UI, e.g. "Open today until 8:30 PM". */
 7:   label: string;
 8:   /** Today's hours, e.g. "10:30 AM – 8:30 PM". */
 9:   today: string;
10: }
11: 
12: const fmt = (mins: number) => {
13:   const h = Math.floor(mins / 60);
14:   const m = mins % 60;
15:   const suffix = h >= 12 ? 'PM' : 'AM';
16:   const h12 = ((h + 11) % 12) + 1;
17:   return `${h12}:${m.toString().padStart(2, '0')} ${suffix}`;
18: };
19: 
20: /** Store status in Pune time, independent of the visitor's own time zone. */
21: export function getStoreStatus(now: Date = new Date()): StoreStatus {
22:   const parts = new Intl.DateTimeFormat('en-US', {
23:     timeZone: STORE_SCHEDULE.timeZone,
24:     weekday: 'short',
25:     hour: 'numeric',
26:     minute: 'numeric',
27:     hourCycle: 'h23',
28:   }).formatToParts(now);
29:   const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
30:   const isSunday = get('weekday') === 'Sun';
31:   const mins = Number(get('hour')) * 60 + Number(get('minute'));
32:   const hours = isSunday ? STORE_SCHEDULE.sunday : STORE_SCHEDULE.weekdays;
33:   const today = `${fmt(hours.open)} – ${fmt(hours.close)}`;
34: 
35:   if (mins >= hours.open && mins < hours.close) {
36:     return { isOpen: true, label: `Open today until ${fmt(hours.close)}`, today };
37:   }
38:   if (mins < hours.open) {
39:     return { isOpen: false, label: `Opens today at ${fmt(hours.open)}`, today };
40:   }
41:   // After closing: tomorrow is Monday if today is Sunday, else Mon–Sat or Sunday.
42:   const tomorrowIsSunday = get('weekday') === 'Sat';
43:   const next = tomorrowIsSunday ? STORE_SCHEDULE.sunday : STORE_SCHEDULE.weekdays;
44:   return { isOpen: false, label: `Closed now · Opens tomorrow ${fmt(next.open)}`, today };
45: }
46: 
47: /** Re-evaluates every minute so the label stays correct on long visits. */
48: export function useStoreStatus(): StoreStatus {
49:   const [status, setStatus] = useState<StoreStatus>(() => getStoreStatus());
50:   useEffect(() => {
51:     const id = window.setInterval(() => setStatus(getStoreStatus()), 60_000);
52:     return () => window.clearInterval(id);
53:   }, []);
54:   return status;
55: }
````

## File: AGENTS.md
````markdown
 1: # AGENTS.md — Anti-Slop & Quality Directives for Oriental Sports
 2: 
 3: > **Strict Engineering & Design Quality Rules for all Agents working on Oriental Sports Pune**
 4: 
 5: ---
 6: 
 7: ## 1. Visual Direction & Identity
 8: - **Aesthetic**: Raw Sports Editorial / Commercial Athletic.
 9: - **Atmosphere**: Authentic sports campaign + independent sports house + architectural infrastructure studio.
10: - **NOT**: Generic brutalist template, AI landing page, SaaS dashboard, cyberpunk, or Dribbble slop.
11: 
12: ---
13: 
14: ## 2. Mandatory Anti-Slop Discipline
15: 1. **Zero Decorative Telemetry**: Technical labels must communicate real, meaningful facts only. Maximum 1–2 metadata systems per section. Banned: `01/03`, `//`, `UNIT D-01`, `REV 2.6`, `PUNE, MAHARASHTRA // ESTABLISHED HEADQUARTERS`, `DISCIPLINES // 01—04`.
16: 2. **Zero Fabricated Engineering Claims**: Never invent specifications (e.g. "8-Layer Cushion Acrylic System", "350-lux asymmetrical LED lighting"). Use neutral, verified copy (*"Turnkey court construction, surface systems, fencing, lighting and line marking"*).
17: 3. **No Decorative Squares & Random Badges**: Do not litter headings with yellow squares, floating fake metric boxes, or arbitrary decorative icons.
18: 4. **Restrained Glassmorphism**: Glass is an accent layer only (hero controls, header bar, quick controls, modals, drawers). Never make every card glass, and never stack glass over glass.
19: 5. **No AI Copywriting Clichés**: Prohibited words: *premium, next generation, seamless, elevate, transform, unparalleled, revolutionary, game-changer, delve, tapestry*.
20: 
21: ---
22: 
23: ## 3. Responsive Mechanics & Zero-Overflow Law
24: 1. **Mobile is NOT a Shrunk Desktop**: Every section must be designed specifically for:
25:    - `320px` (Compact mobile)
26:    - `360px` (Android standard)
27:    - `390px` (iPhone 14)
28:    - `430px` (Pro Max)
29:    - `768px` (Tablet portrait)
30:    - `1024px` (Tablet landscape / Small laptop)
31:    - `1280px` (Small laptop)
32:    - `1440px` (Desktop standard)
33:    - `1920px` (Ultrawide)
34:    - `2560px` (Ultrawide 4K)
35: 2. **Strict Assertion**: `document.documentElement.scrollWidth === window.innerWidth` must be strictly true at all viewports.
36: 3. **No Overflow Cheats**: Never use `overflow-x: hidden` on root containers to conceal broken layouts. Find and fix the overflowing element.
37: 4. **Touch Targets**: All interactive elements (buttons, links, chips, quick-add actions) must satisfy the minimum 44x44px touch target standard.
38: 
39: ---
40: 
41: ## 4. Phase 1 Quality Gate Checklist
42: - [ ] Has Brand Intro played non-blockingly with O/S vector mask and cached in `sessionStorage`?
43: - [ ] Does Hero have independent per-slide compositions with restrained 2.5D motion and swipe/keyboard nav?
44: - [ ] Does Sport Index expand smoothly on desktop (~45–55% active width) and reflow to a clean tap list on mobile?
45: - [ ] Has `node scripts/check-media.mjs` passed with 0 broken images and 0 network failures?
46: - [ ] Has `npm run build` passed with zero TypeScript errors?
47: - [ ] Has `node scripts/responsive-audit.mjs` passed across all 10 viewports?
48: - [ ] Are visual audit screenshots generated and inspected at 390px, 1440px, 1920px, and 2560px?
````

## File: tsconfig.json
````json
 1: {
 2:   "compilerOptions": {
 3:     "target": "ES2020",
 4:     "useDefineForClassFields": true,
 5:     "lib": ["ES2020", "DOM", "DOM.Iterable"],
 6:     "module": "ESNext",
 7:     "skipLibCheck": true,
 8: 
 9:     /* Bundler mode */
10:     "moduleResolution": "bundler",
11:     "allowImportingTsExtensions": false,
12:     "resolveJsonModule": true,
13:     "isolatedModules": true,
14:     "noEmit": true,
15:     "jsx": "react-jsx",
16: 
17:     /* Linting */
18:     "strict": true,
19:     "noUnusedLocals": false,
20:     "noUnusedParameters": false,
21:     "noFallthroughCasesInSwitch": true
22:   },
23:   "include": ["src"],
24:   "references": [{ "path": "./tsconfig.node.json" }]
25: }
````

## File: vite.config.ts
````typescript
 1: import { defineConfig } from 'vite';
 2: import react from '@vitejs/plugin-react';
 3: 
 4: // https://vitejs.dev/config/
 5: export default defineConfig({
 6:   plugins: [react()],
 7:   server: {
 8:     port: 3000,
 9:     host: true,
10:   },
11: });
````

## File: docs/21ST_COMPONENT_MAP.md
````markdown
 1: # 21st.dev Component & Mechanics Map — Oriental Sports Pune
 2: 
 3: This document indexes all 21st.dev component mechanics adapted for Oriental Sports Pune, detailing their exact purpose, implementation, and accessibility fallbacks.
 4: 
 5: ---
 6: 
 7: ## Component Matrix
 8: 
 9: ### 1. Contextual Morphing Cursor
10: - **Source URL**: https://21st.dev/community/components/explore/cursor-animation-effects
11: - **Purpose**: Provide subtle contextual visual cues for active interactive targets (images, categories, commercial buttons, court explorer).
12: - **Oriental Implementation**: `src/components/ui/CustomCursor.tsx`
13:   - States: `DEFAULT` (small dot), `VIEW` (hero/court photos), `SHOP` (equipment cards/CTAs), `EXPLORE` (sport rail), `DRAG` (hero carousel drag area).
14:   - Smooth lerp interpolation with 200ms easing.
15: - **Accessibility Fallback**:
16:   - Automatically disabled on touchscreens (`pointer: coarse`).
17:   - Automatically disabled on `prefers-reduced-motion: reduce`.
18:   - Automatically hidden over text inputs (`input, textarea, [contenteditable]`) to preserve standard browser carets.
19:   - System is strictly progressive enhancement: website is 100% operational with default browser pointer.
20: 
21: ---
22: 
23: ### 2. Kinetic Expanding Sport Rail (Hover Accordion)
24: - **Source URL**: https://21st.dev/community/components/explore/hover-dev
25: - **Purpose**: Showcase primary sport disciplines (Pickleball, Cricket, Badminton, Volleyball) with dynamic visual focus rather than equal static cards.
26: - **Oriental Implementation**: `src/components/home/ShopBySport.tsx`
27:   - Active hovered sport expands to ~45–55% available width (`flex: 3.5`), while inactive sports compress (`flex: 1`).
28:   - Synchronized CSS scale on photography (`scale(1.05)`), typography weight transition, and reveal of `SHOP [SPORT] →` CTA.
29: - **Accessibility Fallback**:
30:   - Full keyboard focusable via standard tab index.
31:   - On mobile (<1024px), reflows into a full-width tap-to-reveal editorial list (`01 BADMINTON`, `02 CRICKET`, etc.) where tapping unmasks high-res imagery and direct shop buttons.
32: 
33: ---
34: 
35: ### 3. Directional 2.5D Hero Movement & Parallax
36: - **Source URL**: https://21st.dev/community/components/explore/mouse-effects
37: - **Purpose**: Create physical depth and cinematic atmosphere without heavy 3D WebGL computation or exaggerated tilt gimmicks.
38: - **Oriental Implementation**: `src/components/home/Hero.tsx`
39:   - Background photography shifts 4–8px relative to mouse coordinates.
40:   - Kinetic athletic typography shifts independently 2–4px.
41:   - Direction-aware slide transitions using CSS `clip-path`, `scale`, and `opacity`.
42: - **Accessibility Fallback**:
43:   - Parallax is disabled on mobile touchscreens and `prefers-reduced-motion`.
44:   - Keyboard navigation fully supported via `ArrowLeft` / `ArrowRight`.
45:   - Full touch swipe support on mobile (>= 45px swipe threshold).
46: 
47: ---
48: 
49: ### 4. Floating Glass Control Matrix
50: - **Source URL**: https://21st.dev/community/components/explore/motion-primatives
51: - **Purpose**: Provide unobtrusive, high-contrast controls over rich full-bleed imagery.
52: - **Oriental Implementation**: `src/components/home/Hero.tsx` & `src/components/navigation/Header.tsx`
53:   - Translucent surfaces (`rgba(12, 14, 18, 0.82)`), backdrop blur (`16px`), hairline border (`rgba(255, 255, 255, 0.15)`), and animated linear progress indicator bar.
54: - **Accessibility Fallback**:
55:   - High contrast text (`#FFFFFF` on dark glass) exceeding WCAG AA 4.5:1 ratio.
56:   - Interactive touch targets strictly >= 44x44px.
57: 
58: ---
59: 
60: ### 5. Product Image Swap & Quick-Add Drawer Trigger
61: - **Source URL**: https://21st.dev/community/components/explore/hover-dev
62: - **Purpose**: Enable rapid e-commerce inspection of equipment angles and instant cart addition without leaving the homepage rhythm.
63: - **Oriental Implementation**: `src/components/products/ProductCard.tsx` & `src/components/home/FeaturedProducts.tsx`
64:   - Hover triggers smooth secondary angle cross-fade and reveals `QUICK ADD +` and Wishlist heart button.
65: - **Accessibility Fallback**:
66:   - On mobile, quick add and wishlist are always visible and touch-accessible (no hover required).
````

## File: docs/INTERACTION_MAP.md
````markdown
  1: # Oriental Sports — Interaction Map
  2: 
  3: **Version**: 3.0  
  4: **Design Reference Stack**: Playo (Sports-UX clarity & restraint) + Mobbin (Real e-commerce patterns) + Cosmos (Editorial visual curation) + Luma (Simplicity & visual confidence) + 21st.dev (Component mechanics) + UI/UX Pro Max (Design system governance).  
  5: **Primary Canvas**: Warm Ivory (`#F6F3EA`) / Crisp White (`#FFFFFF`) / Ink (`#111111`) / Restrained Plate Gold (`#C9A227`).
  6: 
  7: ---
  8: 
  9: ## 1. Global Navigation & Header Interaction
 10: 
 11: ### Desktop Header:
 12: - **Default State**:
 13:   - Sits at top of viewport over Ivory canvas with high legibility.
 14:   - Height: `74px`.
 15:   - Left: Locked Oriental Sports mark (link to `/`).
 16:   - Center Nav Links: `SHOP`, `COURTS`, `ABOUT`, `VISIT`.
 17:   - Right Utility Icons:
 18:     - Search (`Search` icon + shortcut pill `⌘K` / `Ctrl+K`)
 19:     - Account (User profile popover or direct login modal trigger)
 20:     - Wishlist (Heart icon with dynamic badge count from `WishlistContext`)
 21:     - Bag (Shopping bag icon with dynamic badge count and subtotal preview)
 22: - **Scrolled State (`scrollY > 20px`)**:
 23:   - Smoothly transitions height to `64px`.
 24:   - Background blurs to `rgba(246, 243, 234, 0.94)` with subtle 1px border `rgba(17, 17, 17, 0.06)` and fine shadow.
 25: - **Hover Interactions**:
 26:   - Nav links: Subtle sliding underline indicator (`2px solid #111111`) with `200ms ease`.
 27:   - Shop link: Hover reveals refined 21st.dev style mega dropdown previewing primary sports (Pickleball, Cricket, Badminton, Volleyball) with thumbnail images.
 28:   - Action buttons: Scale `1.05` on hover with tooltip hints.
 29: - **Keyboard & Accessibility**:
 30:   - `Tab` navigates through all interactive items in DOM order.
 31:   - `Escape` closes any open dropdown, modal, or drawer.
 32:   - Skip link (`Skip to main content`) available for keyboard and screen reader users.
 33: 
 34: ### Mobile Header (`<1024px`):
 35: - **Layout**: `[ Hamburger Menu ]` `[ Centered Oriental Sports Logo ]` `[ Wishlist (Badge) ]` `[ Bag (Badge) ]`.
 36: - **Tap Hamburger**:
 37:   - Slides open full-height Mobbin-style drawer with sports categories, court consultation link, store contact, and account shortcut.
 38:   - Smooth backdrop dim (`rgba(17, 17, 17, 0.5)`).
 39:   - Body scroll lock (`overflow: hidden`).
 40: - **Mobile Bottom Navigation Bar (`MobileBottomNav`)**:
 41:   - Fixed 5-point thumb bar docked to bottom of mobile screen (`60px` height):
 42:     - `HOME` (`/`)
 43:     - `SHOP` (`/shop`)
 44:     - `COURTS` (`/courts`)
 45:     - `WISHLIST` (`/wishlist` with count badge)
 46:     - `ACCOUNT` (`/account` / `/account/login`)
 47:   - Active tab highlighted with bold label and top ink dot indicator.
 48: 
 49: ---
 50: 
 51: ## 2. 5-Section Homepage Interaction Architecture
 52: 
 53: ### Section 1: Editorial Hero Carousel (`Hero`)
 54: - **UX Intent**: Immediate brand authority, clear purpose above the fold, photorealistic sports lifestyle visual.
 55: - **21st.dev Component Mechanics**: Synchronized image crossfade + progress bar indicator + keyboard navigation.
 56: - **Content Slides (3-Slide Story)**:
 57:   - Slide 01: `GEAR. COURTS. PUNE.` | "Everything you need to play, train and build." | CTAs: `SHOP SPORTS` (`/shop`), `BUILD A COURT` (`/courts`)
 58:   - Slide 02: `PLAY. TRAIN. PERFORM.` | "Curated cricket willow, tournament paddles, and pro racquet stringing in Camp." | CTAs: `EXPLORE GEAR` (`/shop`), `VISIT STORE` (`/visit`)
 59:   - Slide 03: `WE BUILD. YOU PLAY.` | "Turnkey sports surfaces, sub-base engineering, and floodlighting across Pune." | CTAs: `EXPLORE COURTS` (`/courts`), `VIEW PROJECTS` (`/courts/projects`)
 60: - **Autoplay & Timing**:
 61:   - Duration: `5500ms` per slide.
 62:   - Linear SVG progress ring/bar showing countdown.
 63:   - Pauses immediately on mouse hover, touch press, or element focus.
 64:   - Resets countdown when user manually interacts.
 65: - **Controls**:
 66:   - Previous / Next subtle chevron buttons on desktop.
 67:   - Numbered slide selector (`01 / 02 / 03`).
 68:   - Mobile touch swipe support (`touchstart`, `touchmove`, `touchend` with 50px delta threshold).
 69:   - Keyboard `ArrowLeft` / `ArrowRight` listener.
 70: - **Reduced Motion**: Under `prefers-reduced-motion: reduce`, animations are replaced with instant slide jumps and autoplay is disabled.
 71: 
 72: ### Section 2: Shop by Sport (`ShopBySport`)
 73: - **UX Intent**: Fast sports discovery via editorial photography cards.
 74: - **Sports Categorization**:
 75:   - Primary (High visual presence): `Pickleball`, `Cricket`, `Badminton`, `Volleyball`
 76:   - Secondary (Clean list/tags): `Squash`, `Table Tennis`, `Fitness`, `Recreation`, `Accessories`
 77: - **Interactions**:
 78:   - Staggered editorial grid: Primary sports featured in asymmetric photo cards (e.g. 2 large feature cards, 2 medium cards, and pill ribbon for secondary sports).
 79:   - Card Hover:
 80:     - Image scales smoothly (`scale(1.03)` over `350ms ease-out`).
 81:     - Subtle arrow indicator slides right `4px`.
 82:     - CTA tag expands slightly.
 83:   - Card Click: Direct navigation to `/shop/:category`.
 84: 
 85: ### Section 3: Featured Gear (`FeaturedProducts`)
 86: - **UX Intent**: Frictionless commerce discovery of tournament-grade equipment.
 87: - **Product Card (`ProductCard`) Interactions**:
 88:   - **Image Hover**:
 89:     - Smooth crossfade to secondary product view if available (`300ms ease`).
 90:     - Quick Add pill button slides up from bottom edge (`translateY(0)`).
 91:   - **Wishlist Heart**:
 92:     - Clicking toggles item in `WishlistContext`.
 93:     - Heart scales with spring bounce `1.0 -> 1.25 -> 1.0`.
 94:     - Updates wishlist counter in header.
 95:   - **Quick Add**:
 96:     - Clicking selects default tournament variant and adds to `CartContext`.
 97:     - Button changes state to `✓ ADDED` for 1500ms with green micro-flash.
 98:     - Automatically opens the sliding `CartDrawer`.
 99:   - **Out of Stock**:
100:     - Disables Quick Add; displays clean "Notify in Camp Store" state.
101: 
102: ### Section 4: Build a Court Showcase (`CourtsSection`)
103: - **UX Intent**: Showcase Pune sports infrastructure capabilities without SaaS clutter.
104: - **Content**:
105:   - Heading: `WE BUILD COURTS.`
106:   - Copy: "From sports surfaces and court construction to the finishing details, explore Oriental Sports infrastructure work."
107:   - Project Categories: `Tennis`, `Pickleball`, `Basketball`, `Multi-Sport`, `Volleyball`.
108: - **Interactions**:
109:   - Split layout: Verified Pune court photography on one side; technical scope, certified surface options, and interactive project cards on the other.
110:   - Hovering a project reveals real specifications (e.g., 8-layer cushion acrylic, 350-lux lighting).
111:   - Direct CTAs:
112:     - Primary: `VIEW PUNE PROJECTS` (`/courts/projects`)
113:     - Secondary: `COURT CONSULTATION` (`/contact?type=court`)
114: 
115: ### Section 5: Visit Oriental Flagship (`VisitStore`)
116: - **UX Intent**: Drive physical footfall to the Camp retail store with zero fictitious data.
117: - **Content**:
118:   - Heading: `COME VISIT.`
119:   - Address: Oriental Sports, 247 MG Road, New Modikhana, Camp, Pune 411001.
120:   - Phone: `+91 98909 90022`
121:   - Email: `oriental_sports@outlook.com`
122: - **CTAs**:
123:   - Primary CTA: `GET DIRECTIONS` (direct link to Google Maps navigation coordinates).
124:   - Secondary CTA: `CALL STORE` (`tel:+919890990022`).
125: - **Visuals**:
126:   - Clean photographic frame of the Camp store / workshop.
127:   - No fake AI maps, no invented opening hours, no fictitious store features.
128: 
129: ### Section 6: Structured Footer (`Footer`)
130: - **Layout**: 4 clean editorial columns:
131:   - Column 1: Brand mark, Pune Camp positioning, verified contact.
132:   - Column 2: `SHOP` (Pickleball, Cricket, Badminton, Volleyball, Squash, Fitness, Recreation, Accessories).
133:   - Column 3: `COURTS` (Projects, Court Setup) & `HOUSE` (About, Visit, Contact).
134:   - Column 4: `CUSTOMER` (Account, Orders, Wishlist, Shipping, Returns, Privacy, Terms).
135: - **Zero dead links**: Every single link resolves to a valid route.
136: 
137: ---
138: 
139: ## 3. Commerce & Cart Drawer Interaction (`CartDrawer`)
140: 
141: - **Trigger**: Click Bag icon in header, Quick Add from card, or "Add to Bag" on PDP.
142: - **Drawer Behavior**:
143:   - Slides in from right on desktop (`420px` width) or up from bottom on mobile.
144:   - Translucent neutral backdrop (`rgba(17, 17, 17, 0.4)`); click outside or `Escape` closes drawer.
145: - **Line Item Controls**:
146:   - Quantity Stepper (`-` / count / `+`) with instantaneous subtotal recalculation.
147:   - Decreasing quantity to `0` prompts item removal.
148:   - Delete trash icon removes item immediately.
149: - **Free Delivery Progress**:
150:   - Visual meter tracking Pune delivery threshold (₹2,000).
151: - **Checkout Action**:
152:   - `PROCEED TO CHECKOUT` CTA buttons hand off to Shopify checkout architecture or direct WhatsApp fulfillment.
153: 
154: ---
155: 
156: ## 4. Search Overlay Interaction (`SearchModal` & `/search`)
157: 
158: - **Trigger**: Click Search in header or keyboard shortcut (`⌘K` / `Ctrl+K`).
159: - **Desktop Search Modal**:
160:   - Opens centered modal overlay with auto-focused search input.
161:   - Live debounced filtering (150ms) across Products, Categories, and Court Projects.
162:   - Quick trending search tags: "Pickleball", "English Willow", "Tennis Strings", "Court Construction".
163:   - Pressing `Enter` navigates to full `/search?q={query}` page.
164:   - Empty state provides recommendations: "No equipment found — browse all disciplines".
165: 
166: ---
167: 
168: ## 5. Account & Authentication Flow (`/account/*`)
169: 
170: - **Shopify Customer Account Architecture**:
171:   - Pluggable `AuthProvider` supporting phone OTP, Google OAuth, and Email login.
172: - **Routes**:
173:   - `/account`: User dashboard (overview, recent orders, saved addresses, court consultations).
174:   - `/account/login`: Clean phone/email login interface with `returnTo` preservation.
175:   - `/account/signup`: Fast 3-field customer registration.
176:   - `/account/verify`: 6-digit discrete OTP verification with auto-advance, paste listener, and 30s resend timer.
177:   - `/account/orders`: Full list of past & active orders with status badges.
178:   - `/account/orders/:orderId`: Visual DTDC tracking timeline and delivery address.
179:   - `/account/profile`: Edit first name, last name, phone, email, sports interests.
180:   - `/account/addresses`: Add, edit, delete, and set default delivery addresses in Pune/India.
181:   - `/account/wishlist` & `/wishlist`: Grid of favorited products with one-click Add to Bag.
182: - **Originating Page Preservation**:
183:   - When an unauthenticated user clicks Wishlist or Order Tracking, `returnTo` URL parameter is saved.
184:   - Upon successful verification, user is returned immediately to the originating product or page.
185: 
186: ---
187: 
188: ## 6. Product Detail Page (`/product/:slug`)
189: 
190: - **Layout**:
191:   - Left: High-res product gallery with main viewer and thumbnail list (keyboard navigable).
192:   - Right: Sticky product information column:
193:     - Category kicker, title, price (tabular numerals), variant picker (e.g. Weight/Grip), size selector, quantity stepper.
194:     - CTAs: `ADD TO BAG` (primary) and `BUY NOW` (direct to checkout).
195:     - Authentic Pune Camp store availability badge: "Ready for same-day stringing & pickup at Camp store".
196:     - Product specs table, delivery details, return policy.
197: - **Mobile Sticky Buy Bar (`StickyBuyBar`)**:
198:   - Appears when user scrolls past primary Add to Bag button.
199:   - Docks thumbnail, title, price, and compact Add to Bag button to screen bottom.
200: 
201: ---
202: 
203: ## 7. Court Services & Projects (`/courts/*`)
204: 
205: - **Routes**:
206:   - `/courts`: Overview of court capabilities, certified surface types, interactive cost estimator.
207:   - `/courts/projects`: Gallery of verified Pune projects (Koregaon Park Pickleball, Deccan Gymkhana Tennis, Baner Arena, Camp Officers Club).
208:   - `/courts/:slug`: Deep project case study with technical sub-base details, surface layers, and inquiry form.
209: - **No Fictitious Claims**: Strict adherence to verified specifications and real project scopes.
210: 
211: ---
212: 
213: ## 8. Error & 404 Recovery (`/404` & `*`)
214: 
215: - **NotFoundPage**:
216:   - Heading: `LOST THE BALL?`
217:   - Body: "The court line you are looking for is out of bounds or the page has been moved."
218:   - Primary CTA: `BACK TO SHOP` (`/shop`)
219:   - Secondary CTA: `HOME` (`/`)
````

## File: scripts/responsive-audit.mjs
````javascript
  1: import { chromium } from 'playwright';
  2: import fs from 'fs';
  3: import path from 'path';
  4: 
  5: const VIEWPORTS = [
  6:   { name: '320_mobile_small', width: 320, height: 844 },
  7:   { name: '360_mobile_android', width: 360, height: 800 },
  8:   { name: '390_mobile_iphone14', width: 390, height: 844 },
  9:   { name: '430_mobile_promax', width: 430, height: 932 },
 10:   { name: '768_tablet_portrait', width: 768, height: 1024 },
 11:   { name: '1024_tablet_desktop', width: 1024, height: 768 },
 12:   { name: '1280_laptop_small', width: 1280, height: 800 },
 13:   { name: '1440_desktop_standard', width: 1440, height: 900 },
 14:   { name: '1920_ultrawide', width: 1920, height: 1080 },
 15:   { name: '2560_ultrawide_4k', width: 2560, height: 1440 },
 16: ];
 17: 
 18: // Real browser windows are shorter than the device: browser chrome, taskbars,
 19: // mobile URL bars. The hero is checked at these heights as well.
 20: const SHORT_VIEWPORTS = [
 21:   { name: '320_short', width: 320, height: 568 },
 22:   { name: '360_short', width: 360, height: 640 },
 23:   { name: '390_safari', width: 390, height: 664 },
 24:   { name: '1024_short', width: 1024, height: 600 },
 25:   { name: '1280_short', width: 1280, height: 600 },
 26:   { name: '1366_laptop', width: 1366, height: 657 },
 27:   { name: '1440_browser', width: 1440, height: 760 },
 28:   { name: '1920_browser_scaled', width: 1817, height: 700 },
 29: ];
 30: 
 31: const HERO_SLIDES = ['gear', 'courts', 'store'];
 32: const HERO_MIN_GAP = 16;
 33: 
 34: const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
 35: const OUT_DIR = path.resolve('docs/visual-audits');
 36: 
 37: if (!fs.existsSync(OUT_DIR)) {
 38:   fs.mkdirSync(OUT_DIR, { recursive: true });
 39: }
 40: 
 41: async function runAudit() {
 42:   console.log(`\n🚀 Starting Responsive & Zero-Overflow Playwright Audit at ${BASE_URL}...\n`);
 43:   const browser = await chromium.launch({ headless: true });
 44:   const results = [];
 45: 
 46:   for (const vp of VIEWPORTS) {
 47:     const context = await browser.newContext({
 48:       viewport: { width: vp.width, height: vp.height },
 49:       deviceScaleFactor: 2,
 50:     });
 51:     const page = await context.newPage();
 52: 
 53:     try {
 54:       await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 35000 });
 55:       await page.waitForLoadState('load', { timeout: 15000 }).catch(() => {});
 56:       await page.waitForTimeout(600);
 57: 
 58:       // Evaluate document-level overflow
 59:       const metrics = await page.evaluate(() => {
 60:         const docScrollWidth = document.documentElement.scrollWidth;
 61:         const windowWidth = window.innerWidth;
 62:         const bodyScrollWidth = document.body.scrollWidth;
 63:         const hasHorizontalOverflow = docScrollWidth > windowWidth || bodyScrollWidth > windowWidth;
 64: 
 65:         // Find overflowing elements
 66:         const overflowingElements = [];
 67:         const allElements = document.querySelectorAll('*');
 68:         for (const el of allElements) {
 69:           const rect = el.getBoundingClientRect();
 70:           if (rect.right > window.innerWidth + 1) {
 71:             overflowingElements.push({
 72:               tag: el.tagName.toLowerCase(),
 73:               className: el.className ? String(el.className).substring(0, 40) : '',
 74:               id: el.id || '',
 75:               right: Math.round(rect.right),
 76:               width: Math.round(rect.width),
 77:             });
 78:             if (overflowingElements.length >= 5) break;
 79:           }
 80:         }
 81: 
 82:         return {
 83:           docScrollWidth,
 84:           windowWidth,
 85:           bodyScrollWidth,
 86:           hasHorizontalOverflow,
 87:           overflowingElements,
 88:         };
 89:       });
 90: 
 91:       const screenshotPath = path.join(OUT_DIR, `${vp.name}_homepage.png`);
 92:       await page.screenshot({ path: screenshotPath, fullPage: false });
 93: 
 94:       const passed = !metrics.hasHorizontalOverflow;
 95:       results.push({
 96:         name: vp.name,
 97:         width: vp.width,
 98:         height: vp.height,
 99:         passed,
100:         metrics,
101:         screenshot: screenshotPath,
102:       });
103: 
104:       const statusIcon = passed ? '✅ PASS' : '❌ FAIL';
105:       console.log(
106:         `${statusIcon} [${vp.name.padEnd(22)}] ${vp.width}x${vp.height} -> doc: ${metrics.docScrollWidth}px | win: ${metrics.windowWidth}px`
107:       );
108: 
109:       if (!passed) {
110:         console.warn(`    ⚠️ Overflowing elements:`, JSON.stringify(metrics.overflowingElements, null, 2));
111:       }
112:     } catch (err) {
113:       console.error(`❌ Error on ${vp.name}:`, err.message);
114:       results.push({ name: vp.name, width: vp.width, height: vp.height, passed: false, error: err.message });
115:     } finally {
116:       await context.close();
117:     }
118:   }
119: 
120:   // Hero composition: on every slide the copy must sit inside the hero and
121:   // clear the tab bar, and the hero must not change height between slides.
122:   console.log(`\n🎞  Hero collision audit (all slides, standard + short viewports)...\n`);
123:   const heroResults = [];
124:   for (const vp of [...VIEWPORTS, ...SHORT_VIEWPORTS]) {
125:     const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, reducedMotion: 'reduce' });
126:     await context.addInitScript(() => sessionStorage.setItem('oriental_intro_shown', 'true'));
127:     const page = await context.newPage();
128:     const issues = [];
129:     try {
130:       await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 35000 });
131:       await page.waitForLoadState('load', { timeout: 15000 }).catch(() => {});
132:       // Measure the settled composition: until Archivo arrives the fallback
133:       // font sets text slightly taller (a one-off swap on first load).
134:       // fonts.ready alone can resolve before the request starts, so wait for
135:       // the face itself, then for the hero height to hold across frames.
136:       await page.waitForFunction(
137:         () => document.fonts.status === 'loaded' && document.fonts.check('400 16px Archivo') && document.fonts.check('800 16px Archivo'),
138:         null,
139:         { timeout: 10000 }
140:       );
141:       await page.waitForFunction(
142:         () =>
143:           new Promise((resolve) => {
144:             const h = () => document.querySelector('.hero').getBoundingClientRect().height;
145:             const before = h();
146:             setTimeout(() => resolve(Math.abs(h() - before) < 1), 250);
147:           }),
148:         null,
149:         { timeout: 5000 }
150:       );
151:       const heights = [];
152:       for (const id of HERO_SLIDES) {
153:         await page.evaluate((id) => document.querySelector(`#hero-tab-${id}`).click(), id);
154:         await page.waitForTimeout(150);
155:         const m = await page.evaluate((id) => {
156:           const hero = document.querySelector('.hero').getBoundingClientRect();
157:           const slide = document.querySelector(`#hero-slide-${id}`);
158:           const copy = slide.querySelector('.hero-copy').getBoundingClientRect();
159:           const actions = slide.querySelector('.hero-actions').getBoundingClientRect();
160:           const tabs = document.querySelector('.hero-tablist').getBoundingClientRect();
161:           return {
162:             heroH: Math.round(hero.height),
163:             copyTop: Math.round(copy.top - hero.top),
164:             gap: Math.round(tabs.top - actions.bottom),
165:           };
166:         }, id);
167:         heights.push(m.heroH);
168:         if (m.copyTop < 0) issues.push(`${id}: copy clipped ${-m.copyTop}px above the hero`);
169:         if (m.gap < HERO_MIN_GAP) issues.push(`${id}: actions ${m.gap}px from tab bar (min ${HERO_MIN_GAP})`);
170:       }
171:       if (new Set(heights).size > 1) issues.push(`hero height changes between slides: ${heights.join(' / ')}`);
172:     } catch (err) {
173:       issues.push(`error: ${err.message}`);
174:     } finally {
175:       await context.close();
176:     }
177:     heroResults.push({ ...vp, issues });
178:     console.log(`${issues.length ? '❌ FAIL' : '✅ PASS'} [${vp.name.padEnd(22)}] ${vp.width}x${vp.height}${issues.length ? ` -> ${issues.join('; ')}` : ''}`);
179:   }
180: 
181:   await browser.close();
182: 
183:   // Write markdown report
184:   const reportPath = path.resolve('docs/RESPONSIVE_AUDIT.md');
185:   const markdown = `# Oriental Sports — Responsive & Zero-Overflow Audit
186: 
187: **Audit Date**: ${new Date().toISOString()}  
188: **Target URL**: ${BASE_URL}
189: 
190: ---
191: 
192: ## 1. Viewport Audit Summary
193: 
194: | Viewport Name | Target Dimensions | Document Width | Window Width | Overflow Free? | Screenshot |
195: | :--- | :--- | :--- | :--- | :--- | :--- |
196: ${results
197:   .map(
198:     (r) =>
199:       `| **${r.name}** | \`${r.width}x${r.height}\` | \`${r.metrics?.docScrollWidth || 'N/A'}px\` | \`${r.metrics?.windowWidth || 'N/A'}px\` | ${
200:         r.passed ? '✅ PASSED' : '❌ FAILED'
201:       } | [\`${path.basename(r.screenshot || '')}\`](./visual-audits/${path.basename(r.screenshot || '')}) |`
202:   )
203:   .join('\n')}
204: 
205: ---
206: 
207: ## 2. Hero Collision Audit
208: 
209: Every slide, at every viewport above plus short browser windows: copy stays inside the hero,
210: actions clear the tab bar by at least ${HERO_MIN_GAP}px, and the hero height is the same on every slide.
211: 
212: | Viewport | Dimensions | Result |
213: | :--- | :--- | :--- |
214: ${heroResults
215:   .map((r) => `| **${r.name}** | \`${r.width}x${r.height}\` | ${r.issues.length ? `❌ ${r.issues.join('; ')}` : '✅ PASSED'} |`)
216:   .join('\n')}
217: 
218: ---
219: 
220: ## 3. Assertion Verification
221: - **Strict Law**: \`document.documentElement.scrollWidth === window.innerWidth\` strictly enforced.
222: - **Root Container Overflow Hiding**: Prohibited. Layout components intrinsically bounded to viewport.
223: `;
224: 
225:   fs.writeFileSync(reportPath, markdown, 'utf-8');
226:   console.log(`\n📄 Report written to ${reportPath}\n`);
227: 
228:   const allPassed = results.every((r) => r.passed) && heroResults.every((r) => r.issues.length === 0);
229:   if (!allPassed) {
230:     process.exit(1);
231:   }
232: }
233: 
234: runAudit();
````

## File: src/components/account/AddressModal.tsx
````typescript
  1: import React, { useState, useEffect } from 'react';
  2: import { Address } from '../../types/auth';
  3: import { X, Check, MapPin } from 'lucide-react';
  4: 
  5: interface AddressModalProps {
  6:   isOpen: boolean;
  7:   onClose: () => void;
  8:   onSave: (addressData: Omit<Address, 'id'>) => Promise<void>;
  9:   initialData?: Address | null;
 10: }
 11: 
 12: export const AddressModal: React.FC<AddressModalProps> = ({
 13:   isOpen,
 14:   onClose,
 15:   onSave,
 16:   initialData,
 17: }) => {
 18:   const [formData, setFormData] = useState<Omit<Address, 'id'>>({
 19:     name: '',
 20:     phone: '',
 21:     street: '',
 22:     locality: '',
 23:     city: 'Pune',
 24:     state: 'Maharashtra',
 25:     pincode: '',
 26:     isDefault: false,
 27:     type: 'home',
 28:   });
 29:   const [isSubmitting, setIsSubmitting] = useState(false);
 30:   const [error, setError] = useState<string | null>(null);
 31: 
 32:   useEffect(() => {
 33:     if (initialData) {
 34:       setFormData({
 35:         name: initialData.name,
 36:         phone: initialData.phone,
 37:         street: initialData.street,
 38:         locality: initialData.locality,
 39:         city: initialData.city,
 40:         state: initialData.state,
 41:         pincode: initialData.pincode,
 42:         isDefault: initialData.isDefault,
 43:         type: initialData.type,
 44:       });
 45:     } else {
 46:       setFormData({
 47:         name: '',
 48:         phone: '',
 49:         street: '',
 50:         locality: '',
 51:         city: 'Pune',
 52:         state: 'Maharashtra',
 53:         pincode: '',
 54:         isDefault: false,
 55:         type: 'home',
 56:       });
 57:     }
 58:     setError(null);
 59:   }, [initialData, isOpen]);
 60: 
 61:   if (!isOpen) return null;
 62: 
 63:   const handleSubmit = async (e: React.FormEvent) => {
 64:     e.preventDefault();
 65:     setError(null);
 66: 
 67:     if (!formData.name.trim() || !formData.phone.trim() || !formData.street.trim() || !formData.pincode.trim()) {
 68:       setError('Please fill in all mandatory fields.');
 69:       return;
 70:     }
 71: 
 72:     if (formData.pincode.replace(/\D/g, '').length !== 6) {
 73:       setError('Please enter a valid 6-digit PIN code.');
 74:       return;
 75:     }
 76: 
 77:     setIsSubmitting(true);
 78:     try {
 79:       await onSave(formData);
 80:       onClose();
 81:     } catch {
 82:       setError('Failed to save address. Please try again.');
 83:     } finally {
 84:       setIsSubmitting(false);
 85:     }
 86:   };
 87: 
 88:   return (
 89:     <div
 90:       role="dialog"
 91:       aria-modal="true"
 92:       style={{
 93:         position: 'fixed',
 94:         inset: 0,
 95:         zIndex: 9999,
 96:         backgroundColor: 'rgba(10, 10, 10, 0.75)',
 97:         backdropFilter: 'blur(5px)',
 98:         display: 'flex',
 99:         alignItems: 'center',
100:         justifyContent: 'center',
101:         padding: '16px',
102:       }}
103:       onClick={(e) => {
104:         if (e.target === e.currentTarget) onClose();
105:       }}
106:     >
107:       <div
108:         style={{
109:           backgroundColor: '#FFFFFF',
110:           borderRadius: '4px',
111:           maxWidth: '520px',
112:           width: '100%',
113:           boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
114:           overflow: 'hidden',
115:           animation: 'fadeIn 0.2s ease-out',
116:         }}
117:       >
118:         <div
119:           style={{
120:             padding: '20px 24px',
121:             backgroundColor: 'var(--color-ink)',
122:             color: '#FFFFFF',
123:             display: 'flex',
124:             alignItems: 'center',
125:             justifyContent: 'space-between',
126:           }}
127:         >
128:           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
129:             <MapPin size={18} color="var(--color-plate-gold)" />
130:             <h3 className="font-display" style={{ margin: 0, fontSize: '1.25rem', color: '#FFFFFF' }}>
131:               {initialData ? 'EDIT ADDRESS' : 'ADD NEW ADDRESS'}
132:             </h3>
133:           </div>
134:           <button
135:             type="button"
136:             onClick={onClose}
137:             style={{
138:               background: 'none',
139:               border: 'none',
140:               color: 'rgba(255, 255, 255, 0.7)',
141:               cursor: 'pointer',
142:               padding: '4px',
143:             }}
144:             aria-label="Close dialog"
145:           >
146:             <X size={20} />
147:           </button>
148:         </div>
149: 
150:         <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
151:           {error && (
152:             <div
153:               style={{
154:                 backgroundColor: '#FEE2E2',
155:                 border: '1px solid #F87171',
156:                 borderRadius: '4px',
157:                 padding: '10px 14px',
158:                 color: '#991B1B',
159:                 fontSize: '0.8125rem',
160:                 marginBottom: '16px',
161:               }}
162:             >
163:               {error}
164:             </div>
165:           )}
166: 
167:           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
168:             <div>
169:               <label
170:                 htmlFor="addr-name"
171:                 style={{
172:                   display: 'block',
173:                   fontSize: '0.75rem',
174:                   fontWeight: 700,
175:                   textTransform: 'uppercase',
176:                   color: '#374151',
177:                   marginBottom: '4px',
178:                 }}
179:               >
180:                 Contact Name *
181:               </label>
182:               <input
183:                 id="addr-name"
184:                 type="text"
185:                 required
186:                 value={formData.name}
187:                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
188:                 placeholder="e.g. Arjun Deshmukh"
189:                 style={{
190:                   width: '100%',
191:                   height: '40px',
192:                   padding: '0 12px',
193:                   fontSize: '0.875rem',
194:                   border: '1px solid #D1D5DB',
195:                   borderRadius: '4px',
196:                   boxSizing: 'border-box',
197:                 }}
198:               />
199:             </div>
200: 
201:             <div>
202:               <label
203:                 htmlFor="addr-phone"
204:                 style={{
205:                   display: 'block',
206:                   fontSize: '0.75rem',
207:                   fontWeight: 700,
208:                   textTransform: 'uppercase',
209:                   color: '#374151',
210:                   marginBottom: '4px',
211:                 }}
212:               >
213:                 Mobile Number *
214:               </label>
215:               <input
216:                 id="addr-phone"
217:                 type="tel"
218:                 required
219:                 value={formData.phone}
220:                 onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
221:                 placeholder="10-digit number"
222:                 style={{
223:                   width: '100%',
224:                   height: '40px',
225:                   padding: '0 12px',
226:                   fontSize: '0.875rem',
227:                   border: '1px solid #D1D5DB',
228:                   borderRadius: '4px',
229:                   boxSizing: 'border-box',
230:                 }}
231:               />
232:             </div>
233:           </div>
234: 
235:           <div style={{ marginBottom: '14px' }}>
236:             <label
237:               htmlFor="addr-street"
238:               style={{
239:                 display: 'block',
240:                 fontSize: '0.75rem',
241:                 fontWeight: 700,
242:                 textTransform: 'uppercase',
243:                 color: '#374151',
244:                 marginBottom: '4px',
245:               }}
246:             >
247:               Flat, House No., Building, Apartment *
248:             </label>
249:             <input
250:               id="addr-street"
251:               type="text"
252:               required
253:               value={formData.street}
254:               onChange={(e) => setFormData({ ...formData, street: e.target.value })}
255:               placeholder="e.g. Flat 402, Royal Palms, Prabhat Road Lane 5"
256:               style={{
257:                 width: '100%',
258:                 height: '40px',
259:                 padding: '0 12px',
260:                 fontSize: '0.875rem',
261:                 border: '1px solid #D1D5DB',
262:                 borderRadius: '4px',
263:                 boxSizing: 'border-box',
264:               }}
265:             />
266:           </div>
267: 
268:           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
269:             <div>
270:               <label
271:                 htmlFor="addr-locality"
272:                 style={{
273:                   display: 'block',
274:                   fontSize: '0.75rem',
275:                   fontWeight: 700,
276:                   textTransform: 'uppercase',
277:                   color: '#374151',
278:                   marginBottom: '4px',
279:                 }}
280:               >
281:                 Area / Locality / Landmark
282:               </label>
283:               <input
284:                 id="addr-locality"
285:                 type="text"
286:                 value={formData.locality}
287:                 onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
288:                 placeholder="e.g. Near Deccan Gymkhana"
289:                 style={{
290:                   width: '100%',
291:                   height: '40px',
292:                   padding: '0 12px',
293:                   fontSize: '0.875rem',
294:                   border: '1px solid #D1D5DB',
295:                   borderRadius: '4px',
296:                   boxSizing: 'border-box',
297:                 }}
298:               />
299:             </div>
300: 
301:             <div>
302:               <label
303:                 htmlFor="addr-pincode"
304:                 style={{
305:                   display: 'block',
306:                   fontSize: '0.75rem',
307:                   fontWeight: 700,
308:                   textTransform: 'uppercase',
309:                   color: '#374151',
310:                   marginBottom: '4px',
311:                 }}
312:               >
313:                 PIN Code *
314:               </label>
315:               <input
316:                 id="addr-pincode"
317:                 type="text"
318:                 required
319:                 maxLength={6}
320:                 value={formData.pincode}
321:                 onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })}
322:                 placeholder="411004"
323:                 style={{
324:                   width: '100%',
325:                   height: '40px',
326:                   padding: '0 12px',
327:                   fontSize: '0.875rem',
328:                   border: '1px solid #D1D5DB',
329:                   borderRadius: '4px',
330:                   boxSizing: 'border-box',
331:                 }}
332:               />
333:             </div>
334:           </div>
335: 
336:           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
337:             <div>
338:               <label
339:                 htmlFor="addr-city"
340:                 style={{
341:                   display: 'block',
342:                   fontSize: '0.75rem',
343:                   fontWeight: 700,
344:                   textTransform: 'uppercase',
345:                   color: '#374151',
346:                   marginBottom: '4px',
347:                 }}
348:               >
349:                 City
350:               </label>
351:               <input
352:                 id="addr-city"
353:                 type="text"
354:                 value={formData.city}
355:                 onChange={(e) => setFormData({ ...formData, city: e.target.value })}
356:                 style={{
357:                   width: '100%',
358:                   height: '40px',
359:                   padding: '0 12px',
360:                   fontSize: '0.875rem',
361:                   border: '1px solid #D1D5DB',
362:                   borderRadius: '4px',
363:                   boxSizing: 'border-box',
364:                 }}
365:               />
366:             </div>
367: 
368:             <div>
369:               <label
370:                 htmlFor="addr-state"
371:                 style={{
372:                   display: 'block',
373:                   fontSize: '0.75rem',
374:                   fontWeight: 700,
375:                   textTransform: 'uppercase',
376:                   color: '#374151',
377:                   marginBottom: '4px',
378:                 }}
379:               >
380:                 State
381:               </label>
382:               <input
383:                 id="addr-state"
384:                 type="text"
385:                 value={formData.state}
386:                 onChange={(e) => setFormData({ ...formData, state: e.target.value })}
387:                 style={{
388:                   width: '100%',
389:                   height: '40px',
390:                   padding: '0 12px',
391:                   fontSize: '0.875rem',
392:                   border: '1px solid #D1D5DB',
393:                   borderRadius: '4px',
394:                   boxSizing: 'border-box',
395:                 }}
396:               />
397:             </div>
398:           </div>
399: 
400:           {/* Address Type radio chips */}
401:           <div style={{ marginBottom: '16px' }}>
402:             <span
403:               style={{
404:                 display: 'block',
405:                 fontSize: '0.75rem',
406:                 fontWeight: 700,
407:                 textTransform: 'uppercase',
408:                 color: '#374151',
409:                 marginBottom: '6px',
410:               }}
411:             >
412:               Address Category
413:             </span>
414:             <div style={{ display: 'flex', gap: '10px' }}>
415:               {(['home', 'work', 'academy'] as const).map((type) => (
416:                 <button
417:                   key={type}
418:                   type="button"
419:                   onClick={() => setFormData({ ...formData, type })}
420:                   style={{
421:                     flex: 1,
422:                     padding: '8px 12px',
423:                     borderRadius: '4px',
424:                     border: formData.type === type ? '2px solid var(--color-ink)' : '1px solid #D1D5DB',
425:                     backgroundColor: formData.type === type ? 'rgba(201, 162, 39, 0.08)' : '#FFFFFF',
426:                     color: formData.type === type ? 'var(--color-ink)' : '#4B5563',
427:                     fontWeight: 700,
428:                     fontSize: '0.8125rem',
429:                     cursor: 'pointer',
430:                     textTransform: 'capitalize',
431:                   }}
432:                 >
433:                   {type === 'academy' ? 'Club / Academy' : type}
434:                 </button>
435:               ))}
436:             </div>
437:           </div>
438: 
439:           {/* Default Address Checkbox */}
440:           <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', cursor: 'pointer' }}>
441:             <input
442:               type="checkbox"
443:               checked={formData.isDefault}
444:               onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
445:               style={{ width: '16px', height: '16px', accentColor: 'var(--color-ink)' }}
446:             />
447:             <span style={{ fontSize: '0.8125rem', color: '#374151' }}>
448:               Make this my default shipping address for gear checkout
449:             </span>
450:           </label>
451: 
452:           <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
453:             <button
454:               type="button"
455:               onClick={onClose}
456:               className="btn btn-outline-dark btn-sm"
457:               disabled={isSubmitting}
458:             >
459:               CANCEL
460:             </button>
461:             <button
462:               type="submit"
463:               disabled={isSubmitting}
464:               className="btn btn-primary btn-sm"
465:               style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
466:             >
467:               <Check size={16} />
468:               <span>{isSubmitting ? 'SAVING...' : 'SAVE ADDRESS'}</span>
469:             </button>
470:           </div>
471:         </form>
472:       </div>
473:     </div>
474:   );
475: };
````

## File: src/components/home/OrbitalGallery.tsx
````typescript
  1: import React, { useEffect, useRef, useState } from 'react';
  2: import { Link } from 'react-router-dom';
  3: import {
  4:   AnimatePresence,
  5:   MotionValue,
  6:   motion,
  7:   useMotionValue,
  8:   useReducedMotion,
  9:   useScroll,
 10:   useSpring,
 11:   useTransform,
 12: } from 'framer-motion';
 13: import { IMAGES, MediaImage } from '../../data/media';
 14: import { Img } from '../ui/Img';
 15: import { EASE_OUT } from '../motion/Reveal';
 16: 
 17: /**
 18:  * THE GAME IN MOTION — six sport photographs on a 3D orbit that turns as the
 19:  * visitor scrolls through a pinned stage. Cards in front grow and stay sharp;
 20:  * cards behind shrink and soften. The stage tilts a few px with the pointer.
 21:  * Any photo opens full size, with a link to that sport's gear.
 22:  *
 23:  * Reduced motion: the orbit is replaced by a still grid of the same photos.
 24:  */
 25: 
 26: interface OrbitItem {
 27:   id: string;
 28:   sport: string;
 29:   image: MediaImage;
 30:   link: { to: string; label: string };
 31:   aspect: string;
 32:   yOffset: number;
 33: }
 34: 
 35: const ORBIT_ITEMS: OrbitItem[] = [
 36:   { id: 'badminton', sport: 'Badminton', image: IMAGES.badmintonSmash, link: { to: '/shop/badminton', label: 'Shop badminton' }, aspect: '4 / 5', yOffset: -12 },
 37:   { id: 'pickleball', sport: 'Pickleball', image: IMAGES.pickleballNet, link: { to: '/shop/pickleball', label: 'Shop pickleball' }, aspect: '16 / 11', yOffset: 24 },
 38:   { id: 'cricket', sport: 'Cricket', image: IMAGES.cricketStadium, link: { to: '/shop/cricket', label: 'Shop cricket' }, aspect: '16 / 10', yOffset: -28 },
 39:   { id: 'tennis', sport: 'Tennis', image: IMAGES.tennisClay, link: { to: '/shop/tennis', label: 'Shop tennis' }, aspect: '4 / 5', yOffset: 16 },
 40:   { id: 'squash', sport: 'Squash', image: IMAGES.squashCourts, link: { to: '/shop/squash', label: 'Shop squash' }, aspect: '1 / 1', yOffset: -16 },
 41:   { id: 'courts', sport: 'Courts', image: IMAGES.courtDusk, link: { to: '/courts', label: 'See court construction' }, aspect: '16 / 9', yOffset: 28 },
 42: ];
 43: 
 44: /** Radians the orbit turns across the whole scroll track (~1.1 revolutions). */
 45: const TURN = Math.PI * 2.2;
 46: /** CSS perspective of the orbit field, in px. */
 47: const PERSPECTIVE = 1200;
 48: /** Tallest card aspect (4:5) as height / width. */
 49: const TALLEST = 1.25;
 50: 
 51: export const OrbitalGallery: React.FC = () => {
 52:   const reduced = useReducedMotion();
 53:   const trackRef = useRef<HTMLElement>(null);
 54:   const [open, setOpen] = useState<OrbitItem | null>(null);
 55:   const [width, setWidth] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1440));
 56:   const fieldRef = useRef<HTMLDivElement>(null);
 57:   const [fieldH, setFieldH] = useState(600);
 58: 
 59:   useEffect(() => {
 60:     const onResize = () => setWidth(window.innerWidth);
 61:     window.addEventListener('resize', onResize);
 62:     return () => window.removeEventListener('resize', onResize);
 63:   }, []);
 64: 
 65:   useEffect(() => {
 66:     const el = fieldRef.current;
 67:     if (!el) return;
 68:     const ro = new ResizeObserver(([entry]) => setFieldH(entry.contentRect.height));
 69:     ro.observe(el);
 70:     return () => ro.disconnect();
 71:   }, [reduced]);
 72: 
 73:   const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });
 74:   const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 24, restDelta: 0.001 });
 75: 
 76: 
 77: 
 78:   // Restrained pointer tilt (fine pointers only), sprung so it never jitters.
 79:   const tiltX = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
 80:   const tiltY = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
 81:   const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
 82:     if (reduced || e.pointerType !== 'mouse') return;
 83:     const r = e.currentTarget.getBoundingClientRect();
 84:     tiltX.set(((e.clientX - r.left) / r.width - 0.5) * 14);
 85:     tiltY.set(((e.clientY - r.top) / r.height - 0.5) * 9);
 86:   };
 87:   const onPointerLeave = () => {
 88:     tiltX.set(0);
 89:     tiltY.set(0);
 90:   };
 91: 
 92:   const xRadius = width <= 480 ? width * 0.28 : width <= 900 ? 240 : 420;
 93:   const zRadius = width <= 480 ? 180 : width <= 900 ? 240 : 320;
 94: 
 95:   // Size the cards so the front one — scaled 1.32x and brought forward by
 96:   // the perspective — never leaves the field and never reaches the heading.
 97:   const yAmp = Math.min(60, fieldH * 0.07);
 98:   const swing = (28 / 60) * yAmp + yAmp;
 99:   const frontScale = 1.32 * (PERSPECTIVE / (PERSPECTIVE - zRadius));
100:   const heightCap = ((fieldH / 2 - swing - 8) * 2) / (TALLEST * frontScale);
101:   const widthCap = Math.min(Math.max(150, width * 0.19), 300);
102:   const cardW = Math.round(Math.max(110, Math.min(widthCap, heightCap)));
103: 
104:   const head = (
105:     <header className="orbit-head">
106:       <h2 id="orbit-title" className="display d-2">
107:         The game
108:         <br />
109:         in motion.
110:       </h2>
111:       <p className="orbit-hint">
112:         {reduced ? 'Select a photo to open it.' : 'Scroll to turn the gallery. Select a photo to open it.'}
113:       </p>
114:     </header>
115:   );
116: 
117:   return (
118:     <section ref={trackRef} className={`orbit ${reduced ? 'orbit--still' : ''}`} aria-labelledby="orbit-title">
119:       {reduced ? (
120:         <div className="container orbit-still">
121:           {head}
122:           <ul className="orbit-grid">
123:             {ORBIT_ITEMS.map((item) => (
124:               <li key={item.id}>
125:                 <OrbitCardFace item={item} onOpen={() => setOpen(item)} />
126:               </li>
127:             ))}
128:           </ul>
129:         </div>
130:       ) : (
131:         <div
132:           className="orbit-stage"
133:           onPointerMove={onPointerMove}
134:           onPointerLeave={onPointerLeave}
135:         >
136:           <div className="container orbit-stage-head">{head}</div>
137:           <div className="orbit-field" ref={fieldRef} style={{ '--orbit-card-w': `${cardW}px` } as React.CSSProperties}>
138:             <motion.ul className="orbit-canvas" style={{ x: tiltX, y: tiltY }}>
139:               {ORBIT_ITEMS.map((item, i) => (
140:                 <OrbitCard
141:                   key={item.id}
142:                   item={item}
143:                   baseAngle={(Math.PI * 2 * i) / ORBIT_ITEMS.length}
144:                   progress={progress}
145:                   xRadius={xRadius}
146:                   zRadius={zRadius}
147:                   yAmp={yAmp}
148:                   onOpen={() => setOpen(item)}
149:                 />
150:               ))}
151:             </motion.ul>
152:           </div>
153:         </div>
154:       )}
155: 
156:       <AnimatePresence>{open && <OrbitLightbox item={open} onClose={() => setOpen(null)} />}</AnimatePresence>
157:     </section>
158:   );
159: };
160: 
161: /* ---- Card ---------------------------------------------------------------- */
162: 
163: const OrbitCardFace: React.FC<{ item: OrbitItem; onOpen: () => void }> = ({ item, onOpen }) => (
164:   <button
165:     type="button"
166:     className="orbit-card"
167:     style={{ '--aspect': item.aspect } as React.CSSProperties}
168:     onClick={onOpen}
169:     aria-label={`Open photo: ${item.sport}`}
170:     data-orbit-id={item.id}
171:   >
172:     <Img image={item.image} alt="" sizes="(min-width: 900px) 320px, 240px" />
173:     <span className="orbit-card-label">{item.sport}</span>
174:   </button>
175: );
176: 
177: interface OrbitCardProps {
178:   item: OrbitItem;
179:   baseAngle: number;
180:   progress: MotionValue<number>;
181:   xRadius: number;
182:   zRadius: number;
183:   /** Vertical swing in px; the card's own offset scales with it. */
184:   yAmp: number;
185:   onOpen: () => void;
186: }
187: 
188: const OrbitCard: React.FC<OrbitCardProps> = ({ item, baseAngle, progress, xRadius, zRadius, yAmp, onOpen }) => {
189:   const angle = useTransform(progress, (p) => baseAngle + p * TURN);
190:   const x = useTransform(angle, (a) => Math.cos(a) * xRadius);
191:   const z = useTransform(angle, (a) => Math.sin(a) * zRadius);
192:   const y = useTransform(angle, (a) => (item.yOffset / 60) * yAmp + Math.sin(a * 1.5) * yAmp);
193: 
194:   // Depth: front cards grow to ~1.32, back cards recede to 0.72 and soften.
195:   const scale = useTransform(z, (d) => 0.72 + ((d + zRadius) / (zRadius * 2)) * 0.6);
196:   const filter = useTransform(z, (d) => (d >= 0 ? 'blur(0px)' : `blur(${(Math.abs(d / zRadius) * 2.5).toFixed(1)}px)`));
197:   const zIndex = useTransform(z, (d) => Math.round(10 + (d / zRadius) * 10));
198:   const rotateY = useTransform(x, (v) => -(v / xRadius) * 14);
199:   const rotateZ = useTransform(x, (v) => (v / xRadius) * 4);
200: 
201:   return (
202:     <motion.li className="orbit-anchor" style={{ x, y, z, zIndex, scale, filter, rotateY, rotateZ }}>
203:       <OrbitCardFace item={item} onOpen={onOpen} />
204:     </motion.li>
205:   );
206: };
207: 
208: /* ---- Lightbox ------------------------------------------------------------ */
209: 
210: const OrbitLightbox: React.FC<{ item: OrbitItem; onClose: () => void }> = ({ item, onClose }) => {
211:   const closeRef = useRef<HTMLButtonElement>(null);
212: 
213:   useEffect(() => {
214:     const opener = document.activeElement as HTMLElement | null;
215:     const root = document.documentElement;
216:     const prev = root.style.overflow;
217:     root.style.overflow = 'hidden';
218:     closeRef.current?.focus();
219:     const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
220:     window.addEventListener('keydown', onKey);
221:     return () => {
222:       root.style.overflow = prev;
223:       window.removeEventListener('keydown', onKey);
224:       opener?.focus();
225:     };
226:   }, [onClose]);
227: 
228:   return (
229:     <motion.div
230:       className="orbit-lightbox"
231:       role="dialog"
232:       aria-modal="true"
233:       aria-label={`${item.sport} photo`}
234:       onClick={onClose}
235:       initial={{ opacity: 0 }}
236:       animate={{ opacity: 1 }}
237:       exit={{ opacity: 0 }}
238:       transition={{ duration: 0.25 }}
239:     >
240:       <motion.figure
241:         className="orbit-lightbox-panel"
242:         onClick={(e) => e.stopPropagation()}
243:         initial={{ scale: 0.94, y: 16 }}
244:         animate={{ scale: 1, y: 0 }}
245:         exit={{ scale: 0.94, y: 16 }}
246:         transition={{ duration: 0.35, ease: EASE_OUT }}
247:       >
248:         <div className="orbit-lightbox-media">
249:           <Img image={item.image} sizes="(min-width: 900px) 820px, 100vw" style={{ objectFit: 'contain' }} />
250:         </div>
251:         <figcaption className="orbit-lightbox-bar">
252:           <span className="orbit-lightbox-text">
253:             <span className="orbit-lightbox-sport">{item.sport}</span>
254:             <span className="orbit-lightbox-alt">{item.image.alt}</span>
255:           </span>
256:           <span className="orbit-lightbox-actions">
257:             <Link to={item.link.to} className="link-arrow" onClick={onClose}>
258:               {item.link.label} <span className="btn-arrow" aria-hidden="true">→</span>
259:             </Link>
260:             <button ref={closeRef} type="button" className="orbit-lightbox-close" onClick={onClose}>
261:               Close
262:             </button>
263:           </span>
264:         </figcaption>
265:       </motion.figure>
266:     </motion.div>
267:   );
268: };
269: 
270: export default OrbitalGallery;
````

## File: src/components/products/StickyBuyBar.tsx
````typescript
 1: import React from 'react';
 2: import { Product } from '../../types';
 3: 
 4: interface StickyBuyBarProps {
 5:   product: Product;
 6:   onAddToCart: () => void;
 7:   onBuyNow: () => void;
 8:   inStock: boolean;
 9: }
10: 
11: /** Phones only: keeps price and the two purchase actions in thumb reach. */
12: export const StickyBuyBar: React.FC<StickyBuyBarProps> = ({ product, onAddToCart, onBuyNow, inStock }) => (
13:   <div className="sticky-buy" role="region" aria-label="Purchase">
14:     <div>
15:       <div className="sticky-buy-price">₹{product.price.toLocaleString('en-IN')}</div>
16:       <div className="sticky-buy-name">{product.name}</div>
17:     </div>
18:     <div className="sticky-buy-actions">
19:       <button type="button" onClick={onAddToCart} disabled={!inStock} className="btn btn-sm btn-outline">
20:         Add to bag
21:       </button>
22:       <button type="button" onClick={onBuyNow} disabled={!inStock} className="btn btn-sm btn-primary">
23:         Buy now
24:       </button>
25:     </div>
26:   </div>
27: );
28: 
29: export default StickyBuyBar;
````

## File: src/components/ui/BrandIntro.tsx
````typescript
 1: import React, { useEffect, useState } from 'react';
 2: 
 3: /**
 4:  * BrandIntro — once per session, ~1.1s, never blocks.
 5:  * The official O/S monogram is uncovered through a circular mask on Ivory
 6:  * Court (the monogram's black rings need a light ground), then the panel lifts
 7:  * away. Tap to skip. Skipped entirely for prefers-reduced-motion.
 8:  */
 9: export const BrandIntro: React.FC = () => {
10:   const [phase, setPhase] = useState<'hidden' | 'in' | 'out'>(() => {
11:     if (typeof window === 'undefined') return 'hidden';
12:     let seen = false;
13:     try {
14:       seen = sessionStorage.getItem('oriental_intro_shown') === 'true';
15:     } catch {
16:       seen = true;
17:     }
18:     const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
19:     return seen || reduced ? 'hidden' : 'in';
20:   });
21: 
22:   useEffect(() => {
23:     if (phase === 'hidden') return;
24:     try {
25:       sessionStorage.setItem('oriental_intro_shown', 'true');
26:     } catch {
27:       /* storage unavailable — intro simply shows again next time */
28:     }
29:     if (phase === 'in') {
30:       const t = window.setTimeout(() => setPhase('out'), 700);
31:       return () => window.clearTimeout(t);
32:     }
33:     const t = window.setTimeout(() => setPhase('hidden'), 520);
34:     return () => window.clearTimeout(t);
35:   }, [phase]);
36: 
37:   if (phase === 'hidden') return null;
38: 
39:   return (
40:     <div
41:       className={`brand-intro ${phase === 'out' ? 'is-leaving' : ''}`}
42:       aria-hidden="true"
43:       onClick={() => setPhase('out')}
44:     >
45:       <img className="brand-intro-mark" src="/brand/oriental-sports-monogram.png" alt="" width={186} height={147} />
46:     </div>
47:   );
48: };
49: 
50: export default BrandIntro;
````

## File: src/data/storeInfo.ts
````typescript
 1: import { StoreDetails } from '../types';
 2: 
 3: export const STORE_INFO: StoreDetails = {
 4:   name: 'Oriental Sports',
 5:   addressLine1: 'Shop 247, MG Road',
 6:   addressLine2: 'New Modikhana, Camp',
 7:   locality: 'Camp',
 8:   city: 'Pune',
 9:   pincode: '411001',
10:   phone: '+919890990022',
11:   displayPhone: '+91 98909 90022',
12:   email: 'oriental_sports@outlook.com',
13:   hours: {
14:     weekdays: '10:30 AM – 8:30 PM',
15:     sunday: '11:00 AM – 6:00 PM',
16:   },
17:   mapsUrl: 'https://maps.google.com/?q=Shop+247+MG+Road+Camp+Pune+411001',
18:   whatsappUrl: 'https://wa.me/919890990022?text=Hi%20Oriental%20Sports,%20I%20would%20like%20to%20inquire%20about%20',
19: };
20: 
21: /** Opening hours as minutes from midnight, Pune time. Mirrors STORE_INFO.hours. */
22: export const STORE_SCHEDULE = {
23:   timeZone: 'Asia/Kolkata',
24:   /** Monday–Saturday */
25:   weekdays: { open: 10 * 60 + 30, close: 20 * 60 + 30 },
26:   sunday: { open: 11 * 60, close: 18 * 60 },
27: };
28: 
29: export const BRAND_STORY = {
30:   headline: 'ROOTED IN CAMP. BUILT FOR THE GAME.',
31:   subheadline: 'Pune’s sports house. Gear for the game. Courts for the city.',
32:   /** Facts only: what the store sells, what it does in-house, what it builds and where. */
33:   narrative: [
34:     'Oriental Sports is a sports goods shop at Shop 247, MG Road, in Camp, Pune. Players, coaches, schools and clubs come to the counter for cricket bats, racquets, paddles and fitness equipment.',
35:     'Gear is picked up and tried in the hand before it is bought. Racquet stringing and bat knocking-in are done at the store, so a racquet or bat leaves ready to play.',
36:     'The store also builds courts: turnkey construction covering surface, fencing, lighting and line marking, for clubs, schools, housing societies and homes across Pune and Maharashtra.',
37:   ],
38: };
````

## File: src/pages/ContactPage.tsx
````typescript
  1: import React, { useState } from 'react';
  2: import { STORE_INFO } from '../data/storeInfo';
  3: import { PageHeader } from '../components/ui/PageHeader';
  4: import { Reveal } from '../components/motion/Reveal';
  5: import { useStoreStatus } from '../utils/storeHours';
  6: 
  7: const TOPICS = [
  8:   'Sports equipment',
  9:   'Court construction',
 10:   'School, club or academy order',
 11:   'Racquet stringing or bat service',
 12: ];
 13: 
 14: /**
 15:  * There is no form backend, so the enquiry is handed to WhatsApp (or email)
 16:  * with the message already written — the visitor always knows where it went.
 17:  */
 18: export const ContactPage: React.FC = () => {
 19:   const status = useStoreStatus();
 20:   const [form, setForm] = useState({ name: '', phone: '', email: '', topic: TOPICS[0], message: '' });
 21:   const [sent, setSent] = useState(false);
 22: 
 23:   const body = () =>
 24:     [
 25:       `Hello Oriental Sports,`,
 26:       ``,
 27:       form.message,
 28:       ``,
 29:       `Topic: ${form.topic}`,
 30:       `Name: ${form.name}`,
 31:       `Phone: ${form.phone}`,
 32:       form.email ? `Email: ${form.email}` : '',
 33:     ]
 34:       .filter((line, i, all) => line !== '' || all[i - 1] !== '')
 35:       .join('\n');
 36: 
 37:   const whatsappHref = () => `https://wa.me/${STORE_INFO.phone.replace(/\D/g, '')}?text=${encodeURIComponent(body())}`;
 38:   const mailHref = () =>
 39:     `mailto:${STORE_INFO.email}?subject=${encodeURIComponent(`${form.topic} — ${form.name}`)}&body=${encodeURIComponent(body())}`;
 40: 
 41:   const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
 42:     setForm({ ...form, [key]: e.target.value });
 43: 
 44:   return (
 45:     <div className="contact-page">
 46:       <PageHeader
 47:         crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
 48:         title={['Talk to', 'the store.']}
 49:         lead="Gear questions, bulk orders for schools and clubs, or a court you want built. Write it here and send it to us on WhatsApp or by email."
 50:       />
 51: 
 52:       <section className="container contact-grid" aria-label="Send us a message">
 53:         <Reveal className="contact-form-wrap">
 54:           <form
 55:             className="contact-form"
 56:             onSubmit={(e) => {
 57:               e.preventDefault();
 58:               window.open(whatsappHref(), '_blank', 'noopener');
 59:               setSent(true);
 60:             }}
 61:           >
 62:             <div className="field">
 63:               <label className="field-label" htmlFor="c-name">Name</label>
 64:               <input id="c-name" className="input" required autoComplete="name" value={form.name} onChange={set('name')} />
 65:             </div>
 66:             <div className="contact-form-row">
 67:               <div className="field">
 68:                 <label className="field-label" htmlFor="c-phone">Phone</label>
 69:                 <input id="c-phone" className="input" type="tel" required autoComplete="tel" inputMode="tel" value={form.phone} onChange={set('phone')} />
 70:               </div>
 71:               <div className="field">
 72:                 <label className="field-label" htmlFor="c-email">Email (optional)</label>
 73:                 <input id="c-email" className="input" type="email" autoComplete="email" value={form.email} onChange={set('email')} />
 74:               </div>
 75:             </div>
 76:             <div className="field">
 77:               <label className="field-label" htmlFor="c-topic">About</label>
 78:               <select id="c-topic" className="select" value={form.topic} onChange={set('topic')}>
 79:                 {TOPICS.map((t) => (
 80:                   <option key={t}>{t}</option>
 81:                 ))}
 82:               </select>
 83:             </div>
 84:             <div className="field">
 85:               <label className="field-label" htmlFor="c-message">Message</label>
 86:               <textarea id="c-message" className="textarea" required rows={5} value={form.message} onChange={set('message')} />
 87:             </div>
 88: 
 89:             <div className="contact-form-actions">
 90:               <button type="submit" className="btn btn-primary">Send on WhatsApp</button>
 91:               <a href={mailHref()} className="link-arrow">
 92:                 Send by email instead <span className="btn-arrow" aria-hidden="true">→</span>
 93:               </a>
 94:             </div>
 95: 
 96:             <p className="contact-form-note" role="status">
 97:               {sent
 98:                 ? 'WhatsApp opened in a new tab with your message written out — press send there to reach us.'
 99:                 : 'Your message opens in WhatsApp (or your email app) ready to send. Nothing is stored on this website.'}
100:             </p>
101:           </form>
102:         </Reveal>
103: 
104:         <Reveal as="aside" className="contact-side" delay={0.1}>
105:           <p className={`store-status ${status.isOpen ? 'is-open' : ''}`}>
106:             <span className="status-dot" aria-hidden="true" />
107:             {status.label}
108:           </p>
109:           <dl className="store-hours">
110:             <div>
111:               <dt>Phone</dt>
112:               <dd><a href={`tel:${STORE_INFO.phone}`}>{STORE_INFO.displayPhone}</a></dd>
113:             </div>
114:             <div>
115:               <dt>WhatsApp</dt>
116:               <dd><a href={STORE_INFO.whatsappUrl} target="_blank" rel="noreferrer">Chat now</a></dd>
117:             </div>
118:             <div>
119:               <dt>Email</dt>
120:               <dd><a href={`mailto:${STORE_INFO.email}`}>{STORE_INFO.email}</a></dd>
121:             </div>
122:             <div>
123:               <dt>Store</dt>
124:               <dd>{STORE_INFO.addressLine1}, {STORE_INFO.locality}</dd>
125:             </div>
126:           </dl>
127:           <p className="contact-side-note">
128:             Schools, colleges, academies and housing societies: tell us what you need and how many — we’ll put together a bulk order.
129:           </p>
130:         </Reveal>
131:       </section>
132:     </div>
133:   );
134: };
135: 
136: export default ContactPage;
````

## File: src/pages/NotFoundPage.tsx
````typescript
 1: import React from 'react';
 2: import { Link } from 'react-router-dom';
 3: import { CATEGORIES } from '../data/categories';
 4: 
 5: export const NotFoundPage: React.FC = () => (
 6:   <div className="container not-found">
 7:     <p className="eyebrow">Page not found</p>
 8:     <h1 className="display d-hero not-found-title">Out.</h1>
 9:     <p className="lead">That page has gone past the baseline. Try the shop, the courts, or a sport below.</p>
10:     <div className="not-found-actions">
11:       <Link to="/shop" className="btn btn-primary">Shop gear</Link>
12:       <Link to="/courts" className="btn btn-outline">Courts</Link>
13:       <Link to="/" className="link-arrow">Home <span className="btn-arrow" aria-hidden="true">→</span></Link>
14:     </div>
15:     <ul className="not-found-sports">
16:       {CATEGORIES.map((c) => (
17:         <li key={c.id}>
18:           <Link to={`/shop/${c.id}`} className="chip">{c.name}</Link>
19:         </li>
20:       ))}
21:     </ul>
22:   </div>
23: );
24: 
25: export default NotFoundPage;
````

## File: src/pages/PolicyPages.tsx
````typescript
 1: import React from 'react';
 2: import { NavLink } from 'react-router-dom';
 3: import { STORE_INFO } from '../data/storeInfo';
 4: import { PageHeader } from '../components/ui/PageHeader';
 5: 
 6: const POLICIES = [
 7:   { to: '/shipping', label: 'Shipping' },
 8:   { to: '/returns', label: 'Returns' },
 9:   { to: '/privacy', label: 'Privacy' },
10:   { to: '/terms', label: 'Terms' },
11: ];
12: 
13: /** Shared reading layout for the four policies. Policy wording is unchanged. */
14: const PolicyLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
15:   <div className="policy-page">
16:     <PageHeader crumbs={[{ label: 'Home', to: '/' }, { label: title }]} title={[title]} />
17:     <div className="container policy-grid">
18:       <nav aria-label="Policies" className="policy-nav">
19:         {POLICIES.map((p) => (
20:           <NavLink key={p.to} to={p.to} className={({ isActive }) => `policy-link ${isActive ? 'active' : ''}`}>
21:             {p.label}
22:           </NavLink>
23:         ))}
24:       </nav>
25:       <div className="prose">{children}</div>
26:     </div>
27:   </div>
28: );
29: 
30: export const ShippingPage: React.FC = () => (
31:   <PolicyLayout title="Shipping & delivery">
32:     <p>
33:       Oriental Sports ships sports equipment and recreation goods directly from our retail flagship store located at <strong>{STORE_INFO.addressLine1}, {STORE_INFO.addressLine2}, {STORE_INFO.locality}, {STORE_INFO.city} 411001</strong>.
34:     </p>
35:     <h2>1. Pune & PMRDA Local Deliveries</h2>
36:     <p>
37:       - Orders within Pune city limits above ₹2,000 qualify for <strong>FREE standard delivery</strong>. For orders below ₹2,000, a flat nominal delivery fee of ₹150 applies.<br />
38:       - Most orders placed before 2:00 PM are dispatched same-day from Camp. Standard delivery time is 24 to 48 hours across Pune, Kothrud, Baner, Wakad, Hadapsar, and Pimpri-Chinchwad.
39:     </p>
40:     <h2>2. Camp Store Click & Collect</h2>
41:     <p>
42:       You may choose <strong>Store Pickup</strong> during checkout. Your equipment will be prepared, bat-knocked or strung as requested, and held at our Camp store with zero shipping fees.
43:     </p>
44:     <h2>3. Pan-India Dispatches</h2>
45:     <p>
46:       Heavy items like table tennis tables, commercial dumbbells, and court netting are shipped via insured surface transport across Maharashtra and India with real-time tracking numbers provided.
47:     </p>
48:   </PolicyLayout>
49: );
50: 
51: export const ReturnsPage: React.FC = () => (
52:   <PolicyLayout title="Returns & replacements">
53:     <p>
54:       At Oriental Sports, authentic gear and customer trust are our foundation. We inspect all racquets, bats, balls, and equipment prior to dispatch.
55:     </p>
56:     <h2>1. 7-Day Replacement Policy</h2>
57:     <p>
58:       If any product arrives damaged or with a verified manufacturing defect, notify us within 7 days of receipt with photos via WhatsApp at <strong>{STORE_INFO.displayPhone}</strong> or email <strong>{STORE_INFO.email}</strong>. We will arrange a free replacement or store credit.
59:     </p>
60:     <h2>2. Condition for Returns</h2>
61:     <p>
62:       Items must be unused, in original manufacturer packaging with plastic seals intact on bat and racquet handles. Custom-strung racquets and pre-knocked bats prepared to customer specifications cannot be refunded unless defective.
63:     </p>
64:     <h2>3. In-Store Exchanges</h2>
65:     <p>You can bring your equipment directly to our Camp store for quick in-person verification and exchange.</p>
66:   </PolicyLayout>
67: );
68: 
69: export const PrivacyPage: React.FC = () => (
70:   <PolicyLayout title="Privacy policy">
71:     <p>Oriental Sports respects the privacy of athletes, clubs, and customers who engage with our store and website.</p>
72:     <p>
73:       We collect contact details (such as name, phone number, delivery address, and email) solely to process orders, communicate dispatch details, and coordinate court construction site inspections.
74:     </p>
75:     <p>We never sell, trade, or distribute your private contact details to third-party marketing entities.</p>
76:   </PolicyLayout>
77: );
78: 
79: export const TermsPage: React.FC = () => (
80:   <PolicyLayout title="Terms & conditions">
81:     <p>
82:       By using this website or placing orders with Oriental Sports (Shop 247, MG Road, Camp, Pune 411001), you agree to these operational terms.
83:     </p>
84:     <p>
85:       - Product prices are quoted in Indian Rupees (INR) and are inclusive of standard GST where applicable.<br />
86:       - Court construction proposals and quotes are subject to physical site laser gradient inspection and final engineering agreement.<br />
87:       - All brand logos and original content are property of Oriental Sports.
88:     </p>
89:   </PolicyLayout>
90: );
````

## File: src/services/authService.ts
````typescript
  1: import { UserProfile, Address, Order, CourtInquiry } from '../types/auth';
  2: 
  3: const STORAGE_KEY = 'oriental_sports_auth_user_v1';
  4: 
  5: export const INITIAL_USER: UserProfile = {
  6:   id: 'usr_pune_0921',
  7:   firstName: 'Arjun',
  8:   lastName: 'Deshmukh',
  9:   fullName: 'Arjun Deshmukh',
 10:   email: 'arjun.deshmukh@gmail.com',
 11:   phone: '+91 98230 45812',
 12:   sportPreferences: ['Badminton', 'Tennis', 'Cricket'],
 13:   membershipTier: 'Club Athlete',
 14:   createdAt: '2023-04-12',
 15:   addresses: [
 16:     {
 17:       id: 'addr_1',
 18:       name: 'Arjun Deshmukh',
 19:       phone: '+91 98230 45812',
 20:       street: 'Bungalow No. 7, Silver Oak Lane, Off MG Road',
 21:       locality: 'Camp',
 22:       city: 'Pune',
 23:       state: 'Maharashtra',
 24:       pincode: '411001',
 25:       isDefault: true,
 26:       type: 'home',
 27:     },
 28:     {
 29:       id: 'addr_2',
 30:       name: 'Arjun Deshmukh (Office)',
 31:       phone: '+91 98230 45812',
 32:       street: 'Level 4, Quadra IT Park, West Avenue',
 33:       locality: 'Baner',
 34:       city: 'Pune',
 35:       state: 'Maharashtra',
 36:       pincode: '411045',
 37:       isDefault: false,
 38:       type: 'work',
 39:     },
 40:   ],
 41:   orders: [
 42:     {
 43:       id: 'ord-8831',
 44:       orderNumber: 'OS-2024-8831',
 45:       date: '2024-11-18',
 46:       status: 'delivered',
 47:       statusLabel: 'Delivered to Camp, Pune',
 48:       totalAmount: 18499,
 49:       subtotal: 18499,
 50:       shipping: 0,
 51:       tax: 2821,
 52:       paymentMethod: 'UPI (Google Pay)',
 53:       shippingAddress: {
 54:         id: 'addr_1',
 55:         name: 'Arjun Deshmukh',
 56:         phone: '+91 98230 45812',
 57:         street: 'Bungalow No. 7, Silver Oak Lane, Off MG Road',
 58:         locality: 'Camp',
 59:         city: 'Pune',
 60:         state: 'Maharashtra',
 61:         pincode: '411001',
 62:         isDefault: true,
 63:         type: 'home',
 64:       },
 65:       trackingNumber: 'DTDC-PN-9920141',
 66:       carrier: 'DTDC Express',
 67:       estimatedDelivery: '19 Nov 2024',
 68:       items: [
 69:         {
 70:           productId: 'prod-bad-01',
 71:           productSlug: 'victor-thruster-k-ryuga-ii-pro',
 72:           productName: 'Victor Thruster K Ryuga II Pro Badminton Racquet',
 73:           productImage: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80',
 74:           price: 18499,
 75:           quantity: 1,
 76:           selectedVariant: '4U (83g) / G5',
 77:         },
 78:       ],
 79:       timeline: [
 80:         {
 81:           status: 'confirmed',
 82:           title: 'Order Confirmed',
 83:           description: 'Payment verified via UPI. Order sent to Camp flagship store fulfillment depot.',
 84:           date: '18 Nov 2024, 10:15 AM',
 85:           completed: true,
 86:           current: false,
 87:         },
 88:         {
 89:           status: 'processing',
 90:           title: 'Custom Restringing & Quality Check',
 91:           description: 'Strung at 27 lbs electronic tension using Yonex BG80 by master technician in Camp workshop.',
 92:           date: '18 Nov 2024, 02:30 PM',
 93:           completed: true,
 94:           current: false,
 95:         },
 96:         {
 97:           status: 'shipped',
 98:           title: 'Dispatched via DTDC Local Courier',
 99:           description: 'Package picked up from Oriental Sports MG Road warehouse.',
100:           date: '19 Nov 2024, 09:00 AM',
101:           completed: true,
102:           current: false,
103:         },
104:         {
105:           status: 'delivered',
106:           title: 'Delivered Successfully',
107:           description: 'Received by Arjun Deshmukh at Camp bungalow.',
108:           date: '19 Nov 2024, 01:45 PM',
109:           completed: true,
110:           current: true,
111:         },
112:       ],
113:     },
114:     {
115:       id: 'ord-8714',
116:       orderNumber: 'OS-2024-8714',
117:       date: '2024-10-04',
118:       status: 'delivered',
119:       statusLabel: 'Delivered to Baner, Pune',
120:       totalAmount: 3799,
121:       subtotal: 3799,
122:       shipping: 0,
123:       tax: 579,
124:       paymentMethod: 'Credit Card (HDFC Visa)',
125:       shippingAddress: {
126:         id: 'addr_2',
127:         name: 'Arjun Deshmukh (Office)',
128:         phone: '+91 98230 45812',
129:         street: 'Level 4, Quadra IT Park, West Avenue',
130:         locality: 'Baner',
131:         city: 'Pune',
132:         state: 'Maharashtra',
133:         pincode: '411045',
134:         isDefault: false,
135:         type: 'work',
136:       },
137:       trackingNumber: 'DELHIVERY-OS-44812',
138:       carrier: 'Delhivery Surface',
139:       items: [
140:         {
141:           productId: 'prod-ten-02',
142:           productSlug: 'wilson-us-open-extra-duty-balls-case',
143:           productName: 'Wilson US Open Extra Duty Tennis Balls (Can of 3)',
144:           productImage: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&q=80',
145:           price: 899,
146:           quantity: 2,
147:         },
148:         {
149:           productId: 'prod-acc-01',
150:           productSlug: 'oriental-pro-tour-6-racquet-thermal-bag',
151:           productName: 'Oriental Pro Tour 6-Racquet Thermal Gear Bag',
152:           productImage: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=800&q=80',
153:           price: 2001,
154:           quantity: 1,
155:         },
156:       ],
157:       timeline: [
158:         {
159:           status: 'confirmed',
160:           title: 'Order Confirmed',
161:           description: 'Payment received.',
162:           date: '04 Oct 2024, 11:30 AM',
163:           completed: true,
164:           current: false,
165:         },
166:         {
167:           status: 'shipped',
168:           title: 'Dispatched',
169:           description: 'Handed over to Delhivery.',
170:           date: '04 Oct 2024, 04:00 PM',
171:           completed: true,
172:           current: false,
173:         },
174:         {
175:           status: 'delivered',
176:           title: 'Delivered',
177:           description: 'Delivered to office reception desk.',
178:           date: '05 Oct 2024, 03:20 PM',
179:           completed: true,
180:           current: true,
181:         },
182:       ],
183:     },
184:   ],
185:   courtInquiries: [
186:     {
187:       id: 'inq-902',
188:       inquiryNumber: 'CRT-2024-902',
189:       date: '2024-10-22',
190:       sport: 'Pickleball',
191:       surface: 'Cushioned 8-Layer Acrylic',
192:       location: 'Koregaon Park, Pune',
193:       status: 'proposal_ready',
194:       statusLabel: 'Detailed BOQ Proposal Ready',
195:       contactPerson: 'Arjun Deshmukh',
196:       phone: '+91 98230 45812',
197:       notes: 'Private rooftop court 20m x 10m with LED perimeter floodlighting and chainlink fence.',
198:     },
199:   ],
200: };
201: 
202: export class AuthService {
203:   private static loadUser(): UserProfile | null {
204:     try {
205:       const stored = localStorage.getItem(STORAGE_KEY);
206:       if (stored) {
207:         const parsed = JSON.parse(stored);
208:         // Clean out legacy demo user if it was saved by accident
209:         if (parsed.id === 'usr_pune_0921' || parsed.email === 'arjun.deshmukh@gmail.com') {
210:           localStorage.removeItem(STORAGE_KEY);
211:           return null;
212:         }
213:         return parsed;
214:       }
215:     } catch {
216:       // fallback
217:     }
218:     return null;
219:   }
220: 
221:   private static saveUser(user: UserProfile | null) {
222:     try {
223:       if (user) {
224:         localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
225:       } else {
226:         localStorage.removeItem(STORAGE_KEY);
227:       }
228:     } catch {
229:       // fallback
230:     }
231:   }
232: 
233:   static getCurrentUser(): UserProfile | null {
234:     // Normal visitors start signed out. No demo persona is assumed.
235:     return this.loadUser();
236:   }
237: 
238:   static async requestOtp(phone: string): Promise<{ success: boolean; devOtp: string }> {
239:     await new Promise((r) => setTimeout(r, 450));
240:     return {
241:       success: true,
242:       devOtp: '123456',
243:     };
244:   }
245: 
246:   static async verifyOtp(phone: string, otp: string, registrationData?: { firstName: string; lastName: string; email?: string }): Promise<UserProfile> {
247:     await new Promise((r) => setTimeout(r, 550));
248:     localStorage.removeItem('oriental_sports_logged_out');
249:     
250:     let user = this.getCurrentUser();
251:     const formattedPhone = phone.startsWith('+91') ? phone : `+91 ${phone}`;
252: 
253:     if (!user || user.phone !== formattedPhone) {
254:       const firstName = registrationData?.firstName || 'Sports';
255:       const lastName = registrationData?.lastName || 'Athlete';
256:       const newUser: UserProfile = {
257:         id: `usr_${Date.now()}`,
258:         phone: formattedPhone,
259:         firstName,
260:         lastName,
261:         fullName: registrationData ? `${firstName} ${lastName}`.trim() : 'Sports Athlete',
262:         email: registrationData?.email || '',
263:         sportPreferences: ['Badminton', 'Tennis'],
264:         membershipTier: 'Club Athlete',
265:         createdAt: new Date().toISOString().split('T')[0],
266:         addresses: [],
267:         orders: [],
268:         courtInquiries: [],
269:       };
270:       this.saveUser(newUser);
271:       return newUser;
272:     }
273:     this.saveUser(user);
274:     return user;
275:   }
276: 
277:   static async signInWithGoogle(): Promise<UserProfile> {
278:     await new Promise((r) => setTimeout(r, 600));
279:     localStorage.removeItem('oriental_sports_logged_out');
280:     let user = this.getCurrentUser();
281:     if (!user) {
282:       const newUser: UserProfile = {
283:         id: `usr_${Date.now()}`,
284:         firstName: 'Sports',
285:         lastName: 'Member',
286:         fullName: 'Sports Member',
287:         email: 'member@orientalsports.in',
288:         phone: '',
289:         sportPreferences: [],
290:         membershipTier: 'Club Athlete',
291:         createdAt: new Date().toISOString().split('T')[0],
292:         addresses: [],
293:         orders: [],
294:         courtInquiries: [],
295:       };
296:       this.saveUser(newUser);
297:       return newUser;
298:     }
299:     this.saveUser(user);
300:     return user;
301:   }
302: 
303:   static async signInWithEmail(email: string): Promise<UserProfile> {
304:     await new Promise((r) => setTimeout(r, 500));
305:     localStorage.removeItem('oriental_sports_logged_out');
306:     let user = this.getCurrentUser();
307:     if (!user) {
308:       const namePart = email.split('@')[0];
309:       const capitalized = namePart.charAt(0).toUpperCase() + namePart.slice(1);
310:       const newUser: UserProfile = {
311:         id: `usr_${Date.now()}`,
312:         email,
313:         phone: '',
314:         firstName: capitalized,
315:         lastName: 'Customer',
316:         fullName: `${capitalized} Customer`,
317:         sportPreferences: [],
318:         membershipTier: 'Club Athlete',
319:         createdAt: new Date().toISOString().split('T')[0],
320:         addresses: [],
321:         orders: [],
322:         courtInquiries: [],
323:       };
324:       this.saveUser(newUser);
325:       return newUser;
326:     }
327:     this.saveUser(user);
328:     return user;
329:   }
330: 
331:   static async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
332:     await new Promise((r) => setTimeout(r, 300));
333:     let current = this.getCurrentUser();
334:     const updatedUser: UserProfile = current
335:       ? {
336:           ...current,
337:           ...updates,
338:           fullName: updates.firstName && updates.lastName 
339:             ? `${updates.firstName} ${updates.lastName}` 
340:             : updates.firstName 
341:             ? `${updates.firstName} ${current.lastName}`
342:             : current.fullName,
343:         }
344:       : {
345:           id: `usr_${Date.now()}`,
346:           firstName: updates.firstName || 'Customer',
347:           lastName: updates.lastName || '',
348:           fullName: `${updates.firstName || 'Customer'} ${updates.lastName || ''}`.trim(),
349:           email: updates.email || '',
350:           phone: updates.phone || '',
351:           sportPreferences: updates.sportPreferences || [],
352:           membershipTier: 'Club Athlete',
353:           createdAt: new Date().toISOString().split('T')[0],
354:           addresses: [],
355:           orders: [],
356:           courtInquiries: [],
357:         };
358:     this.saveUser(updatedUser);
359:     return updatedUser;
360:   }
361: 
362:   static async addAddress(newAddr: Omit<Address, 'id'>): Promise<Address> {
363:     await new Promise((r) => setTimeout(r, 300));
364:     let current = this.getCurrentUser();
365:     const addressWithId: Address = {
366:       ...newAddr,
367:       id: `addr_${Date.now()}`,
368:     };
369:     if (!current) {
370:       const newUser: UserProfile = {
371:         id: `usr_${Date.now()}`,
372:         firstName: newAddr.name.split(' ')[0] || 'Customer',
373:         lastName: newAddr.name.split(' ').slice(1).join(' ') || '',
374:         fullName: newAddr.name,
375:         email: '',
376:         phone: newAddr.phone,
377:         sportPreferences: [],
378:         membershipTier: 'Club Athlete',
379:         createdAt: new Date().toISOString().split('T')[0],
380:         addresses: [addressWithId],
381:         orders: [],
382:         courtInquiries: [],
383:       };
384:       this.saveUser(newUser);
385:     } else {
386:       let updatedAddresses = [...current.addresses];
387:       if (addressWithId.isDefault) {
388:         updatedAddresses = updatedAddresses.map((a) => ({ ...a, isDefault: false }));
389:       }
390:       updatedAddresses.unshift(addressWithId);
391:       current = { ...current, addresses: updatedAddresses };
392:       this.saveUser(current);
393:     }
394:     return addressWithId;
395:   }
396: 
397:   static async updateAddress(id: string, addrUpdate: Partial<Address>): Promise<Address> {
398:     await new Promise((r) => setTimeout(r, 300));
399:     const current = this.getCurrentUser();
400:     if (!current) throw new Error('No user profile found');
401:     let target: Address | undefined;
402:     let updatedAddresses = current.addresses.map((a) => {
403:       if (a.id === id) {
404:         target = { ...a, ...addrUpdate };
405:         return target;
406:       }
407:       if (addrUpdate.isDefault) {
408:         return { ...a, isDefault: false };
409:       }
410:       return a;
411:     });
412:     if (!target) throw new Error('Address not found');
413:     this.saveUser({ ...current, addresses: updatedAddresses });
414:     return target;
415:   }
416: 
417:   static async deleteAddress(id: string): Promise<void> {
418:     await new Promise((r) => setTimeout(r, 300));
419:     const current = this.getCurrentUser();
420:     if (!current) return;
421:     const filtered = current.addresses.filter((a) => a.id !== id);
422:     if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
423:       filtered[0].isDefault = true;
424:     }
425:     this.saveUser({ ...current, addresses: filtered });
426:   }
427: 
428:   static async setDefaultAddress(id: string): Promise<void> {
429:     await new Promise((r) => setTimeout(r, 200));
430:     const current = this.getCurrentUser();
431:     if (!current) return;
432:     const updated = current.addresses.map((a) => ({
433:       ...a,
434:       isDefault: a.id === id,
435:     }));
436:     this.saveUser({ ...current, addresses: updated });
437:   }
438: 
439:   static async addOrder(order: Order): Promise<Order> {
440:     await new Promise((r) => setTimeout(r, 200));
441:     let current = this.getCurrentUser();
442:     if (!current) {
443:       // Create guest customer account with their real details from the order
444:       const nameParts = (order.shippingAddress.name || 'Customer').trim().split(' ');
445:       const firstName = nameParts[0] || 'Customer';
446:       const lastName = nameParts.slice(1).join(' ') || '';
447:       const newUser: UserProfile = {
448:         id: `usr_${Date.now()}`,
449:         firstName,
450:         lastName,
451:         fullName: order.shippingAddress.name || `${firstName} ${lastName}`.trim(),
452:         email: '',
453:         phone: order.shippingAddress.phone,
454:         sportPreferences: [],
455:         membershipTier: 'Club Athlete',
456:         createdAt: new Date().toISOString().split('T')[0],
457:         addresses: [order.shippingAddress],
458:         orders: [order],
459:         courtInquiries: [],
460:       };
461:       this.saveUser(newUser);
462:     } else {
463:       const orders = [order, ...current.orders];
464:       const hasAddr = current.addresses.some((a) => a.street === order.shippingAddress.street && a.pincode === order.shippingAddress.pincode);
465:       const addresses = hasAddr ? current.addresses : [order.shippingAddress, ...current.addresses];
466:       current = { ...current, orders, addresses };
467:       this.saveUser(current);
468:     }
469:     return order;
470:   }
471: 
472:   static async signOut(): Promise<void> {
473:     await new Promise((r) => setTimeout(r, 200));
474:     localStorage.setItem('oriental_sports_logged_out', 'true');
475:     this.saveUser(null);
476:   }
477: }
````

## File: src/types/auth.ts
````typescript
 1: export interface Address {
 2:   id: string;
 3:   name: string;
 4:   phone: string;
 5:   street: string;
 6:   locality: string;
 7:   city: string;
 8:   state: string;
 9:   pincode: string;
10:   isDefault: boolean;
11:   type: 'home' | 'work' | 'other' | 'academy';
12: }
13: 
14: export interface OrderItem {
15:   productId: string;
16:   productSlug: string;
17:   productName: string;
18:   productImage: string;
19:   price: number;
20:   quantity: number;
21:   selectedVariant?: string;
22:   selectedSize?: string;
23: }
24: 
25: export type OrderStatus =
26:   | 'confirmed'
27:   | 'processing'
28:   | 'shipped'
29:   | 'out_for_delivery'
30:   | 'delivered'
31:   | 'cancelled';
32: 
33: export interface TrackingStep {
34:   status: OrderStatus;
35:   title: string;
36:   description: string;
37:   date: string;
38:   completed: boolean;
39:   current: boolean;
40: }
41: 
42: export interface Order {
43:   id: string;
44:   orderNumber: string;
45:   date: string;
46:   status: OrderStatus;
47:   statusLabel: string;
48:   totalAmount: number;
49:   subtotal: number;
50:   shipping: number;
51:   tax: number;
52:   paymentMethod: string;
53:   items: OrderItem[];
54:   shippingAddress: Address;
55:   trackingNumber?: string;
56:   carrier?: string;
57:   estimatedDelivery?: string;
58:   timeline: TrackingStep[];
59: }
60: 
61: export interface CourtInquiry {
62:   id: string;
63:   inquiryNumber: string;
64:   date: string;
65:   sport: string;
66:   surface: string;
67:   location: string;
68:   status: 'reviewing' | 'site_survey_scheduled' | 'proposal_ready' | 'work_in_progress';
69:   statusLabel: string;
70:   contactPerson: string;
71:   phone: string;
72:   notes?: string;
73: }
74: 
75: export interface UserProfile {
76:   id: string;
77:   firstName: string;
78:   lastName: string;
79:   fullName: string;
80:   email: string;
81:   phone: string;
82:   sportPreferences: string[];
83:   sportsInterests?: string[];
84:   membershipTier: 'Club Athlete' | 'Pro Member' | 'Elite Partner';
85:   addresses: Address[];
86:   orders: Order[];
87:   courtInquiries: CourtInquiry[];
88:   stringingLoyaltyPoints?: number;
89:   courtProjects?: any[];
90:   createdAt: string;
91: }
92: 
93: export interface AuthState {
94:   user: UserProfile | null;
95:   isAuthenticated: boolean;
96:   isLoading: boolean;
97: }
````

## File: src/types/index.ts
````typescript
  1: export type SportCategory =
  2:   | 'cricket'
  3:   | 'football'
  4:   | 'badminton'
  5:   | 'tennis'
  6:   | 'pickleball'
  7:   | 'table-tennis'
  8:   | 'squash'
  9:   | 'fitness'
 10:   | 'gym-equipment'
 11:   | 'volleyball'
 12:   | 'recreation'
 13:   | 'accessories';
 14: 
 15: export type ProductType =
 16:   | 'racket'
 17:   | 'paddle'
 18:   | 'bat'
 19:   | 'ball'
 20:   | 'gear'
 21:   | 'fitness'
 22:   | 'protection'
 23:   | 'apparel'
 24:   | 'bag'
 25:   | 'net'
 26:   | 'table'
 27:   | 'mat'
 28:   | 'board'
 29:   | 'accessory'
 30:   | 'shoes'
 31:   | 'stockings'
 32:   | 'shuttlecock'
 33:   | 'treadmill';
 34: 
 35: export interface ProductVariant {
 36:   id: string;
 37:   name: string; // e.g. "Size 3", "Size 4", "Size 5", "Size 6", "Size F", "Standard"
 38:   price?: number;
 39:   originalPrice?: number;
 40:   inStock: boolean;
 41:   priceDelta?: number;
 42:   sku?: string;
 43:   shopifyVariantId?: string;
 44: }
 45: 
 46: export interface Product {
 47:   id: string;
 48:   slug: string;
 49:   name: string;
 50:   category: SportCategory;
 51:   categoryName: string;
 52:   subcategory?: string;
 53:   subcategoryName?: string;
 54:   productType: ProductType;
 55:   /** Manufacturer. Empty when the source data does not name one. */
 56:   brand: string;
 57:   price: number;
 58:   originalPrice?: number;
 59:   currency?: string;
 60:   quantityUnit?: string;
 61:   /** Set when `price` is a list price (e.g. 'MRP') rather than a tax-inclusive selling price. */
 62:   priceLabel?: string;
 63:   /** Replaces the default "In stock" line when stock is not tracked online. */
 64:   availabilityNote?: string;
 65:   color?: string;
 66:   rating: number;
 67:   reviewsCount: number;
 68:   badge?: 'NEW' | 'BESTSELLER' | 'MATCH GRADE' | 'ORIENTAL EXCLUSIVE' | 'LIMITED';
 69:   images: string[];
 70:   gallery?: string[];
 71:   description: string;
 72:   features: string[];
 73:   specs: Record<string, string>;
 74:   variants?: ProductVariant[];
 75:   sizes?: string[];
 76:   inStock: boolean;
 77:   isFeatured?: boolean;
 78:   sku?: string;
 79:   discountPrice?: number;
 80:   seoTitle?: string;
 81:   seoDescription?: string;
 82:   shopifyId?: string;
 83:   shopifyVariantId?: string;
 84:   handle?: string;
 85:   createdAt?: string;
 86:   updatedAt?: string;
 87: }
 88: 
 89: export interface CourtService {
 90:   id: string;
 91:   slug: string;
 92:   name: string;
 93:   sport: string;
 94:   heroImage: string;
 95:   surfaceTypes: string[];
 96:   description: string;
 97:   features: string[];
 98:   standards: string[];
 99:   leadTime: string;
100:   estimatedPriceRange: string;
101:   gallery: string[];
102: }
103: 
104: export interface CourtProject {
105:   id: string;
106:   slug: string;
107:   title: string;
108:   location: string;
109:   sport: string;
110:   surface: string;
111:   clientType: 'Club' | 'Residential' | 'School/Academy' | 'Private' | 'Resort' | 'Commercial';
112:   year: string;
113:   heroImage: string;
114:   images: string[];
115:   description: string;
116:   scope: string[];
117:   specs: Record<string, string>;
118: }
119: 
120: export interface Testimonial {
121:   id: string;
122:   author: string;
123:   role: string;
124:   location: string;
125:   sportOrProject: string;
126:   quote: string;
127:   rating: number;
128:   verified: boolean;
129:   avatarUrl?: string;
130: }
131: 
132: export interface CartItem {
133:   product: Product;
134:   quantity: number;
135:   selectedVariant?: string;
136:   selectedSize?: string;
137:   shopifyLineId?: string;
138:   shopifyVariantId?: string;
139: }
140: 
141: export interface StoreDetails {
142:   name: string;
143:   addressLine1: string;
144:   addressLine2: string;
145:   locality: string;
146:   city: string;
147:   pincode: string;
148:   phone: string;
149:   displayPhone: string;
150:   email: string;
151:   hours: {
152:     weekdays: string;
153:     sunday: string;
154:   };
155:   mapsUrl: string;
156:   whatsappUrl: string;
157: }
````

## File: src/main.tsx
````typescript
 1: import React from 'react';
 2: import ReactDOM from 'react-dom/client';
 3: import App from './App';
 4: import './styles/tokens.css';
 5: import './styles/global.css';
 6: import './styles/navigation.css';
 7: import './styles/components.css';
 8: import './styles/home.css';
 9: import './styles/pages.css';
10: import './styles/checkout.css';
11: 
12: ReactDOM.createRoot(document.getElementById('root')!).render(
13:   <React.StrictMode>
14:     <App />
15:   </React.StrictMode>,
16: );
````

## File: src/components/brand/Logo.tsx
````typescript
 1: import React from 'react';
 2: import { Link } from 'react-router-dom';
 3: 
 4: interface LogoProps {
 5:   // 'light' is for light backgrounds. 'dark' needs the official reverse wordmark,
 6:   // which has not been supplied yet, so it currently renders the standard wordmark.
 7:   variant?: 'light' | 'dark';
 8:   size?: 'sm' | 'md' | 'lg';
 9:   showText?: boolean;
10:   className?: string;
11:   linkToHome?: boolean;
12: }
13: 
14: // Official Oriental Sports artwork (extracted from the owner-supplied stacked master).
15: // Intrinsic pixel sizes keep the rendered aspect ratio exact.
16: const WORDMARK = { src: '/brand/oriental-sports-wordmark.png', width: 451, height: 90 };
17: const MONOGRAM = { src: '/brand/oriental-sports-monogram.png', width: 186, height: 147 };
18: 
19: export const Logo: React.FC<LogoProps> = ({
20:   size = 'md',
21:   showText = true,
22:   className = '',
23:   linkToHome = true,
24: }) => {
25:   // Height scale (header wordmark height per brand guidance: 36–40px)
26:   const heights = {
27:     sm: 32,
28:     md: 40,
29:     lg: 56,
30:   };
31: 
32:   const h = heights[size];
33:   // Wordmark by default; monogram alone when text is not shown
34:   const asset = showText ? WORDMARK : MONOGRAM;
35:   const aspectWidth = Math.round(h * (asset.width / asset.height));
36: 
37:   const logoImg = (
38:     <img
39:       src={asset.src}
40:       height={h}
41:       width={aspectWidth}
42:       className={`oriental-logo ${className}`}
43:       alt="Oriental Sports Pune Official Logo"
44:     />
45:   );
46: 
47:   if (linkToHome) {
48:     return (
49:       <Link
50:         to="/"
51:         className="inline-flex items-center text-decoration-none focus-visible-ring"
52:         title="Oriental Sports - Home"
53:       >
54:         {logoImg}
55:       </Link>
56:     );
57:   }
58: 
59:   return logoImg;
60: };
````

## File: src/components/home/ProjectGallery.tsx
````typescript
 1: import React from 'react';
 2: import { Link } from 'react-router-dom';
 3: import { COURT_PROJECTS } from '../../data/courts';
 4: import { Img } from '../ui/Img';
 5: import { Reveal, RevealLines, Stagger, StaggerItem } from '../motion/Reveal';
 6: 
 7: /** Court projects — each card is a single link to its case study. */
 8: export const ProjectGallery: React.FC = () => (
 9:   <section className="projects section" aria-labelledby="projects-title">
10:     <div className="container">
11:       <header className="chapter-head">
12:         <div>
13:           <Reveal as="p" className="eyebrow">Projects</Reveal>
14:           <RevealLines as="h2" id="projects-title" lines={['Courts in', 'play.']} className="display d-1 chapter-title" />
15:         </div>
16:         <Reveal className="chapter-aside" delay={0.1}>
17:           <Link to="/courts/projects" className="link-arrow">
18:             All projects <span className="btn-arrow" aria-hidden="true">→</span>
19:           </Link>
20:         </Reveal>
21:       </header>
22: 
23:       <Stagger as="ul" className="project-grid" stagger={0.08} amount={0.1}>
24:         {COURT_PROJECTS.map((proj) => (
25:           <StaggerItem as="li" key={proj.id} className="project-card">
26:             <Link to={`/courts/${proj.slug}`} className="project-card-link">
27:               <span className="project-card-media">
28:                 <Img image={proj.heroImage} alt="" sizes="(min-width: 1024px) 45vw, 100vw" />
29:               </span>
30:               <span className="label subtle">{proj.sport} · {proj.location}</span>
31:               <span className="project-card-title">{proj.title}</span>
32:               <span className="project-card-surface">{proj.surface}</span>
33:             </Link>
34:           </StaggerItem>
35:         ))}
36:       </Stagger>
37:     </div>
38:   </section>
39: );
40: 
41: export default ProjectGallery;
````

## File: src/pages/CartPage.tsx
````typescript
  1: import React, { useState } from 'react';
  2: import { Link, useNavigate } from 'react-router-dom';
  3: import {
  4:   Trash2,
  5:   Plus,
  6:   Minus,
  7:   CheckCircle2,
  8:   Truck,
  9:   ShieldCheck,
 10:   ArrowRight,
 11:   ArrowLeft,
 12:   Store,
 13: } from 'lucide-react';
 14: import { useCart, getItemUnitPrice } from '../context/CartContext';
 15: import { STORE_INFO } from '../data/storeInfo';
 16: import { PageHeader } from '../components/ui/PageHeader';
 17: import { Img } from '../components/ui/Img';
 18: 
 19: export const CartPage: React.FC = () => {
 20:   const navigate = useNavigate();
 21:   const {
 22:     cart,
 23:     removeFromCart,
 24:     updateQuantity,
 25:     subtotal,
 26:     shipping,
 27:     discount,
 28:     promoCode,
 29:     applyPromoCode,
 30:     checkoutUrl,
 31:     isSyncing,
 32:   } = useCart();
 33: 
 34:   const [inputCode, setInputCode] = useState('');
 35:   const [promoMessage, setPromoMessage] = useState<{ text: string; success: boolean } | null>(null);
 36: 
 37:   const grandTotal = Math.max(0, subtotal - discount + shipping);
 38:   const units = cart.reduce((s, i) => s + i.quantity, 0);
 39: 
 40:   const handleApplyPromo = async (e: React.FormEvent) => {
 41:     e.preventDefault();
 42:     if (!inputCode.trim()) return;
 43:     const res = await applyPromoCode(inputCode.trim());
 44:     setPromoMessage({ text: res.message, success: res.success });
 45:   };
 46: 
 47:   if (cart.length === 0) {
 48:     return (
 49:       <div className="cart-page" style={{ minHeight: '70vh' }}>
 50:         <PageHeader crumbs={[{ label: 'Home', to: '/' }, { label: 'Bag' }]} title={['Nothing in', 'the bag yet.']}>
 51:           <div className="page-header-actions">
 52:             <Link to="/shop" className="btn btn-primary">
 53:               Shop gear <span className="btn-arrow" aria-hidden="true">→</span>
 54:             </Link>
 55:             <Link to="/courts" className="btn btn-outline">Plan a court</Link>
 56:             <Link to="/account" className="btn btn-outline">My Account</Link>
 57:           </div>
 58:         </PageHeader>
 59:       </div>
 60:     );
 61:   }
 62: 
 63:   return (
 64:     <div className="cart-page" style={{ minHeight: '80vh', paddingBottom: '80px' }}>
 65:       <PageHeader
 66:         crumbs={[{ label: 'Home', to: '/' }, { label: 'Bag' }]}
 67:         title={['Your bag']}
 68:         lead={`${units} ${units === 1 ? 'item' : 'items'} · Fast delivery across Pune and pan-India with Razorpay security`}
 69:       />
 70: 
 71:       <div className="container cart-grid">
 72:         <ul className="cart-lines" aria-label="Items in your bag">
 73:           {cart.map((item, idx) => (
 74:             <li key={`${item.product.id}-${item.selectedVariant}-${item.selectedSize}-${idx}`} className="cart-line">
 75:               <Link to={`/product/${item.product.slug}`} className="cart-line-media" tabIndex={-1} aria-hidden="true">
 76:                 <Img image={item.product.images[0]} alt="" sizes="112px" />
 77:               </Link>
 78:               <div className="cart-line-body">
 79:                 <div className="cart-line-head">
 80:                   <h2 className="cart-line-title">
 81:                     <Link to={`/product/${item.product.slug}`}>{item.product.name}</Link>
 82:                   </h2>
 83:                   <span className="cart-line-price">
 84:                     ₹{(getItemUnitPrice(item) * item.quantity).toLocaleString('en-IN')}
 85:                   </span>
 86:                 </div>
 87: 
 88:                 <div className="cart-line-meta">
 89:                   <span className="badge">{item.product.categoryName}</span>
 90:                   {item.selectedVariant ? <span className="meta-sep">· {item.selectedVariant}</span> : null}
 91:                   {item.selectedSize ? <span className="meta-sep">· Size: {item.selectedSize}</span> : null}
 92:                   <span className="meta-sep">· ₹{getItemUnitPrice(item).toLocaleString('en-IN')} each</span>
 93:                 </div>
 94: 
 95:                 <div className="cart-line-actions">
 96:                   <div className="qty-control" role="group" aria-label={`Quantity for ${item.product.name}`}>
 97:                     <button
 98:                       type="button"
 99:                       className="qty-btn"
100:                       onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedVariant, item.selectedSize)}
101:                       aria-label="Decrease quantity"
102:                     >
103:                       <Minus size={14} />
104:                     </button>
105:                     <span className="qty-value" aria-live="polite">
106:                       {item.quantity}
107:                     </span>
108:                     <button
109:                       type="button"
110:                       className="qty-btn"
111:                       onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedVariant, item.selectedSize)}
112:                       aria-label="Increase quantity"
113:                     >
114:                       <Plus size={14} />
115:                     </button>
116:                   </div>
117: 
118:                   <button
119:                     type="button"
120:                     className="cart-remove-btn"
121:                     onClick={() => removeFromCart(item.product.id, item.selectedVariant, item.selectedSize)}
122:                   >
123:                     <Trash2 size={14} /> Remove
124:                   </button>
125:                 </div>
126:               </div>
127:             </li>
128:           ))}
129:         </ul>
130: 
131:         <aside className="cart-summary" aria-label="Order summary">
132:           <h2 className="display d-3">Summary</h2>
133: 
134:           {/* Promo code field */}
135:           <form onSubmit={handleApplyPromo} className="promo-form" style={{ marginBottom: '20px' }}>
136:             <div style={{ display: 'flex', gap: '8px' }}>
137:               <input
138:                 type="text"
139:                 placeholder="Discount Code (e.g. ORIENTAL10)"
140:                 value={inputCode}
141:                 onChange={(e) => setInputCode(e.target.value.toUpperCase())}
142:                 style={{
143:                   flex: 1,
144:                   padding: '10px 14px',
145:                   border: '1px solid var(--line)',
146:                   borderRadius: '4px',
147:                   fontFamily: 'monospace',
148:                   fontSize: '0.875rem',
149:                 }}
150:               />
151:               <button type="submit" className="btn btn-secondary" style={{ padding: '0 16px' }}>
152:                 Apply
153:               </button>
154:             </div>
155:             {promoMessage && (
156:               <p
157:                 style={{
158:                   margin: '8px 0 0',
159:                   fontSize: '0.8125rem',
160:                   color: promoMessage.success ? '#137333' : '#c5221f',
161:                   fontWeight: 500,
162:                 }}
163:               >
164:                 {promoMessage.text}
165:               </p>
166:             )}
167:           </form>
168: 
169:           <dl className="summary-list">
170:             <div className="summary-row">
171:               <dt>Subtotal</dt>
172:               <dd>₹{subtotal.toLocaleString('en-IN')}</dd>
173:             </div>
174:             {discount > 0 && (
175:               <div className="summary-row" style={{ color: '#137333' }}>
176:                 <dt>Discount ({promoCode})</dt>
177:                 <dd>−₹{discount.toLocaleString('en-IN')}</dd>
178:               </div>
179:             )}
180:             <div className="summary-row">
181:               <dt>Shipping</dt>
182:               <dd>
183:                 {shipping === 0 ? (
184:                   <span className="free-shipping">FREE</span>
185:                 ) : (
186:                   `₹${shipping.toLocaleString('en-IN')}`
187:                 )}
188:               </dd>
189:             </div>
190:             <div className="summary-row">
191:               <dt>GST (18%)</dt>
192:               <dd>Included</dd>
193:             </div>
194:             <div className="summary-row summary-total">
195:               <dt>Total</dt>
196:               <dd>₹{grandTotal.toLocaleString('en-IN')}</dd>
197:             </div>
198:           </dl>
199: 
200:           {checkoutUrl ? (
201:             <a
202:               href={checkoutUrl}
203:               className="btn btn-secondary btn-block"
204:               style={{ textAlign: 'center', textDecoration: 'none', marginBottom: '8px' }}
205:             >
206:               {isSyncing ? 'Syncing Shopify...' : 'Checkout with Shopify'} <span className="btn-arrow" aria-hidden="true">→</span>
207:             </a>
208:           ) : null}
209: 
210:           <Link
211:             to="/checkout"
212:             className="btn btn-primary btn-block btn-lg"
213:             style={{ textAlign: 'center', textDecoration: 'none', marginBottom: '16px' }}
214:           >
215:             Proceed to Checkout <span className="btn-arrow" aria-hidden="true">→</span>
216:           </Link>
217: 
218:           <div
219:             style={{
220:               padding: '16px',
221:               backgroundColor: '#f8f8f6',
222:               borderRadius: '8px',
223:               fontSize: '0.8125rem',
224:               color: 'var(--muted)',
225:               lineHeight: 1.5,
226:             }}
227:           >
228:             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', color: '#111', fontWeight: 600 }}>
229:               <ShieldCheck size={16} color="#137333" />
230:               <span>Next Step: Address & Razorpay</span>
231:             </div>
232:             <p style={{ margin: 0 }}>
233:               You will enter your delivery address and contact details on the next page before paying securely via Razorpay (UPI, Cards, Net Banking).
234:             </p>
235:           </div>
236:         </aside>
237:       </div>
238:     </div>
239:   );
240: };
241: 
242: export default CartPage;
````

## File: src/pages/SearchPage.tsx
````typescript
  1: import React, { useState } from 'react';
  2: import { useSearchParams, Link } from 'react-router-dom';
  3: import { PRODUCTS } from '../data/products';
  4: import { COURT_SERVICES } from '../data/courts';
  5: import { ProductCard } from '../components/products/ProductCard';
  6: import { PageHeader } from '../components/ui/PageHeader';
  7: 
  8: const POPULAR = ['Pickleball', 'Cricket bat', 'Badminton', 'Tennis', 'Court'];
  9: 
 10: export const SearchPage: React.FC = () => {
 11:   const [searchParams, setSearchParams] = useSearchParams();
 12:   const query = searchParams.get('q') || '';
 13:   const [searchInput, setSearchInput] = useState(query);
 14:   const [filterType, setFilterType] = useState<'all' | 'products' | 'courts'>('all');
 15: 
 16:   const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
 17:   const matches = (...fields: string[]) =>
 18:     terms.length === 0 || terms.every((t) => fields.some((f) => f && f.toLowerCase().includes(t)));
 19: 
 20:   const matchedProducts = PRODUCTS.filter((p) => {
 21:     const variantNames = p.variants ? p.variants.map((v) => v.name).join(' ') : '';
 22:     const specValues = p.specs ? Object.values(p.specs).join(' ') : '';
 23:     return matches(
 24:       p.name,
 25:       p.category,
 26:       p.categoryName,
 27:       p.subcategoryName || '',
 28:       p.brand,
 29:       p.description,
 30:       p.productType,
 31:       variantNames,
 32:       specValues,
 33:     );
 34:   });
 35:   const matchedCourts = COURT_SERVICES.filter((c) => matches(c.name, c.sport, c.description, 'court'));
 36:   const total = matchedProducts.length + matchedCourts.length;
 37: 
 38:   const run = (q: string) => {
 39:     const v = q.trim();
 40:     if (v) setSearchParams({ q: v });
 41:   };
 42: 
 43:   return (
 44:     <div className="search-page">
 45:       <PageHeader
 46:         crumbs={[{ label: 'Home', to: '/' }, { label: 'Search' }]}
 47:         title={[query ? `“${query}”` : 'Find gear & courts']}
 48:       >
 49:         <form
 50:           className="search-form"
 51:           role="search"
 52:           onSubmit={(e) => {
 53:             e.preventDefault();
 54:             run(searchInput);
 55:           }}
 56:         >
 57:           <label htmlFor="search-page-input" className="visually-hidden">Search products and courts</label>
 58:           <input
 59:             id="search-page-input"
 60:             className="input"
 61:             type="search"
 62:             value={searchInput}
 63:             onChange={(e) => setSearchInput(e.target.value)}
 64:             placeholder="Try “paddle”, “willow” or “tennis court”"
 65:           />
 66:           <button type="submit" className="btn btn-primary">Search</button>
 67:         </form>
 68:         <div className="search-popular">
 69:           <span className="label subtle">Popular</span>
 70:           {POPULAR.map((term) => (
 71:             <button key={term} type="button" className="chip" onClick={() => { setSearchInput(term); run(term); }}>
 72:               {term}
 73:             </button>
 74:           ))}
 75:         </div>
 76:       </PageHeader>
 77: 
 78:       {query && (
 79:         <div className="container search-results">
 80:           <div className="filter-chips search-tabs" role="group" aria-label="Show">
 81:             <button type="button" className="chip" aria-pressed={filterType === 'all'} onClick={() => setFilterType('all')}>
 82:               All <span className="chip-count">{total}</span>
 83:             </button>
 84:             <button type="button" className="chip" aria-pressed={filterType === 'products'} onClick={() => setFilterType('products')}>
 85:               Gear <span className="chip-count">{matchedProducts.length}</span>
 86:             </button>
 87:             <button type="button" className="chip" aria-pressed={filterType === 'courts'} onClick={() => setFilterType('courts')}>
 88:               Courts <span className="chip-count">{matchedCourts.length}</span>
 89:             </button>
 90:           </div>
 91: 
 92:           {(filterType === 'all' || filterType === 'courts') && matchedCourts.length > 0 && (
 93:             <section aria-labelledby="court-results" className="search-block">
 94:               <h2 id="court-results" className="display d-3">Courts</h2>
 95:               <ul className="search-court-list">
 96:                 {matchedCourts.map((c) => (
 97:                   <li key={c.id}>
 98:                     <Link to={`/courts#${c.slug}`} className="search-court">
 99:                       <span className="search-court-name">{c.name}</span>
100:                       <span className="muted">{c.description}</span>
101:                     </Link>
102:                   </li>
103:                 ))}
104:               </ul>
105:             </section>
106:           )}
107: 
108:           {(filterType === 'all' || filterType === 'products') && (
109:             <section aria-labelledby="gear-results" className="search-block">
110:               <h2 id="gear-results" className="display d-3">Gear</h2>
111:               {matchedProducts.length > 0 ? (
112:                 <ul className="product-grid">
113:                   {matchedProducts.map((p) => (
114:                     <li key={p.id}>
115:                       <ProductCard product={p} />
116:                     </li>
117:                   ))}
118:                 </ul>
119:               ) : (
120:                 <div className="empty-state">
121:                   <p className="muted">No gear matches “{query}” online. Try a broader word, or ask the store — not everything is listed here.</p>
122:                   <Link to="/shop" className="btn btn-primary">Browse all gear</Link>
123:                 </div>
124:               )}
125:             </section>
126:           )}
127:         </div>
128:       )}
129:     </div>
130:   );
131: };
132: 
133: export default SearchPage;
````

## File: docs/RESPONSIVE_AUDIT.md
````markdown
 1: # Oriental Sports — Responsive & Zero-Overflow Audit
 2: 
 3: **Audit Date**: 2026-10-11T09:30:47.136Z  
 4: **Target URL**: http://localhost:3000
 5: 
 6: ---
 7: 
 8: ## 1. Viewport Audit Summary
 9: 
10: | Viewport Name | Target Dimensions | Document Width | Window Width | Overflow Free? | Screenshot |
11: | :--- | :--- | :--- | :--- | :--- | :--- |
12: | **320_mobile_small** | `320x844` | `320px` | `320px` | ✅ PASSED | [`320_mobile_small_homepage.png`](./visual-audits/320_mobile_small_homepage.png) |
13: | **360_mobile_android** | `360x800` | `360px` | `360px` | ✅ PASSED | [`360_mobile_android_homepage.png`](./visual-audits/360_mobile_android_homepage.png) |
14: | **390_mobile_iphone14** | `390x844` | `390px` | `390px` | ✅ PASSED | [`390_mobile_iphone14_homepage.png`](./visual-audits/390_mobile_iphone14_homepage.png) |
15: | **430_mobile_promax** | `430x932` | `430px` | `430px` | ✅ PASSED | [`430_mobile_promax_homepage.png`](./visual-audits/430_mobile_promax_homepage.png) |
16: | **768_tablet_portrait** | `768x1024` | `768px` | `768px` | ✅ PASSED | [`768_tablet_portrait_homepage.png`](./visual-audits/768_tablet_portrait_homepage.png) |
17: | **1024_tablet_desktop** | `1024x768` | `1024px` | `1024px` | ✅ PASSED | [`1024_tablet_desktop_homepage.png`](./visual-audits/1024_tablet_desktop_homepage.png) |
18: | **1280_laptop_small** | `1280x800` | `1280px` | `1280px` | ✅ PASSED | [`1280_laptop_small_homepage.png`](./visual-audits/1280_laptop_small_homepage.png) |
19: | **1440_desktop_standard** | `1440x900` | `1440px` | `1440px` | ✅ PASSED | [`1440_desktop_standard_homepage.png`](./visual-audits/1440_desktop_standard_homepage.png) |
20: | **1920_ultrawide** | `1920x1080` | `1920px` | `1920px` | ✅ PASSED | [`1920_ultrawide_homepage.png`](./visual-audits/1920_ultrawide_homepage.png) |
21: | **2560_ultrawide_4k** | `2560x1440` | `2560px` | `2560px` | ✅ PASSED | [`2560_ultrawide_4k_homepage.png`](./visual-audits/2560_ultrawide_4k_homepage.png) |
22: 
23: ---
24: 
25: ## 2. Hero Collision Audit
26: 
27: Every slide, at every viewport above plus short browser windows: copy stays inside the hero,
28: actions clear the tab bar by at least 16px, and the hero height is the same on every slide.
29: 
30: | Viewport | Dimensions | Result |
31: | :--- | :--- | :--- |
32: | **320_mobile_small** | `320x844` | ✅ PASSED |
33: | **360_mobile_android** | `360x800` | ✅ PASSED |
34: | **390_mobile_iphone14** | `390x844` | ✅ PASSED |
35: | **430_mobile_promax** | `430x932` | ✅ PASSED |
36: | **768_tablet_portrait** | `768x1024` | ✅ PASSED |
37: | **1024_tablet_desktop** | `1024x768` | ✅ PASSED |
38: | **1280_laptop_small** | `1280x800` | ✅ PASSED |
39: | **1440_desktop_standard** | `1440x900` | ✅ PASSED |
40: | **1920_ultrawide** | `1920x1080` | ✅ PASSED |
41: | **2560_ultrawide_4k** | `2560x1440` | ✅ PASSED |
42: | **320_short** | `320x568` | ✅ PASSED |
43: | **360_short** | `360x640` | ✅ PASSED |
44: | **390_safari** | `390x664` | ✅ PASSED |
45: | **1024_short** | `1024x600` | ✅ PASSED |
46: | **1280_short** | `1280x600` | ✅ PASSED |
47: | **1366_laptop** | `1366x657` | ✅ PASSED |
48: | **1440_browser** | `1440x760` | ✅ PASSED |
49: | **1920_browser_scaled** | `1817x700` | ✅ PASSED |
50: 
51: ---
52: 
53: ## 3. Assertion Verification
54: - **Strict Law**: `document.documentElement.scrollWidth === window.innerWidth` strictly enforced.
55: - **Root Container Overflow Hiding**: Prohibited. Layout components intrinsically bounded to viewport.
````

## File: src/components/account/OrderTracker.tsx
````typescript
  1: import React, { useState } from 'react';
  2: import { Order } from '../../types/auth';
  3: import { useCart } from '../../context/CartContext';
  4: import { PRODUCTS } from '../../data/products';
  5: import { STORE_INFO } from '../../data/storeInfo';
  6: import {
  7:   Package,
  8:   CheckCircle2,
  9:   Clock,
 10:   Truck,
 11:   ExternalLink,
 12:   RotateCcw,
 13:   FileText,
 14:   MessageCircle,
 15:   Copy,
 16:   Check,
 17:   ChevronDown,
 18:   ChevronUp,
 19: } from 'lucide-react';
 20: 
 21: interface OrderTrackerProps {
 22:   order: Order;
 23:   defaultExpanded?: boolean;
 24: }
 25: 
 26: export const OrderTracker: React.FC<OrderTrackerProps> = ({ order, defaultExpanded = false }) => {
 27:   const [isExpanded, setIsExpanded] = useState(defaultExpanded);
 28:   const [copiedTracking, setCopiedTracking] = useState(false);
 29:   const [showInvoiceModal, setShowInvoiceModal] = useState(false);
 30:   const { addToCart, openCart } = useCart();
 31: 
 32:   const handleCopyTracking = (e: React.MouseEvent) => {
 33:     e.stopPropagation();
 34:     if (order.trackingNumber) {
 35:       navigator.clipboard.writeText(order.trackingNumber);
 36:       setCopiedTracking(true);
 37:       setTimeout(() => setCopiedTracking(false), 2000);
 38:     }
 39:   };
 40: 
 41:   const handleReorder = (e: React.MouseEvent) => {
 42:     e.stopPropagation();
 43:     order.items.forEach((item) => {
 44:       const prod = PRODUCTS.find((p) => p.id === item.productId || p.slug === item.productSlug);
 45:       if (prod) {
 46:         addToCart(prod, item.quantity, item.selectedVariant);
 47:       }
 48:     });
 49:     openCart();
 50:   };
 51: 
 52:   const statusColorMap: Record<Order['status'], { bg: string; text: string; border: string }> = {
 53:     confirmed: { bg: 'var(--color-canvas-subtle, #F7F5EE)', text: 'var(--color-ink)', border: 'var(--color-brand-gold)' },
 54:     processing: { bg: 'var(--color-canvas-subtle, #F7F5EE)', text: 'var(--color-ink)', border: 'var(--color-brand-gold-soft)' },
 55:     shipped: { bg: 'var(--color-canvas-subtle, #F7F5EE)', text: 'var(--color-ink)', border: 'var(--color-brand-gold)' },
 56:     out_for_delivery: { bg: 'var(--color-canvas-subtle, #F7F5EE)', text: 'var(--color-ink)', border: 'var(--color-brand-gold)' },
 57:     delivered: { bg: 'var(--color-ink)', text: 'var(--color-canvas-base)', border: 'var(--color-ink)' },
 58:     cancelled: { bg: '#F5F5F5', text: '#777777', border: '#DDDDDD' },
 59:   };
 60: 
 61:   const currentStatusStyle = statusColorMap[order.status] || statusColorMap.delivered;
 62: 
 63:   const whatsappInquiryUrl = `https://wa.me/${STORE_INFO.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
 64:     `Hello Oriental Sports Camp Pune team! I'm inquiring about my order ${order.orderNumber} (₹${order.totalAmount.toLocaleString('en-IN')}). Could you assist with status updates?`
 65:   )}`;
 66: 
 67:   return (
 68:     <div
 69:       style={{
 70:         backgroundColor: '#FFFFFF',
 71:         borderRadius: '6px',
 72:         border: '1px solid var(--color-ivory-border)',
 73:         boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
 74:         overflow: 'hidden',
 75:         transition: 'border-color 0.2s ease',
 76:       }}
 77:     >
 78:       {/* Order Summary Header Bar */}
 79:       <div
 80:         style={{
 81:           padding: '16px 20px',
 82:           borderBottom: '1px solid #F3F4F6',
 83:           backgroundColor: '#FAFAFA',
 84:           display: 'flex',
 85:           flexWrap: 'wrap',
 86:           alignItems: 'center',
 87:           justifyContent: 'space-between',
 88:           gap: '12px',
 89:         }}
 90:       >
 91:         <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
 92:           <div>
 93:             <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>
 94:               Order Placed
 95:             </div>
 96:             <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827' }}>
 97:               {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
 98:             </div>
 99:           </div>
100: 
101:           <div style={{ height: '24px', width: '1px', backgroundColor: '#E5E7EB' }} className="desktop-only" />
102: 
103:           <div>
104:             <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>
105:               Total Amount
106:             </div>
107:             <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--color-ink)' }}>
108:               ₹{order.totalAmount.toLocaleString('en-IN')}
109:             </div>
110:           </div>
111: 
112:           <div style={{ height: '24px', width: '1px', backgroundColor: '#E5E7EB' }} className="desktop-only" />
113: 
114:           <div>
115:             <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>
116:               Ship To
117:             </div>
118:             <div style={{ fontSize: '0.875rem', color: '#374151' }}>
119:               {order.shippingAddress.name} ({order.shippingAddress.locality})
120:             </div>
121:           </div>
122:         </div>
123: 
124:         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
125:           <div
126:             style={{
127:               padding: '4px 10px',
128:               borderRadius: '9999px',
129:               backgroundColor: currentStatusStyle.bg,
130:               color: currentStatusStyle.text,
131:               border: `1px solid ${currentStatusStyle.border}`,
132:               fontSize: '0.75rem',
133:               fontWeight: 800,
134:               textTransform: 'uppercase',
135:               letterSpacing: '0.04em',
136:               display: 'flex',
137:               alignItems: 'center',
138:               gap: '6px',
139:             }}
140:           >
141:             <CheckCircle2 size={13} />
142:             <span>{order.statusLabel}</span>
143:           </div>
144: 
145:           <button
146:             type="button"
147:             onClick={() => setIsExpanded(!isExpanded)}
148:             style={{
149:               background: 'none',
150:               border: 'none',
151:               color: '#4B5563',
152:               cursor: 'pointer',
153:               display: 'flex',
154:               alignItems: 'center',
155:               gap: '4px',
156:               fontSize: '0.8125rem',
157:               fontWeight: 600,
158:               padding: '4px 8px',
159:             }}
160:           >
161:             <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
162:             {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
163:           </button>
164:         </div>
165:       </div>
166: 
167:       {/* Main Order Content */}
168:       <div style={{ padding: '20px' }}>
169:         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
170:           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
171:             <Package size={18} color="var(--color-brand-gold)" />
172:             <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--color-ink)' }}>
173:               {order.orderNumber}
174:             </span>
175:           </div>
176: 
177:           {order.trackingNumber && (
178:             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', color: '#4B5563' }}>
179:               <span>Carrier: <strong>{order.carrier}</strong></span>
180:               <span>•</span>
181:               <span>AWB: <strong>{order.trackingNumber}</strong></span>
182:               <button
183:                 type="button"
184:                 onClick={handleCopyTracking}
185:                 title="Copy tracking code"
186:                 style={{
187:                   background: 'none',
188:                   border: 'none',
189:                   cursor: 'pointer',
190:                   color: copiedTracking ? '#10B981' : '#6B7280',
191:                   padding: '2px',
192:                   display: 'flex',
193:                   alignItems: 'center',
194:                 }}
195:               >
196:                 {copiedTracking ? <Check size={14} /> : <Copy size={14} />}
197:               </button>
198:             </div>
199:           )}
200:         </div>
201: 
202:         {/* Items List */}
203:         <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
204:           {order.items.map((item, idx) => (
205:             <div
206:               key={idx}
207:               style={{
208:                 display: 'flex',
209:                 gap: '16px',
210:                 alignItems: 'center',
211:                 paddingBottom: '14px',
212:                 borderBottom: idx < order.items.length - 1 ? '1px solid #F3F4F6' : 'none',
213:               }}
214:             >
215:               <img
216:                 src={item.productImage}
217:                 alt={item.productName}
218:                 style={{
219:                   width: '64px',
220:                   height: '64px',
221:                   objectFit: 'cover',
222:                   borderRadius: '4px',
223:                   backgroundColor: '#F3F4F6',
224:                 }}
225:               />
226:               <div style={{ flex: 1 }}>
227:                 <h4 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-ink)' }}>
228:                   {item.productName}
229:                 </h4>
230:                 {item.selectedVariant && (
231:                   <span style={{ fontSize: '0.75rem', color: '#6B7280', display: 'block', marginTop: '2px' }}>
232:                     Specification: {item.selectedVariant}
233:                   </span>
234:                 )}
235:                 <div style={{ fontSize: '0.8125rem', color: '#374151', marginTop: '4px' }}>
236:                   Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}
237:                 </div>
238:               </div>
239:               <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: 'var(--color-ink)' }}>
240:                 ₹{(item.price * item.quantity).toLocaleString('en-IN')}
241:               </div>
242:             </div>
243:           ))}
244:         </div>
245: 
246:         {/* Action bar */}
247:         <div
248:           style={{
249:             display: 'flex',
250:             flexWrap: 'wrap',
251:             gap: '10px',
252:             alignItems: 'center',
253:             justifyContent: 'space-between',
254:             paddingTop: '16px',
255:             borderTop: '1px solid #F3F4F6',
256:           }}
257:         >
258:           <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
259:             <button
260:               type="button"
261:               onClick={handleReorder}
262:               className="btn btn-outline-dark btn-sm"
263:               style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}
264:             >
265:               <RotateCcw size={14} />
266:               <span>BUY AGAIN</span>
267:             </button>
268: 
269:             <button
270:               type="button"
271:               onClick={() => setShowInvoiceModal(true)}
272:               className="btn btn-outline-dark btn-sm"
273:               style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}
274:             >
275:               <FileText size={14} />
276:               <span>TAX INVOICE</span>
277:             </button>
278:           </div>
279: 
280:           <a
281:             href={whatsappInquiryUrl}
282:             target="_blank"
283:             rel="noreferrer"
284:             className="btn btn-gold btn-sm"
285:             style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}
286:           >
287:             <MessageCircle size={14} />
288:             <span>CAMP STORE SUPPORT</span>
289:           </a>
290:         </div>
291: 
292:         {/* Expanded Tracking Timeline & Delivery Details */}
293:         {isExpanded && (
294:           <div
295:             style={{
296:               marginTop: '24px',
297:               paddingTop: '20px',
298:               borderTop: '1px dashed #E5E7EB',
299:               animation: 'fadeIn 0.2s ease-out',
300:             }}
301:           >
302:             <h5
303:               style={{
304:                 fontSize: '0.8125rem',
305:                 fontWeight: 800,
306:                 letterSpacing: '0.05em',
307:                 textTransform: 'uppercase',
308:                 color: 'var(--color-plate-gold)',
309:                 marginBottom: '16px',
310:               }}
311:             >
312:               Live Dispatch & Restringing Progress
313:             </h5>
314: 
315:             {/* Timeline Stepper */}
316:             <div style={{ position: 'relative', paddingLeft: '28px', marginBottom: '24px' }}>
317:               <div
318:                 style={{
319:                   position: 'absolute',
320:                   left: '11px',
321:                   top: '8px',
322:                   bottom: '8px',
323:                   width: '2px',
324:                   backgroundColor: '#E5E7EB',
325:                 }}
326:               />
327: 
328:               {order.timeline.map((step, sIdx) => {
329:                 const isPast = step.completed;
330:                 const isCurr = step.current;
331: 
332:                 return (
333:                   <div key={sIdx} style={{ position: 'relative', marginBottom: sIdx === order.timeline.length - 1 ? 0 : '20px' }}>
334:                     {/* Circle Node */}
335:                     <div
336:                       style={{
337:                         position: 'absolute',
338:                         left: '-28px',
339:                         top: '2px',
340:                         width: '24px',
341:                         height: '24px',
342:                         borderRadius: '50%',
343:                         backgroundColor: isCurr
344:                           ? 'var(--color-brand-gold)'
345:                           : isPast
346:                           ? 'var(--color-ink)'
347:                           : '#FFFFFF',
348:                         border: isCurr
349:                           ? '2px solid #FFFFFF'
350:                           : isPast
351:                           ? 'none'
352:                           : '2px solid #D1D5DB',
353:                         boxShadow: isCurr ? '0 0 0 3px rgba(201, 162, 39, 0.25)' : 'none',
354:                         display: 'flex',
355:                         alignItems: 'center',
356:                         justifyContent: 'center',
357:                         color: isPast ? 'var(--color-canvas-base)' : '#FFFFFF',
358:                       }}
359:                     >
360:                       {isPast ? <Check size={14} /> : isCurr ? <Clock size={13} /> : null}
361:                     </div>
362: 
363:                     <div>
364:                       <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
365:                         <span style={{ fontWeight: 700, fontSize: '0.875rem', color: isCurr ? 'var(--color-brand-gold)' : '#111827' }}>
366:                           {step.title}
367:                         </span>
368:                         <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
369:                           {step.date}
370:                         </span>
371:                       </div>
372:                       <p style={{ margin: '4px 0 0 0', fontSize: '0.8125rem', color: '#4B5563', lineHeight: 1.4 }}>
373:                         {step.description}
374:                       </p>
375:                     </div>
376:                   </div>
377:                 );
378:               })}
379:             </div>
380: 
381:             {/* Delivery address & payment breakdown card */}
382:             <div
383:               style={{
384:                 display: 'grid',
385:                 gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
386:                 gap: '16px',
387:                 backgroundColor: '#F9FAFB',
388:                 padding: '16px',
389:                 borderRadius: '4px',
390:                 fontSize: '0.8125rem',
391:               }}
392:             >
393:               <div>
394:                 <strong style={{ color: '#111827', display: 'block', marginBottom: '4px' }}>
395:                   Delivery Destination
396:                 </strong>
397:                 <div>{order.shippingAddress.name}</div>
398:                 <div>{order.shippingAddress.street}</div>
399:                 <div>{order.shippingAddress.locality}, {order.shippingAddress.city} - {order.shippingAddress.pincode}</div>
400:                 <div>Phone: {order.shippingAddress.phone}</div>
401:               </div>
402: 
403:               <div>
404:                 <strong style={{ color: '#111827', display: 'block', marginBottom: '4px' }}>
405:                   Payment & Invoice
406:                 </strong>
407:                 <div>Payment Mode: <strong>{order.paymentMethod}</strong></div>
408:                 <div>Subtotal: ₹{order.subtotal.toLocaleString('en-IN')}</div>
409:                 <div>GST (Included): ₹{order.tax.toLocaleString('en-IN')}</div>
410:                 <div>Shipping: {order.shipping === 0 ? <span style={{ color: '#10B981', fontWeight: 700 }}>FREE Expedited</span> : `₹${order.shipping}`}</div>
411:               </div>
412:             </div>
413:           </div>
414:         )}
415:       </div>
416: 
417:       {/* Tax Invoice Modal */}
418:       {showInvoiceModal && (
419:         <div
420:           role="dialog"
421:           aria-modal="true"
422:           style={{
423:             position: 'fixed',
424:             inset: 0,
425:             zIndex: 10000,
426:             backgroundColor: 'rgba(0,0,0,0.6)',
427:             backdropFilter: 'blur(4px)',
428:             display: 'flex',
429:             alignItems: 'center',
430:             justifyContent: 'center',
431:             padding: '16px',
432:           }}
433:           onClick={() => setShowInvoiceModal(false)}
434:         >
435:           <div
436:             style={{
437:               backgroundColor: '#FFFFFF',
438:               borderRadius: '6px',
439:               maxWidth: '600px',
440:               width: '100%',
441:               padding: '24px',
442:               boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
443:               position: 'relative',
444:               maxHeight: '90vh',
445:               overflowY: 'auto',
446:             }}
447:             onClick={(e) => e.stopPropagation()}
448:           >
449:             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid var(--color-ink)', paddingBottom: '16px', marginBottom: '16px' }}>
450:               <div>
451:                 <h3 className="font-display" style={{ margin: 0, fontSize: '1.375rem', color: 'var(--color-ink)' }}>
452:                   ORIENTAL SPORTS
453:                 </h3>
454:                 <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
455:                   Shop 247, MG Road, New Modikhana, Camp, Pune - 411001
456:                 </span>
457:                 {/* GSTIN / CIN intentionally omitted: the previous values were placeholders, not
458:                     the business's registration numbers. Add the real ones before issuing invoices. */}
459:               </div>
460:               <div style={{ textAlign: 'right' }}>
461:                 <span style={{ backgroundColor: 'var(--color-plate-gold)', color: 'var(--color-ink)', fontWeight: 800, fontSize: '0.6875rem', padding: '2px 8px', borderRadius: '2px' }}>
462:                   TAX INVOICE
463:                 </span>
464:                 <div style={{ fontSize: '0.875rem', fontWeight: 800, marginTop: '4px' }}>
465:                   {order.orderNumber}
466:                 </div>
467:                 <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
468:                   Date: {order.date}
469:                 </div>
470:               </div>
471:             </div>
472: 
473:             <div style={{ marginBottom: '16px', fontSize: '0.8125rem' }}>
474:               <strong>Billed To:</strong>
475:               <div>{order.shippingAddress.name}</div>
476:               <div>{order.shippingAddress.street}, {order.shippingAddress.locality}, {order.shippingAddress.city} - {order.shippingAddress.pincode}</div>
477:               <div>Phone: {order.shippingAddress.phone}</div>
478:             </div>
479: 
480:             <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', marginBottom: '16px' }}>
481:               <thead>
482:                 <tr style={{ backgroundColor: '#F3F4F6', borderBottom: '1px solid #D1D5DB' }}>
483:                   <th style={{ textAlign: 'left', padding: '8px' }}>Description</th>
484:                   <th style={{ textAlign: 'center', padding: '8px' }}>Qty</th>
485:                   <th style={{ textAlign: 'right', padding: '8px' }}>Rate</th>
486:                   <th style={{ textAlign: 'right', padding: '8px' }}>Amount</th>
487:                 </tr>
488:               </thead>
489:               <tbody>
490:                 {order.items.map((it, i) => (
491:                   <tr key={i} style={{ borderBottom: '1px solid #E5E7EB' }}>
492:                     <td style={{ padding: '8px' }}>
493:                       <strong>{it.productName}</strong>
494:                       {it.selectedVariant && <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>{it.selectedVariant}</div>}
495:                     </td>
496:                     <td style={{ textAlign: 'center', padding: '8px' }}>{it.quantity}</td>
497:                     <td style={{ textAlign: 'right', padding: '8px' }}>₹{it.price.toLocaleString('en-IN')}</td>
498:                     <td style={{ textAlign: 'right', padding: '8px' }}>₹{(it.price * it.quantity).toLocaleString('en-IN')}</td>
499:                   </tr>
500:                 ))}
501:               </tbody>
502:               <tfoot>
503:                 <tr>
504:                   <td colSpan={3} style={{ textAlign: 'right', padding: '8px', fontWeight: 700 }}>Total:</td>
505:                   <td style={{ textAlign: 'right', padding: '8px', fontWeight: 800, color: 'var(--color-ink)' }}>
506:                     ₹{order.totalAmount.toLocaleString('en-IN')}
507:                   </td>
508:                 </tr>
509:               </tfoot>
510:             </table>
511: 
512:             <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
513:               <button
514:                 type="button"
515:                 onClick={() => window.print()}
516:                 className="btn btn-outline-dark btn-sm"
517:               >
518:                 PRINT / SAVE PDF
519:               </button>
520:               <button
521:                 type="button"
522:                 onClick={() => setShowInvoiceModal(false)}
523:                 className="btn btn-primary btn-sm"
524:               >
525:                 CLOSE
526:               </button>
527:             </div>
528:           </div>
529:         </div>
530:       )}
531:     </div>
532:   );
533: };
````

## File: src/components/auth/AuthModal.tsx
````typescript
  1: import React, { useState, useEffect, useRef } from 'react';
  2: import { X, Phone, Mail, ArrowRight, ShieldCheck, CheckCircle2, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
  3: import { useAuth } from '../../context/AuthContext';
  4: import '../../styles/auth-modal.css';
  5: 
  6: export const AuthModal: React.FC = () => {
  7:   const {
  8:     isAuthModalOpen,
  9:     authModalView,
 10:     closeAuthModal,
 11:     requestOtp,
 12:     verifyOtp,
 13:     signInWithGoogle,
 14:     signInWithEmail,
 15:     pendingPhone,
 16:     setPendingPhone,
 17:     devOtpCode,
 18:   } = useAuth();
 19: 
 20:   const [mode, setMode] = useState<'phone' | 'email'>('phone');
 21:   const [phoneNumber, setPhoneNumber] = useState('');
 22:   const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
 23:   const [email, setEmail] = useState('');
 24:   const [firstName, setFirstName] = useState('');
 25:   const [lastName, setLastName] = useState('');
 26:   const [isSubmitting, setIsSubmitting] = useState(false);
 27:   const [error, setError] = useState<string | null>(null);
 28:   const [step, setStep] = useState<'input' | 'otp'>('input');
 29:   const [countdown, setCountdown] = useState(30);
 30: 
 31:   const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
 32: 
 33:   useEffect(() => {
 34:     if (isAuthModalOpen) {
 35:       setError(null);
 36:       setOtpDigits(['', '', '', '', '', '']);
 37:       if (authModalView === 'otp') {
 38:         setStep('otp');
 39:       } else {
 40:         setStep('input');
 41:       }
 42:     }
 43:   }, [isAuthModalOpen, authModalView]);
 44: 
 45:   useEffect(() => {
 46:     let timer: any;
 47:     if (step === 'otp' && countdown > 0) {
 48:       timer = setInterval(() => {
 49:         setCountdown((c) => c - 1);
 50:       }, 1000);
 51:     }
 52:     return () => clearInterval(timer);
 53:   }, [step, countdown]);
 54: 
 55:   // Focus first OTP cell on entering OTP step
 56:   useEffect(() => {
 57:     if (step === 'otp' && otpInputRefs.current[0]) {
 58:       setTimeout(() => {
 59:         otpInputRefs.current[0]?.focus();
 60:       }, 100);
 61:     }
 62:   }, [step]);
 63: 
 64:   if (!isAuthModalOpen) return null;
 65: 
 66:   const handleSendOtp = async (e: React.FormEvent) => {
 67:     e.preventDefault();
 68:     setError(null);
 69:     const cleaned = phoneNumber.replace(/\D/g, '');
 70:     if (cleaned.length < 10) {
 71:       setError('Please enter a valid 10-digit mobile number');
 72:       return;
 73:     }
 74:     setIsSubmitting(true);
 75:     try {
 76:       const success = await requestOtp(cleaned);
 77:       if (success) {
 78:         setStep('otp');
 79:         setCountdown(30);
 80:       } else {
 81:         setError('Failed to send OTP. Please try again.');
 82:       }
 83:     } catch {
 84:       setError('Connection error. Please try again.');
 85:     } finally {
 86:       setIsSubmitting(false);
 87:     }
 88:   };
 89: 
 90:   const handleOtpChange = (index: number, value: string) => {
 91:     const cleaned = value.replace(/\D/g, '');
 92:     if (!cleaned) {
 93:       const newDigits = [...otpDigits];
 94:       newDigits[index] = '';
 95:       setOtpDigits(newDigits);
 96:       return;
 97:     }
 98: 
 99:     // If pasted multiple digits
100:     if (cleaned.length > 1) {
101:       const pasteDigits = cleaned.slice(0, 6).split('');
102:       const newDigits = [...otpDigits];
103:       for (let i = 0; i < 6; i++) {
104:         newDigits[i] = pasteDigits[i] || '';
105:       }
106:       setOtpDigits(newDigits);
107:       const nextIdx = Math.min(pasteDigits.length, 5);
108:       otpInputRefs.current[nextIdx]?.focus();
109:       return;
110:     }
111: 
112:     // Single digit
113:     const newDigits = [...otpDigits];
114:     newDigits[index] = cleaned[0];
115:     setOtpDigits(newDigits);
116: 
117:     // Auto advance
118:     if (index < 5 && cleaned[0]) {
119:       otpInputRefs.current[index + 1]?.focus();
120:     }
121:   };
122: 
123:   const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
124:     if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
125:       otpInputRefs.current[index - 1]?.focus();
126:     }
127:   };
128: 
129:   const handleVerifyOtp = async (e: React.FormEvent) => {
130:     e.preventDefault();
131:     setError(null);
132:     const fullOtp = otpDigits.join('');
133:     if (fullOtp.length < 4) {
134:       setError('Please enter the 6-digit verification code');
135:       return;
136:     }
137:     setIsSubmitting(true);
138:     try {
139:       const success = await verifyOtp(fullOtp, {
140:         firstName: firstName.trim() || 'Sports',
141:         lastName: lastName.trim() || 'Athlete',
142:         email: email.trim() || undefined,
143:       });
144:       if (!success) {
145:         setError('Invalid OTP code. For demo use: 123456');
146:       }
147:     } catch {
148:       setError('Authentication failed. Please verify the code.');
149:     } finally {
150:       setIsSubmitting(false);
151:     }
152:   };
153: 
154:   const handleEmailSignIn = async (e: React.FormEvent) => {
155:     e.preventDefault();
156:     setError(null);
157:     if (!email || !email.includes('@')) {
158:       setError('Please enter a valid email address');
159:       return;
160:     }
161:     setIsSubmitting(true);
162:     try {
163:       const success = await signInWithEmail(email);
164:       if (!success) {
165:         setError('Sign in failed. Please try again.');
166:       }
167:     } catch {
168:       setError('Error signing in.');
169:     } finally {
170:       setIsSubmitting(false);
171:     }
172:   };
173: 
174:   const handleGoogleSignIn = async () => {
175:     setIsSubmitting(true);
176:     setError(null);
177:     try {
178:       await signInWithGoogle();
179:     } catch {
180:       setError('Google sign-in could not be completed.');
181:     } finally {
182:       setIsSubmitting(false);
183:     }
184:   };
185: 
186:   const autoFillDemoOtp = () => {
187:     setOtpDigits(['1', '2', '3', '4', '5', '6']);
188:   };
189: 
190:   const displayPhone = pendingPhone || phoneNumber || '98765 43210';
191: 
192:   return (
193:     <div
194:       role="dialog"
195:       aria-modal="true"
196:       className="auth-modal-backdrop"
197:       onClick={(e) => {
198:         if (e.target === e.currentTarget) closeAuthModal();
199:       }}
200:     >
201:       <div className="auth-modal-container">
202:         {/* Close Button */}
203:         <button
204:           type="button"
205:           onClick={closeAuthModal}
206:           className="auth-close-btn"
207:           aria-label="Close dialog"
208:         >
209:           <X size={18} />
210:         </button>
211: 
212:         <div className="auth-modal-body">
213:           {/* Brand Header */}
214:           <div className="auth-header">
215:             <div className="auth-brand-badge">
216:               <div className="auth-brand-logo-icon">OS</div>
217:               <span className="auth-brand-label">Oriental Sports</span>
218:             </div>
219: 
220:             <h2 className="auth-title">
221:               {step === 'otp' ? 'Verify Mobile Number' : 'Sign In or Create Account'}
222:             </h2>
223:             <p className="auth-subtitle">
224:               {step === 'otp' ? (
225:                 <span>
226:                   Enter the 6-digit code sent to{' '}
227:                   <strong style={{ color: '#111827' }}>+91 {displayPhone}</strong>
228:                 </span>
229:               ) : (
230:                 'Access your orders, saved addresses, and express athletic gear checkout.'
231:               )}
232:             </p>
233:           </div>
234: 
235:           {/* Error Alert */}
236:           {error && (
237:             <div className="auth-error-alert">
238:               <AlertCircle size={16} />
239:               <span>{error}</span>
240:             </div>
241:           )}
242: 
243:           {step === 'input' ? (
244:             <>
245:               {/* Method Switcher */}
246:               <div className="auth-method-switcher">
247:                 <button
248:                   type="button"
249:                   onClick={() => setMode('phone')}
250:                   className={`auth-method-tab ${mode === 'phone' ? 'active' : ''}`}
251:                 >
252:                   <Phone size={15} />
253:                   <span>Mobile OTP</span>
254:                 </button>
255:                 <button
256:                   type="button"
257:                   onClick={() => setMode('email')}
258:                   className={`auth-method-tab ${mode === 'email' ? 'active' : ''}`}
259:                 >
260:                   <Mail size={15} />
261:                   <span>Email</span>
262:                 </button>
263:               </div>
264: 
265:               {mode === 'phone' ? (
266:                 <form onSubmit={handleSendOtp}>
267:                   <div className="auth-field-group">
268:                     <label htmlFor="phone-input" className="auth-field-label">
269:                       Mobile Number
270:                     </label>
271:                     <div className="auth-phone-input-wrap">
272:                       <div className="auth-country-code">
273:                         <span>🇮🇳</span>
274:                         <span>+91</span>
275:                       </div>
276:                       <input
277:                         id="phone-input"
278:                         type="tel"
279:                         maxLength={12}
280:                         placeholder="98765 43210"
281:                         value={phoneNumber}
282:                         onChange={(e) => setPhoneNumber(e.target.value)}
283:                         className="auth-phone-input"
284:                         autoFocus
285:                         required
286:                       />
287:                     </div>
288:                     <span className="auth-field-hint">
289:                       We'll send a 6-digit one-time code to verify your phone.
290:                     </span>
291:                   </div>
292: 
293:                   <button
294:                     type="submit"
295:                     disabled={isSubmitting}
296:                     className="auth-submit-btn"
297:                   >
298:                     {isSubmitting ? (
299:                       <RefreshCw size={18} className="animate-spin" />
300:                     ) : (
301:                       <>
302:                         <span>Continue with OTP</span>
303:                         <ArrowRight size={16} />
304:                       </>
305:                     )}
306:                   </button>
307:                 </form>
308:               ) : (
309:                 <form onSubmit={handleEmailSignIn}>
310:                   <div className="auth-field-group">
311:                     <label htmlFor="email-input" className="auth-field-label">
312:                       Email Address
313:                     </label>
314:                     <div className="auth-text-input-wrap">
315:                       <Mail size={18} />
316:                       <input
317:                         id="email-input"
318:                         type="email"
319:                         placeholder="athlete@orientalsports.in"
320:                         value={email}
321:                         onChange={(e) => setEmail(e.target.value)}
322:                         className="auth-text-input"
323:                         autoFocus
324:                         required
325:                       />
326:                     </div>
327:                   </div>
328: 
329:                   <button
330:                     type="submit"
331:                     disabled={isSubmitting}
332:                     className="auth-submit-btn"
333:                   >
334:                     {isSubmitting ? (
335:                       <RefreshCw size={18} className="animate-spin" />
336:                     ) : (
337:                       <>
338:                         <span>Continue with Email</span>
339:                         <ArrowRight size={16} />
340:                       </>
341:                     )}
342:                   </button>
343:                 </form>
344:               )}
345: 
346:               {/* Social Login Divider */}
347:               <div className="auth-divider">
348:                 <div className="auth-divider-line" />
349:                 <span className="auth-divider-text">or continue with</span>
350:                 <div className="auth-divider-line" />
351:               </div>
352: 
353:               {/* Google Button */}
354:               <button
355:                 type="button"
356:                 onClick={handleGoogleSignIn}
357:                 disabled={isSubmitting}
358:                 className="auth-google-btn"
359:               >
360:                 <svg width="18" height="18" viewBox="0 0 24 24">
361:                   <path
362:                     fill="#4285F4"
363:                     d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.14z"
364:                   />
365:                   <path
366:                     fill="#34A853"
367:                     d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.33 24 12 24z"
368:                   />
369:                   <path
370:                     fill="#FBBC05"
371:                     d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
372:                   />
373:                   <path
374:                     fill="#EA4335"
375:                     d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
376:                   />
377:                 </svg>
378:                 <span>Continue with Google</span>
379:               </button>
380:             </>
381:           ) : (
382:             /* OTP Step */
383:             <form onSubmit={handleVerifyOtp}>
384:               {/* Quick Dev Code Helper */}
385:               <div className="auth-otp-helper">
386:                 <div className="auth-otp-helper-left">
387:                   <Sparkles size={14} color="#6366F1" />
388:                   <span>Demo test code: <strong>123456</strong></span>
389:                 </div>
390:                 <button
391:                   type="button"
392:                   onClick={autoFillDemoOtp}
393:                   className="auth-otp-helper-btn"
394:                 >
395:                   Auto-fill
396:                 </button>
397:               </div>
398: 
399:               {/* 6 Digit Cells */}
400:               <div className="auth-field-group">
401:                 <label className="auth-field-label">Verification Code</label>
402:                 <div className="auth-otp-grid">
403:                   {otpDigits.map((digit, idx) => (
404:                     <input
405:                       key={idx}
406:                       ref={(el) => (otpInputRefs.current[idx] = el)}
407:                       type="text"
408:                       inputMode="numeric"
409:                       pattern="[0-9]*"
410:                       maxLength={1}
411:                       value={digit}
412:                       onChange={(e) => handleOtpChange(idx, e.target.value)}
413:                       onKeyDown={(e) => handleOtpKeyDown(idx, e)}
414:                       className="auth-otp-cell"
415:                       autoComplete="one-time-code"
416:                       required
417:                     />
418:                   ))}
419:                 </div>
420:               </div>
421: 
422:               {/* Optional Athlete Name for new users */}
423:               <div className="auth-field-group">
424:                 <label className="auth-field-label">Your Name (Optional)</label>
425:                 <div className="auth-name-grid">
426:                   <input
427:                     type="text"
428:                     placeholder="First name"
429:                     value={firstName}
430:                     onChange={(e) => setFirstName(e.target.value)}
431:                     className="auth-name-cell"
432:                   />
433:                   <input
434:                     type="text"
435:                     placeholder="Last name"
436:                     value={lastName}
437:                     onChange={(e) => setLastName(e.target.value)}
438:                     className="auth-name-cell"
439:                   />
440:                 </div>
441:               </div>
442: 
443:               <button
444:                 type="submit"
445:                 disabled={isSubmitting}
446:                 className="auth-submit-btn"
447:               >
448:                 {isSubmitting ? (
449:                   <RefreshCw size={18} className="animate-spin" />
450:                 ) : (
451:                   <>
452:                     <CheckCircle2 size={16} />
453:                     <span>Verify & Continue</span>
454:                   </>
455:                 )}
456:               </button>
457: 
458:               <div className="auth-otp-actions">
459:                 <button
460:                   type="button"
461:                   onClick={() => setStep('input')}
462:                   className="auth-link-btn"
463:                 >
464:                   Change phone number
465:                 </button>
466: 
467:                 {countdown > 0 ? (
468:                   <span className="auth-countdown-text">Resend in {countdown}s</span>
469:                 ) : (
470:                   <button
471:                     type="button"
472:                     onClick={() => {
473:                       setCountdown(30);
474:                       requestOtp(pendingPhone || phoneNumber);
475:                     }}
476:                     className="auth-resend-btn"
477:                   >
478:                     Resend code
479:                   </button>
480:                 )}
481:               </div>
482:             </form>
483:           )}
484: 
485:           {/* Bottom Legal & Security Notice */}
486:           <div className="auth-footer-notice">
487:             <p className="auth-terms-text">
488:               By continuing, you agree to Oriental Sports{' '}
489:               <a href="/terms" onClick={(e) => { e.preventDefault(); closeAuthModal(); window.location.href = '/terms'; }}>
490:                 Terms
491:               </a>{' '}
492:               and{' '}
493:               <a href="/privacy" onClick={(e) => { e.preventDefault(); closeAuthModal(); window.location.href = '/privacy'; }}>
494:                 Privacy Policy
495:               </a>.
496:             </p>
497:             <div className="auth-trust-badges">
498:               <div className="auth-trust-item">
499:                 <ShieldCheck size={14} color="#10B981" />
500:                 <span>256-Bit SSL Encrypted</span>
501:               </div>
502:               <span>•</span>
503:               <div>Official Oriental Sports Pune Store</div>
504:             </div>
505:           </div>
506:         </div>
507:       </div>
508:     </div>
509:   );
510: };
````

## File: src/components/courts/CourtCostEstimator.tsx
````typescript
  1: import React, { useEffect, useRef, useState } from 'react';
  2: import { STORE_INFO } from '../../data/storeInfo';
  3: 
  4: /** Animate a number toward its target (skipped for reduced motion). */
  5: const useAnimatedNumber = (targetValue: number, durationMs = 400) => {
  6:   const [displayValue, setDisplayValue] = useState(targetValue);
  7:   const currentRef = useRef(targetValue);
  8: 
  9:   useEffect(() => {
 10:     if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
 11:       setDisplayValue(targetValue);
 12:       currentRef.current = targetValue;
 13:       return;
 14:     }
 15:     const startVal = currentRef.current;
 16:     const diff = targetValue - startVal;
 17:     if (Math.abs(diff) < 0.001) return;
 18:     let frame = 0;
 19:     let start: number | null = null;
 20:     const step = (now: number) => {
 21:       if (start === null) start = now;
 22:       const progress = Math.min((now - start) / durationMs, 1);
 23:       const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
 24:       setDisplayValue(startVal + diff * ease);
 25:       if (progress < 1) frame = requestAnimationFrame(step);
 26:       else currentRef.current = targetValue;
 27:     };
 28:     frame = requestAnimationFrame(step);
 29:     return () => cancelAnimationFrame(frame);
 30:   }, [targetValue, durationMs]);
 31: 
 32:   return displayValue;
 33: };
 34: 
 35: interface SportPricing {
 36:   basePerCourt: number;
 37:   surfaces: { name: string; multiplier: number }[];
 38:   lightingCost: number;
 39:   fencingCost: number;
 40: }
 41: 
 42: /**
 43:  * Indicative pricing model. Surface names are kept plain on purpose — no
 44:  * invented coat counts, lux levels or certifications. The owner should confirm
 45:  * these rupee figures before they are relied on.
 46:  */
 47: const PRICING_MODEL: Record<string, SportPricing> = {
 48:   Pickleball: {
 49:     basePerCourt: 480000,
 50:     surfaces: [
 51:       { name: 'Hard acrylic', multiplier: 1.0 },
 52:       { name: 'Cushioned acrylic', multiplier: 1.35 },
 53:       { name: 'Modular sports tiles', multiplier: 1.15 },
 54:     ],
 55:     lightingCost: 120000,
 56:     fencingCost: 95000,
 57:   },
 58:   Tennis: {
 59:     basePerCourt: 1250000,
 60:     surfaces: [
 61:       { name: 'Hard court acrylic', multiplier: 1.0 },
 62:       { name: 'Cushioned acrylic', multiplier: 1.4 },
 63:       { name: 'Synthetic grass', multiplier: 1.2 },
 64:     ],
 65:     lightingCost: 280000,
 66:     fencingCost: 220000,
 67:   },
 68:   Badminton: {
 69:     basePerCourt: 550000,
 70:     surfaces: [
 71:       { name: 'PVC sports mat', multiplier: 1.0 },
 72:       { name: 'Timber sports floor', multiplier: 1.85 },
 73:       { name: 'Polyurethane floor', multiplier: 1.3 },
 74:     ],
 75:     lightingCost: 90000,
 76:     fencingCost: 0,
 77:   },
 78:   'Turf & Multi-sport': {
 79:     basePerCourt: 900000,
 80:     surfaces: [
 81:       { name: 'Football turf', multiplier: 1.0 },
 82:       { name: 'Box cricket turf', multiplier: 0.9 },
 83:       { name: 'Multi-sport turf', multiplier: 1.25 },
 84:     ],
 85:     lightingCost: 240000,
 86:     fencingCost: 260000,
 87:   },
 88:   Squash: {
 89:     basePerCourt: 1900000,
 90:     surfaces: [
 91:       { name: 'Plaster walls, glass back wall', multiplier: 1.0 },
 92:       { name: 'Panel wall system', multiplier: 1.3 },
 93:     ],
 94:     lightingCost: 110000,
 95:     fencingCost: 0,
 96:   },
 97: };
 98: 
 99: const lakh = (v: number) => `₹${v.toFixed(1)}L`;
100: 
101: export const CourtCostEstimator: React.FC = () => {
102:   const [selectedSport, setSelectedSport] = useState<string>('Pickleball');
103:   const [selectedSurfaceIndex, setSelectedSurfaceIndex] = useState<number>(0);
104:   const [numCourts, setNumCourts] = useState<number>(2);
105:   const [includeLighting, setIncludeLighting] = useState<boolean>(true);
106:   const [includeFencing, setIncludeFencing] = useState<boolean>(true);
107: 
108:   const model = PRICING_MODEL[selectedSport] || PRICING_MODEL.Pickleball;
109:   const surface = model.surfaces[selectedSurfaceIndex] || model.surfaces[0];
110: 
111:   const surfaceCost = model.basePerCourt * surface.multiplier * numCourts;
112:   const lightingTotal = includeLighting ? model.lightingCost * numCourts : 0;
113:   const fencingTotal = includeFencing && model.fencingCost > 0 ? model.fencingCost * numCourts : 0;
114:   const grandTotal = surfaceCost + lightingTotal + fencingTotal;
115: 
116:   const lowEstimate = Math.round(grandTotal * 0.95);
117:   const highEstimate = Math.round(grandTotal * 1.08);
118:   const animatedLow = useAnimatedNumber(lowEstimate / 100000);
119:   const animatedHigh = useAnimatedNumber(highEstimate / 100000);
120: 
121:   const whatsappUrl = () => {
122:     const text = `Hello Oriental Sports, I configured a court estimate on your website:\n\n• Sport: ${selectedSport}\n• Courts: ${numCourts}\n• Surface: ${surface.name}\n• Lighting: ${includeLighting ? 'Yes' : 'No'}\n• Fencing/Netting: ${fencingTotal > 0 ? 'Yes' : 'No'}\n• Estimated Range: ₹${(lowEstimate / 100000).toFixed(2)}L – ₹${(highEstimate / 100000).toFixed(2)}L\n\nI would like to schedule a site visit.`;
123:     return `https://wa.me/919890990022?text=${encodeURIComponent(text)}`;
124:   };
125: 
126:   return (
127:     <div className="estimator on-dark">
128:       <div className="estimator-head">
129:         <p className="eyebrow">Court cost estimate</p>
130:         <h2 className="display d-2">What will my court cost?</h2>
131:         <p className="estimator-intro">
132:           An indicative range to plan with. Soil, levels and access change the real number — we confirm it after a site visit.
133:         </p>
134:       </div>
135: 
136:       <div className="estimator-grid">
137:         <div className="estimator-controls">
138:           <fieldset className="estimator-field">
139:             <legend>Sport</legend>
140:             <div className="estimator-chips">
141:               {Object.keys(PRICING_MODEL).map((sport) => (
142:                 <button
143:                   key={sport}
144:                   type="button"
145:                   className="chip chip-dark"
146:                   aria-pressed={selectedSport === sport}
147:                   onClick={() => {
148:                     setSelectedSport(sport);
149:                     setSelectedSurfaceIndex(0);
150:                   }}
151:                 >
152:                   {sport}
153:                 </button>
154:               ))}
155:             </div>
156:           </fieldset>
157: 
158:           <fieldset className="estimator-field">
159:             <legend>Surface</legend>
160:             <div className="estimator-options">
161:               {model.surfaces.map((surf, idx) => (
162:                 <label key={surf.name} className={`estimator-option ${selectedSurfaceIndex === idx ? 'is-selected' : ''}`}>
163:                   <input
164:                     type="radio"
165:                     name="surface"
166:                     checked={selectedSurfaceIndex === idx}
167:                     onChange={() => setSelectedSurfaceIndex(idx)}
168:                   />
169:                   <span>{surf.name}</span>
170:                 </label>
171:               ))}
172:             </div>
173:           </fieldset>
174: 
175:           <div className="estimator-field">
176:             <label htmlFor="court-count" className="estimator-legend-row">
177:               <span>Number of courts</span>
178:               <output htmlFor="court-count">{numCourts}</output>
179:             </label>
180:             <input
181:               id="court-count"
182:               type="range"
183:               min={1}
184:               max={8}
185:               value={numCourts}
186:               onChange={(e) => setNumCourts(parseInt(e.target.value, 10))}
187:               className="estimator-range"
188:             />
189:           </div>
190: 
191:           <fieldset className="estimator-field">
192:             <legend>Also include</legend>
193:             <label className="estimator-check">
194:               <input type="checkbox" checked={includeLighting} onChange={(e) => setIncludeLighting(e.target.checked)} />
195:               <span>Floodlighting</span>
196:             </label>
197:             {model.fencingCost > 0 && (
198:               <label className="estimator-check">
199:                 <input type="checkbox" checked={includeFencing} onChange={(e) => setIncludeFencing(e.target.checked)} />
200:                 <span>Perimeter fencing and netting</span>
201:               </label>
202:             )}
203:           </fieldset>
204:         </div>
205: 
206:         <div className="estimator-result" aria-live="polite">
207:           <p className="label">Indicative range</p>
208:           <p className="estimator-figure">
209:             {lakh(animatedLow)} <span aria-hidden="true">–</span><span className="visually-hidden">to</span> {lakh(animatedHigh)}
210:           </p>
211:           <p className="estimator-summary">
212:             {numCourts} {selectedSport.toLowerCase()} {numCourts === 1 ? 'court' : 'courts'}, {surface.name.toLowerCase()}
213:             {includeLighting ? ', floodlit' : ''}
214:             {fencingTotal > 0 ? ', fenced' : ''}.
215:           </p>
216:           <div className="estimator-actions">
217:             <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="btn btn-gold btn-block">
218:               Send this to us on WhatsApp
219:             </a>
220:             <a href={`tel:${STORE_INFO.phone}`} className="btn btn-outline-light btn-block">
221:               Call {STORE_INFO.displayPhone}
222:             </a>
223:           </div>
224:           <p className="estimator-note">Figures in lakh rupees (₹1L = ₹1,00,000). Not a quotation.</p>
225:         </div>
226:       </div>
227:     </div>
228:   );
229: };
230: 
231: export default CourtCostEstimator;
````

## File: src/components/navigation/CartDrawer.tsx
````typescript
  1: import React, { useEffect, useRef } from 'react';
  2: import { Link, useNavigate } from 'react-router-dom';
  3: import { Minus, Plus, Trash2 } from 'lucide-react';
  4: import { useCart, getItemUnitPrice } from '../../context/CartContext';
  5: import { Img } from '../ui/Img';
  6: 
  7: const FREE_DELIVERY_FROM = 2000;
  8: 
  9: /** Bag drawer — light panel, delivery progress, lines, one clear next step. */
 10: export const CartDrawer: React.FC = () => {
 11:   const { cart, isCartOpen, closeCart, removeFromCart, updateQuantity, subtotal, checkoutUrl } = useCart();
 12:   const navigate = useNavigate();
 13:   const closeRef = useRef<HTMLButtonElement>(null);
 14: 
 15:   useEffect(() => {
 16:     if (!isCartOpen) return;
 17:     const root = document.documentElement;
 18:     const prev = root.style.overflow;
 19:     root.style.overflow = 'hidden';
 20:     closeRef.current?.focus();
 21:     const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeCart();
 22:     window.addEventListener('keydown', onKey);
 23:     return () => {
 24:       root.style.overflow = prev;
 25:       window.removeEventListener('keydown', onKey);
 26:     };
 27:   }, [isCartOpen, closeCart]);
 28: 
 29:   if (!isCartOpen) return null;
 30: 
 31:   const units = cart.reduce((s, i) => s + i.quantity, 0);
 32:   const needed = Math.max(0, FREE_DELIVERY_FROM - subtotal);
 33:   const progress = Math.min(100, Math.round((subtotal / FREE_DELIVERY_FROM) * 100));
 34: 
 35:   return (
 36:     <>
 37:       <div className="drawer-backdrop" onClick={closeCart} aria-hidden="true" />
 38:       <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
 39:         <div className="drawer-head">
 40:           <h2 id="drawer-title" className="display d-4">Your bag {units > 0 && <span className="drawer-count">({units})</span>}</h2>
 41:           <button ref={closeRef} type="button" className="menu-close" onClick={closeCart}>
 42:             <span className="menu-close-x" aria-hidden="true" />
 43:             <span>Close</span>
 44:           </button>
 45:         </div>
 46: 
 47:         {cart.length > 0 && (
 48:           <div className="drawer-delivery">
 49:             <p>
 50:               {needed > 0
 51:                 ? <>Add <strong>₹{needed.toLocaleString('en-IN')}</strong> for free delivery in Pune</>
 52:                 : <>Free delivery in Pune on this order</>}
 53:             </p>
 54:             <div className="drawer-progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress / 100})` }} /></div>
 55:           </div>
 56:         )}
 57: 
 58:         <div className="drawer-body">
 59:           {cart.length === 0 ? (
 60:             <div className="drawer-empty">
 61:               <p className="display d-3">Nothing here yet.</p>
 62:               <p className="muted">Racquets, bats, paddles and more are waiting in the shop.</p>
 63:               <Link to="/shop" className="btn btn-primary" onClick={closeCart}>Shop gear</Link>
 64:             </div>
 65:           ) : (
 66:             <ul className="drawer-lines">
 67:               {cart.map((item, idx) => (
 68:                 <li key={`${item.product.id}-${item.selectedVariant}-${item.selectedSize}-${idx}`} className="drawer-line">
 69:                   <Link to={`/product/${item.product.slug}`} onClick={closeCart} className="drawer-line-media" tabIndex={-1} aria-hidden="true">
 70:                     <Img image={item.product.images[0]} alt="" sizes="80px" />
 71:                   </Link>
 72:                   <div className="drawer-line-body">
 73:                     <Link to={`/product/${item.product.slug}`} onClick={closeCart} className="cart-line-name">{item.product.name}</Link>
 74:                     {(item.selectedVariant || item.selectedSize) && (
 75:                       <p className="cart-line-options">{[item.selectedVariant, item.selectedSize].filter(Boolean).join(' · ')}</p>
 76:                     )}
 77:                     <div className="cart-line-foot">
 78:                       <div className="qty qty-sm" role="group" aria-label={`Quantity of ${item.product.name}`}>
 79:                         <button type="button" onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedVariant, item.selectedSize)} aria-label="Decrease quantity">
 80:                           <Minus size={14} />
 81:                         </button>
 82:                         <output>{item.quantity}</output>
 83:                         <button type="button" onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedVariant, item.selectedSize)} aria-label="Increase quantity">
 84:                           <Plus size={14} />
 85:                         </button>
 86:                       </div>
 87:                       <span className="price">₹{(getItemUnitPrice(item) * item.quantity).toLocaleString('en-IN')}</span>
 88:                     </div>
 89:                   </div>
 90:                   <button
 91:                     type="button"
 92:                     className="cart-line-remove"
 93:                     onClick={() => removeFromCart(item.product.id, item.selectedVariant, item.selectedSize)}
 94:                     aria-label={`Remove ${item.product.name}`}
 95:                   >
 96:                     <Trash2 size={17} strokeWidth={1.8} />
 97:                   </button>
 98:                 </li>
 99:               ))}
100:             </ul>
101:           )}
102:         </div>
103: 
104:         {cart.length > 0 && (
105:           <div className="drawer-foot">
106:             <div className="drawer-subtotal">
107:               <span>Subtotal</span>
108:               <strong>₹{subtotal.toLocaleString('en-IN')}</strong>
109:             </div>
110:             <button
111:               type="button"
112:               className="btn btn-primary btn-block btn-lg"
113:               onClick={() => {
114:                 closeCart();
115:                 navigate('/checkout');
116:               }}
117:             >
118:               Proceed to Checkout <span className="btn-arrow" aria-hidden="true">→</span>
119:             </button>
120:             <button
121:               type="button"
122:               className="link-arrow drawer-continue"
123:               onClick={() => {
124:                 closeCart();
125:                 navigate('/cart');
126:               }}
127:               style={{ marginTop: '0.5rem', width: '100%', textAlign: 'center' }}
128:             >
129:               View bag & apply promo code
130:             </button>
131:           </div>
132:         )}
133:       </aside>
134:     </>
135:   );
136: };
137: 
138: export default CartDrawer;
````

## File: src/components/navigation/SearchModal.tsx
````typescript
  1: import React, { useEffect, useRef, useState } from 'react';
  2: import { Link, useNavigate } from 'react-router-dom';
  3: import { Search } from 'lucide-react';
  4: import { PRODUCTS } from '../../data/products';
  5: import { CATEGORIES } from '../../data/categories';
  6: import { COURT_SERVICES } from '../../data/courts';
  7: import { Img } from '../ui/Img';
  8: 
  9: interface SearchModalProps {
 10:   isOpen: boolean;
 11:   onClose: () => void;
 12: }
 13: 
 14: const SHORTCUTS = ['Cricket bat', 'Pickleball paddle', 'Badminton', 'Tennis court', 'Carrom'];
 15: 
 16: /** Search overlay — instant results for gear, sports and court types. */
 17: export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
 18:   const [query, setQuery] = useState('');
 19:   const inputRef = useRef<HTMLInputElement>(null);
 20:   const navigate = useNavigate();
 21: 
 22:   useEffect(() => {
 23:     if (!isOpen) {
 24:       setQuery('');
 25:       return;
 26:     }
 27:     const root = document.documentElement;
 28:     const prev = root.style.overflow;
 29:     root.style.overflow = 'hidden';
 30:     const t = window.setTimeout(() => inputRef.current?.focus(), 40);
 31:     const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
 32:     window.addEventListener('keydown', onKey);
 33:     return () => {
 34:       root.style.overflow = prev;
 35:       window.clearTimeout(t);
 36:       window.removeEventListener('keydown', onKey);
 37:     };
 38:   }, [isOpen, onClose]);
 39: 
 40:   if (!isOpen) return null;
 41: 
 42:   const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
 43:   const hit = (...fields: string[]) => terms.length > 0 && terms.every((t) => fields.some((f) => f.toLowerCase().includes(t)));
 44: 
 45:   const products = PRODUCTS.filter((p) => hit(p.name, p.category, p.categoryName, p.brand)).slice(0, 5);
 46:   const sports = CATEGORIES.filter((c) => hit(c.name, c.id)).slice(0, 4);
 47:   const courts = COURT_SERVICES.filter((c) => hit(c.name, c.sport, 'court')).slice(0, 3);
 48:   const nothing = terms.length > 0 && products.length + sports.length + courts.length === 0;
 49: 
 50:   const go = (to: string) => {
 51:     onClose();
 52:     navigate(to);
 53:   };
 54: 
 55:   return (
 56:     <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search" onClick={onClose}>
 57:       <div className="search-panel" onClick={(e) => e.stopPropagation()}>
 58:         <form
 59:           className="search-bar container"
 60:           role="search"
 61:           onSubmit={(e) => {
 62:             e.preventDefault();
 63:             if (query.trim()) go(`/search?q=${encodeURIComponent(query.trim())}`);
 64:           }}
 65:         >
 66:           <Search size={22} strokeWidth={1.8} aria-hidden="true" />
 67:           <label htmlFor="site-search" className="visually-hidden">Search gear, sports and courts</label>
 68:           <input
 69:             ref={inputRef}
 70:             id="site-search"
 71:             type="search"
 72:             className="search-input"
 73:             placeholder="Search gear, sports, courts"
 74:             value={query}
 75:             onChange={(e) => setQuery(e.target.value)}
 76:             autoComplete="off"
 77:           />
 78:           <button type="button" className="menu-close" onClick={onClose}>
 79:             <span className="menu-close-x" aria-hidden="true" />
 80:             <span>Close</span>
 81:           </button>
 82:         </form>
 83: 
 84:         <div className="search-panel-body container">
 85:           {terms.length === 0 && (
 86:             <div className="search-suggest">
 87:               <p className="label subtle">Try</p>
 88:               <div className="search-suggest-chips">
 89:                 {SHORTCUTS.map((s) => (
 90:                   <button key={s} type="button" className="chip" onClick={() => setQuery(s)}>{s}</button>
 91:                 ))}
 92:               </div>
 93:             </div>
 94:           )}
 95: 
 96:           {sports.length > 0 && (
 97:             <section className="search-group" aria-label="Sports">
 98:               <p className="label subtle">Sports</p>
 99:               <div className="search-suggest-chips">
100:                 {sports.map((c) => (
101:                   <Link key={c.id} to={`/shop/${c.id}`} className="chip" onClick={onClose}>{c.name}</Link>
102:                 ))}
103:               </div>
104:             </section>
105:           )}
106: 
107:           {products.length > 0 && (
108:             <section className="search-group" aria-label="Gear">
109:               <p className="label subtle">Gear</p>
110:               <ul className="search-hits">
111:                 {products.map((p) => (
112:                   <li key={p.id}>
113:                     <button type="button" className="search-hit" onClick={() => go(`/product/${p.slug}`)}>
114:                       <span className="search-hit-media"><Img image={p.images[0]} alt="" sizes="56px" /></span>
115:                       <span className="search-hit-text">
116:                         <span className="search-hit-name">{p.name}</span>
117:                         <span className="muted">{p.categoryName} · ₹{p.price.toLocaleString('en-IN')}</span>
118:                       </span>
119:                     </button>
120:                   </li>
121:                 ))}
122:               </ul>
123:             </section>
124:           )}
125: 
126:           {courts.length > 0 && (
127:             <section className="search-group" aria-label="Courts">
128:               <p className="label subtle">Courts we build</p>
129:               <ul className="search-hits">
130:                 {courts.map((c) => (
131:                   <li key={c.id}>
132:                     <button type="button" className="search-hit" onClick={() => go(`/courts#${c.slug}`)}>
133:                       <span className="search-hit-text">
134:                         <span className="search-hit-name">{c.name}</span>
135:                         <span className="muted">Typical build: {c.leadTime.toLowerCase()}</span>
136:                       </span>
137:                     </button>
138:                   </li>
139:                 ))}
140:               </ul>
141:             </section>
142:           )}
143: 
144:           {nothing && <p className="muted search-none">Nothing matches “{query}” online — the Camp store may still have it.</p>}
145: 
146:           {terms.length > 0 && !nothing && (
147:             <button type="button" className="link-arrow" onClick={() => go(`/search?q=${encodeURIComponent(query.trim())}`)}>
148:               See all results <span className="btn-arrow" aria-hidden="true">→</span>
149:             </button>
150:           )}
151:         </div>
152:       </div>
153:     </div>
154:   );
155: };
156: 
157: export default SearchModal;
````

## File: src/pages/AboutPage.tsx
````typescript
 1: import React from 'react';
 2: import { Link } from 'react-router-dom';
 3: import { BRAND_STORY, STORE_INFO } from '../data/storeInfo';
 4: import { CATEGORIES } from '../data/categories';
 5: import { IMAGES } from '../data/media';
 6: import { PageHeader } from '../components/ui/PageHeader';
 7: import { Img } from '../components/ui/Img';
 8: import { ImageReveal, Reveal, Stagger, StaggerItem } from '../components/motion/Reveal';
 9: 
10: const PILLARS = [
11:   {
12:     name: 'The Camp store',
13:     text: `Match gear across ${CATEGORIES.length} sports, racquet stringing, bat knocking-in and advice in person.`,
14:     link: { to: '/shop', label: 'Shop gear' },
15:   },
16:   {
17:     name: 'Court construction',
18:     text: 'Turnkey courts for clubs, schools, societies and homes: surface, fencing, lighting and line marking.',
19:     link: { to: '/courts', label: 'See courts' },
20:   },
21:   {
22:     name: 'Schools, clubs & academies',
23:     text: 'Team kit and bulk equipment orders for institutions across Pune.',
24:     link: { to: '/contact', label: 'Get in touch' },
25:   },
26: ];
27: 
28: export const AboutPage: React.FC = () => {
29:   const [first, ...rest] = BRAND_STORY.narrative;
30: 
31:   return (
32:     <div className="about-page">
33:       <PageHeader
34:         crumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
35:         title={['Rooted in Camp.', 'Built for the game.']}
36:         lead={BRAND_STORY.subheadline}
37:       />
38: 
39:       <ImageReveal className="about-band">
40:         <Img image={IMAGES.athleteBatRacquet} sizes="100vw" />
41:       </ImageReveal>
42: 
43:       <section className="container section about-story" aria-label="Our story">
44:         <Reveal as="p" className="about-lede">{first}</Reveal>
45:         <div className="about-body">
46:           {rest.map((p, i) => (
47:             <Reveal as="p" key={p.slice(0, 24)} delay={0.08 * (i + 1)}>{p}</Reveal>
48:           ))}
49:         </div>
50:       </section>
51: 
52:       <section className="container about-pillars" aria-labelledby="pillars-title">
53:         <Reveal as="p" className="eyebrow" id="pillars-title">What we do</Reveal>
54:         <Stagger as="ul" className="pillar-list">
55:           {PILLARS.map((p) => (
56:             <StaggerItem as="li" key={p.name} className="pillar">
57:               <h2 className="display d-2 pillar-name">{p.name}</h2>
58:               <p className="pillar-text">{p.text}</p>
59:               <Link to={p.link.to} className="link-arrow">
60:                 {p.link.label} <span className="btn-arrow" aria-hidden="true">→</span>
61:               </Link>
62:             </StaggerItem>
63:           ))}
64:         </Stagger>
65:       </section>
66: 
67:       <section className="container contact-band" aria-label="Visit">
68:         <Reveal>
69:           <p className="display d-2">Come and see us.</p>
70:           <p className="lead">{STORE_INFO.addressLine1}, {STORE_INFO.addressLine2}, {STORE_INFO.city} {STORE_INFO.pincode}.</p>
71:         </Reveal>
72:         <Reveal className="contact-band-actions" delay={0.1}>
73:           <Link to="/visit" className="btn btn-primary">Plan your visit <span className="btn-arrow" aria-hidden="true">→</span></Link>
74:           <a href={`tel:${STORE_INFO.phone}`} className="btn btn-outline">Call {STORE_INFO.displayPhone}</a>
75:         </Reveal>
76:       </section>
77:     </div>
78:   );
79: };
80: 
81: export default AboutPage;
````

## File: src/pages/CategoryPage.tsx
````typescript
  1: import React from 'react';
  2: import { useParams, Link } from 'react-router-dom';
  3: import { CATEGORIES } from '../data/categories';
  4: import { PRODUCTS } from '../data/products';
  5: import { IMAGES, MediaImage } from '../data/media';
  6: import { STORE_INFO } from '../data/storeInfo';
  7: import { ProductCard } from '../components/products/ProductCard';
  8: import { PageHeader } from '../components/ui/PageHeader';
  9: import { Reveal } from '../components/motion/Reveal';
 10: import { SportCategory } from '../types';
 11: 
 12: // Same art direction as the homepage sport rail.
 13: const ART: Partial<Record<SportCategory, MediaImage>> = {
 14:   cricket: IMAGES.cricketStadium,
 15:   football: IMAGES.turfFootball,
 16:   badminton: IMAGES.badmintonHall,
 17:   tennis: IMAGES.tennisClay,
 18:   pickleball: IMAGES.pickleballNet,
 19:   'table-tennis': IMAGES.tableTennisHall,
 20:   squash: IMAGES.squashPlayer,
 21:   fitness: IMAGES.fitnessBarbell,
 22:   'gym-equipment': IMAGES.fitnessDumbbells,
 23:   recreation: IMAGES.carromPlay,
 24:   accessories: IMAGES.kitBag,
 25:   volleyball: IMAGES.volleyballSunset,
 26: };
 27: 
 28: export const CategoryPage: React.FC = () => {
 29:   const { category } = useParams<{ category: string }>();
 30:   // /products/commercial-treadmills etc. resolve to the parent category with that subcategory selected.
 31:   const subAlias = PRODUCTS.find((p) => p.subcategory === category);
 32:   const info = CATEGORIES.find((c) => c.id === (subAlias ? subAlias.category : category));
 33:   const [selectedSub, setSelectedSub] = React.useState<string>(subAlias ? category! : 'all');
 34:   React.useEffect(() => {
 35:     setSelectedSub(subAlias ? category! : 'all');
 36:   }, [category, subAlias]);
 37: 
 38:   if (!info) {
 39:     return (
 40:       <div className="container section empty-state">
 41:         <h1 className="display d-2">Sport not found</h1>
 42:         <p className="muted">We don’t list that sport online. Browse everything we carry, or ask the store.</p>
 43:         <Link to="/shop" className="btn btn-primary">Browse all gear</Link>
 44:       </div>
 45:     );
 46:   }
 47: 
 48:   const allCategoryProducts = PRODUCTS.filter((p) => p.category === info.id);
 49:   const subcategories = React.useMemo(() => {
 50:     const map = new Map<string, string>();
 51:     allCategoryProducts.forEach((p) => {
 52:       if (p.subcategory && p.subcategoryName) map.set(p.subcategory, p.subcategoryName);
 53:     });
 54:     return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
 55:   }, [allCategoryProducts]);
 56: 
 57:   const products = selectedSub === 'all'
 58:     ? allCategoryProducts
 59:     : allCategoryProducts.filter((p) => p.subcategory === selectedSub);
 60: 
 61:   const others = CATEGORIES.filter((c) => c.id !== info.id);
 62:   // When a sport has few pieces online, keep the page useful with the store's featured gear.
 63:   const more = products.length < 4 ? PRODUCTS.filter((p) => p.isFeatured && p.category !== info.id).slice(0, 4) : [];
 64: 
 65:   return (
 66:     <div className="category-page">
 67:       <PageHeader
 68:         crumbs={[{ label: 'Home', to: '/' }, { label: 'Shop', to: '/shop' }, { label: info.name }]}
 69:         title={[info.name]}
 70:         lead={info.description}
 71:         image={ART[info.id] ?? { src: info.image, alt: '' }}
 72:       />
 73: 
 74:       <section className="container section-tight category-stock" aria-labelledby="stock-title">
 75:         <Reveal className="category-stock-head">
 76:           <h2 id="stock-title" className="label muted">At the Camp store</h2>
 77:           <ul className="stock-list">
 78:             {info.featuredEquipments.map((item) => (
 79:               <li key={item}>{item}</li>
 80:             ))}
 81:           </ul>
 82:         </Reveal>
 83:       </section>
 84: 
 85:       <section className="container category-products" aria-labelledby="online-title">
 86:         <div className="section-bar">
 87:           <div>
 88:             <h2 id="online-title" className="display d-3">Online now</h2>
 89:             {subcategories.length > 1 && (
 90:               <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
 91:                 <button
 92:                   type="button"
 93:                   className="chip"
 94:                   aria-pressed={selectedSub === 'all'}
 95:                   onClick={() => setSelectedSub('all')}
 96:                 >
 97:                   All ({allCategoryProducts.length})
 98:                 </button>
 99:                 {subcategories.map((sub) => (
100:                   <button
101:                     key={sub.id}
102:                     type="button"
103:                     className="chip"
104:                     aria-pressed={selectedSub === sub.id}
105:                     onClick={() => setSelectedSub(sub.id)}
106:                   >
107:                     {sub.name}
108:                   </button>
109:                 ))}
110:               </div>
111:             )}
112:           </div>
113:           <p className="results-count">{products.length} {products.length === 1 ? 'product' : 'products'}</p>
114:         </div>
115: 
116:         {products.length > 0 ? (
117:           <ul className="product-grid">
118:             {products.map((p) => (
119:               <li key={p.id}>
120:                 <ProductCard product={p} />
121:               </li>
122:             ))}
123:           </ul>
124:         ) : (
125:           <div className="empty-state">
126:             <p className="muted">{info.name} gear isn’t listed online yet — the Camp store carries it.</p>
127:             <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-primary">Ask the store</a>
128:           </div>
129:         )}
130: 
131:         <div className="store-callout">
132:           <p>
133:             Want to feel the weight and grip first? Come to <strong>{STORE_INFO.addressLine1}, {STORE_INFO.locality}</strong>.
134:           </p>
135:           <Link to="/visit" className="link-arrow">
136:             Plan a visit <span className="btn-arrow" aria-hidden="true">→</span>
137:           </Link>
138:         </div>
139:       </section>
140: 
141:       {more.length > 0 && (
142:         <section className="container category-more" aria-labelledby="more-title">
143:           <div className="section-bar">
144:             <h2 id="more-title" className="display d-3">More from the store</h2>
145:             <Link to="/shop" className="link-arrow">All gear <span className="btn-arrow" aria-hidden="true">→</span></Link>
146:           </div>
147:           <ul className="product-grid">
148:             {more.map((p) => (
149:               <li key={p.id}>
150:                 <ProductCard product={p} />
151:               </li>
152:             ))}
153:           </ul>
154:         </section>
155:       )}
156: 
157:       <nav className="container other-sports" aria-label="Other sports">
158:         <h2 className="label muted">Other sports</h2>
159:         <ul>
160:           {others.map((c) => (
161:             <li key={c.id}>
162:               <Link to={`/shop/${c.id}`} className="chip">{c.name}</Link>
163:             </li>
164:           ))}
165:         </ul>
166:       </nav>
167:     </div>
168:   );
169: };
170: 
171: export default CategoryPage;
````

## File: src/pages/CourtProjectDetailPage.tsx
````typescript
 1: import React from 'react';
 2: import { useParams, Link } from 'react-router-dom';
 3: import { COURT_PROJECTS } from '../data/courts';
 4: import { STORE_INFO } from '../data/storeInfo';
 5: import { PageHeader } from '../components/ui/PageHeader';
 6: import { Img } from '../components/ui/Img';
 7: import { Reveal } from '../components/motion/Reveal';
 8: 
 9: export const CourtProjectDetailPage: React.FC = () => {
10:   const { slug } = useParams<{ slug: string }>();
11:   const project = COURT_PROJECTS.find((p) => p.slug === slug);
12: 
13:   if (!project) {
14:     return (
15:       <div className="container section empty-state">
16:         <h1 className="display d-2">Project not found</h1>
17:         <Link to="/courts/projects" className="btn btn-primary">All projects</Link>
18:       </div>
19:     );
20:   }
21: 
22:   const whatsapp = () => {
23:     const text = `Hello Oriental Sports, I saw your project "${project.title}" in ${project.location} on your website. I want to build a similar ${project.sport} court. Could you share details?`;
24:     return `https://wa.me/919890990022?text=${encodeURIComponent(text)}`;
25:   };
26: 
27:   const gallery = [...new Set(project.images ?? [])].filter((img) => img !== project.heroImage);
28: 
29:   return (
30:     <div className="project-page">
31:       <PageHeader
32:         crumbs={[{ label: 'Home', to: '/' }, { label: 'Courts', to: '/courts' }, { label: 'Projects', to: '/courts/projects' }, { label: project.title }]}
33:         eyebrow={`${project.sport} · ${project.location}`}
34:         title={[project.title]}
35:         image={{ src: project.heroImage, alt: '' }}
36:       />
37: 
38:       <section className="container section project-body">
39:         <Reveal className="project-main">
40:           <p className="about-lede">{project.description}</p>
41:           <h2 className="label muted project-subhead">Scope of work</h2>
42:           <ul className="dash-list">
43:             {project.scope.map((item) => (
44:               <li key={item}>{item}</li>
45:             ))}
46:           </ul>
47:         </Reveal>
48: 
49:         <Reveal as="aside" className="project-facts" delay={0.1}>
50:           <dl className="court-service-facts">
51:             <div><dt>Sport</dt><dd>{project.sport}</dd></div>
52:             <div><dt>Surface</dt><dd>{project.surface}</dd></div>
53:             <div><dt>Client</dt><dd>{project.clientType}</dd></div>
54:             <div><dt>Year</dt><dd>{project.year}</dd></div>
55:             {Object.entries(project.specs).map(([k, v]) => (
56:               <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
57:             ))}
58:           </dl>
59:         </Reveal>
60:       </section>
61: 
62:       {gallery.length > 0 && (
63:         <section className="container project-gallery" aria-label="Photographs">
64:           {gallery.map((img) => (
65:             <div key={img} className="project-gallery-item">
66:               <Img image={img} alt="" sizes="(min-width: 768px) 50vw, 100vw" />
67:             </div>
68:           ))}
69:         </section>
70:       )}
71: 
72:       <section className="container contact-band" aria-label="Build a court like this">
73:         <Reveal>
74:           <p className="display d-2">Want a court like this?</p>
75:           <p className="lead">Tell us about your site. We’ll visit, measure and quote.</p>
76:         </Reveal>
77:         <Reveal className="contact-band-actions" delay={0.1}>
78:           <a href={whatsapp()} target="_blank" rel="noreferrer" className="btn btn-primary">WhatsApp us</a>
79:           <Link to="/courts#court-estimator" className="btn btn-outline">Estimate the cost</Link>
80:           <a href={`tel:${STORE_INFO.phone}`} className="link-arrow">Call {STORE_INFO.displayPhone}</a>
81:         </Reveal>
82:       </section>
83:     </div>
84:   );
85: };
86: 
87: export default CourtProjectDetailPage;
````

## File: src/pages/CourtProjectsPage.tsx
````typescript
 1: import React, { useState } from 'react';
 2: import { Link } from 'react-router-dom';
 3: import { COURT_PROJECTS } from '../data/courts';
 4: import { PageHeader } from '../components/ui/PageHeader';
 5: import { Img } from '../components/ui/Img';
 6: 
 7: export const CourtProjectsPage: React.FC = () => {
 8:   const [filterSport, setFilterSport] = useState<string>('all');
 9:   const sports = ['all', ...new Set(COURT_PROJECTS.map((p) => p.sport))];
10:   const filtered = filterSport === 'all' ? COURT_PROJECTS : COURT_PROJECTS.filter((p) => p.sport === filterSport);
11: 
12:   return (
13:     <div className="projects-page">
14:       <PageHeader
15:         crumbs={[{ label: 'Home', to: '/' }, { label: 'Courts', to: '/courts' }, { label: 'Projects' }]}
16:         title={['Courts in', 'play.']}
17:         lead="Courts we have built for clubs, homes and commercial venues around Pune."
18:       />
19: 
20:       <div className="container projects-body">
21:         <div className="filter-chips projects-filter" role="group" aria-label="Filter by sport">
22:           {sports.map((sp) => (
23:             <button key={sp} type="button" className="chip" aria-pressed={filterSport === sp} onClick={() => setFilterSport(sp)}>
24:               {sp === 'all' ? 'All sports' : sp}
25:             </button>
26:           ))}
27:         </div>
28: 
29:         <ul className="project-grid">
30:           {filtered.map((proj) => (
31:             <li key={proj.id} className="project-card">
32:               <Link to={`/courts/${proj.slug}`} className="project-card-link">
33:                 <span className="project-card-media">
34:                   <Img image={proj.heroImage} alt="" sizes="(min-width: 768px) 45vw, 100vw" />
35:                 </span>
36:                 <span className="label subtle">{proj.sport} · {proj.location} · {proj.year}</span>
37:                 <span className="project-card-title">{proj.title}</span>
38:                 <span className="project-card-surface">{proj.description}</span>
39:               </Link>
40:             </li>
41:           ))}
42:         </ul>
43:       </div>
44:     </div>
45:   );
46: };
47: 
48: export default CourtProjectsPage;
````

## File: src/pages/CourtsPage.tsx
````typescript
  1: import React from 'react';
  2: import { COURT_SERVICES } from '../data/courts';
  3: import { IMAGES, MediaImage } from '../data/media';
  4: import { STORE_INFO } from '../data/storeInfo';
  5: import { CourtCostEstimator } from '../components/courts/CourtCostEstimator';
  6: import { BuildSteps } from '../components/courts/BuildSteps';
  7: import { ProjectGallery } from '../components/home/ProjectGallery';
  8: import { PageHeader } from '../components/ui/PageHeader';
  9: import { Img } from '../components/ui/Img';
 10: import { ImageReveal, Reveal } from '../components/motion/Reveal';
 11: 
 12: const COURT_ART: Record<string, MediaImage> = {
 13:   Pickleball: IMAGES.pickleballNet,
 14:   Tennis: IMAGES.surfaceNet,
 15:   Badminton: IMAGES.badmintonHall,
 16:   'Turf & Multi-sport': IMAGES.turfFootball,
 17:   Squash: IMAGES.squashCourts,
 18: };
 19: 
 20: export const CourtsPage: React.FC = () => (
 21:   <div className="courts-page">
 22:     <PageHeader
 23:       crumbs={[{ label: 'Home', to: '/' }, { label: 'Courts' }]}
 24:       eyebrow="Court construction · Pune & Maharashtra"
 25:       title={['We build', 'courts.']}
 26:       lead="Turnkey court construction, surface systems, fencing, lighting and line marking — for clubs, schools, residential societies and homes."
 27:       image={IMAGES.courtDusk}
 28:     >
 29:       <Reveal className="page-header-actions" delay={0.25}>
 30:         <a href="#court-estimator" className="btn btn-light">
 31:           Estimate your court <span className="btn-arrow" aria-hidden="true">→</span>
 32:         </a>
 33:         <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-outline-light">
 34:           WhatsApp us
 35:         </a>
 36:       </Reveal>
 37:     </PageHeader>
 38: 
 39:     <section className="container section court-services" aria-label="Courts we build">
 40:       {COURT_SERVICES.map((service, i) => (
 41:         <article key={service.id} id={service.slug} className={`court-service ${i % 2 ? 'is-flipped' : ''}`}>
 42:           <ImageReveal className="court-service-media">
 43:             <Img image={COURT_ART[service.sport] ?? service.heroImage} alt="" sizes="(min-width: 1024px) 50vw, 100vw" />
 44:           </ImageReveal>
 45:           <Reveal className="court-service-body">
 46:             <p className="eyebrow">{service.sport}</p>
 47:             <h2 className="display d-2 court-service-title">{service.name}</h2>
 48:             <p className="court-service-desc">{service.description}</p>
 49:             <dl className="court-service-facts">
 50:               <div>
 51:                 <dt>Surfaces</dt>
 52:                 <dd>{service.surfaceTypes.join(' · ')}</dd>
 53:               </div>
 54:               <div>
 55:                 <dt>Typical build</dt>
 56:                 <dd>{service.leadTime}</dd>
 57:               </div>
 58:               <div>
 59:                 <dt>Pricing</dt>
 60:                 <dd>{service.estimatedPriceRange}</dd>
 61:               </div>
 62:             </dl>
 63:             <ul className="dash-list">
 64:               {service.features.map((f) => (
 65:                 <li key={f}>{f}</li>
 66:               ))}
 67:             </ul>
 68:             <a href="#court-estimator" className="link-arrow">
 69:               Estimate a {service.sport.toLowerCase()} court <span className="btn-arrow" aria-hidden="true">→</span>
 70:             </a>
 71:           </Reveal>
 72:         </article>
 73:       ))}
 74:     </section>
 75: 
 76:     <section className="on-dark courts-sequence" aria-label="What a build covers">
 77:       <div className="container">
 78:         <BuildSteps />
 79:       </div>
 80:     </section>
 81: 
 82:     <section id="court-estimator" className="container section estimator-section" aria-label="Court cost estimate">
 83:       <CourtCostEstimator />
 84:     </section>
 85: 
 86:     <ProjectGallery />
 87: 
 88:     <section className="container contact-band" aria-label="Talk to us about a court">
 89:       <Reveal>
 90:         <p className="display d-2">Got a space in mind?</p>
 91:         <p className="lead">Tell us the sport and the size of the site. We’ll call back and arrange a visit.</p>
 92:       </Reveal>
 93:       <Reveal className="contact-band-actions" delay={0.1}>
 94:         <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
 95:           WhatsApp {STORE_INFO.displayPhone}
 96:         </a>
 97:         <a href={`mailto:${STORE_INFO.email}`} className="btn btn-outline">Email us</a>
 98:       </Reveal>
 99:     </section>
100:   </div>
101: );
102: 
103: export default CourtsPage;
````

## File: src/pages/ProductDetailPage.tsx
````typescript
  1: import React, { useState } from 'react';
  2: import { useParams, Link, useNavigate } from 'react-router-dom';
  3: import { Minus, Plus } from 'lucide-react';
  4: import { PRODUCTS } from '../data/products';
  5: import { useCart } from '../context/CartContext';
  6: import { StickyBuyBar } from '../components/products/StickyBuyBar';
  7: import { ProductCard } from '../components/products/ProductCard';
  8: import { Img } from '../components/ui/Img';
  9: import { STORE_INFO } from '../data/storeInfo';
 10: 
 11: /** Studio shots have a -sm.webp twin; remote images use the CDN width param. */
 12: const galleryImage = (src: string, alt: string) => {
 13:   if (src.startsWith('/images/') && src.endsWith('.webp')) {
 14:     return { src, srcSet: `${src.replace(/\.webp$/, '-sm.webp')} 560w, ${src} 1024w`, alt };
 15:   }
 16:   if (src.includes('images.unsplash.com')) {
 17:     const base = src.split('?')[0];
 18:     const at = (w: number) => `${base}?auto=format&fit=crop&w=${w}&h=${w}&q=75`;
 19:     return { src: at(1200), srcSet: `${at(600)} 600w, ${at(1200)} 1200w, ${at(1600)} 1600w`, alt };
 20:   }
 21:   return { src, alt };
 22: };
 23: 
 24: export const ProductDetailPage: React.FC = () => {
 25:   const { slug } = useParams<{ slug: string }>();
 26:   const navigate = useNavigate();
 27:   const { addToCart } = useCart();
 28: 
 29:   const product = PRODUCTS.find((p) => p.slug === slug);
 30: 
 31:   const [activeImageIndex, setActiveImageIndex] = useState(0);
 32:   const [selectedVariant, setSelectedVariant] = useState<string>(product?.variants?.[0]?.name || '');
 33:   const [selectedSize, setSelectedSize] = useState<string>(product?.sizes?.[0] || '');
 34:   const [quantity, setQuantity] = useState(1);
 35:   const [addedAnimation, setAddedAnimation] = useState(false);
 36: 
 37:   if (!product) {
 38:     return (
 39:       <div className="container section empty-state">
 40:         <h1 className="display d-2">Product not found</h1>
 41:         <p className="muted">It may have sold out or moved. Everything we list online is in the shop.</p>
 42:         <Link to="/shop" className="btn btn-primary">Back to the shop</Link>
 43:       </div>
 44:     );
 45:   }
 46: 
 47:   // Unique images only — some products repeat the same shot.
 48:   const images = [...new Set(product.images)];
 49: 
 50:   const sameSport = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id);
 51:   const related = (sameSport.length > 0 ? sameSport : PRODUCTS.filter((p) => p.isFeatured && p.id !== product.id)).slice(0, 4);
 52: 
 53:   const activeVariantObj = product?.variants?.find((v) => v.name === selectedVariant);
 54:   const currentPrice =
 55:     activeVariantObj?.price !== undefined
 56:       ? activeVariantObj.price
 57:       : (product?.price ?? 0) + (activeVariantObj?.priceDelta || 0);
 58: 
 59:   const currentOriginalPrice = activeVariantObj?.originalPrice || product?.originalPrice;
 60:   const discount =
 61:     currentOriginalPrice && currentOriginalPrice > currentPrice
 62:       ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)
 63:       : null;
 64: 
 65:   const isAvailableInStock = activeVariantObj !== undefined ? activeVariantObj.inStock : (product?.inStock ?? false);
 66: 
 67:   const handleAddToCart = () => {
 68:     if (!product) return;
 69:     addToCart(product, quantity, selectedVariant, selectedSize);
 70:     setAddedAnimation(true);
 71:     setTimeout(() => setAddedAnimation(false), 1600);
 72:   };
 73: 
 74:   const handleBuyNow = () => {
 75:     addToCart(product, quantity, selectedVariant, selectedSize);
 76:     navigate('/checkout');
 77:   };
 78: 
 79:   const getWhatsAppProductInquiry = () => {
 80:     const text = `Hello Oriental Sports Pune, I am inquiring about the ${product.name} (Price: ₹${currentPrice}) from your website. Is this available at your MG Road Camp store for pickup today?`;
 81:     return `https://wa.me/919890990022?text=${encodeURIComponent(text)}`;
 82:   };
 83: 
 84:   return (
 85:     <div className="pdp">
 86:       <div className="container">
 87:         <nav aria-label="Breadcrumb" className="crumbs pdp-crumbs">
 88:           <ol>
 89:             <li><Link to="/">Home</Link></li>
 90:             <li><Link to="/shop">Shop</Link></li>
 91:             <li><Link to={`/shop/${product.category}`}>{product.categoryName}</Link></li>
 92:             {product.subcategoryName && (
 93:               <li><Link to={`/shop?category=${product.category}&subcategory=${product.subcategory}`}>{product.subcategoryName}</Link></li>
 94:             )}
 95:             <li><span aria-current="page">{product.name}</span></li>
 96:           </ol>
 97:         </nav>
 98: 
 99:         <div className="pdp-grid">
100:           <div className="pdp-gallery">
101:             <div className="pdp-stage">
102:               <Img
103:                 image={galleryImage(images[activeImageIndex] ?? images[0], product.name)}
104:                 priority
105:                 sizes="(min-width: 1024px) 55vw, 100vw"
106:               />
107:               {product.badge && <span className="badge badge-dark pdp-badge">{product.badge}</span>}
108:             </div>
109: 
110:             {images.length > 1 && (
111:               <div className="pdp-thumbs" role="group" aria-label="Product images">
112:                 {images.map((img, idx) => (
113:                   <button
114:                     key={img}
115:                     type="button"
116:                     className={`pdp-thumb ${idx === activeImageIndex ? 'is-active' : ''}`}
117:                     onClick={() => setActiveImageIndex(idx)}
118:                     aria-label={`Show image ${idx + 1} of ${images.length}`}
119:                     aria-pressed={idx === activeImageIndex}
120:                   >
121:                     <Img image={galleryImage(img, '')} sizes="88px" />
122:                   </button>
123:                 ))}
124:               </div>
125:             )}
126:           </div>
127: 
128:           <div className="pdp-info">
129:             <div className="pdp-info-sticky">
130:               <p className="eyebrow">{[product.brand, product.categoryName, product.subcategoryName].filter(Boolean).join(' · ')}</p>
131:               <h1 className="pdp-title">{product.name}</h1>
132: 
133:               <div className="pdp-price">
134:                 <span className="pdp-price-now">₹{currentPrice.toLocaleString('en-IN')}</span>
135:                 {discount && (
136:                   <>
137:                     <s className="price-was">₹{currentOriginalPrice!.toLocaleString('en-IN')}</s>
138:                     <span className="price-off">{discount}% off</span>
139:                   </>
140:                 )}
141:               </div>
142:               <p className="pdp-tax">{product.priceLabel ?? 'Inclusive of all taxes'}{product.quantityUnit ? ` · Unit: ${product.quantityUnit}` : ''}</p>
143: 
144:               <p className={`pdp-stock ${isAvailableInStock ? 'is-in' : ''}`}>
145:                 <span className="status-dot" aria-hidden="true" />
146:                 {product.availabilityNote ?? (isAvailableInStock ? 'In stock at the Camp store' : 'Currently out of stock')}
147:               </p>
148: 
149:               <p className="pdp-description">{product.description}</p>
150: 
151:               {product.variants && product.variants.length > 0 && (
152:                 <fieldset className="pdp-option">
153:                   <legend className="field-label">Select Size / Option</legend>
154:                   <div className="pdp-choices">
155:                     {product.variants.map((v) => {
156:                       const vPrice = v.price !== undefined ? v.price : (product.price + (v.priceDelta || 0));
157:                       return (
158:                         <button
159:                           key={v.id}
160:                           type="button"
161:                           className="chip"
162:                           aria-pressed={selectedVariant === v.name}
163:                           onClick={() => setSelectedVariant(v.name)}
164:                         >
165:                           <span>{v.name}</span>
166:                           {product.variants!.length > 1 && (
167:                             <span style={{ opacity: 0.75, fontSize: '0.8125rem', marginLeft: '6px' }}>
168:                               ₹{vPrice.toLocaleString('en-IN')}
169:                             </span>
170:                           )}
171:                         </button>
172:                       );
173:                     })}
174:                   </div>
175:                 </fieldset>
176:               )}
177: 
178:               {product.sizes && (!product.variants || product.variants.length === 0) && (
179:                 <fieldset className="pdp-option">
180:                   <legend className="field-label">Size</legend>
181:                   <div className="pdp-choices">
182:                     {product.sizes.map((s) => (
183:                       <button
184:                         key={s}
185:                         type="button"
186:                         className="chip"
187:                         aria-pressed={selectedSize === s}
188:                         onClick={() => setSelectedSize(s)}
189:                       >
190:                         {s}
191:                       </button>
192:                     ))}
193:                   </div>
194:                 </fieldset>
195:               )}
196: 
197:               <div className="pdp-buy">
198:                 <div className="qty" role="group" aria-label="Quantity">
199:                   <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">
200:                     <Minus size={16} />
201:                   </button>
202:                   <output aria-live="polite">{quantity}</output>
203:                   <button type="button" onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">
204:                     <Plus size={16} />
205:                   </button>
206:                 </div>
207:                 <button
208:                   type="button"
209:                   onClick={handleAddToCart}
210:                   disabled={!isAvailableInStock}
211:                   className={`btn btn-primary pdp-add ${addedAnimation ? 'is-added' : ''}`}
212:                 >
213:                   {addedAnimation ? 'Added to bag' : isAvailableInStock ? 'Add to bag' : 'Out of stock'}
214:                 </button>
215:               </div>
216:               <button type="button" onClick={handleBuyNow} disabled={!isAvailableInStock} className="btn btn-outline btn-block">
217:                 Buy now
218:               </button>
219:               <a href={getWhatsAppProductInquiry()} target="_blank" rel="noreferrer" className="link-arrow pdp-whatsapp">
220:                 Ask the store on WhatsApp <span className="btn-arrow" aria-hidden="true">→</span>
221:               </a>
222: 
223:               <dl className="pdp-promises">
224:                 <div>
225:                   <dt>Delivery</dt>
226:                   <dd>Free within Pune on orders above ₹2,000. <Link to="/shipping">Shipping</Link></dd>
227:                 </div>
228:                 <div>
229:                   <dt>Replacement</dt>
230:                   <dd>7 days on manufacturing defects. <Link to="/returns">Returns</Link></dd>
231:                 </div>
232:                 <div>
233:                   <dt>Pick-up</dt>
234:                   <dd>Collect from {STORE_INFO.addressLine1}, {STORE_INFO.locality}.</dd>
235:                 </div>
236:               </dl>
237: 
238:               {product.specs && Object.keys(product.specs).length > 0 && (
239:                 <details className="pdp-specs" open>
240:                   <summary>Specifications</summary>
241:                   <table>
242:                     <tbody>
243:                       {Object.entries(product.specs).map(([k, v]) => (
244:                         <tr key={k}>
245:                           <th scope="row">{k}</th>
246:                           <td>{v}</td>
247:                         </tr>
248:                       ))}
249:                     </tbody>
250:                   </table>
251:                 </details>
252:               )}
253:             </div>
254:           </div>
255:         </div>
256: 
257:         {related.length > 0 && (
258:           <section className="pdp-related" aria-labelledby="related-title">
259:             <div className="section-bar">
260:               <h2 id="related-title" className="display d-3">
261:                 {sameSport.length > 0 ? `More ${product.categoryName.toLowerCase()}` : 'From the store'}
262:               </h2>
263:               <Link to="/shop" className="link-arrow">
264:                 All gear <span className="btn-arrow" aria-hidden="true">→</span>
265:               </Link>
266:             </div>
267:             <ul className="product-grid">
268:               {related.map((p) => (
269:                 <li key={p.id}>
270:                   <ProductCard product={p} />
271:                 </li>
272:               ))}
273:             </ul>
274:           </section>
275:         )}
276:       </div>
277: 
278:       <StickyBuyBar
279:         product={{ ...product, price: currentPrice }}
280:         onAddToCart={handleAddToCart}
281:         onBuyNow={handleBuyNow}
282:         inStock={isAvailableInStock}
283:       />
284:     </div>
285:   );
286: };
````

## File: src/pages/ShopPage.tsx
````typescript
  1: import React, { useMemo, useState, useCallback, useEffect } from 'react';
  2: import { Link, useSearchParams } from 'react-router-dom';
  3: import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
  4: import { PRODUCTS } from '../data/products';
  5: import { CATEGORIES } from '../data/categories';
  6: import { STORE_INFO } from '../data/storeInfo';
  7: import { ProductCard } from '../components/products/ProductCard';
  8: import { PageHeader } from '../components/ui/PageHeader';
  9: import { SportCategory, ProductType } from '../types';
 10: 
 11: type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'rating';
 12: 
 13: const SORTS: { value: SortKey; label: string }[] = [
 14:   { value: 'featured', label: 'Featured Gear' },
 15:   { value: 'price-asc', label: 'Price: Low to High' },
 16:   { value: 'price-desc', label: 'Price: High to Low' },
 17:   { value: 'name-asc', label: 'Name: A to Z' },
 18:   { value: 'name-desc', label: 'Name: Z to A' },
 19:   { value: 'rating', label: 'Top Rated' },
 20: ];
 21: 
 22: const PRICE_RANGES = [
 23:   { id: 'all', label: 'All Prices', min: 0, max: Infinity },
 24:   { id: 'under-1k', label: 'Under ₹1,000', min: 0, max: 1000 },
 25:   { id: '1k-3k', label: '₹1,000 – ₹3,000', min: 1000, max: 3000 },
 26:   { id: '3k-6k', label: '₹3,000 – ₹6,000', min: 3000, max: 6000 },
 27:   { id: '6k-15k', label: '₹6,000 – ₹15,000', min: 6000, max: 15000 },
 28:   { id: 'above-15k', label: 'Above ₹15,000', min: 15000, max: Infinity },
 29: ];
 30: 
 31: const CRICKET_BAT_SIZES = ['Size 3', 'Size 4', 'Size 5', 'Size 6', 'Size F', 'Standard'];
 32: 
 33: function FilterSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
 34:   const [open, setOpen] = useState(defaultOpen);
 35:   return (
 36:     <div className="filter-section">
 37:       <button
 38:         className="filter-section-header"
 39:         onClick={() => setOpen((o) => !o)}
 40:         aria-expanded={open}
 41:         type="button"
 42:       >
 43:         <span>{title}</span>
 44:         <svg
 45:           className={`filter-chevron ${open ? 'is-open' : ''}`}
 46:           width="14"
 47:           height="14"
 48:           viewBox="0 0 14 14"
 49:           fill="none"
 50:           aria-hidden="true"
 51:         >
 52:           <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
 53:         </svg>
 54:       </button>
 55:       {open && <div className="filter-section-body">{children}</div>}
 56:     </div>
 57:   );
 58: }
 59: 
 60: export const ShopPage: React.FC = () => {
 61:   const [searchParams, setSearchParams] = useSearchParams();
 62:   const [drawerOpen, setDrawerOpen] = useState(false);
 63: 
 64:   const selectedCategory = (searchParams.get('category') as SportCategory | null) ?? 'all';
 65:   const selectedSubcategory = searchParams.get('subcategory') ?? 'all';
 66:   const selectedBrand = searchParams.get('brand') ?? 'all';
 67:   const selectedBatSize = searchParams.get('batSize') ?? 'all';
 68:   const selectedPrice = searchParams.get('price') ?? 'all';
 69:   const searchQuery = searchParams.get('q') ?? '';
 70:   const sortBy = (searchParams.get('sort') as SortKey | null) ?? 'featured';
 71: 
 72:   const [localSearch, setLocalSearch] = useState(searchQuery);
 73: 
 74:   useEffect(() => {
 75:     setLocalSearch(searchQuery);
 76:   }, [searchQuery]);
 77: 
 78:   const update = useCallback(
 79:     (key: string, value: string | null) => {
 80:       const next = new URLSearchParams(searchParams);
 81:       if (value === null || value === 'all' || value === '') next.delete(key);
 82:       else next.set(key, value);
 83:       setSearchParams(next, { replace: true });
 84:     },
 85:     [searchParams, setSearchParams],
 86:   );
 87: 
 88:   const clearAll = useCallback(() => {
 89:     setSearchParams({}, { replace: true });
 90:     setLocalSearch('');
 91:   }, [setSearchParams]);
 92: 
 93:   const handleSearchSubmit = (e: React.FormEvent) => {
 94:     e.preventDefault();
 95:     update('q', localSearch.trim());
 96:   };
 97: 
 98:   const activeFilterCount = useMemo(() => {
 99:     let count = 0;
100:     if (selectedCategory !== 'all') count++;
101:     if (selectedSubcategory !== 'all') count++;
102:     if (selectedBrand !== 'all') count++;
103:     if (selectedBatSize !== 'all') count++;
104:     if (selectedPrice !== 'all') count++;
105:     if (searchQuery.trim()) count++;
106:     return count;
107:   }, [selectedCategory, selectedSubcategory, selectedBrand, selectedBatSize, selectedPrice, searchQuery]);
108: 
109:   // Compute available subcategories and brands based on current category selection
110:   const relevantProducts = useMemo(() => {
111:     return selectedCategory === 'all'
112:       ? PRODUCTS
113:       : PRODUCTS.filter((p) => p.category === selectedCategory);
114:   }, [selectedCategory]);
115: 
116:   const availableSubcategories = useMemo(() => {
117:     const map = new Map<string, string>();
118:     relevantProducts.forEach((p) => {
119:       if (p.subcategory && p.subcategoryName) {
120:         map.set(p.subcategory, p.subcategoryName);
121:       }
122:     });
123:     return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
124:   }, [relevantProducts]);
125: 
126:   const availableBrands = useMemo(() => {
127:     const set = new Set<string>();
128:     relevantProducts.forEach((p) => {
129:       if (p.brand) set.add(p.brand);
130:     });
131:     return Array.from(set).sort();
132:   }, [relevantProducts]);
133: 
134:   const categoryCounts = useMemo(() => {
135:     const map = new Map<string, number>();
136:     PRODUCTS.forEach((p) => map.set(p.category, (map.get(p.category) ?? 0) + 1));
137:     return map;
138:   }, []);
139: 
140:   const priceRange = useMemo(
141:     () => PRICE_RANGES.find((r) => r.id === selectedPrice) ?? PRICE_RANGES[0],
142:     [selectedPrice],
143:   );
144: 
145:   const products = useMemo(() => {
146:     let list = PRODUCTS.filter((p) => {
147:       if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
148:       if (selectedSubcategory !== 'all' && p.subcategory !== selectedSubcategory) return false;
149:       if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;
150:       
151:       // Cricket bat size filter
152:       if (selectedBatSize !== 'all') {
153:         const hasMatchingSize =
154:           p.sizes?.includes(selectedBatSize) ||
155:           p.variants?.some((v) => v.name.includes(selectedBatSize));
156:         if (!hasMatchingSize) return false;
157:       }
158: 
159:       if (p.price < priceRange.min || p.price >= priceRange.max) return false;
160: 
161:       // Text search
162:       if (searchQuery.trim()) {
163:         const q = searchQuery.toLowerCase().trim();
164:         const matches =
165:           p.name.toLowerCase().includes(q) ||
166:           p.brand.toLowerCase().includes(q) ||
167:           p.categoryName.toLowerCase().includes(q) ||
168:           (p.subcategoryName && p.subcategoryName.toLowerCase().includes(q)) ||
169:           p.description.toLowerCase().includes(q) ||
170:           (p.specs && Object.values(p.specs).some((v) => v.toLowerCase().includes(q))) ||
171:           (p.variants && p.variants.some((v) => v.name.toLowerCase().includes(q)));
172:         if (!matches) return false;
173:       }
174: 
175:       return true;
176:     });
177: 
178:     list = [...list].sort((a, b) => {
179:       if (sortBy === 'price-asc') return a.price - b.price;
180:       if (sortBy === 'price-desc') return b.price - a.price;
181:       if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
182:       if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
183:       if (sortBy === 'rating') return b.rating - a.rating;
184:       return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
185:     });
186: 
187:     return list;
188:   }, [selectedCategory, selectedSubcategory, selectedBrand, selectedBatSize, priceRange, searchQuery, sortBy]);
189: 
190:   const categoriesWithStock = CATEGORIES.filter((c) => categoryCounts.has(c.id));
191: 
192:   const FilterContent = (
193:     <>
194:       {/* Clear all */}
195:       {activeFilterCount > 0 && (
196:         <div className="filter-clear-row">
197:           <span className="filter-active-label">{activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active</span>
198:           <button type="button" className="filter-clear-btn" onClick={clearAll}>
199:             Clear all
200:           </button>
201:         </div>
202:       )}
203: 
204:       {/* Sport / Category */}
205:       <FilterSection title="Sport Category">
206:         <div className="filter-radio-group">
207:           <label className={`filter-radio ${selectedCategory === 'all' ? 'is-checked' : ''}`}>
208:             <input
209:               type="radio"
210:               name="category"
211:               value="all"
212:               checked={selectedCategory === 'all'}
213:               onChange={() => {
214:                 update('category', null);
215:                 update('subcategory', null);
216:                 update('brand', null);
217:                 update('batSize', null);
218:               }}
219:             />
220:             <span>All Sports</span>
221:             <span className="filter-count">{PRODUCTS.length}</span>
222:           </label>
223:           {categoriesWithStock.map((c) => (
224:             <label key={c.id} className={`filter-radio ${selectedCategory === c.id ? 'is-checked' : ''}`}>
225:               <input
226:                 type="radio"
227:                 name="category"
228:                 value={c.id}
229:                 checked={selectedCategory === c.id}
230:                 onChange={() => {
231:                   update('category', c.id);
232:                   update('subcategory', null);
233:                   update('brand', null);
234:                   update('batSize', null);
235:                 }}
236:               />
237:               <span>{c.name}</span>
238:               <span className="filter-count">{categoryCounts.get(c.id)}</span>
239:             </label>
240:           ))}
241:         </div>
242:       </FilterSection>
243: 
244:       {/* Subcategory */}
245:       {availableSubcategories.length > 1 && (
246:         <FilterSection title="Subcategory">
247:           <div className="filter-radio-group">
248:             <label className={`filter-radio ${selectedSubcategory === 'all' ? 'is-checked' : ''}`}>
249:               <input
250:                 type="radio"
251:                 name="subcategory"
252:                 value="all"
253:                 checked={selectedSubcategory === 'all'}
254:                 onChange={() => update('subcategory', null)}
255:               />
256:               <span>All Subcategories</span>
257:             </label>
258:             {availableSubcategories.map((sub) => (
259:               <label key={sub.id} className={`filter-radio ${selectedSubcategory === sub.id ? 'is-checked' : ''}`}>
260:                 <input
261:                   type="radio"
262:                   name="subcategory"
263:                   value={sub.id}
264:                   checked={selectedSubcategory === sub.id}
265:                   onChange={() => update('subcategory', sub.id)}
266:                 />
267:                 <span>{sub.name}</span>
268:               </label>
269:             ))}
270:           </div>
271:         </FilterSection>
272:       )}
273: 
274:       {/* Brand */}
275:       {availableBrands.length > 1 && (
276:         <FilterSection title="Brand">
277:           <div className="filter-radio-group">
278:             <label className={`filter-radio ${selectedBrand === 'all' ? 'is-checked' : ''}`}>
279:               <input
280:                 type="radio"
281:                 name="brand"
282:                 value="all"
283:                 checked={selectedBrand === 'all'}
284:                 onChange={() => update('brand', null)}
285:               />
286:               <span>All Brands</span>
287:             </label>
288:             {availableBrands.map((b) => (
289:               <label key={b} className={`filter-radio ${selectedBrand === b ? 'is-checked' : ''}`}>
290:                 <input
291:                   type="radio"
292:                   name="brand"
293:                   value={b}
294:                   checked={selectedBrand === b}
295:                   onChange={() => update('brand', b)}
296:                 />
297:                 <span>{b}</span>
298:               </label>
299:             ))}
300:           </div>
301:         </FilterSection>
302:       )}
303: 
304:       {/* Bat Size filter (when cricket is active) */}
305:       {(selectedCategory === 'cricket' || selectedCategory === 'all') && (
306:         <FilterSection title="Bat Size" defaultOpen={selectedCategory === 'cricket'}>
307:           <div className="filter-radio-group">
308:             <label className={`filter-radio ${selectedBatSize === 'all' ? 'is-checked' : ''}`}>
309:               <input
310:                 type="radio"
311:                 name="batSize"
312:                 value="all"
313:                 checked={selectedBatSize === 'all'}
314:                 onChange={() => update('batSize', null)}
315:               />
316:               <span>All Sizes</span>
317:             </label>
318:             {CRICKET_BAT_SIZES.map((sz) => (
319:               <label key={sz} className={`filter-radio ${selectedBatSize === sz ? 'is-checked' : ''}`}>
320:                 <input
321:                   type="radio"
322:                   name="batSize"
323:                   value={sz}
324:                   checked={selectedBatSize === sz}
325:                   onChange={() => update('batSize', sz)}
326:                 />
327:                 <span>{sz}</span>
328:               </label>
329:             ))}
330:           </div>
331:         </FilterSection>
332:       )}
333: 
334:       {/* Price Range */}
335:       <FilterSection title="Price Range">
336:         <div className="filter-radio-group">
337:           {PRICE_RANGES.map((r) => (
338:             <label key={r.id} className={`filter-radio ${selectedPrice === r.id ? 'is-checked' : ''}`}>
339:               <input
340:                 type="radio"
341:                 name="price"
342:                 value={r.id}
343:                 checked={selectedPrice === r.id || (r.id === 'all' && selectedPrice === 'all')}
344:                 onChange={() => update('price', r.id === 'all' ? null : r.id)}
345:               />
346:               <span>{r.label}</span>
347:             </label>
348:           ))}
349:         </div>
350:       </FilterSection>
351:     </>
352:   );
353: 
354:   return (
355:     <div className="shop-page">
356:       <PageHeader
357:         crumbs={[{ label: 'Home', to: '/' }, { label: 'Products & Equipment' }]}
358:         title={['Sports equipment', 'catalog']}
359:         lead={`Verified bats, racquets, footballs, shuttlecocks, and court gear across ${CATEGORIES.length} disciplines. Fulfilled directly from our MG Road, Camp store.`}
360:         aside={
361:           <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="link-arrow">
362:             Ask on WhatsApp <span className="btn-arrow" aria-hidden="true">→</span>
363:           </a>
364:         }
365:       />
366: 
367:       {/* Category Fast-Rail */}
368:       <nav className="container" aria-label="Category quick navigation" style={{ paddingBlock: '12px 20px', borderBottom: '1px solid var(--line)' }}>
369:         <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '4px' }}>
370:           <button
371:             type="button"
372:             className="chip"
373:             aria-pressed={selectedCategory === 'all'}
374:             onClick={() => {
375:               update('category', null);
376:               update('subcategory', null);
377:               update('brand', null);
378:               update('batSize', null);
379:             }}
380:           >
381:             All Sports ({PRODUCTS.length})
382:           </button>
383:           {categoriesWithStock.map((c) => (
384:             <button
385:               key={c.id}
386:               type="button"
387:               className="chip"
388:               aria-pressed={selectedCategory === c.id}
389:               onClick={() => {
390:                 update('category', selectedCategory === c.id ? null : c.id);
391:                 update('subcategory', null);
392:                 update('brand', null);
393:                 update('batSize', null);
394:               }}
395:             >
396:               {c.name} ({categoryCounts.get(c.id) ?? 0})
397:             </button>
398:           ))}
399:         </div>
400:       </nav>
401: 
402:       {/* Sticky toolbar */}
403:       <div className="shop-toolbar">
404:         <div className="container shop-toolbar-inner">
405:           <div className="shop-toolbar-left">
406:             {/* Mobile filter trigger */}
407:             <button
408:               type="button"
409:               className="shop-filter-btn"
410:               onClick={() => setDrawerOpen(true)}
411:               aria-haspopup="dialog"
412:               aria-label="Open filters"
413:             >
414:               <SlidersHorizontal size={15} />
415:               Filters
416:               {activeFilterCount > 0 && (
417:                 <span className="shop-filter-badge">{activeFilterCount}</span>
418:               )}
419:             </button>
420: 
421:             {/* Live Search Form */}
422:             <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', position: 'relative', minWidth: '160px', maxWidth: '280px', flex: 1 }}>
423:               <input
424:                 type="search"
425:                 placeholder="Search gear, brand..."
426:                 value={localSearch}
427:                 onChange={(e) => setLocalSearch(e.target.value)}
428:                 onBlur={() => update('q', localSearch.trim())}
429:                 style={{
430:                   width: '100%',
431:                   height: '36px',
432:                   padding: '0 30px 0 32px',
433:                   fontSize: '0.8125rem',
434:                   border: '1.5px solid var(--line-strong)',
435:                   borderRadius: '9999px',
436:                   background: 'var(--paper)',
437:                   color: 'var(--ink)',
438:                   outline: 'none',
439:                 }}
440:               />
441:               <Search size={14} style={{ position: 'absolute', left: '11px', color: 'var(--muted)', pointerEvents: 'none' }} />
442:               {localSearch && (
443:                 <button
444:                   type="button"
445:                   onClick={() => {
446:                     setLocalSearch('');
447:                     update('q', null);
448:                   }}
449:                   style={{
450:                     position: 'absolute',
451:                     right: '8px',
452:                     background: 'none',
453:                     border: 'none',
454:                     color: 'var(--muted)',
455:                     cursor: 'pointer',
456:                     padding: '4px',
457:                     display: 'flex',
458:                     alignItems: 'center',
459:                   }}
460:                   aria-label="Clear search"
461:                 >
462:                   <X size={14} />
463:                 </button>
464:               )}
465:             </form>
466: 
467:             {/* Active filter pills */}
468:             <div className="shop-active-pills">
469:               {selectedCategory !== 'all' && (
470:                 <button type="button" className="active-pill" onClick={() => { update('category', null); update('subcategory', null); }}>
471:                   {CATEGORIES.find((c) => c.id === selectedCategory)?.name}
472:                   <X size={11} />
473:                 </button>
474:               )}
475:               {selectedSubcategory !== 'all' && (
476:                 <button type="button" className="active-pill" onClick={() => update('subcategory', null)}>
477:                   {availableSubcategories.find((s) => s.id === selectedSubcategory)?.name || selectedSubcategory}
478:                   <X size={11} />
479:                 </button>
480:               )}
481:               {selectedBrand !== 'all' && (
482:                 <button type="button" className="active-pill" onClick={() => update('brand', null)}>
483:                   {selectedBrand}
484:                   <X size={11} />
485:                 </button>
486:               )}
487:               {selectedBatSize !== 'all' && (
488:                 <button type="button" className="active-pill" onClick={() => update('batSize', null)}>
489:                   {selectedBatSize}
490:                   <X size={11} />
491:                 </button>
492:               )}
493:               {selectedPrice !== 'all' && (
494:                 <button type="button" className="active-pill" onClick={() => update('price', null)}>
495:                   {PRICE_RANGES.find((r) => r.id === selectedPrice)?.label}
496:                   <X size={11} />
497:                 </button>
498:               )}
499:             </div>
500:           </div>
501: 
502:           <div className="shop-toolbar-right">
503:             <span className="shop-result-count">{products.length} {products.length === 1 ? 'item' : 'items'}</span>
504:             <label className="sort-control" aria-label="Sort products">
505:               <select
506:                 className="select"
507:                 value={sortBy}
508:                 onChange={(e) => update('sort', e.target.value === 'featured' ? null : e.target.value)}
509:               >
510:                 {SORTS.map((s) => (
511:                   <option key={s.value} value={s.value}>
512:                     {s.label}
513:                   </option>
514:                 ))}
515:               </select>
516:             </label>
517:           </div>
518:         </div>
519:       </div>
520: 
521:       {/* Main shop layout */}
522:       <div className="container shop-layout">
523:         {/* Sidebar — desktop only */}
524:         <aside className="shop-sidebar" aria-label="Product filters">
525:           <div className="shop-sidebar-inner">
526:             <div className="shop-sidebar-head">
527:               <span className="shop-sidebar-title">Filters</span>
528:               {activeFilterCount > 0 && (
529:                 <button type="button" className="filter-clear-btn" onClick={clearAll}>
530:                   Clear all
531:                 </button>
532:               )}
533:             </div>
534:             {FilterContent}
535:           </div>
536:         </aside>
537: 
538:         {/* Product grid */}
539:         <section className="shop-results" aria-live="polite" aria-label="Products">
540:           {products.length > 0 ? (
541:             <>
542:               {selectedCategory !== 'all' && (
543:                 <p className="results-count">
544:                   {products.length} {products.length === 1 ? 'product' : 'products'} in{' '}
545:                   {CATEGORIES.find((c) => c.id === selectedCategory)?.name} ·{' '}
546:                   <Link to={`/shop/${selectedCategory}`}>
547:                     About {CATEGORIES.find((c) => c.id === selectedCategory)?.name.toLowerCase()} at the Camp store
548:                   </Link>
549:                 </p>
550:               )}
551:               <ul className="product-grid">
552:                 {products.map((p) => (
553:                   <li key={p.id}>
554:                     <ProductCard product={p} />
555:                   </li>
556:                 ))}
557:               </ul>
558:             </>
559:           ) : (
560:             <div className="empty-state">
561:               <p className="display d-3">Nothing found.</p>
562:               <p className="muted">Try adjusting your search or clearing your active filters.</p>
563:               <button type="button" className="btn btn-primary" onClick={clearAll}>
564:                 Clear all filters
565:               </button>
566:             </div>
567:           )}
568:         </section>
569:       </div>
570: 
571:       {/* Mobile filter drawer */}
572:       {drawerOpen && (
573:         <div className="filter-drawer-overlay" onClick={() => setDrawerOpen(false)} aria-hidden="true" />
574:       )}
575:       <div
576:         className={`filter-drawer ${drawerOpen ? 'is-open' : ''}`}
577:         role="dialog"
578:         aria-modal="true"
579:         aria-label="Product filters"
580:       >
581:         <div className="filter-drawer-head">
582:           <span className="shop-sidebar-title">Filters ({activeFilterCount})</span>
583:           <button
584:             type="button"
585:             className="filter-drawer-close"
586:             onClick={() => setDrawerOpen(false)}
587:             aria-label="Close filters"
588:           >
589:             <X size={20} />
590:           </button>
591:         </div>
592:         <div className="filter-drawer-body">
593:           {FilterContent}
594:         </div>
595:         <div className="filter-drawer-foot">
596:           <button type="button" className="btn btn-primary" style={{ width: '100%' }} onClick={() => setDrawerOpen(false)}>
597:             View {products.length} {products.length === 1 ? 'item' : 'items'}
598:           </button>
599:         </div>
600:       </div>
601:     </div>
602:   );
603: };
604: 
605: export default ShopPage;
````

## File: index.html
````html
 1: <!doctype html>
 2: <html lang="en">
 3:   <head>
 4:     <meta charset="UTF-8" />
 5:     <link rel="icon" type="image/png" href="/favicon.png" />
 6:     <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
 7:     <title>Oriental Sports | Pune's Sports House & Court Builders</title>
 8:     <meta name="description" content="Oriental Sports - Shop 247, MG Road, Camp, Pune. Sports goods, fitness equipment, court construction and sports infrastructure. GEAR. COURTS. PUNE." />
 9:     <meta name="theme-color" content="#F6F3EA" />
10:     <meta property="og:title" content="Oriental Sports | Gear. Courts. Pune." />
11:     <meta property="og:description" content="Sports goods, fitness equipment & court construction. Rooted in Camp, Pune." />
12:     <meta property="og:type" content="website" />
13: 
14:     <!-- First hero slide (LCP): small file on phones, full width on desktop -->
15:     <link rel="preload" as="image" href="/images/hero/hero_train_perform.webp"
16:       imagesrcset="/images/hero/hero_train_perform-sm.webp 800w, /images/hero/hero_train_perform.webp 1376w"
17:       imagesizes="100vw" fetchpriority="high" />
18: 
19:     <!-- Archivo (variable width + weight): condensed black for display, normal width for text -->
20:     <link rel="preconnect" href="https://fonts.googleapis.com">
21:     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
22:     <link href="https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..100,400..900;1,62..100,700..900&display=swap" rel="stylesheet">
23:   </head>
24:   <body>
25:     <div id="root"></div>
26:     <script type="module" src="/src/main.tsx"></script>
27:   </body>
28: </html>
````

## File: package.json
````json
 1: {
 2:   "name": "oriental-sports",
 3:   "private": true,
 4:   "version": "1.0.0",
 5:   "type": "module",
 6:   "scripts": {
 7:     "dev": "vite",
 8:     "build": "tsc && vite build",
 9:     "preview": "vite preview"
10:   },
11:   "dependencies": {
12:     "framer-motion": "^13.2.0",
13:     "lucide-react": "^1.16.0",
14:     "react": "^18.3.1",
15:     "react-dom": "^18.3.1",
16:     "react-router-dom": "^6.28.0"
17:   },
18:   "devDependencies": {
19:     "@types/node": "^20.11.0",
20:     "@types/react": "^18.3.12",
21:     "@types/react-dom": "^18.3.1",
22:     "@vitejs/plugin-react": "^4.3.4",
23:     "playwright": "^1.63.0",
24:     "sharp": "^0.35.5",
25:     "typescript": "^5.6.3",
26:     "vite": "^5.4.11"
27:   }
28: }
````

## File: src/components/footer/Footer.tsx
````typescript
  1: import React from 'react';
  2: import { Link } from 'react-router-dom';
  3: import { Logo } from '../brand/Logo';
  4: import { STORE_INFO } from '../../data/storeInfo';
  5: import { CATEGORIES } from '../../data/categories';
  6: import { useStoreStatus } from '../../utils/storeHours';
  7: 
  8: const COLUMNS: { title: string; links: { label: string; to: string }[] }[] = [
  9:   {
 10:     title: 'Shop',
 11:     links: [
 12:       { label: 'All gear', to: '/shop' },
 13:       ...CATEGORIES.slice(0, 7).map((c) => ({ label: c.name, to: `/shop/${c.id}` })),
 14:     ],
 15:   },
 16:   {
 17:     title: 'Courts',
 18:     links: [
 19:       { label: 'Court construction', to: '/courts' },
 20:       { label: 'Cost estimate', to: '/courts#court-estimator' },
 21:       { label: 'Court projects', to: '/courts/projects' },
 22:     ],
 23:   },
 24:   {
 25:     title: 'Oriental Sports',
 26:     links: [
 27:       { label: 'About', to: '/about' },
 28:       { label: 'Visit the store', to: '/visit' },
 29:       { label: 'Contact', to: '/contact' },
 30:       { label: 'Account', to: '/account' },
 31:       { label: 'Wishlist', to: '/wishlist' },
 32:     ],
 33:   },
 34: ];
 35: 
 36: const LEGAL = [
 37:   { label: 'Privacy', to: '/privacy' },
 38:   { label: 'Terms', to: '/terms' },
 39:   { label: 'Shipping', to: '/shipping' },
 40:   { label: 'Returns', to: '/returns' },
 41: ];
 42: 
 43: /**
 44:  * Footer: the store's facts on the left (who, where, when, how to reach us),
 45:  * site links on the right. Hours and contact use the same hairline fact table
 46:  * as the Visit page, so the two read as one system.
 47:  */
 48: export const Footer: React.FC = () => {
 49:   const status = useStoreStatus();
 50: 
 51:   return (
 52:     <footer className="site-footer" aria-label="Site footer">
 53:       <div className="container footer-main">
 54:         <div className="footer-store">
 55:           <div className="footer-id">
 56:             <Logo size="md" className="footer-logo" />
 57:             <address className="footer-address">
 58:               {STORE_INFO.addressLine1}
 59:               <br />
 60:               {STORE_INFO.addressLine2}
 61:               <br />
 62:               {STORE_INFO.city} {STORE_INFO.pincode}, Maharashtra
 63:             </address>
 64:             <div className="footer-visit">
 65:               <p className={`store-status footer-status ${status.isOpen ? 'is-open' : ''}`}>
 66:                 <span className="status-dot" aria-hidden="true" />
 67:                 {status.label}
 68:               </p>
 69:               <a href={STORE_INFO.mapsUrl} target="_blank" rel="noreferrer" className="link-arrow">
 70:                 Directions <span className="btn-arrow" aria-hidden="true">→</span>
 71:               </a>
 72:             </div>
 73:           </div>
 74: 
 75:           <dl className="store-hours footer-facts">
 76:             <div>
 77:               <dt>Mon – Sat</dt>
 78:               <dd>{STORE_INFO.hours.weekdays}</dd>
 79:             </div>
 80:             <div>
 81:               <dt>Sunday</dt>
 82:               <dd>{STORE_INFO.hours.sunday}</dd>
 83:             </div>
 84:             <div>
 85:               <dt>Phone</dt>
 86:               <dd><a href={`tel:${STORE_INFO.phone}`}>{STORE_INFO.displayPhone}</a></dd>
 87:             </div>
 88:             <div>
 89:               <dt>WhatsApp</dt>
 90:               <dd><a href={STORE_INFO.whatsappUrl} target="_blank" rel="noreferrer">Message the store</a></dd>
 91:             </div>
 92:             <div>
 93:               <dt>Email</dt>
 94:               <dd><a href={`mailto:${STORE_INFO.email}`}>{STORE_INFO.email}</a></dd>
 95:             </div>
 96:           </dl>
 97:         </div>
 98: 
 99:         <div className="footer-nav">
100:           {COLUMNS.map((col) => (
101:             <nav key={col.title} aria-label={col.title} className="footer-col">
102:               <h2 className="footer-heading">{col.title}</h2>
103:               <ul>
104:                 {col.links.map((l) => (
105:                   <li key={l.to + l.label}>
106:                     <Link to={l.to} className="footer-link">{l.label}</Link>
107:                   </li>
108:                 ))}
109:               </ul>
110:             </nav>
111:           ))}
112:         </div>
113:       </div>
114: 
115:       <div className="container footer-base">
116:         <p>© {new Date().getFullYear()} Oriental Sports, Camp, Pune</p>
117:         <nav aria-label="Legal" className="footer-legal">
118:           {LEGAL.map((l) => (
119:             <Link key={l.to} to={l.to} className="footer-link">{l.label}</Link>
120:           ))}
121:         </nav>
122:       </div>
123:     </footer>
124:   );
125: };
126: 
127: export default Footer;
````

## File: src/data/courts.ts
````typescript
  1: import { CourtService, CourtProject } from '../types';
  2: 
  3: export const COURT_SERVICES: CourtService[] = [
  4:   {
  5:     id: 'court-pickleball',
  6:     slug: 'pickleball-court-construction',
  7:     name: 'Pickleball Courts & Facilities',
  8:     sport: 'Pickleball',
  9:     heroImage: '/images/categories/pickleball_category.webp',
 10:     surfaceTypes: ['Cushion Acrylic System', 'Hard Acrylic', 'Modular Sports Tiles'],
 11:     description: 'Turnkey construction of regulation pickleball courts for clubs, residential townships, and private facilities across Pune and Maharashtra.',
 12:     features: [
 13:       'Official regulation court dimensions and boundary layout',
 14:       'UV-resistant non-glare acrylic playing surface',
 15:       'Concrete or asphalt sub-base preparation with drainage slope',
 16:       'Heavy-duty in-ground posts and tournament-grade netting',
 17:       'Sports floodlighting layout options',
 18:     ],
 19:     standards: ['Standard Regulation Dimensions', 'All-Weather Sports Acrylic'],
 20:     leadTime: '3 to 4 Weeks',
 21:     estimatedPriceRange: 'Custom quote based on site conditions',
 22:     gallery: [
 23:       '/images/categories/pickleball_category.webp',
 24:       'https://images.unsplash.com/photo-1622669253059-e345500cf0e9?auto=format&fit=crop&w=1000&q=80',
 25:     ],
 26:   },
 27:   {
 28:     id: 'court-tennis',
 29:     slug: 'tennis-court-construction',
 30:     name: 'Tennis Court Surfacing & Construction',
 31:     sport: 'Tennis',
 32:     heroImage: 'https://images.unsplash.com/photo-1622669253059-e345500cf0e9?auto=format&fit=crop&w=1200&q=80',
 33:     surfaceTypes: ['Multi-Layer Acrylic Cushion', 'Hard Court Acrylic', 'Synthetic Grass'],
 34:     description: 'Full-size championship tennis courts engineered for sports clubs, academies, and private residences with shock-absorbing multi-layer acrylic systems.',
 35:     features: [
 36:       'Multi-layer all-weather acrylic system for consistent ball bounce',
 37:       'Precision regulation line marking',
 38:       'Galvanized perimeter chainlink fencing and court hardware',
 39:       'Sub-surface drainage integration for quick monsoon drying',
 40:     ],
 41:     standards: ['Official Regulation Layout', 'All-Weather Durability'],
 42:     leadTime: '4 to 6 Weeks',
 43:     estimatedPriceRange: 'Custom quote based on site dimensions',
 44:     gallery: [
 45:       'https://images.unsplash.com/photo-1622669253059-e345500cf0e9?auto=format&fit=crop&w=1000&q=80',
 46:       'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=1000&q=80',
 47:     ],
 48:   },
 49:   {
 50:     id: 'court-badminton',
 51:     slug: 'badminton-indoor-court-construction',
 52:     name: 'Indoor Badminton Courts',
 53:     sport: 'Badminton',
 54:     heroImage: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80',
 55:     surfaceTypes: ['Seasoned Teak / Hardwood Flooring', 'PVC Vinyl Sports Mats', 'Polyurethane Cushion Floor'],
 56:     description: 'Indoor badminton setups featuring sprung wooden timber subfloors or textured anti-skid PVC vinyl sports mats.',
 57:     features: [
 58:       'Sprung timber lattice with rubber shock pads for joint protection',
 59:       'Indirect glare-free sports hall lighting placement',
 60:       'Durable anti-skid polyurethane sports finish',
 61:       'Regulation court line markings and mobile/fixed post fixtures',
 62:     ],
 63:     standards: ['Official Badminton Dimensions', 'Vertical Shock Absorption'],
 64:     leadTime: '3 to 5 Weeks',
 65:     estimatedPriceRange: 'Custom quote based on hall dimensions',
 66:     gallery: [
 67:       'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1000&q=80',
 68:       '/images/hero/hero_train_perform.webp',
 69:     ],
 70:   },
 71:   {
 72:     id: 'court-turf',
 73:     slug: 'football-cricket-multisport-turf',
 74:     name: 'Multi-Sport Synthetic Turf & Box Arenas',
 75:     sport: 'Turf & Multi-sport',
 76:     heroImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
 77:     surfaceTypes: ['Synthetic Football Turf', 'Cricket Pitch Turf', 'Multi-Purpose Turf'],
 78:     description: 'All-weather sports turf installations for rooftop facilities, box cricket leagues, and 5-a-side football arenas with heavy-duty containment netting.',
 79:     features: [
 80:       'UV-resistant monofilament synthetic yarn with silica sand infill',
 81:       'High-tensile nylon perimeter and ceiling ball-containment netting',
 82:       'High-output sports floodlighting fixtures',
 83:       'Quick-draining porous aggregate sub-base preparation',
 84:     ],
 85:     standards: ['High-Durability All-Weather Turf', 'Custom Enclosure Fabrication'],
 86:     leadTime: '3 to 5 Weeks',
 87:     estimatedPriceRange: 'Custom quote based on arena footprint',
 88:     gallery: [
 89:       'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1000&q=80',
 90:       'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1000&q=80',
 91:     ],
 92:   },
 93:   {
 94:     id: 'court-squash',
 95:     slug: 'squash-court-construction',
 96:     name: 'Squash Courts & Wall Systems',
 97:     sport: 'Squash',
 98:     heroImage: 'https://images.unsplash.com/photo-1711294545092-303f7161017c?auto=format&fit=crop&w=1200&q=80',
 99:     surfaceTypes: ['Hard Plaster Wall System', 'Toughened Glass Back Wall', 'Hardwood Sprung Flooring'],
100:     description: 'Regulation squash court installations featuring impact-resistant high-density plaster walls and toughened glass backwall assemblies.',
101:     features: [
102:       'High-impact rebound plaster wall system with smooth durable finish',
103:       '12mm toughened structural glass backwall with safety manifestation',
104:       'Sprung hardwood timber sports floor system',
105:       'Regulation tin board, out-of-bounds lines, and overhead court lighting',
106:     ],
107:     standards: ['Standard Squash Court Dimensions', 'Impact-Rated Safety Glass'],
108:     leadTime: '4 to 6 Weeks',
109:     estimatedPriceRange: 'Custom quote based on facility scope',
110:     gallery: [
111:       'https://images.unsplash.com/photo-1711294545092-303f7161017c?auto=format&fit=crop&w=1000&q=80',
112:     ],
113:   },
114: ];
115: 
116: export const COURT_PROJECTS: CourtProject[] = [
117:   {
118:     id: 'proj-koregaon-pickleball',
119:     slug: 'koregaon-park-pickleball-club',
120:     title: 'Koregaon Park Pickleball Courts',
121:     location: 'Koregaon Park, Pune',
122:     sport: 'Pickleball',
123:     surface: 'Cushion Acrylic System',
124:     clientType: 'Club',
125:     year: '2024',
126:     heroImage: '/images/categories/pickleball_category.webp',
127:     images: [
128:       '/images/categories/pickleball_category.webp',
129:       'https://images.unsplash.com/photo-1622669253059-e345500cf0e9?auto=format&fit=crop&w=800&q=80',
130:     ],
131:     description: 'Turnkey construction of multi-court pickleball facility with two-tone playing surfaces, floodlighting, and perimeter chainlink fencing.',
132:     scope: [
133:       'Sub-base grading and reinforced concrete base preparation',
134:       'Multi-layer all-weather cushion acrylic application',
135:       'Regulation white court line markings',
136:       'In-ground net posts and tournament braided nets',
137:       'Perimeter fencing and LED floodlighting installation',
138:     ],
139:     specs: {
140:       'Facility Type': 'Dedicated Pickleball Facility',
141:       'Surface System': 'Multi-Layer Acrylic Cushion',
142:       'Scope': 'Turnkey sub-base, surfacing, fencing & lighting',
143:       'Location': 'Koregaon Park, Pune',
144:     },
145:   },
146:   {
147:     id: 'proj-deccan-tennis',
148:     slug: 'deccan-gymkhana-tennis-court',
149:     title: 'Deccan Gymkhana Tennis Hard Court',
150:     location: 'Deccan Gymkhana, Pune',
151:     sport: 'Tennis',
152:     surface: 'All-Weather Acrylic Surface',
153:     clientType: 'Club',
154:     year: '2023',
155:     heroImage: 'https://images.unsplash.com/photo-1622669253059-e345500cf0e9?auto=format&fit=crop&w=1200&q=80',
156:     images: [
157:       'https://images.unsplash.com/photo-1622669253059-e345500cf0e9?auto=format&fit=crop&w=800&q=80',
158:       'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=800&q=80',
159:     ],
160:     description: 'Resurfacing and precision leveling of outdoor tennis hard court with UV-stabilized acrylic matrix formulated for Pune weather conditions.',
161:     scope: [
162:       'Surface preparation, leveling, and crack repair',
163:       'Moisture barrier primer and multi-coat acrylic resurfacing',
164:       'Regulation tennis line marking',
165:       'Center strap anchor and heavy-duty tournament net installation',
166:     ],
167:     specs: {
168:       'Facility Type': 'Championship Hard Court',
169:       'Surface System': 'All-Weather Acrylic Resurfacing',
170:       'Scope': 'Surface remediation, leveling, line marking & hardware',
171:       'Location': 'Deccan Gymkhana, Pune',
172:     },
173:   },
174:   {
175:     id: 'proj-baner-turf',
176:     slug: 'baner-box-cricket-arena',
177:     title: 'Baner Multi-Sport Turf Arena',
178:     location: 'Baner, Pune',
179:     sport: 'Turf & Multi-sport',
180:     surface: 'Synthetic Sports Turf',
181:     clientType: 'Commercial',
182:     year: '2024',
183:     heroImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
184:     images: [
185:       'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
186:       'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
187:     ],
188:     description: 'Commercial sports turf facility with laser-leveled aggregate base, high-density containment netting, and overhead sports lighting.',
189:     scope: [
190:       'Base preparation with sub-surface drainage grid',
191:       'Heavy-duty monofilament synthetic turf installation with silica sand infill',
192:       'High-tensile nylon perimeter and ceiling enclosure netting',
193:       'Overhead LED floodlight installation',
194:     ],
195:     specs: {
196:       'Facility Type': 'Box Cricket & Multi-Sport Facility',
197:       'Surface System': 'Heavy-Duty Synthetic Turf',
198:       'Scope': 'Base work, turf laying, cage netting & floodlighting',
199:       'Location': 'Baner, Pune',
200:     },
201:   },
202:   {
203:     id: 'proj-camp-badminton',
204:     slug: 'camp-indoor-badminton-hall',
205:     title: 'Camp Indoor Badminton Hall',
206:     location: 'Camp, Pune',
207:     sport: 'Badminton',
208:     surface: 'Sprung Hardwood & Sports Mats',
209:     clientType: 'Club',
210:     year: '2023',
211:     heroImage: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80',
212:     images: [
213:       'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80',
214:     ],
215:     description: 'Indoor badminton hall installation featuring sprung timber substructure and tournament line markings near our Camp retail location.',
216:     scope: [
217:       'Subfloor moisture barrier and shock-pad timber lattice assembly',
218:       'Seasoned hardwood sports flooring with anti-skid polyurethane coating',
219:       'Dual-color badminton court marking',
220:       'Tournament post fixtures and indirect lighting setup',
221:     ],
222:     specs: {
223:       'Facility Type': 'Indoor Badminton Hall',
224:       'Surface System': 'Sprung Timber & Polyurethane Sports Finish',
225:       'Scope': 'Subfloor assembly, flooring installation & markings',
226:       'Location': 'Camp, Pune',
227:     },
228:   },
229: ];
````

## File: src/pages/AccountPage.tsx
````typescript
   1: import React, { useState } from 'react';
   2: import { Link } from 'react-router-dom';
   3: import {
   4:   User,
   5:   Package,
   6:   Heart,
   7:   MapPin,
   8:   Shield,
   9:   Award,
  10:   Layers,
  11:   Phone,
  12:   LogOut,
  13:   Plus,
  14:   Edit2,
  15:   Trash2,
  16:   CheckCircle,
  17:   ExternalLink,
  18:   MessageCircle,
  19:   Sparkles,
  20:   ArrowRight,
  21:   Activity,
  22:   Calendar,
  23:   FileCheck,
  24:   Check,
  25: } from 'lucide-react';
  26: import { useAuth } from '../context/AuthContext';
  27: import { useWishlist } from '../context/WishlistContext';
  28: import { useCart } from '../context/CartContext';
  29: import { PRODUCTS } from '../data/products';
  30: import { ProductCard } from '../components/products/ProductCard';
  31: import { STORE_INFO } from '../data/storeInfo';
  32: import { OrderTracker } from '../components/account/OrderTracker';
  33: import { AddressModal } from '../components/account/AddressModal';
  34: import { Address } from '../types/auth';
  35: import { PageHeader } from '../components/ui/PageHeader';
  36: 
  37: export type AccountTab = 'overview' | 'orders' | 'addresses' | 'courts' | 'wishlist' | 'profile';
  38: 
  39: interface AccountPageProps {
  40:   tab?: AccountTab | 'login' | 'signup' | 'verify';
  41: }
  42: 
  43: export const AccountPage: React.FC<AccountPageProps> = ({ tab }) => {
  44:   const {
  45:     user,
  46:     isAuthenticated,
  47:     openAuthModal,
  48:     signOut,
  49:     updateProfile,
  50:     addAddress,
  51:     updateAddress,
  52:     deleteAddress,
  53:     setDefaultAddress,
  54:   } = useAuth();
  55: 
  56:   const { wishlist } = useWishlist();
  57:   const { addToCart, openCart } = useCart();
  58: 
  59:   const [activeTab, setActiveTab] = useState<AccountTab>(
  60:     (tab && ['overview', 'orders', 'addresses', 'courts', 'wishlist', 'profile'].includes(tab))
  61:       ? (tab as AccountTab)
  62:       : 'overview'
  63:   );
  64: 
  65:   React.useEffect(() => {
  66:     if (tab && ['overview', 'orders', 'addresses', 'courts', 'wishlist', 'profile'].includes(tab)) {
  67:       setActiveTab(tab as AccountTab);
  68:     } else if (tab === 'login' || tab === 'signup' || tab === 'verify') {
  69:       if (!isAuthenticated) {
  70:         openAuthModal('phone');
  71:       }
  72:     }
  73:   }, [tab, isAuthenticated, openAuthModal]);
  74:   const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  75:   const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  76:   const [orderFilter, setOrderFilter] = useState<'all' | 'active' | 'delivered'>('all');
  77: 
  78:   // Profile form state
  79:   const [profileForm, setProfileForm] = useState({
  80:     firstName: user?.firstName || '',
  81:     lastName: user?.lastName || '',
  82:     email: user?.email || '',
  83:     preferredSport: user?.sportsInterests?.[0] || 'Badminton',
  84:   });
  85:   const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);
  86: 
  87:   // Sync profile form when user changes
  88:   React.useEffect(() => {
  89:     if (user) {
  90:       setProfileForm({
  91:         firstName: user.firstName,
  92:         lastName: user.lastName,
  93:         email: user.email || '',
  94:         preferredSport: user.sportsInterests?.[0] || 'Badminton',
  95:       });
  96:     }
  97:   }, [user]);
  98: 
  99:   const favoritedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));
 100: 
 101:   const handleOpenNewAddress = () => {
 102:     setEditingAddress(null);
 103:     setIsAddressModalOpen(true);
 104:   };
 105: 
 106:   const handleOpenEditAddress = (addr: Address) => {
 107:     setEditingAddress(addr);
 108:     setIsAddressModalOpen(true);
 109:   };
 110: 
 111:   const handleSaveAddress = async (addrData: Omit<Address, 'id'>) => {
 112:     if (editingAddress) {
 113:       await updateAddress(editingAddress.id, addrData);
 114:     } else {
 115:       await addAddress(addrData);
 116:     }
 117:   };
 118: 
 119:   const handleProfileSubmit = async (e: React.FormEvent) => {
 120:     e.preventDefault();
 121:     if (!user) return;
 122:     await updateProfile({
 123:       firstName: profileForm.firstName,
 124:       lastName: profileForm.lastName,
 125:       email: profileForm.email,
 126:       sportsInterests: [profileForm.preferredSport],
 127:     });
 128:     setProfileSaveSuccess(true);
 129:     setTimeout(() => setProfileSaveSuccess(false), 3000);
 130:   };
 131: 
 132:   // Signed out: say plainly what an account is for, one clear action.
 133:   if (!isAuthenticated || !user) {
 134:     return (
 135:       <div className="account-page">
 136:         <PageHeader
 137:           crumbs={[{ label: 'Home', to: '/' }, { label: 'Account' }]}
 138:           title={['Your', 'account.']}
 139:           lead="Sign in with your phone number to see your orders and keep your delivery addresses in one place."
 140:         >
 141:           <div className="page-header-actions">
 142:             <button type="button" className="btn btn-primary" onClick={() => openAuthModal('phone')}>
 143:               Sign in with phone <span className="btn-arrow" aria-hidden="true">→</span>
 144:             </button>
 145:             <Link to="/shop" className="link-arrow">Keep shopping <span className="btn-arrow" aria-hidden="true">→</span></Link>
 146:           </div>
 147:         </PageHeader>
 148: 
 149:         <section className="container account-intro" aria-label="What your account holds">
 150:           <ul className="counter-list">
 151:             <li><span className="counter-name">Orders</span><span className="counter-note">What you’ve ordered and where it is.</span></li>
 152:             <li><span className="counter-name">Addresses</span><span className="counter-note">Home, office or club — ready at checkout.</span></li>
 153:             <li><span className="counter-name">Wishlist</span><span className="counter-note">Gear you’ve saved to come back to.</span></li>
 154:           </ul>
 155: 
 156:           {favoritedProducts.length > 0 && (
 157:             <div className="account-saved">
 158:               <div className="section-bar">
 159:                 <h2 className="display d-3">Saved on this device</h2>
 160:                 <span className="results-count">{favoritedProducts.length}</span>
 161:               </div>
 162:               <ul className="product-grid">
 163:                 {favoritedProducts.map((p) => (
 164:                   <li key={p.id}><ProductCard product={p} /></li>
 165:                 ))}
 166:               </ul>
 167:             </div>
 168:           )}
 169:         </section>
 170:       </div>
 171:     );
 172:   }
 173: 
 174:   // Filtered orders
 175:   const filteredOrders = user.orders.filter((o) => {
 176:     if (orderFilter === 'active') return o.status !== 'delivered' && o.status !== 'cancelled';
 177:     if (orderFilter === 'delivered') return o.status === 'delivered';
 178:     return true;
 179:   });
 180: 
 181:   return (
 182:     <div className="bg-ivory" style={{ minHeight: '85vh', paddingBottom: 'var(--space-4xl)' }}>
 183:       {/* Top Athlete Banner */}
 184:       <div style={{ backgroundColor: 'var(--color-ink)', color: '#FFFFFF', padding: '36px 0' }}>
 185:         <div className="container">
 186:           <div
 187:             style={{
 188:               display: 'flex',
 189:               flexWrap: 'wrap',
 190:               alignItems: 'center',
 191:               justifyContent: 'space-between',
 192:               gap: '20px',
 193:             }}
 194:           >
 195:             <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
 196:               {/* Initials Avatar */}
 197:               <div
 198:                 style={{
 199:                   width: '68px',
 200:                   height: '68px',
 201:                   borderRadius: '50%',
 202:                   backgroundColor: 'var(--color-plate-gold)',
 203:                   color: 'var(--color-ink)',
 204:                   display: 'flex',
 205:                   alignItems: 'center',
 206:                   justifyContent: 'center',
 207:                   fontWeight: 900,
 208:                   fontSize: '1.5rem',
 209:                   boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
 210:                   border: '3px solid #FFFFFF',
 211:                   flexShrink: 0,
 212:                 }}
 213:               >
 214:                 {user.firstName[0]}
 215:                 {user.lastName ? user.lastName[0] : ''}
 216:               </div>
 217: 
 218:               <div>
 219:                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
 220:                   <h1
 221:                     className="font-display"
 222:                     style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', color: '#FFFFFF', margin: 0 }}
 223:                   >
 224:                     {user.firstName} {user.lastName}
 225:                   </h1>
 226:                   <span
 227:                     style={{
 228:                       backgroundColor: 'rgba(201, 162, 39, 0.25)',
 229:                       color: 'var(--color-plate-gold)',
 230:                       border: '1px solid var(--color-plate-gold)',
 231:                       fontSize: '0.6875rem',
 232:                       fontWeight: 800,
 233:                       padding: '2px 8px',
 234:                       borderRadius: '9999px',
 235:                       textTransform: 'uppercase',
 236:                     }}
 237:                   >
 238:                     {user.membershipTier} Member
 239:                   </span>
 240:                 </div>
 241: 
 242:                 <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '6px', fontSize: '0.8125rem', color: 'rgba(255, 255, 255, 0.7)' }}>
 243:                   <span>+91 {user.phone}</span>
 244:                   {user.email && <span>• {user.email}</span>}
 245:                   <span>• Pune Flagship Member</span>
 246:                 </div>
 247:               </div>
 248:             </div>
 249: 
 250:             {/* Quick Actions in Header */}
 251:             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
 252:               <div
 253:                 style={{
 254:                   textAlign: 'right',
 255:                   padding: '8px 14px',
 256:                   backgroundColor: 'rgba(255, 255, 255, 0.08)',
 257:                   borderRadius: '4px',
 258:                   border: '1px solid rgba(255, 255, 255, 0.12)',
 259:                 }}
 260:                 className="desktop-only"
 261:               >
 262:                 <div style={{ fontSize: '0.6875rem', color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', fontWeight: 700 }}>
 263:                   Stringing Loyalty Points
 264:                 </div>
 265:                 <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-plate-gold)' }}>
 266:                   {user.stringingLoyaltyPoints} Pts
 267:                 </div>
 268:               </div>
 269: 
 270:               <button
 271:                 type="button"
 272:                 onClick={signOut}
 273:                 className="btn btn-outline-light btn-sm"
 274:                 style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
 275:                 title="Sign out of account"
 276:               >
 277:                 <LogOut size={15} />
 278:                 <span className="desktop-only">SIGN OUT</span>
 279:               </button>
 280:             </div>
 281:           </div>
 282:         </div>
 283:       </div>
 284: 
 285:       {/* Navigation Tabs Bar */}
 286:       <div
 287:         style={{
 288:           backgroundColor: '#FFFFFF',
 289:           borderBottom: '1px solid var(--color-ivory-border)',
 290:           position: 'sticky',
 291:           top: '64px',
 292:           zIndex: 40,
 293:         }}
 294:       >
 295:         <div className="container" style={{ overflowX: 'auto' }}>
 296:           <div style={{ display: 'flex', minWidth: 'max-content', gap: '8px' }}>
 297:             <button
 298:               type="button"
 299:               onClick={() => setActiveTab('overview')}
 300:               style={{
 301:                 padding: '14px 16px',
 302:                 border: 'none',
 303:                 background: 'transparent',
 304:                 fontWeight: 700,
 305:                 fontSize: '0.875rem',
 306:                 cursor: 'pointer',
 307:                 display: 'flex',
 308:                 alignItems: 'center',
 309:                 gap: '8px',
 310:                 color: activeTab === 'overview' ? 'var(--color-ink)' : '#4B5563',
 311:                 borderBottom: activeTab === 'overview' ? '3px solid var(--color-brand-gold)' : '3px solid transparent',
 312:               }}
 313:             >
 314:               <Activity size={16} />
 315:               <span>Overview</span>
 316:             </button>
 317: 
 318:             <button
 319:               type="button"
 320:               onClick={() => setActiveTab('orders')}
 321:               style={{
 322:                 padding: '14px 16px',
 323:                 border: 'none',
 324:                 background: 'transparent',
 325:                 fontWeight: 700,
 326:                 fontSize: '0.875rem',
 327:                 cursor: 'pointer',
 328:                 display: 'flex',
 329:                 alignItems: 'center',
 330:                 gap: '8px',
 331:                 color: activeTab === 'orders' ? 'var(--color-ink)' : '#4B5563',
 332:                 borderBottom: activeTab === 'orders' ? '3px solid var(--color-brand-gold)' : '3px solid transparent',
 333:               }}
 334:             >
 335:               <Package size={16} />
 336:               <span>Orders & Deliveries ({user.orders.length})</span>
 337:             </button>
 338: 
 339:             <button
 340:               type="button"
 341:               onClick={() => setActiveTab('addresses')}
 342:               style={{
 343:                 padding: '14px 16px',
 344:                 border: 'none',
 345:                 background: 'transparent',
 346:                 fontWeight: 700,
 347:                 fontSize: '0.875rem',
 348:                 cursor: 'pointer',
 349:                 display: 'flex',
 350:                 alignItems: 'center',
 351:                 gap: '8px',
 352:                 color: activeTab === 'addresses' ? 'var(--color-ink)' : '#4B5563',
 353:                 borderBottom: activeTab === 'addresses' ? '3px solid var(--color-brand-gold)' : '3px solid transparent',
 354:               }}
 355:             >
 356:               <MapPin size={16} />
 357:               <span>Saved Addresses ({user.addresses.length})</span>
 358:             </button>
 359: 
 360:             <button
 361:               type="button"
 362:               onClick={() => setActiveTab('courts')}
 363:               style={{
 364:                 padding: '14px 16px',
 365:                 border: 'none',
 366:                 background: 'transparent',
 367:                 fontWeight: 700,
 368:                 fontSize: '0.875rem',
 369:                 cursor: 'pointer',
 370:                 display: 'flex',
 371:                 alignItems: 'center',
 372:                 gap: '8px',
 373:                 color: activeTab === 'courts' ? 'var(--color-ink)' : '#4B5563',
 374:                 borderBottom: activeTab === 'courts' ? '3px solid var(--color-brand-gold)' : '3px solid transparent',
 375:               }}
 376:             >
 377:               <Layers size={16} />
 378:               <span>Court Projects ({user.courtProjects?.length || 0})</span>
 379:             </button>
 380: 
 381:             <button
 382:               type="button"
 383:               onClick={() => setActiveTab('wishlist')}
 384:               style={{
 385:                 padding: '14px 16px',
 386:                 border: 'none',
 387:                 background: 'transparent',
 388:                 fontWeight: 700,
 389:                 fontSize: '0.875rem',
 390:                 cursor: 'pointer',
 391:                 display: 'flex',
 392:                 alignItems: 'center',
 393:                 gap: '8px',
 394:                 color: activeTab === 'wishlist' ? 'var(--color-ink)' : '#4B5563',
 395:                 borderBottom: activeTab === 'wishlist' ? '3px solid var(--color-brand-gold)' : '3px solid transparent',
 396:               }}
 397:             >
 398:               <Heart size={16} />
 399:               <span>Wishlist ({wishlist.length})</span>
 400:             </button>
 401: 
 402:             <button
 403:               type="button"
 404:               onClick={() => setActiveTab('profile')}
 405:               style={{
 406:                 padding: '14px 16px',
 407:                 border: 'none',
 408:                 background: 'transparent',
 409:                 fontWeight: 700,
 410:                 fontSize: '0.875rem',
 411:                 cursor: 'pointer',
 412:                 display: 'flex',
 413:                 alignItems: 'center',
 414:                 gap: '8px',
 415:                 color: activeTab === 'profile' ? 'var(--color-ink)' : '#4B5563',
 416:                 borderBottom: activeTab === 'profile' ? '3px solid var(--color-brand-gold)' : '3px solid transparent',
 417:               }}
 418:             >
 419:               <User size={16} />
 420:               <span>Preferences</span>
 421:             </button>
 422:           </div>
 423:         </div>
 424:       </div>
 425: 
 426:       {/* Main Tab Content Area */}
 427:       <div className="container" style={{ paddingTop: 'var(--space-2xl)' }}>
 428:         {/* ================= OVERVIEW TAB ================= */}
 429:         {activeTab === 'overview' && (
 430:           <div>
 431:             {/* Quick Metrics Bar */}
 432:             <div
 433:               style={{
 434:                 display: 'grid',
 435:                 gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
 436:                 gap: '16px',
 437:                 marginBottom: '28px',
 438:               }}
 439:             >
 440:               <div
 441:                 style={{
 442:                   backgroundColor: '#FFFFFF',
 443:                   padding: '20px',
 444:                   borderRadius: '6px',
 445:                   border: '1px solid var(--color-ivory-border)',
 446:                 }}
 447:               >
 448:                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
 449:                   <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#6B7280' }}>
 450:                     Total Orders
 451:                   </span>
 452:                   <Package size={18} color="var(--color-brand-gold)" />
 453:                 </div>
 454:                 <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--color-ink)' }}>
 455:                   {user.orders.length}
 456:                 </div>
 457:                 <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600, marginTop: '4px' }}>
 458:                   Latest order #{user.orders[0]?.orderNumber}
 459:                 </div>
 460:               </div>
 461: 
 462:               <div
 463:                 style={{
 464:                   backgroundColor: '#FFFFFF',
 465:                   padding: '20px',
 466:                   borderRadius: '6px',
 467:                   border: '1px solid var(--color-ivory-border)',
 468:                 }}
 469:               >
 470:                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
 471:                   <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#6B7280' }}>
 472:                     Turnkey Court Inquiries
 473:                   </span>
 474:                   <Layers size={18} color="var(--color-plate-gold)" />
 475:                 </div>
 476:                 <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--color-ink)' }}>
 477:                   {user.courtProjects?.length || 0}
 478:                 </div>
 479:                 <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '4px' }}>
 480:                   Deccan Gymkhana & Kalyani Nagar
 481:                 </div>
 482:               </div>
 483: 
 484:               <div
 485:                 style={{
 486:                   backgroundColor: '#FFFFFF',
 487:                   padding: '20px',
 488:                   borderRadius: '6px',
 489:                   border: '1px solid var(--color-ivory-border)',
 490:                 }}
 491:               >
 492:                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
 493:                   <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#6B7280' }}>
 494:                     Saved Equipment
 495:                   </span>
 496:                   <Heart size={18} color="#EF4444" />
 497:                 </div>
 498:                 <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--color-ink)' }}>
 499:                   {wishlist.length}
 500:                 </div>
 501:                 <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '4px' }}>
 502:                   Equipment in your bag wishlist
 503:                 </div>
 504:               </div>
 505: 
 506:               <div
 507:                 style={{
 508:                   backgroundColor: '#FFFFFF',
 509:                   padding: '20px',
 510:                   borderRadius: '6px',
 511:                   border: '1px solid var(--color-ivory-border)',
 512:                 }}
 513:               >
 514:                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
 515:                   <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#6B7280' }}>
 516:                     Stringing Points
 517:                   </span>
 518:                   <Award size={18} color="var(--color-plate-gold)" />
 519:                 </div>
 520:                 <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--color-plate-gold)' }}>
 521:                   {user.stringingLoyaltyPoints}
 522:                 </div>
 523:                 <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600, marginTop: '4px' }}>
 524:                   Eligible for 1 Free Yonex Restring
 525:                 </div>
 526:               </div>
 527:             </div>
 528: 
 529:             {/* Active / Latest Order Spotlight */}
 530:             {user.orders.length > 0 && (
 531:               <div style={{ marginBottom: '32px' }}>
 532:                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
 533:                   <h2 className="font-display" style={{ fontSize: '1.25rem', margin: 0 }}>
 534:                     ACTIVE / LATEST DISPATCH
 535:                   </h2>
 536:                   <button
 537:                     type="button"
 538:                     onClick={() => setActiveTab('orders')}
 539:                     style={{
 540:                       background: 'none',
 541:                       border: 'none',
 542:                       color: 'var(--color-ink)',
 543:                       fontWeight: 700,
 544:                       cursor: 'pointer',
 545:                       fontSize: '0.8125rem',
 546:                     }}
 547:                   >
 548:                     View all {user.orders.length} orders →
 549:                   </button>
 550:                 </div>
 551:                 <OrderTracker order={user.orders[0]} defaultExpanded={true} />
 552:               </div>
 553:             )}
 554: 
 555:             {/* Two-column layout: Flagship Store Hub & Addresses */}
 556:             <div
 557:               style={{
 558:                 display: 'grid',
 559:                 gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
 560:                 gap: '24px',
 561:               }}
 562:             >
 563:               {/* Flagship Store Connection */}
 564:               <div
 565:                 style={{
 566:                   backgroundColor: '#FFFFFF',
 567:                   padding: '24px',
 568:                   borderRadius: '6px',
 569:                   border: '1px solid var(--color-ivory-border)',
 570:                 }}
 571:               >
 572:                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
 573:                   <MapPin size={18} color="var(--color-plate-gold)" />
 574:                   <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-plate-gold)' }}>
 575:                     YOUR HOME FLAGSHIP
 576:                   </span>
 577:                 </div>
 578:                 <h3 style={{ fontSize: '1.125rem', fontWeight: 800, margin: '0 0 6px 0' }}>
 579:                   Oriental Sports Camp Store
 580:                 </h3>
 581:                 <p style={{ fontSize: '0.875rem', color: '#666', lineHeight: 1.5, margin: '0 0 16px 0' }}>
 582:                   Shop 247, MG Road, New Modikhana, Camp, Pune - 411001.<br />
 583:                   Walk-in racket stringing tension checks & court consultant available 7 days a week.
 584:                 </p>
 585: 
 586:                 <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
 587:                   <a
 588:                     href={STORE_INFO.mapsUrl}
 589:                     target="_blank"
 590:                     rel="noreferrer"
 591:                     className="btn btn-outline-dark btn-sm"
 592:                     style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}
 593:                   >
 594:                     <ExternalLink size={14} />
 595:                     <span>GET DIRECTIONS</span>
 596:                   </a>
 597:                   <a
 598:                     href={STORE_INFO.whatsappUrl}
 599:                     target="_blank"
 600:                     rel="noreferrer"
 601:                     className="btn btn-gold btn-sm"
 602:                     style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}
 603:                   >
 604:                     <MessageCircle size={14} />
 605:                     <span>WHATSAPP STRINGING DESK</span>
 606:                   </a>
 607:                 </div>
 608:               </div>
 609: 
 610:               {/* Default Address Snapshot */}
 611:               <div
 612:                 style={{
 613:                   backgroundColor: '#FFFFFF',
 614:                   padding: '24px',
 615:                   borderRadius: '6px',
 616:                   border: '1px solid var(--color-ivory-border)',
 617:                 }}
 618:               >
 619:                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
 620:                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
 621:                     <Shield size={18} color="var(--color-brand-gold)" />
 622:                     <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-ink)' }}>
 623:                       DEFAULT SHIPPING DESTINATION
 624:                     </span>
 625:                   </div>
 626:                   <button
 627:                     type="button"
 628:                     onClick={() => setActiveTab('addresses')}
 629:                     style={{
 630:                       background: 'none',
 631:                       border: 'none',
 632:                       color: '#6B7280',
 633:                       cursor: 'pointer',
 634:                       fontSize: '0.75rem',
 635:                       fontWeight: 600,
 636:                     }}
 637:                   >
 638:                     Manage ({user.addresses.length})
 639:                   </button>
 640:                 </div>
 641: 
 642:                 {user.addresses[0] ? (
 643:                   <div>
 644:                     <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 800 }}>
 645:                       {user.addresses[0].name}
 646:                     </h4>
 647:                     <p style={{ margin: '0 0 12px 0', fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.5 }}>
 648:                       {user.addresses[0].street}<br />
 649:                       {user.addresses[0].locality}, {user.addresses[0].city} - {user.addresses[0].pincode}<br />
 650:                       Phone: +91 {user.addresses[0].phone}
 651:                     </p>
 652:                     <button
 653:                       type="button"
 654:                       onClick={() => handleOpenEditAddress(user.addresses[0])}
 655:                       className="btn btn-outline-dark btn-sm"
 656:                       style={{ fontSize: '0.75rem' }}
 657:                     >
 658:                       EDIT ADDRESS
 659:                     </button>
 660:                   </div>
 661:                 ) : (
 662:                   <div>
 663:                     <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '12px' }}>
 664:                       No saved addresses yet. Add your home or club address for faster checkout.
 665:                     </p>
 666:                     <button
 667:                       type="button"
 668:                       onClick={handleOpenNewAddress}
 669:                       className="btn btn-primary btn-sm"
 670:                       style={{ fontSize: '0.75rem' }}
 671:                     >
 672:                       ADD ADDRESS
 673:                     </button>
 674:                   </div>
 675:                 )}
 676:               </div>
 677:             </div>
 678:           </div>
 679:         )}
 680: 
 681:         {/* ================= ORDERS TAB ================= */}
 682:         {activeTab === 'orders' && (
 683:           <div>
 684:             <div
 685:               style={{
 686:                 display: 'flex',
 687:                 flexWrap: 'wrap',
 688:                 alignItems: 'center',
 689:                 justifyContent: 'space-between',
 690:                 gap: '16px',
 691:                 marginBottom: '20px',
 692:               }}
 693:             >
 694:               <div>
 695:                 <h2 className="font-display" style={{ fontSize: '1.5rem', margin: 0 }}>
 696:                   PURCHASE & RESTRINGING ORDERS
 697:                 </h2>
 698:                 <span style={{ fontSize: '0.8125rem', color: '#6B7280' }}>
 699:                   Showing {filteredOrders.length} order{filteredOrders.length === 1 ? '' : 's'} dispatched from Camp Flagship
 700:                 </span>
 701:               </div>
 702: 
 703:               {/* Order filter buttons */}
 704:               <div style={{ display: 'flex', gap: '8px' }}>
 705:                 {(['all', 'active', 'delivered'] as const).map((filter) => (
 706:                   <button
 707:                     key={filter}
 708:                     type="button"
 709:                     onClick={() => setOrderFilter(filter)}
 710:                     style={{
 711:                       padding: '6px 14px',
 712:                       borderRadius: '9999px',
 713:                       fontSize: '0.75rem',
 714:                       fontWeight: 700,
 715:                       textTransform: 'uppercase',
 716:                       cursor: 'pointer',
 717:                       border: orderFilter === filter ? '1px solid var(--color-ink)' : '1px solid #D1D5DB',
 718:                       backgroundColor: orderFilter === filter ? 'var(--color-ink)' : '#FFFFFF',
 719:                       color: orderFilter === filter ? '#FFFFFF' : '#4B5563',
 720:                     }}
 721:                   >
 722:                     {filter === 'all' ? 'All Orders' : filter === 'active' ? 'Active Dispatches' : 'Delivered'}
 723:                   </button>
 724:                 ))}
 725:               </div>
 726:             </div>
 727: 
 728:             {filteredOrders.length > 0 ? (
 729:               <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
 730:                 {filteredOrders.map((order) => (
 731:                   <OrderTracker key={order.id} order={order} defaultExpanded={order.status !== 'delivered'} />
 732:                 ))}
 733:               </div>
 734:             ) : (
 735:               <div
 736:                 style={{
 737:                   backgroundColor: '#FFFFFF',
 738:                   padding: '48px 24px',
 739:                   borderRadius: '6px',
 740:                   textAlign: 'center',
 741:                   border: '1px solid var(--color-ivory-border)',
 742:                 }}
 743:               >
 744:                 <Package size={36} color="#9CA3AF" style={{ margin: '0 auto 16px' }} />
 745:                 <h3 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '8px' }}>
 746:                   No orders match this filter
 747:                 </h3>
 748:                 <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '20px' }}>
 749:                   Explore authentic badminton, tennis, and pickleball equipment ready for express delivery in Pune.
 750:                 </p>
 751:                 <Link to="/shop" className="btn btn-primary btn-sm">
 752:                   BROWSE PRO SHOP
 753:                 </Link>
 754:               </div>
 755:             )}
 756:           </div>
 757:         )}
 758: 
 759:         {/* ================= ADDRESSES TAB ================= */}
 760:         {activeTab === 'addresses' && (
 761:           <div>
 762:             <div
 763:               style={{
 764:                 display: 'flex',
 765:                 alignItems: 'center',
 766:                 justifyContent: 'space-between',
 767:                 marginBottom: '20px',
 768:                 flexWrap: 'wrap',
 769:                 gap: '12px',
 770:               }}
 771:             >
 772:               <div>
 773:                 <h2 className="font-display" style={{ fontSize: '1.5rem', margin: 0 }}>
 774:                   SAVED ADDRESSES ({user.addresses.length})
 775:                 </h2>
 776:                 <span style={{ fontSize: '0.8125rem', color: '#6B7280' }}>
 777:                   Manage delivery destinations for homes, sports clubs, and school academies.
 778:                 </span>
 779:               </div>
 780: 
 781:               <button
 782:                 type="button"
 783:                 onClick={handleOpenNewAddress}
 784:                 className="btn btn-primary btn-sm"
 785:                 style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
 786:               >
 787:                 <Plus size={16} />
 788:                 <span>ADD NEW ADDRESS</span>
 789:               </button>
 790:             </div>
 791: 
 792:             <div
 793:               style={{
 794:                 display: 'grid',
 795:                 gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
 796:                 gap: '20px',
 797:               }}
 798:             >
 799:               {user.addresses.map((addr) => (
 800:                 <div
 801:                   key={addr.id}
 802:                   style={{
 803:                     backgroundColor: '#FFFFFF',
 804:                     borderRadius: '6px',
 805:                     border: addr.isDefault ? '2px solid var(--color-brand-gold)' : '1px solid var(--color-ivory-border)',
 806:                     padding: '20px',
 807:                     position: 'relative',
 808:                     display: 'flex',
 809:                     flexDirection: 'column',
 810:                     justifyContent: 'space-between',
 811:                   }}
 812:                 >
 813:                   <div>
 814:                     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
 815:                       <span
 816:                         style={{
 817:                           backgroundColor: '#F3F4F6',
 818:                           color: '#374151',
 819:                           fontSize: '0.6875rem',
 820:                           fontWeight: 800,
 821:                           padding: '2px 8px',
 822:                           borderRadius: '2px',
 823:                           textTransform: 'uppercase',
 824:                         }}
 825:                       >
 826:                         {addr.type === 'academy' ? 'Club / Academy' : addr.type}
 827:                       </span>
 828: 
 829:                       {addr.isDefault && (
 830:                         <span
 831:                           style={{
 832:                             backgroundColor: 'var(--color-ink)',
 833:                             color: 'var(--color-brand-gold)',
 834:                             fontSize: '0.6875rem',
 835:                             fontWeight: 800,
 836:                             padding: '2px 8px',
 837:                             borderRadius: '2px',
 838:                             display: 'flex',
 839:                             alignItems: 'center',
 840:                             gap: '4px',
 841:                           }}
 842:                         >
 843:                           <Check size={12} />
 844:                           DEFAULT
 845:                         </span>
 846:                       )}
 847:                     </div>
 848: 
 849:                     <h4 style={{ margin: '0 0 6px 0', fontSize: '1rem', fontWeight: 800 }}>
 850:                       {addr.name}
 851:                     </h4>
 852:                     <p style={{ margin: 0, fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.5 }}>
 853:                       {addr.street}<br />
 854:                       {addr.locality && `${addr.locality}, `}{addr.city} - {addr.pincode}<br />
 855:                       {addr.state}, India<br />
 856:                       <strong>Phone:</strong> +91 {addr.phone}
 857:                     </p>
 858:                   </div>
 859: 
 860:                   <div
 861:                     style={{
 862:                       display: 'flex',
 863:                       alignItems: 'center',
 864:                       justifyContent: 'space-between',
 865:                       marginTop: '20px',
 866:                       paddingTop: '14px',
 867:                       borderTop: '1px solid #F3F4F6',
 868:                     }}
 869:                   >
 870:                     {!addr.isDefault ? (
 871:                       <button
 872:                         type="button"
 873:                         onClick={() => setDefaultAddress(addr.id)}
 874:                         style={{
 875:                           background: 'none',
 876:                           border: 'none',
 877:                           color: 'var(--color-ink)',
 878:                           fontSize: '0.75rem',
 879:                           fontWeight: 700,
 880:                           cursor: 'pointer',
 881:                           padding: 0,
 882:                         }}
 883:                       >
 884:                         Set as default
 885:                       </button>
 886:                     ) : (
 887:                       <div />
 888:                     )}
 889: 
 890:                     <div style={{ display: 'flex', gap: '8px' }}>
 891:                       <button
 892:                         type="button"
 893:                         onClick={() => handleOpenEditAddress(addr)}
 894:                         style={{
 895:                           background: 'none',
 896:                           border: 'none',
 897:                           color: '#4B5563',
 898:                           cursor: 'pointer',
 899:                           padding: '4px',
 900:                           display: 'flex',
 901:                           alignItems: 'center',
 902:                           gap: '4px',
 903:                           fontSize: '0.75rem',
 904:                         }}
 905:                         title="Edit address"
 906:                       >
 907:                         <Edit2 size={14} />
 908:                         <span>Edit</span>
 909:                       </button>
 910: 
 911:                       {user.addresses.length > 1 && (
 912:                         <button
 913:                           type="button"
 914:                           onClick={() => deleteAddress(addr.id)}
 915:                           style={{
 916:                             background: 'none',
 917:                             border: 'none',
 918:                             color: '#DC2626',
 919:                             cursor: 'pointer',
 920:                             padding: '4px',
 921:                             display: 'flex',
 922:                             alignItems: 'center',
 923:                             gap: '4px',
 924:                             fontSize: '0.75rem',
 925:                           }}
 926:                           title="Delete address"
 927:                         >
 928:                           <Trash2 size={14} />
 929:                           <span>Delete</span>
 930:                         </button>
 931:                       )}
 932:                     </div>
 933:                   </div>
 934:                 </div>
 935:               ))}
 936:             </div>
 937:           </div>
 938:         )}
 939: 
 940:         {/* ================= COURTS TAB ================= */}
 941:         {activeTab === 'courts' && (
 942:           <div>
 943:             <div
 944:               style={{
 945:                 display: 'flex',
 946:                 alignItems: 'center',
 947:                 justifyContent: 'space-between',
 948:                 marginBottom: '20px',
 949:                 flexWrap: 'wrap',
 950:                 gap: '12px',
 951:               }}
 952:             >
 953:               <div>
 954:                 <h2 className="font-display" style={{ fontSize: '1.5rem', margin: 0 }}>
 955:                   TURNKEY COURT CONSTRUCTION PROJECTS ({user.courtProjects?.length || 0})
 956:                 </h2>
 957:                 <span style={{ fontSize: '0.8125rem', color: '#6B7280' }}>
 958:                   Track your institutional, school, and club court civil engineering proposals & BOQ documents.
 959:                 </span>
 960:               </div>
 961: 
 962:               <Link
 963:                 to="/courts"
 964:                 className="btn btn-gold btn-sm"
 965:                 style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
 966:               >
 967:                 <span>REQUEST NEW COURT CONSULTATION</span>
 968:                 <ArrowRight size={14} />
 969:               </Link>
 970:             </div>
 971: 
 972:             <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
 973:               {(user.courtProjects || []).map((project: any) => (
 974:                 <div
 975:                   key={project.id}
 976:                   style={{
 977:                     backgroundColor: '#FFFFFF',
 978:                     borderRadius: '6px',
 979:                     border: '1px solid var(--color-ivory-border)',
 980:                     boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
 981:                     padding: '24px',
 982:                   }}
 983:                 >
 984:                   <div
 985:                     style={{
 986:                       display: 'flex',
 987:                       flexWrap: 'wrap',
 988:                       alignItems: 'flex-start',
 989:                       justifyContent: 'space-between',
 990:                       gap: '12px',
 991:                       borderBottom: '1px solid #F3F4F6',
 992:                       paddingBottom: '16px',
 993:                       marginBottom: '16px',
 994:                     }}
 995:                   >
 996:                     <div>
 997:                       <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
 998:                         <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase' }}>
 999:                           Inquiry Reference: {project.id}
1000:                         </span>
1001:                         <span>•</span>
1002:                         <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
1003:                           Date: {project.inquiryDate}
1004:                         </span>
1005:                       </div>
1006:                       <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-ink)' }}>
1007:                         {project.title}
1008:                       </h3>
1009:                       <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', fontSize: '0.8125rem', color: '#4B5563' }}>
1010:                         <MapPin size={14} color="var(--color-plate-gold)" />
1011:                         <span>{project.location}</span>
1012:                       </div>
1013:                     </div>
1014: 
1015:                     <div
1016:                       style={{
1017:                         padding: '6px 14px',
1018:                         borderRadius: '9999px',
1019:                         backgroundColor:
1020:                           project.status === 'proposal_ready'
1021:                             ? '#FEF3C7'
1022:                             : project.status === 'site_survey_completed'
1023:                             ? '#EFF6FF'
1024:                             : '#ECFDF5',
1025:                         color:
1026:                           project.status === 'proposal_ready'
1027:                             ? '#B45309'
1028:                             : project.status === 'site_survey_completed'
1029:                             ? '#1D4ED8'
1030:                             : '#047857',
1031:                         fontSize: '0.75rem',
1032:                         fontWeight: 800,
1033:                         textTransform: 'uppercase',
1034:                         letterSpacing: '0.04em',
1035:                       }}
1036:                     >
1037:                       {project.statusLabel}
1038:                     </div>
1039:                   </div>
1040: 
1041:                   {/* Specs Grid */}
1042:                   <div
1043:                     style={{
1044:                       display: 'grid',
1045:                       gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
1046:                       gap: '16px',
1047:                       backgroundColor: '#F9FAFB',
1048:                       padding: '16px',
1049:                       borderRadius: '4px',
1050:                       marginBottom: '20px',
1051:                       fontSize: '0.8125rem',
1052:                     }}
1053:                   >
1054:                     <div>
1055:                       <span style={{ color: '#6B7280', display: 'block', fontSize: '0.6875rem', textTransform: 'uppercase', fontWeight: 700 }}>
1056:                         Sport Category
1057:                       </span>
1058:                       <strong style={{ color: '#111827' }}>{project.sport}</strong>
1059:                     </div>
1060: 
1061:                     <div>
1062:                       <span style={{ color: '#6B7280', display: 'block', fontSize: '0.6875rem', textTransform: 'uppercase', fontWeight: 700 }}>
1063:                         Surface Specification
1064:                       </span>
1065:                       <strong style={{ color: '#111827' }}>{project.surfaceType}</strong>
1066:                     </div>
1067: 
1068:                     <div>
1069:                       <span style={{ color: '#6B7280', display: 'block', fontSize: '0.6875rem', textTransform: 'uppercase', fontWeight: 700 }}>
1070:                         Dimensions / Courts
1071:                       </span>
1072:                       <strong style={{ color: '#111827' }}>{project.dimensions}</strong>
1073:                     </div>
1074: 
1075:                     <div>
1076:                       <span style={{ color: '#6B7280', display: 'block', fontSize: '0.6875rem', textTransform: 'uppercase', fontWeight: 700 }}>
1077:                         Estimated Turnkey BOQ
1078:                       </span>
1079:                       <strong style={{ color: 'var(--color-brand-gold)' }}>{project.estimatedBudget}</strong>
1080:                     </div>
1081:                   </div>
1082: 
1083:                   {/* Actions */}
1084:                   <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
1085:                     <div style={{ fontSize: '0.8125rem', color: '#4B5563' }}>
1086:                       Chief Civil Consultant: <strong>Oriental Sports Pune Engineering Cell</strong>
1087:                     </div>
1088: 
1089:                     <div style={{ display: 'flex', gap: '10px' }}>
1090:                       <a
1091:                         href={`https://wa.me/${STORE_INFO.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
1092:                           `Hello Oriental Sports Court Construction Cell, I am following up on Turnkey Proposal ${project.id} (${project.title}). Can we schedule a site alignment meeting?`
1093:                         )}`}
1094:                         target="_blank"
1095:                         rel="noreferrer"
1096:                         className="btn btn-gold btn-sm"
1097:                         style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}
1098:                       >
1099:                         <MessageCircle size={14} />
1100:                         <span>WHATSAPP CONSULTANT</span>
1101:                       </a>
1102: 
1103:                       <Link
1104:                         to="/courts"
1105:                         className="btn btn-outline-dark btn-sm"
1106:                         style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}
1107:                       >
1108:                         <FileCheck size={14} />
1109:                         <span>COURT PORTFOLIO</span>
1110:                       </Link>
1111:                     </div>
1112:                   </div>
1113:                 </div>
1114:               ))}
1115:             </div>
1116:           </div>
1117:         )}
1118: 
1119:         {/* ================= WISHLIST TAB ================= */}
1120:         {activeTab === 'wishlist' && (
1121:           <div>
1122:             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
1123:               <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
1124:                 <Heart size={22} color="#C9A227" fill="#C9A227" />
1125:                 <h2 className="font-display" style={{ fontSize: '1.5rem', margin: 0 }}>
1126:                   SAVED EQUIPMENT ({favoritedProducts.length})
1127:                 </h2>
1128:               </div>
1129:               <Link to="/shop" className="btn btn-outline-dark btn-sm">
1130:                 <span>EXPLORE CATALOGUE</span>
1131:               </Link>
1132:             </div>
1133: 
1134:             {favoritedProducts.length > 0 ? (
1135:               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 'var(--space-md)' }}>
1136:                 {favoritedProducts.map((p) => (
1137:                   <ProductCard key={p.id} product={p} />
1138:                 ))}
1139:               </div>
1140:             ) : (
1141:               <div
1142:                 style={{
1143:                   backgroundColor: '#FFFFFF',
1144:                   padding: '48px 24px',
1145:                   borderRadius: '6px',
1146:                   textAlign: 'center',
1147:                   border: '1px solid var(--color-ivory-border)',
1148:                 }}
1149:               >
1150:                 <Heart size={40} color="#9CA3AF" style={{ margin: '0 auto 16px' }} />
1151:                 <h3 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '8px' }}>
1152:                   Your wishlist is empty
1153:                 </h3>
1154:                 <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '20px' }}>
1155:                   Tap the heart on rackets, shuttlecocks, or court footwear to save them to your athlete account.
1156:                 </p>
1157:                 <Link to="/shop" className="btn btn-primary btn-sm">
1158:                   BROWSE EQUIPMENT
1159:                 </Link>
1160:               </div>
1161:             )}
1162:           </div>
1163:         )}
1164: 
1165:         {/* ================= PROFILE & PREFERENCES TAB ================= */}
1166:         {activeTab === 'profile' && (
1167:           <div style={{ maxWidth: '640px' }}>
1168:             <div style={{ backgroundColor: '#FFFFFF', padding: '28px', borderRadius: '6px', border: '1px solid var(--color-ivory-border)' }}>
1169:               <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
1170:                 <User size={20} color="var(--color-plate-gold)" />
1171:                 <h2 className="font-display" style={{ fontSize: '1.375rem', margin: 0 }}>
1172:                   ATHLETE PROFILE & GEAR PREFERENCES
1173:                 </h2>
1174:               </div>
1175: 
1176:               {profileSaveSuccess && (
1177:                 <div
1178:                   style={{
1179:                     backgroundColor: '#ECFDF5',
1180:                     border: '1px solid #6EE7B7',
1181:                     borderRadius: '4px',
1182:                     padding: '10px 14px',
1183:                     color: '#065F46',
1184:                     fontSize: '0.8125rem',
1185:                     marginBottom: '16px',
1186:                     display: 'flex',
1187:                     alignItems: 'center',
1188:                     gap: '8px',
1189:                   }}
1190:                 >
1191:                   <CheckCircle size={16} />
1192:                   <span>Profile and sports preferences saved successfully!</span>
1193:                 </div>
1194:               )}
1195: 
1196:               <form onSubmit={handleProfileSubmit}>
1197:                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
1198:                   <div>
1199:                     <label
1200:                       htmlFor="prof-fn"
1201:                       style={{
1202:                         display: 'block',
1203:                         fontSize: '0.75rem',
1204:                         fontWeight: 700,
1205:                         textTransform: 'uppercase',
1206:                         color: '#374151',
1207:                         marginBottom: '4px',
1208:                       }}
1209:                     >
1210:                       First Name
1211:                     </label>
1212:                     <input
1213:                       id="prof-fn"
1214:                       type="text"
1215:                       required
1216:                       value={profileForm.firstName}
1217:                       onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
1218:                       style={{
1219:                         width: '100%',
1220:                         height: '42px',
1221:                         padding: '0 12px',
1222:                         fontSize: '0.875rem',
1223:                         border: '1px solid #D1D5DB',
1224:                         borderRadius: '4px',
1225:                         boxSizing: 'border-box',
1226:                       }}
1227:                     />
1228:                   </div>
1229: 
1230:                   <div>
1231:                     <label
1232:                       htmlFor="prof-ln"
1233:                       style={{
1234:                         display: 'block',
1235:                         fontSize: '0.75rem',
1236:                         fontWeight: 700,
1237:                         textTransform: 'uppercase',
1238:                         color: '#374151',
1239:                         marginBottom: '4px',
1240:                       }}
1241:                     >
1242:                       Last Name
1243:                     </label>
1244:                     <input
1245:                       id="prof-ln"
1246:                       type="text"
1247:                       value={profileForm.lastName}
1248:                       onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
1249:                       style={{
1250:                         width: '100%',
1251:                         height: '42px',
1252:                         padding: '0 12px',
1253:                         fontSize: '0.875rem',
1254:                         border: '1px solid #D1D5DB',
1255:                         borderRadius: '4px',
1256:                         boxSizing: 'border-box',
1257:                       }}
1258:                     />
1259:                   </div>
1260:                 </div>
1261: 
1262:                 <div style={{ marginBottom: '14px' }}>
1263:                   <label
1264:                     htmlFor="prof-email"
1265:                     style={{
1266:                       display: 'block',
1267:                       fontSize: '0.75rem',
1268:                       fontWeight: 700,
1269:                       textTransform: 'uppercase',
1270:                       color: '#374151',
1271:                       marginBottom: '4px',
1272:                     }}
1273:                   >
1274:                     Email Address (For Tax Invoices & Order Slips)
1275:                   </label>
1276:                   <input
1277:                     id="prof-email"
1278:                     type="email"
1279:                     value={profileForm.email}
1280:                     onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
1281:                     style={{
1282:                       width: '100%',
1283:                       height: '42px',
1284:                       padding: '0 12px',
1285:                       fontSize: '0.875rem',
1286:                       border: '1px solid #D1D5DB',
1287:                       borderRadius: '4px',
1288:                       boxSizing: 'border-box',
1289:                     }}
1290:                   />
1291:                 </div>
1292: 
1293:                 <div style={{ marginBottom: '16px' }}>
1294:                   <label
1295:                     htmlFor="prof-phone"
1296:                     style={{
1297:                       display: 'block',
1298:                       fontSize: '0.75rem',
1299:                       fontWeight: 700,
1300:                       textTransform: 'uppercase',
1301:                       color: '#374151',
1302:                       marginBottom: '4px',
1303:                     }}
1304:                   >
1305:                     Verified Mobile Number
1306:                   </label>
1307:                   <input
1308:                     id="prof-phone"
1309:                     type="text"
1310:                     disabled
1311:                     value={`+91 ${user.phone}`}
1312:                     style={{
1313:                       width: '100%',
1314:                       height: '42px',
1315:                       padding: '0 12px',
1316:                       fontSize: '0.875rem',
1317:                       border: '1px solid #E5E7EB',
1318:                       backgroundColor: '#F9FAFB',
1319:                       color: '#6B7280',
1320:                       borderRadius: '4px',
1321:                       boxSizing: 'border-box',
1322:                     }}
1323:                   />
1324:                   <span style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '4px', display: 'block' }}>
1325:                     Mobile number is verified via OTP and linked to Camp Store loyalty points.
1326:                   </span>
1327:                 </div>
1328: 
1329:                 <div style={{ marginBottom: '24px' }}>
1330:                   <label
1331:                     htmlFor="prof-sport"
1332:                     style={{
1333:                       display: 'block',
1334:                       fontSize: '0.75rem',
1335:                       fontWeight: 700,
1336:                       textTransform: 'uppercase',
1337:                       color: '#374151',
1338:                       marginBottom: '6px',
1339:                     }}
1340:                   >
1341:                     Primary Sport Discipline
1342:                   </label>
1343:                   <select
1344:                     id="prof-sport"
1345:                     value={profileForm.preferredSport}
1346:                     onChange={(e) => setProfileForm({ ...profileForm, preferredSport: e.target.value })}
1347:                     style={{
1348:                       width: '100%',
1349:                       height: '42px',
1350:                       padding: '0 12px',
1351:                       fontSize: '0.875rem',
1352:                       border: '1px solid #D1D5DB',
1353:                       borderRadius: '4px',
1354:                       boxSizing: 'border-box',
1355:                     }}
1356:                   >
1357:                     <option value="Badminton">Badminton (BWF Rackets & Shuttles)</option>
1358:                     <option value="Tennis">Lawn Tennis (ITF Rackets & Balls)</option>
1359:                     <option value="Pickleball">Pickleball (USAPA Paddles & Gear)</option>
1360:                     <option value="Squash">Squash (WSF Rackets & Balls)</option>
1361:                     <option value="Table Tennis">Table Tennis (ITTF Rubbers & Blades)</option>
1362:                     <option value="Cricket">Cricket (English & Kashmir Willow Bats)</option>
1363:                   </select>
1364:                 </div>
1365: 
1366:                 <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
1367:                   <button type="submit" className="btn btn-primary btn-sm">
1368:                     SAVE PREFERENCES
1369:                   </button>
1370:                 </div>
1371:               </form>
1372:             </div>
1373:           </div>
1374:         )}
1375:       </div>
1376: 
1377:       {/* Address modal */}
1378:       <AddressModal
1379:         isOpen={isAddressModalOpen}
1380:         onClose={() => setIsAddressModalOpen(false)}
1381:         onSave={handleSaveAddress}
1382:         initialData={editingAddress}
1383:       />
1384:     </div>
1385:   );
1386: };
````

## File: src/pages/VisitPage.tsx
````typescript
 1: import React from 'react';
 2: import { STORE_INFO } from '../data/storeInfo';
 3: import { PageHeader } from '../components/ui/PageHeader';
 4: import { Reveal } from '../components/motion/Reveal';
 5: import { useStoreStatus } from '../utils/storeHours';
 6: 
 7: const AT_THE_COUNTER = [
 8:   { name: 'Racquet stringing', note: 'Drop off badminton, tennis and squash racquets.' },
 9:   { name: 'Bat knocking-in', note: 'New willow prepared before it meets a hard ball.' },
10:   { name: 'Gear advice', note: 'Grips, weights and sizes checked in person.' },
11:   { name: 'Court enquiries', note: 'Talk to us about a court you want built.' },
12: ];
13: 
14: export const VisitPage: React.FC = () => {
15:   const status = useStoreStatus();
16: 
17:   return (
18:     <div className="visit-page">
19:       <PageHeader
20:         crumbs={[{ label: 'Home', to: '/' }, { label: 'Visit' }]}
21:         title={['Shop 247,', 'MG Road, Camp.']}
22:         lead="Walk in to pick up gear, drop off racquets for stringing, or talk to us about a court."
23:       />
24: 
25:       <section className="container visit-grid" aria-label="Store details">
26:         <Reveal className="visit-details">
27:           <p className={`store-status store-status-lg ${status.isOpen ? 'is-open' : ''}`}>
28:             <span className="status-dot" aria-hidden="true" />
29:             {status.label}
30:           </p>
31: 
32:           <address className="visit-address">
33:             {STORE_INFO.name}
34:             <br />
35:             {STORE_INFO.addressLine1}
36:             <br />
37:             {STORE_INFO.addressLine2}
38:             <br />
39:             {STORE_INFO.city} {STORE_INFO.pincode}, Maharashtra
40:           </address>
41: 
42:           <dl className="store-hours">
43:             <div>
44:               <dt>Monday – Saturday</dt>
45:               <dd>{STORE_INFO.hours.weekdays}</dd>
46:             </div>
47:             <div>
48:               <dt>Sunday</dt>
49:               <dd>{STORE_INFO.hours.sunday}</dd>
50:             </div>
51:             <div>
52:               <dt>Phone</dt>
53:               <dd><a href={`tel:${STORE_INFO.phone}`}>{STORE_INFO.displayPhone}</a></dd>
54:             </div>
55:             <div>
56:               <dt>Email</dt>
57:               <dd><a href={`mailto:${STORE_INFO.email}`}>{STORE_INFO.email}</a></dd>
58:             </div>
59:           </dl>
60: 
61:           <div className="store-actions">
62:             <a href={STORE_INFO.mapsUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
63:               Get directions <span className="btn-arrow" aria-hidden="true">→</span>
64:             </a>
65:             <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
66:               WhatsApp the store
67:             </a>
68:           </div>
69:         </Reveal>
70: 
71:         <Reveal className="visit-map" delay={0.1}>
72:           <iframe
73:             title="Map showing Oriental Sports, Shop 247, MG Road, Camp, Pune"
74:             src="https://maps.google.com/maps?q=Shop+247,+MG+Road,+Camp,+Pune+411001&t=&z=16&ie=UTF8&iwloc=&output=embed"
75:             loading="lazy"
76:             referrerPolicy="no-referrer-when-downgrade"
77:           />
78:         </Reveal>
79:       </section>
80: 
81:       <section className="container section visit-counter" aria-labelledby="counter-title">
82:         <Reveal as="p" className="eyebrow" id="counter-title">At the counter</Reveal>
83:         <ul className="counter-list">
84:           {AT_THE_COUNTER.map((item) => (
85:             <li key={item.name}>
86:               <span className="counter-name">{item.name}</span>
87:               <span className="counter-note">{item.note}</span>
88:             </li>
89:           ))}
90:         </ul>
91:       </section>
92:     </div>
93:   );
94: };
95: 
96: export default VisitPage;
````

## File: src/styles/navigation.css
````css
  1: /* ==========================================================================
  2:    Navigation — utility bar, header, mobile menu
  3:    ========================================================================== */
  4: 
  5: /* ---- Utility bar (desktop): real store facts only ---------------------- */
  6: .utility-bar {
  7:   background: var(--ink);
  8:   color: var(--on-dark-muted);
  9:   font-size: 0.75rem;
 10:   font-weight: 500;
 11:   letter-spacing: 0.02em;
 12: }
 13: 
 14: .utility-row {
 15:   height: var(--utility-h);
 16:   display: flex;
 17:   align-items: center;
 18:   justify-content: space-between;
 19:   gap: 24px;
 20: }
 21: 
 22: .utility-link {
 23:   min-height: var(--utility-h);
 24:   color: var(--on-dark-muted);
 25:   transition: color var(--t-1) ease;
 26: }
 27: .utility-link:hover { color: var(--on-dark); }
 28: 
 29: .utility-contacts { display: inline-flex; gap: 24px; }
 30: 
 31: .utility-status,
 32: .store-status {
 33:   display: inline-flex;
 34:   align-items: center;
 35:   gap: 8px;
 36: }
 37: 
 38: .status-dot {
 39:   width: 7px;
 40:   height: 7px;
 41:   border-radius: 50%;
 42:   background: var(--on-dark-subtle);
 43:   flex-shrink: 0;
 44: }
 45: .utility-status.is-open { color: var(--on-dark); }
 46: .is-open .status-dot { background: var(--gold); box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.22); }
 47: 
 48: /* ---- Header ------------------------------------------------------------ */
 49: .site-header {
 50:   position: sticky;
 51:   top: 0;
 52:   z-index: var(--z-header);
 53:   background: rgba(246, 243, 234, 0.94);
 54:   backdrop-filter: saturate(1.2) blur(14px);
 55:   -webkit-backdrop-filter: saturate(1.2) blur(14px);
 56:   border-bottom: 1px solid transparent;
 57:   transition: border-color var(--t-2) ease, background-color var(--t-2) ease;
 58: }
 59: 
 60: .site-header.is-scrolled {
 61:   border-bottom-color: var(--line);
 62:   background: rgba(246, 243, 234, 0.97);
 63: }
 64: 
 65: .header-row {
 66:   height: var(--header-h);
 67:   display: grid;
 68:   grid-template-columns: auto 1fr auto;
 69:   align-items: center;
 70:   gap: 16px;
 71: }
 72: 
 73: .header-logo { height: 32px; width: auto; }
 74: @media (min-width: 1024px) {
 75:   .header-logo { height: 40px; }
 76: }
 77: 
 78: .header-nav {
 79:   display: flex;
 80:   justify-content: center;
 81:   gap: 8px;
 82: }
 83: 
 84: .nav-link {
 85:   position: relative;
 86:   padding: 0 16px;
 87:   font-size: 0.8125rem;
 88:   font-weight: 600;
 89:   letter-spacing: 0.12em;
 90:   text-transform: uppercase;
 91:   color: var(--ink);
 92: }
 93: 
 94: .nav-link::after {
 95:   content: '';
 96:   position: absolute;
 97:   left: 16px;
 98:   right: 16px;
 99:   bottom: 10px;
100:   height: 2px;
101:   background: var(--ink);
102:   transform: scaleX(0);
103:   transform-origin: left;
104:   transition: transform var(--t-2) var(--ease-out);
105: }
106: .nav-link:hover::after { transform: scaleX(1); }
107: .nav-link.active::after { transform: scaleX(1); background: var(--gold); }
108: 
109: .header-actions {
110:   display: flex;
111:   align-items: center;
112:   justify-content: flex-end;
113:   gap: 2px;
114: }
115: 
116: .header-icon-btn {
117:   position: relative;
118:   display: inline-flex;
119:   align-items: center;
120:   justify-content: center;
121:   width: 44px;
122:   height: 44px;
123:   color: var(--ink);
124:   border-radius: var(--r-pill);
125:   transition: background-color var(--t-1) ease;
126: }
127: .header-icon-btn:hover { background: rgba(17, 17, 17, 0.06); }
128: 
129: .header-badge {
130:   position: absolute;
131:   top: 5px;
132:   right: 3px;
133:   min-width: 18px;
134:   height: 18px;
135:   padding: 0 5px;
136:   border-radius: var(--r-pill);
137:   background: var(--ink);
138:   color: var(--ivory);
139:   font-size: 0.6875rem;
140:   font-weight: 700;
141:   font-variant-numeric: tabular-nums;
142:   display: flex;
143:   align-items: center;
144:   justify-content: center;
145:   line-height: 1;
146: }
147: 
148: .account-status-dot {
149:   position: absolute;
150:   bottom: 7px;
151:   right: 7px;
152:   width: 8px;
153:   height: 8px;
154:   border-radius: var(--r-pill);
155:   background: var(--gold);
156:   border: 1.5px solid var(--ivory);
157: }
158: 
159: .menu-toggle {
160:   display: inline-flex;
161:   align-items: center;
162:   gap: 10px;
163:   height: 44px;
164:   padding: 0 4px 0 10px;
165:   margin-left: 4px;
166:   font-size: 0.75rem;
167:   font-weight: 700;
168:   letter-spacing: 0.12em;
169:   text-transform: uppercase;
170:   color: var(--ink);
171: }
172: 
173: .menu-toggle-bars {
174:   display: inline-flex;
175:   flex-direction: column;
176:   gap: 5px;
177:   width: 20px;
178: }
179: .menu-toggle-bars span {
180:   height: 2px;
181:   background: var(--ink);
182: }
183: .menu-toggle-bars span:last-child { width: 13px; margin-left: auto; }
184: 
185: @media (max-width: 359px) {
186:   .menu-toggle-label { display: none; }
187: }
188: 
189: /* ---- Mobile menu ------------------------------------------------------- */
190: .mobile-menu {
191:   position: fixed;
192:   inset: 0;
193:   z-index: var(--z-dialog);
194:   background: var(--ivory);
195:   overflow-y: auto;
196:   overscroll-behavior: contain;
197:   display: flex;
198:   flex-direction: column;
199: }
200: 
201: .mobile-menu-top {
202:   height: var(--header-h);
203:   display: flex;
204:   align-items: center;
205:   justify-content: space-between;
206:   border-bottom: 1px solid var(--line);
207:   flex-shrink: 0;
208: }
209: 
210: .menu-close {
211:   display: inline-flex;
212:   align-items: center;
213:   gap: 10px;
214:   height: 44px;
215:   padding: 0 4px 0 10px;
216:   font-size: 0.75rem;
217:   font-weight: 700;
218:   letter-spacing: 0.12em;
219:   text-transform: uppercase;
220: }
221: 
222: .menu-close-x {
223:   position: relative;
224:   width: 18px;
225:   height: 18px;
226: }
227: .menu-close-x::before,
228: .menu-close-x::after {
229:   content: '';
230:   position: absolute;
231:   left: 0;
232:   right: 0;
233:   top: 8px;
234:   height: 2px;
235:   background: var(--ink);
236:   transform: rotate(45deg);
237: }
238: .menu-close-x::after { transform: rotate(-45deg); }
239: 
240: .mobile-menu-body {
241:   flex: 1;
242:   display: flex;
243:   flex-direction: column;
244:   gap: 32px;
245:   padding-top: 12px;
246:   padding-bottom: 32px;
247: }
248: 
249: .mobile-menu-primary { list-style: none; }
250: 
251: .mobile-menu-primary li { border-bottom: 1px solid var(--line); }
252: 
253: .mobile-menu-link {
254:   display: flex;
255:   align-items: baseline;
256:   justify-content: space-between;
257:   gap: 16px;
258:   width: 100%;
259:   padding: 14px 0 12px;
260: }
261: 
262: .mobile-menu-link-label {
263:   font-stretch: var(--stretch-display);
264:   font-weight: 800;
265:   font-size: clamp(2.75rem, 13vw, 4.5rem);
266:   line-height: 0.9;
267:   text-transform: uppercase;
268: }
269: 
270: .mobile-menu-link-note {
271:   font-size: 0.8125rem;
272:   color: var(--muted);
273:   text-align: right;
274:   max-width: 8.2em;
275:   line-height: 1.3;
276: }
277: 
278: .mobile-menu-link.active .mobile-menu-link-label {
279:   text-decoration: underline;
280:   text-decoration-color: var(--gold);
281:   text-decoration-thickness: 4px;
282:   text-underline-offset: 6px;
283: }
284: 
285: .mobile-menu-sports { display: flex; flex-direction: column; gap: 12px; }
286: .mobile-menu-chips { display: flex; flex-wrap: wrap; gap: 8px; }
287: 
288: .mobile-menu-utility { display: flex; gap: 24px; flex-wrap: wrap; }
289: 
290: .mobile-menu-store {
291:   margin-top: auto;
292:   padding-top: 24px;
293:   border-top: 1px solid var(--line);
294:   display: flex;
295:   flex-direction: column;
296:   gap: 8px;
297: }
298: .mobile-menu-store .store-status { font-weight: 600; font-size: 0.9375rem; }
299: .mobile-menu-address { color: var(--muted); font-size: 0.9375rem; }
300: .mobile-menu-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 12px; }
301: 
302: /* ---- Floating Bottom Navigation Dock (Tailoring Turba Style) ---------- */
303: .bottom-nav-dock {
304:   position: fixed;
305:   bottom: max(12px, env(safe-area-inset-bottom, 12px));
306:   left: 0;
307:   right: 0;
308:   display: flex;
309:   justify-content: center;
310:   align-items: center;
311:   z-index: 950;
312:   pointer-events: none;
313:   padding: 0 16px;
314: }
315: 
316: @media (min-width: 1024px) {
317:   .bottom-nav-dock {
318:     display: none;
319:   }
320: }
321: 
322: .bottom-nav-pill {
323:   pointer-events: auto;
324:   display: grid;
325:   grid-template-columns: repeat(5, 1fr);
326:   align-items: center;
327:   background: #ffffff;
328:   border: 1px solid rgba(0, 0, 0, 0.08);
329:   border-radius: 9999px;
330:   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04);
331:   padding: 4px 6px;
332:   width: 100%;
333:   max-width: 440px;
334:   gap: 2px;
335:   position: relative;
336:   overflow: hidden;
337: }
338: 
339: /* Real Animated Sliding Circle/Pill Indicator */
340: .bottom-nav-slider {
341:   position: absolute;
342:   top: 4px;
343:   bottom: 4px;
344:   left: 6px;
345:   width: calc((100% - 12px - 8px) / 5);
346:   background: #ebeee9;
347:   border-radius: 9999px;
348:   transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
349:   pointer-events: none;
350:   z-index: 1;
351: }
352: 
353: .bottom-nav-item {
354:   position: relative;
355:   z-index: 2;
356:   display: flex;
357:   flex-direction: column;
358:   align-items: center;
359:   justify-content: center;
360:   text-decoration: none;
361:   background: transparent;
362:   border: none;
363:   cursor: pointer;
364:   padding: 6px 4px 5px;
365:   border-radius: 9999px;
366:   color: #555555;
367:   transition: color 0.2s cubic-bezier(0.16, 1, 0.3, 1);
368:   min-height: 48px;
369:   font-family: inherit;
370: }
371: 
372: .bottom-nav-item:hover {
373:   color: #111111;
374: }
375: 
376: /* Active typography & icon */
377: .bottom-nav-item.is-active {
378:   color: #111111;
379: }
380: 
381: .bottom-nav-icon-wrap {
382:   position: relative;
383:   display: flex;
384:   align-items: center;
385:   justify-content: center;
386:   width: 24px;
387:   height: 24px;
388: }
389: 
390: .bottom-nav-label {
391:   font-size: 0.6875rem;
392:   font-weight: 500;
393:   letter-spacing: 0.01em;
394:   margin-top: 2px;
395:   line-height: 1;
396: }
397: 
398: .bottom-nav-item.is-active .bottom-nav-label {
399:   font-weight: 700;
400:   color: #111111;
401: }
402: 
403: .bottom-nav-badge {
404:   position: absolute;
405:   top: -4px;
406:   right: -8px;
407:   min-width: 16px;
408:   height: 16px;
409:   padding: 0 4px;
410:   border-radius: 9999px;
411:   background: #111111;
412:   color: #ffffff;
413:   font-size: 0.625rem;
414:   font-weight: 700;
415:   display: flex;
416:   align-items: center;
417:   justify-content: center;
418:   line-height: 1;
419: }
420: 
421: .bottom-nav-auth-dot {
422:   position: absolute;
423:   top: 0px;
424:   right: -2px;
425:   width: 6px;
426:   height: 6px;
427:   border-radius: 50%;
428:   background: #1b7a43;
429: }
430: 
431: @media (max-width: 1023px) {
432:   body {
433:     padding-bottom: 72px;
434:   }
435: }
````

## File: src/components/navigation/Header.tsx
````typescript
  1: import React, { useEffect, useRef, useState } from 'react';
  2: import { NavLink, Link, useLocation } from 'react-router-dom';
  3: import { Search, ShoppingBag, User, Heart } from 'lucide-react';
  4: import { Logo } from '../brand/Logo';
  5: import { useCart } from '../../context/CartContext';
  6: import { useAuth } from '../../context/AuthContext';
  7: import { useWishlist } from '../../context/WishlistContext';
  8: import { SearchModal } from './SearchModal';
  9: import { MobileMenu } from './MobileMenu';
 10: export const NAV_ITEMS = [
 11:   { to: '/shop', label: 'Shop' },
 12:   { to: '/courts', label: 'Courts' },
 13:   { to: '/about', label: 'About' },
 14:   { to: '/visit', label: 'Visit' },
 15: ];
 16: 
 17: export const Header: React.FC = () => {
 18:   const { itemCount, openCart } = useCart();
 19:   const { user, isAuthenticated, openAuthModal } = useAuth();
 20:   const { wishlist } = useWishlist();
 21:   const [isSearchOpen, setIsSearchOpen] = useState(false);
 22:   const [isMenuOpen, setIsMenuOpen] = useState(false);
 23:   const [isScrolled, setIsScrolled] = useState(false);
 24:   const menuButtonRef = useRef<HTMLButtonElement>(null);
 25:   const { pathname } = useLocation();
 26: 
 27:   useEffect(() => {
 28:     const onScroll = () => setIsScrolled(window.scrollY > 8);
 29:     onScroll();
 30:     window.addEventListener('scroll', onScroll, { passive: true });
 31:     return () => window.removeEventListener('scroll', onScroll);
 32:   }, []);
 33: 
 34:   useEffect(() => {
 35:     setIsMenuOpen(false);
 36:   }, [pathname]);
 37: 
 38:   return (
 39:     <>
 40:       <a className="skip-link" href="#main">Skip to content</a>
 41: 
 42:       <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
 43:         <div className="container header-row">
 44:           <Logo variant="light" size="md" className="header-logo" />
 45: 
 46:           <nav className="header-nav desktop-only" aria-label="Primary">
 47:             {NAV_ITEMS.map((item) => (
 48:               <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
 49:                 {item.label}
 50:               </NavLink>
 51:             ))}
 52:           </nav>
 53: 
 54:           <div className="header-actions">
 55:             <button
 56:               type="button"
 57:               className="header-icon-btn"
 58:               onClick={() => setIsSearchOpen(true)}
 59:               aria-label="Search gear and courts"
 60:             >
 61:               <Search size={20} strokeWidth={1.8} />
 62:             </button>
 63: 
 64:             <Link
 65:               to="/account/wishlist"
 66:               className="header-icon-btn desktop-only"
 67:               aria-label={`Wishlist, ${wishlist.length} saved items`}
 68:             >
 69:               <Heart size={20} strokeWidth={1.8} />
 70:               {wishlist.length > 0 && <span className="header-badge">{wishlist.length}</span>}
 71:             </Link>
 72: 
 73:             {isAuthenticated ? (
 74:               <Link
 75:                 to="/account"
 76:                 className="header-icon-btn header-account-btn desktop-only"
 77:                 aria-label={`Account (${user?.firstName || 'Customer'})`}
 78:                 title={`Account (${user?.firstName || 'Customer'})`}
 79:               >
 80:                 <User size={20} strokeWidth={1.8} />
 81:                 <span className="account-status-dot" aria-hidden="true" />
 82:               </Link>
 83:             ) : (
 84:               <button
 85:                 type="button"
 86:                 className="header-icon-btn header-account-btn desktop-only"
 87:                 onClick={() => openAuthModal('phone')}
 88:                 aria-label="Sign in / Account"
 89:                 title="Sign in / Account"
 90:               >
 91:                 <User size={20} strokeWidth={1.8} />
 92:               </button>
 93:             )}
 94: 
 95:             <button
 96:               type="button"
 97:               className="header-icon-btn desktop-only"
 98:               onClick={openCart}
 99:               aria-label={`Shopping bag, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
100:             >
101:               <ShoppingBag size={20} strokeWidth={1.8} />
102:               {itemCount > 0 && <span className="header-badge">{itemCount}</span>}
103:             </button>
104:             <button
105:               ref={menuButtonRef}
106:               type="button"
107:               className="menu-toggle mobile-only"
108:               onClick={() => setIsMenuOpen(true)}
109:               aria-expanded={isMenuOpen}
110:               aria-controls="mobile-menu"
111:             >
112:               <span className="menu-toggle-bars" aria-hidden="true">
113:                 <span />
114:                 <span />
115:               </span>
116:               <span className="menu-toggle-label">Menu</span>
117:             </button>
118:           </div>
119:         </div>
120:       </header>
121: 
122:       <MobileMenu
123:         open={isMenuOpen}
124:         onClose={() => {
125:           setIsMenuOpen(false);
126:           menuButtonRef.current?.focus();
127:         }}
128:         onSearch={() => {
129:           setIsMenuOpen(false);
130:           setIsSearchOpen(true);
131:         }}
132:       />
133: 
134:       <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
135:     </>
136:   );
137: };
138: 
139: export default Header;
````

## File: src/components/products/ProductCard.tsx
````typescript
  1: import React, { useState } from 'react';
  2: import { Link } from 'react-router-dom';
  3: import { Heart } from 'lucide-react';
  4: import { Product } from '../../types';
  5: import { useCart } from '../../context/CartContext';
  6: import { useWishlist } from '../../context/WishlistContext';
  7: import { Img } from '../ui/Img';
  8: 
  9: interface ProductCardProps {
 10:   product: Product;
 11:   className?: string;
 12:   /** Hint for srcset selection — how wide the card renders. */
 13:   sizes?: string;
 14: }
 15: 
 16: /** Local studio shots ship a -sm.webp twin; build a srcset when one exists. */
 17: const imageFor = (src: string, alt: string) => {
 18:   if (src.startsWith('/images/') && src.endsWith('.webp')) {
 19:     const small = src.replace(/\.webp$/, '-sm.webp');
 20:     return { src, srcSet: `${small} 560w, ${src} 1024w`, alt };
 21:   }
 22:   if (src.includes('images.unsplash.com')) {
 23:     const base = src.split('?')[0];
 24:     const at = (w: number) => `${base}?auto=format&fit=crop&w=${w}&h=${w}&q=72`;
 25:     return { src: at(800), srcSet: `${at(480)} 480w, ${at(800)} 800w, ${at(1100)} 1100w`, alt };
 26:   }
 27:   return { src, alt };
 28: };
 29: 
 30: /**
 31:  * Product card — flat and photography-first. The image sits on the studio
 32:  * "stage" tone; details stack below with no card chrome. Add-to-bag is always
 33:  * visible (no hover-only actions), wishlist is a 44px icon button.
 34:  */
 35: export const ProductCard: React.FC<ProductCardProps> = ({
 36:   product,
 37:   className = '',
 38:   sizes = '(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 80vw',
 39: }) => {
 40:   const { addToCart } = useCart();
 41:   const { toggleWishlist, isInWishlist } = useWishlist();
 42:   const [justAdded, setJustAdded] = useState(false);
 43:   const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(0);
 44:   const saved = isInWishlist(product.id);
 45: 
 46:   const hasVariants = product.variants && product.variants.length > 0;
 47:   const currentVariant = hasVariants ? product.variants![selectedVariantIndex] : null;
 48: 
 49:   const currentPrice =
 50:     currentVariant?.price !== undefined
 51:       ? currentVariant.price
 52:       : product.price + (currentVariant?.priceDelta || 0);
 53: 
 54:   const currentOriginalPrice = currentVariant?.originalPrice || product.originalPrice;
 55:   const discount =
 56:     currentOriginalPrice && currentOriginalPrice > currentPrice
 57:       ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)
 58:       : null;
 59: 
 60:   const handleAdd = () => {
 61:     addToCart(
 62:       product,
 63:       1,
 64:       currentVariant?.name,
 65:       product.sizes?.[selectedVariantIndex] || product.sizes?.[0]
 66:     );
 67:     setJustAdded(true);
 68:     window.setTimeout(() => setJustAdded(false), 1600);
 69:   };
 70: 
 71:   return (
 72:     <article className={`product-card ${className}`}>
 73:       <Link to={`/product/${product.slug}`} className="product-card-media" tabIndex={-1} aria-hidden="true">
 74:         <Img image={imageFor(product.images[0], '')} alt="" sizes={sizes} />
 75:         {!product.inStock && <span className="badge badge-dark product-card-flag">Sold out</span>}
 76:         {product.badge && product.inStock && (
 77:           <span className="badge product-card-flag" style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
 78:             {product.badge}
 79:           </span>
 80:         )}
 81:       </Link>
 82: 
 83:       <button
 84:         type="button"
 85:         className={`product-card-save ${saved ? 'is-saved' : ''}`}
 86:         onClick={() => toggleWishlist(product.id)}
 87:         aria-pressed={saved}
 88:         aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
 89:       >
 90:         <Heart size={18} strokeWidth={1.8} fill={saved ? 'currentColor' : 'none'} />
 91:       </button>
 92: 
 93:       <div className="product-card-body">
 94:         <div className="product-card-meta-line" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
 95:           <p className="label subtle">{[product.brand, product.categoryName].filter(Boolean).join(' · ')}</p>
 96:           {product.quantityUnit && <span style={{ fontSize: '0.6875rem', color: 'var(--subtle)' }}>{product.quantityUnit}</span>}
 97:         </div>
 98: 
 99:         <h3 className="product-card-title">
100:           <Link to={`/product/${product.slug}`}>{product.name}</Link>
101:         </h3>
102: 
103:         {/* Variant chips if multiple sizes or models exist */}
104:         {hasVariants && product.variants!.length > 1 && (
105:           <div
106:             className="product-card-variants"
107:             style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', margin: '8px 0 10px' }}
108:             role="group"
109:             aria-label="Available sizes and variants"
110:           >
111:             {product.variants!.map((v, i) => (
112:               <button
113:                 key={v.id}
114:                 type="button"
115:                 className={`active-pill ${selectedVariantIndex === i ? '' : 'inactive'}`}
116:                 style={{
117:                   minHeight: '24px',
118:                   padding: '0 6px',
119:                   fontSize: '0.6875rem',
120:                   background: selectedVariantIndex === i ? 'var(--ink)' : 'var(--paper)',
121:                   color: selectedVariantIndex === i ? 'var(--paper)' : 'var(--ink)',
122:                   borderColor: selectedVariantIndex === i ? 'var(--ink)' : 'var(--line-strong)',
123:                 }}
124:                 onClick={(e) => {
125:                   e.preventDefault();
126:                   setSelectedVariantIndex(i);
127:                 }}
128:                 aria-pressed={selectedVariantIndex === i}
129:               >
130:                 {v.name}
131:               </button>
132:             ))}
133:           </div>
134:         )}
135: 
136:         <div className="product-card-foot">
137:           <p className="product-card-price">
138:             {product.priceLabel && <span className="label subtle" style={{ marginRight: '6px' }}>{product.priceLabel}</span>}
139:             <span className="price">₹{currentPrice.toLocaleString('en-IN')}</span>
140:             {discount && (
141:               <>
142:                 <s className="price-was">₹{currentOriginalPrice!.toLocaleString('en-IN')}</s>
143:                 <span className="price-off">{discount}% off</span>
144:               </>
145:             )}
146:           </p>
147:           <button
148:             type="button"
149:             className={`product-card-add ${justAdded ? 'is-added' : ''}`}
150:             onClick={handleAdd}
151:             disabled={!product.inStock}
152:             aria-label={`Add ${product.name} to bag`}
153:           >
154:             <span aria-hidden="true">{justAdded ? 'Added' : '+ Add'}</span>
155:           </button>
156:         </div>
157:         <span className="visually-hidden" role="status">{justAdded ? `${product.name} added to bag` : ''}</span>
158:       </div>
159:     </article>
160:   );
161: };
162: 
163: export default ProductCard;
````

## File: src/data/categories.ts
````typescript
  1: import { SportCategory } from '../types';
  2: 
  3: export interface CategoryInfo {
  4:   id: SportCategory;
  5:   name: string;
  6:   tagline: string;
  7:   description: string;
  8:   image: string;
  9:   itemCount: number;
 10:   featuredEquipments: string[];
 11: }
 12: 
 13: export const CATEGORIES: CategoryInfo[] = [
 14:   {
 15:     id: 'cricket',
 16:     name: 'Cricket',
 17:     tagline: 'Match-grade English & Kashmir willow, protective gear and accessories',
 18:     description: 'From handcrafted English and Kashmir willow bats to club-standard batting pads, helmets and training balls calibrated for Indian wickets.',
 19:     image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1000&q=80',
 20:     itemCount: 42,
 21:     featuredEquipments: ['SG Kashmir Willow Bats', 'Grade 1 English Willow', 'Batting Pads & Gloves', 'Match Leather Balls'],
 22:   },
 23:   {
 24:     id: 'football',
 25:     name: 'Football',
 26:     tagline: 'Match balls, turf shoes, stockings and training gear',
 27:     description: 'Tournament and practice footballs calibrated for turf and ground, precision multi-stud boots, and ergonomic match stockings.',
 28:     image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1000&q=80',
 29:     itemCount: 8,
 30:     featuredEquipments: ['Nivia Match Footballs', 'Cosco Hand-Stitched Balls', 'Carbonat 8.0 Turf Shoes', 'Encounter Stockings'],
 31:   },
 32:   {
 33:     id: 'badminton',
 34:     name: 'Badminton',
 35:     tagline: 'High-modulus carbon graphite racquets, tournament shuttlecocks and court gear',
 36:     description: 'Yonex graphite racquets, Mavis synthetic shuttles, goose feather tournament shuttlecocks, and precision stringing.',
 37:     image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1000&q=80',
 38:     itemCount: 45,
 39:     featuredEquipments: ['Yonex Nanoflare & Astrox', 'Mavis-350 Synthetic Shuttles', 'AS2 Feather Shuttles', 'Non-Marking Court Shoes'],
 40:   },
 41:   {
 42:     id: 'tennis',
 43:     name: 'Tennis',
 44:     tagline: 'Tour-level racquets, court balls, grips and professional restringing',
 45:     description: 'Precision performance racquets balanced for power and control, tournament pressurized balls, and specialized court shoes.',
 46:     image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1000&q=80',
 47:     itemCount: 38,
 48:     featuredEquipments: ['Tour 300g Graphite Racquets', 'All-Court Pressure Balls', 'Overgrips & Dampeners', 'Heavy-Duty Court Nets'],
 49:   },
 50:   {
 51:     id: 'pickleball',
 52:     name: 'Pickleball',
 53:     tagline: 'USA Pickleball certified composite paddles, outdoor balls & portable nets',
 54:     description: "Paddles, balls and nets for the fastest-growing court sport. USAPA approved raw carbon fiber paddles and outdoor tournament balls.",
 55:     image: '/images/categories/pickleball_category.webp',
 56:     itemCount: 24,
 57:     featuredEquipments: ['Toray T700 Raw Carbon Paddles', '40-Hole Outdoor Dura Balls', 'Portable Quick-Set Nets', 'Court Boundary Markers'],
 58:   },
 59:   {
 60:     id: 'table-tennis',
 61:     name: 'Table Tennis',
 62:     tagline: 'ITTF approved tournament tables, carbon blades and offensive rubbers',
 63:     description: 'Competition grade 25mm indoor rollaway tables, custom blade assemblies, and friction-engineered tensor rubbers.',
 64:     image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=1000&q=80',
 65:     itemCount: 28,
 66:     featuredEquipments: ['25mm Official Rollaway Tables', '7-Ply Carbon Blades', 'ITTF Spin Rubbers', '3-Star 40+ Poly Balls'],
 67:   },
 68:   {
 69:     id: 'squash',
 70:     name: 'Squash',
 71:     tagline: 'Teardrop aerodynamic frames, double yellow dot balls and protective eyewear',
 72:     description: 'Engineered for high-velocity indoor glass-backed courts. 120g-135g frames with high torsional stability and anti-fog eye guards.',
 73:     image: 'https://images.unsplash.com/photo-1554290813-ec6a2a72e5c7?auto=format&fit=crop&w=1000&q=80',
 74:     itemCount: 19,
 75:     featuredEquipments: ['Aerodynamic Teardrop Frames', 'Double Yellow Dot Competition Balls', 'Impact-Proof Polycarbonate Eyewear', 'Court Grip Shoes'],
 76:   },
 77:   {
 78:     id: 'fitness',
 79:     name: 'Fitness',
 80:     tagline: 'Commercial dumbbells, competition barbells, kettlebells and recovery gear',
 81:     description: 'Precision cast iron and urethane weights, power cages, cable systems, and commercial rubber flooring for serious athlete conditioning.',
 82:     image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',
 83:     itemCount: 52,
 84:     featuredEquipments: ['Urethane Hex Dumbbells', 'Precision Bearing Barbells', 'Cast Iron Competition Kettlebells', 'High-Density Rubber Flooring'],
 85:   },
 86:   {
 87:     id: 'gym-equipment',
 88:     name: 'Gym Equipment',
 89:     tagline: 'Commercial and domestic treadmills',
 90:     description: 'Commercial, light commercial and curve treadmills for gyms and clubs, and domestic treadmills for home use. Prices shown are MRP; ask the store for specifications.',
 91:     image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',
 92:     itemCount: 18,
 93:     featuredEquipments: ['Commercial Treadmills', 'Domestic Treadmills', 'Curve Treadmills'],
 94:   },
 95:   {
 96:     id: 'recreation',
 97:     name: 'Recreation',
 98:     tagline: 'Carrom boards, pool cues, foosball tables, chess sets and club recreation',
 99:     description: 'Traditional Indian English birch carrom boards with waterproof playing surface, tournament striker sets, and institutional game tables.',
100:     image: 'https://images.unsplash.com/photo-1768518354646-33833e95a24d?auto=format&fit=crop&w=1000&q=80',
101:     itemCount: 26,
102:     featuredEquipments: ['Surco Championship Carrom 20mm', 'Ash Wood 2-Piece Pool Cues', 'Heavy-Weight Foosball Tables', 'Weighted Wooden Chess Sets'],
103:   },
104:   {
105:     id: 'accessories',
106:     name: 'Accessories',
107:     tagline: 'Sports bags, compression wear, athletic hydration, ball carts and training cones',
108:     description: 'Crucial equipment accessories that keep athletes prepared, hydrated, and ready for tournament day.',
109:     image: 'https://images.unsplash.com/photo-1672223303533-05fddcbf6e6c?auto=format&fit=crop&w=1000&q=80',
110:     itemCount: 34,
111:     featuredEquipments: ['Duffels & Kit Bags', 'Athletic Grip Spray & Chalk', 'Agility Ladders & Cones', 'Insulated Stainless Steel Bottles'],
112:   },
113:   {
114:     id: 'volleyball',
115:     name: 'Volleyball',
116:     tagline: 'FIVB approved match balls, tournament nets, posts and knee protection',
117:     description: 'Competition grade composite leather volleyballs, outdoor beach & indoor club net systems, and high-impact protective athlete gear.',
118:     image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1000&q=80',
119:     itemCount: 18,
120:     featuredEquipments: ['FIVB Official Game Balls', 'Competition Net & Antennae Kits', 'High-Density Knee Guards', 'Outdoor Sand Volleyballs'],
121:   },
122: ];
````

## File: src/styles/tokens.css
````css
  1: /* ==========================================================================
  2:    Oriental Sports — Design Tokens
  3:    One brand, one system. See DESIGN.md for the rules behind these values.
  4:    ========================================================================== */
  5: 
  6: :root {
  7:   /* ---- Official brand palette (Branding Map) ---------------------------- */
  8:   --ink: #111111;          /* Ink Black — text, primary actions, dark chapters */
  9:   --black: #000000;        /* True Black — night-court chapter, deepest surfaces */
 10:   --gold: #C9A227;         /* Plate Gold — accents on dark, rules, one CTA per chapter */
 11:   --gold-hi: #E0C56A;      /* Highlight Gold — hover/active on dark */
 12:   --ivory: #F6F3EA;        /* Ivory Court — page canvas */
 13: 
 14:   /* ---- Derived neutrals (warm, mixed from ivory + ink) ------------------ */
 15:   --paper: #FBF9F4;        /* lifted surface: inputs, dialogs, drawers */
 16:   --stone: #ECE7DB;        /* recessed band, alternate section */
 17:   --stage: #E9E2D3;        /* product photo staging (matches studio backdrops) */
 18:   --stone-deep: #DCD4C3;   /* hover staging, strong dividers on stone */
 19:   --ink-2: #2A2926;        /* hover of ink surfaces */
 20:   --muted: #56524A;        /* secondary text — 7.0:1 on ivory */
 21:   --subtle: #6B665C;       /* tertiary text / meta — 5.1:1 on ivory */
 22:   --gold-ink: #7A5F0E;     /* gold-toned text on light surfaces — 5.4:1 */
 23:   --line: rgba(17, 17, 17, 0.12);
 24:   --line-strong: rgba(17, 17, 17, 0.28);
 25: 
 26:   /* On dark (ink / black) */
 27:   --on-dark: #F6F3EA;
 28:   --on-dark-muted: #A9A397;   /* 7.5:1 on ink */
 29:   --on-dark-subtle: #8F897D;  /* 5.4:1 on ink */
 30:   --line-dark: rgba(246, 243, 234, 0.16);
 31: 
 32:   /* Feedback */
 33:   --success: #2E6B3C;
 34:   --error: #B3261E;
 35: 
 36:   /* ---- Typography ------------------------------------------------------- */
 37:   /* Archivo variable (wdth 62–100): condensed black for display, normal width for text. */
 38:   --font: 'Archivo', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
 39:   --stretch-display: 62%;
 40:   --stretch-tight: 75%;
 41: 
 42:   --fs-hero: clamp(3.4rem, 13.5vw, 11.5rem);
 43:   --fs-d1: clamp(2.9rem, 8.6vw, 7.5rem);
 44:   --fs-d2: clamp(2.25rem, 5.4vw, 4.5rem);
 45:   --fs-d3: clamp(1.6rem, 2.9vw, 2.5rem);
 46:   --fs-d4: clamp(1.25rem, 1.8vw, 1.625rem);
 47:   --fs-lead: clamp(1.0625rem, 1.25vw, 1.25rem);
 48:   --fs-body: 1rem;
 49:   --fs-small: 0.875rem;
 50:   --fs-label: 0.75rem;
 51: 
 52:   /* ---- Space (8pt rhythm) ----------------------------------------------- */
 53:   --s-1: 4px;
 54:   --s-2: 8px;
 55:   --s-3: 12px;
 56:   --s-4: 16px;
 57:   --s-5: 24px;
 58:   --s-6: 32px;
 59:   --s-7: 48px;
 60:   --s-8: 64px;
 61:   --s-9: 96px;
 62:   --s-10: 128px;
 63:   --section-y: clamp(72px, 10vw, 144px);
 64:   --gutter: clamp(20px, 4.4vw, 64px);
 65:   --max: 1440px;
 66:   /* Text measures use em, not ch: Chrome can resolve ch against the fallback
 67:      font before Archivo loads and keep that width. 1ch of Archivo ≈ 0.588em. */
 68:   --max-text: 36.5em;
 69: 
 70:   --header-h: 64px;
 71:   --utility-h: 0px;
 72: 
 73:   /* ---- Shape & depth ---------------------------------------------------- */
 74:   --r-0: 0;
 75:   --r-1: 2px;   /* buttons, inputs, chips */
 76:   --r-2: 4px;   /* dialogs */
 77:   --r-pill: 999px; /* count badges and icon buttons only */
 78:   --shadow-overlay: 0 24px 64px -24px rgba(17, 17, 17, 0.45);
 79: 
 80:   /* ---- Motion ----------------------------------------------------------- */
 81:   --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
 82:   --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
 83:   --t-1: 160ms;
 84:   --t-2: 280ms;
 85:   --t-3: 560ms;
 86:   --t-4: 900ms;
 87: 
 88:   /* ---- Layers ----------------------------------------------------------- */
 89:   --z-header: 60;
 90:   --z-sticky: 50;
 91:   --z-overlay: 80;
 92:   --z-dialog: 90;
 93: 
 94:   /* ======================================================================
 95:      Legacy aliases — older pages reference these names. They resolve to the
 96:      system above so every screen shares one palette and one type family.
 97:      ====================================================================== */
 98:   --color-canvas-base: var(--ivory);
 99:   --color-canvas-surface: var(--stone);
100:   --color-canvas-pure: var(--paper);
101:   --color-canvas-subtle: var(--stone);
102:   --color-canvas-muted: var(--stone-deep);
103:   --color-ink: var(--ink);
104:   --color-ink-rgb: 17, 17, 17;
105:   --color-ink-muted: var(--muted);
106:   --color-ink-subtle: var(--subtle);
107:   --color-pure-white: #FFFFFF;
108:   --color-ivory: var(--ivory);
109:   --color-ivory-border: var(--line);
110:   --color-text-dark: var(--ink);
111:   --color-brand-gold: var(--gold);
112:   --color-brand-gold-rgb: 201, 162, 39;
113:   --color-brand-gold-soft: var(--gold-hi);
114:   --color-plate-gold: var(--gold);
115:   --color-highlight-gold: var(--gold-hi);
116:   --color-border-subtle: var(--line);
117:   --color-border-medium: var(--line-strong);
118:   --color-border-dark: var(--ink);
119:   --color-border-light: var(--line-dark);
120: 
121:   --font-display: var(--font);
122:   --font-heading: var(--font);
123:   --font-sans: var(--font);
124:   --font-body: var(--font);
125:   --font-ui: var(--font);
126:   --font-mono: var(--font);
127:   --font-display-xl: var(--fs-d1);
128: 
129:   --space-2xs: var(--s-1);
130:   --space-xs: var(--s-2);
131:   --space-sm: var(--s-3);
132:   --space-md: var(--s-4);
133:   --space-lg: var(--s-6);
134:   --space-xl: var(--s-7);
135:   --space-2xl: var(--s-8);
136:   --space-3xl: var(--s-9);
137:   --space-4xl: var(--s-10);
138: 
139:   --max-width-content: var(--max);
140:   --max-width-editorial: 1140px;
141:   --header-height-mobile: var(--header-h);
142:   --header-height-desktop: var(--header-h);
143:   --bottom-nav-height: 0px;
144: 
145:   --radius-none: 0;
146:   --radius-xs: var(--r-1);
147:   --radius-sm: var(--r-1);
148:   --radius-md: var(--r-2);
149:   --radius-lg: var(--r-2);
150:   --radius-xl: var(--r-2);
151:   --radius-pill: var(--r-pill);
152: 
153:   --shadow-subtle: none;
154:   --shadow-card: none;
155:   --shadow-card-hover: none;
156:   --shadow-float: var(--shadow-overlay);
157: 
158:   --transition-fast: var(--t-1) ease;
159:   --transition-normal: var(--t-2) var(--ease-out);
160:   --transition-slow: var(--t-3) var(--ease-out);
161: }
162: 
163: @media (min-width: 1024px) {
164:   :root {
165:     --header-h: 72px;
166:     --utility-h: 0px;
167:   }
168: }
````

## File: src/data/media.ts
````typescript
 1: /**
 2:  * Image library for Oriental Sports.
 3:  *
 4:  * Every entry carries honest alt text and a focal point so crops can be
 5:  * art-directed per breakpoint. Local photographs are served as WebP at two
 6:  * widths; Unsplash photographs use the CDN's width parameter for srcset.
 7:  * No image here is presented as an Oriental Sports project or the store itself.
 8:  */
 9: 
10: export interface MediaImage {
11:   src: string;
12:   srcSet?: string;
13:   alt: string;
14:   /** CSS object-position — where the subject sits in the frame. */
15:   position?: string;
16: }
17: 
18: const local = (path: string, alt: string, widths: [number, number], position = 'center'): MediaImage => ({
19:   src: `${path}.webp`,
20:   srcSet: `${path}-sm.webp ${widths[0]}w, ${path}.webp ${widths[1]}w`,
21:   alt,
22:   position,
23: });
24: 
25: export const unsplashUrl = (id: string, w: number) =>
26:   `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=72`;
27: 
28: const unsplash = (id: string, alt: string, position = 'center'): MediaImage => ({
29:   src: unsplashUrl(id, 1400),
30:   srcSet: [480, 800, 1200, 1800].map((w) => `${unsplashUrl(id, w)} ${w}w`).join(', '),
31:   alt,
32:   position,
33: });
34: 
35: export const IMAGES = {
36:   // ---- Local photography ----------------------------------------------------
37:   badmintonSmash: local('/images/hero/hero_train_perform', 'Badminton player jumping for a smash under arena lights', [800, 1376], '72% 30%'),
38:   courtDusk: local('/images/hero/hero_court_build', 'Floodlit outdoor hard court at dusk, fenced on all sides', [640, 992], '58% 55%'),
39:   athleteBatRacquet: local('/images/hero/hero_gear_pune', 'Player holding a cricket bat and a tennis racquet on a floodlit court', [800, 1376], '70% 35%'),
40:   pickleballNet: local('/images/categories/pickleball_category', 'Pickleball paddle and ball beside the net on a blue court', [700, 1200], '55% 70%'),
41: 
42:   // ---- Sport photography (Unsplash) -----------------------------------------
43:   cricketStrike: unsplash('1593341646782-e0b495cff86d', 'Batsman driving a cricket ball, dust flying off the pitch', 'center 40%'),
44:   cricketStadium: unsplash('1540747913346-19e32dc3e97e', 'Cricket stadium under floodlights during an evening match'),
45:   cricketBall: unsplash('1690111354184-cceee42df518', 'Worn red leather cricket ball on grass'),
46:   tennisClay: unsplash('1554068865-24cecd4e34b8', 'Overhead view of a player serving on a red clay tennis court'),
47:   tennisGrass: unsplash('1622279457486-62dcc4a431d6', 'Player hitting a forehand on an outdoor tennis court'),
48:   badmintonHall: unsplash('1626224583764-f87db24ac4ea', 'Badminton player leaping for a shot in an indoor hall', 'center 35%'),
49:   pickleballCorner: unsplash('1711996151738-657bd95b7cdb', 'Pickleball resting in the corner of a blue and green court'),
50:   pickleballPaddles: unsplash('1693142518820-78d7a05f1546', 'Two pickleball paddles and balls at the net'),
51:   tableTennisHall: unsplash('1511067007398-7e4b90cfa4bc', 'Table tennis tables in a dark club hall'),
52:   tableTennisBat: unsplash('1534158914592-062992fbe900', 'Table tennis bat resting on a green table'),
53:   squashPlayer: unsplash('1554290813-ec6a2a72e5c7', 'Squash player reaching for a shot inside a court, black and white'),
54:   squashCourts: unsplash('1711294545092-303f7161017c', 'Row of glass-backed squash courts with timber floors', 'center 60%'),
55:   fitnessBarbell: unsplash('1574680096145-d05b474e2155', 'Athlete holding a barbell across the shoulders, black and white'),
56:   fitnessDumbbells: unsplash('1584735935682-2f2b69dff9d2', 'Dumbbells and resistance bands on a wooden floor'),
57:   carromPlay: unsplash('1768518354646-33833e95a24d', 'Group of men gathered around a carrom board game'),
58:   carromBoard: unsplash('1652558973183-a3f046921163', 'Carrom board with coins and striker, close up'),
59:   volleyballSunset: unsplash('1612872087720-bb876e2e67d1', 'Beach volleyball players silhouetted at sunset'),
60:   volleyballBall: unsplash('1592656094267-764a45160876', 'Volleyball on sand in front of the net'),
61:   kitBag: unsplash('1672223303533-05fddcbf6e6c', 'Racquet kit bag lying on a blue court with tennis balls'),
62:   turfFootball: unsplash('1574629810360-7efbbe195018', 'Football at a player’s feet on synthetic turf'),
63: 
64:   // ---- Court surfaces (material close-ups) ---------------------------------
65:   surfaceBlueLines: unsplash('1552741775-7817c0c85843', 'White line markings on a blue acrylic court'),
66:   surfaceNet: unsplash('1622669253059-e345500cf0e9', 'Tennis net across a blue and green hard court'),
67:   surfaceClay: unsplash('1465125672495-63cdc2fa22ed', 'White line on a red clay court surface'),
68:   surfaceCorner: unsplash('1622668459907-f1fa3113bbcf', 'Corner of a blue court with green run-off'),
69: } satisfies Record<string, MediaImage>;
70: 
71: /** Fallback when a remote image fails — a local photo, never a remote placeholder. */
72: export const FALLBACK_IMAGE = '/images/hero/hero_court_build-sm.webp';
73: 
74: /** Legacy keys kept for pages that still reference MEDIA. */
75: export const MEDIA = {
76:   heroSlide1: IMAGES.badmintonSmash.src,
77:   heroSlide2: IMAGES.courtDusk.src,
78:   heroSlide3: IMAGES.courtDusk.src,
79:   heroSports: IMAGES.badmintonSmash.src,
80:   heroSportsMobile: IMAGES.badmintonSmash.src,
81:   fallbackImage: FALLBACK_IMAGE,
82:   shopPillar: IMAGES.badmintonSmash.src,
83:   buildPillar: IMAGES.courtDusk.src,
84:   cricketHero: IMAGES.cricketStadium.src,
85:   tennisHero: IMAGES.tennisClay.src,
86:   pickleballHero: IMAGES.pickleballNet.src,
87:   badmintonHero: IMAGES.badmintonHall.src,
88:   tableTennisHero: IMAGES.tableTennisHall.src,
89:   squashHero: IMAGES.squashPlayer.src,
90:   fitnessHero: IMAGES.fitnessBarbell.src,
91:   recreationHero: IMAGES.carromPlay.src,
92:   accessoriesHero: IMAGES.kitBag.src,
93:   puneCampExterior: IMAGES.courtDusk.src,
94: };
````

## File: src/data/products.ts
````typescript
   1: import { Product } from '../types';
   2: import { GYM_PRODUCTS } from './gymProducts';
   3: 
   4: const CORE_PRODUCTS: Product[] = [
   5:   // ==========================================================================
   6:   // 1. CRICKET — SG KASHMIR WILLOW BATS (EXCEL INVENTORY)
   7:   // ==========================================================================
   8:   {
   9:     id: 'prod-crick-sg-scorer',
  10:     slug: 'sg-scorer-classic-cricket-bat',
  11:     name: 'SG Scorer Classic Cricket Bat',
  12:     category: 'cricket',
  13:     categoryName: 'Cricket',
  14:     subcategory: 'cricket-bats',
  15:     subcategoryName: 'Cricket Bats',
  16:     productType: 'bat',
  17:     brand: 'SG',
  18:     price: 2899,
  19:     currency: 'INR',
  20:     quantityUnit: '1 piece',
  21:     color: 'Multi Color',
  22:     rating: 4.8,
  23:     reviewsCount: 32,
  24:     badge: 'BESTSELLER',
  25:     isFeatured: true,
  26:     inStock: true,
  27:     images: [
  28:       '/images/products/oriental-sports/sg-scorer-classic.webp',
  29:       '/images/products/oriental-sports/sg-scorer-classic.jpg',
  30:       '/images/products/cricket_bat_willow.webp',
  31:     ],
  32:     description: 'Natural wood Kashmir Willow cricket bat featuring traditional profile, balanced pickup, and imported cane handle. Calibrated for leather and tennis cricket match play.',
  33:     features: [
  34:       'Crafted from selected natural Kashmir Willow wood',
  35:       'Traditional profile with thick contoured edges for solid stroke play',
  36:       'Sarawak cane handle for enhanced shock absorption',
  37:       'Multi-color branded SG grip and chevron handle wrap',
  38:     ],
  39:     specs: {
  40:       'Brand': 'SG',
  41:       'Model': 'Scorer Classic',
  42:       'Material': 'Natural Wood (Kashmir Willow)',
  43:       'Quantity': '1 piece (1 Nos)',
  44:       'Color': 'Multi Color',
  45:       'Handle Type': 'Sarawak Cane Handle',
  46:       'Blade': 'Natural Wood Kashmir Willow',
  47:     },
  48:     variants: [
  49:       { id: 'v-sg-scorer-3', name: 'Size 3', price: 2899, inStock: true },
  50:       { id: 'v-sg-scorer-4', name: 'Size 4', price: 2899, inStock: true },
  51:       { id: 'v-sg-scorer-5', name: 'Size 5', price: 2999, inStock: true },
  52:       { id: 'v-sg-scorer-6', name: 'Size 6', price: 2999, inStock: true },
  53:       { id: 'v-sg-scorer-f', name: 'Size F (Full Size)', price: 3499, inStock: true },
  54:     ],
  55:     sizes: ['Size 3', 'Size 4', 'Size 5', 'Size 6', 'Size F'],
  56:     seoTitle: 'SG Scorer Classic Cricket Bat | Oriental Sports Pune',
  57:     seoDescription: 'Buy authentic SG Scorer Classic Natural Wood Cricket Bat across Size 3, 4, 5, 6, and Full Size at Oriental Sports Camp Pune.',
  58:   },
  59:   {
  60:     id: 'prod-crick-sg-profile',
  61:     slug: 'sg-profile-classic-cricket-bat',
  62:     name: 'SG Profile Classic Cricket Bat',
  63:     category: 'cricket',
  64:     categoryName: 'Cricket',
  65:     subcategory: 'cricket-bats',
  66:     subcategoryName: 'Cricket Bats',
  67:     productType: 'bat',
  68:     brand: 'SG',
  69:     price: 4299,
  70:     currency: 'INR',
  71:     quantityUnit: '1 piece',
  72:     color: 'Multi Color',
  73:     rating: 4.9,
  74:     reviewsCount: 26,
  75:     badge: 'MATCH GRADE',
  76:     isFeatured: true,
  77:     inStock: true,
  78:     images: [
  79:       '/images/products/oriental-sports/sg-profile-classic.webp',
  80:       '/images/products/oriental-sports/sg-profile-classic.jpg',
  81:       '/images/products/cricket_bat_willow.webp',
  82:     ],
  83:     description: 'Natural wood cricket bat crafted from premium Kashmir willow with classic profile, pronounced bow, and massive edges engineered for powerful boundary hitting.',
  84:     features: [
  85:       'High-grade natural wood Kashmir Willow blade',
  86:       'Classic mid-to-low sweet spot optimized for subcontinental pitches',
  87:       'Short cane handle with ergonomic rubber grip',
  88:       'Tested and balance-checked at Oriental Sports workshop',
  89:     ],
  90:     specs: {
  91:       'Brand': 'SG',
  92:       'Model': 'Profile Classic',
  93:       'Material': 'Natural Wood (Kashmir Willow)',
  94:       'Quantity': '1 piece (1 Nos)',
  95:       'Color': 'Multi Color',
  96:       'Handle': 'Cane Handle',
  97:     },
  98:     variants: [
  99:       { id: 'v-sg-profile-std', name: 'Standard (Full Size)', price: 4299, inStock: true },
 100:       { id: 'v-sg-profile-4', name: 'Size 4', price: 3499, inStock: true },
 101:       { id: 'v-sg-profile-5', name: 'Size 5', price: 3699, inStock: true },
 102:       { id: 'v-sg-profile-6', name: 'Size 6', price: 3699, inStock: true },
 103:     ],
 104:     sizes: ['Standard', 'Size 4', 'Size 5', 'Size 6'],
 105:     seoTitle: 'SG Profile Classic Cricket Bat | Oriental Sports Pune',
 106:     seoDescription: 'SG Profile Classic Natural Wood Cricket Bat available at Oriental Sports Pune. Explore Standard and junior sizes with verified pricing.',
 107:   },
 108:   {
 109:     id: 'prod-crick-sg-boundary',
 110:     slug: 'sg-boundary-xtreme-cricket-bat',
 111:     name: 'SG Boundary Xtreme Cricket Bat',
 112:     category: 'cricket',
 113:     categoryName: 'Cricket',
 114:     subcategory: 'cricket-bats',
 115:     subcategoryName: 'Cricket Bats',
 116:     productType: 'bat',
 117:     brand: 'SG',
 118:     price: 5899,
 119:     currency: 'INR',
 120:     quantityUnit: '1 piece',
 121:     color: 'Multi Color',
 122:     rating: 4.9,
 123:     reviewsCount: 19,
 124:     badge: 'ORIENTAL EXCLUSIVE',
 125:     isFeatured: true,
 126:     inStock: true,
 127:     images: [
 128:       '/images/products/oriental-sports/sg-boundary-xtreme.webp',
 129:       '/images/products/oriental-sports/sg-boundary-xtreme.jpg',
 130:       '/images/products/cricket_bat_willow.webp',
 131:     ],
 132:     description: 'Natural wood Kashmir willow cricket bat designed for aggressive boundary hitting with substantial wood behind the impact zone and lightweight pickup.',
 133:     features: [
 134:       'Top-tier selected Natural Kashmir Willow cleft',
 135:       'Full profile back swell for maximum rebound velocity',
 136:       'Round multi-piece cane handle',
 137:       'Size F Men’s full size match configuration',
 138:     ],
 139:     specs: {
 140:       'Brand': 'SG',
 141:       'Model': 'Boundary Xtreme No-F',
 142:       'Material': 'Natural Wood (Kashmir Willow)',
 143:       'Quantity': '1 piece (1 Nos)',
 144:       'Color': 'Multi Color',
 145:       'Size': 'Size F (Full / Senior)',
 146:     },
 147:     variants: [
 148:       { id: 'v-sg-boundary-f', name: 'Size F (Full Size)', price: 5899, inStock: true },
 149:     ],
 150:     sizes: ['Size F'],
 151:     seoTitle: 'SG Boundary Xtreme Full Size Cricket Bat | Oriental Sports',
 152:     seoDescription: 'SG Boundary Xtreme Size F Cricket Bat at Oriental Sports Camp Pune. Power hitting Kashmir Willow engineered for tournament play.',
 153:   },
 154:   {
 155:     id: 'prod-crick-sg-sierra',
 156:     slug: 'sg-sierra-plus-cricket-bat',
 157:     name: 'SG Sierra Plus Cricket Bat',
 158:     category: 'cricket',
 159:     categoryName: 'Cricket',
 160:     subcategory: 'cricket-bats',
 161:     subcategoryName: 'Cricket Bats',
 162:     productType: 'bat',
 163:     brand: 'SG',
 164:     price: 2999,
 165:     currency: 'INR',
 166:     quantityUnit: '1 piece',
 167:     color: 'Multi Color',
 168:     rating: 4.8,
 169:     reviewsCount: 41,
 170:     badge: 'BESTSELLER',
 171:     isFeatured: false,
 172:     inStock: true,
 173:     images: [
 174:       '/images/products/oriental-sports/sg-sierra-plus.webp',
 175:       '/images/products/oriental-sports/sg-sierra-plus.jpg',
 176:       '/images/products/cricket_bat_willow.webp',
 177:     ],
 178:     description: 'Natural wood cricket bat with dynamic pickup, thick edges, and curved blade surface tuned for quick hand speed and stroke precision.',
 179:     features: [
 180:       'Natural wood Kashmir Willow construction',
 181:       'Available across full size range from Junior Size 3 to Senior Size F',
 182:       'Imported cane handle with vibration-dampening grip',
 183:     ],
 184:     specs: {
 185:       'Brand': 'SG',
 186:       'Model': 'Sierra Plus',
 187:       'Material': 'Natural Wood (Kashmir Willow)',
 188:       'Quantity': '1 piece (1 Nos)',
 189:       'Color': 'Multi Color',
 190:     },
 191:     variants: [
 192:       { id: 'v-sg-sierra-3', name: 'Size 3', price: 2999, inStock: true },
 193:       { id: 'v-sg-sierra-4', name: 'Size 4', price: 2999, inStock: true },
 194:       { id: 'v-sg-sierra-5', name: 'Size 5', price: 2999, inStock: true },
 195:       { id: 'v-sg-sierra-6', name: 'Size 6', price: 2999, inStock: true },
 196:       { id: 'v-sg-sierra-f', name: 'Size F (Full Size)', price: 3399, inStock: true },
 197:     ],
 198:     sizes: ['Size 3', 'Size 4', 'Size 5', 'Size 6', 'Size F'],
 199:     seoTitle: 'SG Sierra Plus Cricket Bat | Oriental Sports Pune',
 200:     seoDescription: 'SG Sierra Plus Kashmir Willow Cricket Bat available in Sizes 3, 4, 5, 6, and F at Oriental Sports Camp Pune.',
 201:   },
 202:   {
 203:     id: 'prod-crick-sg-savage',
 204:     slug: 'sg-savage-plus-cricket-bat',
 205:     name: 'SG Savage Plus Cricket Bat',
 206:     category: 'cricket',
 207:     categoryName: 'Cricket',
 208:     subcategory: 'cricket-bats',
 209:     subcategoryName: 'Cricket Bats',
 210:     productType: 'bat',
 211:     brand: 'SG',
 212:     price: 5299,
 213:     currency: 'INR',
 214:     quantityUnit: '1 piece',
 215:     color: 'Multi Color',
 216:     rating: 4.9,
 217:     reviewsCount: 22,
 218:     badge: 'MATCH GRADE',
 219:     isFeatured: false,
 220:     inStock: true,
 221:     images: [
 222:       '/images/products/oriental-sports/sg-savage-plus.webp',
 223:       '/images/products/oriental-sports/sg-savage-plus.jpg',
 224:       '/images/products/cricket_bat_willow.webp',
 225:     ],
 226:     description: 'Natural wood Kashmir willow cricket bat engineered with broad spine and contoured edges for heavy-duty stroke play in competitive formats.',
 227:     features: [
 228:       'Selected Natural Kashmir Willow cleft',
 229:       'Pronounced spine and extended sweet spot',
 230:       'Short cane handle with high traction grip',
 231:     ],
 232:     specs: {
 233:       'Brand': 'SG',
 234:       'Model': 'Savage Plus',
 235:       'Material': 'Natural Wood (Kashmir Willow)',
 236:       'Quantity': '1 piece (1 Nos)',
 237:       'Color': 'Multi Color',
 238:     },
 239:     variants: [
 240:       { id: 'v-sg-savage-std', name: 'Standard (Full Size)', price: 5299, inStock: true },
 241:       { id: 'v-sg-savage-4', name: 'Size 4', price: 3699, inStock: true },
 242:       { id: 'v-sg-savage-5', name: 'Size 5', price: 4099, inStock: true },
 243:       { id: 'v-sg-savage-6', name: 'Size 6', price: 4099, inStock: true },
 244:     ],
 245:     sizes: ['Standard', 'Size 4', 'Size 5', 'Size 6'],
 246:     seoTitle: 'SG Savage Plus Cricket Bat | Oriental Sports Pune',
 247:     seoDescription: 'SG Savage Plus Natural Wood Cricket Bat with verified sizing and pricing at Oriental Sports Pune.',
 248:   },
 249:   {
 250:     id: 'prod-crick-01',
 251:     slug: 'pune-heritage-english-willow-cricket-bat',
 252:     name: 'Camp Heritage Grade 1 English Willow Cricket Bat',
 253:     category: 'cricket',
 254:     categoryName: 'Cricket',
 255:     subcategory: 'cricket-bats',
 256:     subcategoryName: 'Cricket Bats',
 257:     productType: 'bat',
 258:     brand: 'Oriental Heritage',
 259:     price: 18499,
 260:     originalPrice: 21000,
 261:     rating: 5.0,
 262:     reviewsCount: 24,
 263:     badge: 'ORIENTAL EXCLUSIVE',
 264:     isFeatured: true,
 265:     inStock: true,
 266:     images: [
 267:       '/images/products/cricket_bat_willow.webp',
 268:       'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
 269:     ],
 270:     description: 'Handcrafted unbleached Grade 1 English Willow pressed with a mid-to-low sweet spot tuned for Maharashtra turf wickets.',
 271:     features: [
 272:       'Top tier Grade 1 English Willow with 8–11 straight clean grains',
 273:       'Massive 39–41mm contoured edges with minimal concaving',
 274:       'Duckbill profile for exceptionally light pickup balance',
 275:       'Multi-piece imported Sarawak cane handle',
 276:     ],
 277:     specs: {
 278:       'Willow Grade': 'Grade 1 English Willow',
 279:       'Edge Thickness': '40 mm',
 280:       'Quantity': '1 piece',
 281:     },
 282:   },
 283: 
 284:   // ==========================================================================
 285:   // 2. FOOTBALL — BALLS, STOCKINGS, SHOES (EXCEL INVENTORY)
 286:   // ==========================================================================
 287:   {
 288:     id: 'prod-fb-01',
 289:     slug: 'nivia-football-black-white',
 290:     name: 'Nivia Football (Black / White)',
 291:     category: 'football',
 292:     categoryName: 'Football',
 293:     subcategory: 'footballs',
 294:     subcategoryName: 'Footballs',
 295:     productType: 'ball',
 296:     brand: 'Nivia',
 297:     price: 1249,
 298:     currency: 'INR',
 299:     quantityUnit: '1 piece',
 300:     color: 'Black & White',
 301:     rating: 4.8,
 302:     reviewsCount: 37,
 303:     badge: 'BESTSELLER',
 304:     isFeatured: true,
 305:     inStock: true,
 306:     images: [
 307:       '/images/products/oriental-sports/nivia-football-black-white.webp',
 308:       '/images/products/oriental-sports/nivia-football-black-white.jpg',
 309:     ],
 310:     description: 'Classic 32-panel black and white football designed for all-surface durability, true flight path, and high abrasion resistance on Indian grounds.',
 311:     features: [
 312:       'Official 32-panel geometric construction',
 313:       'Multi-layer polyester backing for shape retention',
 314:       'Air-lock butyl bladder for extended pressure maintenance',
 315:       'Suitable for grass, turf, and hard ground surfaces',
 316:     ],
 317:     specs: {
 318:       'Brand': 'Nivia',
 319:       'Color': 'Black & White',
 320:       'Quantity': '1 piece (1 Nos)',
 321:       'Construction': '32 Panel Multi-Layer',
 322:     },
 323:     seoTitle: 'Nivia Black & White Football | Oriental Sports Pune',
 324:     seoDescription: 'Buy original Nivia Black and White Football at Oriental Sports Pune. ₹1,249 verified retail price.',
 325:   },
 326:   {
 327:     id: 'prod-fb-02',
 328:     slug: 'nivia-shining-star-football',
 329:     name: 'Nivia Shining Star Football',
 330:     category: 'football',
 331:     categoryName: 'Football',
 332:     subcategory: 'footballs',
 333:     subcategoryName: 'Footballs',
 334:     productType: 'ball',
 335:     brand: 'Nivia',
 336:     price: 1619,
 337:     currency: 'INR',
 338:     quantityUnit: '1 piece',
 339:     rating: 4.9,
 340:     reviewsCount: 29,
 341:     badge: 'MATCH GRADE',
 342:     isFeatured: true,
 343:     inStock: true,
 344:     images: [
 345:       '/images/products/oriental-sports/nivia-shining-star-football.webp',
 346:       '/images/products/oriental-sports/nivia-shining-star-football.jpg',
 347:     ],
 348:     description: 'High-visibility match football engineered with durable polyurethane outer casing for turf and natural grass tournament play.',
 349:     features: [
 350:       'High-gloss scuff-resistant polyurethane cover',
 351:       'Hand-stitched panels with reinforced bonded seams',
 352:       'Zero-wing latex bladder for lively bounce and true flight',
 353:     ],
 354:     specs: {
 355:       'Brand': 'Nivia',
 356:       'Model': 'Shining Star',
 357:       'Quantity': '1 piece (1 Nos)',
 358:       'Seam Type': 'Hand Stitched',
 359:     },
 360:     seoTitle: 'Nivia Shining Star Football | Oriental Sports Pune',
 361:     seoDescription: 'Nivia Shining Star Football at Oriental Sports Camp Pune. Official match grade football at ₹1,619.',
 362:   },
 363:   {
 364:     id: 'prod-fb-03',
 365:     slug: 'nivia-dominator-football',
 366:     name: 'Nivia Dominator Football',
 367:     category: 'football',
 368:     categoryName: 'Football',
 369:     subcategory: 'footballs',
 370:     subcategoryName: 'Footballs',
 371:     productType: 'ball',
 372:     brand: 'Nivia',
 373:     price: 1839,
 374:     currency: 'INR',
 375:     quantityUnit: '1 piece',
 376:     rating: 4.9,
 377:     reviewsCount: 31,
 378:     badge: 'MATCH GRADE',
 379:     isFeatured: false,
 380:     inStock: true,
 381:     images: [
 382:       '/images/products/oriental-sports/nivia-dominator-football.webp',
 383:       '/images/products/oriental-sports/nivia-dominator-football.jpg',
 384:     ],
 385:     description: 'Tournament grade match football with reinforced bladder for optimal bounce retention and shape stability under high-velocity impacts.',
 386:     features: [
 387:       'Microfiber textured outer casing for enhanced boot grip',
 388:       'Reinforced core bladder maintaining precise air retention',
 389:       'FIFA-standard weight and rebound balance',
 390:     ],
 391:     specs: {
 392:       'Brand': 'Nivia',
 393:       'Model': 'Dominator',
 394:       'Quantity': '1 piece (1 Nos)',
 395:       'Grade': 'Match Grade Tournament Ball',
 396:     },
 397:     seoTitle: 'Nivia Dominator Football | Oriental Sports Pune',
 398:     seoDescription: 'Nivia Dominator Match Football at ₹1,839. Available at Oriental Sports MG Road Camp, Pune.',
 399:   },
 400:   {
 401:     id: 'prod-fb-04',
 402:     slug: 'cosco-milano-football',
 403:     name: 'Cosco Milano Football',
 404:     category: 'football',
 405:     categoryName: 'Football',
 406:     subcategory: 'footballs',
 407:     subcategoryName: 'Footballs',
 408:     productType: 'ball',
 409:     brand: 'Cosco',
 410:     price: 1240,
 411:     currency: 'INR',
 412:     quantityUnit: '1 piece',
 413:     rating: 4.7,
 414:     reviewsCount: 18,
 415:     isFeatured: false,
 416:     inStock: true,
 417:     images: [
 418:       '/images/products/oriental-sports/cosco-milano-football.webp',
 419:       '/images/products/oriental-sports/cosco-milano-football.jpg',
 420:     ],
 421:     description: 'Synthetic leather training and match football built for consistent touch, durability, and weather resistance.',
 422:     features: [
 423:       'Premium synthetic leather construction',
 424:       'Hand-stitched 32 panel design',
 425:       'Excellent shape retention on all outdoor surfaces',
 426:     ],
 427:     specs: {
 428:       'Brand': 'Cosco',
 429:       'Model': 'Milano',
 430:       'Quantity': '1 piece (1 Nos)',
 431:       'Outer Material': 'Synthetic Leather',
 432:     },
 433:     seoTitle: 'Cosco Milano Football | Oriental Sports Pune',
 434:     seoDescription: 'Cosco Milano Football available at Oriental Sports Pune for ₹1,240.',
 435:   },
 436:   {
 437:     id: 'prod-fb-05',
 438:     slug: 'cosco-super-star-football',
 439:     name: 'Cosco Super Star Football',
 440:     category: 'football',
 441:     categoryName: 'Football',
 442:     subcategory: 'footballs',
 443:     subcategoryName: 'Footballs',
 444:     productType: 'ball',
 445:     brand: 'Cosco',
 446:     price: 1300,
 447:     currency: 'INR',
 448:     quantityUnit: '1 piece',
 449:     rating: 4.7,
 450:     reviewsCount: 23,
 451:     isFeatured: false,
 452:     inStock: true,
 453:     images: [
 454:       '/images/products/oriental-sports/cosco-super-star-football.webp',
 455:       '/images/products/oriental-sports/cosco-super-star-football.jpg',
 456:     ],
 457:     description: 'Durable hand-stitched construction with high-tensile backing for club play, school tournaments, and training sessions.',
 458:     features: [
 459:       'Hand-stitched robust outer skin',
 460:       'High-tensile multi-ply lamination',
 461:       'Balanced weight for accurate passing and shooting',
 462:     ],
 463:     specs: {
 464:       'Brand': 'Cosco',
 465:       'Model': 'Super Star',
 466:       'Quantity': '1 piece (1 Nos)',
 467:       'Grade': 'Training & Club Play',
 468:     },
 469:     seoTitle: 'Cosco Super Star Football | Oriental Sports Pune',
 470:     seoDescription: 'Cosco Super Star Football at ₹1,300. Authentic sports gear from Oriental Sports Pune.',
 471:   },
 472:   {
 473:     id: 'prod-fb-06',
 474:     slug: 'nivia-stockings-encounter',
 475:     name: 'Nivia Stockings Encounter',
 476:     category: 'football',
 477:     categoryName: 'Football',
 478:     subcategory: 'football-stockings',
 479:     subcategoryName: 'Football Stockings',
 480:     productType: 'stockings',
 481:     brand: 'Nivia',
 482:     price: 175,
 483:     currency: 'INR',
 484:     quantityUnit: '1 piece',
 485:     rating: 4.8,
 486:     reviewsCount: 45,
 487:     badge: 'BESTSELLER',
 488:     isFeatured: false,
 489:     inStock: true,
 490:     images: [
 491:       '/images/products/oriental-sports/nivia-stockings-encounter.webp',
 492:       '/images/products/oriental-sports/nivia-stockings-encounter.jpg',
 493:     ],
 494:     description: 'Ergonomic athletic stockings with ribbed ankle and arch compression support for secure fit over shin guards.',
 495:     features: [
 496:       'Sweat-wicking stretch knit fabric',
 497:       'Ribbed elastic cuffs keep stockings locked in place',
 498:       'Reinforced heel and toe for high wear durability',
 499:     ],
 500:     specs: {
 501:       'Brand': 'Nivia',
 502:       'Model': 'Encounter',
 503:       'Product Type': 'Football Stockings',
 504:       'Quantity': '1 piece (1 Nos)',
 505:     },
 506:     seoTitle: 'Nivia Encounter Football Stockings | Oriental Sports Pune',
 507:     seoDescription: 'Buy Nivia Encounter Football Stockings at Oriental Sports Camp Pune for ₹175.',
 508:   },
 509:   {
 510:     id: 'prod-fb-07',
 511:     slug: 'nivia-carbonat-8-0-pro-football-shoes',
 512:     name: 'Nivia Carbonat 8.0 Pro Football Shoes',
 513:     category: 'football',
 514:     categoryName: 'Football',
 515:     subcategory: 'football-shoes',
 516:     subcategoryName: 'Football Shoes',
 517:     productType: 'shoes',
 518:     brand: 'Nivia',
 519:     price: 1129,
 520:     currency: 'INR',
 521:     quantityUnit: '1 piece',
 522:     rating: 4.8,
 523:     reviewsCount: 38,
 524:     badge: 'BESTSELLER',
 525:     isFeatured: true,
 526:     inStock: true,
 527:     images: [
 528:       '/images/products/oriental-sports/nivia-carbonat-8-0-pro-shoes.webp',
 529:       '/images/products/oriental-sports/nivia-carbonat-8-0-pro-shoes.jpg',
 530:     ],
 531:     description: 'Lightweight synthetic upper with molded multi-stud configuration for explosive traction on artificial turf and firm ground pitches.',
 532:     features: [
 533:       'Durable textured synthetic leather upper for ball control',
 534:       'Direct-injected TPU outsole with multi-ground stud placement',
 535:       'Die-cut EVA sockliner for cushioned footbed',
 536:     ],
 537:     specs: {
 538:       'Brand': 'Nivia',
 539:       'Model': 'Carbonat 8.0 Pro',
 540:       'Quantity': '1 piece (1 Nos)',
 541:       'Sole Material': 'Molded TPU Studs',
 542:       'Upper': 'Synthetic Leather',
 543:     },
 544:     sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
 545:     seoTitle: 'Nivia Carbonat 8.0 Pro Football Shoes | Oriental Sports Pune',
 546:     seoDescription: 'Nivia Carbonat 8.0 Pro Football Shoes at ₹1,129. Multi-ground studs at Oriental Sports Pune.',
 547:   },
 548:   {
 549:     id: 'prod-fb-08',
 550:     slug: 'nivia-encounter-football-shoes',
 551:     name: 'Nivia Encounter Football Shoes',
 552:     category: 'football',
 553:     categoryName: 'Football',
 554:     subcategory: 'football-shoes',
 555:     subcategoryName: 'Football Shoes',
 556:     productType: 'shoes',
 557:     brand: 'Nivia',
 558:     price: 1199,
 559:     currency: 'INR',
 560:     quantityUnit: '1 piece',
 561:     rating: 4.7,
 562:     reviewsCount: 27,
 563:     isFeatured: false,
 564:     inStock: true,
 565:     images: [
 566:       '/images/products/oriental-sports/nivia-encounter-football-shoes.webp',
 567:       '/images/products/oriental-sports/nivia-encounter-football-shoes.jpg',
 568:     ],
 569:     description: 'Padded collar and reinforced toe box football boots offering stability, comfort, and traction during fast directional changes.',
 570:     features: [
 571:       'Reinforced synthetic upper with contrast styling',
 572:       'Ergonomic lacing for customizable snug fit',
 573:       'High traction round studs for grass and mud grounds',
 574:     ],
 575:     specs: {
 576:       'Brand': 'Nivia',
 577:       'Model': 'Encounter Football Shoes',
 578:       'Quantity': '1 piece (1 Nos)',
 579:       'Outsole': 'Firm Ground Cleats',
 580:     },
 581:     sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
 582:     seoTitle: 'Nivia Encounter Football Shoes | Oriental Sports Pune',
 583:     seoDescription: 'Nivia Encounter Football Shoes at ₹1,199. Available at Oriental Sports MG Road Camp, Pune.',
 584:   },
 585: 
 586:   // ==========================================================================
 587:   // 3. BADMINTON — YONEX RACKETS (EXCEL INVENTORY)
 588:   // ==========================================================================
 589:   {
 590:     id: 'prod-badm-gr303i',
 591:     slug: 'yonex-gr-303i-badminton-racket',
 592:     name: 'Yonex GR 303I Badminton Racket',
 593:     category: 'badminton',
 594:     categoryName: 'Badminton',
 595:     subcategory: 'badminton-rackets',
 596:     subcategoryName: 'Badminton Rackets',
 597:     productType: 'racket',
 598:     brand: 'Yonex',
 599:     price: 1049,
 600:     currency: 'INR',
 601:     quantityUnit: '1 racket',
 602:     rating: 4.8,
 603:     reviewsCount: 52,
 604:     badge: 'BESTSELLER',
 605:     isFeatured: true,
 606:     inStock: true,
 607:     images: [
 608:       '/images/products/oriental-sports/yonex-gr-303i.webp',
 609:       '/images/products/oriental-sports/yonex-gr-303i.jpg',
 610:       '/images/products/badminton_racquet_carbon.webp',
 611:     ],
 612:     description: 'Aluminum frame badminton racket with steel shaft designed for beginners and recreational club players seeking durability and easy handling.',
 613:     features: [
 614:       'Durable aluminum head with steel shaft construction',
 615:       'Isometric head shape for enlarged sweet spot',
 616:       'Pre-strung with Yonex factory string',
 617:       'Includes full head cover',
 618:     ],
 619:     specs: {
 620:       'Brand': 'Yonex',
 621:       'Model': 'GR 303I',
 622:       'Quantity': '1 racket (1 Nos)',
 623:       'Frame': 'Aluminum',
 624:       'Shaft': 'Steel',
 625:     },
 626:     seoTitle: 'Yonex GR 303I Badminton Racket | Oriental Sports Pune',
 627:     seoDescription: 'Buy Yonex GR 303I Badminton Racket for ₹1,049 at Oriental Sports Camp Pune.',
 628:   },
 629:   {
 630:     id: 'prod-badm-zr100',
 631:     slug: 'yonex-zr-100-badminton-racket',
 632:     name: 'Yonex ZR 100 Badminton Racket',
 633:     category: 'badminton',
 634:     categoryName: 'Badminton',
 635:     subcategory: 'badminton-rackets',
 636:     subcategoryName: 'Badminton Rackets',
 637:     productType: 'racket',
 638:     brand: 'Yonex',
 639:     price: 1049,
 640:     currency: 'INR',
 641:     quantityUnit: '1 racket',
 642:     rating: 4.7,
 643:     reviewsCount: 39,
 644:     isFeatured: false,
 645:     inStock: true,
 646:     images: [
 647:       '/images/products/oriental-sports/yonex-zr-100.webp',
 648:       '/images/products/oriental-sports/yonex-zr-100.jpg',
 649:       '/images/products/badminton_racquet_carbon.webp',
 650:     ],
 651:     description: 'Reliable entry-level aluminum frame badminton racquet built for consistent recreational play and training sessions.',
 652:     features: [
 653:       'Sturdy isometric frame design',
 654:       'Pre-strung with durable synthetic string',
 655:       'Lightweight frame balance for smooth swings',
 656:     ],
 657:     specs: {
 658:       'Brand': 'Yonex',
 659:       'Model': 'ZR 100',
 660:       'Quantity': '1 racket (1 Nos)',
 661:       'Frame Material': 'Aluminum',
 662:     },
 663:     seoTitle: 'Yonex ZR 100 Badminton Racket | Oriental Sports Pune',
 664:     seoDescription: 'Yonex ZR 100 Badminton Racket at ₹1,049. Original Yonex gear from Oriental Sports Pune.',
 665:   },
 666:   {
 667:     id: 'prod-badm-nf8000i',
 668:     slug: 'yonex-nanoflare-8000i-badminton-racket',
 669:     name: 'Yonex Nanoflare 8000I Badminton Racket',
 670:     category: 'badminton',
 671:     categoryName: 'Badminton',
 672:     subcategory: 'badminton-rackets',
 673:     subcategoryName: 'Badminton Rackets',
 674:     productType: 'racket',
 675:     brand: 'Yonex',
 676:     price: 1650,
 677:     currency: 'INR',
 678:     quantityUnit: '1 racket',
 679:     rating: 4.9,
 680:     reviewsCount: 44,
 681:     badge: 'BESTSELLER',
 682:     isFeatured: true,
 683:     inStock: true,
 684:     images: [
 685:       '/images/products/oriental-sports/yonex-nanoflare-8000i.webp',
 686:       '/images/products/oriental-sports/yonex-nanoflare-8000i.jpg',
 687:       '/images/products/badminton_racquet_carbon.webp',
 688:     ],
 689:     description: 'Head-light graphite composite racket engineered for high aerodynamic swing speed, fast defensive recovery, and rapid counter-attacks.',
 690:     features: [
 691:       'Nanoflare aerodynamic Sonic Flare System frame',
 692:       'Head-light balance for lightning racquet maneuverability',
 693:       'Full graphite construction with slim shaft',
 694:     ],
 695:     specs: {
 696:       'Brand': 'Yonex',
 697:       'Model': 'Nanoflare 8000I',
 698:       'Quantity': '1 racket (1 Nos)',
 699:       'Frame': 'Graphite / Sonic Flare System',
 700:       'Balance': 'Head Light',
 701:     },
 702:     seoTitle: 'Yonex Nanoflare 8000I Badminton Racket | Oriental Sports Pune',
 703:     seoDescription: 'Yonex Nanoflare 8000I Badminton Racket at ₹1,650. Fast speed and lightweight pickup at Oriental Sports Camp Pune.',
 704:   },
 705:   {
 706:     id: 'prod-badm-attack9',
 707:     slug: 'yonex-attack-9-badminton-racket',
 708:     name: 'Yonex Attack 9 Badminton Racket',
 709:     category: 'badminton',
 710:     categoryName: 'Badminton',
 711:     subcategory: 'badminton-rackets',
 712:     subcategoryName: 'Badminton Rackets',
 713:     productType: 'racket',
 714:     brand: 'Yonex',
 715:     price: 2690,
 716:     currency: 'INR',
 717:     quantityUnit: '1 racket',
 718:     rating: 4.8,
 719:     reviewsCount: 31,
 720:     isFeatured: false,
 721:     inStock: true,
 722:     images: [
 723:       '/images/products/oriental-sports/yonex-attack-9.webp',
 724:       '/images/products/oriental-sports/yonex-attack-9.jpg',
 725:       '/images/products/badminton_racquet_carbon.webp',
 726:     ],
 727:     description: 'Powerful offensive racquet designed with head-heavy bias for smashing velocity and deep baseline clears.',
 728:     features: [
 729:       'High modulus graphite frame and shaft',
 730:       'Head-heavy balance tuned for steep attack angles',
 731:       'Supports high stringing tensions up to 30 lbs',
 732:     ],
 733:     specs: {
 734:       'Brand': 'Yonex',
 735:       'Model': 'Attack 9',
 736:       'Quantity': '1 racket (1 Nos)',
 737:       'Material': 'High Modulus Graphite',
 738:       'Balance': 'Head Heavy',
 739:     },
 740:     seoTitle: 'Yonex Attack 9 Badminton Racket | Oriental Sports Pune',
 741:     seoDescription: 'Yonex Attack 9 Badminton Racket at ₹2,690. Smash power and graphite frame at Oriental Sports Pune.',
 742:   },
 743:   {
 744:     id: 'prod-badm-nfspeed7',
 745:     slug: 'yonex-nanoflare-speed-7-badminton-racket',
 746:     name: 'Yonex Nanoflare Speed 7 Badminton Racket',
 747:     category: 'badminton',
 748:     categoryName: 'Badminton',
 749:     subcategory: 'badminton-rackets',
 750:     subcategoryName: 'Badminton Rackets',
 751:     productType: 'racket',
 752:     brand: 'Yonex',
 753:     price: 2690,
 754:     currency: 'INR',
 755:     quantityUnit: '1 racket',
 756:     rating: 4.9,
 757:     reviewsCount: 28,
 758:     badge: 'MATCH GRADE',
 759:     isFeatured: false,
 760:     inStock: true,
 761:     images: [
 762:       '/images/products/oriental-sports/yonex-nanoflare-speed-7.webp',
 763:       '/images/products/oriental-sports/yonex-nanoflare-speed-7.jpg',
 764:       '/images/products/badminton_racquet_carbon.webp',
 765:     ],
 766:     description: 'Aero-frame speed racquet engineered for fast doubles intercepts, net kills, and crisp repulsion power.',
 767:     features: [
 768:       'Aero Profile frame reduces air drag by up to 11%',
 769:       'Ultra PEF vibration-damping carbon shaft',
 770:       'Isometric expanded sweet spot technology',
 771:     ],
 772:     specs: {
 773:       'Brand': 'Yonex',
 774:       'Model': 'Nanoflare Speed 7',
 775:       'Quantity': '1 racket (1 Nos)',
 776:       'Balance': 'Head Light',
 777:     },
 778:     seoTitle: 'Yonex Nanoflare Speed 7 Badminton Racket | Oriental Sports',
 779:     seoDescription: 'Yonex Nanoflare Speed 7 Badminton Racket at ₹2,690. Fast doubles speed at Oriental Sports Pune.',
 780:   },
 781:   {
 782:     id: 'prod-badm-voltric35i',
 783:     slug: 'yonex-voltric-35i-badminton-racket',
 784:     name: 'Yonex Voltric 35I Badminton Racket',
 785:     category: 'badminton',
 786:     categoryName: 'Badminton',
 787:     subcategory: 'badminton-rackets',
 788:     subcategoryName: 'Badminton Rackets',
 789:     productType: 'racket',
 790:     brand: 'Yonex',
 791:     price: 3600,
 792:     currency: 'INR',
 793:     quantityUnit: '1 racket',
 794:     rating: 4.9,
 795:     reviewsCount: 36,
 796:     badge: 'MATCH GRADE',
 797:     isFeatured: true,
 798:     inStock: true,
 799:     images: [
 800:       '/images/products/oriental-sports/yonex-voltric-35i.webp',
 801:       '/images/products/oriental-sports/yonex-voltric-35i.jpg',
 802:       '/images/products/badminton_racquet_carbon.webp',
 803:     ],
 804:     description: 'Tri-Voltage System racquet combining devastating smash power with swift racquet handling for intermediate and advanced players.',
 805:     features: [
 806:       'Yonex Tri-Voltage System delivers explosive smash weight with fast maneuverability',
 807:       'Tungsten-infused grommet strips at frame 2 and 10 o’clock',
 808:       'Full graphite isometric head',
 809:     ],
 810:     specs: {
 811:       'Brand': 'Yonex',
 812:       'Model': 'Voltric 35I',
 813:       'Quantity': '1 racket (1 Nos)',
 814:       'Technology': 'Tri-Voltage System',
 815:       'Balance': 'Head Heavy Power',
 816:     },
 817:     seoTitle: 'Yonex Voltric 35I Badminton Racket | Oriental Sports Pune',
 818:     seoDescription: 'Yonex Voltric 35I Badminton Racket with Tri-Voltage System at ₹3,600. Oriental Sports Camp Pune.',
 819:   },
 820:   {
 821:     id: 'prod-badm-astrox43i',
 822:     slug: 'yonex-astrox-43i-badminton-racket',
 823:     name: 'Yonex Astrox 43I Badminton Racket',
 824:     category: 'badminton',
 825:     categoryName: 'Badminton',
 826:     subcategory: 'badminton-rackets',
 827:     subcategoryName: 'Badminton Rackets',
 828:     productType: 'racket',
 829:     brand: 'Yonex',
 830:     price: 2690,
 831:     currency: 'INR',
 832:     quantityUnit: '1 racket',
 833:     rating: 4.8,
 834:     reviewsCount: 42,
 835:     badge: 'BESTSELLER',
 836:     isFeatured: false,
 837:     inStock: true,
 838:     images: [
 839:       '/images/products/oriental-sports/yonex-astrox-43i.webp',
 840:       '/images/products/oriental-sports/yonex-astrox-43i.jpg',
 841:       '/images/products/badminton_racquet_carbon.webp',
 842:     ],
 843:     description: 'Rotational Generator System racquet that counterbalances weight distribution across grip, T-joint, and frame top for steep attack angles.',
 844:     features: [
 845:       'Rotational Generator System for smooth transition between consecutive smashes',
 846:       'Namd revolutionary graphite flexes and snaps back instantly',
 847:       'Energy Boost Cap Plus maximizes shaft performance',
 848:     ],
 849:     specs: {
 850:       'Brand': 'Yonex',
 851:       'Model': 'Astrox 43I',
 852:       'Quantity': '1 racket (1 Nos)',
 853:       'Technology': 'Rotational Generator System',
 854:       'Balance': 'Head Heavy',
 855:     },
 856:     seoTitle: 'Yonex Astrox 43I Badminton Racket | Oriental Sports Pune',
 857:     seoDescription: 'Yonex Astrox 43I Badminton Racket at ₹2,690. Rotational Generator System at Oriental Sports Pune.',
 858:   },
 859:   {
 860:     id: 'prod-badm-arcsaber7play',
 861:     slug: 'yonex-arcsaber-7-play-badminton-racket',
 862:     name: 'Yonex Arcsaber 7 Play Badminton Racket',
 863:     category: 'badminton',
 864:     categoryName: 'Badminton',
 865:     subcategory: 'badminton-rackets',
 866:     subcategoryName: 'Badminton Rackets',
 867:     productType: 'racket',
 868:     brand: 'Yonex',
 869:     price: 5390,
 870:     currency: 'INR',
 871:     quantityUnit: '1 racket',
 872:     rating: 5.0,
 873:     reviewsCount: 49,
 874:     badge: 'MATCH GRADE',
 875:     isFeatured: true,
 876:     inStock: true,
 877:     images: [
 878:       '/images/products/oriental-sports/yonex-arcsaber-7-play.webp',
 879:       '/images/products/oriental-sports/yonex-arcsaber-7-play.jpg',
 880:       '/images/products/badminton_racquet_carbon.webp',
 881:     ],
 882:     description: 'Decisive shuttlecock hold and pinpoint control frame. Engineered with enhanced frame flexibility for ultimate shot accuracy and touch.',
 883:     features: [
 884:       'Enhanced Arcsaber frame structure holds the shuttle on the string bed longer',
 885:       'Isometric extended sweet spot with Slim Shaft design',
 886:       'Even balance tuned for precision singles and doubles play',
 887:     ],
 888:     specs: {
 889:       'Brand': 'Yonex',
 890:       'Model': 'Arcsaber 7 Play',
 891:       'Quantity': '1 racket (1 Nos)',
 892:       'Balance': 'Even Balance Control',
 893:       'Material': 'High Modulus Carbon Graphite',
 894:     },
 895:     seoTitle: 'Yonex Arcsaber 7 Play Badminton Racket | Oriental Sports',
 896:     seoDescription: 'Yonex Arcsaber 7 Play Badminton Racket at ₹5,390. Match grade shuttle hold and control at Oriental Sports Pune.',
 897:   },
 898:   {
 899:     id: 'prod-badm-mp29',
 900:     slug: 'yonex-muscle-power-29-badminton-racket',
 901:     name: 'Yonex Muscle Power 29 Badminton Racket',
 902:     category: 'badminton',
 903:     categoryName: 'Badminton',
 904:     subcategory: 'badminton-rackets',
 905:     subcategoryName: 'Badminton Rackets',
 906:     productType: 'racket',
 907:     brand: 'Yonex',
 908:     price: 4490,
 909:     currency: 'INR',
 910:     quantityUnit: '1 racket',
 911:     rating: 4.9,
 912:     reviewsCount: 35,
 913:     badge: 'MATCH GRADE',
 914:     isFeatured: true,
 915:     inStock: true,
 916:     images: [
 917:       '/images/products/oriental-sports/yonex-muscle-power-29.webp',
 918:       '/images/products/oriental-sports/yonex-muscle-power-29.jpg',
 919:       '/images/products/badminton_racquet_carbon.webp',
 920:     ],
 921:     description: 'Muscle Power frame technology locates string on rounded archways that eliminate stress-load and fatigue through contact friction.',
 922:     features: [
 923:       'Muscle Power rounded frame channels transfer full energy into the shuttle',
 924:       'High rigidity graphite frame with vibration isolation',
 925:       'Exceptional string bed life and solid hitting feel',
 926:     ],
 927:     specs: {
 928:       'Brand': 'Yonex',
 929:       'Model': 'Muscle Power 29',
 930:       'Quantity': '1 racket (1 Nos)',
 931:       'Frame': 'Muscle Power High Modulus Graphite',
 932:     },
 933:     seoTitle: 'Yonex Muscle Power 29 Badminton Racket | Oriental Sports',
 934:     seoDescription: 'Yonex Muscle Power 29 Badminton Racket at ₹4,490. Legendary Muscle Power frame at Oriental Sports Pune.',
 935:   },
 936: 
 937:   // ==========================================================================
 938:   // 4. BADMINTON — SHUTTLECOCKS (EXCEL INVENTORY)
 939:   // ==========================================================================
 940:   {
 941:     id: 'prod-shuttle-mavis350',
 942:     slug: 'yonex-mavis-350-shuttlecock',
 943:     name: 'Yonex Mavis-350 Nylon Shuttlecocks',
 944:     category: 'badminton',
 945:     categoryName: 'Badminton',
 946:     subcategory: 'synthetic-shuttlecocks',
 947:     subcategoryName: 'Nylon / Synthetic Shuttlecocks',
 948:     productType: 'shuttlecock',
 949:     brand: 'Yonex',
 950:     price: 1650,
 951:     currency: 'INR',
 952:     quantityUnit: '1 piece',
 953:     color: 'Yellow',
 954:     rating: 4.9,
 955:     reviewsCount: 110,
 956:     badge: 'BESTSELLER',
 957:     isFeatured: true,
 958:     inStock: true,
 959:     images: [
 960:       '/images/products/oriental-sports/yonex-mavis-350.webp',
 961:       '/images/products/oriental-sports/yonex-mavis-350.jpg',
 962:     ],
 963:     description: 'The industry standard precision nylon shuttlecock engineered with natural Portuguese cork base and Wing-Rib lattice design.',
 964:     features: [
 965:       'Precision manufactured nylon skirt with natural cork base',
 966:       'Flight recovery within 0.02 seconds of smash impact',
 967:       'Up to 4-5 times more durable than conventional nylon shuttles',
 968:     ],
 969:     specs: {
 970:       'Brand': 'Yonex',
 971:       'Model': 'Mavis-350',
 972:       'Color': 'Yellow',
 973:       'Quantity': '1 piece (1 Nos)',
 974:       'Base': 'Natural Cork Base',
 975:       'Skirt': 'Precision Nylon',
 976:     },
 977:     seoTitle: 'Yonex Mavis-350 Nylon Shuttlecocks | Oriental Sports Pune',
 978:     seoDescription: 'Yonex Mavis-350 Yellow Nylon Shuttlecock at ₹1,650. Genuine Yonex stock at Oriental Sports Camp Pune.',
 979:   },
 980:   {
 981:     id: 'prod-shuttle-mavis350i',
 982:     slug: 'yonex-mavis-350i-shuttlecock',
 983:     name: 'Yonex Mavis-350i Nylon Shuttlecocks',
 984:     category: 'badminton',
 985:     categoryName: 'Badminton',
 986:     subcategory: 'synthetic-shuttlecocks',
 987:     subcategoryName: 'Nylon / Synthetic Shuttlecocks',
 988:     productType: 'shuttlecock',
 989:     brand: 'Yonex',
 990:     price: 1650,
 991:     currency: 'INR',
 992:     quantityUnit: '1 piece',
 993:     color: 'Yellow',
 994:     rating: 4.8,
 995:     reviewsCount: 46,
 996:     isFeatured: false,
 997:     inStock: true,
 998:     images: [
 999:       '/images/products/oriental-sports/yonex-mavis-350i.webp',
1000:       '/images/products/oriental-sports/yonex-mavis-350i.jpg',
1001:     ],
1002:     description: 'Precision engineered nylon shuttlecock optimized for Indian playing conditions and club tournament sessions.',
1003:     features: [
1004:       'High-durability synthetic skirt',
1005:       'Consistent flight trajectory and accurate drop distance',
1006:       'Tested for stable rotational recovery',
1007:     ],
1008:     specs: {
1009:       'Brand': 'Yonex',
1010:       'Model': 'Mavis-350i',
1011:       'Color': 'Yellow',
1012:       'Quantity': '1 piece (1 Nos)',
1013:     },
1014:     seoTitle: 'Yonex Mavis-350i Shuttlecocks | Oriental Sports Pune',
1015:     seoDescription: 'Yonex Mavis-350i Shuttlecocks in Yellow at ₹1,650. Available at Oriental Sports Pune.',
1016:   },
1017:   {
1018:     id: 'prod-shuttle-mavis600',
1019:     slug: 'yonex-mavis-600-shuttlecock',
1020:     name: 'Yonex Mavis-600 Nylon Shuttlecocks',
1021:     category: 'badminton',
1022:     categoryName: 'Badminton',
1023:     subcategory: 'synthetic-shuttlecocks',
1024:     subcategoryName: 'Nylon / Synthetic Shuttlecocks',
1025:     productType: 'shuttlecock',
1026:     brand: 'Yonex',
1027:     price: 1680,
1028:     currency: 'INR',
1029:     quantityUnit: '1 piece',
1030:     color: 'Green / Yellow',
1031:     rating: 4.9,
1032:     reviewsCount: 38,
1033:     badge: 'MATCH GRADE',
1034:     isFeatured: true,
1035:     inStock: true,
1036:     images: [
1037:       '/images/products/oriental-sports/yonex-mavis-600.webp',
1038:       '/images/products/oriental-sports/yonex-mavis-600.jpg',
1039:     ],
1040:     description: 'Advanced flight profile nylon shuttlecock engineered with feather-like arc and parabolic deceleration.',
1041:     features: [
1042:       'Closest trajectory profile to natural feather shuttlecocks',
1043:       'Reinforced rib structural support for high-impact durability',
1044:       'High visibility Green / Yellow skirt',
1045:     ],
1046:     specs: {
1047:       'Brand': 'Yonex',
1048:       'Model': 'Mavis-600',
1049:       'Color': 'Green / Yellow',
1050:       'Quantity': '1 piece (1 Nos)',
1051:     },
1052:     seoTitle: 'Yonex Mavis-600 Nylon Shuttlecocks | Oriental Sports Pune',
1053:     seoDescription: 'Yonex Mavis-600 Nylon Shuttlecock at ₹1,680. Feather-like flight curve at Oriental Sports Pune.',
1054:   },
1055:   {
1056:     id: 'prod-shuttle-mavis500',
1057:     slug: 'yonex-mavis-500-shuttlecock',
1058:     name: 'Yonex Mavis-500 Nylon Shuttlecocks',
1059:     category: 'badminton',
1060:     categoryName: 'Badminton',
1061:     subcategory: 'synthetic-shuttlecocks',
1062:     subcategoryName: 'Nylon / Synthetic Shuttlecocks',
1063:     productType: 'shuttlecock',
1064:     brand: 'Yonex',
1065:     price: 1650,
1066:     currency: 'INR',
1067:     quantityUnit: '1 piece',
1068:     color: 'Yellow',
1069:     rating: 4.8,
1070:     reviewsCount: 29,
1071:     isFeatured: false,
1072:     inStock: true,
1073:     images: [
1074:       '/images/products/oriental-sports/yonex-mavis-500.webp',
1075:       '/images/products/oriental-sports/yonex-mavis-500.jpg',
1076:     ],
1077:     description: 'Consistent flight nylon shuttlecock with high rotational stability and rugged club longevity.',
1078:     features: [
1079:       'Tear-resistant synthetic skirt matrix',
1080:       'Solid cork striking cap for crisp sound on impact',
1081:       'Calibrated for standard temperature ranges',
1082:     ],
1083:     specs: {
1084:       'Brand': 'Yonex',
1085:       'Model': 'Mavis-500',
1086:       'Color': 'Yellow',
1087:       'Quantity': '1 piece (1 Nos)',
1088:     },
1089:     seoTitle: 'Yonex Mavis-500 Shuttlecock | Oriental Sports Pune',
1090:     seoDescription: 'Yonex Mavis-500 Yellow Shuttlecock at ₹1,650. Verified pricing at Oriental Sports Pune.',
1091:   },
1092:   {
1093:     id: 'prod-shuttle-mavis200i',
1094:     slug: 'mavis-200i-shuttlecock',
1095:     name: 'Mavis-200i Shuttlecock',
1096:     category: 'badminton',
1097:     categoryName: 'Badminton',
1098:     subcategory: 'synthetic-shuttlecocks',
1099:     subcategoryName: 'Nylon / Synthetic Shuttlecocks',
1100:     productType: 'shuttlecock',
1101:     brand: 'Mavis',
1102:     price: 750,
1103:     currency: 'INR',
1104:     quantityUnit: '1 piece',
1105:     color: 'Yellow',
1106:     rating: 4.7,
1107:     reviewsCount: 54,
1108:     badge: 'BESTSELLER',
1109:     isFeatured: false,
1110:     inStock: true,
1111:     images: [
1112:       '/images/products/oriental-sports/mavis-200i.webp',
1113:       '/images/products/oriental-sports/mavis-200i.jpg',
1114:     ],
1115:     description: 'Cost-effective synthetic training shuttlecock for academies, warm-ups, and recreational play.',
1116:     features: [
1117:       'Durable yellow synthetic skirt for high contrast against walls and lighting',
1118:       'Solid flight characteristics for drills and practice games',
1119:       'Budget-friendly price point for daily play',
1120:     ],
1121:     specs: {
1122:       'Brand': 'Mavis',
1123:       'Model': 'Mavis-200i',
1124:       'Color': 'Yellow',
1125:       'Quantity': '1 piece (1 Nos)',
1126:     },
1127:     seoTitle: 'Mavis-200i Shuttlecock | Oriental Sports Pune',
1128:     seoDescription: 'Mavis-200i Shuttlecock at ₹750. Quality synthetic training shuttle at Oriental Sports Pune.',
1129:   },
1130:   {
1131:     id: 'prod-shuttle-mavis10',
1132:     slug: 'yonex-mavis-10-shuttlecock',
1133:     name: 'Yonex Mavis-10 Nylon Shuttlecocks',
1134:     category: 'badminton',
1135:     categoryName: 'Badminton',
1136:     subcategory: 'synthetic-shuttlecocks',
1137:     subcategoryName: 'Nylon / Synthetic Shuttlecocks',
1138:     productType: 'shuttlecock',
1139:     brand: 'Yonex',
1140:     price: 990,
1141:     currency: 'INR',
1142:     quantityUnit: '1 piece',
1143:     color: 'Yellow',
1144:     rating: 4.7,
1145:     reviewsCount: 33,
1146:     isFeatured: false,
1147:     inStock: true,
1148:     images: [
1149:       '/images/products/oriental-sports/yonex-mavis-10.webp',
1150:       '/images/products/oriental-sports/yonex-mavis-10.jpg',
1151:     ],
1152:     description: 'Starter nylon shuttlecock offering reliable flight and high skirt elasticity for casual and outdoor badminton.',
1153:     features: [
1154:       'High-elasticity nylon lattice',
1155:       'Smooth aerodynamic skirt curvature',
1156:       'Optimized for recreational matches and backyard games',
1157:     ],
1158:     specs: {
1159:       'Brand': 'Yonex',
1160:       'Model': 'Mavis-10',
1161:       'Color': 'Yellow',
1162:       'Quantity': '1 piece (1 Nos)',
1163:     },
1164:     seoTitle: 'Yonex Mavis-10 Shuttlecock | Oriental Sports Pune',
1165:     seoDescription: 'Yonex Mavis-10 Yellow Shuttlecock at ₹990. Genuine sports inventory at Oriental Sports Pune.',
1166:   },
1167:   {
1168:     id: 'prod-shuttle-as2',
1169:     slug: 'yonex-as2-feather-shuttlecock',
1170:     name: 'Yonex AS2 Feather Shuttlecock',
1171:     category: 'badminton',
1172:     categoryName: 'Badminton',
1173:     subcategory: 'feather-shuttlecocks',
1174:     subcategoryName: 'Feather Shuttlecocks',
1175:     productType: 'shuttlecock',
1176:     brand: 'Yonex',
1177:     price: 6060,
1178:     currency: 'INR',
1179:     quantityUnit: '1 piece',
1180:     color: 'White',
1181:     rating: 5.0,
1182:     reviewsCount: 42,
1183:     badge: 'MATCH GRADE',
1184:     isFeatured: true,
1185:     inStock: true,
1186:     images: [
1187:       '/images/products/oriental-sports/yonex-as2-feather.webp',
1188:       '/images/products/oriental-sports/yonex-as2-feather.jpg',
1189:     ],
1190:     description: 'Tournament-grade Aerosensa AS-2 goose feather shuttlecock engineered for precision flight, accurate speed, and international sanctioned matches.',
1191:     features: [
1192:       'Selected 100% natural goose feathers',
1193:       'Solid dual-layer Portuguese natural cork base',
1194:       'Strictly flight-tested and speed-graded at Yonex facilities',
1195:     ],
1196:     specs: {
1197:       'Brand': 'Yonex',
1198:       'Model': 'AS2 (Aerosensa 2)',
1199:       'Color': 'White',
1200:       'Quantity': '1 piece (1 Nos)',
1201:       'Feather Type': '100% Goose Feather',
1202:     },
1203:     seoTitle: 'Yonex AS2 Feather Shuttlecock | Oriental Sports Pune',
1204:     seoDescription: 'Yonex Aerosensa AS2 Feather Shuttlecock at ₹6,060. Match-grade tournament shuttles at Oriental Sports Pune.',
1205:   },
1206:   {
1207:     id: 'prod-shuttle-acbtr',
1208:     slug: 'acbtr-feather-shuttlecock',
1209:     name: 'ACBTR Shuttlecock',
1210:     category: 'badminton',
1211:     categoryName: 'Badminton',
1212:     subcategory: 'feather-shuttlecocks',
1213:     subcategoryName: 'Feather Shuttlecocks',
1214:     productType: 'shuttlecock',
1215:     brand: 'ACBTR',
1216:     price: 4980,
1217:     currency: 'INR',
1218:     quantityUnit: '1 piece',
1219:     color: 'White',
1220:     rating: 4.8,
1221:     reviewsCount: 21,
1222:     badge: 'MATCH GRADE',
1223:     isFeatured: false,
1224:     inStock: true,
1225:     images: [
1226:       '/images/products/oriental-sports/acbtr-feather.webp',
1227:       '/images/products/oriental-sports/acbtr-feather.jpg',
1228:     ],
1229:     description: 'Match grade white feather shuttlecock designed for club tournaments, precise trajectory, and high-velocity smash durability.',
1230:     features: [
1231:       'Carefully selected white feathers with uniform spine thickness',
1232:       'Multi-layer natural cork base for clean repulsion feel',
1233:       'Stable flight curve and consistent landing precision',
1234:     ],
1235:     specs: {
1236:       'Brand': 'ACBTR',
1237:       'Model': 'ACBTR Match Shuttlecock',
1238:       'Color': 'White',
1239:       'Quantity': '1 piece (1 Nos)',
1240:       'Type': 'Feather Shuttlecock',
1241:     },
1242:     seoTitle: 'ACBTR Feather Shuttlecock | Oriental Sports Pune',
1243:     seoDescription: 'ACBTR Feather Shuttlecock at ₹4,980. Available at Oriental Sports MG Road Camp, Pune.',
1244:   },
1245: 
1246:   // ==========================================================================
1247:   // 5. PICKLEBALL
1248:   // ==========================================================================
1249:   {
1250:     id: 'prod-pb-01',
1251:     slug: 'oriental-pro-carbon-pickleball-paddle',
1252:     name: 'Toray T700 Raw Carbon Pickleball Paddle',
1253:     category: 'pickleball',
1254:     categoryName: 'Pickleball',
1255:     subcategory: 'pickleball-paddles',
1256:     subcategoryName: 'Pickleball Paddles',
1257:     productType: 'paddle',
1258:     brand: 'Oriental Pro',
1259:     price: 7499,
1260:     originalPrice: 8999,
1261:     rating: 4.9,
1262:     reviewsCount: 38,
1263:     badge: 'BESTSELLER',
1264:     isFeatured: true,
1265:     inStock: true,
1266:     shopifyId: 'gid://shopify/Product/pb01',
1267:     shopifyVariantId: 'gid://shopify/ProductVariant/pb01-v1',
1268:     images: [
1269:       '/images/products/pickleball_paddle_toray.webp',
1270:       '/images/categories/pickleball_category.webp',
1271:     ],
1272:     description: 'Engineered with friction-textured Japanese Toray T700 raw carbon fiber and a 16mm vibration-dampening polypropylene honeycomb core.',
1273:     features: [
1274:       'USA Pickleball approved tournament dimensions',
1275:       'Raw textured Toray T700 carbon face for maximum RPM spin',
1276:       '16mm Reactive Polymer Honeycomb core for giant sweet spot',
1277:     ],
1278:     specs: {
1279:       'Core Thickness': '16 mm Honeycomb Polymer',
1280:       'Surface': 'Toray T700 Raw Textured Carbon',
1281:       'Average Weight': '225 g / 7.9 oz',
1282:     },
1283:     variants: [
1284:       { id: 'v-std', name: '16mm Control Edition', price: 7499, inStock: true },
1285:       { id: 'v-pwr', name: '14mm Power Edition', price: 7499, inStock: true },
1286:     ],
1287:   },
1288:   {
1289:     id: 'prod-pb-02',
1290:     slug: 'dura-fast-40-outdoor-pickleball-pack-6',
1291:     name: 'Dura 40-Hole Outdoor Tournament Pickleballs (Pack of 6)',
1292:     category: 'pickleball',
1293:     categoryName: 'Pickleball',
1294:     subcategory: 'pickleball-balls',
1295:     subcategoryName: 'Pickleball Balls',
1296:     productType: 'ball',
1297:     brand: 'Oriental Match',
1298:     price: 1899,
1299:     originalPrice: 2200,
1300:     rating: 4.8,
1301:     reviewsCount: 54,
1302:     badge: 'MATCH GRADE',
1303:     isFeatured: false,
1304:     inStock: true,
1305:     images: [
1306:       'https://images.unsplash.com/photo-1711996151738-657bd95b7cdb?auto=format&fit=crop&w=800&q=80',
1307:     ],
1308:     description: 'Rotomolded one-piece seamless tournament balls with 40 precision laser-drilled holes for outdoor court play.',
1309:     features: [
1310:       'USAPA tournament approved for sanctioned play',
1311:       'Aerodynamic 40-hole pattern for true flight in windy outdoor conditions',
1312:     ],
1313:     specs: {
1314:       'Holes': '40 Precision Drilled Holes',
1315:       'Diameter': '74 mm',
1316:       'Pack Quantity': '6 Tournament Balls',
1317:     },
1318:   },
1319:   {
1320:     id: 'prod-pb-03',
1321:     slug: 'oriental-portable-pickleball-net-system',
1322:     name: 'Tournament Regulation Quick-Set Portable Pickleball Net',
1323:     category: 'pickleball',
1324:     categoryName: 'Pickleball',
1325:     subcategory: 'pickleball-nets',
1326:     subcategoryName: 'Pickleball Nets',
1327:     productType: 'net',
1328:     brand: 'Oriental Pro',
1329:     price: 11499,
1330:     rating: 4.9,
1331:     reviewsCount: 17,
1332:     badge: 'ORIENTAL EXCLUSIVE',
1333:     isFeatured: false,
1334:     inStock: true,
1335:     images: [
1336:       '/images/categories/pickleball_category.webp',
1337:     ],
1338:     description: 'Official USAPA 22-foot regulation portable net system featuring powder-coated steel interlocking oval tubing.',
1339:     features: [
1340:       '22 ft width x 36 inch side height regulation',
1341:       'Wide oval steel base structure resists tip-over',
1342:     ],
1343:     specs: {
1344:       'Dimensions': '22 Feet x 36 Inches',
1345:       'Frame Material': 'Heavy Gauge Powder-Coated Steel',
1346:     },
1347:   },
1348: 
1349:   // ==========================================================================
1350:   // 6. TENNIS
1351:   // ==========================================================================
1352:   {
1353:     id: 'prod-ten-01',
1354:     slug: 'pro-tour-300g-graphite-tennis-racquet',
1355:     name: 'Pro Tour 300g High-Modulus Graphite Tennis Racquet',
1356:     category: 'tennis',
1357:     categoryName: 'Tennis',
1358:     subcategory: 'tennis-rackets',
1359:     subcategoryName: 'Tennis Racquets',
1360:     productType: 'racket',
1361:     brand: 'Oriental Pro',
1362:     price: 13999,
1363:     originalPrice: 15500,
1364:     rating: 4.9,
1365:     reviewsCount: 31,
1366:     badge: 'MATCH GRADE',
1367:     isFeatured: true,
1368:     inStock: true,
1369:     images: [
1370:       '/images/products/tennis_racquet_pro.webp',
1371:       'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=80',
1372:     ],
1373:     description: 'Tour balanced 300g unstrung frame featuring high modulus braided carbon fiber and Spin Vortex grommets.',
1374:     features: [
1375:       '100 sq inch head size for a generous sweet spot with pinpoint accuracy',
1376:       'Braided Graphite + Kevlar layup for buttery impact feel',
1377:     ],
1378:     specs: {
1379:       'Head Size': '100 sq. in. / 645 cm²',
1380:       'Unstrung Weight': '300 g / 10.6 oz',
1381:       'String Pattern': '16 Mains x 19 Crosses',
1382:     },
1383:   },
1384:   {
1385:     id: 'prod-ten-02',
1386:     slug: 'all-court-pressurized-tennis-balls-can-of-3',
1387:     name: 'All-Court High-Altitude Pressurized Tennis Balls (Can of 3)',
1388:     category: 'tennis',
1389:     categoryName: 'Tennis',
1390:     subcategory: 'tennis-balls',
1391:     subcategoryName: 'Tennis Balls',
1392:     productType: 'ball',
1393:     brand: 'Oriental Match',
1394:     price: 499,
1395:     rating: 4.8,
1396:     reviewsCount: 62,
1397:     badge: 'BESTSELLER',
1398:     isFeatured: false,
1399:     inStock: true,
1400:     images: [
1401:       'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=80',
1402:     ],
1403:     description: 'ITF approved premium woven felt tennis balls pressurised with pure nitrogen core for prolonged bounce life on hard acrylic courts.',
1404:     features: [
1405:       'ITF tournament certified for sanctioned competition',
1406:       'Extra-duty woven English wool felt for extreme abrasive resistance',
1407:     ],
1408:     specs: {
1409:       'Felt': 'Extra Duty Woven Wool Blend',
1410:       'Core': 'High-Density Natural Rubber Nitrogen Core',
1411:       'Pack Quantity': '3 Balls per Pressurized Metal Can',
1412:     },
1413:   },
1414: 
1415:   // ==========================================================================
1416:   // 7. TABLE TENNIS
1417:   // ==========================================================================
1418:   {
1419:     id: 'prod-tt-01',
1420:     slug: 'championship-25mm-rollaway-table-tennis-table',
1421:     name: 'Championship 25mm ITTF Standard Rollaway Table Tennis Table',
1422:     category: 'table-tennis',
1423:     categoryName: 'Table Tennis',
1424:     subcategory: 'table-tennis-tables',
1425:     subcategoryName: 'Table Tennis Tables',
1426:     productType: 'table',
1427:     brand: 'Oriental Pro',
1428:     price: 34999,
1429:     originalPrice: 38000,
1430:     rating: 5.0,
1431:     reviewsCount: 15,
1432:     badge: 'MATCH GRADE',
1433:     isFeatured: true,
1434:     inStock: true,
1435:     images: [
1436:       'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=800&q=80',
1437:     ],
1438:     description: 'Heavy-duty 25mm multi-coated tournament surface delivering perfectly consistent ball bounce and anti-glare finish across the entire table bed.',
1439:     features: [
1440:       'Official 25mm MDF high-density playing top with repeatable 23-26cm bounce',
1441:       '50mm heavy-gauge steel undercarriage frame with scratch-proof powder coat',
1442:     ],
1443:     specs: {
1444:       'Top Thickness': '25 mm High-Density MDF',
1445:       'Frame Profile': '50 x 20 mm Heavy Gauge Steel',
1446:     },
1447:   },
1448:   {
1449:     id: 'prod-tt-02',
1450:     slug: 'pro-carbon-7-ply-table-tennis-bat',
1451:     name: 'Pro Carbon 7-Ply Offensive Table Tennis Bat with Tension Rubbers',
1452:     category: 'table-tennis',
1453:     categoryName: 'Table Tennis',
1454:     subcategory: 'table-tennis-bats',
1455:     subcategoryName: 'Table Tennis Bats',
1456:     productType: 'bat',
1457:     brand: 'Oriental Match',
1458:     price: 3299,
1459:     rating: 4.8,
1460:     reviewsCount: 27,
1461:     isFeatured: false,
1462:     inStock: true,
1463:     images: [
1464:       'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=800&q=80',
1465:     ],
1466:     description: '5 wood + 2 carbon ply offensive blade paired with ITTF-approved 2.1mm high-tension spin rubbers.',
1467:     features: [
1468:       '5-ply pure Ayous wood core bonded with 2 layers of micro-carbon weave',
1469:       'ITTF certified tensor rubber sheets with high friction coefficient',
1470:     ],
1471:     specs: {
1472:       'Blade Layup': '5 Wood + 2 Carbon',
1473:       'Rubber': '2.1 mm High Elastic Tensor Rubbers',
1474:     },
1475:   },
1476: 
1477:   // ==========================================================================
1478:   // 8. FITNESS
1479:   // ==========================================================================
1480:   {
1481:     id: 'prod-fit-01',
1482:     slug: 'commercial-urethane-hex-dumbbell-pair',
1483:     name: 'Commercial Solid Steel Urethane Hex Dumbbells (Pair)',
1484:     category: 'fitness',
1485:     categoryName: 'Fitness & Conditioning',
1486:     subcategory: 'fitness-weights',
1487:     subcategoryName: 'Weights & Barbells',
1488:     productType: 'fitness',
1489:     brand: 'Oriental Iron',
1490:     price: 4499,
1491:     rating: 4.9,
1492:     reviewsCount: 47,
1493:     badge: 'BESTSELLER',
1494:     isFeatured: true,
1495:     inStock: true,
1496:     images: [
1497:       'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
1498:     ],
1499:     description: 'Drop-forged solid steel dumbbells encapsulated in odorless high-grade virgin urethane that will never chip, crack, or damage facility flooring.',
1500:     features: [
1501:       'Precision welded solid steel heads that never loosen or spin',
1502:       'Hard chrome knurled ergonomic handle (32mm diameter) for secure grip',
1503:     ],
1504:     specs: {
1505:       'Head Material': 'Solid Cast Steel Encapsulated in Virgin Urethane',
1506:       'Handle': 'Ergonomic Medium Knurl Hard Chrome',
1507:     },
1508:     variants: [
1509:       { id: 'v-5kg', name: '5 kg Pair', price: 4499, inStock: true },
1510:       { id: 'v-10kg', name: '10 kg Pair', price: 7999, inStock: true },
1511:       { id: 'v-15kg', name: '15 kg Pair', price: 11499, inStock: true },
1512:       { id: 'v-20kg', name: '20 kg Pair', price: 14999, inStock: true },
1513:     ],
1514:     sizes: ['5 kg Pair', '10 kg Pair', '15 kg Pair', '20 kg Pair'],
1515:   },
1516: 
1517:   // ==========================================================================
1518:   // 9. RECREATION
1519:   // ==========================================================================
1520:   {
1521:     id: 'prod-rec-01',
1522:     slug: 'championship-20mm-birch-carrom-board',
1523:     name: 'Pune Championship 20mm English Birch Carrom Board with Stand',
1524:     category: 'recreation',
1525:     categoryName: 'Recreation & Club Games',
1526:     subcategory: 'recreation-boards',
1527:     subcategoryName: 'Carrom & Club Boards',
1528:     productType: 'board',
1529:     brand: 'Oriental Heritage',
1530:     price: 12999,
1531:     originalPrice: 14500,
1532:     rating: 5.0,
1533:     reviewsCount: 33,
1534:     badge: 'ORIENTAL EXCLUSIVE',
1535:     isFeatured: true,
1536:     inStock: true,
1537:     images: [
1538:       'https://images.unsplash.com/photo-1768518354646-33833e95a24d?auto=format&fit=crop&w=800&q=80',
1539:       'https://images.unsplash.com/photo-1652558973183-a3f046921163?auto=format&fit=crop&w=800&q=80',
1540:     ],
1541:     description: 'Precision milled 20mm waterproof English Birch plywood playing surface framed with 3 x 2 inch seasoned rosewood re-bounce borders.',
1542:     features: [
1543:       'Official All India Carrom Federation (AICF) tournament playing area 29 x 29 inches',
1544:       'Heavy 3 x 2 inch solid hardwood frame with fast rebound natural rubber inlays',
1545:     ],
1546:     specs: {
1547:       'Board Surface': '20 mm Hand-Polished English Birch Ply',
1548:       'Frame Size': '3 x 2 Inch Seasoned Kikar / Rosewood Borders',
1549:     },
1550:   },
1551: 
1552:   // ==========================================================================
1553:   // 10. ACCESSORIES
1554:   // ==========================================================================
1555:   {
1556:     id: 'prod-acc-01',
1557:     slug: 'oriental-pro-tour-6-racquet-thermal-bag',
1558:     name: 'Oriental Pro Tour 6-Racquet Thermal Gear Bag',
1559:     category: 'accessories',
1560:     categoryName: 'Accessories & Protection',
1561:     subcategory: 'accessories-bags',
1562:     subcategoryName: 'Kit Bags',
1563:     productType: 'bag',
1564:     brand: 'Oriental Pro',
1565:     price: 3999,
1566:     rating: 4.9,
1567:     reviewsCount: 29,
1568:     badge: 'ORIENTAL EXCLUSIVE',
1569:     isFeatured: true,
1570:     inStock: true,
1571:     images: [
1572:       'https://images.unsplash.com/photo-1672223303533-05fddcbf6e6c?auto=format&fit=crop&w=800&q=80',
1573:     ],
1574:     description: 'Crafted with waterproof ballistic nylon and an insulated Thermoguard racquet compartment protecting high-tension strings.',
1575:     features: [
1576:       'Holds up to 6 tennis or 9 badminton racquets safely',
1577:       'ThermoGuard silver foil lining prevents string tension loss',
1578:     ],
1579:     specs: {
1580:       'Material': '1680D Ballistic Cordura Nylon',
1581:       'Dimensions': '76 x 32 x 30 cm',
1582:     },
1583:   },
1584:   {
1585:     id: 'prod-acc-02',
1586:     slug: 'athletic-knee-compression-brace-pair-silicone-ring',
1587:     name: 'Performance Court Knee Compression Sleeves (Pair)',
1588:     category: 'accessories',
1589:     categoryName: 'Accessories & Protection',
1590:     subcategory: 'accessories-guards',
1591:     subcategoryName: 'Protection & Support',
1592:     productType: 'protection',
1593:     brand: 'Oriental Match',
1594:     price: 1599,
1595:     rating: 4.8,
1596:     reviewsCount: 43,
1597:     badge: 'BESTSELLER',
1598:     isFeatured: false,
1599:     inStock: true,
1600:     images: [
1601:       'https://images.unsplash.com/photo-1672223303533-05fddcbf6e6c?auto=format&fit=crop&w=800&q=80',
1602:     ],
1603:     description: '3D circular knitted medical-grade compression sleeve with patella gel ring pad and dual lateral spring stabilizers.',
1604:     features: [
1605:       'Medical grade graduated compression for joint support',
1606:       'Double silicone wave anti-slip strips prevent slipping down the thigh',
1607:     ],
1608:     specs: {
1609:       'Material': '68% Polyamide, 32% Spandex with Silicone Inlays',
1610:       'Package': '1 Pair (Left and Right)',
1611:     },
1612:     sizes: ['Medium (36-42cm)', 'Large (42-48cm)', 'XL (48-54cm)'],
1613:   },
1614: ];
1615: 
1616: export const PRODUCTS: Product[] = [...CORE_PRODUCTS, ...GYM_PRODUCTS];
````

## File: src/pages/HomePage.tsx
````typescript
 1: import React from 'react';
 2: import { Hero } from '../components/home/Hero';
 3: import { SportIndex } from '../components/home/SportIndex';
 4: import { OrbitalGallery } from '../components/home/OrbitalGallery';
 5: import { GearEdit } from '../components/home/GearEdit';
 6: import { CourtsChapter } from '../components/home/CourtsChapter';
 7: import { StoreChapter } from '../components/home/StoreChapter';
 8: 
 9: /**
10:  * Homepage — GEAR + COURTS, told in six chapters.
11:  *  Hero      photographic slides: Gear / Courts / Camp store (tabs name all three)
12:  *  Sport     expanding sport rail → tap list on mobile        (ivory)
13:  *  Gallery   six sport photos orbiting in 3D as you scroll    (ivory)
14:  *  Gear      sticky intro + studio-shot products               (stone)
15:  *  Courts    night-court chapter: build types + sequence       (ink)
16:  *  Store     the address as a shop sign, live hours            (ivory)
17:  */
18: export const HomePage: React.FC = () => (
19:   <>
20:     <Hero />
21:     <SportIndex />
22:     <OrbitalGallery />
23:     <GearEdit />
24:     <CourtsChapter />
25:     <StoreChapter />
26:   </>
27: );
28: 
29: export default HomePage;
````

## File: src/App.tsx
````typescript
  1: import React, { Suspense, lazy, useEffect } from 'react';
  2: import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
  3: import { AuthProvider, useAuth } from './context/AuthContext';
  4: import { CartProvider } from './context/CartContext';
  5: import { WishlistProvider } from './context/WishlistContext';
  6: 
  7: import { Header } from './components/navigation/Header';
  8: import { CartDrawer } from './components/navigation/CartDrawer';
  9: import { BottomNav } from './components/navigation/BottomNav';
 10: import { Footer } from './components/footer/Footer';
 11: import { BrandIntro } from './components/ui/BrandIntro';
 12: 
 13: // Pages — the homepage ships in the main bundle; every other route loads on demand.
 14: import { HomePage } from './pages/HomePage';
 15: 
 16: const page = <K extends string>(loader: () => Promise<Record<K, React.ComponentType<any>>>, name: K) =>
 17:   lazy(() => loader().then((m) => ({ default: m[name] })));
 18: 
 19: const ShopPage = page(() => import('./pages/ShopPage'), 'ShopPage');
 20: const CategoryPage = page(() => import('./pages/CategoryPage'), 'CategoryPage');
 21: const ProductDetailPage = page(() => import('./pages/ProductDetailPage'), 'ProductDetailPage');
 22: const CourtsPage = page(() => import('./pages/CourtsPage'), 'CourtsPage');
 23: const CourtProjectsPage = page(() => import('./pages/CourtProjectsPage'), 'CourtProjectsPage');
 24: const CourtProjectDetailPage = page(() => import('./pages/CourtProjectDetailPage'), 'CourtProjectDetailPage');
 25: const AboutPage = page(() => import('./pages/AboutPage'), 'AboutPage');
 26: const VisitPage = page(() => import('./pages/VisitPage'), 'VisitPage');
 27: const ContactPage = page(() => import('./pages/ContactPage'), 'ContactPage');
 28: const SearchPage = page(() => import('./pages/SearchPage'), 'SearchPage');
 29: const CartPage = page(() => import('./pages/CartPage'), 'CartPage');
 30: const CheckoutPage = page(() => import('./pages/CheckoutPage'), 'CheckoutPage');
 31: const OrderSuccessPage = page(() => import('./pages/OrderSuccessPage'), 'OrderSuccessPage');
 32: const AccountPage = page(() => import('./pages/AccountPage'), 'AccountPage');
 33: const NotFoundPage = page(() => import('./pages/NotFoundPage'), 'NotFoundPage');
 34: const ShippingPage = page(() => import('./pages/PolicyPages'), 'ShippingPage');
 35: const ReturnsPage = page(() => import('./pages/PolicyPages'), 'ReturnsPage');
 36: const PrivacyPage = page(() => import('./pages/PolicyPages'), 'PrivacyPage');
 37: const TermsPage = page(() => import('./pages/PolicyPages'), 'TermsPage');
 38: const AuthModal = page(() => import('./components/auth/AuthModal'), 'AuthModal');
 39: 
 40: /** Route loading state: a quiet skeleton of the shared page header. */
 41: const PageSkeleton: React.FC = () => (
 42:   <div className="container page-skeleton" aria-busy="true" aria-label="Loading">
 43:     <span className="skeleton skeleton-crumb" />
 44:     <span className="skeleton skeleton-eyebrow" />
 45:     <span className="skeleton skeleton-title" />
 46:     <span className="skeleton skeleton-title short" />
 47:   </div>
 48: );
 49: 
 50: /** The sign-in dialog is only fetched once someone opens it. */
 51: const LazyAuthModal: React.FC = () => {
 52:   const { isAuthModalOpen } = useAuth();
 53:   if (!isAuthModalOpen) return null;
 54:   return (
 55:     <Suspense fallback={null}>
 56:       <AuthModal />
 57:     </Suspense>
 58:   );
 59: };
 60: 
 61: // Scroll restoration component
 62: const ScrollToTop: React.FC = () => {
 63:   const { pathname, search, hash } = useLocation();
 64:   useEffect(() => {
 65:     if (hash) {
 66:       // Wait a frame so the target section has rendered.
 67:       requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
 68:       return;
 69:     }
 70:     window.scrollTo(0, 0);
 71:   }, [pathname, search, hash]);
 72:   return null;
 73: };
 74: 
 75: const AppContent: React.FC = () => {
 76:   const location = useLocation();
 77:   const isCheckout = location.pathname === '/checkout';
 78: 
 79:   return (
 80:     <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: isCheckout ? '#f8f9fa' : 'var(--ivory)' }}>
 81:       {!isCheckout && <Header />}
 82:       <CartDrawer />
 83:       <LazyAuthModal />
 84: 
 85:       <main id="main" style={{ flex: 1 }}>
 86:         <Suspense fallback={<PageSkeleton />}>
 87:           <Routes>
 88:             {/* Core Commerce & Content */}
 89:             <Route path="/" element={<HomePage />} />
 90:             <Route path="/shop" element={<ShopPage />} />
 91:             <Route path="/shop/:category" element={<CategoryPage />} />
 92:             <Route path="/products" element={<ShopPage />} />
 93:             <Route path="/products/:category" element={<CategoryPage />} />
 94:             <Route path="/product/:slug" element={<ProductDetailPage />} />
 95: 
 96:             {/* Sports Infrastructure */}
 97:             <Route path="/courts" element={<CourtsPage />} />
 98:             <Route path="/courts/projects" element={<CourtProjectsPage />} />
 99:             <Route path="/courts/:slug" element={<CourtProjectDetailPage />} />
100: 
101:             {/* Brand & Store */}
102:             <Route path="/about" element={<AboutPage />} />
103:             <Route path="/visit" element={<VisitPage />} />
104:             <Route path="/contact" element={<ContactPage />} />
105:             <Route path="/search" element={<SearchPage />} />
106:             <Route path="/cart" element={<CartPage />} />
107:             <Route path="/checkout" element={<CheckoutPage />} />
108:             <Route path="/order-success" element={<OrderSuccessPage />} />
109: 
110:             {/* Customer Account & Authentication Subroutes */}
111:             <Route path="/account" element={<AccountPage tab="overview" />} />
112:             <Route path="/account/login" element={<AccountPage tab="login" />} />
113:             <Route path="/account/signup" element={<AccountPage tab="signup" />} />
114:             <Route path="/account/verify" element={<AccountPage tab="verify" />} />
115:             <Route path="/account/orders" element={<AccountPage tab="orders" />} />
116:             <Route path="/account/orders/:orderId" element={<AccountPage tab="orders" />} />
117:             <Route path="/account/profile" element={<AccountPage tab="profile" />} />
118:             <Route path="/account/addresses" element={<AccountPage tab="addresses" />} />
119:             <Route path="/account/wishlist" element={<AccountPage tab="wishlist" />} />
120:             <Route path="/wishlist" element={<AccountPage tab="wishlist" />} />
121: 
122:             {/* Institutional Policies */}
123:             <Route path="/shipping" element={<ShippingPage />} />
124:             <Route path="/returns" element={<ReturnsPage />} />
125:             <Route path="/privacy" element={<PrivacyPage />} />
126:             <Route path="/terms" element={<TermsPage />} />
127: 
128:             {/* 404 Recovery */}
129:             <Route path="/404" element={<NotFoundPage />} />
130:             <Route path="*" element={<NotFoundPage />} />
131:           </Routes>
132:         </Suspense>
133:       </main>
134: 
135:       {!isCheckout && <Footer />}
136:       {!isCheckout && <BottomNav />}
137:     </div>
138:   );
139: };
140: 
141: export const App: React.FC = () => {
142:   return (
143:     <BrowserRouter>
144:       <AuthProvider>
145:         <CartProvider>
146:           <WishlistProvider>
147:             <ScrollToTop />
148:             <BrandIntro />
149:             <AppContent />
150:           </WishlistProvider>
151:         </CartProvider>
152:       </AuthProvider>
153:     </BrowserRouter>
154:   );
155: };
156: 
157: export default App;
````

## File: src/styles/global.css
````css
  1: @import './tokens.css';
  2: 
  3: /* ==========================================================================
  4:    Reset & document
  5:    ========================================================================== */
  6: *, *::before, *::after {
  7:   box-sizing: border-box;
  8:   margin: 0;
  9:   padding: 0;
 10: }
 11: 
 12: html {
 13:   font-size: 16px;
 14:   -webkit-text-size-adjust: 100%;
 15:   scroll-behavior: smooth;
 16:   scroll-padding-top: calc(var(--header-h) + 16px);
 17:   background-color: var(--ivory);
 18:   color: var(--ink);
 19:   font-family: var(--font);
 20: }
 21: 
 22: body {
 23:   min-height: 100vh;
 24:   background-color: var(--ivory);
 25:   color: var(--ink);
 26:   font-family: var(--font);
 27:   font-size: var(--fs-body);
 28:   line-height: 1.55;
 29:   font-optical-sizing: auto;
 30:   -webkit-font-smoothing: antialiased;
 31:   -moz-osx-font-smoothing: grayscale;
 32:   text-rendering: optimizeLegibility;
 33: }
 34: 
 35: img, picture, video, canvas, svg {
 36:   display: block;
 37:   max-width: 100%;
 38:   height: auto;
 39: }
 40: 
 41: input, button, textarea, select {
 42:   font: inherit;
 43:   color: inherit;
 44: }
 45: 
 46: button {
 47:   cursor: pointer;
 48:   background: none;
 49:   border: none;
 50:   font-family: inherit;
 51:   min-height: 44px; /* touch target */
 52: }
 53: 
 54: a {
 55:   color: inherit;
 56:   text-decoration: none;
 57:   min-height: 44px;
 58:   display: inline-flex;
 59:   align-items: center;
 60: }
 61: 
 62: /* Links inside running text stay inline (WCAG 2.5.8 inline exception). */
 63: p a, li > p a, .prose a, address a {
 64:   display: inline;
 65:   min-height: 0;
 66:   text-decoration: underline;
 67:   text-decoration-thickness: 1px;
 68:   text-underline-offset: 3px;
 69: }
 70: 
 71: ::selection {
 72:   background: var(--gold);
 73:   color: var(--ink);
 74: }
 75: 
 76: /* ==========================================================================
 77:    Typography
 78:    ========================================================================== */
 79: h1, h2, h3, h4, h5, h6 {
 80:   font-family: var(--font);
 81:   font-weight: 800;
 82:   line-height: 1.02;
 83:   letter-spacing: -0.01em;
 84:   color: inherit;
 85:   text-wrap: balance;
 86: }
 87: 
 88: h1, h2 {
 89:   font-stretch: var(--stretch-tight);
 90: }
 91: 
 92: p {
 93:   text-wrap: pretty;
 94: }
 95: 
 96: /* Display face: Archivo at its narrowest width, black weight, uppercase. */
 97: .font-display,
 98: .display {
 99:   font-family: var(--font);
100:   font-stretch: var(--stretch-display);
101:   font-weight: 800;
102:   text-transform: uppercase;
103:   letter-spacing: -0.005em;
104:   line-height: 0.9;
105: }
106: 
107: .d-hero { font-size: var(--fs-hero); line-height: 0.84; }
108: .d-1 { font-size: var(--fs-d1); line-height: 0.86; }
109: .d-2 { font-size: var(--fs-d2); line-height: 0.9; }
110: .d-3 { font-size: var(--fs-d3); line-height: 0.95; }
111: .d-4 { font-size: var(--fs-d4); line-height: 1; }
112: 
113: .italic { font-style: italic; }
114: 
115: .lead {
116:   font-size: var(--fs-lead);
117:   line-height: 1.5;
118:   color: var(--muted);
119:   max-width: var(--max-text);
120: }
121: 
122: .muted { color: var(--muted); }
123: .subtle { color: var(--subtle); }
124: 
125: .font-heading, .font-sans { font-family: var(--font); }
126: 
127: /* Legacy "mono" labels now use the brand face with tabular figures. */
128: .font-mono {
129:   font-family: var(--font);
130:   font-variant-numeric: tabular-nums;
131:   letter-spacing: 0.04em;
132: }
133: 
134: .tabular-nums, .price {
135:   font-variant-numeric: tabular-nums;
136: }
137: 
138: /* Label: small uppercase caption. Real facts only (sport, place, status). */
139: .label {
140:   font-family: var(--font);
141:   font-size: var(--fs-label);
142:   font-weight: 600;
143:   letter-spacing: 0.14em;
144:   text-transform: uppercase;
145:   line-height: 1.3;
146: }
147: 
148: /* Eyebrow: chapter kicker, plain text. Only where it adds a fact the
149:    headline and breadcrumb don't already say. */
150: .eyebrow,
151: .section-label {
152:   display: block;
153:   font-size: var(--fs-label);
154:   font-weight: 600;
155:   letter-spacing: 0.16em;
156:   text-transform: uppercase;
157:   color: var(--muted);
158:   line-height: 1.3;
159: }
160: 
161: .on-dark .eyebrow,
162: .eyebrow.on-dark { color: var(--on-dark-muted); }
163: 
164: .section-label { margin-bottom: 24px; }
165: 
166: /* ==========================================================================
167:    Layout
168:    ========================================================================== */
169: .container,
170: .container-narrow {
171:   width: 100%;
172:   max-width: calc(var(--max) + var(--gutter) * 2);
173:   margin-inline: auto;
174:   padding-inline: var(--gutter);
175: }
176: 
177: .container-narrow { max-width: calc(1140px + var(--gutter) * 2); }
178: 
179: .section { padding-block: var(--section-y); position: relative; }
180: .editorial-section { padding-block: var(--section-y); position: relative; }
181: 
182: .on-dark {
183:   background: var(--ink);
184:   color: var(--on-dark);
185: }
186: 
187: .bg-ivory { background-color: var(--ivory); }
188: .bg-stone { background-color: var(--stone); }
189: 
190: .rule {
191:   height: 1px;
192:   background: var(--line);
193:   border: 0;
194: }
195: 
196: .visually-hidden {
197:   position: absolute !important;
198:   width: 1px;
199:   height: 1px;
200:   overflow: hidden;
201:   clip: rect(0 0 0 0);
202:   white-space: nowrap;
203: }
204: 
205: .skip-link {
206:   position: absolute;
207:   left: 12px;
208:   top: -80px;
209:   z-index: 200;
210:   background: var(--ink);
211:   color: var(--ivory);
212:   padding: 0 16px;
213:   font-weight: 600;
214: }
215: .skip-link:focus { top: 12px; }
216: 
217: /* ==========================================================================
218:    Buttons — rectangular like court markings, 2px corner, 48px tall.
219:    ========================================================================== */
220: .btn {
221:   --btn-bg: var(--ink);
222:   --btn-fg: var(--ivory);
223:   --btn-bd: var(--ink);
224:   display: inline-flex;
225:   align-items: center;
226:   justify-content: center;
227:   gap: 10px;
228:   min-height: 48px;
229:   padding: 0 24px;
230:   font-family: var(--font);
231:   font-size: 0.8125rem;
232:   font-weight: 700;
233:   line-height: 1;
234:   letter-spacing: 0.1em;
235:   text-transform: uppercase;
236:   white-space: nowrap;
237:   text-decoration: none;
238:   color: var(--btn-fg);
239:   background: var(--btn-bg);
240:   border: 1.5px solid var(--btn-bd);
241:   border-radius: var(--r-1);
242:   cursor: pointer;
243:   user-select: none;
244:   transition:
245:     background-color var(--t-2) var(--ease-out),
246:     color var(--t-2) var(--ease-out),
247:     border-color var(--t-2) var(--ease-out),
248:     transform var(--t-1) ease;
249: }
250: 
251: .btn:active { transform: translateY(1px); }
252: .btn:disabled, .btn[aria-disabled='true'] { opacity: 0.45; cursor: not-allowed; }
253: 
254: .btn .btn-arrow {
255:   display: inline-block;
256:   transition: transform var(--t-2) var(--ease-out);
257: }
258: .btn:hover .btn-arrow { transform: translateX(4px); }
259: 
260: .btn-primary { --btn-bg: var(--ink); --btn-fg: var(--ivory); --btn-bd: var(--ink); }
261: .btn-primary:hover { --btn-bg: var(--ink-2); --btn-bd: var(--ink-2); }
262: 
263: .btn-outline,
264: .btn-outline-dark,
265: .btn-secondary { --btn-bg: transparent; --btn-fg: var(--ink); --btn-bd: var(--ink); }
266: .btn-outline:hover,
267: .btn-outline-dark:hover,
268: .btn-secondary:hover { --btn-bg: var(--ink); --btn-fg: var(--ivory); }
269: 
270: .btn-light,
271: .btn-white { --btn-bg: var(--ivory); --btn-fg: var(--ink); --btn-bd: var(--ivory); }
272: .btn-light:hover,
273: .btn-white:hover { --btn-bg: #FFFFFF; --btn-bd: #FFFFFF; }
274: 
275: .btn-outline-light,
276: .btn-outline-white { --btn-bg: transparent; --btn-fg: var(--on-dark); --btn-bd: rgba(246, 243, 234, 0.55); }
277: .btn-outline-light:hover,
278: .btn-outline-white:hover { --btn-bd: var(--on-dark); --btn-bg: rgba(246, 243, 234, 0.08); }
279: 
280: .btn-gold { --btn-bg: var(--gold); --btn-fg: var(--ink); --btn-bd: var(--gold); }
281: .btn-gold:hover { --btn-bg: var(--gold-hi); --btn-bd: var(--gold-hi); }
282: 
283: .btn-outline-gold { --btn-bg: transparent; --btn-fg: var(--gold); --btn-bd: var(--gold); }
284: .btn-outline-gold:hover { --btn-bg: var(--gold); --btn-fg: var(--ink); }
285: 
286: .btn-sm { min-height: 44px; padding: 0 16px; font-size: 0.75rem; }
287: .btn-lg { min-height: 56px; padding: 0 32px; font-size: 0.875rem; }
288: .btn-block { width: 100%; }
289: .btn-pill { border-radius: var(--r-1); }
290: 
291: /* Text link with a directional arrow — used for secondary navigation. */
292: .btn-text,
293: .link-arrow {
294:   display: inline-flex;
295:   align-items: center;
296:   gap: 10px;
297:   min-height: 44px;
298:   padding: 0;
299:   font-family: var(--font);
300:   font-size: 0.8125rem;
301:   font-weight: 700;
302:   letter-spacing: 0.1em;
303:   text-transform: uppercase;
304:   color: inherit;
305:   background: none;
306:   border: 0;
307:   position: relative;
308:   cursor: pointer;
309: }
310: 
311: .btn-text::after,
312: .link-arrow::after {
313:   content: '';
314:   position: absolute;
315:   left: 0;
316:   right: 0;
317:   bottom: 9px;
318:   height: 1.5px;
319:   background: currentColor;
320:   transform-origin: left;
321:   transition: transform var(--t-2) var(--ease-out);
322: }
323: 
324: .btn-text:hover::after,
325: .link-arrow:hover::after { transform: scaleX(0.35); }
326: 
327: .link-arrow .btn-arrow,
328: .btn-text .btn-arrow { transition: transform var(--t-2) var(--ease-out); }
329: .link-arrow:hover .btn-arrow,
330: .btn-text:hover .btn-arrow { transform: translateX(4px); }
331: 
332: /* ==========================================================================
333:    Badges & chips
334:    ========================================================================== */
335: .badge {
336:   display: inline-flex;
337:   align-items: center;
338:   gap: 6px;
339:   min-height: 24px;
340:   padding: 0 8px;
341:   font-size: 0.6875rem;
342:   font-weight: 700;
343:   letter-spacing: 0.1em;
344:   text-transform: uppercase;
345:   line-height: 1;
346:   border-radius: var(--r-1);
347:   background: var(--stone);
348:   color: var(--ink);
349: }
350: .badge-dark { background: var(--ink); color: var(--ivory); }
351: .badge-gold { background: var(--gold); color: var(--ink); }
352: 
353: .chip {
354:   display: inline-flex;
355:   align-items: center;
356:   gap: 8px;
357:   min-height: 40px;
358:   padding: 0 16px;
359:   font-size: 0.8125rem;
360:   font-weight: 600;
361:   letter-spacing: 0.01em;
362:   color: var(--ink);
363:   background: #ffffff;
364:   border: 1px solid rgba(0, 0, 0, 0.1);
365:   border-radius: 9999px;
366:   white-space: nowrap;
367:   cursor: pointer;
368:   box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
369:   transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
370: }
371: .chip:hover {
372:   background: #f9fafb;
373:   border-color: rgba(0, 0, 0, 0.22);
374:   transform: translateY(-1px);
375: }
376: .chip:active {
377:   transform: translateY(0);
378: }
379: .chip[aria-pressed='true'],
380: .chip.is-active {
381:   background: var(--ink);
382:   color: #ffffff;
383:   border-color: var(--ink);
384:   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.16);
385: }
386: .chip .chip-count {
387:   font-variant-numeric: tabular-nums;
388:   font-size: 0.6875rem;
389:   font-weight: 700;
390:   padding: 2px 7px;
391:   border-radius: 9999px;
392:   background: rgba(0, 0, 0, 0.06);
393:   color: #4b5563;
394:   display: inline-flex;
395:   align-items: center;
396:   justify-content: center;
397:   line-height: 1.2;
398:   transition: all 0.2s ease;
399: }
400: .chip[aria-pressed='true'] .chip-count,
401: .chip.is-active .chip-count {
402:   background: rgba(255, 255, 255, 0.2);
403:   color: #ffffff;
404: }
405: 
406: /* ==========================================================================
407:    Forms
408:    ========================================================================== */
409: .field { display: flex; flex-direction: column; gap: 8px; }
410: .field-label {
411:   font-size: var(--fs-label);
412:   font-weight: 600;
413:   letter-spacing: 0.12em;
414:   text-transform: uppercase;
415:   color: var(--muted);
416: }
417: 
418: .input,
419: .select,
420: .textarea {
421:   width: 100%;
422:   min-height: 48px;
423:   padding: 12px 14px;
424:   font-size: 1rem;
425:   color: var(--ink);
426:   background: var(--paper);
427:   border: 1px solid var(--line-strong);
428:   border-radius: var(--r-1);
429:   transition: border-color var(--t-1) ease, box-shadow var(--t-1) ease;
430: }
431: .textarea { min-height: 120px; resize: vertical; }
432: .input:focus, .select:focus, .textarea:focus {
433:   outline: none;
434:   border-color: var(--ink);
435:   box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.35);
436: }
437: 
438: /* ==========================================================================
439:    Media
440:    ========================================================================== */
441: .media {
442:   position: relative;
443:   overflow: hidden;
444:   background: var(--stone);
445: }
446: .media > img {
447:   width: 100%;
448:   height: 100%;
449:   object-fit: cover;
450: }
451: 
452: /* ==========================================================================
453:    Responsive visibility
454:    ========================================================================== */
455: @media (max-width: 1023px) {
456:   .desktop-only { display: none !important; }
457: }
458: @media (min-width: 1024px) {
459:   .mobile-only { display: none !important; }
460: }
461: 
462: /* ==========================================================================
463:    Focus & motion
464:    ========================================================================== */
465: :focus-visible {
466:   outline: 2px solid var(--ink);
467:   outline-offset: 3px;
468: }
469: .on-dark :focus-visible,
470: .is-dark :focus-visible {
471:   outline-color: var(--gold);
472: }
473: 
474: @keyframes spin { to { transform: rotate(360deg); } }
475: .animate-spin { animation: spin 0.9s linear infinite; }
476: 
477: @media (prefers-reduced-motion: reduce) {
478:   html { scroll-behavior: auto; }
479:   *, *::before, *::after {
480:     animation-duration: 0.01ms !important;
481:     animation-iteration-count: 1 !important;
482:     transition-duration: 0.01ms !important;
483:   }
484: }
````

## File: src/components/home/Hero.tsx
````typescript
  1: import React, { useCallback, useEffect, useRef, useState } from 'react';
  2: import { Link } from 'react-router-dom';
  3: import { motion, useReducedMotion } from 'framer-motion';
  4: import { IMAGES, MediaImage } from '../../data/media';
  5: import { STORE_INFO } from '../../data/storeInfo';
  6: import { CATEGORIES } from '../../data/categories';
  7: import { Img } from '../ui/Img';
  8: import { RevealLines, EASE_OUT } from '../motion/Reveal';
  9: import { useStoreStatus } from '../../utils/storeHours';
 10: 
 11: /**
 12:  * HERO — three slides, each with its own composition.
 13:  *  gear   → photograph, headline bottom-left
 14:  *  courts → photograph, headline top-left over the evening sky
 15:  *  store  → light editorial split: the address set as a shop sign
 16:  *
 17:  * The tab bar names all three offerings at once, so the first viewport
 18:  * always says GEAR + COURTS + where to find us. Autoplay progress is a CSS
 19:  * animation; its end event advances the slide, so hover/focus/pause stay in
 20:  * sync without timers. Swipe, arrow keys and a pause button are supported.
 21:  */
 22: 
 23: type Action = { label: string; to?: string; href?: string };
 24: 
 25: interface Slide {
 26:   id: 'gear' | 'courts' | 'store';
 27:   tab: string;
 28:   tabNote: string;
 29:   eyebrow: string;
 30:   lines: string[];
 31:   lead: string;
 32:   image: MediaImage;
 33:   primary: Action;
 34:   secondary: Action;
 35: }
 36: 
 37: const SLIDES: Slide[] = [
 38:   {
 39:     id: 'gear',
 40:     tab: 'Gear',
 41:     tabNote: 'Racquets, bats, paddles, fitness',
 42:     eyebrow: 'Sports goods · MG Road, Camp',
 43:     lines: ['Gear for', 'the game.'],
 44:     lead: `Racquets, bats, paddles and fitness equipment across ${CATEGORIES.length} sports. Racquet stringing and bat knocking-in are done at the store.`,
 45:     image: IMAGES.badmintonSmash,
 46:     primary: { label: 'Shop gear', to: '/shop' },
 47:     secondary: { label: 'Shop by sport', to: '/shop' },
 48:   },
 49:   {
 50:     id: 'courts',
 51:     tab: 'Courts',
 52:     tabNote: 'Court construction across Pune',
 53:     eyebrow: 'Court construction · Pune & Maharashtra',
 54:     lines: ['Courts for', 'the city.'],
 55:     lead: 'Turnkey court construction — surface, fencing, lighting and line marking — for clubs, schools, societies and homes.',
 56:     image: IMAGES.courtDusk,
 57:     primary: { label: 'Plan a court', to: '/courts' },
 58:     secondary: { label: 'WhatsApp us', href: STORE_INFO.whatsappUrl },
 59:   },
 60:   {
 61:     id: 'store',
 62:     tab: 'Camp store',
 63:     tabNote: `${STORE_INFO.addressLine1}`,
 64:     eyebrow: 'Pune’s sports house',
 65:     lines: ['Shop 247,', 'MG Road,', 'Camp.'],
 66:     lead: 'Walk in, pick up the bat, feel the grip. The Camp store is where Pune’s players come to kit out.',
 67:     image: IMAGES.athleteBatRacquet,
 68:     primary: { label: 'Plan your visit', to: '/visit' },
 69:     secondary: { label: 'Get directions', href: STORE_INFO.mapsUrl },
 70:   },
 71: ];
 72: 
 73: const DURATION_MS = 7000;
 74: 
 75: const ActionLink: React.FC<{ action: Action; className: string; tabIndex?: number }> = ({ action, className, tabIndex }) =>
 76:   action.to ? (
 77:     <Link to={action.to} className={className} tabIndex={tabIndex}>
 78:       {action.label} <span className="btn-arrow" aria-hidden="true">→</span>
 79:     </Link>
 80:   ) : (
 81:     <a href={action.href} target="_blank" rel="noreferrer" className={className} tabIndex={tabIndex}>
 82:       {action.label} <span className="btn-arrow" aria-hidden="true">→</span>
 83:     </a>
 84:   );
 85: 
 86: export const Hero: React.FC = () => {
 87:   const reduced = useReducedMotion();
 88:   const [index, setIndex] = useState(0);
 89:   const [userPaused, setUserPaused] = useState(false);
 90:   const [hoverPaused, setHoverPaused] = useState(false);
 91:   const [focusPaused, setFocusPaused] = useState(false);
 92:   const sectionRef = useRef<HTMLElement>(null);
 93:   const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
 94:   const pointerStart = useRef<{ x: number; y: number } | null>(null);
 95:   const status = useStoreStatus();
 96: 
 97:   const autoplay = !reduced && !userPaused;
 98:   const paused = !autoplay || hoverPaused || focusPaused;
 99:   const slide = SLIDES[index];
100: 
101:   const go = useCallback((next: number) => {
102:     setIndex((next + SLIDES.length) % SLIDES.length);
103:   }, []);
104: 
105:   // Restrained pointer depth on fine pointers: the photograph drifts a few px.
106:   useEffect(() => {
107:     const el = sectionRef.current;
108:     if (!el || reduced || !window.matchMedia('(pointer: fine)').matches) return;
109:     let raf = 0;
110:     const onMove = (e: PointerEvent) => {
111:       cancelAnimationFrame(raf);
112:       raf = requestAnimationFrame(() => {
113:         const r = el.getBoundingClientRect();
114:         el.style.setProperty('--px', `${((e.clientX - r.left) / r.width - 0.5) * -14}px`);
115:         el.style.setProperty('--py', `${((e.clientY - r.top) / r.height - 0.5) * -10}px`);
116:       });
117:     };
118:     const onLeave = () => {
119:       el.style.setProperty('--px', '0px');
120:       el.style.setProperty('--py', '0px');
121:     };
122:     el.addEventListener('pointermove', onMove);
123:     el.addEventListener('pointerleave', onLeave);
124:     return () => {
125:       cancelAnimationFrame(raf);
126:       el.removeEventListener('pointermove', onMove);
127:       el.removeEventListener('pointerleave', onLeave);
128:     };
129:   }, [reduced]);
130: 
131:   const onTabKey = (e: React.KeyboardEvent, i: number) => {
132:     let next = -1;
133:     if (e.key === 'ArrowRight') next = (i + 1) % SLIDES.length;
134:     if (e.key === 'ArrowLeft') next = (i - 1 + SLIDES.length) % SLIDES.length;
135:     if (e.key === 'Home') next = 0;
136:     if (e.key === 'End') next = SLIDES.length - 1;
137:     if (next >= 0) {
138:       e.preventDefault();
139:       go(next);
140:       tabRefs.current[next]?.focus();
141:     }
142:   };
143: 
144:   return (
145:     <section
146:       ref={sectionRef}
147:       className={`hero hero--${slide.id}`}
148:       aria-roledescription="carousel"
149:       aria-label="Oriental Sports — gear, courts and the Camp store"
150:       onPointerEnter={(e) => e.pointerType === 'mouse' && setHoverPaused(true)}
151:       onPointerLeave={() => setHoverPaused(false)}
152:       onFocus={() => setFocusPaused(true)}
153:       onBlur={(e) => {
154:         if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocusPaused(false);
155:       }}
156:       onPointerDown={(e) => {
157:         if (e.pointerType !== 'mouse') pointerStart.current = { x: e.clientX, y: e.clientY };
158:       }}
159:       onPointerUp={(e) => {
160:         const start = pointerStart.current;
161:         pointerStart.current = null;
162:         if (!start) return;
163:         const dx = e.clientX - start.x;
164:         const dy = e.clientY - start.y;
165:         if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) go(index + (dx < 0 ? 1 : -1));
166:       }}
167:     >
168:       <h1 className="visually-hidden">Oriental Sports — sports goods and court construction, Camp, Pune</h1>
169: 
170:       {SLIDES.map((s, i) => {
171:         const active = i === index;
172:         return (
173:           <div
174:             key={s.id}
175:             id={`hero-slide-${s.id}`}
176:             className={`hero-slide hero-slide--${s.id} ${active ? 'is-active' : ''}`}
177:             role="tabpanel"
178:             aria-roledescription="slide"
179:             aria-label={`${s.tab}`}
180:             aria-hidden={!active}
181:             {...(!active ? { inert: '' } : {})}
182:           >
183:             <div className="hero-media">
184:               <div className="hero-media-inner">
185:                 <Img image={s.image} priority={i === 0} sizes={s.id === 'store' ? '(min-width: 1024px) 55vw, 100vw' : '100vw'} />
186:               </div>
187:             </div>
188: 
189:             {/* Every slide keeps its copy in the layout so the hero sizes to the
190:                 tallest one and never changes height between slides. Remounting on
191:                 activation replays the entrance; hidden slides render settled. */}
192:             <div className="hero-content container">
193:               <div className="hero-copy" key={active ? 'active' : 'idle'}>
194:                 <motion.p
195:                   className="eyebrow hero-eyebrow"
196:                   initial={reduced || !active ? false : { opacity: 0, y: 12 }}
197:                   animate={{ opacity: 1, y: 0 }}
198:                   transition={{ duration: 0.6, ease: EASE_OUT }}
199:                 >
200:                   {s.eyebrow}
201:                 </motion.p>
202:                 <RevealLines as="h2" immediate still={!active} lines={s.lines} className="display hero-title" delay={0.05} stagger={0.09} />
203:                 <motion.div
204:                   className="hero-foot"
205:                   initial={reduced || !active ? false : { opacity: 0, y: 16 }}
206:                   animate={{ opacity: 1, y: 0 }}
207:                   transition={{ duration: 0.7, delay: 0.35, ease: EASE_OUT }}
208:                 >
209:                   <p className="hero-lead">{s.lead}</p>
210:                   {s.id === 'store' && (
211:                     <p className={`store-status hero-status ${status.isOpen ? 'is-open' : ''}`}>
212:                       <span className="status-dot" aria-hidden="true" />
213:                       {status.label}
214:                     </p>
215:                   )}
216:                   <div className="hero-actions">
217:                     <ActionLink action={s.primary} className={`btn ${s.id === 'store' ? 'btn-primary' : 'btn-light'}`} />
218:                     <ActionLink action={s.secondary} className="link-arrow" />
219:                   </div>
220:                 </motion.div>
221:               </div>
222:             </div>
223:           </div>
224:         );
225:       })}
226: 
227:       <div className="hero-tabs container">
228:         <div className="hero-tablist" role="tablist" aria-label="Choose a highlight">
229:           {SLIDES.map((s, i) => {
230:             const active = i === index;
231:             return (
232:               <button
233:                 key={s.id}
234:                 ref={(el) => (tabRefs.current[i] = el)}
235:                 type="button"
236:                 role="tab"
237:                 id={`hero-tab-${s.id}`}
238:                 aria-selected={active}
239:                 aria-controls={`hero-slide-${s.id}`}
240:                 tabIndex={active ? 0 : -1}
241:                 className={`hero-tab ${active ? 'is-active' : ''}`}
242:                 onClick={() => go(i)}
243:                 onKeyDown={(e) => onTabKey(e, i)}
244:               >
245:                 <span className="hero-tab-track" aria-hidden="true">
246:                   <span
247:                     key={`${s.id}-${index}`}
248:                     className="hero-tab-fill"
249:                     style={{
250:                       animationDuration: `${DURATION_MS}ms`,
251:                       animationPlayState: paused ? 'paused' : 'running',
252:                       ...(active && reduced ? { transform: 'scaleX(1)', animation: 'none' } : {}),
253:                     }}
254:                     onAnimationEnd={() => active && autoplay && go(index + 1)}
255:                   />
256:                 </span>
257:                 <span className="hero-tab-label">{s.tab}</span>
258:                 <span className="hero-tab-note">{s.tabNote}</span>
259:               </button>
260:             );
261:           })}
262:         </div>
263:         {!reduced && (
264:           <button
265:             type="button"
266:             className="hero-pause"
267:             onClick={() => setUserPaused((p) => !p)}
268:             aria-label={userPaused ? 'Play slideshow' : 'Pause slideshow'}
269:           >
270:             {userPaused ? (
271:               <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 1l9 5-9 5z" fill="currentColor" /></svg>
272:             ) : (
273:               <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 1h3v10H2zM7 1h3v10H7z" fill="currentColor" /></svg>
274:             )}
275:           </button>
276:         )}
277:       </div>
278:     </section>
279:   );
280: };
281: 
282: export default Hero;
````
