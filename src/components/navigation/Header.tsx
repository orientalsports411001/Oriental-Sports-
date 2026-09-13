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
      setIsScrolled(window.scrollY > 30);
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
        className={`header-wrapper ${isScrolled ? 'scrolled' : 'at-top'}`}
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          backgroundColor: isScrolled ? 'rgba(17, 17, 17, 0.95)' : 'rgba(17, 17, 17, 0.75)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: isScrolled
            ? '1px solid rgba(201, 162, 39, 0.35)'
            : '1px solid rgba(246, 243, 234, 0.08)',
        }}
      >
        {/* Micro Utility Bar: hides on scroll on desktop for sleekness */}
        <div
          style={{
            backgroundColor: '#0A0A0A',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            fontSize: '0.6875rem',
            fontFamily: 'var(--font-ui)',
            color: '#8E8E8E',
            maxHeight: isScrolled ? '0px' : '32px',
            opacity: isScrolled ? 0 : 1,
            overflow: 'hidden',
            transition: 'max-height 0.3s ease, opacity 0.25s ease',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--color-plate-gold)',
                  letterSpacing: '0.12em',
                  fontWeight: 700,
                }}
              >
                <span
                  style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-plate-gold)',
                  }}
                />
                GEAR. COURTS. PUNE.
              </span>
              <span style={{ color: '#777' }}>•</span>
              <span>Shop 247, MG Road, Camp — Flagship Store Open Today</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <a
                href={STORE_INFO.mapsUrl}
                target="_blank"
                rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#BBB' }}
              >
                <MapPin size={12} color="var(--color-plate-gold)" />
                <span>MG Road, Camp</span>
              </a>
              <a
                href={`tel:${STORE_INFO.phone}`}
                style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#FFF', fontWeight: 600 }}
              >
                <Phone size={12} color="var(--color-plate-gold)" />
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
              height: isScrolled ? '64px' : '78px',
              transition: 'height 0.3s ease',
            }}
          >
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Logo variant="dark" size={isScrolled ? 'sm' : 'md'} />
            </div>

            {/* Desktop Nav Items with Kinetic Sliding Indicator */}
            <nav className="nav-links-desktop" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `nav-link-animated ${isActive ? 'active' : ''}`}
                >
                  <span className="nav-link-text">{item.label}</span>
                  <span className="nav-link-line" />
                </NavLink>
              ))}
            </nav>

            {/* Right Quick Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                className="header-action-btn"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
                title="Search equipment and courts"
              >
                <Search size={19} />
              </button>

              <Link
                to="/account"
                className="header-action-btn desktop-only"
                aria-label="Account"
                title="Your athlete account"
              >
                <User size={19} />
              </Link>

              <button
                type="button"
                className="header-action-btn"
                onClick={openCart}
                aria-label={`Bag (${itemCount})`}
                title="Shopping Bag"
                style={{
                  backgroundColor: itemCount > 0 ? 'rgba(201, 162, 39, 0.15)' : 'transparent',
                  border: itemCount > 0 ? '1px solid var(--color-plate-gold)' : '1px solid transparent',
                }}
              >
                <ShoppingBag size={19} color={itemCount > 0 ? 'var(--color-plate-gold)' : 'currentColor'} />
                {itemCount > 0 && (
                  <span className="cart-count-badge" aria-hidden="true">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Global Search Dialog */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
