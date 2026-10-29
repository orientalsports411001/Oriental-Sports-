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
  if (clean === 'in_transit' || clean === 'dispatched') return 'in_transit';
  if (clean === 'shipped') return 'shipped';
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
  const isPickup =
    deliveryMethod === 'camp_pickup' ||
    deliveryMethod === 'pickup' ||
    (shippingStreet &&
      (shippingStreet.toLowerCase().includes('camp') ||
        shippingStreet.toLowerCase().includes('pickup') ||
        shippingStreet.toLowerCase().includes('shop 247') ||
        shippingStreet.toLowerCase().includes('mg road')));

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

  // Determine stage rank (1: confirmed, 2: processing, 3: dispatched/ready, 4: delivered)
  let activeRank = 1;
  if (norm === 'confirmed') activeRank = 1;
  else if (norm === 'processing') activeRank = 2;
  else if (norm === 'shipped' || norm === 'in_transit' || norm === 'out_for_delivery' || norm === 'ready_for_pickup') {
    activeRank = 3;
  } else if (norm === 'delivered') {
    activeRank = 4;
  }

  // Build the 4 sequential milestones
  // Step 1: Confirmed
  const step1: TrackingStep = {
    status: 'confirmed',
    title: 'Order Confirmed',
    description: 'Order verified & payment booked into Oriental Sports workshop roster.',
    date: createdDateLabel,
    completed: activeRank >= 1,
    current: activeRank === 1,
  };

  // Step 2: Processing / Workshop prep
  const step2: TrackingStep = {
    status: 'processing',
    title: 'Workshop Inspection & Stringing Prep',
    description: isPickup
      ? 'Frame tension check & master stringer inspection at Shop 247, MG Road.'
      : 'Equipment inspection, precision string tension calibration & export-grade packaging.',
    date: activeRank === 2 ? updatedDateLabel : activeRank > 2 ? 'Completed' : 'Upcoming',
    completed: activeRank >= 2,
    current: activeRank === 2,
  };

  // Step 3: Logistics / Pickup ready
  const step3Title = isPickup
    ? 'Ready for Camp Store Collection'
    : norm === 'in_transit'
    ? 'In Transit / Out for Delivery'
    : 'Dispatched / In Transit';

  const step3Description = isPickup
    ? 'Package is staged at Oriental Sports Camp flagship counter (Shop 247, MG Road, Camp). Bring order ID for verification.'
    : carrier
    ? `Handed over to ${carrier}${trackingNumber ? ` (AWB: ${trackingNumber})` : ''} for expedited dispatch.`
    : 'Handed over to logistics carrier partner for expedited dispatch.';

  const step3Date =
    activeRank === 3
      ? isPickup
        ? 'Ready at Counter'
        : updatedDateLabel
      : activeRank > 3
      ? 'Completed'
      : 'Upcoming';

  const step3: TrackingStep = {
    status: isPickup ? 'ready_for_pickup' : (norm === 'in_transit' ? 'in_transit' : 'shipped'),
    title: step3Title,
    description: step3Description,
    date: step3Date,
    completed: activeRank >= 3,
    current: activeRank === 3,
  };

  // Step 4: Handed Over / Delivered
  const step4Title = isPickup ? 'Collected / Handed Over' : 'Delivered / Handed Over';
  const step4Description = isPickup
    ? 'Handed over to customer at Oriental Sports Camp Store counter.'
    : 'Delivered securely to your specified delivery address.';

  const step4: TrackingStep = {
    status: 'delivered',
    title: step4Title,
    description: step4Description,
    date: activeRank === 4 ? updatedDateLabel : 'Upcoming',
    completed: activeRank >= 4,
    current: activeRank === 4,
  };

  return [step1, step2, step3, step4];
}
