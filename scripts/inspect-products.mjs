import fs from 'fs';
import path from 'path';

// Read src/data/products.ts
const productsTsPath = path.resolve('src/data/products.ts');
const content = fs.readFileSync(productsTsPath, 'utf-8');

// Match each product object inside CORE_PRODUCTS
// Each product has: id, slug, name, category, brand, price, images, description, inStock
const idMatches = content.matchAll(/id:\s*['"]([^'"]+)['"]/g);
const ids = Array.from(idMatches, m => m[1]);
console.log('Found product IDs:', ids.length, ids.slice(0, 10));
