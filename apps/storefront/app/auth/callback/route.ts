import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * PKCE callback for magic-link sign-in. `createBrowserClient` from
 * `@supabase/ssr` defaults to `flowType: 'pkce'`, so the link Supabase emails
 * out lands here with a `?code=` param that must be exchanged for a session
 * server-side (which sets the auth cookies the account/checkout pages read)
 * — without this route, clicking the magic link redirected straight to the
 * target page with no session ever established.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/account';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/account/login?error=auth_callback_failed`);
}
