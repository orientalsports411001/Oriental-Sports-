import 'server-only';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export const OWNER_ADMIN_EMAIL = 'hello.orientalsports@gmail.com';

export function isAuthorizedAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const clean = email.toLowerCase().trim();
  if (clean === OWNER_ADMIN_EMAIL) return true;
  const envAdmins = (process.env.ADMIN_EMAILS || process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return envAdmins.includes(clean);
}

/**
 * Server-side admin check without redirection.
 * Safe to use inside Server Actions (where redirect() crashes RPC calls).
 */
export async function checkAdmin(): Promise<
  | { ok: true; user: { id: string; email: string }; profile: { id: string; role: string; email: string; full_name: string } }
  | { ok: false; error: string; reason: 'unauthenticated' | 'forbidden' }
> {
  try {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return { ok: false, error: 'Authentication required. Please sign in.', reason: 'unauthenticated' };
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('id, role, email, full_name')
      .eq('id', user.id)
      .maybeSingle();

    const userEmail = (user.email || profile?.email || '').toLowerCase().trim();
    const isOwnerAdmin = isAuthorizedAdminEmail(userEmail);

    if (!isOwnerAdmin) {
      return {
        ok: false,
        error: 'Access Denied: This account does not have administrator privileges.',
        reason: 'forbidden',
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
    return { ok: false, error: err?.message || 'Admin authorization failed.', reason: 'unauthenticated' };
  }
}

/**
 * Server-side admin gate with redirect. Call this at the top of every protected
 * page/layout/route handler.
 */
export async function requireAdmin() {
  const result = await checkAdmin();
  if (!result.ok) {
    // If the user simply has not logged in yet, take them to the clean login screen
    if (result.reason === 'unauthenticated') {
      redirect('/login');
    }
    // Only display the access denied error if a signed-in user is actually forbidden
    redirect(
      `/login?error=${encodeURIComponent(
        result.error || 'Access restricted: Administrator privileges required.'
      )}&unauthorized=1`
    );
  }
  return { user: result.user, profile: result.profile };
}
