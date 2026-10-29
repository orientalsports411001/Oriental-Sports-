/**
 * Explicit allowed order-status transitions. Any transition not listed here
 * is rejected — both the UI (hiding disallowed buttons) and the server
 * action/route handler that actually writes the status change must check
 * this, so a crafted request can't bypass the UI.
 */
export const ALLOWED_ORDER_TRANSITIONS: Record<string, string[]> = {
  pending: ['paid', 'confirmed', 'failed'],
  paid: ['processing', 'shipped', 'ready_for_pickup', 'cancelled'],
  confirmed: ['processing', 'shipped', 'ready_for_pickup', 'cancelled'],
  processing: ['shipped', 'in_transit', 'ready_for_pickup', 'delivered', 'cancelled'],
  shipped: ['in_transit', 'delivered'],
  in_transit: ['delivered'],
  ready_for_pickup: ['delivered'],
  delivered: [],
  cancelled: [],
  failed: [],
};

export function isTransitionAllowed(from: string, to: string): boolean {
  if (from === to) return false;
  return ALLOWED_ORDER_TRANSITIONS[from]?.includes(to) ?? false;
}
