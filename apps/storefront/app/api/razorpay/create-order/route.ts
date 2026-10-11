import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getRazorpayInstance } from '@/lib/razorpay-server';

interface CartLine {
  productId: string;
  quantity: number;
}

interface CreateOrderBody {
  items: CartLine[];
  deliveryMethod?: 'doorstep' | 'camp_pickup';
}

/**
 * Creates a Razorpay order. Prices are looked up server-side from the
 * `products` table — the client only ever sends product ids + quantities,
 * never a price, so a tampered client request cannot change what gets
 * charged.
 */
export async function POST(req: Request) {
  let body: CreateOrderBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const items = Array.isArray(body.items) ? body.items : [];
  if (items.length === 0) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
  }

  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'You must be signed in to check out' }, { status: 401 });
  }

  const productIds = items.map((i) => i.productId);
  const { data: products, error } = await supabase
    .from('products')
    .select('id, price, in_stock, name')
    .in('id', productIds);

  if (error) {
    return NextResponse.json({ error: 'Failed to look up products' }, { status: 500 });
  }

  const priceById = new Map((products ?? []).map((p: any) => [p.id, p]));

  let subtotal = 0;
  for (const line of items) {
    const product = priceById.get(line.productId);
    if (!product) {
      return NextResponse.json({ error: `Unknown product: ${line.productId}` }, { status: 400 });
    }
    if (!product.in_stock) {
      return NextResponse.json({ error: `${product.name} is out of stock` }, { status: 400 });
    }
    const qty = Math.max(1, Math.floor(line.quantity || 1));
    subtotal += Number(product.price) * qty;
  }

  const deliveryMethod = body.deliveryMethod === 'camp_pickup' ? 'camp_pickup' : 'doorstep';
  const shipping = deliveryMethod === 'camp_pickup' || subtotal >= 2000 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const total = Math.round(subtotal + shipping + tax);

  try {
    const razorpay = getRazorpayInstance();
    const order = await razorpay.orders.create({
      amount: total * 100, // paise
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
      notes: { user_id: user.id, delivery_method: deliveryMethod },
    });

    return NextResponse.json({
      razorpayOrderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      subtotal,
      shipping,
      tax,
      total,
    });
  } catch (err) {
    console.error('Razorpay order creation failed:', err);
    return NextResponse.json({ error: 'Could not create payment order' }, { status: 502 });
  }
}
