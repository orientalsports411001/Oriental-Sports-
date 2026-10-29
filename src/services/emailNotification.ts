/**
 * Oriental Sports — Client Email Notification Helper
 * Provides a lightweight client-side helper to trigger order email
 * notifications from the storefront checkout or customer account flow.
 */

export interface NotifyOrderEmailParams {
  order: any;
  stage?:
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'in_transit'
    | 'ready_for_pickup'
    | 'delivered'
    | string;
  trackingNumber?: string | null;
  carrier?: string | null;
  customerEmail?: string;
  customerName?: string;
}

export interface NotifyOrderEmailResponse {
  success: boolean;
  simulated?: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Triggers /api/email/notify on the admin backend.
 * Safely handles dev vs production endpoints, catches network errors,
 * and ensures client actions (like checkout) never crash or stall.
 */
export async function sendOrderEmailNotification(
  params: NotifyOrderEmailParams
): Promise<NotifyOrderEmailResponse> {
  const order = params.order || {};
  const recipientEmail =
    params.customerEmail ||
    order.customerEmail ||
    order.customer_email ||
    order.shippingAddress?.email ||
    order.shipping_address?.email;

  const recipientName =
    params.customerName ||
    order.customerName ||
    order.customer_name ||
    order.shippingAddress?.name ||
    order.shipping_address?.name;

  const payload = {
    order: {
      id: order.id,
      order_number: order.orderNumber || order.order_number,
      customer_name: recipientName,
      customer_email: recipientEmail,
      status: params.stage || order.status || 'confirmed',
      total_amount: order.totalAmount ?? order.total_amount ?? 0,
      subtotal: order.subtotal ?? order.totalAmount ?? order.total_amount ?? 0,
      shipping: order.shipping ?? 0,
      tax: order.tax ?? 0,
      payment_method: order.paymentMethod || order.payment_method,
      tracking_number: params.trackingNumber || order.trackingNumber || order.tracking_number,
      carrier: params.carrier || order.carrier,
      shipping_address: order.shippingAddress || order.shipping_address,
      items: order.items || [],
      created_at: order.date || order.created_at || new Date().toISOString(),
    },
    stage: params.stage || order.status || 'confirmed',
    trackingNumber: params.trackingNumber || order.trackingNumber || order.tracking_number,
    carrier: params.carrier || order.carrier,
    customerEmail: recipientEmail,
    customerName: recipientName,
  };

  const isLocal =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  // Try production admin first, or localhost in local development
  const primaryEndpoint = isLocal
    ? 'http://localhost:3001/api/email/notify'
    : 'https://admin.orientalsports.in/api/email/notify';

  try {
    const res = await fetch(primaryEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.warn('[emailNotification] Server warning:', res.status, data);
      return {
        success: false,
        error: data?.error || `Email notify failed with status ${res.status}`,
      };
    }

    return {
      success: true,
      simulated: data.simulated ?? false,
      messageId: data.messageId,
    };
  } catch (err: any) {
    // If local dev 3001 was unreachable, try production as fallback
    if (isLocal) {
      try {
        const fallbackRes = await fetch('https://admin.orientalsports.in/api/email/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const fbData = await fallbackRes.json().catch(() => ({}));
        if (fallbackRes.ok) {
          return { success: true, simulated: fbData.simulated ?? false, messageId: fbData.messageId };
        }
      } catch {}
    }

    console.warn('[emailNotification] Notification request bypassed:', err?.message || err);
    return {
      success: false,
      error: err?.message || 'Network error reaching email dispatch service',
    };
  }
}

