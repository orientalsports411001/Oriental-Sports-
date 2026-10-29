import { NextResponse } from 'next/server';
import { sendOrderStatusEmail, OrderEmailData } from '@/lib/email';
import { getCachedOrders } from '@/lib/catalog-store';

export const dynamic = 'force-dynamic';

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

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { success: false, error: 'Empty or invalid JSON body' },
        { status: 400, headers: corsHeaders }
      );
    }

    let orderData: OrderEmailData | null = null;

    if (body.order && typeof body.order === 'object') {
      orderData = {
        id: body.order.id,
        order_number: body.order.order_number || body.order.orderNumber,
        customer_name:
          body.order.customer_name ||
          body.order.customerName ||
          body.customerName ||
          body.order.shipping_address?.name ||
          body.order.shippingAddress?.name,
        customer_email:
          body.customerEmail ||
          body.order.customer_email ||
          body.order.customerEmail ||
          body.order.shipping_address?.email ||
          body.order.shippingAddress?.email,
        customer_phone:
          body.order.customer_phone ||
          body.order.customerPhone ||
          body.order.shipping_address?.phone ||
          body.order.shippingAddress?.phone,
        status: body.stage || body.order.status || 'confirmed',
        total_amount: Number(body.order.total_amount ?? body.order.totalAmount ?? 0),
        subtotal: Number(body.order.subtotal ?? body.order.total_amount ?? 0),
        shipping: Number(body.order.shipping ?? 0),
        tax: Number(body.order.tax ?? 0),
        payment_method: body.order.payment_method || body.order.paymentMethod,
        tracking_number: body.trackingNumber || body.order.tracking_number || body.order.trackingNumber,
        carrier: body.carrier || body.order.carrier,
        created_at: body.order.created_at || body.order.date || new Date().toISOString(),
        items: (body.order.items || []).map((it: any) => ({
          product_name: it.product_name || it.productName || 'Equipment Item',
          price: Number(it.price || 0),
          quantity: Number(it.quantity || 1),
          selected_variant: it.selected_variant || it.selectedVariant,
          selected_size: it.selected_size || it.selectedSize,
        })),
        shipping_address: body.order.shipping_address || body.order.shippingAddress,
      };
    } else if (body.order_number || body.orderId || body.order_id) {
      // Lookup order from local catalog cache
      const orderIdOrNum = body.order_number || body.orderId || body.order_id;
      const cached = getCachedOrders().find(
        (o) => o.id === orderIdOrNum || o.order_number === orderIdOrNum
      );

      if (cached) {
        orderData = {
          ...cached,
          customer_email: body.customerEmail || cached.customer_email,
          customer_name: body.customerName || cached.customer_name,
        };
      }
    }

    if (!orderData || !orderData.order_number) {
      return NextResponse.json(
        {
          success: false,
          error: 'Order data with a valid order_number is required.',
        },
        { status: 400, headers: corsHeaders }
      );
    }

    const stage = body.stage || orderData.status || 'confirmed';
    const trackingNumber = body.trackingNumber || orderData.tracking_number;
    const carrier = body.carrier || orderData.carrier;
    const recipientEmail =
      body.customerEmail ||
      orderData.customer_email ||
      (orderData.shipping_address as any)?.email;

    const result = await sendOrderStatusEmail({
      order: orderData,
      stage,
      trackingNumber,
      carrier,
      recipientEmail,
      recipientName: body.customerName || orderData.customer_name,
    });

    return NextResponse.json(
      {
        success: result.success,
        simulated: result.simulated ?? false,
        messageId: result.messageId,
        stage: result.stage,
        orderNumber: result.orderNumber,
        recipient: result.recipient,
        error: result.error,
      },
      { status: result.success ? 200 : 422, headers: corsHeaders }
    );
  } catch (err: any) {
    console.error('[API /api/email/notify] Unhandled error:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Internal server error processing email notification' },
      { status: 500, headers: corsHeaders }
    );
  }
}
