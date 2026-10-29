/**
 * Explicit allowed order-status transitions. Any transition not listed here
 * is rejected — both the UI (hiding disallowed buttons) and the server
 * action/route handler that actually writes the status change must check
 * this, so a crafted request can't bypass the UI.
 */
export const ALLOWED_ORDER_TRANSITIONS: Record<string, string[]> = {
  pending: ['paid', 'confirmed', 'failed'],
  paid: ['processing', 'shipped', 'cancelled'],
  confirmed: ['processing', 'shipped', 'cancelled'],
  processing: ['shipped', 'delivered', 'cancelled'],
  shipped: ['delivered'],
  delivered: [],
  cancelled: [],
  failed: [],
};

export function isTransitionAllowed(from: string, to: string): boolean {
  if (from === to) return false;
  return ALLOWED_ORDER_TRANSITIONS[from]?.includes(to) ?? false;
}
