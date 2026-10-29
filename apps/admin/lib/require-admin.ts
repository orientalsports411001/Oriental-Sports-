import 'server-only';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export const OWNER_ADMIN_EMAIL = 'hello.orientalsports@gmail.com';

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

    const userEmail = (user.email || profile?.email || '').toLowerCase().trim();
    const isOwnerAdmin = userEmail === OWNER_ADMIN_EMAIL;

    if (!isOwnerAdmin) {
      return {
        ok: false,
        error: `Access Denied: Only the store administrator (${OWNER_ADMIN_EMAIL}) can log in.`,
      };
    }

    return {
      ok: true,
      user: { id: user.id, email: user.email || '' },
      profile: {
        id: profile?.id || user.id,
        role: 'admin',
        email: user.email || '',
        full_name: profile?.full_name || user.user_metadata?.full_name || 'Oriental Sports Admin',
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
    redirect(
      `/login?error=${encodeURIComponent(
        `Access restricted: Only the store administrator (${OWNER_ADMIN_EMAIL}) can log in.`
      )}&unauthorized=1`
    );
  }
  return { user: result.user, profile: result.profile };
}
