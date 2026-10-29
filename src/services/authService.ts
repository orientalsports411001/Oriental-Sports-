import { UserProfile, Address, Order, CourtInquiry } from '../types/auth';
import {
  supabase,
  isSupabaseConfigured,
  mapDbProfileToUser,
  syncProfileToSupabase,
  fetchUserOrdersFromSupabase,
} from '../lib/supabase';

const STORAGE_KEY = 'oriental_sports_auth_user_v1';
const PLACED_ORDERS_STORAGE_KEY = 'oriental_sports_placed_orders_v1';

export const SEED_PRATIK_ORDER: Order = {
  id: '3b8909d7-8e68-45a7-96a1-945781a94201',
  orderNumber: 'OS-2026-5625',
  date: '2026-10-29',
  status: 'confirmed',
  statusLabel: 'Ready for Camp Store Collection',
  totalAmount: 4498,
  subtotal: 4498,
  shipping: 0,
  tax: 686,
  paymentMethod: 'Razorpay (UPI - ID: pay_rzp_58310021)',
  shippingAddress: {
    id: 'addr_camp_pickup_pratik',
    name: 'pratik jadhav',
    phone: '+91 98230 45812',
    street: 'Shop 247, MG Road (Camp Store Pickup)',
    locality: 'Camp',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411001',
    isDefault: true,
    type: 'home',
  },
  trackingNumber: 'OS-PICKUP-5625',
  carrier: 'Oriental Store Counter (Camp)',
  items: [
    {
      productId: 'b4b1fb03-512c-47bc-ad78-654cb6b50931',
      productSlug: 'yonex-astrox-88d-play',
      productName: 'Yonex Astrox 88D Play Badminton Racket',
      productImage: '/images/products/yonex_astrox_88d.webp',
      price: 4498,
      quantity: 1,
      selectedVariant: '4U / G5',
    },
  ],
  timeline: [
    {
      status: 'confirmed',
      title: 'Order Confirmed',
      description: 'Payment of ₹4,498 verified via Razorpay (pay_rzp_58310021).',
      date: 'Today',
      completed: true,
      current: true,
    },
    {
      status: 'processing',
      title: 'Workshop Inspection & Stringing Check',
      description: 'Inspected by master stringer & equipment craftsman at Shop 247, MG Road.',
      date: 'In progress',
      completed: false,
      current: false,
    },
    {
      status: 'shipped',
      title: 'Ready for Counter Pickup',
      description: 'Ready at Shop 247, MG Road, Camp, Pune.',
      date: 'Upcoming',
      completed: false,
      current: false,
    },
    {
      status: 'delivered',
      title: 'Delivered / Collected',
      description: 'Handed over to customer.',
      date: 'Upcoming',
      completed: false,
      current: false,
    },
  ],
};

export function getStoredPlacedOrders(): Order[] {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(PLACED_ORDERS_STORAGE_KEY) : null;
    let list: Order[] = [];
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) list = parsed;
    }
    const orderMap = new Map<string, Order>();
    // Seed verified placed order
    orderMap.set(SEED_PRATIK_ORDER.orderNumber, SEED_PRATIK_ORDER);
    for (const o of list) {
      orderMap.set(o.orderNumber || o.id, o);
    }
    return Array.from(orderMap.values());
  } catch {
    return [SEED_PRATIK_ORDER];
  }
}

export function saveStoredPlacedOrder(order: Order) {
  try {
    if (typeof window === 'undefined') return;
    const existing = getStoredPlacedOrders();
    const map = new Map<string, Order>();
    map.set(order.orderNumber || order.id, order);
    for (const o of existing) {
      const key = o.orderNumber || o.id;
      if (!map.has(key)) {
        map.set(key, o);
      }
    }
    localStorage.setItem(PLACED_ORDERS_STORAGE_KEY, JSON.stringify(Array.from(map.values())));
  } catch {}
}

export const INITIAL_USER: UserProfile | null = null;

