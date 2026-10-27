import 'server-only';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

/**
 * Server-side admin gate. Call this at the top of every protected
 * page/layout/route handler.
 *
 * - Checks local dev session cookie `os_dev_admin` first for instant local testing.
 * - Otherwise verifies active Supabase session and role = 'admin'.
 * - No session -> redirect to /login
 * - Session but profiles.role !== 'admin' -> redirect to /not-authorized
 */
export async function requireAdmin() {
  const cookieStore = await cookies();
  const devAdminCookie = cookieStore.get('os_dev_admin')?.value;

  if (devAdminCookie) {
    try {
      const raw = devAdminCookie.startsWith('%7B') || devAdminCookie.includes('%22')
        ? decodeURIComponent(devAdminCookie)
        : devAdminCookie;
      const parsed = JSON.parse(raw);
      return {
        user: { id: parsed.id || 'admin-local-master', email: parsed.email || 'pratikjadhav8820@gmail.com' },
        profile: {
          id: parsed.id || 'admin-local-master',
          role: 'admin',
          email: parsed.email || 'pratikjadhav8820@gmail.com',
          full_name: parsed.full_name || 'Pratik Jadhav (Store Operations)',
        },
      };
    } catch {
      // invalid cookie, fall through to Supabase
    }
  }

  try {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      redirect('/login');
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('id, role, email, full_name')
      .eq('id', user.id)
      .maybeSingle();

    if (!profile || profile.role !== 'admin') {
      redirect('/not-authorized');
    }

    return { user, profile };
  } catch (err: any) {
    // If Supabase is unreachable/fails in development mode, provide fallback session
    if (process.env.NODE_ENV === 'development') {
      return {
        user: { id: 'admin-local-master', email: 'pratikjadhav8820@gmail.com' },
        profile: {
          id: 'admin-local-master',
          role: 'admin',
          email: 'pratikjadhav8820@gmail.com',
          full_name: 'Pratik Jadhav (Store Operations)',
        },
      };
    }
    redirect('/login');
  }
}
