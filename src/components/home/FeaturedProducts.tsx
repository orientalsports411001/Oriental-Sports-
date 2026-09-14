import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';

export const FeaturedProducts: React.FC = () => {
  const dominantProduct = PRODUCTS[0];
  const secondaryProducts = PRODUCTS.slice(1, 3);

  return (
    <section className="editorial-section" style={{ backgroundColor: 'var(--color-canvas-surface)' }}>
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: 'clamp(36px, 6vw, 64px)',
            gap: '16px',
          }}
        >
          <div>
            <span className="section-label">CURATED GEAR</span>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.25rem, 5.5vw, 4.25rem)',
                color: 'var(--color-ink)',
                margin: 0,
              }}
            >
              CHAMPIONSHIP APPARATUS.
            </h2>
          </div>

          <Link to="/shop" className="btn-text">
            <span>VIEW COMPLETE CATALOG</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Asymmetric Editorial Product Spread */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(20px, 4vw, 48px)',
            alignItems: 'stretch',
          }}
        >
          {/* Dominant Flagship Spotlight */}
          {dominantProduct && (
            <Link
              to={`/product/${dominantProduct.slug}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: 'var(--color-canvas-base)',
                borderRadius: 'var(--radius-lg)',
                padding: 'clamp(24px, 4vw, 44px)',
                textDecoration: 'none',
                color: 'var(--color-ink)',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid var(--color-border-subtle)',
                transition: 'transform var(--transition-normal)',
              }}
            >
              <div style={{ marginBottom: '24px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--color-ink-muted)',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  {dominantProduct.brand} • {dominantProduct.categoryName}
                </span>
                <h3
                  className="font-display"
                  style={{
                    fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)',
                    color: 'var(--color-ink)',
                    marginTop: '8px',
                    marginBottom: '12px',
                  }}
                >
                  {dominantProduct.name}
                </h3>
                <div
                  style={{
                    fontSize: '1.25rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    color: 'var(--color-ink)',
                  }}
                >
                  ₹{dominantProduct.price.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Large Product Photography */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 11',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  margin: '16px 0 24px 0',
                }}
              >
                <img
                  src={dominantProduct.images[0]}
                  alt={dominantProduct.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  onError={(e) => {
                    e.currentTarget.src =
                      '/images/hero/hero_train_perform.jpg';
                  }}
                />
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '0.875rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--color-ink)',
                }}
              >
                <span>SHOP PRODUCT</span>
                <ArrowUpRight size={16} />
              </div>
            </Link>
          )}

          {/* Secondary Editorial Spread */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(20px, 3vw, 36px)',
              justifyContent: 'space-between',
            }}
          >
            {secondaryProducts.map((prod) => (
              <Link
                key={prod.id}
                to={`/product/${prod.slug}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'clamp(88px, 28%, 130px) 1fr',
                  gap: '16px',
                  alignItems: 'center',
                  backgroundColor: 'var(--color-canvas-base)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '20px',
                  textDecoration: 'none',
                  color: 'var(--color-ink)',
                  border: '1px solid var(--color-border-subtle)',
                  transition: 'transform var(--transition-normal)',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '1 / 1',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                </div>

                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6875rem',
                      color: 'var(--color-ink-muted)',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {prod.categoryName}
                  </span>
                  <h4
                    className="font-display"
                    style={{
                      fontSize: '1.25rem',
                      color: 'var(--color-ink)',
                      marginTop: '4px',
                      marginBottom: '8px',
                    }}
                  >
                    {prod.name}
                  </h4>
                  <div
                    style={{
                      fontSize: '1rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      color: 'var(--color-ink)',
                      marginBottom: '10px',
                    }}
                  >
                    ₹{prod.price.toLocaleString('en-IN')}
                  </div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-display)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'var(--color-ink)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    SHOP →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
