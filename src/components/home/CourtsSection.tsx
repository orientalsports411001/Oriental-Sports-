import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Compass, ShieldCheck, CheckCircle2, Layers, Sun, HardHat, FileText } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';
import { BrandRings } from '../brand/BrandRings';
import { MEDIA } from '../../data/media';

interface CourtStage {
  step: string;
  title: string;
  category: string;
  desc: string;
  specs: string[];
  image: string;
  turnaround: string;
}

const COURT_STAGES: CourtStage[] = [
  {
    step: '01',
    title: 'COURTS',
    category: 'REGULATION GEOMETRY',
    desc: 'Official dimensional layouts engineered for tournament velocity, line-of-play clearance, and true ball trajectory across all competitive formats.',
    specs: ['USAPA 20x44ft Pickleball', 'ITF 78x36ft Tennis (Singles/Doubles)', 'BWF 44x20ft Badminton', 'WSF Squash Regulation Courts'],
    image: MEDIA.courtStage01Grading,
    turnaround: 'Precision CAD & Site Grading',
  },
  {
    step: '02',
    title: 'SURFACES',
    category: 'PERFORMANCE & FORCE ABSORPTION',
    desc: '8-layer elastomeric cushion acrylic systems, DIN-certified double-sprung seasoned teak floors, and 50mm diamond monofilament synthetic grass.',
    specs: ['ITF Pace Rating 3 (Medium) & 4 (Medium-Fast)', '62% Vertical Shock Reduction', 'Anti-Glare Non-Skid UV Resistant Finish', 'EN 14904 Indoor Sports Flooring Standards'],
    image: MEDIA.courtStage02Surfaces,
    turnaround: 'Multi-Coat Micro-Texture Seal',
  },
  {
    step: '03',
    title: 'INFRASTRUCTURE',
    category: 'CIVIL SUB-BASE & FLOODLIGHTING',
    desc: 'Laser-guided sub-base grading with 1% perimeter French drains calibrated to withstand Maharashtra monsoon downpours, paired with tournament LED floodlighting.',
    specs: ['350–500 Lux IP66 Anti-Glare LED Optics', 'Laser-Graded PCC Sub-Base to 1mm Tolerances', '1% Perimeter Water Runoff & French Drains', 'Heavy-Duty 3.5m Galvanized Chain-Link Enclosures'],
    image: MEDIA.courtStage03Lighting,
    turnaround: 'Engineered for 15+ Year Lifespan',
  },
  {
    step: '04',
    title: 'CONSULTATION',
    category: 'TURNKEY EXECUTION · PUNE & BEYOND',
    desc: 'Direct consultation from our Camp retail headquarters. We conduct on-site soil, laser gradient, and dimensional feasibility evaluations across Pune, PMRDA, and Maharashtra.',
    specs: ['Free On-Site Topographical Survey in Pune', 'Itemized Bill of Quantities (BOQ)', 'Full Turnkey 20–40 Day Delivery', 'AMC Surface Re-Coating & Maintenance Plans'],
    image: MEDIA.courtStage05Consultation,
    turnaround: 'Flagship Store at MG Road, Camp',
  },
];

