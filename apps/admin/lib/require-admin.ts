import 'server-only';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

/**
 * Server-side admin gate. Call this at the top of every protected
 * page/layout/route handler — it is NOT a middleware, so it must be
 * re-invoked per request/route rather than relied on as global client state.
 *
 * - No session -> redirect to /login
 * - Session but profiles.role !== 'admin' -> redirect to /not-authorized
 * - Otherwise -> returns the authenticated user + profile row
 */
export async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
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
}
