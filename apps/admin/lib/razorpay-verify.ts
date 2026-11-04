/**
 * Server-side confirmation that a Razorpay payment actually happened before
 * we let an order into the system. The storefront checkout only talks to
 * the Razorpay Checkout widget client-side and never had a way to prove a
 * payment_id it hands back is real — this calls Razorpay's own Payments API
 * with the secret key to check the payment exists, is captured, and the
 * amount/currency match what the order claims.
 */
export interface VerifyResult {
  ok: boolean;
  reason?: string;
}

export async function verifyRazorpayPayment(
  paymentId: string | undefined | null,
  expectedAmountRupees: number
): Promise<VerifyResult> {
  const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    // Secret not provisioned yet — can't verify. Caller decides whether to
    // fail open or closed; we only report that verification was skipped.
    return { ok: false, reason: 'not_configured' };
  }

  if (!paymentId) {
    return { ok: false, reason: 'missing_payment_id' };
  }

  try {
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    const res = await fetch(`https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}`, {
      headers: { Authorization: `Basic ${auth}` },
    });

    if (!res.ok) {
      return { ok: false, reason: `razorpay_lookup_failed_${res.status}` };
    }

    const payment = await res.json();

    if (payment.status !== 'captured' && payment.status !== 'authorized') {
      return { ok: false, reason: `payment_status_${payment.status}` };
    }

    if (payment.currency !== 'INR') {
      return { ok: false, reason: 'currency_mismatch' };
    }

    const paidRupees = Number(payment.amount) / 100;
    // Allow a tiny rounding tolerance (paise-level rounding differences).
    if (Math.abs(paidRupees - expectedAmountRupees) > 1) {
      return { ok: false, reason: 'amount_mismatch' };
    }

    return { ok: true };
  } catch (err: any) {
    return { ok: false, reason: `verify_error_${err?.message || 'unknown'}` };
  }
}
