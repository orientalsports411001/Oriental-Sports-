'use client';

import React, { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/navigation/Header';
import { CartDrawer } from '@/components/navigation/CartDrawer';
import { BottomNav } from '@/components/navigation/BottomNav';
import { Footer } from '@/components/footer/Footer';

// Header and BottomNav read the current path via the router-shim's
// useLocation(), which is backed by next/navigation's useSearchParams() —
// Next.js requires any such consumer to sit under a Suspense boundary, or
// every statically-rendered page bails out of static generation entirely.
const NavFallback: React.FC = () => null;

/**
 * Mirrors the old App.tsx shell: header/footer/bottom-nav are hidden on the
 * focused /checkout flow, everything else gets the full chrome.
 */
export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isCheckout = pathname === '/checkout';

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: isCheckout ? '#f8f9fa' : 'var(--ivory)',
      }}
    >
      {!isCheckout && (
        <Suspense fallback={<NavFallback />}>
          <Header />
        </Suspense>
      )}
      <CartDrawer />

      <main id="main" style={{ flex: 1 }}>
        {children}
      </main>

      {!isCheckout && <Footer />}
      {!isCheckout && (
        <Suspense fallback={<NavFallback />}>
          <BottomNav />
        </Suspense>
      )}
    </div>
  );
};
