import { OrderStatus, TrackingStep } from '../types/auth';

/**
 * Normalizes any incoming status string from admin or Supabase
 * to the customer-facing OrderStatus type.
 */
export function normalizeOrderStatus(rawStatus?: string): OrderStatus {
  if (!rawStatus) return 'confirmed';
  const clean = rawStatus.toLowerCase().trim();

  if (clean === 'cancelled' || clean === 'failed') return 'cancelled';
  if (clean === 'delivered' || clean === 'completed') return 'delivered';
  if (clean === 'ready_for_pickup' || clean === 'ready' || clean === 'ready for pickup') return 'ready_for_pickup';
  if (clean === 'out_for_delivery') return 'out_for_delivery';
  if (clean === 'in_transit') return 'in_transit';
  if (clean === 'dispatched' || clean === 'shipped') return 'shipped';
  if (clean === 'processing' || clean === 'in_progress' || clean === 'in progress') return 'processing';
  if (clean === 'confirmed' || clean === 'paid' || clean === 'pending') return 'confirmed';

  return 'confirmed';
}

/**
 * Returns human-readable label for order status
 */
export function getOrderStatusLabel(status: OrderStatus | string, isPickup: boolean = false): string {
  const norm = normalizeOrderStatus(status);
  switch (norm) {
    case 'confirmed':
      return 'Order Confirmed';
    case 'processing':
      return 'Workshop Inspection & Stringing Prep';
    case 'shipped':
      return isPickup ? 'Ready for Camp Store Collection' : 'Dispatched / In Transit';
    case 'in_transit':
      return 'In Transit / Out for Delivery';
    case 'out_for_delivery':
      return 'Out for Delivery Today';
    case 'ready_for_pickup':
      return 'Ready for Camp Store Collection';
    case 'delivered':
      return isPickup ? 'Collected at Camp Store' : 'Delivered';
    case 'cancelled':
      return 'Order Cancelled';
    default:
      return 'Order Confirmed';
  }
}

/**
 * Format timestamp or date string into readable short date
 */
function formatStepDate(dateStr?: string, fallback: string = 'In queue'): string {
  if (!dateStr) return fallback;
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const now = new Date();
    const isToday =
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear();

    if (isToday) {
      return `Today, ${d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`;
    }
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return dateStr || fallback;
  }
}

/**
 * Dynamic timeline generator helper.
 * Automatically produces the completed and active stepper steps for whatever stage the order is in.
 */
export function generateOrderTimeline(
  status: OrderStatus | string,
  createdAt?: string,
  updatedAt?: string,
  trackingNumber?: string,
  carrier?: string,
  deliveryMethod?: string,
  shippingStreet?: string
): TrackingStep[] {
  const norm = normalizeOrderStatus(status);
  // deliveryMethod is the authoritative source (set at checkout). The
  // address-text fallback only runs when it's absent (legacy/admin-synced
  // orders) and must match the store's literal pickup-counter address, not
  // loose tokens like "camp" or "mg road" — "Camp" is a real, common Pune
  // locality name, so a loose match misclassified doorstep customers who
  // simply live there as pickup orders.
  const isPickup =
    deliveryMethod === 'camp_pickup' ||
    deliveryMethod === 'pickup' ||
    (!deliveryMethod &&
      shippingStreet &&
      (shippingStreet.toLowerCase().includes('shop 247') ||
        shippingStreet.toLowerCase().includes('camp store pickup')));

  const createdDateLabel = formatStepDate(createdAt, 'Order Logged');
  const updatedDateLabel = formatStepDate(updatedAt, 'Recently Updated');

  // Handle cancelled order
  if (norm === 'cancelled') {
    return [
      {
        status: 'confirmed',
        title: 'Order Logged',
        description: 'Order placed & logged into Oriental Sports fulfillment queue.',
        date: createdDateLabel,
        completed: true,
        current: false,
      },
      {
        status: 'cancelled',
        title: 'Order Cancelled',
        description:
          'This order has been cancelled. Any pre-authorized payment or UPI transaction will be refunded.',
        date: updatedDateLabel,
        completed: true,
        current: true,
      },
    ];
  }

  const dateFor = (rank: number, activeRank: number, readyLabel?: string) =>
    activeRank === rank ? (readyLabel ?? updatedDateLabel) : activeRank > rank ? 'Completed' : 'Upcoming';

  const step = (rank: number, activeRank: number, status: OrderStatus, title: string, description: string, date: string): TrackingStep => ({
    status,
    title,
    description,
    date,
    completed: activeRank >= rank,
    current: activeRank === rank,
  });

  if (isPickup) {
    // Pickup sequence (4 stages) — no courier/delivery steps at all, since
    // the order never leaves the store.
    let activeRank = 1;
    if (norm === 'processing') activeRank = 2;
    else if (norm === 'ready_for_pickup' || norm === 'shipped' || norm === 'in_transit' || norm === 'out_for_delivery') activeRank = 3;
    else if (norm === 'delivered') activeRank = 4;

    return [
      step(1, activeRank, 'confirmed', 'Order Confirmed', 'Order verified & payment booked into Oriental Sports workshop roster.', createdDateLabel),
      step(
        2,
        activeRank,
        'processing',
        'Workshop Inspection & Stringing Prep',
        'Frame tension check & master stringer inspection at Shop 247, MG Road.',
        dateFor(2, activeRank)
      ),
      step(
        3,
        activeRank,
        'ready_for_pickup',
        'Ready for Camp Store Collection',
        'Package is staged at Oriental Sports Camp flagship counter (Shop 247, MG Road, Camp). Bring order ID for verification.',
        dateFor(3, activeRank, 'Ready at Counter')
      ),
      step(4, activeRank, 'delivered', 'Collected / Handed Over', 'Handed over to customer at Oriental Sports Camp Store counter.', dateFor(4, activeRank)),
    ];
  }

  // Doorstep delivery sequence (5 stages) — dispatch and out-for-delivery
  // are distinct steps, matching the admin's own separate status options.
  let activeRank = 1;
  if (norm === 'processing') activeRank = 2;
  else if (norm === 'shipped' || norm === 'in_transit') activeRank = 3;
  else if (norm === 'out_for_delivery' || norm === 'ready_for_pickup') activeRank = 4;
  else if (norm === 'delivered') activeRank = 5;

  const dispatchDescription = carrier
    ? `Handed over to ${carrier}${trackingNumber ? ` (AWB: ${trackingNumber})` : ''} for expedited dispatch.`
    : 'Handed over to logistics carrier partner for expedited dispatch.';
  const outForDeliveryDescription = carrier
    ? `${carrier} delivery executive is out for doorstep delivery today.`
    : 'Delivery executive is out for doorstep delivery today.';

  return [
    step(1, activeRank, 'confirmed', 'Order Confirmed', 'Order verified & payment booked into Oriental Sports workshop roster.', createdDateLabel),
    step(
      2,
      activeRank,
      'processing',
      'Workshop Inspection & Packaging',
      'Equipment inspection, precision string tension calibration & export-grade packaging.',
      dateFor(2, activeRank)
    ),
    step(3, activeRank, 'shipped', 'Dispatched via Courier', dispatchDescription, dateFor(3, activeRank)),
    step(4, activeRank, 'out_for_delivery', 'Out for Delivery', outForDeliveryDescription, dateFor(4, activeRank, 'Out Today')),
    step(5, activeRank, 'delivered', 'Delivered', 'Delivered securely to your specified delivery address.', dateFor(5, activeRank)),
  ];
}
