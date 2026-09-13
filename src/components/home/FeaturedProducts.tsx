import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../products/ProductCard';
import { MagneticButton } from '../ui/MagneticButton';

export const FeaturedProducts: React.FC = () => {
  const featured = PRODUCTS.filter((p) => p.isFeatured);

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
                gap: '6px',
                fontFamily: 'var(--font-ui)',
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-plate-gold)',
                marginBottom: '8px',
              }}
            >
              <Sparkles size={14} />
              <span>MATCH-READY SELECTION</span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display-xl)',
                fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
                lineHeight: 0.9,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                color: 'var(--color-ink)',
                margin: 0,
              }}
            >
              FEATURED GEAR
            </h2>
          </div>

          <MagneticButton
            variant="outline-dark"
            size="sm"
            onClick={() => (window.location.href = '/shop')}
          >
            <span>VIEW FULL CATALOG ({PRODUCTS.length})</span>
            <ArrowRight size={15} color="var(--color-plate-gold)" />
          </MagneticButton>
        </div>

        {/* Mobile Swipe Reel */}
        <div className="mobile-only-block">
          <div className="scroll-reel" style={{ paddingLeft: '2px', paddingRight: '16px', gap: '14px' }}>
            {featured.map((product) => (
              <div key={product.id} style={{ width: '280px' }}>
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
