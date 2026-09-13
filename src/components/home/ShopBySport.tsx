import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { GlassPanel } from '../ui/GlassPanel';

interface SportItem {
  id: string;
  num: string;
  name: string;
  sub: string;
  techSpec: string;
  accent: string;
  image: string;
  fallbackImage: string;
  itemCount: string;
}

const PRIMARY_SPORTS: SportItem[] = [
  {
    id: 'pickleball',
    num: '01',
    name: 'PICKLEBALL',
    sub: 'Toray T700 Raw Carbon & 40-Hole Precision Balls',
    techSpec: 'USAPA REGULATION // 16MM POLYMER HONEYCOMB',
    accent: '#2457FF', // Electric Cobalt
    image: 'https://images.unsplash.com/photo-1627627256672-027a4613d028?auto=format&fit=crop&w=1400&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80',
    itemCount: '24 MODELS',
  },
  {
    id: 'cricket',
    num: '02',
    name: 'CRICKET',
    sub: 'Handcrafted Grade 1 English Willow & Test Protection',
    techSpec: 'NATURAL DRIED // TRIPLE SPRING CANE HANDLE',
    accent: '#C9A227', // Brand Gold
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1400&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80',
    itemCount: '48 MODELS',
  },
  {
    id: 'badminton',
    num: '03',
    name: 'BADMINTON',
    sub: 'Ultra-High Modulus Graphite & Tournament Feathers',
    techSpec: 'ISOMETRIC HEAD // 30 LBS MAX STRING TENSION',
    accent: '#D7FF00', // Acid Lime
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1400&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80',
    itemCount: '36 MODELS',
  },
  {
    id: 'volleyball',
    num: '04',
    name: 'VOLLEYBALL',
    sub: 'Composite Leather 18-Panel & Competition Nets',
    techSpec: 'DIMPLED MICROFIBER // NYLON-WOUND BLADDER',
    accent: '#FF5A1F', // Safety Orange
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1400&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80',
    itemCount: '18 MODELS',
  },
];

const SECONDARY_DISCIPLINES = [
  { id: 'tennis', name: 'TENNIS', count: '38 Items', accent: '#D7FF00' },
  { id: 'squash', name: 'SQUASH', count: '19 Items', accent: '#2457FF' },
  { id: 'table-tennis', name: 'TABLE TENNIS', count: '28 Items', accent: '#FF5A1F' },
  { id: 'fitness', name: 'FITNESS & STRENGTH', count: '52 Items', accent: '#C9A227' },
  { id: 'recreation', name: 'COMMUNITY RECREATION', count: '31 Items', accent: '#FFFFFF' },
  { id: 'accessories', name: 'GRIPS & BAGS', count: '34 Items', accent: '#2457FF' },
];

