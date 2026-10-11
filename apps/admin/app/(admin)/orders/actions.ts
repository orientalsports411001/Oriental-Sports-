'use server';

import { redirect } from 'next/navigation';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/require-admin';
import { isTransitionAllowed } from '@/lib/order-transitions';

/**
 * Changes an order's status, rejecting any transition not explicitly
 * allowed by ALLOWED_ORDER_TRANSITIONS — this check happens here, in the
 * server action that actually writes, not only in the UI that hides
 * disallowed buttons, so a crafted request can't skip states.
 */
export async function changeOrderStatus(orderId: string, formData: FormData) {
  await requireAdmin();
  const admin = createServiceRoleClient();

  const nextStatus = String(formData.get('next_status') || '');

  const { data: order } = await admin.from('orders').select('status').eq('id', orderId).maybeSingle();
  if (!order) {
    redirect(`/orders/${orderId}?error=${encodeURIComponent('Order not found')}`);
  }

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
    redirect(`/orders/${orderId}?error=${encodeURIComponent(error.message)}`);
  }

  redirect(`/orders/${orderId}?saved=1`);
}

export async function updateTracking(orderId: string, formData: FormData) {
  await requireAdmin();
  const admin = createServiceRoleClient();

  const trackingNumber = String(formData.get('tracking_number') || '').trim() || null;
  const carrier = String(formData.get('carrier') || '').trim() || null;

  const { data: order } = await admin.from('orders').select('status').eq('id', orderId).maybeSingle();
  if (!order) {
    redirect(`/orders/${orderId}?error=${encodeURIComponent('Order not found')}`);
  }

  const trackableStatuses = ['processing', 'shipped', 'delivered'];
  if (!trackableStatuses.includes(order.status)) {
    redirect(
      `/orders/${orderId}?error=${encodeURIComponent(
        'Tracking info can only be set once the order is processing or later.'
      )}`
    );
  }

  const { error } = await admin
    .from('orders')
    .update({ tracking_number: trackingNumber, carrier, updated_at: new Date().toISOString() })
    .eq('id', orderId);

  if (error) {
    redirect(`/orders/${orderId}?error=${encodeURIComponent(error.message)}`);
  }

  redirect(`/orders/${orderId}?saved=1`);
}
