import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Compass, CheckCircle2, Layers, Sun, ShieldCheck, Clock } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';
import { BrandRings } from '../brand/BrandRings';
import { MEDIA } from '../../data/media';

const STAGES = [
  {
    step: '01',
    title: 'REGULATION COURTS',
    category: 'DESIGN & ARCHITECTURE',
    desc: 'Official USA Pickleball, ITF Tennis, and BWF Badminton dimensional layouts. Engineered for tournament velocity and true ball trajectory.',
    specs: ['USAPA 20x44ft Pickleball', 'ITF 78x36ft Tennis', 'BWF 44x20ft Badminton', 'WSF Squash'],
    image: MEDIA.courtStage01Grading,
  },
  {
    step: '02',
    title: 'CERTIFIED SURFACES',
    category: 'SHOCK REDUCTION',
    desc: '8-layer elastomeric cushion acrylics, DIN-compliant double-sprung seasoned teak floors, and 50mm diamond monofilament synthetic turf.',
    specs: ['ITF Pace Rating 3 & 4', '62% Vertical Force Absorption', 'Non-glare UV resistant finish'],
    image: MEDIA.courtStage02Surfaces,
  },
  {
    step: '03',
    title: 'SPORTS FLOODLIGHTING',
    category: 'ILLUMINATION ENGINEERING',
    desc: 'Tournament standard IP66 asymmetric LED projectors delivering 300 to 500 uniform lux across all playing zones with zero visual blinding.',
    specs: ['350–500 Lux Uniformity', 'Asymmetric Glare Cut-Off', 'Anti-Flicker IP66 Optics'],
    image: MEDIA.courtStage03Lighting,
  },
  {
    step: '04',
    title: 'SUB-BASE & DRAINAGE',
    category: 'CIVIL INTEGRITY',
    desc: 'Laser-guided civil sub-base grading with 1% perimeter French drains calibrated to withstand Maharashtra monsoon downpours without waterlogging.',
    specs: ['Laser Grading to 1mm', 'Reinforced PCC Sub-Base', 'Rapid Surface Runoff Grids'],
    image: MEDIA.courtStage04Infrastructure,
  },
  {
    step: '05',
    title: 'PUNE CONSULTATION',
    category: 'TURNKEY EXECUTION',
    desc: 'Direct consultation from our Camp retail headquarters. We conduct on-site soil and laser gradient evaluations across Pune, PMRDA, and Maharashtra.',
    specs: ['Free On-Site Feasibility', 'Detailed Itemized Estimates', 'Turnkey 20–40 Day Delivery'],
    image: MEDIA.courtStage05Consultation,
  },
];

