import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, Hammer } from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';
import { MagneticButton } from '../ui/MagneticButton';
import { MEDIA } from '../../data/media';

export const ShopBuildSplit: React.FC = () => {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-ink)',
        paddingTop: 'var(--space-2xl)',
        paddingBottom: 'var(--space-2xl)',
      }}
      aria-label="Shop and Build Core Pillars"
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-lg)',
          }}
        >
          {/* PILLAR 1: SHOP GEAR */}
          <SpotlightCard
            style={{
              backgroundColor: '#161616',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '2px',
              minHeight: '440px',
            }}
            spotlightColor="rgba(201, 162, 39, 0.15)"
          >
            <div
              className="pillar-card"
              style={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: 'clamp(28px, 5vw, 44px)',
                overflow: 'hidden',
              }}
            >
              {/* Background Media */}
              <div
                className="pillar-bg"
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0.5,
                  transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease',
                }}
              >
                <img
                  src={MEDIA.shopPillar}
                  alt="Athletic sports equipment"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Gradient Vignette Scrim */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(17,17,17,0.15) 0%, rgba(17,17,17,0.65) 45%, #111111 95%)',
                }}
              />

              {/* Content Box */}
              <div style={{ position: 'relative', zIndex: 3 }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--color-plate-gold)',
                    marginBottom: '12px',
                  }}
                >
                  <ShoppingBag size={14} />
                  <span>PILLAR 01 • RETAIL & GEAR</span>
                </div>

                <h2
                  style={{
                    fontFamily: 'var(--font-display-xl)',
                    fontSize: 'clamp(3rem, 6vw, 4.25rem)',
                    color: 'var(--color-pure-white)',
                    lineHeight: 0.9,
                    letterSpacing: '-0.03em',
                    marginBottom: '12px',
                  }}
                >
                  SHOP GEAR
                </h2>

                <p
                  style={{
                    color: '#E0DACF',
                    fontSize: '1rem',
                    lineHeight: 1.45,
                    maxWidth: '460px',
                    marginBottom: '28px',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  Match equipment calibrated for every game. Grade 1 English willow, tour racquets, USAPA paddles and conditioning iron.
                </p>

                <MagneticButton
                  variant="gold"
                  size="md"
                  onClick={() => (window.location.href = '/shop')}
                >
                  <span>EXPLORE SHOP</span>
                  <ArrowRight size={16} />
                </MagneticButton>
              </div>
            </div>
          </SpotlightCard>

          {/* PILLAR 2: BUILD COURTS */}
          <SpotlightCard
            style={{
              backgroundColor: '#161616',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '2px',
              minHeight: '440px',
            }}
            spotlightColor="rgba(201, 162, 39, 0.15)"
          >
            <div
              className="pillar-card"
              style={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: 'clamp(28px, 5vw, 44px)',
                overflow: 'hidden',
              }}
            >
              {/* Background Media */}
              <div
                className="pillar-bg"
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0.5,
                  transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease',
                }}
              >
                <img
                  src={MEDIA.buildPillar}
                  alt="Court construction and sports infrastructure"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Gradient Vignette Scrim */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(17,17,17,0.15) 0%, rgba(17,17,17,0.65) 45%, #111111 95%)',
                }}
              />

              {/* Content Box */}
              <div style={{ position: 'relative', zIndex: 3 }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--color-plate-gold)',
                    marginBottom: '12px',
                  }}
                >
                  <Hammer size={14} />
                  <span>PILLAR 02 • INFRASTRUCTURE</span>
                </div>

                <h2
                  style={{
                    fontFamily: 'var(--font-display-xl)',
                    fontSize: 'clamp(3rem, 6vw, 4.25rem)',
                    color: 'var(--color-pure-white)',
                    lineHeight: 0.9,
                    letterSpacing: '-0.03em',
                    marginBottom: '12px',
                  }}
                >
                  BUILD COURTS
                </h2>

                <p
                  style={{
                    color: '#E0DACF',
                    fontSize: '1rem',
                    lineHeight: 1.45,
                    maxWidth: '460px',
                    marginBottom: '28px',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  Turnkey court construction built for Pune's athletes and weather. Certified acrylic, timber sports floors, and floodlit turf arenas.
                </p>

                <MagneticButton
                  variant="outline-white"
                  size="md"
                  onClick={() => (window.location.href = '/courts')}
                >
                  <span>EXPLORE COURTS</span>
                  <ArrowRight size={16} />
                </MagneticButton>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};
