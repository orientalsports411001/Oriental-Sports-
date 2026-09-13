import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Check, Plus, ShieldCheck, Zap } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../products/ProductCard';
import { GlassPanel } from '../ui/GlassPanel';
import { useCart } from '../../context/CartContext';

export const FeaturedProducts: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const { addToCart } = useCart();
  const [spotlightAdded, setSpotlightAdded] = useState(false);

  // Find the flagship spotlight item: Toray T700 Raw Carbon Paddle
  const spotlightProduct = PRODUCTS.find((p) => p.id === 'pickleball-paddle-pro-carbon') || PRODUCTS[0];

  const filterTabs = [
    { id: 'all', label: 'ALL GEAR' },
    { id: 'pickleball', label: 'PICKLEBALL' },
    { id: 'cricket', label: 'CRICKET' },
    { id: 'badminton', label: 'BADMINTON' },
    { id: 'tennis', label: 'TENNIS' },
    { id: 'volleyball', label: 'VOLLEYBALL' },
  ];

  const displayProducts =
    activeFilter === 'all'
      ? PRODUCTS.filter((p) => p.id !== spotlightProduct.id).slice(0, 8)
      : PRODUCTS.filter((p) => p.category === activeFilter && p.id !== spotlightProduct.id).slice(0, 8);

  const handleSpotlightQuickAdd = () => {
    addToCart(spotlightProduct, 1);
    setSpotlightAdded(true);
    setTimeout(() => setSpotlightAdded(false), 1800);
  };

  return (
    <section
      style={{
        backgroundColor: '#F7F5EE', // Warm Ivory Base
        paddingTop: 'clamp(64px, 8vw, 110px)',
        paddingBottom: 'clamp(64px, 8vw, 110px)',
        borderBottom: '2px solid #111111',
      }}
      aria-label="Featured Sports Equipment"
    >
      <div className="container">
        {/* Section Editorial Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: 'clamp(32px, 5vw, 48px)',
            borderBottom: '2px solid #111111',
            paddingBottom: '20px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#2457FF',
                }}
              />
              <span
                className="font-mono"
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#111111',
                }}
              >
                EQUIPMENT CATALOG // TOURNAMENT GRADE
              </span>
            </div>

            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.75rem)',
                lineHeight: 0.95,
                color: '#111111',
                margin: 0,
                letterSpacing: '-0.03em',
              }}
            >
              FEATURED GEAR
            </h2>
          </div>

          <Link
            to="/shop"
            data-cursor="view"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: '#111111',
              color: '#FFFFFF',
              fontSize: '0.8125rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2457FF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#111111';
            }}
          >
            <span>EXPLORE FULL STORE ({PRODUCTS.length})</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Editorial Hero Spotlight Product (Toray T700 Raw Carbon Paddle) */}
        {spotlightProduct && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '2px solid #111111',
              marginBottom: '48px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              overflow: 'hidden',
              boxShadow: '0 16px 40px rgba(0,0,0,0.06)',
            }}
          >
            {/* Left: Oversized Image with Brutalist Meta Frame */}
            <div
              style={{
                position: 'relative',
                minHeight: '380px',
                backgroundColor: '#111111',
                overflow: 'hidden',
              }}
            >
              <img
                src={spotlightProduct.images[0]}
                alt={spotlightProduct.name}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80';
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />

              {/* Floating Glass Spec Rail */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                }}
              >
                <GlassPanel
                  variant="dark"
                  blur="16px"
                  style={{
                    padding: '6px 14px',
                    fontSize: '0.6875rem',
                    fontWeight: 800,
                    letterSpacing: '0.14em',
                    color: '#D7FF00',
                    border: '1px solid rgba(215, 255, 0, 0.4)',
                  }}
                >
                  ENGINEERING SPOTLIGHT
                </GlassPanel>
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                }}
              >
                <GlassPanel
                  variant="dark"
                  blur="18px"
                  style={{
                    padding: '12px 18px',
                    color: '#FFFFFF',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                >
                  <div>
                    <div className="font-mono" style={{ fontSize: '0.6875rem', color: '#AAAAAA', letterSpacing: '0.1em' }}>
                      PADDLE CORE // USAPA REGULATION
                    </div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#FFFFFF' }}>
                      16mm Reactive Polymer Honeycomb
                    </div>
                  </div>
                  <span className="font-mono" style={{ fontSize: '0.75rem', color: '#D7FF00', fontWeight: 800 }}>
                    7.9 OZ
                  </span>
                </GlassPanel>
              </div>
            </div>

            {/* Right: Brutalist Editorial Copy & Technical Specs */}
            <div
              style={{
                padding: 'clamp(28px, 4vw, 44px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: '#FFFFFF',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '12px',
                  }}
                >
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      color: '#2457FF',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                    }}
                  >
                    DISCIPLINE: {spotlightProduct.categoryName || spotlightProduct.category}
                  </span>
                </div>

                <h3
                  className="font-display"
                  style={{
                    fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                    lineHeight: 1.05,
                    fontWeight: 900,
                    color: '#111111',
                    margin: '0 0 16px 0',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {spotlightProduct.name}
                </h3>

                <p
                  style={{
                    fontSize: '0.9375rem',
                    color: '#555555',
                    lineHeight: 1.6,
                    margin: '0 0 24px 0',
                  }}
                >
                  {spotlightProduct.description} Built with Toray T700 raw carbon weave for extreme spin control, high-rebound core dynamics, and tournament durability in Pune outdoor conditions.
                </p>

                {/* Technical Specs List */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '12px',
                    padding: '16px',
                    backgroundColor: '#F7F5EE',
                    border: '1px solid #E5E0D5',
                    marginBottom: '28px',
                  }}
                >
                  <div>
                    <div className="font-mono" style={{ fontSize: '0.6875rem', color: '#777777', textTransform: 'uppercase' }}>
                      FACE SURFACE
                    </div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#111111', marginTop: '2px' }}>
                      Toray T700 Raw Carbon
                    </div>
                  </div>
                  <div>
                    <div className="font-mono" style={{ fontSize: '0.6875rem', color: '#777777', textTransform: 'uppercase' }}>
                      CORE THICKNESS
                    </div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#111111', marginTop: '2px' }}>
                      16mm Polymer Honeycomb
                    </div>
                  </div>
                  <div>
                    <div className="font-mono" style={{ fontSize: '0.6875rem', color: '#777777', textTransform: 'uppercase' }}>
                      GRIP CIRCUMFERENCE
                    </div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#111111', marginTop: '2px' }}>
                      4.25 in (Cushioned Perforated)
                    </div>
                  </div>
                  <div>
                    <div className="font-mono" style={{ fontSize: '0.6875rem', color: '#777777', textTransform: 'uppercase' }}>
                      ORIGIN & WORKSHOP
                    </div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#111111', marginTop: '2px' }}>
                      Shop 247, MG Road Pune
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Actions Row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '16px',
                  paddingTop: '20px',
                  borderTop: '2px solid #111111',
                }}
              >
                <div>
                  <span className="font-mono" style={{ fontSize: '0.75rem', color: '#777777', display: 'block' }}>
                    SPECIAL PRICING
                  </span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                    <span className="font-mono" style={{ fontSize: '1.75rem', fontWeight: 900, color: '#111111' }}>
                      ₹{spotlightProduct.price.toLocaleString('en-IN')}
                    </span>
                    {spotlightProduct.originalPrice && (
                      <span className="font-mono" style={{ fontSize: '1rem', color: '#999999', textDecoration: 'line-through' }}>
                        ₹{spotlightProduct.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={handleSpotlightQuickAdd}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: spotlightAdded ? '#111111' : '#2457FF',
                      color: spotlightAdded ? '#D7FF00' : '#FFFFFF',
                      border: 'none',
                      fontSize: '0.8125rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {spotlightAdded ? (
                      <>
                        <Check size={16} color="#D7FF00" />
                        <span>ADDED TO BAG</span>
                      </>
                    ) : (
                      <>
                        <Plus size={16} />
                        <span>QUICK ADD SPOTLIGHT</span>
                      </>
                    )}
                  </button>

                  <Link
                    to={`/product/${spotlightProduct.slug}`}
                    style={{
                      padding: '12px 20px',
                      backgroundColor: '#FFFFFF',
                      color: '#111111',
                      border: '2px solid #111111',
                      fontSize: '0.8125rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>VIEW DETAILS</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Pills Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            overflowX: 'auto',
            paddingBottom: '16px',
            marginBottom: '32px',
          }}
        >
          {filterTabs.map((tab) => {
            const isSelected = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                style={{
                  padding: '9px 18px',
                  backgroundColor: isSelected ? '#111111' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : '#111111',
                  border: isSelected ? '2px solid #111111' : '1px solid #D8D4C8',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.18s ease',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
            gap: '24px',
          }}
        >
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
