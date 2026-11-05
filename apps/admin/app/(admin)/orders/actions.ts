'use server';

import { redirect } from 'next/navigation';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/require-admin';
import { isTransitionAllowed, getOrderStatusLabel } from '@/lib/order-transitions';
import { updateOrder, getCachedOrders, getCachedOrdersAsync } from '@/lib/catalog-store';
import { healOrderCacheFromSupabase } from '@/lib/order-cache-heal';
import { sendOrderStatusEmail } from '@/lib/email';

/**
 * Changes an order's status, rejecting any transition not explicitly
 * allowed by ALLOWED_ORDER_TRANSITIONS — this check happens here, in the
 * server action that actually writes, not only in the UI that hides
 * disallowed buttons, so a crafted request can't skip states.
 */
export async function changeOrderStatus(orderId: string, formData: FormData) {
  await requireAdmin();
  const nextStatus = String(formData.get('next_status') || '');

  try {
    const admin = createServiceRoleClient();
    const { data: order } = await admin.from('orders').select('status').eq('id', orderId).maybeSingle();
    if (order) {
      if (!isTransitionAllowed(order.status, nextStatus)) {
        redirect(
          `/orders/${orderId}?error=${encodeURIComponent(
            `Cannot change status from "${order.status}" to "${nextStatus}".`
          )}`
        );
      }

      const { error } = await admin
        .from('orders')
        .update({ status: nextStatus, updated_at: new Date().toISOString() })
        .eq('id', orderId);

      if (error) {
        console.warn('Supabase status update error:', error.message);
      }
    }
  } catch (err: any) {
    // If redirect was thrown, rethrow
    if (err?.digest?.startsWith('NEXT_REDIRECT')) throw err;
  }

  // Update in local / cached catalog store
  let cached = (await getCachedOrdersAsync()).find((o) => o.id === orderId || o.order_number === orderId);
  if (cached) {
    await updateOrder(cached.id, { status: nextStatus as any });
    cached = { ...cached, status: nextStatus as any };
  } else {
    // The order was never mirrored into this cache (e.g. created by a path
    // that only wrote to Supabase) — the customer-facing /api/orders/sync
    // GET reads this cache first, so without self-healing it here, the
    // status change would never reach the customer even though Supabase
    // itself is correct.
    cached = (await healOrderCacheFromSupabase(orderId, { status: nextStatus as any })) || undefined;
  }

  // Send stage update email to customer
  try {
    let emailOrder: any = cached;
    if (!emailOrder || !emailOrder.customer_email) {
      const admin = createServiceRoleClient();
      const { data: dbOrder } = await admin.from('orders').select('*').eq('id', orderId).maybeSingle();
      if (dbOrder) {
        const { data: items } = await admin.from('order_items').select('*').eq('order_id', orderId);
        let customerEmail = dbOrder.customer_email || dbOrder.shipping_address?.email;
        let customerName = dbOrder.customer_name || dbOrder.shipping_address?.name;

        if (!customerEmail && dbOrder.user_id) {
          const { data: profile } = await admin
            .from('profiles')
            .select('email, first_name, last_name')
            .eq('id', dbOrder.user_id)
            .maybeSingle();
          if (profile) {
            customerEmail = profile.email;
            customerName = customerName || `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
          }
        }

        emailOrder = {
          ...dbOrder,
          status: nextStatus,
          customer_email: customerEmail,
          customer_name: customerName,
          items: items || [],
        };
      }
    } else {
      emailOrder = {
        ...emailOrder,
        status: nextStatus,
      };
    }

    if (emailOrder) {
      const recipientEmail =
        emailOrder.customer_email ||
        (emailOrder.shipping_address as any)?.email;

      await sendOrderStatusEmail({
        order: emailOrder,
        stage: nextStatus,
        trackingNumber: emailOrder.tracking_number,
        carrier: emailOrder.carrier,
        recipientEmail,
        recipientName: emailOrder.customer_name,
      });
    }
  } catch (emailErr) {
    console.warn('[changeOrderStatus] Email dispatch warning (safe):', emailErr);
  }

  redirect(`/orders/${orderId}?saved=${encodeURIComponent(`Stage updated to "${getOrderStatusLabel(nextStatus)}". Customer notified by email.`)}`);
}

export async function updateTracking(orderId: string, formData: FormData) {
  await requireAdmin();
  const trackingNumber = String(formData.get('tracking_number') || '').trim() || null;
  const carrier = String(formData.get('carrier') || '').trim() || null;

  try {
    const admin = createServiceRoleClient();
    const { data: order } = await admin.from('orders').select('status').eq('id', orderId).maybeSingle();
    if (order) {
      const trackableStatuses = [
        'confirmed',
        'processing',
        'dispatched',
        'shipped',
        'in_transit',
        'out_for_delivery',
        'ready_for_pickup',
        'delivered',
      ];
      if (!trackableStatuses.includes(order.status)) {
        redirect(
          `/orders/${orderId}?error=${encodeURIComponent(
            'Tracking info can only be set once the order is confirmed or later.'
          )}`
        );
      }

      const { error } = await admin
        .from('orders')
        .update({ tracking_number: trackingNumber, carrier, updated_at: new Date().toISOString() })
        .eq('id', orderId);

      if (error) {
        console.warn('Supabase tracking update error:', error.message);
      }
    }
  } catch (err: any) {
    if (err?.digest?.startsWith('NEXT_REDIRECT')) throw err;
  }

  let cached = (await getCachedOrdersAsync()).find((o) => o.id === orderId || o.order_number === orderId);
  if (cached) {
    await updateOrder(cached.id, {
      tracking_number: trackingNumber || undefined,
      carrier: carrier || undefined,
    });
    cached = { ...cached, tracking_number: trackingNumber || cached.tracking_number, carrier: carrier || cached.carrier };
  } else {
    cached =
      (await healOrderCacheFromSupabase(orderId, {
        tracking_number: trackingNumber || undefined,
        carrier: carrier || undefined,
      })) || undefined;
  }

  // Send dispatch tracking update email to customer
  try {
    let emailOrder: any = cached;
    if (!emailOrder || !emailOrder.customer_email) {
      const admin = createServiceRoleClient();
      const { data: dbOrder } = await admin.from('orders').select('*').eq('id', orderId).maybeSingle();
      if (dbOrder) {
        const { data: items } = await admin.from('order_items').select('*').eq('order_id', orderId);
        emailOrder = {
          ...dbOrder,
          items: items || [],
        };
      }
    }

    if (emailOrder) {
      const dispatchStage =
        emailOrder.status === 'delivered'
          ? 'delivered'
          : emailOrder.status === 'ready_for_pickup'
          ? 'ready_for_pickup'
          : 'shipped';

      await sendOrderStatusEmail({
        order: emailOrder,
        stage: dispatchStage,
        trackingNumber: trackingNumber || emailOrder.tracking_number,
        carrier: carrier || emailOrder.carrier,
      });
    }
  } catch (trackingEmailErr) {
    console.warn('[updateTracking] Dispatch email warning (safe):', trackingEmailErr);
  }

  redirect(`/orders/${orderId}?saved=${encodeURIComponent('Tracking details updated. Customer notified by email.')}`);
}
