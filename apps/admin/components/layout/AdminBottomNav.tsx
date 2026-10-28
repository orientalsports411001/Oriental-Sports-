'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Layers,
  ClipboardList,
  User,
  ExternalLink,
  LogOut,
  X,
  ShieldCheck,
} from 'lucide-react';

interface AdminBottomNavProps {
  userEmail?: string;
}

export function AdminBottomNav({ userEmail }: AdminBottomNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const isDashboardActive = pathname === '/dashboard';
  const isProductsActive = pathname?.startsWith('/products');
  const isDisciplinesActive = pathname?.startsWith('/categories');
  const isOrdersActive = pathname?.startsWith('/orders');
  const isProfileActive = isProfileModalOpen;

  let activeIndex = 0;
  if (isProductsActive) activeIndex = 1;
  else if (isDisciplinesActive) activeIndex = 2;
  else if (isOrdersActive) activeIndex = 3;
  else if (isProfileActive) activeIndex = 4;

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await fetch('/api/auth/signout', { method: 'POST' });
      document.cookie = 'os_dev_admin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      window.location.href = '/login';
    } catch {
      window.location.href = '/login';
    }
  };

  return (
    <>
      <nav className="admin-bottom-nav-dock" aria-label="Admin Mobile Navigation">
        <div className="admin-bottom-nav-pill">
          {/* Real animated sliding indicator capsule matching main website */}
          <div
            className="admin-bottom-nav-slider"
            style={{
              transform: `translateX(calc(${activeIndex} * (100% + 2px)))`,
            }}
            aria-hidden="true"
          />

          <Link
            href="/dashboard"
            onClick={() => setIsProfileModalOpen(false)}
            className={`admin-bottom-nav-item ${isDashboardActive && !isProfileModalOpen ? 'is-active' : ''}`}
            aria-label="Dashboard"
          >
            <div className="admin-bottom-nav-icon-wrap">
              <LayoutDashboard size={19} strokeWidth={isDashboardActive && !isProfileModalOpen ? 2.4 : 1.8} />
            </div>
            <span className="admin-bottom-nav-label">Dashboard</span>
          </Link>

          <Link
            href="/products"
            onClick={() => setIsProfileModalOpen(false)}
            className={`admin-bottom-nav-item ${isProductsActive && !isProfileModalOpen ? 'is-active' : ''}`}
            aria-label="Products"
          >
            <div className="admin-bottom-nav-icon-wrap">
              <Package size={19} strokeWidth={isProductsActive && !isProfileModalOpen ? 2.4 : 1.8} />
              <span className="admin-bottom-nav-badge" aria-hidden="true">
                61
              </span>
            </div>
            <span className="admin-bottom-nav-label">Products</span>
          </Link>

          <Link
            href="/categories"
            onClick={() => setIsProfileModalOpen(false)}
            className={`admin-bottom-nav-item ${isDisciplinesActive && !isProfileModalOpen ? 'is-active' : ''}`}
            aria-label="Disciplines"
          >
            <div className="admin-bottom-nav-icon-wrap">
              <Layers size={19} strokeWidth={isDisciplinesActive && !isProfileModalOpen ? 2.4 : 1.8} />
            </div>
            <span className="admin-bottom-nav-label">Disciplines</span>
          </Link>

          <Link
            href="/orders"
            onClick={() => setIsProfileModalOpen(false)}
            className={`admin-bottom-nav-item ${isOrdersActive && !isProfileModalOpen ? 'is-active' : ''}`}
            aria-label="Orders"
          >
            <div className="admin-bottom-nav-icon-wrap">
              <ClipboardList size={19} strokeWidth={isOrdersActive && !isProfileModalOpen ? 2.4 : 1.8} />
              <span className="admin-bottom-nav-badge" aria-hidden="true">
                5
              </span>
            </div>
            <span className="admin-bottom-nav-label">Orders</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsProfileModalOpen((prev) => !prev)}
            className={`admin-bottom-nav-item ${isProfileActive ? 'is-active' : ''}`}
            aria-label="Superadmin Profile"
          >
            <div className="admin-bottom-nav-icon-wrap">
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: isProfileActive ? '#FFFFFF' : 'var(--blood-crimson)',
                  color: isProfileActive ? 'var(--blood-crimson)' : '#FFFFFF',
                  display: 'grid',
                  placeItems: 'center',
                  fontWeight: 800,
                  fontSize: 10,
                  lineHeight: 1,
                  boxShadow: '0 0 8px rgba(200, 16, 46, 0.4)',
                }}
              >
                {userEmail?.charAt(0).toUpperCase() || 'P'}
              </div>
            </div>
            <span className="admin-bottom-nav-label">Admin</span>
          </button>
        </div>
      </nav>

      {/* Quick Profile Drawer / Modal for Mobile */}
      {isProfileModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 98,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 16,
            paddingBottom: 'calc(80px + env(safe-area-inset-bottom))',
          }}
          onClick={() => setIsProfileModalOpen(false)}
        >
          <div
            style={{
              background: '#141414',
              border: '1px solid var(--border-crimson)',
              borderRadius: 24,
              padding: '22px 20px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.9), 0 0 24px rgba(200, 16, 46, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              maxWidth: 420,
              width: '100%',
              margin: '0 auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'var(--blood-crimson)',
                    color: '#FFFFFF',
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 800,
                    fontSize: 16,
                    boxShadow: '0 2px 10px rgba(200, 16, 46, 0.4)',
                  }}
                >
                  {userEmail?.charAt(0).toUpperCase() || 'P'}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#FFFFFF' }}>
                    {userEmail?.split('@')[0] || 'pratikjadhav8820'}
                  </div>
                  <div style={{ fontSize: 11, color: '#22C55E', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <ShieldCheck size={12} />
                    <span>Superadmin Verified</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: 'none',
                  color: '#A3A3A3',
                  borderRadius: '50%',
                  width: 32,
                  height: 32,
                  minHeight: 32,
                  padding: 0,
                  cursor: 'pointer',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ height: 1, background: 'rgba(255, 255, 255, 0.08)' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <a
                href="http://localhost:3000"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: 14,
                  background: '#1A1A1A',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#FFFFFF',
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                <span>View Live Storefront</span>
                <ExternalLink size={15} color="#A3A3A3" />
              </a>

              <button
                type="button"
                disabled={isSigningOut}
                onClick={handleSignOut}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 14,
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#F87171',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: 'none',
                }}
              >
                <LogOut size={16} />
                <span>{isSigningOut ? 'Signing Out...' : 'Sign Out of Operations'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
