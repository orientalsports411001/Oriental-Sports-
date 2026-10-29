import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST() {
  // Direct dev backdoor permanently disabled
  return NextResponse.json(
    { success: false, error: 'Endpoint disabled. Please use standard authentication.' },
    { status: 403 }
  );
}

export async function GET() {
  return POST();
}