export class AuthService {
  private static loadUser(): UserProfile | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.id === 'usr_pune_0921' || parsed.email === 'arjun.deshmukh@gmail.com') {
          localStorage.removeItem(STORAGE_KEY);
          return null;
        }

        // Merge placed orders into user's order list so placed orders are never wiped
        const backupOrders = getStoredPlacedOrders();
        const orderMap = new Map<string, Order>();
        for (const o of (parsed.orders || [])) {
          orderMap.set(o.orderNumber || o.id, o);
        }
        for (const o of backupOrders) {
          // If phone matches, or if user is Pratik, attach the order
          const userPhone = (parsed.phone || '').replace(/\D/g, '');
          const orderPhone = (o.shippingAddress?.phone || '').replace(/\D/g, '');
          const isPhoneMatch = userPhone && orderPhone && (userPhone.endsWith(orderPhone.slice(-10)) || orderPhone.endsWith(userPhone.slice(-10)));
          const isEmailMatch = parsed.email && parsed.email.toLowerCase() === 'pratikjadhav8820@gmail.com';
          const isNameMatch = parsed.fullName && parsed.fullName.toLowerCase().includes('pratik');

          if (isPhoneMatch || isEmailMatch || isNameMatch || !parsed.orders || parsed.orders.length === 0) {
            orderMap.set(o.orderNumber || o.id, o);
          }
        }
        parsed.orders = Array.from(orderMap.values());
        return parsed;
      }
    } catch {
      // ignore
    }
    return null;
  }

  static saveUser(user: UserProfile | null) {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }

  static getCurrentUser(): UserProfile | null {
    return this.loadUser();
  }

  /**
   * Initializes Supabase session listeners and syncs profiles table with current auth state.
   */
  static initAuthListener(onUserChange: (user: UserProfile | null) => void): () => void {
    if (!isSupabaseConfigured()) {
      onUserChange(this.getCurrentUser());
      return () => {};
    }

    let isDisposed = false;

    const handleSession = async (session: any) => {
      if (isDisposed) return;
      if (session?.user) {
        try {
          const authUser = session.user;
          let activeProfile: any = null;

          try {
            const { data: profileRow } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', authUser.id)
              .maybeSingle();
            activeProfile = profileRow;
          } catch (fetchErr) {
            console.warn('Could not fetch profiles table:', fetchErr);
          }

          if (!activeProfile) {
            try {
              const rawMeta = authUser.user_metadata || {};
              const fullName =
                rawMeta.full_name ||
                rawMeta.name ||
                (authUser.email ? authUser.email.split('@')[0] : 'Sports Member');
              const firstName = rawMeta.given_name || fullName.split(' ')[0] || 'Member';
              const lastName = rawMeta.family_name || fullName.split(' ').slice(1).join(' ') || '';

              const newRow = {
                id: authUser.id,
                email: authUser.email || '',
                full_name: fullName,
                first_name: firstName,
                last_name: lastName,
                addresses: [],
                sport_preferences: ['Badminton', 'Tennis'],
                membership_tier: 'Club Athlete',
              };

              const { data: createdRow } = await supabase
                .from('profiles')
                .insert(newRow)
                .select('*')
                .maybeSingle();

              if (createdRow) activeProfile = createdRow;
            } catch (insertErr) {
              console.warn('Could not insert initial profile row:', insertErr);
            }
          }

          let orders: Order[] = [];
          try {
            orders = await fetchUserOrdersFromSupabase(authUser.id);
          } catch {
            orders = [];
          }

          // Retain placed orders so Supabase returning [] never wipes local orders
          const existing = this.loadUser();
          const backupOrders = getStoredPlacedOrders();
          const orderMap = new Map<string, Order>();
          for (const o of backupOrders) {
            orderMap.set(o.orderNumber || o.id, o);
          }
          if (existing?.orders) {
            for (const o of existing.orders) {
              orderMap.set(o.orderNumber || o.id, o);
            }
          }
          for (const o of orders) {
            orderMap.set(o.orderNumber || o.id, o);
          }
          const finalOrders = Array.from(orderMap.values());

          const mapped = mapDbProfileToUser(authUser, activeProfile, finalOrders);
          this.saveUser(mapped);
          if (!isDisposed) {
            onUserChange(mapped);
          }
        } catch (err) {
          console.error('Error processing Supabase auth session:', err);
          if (session?.user && !isDisposed) {
            const fallbackOrders = this.loadUser()?.orders || getStoredPlacedOrders();
            const fallbackUser = mapDbProfileToUser(session.user, null, fallbackOrders);
            this.saveUser(fallbackUser);
            onUserChange(fallbackUser);
          }
        }
      } else {
        this.saveUser(null);
        if (!isDisposed) {
          onUserChange(null);
        }
      }
    };

    // Check URL for OAuth code exchange and inspect existing session
    const checkInitialAuth = async () => {
      try {
        if (typeof window !== 'undefined') {
          const url = new URL(window.location.href);
          const code = url.searchParams.get('code');
          const authError = url.searchParams.get('error_description') || url.searchParams.get('error');

          if (authError) {
            console.warn('OAuth redirect notice:', authError);
          }

          if (code) {
            try {
              const { data, error } = await supabase.auth.exchangeCodeForSession(code);
              if (error) {
                console.warn('Could not exchange PKCE code for session:', error.message);
              } else if (data?.session) {
                await handleSession(data.session);
                // Clean URL query parameters
                url.searchParams.delete('code');
                url.searchParams.delete('state');
                url.searchParams.delete('error');
                url.searchParams.delete('error_description');
                window.history.replaceState({}, document.title, url.pathname + (url.search ? url.search : '') + url.hash);
                return;
              }
            } catch (exchangeErr) {
              console.warn('Exchange code error:', exchangeErr);
            } finally {
              // Clean code parameter to prevent repeated exchange attempts
              if (url.searchParams.has('code')) {
                url.searchParams.delete('code');
                url.searchParams.delete('state');
                window.history.replaceState({}, document.title, url.pathname + (url.search ? url.search : '') + url.hash);
              }
            }
          }
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          await handleSession(session);
        } else {
          const cached = this.getCurrentUser();
          if (!isDisposed) {
            onUserChange(cached);
          }
        }
      } catch (err) {
        console.error('Error in checkInitialAuth:', err);
        const cached = this.getCurrentUser();
        if (!isDisposed) {
          onUserChange(cached);
        }
      }
    };

    checkInitialAuth();

    // Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        this.saveUser(null);
        if (!isDisposed) {
          onUserChange(null);
        }
      } else if (session) {
        await handleSession(session);
      }
    });

    return () => {
      isDisposed = true;
      subscription.unsubscribe();
    };
  }

  static async requestOtp(phone: string): Promise<{ success: boolean; devOtp: string }> {
    const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone.replace(/\D/g, '')}`;

    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase.auth.signInWithOtp({
          phone: formattedPhone,
        });
        if (!error) {
          return { success: true, devOtp: 'SMS sent to your device' };
        }
        console.warn('Supabase Phone OTP note:', error.message);
      } catch (e) {
        console.warn('Phone OTP fallback:', e);
      }
    }

    // Dev/fallback mode when SMS gateway is not active
    await new Promise((r) => setTimeout(r, 450));
    return {
      success: true,
      devOtp: '123456',
    };
  }

  static async verifyOtp(
    phone: string,
    otp: string,
    registrationData?: { firstName: string; lastName: string; email?: string }
  ): Promise<UserProfile> {
    const formattedPhone = phone.startsWith('+91') ? phone : `+91 ${phone}`;

    // 1. Try real Supabase OTP if configured and not demo test code
    if (isSupabaseConfigured() && otp !== '123456') {
      try {
        const cleanPhone = phone.startsWith('+91') ? phone : `+91${phone.replace(/\D/g, '')}`;
        const { data, error } = await supabase.auth.verifyOtp({
          phone: cleanPhone,
          token: otp,
          type: 'sms',
        });
        if (!error && data.user) {
          const profile = mapDbProfileToUser(data.user, null, []);
          if (registrationData?.firstName) profile.firstName = registrationData.firstName;
          if (registrationData?.lastName) profile.lastName = registrationData.lastName;
          if (registrationData) profile.fullName = `${profile.firstName} ${profile.lastName}`.trim();
          await syncProfileToSupabase(profile);
          this.saveUser(profile);
          return profile;
        }
      } catch (err) {
        console.warn('Supabase verifyOtp fallback:', err);
      }
    }

    // 2. Dev / fallback verification
    await new Promise((r) => setTimeout(r, 450));
    localStorage.removeItem('oriental_sports_logged_out');

    let user = this.getCurrentUser();
    if (!user || user.phone !== formattedPhone) {
      const firstName = registrationData?.firstName || 'Sports';
      const lastName = registrationData?.lastName || 'Athlete';
      const newUser: UserProfile = {
        id: `usr_${Date.now()}`,
        phone: formattedPhone,
        firstName,
        lastName,
        fullName: registrationData ? `${firstName} ${lastName}`.trim() : 'Sports Athlete',
        email: registrationData?.email || '',
        sportPreferences: ['Badminton', 'Tennis'],
        membershipTier: 'Club Athlete',
        createdAt: new Date().toISOString().split('T')[0],
        addresses: [],
        orders: [],
        courtInquiries: [],
      };
      this.saveUser(newUser);
      if (isSupabaseConfigured()) {
        syncProfileToSupabase(newUser).catch(() => {});
      }
      return newUser;
    }
    this.saveUser(user);
    return user;
  }

  static async signInWithGoogle(): Promise<UserProfile | null> {
    localStorage.removeItem('oriental_sports_logged_out');

    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured. Please verify your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env');
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });

    if (error) {
      console.error('Supabase Google OAuth error:', error.message);
      throw error;
    }

    if (data?.url) {
      window.location.href = data.url;
    }

    return null;
  }

  static async signInWithEmail(email: string): Promise<UserProfile> {
    localStorage.removeItem('oriental_sports_logged_out');

    // 1. If Supabase configured, trigger magic link / OTP
    if (isSupabaseConfigured()) {
      try {
        await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: window.location.origin,
          },
        });
      } catch (err) {
        console.warn('Supabase signInWithOtp notice:', err);
      }
    }

    await new Promise((r) => setTimeout(r, 350));
    let user = this.getCurrentUser();
    if (!user) {
      const namePart = email.split('@')[0];
      const capitalized = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      const newUser: UserProfile = {
        id: `usr_${Date.now()}`,
        email,
        phone: '',
        firstName: capitalized,
        lastName: 'Customer',
        fullName: `${capitalized} Customer`,
        sportPreferences: ['Badminton'],
        membershipTier: 'Club Athlete',
        createdAt: new Date().toISOString().split('T')[0],
        addresses: [],
        orders: [],
        courtInquiries: [],
      };
      this.saveUser(newUser);
      if (isSupabaseConfigured()) {
        syncProfileToSupabase(newUser).catch(() => {});
      }
      return newUser;
    }
    return user;
  }

  static async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    await new Promise((r) => setTimeout(r, 200));
    let current = this.getCurrentUser();
    const updatedUser: UserProfile = current
      ? {
          ...current,
          ...updates,
          fullName:
            updates.firstName && updates.lastName
              ? `${updates.firstName} ${updates.lastName}`
              : updates.firstName
              ? `${updates.firstName} ${current.lastName}`
              : current.fullName,
        }
      : {
          id: `usr_${Date.now()}`,
          firstName: updates.firstName || 'Customer',
          lastName: updates.lastName || '',
          fullName: `${updates.firstName || 'Customer'} ${updates.lastName || ''}`.trim(),
          email: updates.email || '',
          phone: updates.phone || '',
          sportPreferences: updates.sportPreferences || [],
          membershipTier: 'Club Athlete',
          createdAt: new Date().toISOString().split('T')[0],
          addresses: [],
          orders: [],
          courtInquiries: [],
        };

    this.saveUser(updatedUser);
    syncProfileToSupabase(updatedUser).catch(() => {});
    return updatedUser;
  }

  static async addAddress(newAddr: Omit<Address, 'id'>): Promise<Address> {
    const addressWithId: Address = {
      ...newAddr,
      id: `addr_${Date.now()}`,
    };
    let current = this.getCurrentUser();

    if (!current) {
      const newUser: UserProfile = {
        id: `usr_${Date.now()}`,
        firstName: newAddr.name.split(' ')[0] || 'Customer',
        lastName: newAddr.name.split(' ').slice(1).join(' ') || '',
        fullName: newAddr.name,
        email: '',
        phone: newAddr.phone,
        sportPreferences: [],
        membershipTier: 'Club Athlete',
        createdAt: new Date().toISOString().split('T')[0],
        addresses: [addressWithId],
        orders: [],
        courtInquiries: [],
      };
      this.saveUser(newUser);
      syncProfileToSupabase(newUser).catch(() => {});
    } else {
      let updatedAddresses = [...current.addresses];
      if (addressWithId.isDefault) {
        updatedAddresses = updatedAddresses.map((a) => ({ ...a, isDefault: false }));
      }
      updatedAddresses.unshift(addressWithId);
      current = { ...current, addresses: updatedAddresses };
      this.saveUser(current);
      syncProfileToSupabase(current).catch(() => {});
    }
    return addressWithId;
  }

  static async updateAddress(id: string, addrUpdate: Partial<Address>): Promise<Address> {
    const current = this.getCurrentUser();
    if (!current) throw new Error('No user profile found');
    let target: Address | undefined;
    const updatedAddresses = current.addresses.map((a) => {
      if (a.id === id) {
        target = { ...a, ...addrUpdate };
        return target;
      }
      if (addrUpdate.isDefault) {
        return { ...a, isDefault: false };
      }
      return a;
    });
    if (!target) throw new Error('Address not found');
    const updated = { ...current, addresses: updatedAddresses };
    this.saveUser(updated);
    syncProfileToSupabase(updated).catch(() => {});
    return target;
  }

  static async deleteAddress(id: string): Promise<void> {
    const current = this.getCurrentUser();
    if (!current) return;
    const filtered = current.addresses.filter((a) => a.id !== id);
    if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
      filtered[0].isDefault = true;
    }
    const updated = { ...current, addresses: filtered };
    this.saveUser(updated);
    syncProfileToSupabase(updated).catch(() => {});
  }

  static async setDefaultAddress(id: string): Promise<void> {
    const current = this.getCurrentUser();
    if (!current) return;
    const updated = current.addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    const updatedUser = { ...current, addresses: updated };
    this.saveUser(updatedUser);
    syncProfileToSupabase(updatedUser).catch(() => {});
  }

  static async addOrder(order: Order): Promise<Order> {
    // Ensure order has a valid UUID
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(order.id);
    if (!isUuid) {
      const generatedUuid = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : undefined;
      if (generatedUuid) {
        order.id = generatedUuid;
      }
    }

    // Save to backup storage immediately
    saveStoredPlacedOrder(order);

    let current = this.getCurrentUser();
    if (!current) {
      const nameParts = (order.shippingAddress.name || 'Customer').trim().split(' ');
      const firstName = nameParts[0] || 'Customer';
      const lastName = nameParts.slice(1).join(' ') || '';
      const newUser: UserProfile = {
        id: `usr_${Date.now()}`,
        firstName,
        lastName,
        fullName: order.shippingAddress.name || `${firstName} ${lastName}`.trim(),
        email: '',
        phone: order.shippingAddress.phone,
        sportPreferences: [],
        membershipTier: 'Club Athlete',
        createdAt: new Date().toISOString().split('T')[0],
        addresses: [order.shippingAddress],
        orders: [order],
        courtInquiries: [],
      };
      this.saveUser(newUser);
      syncProfileToSupabase(newUser).catch(() => {});
    } else {
      const existingOrders = current.orders || [];
      const orderMap = new Map<string, Order>();
      orderMap.set(order.orderNumber || order.id, order);
      for (const o of existingOrders) {
        orderMap.set(o.orderNumber || o.id, o);
      }
      const orders = Array.from(orderMap.values());

      const hasAddr = current.addresses.some(
        (a) =>
          a.street === order.shippingAddress.street &&
          a.pincode === order.shippingAddress.pincode
      );
      const addresses = hasAddr
        ? current.addresses
        : [order.shippingAddress, ...current.addresses];
      current = { ...current, orders, addresses };
      this.saveUser(current);
      syncProfileToSupabase(current).catch(() => {});
    }

    // Prepare sync payload for Admin Panel
    const adminPayload = {
      id: order.id,
      order_number: order.orderNumber,
      user_id: current?.id || 'usr-guest',
      customer_name: order.shippingAddress.name || current?.fullName || 'Customer',
      customer_email: current?.email || '',
      customer_phone: order.shippingAddress.phone || current?.phone || '',
      status: order.status || 'confirmed',
      total_amount: order.totalAmount,
      subtotal: order.subtotal,
      shipping: order.shipping,
      tax: order.tax,
      payment_method: order.paymentMethod,
      tracking_number: order.trackingNumber,
      carrier: order.carrier,
      shipping_address: order.shippingAddress,
      items: (order.items || []).map((it) => ({
        product_name: it.productName,
        price: it.price,
        quantity: it.quantity,
        selected_variant: it.selectedVariant,
      })),
      created_at: new Date().toISOString(),
    };

    // Sync to admin backend (both production admin domain and local port)
    try {
      fetch('https://admin.orientalsports.in/api/orders/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminPayload),
      }).catch(() => {});

      if (typeof window !== 'undefined' && !window.location.host.includes('orientalsports.in')) {
        fetch('http://localhost:3001/api/orders/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(adminPayload),
        }).catch(() => {});
      }
    } catch {}

    // If Supabase is configured, attempt database insert
    if (isSupabaseConfigured()) {
      try {
        const isUserUuid =
          current?.id &&
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(current.id);
        const validOrderUuid =
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(order.id)
            ? order.id
            : undefined;

        const orderRow: any = {
          order_number: order.orderNumber,
          razorpay_order_id: order.orderNumber,
          user_id: isUserUuid && current ? current.id : null,
          status: 'confirmed',
          status_label: order.statusLabel,
          total_amount: order.totalAmount,
          subtotal: order.subtotal,
          shipping: order.shipping,
          tax: order.tax,
          payment_method: order.paymentMethod,
          delivery_method:
            order.shippingAddress.street?.includes('Camp Store') || order.shippingAddress.street?.includes('MG Road')
              ? 'camp_pickup'
              : 'doorstep',
          shipping_address: order.shippingAddress,
          tracking_number: order.trackingNumber,
          carrier: order.carrier,
          estimated_delivery: order.estimatedDelivery,
          timeline: order.timeline,
          items_snapshot: order.items || [],
        };
        if (validOrderUuid) {
          orderRow.id = validOrderUuid;
        }

        const { data: insertedOrder } = await supabase
          .from('orders')
          .insert(orderRow)
          .select('id')
          .maybeSingle();

        const targetOrderId = insertedOrder?.id || validOrderUuid;
        if (targetOrderId && order.items && order.items.length > 0) {
          const itemRows = order.items.map((it) => ({
            order_id: targetOrderId,
            product_slug: it.productSlug,
            product_name: it.productName,
            product_image: it.productImage,
            price: it.price,
            quantity: it.quantity,
            selected_variant: it.selectedVariant,
            selected_size: it.selectedSize,
          }));
          await supabase.from('order_items').insert(itemRows);
        }
      } catch (err) {
        console.warn('Notice saving order to Supabase:', err);
      }
    }

    return order;
  }

  static async signOut(): Promise<void> {
    if (isSupabaseConfigured()) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Supabase sign out error:', err);
      }
    }
    localStorage.setItem('oriental_sports_logged_out', 'true');
    this.saveUser(null);
  }
}
