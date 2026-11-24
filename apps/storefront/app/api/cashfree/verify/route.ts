import { NextResponse } from 'next/server';
import { createClient, createServiceRoleClient } from '@/lib/supabase/server';
import { confirmCashfreePayment } from '@/lib/cashfree-server';

/**
 * Called by the browser after the Cashfree checkout closes (or when the
 * customer lands back on the return_url). Unlike Razorpay there is no
 * client-held signature to check — instead we ask Cashfree directly whether
 * the order is PAID and the amount matches OUR stored total, confirm the
 * order belongs to the caller, then run the shared atomic finalize.
 *
 * Safe to call repeatedly (the finalize step is idempotent), which is what
 * the client should do while the response is `status: 'pending'`.
 *
 * Responses:
 *   200 { success: true, orderId, orderNumber }       paid + finalized
 *   202 { success: false, status: 'pending' }         not paid yet — poll again
 *   402 { error }                                     expired / terminated
 *   409 { error, outOfStockProductId }                paid but stock ran out
 */
export async function POST(req: Request) {
  let cashfreeOrderId: unknown;
  try {
    ({ cashfreeOrderId } = await req.json());
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  if (typeof cashfreeOrderId !== 'string' || !/^[A-Za-z0-9_-]{3,45}$/.test(cashfreeOrderId)) {
    return NextResponse.json({ error: 'Missing or invalid cashfreeOrderId' }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'You must be signed in to check out' }, { status: 401 });
  }

  const admin = createServiceRoleClient();

  const { data: order } = await admin
    .from('orders')
    .select('id, user_id, status, order_number, total_amount')
    .eq('payment_provider', 'cashfree')
    .eq('cashfree_order_id', cashfreeOrderId)
    .maybeSingle();

  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }
  if (order.user_id !== user.id) {
    return NextResponse.json({ error: 'This order does not belong to you' }, { status: 403 });
  }

  // Already finalized (webhook beat us, or a repeat call): no need to hit Cashfree.
  if (order.status === 'failed') {
    return NextResponse.json({ error: 'Payment was not completed' }, { status: 402 });
  }
  if (order.status !== 'pending') {
    return NextResponse.json({ success: true, orderId: order.id, orderNumber: order.order_number });
  }

  let confirmation;
  try {
    confirmation = await confirmCashfreePayment(cashfreeOrderId, Number(order.total_amount));
  } catch (err) {
    console.error('Cashfree order lookup failed:', err);
    return NextResponse.json({ error: 'Could not confirm payment status. Please try again.' }, { status: 502 });
  }

  if (confirmation.state === 'pending') {
    return NextResponse.json({ success: false, status: 'pending' }, { status: 202 });
  }
  if (confirmation.state === 'failed') {
    await admin.rpc('fail_pending_order_for_provider', {
      p_provider: 'cashfree',
      p_provider_order_id: cashfreeOrderId,
    });
    return NextResponse.json({ error: 'Payment was not completed' }, { status: 402 });
  }
  if (confirmation.state === 'mismatch') {
    console.error('Cashfree amount/currency mismatch:', cashfreeOrderId, confirmation.reason);
    return NextResponse.json({ error: 'Payment could not be verified' }, { status: 400 });
  }

  const { data: result, error: rpcError } = await admin.rpc('finalize_paid_order_for_provider', {
    p_provider: 'cashfree',
    p_provider_order_id: cashfreeOrderId,
    p_payment_id: confirmation.paymentId,
  });

  if (rpcError) {
    console.error('finalize_paid_order_for_provider RPC failed:', rpcError);
    return NextResponse.json({ error: 'Payment verified but order could not be finalized' }, { status: 500 });
  }

  if (!result?.ok) {
    if (result?.error === 'out_of_stock') {
      return NextResponse.json(
        {
          error: 'One or more items in your order are now out of stock.',
          outOfStockProductId: result.out_of_stock_product_id,
        },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: 'Payment verified but order could not be found' }, { status: 500 });
  }

  // Lost a race against something that failed the order after we read it.
  if (result.status === 'failed') {
    return NextResponse.json({ error: 'Payment was not completed' }, { status: 402 });
  }

  return NextResponse.json({ success: true, orderId: result.order_id, orderNumber: result.order_number });
}
