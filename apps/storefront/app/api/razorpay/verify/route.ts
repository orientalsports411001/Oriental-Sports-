import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient, createServiceRoleClient } from '@/lib/supabase/server';

interface VerifyBody {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  items: Array<{
    productId: string;
    productSlug?: string;
    productName: string;
    productImage?: string;
    price: number;
    quantity: number;
    selectedVariant?: string;
    selectedSize?: string;
  }>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  deliveryMethod: 'doorstep' | 'camp_pickup';
  shippingAddress: Record<string, unknown>;
}

/**
 * Verifies the Razorpay payment signature server-side (HMAC-SHA256 over
 * `order_id|payment_id` using RAZORPAY_KEY_SECRET). Only on a valid
 * signature do we write `orders` / `order_items` rows — using the
 * service-role client, since the client itself has no insert-with-status
 * privilege beyond its own `pending` rows. An invalid signature writes
 * nothing and is rejected.
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

  const orderNumber = `OS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  // Idempotency: razorpay_order_id has a unique constraint (see migration),
  // so upserting on it means replaying the same webhook/verify call twice
  // never creates a duplicate order.
  const { data: order, error: orderError } = await admin
    .from('orders')
    .upsert(
      {
        user_id: user.id,
        order_number: orderNumber,
        razorpay_order_id,
        razorpay_payment_id,
        status: 'paid',
        status_label:
          body.deliveryMethod === 'camp_pickup'
            ? 'Ready for Camp Store Collection'
            : 'Confirmed · Preparing at MG Road Workshop',
        subtotal: body.subtotal,
        shipping: body.shipping,
        tax: body.tax,
        total_amount: body.total,
        currency: 'INR',
        payment_method: 'Razorpay',
        delivery_method: body.deliveryMethod,
        shipping_address: body.shippingAddress,
        timeline: [
          {
            status: 'confirmed',
            title: 'Order Confirmed',
            description: `Payment of ₹${body.total} verified via Razorpay (${razorpay_payment_id}).`,
            date: new Date().toISOString(),
            completed: true,
            current: true,
          },
        ],
      },
      { onConflict: 'razorpay_order_id' }
    )
    .select()
    .single();

  if (orderError || !order) {
    console.error('Failed to write order:', orderError);
    return NextResponse.json({ error: 'Payment verified but order could not be saved' }, { status: 500 });
  }

  if (Array.isArray(body.items) && body.items.length > 0) {
    const orderItems = body.items.map((item) => ({
      order_id: order.id,
      user_id: user.id,
      product_id: item.productId,
      product_slug: item.productSlug,
      product_name: item.productName,
      product_image: item.productImage,
      price: item.price,
      quantity: item.quantity,
      selected_variant: item.selectedVariant,
      selected_size: item.selectedSize,
    }));

    const { error: itemsError } = await admin.from('order_items').insert(orderItems);
    if (itemsError) {
      console.error('Failed to write order items:', itemsError);
    }
  }

  return NextResponse.json({ success: true, orderId: order.id, orderNumber: order.order_number });
}
