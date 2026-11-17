'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { UserProfile, Address, Order } from '@/types/auth';

interface AuthContextType {
  user: UserProfile | null;
  authUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  magicLinkSent: boolean;
  openAuthModal: (returnTo?: string) => void;
  closeAuthModal: () => void;
  /** Sends a Supabase magic-link email. This is the one real sign-in method. */
  signInWithMagicLink: (email: string) => Promise<{ success: boolean; message: string }>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  addAddress: (addr: Omit<Address, 'id'>) => Promise<Address>;
  updateAddress: (id: string, addr: Partial<Address>) => Promise<void>;
  deleteAddress: (id: string) => Promise<void>;
  setDefaultAddress: (id: string) => Promise<void>;
  refreshOrders: () => Promise<void>;
  cancelOrder: (orderNumber: string) => Promise<{ success: boolean; error?: string }>;
  getOrderById: (orderId: string) => Order | undefined;
  returnToUrl: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/** Maps a `profiles` row + its `orders`/`order_items` rows into the UI-facing UserProfile shape. */
function mapProfile(authUser: User, profileRow: any, orders: Order[]): UserProfile {
  const addresses: Address[] = Array.isArray(profileRow?.addresses) ? profileRow.addresses : [];
  return {
    id: authUser.id,
    firstName: profileRow?.first_name || '',
    lastName: profileRow?.last_name || '',
    fullName: profileRow?.full_name || authUser.email || '',
    email: profileRow?.email || authUser.email || '',
    phone: profileRow?.phone || '',
    sportPreferences: profileRow?.sport_preferences || [],
    membershipTier: profileRow?.membership_tier || 'Club Athlete',
    addresses,
    orders,
    courtInquiries: [],
    createdAt: profileRow?.created_at || authUser.created_at,
  };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const supabase = createClient();

  const [authUser, setAuthUser] = useState<User | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [magicLinkSent, setMagicLinkSent] = useState<boolean>(false);
  const [returnToUrl, setReturnToUrl] = useState<string | null>(null);

  const loadProfileAndOrders = useCallback(async (currentUser: User) => {
    const [{ data: profileRow }, { data: orderRows }] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', currentUser.id).maybeSingle(),
      supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false }),
    ]);

    const orders: Order[] = (orderRows || []).map((row: any) => ({
      id: row.id,
      orderNumber: row.order_number,
      date: row.created_at,
      status: row.status,
      statusLabel: row.status_label || row.status,
      totalAmount: Number(row.total_amount),
      subtotal: Number(row.subtotal),
      shipping: Number(row.shipping),
      tax: Number(row.tax),
      paymentMethod: row.payment_method || 'Razorpay',
      items: (row.order_items || []).map((it: any) => ({
        productId: it.product_id,
        productSlug: it.product_slug,
        productName: it.product_name,
        productImage: it.product_image,
        price: Number(it.price),
        quantity: it.quantity,
        selectedVariant: it.selected_variant,
        selectedSize: it.selected_size,
      })),
      shippingAddress: row.shipping_address || {},
      trackingNumber: row.tracking_number,
      carrier: row.carrier,
      estimatedDelivery: row.estimated_delivery,
      timeline: row.timeline || [],
    }));

    setUser(mapProfile(currentUser, profileRow, orders));
  }, [supabase]);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      setAuthUser(session?.user ?? null);
      if (session?.user) {
        loadProfileAndOrders(session.user).finally(() => setIsLoading(false));
      } else {
        const stored = typeof window !== 'undefined' ? localStorage.getItem('oriental_sports_user') : null;
        if (stored) {
          try {
            setUser(JSON.parse(stored));
          } catch {
            // ignore
          }
        }
        setIsLoading(false);
      }
    }).catch(() => {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('oriental_sports_user') : null;
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          // ignore
        }
      }
      setIsLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthUser(session?.user ?? null);
      if (session?.user) {
        loadProfileAndOrders(session.user);
        setIsAuthModalOpen(false);
        setMagicLinkSent(false);
      } else {
        const stored = typeof window !== 'undefined' ? localStorage.getItem('oriental_sports_user') : null;
        if (!stored) {
          setUser(null);
        }
      }
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase, loadProfileAndOrders]);

  const openAuthModal = (returnTo?: string) => {
    if (returnTo) setReturnToUrl(returnTo);
    setMagicLinkSent(false);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setMagicLinkSent(false);
  };

  const signInWithMagicLink = async (email: string): Promise<{ success: boolean; message: string }> => {
    // Routes through /auth/callback, which exchanges the PKCE `code` the
    // email link carries for a session (createBrowserClient defaults to
    // `flowType: 'pkce'`) before landing on `next` — without that exchange
    // step no session cookie is ever set and the click silently fails to
    // sign the customer in. `next` preserves where they were trying to go
    // (e.g. back to /checkout) rather than always dropping them on /account.
    const next = returnToUrl || '/account';
    const redirectTo =
      typeof window !== 'undefined'
        ? `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`
        : undefined;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });

    if (error) {
      return { success: false, message: error.message };
    }
    setMagicLinkSent(true);
    return { success: true, message: `Magic link sent to ${email}. Check your inbox to finish signing in.` };
  };

  const signInWithGoogle = async (): Promise<void> => {
    const next = returnToUrl || '/account';
    const redirectTo =
      typeof window !== 'undefined'
        ? `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`
        : undefined;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      console.error('Google sign-in via Supabase failed:', error);
      throw error;
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem('oriental_sports_user');
    }
    setUser(null);
    setAuthUser(null);
  };

  const updateProfile = async (data: Partial<UserProfile>): Promise<void> => {
    if (!authUser) return;
    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: data.firstName,
        last_name: data.lastName,
        full_name: data.fullName,
        phone: data.phone,
        sport_preferences: data.sportPreferences,
        addresses: data.addresses,
        updated_at: new Date().toISOString(),
      })
      .eq('id', authUser.id);

    if (!error) {
      await loadProfileAndOrders(authUser);
    }
  };

  /** Addresses are stored as a jsonb array on `profiles.addresses`; these
   * helpers read-modify-write that array through `updateProfile` so
   * AccountPage's address book UI keeps working unchanged. */
  const addAddress = async (addr: Omit<Address, 'id'>): Promise<Address> => {
    const newAddress: Address = { ...addr, id: `addr_${Date.now()}` };
    const nextAddresses = [...(user?.addresses || []), newAddress];
    await updateProfile({ addresses: nextAddresses });
    return newAddress;
  };

  const updateAddress = async (id: string, addr: Partial<Address>): Promise<void> => {
    const nextAddresses = (user?.addresses || []).map((a) => (a.id === id ? { ...a, ...addr } : a));
    await updateProfile({ addresses: nextAddresses });
  };

  const deleteAddress = async (id: string): Promise<void> => {
    const nextAddresses = (user?.addresses || []).filter((a) => a.id !== id);
    await updateProfile({ addresses: nextAddresses });
  };

  const setDefaultAddress = async (id: string): Promise<void> => {
    const nextAddresses = (user?.addresses || []).map((a) => ({ ...a, isDefault: a.id === id }));
    await updateProfile({ addresses: nextAddresses });
  };

  const refreshOrders = async (): Promise<void> => {
    if (authUser) await loadProfileAndOrders(authUser);
  };

  const cancelOrder = async (orderNumber: string): Promise<{ success: boolean; error?: string }> => {
    const target = user?.orders.find((o) => o.id === orderNumber || o.orderNumber === orderNumber);
    if (!target) {
      return { success: false, error: 'Order not found.' };
    }

    const uncancelable = ['dispatched', 'shipped', 'in_transit', 'out_for_delivery', 'delivered', 'ready_for_pickup'];
    const currentStatus = (target.status || '').toLowerCase().trim();
    if (uncancelable.includes(currentStatus)) {
      return { success: false, error: 'no_cancel_after_shipping' };
    }

    if (currentStatus === 'cancelled') {
      return { success: true };
    }

    try {
      const now = new Date().toISOString();
      const adminPayload = {
        id: target.id,
        order_number: target.orderNumber,
        user_id: user?.id || 'usr-guest',
        customer_name: target.shippingAddress?.name || user?.fullName || 'Customer',
        customer_email: user?.email || '',
        customer_phone: target.shippingAddress?.phone || user?.phone || '',
        status: 'cancelled',
        total_amount: target.totalAmount,
        subtotal: target.subtotal,
        shipping: target.shipping,
        tax: target.tax,
        payment_method: target.paymentMethod,
        tracking_number: target.trackingNumber,
        carrier: target.carrier,
        shipping_address: target.shippingAddress,
        items: (target.items || []).map((it) => ({
          product_name: it.productName,
          price: it.price,
          quantity: it.quantity,
          selected_variant: it.selectedVariant,
        })),
        created_at: target.date ? `${target.date}T12:00:00.000Z` : now,
        updated_at: now,
      };

      await fetch('https://admin.orientalsports.in/api/orders/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminPayload),
      }).catch(() => {});

      if (authUser) {
        await supabase
          .from('orders')
          .update({ status: 'cancelled', updated_at: now })
          .or(`id.eq.${target.id},order_number.eq.${target.orderNumber}`)
          .catch(() => {});
      }

      if (user) {
        const nextOrders = user.orders.map((o) =>
          o.id === target.id || o.orderNumber === target.orderNumber
            ? { ...o, status: 'cancelled' as const, statusLabel: 'Order Cancelled' }
            : o
        );
        setUser({ ...user, orders: nextOrders });
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to cancel order' };
    }
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return user?.orders.find((o) => o.id === orderId || o.orderNumber === orderId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authUser,
        isAuthenticated: !!authUser,
        isLoading,
        isAuthModalOpen,
        magicLinkSent,
        openAuthModal,
        closeAuthModal,
        signInWithMagicLink,
        signInWithGoogle,
        signOut,
        updateProfile,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        refreshOrders,
        cancelOrder,
        getOrderById,
        returnToUrl,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
