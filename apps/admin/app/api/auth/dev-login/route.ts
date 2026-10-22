import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = body.email || 'pratikjadhav8820@gmail.com';

    const sessionData = {
      id: 'admin-local-master',
      email,
      full_name: 'Pratik Jadhav (Store Operations)',
      role: 'admin',
      created_at: new Date().toISOString(),
    };

    const cookieStore = await cookies();
    cookieStore.set('os_dev_admin', JSON.stringify(sessionData), {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({ success: true, redirect: '/dashboard' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
