import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { createClient, createServiceRoleClient } from '@/lib/supabase/server';
import { buildOrderDraft, generateOrderNumber, type CreateOrderBody } from '@/lib/payments/order-draft';
import {
  createCashfreeOrder,
  getCashfreeMode,
  isCashfreeConfigured,
  normalizeIndianMobile,
} from '@/lib/cashfree-server';

/**
 * Creates the pending `orders` row (provider='cashfree') and the matching
 * Cashfree order. Same trust model as /api/razorpay/create-order: the client
 * sends product ids + quantities only; prices come from the DB and the
 * snapshot taken here is what finalize_paid_order_for_provider uses later.
 *
 * The DB row is inserted FIRST, so a Cashfree-side failure can be marked
 * `failed` instead of leaving an orphaned paid-capable order on Cashfree's
 * side with no row on ours.
 *
 * Response: { cashfreeOrderId, paymentSessionId, mode, subtotal, shipping, tax, total }
 * The browser passes paymentSessionId + mode to cashfree.js.
 */
export async function POST(req: Request) {
  if (!isCashfreeConfigured()) {
    return NextResponse.json({ error: 'Cashfree payments are not available right now' }, { status: 503 });
  }

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

  const draftResult = await buildOrderDraft(supabase, body);
  if (!draftResult.ok) {
    return NextResponse.json({ error: draftResult.error }, { status: draftResult.status });
  }
  const { subtotal, shipping, tax, total, deliveryMethod, itemsSnapshot } = draftResult.draft;

  // Cashfree requires a customer phone; the checkout form already collects it.
  const address = (body.shippingAddress ?? {}) as Record<string, unknown>;
  const phone = normalizeIndianMobile(address.phone);
  if (!phone) {
    return NextResponse.json({ error: 'Enter a valid 10-digit mobile number to pay online' }, { status: 400 });
  }

  // Ours, generated up front: <=45 chars, [A-Za-z0-9_-] per Cashfree's rules.
  const cashfreeOrderId = `os_${randomUUID().replace(/-/g, '')}`;

  const admin = createServiceRoleClient();

  // order_number is a short random code with a unique constraint; retry on
  // the rare collision rather than failing the customer's checkout.
  let insertError: { code?: string; message?: string } | null = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    const { error } = await admin.from('orders').insert({
      user_id: user.id,
      order_number: generateOrderNumber(),
      payment_provider: 'cashfree',
      cashfree_order_id: cashfreeOrderId,
      status: 'pending',
      subtotal,
      shipping,
      tax,
      total_amount: total,
      currency: 'INR',
      payment_method: 'Cashfree',
      delivery_method: deliveryMethod,
      shipping_address: body.shippingAddress ?? null,
      items_snapshot: itemsSnapshot,
      timeline: [],
    });
    insertError = error;
    if (!error || error.code !== '23505') break;
  }

  if (insertError) {
    console.error('Failed to create pending Cashfree order:', insertError);
    return NextResponse.json({ error: 'Could not start checkout' }, { status: 500 });
  }

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin).replace(/\/+$/, '');
  const name = typeof address.name === 'string' ? address.name.trim().slice(0, 100) : '';

  try {
    const order = await createCashfreeOrder({
      orderId: cashfreeOrderId,
      amountRupees: total,
      customerId: user.id,
      customerPhone: phone,
      customerEmail: user.email ?? undefined,
      customerName: name || undefined,
      returnUrl: `${siteUrl}/order-success?provider=cashfree&cf_order_id=${cashfreeOrderId}`,
      // Cashfree only accepts https notify URLs; skipped on http localhost.
      // The dashboard-level webhook URL covers that case.
      notifyUrl: siteUrl.startsWith('https://') ? `${siteUrl}/api/cashfree/webhook` : undefined,
    });

    return NextResponse.json({
      cashfreeOrderId,
      paymentSessionId: order.payment_session_id,
      mode: getCashfreeMode(),
      subtotal,
      shipping,
      tax,
      total,
    });
  } catch (err) {
    console.error('Cashfree order creation failed:', err);
    await admin.rpc('fail_pending_order_for_provider', {
      p_provider: 'cashfree',
      p_provider_order_id: cashfreeOrderId,
    });
    return NextResponse.json({ error: 'Could not create payment order' }, { status: 502 });
  }
}
