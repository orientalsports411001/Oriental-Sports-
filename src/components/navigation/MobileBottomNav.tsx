import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Grid, MapPin, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const MobileBottomNav: React.FC = () => {
  const { itemCount, openCart } = useCart();

  return (
    <nav className="mobile-bottom-nav mobile-only" aria-label="Mobile Navigation Bar">
      <NavLink
        to="/"
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
        end
      >
        <Home size={19} strokeWidth={2.2} />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/shop"
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        <Grid size={19} strokeWidth={2.2} />
        <span>Shop</span>
      </NavLink>

      <NavLink
        to="/courts"
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        <Compass size={19} strokeWidth={2.2} />
        <span>Courts</span>
      </NavLink>

      <NavLink
        to="/visit"
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        <MapPin size={19} strokeWidth={2.2} />
        <span>Visit</span>
      </NavLink>

      <button
        type="button"
        onClick={openCart}
        className="mobile-nav-item"
        style={{ position: 'relative' }}
        aria-label="Open Cart"
      >
        <ShoppingBag size={19} strokeWidth={2.2} />
        {itemCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '4px',
              right: '10px',
              minWidth: '14px',
              height: '14px',
              borderRadius: '9999px',
              backgroundColor: 'var(--color-ink)',
              color: '#FFFFFF',
              fontSize: '0.5625rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {itemCount}
          </span>
        )}
        <span>Bag</span>
      </button>
    </nav>
  );
};

export default MobileBottomNav;
