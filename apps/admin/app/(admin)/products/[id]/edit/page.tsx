import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/require-admin';
import { getCachedProducts, CATEGORIES } from '@/lib/catalog-store';
import { ProductForm } from '../../product-form';
import { updateProduct, adjustStock, deleteProduct } from '../../actions';
import { DeleteProductButton } from '@/components/products/DeleteProductButton';

export const dynamic = 'force-dynamic';

export default async function EditProductPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { error?: string; saved?: string };
}) {
  await requireAdmin();

  let product: any = null;
  let categories: any[] = CATEGORIES;
  let adjustments: any[] = [];

  try {
    const admin = createServiceRoleClient();
    const [{ data: dbProduct }, { data: dbCategories }, { data: dbAdjustments }] = await Promise.all([
      admin.from('products').select('*').eq('id', params.id).maybeSingle(),
      admin.from('categories').select('slug, name').order('name'),
      admin
        .from('inventory_adjustments')
        .select('id, delta, reason, created_at')
        .eq('product_id', params.id)
        .order('created_at', { ascending: false })
        .limit(10),
    ]);

    if (dbProduct) product = dbProduct;
    if (dbCategories && dbCategories.length > 0) categories = dbCategories;
    if (dbAdjustments) adjustments = dbAdjustments;
  } catch (err) {
    // Supabase unavailable, fallback to memory store
  }

  if (!product) {
    const fallback = getCachedProducts().find((p) => p.id === params.id || p.slug === params.id);
    if (!fallback) notFound();
    product = fallback;
  }

  const boundUpdate = updateProduct.bind(null, params.id);
  const boundAdjustStock = adjustStock.bind(null, params.id);
  const boundDelete = deleteProduct.bind(null, params.id);

  return (
    <div>
      {/* Header Bar */}
      <div className="toolbar" style={{ justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <div style={{ marginBottom: 6 }}>
            <Link
              href="/products"
              style={{
                fontSize: 12.5,
                fontWeight: 700,
                color: 'var(--muted)',
                textDecoration: 'none',
              }}
            >
              ← Back to Products
            </Link>
          </div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 900 }}>Edit: {product.name}</h1>
        </div>
      </div>

      {searchParams.saved && <p className="success" style={{ marginBottom: 20 }}>{searchParams.saved}</p>}
      {searchParams.error && <p className="error" style={{ marginBottom: 20 }}>{searchParams.error}</p>}

      {/* Main Frameless Studio Product Form */}
      <ProductForm product={product} categories={categories || []} action={boundUpdate} error={searchParams.error} />

      {/* Warehouse Stock Adjustment Surface */}
      <div className="studio-surface" style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 4px', color: 'var(--ink)' }}>
          Warehouse Stock Audit & Adjustment
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 18 }}>
          Current verified inventory: <strong style={{ color: 'var(--ink)' }}>{product.stock_quantity} units</strong> (Threshold: {product.low_stock_threshold})
        </p>
        <form action={boundAdjustStock}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            <div>
              <label htmlFor="delta" style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>
                Quantity Delta (+/-)
              </label>
              <input id="delta" name="delta" type="number" placeholder="e.g. +10 or -2" required className="cult-input" />
            </div>
            <div>
              <label htmlFor="reason" style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>
                Adjustment Reason / Audit Note
              </label>
              <input id="reason" name="reason" placeholder="e.g. Received shipment from SG, Store demo" className="cult-input" />
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <button
              type="submit"
              className="secondary"
              style={{
                padding: '9px 18px',
                fontSize: 12.5,
                fontWeight: 700,
                borderRadius: 9999,
              }}
            >
              Apply Stock Adjustment
            </button>
          </div>
        </form>

        {adjustments && adjustments.length > 0 && (
          <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: 14, fontWeight: 800, marginBottom: 12 }}>Stock Audit Trail</h3>
            <div className="table-scroll">
              <table style={{ margin: 0, width: '100%' }}>
                <thead>
                  <tr style={{ background: 'var(--stone)' }}>
                    <th style={{ padding: '8px 12px' }}>Delta</th>
                    <th style={{ padding: '8px 12px' }}>Reason / Notes</th>
                    <th style={{ padding: '8px 12px' }}>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {adjustments.map((a) => (
                    <tr key={a.id} style={{ borderBottom: '1px solid var(--line)' }}>
                      <td style={{ padding: '8px 12px', fontWeight: 800, color: a.delta > 0 ? 'var(--success)' : 'var(--error)' }}>
                        {a.delta > 0 ? `+${a.delta}` : a.delta}
                      </td>
                      <td style={{ padding: '8px 12px' }}>{a.reason || '—'}</td>
                      <td style={{ padding: '8px 12px', color: 'var(--subtle)', fontSize: 12 }}>
                        {new Date(a.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Discontinue / Danger Zone */}
      <div className="studio-surface" style={{ borderColor: 'rgba(179, 38, 30, 0.25)', background: '#FFFDFD' }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 6px', color: 'var(--error)' }}>
          Discontinue / Delete Product
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: 13, margin: '0 0 16px', lineHeight: 1.5 }}>
          Removing this equipment will delete its listing from the active catalog. Historical orders and customer receipts are safely retained.
        </p>
        <DeleteProductButton productId={product.id} productName={product.name} action={boundDelete} />
      </div>
    </div>
  );
}
