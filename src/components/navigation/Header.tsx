import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { useCart } from '../../context/CartContext';
import { SearchModal } from './SearchModal';

export const Header: React.FC = () => {
  const { itemCount, openCart } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [navigate]);

  return (
    <>
      <header
        className={`site-header ${isScrolled ? 'scrolled' : ''}`}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 'var(--header-height-desktop)',
            }}
          >
            {/* Left: Mobile Menu Trigger + Brand Identity */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                type="button"
                className="header-icon-btn mobile-only"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open navigation menu"
              >
                <Menu size={22} />
              </button>

              <Logo variant="light" size="md" />
            </div>

            {/* Center: Quiet Editorial Navigation */}
            <nav
              className="desktop-only"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <NavLink
                to="/shop"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                SHOP
              </NavLink>

              <NavLink
                to="/courts"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                COURTS
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                ABOUT
              </NavLink>

              <NavLink
                to="/visit"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                VISIT
              </NavLink>
            </nav>

            {/* Right: Search & Cart Only (Quiet & Restrained) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                type="button"
                className="header-icon-btn"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search equipment and courts"
                title="Search"
              >
                <Search size={18} strokeWidth={2.2} />
              </button>

              <button
                type="button"
                className="header-icon-btn"
                onClick={openCart}
                aria-label={`Shopping Bag (${itemCount} items)`}
                title="Shopping Bag"
              >
                <ShoppingBag size={18} strokeWidth={2.2} />
                {itemCount > 0 && <span className="header-badge">{itemCount}</span>}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(17, 17, 17, 0.65)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            zIndex: 999,
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: '85%',
              maxWidth: '340px',
              backgroundColor: 'var(--color-canvas-base)',
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-float)',
              borderRight: '1.5px solid var(--color-ink)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
              <Logo variant="light" size="sm" />
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ padding: '8px', color: 'var(--color-ink)' }}
                aria-label="Close navigation"
              >
                <X size={22} />
              </button>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <Link
                to="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-display"
                style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-ink)' }}
              >
                SHOP SPORTS →
              </Link>

              <Link
                to="/courts"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-display"
                style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-ink)' }}
              >
                BUILD A COURT →
              </Link>

              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-display"
                style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-ink)' }}
              >
                ABOUT ORIENTAL →
              </Link>

              <Link
                to="/visit"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-display"
                style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-ink)' }}
              >
                VISIT STORE →
              </Link>
            </nav>

            <div style={{ marginTop: 'auto', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '24px' }}>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-ink-muted)', marginBottom: '8px' }}>
                FLAGSHIP STORE
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-ink)', lineHeight: 1.4 }}>
                Shop 247, MG Road, Camp, Pune
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;
