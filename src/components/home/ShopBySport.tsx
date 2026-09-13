import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, Layers } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { MagneticButton } from '../ui/MagneticButton';

export const ShopBySport: React.FC = () => {
  const [activeSportIndex, setActiveSportIndex] = useState(0);
  const activeCategory = CATEGORIES[activeSportIndex];

  return (
    <section
      className="section-padding bg-ivory"
      style={{
        borderBottom: '1px solid var(--color-ivory-border)',
        position: 'relative',
        overflow: 'hidden',
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
            marginBottom: 'var(--space-2xl)',
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
              <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-plate-gold)' }} />
              <span>DISCIPLINES & EQUIPMENT</span>
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
            }}
          >
            <span>VIEW ALL 9 DISCIPLINES</span>
            <ArrowRight size={15} color="var(--color-plate-gold)" />
          </Link>
        </div>

        {/* MOBILE VIEW: High-Resolution Native Touch-Swipeable Carousel */}
        <div className="mobile-only-block">
          <div className="scroll-reel" style={{ paddingLeft: '2px', paddingRight: '16px', gap: '14px' }}>
            {CATEGORIES.map((cat, idx) => (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.id}`}
                style={{
                  width: '270px',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-ivory-border)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  textDecoration: 'none',
                }}
              >
                <div style={{ position: 'relative', width: '100%', height: '240px', overflow: 'hidden' }}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 40%, rgba(17,17,17,0.88) 100%)',
                    }}
                  />
                  <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-display-xl)',
                        fontSize: '2rem',
                        lineHeight: 0.9,
                        color: '#FFFFFF',
                        textTransform: 'uppercase',
                        display: 'block',
                      }}
                    >
                      {cat.name}
                    </span>
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', color: 'var(--color-plate-gold)' }}>
                      {cat.itemCount} items available
                    </span>
                  </div>
                </div>

                <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <p style={{ fontSize: '0.8125rem', color: '#555555', lineHeight: 1.4, marginBottom: '14px' }}>
                    {cat.tagline}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 700,
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
              gap: 'var(--space-3xl)',
              alignItems: 'center',
            }}
          >
            {/* Left: Interactive Animated Discipline List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {CATEGORIES.map((cat, idx) => {
                const isActive = idx === activeSportIndex;
                return (
                  <div
                    key={cat.id}
                    onMouseEnter={() => setActiveSportIndex(idx)}
                    onFocus={() => setActiveSportIndex(idx)}
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
                    {/* Active Gold Left Indicator Bar */}
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
                          transform: isActive ? 'translateX(6px)' : 'translateX(0)',
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
                          color: isActive ? '#C9A227' : '#888',
                          fontWeight: 600,
                        }}
                      >
                        {cat.itemCount} Items
                      </span>

                      <Link
                        to={`/shop?category=${cat.id}`}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: isActive ? 'var(--color-plate-gold)' : 'rgba(0,0,0,0.05)',
                          color: isActive ? '#111' : '#111',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transform: isActive ? 'translateX(4px)' : 'translateX(0)',
                          transition: 'transform 0.25s ease',
                        }}
                        aria-label={`View ${cat.name} equipment`}
                      >
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Sticky Morphing Large Editorial Visual */}
            <div
              style={{
                position: 'relative',
                height: '560px',
                backgroundColor: 'var(--color-ink)',
                borderRadius: '2px',
                overflow: 'hidden',
                border: '1px solid var(--color-ivory-border)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory.image}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  style={{ position: 'absolute', inset: 0 }}
                >
                  <img
                    src={activeCategory.image}
                    alt={activeCategory.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(180deg, rgba(17,17,17,0.1) 0%, rgba(17,17,17,0.65) 50%, #111111 95%)',
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Foreground Category Details */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '36px',
                  color: 'var(--color-pure-white)',
                  zIndex: 3,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--color-plate-gold)',
                    marginBottom: '8px',
                  }}
                >
                  FEATURED DISCIPLINE
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display-xl)',
                    fontSize: '3rem',
                    lineHeight: 0.9,
                    color: '#FFFFFF',
                    marginBottom: '10px',
                  }}
                >
                  {activeCategory.name.toUpperCase()}
                </h3>

                <p
                  style={{
                    fontSize: '0.9375rem',
                    color: '#E0DACF',
                    lineHeight: 1.45,
                    marginBottom: '20px',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  {activeCategory.description}
                </p>

                {/* Key Equipments Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                  {activeCategory.featuredEquipments.map((item, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '4px 10px',
                        backgroundColor: 'rgba(255,255,255,0.12)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '2px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: 'var(--color-pure-white)',
                        fontFamily: 'var(--font-ui)',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <MagneticButton
                  variant="gold"
                  size="sm"
                  onClick={() => (window.location.href = `/shop?category=${activeCategory.id}`)}
                >
                  <span>BROWSE {activeCategory.name.toUpperCase()} GEAR</span>
                  <ArrowRight size={14} />
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
