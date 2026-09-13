import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Heart, Menu, X, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { SearchModal } from './SearchModal';
import { CATEGORIES } from '../../data/categories';
import { GlassPanel } from '../ui/GlassPanel';

export const Header: React.FC = () => {
  const { itemCount, openCart } = useCart();
  const { wishlist } = useWishlist();
  const { isAuthenticated, user, openAuthModal, signOut } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isShopMegaOpen, setIsShopMegaOpen] = useState(false);
  const [hoveredSportId, setHoveredSportId] = useState<string>('pickleball');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
    setIsShopMegaOpen(false);
  }, [navigate]);

  const activeSportCategory = CATEGORIES.find((c) => c.id === hoveredSportId) || CATEGORIES[0];

  return (
    <>
      <header
        className={`site-header ${isScrolled ? 'scrolled' : ''}`}
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 70,
          backgroundColor: isScrolled ? 'rgba(246, 243, 234, 0.94)' : 'rgba(246, 243, 234, 0.82)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: isScrolled ? '1.5px solid var(--color-ink)' : '1px solid var(--color-border-subtle)',
          transition: 'all var(--transition-normal)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: isScrolled ? '64px' : '76px',
              transition: 'height var(--transition-normal)',
            }}
          >
            {/* Left: Mobile Menu / Brand Logo */}
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

            {/* Center: Desktop Navigation Links with Mega Menu Hook */}
            <nav
              className="desktop-only"
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              onMouseLeave={() => setIsShopMegaOpen(false)}
            >
              <div
                style={{ position: 'relative' }}
                onMouseEnter={() => setIsShopMegaOpen(true)}
              >
                <NavLink
                  to="/shop"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    padding: '8px 16px',
                  }}
                >
                  SHOP
                </NavLink>
              </div>

              <NavLink
                to="/courts"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  padding: '8px 16px',
                }}
              >
                COURTS
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  padding: '8px 16px',
                }}
              >
                ABOUT
              </NavLink>

              <NavLink
                to="/visit"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  padding: '8px 16px',
                }}
              >
                VISIT
              </NavLink>
            </nav>

            {/* Right: Search, Account, Wishlist, Bag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                type="button"
                className="header-icon-btn"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search equipment and courts"
                title="Search (⌘K)"
                data-cursor="pointer"
              >
                <Search size={19} />
              </button>

              <Link
                to="/wishlist"
                className="header-icon-btn"
                aria-label={`Wishlist (${wishlist.length} items)`}
                title="Wishlist"
                data-cursor="pointer"
              >
                <Heart size={19} fill={wishlist.length > 0 ? 'var(--color-ink)' : 'none'} />
                {wishlist.length > 0 && <span className="header-badge">{wishlist.length}</span>}
              </Link>

              {/* Account Dropdown */}
              <div className="desktop-only" style={{ position: 'relative' }}>
                <button
                  type="button"
                  className="header-icon-btn"
                  onClick={() => {
                    if (!isAuthenticated) {
                      openAuthModal('phone');
                    } else {
                      setIsUserMenuOpen(!isUserMenuOpen);
                    }
                  }}
                  aria-label={isAuthenticated ? 'Account menu' : 'Sign in to account'}
                  title={isAuthenticated ? `Account: ${user?.firstName}` : 'Sign In'}
                  data-cursor="pointer"
                >
                  <User size={19} />
                </button>

                {isAuthenticated && isUserMenuOpen && (
                  <GlassPanel
                    variant="dark"
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 'calc(100% + 12px)',
                      width: '260px',
                      padding: '16px',
                      zIndex: 80,
                    }}
                  >
                    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '10px', marginBottom: '10px' }}>
                      <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.875rem' }}>
                        {user?.firstName} {user?.lastName}
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.75rem' }}>
                        {user?.phone || user?.email}
                      </div>
                    </div>

                    <Link
                      to="/account/orders"
                      style={{ display: 'block', padding: '8px 0', color: '#FFFFFF', fontSize: '0.8125rem' }}
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Orders & Restringing
                    </Link>
                    <Link
                      to="/account/addresses"
                      style={{ display: 'block', padding: '8px 0', color: '#FFFFFF', fontSize: '0.8125rem' }}
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Saved Addresses
                    </Link>
                    <Link
                      to="/account/profile"
                      style={{ display: 'block', padding: '8px 0', color: '#FFFFFF', fontSize: '0.8125rem' }}
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Profile Settings
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        signOut();
                        setIsUserMenuOpen(false);
                      }}
                      style={{
                        marginTop: '10px',
                        paddingTop: '10px',
                        borderTop: '1px solid rgba(255,255,255,0.15)',
                        color: '#F87171',
                        fontSize: '0.8125rem',
                        textAlign: 'left',
                        width: '100%',
                      }}
                    >
                      Sign Out
                    </button>
                  </GlassPanel>
                )}
              </div>

              {/* Bag Trigger */}
              <button
                type="button"
                className="header-icon-btn"
                onClick={openCart}
                aria-label={`Shopping Bag (${itemCount} items)`}
                title="Shopping Bag"
                data-cursor="pointer"
              >
                <ShoppingBag size={19} />
                {itemCount > 0 && <span className="header-badge">{itemCount}</span>}
              </button>
            </div>
          </div>
        </div>

        {/* SHOP Live Visual Mega Menu */}
        {isShopMegaOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'rgba(246, 243, 234, 0.98)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderBottom: '2px solid var(--color-ink)',
              boxShadow: '0 24px 48px -12px rgba(17, 17, 17, 0.2)',
              zIndex: 65,
            }}
            onMouseEnter={() => setIsShopMegaOpen(true)}
            onMouseLeave={() => setIsShopMegaOpen(false)}
          >
            <div className="container" style={{ padding: '36px clamp(16px, 4vw, 36px)' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '48px',
                  alignItems: 'center',
                }}
              >
                {/* Left: Sports Discipline List */}
                <div>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--color-ink-muted)',
                      marginBottom: '16px',
                    }}
                  >
                    DISCIPLINES & EQUIPMENT
                  </span>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '8px',
                    }}
                  >
                    {CATEGORIES.map((cat, idx) => (
                      <Link
                        key={cat.id}
                        to={`/shop/${cat.id}`}
                        onMouseEnter={() => setHoveredSportId(cat.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: hoveredSportId === cat.id ? 'var(--color-ink)' : 'transparent',
                          color: hoveredSportId === cat.id ? '#FFFFFF' : 'var(--color-ink)',
                          transition: 'all var(--transition-fast)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                          <span
                            style={{
                              fontSize: '0.6875rem',
                              fontFamily: 'var(--font-mono)',
                              color: hoveredSportId === cat.id ? 'var(--color-highlight-gold)' : 'var(--color-ink-subtle)',
                            }}
                          >
                            0{idx + 1}
                          </span>
                          <span
                            className="font-display"
                            style={{ fontSize: '1.0625rem', fontWeight: 700 }}
                          >
                            {cat.name}
                          </span>
                        </div>
                        <ArrowUpRight
                          size={15}
                          style={{
                            opacity: hoveredSportId === cat.id ? 1 : 0,
                            transform: hoveredSportId === cat.id ? 'translate(0, 0)' : 'translate(-4px, 4px)',
                            transition: 'all var(--transition-fast)',
                          }}
                        />
                      </Link>
                    ))}
                  </div>

                  <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--color-border-subtle)' }}>
                    <Link
                      to="/shop"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.8125rem',
                        fontWeight: 700,
                        color: 'var(--color-electric-blue)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      <span>VIEW ALL EQUIPMENT IN CATALOG</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>

                {/* Right: Live Dynamic Photography Preview Frame */}
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '16 / 10',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    border: '1.5px solid var(--color-ink)',
                    backgroundColor: '#111111',
                    boxShadow: 'var(--shadow-card-hover)',
                  }}
                >
                  <img
                    src={activeSportCategory.image}
                    alt={activeSportCategory.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease-out',
                    }}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1000&q=80';
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(17,17,17,0.1) 0%, rgba(17,17,17,0.78) 100%)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '20px',
                      left: '20px',
                      right: '20px',
                      color: '#FFFFFF',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.6875rem',
                        fontWeight: 800,
                        letterSpacing: '0.1em',
                        color: 'var(--color-highlight-gold)',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '4px',
                      }}
                    >
                      PUNE CAMP STOCK · READY TODAY
                    </span>
                    <h4
                      className="font-display"
                      style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: '#FFFFFF' }}
                    >
                      {activeSportCategory.name}
                    </h4>
                    <p style={{ fontSize: '0.8125rem', color: '#E4E0D5', marginTop: '4px', margin: 0 }}>
                      {activeSportCategory.tagline}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(17, 17, 17, 0.65)',
            backdropFilter: 'blur(8px)',
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
              width: '88%',
              maxWidth: '360px',
              backgroundColor: 'var(--color-canvas-pure)',
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-drawer)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
              <Logo variant="light" size="sm" />
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ padding: '6px', color: 'var(--color-ink)' }}
                aria-label="Close drawer"
              >
                <X size={22} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Link
                to="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-display"
                style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-ink)' }}
              >
                SHOP SPORTS
              </Link>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingLeft: '8px', marginBottom: '8px' }}>
                {CATEGORIES.slice(0, 6).map((c) => (
                  <Link
                    key={c.id}
                    to={`/shop/${c.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: 'var(--color-ink)',
                      backgroundColor: 'var(--color-canvas-subtle)',
                      padding: '5px 12px',
                      borderRadius: 'var(--radius-pill)',
                    }}
                  >
                    {c.name}
                  </Link>
                ))}
              </div>

              <Link
                to="/courts"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-display"
                style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-ink)' }}
              >
                BUILD A COURT
              </Link>

              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-display"
                style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-ink)' }}
              >
                ABOUT ORIENTAL
              </Link>

              <Link
                to="/visit"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-display"
                style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-ink)' }}
              >
                VISIT CAMP STORE
              </Link>
            </div>

            <div style={{ marginTop: 'auto', borderTop: '1.5px solid var(--color-ink)', paddingTop: '20px' }}>
              <Link
                to="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn btn-primary btn-pill"
                style={{ width: '100%' }}
              >
                {isAuthenticated ? `Hi, ${user?.firstName} (Account)` : 'Sign In with Phone OTP'}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
