import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ShoppingBag, LayoutGrid, User, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const MobileBottomNav: React.FC = () => {
  const { itemCount, openCart } = useCart();

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
      <NavLink
        to="/"
        end
        className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
      >
        <Home size={20} strokeWidth={2} />
        <span>HOME</span>
      </NavLink>

      <NavLink
        to="/shop"
        className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
      >
        <ShoppingBag size={20} strokeWidth={2} />
        <span>SHOP</span>
      </NavLink>

      <NavLink
        to="/courts"
        className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
      >
        <LayoutGrid size={20} strokeWidth={2} />
        <span>COURTS</span>
      </NavLink>

      <NavLink
        to="/account"
        className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
      >
        <User size={20} strokeWidth={2} />
        <span>ACCOUNT</span>
      </NavLink>

      <button
        type="button"
        onClick={openCart}
        className="bottom-nav-item"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
        }}
        aria-label={`Shopping Cart with ${itemCount} items`}
      >
        <div style={{ position: 'relative', display: 'inline-flex' }}>
          <ShoppingCart size={20} strokeWidth={2} />
          {itemCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-6px',
                right: '-8px',
                backgroundColor: 'var(--color-electric-blue)',
                color: '#FFFFFF',
                fontSize: '0.625rem',
                fontWeight: 800,
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-ui)',
              }}
            >
              {itemCount}
            </span>
          )}
        </div>
        <span>CART</span>
      </button>
    </nav>
  );
};
