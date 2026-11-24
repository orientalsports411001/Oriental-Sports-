import { NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { confirmCashfreePayment, verifyCashfreeWebhookSignature } from '@/lib/cashfree-server';

/**
 * Cashfree server-to-server webhook (set the URL in the Cashfree dashboard:
 * Developers -> Webhooks, and/or it is sent per-order as notify_url).
 *
 * 1. Verifies x-webhook-signature over the RAW body (signature check only
 *    proves Cashfree sent it).
 * 2. On a successful payment, RE-CONFIRMS with Cashfree's Get Order API and
 *    checks the amount against our stored total before finalizing — the
 *    webhook body is never what authorizes an order.
 * 3. Finalizes via the same atomic function the verify route uses; whichever
 *    of webhook / verify arrives first wins, the other is an idempotent no-op.
 *
 * Deliberately ignores FAILED / USER_DROPPED events: Cashfree lets the
 * customer retry on the same order, so one failed attempt must not move our
 * order out of 'pending' (finalize only works from 'pending'). Abandoned
 * orders are failed by the verify route when Cashfree reports them
 * EXPIRED/TERMINATED.
 *
 * Event routing keys off data.payment.payment_status rather than the `type`
 * string, because Cashfree's docs show both "PAYMENT_SUCCESS_WEBHOOK" and
 * "PAYMENT_SUCCESS" for it.
 *
 * Status codes: 2xx stops Cashfree retrying, so non-actionable events return
 * 200; a transient failure on our side returns 500 so Cashfree retries.
 */
export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get('x-webhook-signature');
  const timestamp = req.headers.get('x-webhook-timestamp');

  if (!process.env.CASHFREE_SECRET_KEY) {
    console.error('CASHFREE_SECRET_KEY is not configured.');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }
  if (!signature || !timestamp) {
    return NextResponse.json({ error: 'Missing signature headers' }, { status: 400 });
  }
  if (!verifyCashfreeWebhookSignature(rawBody, signature, timestamp)) {
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
  }

  let payload: any;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  const orderId: unknown = payload?.data?.order?.order_id;
  const paymentStatus: unknown = payload?.data?.payment?.payment_status;

  if (typeof orderId !== 'string' || paymentStatus !== 'SUCCESS') {
    return NextResponse.json({ received: true });
  }

  const admin = createServiceRoleClient();

  const { data: order } = await admin
    .from('orders')
    .select('id, status, total_amount')
    .eq('payment_provider', 'cashfree')
    .eq('cashfree_order_id', orderId)
    .maybeSingle();

  if (!order) {
    // Not one of ours (e.g. the dashboard's "test webhook" button).
    return NextResponse.json({ received: true });
  }
  if (order.status !== 'pending') {
    return NextResponse.json({ received: true }); // already handled
  }

  let confirmation;
  try {
    confirmation = await confirmCashfreePayment(orderId, Number(order.total_amount));
  } catch (err) {
    console.error('Webhook: Cashfree order lookup failed:', err);
    return NextResponse.json({ error: 'Could not confirm payment' }, { status: 500 });
  }

  if (confirmation.state === 'mismatch') {
    console.error('Webhook: Cashfree amount/currency mismatch for', orderId, confirmation.reason);
    return NextResponse.json({ received: true });
  }
  if (confirmation.state !== 'paid') {
    // Webhook said SUCCESS but Cashfree's API doesn't (yet) agree — ask for a retry.
    return NextResponse.json({ error: 'Payment not yet confirmable' }, { status: 500 });
  }

  const { data: result, error } = await admin.rpc('finalize_paid_order_for_provider', {
    p_provider: 'cashfree',
    p_provider_order_id: orderId,
    p_payment_id: confirmation.paymentId,
  });

  if (error) {
    console.error('Webhook: finalize_paid_order_for_provider RPC failed:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
  if (!result?.ok && result?.error === 'out_of_stock') {
    // Customer already has a confirmed charge but stock ran out after
    // create-order. Needs manual reconciliation; returning an error would
    // only make Cashfree retry the same webhook.
    console.error('Webhook: Cashfree payment captured but order could not be stocked:', orderId);
  }

  return NextResponse.json({ received: true });
}
