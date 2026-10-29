import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Address, Order } from '../types/auth';
import { AuthService } from '../services/authService';
import { isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isSupabaseLive: boolean;
  isAuthModalOpen: boolean;
  authModalView: 'phone' | 'otp' | 'register' | 'email';
  openAuthModal: (view?: 'phone' | 'otp' | 'register' | 'email', returnTo?: string) => void;
  closeAuthModal: () => void;
  pendingPhone: string;
  setPendingPhone: (phone: string) => void;
  devOtpCode: string | null;
  requestOtp: (phone: string) => Promise<boolean>;
  verifyOtp: (otp: string, registrationData?: { firstName: string; lastName: string; email?: string }) => Promise<boolean>;
  signInWithGoogle: () => Promise<boolean>;
  signInWithEmail: (email: string) => Promise<boolean>;
  signInWithDemo: () => Promise<boolean>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  addAddress: (addr: Omit<Address, 'id'>) => Promise<Address>;
  updateAddress: (id: string, addr: Partial<Address>) => Promise<Address>;
  deleteAddress: (id: string) => Promise<void>;
  setDefaultAddress: (id: string) => Promise<void>;
  getOrderById: (orderId: string) => Order | undefined;
  addOrder: (order: Order) => Promise<Order>;
  syncOrders: (userIdOrPhone?: string) => Promise<Order[]>;
  isSyncingOrders: boolean;
  returnToUrl: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalView, setAuthModalView] = useState<'phone' | 'otp' | 'register' | 'email'>('phone');
  const [pendingPhone, setPendingPhone] = useState<string>('');
  const [devOtpCode, setDevOtpCode] = useState<string | null>(null);
  const [returnToUrl, setReturnToUrl] = useState<string | null>(null);
  const [isSyncingOrders, setIsSyncingOrders] = useState<boolean>(false);
  const isSupabaseLive = isSupabaseConfigured();

  useEffect(() => {
    // 1. Initial cached user
    try {
      const currentUser = AuthService.getCurrentUser();
      if (currentUser) setUser(currentUser);
    } catch (e) {
      console.error('Error loading current user:', e);
    }

    // 2. Subscribe to Supabase Auth and database profile sync
    const unsubscribe = AuthService.initAuthListener((activeUser) => {
      setUser(activeUser);
      setIsLoading(false);
    });

    // 3. Listen to orders sync events across tabs / background syncs
    const handleOrdersUpdated = () => {
      const current = AuthService.getCurrentUser();
      if (current) {
        setUser({ ...current });
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('oriental_orders_updated', handleOrdersUpdated);
    }

    // Fallback safety timeout so UI never hangs in loading state
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => {
      clearTimeout(timeout);
      unsubscribe();
      if (typeof window !== 'undefined') {
        window.removeEventListener('oriental_orders_updated', handleOrdersUpdated);
      }
    };
  }, []);

  const openAuthModal = (view: 'phone' | 'otp' | 'register' | 'email' = 'phone', returnTo?: string) => {
    setAuthModalView(view);
    if (returnTo) {
      setReturnToUrl(returnTo);
    }
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setDevOtpCode(null);
  };

  const requestOtp = async (phoneNumber: string): Promise<boolean> => {
    try {
      const res = await AuthService.requestOtp(phoneNumber);
      if (res.success) {
        setPendingPhone(phoneNumber);
        setDevOtpCode(res.devOtp);
        setAuthModalView('otp');
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const verifyOtp = async (otp: string, regData?: { firstName: string; lastName: string; email?: string }): Promise<boolean> => {
    try {
      const loggedInUser = await AuthService.verifyOtp(pendingPhone, otp, regData);
      setUser(loggedInUser);
      closeAuthModal();
      return true;
    } catch {
      return false;
    }
  };

  const signInWithGoogle = async (): Promise<boolean> => {
    try {
      const loggedInUser = await AuthService.signInWithGoogle();
      if (loggedInUser) {
        setUser(loggedInUser);
        closeAuthModal();
      }
      return true;
    } catch (err) {
      console.error('Google sign-in error:', err);
      throw err;
    }
  };

  const signInWithEmail = async (email: string): Promise<boolean> => {
    try {
      const loggedInUser = await AuthService.signInWithEmail(email);
      setUser(loggedInUser);
      closeAuthModal();
      return true;
    } catch {
      return false;
    }
  };

  const signInWithDemo = async (): Promise<boolean> => {
    try {
      const demoUser = await AuthService.verifyOtp('+91 98000 00000', '123456', {
        firstName: 'Sports',
        lastName: 'Member',
        email: 'member@orientalsports.in',
      });
      setUser(demoUser);
      closeAuthModal();
      return true;
    } catch {
      return false;
    }
  };

  const signOut = async (): Promise<void> => {
    await AuthService.signOut();
    setUser(null);
  };

  const updateProfile = async (data: Partial<UserProfile>): Promise<void> => {
    const updated = await AuthService.updateProfile(data);
    setUser(updated);
  };

  const addAddress = async (addr: Omit<Address, 'id'>): Promise<Address> => {
    const newAddress = await AuthService.addAddress(addr);
    const updated = AuthService.getCurrentUser();
    setUser(updated);
    return newAddress;
  };

  const updateAddress = async (id: string, addr: Partial<Address>): Promise<Address> => {
    const updatedAddress = await AuthService.updateAddress(id, addr);
    const updated = AuthService.getCurrentUser();
    setUser(updated);
    return updatedAddress;
  };

  const deleteAddress = async (id: string): Promise<void> => {
    await AuthService.deleteAddress(id);
    const updated = AuthService.getCurrentUser();
    setUser(updated);
  };

  const setDefaultAddress = async (id: string): Promise<void> => {
    await AuthService.setDefaultAddress(id);
    const updated = AuthService.getCurrentUser();
    setUser(updated);
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return user?.orders.find((o) => o.id === orderId || o.orderNumber === orderId);
  };

  const addOrder = async (order: Order): Promise<Order> => {
    const saved = await AuthService.addOrder(order);
    setUser(AuthService.getCurrentUser());
    return saved;
  };

  const syncOrders = async (userIdOrPhone?: string): Promise<Order[]> => {
    setIsSyncingOrders(true);
    try {
      const orders = await AuthService.syncUserOrdersFromRemote(userIdOrPhone);
      const currentUser = AuthService.getCurrentUser();
      if (currentUser) {
        setUser({ ...currentUser });
      }
      return orders;
    } finally {
      setIsSyncingOrders(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isSupabaseLive,
        isAuthModalOpen,
        authModalView,
        openAuthModal,
        closeAuthModal,
        pendingPhone,
        setPendingPhone,
        devOtpCode,
        requestOtp,
        verifyOtp,
        signInWithGoogle,
        signInWithEmail,
        signInWithDemo,
        signOut,
        updateProfile,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        getOrderById,
        addOrder,
        syncOrders,
        isSyncingOrders,
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
