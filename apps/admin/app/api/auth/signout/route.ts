import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();

    // 1. Sign out on Supabase
    try {
      const supabase = await createClient();
      await supabase.auth.signOut();
    } catch {}

    // 2. Clear all auth session cookies
    const allCookies = cookieStore.getAll();
    for (const c of allCookies) {
      if (c.name.startsWith('sb-') || c.name.startsWith('os_') || c.name.includes('auth')) {
        cookieStore.delete(c.name);
      }
    }

    const isHtmlReq = req.headers.get('accept')?.includes('text/html');
    if (isHtmlReq) {
      return NextResponse.redirect(new URL('/login', req.url), { status: 302 });
    }

    return NextResponse.json({ success: true, redirect: '/login' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  return POST(req);
}
