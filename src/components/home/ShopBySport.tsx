import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';

// Display up to 7 sport disciplines
const SPORT_DISCIPLINES = CATEGORIES.slice(0, 7);

export const ShopBySport: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(SPORT_DISCIPLINES[0]?.id ?? '');

  const activeCat = SPORT_DISCIPLINES.find(c => c.id === activeId) ?? SPORT_DISCIPLINES[0];

  return (
    <section
      aria-label="Shop by Sport"
      style={{
        backgroundColor: 'var(--color-canvas-base)',
        padding: 'clamp(80px, 12vw, 160px) 0',
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--max-width-content)',
          margin: '0 auto',
          padding: '0 clamp(20px, 5vw, 72px)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,44%)',
          gap: 'clamp(40px, 6vw, 96px)',
          alignItems: 'center',
        }}
      >
        {/* LEFT — typographic sport index */}
        <div>
          {SPORT_DISCIPLINES.map((cat, i) => {
            const isActive = cat.id === activeId;
            return (
              <Link
                key={cat.id}
                to={`/shop/${cat.id}`}
                onMouseEnter={() => setActiveId(cat.id)}
                onFocus={() => setActiveId(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  padding: 'clamp(12px, 1.8vw, 20px) 0',
                  borderBottom: i < SPORT_DISCIPLINES.length - 1
                    ? '1px solid var(--color-border-subtle)'
                    : 'none',
                  textDecoration: 'none',
                  transition: 'opacity 0.22s ease',
                  opacity: isActive ? 1 : 0.22,
                  cursor: 'pointer',
                }}
              >
                {/* Sport name — the design element */}
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 5vw, 4.25rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.035em',
                    textTransform: 'uppercase',
                    color: 'var(--color-ink)',
                    lineHeight: 1,
                    transition: 'color 0.22s ease',
                  }}
                >
                  {cat.name}
                </span>

                {/* Item count — mono, only visible when active */}
                {isActive && (
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'clamp(0.625rem, 1vw, 0.75rem)',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--color-brand-gold)',
                    }}
                  >
                    {cat.itemCount} PRODUCTS →
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* RIGHT — dominant editorial photograph (no card, no border-radius) */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            aspectRatio: '3 / 4',
            backgroundColor: '#111',
          }}
        >
          <img
            key={activeCat.id}
            src={activeCat.image}
            alt={`${activeCat.name} equipment`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
              animation: 'sportFade 0.4s ease',
            }}
            onError={e => {
              e.currentTarget.src =
                'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=900&q=80';
            }}
          />
          {/* Subtle bottom gradient for category label readability */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent 55%, rgba(17,17,17,0.75) 100%)',
              pointerEvents: 'none',
            }}
          />
          {/* Category name caption bottom of photo */}
          <div
            style={{
              position: 'absolute',
              bottom: 'clamp(16px, 3vw, 28px)',
              left: 'clamp(16px, 3vw, 28px)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.6)',
                margin: '0 0 4px',
              }}
            >
              {activeCat.tagline.split(',')[0]}
            </p>
          </div>
        </div>
      </div>

      {/* Crossfade keyframe */}
      <style>{`
        @keyframes sportFade {
          from { opacity: 0; transform: scale(1.03); }
          to   { opacity: 1; transform: scale(1); }
        }
        @media (max-width: 767px) {
          .sport-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default ShopBySport;
