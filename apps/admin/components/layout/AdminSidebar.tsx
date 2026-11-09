'use client';

import { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, LayoutDashboard, Package, Layers, ClipboardList } from 'lucide-react';
import { useAdminNavCounts } from '@/hooks/useAdminNavCounts';
import { slidePill, snapPill, type PillEdges } from '@/lib/sidebar-pill';

interface AdminSidebarProps {
  userDisplayName?: string;
  ordersCount?: number;
  productsCount?: number;
}

export function AdminSidebar({ userDisplayName, ordersCount = 0, productsCount = 0 }: AdminSidebarProps) {
  const pathname = usePathname();
  const liveCounts = useAdminNavCounts(productsCount, ordersCount);

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/products', label: 'Products', icon: Package, badge: liveCounts.productsCount > 0 ? String(liveCounts.productsCount) : undefined },
    { href: '/categories', label: 'Disciplines', icon: Layers },
    { href: '/orders', label: 'Orders', icon: ClipboardList, badge: liveCounts.ordersCount > 0 ? String(liveCounts.ordersCount) : undefined },
  ];

  const activeItem = navItems.find(
    (item) => pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
  );
  const activeHref = activeItem?.href ?? navItems[0].href;

  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const pillRef = useRef<HTMLDivElement>(null);
  const pillState = useRef<PillEdges | null>(null);

  useLayoutEffect(() => {
    const pill = pillRef.current;
    const target = itemRefs.current.get(activeHref);
    if (pill && target) slidePill(pill, target, pillState);
  }, [activeHref]);

  useLayoutEffect(() => {
    const onResize = () => {
      const pill = pillRef.current;
      const target = itemRefs.current.get(activeHref);
      if (pill && target) snapPill(pill, target, pillState);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activeHref]);

  return (
    <aside className="buyur-sidebar-wrapper">
      <nav className="buyur-sidebar" aria-label="Admin Navigation">
        {/* Top Brand Header: Official Oriental Sports Wordmark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 20,
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <Link
            href="/dashboard"
            style={{
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/brand/oriental-sports-wordmark-white.png`}
              alt="Oriental Sports Pune"
              style={{ height: 36, width: 'auto', objectFit: 'contain', alignSelf: 'flex-start', display: 'block' }}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/brand/oriental-sports-wordmark-white.png';
              }}
            />
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#A3A3A3',
                marginTop: 2,
              }}
            >
              Operations Desk
            </div>
          </Link>
        </div>

        {/* Quick Search (Desktop) */}
        <div className="desktop-sidebar-nav-stack" style={{ marginTop: 18, marginBottom: 16 }}>
          <Link
            href="/products"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '9px 14px',
              background: '#161616',
              borderRadius: 9999,
              border: '1px solid rgba(255, 255, 255, 0.08)',
              fontSize: 12.5,
              color: '#737373',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'border-color 0.15s ease, background 0.15s ease',
            }}
          >
            <span>Search equipment catalog...</span>
          </Link>
        </div>

        {/* Primary Navigation (Desktop) — sliding pill indicator behind the active item */}
        <div className="desktop-sidebar-nav-stack admin-nav-stack" style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, position: 'relative' }}>
          <div ref={pillRef} className="admin-nav-pill" aria-hidden="true" style={{ opacity: 0 }} />

          {navItems.map((item) => {
            const isActive = item.href === activeHref;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                ref={(el) => {
                  if (el) itemRefs.current.set(item.href, el);
                }}
                className="admin-nav-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 16px',
                  borderRadius: 9999,
                  color: isActive ? '#FFFFFF' : '#A3A3A3',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: 13.5,
                  textDecoration: 'none',
                  minHeight: 42,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Icon size={16} strokeWidth={isActive ? 2.3 : 1.8} />
                  <span>{item.label}</span>
                </span>

                {item.badge && (
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 9999,
                      background: isActive ? 'rgba(0, 0, 0, 0.28)' : '#1C1C1C',
                      color: isActive ? '#FFFFFF' : '#737373',
                      transition: 'background 0.2s ease, color 0.2s ease',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Footer Area: Authenticated User (Desktop) */}
        <div
          className="desktop-sidebar-footer"
          style={{
            marginTop: 'auto',
            paddingTop: 16,
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          {/* User Profile Card */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 11,
              padding: '11px 13px',
              background: '#161616',
              borderRadius: 14,
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                background: 'var(--blood-crimson)',
                color: '#FFFFFF',
                display: 'grid',
                placeItems: 'center',
                fontWeight: 800,
                fontSize: 13,
                flexShrink: 0,
                boxShadow: '0 0 10px rgba(200, 16, 46, 0.35)',
              }}
            >
              {userDisplayName?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 12.5,
                  color: '#FFFFFF',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                title={userDisplayName}
              >
                {userDisplayName || 'Admin'}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: '#A3A3A3',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  marginTop: 2,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#22C55E',
                    display: 'inline-block',
                    boxShadow: '0 0 6px rgba(34, 197, 94, 0.5)',
                  }}
                />
                Superadmin
              </div>
            </div>
          </div>

          {/* Dedicated Separate Log Out Button */}
          <button
            type="button"
            onClick={async () => {
              try {
                const { createClient } = await import('@/lib/supabase/client');
                const supabase = createClient();
                await supabase.auth.signOut().catch(() => {});
              } catch {}
              await fetch('/api/auth/signout', { method: 'POST' }).catch(() => {});
              document.cookie = 'os_dev_admin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
              window.location.href = '/login';
            }}
            title="Log out of Admin Operations Console"
            aria-label="Log Out"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '10px 14px',
              background: '#1A1A1A',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 12,
              color: '#A3A3A3',
              fontSize: 12.5,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.15s ease, border-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.12)';
              e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)';
              e.currentTarget.style.color = '#EF4444';
              e.currentTarget.style.boxShadow = '0 0 12px rgba(239, 68, 68, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#1A1A1A';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.color = '#A3A3A3';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <LogOut size={14} strokeWidth={2} />
            <span>Log Out</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
