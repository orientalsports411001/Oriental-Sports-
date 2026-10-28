import { NextResponse } from 'next/server';

export async function POST() {
  // Direct dev backdoor permanently disabled
  return NextResponse.json({ success: false, error: 'Endpoint disabled. Please use standard authentication.' }, { status: 403 });
}
