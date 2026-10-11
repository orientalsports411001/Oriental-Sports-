'use client';

import React, { Suspense } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { BrandIntro } from '@/components/ui/BrandIntro';

const LazyAuthModal = React.lazy(() =>
  import('@/components/auth/AuthModal').then((m) => ({ default: m.AuthModal }))
);

const AuthModalMount: React.FC = () => {
  const { isAuthModalOpen } = useAuth();
  if (!isAuthModalOpen) return null;
  return (
    <Suspense fallback={null}>
      <LazyAuthModal />
    </Suspense>
  );
};

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <BrandIntro />
          <AuthModalMount />
          {children}
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
};
