/**
 * Generates dist/sitemap.xml from the real catalog (products, categories,
 * court projects) plus the site's static, indexable pages. Run after
 * `vite build` so dist/ exists — see package.json's build script.
 *
 * Account, cart, checkout, wishlist and auth pages are deliberately left
 * out: they are per-visitor or behind an action, never a page a search
 * result should land someone on.
 */
import fs from 'fs';
import os from 'os';
import path from 'path';
import ts from 'typescript';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const esbuild = require('esbuild');

// products.ts imports '../lib/supabase' (a real runtime client), so it needs
// a real bundler to resolve — the same approach scripts/sync-product-weights.mjs
// already uses successfully, not a plain syntax transpile.
const productsOut = path.join(os.tmpdir(), 'os-sitemap-products.cjs');
esbuild.buildSync({
  entryPoints: ['src/data/products.ts'], bundle: true, platform: 'node', format: 'cjs', outfile: productsOut,
  define: {
    'import.meta.env.VITE_SUPABASE_URL': '"https://tvfzfvurqewgvnnhhhad.supabase.co"',
    'import.meta.env.VITE_SUPABASE_ANON_KEY': '"sitemap"',
    'import.meta.env': '{}',
  },
  loader: { '.json': 'json', '.webp': 'dataurl', '.png': 'dataurl', '.jpg': 'dataurl', '.jpeg': 'dataurl', '.svg': 'dataurl', '.mp4': 'dataurl' },
  logLevel: 'error',
});
const { PRODUCTS } = require(productsOut);

// categories.ts / courts.ts have only type-only imports, so a plain
// transpile (no bundler needed) is enough.
const transpile = (tsPath) => {
  const code = fs.readFileSync(path.resolve(tsPath), 'utf-8');
  return ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } })
    .outputText.replace(/import\s+\{[^}]*\}\s+from\s+['"][^'"]*types['"];?/g, '');
};
const tmpFiles = ['temp-sitemap-categories.mjs', 'temp-sitemap-courts.mjs'];
fs.writeFileSync('scripts/temp-sitemap-categories.mjs', transpile('src/data/categories.ts'));
fs.writeFileSync('scripts/temp-sitemap-courts.mjs', transpile('src/data/courts.ts'));

const { CATEGORIES } = await import('./temp-sitemap-categories.mjs');
const { COURT_PROJECTS } = await import('./temp-sitemap-courts.mjs');

for (const f of tmpFiles) {
  const p = path.join('scripts', f);
  if (fs.existsSync(p)) fs.unlinkSync(p);
}

// PRODUCTS is the static 131 baked into the bundle at build time. Products
// created directly in admin exist only in Supabase, so fetch those too —
// otherwise the sitemap would silently miss every product page added since
// launch.
let liveOnlyProducts = [];
try {
  const res = await fetch('https://tvfzfvurqewgvnnhhhad.supabase.co/rest/v1/products?select=slug,metadata', {
    headers: { apikey: 'sb_publishable_WAr2l8gZ0bvYJSY0x1murQ_OGSoDB50' },
  });
  if (res.ok) {
    const rows = await res.json();
    const baseSlug = new Set(PRODUCTS.map((p) => p.slug));
    liveOnlyProducts = rows
      .filter((r) => !baseSlug.has(r.slug) && (!r.metadata?.status || r.metadata.status === 'published'))
      .map((r) => ({ slug: r.slug, status: 'published' }));
  }
} catch (err) {
  console.warn('[sitemap] could not fetch live-only products, continuing with the static 131:', err.message);
}

const SITE = 'https://www.orientalsports.in';
const today = new Date().toISOString().slice(0, 10);

const urls = [
  { loc: '/', priority: '1.0', changefreq: 'daily' },
  { loc: '/shop', priority: '0.9', changefreq: 'daily' },
  { loc: '/courts', priority: '0.8', changefreq: 'weekly' },
  { loc: '/courts/projects', priority: '0.6', changefreq: 'monthly' },
  { loc: '/about', priority: '0.6', changefreq: 'monthly' },
  { loc: '/visit', priority: '0.5', changefreq: 'monthly' },
  { loc: '/contact', priority: '0.5', changefreq: 'monthly' },
  { loc: '/shipping', priority: '0.3', changefreq: 'yearly' },
  { loc: '/returns', priority: '0.3', changefreq: 'yearly' },
  { loc: '/privacy', priority: '0.2', changefreq: 'yearly' },
  { loc: '/terms', priority: '0.2', changefreq: 'yearly' },
  ...CATEGORIES.map((c) => ({ loc: `/shop/${c.id}`, priority: '0.8', changefreq: 'daily' })),
  ...COURT_PROJECTS.map((p) => ({ loc: `/courts/${p.slug}`, priority: '0.5', changefreq: 'monthly' })),
  ...[...PRODUCTS, ...liveOnlyProducts]
    .filter((p) => !p.status || p.status === 'published')
    .map((p) => ({ loc: `/product/${p.slug}`, priority: '0.7', changefreq: 'weekly' })),
];

const seen = new Set();
const deduped = urls.filter((u) => (seen.has(u.loc) ? false : (seen.add(u.loc), true)));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${deduped
  .map(
    (u) => `  <url>
    <loc>${SITE}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/sitemap.xml', xml);
console.log(
  `[sitemap] wrote dist/sitemap.xml with ${deduped.length} URLs ` +
    `(${PRODUCTS.length} built-in + ${liveOnlyProducts.length} admin-created products, ${CATEGORIES.length} categories, ${COURT_PROJECTS.length} court projects)`
);
