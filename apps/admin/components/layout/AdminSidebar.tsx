'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';

interface AdminSidebarProps {
  userEmail?: string;
}

export function AdminSidebar({ userEmail }: AdminSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/products', label: 'Products', badge: '61' },
    { href: '/categories', label: 'Disciplines' },
    { href: '/orders', label: 'Orders', badge: '5' },
  ];

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

        {/* Pure Typographic Navigation (Zero AI icons) - Desktop */}
        <div className="desktop-sidebar-nav-stack" style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 16px',
                  borderRadius: 9999,
                  background: isActive ? 'var(--blood-crimson)' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#A3A3A3',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: 13.5,
                  textDecoration: 'none',
                  minHeight: 42,
                  boxShadow: isActive ? '0 4px 14px rgba(200, 16, 46, 0.35)' : 'none',
                  transition: 'background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease',
                }}
              >
                <span>{item.label}</span>

                {item.badge && (
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 9999,
                      background: isActive ? 'rgba(0, 0, 0, 0.28)' : '#1C1C1C',
                      color: isActive ? '#FFFFFF' : '#737373',
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
              {userEmail?.charAt(0).toUpperCase() || 'A'}
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
                title={userEmail}
              >
                {userEmail || 'Admin'}
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
