import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';

/**
 * Selects the best editorial featured product from the real catalog.
 * Priority: isFeatured=true AND has spec data AND has an image.
 * Falls back to first isFeatured product.
 */
function selectFeaturedProduct() {
  const featured = PRODUCTS.filter(p => p.isFeatured);
  // Prefer products with rich specs (≥3 entries) — more editorial detail
  const withSpecs = featured.filter(
    p => p.specs && Object.keys(p.specs).length >= 3 && p.images?.[0]
  );
  return withSpecs[0] ?? featured[0] ?? PRODUCTS[0];
}

const PRODUCT = selectFeaturedProduct();

// Pick exactly 3 real specs to display editorially
function getDisplaySpecs(specs?: Record<string, string>): [string, string][] {
  if (!specs) return [];
  return Object.entries(specs).slice(0, 3);
}

const DISPLAY_SPECS = getDisplaySpecs(PRODUCT.specs);

export const FeaturedProducts: React.FC = () => {
  return (
    <>
      {/* ──────────────────────────────────────────
          SECTION A — OVERSIZED PRODUCT EDITORIAL
          Left: stacked product name + price + CTA
          Right: product image HUGE, cropped at edges
      ────────────────────────────────────────── */}
      <section
        aria-label={`Featured: ${PRODUCT.name}`}
        style={{
          backgroundColor: 'var(--color-canvas-base)',
          padding: 'clamp(80px, 12vw, 160px) 0',
          overflow: 'hidden',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* Full-width label row above */}
        <div
          style={{
            maxWidth: 'var(--max-width-content)',
            margin: '0 auto',
            padding: '0 clamp(20px, 5vw, 72px)',
            marginBottom: 'clamp(32px, 5vw, 56px)',
          }}
        >
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
            FEATURED GEAR
          </span>
        </div>

        {/* Main composition — editorial split */}
        <div
          style={{
            maxWidth: 'var(--max-width-content)',
            margin: '0 auto',
            padding: '0 clamp(20px, 5vw, 72px)',
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) minmax(0,48%)',
            gap: '0',
            alignItems: 'center',
            minHeight: 'clamp(460px, 60vh, 720px)',
          }}
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
            {/* Category / brand — mono small */}
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--color-ink-subtle)',
                marginBottom: 'clamp(16px, 2.5vh, 24px)',
              }}
            >
              {PRODUCT.categoryName} / {PRODUCT.brand}
            </div>

            {/* Product name — giant editorial type (2–3 lines intentional) */}
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.75rem, 7vw, 6rem)',
                fontWeight: 800,
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                color: 'var(--color-ink)',
                margin: '0 0 clamp(24px, 4vh, 40px)',
              }}
            >
              {/* Split product name onto deliberate lines */}
              {PRODUCT.name.split(/\s+/).reduce<string[]>((lines, word, i) => {
                // Break into lines of ~2-3 words for editorial stacking
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

            {/* Price — large mono numerals */}
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'var(--color-ink)',
                marginBottom: 'clamp(32px, 5vh, 48px)',
              }}
            >
              ₹{PRODUCT.price.toLocaleString('en-IN')}
            </div>

            {/* CTA — single underlined inline link */}
            <Link
              to={`/product/${PRODUCT.slug}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)',
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
              SHOP {PRODUCT.categoryName.toUpperCase()}
              <span>→</span>
            </Link>
          </div>

          {/* RIGHT — oversized product image, compositionally floating */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              overflow: 'visible',
            }}
          >
            <img
              src={PRODUCT.images?.[0]}
              alt={PRODUCT.name}
              style={{
                width: '115%',      /* intentionally bleeds past container edge */
                maxWidth: 'none',
                height: 'clamp(440px, 65vh, 700px)',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
                marginRight: '-5%', /* pull to right edge */
              }}
              onError={e => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=900&q=85';
              }}
            />
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────
          SECTION B — PRODUCT SPECS AS VISUAL COMPOSITION
          Only rendered if we have real spec data
      ────────────────────────────────────────── */}
      {DISPLAY_SPECS.length >= 2 && (
        <section
          aria-label={`${PRODUCT.name} specifications`}
          style={{
            backgroundColor: 'var(--color-canvas-surface)',
            padding: 'clamp(56px, 9vw, 112px) 0',
            borderTop: '1px solid var(--color-border-subtle)',
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
          >
            {DISPLAY_SPECS.map(([label, value], i) => (
              <div
                key={label}
                style={{
                  padding: 'clamp(24px, 4vw, 48px) clamp(16px, 3vw, 40px)',
                  borderLeft: i > 0 ? '1px solid var(--color-border-medium)' : 'none',
                }}
              >
                {/* Small mono label */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--color-ink-subtle)',
                    marginBottom: 'clamp(12px, 2vh, 20px)',
                  }}
                >
                  {label}
                </div>
                {/* Large display value */}
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.25rem, 3vw, 2.25rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    color: 'var(--color-ink)',
                    lineHeight: 1.1,
                  }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default FeaturedProducts;
