import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const errorMsg = searchParams.get('error_description') || searchParams.get('error');
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const defaultNext = `${basePath}/dashboard` || '/dashboard';
  const nextParam = searchParams.get('next') ?? defaultNext;
  const target = nextParam.startsWith('/') ? nextParam : `/${nextParam}`;

  if (errorMsg) {
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(errorMsg)}`);
  }

  if (code) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        return NextResponse.redirect(`${origin}${target}`);
      }
      return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error.message)}`);
    } catch (err: any) {
      return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(err?.message || 'Authentication error')}`);
    }
  }

  return NextResponse.redirect(`${origin}/login`);
}
