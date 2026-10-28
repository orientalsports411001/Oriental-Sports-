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

  let products: any[] = [];
  let count: number = 0;
  let categories: { slug: string; name: string }[] = CATEGORIES;

  try {
    const admin = createServiceRoleClient();
    let query = admin
      .from('products')
      .select('id, name, slug, brand, category_slug, status, price, compare_at_price, images, stock_quantity, low_stock_threshold', {
        count: 'exact',
      });

    if (searchParams.q) {
      query = query.ilike('name', `%${searchParams.q}%`);
    }
    if (searchParams.status) {
      query = query.eq('status', searchParams.status);
    }
    if (searchParams.category) {
      query = query.eq('category_slug', searchParams.category);
    }

    const { data: dbProducts, count: dbCount } = await query.order('created_at', { ascending: false });
    const { data: dbCategories } = await admin.from('categories').select('slug, name').order('name');

    if (dbProducts && dbProducts.length > 0) {
      products = dbProducts;
      count = dbCount || dbProducts.length;
    }
    if (dbCategories && dbCategories.length > 0) {
      categories = dbCategories;
    }
  } catch (err) {
    // Supabase fallback
  }

  // Fallback to cached catalog store
  const allCached = getCachedProducts();
  if (products.length === 0) {
    let all = allCached;

    if (searchParams.q) {
      const q = searchParams.q.toLowerCase();
      all = all.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q));
    }
    if (searchParams.status) {
      all = all.filter((p) => p.status === searchParams.status);
    }
    if (searchParams.category) {
      all = all.filter((p) => p.category_slug === searchParams.category);
    }

    count = all.length;
    products = all;
  }

  // Summary Metrics
  const publishedCount = allCached.filter((p) => p.status === 'published').length;
  const lowStockCount = allCached.filter((p) => p.stock_quantity <= p.low_stock_threshold).length;
  const totalCatalogValue = allCached.reduce((acc, p) => acc + (p.price * p.stock_quantity), 0);

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
              padding: '10px 22px',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.01em',
              borderRadius: 9999,
              background: 'var(--blood-crimson)',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(200, 16, 46, 0.35)',
            }}
          >
            + New Product
          </button>
        </Link>
      </div>

      {/* Auto-dismissing Notification Banner */}
      <SavedNotificationBanner message={searchParams.saved} error={searchParams.error} />

      {/* Live Client-Reconciled Products Catalog */}
      <ProductsCatalogView
        initialProducts={products}
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
