import { requireAdmin } from '@/lib/require-admin';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AdminBottomNav } from '@/components/layout/AdminBottomNav';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await requireAdmin();

  return (
    <div className="admin-shell">
      <AdminSidebar userEmail={profile.email} />

      <main className="admin-main">{children}</main>

      <AdminBottomNav userEmail={profile.email} />
    </div>
  );
}
