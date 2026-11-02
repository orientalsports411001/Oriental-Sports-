import { NextResponse } from 'next/server';
import { getAdminNavCounts } from '@/lib/nav-counts';
import { checkAdmin } from '@/lib/require-admin';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const auth = await checkAdmin();
    if (!auth.ok) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    const counts = await getAdminNavCounts();
    return NextResponse.json(
      { success: true, ...counts },
      { headers: { 'Cache-Control': 'no-store, max-age=0' } }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to load catalog counts.' },
      { status: 500 }
    );
  }
}
