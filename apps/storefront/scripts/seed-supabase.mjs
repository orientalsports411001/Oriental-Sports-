#!/usr/bin/env node
/**
 * One-time seed script: pushes the static catalog in
 * data/categories.ts + data/products.ts (which also pulls in
 * data/gymProducts.ts) into Supabase's `categories` and `products` tables.
 *
 * This is the ONLY place those static files are allowed to be imported for
 * their data — every page in the app reads the catalog from Supabase via
 * lib/supabase/queries.ts. Re-running this script is safe: it upserts on
 * `slug`, so edits to the static source files can be re-seeded idempotently.
 *
 * Usage:
 *   npm run seed
 *
 * Requires (apps/storefront/.env.local):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY   (service role — bypasses RLS; never expose to the browser)
 *
 * Requires `supabase start` (Docker) to be running first if targeting the
 * local stack, or point NEXT_PUBLIC_SUPABASE_URL at a hosted project.
 */

// Polyfill WebSocket for Node <22 environments during seed execution
if (typeof globalThis.WebSocket === 'undefined') {
  globalThis.WebSocket = class WebSocket {};
}

import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { config } from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.join(__dirname, '..', '.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    '[seed] Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.\n' +
      '       Add them to apps/storefront/.env.local (see .env.example) and re-run `npm run seed`.'
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// This script is run via `tsx` (see package.json's `seed` script), which
// lets a .mjs file import the project's .ts source files directly.
const { CATEGORIES } = await import('../data/categories.ts');
const { PRODUCTS } = await import('../data/products.ts');

function categoryToRow(c) {
  return {
    slug: c.id,
    name: c.name,
    description: c.description,
    image: c.image,
    sort_order: CATEGORIES.indexOf(c),
    metadata: {
      tagline: c.tagline,
      itemCount: c.itemCount,
      featuredEquipments: c.featuredEquipments,
    },
  };
}

function productToRow(p) {
  return {
    slug: p.slug,
    name: p.name,
    category_slug: p.category,
    brand: p.brand ?? null,
    description: p.description ?? null,
    price: p.price,
    compare_at_price: p.originalPrice ?? null,
    images: p.images ?? [],
    variants: p.variants ?? [],
    sizes: p.sizes ?? [],
    in_stock: p.inStock ?? true,
    // Stage 2 Phase 1 added products.status (default 'draft') and
    // stock_quantity (default 0) — without setting these here, every seeded
    // product is invisible to customers and unpurchasable until an admin
    // manually publishes and stocks all 60 of them. The static catalog this
    // seeds from is the real, already-curated product list, so it should
    // start published/stocked; admins can still draft/unpublish individual
    // items afterward.
    status: p.inStock === false ? 'draft' : 'published',
    stock_quantity: p.inStock === false ? 0 : 50,
    rating: p.rating ?? null,
    review_count: p.reviewsCount ?? 0,
    tags: p.subcategory ? [p.subcategory] : [],
    metadata: {
      categoryName: p.categoryName,
      subcategory: p.subcategory,
      subcategoryName: p.subcategoryName,
      productType: p.productType,
      color: p.color,
      quantityUnit: p.quantityUnit,
      priceLabel: p.priceLabel,
      availabilityNote: p.availabilityNote,
      badge: p.badge,
      isFeatured: p.isFeatured ?? false,
      features: p.features ?? [],
      specs: p.specs ?? {},
      gallery: p.gallery,
      sku: p.sku,
      seoTitle: p.seoTitle,
      seoDescription: p.seoDescription,
      shopifyId: p.shopifyId,
      shopifyVariantId: p.shopifyVariantId,
      handle: p.handle,
    },
  };
}

async function main() {
  console.log(`[seed] Upserting ${CATEGORIES.length} categories...`);
  const categoryRows = CATEGORIES.map(categoryToRow);
  const { error: catError } = await supabase.from('categories').upsert(categoryRows, { onConflict: 'slug' });
  if (catError) {
    console.error('[seed] Category upsert failed:', catError);
    process.exit(1);
  }

  console.log(`[seed] Upserting ${PRODUCTS.length} products (sports gear + gym equipment)...`);
  const productRows = PRODUCTS.map(productToRow);

  // Upsert in batches to stay well under any request-size limits.
  const BATCH = 100;
  for (let i = 0; i < productRows.length; i += BATCH) {
    const batch = productRows.slice(i, i + BATCH);
    const { error } = await supabase.from('products').upsert(batch, { onConflict: 'slug' });
    if (error) {
      console.error(`[seed] Product upsert failed at batch starting index ${i}:`, error);
      process.exit(1);
    }
    console.log(`[seed]   ...${Math.min(i + BATCH, productRows.length)}/${productRows.length}`);
  }

  console.log('[seed] Done. Categories and products are now in Supabase.');
}

main().catch((err) => {
  console.error('[seed] Unexpected error:', err);
  process.exit(1);
});
