import Link from 'next/link';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/require-admin';
import { getCachedProducts, CATEGORIES } from '@/lib/catalog-store';
import { deleteProduct } from './actions';
import { SavedNotificationBanner } from '@/components/products/SavedNotificationBanner';
import { ProductsCatalogView } from '@/components/products/ProductsCatalogView';

export const dynamic = 'force-dynamic';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { q?: string; status?: string; category?: string; page?: string; saved?: string; error?: string };
}) {
  await requireAdmin();

  let dbProducts: any[] = [];
  let categories: { slug: string; name: string }[] = CATEGORIES;

  try {
    const admin = createServiceRoleClient();
    const [resProducts, resCategories] = await Promise.all([
      admin
        .from('products')
        .select('id, name, slug, brand, category_slug, status, price, compare_at_price, images, stock_quantity, low_stock_threshold'),
      admin.from('categories').select('slug, name').order('name'),
    ]);

    if (resProducts.data && resProducts.data.length > 0) {
      dbProducts = resProducts.data;
    }
    if (resCategories.data && resCategories.data.length > 0) {
      categories = resCategories.data;
    }
  } catch (err) {
    // Supabase fallback
  }

  // Unified catalog store (all 131 items + Supabase DB updates)
  const allCached = getCachedProducts();

  // Merge Supabase products with allCached (Supabase overrides by slug/id, while keeping the rest of the 131 products)
  const productMap = new Map<string, any>();
  for (const p of allCached) {
    productMap.set(p.id, p);
    if (p.slug) productMap.set(p.slug, p);
  }

  for (const p of dbProducts) {
    const existing = productMap.get(p.id) || (p.slug ? productMap.get(p.slug) : undefined);
    const merged = existing ? { ...existing, ...p } : p;
    productMap.set(p.id, merged);
    if (p.slug) productMap.set(p.slug, merged);
  }

  const unifiedProducts: any[] = [];
  const seenKeys = new Set<string>();

  // Add dbProducts not in allCached first
  for (const p of dbProducts) {
    const key = p.id || p.slug;
    if (key && !seenKeys.has(key)) {
      seenKeys.add(key);
      if (p.slug) seenKeys.add(p.slug);
      if (!allCached.some((c) => c.id === p.id || c.slug === p.slug)) {
        unifiedProducts.push(productMap.get(p.id) || p);
      }
    }
  }

  // Add all base cached items
  for (const c of allCached) {
    const resolved = productMap.get(c.id) || (c.slug ? productMap.get(c.slug) : c);
    const key = resolved.id || resolved.slug;
    if (key && !seenKeys.has(key)) {
      seenKeys.add(key);
      if (resolved.slug) seenKeys.add(resolved.slug);
      unifiedProducts.push(resolved);
    }
  }

  // Summary Metrics reflect the unified count (131+ products)
  const publishedCount = unifiedProducts.filter((p) => p.status === 'published').length;
  const lowStockCount = unifiedProducts.filter((p) => p.stock_quantity <= p.low_stock_threshold).length;
  const totalCatalogValue = unifiedProducts.reduce((acc, p) => acc + (p.price * p.stock_quantity), 0);
  const count = unifiedProducts.length;

  return (
    <div style={{ maxWidth: 1420, margin: '0 auto' }}>
      {/* Clean Minimalist Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: '-0.015em', color: 'var(--ink-heading)' }}>
              Equipment Catalog
            </h1>
          </div>
          <p style={{ margin: 0, fontSize: 13.5, color: 'var(--muted)', fontWeight: 400 }}>
            Manage athletic inventory, pricing, and live customer availability.
          </p>
        </div>

        <Link href="/products/new">
          <button
            style={{
              padding: '10px 20px',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '-0.01em',
              borderRadius: 11,
              background: 'linear-gradient(135deg, #A81B2B 0%, #821320 100%)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              cursor: 'pointer',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 4px 14px rgba(0, 0, 0, 0.45)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span style={{ fontSize: 15, lineHeight: 1 }}>+</span> New Product
          </button>
        </Link>
      </div>

      {/* Auto-dismissing Notification Banner */}
      <SavedNotificationBanner message={searchParams.saved} error={searchParams.error} />

      {/* Live Client-Reconciled Products Catalog */}
      <ProductsCatalogView
        initialProducts={unifiedProducts}
        initialCount={count}
        categories={categories}
        totalCatalogValue={totalCatalogValue}
        publishedCount={publishedCount}
        lowStockCount={lowStockCount}
        deleteAction={deleteProduct}
      />
    </div>
  );
}
