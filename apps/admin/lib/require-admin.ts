import 'server-only';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

/**
 * Server-side admin check without redirection.
 * Safe to use inside Server Actions (where redirect() crashes RPC calls).
 */
export async function checkAdmin(): Promise<
  | { ok: true; user: { id: string; email: string }; profile: { id: string; role: string; email: string; full_name: string } }
  | { ok: false; error: string }
> {
  try {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return { ok: false, error: 'Authentication required. Please sign in to the operations console.' };
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('id, role, email, full_name')
      .eq('id', user.id)
      .maybeSingle();

    const allowedAdmins = [
      'pratikjadhav8820@gmail.com',
      'orientalsports411001@gmail.com',
    ];

    const userEmail = (user.email || profile?.email || '').toLowerCase();
    const isAdmin = profile?.role === 'admin' || allowedAdmins.includes(userEmail);

    if (!isAdmin) {
      return { ok: false, error: 'Unauthorized: Admin role required.' };
    }

    return {
      ok: true,
      user: { id: user.id, email: user.email || '' },
      profile: {
        id: profile?.id || user.id,
        role: 'admin',
        email: user.email || '',
        full_name: profile?.full_name || user.user_metadata?.full_name || user.email || 'Administrator',
      },
    };
  } catch (err: any) {
    return { ok: false, error: err?.message || 'Admin authorization failed.' };
  }
}

/**
 * Server-side admin gate with redirect. Call this at the top of every protected
 * page/layout/route handler.
 */
export async function requireAdmin() {
  const result = await checkAdmin();
  if (!result.ok) {
    redirect('/login');
  }
  return { user: result.user, profile: result.profile };
}
