import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * PKCE callback for magic-link sign-in. `createBrowserClient` from
 * `@supabase/ssr` defaults to `flowType: 'pkce'`, so the link Supabase emails
 * out lands here with a `?code=` param that must be exchanged for a session
 * server-side (which sets the auth cookies `requireAdmin()` reads) — without
 * this route, clicking the magic link redirected straight to `/dashboard`
 * with no session ever established, and the server-side admin check bounced
 * it back to `/login`.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