export const CourtsSection: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const current = COURT_STAGES[activeStageIndex];
  const sectionRef = useRef<HTMLDivElement | null>(null);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-dark"
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(246, 243, 234, 0.08)',
        borderBottom: '1px solid rgba(246, 243, 234, 0.08)',
        backgroundColor: '#111111',
        color: 'var(--color-ivory)',
      }}
      aria-label="Sports Infrastructure and Court Engineering"
    >
      {/* Background Architectural Concentric Rings */}
      <div
        style={{
          position: 'absolute',
          right: '-8%',
          top: '-10%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
        aria-hidden="true"
      >
        <BrandRings size={780} opacity={0.10} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        {/* Section Header: WE BUILD THE PLACE YOU PLAY. */}
        <div style={{ maxWidth: '840px', marginBottom: 'clamp(32px, 5vw, 64px)' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              backgroundColor: 'rgba(201, 162, 39, 0.12)',
              border: '1px solid rgba(201, 162, 39, 0.35)',
              borderRadius: '2px',
              marginBottom: '20px',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-plate-gold)',
                boxShadow: '0 0 8px var(--color-plate-gold)',
              }}
              aria-hidden="true"
            />
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-plate-gold)',
              }}
            >
              INFRASTRUCTURE ENGINEERING · PUNE
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display-xl)',
              fontSize: 'clamp(3.5rem, 9vw, 6.5rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.035em',
              textTransform: 'uppercase',
              color: 'var(--color-pure-white)',
              margin: 0,
            }}
          >
            WE BUILD<br />
            <span style={{ color: 'var(--color-plate-gold)' }}>THE PLACE</span><br />
            YOU PLAY.
          </h2>

          <p
            style={{
              color: '#B5AFA4',
              fontSize: 'clamp(1rem, 2vw, 1.1875rem)',
              lineHeight: 1.55,
              marginTop: '20px',
              fontFamily: 'var(--font-heading)',
              maxWidth: '680px',
            }}
          >
            From USA Pickleball sanctioned courts in Koregaon Park to multi-sport turf arenas in Baner and school facilities across Pune. Full turnkey execution from sub-base civil grading to floodlights.
          </p>
        </div>

        {/* 2-COLUMN STICKY STORYTELLING LAYOUT */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'start',
          }}
        >
          {/* LEFT: 4 ARCHITECTURAL SEQUENTIAL STEPS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {COURT_STAGES.map((stg, idx) => {
              const isActive = idx === activeStageIndex;
              return (
                <div
                  key={stg.step}
                  onClick={() => setActiveStageIndex(idx)}
                  onMouseEnter={() => setActiveStageIndex(idx)}
                  onFocus={() => setActiveStageIndex(idx)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isActive}
                  style={{
                    backgroundColor: isActive ? '#1A1A1A' : 'rgba(255, 255, 255, 0.02)',
                    border: isActive
                      ? '1px solid var(--color-plate-gold)'
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '2px',
                    padding: 'clamp(20px, 3vw, 28px)',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Active Indicator Bar on Left */}
                  {isActive && (
                    <motion.div
                      layoutId="activeCourtStageBar"
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

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '10px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.8125rem',
                        fontWeight: 800,
                        color: isActive ? 'var(--color-plate-gold)' : '#777',
                        letterSpacing: '0.12em',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      STAGE {stg.step}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.6875rem',
                        textTransform: 'uppercase',
                        color: isActive ? 'var(--color-plate-gold)' : '#666',
                        letterSpacing: '0.08em',
                        fontWeight: 600,
                      }}
                    >
                      {stg.category}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display-xl)',
                      fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                      lineHeight: 0.9,
                      letterSpacing: '-0.02em',
                      color: isActive ? 'var(--color-pure-white)' : '#CCC',
                      margin: '0 0 12px 0',
                    }}
                  >
                    {stg.title}
                  </h3>

                  <p
                    style={{
                      color: isActive ? '#D4CEBF' : '#888',
                      fontSize: '0.9375rem',
                      lineHeight: 1.5,
                      fontFamily: 'var(--font-heading)',
                      margin: 0,
                    }}
                  >
                    {stg.desc}
                  </p>

                  {/* Specs List when active */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                          gap: '8px',
                        }}
                      >
                        {stg.specs.map((spc) => (
                          <div
                            key={spc}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontSize: '0.75rem',
                              fontFamily: 'var(--font-ui)',
                              color: '#E0C56A',
                            }}
                          >
                            <CheckCircle2 size={12} color="var(--color-plate-gold)" />
                            <span>{spc}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT: STICKY VISUAL PANEL */}
          <div
            style={{
              position: 'sticky',
              top: '100px',
              backgroundColor: '#161616',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '2px',
              overflow: 'hidden',
              boxShadow: '0 20px 48px rgba(0,0,0,0.4)',
            }}
          >
            {/* Visual Image Container with Crossfade and Subtle Zoom */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '380px',
                overflow: 'hidden',
                backgroundColor: '#0A0A0A',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.image}
                  src={current.image}
                  alt={current.title}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.03 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </AnimatePresence>

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 30%, rgba(22,22,22,0.95) 100%)',
                }}
              />

              {/* Stage Badge on Top Right */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  backgroundColor: 'rgba(17, 17, 17, 0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid var(--color-plate-gold)',
                  padding: '6px 12px',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 800,
                  color: 'var(--color-plate-gold)',
                  letterSpacing: '0.1em',
                }}
              >
                STAGE {current.step} / 04
              </div>

              {/* Bottom Overlay Info */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '20px',
                  right: '20px',
                }}
              >
                <div
                  style={{
                    fontSize: '0.6875rem',
                    fontFamily: 'var(--font-ui)',
                    color: 'var(--color-plate-gold)',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                  }}
                >
                  ENGINEERING PROTOCOL
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display-xl)',
                    fontSize: '1.75rem',
                    color: '#FFFFFF',
                    margin: '2px 0',
                  }}
                >
                  {current.title}
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#B5AFA4', fontFamily: 'var(--font-ui)' }}>
                  {current.turnaround}
                </div>
              </div>
            </div>

            {/* Bottom Actions inside Panel */}
            <div
              style={{
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                backgroundColor: '#161616',
              }}
            >
              <div>
                <div style={{ fontSize: '0.6875rem', color: '#888', fontFamily: 'var(--font-ui)' }}>
                  PUNE HEADQUARTERS
                </div>
                <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#FFF' }}>
                  Shop 247, MG Road, Camp
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <MagneticButton
                  variant="gold"
                  size="md"
                  onClick={() => (window.location.href = '/courts')}
                >
                  <span>COURT CONSULTATION</span>
                  <ArrowRight size={15} />
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
