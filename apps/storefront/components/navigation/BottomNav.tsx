'use client';

import React from 'react';
import { NavLink, useLocation } from '@/lib/router-shim';
import { Home, Shirt, ClipboardList, ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export const BottomNav: React.FC = () => {
  const { pathname } = useLocation();
  const { itemCount, isCartOpen } = useCart();
  const { isAuthenticated, isAuthModalOpen } = useAuth();

  // Hide on dedicated checkout and order confirmation pages to keep them distraction-free
  if (pathname === '/checkout' || pathname === '/order-success') {
    return null;
  }

  // Exact mutual exclusion so exactly one tab is active
  const isCartActive = pathname === '/cart' || isCartOpen;
  const isOrdersActive = !isCartActive && pathname.startsWith('/account/orders');
  const isAccountActive =
    !isCartActive &&
    !isOrdersActive &&
    (pathname.startsWith('/account') || pathname.startsWith('/wishlist') || isAuthModalOpen);
  const isProductsActive =
    !isCartActive &&
    !isOrdersActive &&
    !isAccountActive &&
    (pathname.startsWith('/shop') || pathname.startsWith('/product') || pathname.startsWith('/courts') || pathname.startsWith('/installations'));
  const isHomeActive = !isProductsActive && !isOrdersActive && !isCartActive && !isAccountActive;

  let activeIndex = 0;
  if (isProductsActive) activeIndex = 1;
  else if (isOrdersActive) activeIndex = 2;
  else if (isCartActive) activeIndex = 3;
  else if (isAccountActive) activeIndex = 4;

  return (
    <nav className="bottom-nav-dock" aria-label="Mobile Navigation">
      <div className="bottom-nav-pill">
        {/* Real animated sliding indicator capsule that glides to whichever item is active */}
        <div
          className="bottom-nav-slider"
          style={{
            transform: `translateX(calc(${activeIndex} * (100% + 2px)))`,
          }}
          aria-hidden="true"
        />

        <NavLink
          to="/"
          className={`bottom-nav-item ${isHomeActive ? 'is-active' : ''}`}
          aria-label="Home"
        >
          <div className="bottom-nav-icon-wrap">
            <Home size={20} strokeWidth={isHomeActive ? 2.4 : 1.8} />
          </div>
          <span className="bottom-nav-label">Home</span>
        </NavLink>

        <NavLink
          to="/shop"
          className={`bottom-nav-item ${isProductsActive ? 'is-active' : ''}`}
          aria-label="Products"
        >
          <div className="bottom-nav-icon-wrap">
            <Shirt size={20} strokeWidth={isProductsActive ? 2.4 : 1.8} />
          </div>
          <span className="bottom-nav-label">Products</span>
        </NavLink>

        <NavLink
          to="/account/orders"
          className={`bottom-nav-item ${isOrdersActive ? 'is-active' : ''}`}
          aria-label="Orders"
        >
          <div className="bottom-nav-icon-wrap">
            <ClipboardList size={20} strokeWidth={isOrdersActive ? 2.4 : 1.8} />
          </div>
          <span className="bottom-nav-label">Orders</span>
        </NavLink>

        <NavLink
          to="/cart"
          className={`bottom-nav-item ${isCartActive ? 'is-active' : ''}`}
          aria-label={`Cart with ${itemCount} items`}
        >
          <div className="bottom-nav-icon-wrap">
            <ShoppingCart size={20} strokeWidth={isCartActive ? 2.4 : 1.8} />
            {itemCount > 0 && (
              <span className="bottom-nav-badge" aria-hidden="true">
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </div>
          <span className="bottom-nav-label">Cart</span>
        </NavLink>

        <NavLink
          to="/account"
          className={`bottom-nav-item ${isAccountActive ? 'is-active' : ''}`}
          aria-label="Account"
        >
          <div className="bottom-nav-icon-wrap">
            <User size={20} strokeWidth={isAccountActive ? 2.4 : 1.8} />
            {isAuthenticated && <span className="bottom-nav-auth-dot" aria-hidden="true" />}
          </div>
          <span className="bottom-nav-label">Account</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;
