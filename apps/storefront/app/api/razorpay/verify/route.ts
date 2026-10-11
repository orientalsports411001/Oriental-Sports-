import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient, createServiceRoleClient } from '@/lib/supabase/server';

interface VerifyBody {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

/**
 * Verifies the Razorpay payment signature server-side (HMAC-SHA256 over
 * `order_id|payment_id` using RAZORPAY_KEY_SECRET), confirms the order
 * belongs to the authenticated caller, then calls `finalize_paid_order` —
 * the single atomic, concurrency-safe pending->paid transition shared with
 * the webhook. This route no longer trusts (or even accepts) client-supplied
 * items/amounts: those were fixed server-side at create-order time and live
 * in `orders.items_snapshot` (see
 * supabase/migrations/20261011094500_atomic_order_finalization.sql).
 */
export async function POST(req: Request) {
  let body: VerifyBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ error: 'Missing Razorpay response fields' }, { status: 400 });
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return NextResponse.json({ error: 'Payment verification is not configured' }, { status: 500 });
  }

  const expectedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  // timingSafeEqual requires equal-length buffers; guard against mismatched
  // lengths throwing before we can report an honest "invalid signature".
  const sigBuf = Buffer.from(razorpay_signature, 'utf8');
  const expBuf = Buffer.from(expectedSignature, 'utf8');
  const signatureValid =
    sigBuf.length === expBuf.length && crypto.timingSafeEqual(sigBuf, expBuf);

  if (!signatureValid) {
    return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'You must be signed in to check out' }, { status: 401 });
  }

  const admin = createServiceRoleClient();

  // Ownership check: the pending order created at create-order time must
  // belong to this same authenticated user. A valid signature only proves
  // the payment matches this razorpay_order_id — it says nothing about who
  // is calling verify, so we check order ownership explicitly rather than
  // relying on the signature alone to authorize finalization.
  const { data: pendingOrder } = await admin
    .from('orders')
    .select('id, user_id, status')
    .eq('razorpay_order_id', razorpay_order_id)
    .maybeSingle();

  if (!pendingOrder) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }
  if (pendingOrder.user_id !== user.id) {
    return NextResponse.json({ error: 'This order does not belong to you' }, { status: 403 });
  }

  const { data: result, error: rpcError } = await admin.rpc('finalize_paid_order', {
    p_razorpay_order_id: razorpay_order_id,
    p_razorpay_payment_id: razorpay_payment_id,
  });

  if (rpcError) {
    console.error('finalize_paid_order RPC failed:', rpcError);
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

  return NextResponse.json({ success: true, orderId: result.order_id, orderNumber: result.order_number });
}
