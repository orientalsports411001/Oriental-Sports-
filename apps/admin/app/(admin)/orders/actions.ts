'use server';

import { redirect } from 'next/navigation';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/require-admin';
import { isTransitionAllowed } from '@/lib/order-transitions';
import { updateOrder, getCachedOrders } from '@/lib/catalog-store';
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
  const cached = getCachedOrders().find((o) => o.id === orderId || o.order_number === orderId);
  if (cached) {
    updateOrder(cached.id, { status: nextStatus as any });
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
          customer_email: customerEmail,
          customer_name: customerName,
          items: items || [],
        };
      }
    }

    if (emailOrder) {
      await sendOrderStatusEmail({
        order: emailOrder,
        stage: nextStatus,
        trackingNumber: emailOrder.tracking_number,
        carrier: emailOrder.carrier,
      });
    }
  } catch (emailErr) {
    console.warn('[changeOrderStatus] Email dispatch warning (safe):', emailErr);
  }

  redirect(`/orders/${orderId}?saved=1`);
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
        'shipped',
        'in_transit',
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

  const cached = getCachedOrders().find((o) => o.id === orderId || o.order_number === orderId);
  if (cached) {
    updateOrder(cached.id, {
      tracking_number: trackingNumber || undefined,
      carrier: carrier || undefined,
    });
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

  redirect(`/orders/${orderId}?saved=1`);
}
