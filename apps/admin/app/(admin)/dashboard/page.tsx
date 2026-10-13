import Link from 'next/link';
import { createServiceRoleClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const admin = createServiceRoleClient();

  const [
    { count: publishedCount },
    { count: draftCount },
    { data: lowStockRows },
    { data: recentOrders },
    { count: pendingCount },
    { count: paidCount },
  ] = await Promise.all([
    admin.from('products').select('id', { count: 'exact', head: true }).eq('status', 'published'),
    admin.from('products').select('id', { count: 'exact', head: true }).eq('status', 'draft'),
    admin
      .from('products')
      .select('id, name, stock_quantity, low_stock_threshold')
      .order('stock_quantity', { ascending: true }),
    admin
      .from('orders')
      .select('id, order_number, status, total_amount, created_at')
      .order('created_at', { ascending: false })
      .limit(10),
    admin.from('orders').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    admin.from('orders').select('id', { count: 'exact', head: true }).eq('status', 'paid'),
  ]);

  const lowStock = (lowStockRows || []).filter(
    (p) => p.stock_quantity <= p.low_stock_threshold
  );

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="stat-grid">
        <div className="stat-tile">
          <div className="value">{publishedCount ?? 0}</div>
          <div className="label">Published products</div>
        </div>
        <div className="stat-tile">
          <div className="value">{draftCount ?? 0}</div>
          <div className="label">Draft products</div>
        </div>
        <div className="stat-tile">
          <div className="value">{lowStock.length}</div>
          <div className="label">Low stock products</div>
        </div>
        <div className="stat-tile">
          <div className="value">{(pendingCount ?? 0) + (paidCount ?? 0)}</div>
          <div className="label">Pending + paid orders</div>
        </div>
      </div>

      <div className="card">
        <h2>Low stock products</h2>
        {lowStock.length === 0 ? (
          <p>No products at or below their low-stock threshold.</p>
        ) : (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Stock</th>
                  <th>Threshold</th>
                </tr>
              </thead>
              <tbody>
                {lowStock.slice(0, 10).map((p) => (
                  <tr key={p.id}>
                    <td>
                      <Link href={`/products/${p.id}/edit`}>{p.name}</Link>
                    </td>
                    <td>{p.stock_quantity}</td>
                    <td>{p.low_stock_threshold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="card">
        <h2>Recent orders</h2>
        {!recentOrders || recentOrders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id}>
                    <td>
                      <Link href={`/orders/${o.id}`}>{o.order_number}</Link>
                    </td>
                    <td>
                      <span className="badge">{o.status}</span>
                    </td>
                    <td>₹{Number(o.total_amount).toFixed(2)}</td>
                    <td>{new Date(o.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
