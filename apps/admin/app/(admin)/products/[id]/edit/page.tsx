import { notFound } from 'next/navigation';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/require-admin';
import { ProductForm } from '../../product-form';
import { updateProduct, adjustStock } from '../../actions';

export const dynamic = 'force-dynamic';

export default async function EditProductPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { error?: string; saved?: string };
}) {
  await requireAdmin();
  const admin = createServiceRoleClient();

  const [{ data: product }, { data: categories }, { data: adjustments }] = await Promise.all([
    admin.from('products').select('*').eq('id', params.id).maybeSingle(),
    admin.from('categories').select('slug, name').order('name'),
    admin
      .from('inventory_adjustments')
      .select('id, delta, reason, created_at')
      .eq('product_id', params.id)
      .order('created_at', { ascending: false })
      .limit(10),
  ]);

  if (!product) notFound();

  const boundUpdate = updateProduct.bind(null, params.id);
  const boundAdjustStock = adjustStock.bind(null, params.id);

  return (
    <div>
      <h1>Edit product</h1>
      {searchParams.saved && <p className="success">Saved.</p>}

      <div className="card">
        <ProductForm product={product} categories={categories || []} action={boundUpdate} error={searchParams.error} />
      </div>

      <div className="card">
        <h2>Stock adjustment</h2>
        <p>Current stock: {product.stock_quantity}</p>
        <form action={boundAdjustStock}>
          <div className="form-row">
            <div>
              <label htmlFor="delta">Delta (+/-)</label>
              <input id="delta" name="delta" type="number" required style={{ width: '100%' }} />
            </div>
            <div>
              <label htmlFor="reason">Reason</label>
              <input id="reason" name="reason" placeholder="e.g. received shipment, damaged unit" style={{ width: '100%' }} />
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <button type="submit">Adjust stock</button>
          </div>
        </form>

        {adjustments && adjustments.length > 0 && (
          <>
            <h3 style={{ marginTop: 24 }}>Recent adjustments</h3>
            <table>
              <thead>
                <tr>
                  <th>Delta</th>
                  <th>Reason</th>
                  <th>When</th>
                </tr>
              </thead>
              <tbody>
                {adjustments.map((a) => (
                  <tr key={a.id}>
                    <td>{a.delta > 0 ? `+${a.delta}` : a.delta}</td>
                    <td>{a.reason || '—'}</td>
                    <td>{new Date(a.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
