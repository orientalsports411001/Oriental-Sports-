import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Search, ShoppingBag, User, Phone, MapPin } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { useCart } from '../../context/CartContext';
import { SearchModal } from './SearchModal';
import { STORE_INFO } from '../../data/storeInfo';

export const Header: React.FC = () => {
  const { itemCount, openCart } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'SHOP', path: '/shop' },
    { label: 'COURTS', path: '/courts' },
    { label: 'HOUSE', path: '/about' },
    { label: 'CONTACT', path: '/contact' },
  ];

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          transition: 'all 0.25s ease',
          backgroundColor: isScrolled ? 'rgba(255, 253, 247, 0.95)' : 'rgba(255, 247, 232, 0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: isScrolled
            ? '2px solid rgba(36, 87, 255, 0.15)'
            : '1px solid rgba(23, 23, 23, 0.08)',
          boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.04)' : 'none',
        }}
      >
        {/* Micro Utility Bar: High-Energy, Playful */}
        <div
          style={{
            backgroundColor: 'var(--color-electric-blue)',
            color: '#FFFFFF',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-ui)',
            fontWeight: 700,
            letterSpacing: '0.04em',
            maxHeight: isScrolled ? '0px' : '32px',
            opacity: isScrolled ? 0 : 1,
            overflow: 'hidden',
            transition: 'max-height 0.25s ease, opacity 0.2s ease',
          }}
          className="desktop-only"
        >
          <div
            className="container"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '32px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span
                style={{
                  backgroundColor: 'var(--color-lime)',
                  color: '#171717',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  fontSize: '0.6875rem',
                  fontWeight: 800,
                }}
              >
                PUNE FLAGSHIP
              </span>
              <span>Shop 247, MG Road, New Modikhana, Camp, Pune</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <a
                href={STORE_INFO.mapsUrl}
                target="_blank"
                rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#FFFFFF' }}
              >
                <MapPin size={12} color="var(--color-lime)" />
                <span>Get Directions</span>
              </a>
              <a
                href={`tel:${STORE_INFO.phone}`}
                style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#FFFFFF' }}
              >
                <Phone size={12} color="var(--color-lime)" />
                <span>{STORE_INFO.displayPhone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: isScrolled ? '64px' : '74px',
              transition: 'height 0.25s ease',
            }}
          >
            {/* Logo in Official Colors as the Standalone Brand Mark */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Logo variant="light" size={isScrolled ? 'sm' : 'md'} />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="nav-links-desktop" style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  style={({ isActive }) => ({
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 700,
                    fontSize: '0.9375rem',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--color-electric-blue)' : 'var(--color-text-dark)',
                    backgroundColor: isActive ? 'rgba(36, 87, 255, 0.08)' : 'transparent',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  })}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-electric-blue)';
                    e.currentTarget.style.backgroundColor = 'rgba(36, 87, 255, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    const isActive = window.location.pathname === item.path;
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--color-text-dark)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Action Buttons: Search, Account, Bag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  border: '1px solid rgba(23, 23, 23, 0.12)',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--color-text-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                aria-label="Search equipment and courts"
                title="Search equipment and courts"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-electric-blue)';
                  e.currentTarget.style.color = 'var(--color-electric-blue)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(23, 23, 23, 0.12)';
                  e.currentTarget.style.color = 'var(--color-text-dark)';
                }}
              >
                <Search size={18} />
              </button>

              <Link
                to="/account"
                className="desktop-only"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  border: '1px solid rgba(23, 23, 23, 0.12)',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--color-text-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                aria-label="Account"
                title="Your athlete account"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-electric-blue)';
                  e.currentTarget.style.color = 'var(--color-electric-blue)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(23, 23, 23, 0.12)';
                  e.currentTarget.style.color = 'var(--color-text-dark)';
                }}
              >
                <User size={18} />
              </Link>

              <button
                type="button"
                onClick={openCart}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  height: '42px',
                  padding: '0 16px',
                  borderRadius: '9999px',
                  border: 'none',
                  backgroundColor: 'var(--color-electric-blue)',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  fontSize: '0.8125rem',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(36, 87, 255, 0.25)',
                  transition: 'transform 0.2s ease, background-color 0.2s ease',
                }}
                aria-label={`Shopping Bag (${itemCount})`}
                title="Shopping Bag"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-electric-blue-dark)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-electric-blue)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <ShoppingBag size={18} />
                <span className="desktop-only">BAG</span>
                {itemCount > 0 && (
                  <span
                    style={{
                      backgroundColor: 'var(--color-lime)',
                      color: '#171717',
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
