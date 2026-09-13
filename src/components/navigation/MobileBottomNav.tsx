import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Grid, Heart, User } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

export const MobileBottomNav: React.FC = () => {
  const { wishlist } = useWishlist();
  const { isAuthenticated, openAuthModal } = useAuth();

  return (
    <nav className="mobile-bottom-nav mobile-only" aria-label="Mobile Navigation Bar">
      <NavLink
        to="/"
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
        end
      >
        <Home size={20} />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/shop"
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        <Grid size={20} />
        <span>Shop</span>
      </NavLink>

      <NavLink
        to="/courts"
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        <Compass size={20} />
        <span>Courts</span>
      </NavLink>

      <NavLink
        to="/wishlist"
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        <div style={{ position: 'relative' }}>
          <Heart size={20} />
          {wishlist.length > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-8px',
                minWidth: '15px',
                height: '15px',
                borderRadius: '9999px',
                backgroundColor: 'var(--color-ink)',
                color: '#FFFFFF',
                fontSize: '0.625rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {wishlist.length}
            </span>
          )}
        </div>
        <span>Wishlist</span>
      </NavLink>

      {isAuthenticated ? (
        <NavLink
          to="/account"
          className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
        >
          <User size={20} />
          <span>Account</span>
        </NavLink>
      ) : (
        <button
          type="button"
          onClick={() => openAuthModal('phone')}
          className="mobile-nav-item"
        >
          <User size={20} />
          <span>Sign In</span>
        </button>
      )}
    </nav>
  );
};
