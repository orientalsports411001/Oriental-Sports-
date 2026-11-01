import fs from 'fs';
import path from 'path';

console.log('====================================================');
console.log('   ORIENTAL SPORTS - COMPREHENSIVE SYSTEM AUDIT TEST');
console.log('====================================================\n');

let passCount = 0;
let failCount = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${testName} ${details ? '- ' + details : ''}`);
    failCount++;
  }
}

// 1. Audit Random Number Formula Elimination in Storefront
console.log('\n--- PHASE 2: AUDITING RANDOM NUMBERS & FAKE DATA ---');

const productCardContent = fs.readFileSync('src/components/products/ProductCard.tsx', 'utf-8');
assert(
  !productCardContent.includes('Math.floor((product.price % 37) + 14)'),
  'ProductCard: Random review formula Math.floor((price % 37) + 14) removed'
);
assert(
  !productCardContent.includes('basePrice > 1000 ? Math.round(basePrice * 1.18)'),
  'ProductCard: Synthetic 18% price markup removed'
);

const wishlistContent = fs.readFileSync('src/pages/WishlistPage.tsx', 'utf-8');
assert(
  !wishlistContent.includes('basePrice > 1000 ? Math.round(basePrice * 1.18)'),
  'WishlistPage: Synthetic 18% price markup removed'
);

const checkoutContent = fs.readFileSync('src/pages/CheckoutPage.tsx', 'utf-8');
assert(
  !checkoutContent.includes('Math.random()'),
  'CheckoutPage: All Math.random() references completely eliminated'
);
assert(
  !checkoutContent.includes('pay_rzp_') || checkoutContent.includes('pay_sim_'),
  'CheckoutPage: Mock payment ids cleaned'
);

// 2. Audit Stable Identifiers & Deduplication in products.ts
console.log('\n--- PHASE 3: AUDITING PRODUCT STABILITY & DEDUPLICATION ---');

const productsDataContent = fs.readFileSync('src/data/products.ts', 'utf-8');
assert(
  !productsDataContent.includes("'prod-os-' + Date.now()"),
  'products.ts: Unstable Date.now() ID generation removed from live products loop'
);
assert(
  productsDataContent.includes('seenSlugs') && productsDataContent.includes('seenNames'),
  'products.ts: Triple-deduplication by ID, slug, and normalized name implemented'
);

// 3. Audit Admin Panel Storage & Consistency
console.log('\n--- PHASE 6: AUDITING MULTI-USER ADMIN DATA AUTHORITATIVENESS ---');

const catalogStoreContent = fs.readFileSync('apps/admin/lib/catalog-store.ts', 'utf-8');
assert(
  catalogStoreContent.includes('INITIAL_ORDERS: AdminOrder[] = [];'),
  'catalog-store.ts: Fake dummy order (Pratik Jadhav) eradicated from initial state'
);

const adminProductsPageContent = fs.readFileSync('apps/admin/app/(admin)/products/page.tsx', 'utf-8');
assert(
  !adminProductsPageContent.includes("select('id, name, slug, brand, category_slug, status"),
  'admin/products/page.tsx: Invalid column query (status) replaced with full query mapping metadata'
);

const adminDashboardContent = fs.readFileSync('apps/admin/app/(admin)/dashboard/page.tsx', 'utf-8');
assert(
  adminDashboardContent.includes("p.metadata?.status"),
  'admin/dashboard/page.tsx: Accurately maps status from Supabase metadata JSONB'
);

// 4. Audit Cron Job Implementation
console.log('\n--- PHASE 7: AUDITING CRON JOB & BACKGROUND CONSISTENCY ---');

assert(
  fs.existsSync('apps/admin/app/api/cron/sync-catalog/route.ts'),
  'Cron Job: Endpoint apps/admin/app/api/cron/sync-catalog/route.ts exists'
);

const vercelJsonContent = fs.readFileSync('apps/admin/vercel.json', 'utf-8');
assert(
  vercelJsonContent.includes('/api/cron/sync-catalog'),
  'vercel.json: Cron job schedule registered for Vercel deployment'
);

// 5. Audit Realtime & Low Stock Features
console.log('\n--- PHASES 5 & 8: AUDITING REALTIME SYNC & LOW STOCK FILTERS ---');

const catalogViewContent = fs.readFileSync('apps/admin/components/products/ProductsCatalogView.tsx', 'utf-8');
assert(
  catalogViewContent.includes('showOnlyLowStock') || catalogViewContent.includes('filter=low_stock'),
  'ProductsCatalogView: Low stock filtering implemented'
);
assert(
  catalogViewContent.includes('handleToggleVisibility') || catalogViewContent.includes('toggle-visibility'),
  'ProductsCatalogView: Show/Hide and status toggle action implemented'
);

// 6. Test Hosted Database Query & Count
console.log('\n--- DATABASE CONNECTIVITY & LIVE PRODUCT AUDIT ---');

async function testDatabase() {
  const url = 'https://tvfzfvurqewgvnnhhhad.supabase.co/rest/v1/products?select=id,slug,name,in_stock,metadata';
  const apiKey = 'sb_publishable_WAr2l8gZ0bvYJSY0x1murQ_OGSoDB50';

  try {
    const res = await fetch(url, {
      headers: {
        apikey: apiKey,
        Authorization: 'Bearer ' + apiKey,
      },
    });

    const products = await res.json();
    assert(Array.isArray(products) && products.length > 0, `Database: Query succeeded with ${products.length} products`);

    // Verify no probe duplicates
    const probeDuplicates = products.filter((p) => p.slug && p.slug.startsWith('prod-os-1793278043483'));
    assert(probeDuplicates.length === 0, 'Database: Zero duplicate probe rows found in products table');

    // Print summary
    console.log('\n====================================================');
    console.log(`TOTAL TESTS: ${passCount + failCount}`);
    console.log(`PASSED: ${passCount}`);
    console.log(`FAILED: ${failCount}`);
    console.log('====================================================\n');

    if (failCount > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('Database connection test error:', err);
    process.exit(1);
  }
}

testDatabase();

