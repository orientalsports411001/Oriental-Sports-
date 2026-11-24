import { NextResponse } from 'next/server';
import { isCashfreeConfigured } from '@/lib/cashfree-server';

export const dynamic = 'force-dynamic';

/**
 * Tells the checkout UI which payment providers are actually usable, so a
 * provider whose keys aren't set yet is hidden rather than offered and then
 * failing at pay time. Exposes booleans only — never key material.
 */
export async function GET() {
  return NextResponse.json({
    razorpay: Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET),
    cashfree: isCashfreeConfigured(),
  });
}
