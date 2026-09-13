import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, Layers, Tag } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { MagneticButton } from '../ui/MagneticButton';

// The 7 primary disciplines explicitly specified for the interactive selector
const PRIMARY_SPORTS_IDS = [
  'cricket',
  'tennis',
  'pickleball',
  'badminton',
  'squash',
  'fitness',
  'recreation',
];

export const ShopBySport: React.FC = () => {
  // Filter and order the exact 7 sports requested
  const sportsList = PRIMARY_SPORTS_IDS.map((id) =>
    CATEGORIES.find((cat) => cat.id === id) || CATEGORIES[0]
  );

  const [activeSportIndex, setActiveSportIndex] = useState(0);
  const activeSport = sportsList[activeSportIndex];

  return (
    <section
      className="section-padding bg-ivory"
      style={{
        borderBottom: '1px solid var(--color-ivory-border)',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#F6F3EA',
      }}
      aria-label="Shop by Sport Disciplines"
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
            marginBottom: 'clamp(28px, 4vw, 48px)',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-ui)',
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-plate-gold)',
                marginBottom: '8px',
              }}
            >
              <span
                style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-plate-gold)' }}
              />
              <span>DISCIPLINES & EQUIPMENT</span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display-xl)',
                fontSize: 'clamp(2.75rem, 6.5vw, 4.75rem)',
                lineHeight: 0.9,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                color: 'var(--color-ink)',
                margin: 0,
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
              fontWeight: 700,
              fontSize: '0.8125rem',
              color: 'var(--color-ink)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              minHeight: '44px',
            }}
          >
            <span>VIEW ALL 9 DISCIPLINES</span>
            <ArrowRight size={15} color="var(--color-plate-gold)" />
          </Link>
        </div>

        {/* MOBILE VIEW: Touch-Friendly Horizontal Swipe Carousel (No Hover Traps) */}
        <div className="mobile-only-block">
          <div
            className="scroll-reel"
            style={{
              paddingLeft: '2px',
              paddingRight: '16px',
              gap: '16px',
              scrollSnapType: 'x mandatory',
            }}
          >
            {sportsList.map((cat, idx) => (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.id}`}
                style={{
                  width: '280px',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-ivory-border)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  textDecoration: 'none',
                  color: 'inherit',
                  scrollSnapAlign: 'start',
                }}
              >
                {/* Visual Image */}
                <div style={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden' }}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      backgroundColor: 'rgba(17,17,17,0.85)',
                      color: 'var(--color-plate-gold)',
                      padding: '4px 8px',
                      borderRadius: '2px',
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                    }}
                  >
                    0{idx + 1}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                      backgroundColor: 'rgba(255,255,255,0.92)',
                      padding: '3px 8px',
                      borderRadius: '2px',
                      fontSize: '0.6875rem',
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 700,
                    }}
                  >
                    {cat.itemCount} ITEMS
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display-xl)',
                      fontSize: '1.75rem',
                      lineHeight: 0.95,
                      color: 'var(--color-ink)',
                      margin: '0 0 6px 0',
                    }}
                  >
                    {cat.name.toUpperCase()}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.8125rem',
                      color: '#666',
                      lineHeight: 1.4,
                      margin: '0 0 12px 0',
                      fontFamily: 'var(--font-heading)',
                      flex: 1,
                    }}
                  >
                    {cat.tagline}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 800,
                      fontSize: '0.75rem',
                      color: 'var(--color-ink)',
                      textTransform: 'uppercase',
                    }}
                  >
                    <span>EXPLORE GEAR</span>
                    <ChevronRight size={14} color="var(--color-plate-gold)" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* DESKTOP VIEW: Signature Interactive Editorial Split List */}
        <div className="desktop-only-grid">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.15fr 1fr',
              gap: 'clamp(32px, 5vw, 64px)',
              alignItems: 'center',
            }}
          >
            {/* LEFT: 7 Core Sports with Active Indicator and Title Shift */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {sportsList.map((cat, idx) => {
                const isActive = idx === activeSportIndex;
                return (
                  <div
                    key={cat.id}
                    onMouseEnter={() => setActiveSportIndex(idx)}
                    onFocus={() => setActiveSportIndex(idx)}
                    tabIndex={0}
                    role="button"
                    aria-selected={isActive}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 20px',
                      borderRadius: '2px',
                      backgroundColor: isActive ? 'var(--color-ink)' : 'transparent',
                      color: isActive ? 'var(--color-pure-white)' : 'var(--color-ink)',
                      cursor: 'pointer',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      borderBottom: isActive ? '1px solid transparent' : '1px solid var(--color-ivory-border)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Active Gold Indicator Bar */}
                    {isActive && (
                      <motion.div
                        layoutId="activeSportBar"
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: '4px',
                          backgroundColor: 'var(--color-plate-gold)',
                        }}
                      />
                    )}

                    <Link
                      to={`/shop?category=${cat.id}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                        flex: 1,
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-ui)',
                          fontSize: '0.8125rem',
                          fontWeight: 700,
                          color: isActive ? 'var(--color-plate-gold)' : '#999',
                          width: '28px',
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        0{idx + 1}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-display-xl)',
                          fontSize: '2.5rem',
                          letterSpacing: '-0.02em',
                          lineHeight: 0.9,
                          transform: isActive ? 'translateX(8px)' : 'translateX(0)',
                          transition: 'transform 0.25s ease',
                          display: 'inline-block',
                        }}
                      >
                        {cat.name.toUpperCase()}
                      </span>
                    </Link>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-ui)',
                          fontSize: '0.75rem',
                          color: isActive ? 'rgba(255,255,255,0.7)' : '#888',
                          fontWeight: 600,
                        }}
                      >
                        {cat.itemCount} PRO PRODUCTS
                      </span>
                      <ArrowRight
                        size={16}
                        color={isActive ? 'var(--color-plate-gold)' : '#CCC'}
                        style={{
                          transform: isActive ? 'translateX(4px)' : 'translateX(0)',
                          transition: 'transform 0.25s ease',
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT: Synchronized Large Visual with Crossfade, Scale & Equipment Tags */}
            <div
              style={{
                position: 'relative',
                height: '520px',
                borderRadius: '2px',
                overflow: 'hidden',
                backgroundColor: 'var(--color-ink)',
                border: '1px solid var(--color-ivory-border)',
                boxShadow: '0 16px 40px rgba(0,0,0,0.1)',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSport.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                >
                  <img
                    src={activeSport.image}
                    alt={activeSport.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'contrast(1.08) brightness(0.9)',
                    }}
                  />
                  {/* Cinematic Dark Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(180deg, rgba(17,17,17,0.15) 0%, rgba(17,17,17,0.88) 100%)',
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Foreground Content for the Selected Sport */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  padding: '36px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  zIndex: 2,
                  color: '#FFFFFF',
                }}
              >
                {/* Top Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      backgroundColor: 'rgba(17,17,17,0.85)',
                      border: '1px solid var(--color-plate-gold)',
                      padding: '6px 12px',
                      borderRadius: '2px',
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      color: 'var(--color-plate-gold)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}
                  >
                    DISCIPLINE 0{activeSportIndex + 1}
                  </span>
                  <span
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(8px)',
                      padding: '6px 12px',
                      borderRadius: '2px',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-ui)',
                    }}
                  >
                    {activeSport.itemCount} PRODUCTS
                  </span>
                </div>

                {/* Bottom Details & CTA */}
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display-xl)',
                      fontSize: '3.25rem',
                      lineHeight: 0.9,
                      letterSpacing: '-0.02em',
                      margin: '0 0 10px 0',
                      color: '#FFFFFF',
                    }}
                  >
                    {activeSport.name.toUpperCase()}
                  </h3>
                  <p
                    style={{
                      fontSize: '1rem',
                      lineHeight: 1.5,
                      color: '#D4CEBF',
                      maxWidth: '440px',
                      marginBottom: '16px',
                      fontFamily: 'var(--font-heading)',
                    }}
                  >
                    {activeSport.tagline}
                  </p>

                  {/* Featured Equipment Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                    {activeSport.featuredEquipments.slice(0, 3).map((item) => (
                      <span
                        key={item}
                        style={{
                          fontSize: '0.6875rem',
                          padding: '4px 10px',
                          backgroundColor: 'rgba(255,255,255,0.12)',
                          backdropFilter: 'blur(4px)',
                          borderRadius: '2px',
                          fontFamily: 'var(--font-ui)',
                          color: '#E0C56A',
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <MagneticButton
                    variant="gold"
                    size="md"
                    onClick={() => (window.location.href = `/shop?category=${activeSport.id}`)}
                  >
                    <span>EXPLORE {activeSport.name.toUpperCase()} GEAR</span>
                    <ArrowRight size={16} />
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
