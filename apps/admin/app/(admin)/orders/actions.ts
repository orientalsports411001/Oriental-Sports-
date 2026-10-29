'use server';

import { redirect } from 'next/navigation';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/require-admin';
import { isTransitionAllowed } from '@/lib/order-transitions';
import { updateOrder, getCachedOrders } from '@/lib/catalog-store';

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
      const trackableStatuses = ['processing', 'shipped', 'delivered', 'confirmed'];
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

  redirect(`/orders/${orderId}?saved=1`);
}
