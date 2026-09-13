import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

const SPORTS_LIST = [
  { id: 'cricket', name: 'CRICKET', count: '42 items', tag: 'Handcrafted Willow & Gear' },
  { id: 'badminton', name: 'BADMINTON', count: '45 items', tag: 'Fast Frames & Feathers' },
  { id: 'pickleball', name: 'PICKLEBALL', count: '24 items', tag: 'Raw Carbon Paddles' },
  { id: 'tennis', name: 'TENNIS', count: '38 items', tag: 'Tour Frames & Stringing' },
  { id: 'table-tennis', name: 'TABLE TENNIS', count: '28 items', tag: 'Competition Blades' },
  { id: 'fitness', name: 'FITNESS', count: '52 items', tag: 'Conditioning & Weights' },
  { id: 'squash', name: 'SQUASH', count: '19 items', tag: 'Teardrop Power Racquets' },
  { id: 'recreation', name: 'RECREATION', count: '31 items', tag: 'Carrom, Foosball & Club' },
];

export const ShopBySport: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeSport = SPORTS_LIST[activeIdx];
  const activeCategoryData = CATEGORIES.find((c) => c.id === activeSport.id) || CATEGORIES[0];

  return (
    <section
      style={{
        backgroundColor: 'var(--color-electric-blue)',
        color: '#FFFFFF',
        paddingTop: 'clamp(48px, 6vw, 80px)',
        paddingBottom: 'clamp(48px, 6vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Shop By Sport Disciplines"
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: 'clamp(28px, 4vw, 44px)',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 12px',
                backgroundColor: 'rgba(255, 255, 255, 0.18)',
                borderRadius: '9999px',
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '10px',
                color: 'var(--color-lime)',
              }}
            >
              <span>✦ ALL DISCIPLINES</span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 6vw, 4.25rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                margin: 0,
                color: '#FFFFFF',
              }}
            >
              SHOP BY SPORT
            </h2>
          </div>

          <Link
            to="/shop"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-ui)',
              fontWeight: 800,
              fontSize: '0.875rem',
              color: 'var(--color-lime)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            }}
          >
            <span>VIEW ALL GEAR</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* MOBILE VIEW: Compact Horizontal Touch Swipe Reel */}
        <div className="mobile-only-block">
          <div
            className="scroll-reel"
            style={{
              paddingLeft: '2px',
              paddingRight: '16px',
              gap: '14px',
              scrollSnapType: 'x mandatory',
            }}
          >
            {SPORTS_LIST.map((sp, idx) => {
              const catData = CATEGORIES.find((c) => c.id === sp.id) || CATEGORIES[0];
              return (
                <Link
                  key={sp.id}
                  to={`/shop?category=${sp.id}`}
                  style={{
                    width: '260px',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#FFFFFF',
                    color: 'var(--color-text-dark)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    textDecoration: 'none',
                    scrollSnapAlign: 'start',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '170px' }}>
                    <img
                      src={catData.image}
                      alt={sp.name}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        backgroundColor: 'var(--color-electric-blue)',
                        color: '#FFFFFF',
                        padding: '3px 8px',
                        borderRadius: '9999px',
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.6875rem',
                        fontWeight: 800,
                      }}
                    >
                      0{idx + 1}
                    </span>
                  </div>

                  <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ fontSize: '0.75rem', color: '#777', fontWeight: 600, fontFamily: 'var(--font-ui)' }}>
                      {sp.count}
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.5rem',
                        lineHeight: 1,
                        margin: '4px 0 8px 0',
                        color: 'var(--color-text-dark)',
                      }}
                    >
                      {sp.name}
                    </h3>
                    <p style={{ fontSize: '0.8125rem', color: '#555', margin: '0 0 12px 0', lineHeight: 1.4 }}>
                      {sp.tag}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        color: 'var(--color-electric-blue)',
                        fontFamily: 'var(--font-ui)',
                        fontWeight: 800,
                        fontSize: '0.75rem',
                      }}
                    >
                      <span>EXPLORE</span>
                      <ChevronRight size={14} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* DESKTOP VIEW: Interactive Split Layout */}
        <div className="desktop-only-grid">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: 'clamp(32px, 4vw, 56px)',
              alignItems: 'center',
            }}
          >
            {/* Left Column: Interactive 8-Sport List */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
              }}
            >
              {SPORTS_LIST.map((sp, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <div
                    key={sp.id}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onFocus={() => setActiveIdx(idx)}
                    tabIndex={0}
                    role="button"
                    aria-selected={isActive}
                    style={{
                      padding: '16px 20px',
                      borderRadius: '12px',
                      backgroundColor: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.12)',
                      color: isActive ? 'var(--color-electric-blue)' : '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      border: isActive ? '2px solid #FFFFFF' : '1px solid rgba(255, 255, 255, 0.15)',
                      boxShadow: isActive ? '0 10px 24px rgba(0,0,0,0.18)' : 'none',
                      transform: isActive ? 'translateY(-2px)' : 'none',
                    }}
                  >
                    <Link
                      to={`/shop?category=${sp.id}`}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'block',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '4px',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-ui)',
                            fontSize: '0.6875rem',
                            fontWeight: 800,
                            letterSpacing: '0.08em',
                            color: isActive ? 'var(--color-tangerine)' : 'rgba(255,255,255,0.7)',
                          }}
                        >
                          0{idx + 1}
                        </span>
                        <span
                          style={{
                            fontSize: '0.6875rem',
                            fontFamily: 'var(--font-ui)',
                            fontWeight: 700,
                            color: isActive ? '#666' : 'rgba(255,255,255,0.7)',
                          }}
                        >
                          {sp.count}
                        </span>
                      </div>

                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.375rem',
                          fontWeight: 700,
                          letterSpacing: '-0.02em',
                          lineHeight: 1.1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span>{sp.name}</span>
                        {isActive && <ArrowRight size={16} color="var(--color-electric-blue)" />}
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Synchronized Large Vibrant Visual Card */}
            <div
              style={{
                position: 'relative',
                height: '460px',
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: '#0F1E5C',
                boxShadow: '0 20px 48px rgba(0,0,0,0.25)',
                border: '3px solid rgba(255, 255, 255, 0.25)',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategoryData.id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                >
                  <img
                    src={activeCategoryData.image}
                    alt={activeSport.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'contrast(1.08) brightness(0.95)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(180deg, rgba(15, 30, 92, 0.2) 0%, rgba(15, 30, 92, 0.88) 100%)',
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Card Overlay Content */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  zIndex: 2,
                  color: '#FFFFFF',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      backgroundColor: 'var(--color-lime)',
                      color: '#171717',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                    }}
                  >
                    FEATURED DISCIPLINE
                  </span>
                  <span
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(8px)',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 700,
                    }}
                  >
                    {activeSport.count}
                  </span>
                </div>

                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2.5rem',
                      lineHeight: 1,
                      margin: '0 0 8px 0',
                    }}
                  >
                    {activeSport.name}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.9375rem',
                      lineHeight: 1.45,
                      color: '#E0E7FF',
                      maxWidth: '420px',
                      marginBottom: '20px',
                    }}
                  >
                    {activeCategoryData.tagline}
                  </p>

                  <Link
                    to={`/shop?category=${activeSport.id}`}
                    className="btn btn-lime"
                    style={{
                      padding: '12px 24px',
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                    }}
                  >
                    <span>SHOP {activeSport.name} GEAR →</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
