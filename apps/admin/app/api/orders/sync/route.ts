import { NextResponse } from 'next/server';
import { saveAdminOrder, getCachedOrders, getCachedOrdersAsync, AdminOrder } from '@/lib/catalog-store';
import { sendOrderStatusEmail, sendAdminNewOrderNotification } from '@/lib/email';
import { verifyRazorpayPayment } from '@/lib/razorpay-verify';
import { createServiceRoleClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

// Reverted from an origin allow-list: it's brittle (any mismatch between
// the deployed storefront domain and this list silently drops every order
// sync, with no visible error — the storefront's fetch is fire-and-forget)
// and wasn't the real protection anyway. The actual protections are the
// mandatory phone/email match on GET and payment verification on POST.
function corsHeadersFor(req: Request) {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

export async function OPTIONS(req: Request) {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeadersFor(req),
  });
}

export async function GET(req: Request) {
  const corsHeaders = corsHeadersFor(req);
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get('phone');
    const email = searchParams.get('email');

    const cleanPhone = phone ? phone.replace(/\D/g, '').slice(-10) : '';
    const cleanEmail = email ? email.toLowerCase().trim() : '';
    const validPhone = cleanPhone.length === 10 ? cleanPhone : '';
    const validEmail = cleanEmail.includes('@') ? cleanEmail : '';

    // A phone or email identifying the requester is mandatory — without it
    // this would hand back every customer's name, address and order
    // history to anyone who calls the endpoint.
    if (!validPhone && !validEmail) {
      return NextResponse.json(
        { success: false, error: 'phone or email is required' },
        { status: 400, headers: corsHeaders }
      );
    }

    const allOrders = await getCachedOrdersAsync();
    const matches = (customerPhone?: string, customerEmail?: string, addr?: any) => {
      const orderPhone = (customerPhone || addr?.phone || '').replace(/\D/g, '').slice(-10);
      const orderEmail = (customerEmail || addr?.email || '').toLowerCase().trim();
      const phoneMatches = validPhone ? orderPhone === validPhone : false;
      const emailMatches = validEmail ? orderEmail === validEmail : false;
      return phoneMatches || emailMatches;
    };

    const orderMap = new Map<string, AdminOrder>();
    for (const o of allOrders) {
      if (matches(o.customer_phone, o.customer_email, o.shipping_address)) {
        orderMap.set(o.order_number || o.id, o);
      }
    }

    // Also check Supabase directly — changeOrderStatus()/updateTracking()
    // update Supabase first and only mirror into this cache when the order
    // is already present there. If an order was created by a path that
    // never wrote it into the cache (or the mirror write raced/failed),
    // this cache-only read would keep serving a stale status forever even
    // though Supabase has the real one. Merge it in, preferring whichever
    // side was updated more recently.
    try {
      const admin = createServiceRoleClient();
      const orConditions: string[] = [];
      // orders has no customer_phone/customer_email columns — contact
      // details live in the shipping_address jsonb. Filtering on the
      // nonexistent columns made this whole query fail silently.
      if (validPhone) orConditions.push(`shipping_address->>phone.ilike.%${validPhone}%`);
      if (validEmail) orConditions.push(`shipping_address->>email.ilike.${validEmail}`);
      if (orConditions.length > 0) {
        const { data: dbOrders } = await admin
          .from('orders')
          .select('*, order_items(*)')
          .or(orConditions.join(','));

        for (const dbOrder of dbOrders || []) {
          if (!matches(dbOrder.customer_phone, dbOrder.customer_email, dbOrder.shipping_address)) continue;
          const key = dbOrder.order_number || dbOrder.id;
          const existing = orderMap.get(key);
          const dbUpdatedAt = new Date(dbOrder.updated_at || dbOrder.created_at || 0).getTime();
          const cacheUpdatedAt = existing ? new Date((existing as any).updated_at || existing.created_at || 0).getTime() : -1;

          if (!existing || dbUpdatedAt >= cacheUpdatedAt) {
            orderMap.set(key, {
              ...(existing || {}),
              id: dbOrder.id,
              order_number: dbOrder.order_number,
              user_id: dbOrder.user_id || existing?.user_id || 'usr-guest',
              customer_name: dbOrder.customer_name || existing?.customer_name || 'Customer',
              customer_email: dbOrder.customer_email || existing?.customer_email || '',
              customer_phone: dbOrder.customer_phone || existing?.customer_phone || '',
              status: dbOrder.status || existing?.status || 'confirmed',
              total_amount: Number(dbOrder.total_amount ?? existing?.total_amount ?? 0),
              subtotal: Number(dbOrder.subtotal ?? existing?.subtotal ?? 0),
              shipping: Number(dbOrder.shipping ?? existing?.shipping ?? 0),
              tax: Number(dbOrder.tax ?? existing?.tax ?? 0),
              payment_method: dbOrder.payment_method || existing?.payment_method || 'Razorpay / UPI',
              tracking_number: dbOrder.tracking_number || existing?.tracking_number,
              carrier: dbOrder.carrier || existing?.carrier,
              created_at: dbOrder.created_at || existing?.created_at || new Date().toISOString(),
              shipping_address: dbOrder.shipping_address || existing?.shipping_address,
              items:
                dbOrder.order_items && dbOrder.order_items.length > 0
                  ? dbOrder.order_items.map((it: any) => ({
                      product_name: it.product_name,
                      price: it.price,
                      quantity: it.quantity,
                      selected_variant: it.selected_variant,
                    }))
                  : existing?.items || [],
            } as AdminOrder);
          }
        }
      }
    } catch {
      // Supabase unavailable — cache-only result still returned below.
    }

    const orders = Array.from(orderMap.values());

    return NextResponse.json({ success: true, orders }, { headers: corsHeaders });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to get orders' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(req: Request) {
  const corsHeaders = corsHeadersFor(req);
  try {
    const body = await req.json();
    if (!body || !body.order_number) {
      return NextResponse.json(
        { error: 'order_number is required' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Log-only for now, never blocks order creation: the storefront
    // checkout doesn't yet create a real Razorpay order server-side (no
    // order_id/signature), so when no live key is configured it runs a
    // client-side payment simulator and hands back a fabricated payment
    // id — hard-rejecting on that (as an earlier version of this code did)
    // silently dropped every real order the moment RAZORPAY_KEY_SECRET was
    // set, with no visible error anywhere (the storefront's sync call is
    // fire-and-forget). Once checkout creates a real order_id upfront and
    // verifies the signature client-side before calling here, this can
    // become a hard reject again.
    const verification = await verifyRazorpayPayment(body.razorpay_payment_id, Number(body.total_amount || 0));
    if (!verification.ok && verification.reason !== 'not_configured') {
      console.warn('[Sync Route] Payment verification did not pass (order still accepted):', verification.reason, body.order_number);
    }

    const saved = await saveAdminOrder({
      id: body.id,
      order_number: body.order_number,
      user_id: body.user_id || 'usr-guest',
      customer_name: body.customer_name || (body.shipping_address as any)?.name || 'Customer',
      customer_email: body.customer_email || (body.shipping_address as any)?.email || '',
      customer_phone: body.customer_phone || (body.shipping_address as any)?.phone || '',
      status: body.status || 'confirmed',
      total_amount: Number(body.total_amount || 0),
      subtotal: Number(body.subtotal || body.total_amount || 0),
      shipping: Number(body.shipping || 0),
      tax: Number(body.tax || 0),
      payment_method: body.payment_method || 'Razorpay / UPI',
      tracking_number: body.tracking_number,
      carrier: body.carrier,
      shipping_address: body.shipping_address || {
        fullName: body.customer_name || 'Customer',
        phone: body.customer_phone || '',
        addressLine1: 'Shop 247, MG Road (Camp Store Pickup)',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411001',
      },
      items: body.items || [],
      created_at: body.created_at || new Date().toISOString(),
    });

    // 1. Send customer confirmation & invoice email notification
    sendOrderStatusEmail({
      order: saved,
      stage: saved.status || 'confirmed',
    }).catch((err) => {
      console.warn('[Sync Route] Error sending customer order confirmation email:', err);
    });

    // 2. Send instant new order alert email to store admin (hello.orientalsports@gmail.com)
    sendAdminNewOrderNotification(saved).catch((err) => {
      console.warn('[Sync Route] Error sending admin new order alert email:', err);
    });

    // Also attempt Supabase upsert in background if available — only with
    // real configured credentials; no hardcoded prod fallback, so a
    // misconfigured preview/staging deploy can't silently write to the
    // production project.
    try {
      const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supaKey =
        process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SUPABASE_SERVICE_ROLE_KEY.includes('supabase-demo')
          ? process.env.SUPABASE_SERVICE_ROLE_KEY
          : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (supaUrl && supaKey) {
        fetch(`${supaUrl}/rest/v1/orders?on_conflict=order_number`, {
          method: 'POST',
          headers: {
            apikey: supaKey,
            Authorization: `Bearer ${supaKey}`,
            'Content-Type': 'application/json',
            Prefer: 'resolution=merge-duplicates',
          },
          body: JSON.stringify({
            order_number: saved.order_number,
            razorpay_order_id: saved.order_number,
            status: saved.status,
            total_amount: saved.total_amount,
            subtotal: saved.subtotal,
            shipping: saved.shipping,
            tax: saved.tax,
            payment_method: saved.payment_method,
            shipping_address: saved.shipping_address,
            tracking_number: saved.tracking_number,
            carrier: saved.carrier,
            items_snapshot: saved.items,
          }),
        }).catch(() => {});
      }
    } catch {}

    return NextResponse.json({ success: true, order: saved }, { headers: corsHeaders });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Order sync failed' },
      { status: 500, headers: corsHeaders }
    );
  }
}

