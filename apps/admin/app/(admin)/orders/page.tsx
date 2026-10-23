import Link from 'next/link';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/require-admin';
import { getCachedOrders } from '@/lib/catalog-store';

export const dynamic = 'force-dynamic';

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: { q?: string; status?: string; from?: string; to?: string };
}) {
  await requireAdmin();

  let orders: any[] = [];
  let profileMap = new Map();

  try {
    const admin = createServiceRoleClient();
    let query = admin
      .from('orders')
      .select('id, order_number, status, total_amount, payment_method, shipping_address, created_at, user_id');

    if (searchParams.status) {
      query = query.eq('status', searchParams.status);
    }
    if (searchParams.from) {
      query = query.gte('created_at', searchParams.from);
    }
    if (searchParams.to) {
      query = query.lte('created_at', searchParams.to);
    }

    if (searchParams.q) {
      const q = searchParams.q.trim();
      const { data: matchingProfiles } = await admin
        .from('profiles')
        .select('id')
        .or(`email.ilike.%${q}%,first_name.ilike.%${q}%,last_name.ilike.%${q}%,phone.ilike.%${q}%`);
      const profileIds = (matchingProfiles || []).map((p) => p.id);

      if (profileIds.length > 0) {
        query = query.or(`order_number.ilike.%${q}%,user_id.in.(${profileIds.join(',')})`);
      } else {
        query = query.ilike('order_number', `%${q}%`);
      }
    }

    const { data: dbOrders } = await query.order('created_at', { ascending: false }).limit(100);

    if (dbOrders && dbOrders.length > 0) {
      orders = dbOrders;
      const userIds = Array.from(new Set(orders.map((o) => o.user_id).filter(Boolean)));
      if (userIds.length > 0) {
        const { data: profiles } = await admin
          .from('profiles')
          .select('id, email, first_name, last_name, phone')
          .in('id', userIds as string[]);
        profileMap = new Map((profiles || []).map((p) => [p.id, p]));
      }
    }
  } catch (err) {
    // Supabase fallback
  }

  // Fallback to Oriental Sports store orders
  if (orders.length === 0) {
    let all = getCachedOrders();

    if (searchParams.status) {
      all = all.filter((o) => o.status === searchParams.status);
    }
    if (searchParams.from) {
      all = all.filter((o) => o.created_at >= searchParams.from!);
    }
    if (searchParams.to) {
      all = all.filter((o) => o.created_at <= searchParams.to!);
    }
    if (searchParams.q) {
      const q = searchParams.q.toLowerCase();
      all = all.filter(
        (o) =>
          o.order_number.toLowerCase().includes(q) ||
          o.customer_name.toLowerCase().includes(q) ||
          o.customer_email.toLowerCase().includes(q) ||
          o.customer_phone.includes(q)
      );
    }

    orders = all;
  }

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
              Customer Orders Register
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
              {orders.length} Logged
            </span>
          </div>
          <p style={{ margin: 0, fontSize: 13.5, color: 'var(--muted)', fontWeight: 400 }}>
            Live customer purchase feed, address verification, and delivery dispatch.
          </p>
        </div>
      </div>

      {/* Clean Search & Filter Form (No decorative icons) */}
      <form
        method="get"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          flexWrap: 'wrap',
          marginBottom: 24,
        }}
      >
        <div style={{ flex: 1, minWidth: 260 }}>
          <input
            type="text"
            name="q"
            placeholder="Search by order #, athlete name, email, or phone..."
            defaultValue={searchParams.q}
            style={{
              width: '100%',
              padding: '10px 16px',
              fontSize: 13,
              borderRadius: 12,
              border: '1px solid rgba(17,17,17,0.1)',
              background: '#FFFFFF',
              color: 'var(--ink)',
              outline: 'none',
            }}
          />
        </div>

        <select
          name="status"
          defaultValue={searchParams.status || ''}
          style={{
            height: 40,
            padding: '0 16px',
            fontSize: 12.5,
            fontWeight: 600,
            borderRadius: 12,
            border: '1px solid rgba(17,17,17,0.1)',
            background: '#FFFFFF',
            color: 'var(--ink)',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <option value="">All Statuses</option>
          {['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'].map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>

        <button
          type="submit"
          style={{
            height: 40,
            padding: '0 20px',
            fontSize: 12.5,
            fontWeight: 800,
            borderRadius: 12,
            background: 'var(--ink)',
            color: 'var(--ivory)',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Filter
        </button>

        {(searchParams.q || searchParams.status || searchParams.from || searchParams.to) && (
          <Link
            href="/orders"
            style={{
              height: 40,
              padding: '0 16px',
              fontSize: 12,
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              borderRadius: 12,
              background: 'var(--stone)',
              color: 'var(--ink)',
              textDecoration: 'none',
            }}
          >
            Reset
          </Link>
        )}
      </form>

      {/* Orders Data Table */}
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
              <tr style={{ borderBottom: '1px solid rgba(38, 41, 46, 0.06)' }}>
                <th style={{ padding: '14px 20px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--subtle)', background: 'transparent' }}>
                  Order #
                </th>
                <th style={{ padding: '14px 20px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--subtle)', background: 'transparent' }}>
                  Customer
                </th>
                <th style={{ padding: '14px 20px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--subtle)', background: 'transparent' }}>
                  Status
                </th>
                <th style={{ padding: '14px 20px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--subtle)', background: 'transparent' }}>
                  Settlement
                </th>
                <th style={{ padding: '14px 20px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--subtle)', background: 'transparent' }}>
                  Total
                </th>
                <th style={{ padding: '14px 20px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--subtle)', background: 'transparent' }}>
                  Placed On
                </th>
                <th style={{ textAlign: 'right', padding: '14px 20px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--subtle)', background: 'transparent' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => {
                const profile = profileMap.get(o.user_id);
                const customerName =
                  o.customer_name ||
                  (profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : null) ||
                  (o.shipping_address as any)?.name ||
                  (o.shipping_address as any)?.fullName ||
                  'Pune Athlete';
                const customerEmail =
                  o.customer_email ||
                  profile?.email ||
                  (o.shipping_address as any)?.email ||
                  '—';
                const customerPhone =
                  o.customer_phone ||
                  profile?.phone ||
                  (o.shipping_address as any)?.phone ||
                  '';

                return (
                  <tr key={o.id} style={{ borderBottom: '1px solid rgba(17,17,17,0.04)' }}>
                    <td style={{ padding: '16px 20px' }}>
                      <Link href={`/orders/${o.id}`} style={{ fontWeight: 800, fontSize: 14, color: 'var(--ink)', textDecoration: 'none' }}>
                        {o.order_number}
                      </Link>
                    </td>

                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontWeight: 700, color: 'var(--ink)', fontSize: 13.5 }}>
                        {customerName}
                      </div>
                      <div style={{ fontSize: 11.5, color: 'var(--subtle)', marginTop: 2 }}>
                        {customerEmail} {customerPhone ? `· ${customerPhone}` : ''}
                      </div>
                    </td>

                    <td style={{ padding: '16px 20px' }}>
                      <span
                        className={`badge ${o.status}`}
                        style={{
                          fontSize: 11,
                          padding: '3px 9px',
                          borderRadius: 9999,
                          fontWeight: 700,
                          textTransform: 'capitalize',
                        }}
                      >
                        {o.status}
                      </span>
                    </td>

                    <td style={{ padding: '16px 20px', fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase' }}>
                      {o.payment_method || 'Online Card / UPI'}
                    </td>

                    <td style={{ padding: '16px 20px', fontWeight: 800, fontSize: 14, fontVariantNumeric: 'tabular-nums', color: 'var(--ink)' }}>
                      ₹{Number(o.total_amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>

                    <td style={{ padding: '16px 20px', color: 'var(--muted)', fontSize: 12.5 }}>
                      {new Date(o.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>

                    <td style={{ textAlign: 'right', padding: '16px 20px' }}>
                      <Link
                        href={`/orders/${o.id}`}
                        style={{
                          fontSize: 12.5,
                          fontWeight: 700,
                          color: 'var(--ink)',
                          textDecoration: 'none',
                        }}
                      >
                        Inspect
                      </Link>
                    </td>
                  </tr>
                );
              })}

              {(!orders || orders.length === 0) && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--muted)' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>No orders found</div>
                    <p style={{ margin: '4px 0 0', fontSize: 12.5, color: 'var(--subtle)' }}>
                      No orders match the specified filter parameters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
