import { notFound } from 'next/navigation';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/require-admin';
import { ALLOWED_ORDER_TRANSITIONS } from '@/lib/order-transitions';
import { changeOrderStatus, updateTracking } from '../actions';

export const dynamic = 'force-dynamic';

export default async function OrderDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { error?: string; saved?: string };
}) {
  await requireAdmin();
  const admin = createServiceRoleClient();

  const [{ data: order }, { data: items }] = await Promise.all([
    admin.from('orders').select('*').eq('id', params.id).maybeSingle(),
    admin.from('order_items').select('*').eq('order_id', params.id),
  ]);

  if (!order) notFound();

  let customerEmail: string | null = null;
  if (order.user_id) {
    const { data: profile } = await admin.from('profiles').select('email').eq('id', order.user_id).maybeSingle();
    customerEmail = profile?.email ?? null;
  }

  const allowedNext = ALLOWED_ORDER_TRANSITIONS[order.status] || [];
  const trackableStatuses = ['processing', 'shipped', 'delivered'];
  const canEditTracking = trackableStatuses.includes(order.status);

  const boundChangeStatus = changeOrderStatus.bind(null, order.id);
  const boundUpdateTracking = updateTracking.bind(null, order.id);

  return (
    <div>
      <h1>Order {order.order_number}</h1>
      {searchParams.error && <p className="error">{searchParams.error}</p>}
      {searchParams.saved && <p className="success">Saved.</p>}

      <div className="card">
        <h2>Summary</h2>
        <p>
          Status: <span className="badge">{order.status}</span>
        </p>
        <p>Customer: {customerEmail || '—'}</p>
        <p>Payment method: {order.payment_method || '—'}</p>
        <p>Razorpay payment id: {order.razorpay_payment_id || '—'}</p>
        <p>
          Subtotal ₹{Number(order.subtotal).toFixed(2)} + Shipping ₹{Number(order.shipping).toFixed(2)} + Tax ₹
          {Number(order.tax).toFixed(2)} = <strong>Total ₹{Number(order.total_amount).toFixed(2)}</strong>
        </p>
        <p>Placed: {new Date(order.created_at).toLocaleString()}</p>
      </div>

      <div className="card">
        <h2>Line items (immutable)</h2>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Variant / Size</th>
                <th>Price</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              {(items || []).map((it) => (
                <tr key={it.id}>
                  <td>{it.product_name}</td>
                  <td>
                    {[it.selected_variant, it.selected_size].filter(Boolean).join(' / ') || '—'}
                  </td>
                  <td>₹{Number(it.price).toFixed(2)}</td>
                  <td>{it.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h2>Shipping address</h2>
        <pre style={{ whiteSpace: 'pre-wrap', fontSize: 13 }}>
          {JSON.stringify(order.shipping_address || {}, null, 2)}
        </pre>
      </div>

      <div className="card">
        <h2>Change status</h2>
        {allowedNext.length === 0 ? (
          <p>No further transitions are allowed from &quot;{order.status}&quot;.</p>
        ) : (
          <form action={boundChangeStatus}>
            <select name="next_status" defaultValue={allowedNext[0]}>
              {allowedNext.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <button type="submit" style={{ marginLeft: 12 }}>
              Update status
            </button>
          </form>
        )}
      </div>

      <div className="card">
        <h2>Tracking</h2>
        {!canEditTracking && <p>Tracking fields unlock once the order is processing or later.</p>}
        <form action={boundUpdateTracking}>
          <div className="form-row">
            <div>
              <label htmlFor="tracking_number">Tracking number</label>
              <input
                id="tracking_number"
                name="tracking_number"
                defaultValue={order.tracking_number || ''}
                disabled={!canEditTracking}
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label htmlFor="carrier">Carrier</label>
              <input
                id="carrier"
                name="carrier"
                defaultValue={order.carrier || ''}
                disabled={!canEditTracking}
                style={{ width: '100%' }}
              />
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <button type="submit" disabled={!canEditTracking}>
              Save tracking info
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
