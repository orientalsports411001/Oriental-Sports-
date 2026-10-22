import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/require-admin';
import { getCachedOrders } from '@/lib/catalog-store';
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

  let order: any = null;
  let items: any[] = [];
  let customerProfile: { email: string | null; first_name: string | null; last_name: string | null; phone: string | null } | null = null;

  try {
    const admin = createServiceRoleClient();
    const [{ data: dbOrder }, { data: dbItems }] = await Promise.all([
      admin.from('orders').select('*').eq('id', params.id).maybeSingle(),
      admin.from('order_items').select('*').eq('order_id', params.id),
    ]);

    if (dbOrder) {
      order = dbOrder;
      items = dbItems || [];
      if (order.user_id) {
        const { data: profile } = await admin
          .from('profiles')
          .select('email, first_name, last_name, phone')
          .eq('id', order.user_id)
          .maybeSingle();
        customerProfile = profile;
      }
    }
  } catch (err) {
    // Supabase unavailable, fallback to memory orders
  }

  if (!order) {
    const fallback = getCachedOrders().find((o) => o.id === params.id || o.order_number === params.id);
    if (!fallback) notFound();
    order = {
      ...fallback,
      subtotal: fallback.subtotal,
      shipping: fallback.shipping,
      tax: fallback.tax,
      total_amount: fallback.total_amount,
    };
    items = fallback.items.map((it, idx) => ({
      id: `it-${idx}`,
      product_name: it.product_name,
      price: it.price,
      quantity: it.quantity,
      selected_variant: it.selected_variant || 'Standard',
    }));
  }

  const allowedNext = ALLOWED_ORDER_TRANSITIONS[order.status] || [];
  const trackableStatuses = ['processing', 'shipped', 'delivered'];
  const canEditTracking = trackableStatuses.includes(order.status);

  const boundChangeStatus = changeOrderStatus.bind(null, order.id);
  const boundUpdateTracking = updateTracking.bind(null, order.id);

  const addr = (order.shipping_address as any) || {};
  const customerName =
    order.customer_name ||
    [customerProfile?.first_name, customerProfile?.last_name].filter(Boolean).join(' ') ||
    addr.name ||
    addr.fullName ||
    'Athlete Customer';
  const customerEmail = order.customer_email || customerProfile?.email || addr.email || 'No email provided';
  const customerPhone = order.customer_phone || customerProfile?.phone || addr.phone || addr.phoneNumber || 'No phone provided';

  return (
    <div>
      <div className="toolbar" style={{ justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 4 }}>
            <Link href="/orders" style={{ fontWeight: 600 }}>← Back to Orders List</Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h1 style={{ margin: 0 }}>Order {order.order_number}</h1>
            <span className={`badge ${order.status}`} style={{ fontSize: 13, padding: '4px 12px' }}>
              {order.status}
            </span>
          </div>
        </div>
        <div style={{ color: 'var(--muted)', fontSize: 13 }}>
          Placed: {new Date(order.created_at).toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'short' })}
        </div>
      </div>

      {searchParams.error && <p className="error">{searchParams.error}</p>}
      {searchParams.saved && <p className="success">Order updated successfully.</p>}

      {/* Grid: Customer Details & Financial Receipt */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, marginBottom: 24 }}>
        {/* Customer Dossier */}
        <div className="card" style={{ margin: 0 }}>
          <h2>Customer Information</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
            <div>
              <span style={{ color: 'var(--subtle)', display: 'block', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                Customer Name
              </span>
              <strong style={{ fontSize: 16, color: 'var(--ink)' }}>{customerName}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--subtle)', display: 'block', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                Email Address
              </span>
              <span style={{ color: 'var(--ink)' }}>{customerEmail}</span>
            </div>
            <div>
              <span style={{ color: 'var(--subtle)', display: 'block', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                Phone Number
              </span>
              <span style={{ color: 'var(--ink)', fontWeight: 700 }}>{customerPhone}</span>
            </div>
            <div>
              <span style={{ color: 'var(--subtle)', display: 'block', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                Customer Account
              </span>
              <span style={{ color: 'var(--muted)', fontSize: 12 }}>{order.user_id || 'Guest Checkout'}</span>
            </div>
          </div>
        </div>

        {/* Financial Breakdown */}
        <div className="card" style={{ margin: 0 }}>
          <h2>Payment & Settlement</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 6, borderBottom: '1px solid var(--line)' }}>
              <span style={{ color: 'var(--muted)' }}>Payment Method</span>
              <strong style={{ textTransform: 'uppercase', color: 'var(--ink)' }}>{order.payment_method || 'Razorpay / UPI'}</strong>
            </div>
            {order.razorpay_payment_id && (
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 6, borderBottom: '1px solid var(--line)' }}>
                <span style={{ color: 'var(--muted)' }}>Razorpay Payment ID</span>
                <code>{order.razorpay_payment_id}</code>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--muted)' }}>Subtotal</span>
              <span style={{ color: 'var(--ink)' }}>₹{Number(order.subtotal).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--muted)' }}>Shipping Fee</span>
              <span style={{ color: 'var(--ink)' }}>₹{Number(order.shipping).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--muted)' }}>Tax (GST)</span>
              <span style={{ color: 'var(--ink)' }}>₹{Number(order.tax).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid var(--line-strong)', fontSize: 18 }}>
              <strong style={{ color: 'var(--ink)' }}>Grand Total</strong>
              <strong style={{ color: 'var(--ink)' }}>₹{Number(order.total_amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Ordered Line Items */}
      <div className="card">
        <h2>Ordered Items ({items?.length || 0})</h2>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Item Description</th>
                <th>Selected Specification</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th style={{ textAlign: 'right' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {(items || []).map((it) => (
                <tr key={it.id}>
                  <td style={{ fontWeight: 700, color: 'var(--ink)' }}>{it.product_name}</td>
                  <td>
                    <span style={{ color: 'var(--muted)' }}>
                      {[it.selected_variant, it.selected_size].filter(Boolean).join(' · ') || 'Standard / Default'}
                    </span>
                  </td>
                  <td>₹{Number(it.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td style={{ fontWeight: 700 }}>{it.quantity}</td>
                  <td style={{ textAlign: 'right', fontWeight: 800, color: 'var(--ink)' }}>
                    ₹{(Number(it.price) * it.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="card">
        <h2>Delivery Destination</h2>
        {addr && Object.keys(addr).length > 0 ? (
          <div style={{ lineHeight: 1.6, color: 'var(--ink)', fontSize: 15 }}>
            <div><strong>{addr.name || customerName}</strong></div>
            <div>{addr.street || addr.addressLine1 || addr.address || ''} {addr.apartment || addr.addressLine2 || ''}</div>
            <div>{addr.city ? `${addr.city}, ` : ''}{addr.state || ''} {addr.postalCode || addr.pincode || ''}</div>
            <div style={{ color: 'var(--muted)' }}>{addr.country || 'India'}</div>
            {(addr.phone || customerPhone) && <div style={{ color: 'var(--muted)', marginTop: 4, fontWeight: 600 }}>Contact: {addr.phone || customerPhone}</div>}
          </div>
        ) : (
          <p style={{ color: 'var(--muted)' }}>No structured delivery address attached to this order.</p>
        )}
      </div>

      {/* Order Status Management & Tracking */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
        {/* Status Transition Card */}
        <div className="card" style={{ margin: 0 }}>
          <h2>Order Lifecycle Status</h2>
          {allowedNext.length === 0 ? (
            <p style={{ color: 'var(--muted)' }}>
              This order has reached terminal status: <strong>{order.status}</strong>.
            </p>
          ) : (
            <form action={boundChangeStatus}>
              <label htmlFor="next_status">Advance Order To Next Stage</label>
              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <select id="next_status" name="next_status" defaultValue={allowedNext[0]} style={{ flex: 1 }}>
                  {allowedNext.map((s) => (
                    <option key={s} value={s}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </option>
                  ))}
                </select>
                <button type="submit">Update Status</button>
              </div>
            </form>
          )}
        </div>

        {/* Courier & Tracking Details Card */}
        <div className="card" style={{ margin: 0 }}>
          <h2>Courier & Live Tracking</h2>
          {!canEditTracking && (
            <p style={{ color: 'var(--subtle)', fontSize: 13, marginBottom: 12 }}>
              Tracking fields unlock once the order enters processing or dispatch.
            </p>
          )}
          <form action={boundUpdateTracking}>
            <div className="form-row">
              <div>
                <label htmlFor="carrier">Logistics Carrier</label>
                <input
                  id="carrier"
                  name="carrier"
                  placeholder="e.g. Blue Dart, Delhivery, DTDC"
                  defaultValue={order.carrier || ''}
                  disabled={!canEditTracking}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label htmlFor="tracking_number">Tracking / AWB Number</label>
                <input
                  id="tracking_number"
                  name="tracking_number"
                  placeholder="e.g. BLD1234890"
                  defaultValue={order.tracking_number || ''}
                  disabled={!canEditTracking}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <button type="submit" className="secondary" disabled={!canEditTracking}>
                Save Courier Info
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
