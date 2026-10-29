import { NextResponse } from 'next/server';
import { saveAdminOrder, getCachedOrders, AdminOrder } from '@/lib/catalog-store';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get('phone');
    const email = searchParams.get('email');

    let orders = getCachedOrders();
    if (phone) {
      const cleanPhone = phone.replace(/\D/g, '').slice(-10);
      orders = orders.filter((o) => o.customer_phone?.replace(/\D/g, '').includes(cleanPhone));
    }
    if (email) {
      orders = orders.filter((o) => o.customer_email?.toLowerCase() === email.toLowerCase());
    }

    return NextResponse.json({ success: true, orders }, { headers: corsHeaders });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to get orders' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || !body.order_number) {
      return NextResponse.json(
        { error: 'order_number is required' },
        { status: 400, headers: corsHeaders }
      );
    }

    const saved = saveAdminOrder({
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

    // Also attempt Supabase upsert in background if available
    try {
      const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tvfzfvurqewgvnnhhhad.supabase.co';
      const supaKey =
        process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SUPABASE_SERVICE_ROLE_KEY.includes('supabase-demo')
          ? process.env.SUPABASE_SERVICE_ROLE_KEY
          : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_WAr2l8gZ0bvYJSY0x1murQ_OGSoDB50';

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
