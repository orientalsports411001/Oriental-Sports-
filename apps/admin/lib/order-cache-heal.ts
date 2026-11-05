import { createServiceRoleClient } from './supabase/server';
import { saveAdminOrder, AdminOrder } from './catalog-store';

/**
 * Pulls a full order from Supabase and upserts it into the shared
 * Cloudinary-backed cache. Used when a status/tracking update targets an
 * order that Supabase has but the cache doesn't (e.g. created by a path
 * that only wrote to Supabase) — without this, the customer-facing
 * /api/orders/sync GET (which only reads the cache) would never see the
 * change even though Supabase itself is correct.
 */
export async function healOrderCacheFromSupabase(
  orderId: string,
  overrides: Partial<AdminOrder> = {}
): Promise<AdminOrder | null> {
  try {
    const admin = createServiceRoleClient();
    const { data: dbOrder } = await admin.from('orders').select('*').eq('id', orderId).maybeSingle();
    if (!dbOrder) return null;

    const { data: items } = await admin.from('order_items').select('*').eq('order_id', orderId);

    return await saveAdminOrder({
      id: dbOrder.id,
      order_number: dbOrder.order_number,
      user_id: dbOrder.user_id || 'usr-guest',
      customer_name: dbOrder.customer_name || dbOrder.shipping_address?.name || 'Customer',
      customer_email: dbOrder.customer_email || dbOrder.shipping_address?.email || '',
      customer_phone: dbOrder.customer_phone || dbOrder.shipping_address?.phone || '',
      status: dbOrder.status || 'confirmed',
      total_amount: Number(dbOrder.total_amount || 0),
      subtotal: Number(dbOrder.subtotal || dbOrder.total_amount || 0),
      shipping: Number(dbOrder.shipping || 0),
      tax: Number(dbOrder.tax || 0),
      payment_method: dbOrder.payment_method || 'Razorpay / UPI',
      tracking_number: dbOrder.tracking_number,
      carrier: dbOrder.carrier,
      created_at: dbOrder.created_at || new Date().toISOString(),
      shipping_address: dbOrder.shipping_address,
      items: (items || []).map((it: any) => ({
        product_name: it.product_name,
        price: it.price,
        quantity: it.quantity,
        selected_variant: it.selected_variant,
      })),
      ...overrides,
    });
  } catch (err) {
    console.warn('[healOrderCacheFromSupabase] warning (safe):', err);
    return null;
  }
}
