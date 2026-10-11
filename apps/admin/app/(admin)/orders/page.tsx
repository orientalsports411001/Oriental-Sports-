import { createServiceRoleClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/require-admin';

export const dynamic = 'force-dynamic';

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: { q?: string; status?: string; from?: string; to?: string };
}) {
  await requireAdmin();
  const admin = createServiceRoleClient();

  let query = admin
    .from('orders')
    .select('id, order_number, status, total_amount, created_at, user_id');

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
    // Text search on order_number OR the customer's profile email.
    const { data: matchingProfiles } = await admin
      .from('profiles')
      .select('id')
      .ilike('email', `%${q}%`);
    const profileIds = (matchingProfiles || []).map((p) => p.id);

    if (profileIds.length > 0) {
      query = query.or(`order_number.ilike.%${q}%,user_id.in.(${profileIds.join(',')})`);
    } else {
      query = query.ilike('order_number', `%${q}%`);
    }
  }

  const { data: orders } = await query.order('created_at', { ascending: false }).limit(100);

  const userIds = Array.from(new Set((orders || []).map((o) => o.user_id).filter(Boolean)));
  const { data: profiles } =
    userIds.length > 0
      ? await admin.from('profiles').select('id, email').in('id', userIds as string[])
      : { data: [] as { id: string; email: string | null }[] };
  const emailByUserId = new Map((profiles || []).map((p) => [p.id, p.email]));

  return (
    <div>
      <h1>Orders</h1>

      <form className="toolbar card" method="get">
        <input type="text" name="q" placeholder="Order # or customer email" defaultValue={searchParams.q} />
        <select name="status" defaultValue={searchParams.status || ''}>
          <option value="">All statuses</option>
          {['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'failed'].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <label style={{ margin: 0 }}>
          From <input type="date" name="from" defaultValue={searchParams.from} />
        </label>
        <label style={{ margin: 0 }}>
          To <input type="date" name="to" defaultValue={searchParams.to} />
        </label>
        <button type="submit">Filter</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Order #</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Total</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {(orders || []).map((o) => (
            <tr key={o.id}>
              <td>
                <a href={`/orders/${o.id}`}>{o.order_number}</a>
              </td>
              <td>{(o.user_id && emailByUserId.get(o.user_id)) || '—'}</td>
              <td>
                <span className="badge">{o.status}</span>
              </td>
              <td>₹{Number(o.total_amount).toFixed(2)}</td>
              <td>{new Date(o.created_at).toLocaleString()}</td>
            </tr>
          ))}
          {(!orders || orders.length === 0) && (
            <tr>
              <td colSpan={5}>No orders match these filters.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
