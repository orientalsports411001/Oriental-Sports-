import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

export const ShopBySport: React.FC = () => {
  const [activeSportId, setActiveSportId] = useState<string>('badminton');

  const activeCategory = CATEGORIES.find((c) => c.id === activeSportId) || CATEGORIES[0];

  return (
    <section className="editorial-section" style={{ backgroundColor: 'var(--color-canvas-base)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: 'clamp(32px, 5vw, 56px)' }}>
          <span className="section-label">SPORT DISCIPLINES</span>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2.25rem, 5.5vw, 4.25rem)',
              color: 'var(--color-ink)',
              maxWidth: '800px',
            }}
          >
            EQUIPMENT FOR EVERY CODE.
          </h2>
        </div>

        {/* Editorial Layout: Typographic Index + Dominant Dynamic Photography Frame */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(28px, 6vw, 72px)',
            alignItems: 'center',
          }}
        >
          {/* Left: Typographic Vertical Sport List */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {CATEGORIES.slice(0, 7).map((cat) => {
              const isCurrent = cat.id === activeSportId;
              return (
                <Link
                  key={cat.id}
                  to={`/shop/${cat.id}`}
                  onMouseEnter={() => setActiveSportId(cat.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    paddingTop: 'clamp(14px, 2.2vw, 22px)',
                    paddingBottom: 'clamp(14px, 2.2vw, 22px)',
                    borderBottom: '1px solid var(--color-border-subtle)',
                    transition: 'all var(--transition-normal)',
                    color: isCurrent ? 'var(--color-ink)' : 'var(--color-ink-muted)',
                    opacity: isCurrent ? 1 : 0.45,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
                    <span
                      className="font-display"
                      style={{
                        fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                      }}
                    >
                      {cat.name}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        fontSize: '0.8125rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600,
                        color: 'var(--color-ink-subtle)',
                      }}
                    >
                      {cat.itemCount} ITEMS
                    </span>
                    <ArrowUpRight
                      size={20}
                      style={{
                        transform: isCurrent ? 'translate(0, 0)' : 'translate(-4px, 4px)',
                        opacity: isCurrent ? 1 : 0,
                        transition: 'all var(--transition-fast)',
                      }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Right: Single Dominant Photography Frame (Editorial Display) */}
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              aspectRatio: '4 / 3',
              backgroundColor: '#111111',
              boxShadow: 'var(--shadow-subtle)',
            }}
          >
            <img
              src={activeCategory.image}
              alt={activeCategory.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease-out, opacity 0.3s ease',
              }}
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80';
              }}
            />
            {/* Subtle Gradient & Details Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(17,17,17,0.05) 0%, rgba(17,17,17,0.85) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 'clamp(20px, 4vw, 36px)',
                left: 'clamp(20px, 4vw, 36px)',
                right: 'clamp(20px, 4vw, 36px)',
                color: '#FFFFFF',
              }}
            >
              <h3
                className="font-display"
                style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  color: '#FFFFFF',
                  marginBottom: '8px',
                }}
              >
                {activeCategory.name}
              </h3>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: '#EDE8DE',
                  maxWidth: '440px',
                  marginBottom: '16px',
                  lineHeight: 1.4,
                }}
              >
                {activeCategory.tagline}
              </p>
              <Link
                to={`/shop/${activeCategory.id}`}
                className="btn btn-white"
                style={{
                  padding: '10px 24px',
                  fontSize: '0.8125rem',
                  fontWeight: 800,
                }}
              >
                <span>SHOP {activeCategory.name}</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopBySport;
