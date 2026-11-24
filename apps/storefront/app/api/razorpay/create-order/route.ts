import { NextResponse } from 'next/server';
import { createClient, createServiceRoleClient } from '@/lib/supabase/server';
import { getRazorpayInstance } from '@/lib/razorpay-server';
import { buildOrderDraft, generateOrderNumber, type CreateOrderBody } from '@/lib/payments/order-draft';

/**
 * Creates a Razorpay order AND the matching `orders` row (status='pending')
 * in one step. Prices and the item snapshot are looked up server-side (see
 * lib/payments/order-draft.ts) — the client only ever sends product ids +
 * quantities, never a price — and that snapshot is what `finalize_paid_order`
 * later uses to decrement stock and write `order_items`, so verify/webhook
 * never have to trust client-submitted amounts (see
 * supabase/migrations/20261011094500_atomic_order_finalization.sql).
 */
export async function POST(req: Request) {
  let body: CreateOrderBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'You must be signed in to check out' }, { status: 401 });
  }

  const result = await buildOrderDraft(supabase, body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  const { subtotal, shipping, tax, total, deliveryMethod, itemsSnapshot } = result.draft;

  let razorpayOrder;
  try {
    const razorpay = getRazorpayInstance();
    razorpayOrder = await razorpay.orders.create({
      amount: total * 100, // paise
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
      notes: { user_id: user.id, delivery_method: deliveryMethod },
    });
  } catch (err) {
    console.error('Razorpay order creation failed:', err);
    return NextResponse.json({ error: 'Could not create payment order' }, { status: 502 });
  }

  const admin = createServiceRoleClient();

  const { error: insertError } = await admin.from('orders').insert({
    user_id: user.id,
    order_number: generateOrderNumber(),
    payment_provider: 'razorpay',
    razorpay_order_id: razorpayOrder.id,
    status: 'pending',
    subtotal,
    shipping,
    tax,
    total_amount: total,
    currency: 'INR',
    payment_method: 'Razorpay',
    delivery_method: deliveryMethod,
    shipping_address: body.shippingAddress ?? null,
    items_snapshot: itemsSnapshot,
    timeline: [],
  });

  if (insertError) {
    console.error('Failed to create pending order:', insertError);
    return NextResponse.json({ error: 'Could not start checkout' }, { status: 500 });
  }

  return NextResponse.json({
    razorpayOrderId: razorpayOrder.id,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
    keyId: process.env.RAZORPAY_KEY_ID,
    subtotal,
    shipping,
    tax,
    total,
  });
}
