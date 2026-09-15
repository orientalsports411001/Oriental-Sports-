import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';
import { ProductCard } from '../products/ProductCard';

/**
 * Selects the best editorial featured product from the real catalog.
 */
function selectFeaturedProduct(): Product {
  const featured = PRODUCTS.filter(p => p.isFeatured);
  const withSpecs = featured.filter(
    p => p.specs && Object.keys(p.specs).length >= 3 && p.images?.[0]
  );
  return withSpecs[0] ?? featured[0] ?? PRODUCTS[0];
}

const SPOTLIGHT_PRODUCT = selectFeaturedProduct();

// Pick exactly 3 real specs to display editorially
function getDisplaySpecs(specs?: Record<string, string>): [string, string][] {
  if (!specs) return [];
  return Object.entries(specs).slice(0, 3);
}

const DISPLAY_SPECS = getDisplaySpecs(SPOTLIGHT_PRODUCT.specs);

// Specific cross-discipline curated gear (Cricket, Badminton, Tennis, Pickleball)
const CURATED_PRODUCT_IDS = [
  'prod-crick-01', // Camp Heritage Grade 1 English Willow Cricket Bat
  'prod-bad-01',   // Nano Aero-Speed Carbon Badminton Racquet (4U)
  'prod-ten-01',   // Tour Pro 300g Graphite All-Court Tennis Racquet
  'prod-pb-01',    // Toray T700 Raw Carbon Pickleball Paddle
];

const CURATED_PRODUCTS = CURATED_PRODUCT_IDS.map(id =>
  PRODUCTS.find(p => p.id === id)
).filter((p): p is Product => Boolean(p));

