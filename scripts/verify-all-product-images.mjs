import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Read all products from apps/admin/lib/all-products.json
const allProductsPath = path.join(rootDir, 'apps', 'admin', 'lib', 'all-products.json');
const products = JSON.parse(fs.readFileSync(allProductsPath, 'utf8'));

console.log(`\n========================================`);
console.log(`Verifying images for all ${products.length} products...`);
console.log(`========================================\n`);

let missingInPublic = 0;
let missingInStorefront = 0;
let externalImages = 0;
let validLocalImages = 0;

for (const p of products) {
  for (const imgUrl of p.images) {
    if (imgUrl.startsWith('http://') || imgUrl.startsWith('https://')) {
      externalImages++;
      continue;
    }

    // Local image (e.g. /images/products/...)
    const relPath = imgUrl.replace(/^\//, '');
    const publicPath = path.join(rootDir, 'public', relPath);
    const storefrontPath = path.join(rootDir, 'apps', 'storefront', 'public', relPath);

    const existsPublic = fs.existsSync(publicPath);
    const existsStorefront = fs.existsSync(storefrontPath);

    if (!existsPublic) {
      console.error(`❌ Missing in root public/: ${imgUrl} (Product: ${p.name} [${p.id}])`);
      missingInPublic++;
    }
    if (!existsStorefront) {
      console.error(`❌ Missing in storefront public/: ${imgUrl} (Product: ${p.name} [${p.id}])`);
      missingInStorefront++;
    }

    if (existsPublic && existsStorefront) {
      validLocalImages++;
    }
  }
}

console.log(`\nSummary:`);
console.log(`  Total products: ${products.length}`);
console.log(`  Valid local image references: ${validLocalImages}`);
console.log(`  External (CDN/Unsplash) images: ${externalImages}`);
console.log(`  Missing in root public/: ${missingInPublic}`);
console.log(`  Missing in storefront public/: ${missingInStorefront}`);

if (missingInPublic === 0 && missingInStorefront === 0) {
  console.log(`\n🎉 All product image assets exist in both public directories with 100% integrity!\n`);
  process.exit(0);
} else {
  console.error(`\n❌ Asset verification failed!\n`);
  process.exit(1);
}
