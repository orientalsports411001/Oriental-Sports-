import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { UserProfile, Address, Order, OrderItem } from '../types/auth';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
  '';

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  '';

export const isSupabaseConfigured = (): boolean => {
  return (
    typeof supabaseUrl === 'string' &&
    supabaseUrl.trim().length > 0 &&
    !supabaseUrl.includes('your_supabase') &&
    typeof supabaseAnonKey === 'string' &&
    supabaseAnonKey.trim().length > 0 &&
    !supabaseAnonKey.includes('your_supabase')
  );
};

// Initialize client with fallback placeholder to avoid runtime crash on load if env vars are pending
export const supabase: SupabaseClient = createClient(
  isSupabaseConfigured() ? supabaseUrl : 'https://placeholder-project.supabase.co',
  isSupabaseConfigured() ? supabaseAnonKey : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder'
);

/**
 * Maps a database `profiles` row + associated `orders` into a UI-friendly UserProfile.
 */
export function mapDbProfileToUser(
  authUser: { id: string; email?: string | null; created_at?: string },
  profileRow: any,
  orders: Order[] = []
): UserProfile {
  const addresses: Address[] = Array.isArray(profileRow?.addresses)
    ? profileRow.addresses
    : [];

  const fullName =
    profileRow?.full_name ||
    [profileRow?.first_name, profileRow?.last_name].filter(Boolean).join(' ') ||
    authUser.email?.split('@')[0] ||
    'Oriental Athlete';

  const firstName =
    profileRow?.first_name ||
    fullName.split(' ')[0] ||
    'Athlete';

  const lastName =
    profileRow?.last_name ||
    fullName.split(' ').slice(1).join(' ') ||
    '';

  return {
    id: authUser.id,
    firstName,
    lastName,
    fullName,
    email: profileRow?.email || authUser.email || '',
    phone: profileRow?.phone || '',
    sportPreferences: Array.isArray(profileRow?.sport_preferences)
      ? profileRow.sport_preferences
      : ['Badminton', 'Tennis'],
    membershipTier: profileRow?.membership_tier || 'Club Athlete',
    addresses,
    orders,
    courtInquiries: [],
    createdAt: profileRow?.created_at || authUser.created_at || new Date().toISOString().split('T')[0],
  };
}

/**
 * Sync user profile to Supabase `profiles` table.
 */
export async function syncProfileToSupabase(user: UserProfile): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase.from('profiles').upsert(
      {
        id: user.id,
        first_name: user.firstName,
        last_name: user.lastName,
        full_name: user.fullName || `${user.firstName} ${user.lastName}`.trim(),
        email: user.email,
        phone: user.phone,
        sport_preferences: user.sportPreferences,
        membership_tier: user.membershipTier,
        addresses: user.addresses,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'id' }
    );
    if (error) {
      console.warn('Supabase profile sync error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Error syncing profile to Supabase:', err);
    return false;
  }
}

/**
 * Fetch orders for a user from Supabase.
 */
export async function fetchUserOrdersFromSupabase(userId: string): Promise<Order[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error || !data) return [];

    return data.map((row: any): Order => ({
      id: row.id,
      orderNumber: row.order_number,
      date: row.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
      status: row.status || 'confirmed',
      statusLabel: row.status_label || 'Order Confirmed',
      totalAmount: Number(row.total_amount || 0),
      subtotal: Number(row.subtotal || 0),
      shipping: Number(row.shipping || 0),
      tax: Number(row.tax || 0),
      paymentMethod: row.payment_method || 'Razorpay / UPI',
      shippingAddress: row.shipping_address || ({} as Address),
      trackingNumber: row.tracking_number,
      carrier: row.carrier,
      estimatedDelivery: row.estimated_delivery,
      timeline: row.timeline || [],
      items: (row.order_items || []).map((it: any): OrderItem => ({
        productId: it.product_id,
        productSlug: it.product_slug,
        productName: it.product_name,
        productImage: it.product_image,
        price: Number(it.price || 0),
        quantity: Number(it.quantity || 1),
        selectedVariant: it.selected_variant,
        selectedSize: it.selected_size,
      })),
    }));
  } catch (err) {
    console.warn('Error fetching orders from Supabase:', err);
    return [];
  }
}
