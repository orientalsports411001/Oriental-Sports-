import { requireAdmin } from '@/lib/require-admin';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AdminBottomNav } from '@/components/layout/AdminBottomNav';
import { getCachedOrders, getCachedProducts } from '@/lib/catalog-store';
import { createServiceRoleClient } from '@/lib/supabase/server';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await requireAdmin();

  let ordersCount = getCachedOrders().length;
  const cachedProducts = getCachedProducts();
  let productsCount = cachedProducts.length;

  try {
    const admin = createServiceRoleClient();
    const { data: dbProducts } = await admin.from('products').select('id, slug');
    if (Array.isArray(dbProducts) && dbProducts.length > 0) {
      const seen = new Set<string>();
      for (const p of cachedProducts) {
        if (p.id) seen.add(p.id);
        if (p.slug) seen.add(p.slug);
      }
      let extra = 0;
      for (const p of dbProducts) {
        if (!seen.has(p.id) && !seen.has(p.slug)) {
          extra++;
          if (p.id) seen.add(p.id);
          if (p.slug) seen.add(p.slug);
        }
      }
      productsCount = cachedProducts.length + extra;
    }
  } catch {}

  try {
    const admin = createServiceRoleClient();
    const { count: dbOrdersCount } = await admin.from('orders').select('id', { count: 'exact', head: true });
    if (typeof dbOrdersCount === 'number' && dbOrdersCount > 0) {
      ordersCount = dbOrdersCount;
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
