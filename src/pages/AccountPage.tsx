import React from 'react';
import { Link } from 'react-router-dom';
import { User, Package, Heart, LayoutGrid, MapPin, Phone, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import { STORE_INFO } from '../data/storeInfo';

export const AccountPage: React.FC = () => {
  const { wishlist } = useWishlist();

  const favoritedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-ivory" style={{ minHeight: '80vh', paddingBottom: 'var(--space-4xl)' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'var(--color-ink)', color: '#FFFFFF', padding: 'var(--space-2xl) 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-plate-gold)',
                color: 'var(--color-ink)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.25rem',
              }}
            >
              OS
            </div>
            <div>
              <h1 className="font-display" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: '#FFFFFF' }}>
                ATHLETE ACCOUNT
              </h1>
              <span style={{ fontSize: '0.8125rem', color: '#C9A227' }}>
                Oriental Sports Member • Pune, MH
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 'var(--space-2xl)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-2xl)',
            marginBottom: 'var(--space-3xl)',
          }}
        >
          {/* Member Profile Box */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '2px', border: '1px solid var(--color-ivory-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--color-plate-gold)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>
              <User size={16} />
              <span>PROFILE & PREFERENCES</span>
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '8px' }}>
              Pune Sports Club Member
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#666', lineHeight: 1.45, marginBottom: '16px' }}>
              Preferred Store: Shop 247, MG Road, Camp<br />
              Racquet Stringing Loyalty Program: Active
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link to="/visit" className="btn btn-outline-dark btn-sm">
                <span>CAMP STORE GUIDE</span>
              </Link>
            </div>
          </div>

          {/* Orders / Pickup Simulator */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '2px', border: '1px solid var(--color-ivory-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--color-plate-gold)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>
              <Package size={16} />
              <span>ACTIVE ORDERS & PICKUPS</span>
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '8px' }}>
              No Active Delivery in Progress
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#666', lineHeight: 1.45, marginBottom: '16px' }}>
              Placed an order? Orders are dispatched from our Camp store within 24 hours. For same-day status, message us on WhatsApp.
            </p>
            <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-gold btn-sm">
              <span>CHECK ORDER STATUS</span>
            </a>
          </div>
        </div>

        {/* Wishlist Section */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Heart size={20} color="#C9A227" fill="#C9A227" />
            <h2 className="font-display" style={{ fontSize: '1.5rem' }}>
              SAVED EQUIPMENT ({favoritedProducts.length})
            </h2>
          </div>

          {favoritedProducts.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 'var(--space-md)' }}>
              {favoritedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div style={{ padding: '40px 16px', backgroundColor: '#FFFFFF', textAlign: 'center', borderRadius: '2px' }}>
              <p style={{ color: '#666', marginBottom: '16px' }}>
                You haven't saved any equipment yet. Click the heart icon on any product to save it to your bag.
              </p>
              <Link to="/shop" className="btn btn-primary btn-sm">
                BROWSE GEAR
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