export const CourtsSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);
  const current = STAGES[activeStage];

  return (
    <section
      className="section-padding bg-dark"
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(246, 243, 234, 0.08)',
        borderBottom: '1px solid rgba(246, 243, 234, 0.08)',
      }}
      aria-label="Court and Sports Infrastructure Construction"
    >
      {/* Kinetic Brand Concentric Rings Background */}
      <div style={{ position: 'absolute', left: '-10%', bottom: '-15%', pointerEvents: 'none', zIndex: 1 }}>
        <BrandRings size={740} opacity={0.12} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        {/* Section Headline */}
        <div style={{ maxWidth: '820px', marginBottom: 'var(--space-3xl)' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              backgroundColor: 'rgba(201, 162, 39, 0.12)',
              border: '1px solid rgba(201, 162, 39, 0.3)',
              borderRadius: '2px',
              marginBottom: '20px',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-plate-gold)' }} />
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
              INFRASTRUCTURE ENGINEERING • PUNE
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
              margin: '0 0 20px 0',
            }}
          >
            WE BUILD<br />
            THE PLACE<br />
            <span style={{ color: 'var(--color-plate-gold)' }}>YOU PLAY.</span>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.0625rem, 2vw, 1.25rem)',
              color: 'var(--color-ivory)',
              lineHeight: 1.45,
              opacity: 0.9,
              maxWidth: '640px',
              marginBottom: '28px',
            }}
          >
            From club pickleball courts in Koregaon Park to championship hard courts at Deccan Gymkhana, we engineer tournament-grade sports infrastructure.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
            <MagneticButton
              variant="gold"
              size="md"
              onClick={() => (window.location.href = '/courts')}
            >
              <span>BUILD A COURT</span>
              <ArrowRight size={16} />
            </MagneticButton>

            <MagneticButton
              variant="outline-white"
              size="md"
              onClick={() => (window.location.href = '/courts/projects')}
            >
              <span>VIEW OUR PROJECTS</span>
              <Compass size={16} />
            </MagneticButton>
          </div>
        </div>

        {/* Sticky Scroll-Driven Storytelling Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-3xl)',
            alignItems: 'start',
          }}
        >
          {/* Left: 5-Stage Step Navigation Sequence */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {STAGES.map((st, idx) => {
              const isActive = idx === activeStage;
              return (
                <div
                  key={st.step}
                  onClick={() => setActiveStage(idx)}
                  onMouseEnter={() => setActiveStage(idx)}
                  style={{
                    backgroundColor: isActive ? '#1C1C1C' : 'rgba(255,255,255,0.02)',
                    border: isActive ? '1px solid var(--color-plate-gold)' : '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '2px',
                    padding: '24px',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: isActive ? 'var(--color-plate-gold)' : '#777',
                        letterSpacing: '0.12em',
                      }}
                    >
                      STAGE {st.step} • {st.category}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-display-xl)',
                        fontSize: '1.5rem',
                        color: isActive ? 'var(--color-plate-gold)' : '#555',
                      }}
                    >
                      {st.step}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display-xl)',
                      fontSize: '2rem',
                      lineHeight: 0.95,
                      color: isActive ? '#FFFFFF' : '#BBB',
                      marginBottom: '8px',
                    }}
                  >
                    {st.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: '#AAA',
                      lineHeight: 1.45,
                      display: isActive ? 'block' : 'none',
                      fontFamily: 'var(--font-heading)',
                    }}
                  >
                    {st.desc}
                  </p>

                  {isActive && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '14px' }}>
                      {st.specs.map((sp, i) => (
                        <span
                          key={i}
                          style={{
                            padding: '3px 8px',
                            backgroundColor: 'rgba(201,162,39,0.12)',
                            border: '1px solid rgba(201,162,39,0.25)',
                            borderRadius: '2px',
                            fontSize: '0.6875rem',
                            color: 'var(--color-plate-gold)',
                            fontFamily: 'var(--font-ui)',
                            fontWeight: 600,
                          }}
                        >
                          {sp}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Sticky Synchronized Stage Visual */}
          <div
            style={{
              position: 'sticky',
              top: '100px',
              height: '540px',
              backgroundColor: '#161616',
              borderRadius: '2px',
              overflow: 'hidden',
              border: '1px solid var(--color-plate-gold)',
              boxShadow: '0 20px 48px rgba(0,0,0,0.5)',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current.image}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{ position: 'absolute', inset: 0 }}
              >
                <img
                  src={current.image}
                  alt={current.title}
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

            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '32px',
                zIndex: 3,
                color: 'var(--color-pure-white)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-plate-gold)',
                  display: 'block',
                  marginBottom: '6px',
                }}
              >
                STAGE {current.step} OF 05
              </span>

              <h4
                style={{
                  fontFamily: 'var(--font-display-xl)',
                  fontSize: '2.5rem',
                  lineHeight: 0.9,
                  color: '#FFFFFF',
                  marginBottom: '10px',
                }}
              >
                {current.title}
              </h4>

              <p style={{ fontSize: '0.9375rem', color: '#E0DACF', lineHeight: 1.4, marginBottom: '20px', fontFamily: 'var(--font-heading)' }}>
                {current.desc}
              </p>

              <MagneticButton
                variant="gold"
                size="sm"
                onClick={() => (window.location.href = '/courts')}
              >
                <span>CONSULT FOR {current.title}</span>
                <ArrowRight size={14} />
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
