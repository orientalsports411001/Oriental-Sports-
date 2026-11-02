import { requireAdmin } from '@/lib/require-admin';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AdminBottomNav } from '@/components/layout/AdminBottomNav';
import { getAdminNavCounts } from '@/lib/nav-counts';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await requireAdmin();
  const { productsCount, ordersCount } = await getAdminNavCounts();

  return (
    <div className="admin-shell">
      <AdminSidebar userEmail={profile.email} ordersCount={ordersCount} productsCount={productsCount} />

      <main className="admin-main">{children}</main>

      <AdminBottomNav userEmail={profile.email} ordersCount={ordersCount} productsCount={productsCount} />
    </div>
  );
}
