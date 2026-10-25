import fs from 'fs';
import path from 'path';

// Transpile data modules
import ts from 'typescript';

const transpile = (tsPath) => {
  const code = fs.readFileSync(path.resolve(tsPath), 'utf-8');
  return ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
  }).outputText.replace(/import\s+\{[^}]*\}\s+from\s+['"][^'"]*types['"];?/g, '');
};

fs.writeFileSync('scripts/temp-gym.mjs', transpile('src/data/gymProducts.ts'));
fs.writeFileSync('scripts/temp-bikes.mjs', transpile('src/data/exerciseBikes.ts'));
fs.writeFileSync('scripts/temp-tables.mjs', transpile('src/data/tablesProducts.ts'));
fs.writeFileSync('scripts/temp-cougar.mjs', transpile('src/data/cougarProducts.ts'));

let prodCode = fs.readFileSync(path.resolve('src/data/products.ts'), 'utf-8');
prodCode = prodCode.replace(/import\s+\{[^}]*\}\s+from\s+['"][^'"]*types['"];?/g, '');
prodCode = prodCode.replace("from './gymProducts';", "from './temp-gym.mjs';");
prodCode = prodCode.replace("from './exerciseBikes';", "from './temp-bikes.mjs';");
prodCode = prodCode.replace("from './tablesProducts';", "from './temp-tables.mjs';");
prodCode = prodCode.replace("from './cougarProducts';", "from './temp-cougar.mjs';");

const prodJs = ts.transpileModule(prodCode, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
}).outputText;
fs.writeFileSync('scripts/temp-prod.mjs', prodJs);

console.log('Transpiled all modules successfully! Now importing...');

import('./temp-prod.mjs').then((mod) => {
  const products = mod.PRODUCTS;
  console.log('Total PRODUCTS loaded:', products.length);
  
  // Clean up temp files
  ['scripts/temp-gym.mjs', 'scripts/temp-bikes.mjs', 'scripts/temp-tables.mjs', 'scripts/temp-cougar.mjs', 'scripts/temp-prod.mjs'].forEach((f) => {
    if (fs.existsSync(f)) fs.unlinkSync(f);
  });

  // Let's write all products into apps/admin/lib/all-products.json
  const adminProducts = products.map((p, idx) => {
    // Generate realistic stock & thresholds based on product type
    const isTreadmill = p.category === 'gym-equipment';
    const isCourt = p.category === 'court-infrastructure';
    const stockQuantity = isCourt ? 1 : isTreadmill ? Math.floor((idx % 4) + 1) : Math.floor((idx * 7) % 35) + 3;
    const lowStockThreshold = isCourt ? 1 : isTreadmill ? 2 : 5;

    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      brand: p.brand || (isCourt ? 'Oriental Infrastructure' : 'Oriental Pro'),
      category_slug: p.category || 'general',
      description: p.description || '',
      price: p.price || (p.mrp ? p.mrp : 1999),
      compare_at_price: p.specs?.MRP ? parseInt(String(p.specs.MRP).replace(/[^0-9]/g, ''), 10) : (p.price ? Math.round(p.price * 1.15) : null),
      images: p.images && p.images.length > 0 ? p.images : ['/images/products/oriental-sports/sg-scorer-classic.webp'],
      status: isCourt && idx % 2 === 0 ? 'draft' : 'published',
      stock_quantity: stockQuantity,
      low_stock_threshold: lowStockThreshold,
      is_featured: Boolean(p.isFeatured),
      seo_title: p.seoTitle || `${p.name} | Oriental Sports Pune`,
      seo_description: p.seoDescription || p.description?.slice(0, 155) || `Buy ${p.name} at Oriental Sports Pune Camp.`,
      seo_canonical_url: `https://orientalsports.in/product/${p.slug}`,
      created_at: new Date(Date.now() - idx * 86400000).toISOString(),
      updated_at: new Date().toISOString(),
    };
  });

  fs.writeFileSync('apps/admin/lib/all-products.json', JSON.stringify(adminProducts, null, 2));
  console.log(`Saved ${adminProducts.length} products to apps/admin/lib/all-products.json!`);
}).catch((err) => {
  console.error('Import error:', err);
});
