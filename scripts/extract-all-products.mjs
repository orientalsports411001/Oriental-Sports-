import fs from 'fs';
import path from 'path';

// Let's transpile src/data/products.ts and src/data/gymProducts.ts into temporary JS files
import ts from 'typescript';

const productsTsPath = path.resolve('src/data/products.ts');
const gymTsPath = path.resolve('src/data/gymProducts.ts');

const gymCode = fs.readFileSync(gymTsPath, 'utf-8');
const gymJs = ts.transpileModule(gymCode, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
}).outputText;
fs.writeFileSync('scripts/temp-gym.mjs', gymJs.replace("import { Product } from '../types';", ''));

let prodCode = fs.readFileSync(productsTsPath, 'utf-8');
prodCode = prodCode.replace("import { Product } from '../types';", '');
prodCode = prodCode.replace("import { GYM_PRODUCTS } from './gymProducts';", "import { GYM_PRODUCTS } from './temp-gym.mjs';");

const prodJs = ts.transpileModule(prodCode, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
}).outputText;
fs.writeFileSync('scripts/temp-prod.mjs', prodJs);

console.log('Transpiled successfully! Now importing...');

import('./temp-prod.mjs').then((mod) => {
  const products = mod.PRODUCTS;
  console.log('Total PRODUCTS loaded:', products.length);
  
  // Clean up temp files
  fs.unlinkSync('scripts/temp-gym.mjs');
  fs.unlinkSync('scripts/temp-prod.mjs');

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
