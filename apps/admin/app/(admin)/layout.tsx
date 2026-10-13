import Link from 'next/link';
import { requireAdmin } from '@/lib/require-admin';

/**
 * Shared layout for every admin-only route (dashboard, products, categories,
 * orders). `requireAdmin()` runs server-side on every request to a route
 * under this group — no session redirects to /login, a session without
 * `profiles.role === 'admin'` redirects to /not-authorized. This is a
 * regular Server Component layout (re-executed per navigation/request), not
 * client-side state, so it cannot be bypassed by disabling JS or editing
 * client state.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await requireAdmin();

  return (
    <div className="admin-shell">
      <nav className="admin-nav">
        <strong style={{ display: 'block', marginBottom: 16, color: '#fff' }}>Oriental Sports Admin</strong>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/products">Products</Link>
        <Link href="/categories">Categories</Link>
        <Link href="/orders">Orders</Link>
        <div style={{ marginTop: 24, fontSize: 12, color: '#999' }}>
          Signed in as {profile.email}
        </div>
      </nav>
      <main className="admin-main">{children}</main>
    </div>
  );
}
