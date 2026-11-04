import { NextResponse } from 'next/server';
import { saveAdminOrder, getCachedOrders, getCachedOrdersAsync, AdminOrder } from '@/lib/catalog-store';
import { sendOrderStatusEmail, sendAdminNewOrderNotification } from '@/lib/email';
import { verifyRazorpayPayment } from '@/lib/razorpay-verify';

export const dynamic = 'force-dynamic';

const ALLOWED_ORIGINS = new Set([
  'https://orientalsports.in',
  'https://www.orientalsports.in',
  'http://localhost:5173',
  'http://localhost:3000',
]);

function corsHeadersFor(req: Request) {
  const origin = req.headers.get('origin') || '';
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.has(origin) ? origin : 'https://orientalsports.in',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    Vary: 'Origin',
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
    const orders = allOrders.filter((o) => {
      const orderPhone = (o.customer_phone || (o.shipping_address as any)?.phone || '').replace(/\D/g, '').slice(-10);
      const orderEmail = (o.customer_email || (o.shipping_address as any)?.email || '').toLowerCase().trim();

      const phoneMatches = validPhone ? orderPhone === validPhone : false;
      const emailMatches = validEmail ? orderEmail === validEmail : false;
      return phoneMatches || emailMatches;
    });

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

    // Confirm the payment actually happened before an order gets created —
    // without this, anyone who can call this endpoint (it's reachable from
    // the browser) could POST a fabricated order with no payment behind it.
    // If RAZORPAY_KEY_SECRET isn't provisioned yet, verification is skipped
    // (reason 'not_configured') rather than blocking checkout entirely, but
    // any payment lookup failure/mismatch once configured hard-rejects.
    const verification = await verifyRazorpayPayment(body.razorpay_payment_id, Number(body.total_amount || 0));
    if (!verification.ok && verification.reason !== 'not_configured') {
      console.warn('[Sync Route] Rejected order — payment verification failed:', verification.reason, body.order_number);
      return NextResponse.json(
        { success: false, error: 'Payment could not be verified', reason: verification.reason },
        { status: 402, headers: corsHeaders }
      );
    }
    if (verification.reason === 'not_configured') {
      console.warn('[Sync Route] RAZORPAY_KEY_SECRET not set — payment verification skipped for', body.order_number);
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

