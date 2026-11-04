import { NextResponse } from 'next/server';
import { getAdminNavCounts } from '@/lib/nav-counts';
import { checkAdmin } from '@/lib/require-admin';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const admin = await checkAdmin();
  if (!admin.ok) {
    return NextResponse.json({ success: false, error: admin.error }, { status: admin.reason === 'forbidden' ? 403 : 401 });
  }

  try {
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
