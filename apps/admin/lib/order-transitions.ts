/**
 * Explicit allowed order-status transitions. Any transition not listed here
 * is rejected — both the UI (hiding disallowed buttons) and the server
 * action/route handler that actually writes the status change must check
 * this, so a crafted request can't bypass the UI.
 */
export const ALLOWED_ORDER_TRANSITIONS: Record<string, string[]> = {
  pending: ['confirmed', 'paid', 'processing', 'dispatched', 'shipped', 'cancelled', 'failed'],
  paid: ['confirmed', 'processing', 'dispatched', 'shipped', 'ready_for_pickup', 'cancelled'],
  confirmed: ['processing', 'dispatched', 'shipped', 'out_for_delivery', 'ready_for_pickup', 'delivered', 'cancelled'],
  processing: ['dispatched', 'shipped', 'out_for_delivery', 'in_transit', 'ready_for_pickup', 'delivered', 'cancelled'],
  dispatched: ['out_for_delivery', 'in_transit', 'delivered', 'processing', 'cancelled'],
  shipped: ['out_for_delivery', 'in_transit', 'dispatched', 'delivered', 'processing', 'cancelled'],
  in_transit: ['out_for_delivery', 'delivered', 'dispatched', 'cancelled'],
  out_for_delivery: ['delivered', 'in_transit', 'dispatched', 'cancelled'],
  ready_for_pickup: ['delivered', 'processing', 'cancelled'],
  delivered: ['out_for_delivery', 'dispatched', 'processing'], // Allow admin to revert if mistakenly marked
  cancelled: ['confirmed', 'processing'],
  failed: ['confirmed', 'pending'],
};

export function isTransitionAllowed(from: string, to: string): boolean {
  if (from === to) return false;
  return ALLOWED_ORDER_TRANSITIONS[from]?.includes(to) ?? false;
}

export const ORDER_STATUS_LABELS: Record<string, string> = {
  confirmed: 'Confirmed (Order Logged)',
  processing: 'Processing (Workshop Inspection)',
  dispatched: 'Dispatched (Courier Handover)',
  shipped: 'Dispatched / Shipped',
  out_for_delivery: 'Out for Delivery (Doorstep Today)',
  in_transit: 'In Transit',
  ready_for_pickup: 'Ready for Camp Store Pickup',
  delivered: 'Delivered & Verified (Handover Complete)',
  cancelled: 'Cancelled',
};

export function getOrderStatusLabel(status: string): string {
  return ORDER_STATUS_LABELS[status] || (status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' '));
}
