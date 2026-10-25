'use client';

import React, { useEffect, useRef } from 'react';
import { Link, NavLink } from '@/lib/router-shim';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Logo } from '../brand/Logo';
import { CATEGORIES } from '@/data/categories';
import { STORE_INFO } from '@/data/storeInfo';
import { useStoreStatus } from '@/utils/storeHours';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { EASE_OUT } from '../motion/Reveal';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onSearch: () => void;
}

const PRIMARY = [
  { to: '/shop', label: 'Shop', note: `Gear across ${CATEGORIES.length} sports` },
  { to: '/installations', label: 'Installations', note: 'Turnkey courts, turfs & gym fit-outs' },
  { to: '/about', label: 'About', note: 'The sports house in Camp' },
  { to: '/visit', label: 'Visit', note: `${STORE_INFO.addressLine1}, ${STORE_INFO.locality}` },
];

export const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose, onSearch }) => {
  const reduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const status = useStoreStatus();
  const { user, isAuthenticated } = useAuth();
  const { wishlist } = useWishlist();

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      root.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const item = (i: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.12 + i * 0.05, ease: EASE_OUT } },
        };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          className="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={reduced ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={reduced ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={reduced ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: reduced ? 0.15 : 0.55, ease: EASE_OUT }}
        >
          <div className="mobile-menu-top container">
            <Logo size="md" className="header-logo" />
            <button ref={closeRef} type="button" className="menu-close" onClick={onClose}>
              <span className="menu-close-x" aria-hidden="true" />
              <span>Close</span>
            </button>
          </div>

          <div className="mobile-menu-body container">
            <nav aria-label="Primary">
              <ul className="mobile-menu-primary">
                {PRIMARY.map((link, i) => (
                  <motion.li key={link.to} {...item(i)}>
                    <NavLink
                      to={link.to}
                      onClick={onClose}
                      className={({ isActive }) => `mobile-menu-link ${isActive ? 'active' : ''}`}
                    >
                      <span className="mobile-menu-link-label">{link.label}</span>
                      <span className="mobile-menu-link-note">{link.note}</span>
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div className="mobile-menu-sports" {...item(4)}>
              <p className="label subtle">Shop by sport</p>
              <div className="mobile-menu-chips">
                {CATEGORIES.map((c) => (
                  <Link key={c.id} to={`/shop/${c.id}`} onClick={onClose} className="chip">
                    {c.name}
                  </Link>
                ))}
              </div>
            </motion.div>

            <motion.div className="mobile-menu-utility" {...item(5)}>
              <button type="button" className="link-arrow" onClick={onSearch}>Search Gear</button>
              <Link to="/account" onClick={onClose} className="link-arrow" style={{ fontWeight: 700 }}>
                {isAuthenticated ? `My Account (${user?.firstName || 'Athlete'})` : 'Sign In / Register'}
              </Link>
              <Link to="/account/orders" onClick={onClose} className="link-arrow">My Orders & Tracking</Link>
              <Link to="/account/wishlist" onClick={onClose} className="link-arrow">
                Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
              </Link>
            </motion.div>

            <motion.div className="mobile-menu-store" {...item(6)}>
              <p className={`store-status ${status.isOpen ? 'is-open' : ''}`}>
                <span className="status-dot" aria-hidden="true" />
                {status.label}
              </p>
              <p className="mobile-menu-address">
                {STORE_INFO.addressLine1}, {STORE_INFO.addressLine2}, {STORE_INFO.city} {STORE_INFO.pincode}
              </p>
              <div className="mobile-menu-actions">
                <a href={`tel:${STORE_INFO.phone}`} className="btn btn-primary">Call store</a>
                <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
