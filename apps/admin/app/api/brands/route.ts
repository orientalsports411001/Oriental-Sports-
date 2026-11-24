import { NextResponse } from 'next/server';
import { checkAdmin } from '@/lib/require-admin';
import { addBrand, getBrands } from '@/lib/brands';

export const dynamic = 'force-dynamic';

export async function GET() {
  const auth = await checkAdmin();
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: 401 });
  return NextResponse.json({ success: true, brands: await getBrands() });
}

export async function POST(req: Request) {
  const auth = await checkAdmin();
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: 401 });

  const body = await req.json().catch(() => null);
  const result = await addBrand(body?.name);
  if (!result.ok) return NextResponse.json({ success: false, error: result.error }, { status: 400 });
  return NextResponse.json({ success: true, brand: result.brand, added: result.added, brands: result.brands });
}
