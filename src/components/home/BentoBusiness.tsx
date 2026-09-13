import React from 'react';
import { ArrowRight, ShoppingBag, Dumbbell, LayoutGrid, Gamepad2 } from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';
import { MagneticButton } from '../ui/MagneticButton';
import { MEDIA } from '../../data/media';

export const BentoBusiness: React.FC = () => {
  return (
    <section className="section-padding bg-ivory" aria-label="Oriental Sports Ecosystem">
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: 'var(--space-3xl)', maxWidth: '720px' }}>
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
              marginBottom: '10px',
            }}
          >
            <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-plate-gold)' }} />
            <span>THE SPORTS HOUSE</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display-xl)',
              fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: 'var(--color-ink)',
              margin: '0 0 16px 0',
            }}
          >
            ONE HOUSE. FOUR DOMAINS.
          </h2>

          <p style={{ color: '#555555', fontSize: '1.0625rem', lineHeight: 1.5, fontFamily: 'var(--font-heading)' }}>
            From personal match racquets and training weights to full-scale championship sports courts.
          </p>
        </div>

        {/* Bento Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'var(--space-md)',
          }}
        >
          {/* BENTO 1: SHOP GEAR (7 Cols) */}
          <div style={{ gridColumn: 'span 12' }} className="bento-span-7">
            <SpotlightCard
              style={{
                backgroundColor: 'var(--color-ink)',
                borderRadius: '2px',
                minHeight: '360px',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              spotlightColor="rgba(201, 162, 39, 0.16)"
            >
              <div
                className="pillar-card"
                style={{
                  position: 'relative',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: 'clamp(28px, 4vw, 36px)',
                  overflow: 'hidden',
                }}
              >
                <div
                  className="pillar-bg"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.45,
                    transition: 'transform 0.6s ease',
                  }}
                >
                  <img
                    src={MEDIA.tennisHero}
                    alt="Sports equipment"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 20%, rgba(17,17,17,0.92) 80%)',
                  }}
                />

                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: 'var(--color-plate-gold)',
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                    }}
                  >
                    <ShoppingBag size={14} />
                    <span>EQUIPMENT & MATCH GEAR</span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display-xl)',
                      fontSize: '2.5rem',
                      lineHeight: 0.95,
                      color: '#FFFFFF',
                      marginBottom: '8px',
                    }}
                  >
                    SPORTS GOODS
                  </h3>

                  <p style={{ color: '#E0DACF', fontSize: '0.9375rem', maxWidth: '440px', marginBottom: '20px', fontFamily: 'var(--font-heading)' }}>
                    Tour racquets, hand-selected cricket willow, USA Pickleball paddles, and tournament balls.
                  </p>

                  <MagneticButton
                    variant="gold"
                    size="sm"
                    onClick={() => (window.location.href = '/shop')}
                  >
                    <span>SHOP GEAR</span>
                    <ArrowRight size={14} />
                  </MagneticButton>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* BENTO 2: COURTS (5 Cols) */}
          <div style={{ gridColumn: 'span 12' }} className="bento-span-5">
            <SpotlightCard
              style={{
                backgroundColor: '#161616',
                borderRadius: '2px',
                minHeight: '360px',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              spotlightColor="rgba(201, 162, 39, 0.16)"
            >
              <div
                className="pillar-card"
                style={{
                  position: 'relative',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: 'clamp(28px, 4vw, 36px)',
                  overflow: 'hidden',
                }}
              >
                <div
                  className="pillar-bg"
                  style={{ position: 'absolute', inset: 0, opacity: 0.45, transition: 'transform 0.6s ease' }}
                >
                  <img
                    src={MEDIA.pickleballHero}
                    alt="Court construction"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 20%, rgba(17,17,17,0.92) 80%)',
                  }}
                />

                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: 'var(--color-plate-gold)',
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                    }}
                  >
                    <LayoutGrid size={14} />
                    <span>INFRASTRUCTURE</span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display-xl)',
                      fontSize: '2.5rem',
                      lineHeight: 0.95,
                      color: '#FFFFFF',
                      marginBottom: '8px',
                    }}
                  >
                    COURTS
                  </h3>

                  <p style={{ color: '#E0DACF', fontSize: '0.9375rem', marginBottom: '20px', fontFamily: 'var(--font-heading)' }}>
                    Pickleball, Tennis, Badminton, Turf and Squash facilities engineered for Pune.
                  </p>

                  <MagneticButton
                    variant="outline-white"
                    size="sm"
                    onClick={() => (window.location.href = '/courts')}
                  >
                    <span>VIEW COURTS</span>
                    <ArrowRight size={14} />
                  </MagneticButton>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* BENTO 3: FITNESS (5 Cols) */}
          <div style={{ gridColumn: 'span 12' }} className="bento-span-5">
            <SpotlightCard
              style={{
                backgroundColor: '#161616',
                borderRadius: '2px',
                minHeight: '320px',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              spotlightColor="rgba(201, 162, 39, 0.16)"
            >
              <div
                className="pillar-card"
                style={{
                  position: 'relative',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: 'clamp(24px, 4vw, 32px)',
                  overflow: 'hidden',
                }}
              >
                <div
                  className="pillar-bg"
                  style={{ position: 'absolute', inset: 0, opacity: 0.42, transition: 'transform 0.6s ease' }}
                >
                  <img
                    src={MEDIA.fitnessHero}
                    alt="Fitness conditioning"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 20%, rgba(17,17,17,0.92) 80%)',
                  }}
                />

                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: 'var(--color-plate-gold)',
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                    }}
                  >
                    <Dumbbell size={14} />
                    <span>CONDITIONING</span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display-xl)',
                      fontSize: '2.25rem',
                      lineHeight: 0.95,
                      color: '#FFFFFF',
                      marginBottom: '8px',
                    }}
                  >
                    FITNESS EQUIPMENT
                  </h3>

                  <p style={{ color: '#E0DACF', fontSize: '0.875rem', marginBottom: '18px', fontFamily: 'var(--font-heading)' }}>
                    Commercial dumbbells, precision barbells, conditioning rigs and shock-absorbing flooring.
                  </p>

                  <MagneticButton
                    variant="outline-white"
                    size="sm"
                    onClick={() => (window.location.href = '/shop?category=fitness')}
                  >
                    <span>FITNESS GEAR</span>
                  </MagneticButton>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* BENTO 4: RECREATION (7 Cols) */}
          <div style={{ gridColumn: 'span 12' }} className="bento-span-7">
            <SpotlightCard
              style={{
                backgroundColor: 'var(--color-ink)',
                borderRadius: '2px',
                minHeight: '320px',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              spotlightColor="rgba(201, 162, 39, 0.16)"
            >
              <div
                className="pillar-card"
                style={{
                  position: 'relative',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: 'clamp(24px, 4vw, 32px)',
                  overflow: 'hidden',
                }}
              >
                <div
                  className="pillar-bg"
                  style={{ position: 'absolute', inset: 0, opacity: 0.42, transition: 'transform 0.6s ease' }}
                >
                  <img
                    src={MEDIA.recreationHero}
                    alt="Recreation and club games"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 20%, rgba(17,17,17,0.92) 80%)',
                  }}
                />

                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: 'var(--color-plate-gold)',
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                    }}
                  >
                    <Gamepad2 size={14} />
                    <span>CLUB & LEISURE</span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display-xl)',
                      fontSize: '2.25rem',
                      lineHeight: 0.95,
                      color: '#FFFFFF',
                      marginBottom: '8px',
                    }}
                  >
                    RECREATION & CLUB SPORTS
                  </h3>

                  <p style={{ color: '#E0DACF', fontSize: '0.875rem', maxWidth: '460px', marginBottom: '18px', fontFamily: 'var(--font-heading)' }}>
                    Championship 20mm English birch carrom boards, pool cues, foosball tables, and chess sets.
                  </p>

                  <MagneticButton
                    variant="outline-white"
                    size="sm"
                    onClick={() => (window.location.href = '/shop?category=recreation')}
                  >
                    <span>EXPLORE RECREATION</span>
                  </MagneticButton>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
};
