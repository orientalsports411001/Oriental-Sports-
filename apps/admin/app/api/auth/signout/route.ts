import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('os_dev_admin');

    const supabase = await createClient();
    await supabase.auth.signOut().catch(() => {});

    return NextResponse.json({ success: true, redirect: '/login' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