export const ShopBySport: React.FC = () => {
  const [activeSportIndex, setActiveSportIndex] = useState<number>(0);

  return (
    <section
      style={{
        backgroundColor: '#0D0D0D',
        color: '#FFFFFF',
        paddingTop: 'clamp(64px, 8vw, 110px)',
        paddingBottom: 'clamp(64px, 8vw, 110px)',
        borderBottom: '2px solid #222222',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Shop by Sport Disciplines"
    >
      {/* Background Subtle Accent Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-150px',
          right: '-100px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${PRIMARY_SPORTS[activeSportIndex].accent}18 0%, transparent 70%)`,
          pointerEvents: 'none',
          transition: 'background 0.6s ease',
          filter: 'blur(80px)',
        }}
      />

      <div className="container">
        {/* Section Editorial Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: 'clamp(32px, 5vw, 56px)',
            borderBottom: '1px solid #262626',
            paddingBottom: '24px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  backgroundColor: PRIMARY_SPORTS[activeSportIndex].accent,
                  transition: 'background-color 0.4s ease',
                }}
              />
              <span
                className="font-mono"
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#999999',
                }}
              >
                DISCIPLINES // 01—04
              </span>
            </div>

            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.75rem)',
                lineHeight: 0.95,
                color: '#FFFFFF',
                margin: 0,
                letterSpacing: '-0.03em',
              }}
            >
              SHOP BY SPORT
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span
              className="font-mono desktop-only"
              style={{
                fontSize: '0.8125rem',
                color: '#888888',
                letterSpacing: '0.05em',
              }}
            >
              HOVER TO EXPAND DISCIPLINE
            </span>

            <Link
              to="/shop"
              data-cursor="view"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                border: '1px solid #333333',
                backgroundColor: '#161616',
                color: '#FFFFFF',
                fontSize: '0.8125rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#FFFFFF';
                e.currentTarget.style.backgroundColor = '#2457FF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#333333';
                e.currentTarget.style.backgroundColor = '#161616';
              }}
            >
              <span>VIEW ALL DISCIPLINES</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Primary Sports Kinetic Editorial Accordion / Grid */}
        <div
          className="sports-kinetic-grid"
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '12px',
            minHeight: '520px',
            marginBottom: '36px',
            transition: 'all 0.4s ease',
          }}
        >
          {PRIMARY_SPORTS.map((sport, idx) => {
            const isActive = activeSportIndex === idx;

            return (
              <Link
                key={sport.id}
                to={`/shop/${sport.id}`}
                data-cursor="view"
                onMouseEnter={() => setActiveSportIndex(idx)}
                style={{
                  flex: isActive ? '3.2' : '1',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '2px', // Brutalist micro-radius
                  border: isActive ? `1.5px solid ${sport.accent}` : '1px solid #222222',
                  backgroundColor: '#161616',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: 'clamp(20px, 3vw, 32px)',
                  transition: 'flex 0.5s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s ease',
                  cursor: 'pointer',
                }}
              >
                {/* Background Image with Dynamic Scale */}
                <img
                  src={sport.image}
                  alt={sport.name}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = sport.fallbackImage;
                  }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: isActive ? 'scale(1.06)' : 'scale(1.0)',
                    filter: isActive ? 'brightness(0.85) contrast(1.1)' : 'brightness(0.4) grayscale(0.5)',
                    transition: 'transform 0.7s cubic-bezier(0.25, 1, 0.5, 1), filter 0.5s ease',
                  }}
                />

                {/* Dark Editorial Gradient Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: isActive
                      ? 'linear-gradient(180deg, rgba(13,13,13,0.3) 0%, rgba(13,13,13,0.2) 40%, rgba(13,13,13,0.92) 100%)'
                      : 'linear-gradient(180deg, rgba(13,13,13,0.6) 0%, rgba(13,13,13,0.85) 100%)',
                    transition: 'background 0.4s ease',
                  }}
                />

                {/* Top Section: Numeral & Glass Badges */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <span
                    className="font-mono"
                    style={{
                      fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                      fontWeight: 800,
                      lineHeight: 1,
                      color: isActive ? sport.accent : '#555555',
                      letterSpacing: '-0.02em',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {sport.num}
                  </span>

                  {isActive ? (
                    <GlassPanel
                      variant="light"
                      blur="16px"
                      style={{
                        padding: '6px 14px',
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        color: '#FFFFFF',
                        border: `1px solid ${sport.accent}66`,
                        boxShadow: `0 0 15px ${sport.accent}33`,
                      }}
                    >
                      {sport.itemCount}
                    </GlassPanel>
                  ) : (
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255,255,255,0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <ArrowUpRight size={16} color="#666666" />
                    </div>
                  )}
                </div>

                {/* Bottom Section: Typography & Colliding Metadata */}
                <div style={{ position: 'relative', zIndex: 2 }}>
                  {isActive && (
                    <div
                      className="font-mono"
                      style={{
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        letterSpacing: '0.14em',
                        color: sport.accent,
                        textTransform: 'uppercase',
                        marginBottom: '8px',
                        animation: 'fadeIn 0.3s ease-out forwards',
                      }}
                    >
                      {sport.techSpec}
                    </div>
                  )}

                  <h3
                    className="font-display"
                    style={{
                      fontSize: isActive ? 'clamp(2rem, 4vw, 3.25rem)' : 'clamp(1.25rem, 2vw, 1.75rem)',
                      lineHeight: 0.95,
                      fontWeight: 900,
                      color: '#FFFFFF',
                      margin: '0 0 8px 0',
                      letterSpacing: '-0.02em',
                      transition: 'font-size 0.4s ease',
                      textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                    }}
                  >
                    {sport.name}
                  </h3>

                  {isActive ? (
                    <div>
                      <p
                        style={{
                          fontSize: '0.875rem',
                          color: '#DDDDDD',
                          lineHeight: 1.45,
                          margin: '0 0 16px 0',
                          maxWidth: '420px',
                        }}
                      >
                        {sport.sub}
                      </p>

                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          color: '#FFFFFF',
                          fontSize: '0.8125rem',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          borderBottom: `2px solid ${sport.accent}`,
                          paddingBottom: '3px',
                        }}
                      >
                        <span>EXPLORE {sport.name} GEAR</span>
                        <ArrowRight size={15} color={sport.accent} />
                      </div>
                    </div>
                  ) : (
                    <span
                      className="font-mono"
                      style={{
                        fontSize: '0.6875rem',
                        color: '#777777',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {sport.itemCount}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Secondary Disciplines: Brutalist Hard-Edged Strip */}
        <div
          style={{
            borderTop: '1px solid #222222',
            paddingTop: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <span
            className="font-mono"
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#888888',
              marginRight: '8px',
            }}
          >
            ADDITIONAL DISCIPLINES:
          </span>

          {SECONDARY_DISCIPLINES.map((item) => (
            <Link
              key={item.id}
              to={`/shop/${item.id}`}
              data-cursor="view"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                border: '1px solid #262626',
                backgroundColor: '#141414',
                color: '#DDDDDD',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = item.accent;
                e.currentTarget.style.backgroundColor = '#202020';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#262626';
                e.currentTarget.style.backgroundColor = '#141414';
                e.currentTarget.style.color = '#DDDDDD';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '6px',
                  height: '6px',
                  backgroundColor: item.accent,
                }}
              />
              <span>{item.name}</span>
              <span className="font-mono" style={{ color: '#666666', fontSize: '0.6875rem' }}>
                ({item.count})
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Responsive Styles for Mobile Stack */}
      <style>{`
        @media (max-width: 900px) {
          .sports-kinetic-grid {
            flex-direction: column !important;
            min-height: auto !important;
          }
          .sports-kinetic-grid > a {
            flex: none !important;
            min-height: 200px !important;
          }
        }
      `}</style>
    </section>
  );
};
