import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createServiceRoleClient } from '@/lib/supabase/server';

/**
 * Razorpay server-to-server webhook. Verifies the `X-Razorpay-Signature`
 * header against the RAW request body using RAZORPAY_WEBHOOK_SECRET (set in
 * the Razorpay dashboard webhook config), then handles `payment.captured`
 * and `payment.failed` via the SAME Postgres functions the verify route
 * calls (`finalize_paid_order` / `fail_pending_order`). Whichever of the
 * webhook or the checkout-callback verify call reaches Postgres first wins
 * the `where status = 'pending'` race inside those functions; the other is
 * a no-op idempotent confirmation — there's no separate webhook-side
 * order-mutation path that could double-process the same payment.
 */
export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get('x-razorpay-signature');
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('RAZORPAY_WEBHOOK_SECRET is not configured.');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature header' }, { status: 400 });
  }

  const expectedSignature = crypto.createHmac('sha256', webhookSecret).update(rawBody).digest('hex');

  const sigBuf = Buffer.from(signature, 'utf8');
  const expBuf = Buffer.from(expectedSignature, 'utf8');
  const signatureValid = sigBuf.length === expBuf.length && crypto.timingSafeEqual(sigBuf, expBuf);

  if (!signatureValid) {
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
  }

  let payload: any;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  const event = payload.event as string;
  const paymentEntity = payload.payload?.payment?.entity;

  if (!paymentEntity) {
    // Nothing actionable for us (e.g. an event type we don't handle yet).
    return NextResponse.json({ received: true });
  }

  const razorpayOrderId: string | undefined = paymentEntity.order_id;
  const razorpayPaymentId: string | undefined = paymentEntity.id;

  if (!razorpayOrderId) {
    return NextResponse.json({ received: true });
  }

  const admin = createServiceRoleClient();

  if (event === 'payment.captured') {
    const { data: result, error } = await admin.rpc('finalize_paid_order', {
      p_razorpay_order_id: razorpayOrderId,
      p_razorpay_payment_id: razorpayPaymentId,
    });

    if (error) {
      console.error('Webhook: finalize_paid_order RPC failed:', error);
      return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
    if (!result?.ok && result?.error === 'out_of_stock') {
      // The webhook arrived after stock ran out between create-order and
      // capture (rare — the customer already has a confirmed Razorpay
      // charge). Leave this for manual reconciliation rather than silently
      // dropping it; do not throw, since Razorpay would just retry the
      // same webhook indefinitely.
      console.error('Webhook: payment captured but order could not be stocked:', razorpayOrderId);
    }
  } else if (event === 'payment.failed') {
    const { error } = await admin.rpc('fail_pending_order', {
      p_razorpay_order_id: razorpayOrderId,
    });

    if (error) {
      console.error('Webhook: fail_pending_order RPC failed:', error);
      return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
