import React from 'react';
import { motion } from 'framer-motion';

export const EditorialBreak: React.FC = () => {
  return (
    <section
      style={{
        backgroundColor: '#0E0E0E',
        color: 'var(--color-ivory)',
        padding: 'clamp(36px, 6vw, 64px) 0',
        borderTop: '1px solid rgba(246, 243, 234, 0.08)',
        borderBottom: '1px solid rgba(246, 243, 234, 0.08)',
        overflow: 'hidden',
      }}
      aria-label="Oriental Sports Creed"
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(24px, 4vw, 48px)',
            alignItems: 'center',
          }}
        >
          {/* Large Athletic Condensed Statement */}
          <div style={{ maxWidth: '640px' }}>
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-plate-gold)',
                display: 'block',
                marginBottom: '10px',
              }}
            >
              THE CREED • PUNE 411001
            </span>
            <p
              style={{
                fontFamily: 'var(--font-display-condensed)',
                fontSize: 'clamp(1.75rem, 3.8vw, 2.75rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                color: 'var(--color-pure-white)',
              }}
            >
              WE EQUIP THE ATHLETE.<br />
              <span style={{ color: 'var(--color-plate-gold)' }}>WE CONSTRUCT THE ARENA.</span>
            </p>
          </div>

          {/* Athletic Contextual Indicators */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px',
              borderLeft: '1px solid rgba(246, 243, 234, 0.1)',
              paddingLeft: 'clamp(16px, 3vw, 32px)',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display-xl)',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: 'var(--color-plate-gold)',
                  lineHeight: 0.9,
                }}
              >
                MG ROAD
              </div>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', color: '#9E988E', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Flagship Store • Camp
              </span>
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display-xl)',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: 'var(--color-pure-white)',
                  lineHeight: 0.9,
                }}
              >
                100%
              </div>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', color: '#9E988E', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Tournament Calibrated
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
