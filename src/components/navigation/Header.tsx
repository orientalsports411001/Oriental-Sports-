import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { useCart } from '../../context/CartContext';
import { SearchModal } from './SearchModal';
import { MobileMenu } from './MobileMenu';
import { STORE_INFO } from '../../data/storeInfo';
import { useStoreStatus } from '../../utils/storeHours';

export const NAV_ITEMS = [
  { to: '/shop', label: 'Shop' },
  { to: '/courts', label: 'Courts' },
  { to: '/about', label: 'About' },
  { to: '/visit', label: 'Visit' },
];

export const Header: React.FC = () => {
  const { itemCount, openCart } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();
  const status = useStoreStatus();

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

      <div className="utility-bar desktop-only">
        <div className="container utility-row">
          <Link to="/visit" className="utility-link">
            {STORE_INFO.addressLine1}, {STORE_INFO.locality}, {STORE_INFO.city}
          </Link>
          <span className={`utility-status ${status.isOpen ? 'is-open' : ''}`}>
            <span className="status-dot" aria-hidden="true" />
            {status.label}
          </span>
          <span className="utility-contacts">
            <a href={`tel:${STORE_INFO.phone}`} className="utility-link">{STORE_INFO.displayPhone}</a>
            <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="utility-link">WhatsApp</a>
          </span>
        </div>
      </div>

      <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="container header-row">
          <Logo variant="light" size="md" className="header-logo" />

          <nav className="header-nav desktop-only" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                {item.label}
              </NavLink>
            ))}
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
            <button
              type="button"
              className="header-icon-btn"
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
