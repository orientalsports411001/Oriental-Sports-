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
