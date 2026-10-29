import { requireAdmin } from '@/lib/require-admin';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AdminBottomNav } from '@/components/layout/AdminBottomNav';
import { getCachedOrders, getCachedProducts } from '@/lib/catalog-store';
import { createServiceRoleClient } from '@/lib/supabase/server';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await requireAdmin();

  let ordersCount = getCachedOrders().length;
  let productsCount = getCachedProducts().length;

  try {
    const admin = createServiceRoleClient();
    const [{ count: dbOrdersCount }, { count: dbProductsCount }] = await Promise.all([
      admin.from('orders').select('id', { count: 'exact', head: true }),
      admin.from('products').select('id', { count: 'exact', head: true }),
    ]);
    if (typeof dbOrdersCount === 'number' && dbOrdersCount > 0) {
      ordersCount = dbOrdersCount;
    }
    if (typeof dbProductsCount === 'number' && dbProductsCount > 0) {
      productsCount = dbProductsCount;
    }
  } catch {}

  return (
    <div className="admin-shell">
      <AdminSidebar userEmail={profile.email} ordersCount={ordersCount} productsCount={productsCount} />

      <main className="admin-main">{children}</main>

      <AdminBottomNav userEmail={profile.email} ordersCount={ordersCount} productsCount={productsCount} />
    </div>
  );
}