export const FeaturedProducts: React.FC = () => {
  return (
    <>
      {/* ──────────────────────────────────────────
          SECTION A — FLAGSHIP SPOTLIGHT (EDITORIAL SPREAD)
          Single flagship product with architectural framing
      ────────────────────────────────────────── */}
      <section
        aria-label={`Flagship Spotlight: ${SPOTLIGHT_PRODUCT.name}`}
        style={{
          backgroundColor: 'var(--color-canvas-base)',
          padding: 'clamp(72px, 10vw, 140px) 0 clamp(48px, 6vw, 80px)',
          overflow: 'hidden',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* Full-width label row */}
        <div
          style={{
            maxWidth: 'var(--max-width-content)',
            margin: '0 auto',
            padding: '0 clamp(20px, 5vw, 72px)',
            marginBottom: 'clamp(28px, 4vw, 48px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '6px',
                height: '6px',
                backgroundColor: 'var(--color-brand-gold)',
                borderRadius: '50%',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-ink-subtle)',
              }}
            >
              FLAGSHIP CRAFT · PUNE
            </span>
          </div>
        </div>

        {/* Main composition — editorial split */}
        <div
          style={{
            maxWidth: 'var(--max-width-content)',
            margin: '0 auto',
            padding: '0 0 0 clamp(20px, 5vw, 72px)',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 50%)',
            gap: '0',
            alignItems: 'stretch',
            minHeight: 'clamp(500px, 68vh, 760px)',
          }}
          className="spotlight-split"
        >
          {/* LEFT — typography composition */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingRight: 'clamp(24px, 4vw, 72px)',
            }}
          >
            {/* Series / spec highlight */}
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--color-brand-gold)',
                marginBottom: 'clamp(14px, 2vh, 22px)',
              }}
            >
              TORAY T700 SERIES · 16MM POLYMER CORE
            </div>

            {/* Product name — deliberate editorial wrap */}
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 6.5vw, 5.5rem)',
                fontWeight: 800,
                lineHeight: 0.92,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                color: 'var(--color-ink)',
                margin: '0 0 clamp(20px, 3.5vh, 36px)',
              }}
            >
              {SPOTLIGHT_PRODUCT.name.split(/\s+/).reduce<string[]>((lines, word) => {
                const last = lines[lines.length - 1];
                if (!last || last.split(' ').length >= 2) {
                  lines.push(word);
                } else {
                  lines[lines.length - 1] = `${last} ${word}`;
                }
                return lines;
              }, []).map((line, i) => (
                <span key={i} style={{ display: 'block' }}>{line}</span>
              ))}
            </h2>

            {/* Price */}
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'var(--color-ink)',
                marginBottom: 'clamp(28px, 4.5vh, 44px)',
              }}
            >
              ₹{SPOTLIGHT_PRODUCT.price.toLocaleString('en-IN')}
            </div>

            {/* CTA */}
            <Link
              to={`/product/${SPOTLIGHT_PRODUCT.slug}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.75rem, 1.1vw, 0.875rem)',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-ink)',
                textDecoration: 'none',
                borderBottom: '1.5px solid var(--color-ink)',
                paddingBottom: '3px',
                alignSelf: 'flex-start',
                minHeight: '44px',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.45')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              EXPLORE {SPOTLIGHT_PRODUCT.categoryName.toUpperCase()}
              <span>→</span>
            </Link>
          </div>

          {/* RIGHT — oversized product photo */}
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              alignSelf: 'stretch',
              minHeight: 'clamp(420px, 60vh, 680px)',
              backgroundColor: '#F8F6F0',
            }}
          >
            <img
              src={SPOTLIGHT_PRODUCT.images?.[0]}
              alt={SPOTLIGHT_PRODUCT.name}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
              }}
            />
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────
          SECTION B — ARCHITECTURAL SPECIFICATION STRIP
      ────────────────────────────────────────── */}
      {DISPLAY_SPECS.length >= 2 && (
        <section
          aria-label={`${SPOTLIGHT_PRODUCT.name} specifications`}
          style={{
            backgroundColor: 'var(--color-canvas-subtle, #F7F5EE)',
            padding: 'clamp(44px, 7vw, 90px) 0',
            borderTop: '1px solid var(--color-border-subtle)',
            borderBottom: '1px solid var(--color-border-subtle)',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              maxWidth: 'var(--max-width-content)',
              margin: '0 auto',
              padding: '0 clamp(20px, 5vw, 72px)',
              display: 'grid',
              gridTemplateColumns: `repeat(${DISPLAY_SPECS.length}, 1fr)`,
              gap: '0',
            }}
            className="spec-strip"
          >
            {DISPLAY_SPECS.map(([label, value], i) => (
              <div
                key={label}
                style={{
                  padding: 'clamp(20px, 3.5vw, 40px) clamp(16px, 2.5vw, 36px)',
                  borderLeft: i > 0 ? '1px solid var(--color-border-medium, #E5E0D5)' : 'none',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--color-ink-subtle)',
                    marginBottom: 'clamp(10px, 1.8vh, 16px)',
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.125rem, 2.5vw, 2rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    color: 'var(--color-ink)',
                    lineHeight: 1.15,
                  }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────
          SECTION C — CURATED DISCIPLINE ESSENTIALS (4-CARD GRID)
          Cricket, Badminton, Tennis, Pickleball with 3D Tilt & Quick-Add
      ────────────────────────────────────────── */}
      <section
        aria-label="Curated Sports Equipment"
        style={{
          backgroundColor: 'var(--color-canvas-base)',
          padding: 'clamp(48px, 6vw, 72px) 0 clamp(72px, 10vw, 120px)',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--max-width-content)',
            margin: '0 auto',
            padding: '0 clamp(20px, 5vw, 72px)',
          }}
        >
          {/* Section Header */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '16px',
              marginBottom: 'clamp(32px, 5vw, 56px)',
              paddingBottom: '20px',
              borderBottom: '1px solid var(--color-border-subtle)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: 'var(--color-brand-gold)',
                    borderRadius: '50%',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--color-ink-subtle)',
                  }}
                >
                  MATCH GRADE · 4 DISCIPLINES
                </span>
              </div>
              <h2
                className="font-display"
                style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.035em',
                  textTransform: 'uppercase',
                  color: 'var(--color-ink)',
                  margin: 0,
                  lineHeight: 1,
                }}
              >
                PRO-GRADE MATCH GEAR
              </h2>
            </div>

            <Link
              to="/shop"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-ink)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                borderBottom: '1.5px solid var(--color-brand-gold)',
                paddingBottom: '3px',
                minHeight: '44px',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.5')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              VIEW ALL 42 PRODUCTS →
            </Link>
          </div>

          {/* Curated 4-Product Grid */}
          <div
            className="curated-gear-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gap: 'clamp(20px, 2.5vw, 32px)',
            }}
          >
            {CURATED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          .curated-gear-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 767px) {
          .spotlight-split {
            grid-template-columns: 1fr !important;
            padding: 0 clamp(20px, 5vw, 72px) !important;
          }
          .spotlight-split > div:first-child {
            padding-right: 0 !important;
            margin-bottom: 32px;
          }
          .spec-strip {
            grid-template-columns: 1fr !important;
          }
          .spec-strip > div {
            border-left: none !important;
            border-bottom: 1px solid var(--color-border-medium, #E5E0D5);
            padding: 16px 0 !important;
          }
          .spec-strip > div:last-child {
            border-bottom: none !important;
          }
        }

        @media (max-width: 600px) {
          .curated-gear-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
};

export default FeaturedProducts;
