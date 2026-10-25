'use client';

import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useLocation } from '@/lib/router-shim';
import { Search, ShoppingBag, User, Heart } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { SearchModal } from './SearchModal';
import { MobileMenu } from './MobileMenu';
export const NAV_ITEMS = [
  { to: '/shop', label: 'Shop' },
  { to: '/installations', label: 'Installations' },
  { to: '/about', label: 'About' },
  { to: '/visit', label: 'Visit' },
];

export const Header: React.FC = () => {
  const { itemCount, openCart } = useCart();
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const { wishlist } = useWishlist();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="container header-row">
          <Logo variant="dark" size="md" className="header-logo" />

          <nav className="header-nav desktop-only" aria-label="Primary">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.to === '/installations'
                  ? pathname === '/installations' || pathname.startsWith('/courts')
                  : pathname === item.to || pathname.startsWith(item.to + '/');
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="header-icon-btn"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search gear and courts"
            >
              <Search size={20} strokeWidth={1.8} />
            </button>

            <Link
              to="/account/wishlist"
              className="header-icon-btn desktop-only"
              aria-label={`Wishlist, ${wishlist.length} saved items`}
            >
              <Heart size={20} strokeWidth={1.8} />
              {wishlist.length > 0 && <span className="header-badge">{wishlist.length}</span>}
            </Link>

            {isAuthenticated ? (
              <Link
                to="/account"
                className="header-icon-btn header-account-btn desktop-only"
                aria-label={`Account (${user?.firstName || 'Customer'})`}
                title={`Account (${user?.firstName || 'Customer'})`}
              >
                <User size={20} strokeWidth={1.8} />
                <span className="account-status-dot" aria-hidden="true" />
              </Link>
            ) : (
              <button
                type="button"
                className="header-icon-btn header-account-btn desktop-only"
                onClick={() => openAuthModal()}
                aria-label="Sign in / Account"
                title="Sign in / Account"
              >
                <User size={20} strokeWidth={1.8} />
              </button>
            )}

            <button
              type="button"
              className="header-icon-btn desktop-only"
              onClick={openCart}
              aria-label={`Shopping bag, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
            >
              <ShoppingBag size={20} strokeWidth={1.8} />
              {itemCount > 0 && <span className="header-badge">{itemCount}</span>}
            </button>
            <button
              ref={menuButtonRef}
              type="button"
              className="menu-toggle mobile-only"
              onClick={() => setIsMenuOpen(true)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="menu-toggle-bars" aria-hidden="true">
                <span />
                <span />
              </span>
              <span className="menu-toggle-label">Menu</span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={isMenuOpen}
        onClose={() => {
          setIsMenuOpen(false);
          menuButtonRef.current?.focus();
        }}
        onSearch={() => {
          setIsMenuOpen(false);
          setIsSearchOpen(true);
        }}
      />

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;
