import Link from 'next/link';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/require-admin';
import { getCachedProducts, getCachedOrders } from '@/lib/catalog-store';

import { RevenueSplineChart } from '@/components/dashboard/RevenueSplineChart';
import { MiniCalendarWidget } from '@/components/dashboard/MiniCalendarWidget';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  await requireAdmin();

  let publishedCount = 0;
  let draftCount = 0;
  let lowStockRows: any[] = [];
  let dbOrders: any[] = [];

  try {
    const admin = createServiceRoleClient();
    const [
      resPublished,
      resDraft,
      resLowStock,
      resOrders,
    ] = await Promise.all([
      admin.from('products').select('id', { count: 'exact', head: true }).eq('status', 'published'),
      admin.from('products').select('id', { count: 'exact', head: true }).eq('status', 'draft'),
      admin.from('products').select('id, name, stock_quantity, low_stock_threshold').order('stock_quantity', { ascending: true }),
      admin.from('orders').select('id, order_number, status, total_amount, created_at, user_id, shipping_address, customer_name, customer_email, payment_method').order('created_at', { ascending: false }).limit(100),
    ]);

    publishedCount = resPublished.count || 0;
    draftCount = resDraft.count || 0;
    lowStockRows = resLowStock.data || [];
    dbOrders = resOrders.data || [];
  } catch (err) {
    // Supabase endpoint fallback
  }

  // Fallback to verified Oriental Sports store records if Supabase has 0 products
  if (publishedCount === 0) {
    const cachedProducts = getCachedProducts();
    publishedCount = cachedProducts.filter((p) => p.status === 'published').length;
    draftCount = cachedProducts.filter((p) => p.status === 'draft').length;
    lowStockRows = cachedProducts.map((p) => ({
      id: p.id,
      name: p.name,
      stock_quantity: p.stock_quantity,
      low_stock_threshold: p.low_stock_threshold,
    }));
  }

  // Merge live database orders with cached / synced store orders (deduplicate by order_number)
  const cachedOrders = getCachedOrders();
  const allOrders: any[] = [...dbOrders];
  const existingOrderNumbers = new Set(allOrders.map((o) => o.order_number || o.id));

  for (const c of cachedOrders) {
    if (!existingOrderNumbers.has(c.order_number) && !existingOrderNumbers.has(c.id)) {
      allOrders.push(c);
    }
  }

  // Sort latest orders first
  allOrders.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());

  // Real orders that count toward gross revenue (verified checkouts)
  const revenueOrders = allOrders.filter((o) =>
    ['confirmed', 'paid', 'processing', 'shipped', 'delivered'].includes((o.status || '').toLowerCase())
  );

  // 1. Calculate Real Gross Revenue (₹)
  const totalIncome = revenueOrders.reduce(
    (acc, curr) => acc + Number(curr.total_amount || 0),
    0
  );

  // 2. Real Order Counts
  const totalOrdersCount = allOrders.length;
  const paidOrdersCount = revenueOrders.length;
  const averageOrderValue = paidOrdersCount > 0 ? totalIncome / paidOrdersCount : 0;

  const paidCount = allOrders.filter((o) =>
    ['paid', 'confirmed'].includes((o.status || '').toLowerCase())
  ).length;
  const processingCount = allOrders.filter((o) =>
    (o.status || '').toLowerCase() === 'processing'
  ).length;

  const recentOrders = allOrders.slice(0, 6);

  // 3. Filter low-stock items
  const lowStock = (lowStockRows || []).filter(
    (p) => p.stock_quantity <= p.low_stock_threshold
  );

  return (
    <div style={{ maxWidth: 1420, margin: '0 auto' }}>
      {/* Top Operations Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: '-0.015em', color: 'var(--ink-heading)' }}>
              Operations Dashboard
            </h1>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.06em',
                padding: '3px 10px',
                borderRadius: 9999,
                background: 'rgba(46,107,60,0.10)',
                color: 'var(--success)',
                border: '1px solid rgba(46,107,60,0.18)',
              }}
            >
              ● Store Live
            </span>
          </div>
          <p style={{ margin: 0, fontSize: 13.5, color: 'var(--muted)', fontWeight: 400 }}>
            Welcome back, Oriental Sports Pune · Camp Store order intake & live court fulfillment.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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
      </div>

      {/* Floating White KPI Stat Cards (Minimalist, Calm Typography) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 18,
          marginBottom: 24,
        }}
      >
        {/* KPI 1: Total Revenue */}
        <div
          className="admin-card"
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: 'var(--subtle)', letterSpacing: '0.06em', marginBottom: 10 }}>
            Gross Revenue
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: 'var(--ink-heading)',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.015em',
              marginBottom: 8,
              lineHeight: 1.15,
            }}
          >
            ₹{totalIncome.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: 'var(--success)', fontWeight: 600 }}>+{paidOrdersCount} completed</span>
            <span>· Pune online orders</span>
          </div>
        </div>

        {/* KPI 2: Total Orders */}
        <div
          className="admin-card"
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: 'var(--subtle)', letterSpacing: '0.06em', marginBottom: 10 }}>
            Total Orders
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: 'var(--ink-heading)',
              letterSpacing: '-0.015em',
              marginBottom: 8,
              lineHeight: 1.15,
            }}
          >
            {totalOrdersCount} Carts
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>
            <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{(paidCount ?? 0) + (processingCount ?? 0)} in active</span> fulfillment pipeline
          </div>
        </div>

        {/* KPI 3: Average Order Value */}
        <div
          className="admin-card"
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: 'var(--subtle)', letterSpacing: '0.06em', marginBottom: 10 }}>
            Average Basket
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: 'var(--ink-heading)',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.015em',
              marginBottom: 8,
              lineHeight: 1.15,
            }}
          >
            ₹{averageOrderValue.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>
            High-ticket equipment & systems
          </div>
        </div>

        {/* KPI 4: Active SKUs */}
        <div
          className="admin-card"
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: 'var(--subtle)', letterSpacing: '0.06em', marginBottom: 10 }}>
            Catalog Disciplines
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: 'var(--ink-heading)',
              letterSpacing: '-0.015em',
              marginBottom: 8,
              lineHeight: 1.15,
            }}
          >
            {publishedCount} SKUs
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>
            <span>{draftCount} review drafts</span> · <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{lowStock.length} low threshold</span>
          </div>
        </div>
      </div>

      {/* Main Core: 2-Column Split (Buyur Layout: 65% Chart & Orders / 35% Calendar & Widgets) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 350px',
          gap: 24,
          alignItems: 'start',
        }}
        className="buyur-dashboard-core"
      >
        {/* Left Column (Chart + Orders Table) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, minWidth: 0 }}>
          {/* 1. Spline Revenue Chart Component */}
          <RevenueSplineChart totalRevenue={totalIncome} orders={revenueOrders} />

          {/* 2. Recent Customer Orders Card */}
          <div
            className="admin-card"
            style={{
              boxShadow: '0 8px 30px -4px rgba(17, 17, 17, 0.04)',
              minWidth: 0,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 12,
                marginBottom: 20,
              }}
            >
              <div>
                <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, letterSpacing: '-0.01em' }}>
                  Recent Athlete Customer Orders
                </h2>
                <p style={{ margin: '3px 0 0', fontSize: 12, color: 'var(--muted)' }}>
                  Live verified customer checkouts from Camp Pune online store
                </p>
              </div>

              <Link
                href="/orders"
                style={{
                  fontSize: 12.5,
                  fontWeight: 700,
                  color: 'var(--ink)',
                  padding: '6px 14px',
                  borderRadius: 9999,
                  background: 'var(--stone)',
                  textDecoration: 'none',
                  flexShrink: 0,
                }}
              >
                View all orders →
              </Link>
            </div>

            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', minWidth: 0 }}>
              <table style={{ width: '100%', minWidth: 500, borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(17,17,17,0.06)' }}>
                    <th style={{ padding: '10px 14px', fontSize: 10.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--subtle)', background: 'transparent' }}>
                      Order #
                    </th>
                    <th style={{ padding: '10px 14px', fontSize: 10.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--subtle)', background: 'transparent' }}>
                      Customer Contact
                    </th>
                    <th style={{ padding: '10px 14px', fontSize: 10.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--subtle)', background: 'transparent' }}>
                      Status
                    </th>
                    <th style={{ padding: '10px 14px', fontSize: 10.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--subtle)', background: 'transparent' }}>
                      Amount
                    </th>
                    <th style={{ textAlign: 'right', padding: '10px 14px', fontSize: 10.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--subtle)', background: 'transparent' }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '36px 14px', color: 'var(--muted)', fontSize: 13 }}>
                        No orders logged yet. Customer purchases will appear here in real-time.
                      </td>
                    </tr>
                  )}
                  {recentOrders.map((o) => {
                    const customerName =
                      o.customer_name ||
                      (o.shipping_address as any)?.name ||
                      (o.shipping_address as any)?.fullName ||
                      'Athlete Customer';
                    const customerEmail =
                      o.customer_email ||
                      (o.shipping_address as any)?.email ||
                      'athlete@orientalsports.in';

                    return (
                      <tr key={o.id} style={{ borderBottom: '1px solid rgba(17,17,17,0.04)' }}>
                        <td style={{ padding: '14px 14px' }}>
                          <Link href={`/orders/${o.id}`} style={{ fontWeight: 800, color: 'var(--ink)' }}>
                            {o.order_number}
                          </Link>
                          <div style={{ fontSize: 11, color: 'var(--subtle)', marginTop: 2 }}>
                            {new Date(o.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                          </div>
                        </td>

                        <td style={{ padding: '14px 14px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div
                              style={{
                                width: 30,
                                height: 30,
                                borderRadius: '50%',
                                background: 'var(--stone)',
                                color: 'var(--ink)',
                                display: 'grid',
                                placeItems: 'center',
                                fontWeight: 800,
                                fontSize: 12,
                                flexShrink: 0,
                              }}
                            >
                              {customerName.charAt(0).toUpperCase()}
                            </div>
                            <div style={{ minWidth: 0 }}>
                              <div style={{ fontWeight: 700, color: 'var(--ink)', fontSize: 13, whiteSpace: 'nowrap' }}>
                                {customerName}
                              </div>
                              <div style={{ fontSize: 11, color: 'var(--subtle)', whiteSpace: 'nowrap' }}>
                                {customerEmail}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td style={{ padding: '14px 14px' }}>
                          <span
                            className={`badge ${o.status}`}
                            style={{
                              fontSize: 10.5,
                              padding: '3px 9px',
                              borderRadius: 9999,
                              fontWeight: 800,
                              textTransform: 'uppercase',
                            }}
                          >
                            {o.status}
                          </span>
                        </td>

                        <td style={{ padding: '14px 14px', fontWeight: 800, fontVariantNumeric: 'tabular-nums', fontSize: 13.5 }}>
                          ₹{Number(o.total_amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </td>

                        <td style={{ textAlign: 'right', padding: '14px 14px' }}>
                          <Link href={`/orders/${o.id}`}>
                            <button
                              style={{
                                minHeight: 30,
                                padding: '4px 14px',
                                fontSize: 11.5,
                                fontWeight: 700,
                                borderRadius: 9999,
                                background: 'var(--stone)',
                                border: 'none',
                                color: 'var(--ink)',
                                cursor: 'pointer',
                                boxShadow: 'none',
                              }}
                            >
                              Inspect
                            </button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (Mini Calendar + Inventory Health Alert) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, minWidth: 0 }}>
          {/* 1. Interactive Mini Calendar Widget */}
          <MiniCalendarWidget />

          {/* 2. Low Stock Warnings Card */}
          <div
            className="admin-card"
            style={{
              boxShadow: '0 8px 30px -4px rgba(17, 17, 17, 0.04)',
              minWidth: 0,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 16,
              }}
            >
              <h3 style={{ margin: 0, fontSize: 14.5, fontWeight: 800 }}>Low Stock Warnings</h3>
              <span
                style={{
                  fontSize: 10.5,
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: 9999,
                  background: 'var(--stone)',
                  color: 'var(--ink)',
                }}
              >
                {lowStock.length} Items
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {lowStock.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    background: 'var(--stone)',
                    borderRadius: 16,
                  }}
                >
                  <div style={{ minWidth: 0, flex: 1, paddingRight: 8 }}>
                    <Link
                      href={`/products/${p.id}/edit`}
                      style={{
                        fontSize: 12.5,
                        fontWeight: 700,
                        color: 'var(--ink)',
                        display: 'block',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {p.name}
                    </Link>
                    <div style={{ fontSize: 10.5, color: 'var(--subtle)' }}>
                      Threshold: {p.low_stock_threshold} units
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 900,
                        color: p.stock_quantity === 0 ? 'var(--error)' : 'var(--ink)',
                      }}
                    >
                      {p.stock_quantity} left
                    </span>
                    <div>
                      <Link
                        href={`/products/${p.id}/edit`}
                        style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)' }}
                      >
                        Restock →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
