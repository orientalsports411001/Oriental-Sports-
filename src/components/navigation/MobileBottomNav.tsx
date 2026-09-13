import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ShoppingBag, LayoutGrid, MapPin } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
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
        to="/visit"
        className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
      >
        <MapPin size={20} strokeWidth={2} />
        <span>VISIT</span>
      </NavLink>
    </nav>
  );
};
