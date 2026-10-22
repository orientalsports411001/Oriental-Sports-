import Link from 'next/link';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/require-admin';
import { getCachedProducts, CATEGORIES } from '@/lib/catalog-store';
import { deleteProduct } from './actions';
import { DeleteProductButton } from '@/components/products/DeleteProductButton';
import { ProductsFilterBar } from '@/components/products/ProductsFilterBar';

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 20;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { q?: string; status?: string; category?: string; page?: string; saved?: string; error?: string };
}) {
  await requireAdmin();

  const page = Math.max(1, parseInt(searchParams.page || '1', 10) || 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

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

    const { data: dbProducts, count: dbCount } = await query.order('created_at', { ascending: false }).range(from, to);
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
    products = all.slice(from, to + 1);
  }

  // Summary Metrics
  const totalSkus = allCached.length;
  const publishedCount = allCached.filter((p) => p.status === 'published').length;
  const lowStockCount = allCached.filter((p) => p.stock_quantity <= p.low_stock_threshold).length;
  const totalCatalogValue = allCached.reduce((acc, p) => acc + (p.price * p.stock_quantity), 0);

  const totalPages = Math.max(1, Math.ceil((count || 0) / PAGE_SIZE));

  const buildPageHref = (targetPage: number) => {
    const params = new URLSearchParams();
    if (searchParams.q) params.set('q', searchParams.q);
    if (searchParams.status) params.set('status', searchParams.status);
    if (searchParams.category) params.set('category', searchParams.category);
    params.set('page', String(targetPage));
    return `?${params.toString()}`;
  };

  return (
    <div style={{ paddingBottom: 60, maxWidth: 1420, margin: '0 auto' }}>
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
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.04em',
                padding: '2px 8px',
                borderRadius: 9999,
                background: 'var(--stone)',
                color: 'var(--subtle)',
              }}
            >
              {count} SKUs
            </span>
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
              background: 'var(--ink-heading)',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(38,41,46,0.10)',
            }}
          >
            + New Product
          </button>
        </Link>
      </div>

      {/* Typographic Metric Ribbon (Minimalist, Calm Typography) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            padding: '20px 24px',
            background: '#FFFFFF',
            borderRadius: 20,
            border: '1px solid var(--line)',
            boxShadow: '0 4px 20px -2px rgba(38,41,46,0.03)',
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: 'var(--subtle)', letterSpacing: '0.06em', marginBottom: 8 }}>
            Total Catalog
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--ink-heading)', letterSpacing: '-0.015em', lineHeight: 1.15, marginBottom: 4 }}>
            {totalSkus} Items
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>
            All sport disciplines
          </div>
        </div>

        <div
          style={{
            padding: '20px 24px',
            background: '#FFFFFF',
            borderRadius: 20,
            border: '1px solid var(--line)',
            boxShadow: '0 4px 20px -2px rgba(38,41,46,0.03)',
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: 'var(--subtle)', letterSpacing: '0.06em', marginBottom: 8 }}>
            Published & Live
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--success)', letterSpacing: '-0.015em', lineHeight: 1.15, marginBottom: 4 }}>
            {publishedCount} SKUs
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>
            Buyable on storefront
          </div>
        </div>

        <div
          style={{
            padding: '20px 24px',
            background: '#FFFFFF',
            borderRadius: 20,
            border: '1px solid var(--line)',
            boxShadow: '0 4px 20px -2px rgba(38,41,46,0.03)',
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: 'var(--subtle)', letterSpacing: '0.06em', marginBottom: 8 }}>
            Low Stock
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: lowStockCount > 0 ? 'var(--gold-ink)' : 'var(--ink-heading)', letterSpacing: '-0.015em', lineHeight: 1.15, marginBottom: 4 }}>
            {lowStockCount} Products
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>
            Below reorder threshold
          </div>
        </div>

        <div
          style={{
            padding: '20px 24px',
            background: '#FFFFFF',
            borderRadius: 20,
            border: '1px solid var(--line)',
            boxShadow: '0 4px 20px -2px rgba(38,41,46,0.03)',
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: 'var(--subtle)', letterSpacing: '0.06em', marginBottom: 8 }}>
            Inventory Value
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--ink-heading)', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.015em', lineHeight: 1.15, marginBottom: 4 }}>
            ₹{totalCatalogValue.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>
            Warehouse equipment stock
          </div>
        </div>
      </div>

      {searchParams.saved && <p className="success">{searchParams.saved}</p>}
      {searchParams.error && <p className="error">{searchParams.error}</p>}

      {/* Filter Tabs & Search Bar */}
      <ProductsFilterBar categories={categories} totalCount={totalSkus} />

      {/* Clean Minimalist Products Table */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 20,
          boxShadow: '0 4px 24px -2px rgba(17,17,17,0.03)',
          overflow: 'hidden',
        }}
      >
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <table style={{ margin: 0, width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(17,17,17,0.06)' }}>
                <th style={{ padding: '14px 20px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--subtle)', background: 'transparent' }}>
                  Product
                </th>
                <th style={{ padding: '14px 20px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--subtle)', background: 'transparent' }}>
                  Discipline
                </th>
                <th style={{ padding: '14px 20px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--subtle)', background: 'transparent' }}>
                  Status
                </th>
                <th style={{ padding: '14px 20px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--subtle)', background: 'transparent' }}>
                  Price
                </th>
                <th style={{ padding: '14px 20px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--subtle)', background: 'transparent' }}>
                  Stock
                </th>
                <th style={{ textAlign: 'right', padding: '14px 20px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--subtle)', background: 'transparent' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {(products || []).map((p) => {
                const boundDelete = deleteProduct.bind(null, p.id);
                const hasDiscount = p.compare_at_price && p.compare_at_price > p.price;
                const isLow = p.stock_quantity <= p.low_stock_threshold;
                const isOut = p.stock_quantity === 0;

                return (
                  <tr
                    key={p.id}
                    style={{
                      borderBottom: '1px solid rgba(17,17,17,0.04)',
                    }}
                  >
                    {/* Product Name & Brand */}
                    <td style={{ padding: '16px 20px' }}>
                      <Link
                        href={`/products/${p.id}/edit`}
                        style={{
                          fontWeight: 700,
                          fontSize: 14,
                          color: 'var(--ink)',
                          display: 'block',
                          textDecoration: 'none',
                        }}
                      >
                        {p.name}
                      </Link>
                      <div style={{ fontSize: 12, color: 'var(--subtle)', marginTop: 2 }}>
                        {p.brand ? `${p.brand} · ` : ''}{p.category_slug || 'General'}
                      </div>
                    </td>

                    {/* Discipline */}
                    <td style={{ padding: '16px 20px', fontSize: 13, color: 'var(--muted)', textTransform: 'capitalize' }}>
                      {p.category_slug || 'General'}
                    </td>

                    {/* Status Pill */}
                    <td style={{ padding: '16px 20px' }}>
                      <span
                        className={`badge ${p.status}`}
                        style={{
                          fontSize: 11,
                          padding: '3px 9px',
                          borderRadius: 9999,
                          fontWeight: 700,
                          textTransform: 'capitalize',
                        }}
                      >
                        {p.status}
                      </span>
                    </td>

                    {/* Price */}
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontWeight: 800, fontSize: 14, fontVariantNumeric: 'tabular-nums', color: 'var(--ink)' }}>
                        ₹{Number(p.price).toLocaleString('en-IN')}
                      </div>
                      {hasDiscount && (
                        <div style={{ fontSize: 11, color: 'var(--subtle)', textDecoration: 'line-through' }}>
                          ₹{Number(p.compare_at_price).toLocaleString('en-IN')}
                        </div>
                      )}
                    </td>

                    {/* Stock Quantity */}
                    <td style={{ padding: '16px 20px' }}>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: isOut ? 'var(--error)' : isLow ? 'var(--gold-ink)' : 'var(--ink)',
                        }}
                      >
                        {p.stock_quantity} in stock
                      </div>
                      {isLow && !isOut && (
                        <div style={{ fontSize: 11, color: 'var(--gold-ink)' }}>
                          Low threshold ({p.low_stock_threshold})
                        </div>
                      )}
                      {isOut && (
                        <div style={{ fontSize: 11, color: 'var(--error)' }}>
                          Out of stock
                        </div>
                      )}
                    </td>

                    {/* Clean Text Actions (Zero sloppy icons!) */}
                    <td style={{ textAlign: 'right', padding: '16px 20px' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
                        <Link
                          href={`/products/${p.id}/edit`}
                          style={{
                            fontSize: 12.5,
                            fontWeight: 700,
                            color: 'var(--ink)',
                            textDecoration: 'none',
                          }}
                        >
                          Edit
                        </Link>

                        <DeleteProductButton
                          productId={p.id}
                          productName={p.name}
                          action={boundDelete}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Clean Pagination Bar */}
          <div
            style={{
              padding: '16px 24px',
              borderTop: '1px solid var(--stone)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
              background: 'var(--paper)',
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
            }}
          >
            <div style={{ fontSize: 12.5, color: 'var(--subtle)' }}>
              Showing <strong style={{ color: 'var(--ink)' }}>{count === 0 ? 0 : from + 1}</strong>–<strong style={{ color: 'var(--ink)' }}>{Math.min(to + 1, count)}</strong> of <strong style={{ color: 'var(--ink)' }}>{count}</strong> products
            </div>

            {totalPages > 1 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {page > 1 ? (
                  <Link
                    href={buildPageHref(page - 1)}
                    style={{
                      padding: '6px 12px',
                      fontSize: 12,
                      fontWeight: 700,
                      borderRadius: 6,
                      border: '1px solid var(--stone)',
                      background: 'var(--paper)',
                      color: 'var(--ink)',
                      textDecoration: 'none',
                    }}
                  >
                    ← Previous
                  </Link>
                ) : (
                  <span
                    style={{
                      padding: '6px 12px',
                      fontSize: 12,
                      fontWeight: 700,
                      borderRadius: 6,
                      border: '1px solid var(--stone)',
                      background: 'var(--canvas)',
                      color: 'var(--subtle)',
                      cursor: 'not-allowed',
                      opacity: 0.6,
                    }}
                  >
                    ← Previous
                  </span>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => {
                    const isActive = pNum === page;
                    return (
                      <Link
                        key={pNum}
                        href={buildPageHref(pNum)}
                        style={{
                          minWidth: 32,
                          height: 32,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '0 8px',
                          fontSize: 12,
                          fontWeight: isActive ? 800 : 600,
                          borderRadius: 6,
                          background: isActive ? 'var(--ink)' : 'transparent',
                          color: isActive ? 'var(--ivory)' : 'var(--ink)',
                          textDecoration: 'none',
                          border: isActive ? '1px solid var(--ink)' : '1px solid transparent',
                        }}
                      >
                        {pNum}
                      </Link>
                    );
                  })}
                </div>

                {page < totalPages ? (
                  <Link
                    href={buildPageHref(page + 1)}
                    style={{
                      padding: '6px 12px',
                      fontSize: 12,
                      fontWeight: 700,
                      borderRadius: 6,
                      border: '1px solid var(--stone)',
                      background: 'var(--paper)',
                      color: 'var(--ink)',
                      textDecoration: 'none',
                    }}
                  >
                    Next →
                  </Link>
                ) : (
                  <span
                    style={{
                      padding: '6px 12px',
                      fontSize: 12,
                      fontWeight: 700,
                      borderRadius: 6,
                      border: '1px solid var(--stone)',
                      background: 'var(--canvas)',
                      color: 'var(--subtle)',
                      cursor: 'not-allowed',
                      opacity: 0.6,
                    }}
                  >
                    Next →
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
