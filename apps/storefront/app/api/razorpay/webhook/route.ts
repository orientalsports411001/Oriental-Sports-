import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createServiceRoleClient } from '@/lib/supabase/server';

/**
 * Razorpay server-to-server webhook. Verifies the `X-Razorpay-Signature`
 * header against the RAW request body using RAZORPAY_WEBHOOK_SECRET (set in
 * the Razorpay dashboard webhook config), then handles `payment.captured`
 * and `payment.failed`.
 *
 * Idempotent by design: writes upsert on `orders.razorpay_order_id` (unique
 * constraint in the migration), so a replayed event updates the same row
 * instead of creating a duplicate order.
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
    const { error } = await admin
      .from('orders')
      .update({
        status: 'paid',
        razorpay_payment_id: razorpayPaymentId,
        updated_at: new Date().toISOString(),
      })
      .eq('razorpay_order_id', razorpayOrderId);

    if (error) {
      console.error('Webhook: failed to mark order paid:', error);
      return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
  } else if (event === 'payment.failed') {
    const { error } = await admin
      .from('orders')
      .update({
        status: 'failed',
        razorpay_payment_id: razorpayPaymentId,
        updated_at: new Date().toISOString(),
      })
      .eq('razorpay_order_id', razorpayOrderId);

    if (error) {
      console.error('Webhook: failed to mark order failed:', error);
      return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
