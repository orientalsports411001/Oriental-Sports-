'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
            borderBottom: '1px solid var(--stone)',
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
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/brand/oriental-sports-wordmark.png`}
              alt="Oriental Sports Pune"
              style={{ height: 32, width: 'auto', objectFit: 'contain', alignSelf: 'flex-start' }}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/brand/oriental-sports-wordmark.png';
              }}
            />
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--subtle)',
              }}
            >
              Operations Desk
            </div>
          </Link>
        </div>

        {/* Quick Search */}
        <div style={{ marginTop: 18, marginBottom: 16 }}>
          <Link
            href="/products"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '9px 14px',
              background: 'var(--paper)',
              borderRadius: 9999,
              border: '1px solid var(--stone)',
              fontSize: 12.5,
              color: 'var(--subtle)',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'border-color 0.15s ease',
            }}
          >
            <span>Search equipment catalog...</span>
          </Link>
        </div>

        {/* Pure Typographic Navigation (Zero AI icons) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
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
                  background: isActive ? 'var(--ink)' : 'transparent',
                  color: isActive ? 'var(--ivory)' : 'var(--muted)',
                  fontWeight: isActive ? 800 : 600,
                  fontSize: 13.5,
                  textDecoration: 'none',
                  minHeight: 42,
                  transition: 'background 0.15s ease, color 0.15s ease',
                }}
              >
                <span>{item.label}</span>

                {item.badge && (
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: 9999,
                      background: isActive ? 'rgba(255,255,255,0.18)' : 'var(--stone)',
                      color: isActive ? '#FFFFFF' : 'var(--subtle)',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Footer Area: Authenticated User */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: 18,
            borderTop: '1px solid var(--stone)',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 12px',
              background: 'var(--paper)',
              borderRadius: 16,
              border: '1px solid var(--stone)',
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'var(--stone)',
                color: 'var(--ink)',
                display: 'grid',
                placeItems: 'center',
                fontWeight: 800,
                fontSize: 13,
                flexShrink: 0,
              }}
            >
              {userEmail?.charAt(0).toUpperCase() || 'P'}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 12.5,
                  color: 'var(--ink)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {userEmail?.split('@')[0] || 'Admin'}
              </div>
              <div style={{ fontSize: 10.5, color: 'var(--subtle)' }}>
                Superadmin
              </div>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}
