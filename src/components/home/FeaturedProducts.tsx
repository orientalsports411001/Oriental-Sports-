import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../products/ProductCard';

export const FeaturedProducts: React.FC = () => {
  // Show 4-6 real products
  const featured = PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <section className="section-padding bg-white" aria-label="Featured Sports Equipment">
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: 'var(--space-2xl)',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-electric-blue)',
                background: 'var(--color-lavender)',
                padding: '6px 14px',
                borderRadius: 'var(--radius-pill)',
                marginBottom: '12px',
              }}
            >
              <Sparkles size={13} />
              <span>MATCH-READY EQUIPMENT</span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.2rem, 5vw, 3.75rem)',
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                color: 'var(--color-ink)',
                margin: 0,
              }}
            >
              FEATURED GEAR
            </h2>
            <p
              style={{
                margin: '8px 0 0 0',
                fontSize: '1rem',
                color: 'var(--color-ink-muted)',
                fontWeight: 500,
              }}
            >
              Authentic match-grade rackets, willow bats, and tournament equipment in stock at Camp, Pune.
            </p>
          </div>

          <Link
            to="/shop"
            className="btn-outline-dark"
            style={{ textDecoration: 'none' }}
          >
            <span>VIEW ALL GEAR ({PRODUCTS.length})</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mobile Swipe Reel */}
        <div className="mobile-only-block">
          <div
            className="scroll-reel"
            style={{
              paddingLeft: '2px',
              paddingRight: '16px',
              gap: '16px',
              paddingBottom: '12px',
            }}
          >
            {featured.map((product) => (
              <div key={product.id} style={{ width: '280px', flexShrink: 0 }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop 4-Column Grid */}
        <div className="desktop-only-grid">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 'var(--space-lg)',
            }}
          >
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
