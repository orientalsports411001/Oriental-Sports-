import { NextResponse } from 'next/server';
import { createClient, createServiceRoleClient } from '@/lib/supabase/server';
import { getRazorpayInstance } from '@/lib/razorpay-server';

interface CartLine {
  productId: string;
  quantity: number;
}

interface CreateOrderBody {
  items: CartLine[];
  deliveryMethod?: 'doorstep' | 'camp_pickup';
  shippingAddress?: Record<string, unknown>;
}

/**
 * Creates a Razorpay order AND the matching `orders` row (status='pending')
 * in one step. Prices and the item snapshot are looked up server-side from
 * the `products` table now — the client only ever sends product ids +
 * quantities, never a price — and that snapshot is what `finalize_paid_order`
 * later uses to decrement stock and write `order_items`, so verify/webhook
 * never have to trust client-submitted amounts again (see
 * supabase/migrations/20261011094500_atomic_order_finalization.sql).
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
    .select('id, slug, name, images, price, in_stock, stock_quantity')
    .in('id', productIds);

  if (error) {
    return NextResponse.json({ error: 'Failed to look up products' }, { status: 500 });
  }

  const productById = new Map((products ?? []).map((p: any) => [p.id, p]));

  let subtotal = 0;
  const itemsSnapshot: Array<Record<string, unknown>> = [];

  for (const line of items) {
    const product = productById.get(line.productId);
    if (!product) {
      return NextResponse.json({ error: `Unknown product: ${line.productId}` }, { status: 400 });
    }
    if (!product.in_stock) {
      return NextResponse.json({ error: `${product.name} is out of stock` }, { status: 400 });
    }
    const qty = Math.max(1, Math.floor(line.quantity || 1));
    // Early, non-authoritative check — the authoritative, race-safe check is
    // the atomic decrement inside finalize_paid_order at payment time. This
    // just avoids starting a payment for something already visibly out of
    // stock.
    if (product.stock_quantity !== null && product.stock_quantity < qty) {
      return NextResponse.json({ error: `${product.name} does not have enough stock` }, { status: 409 });
    }
    subtotal += Number(product.price) * qty;
    itemsSnapshot.push({
      productId: product.id,
      productSlug: product.slug,
      productName: product.name,
      productImage: product.images?.[0] ?? null,
      price: Number(product.price),
      quantity: qty,
      selectedVariant: (line as any).selectedVariant ?? null,
      selectedSize: (line as any).selectedSize ?? null,
    });
  }

  const deliveryMethod = body.deliveryMethod === 'camp_pickup' ? 'camp_pickup' : 'doorstep';
  const shipping = deliveryMethod === 'camp_pickup' || subtotal >= 2000 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const total = Math.round(subtotal + shipping + tax);

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
  const orderNumber = `OS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const { error: insertError } = await admin.from('orders').insert({
    user_id: user.id,
    order_number: orderNumber,
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
