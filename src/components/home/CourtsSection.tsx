import React from 'react';
import { Link } from 'react-router-dom';
import { MEDIA } from '../../data/media';

const SERVICES = ['SURFACES', 'LIGHTING', 'FENCING', 'LINE MARKING', 'TURNKEY EXECUTION'];

export const CourtsSection: React.FC = () => {
  return (
    <section
      aria-label="Oriental Sports Court Construction"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: 'clamp(500px, 80vh, 900px)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        boxSizing: 'border-box',
      }}
    >
      {/* Full-bleed architectural photograph */}
      <img
        src={MEDIA.heroSlide3}
        alt="Championship sports court illuminated at twilight, Pune"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 40%',
          display: 'block',
        }}
        onError={e => {
          e.currentTarget.src =
            'https://images.unsplash.com/photo-1529900245534-47fbf4cb3836?auto=format&fit=crop&w=1800&q=85';
        }}
      />

      {/* Dark overlay for text legibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(14,16,19,0.2) 0%, rgba(14,16,19,0.45) 50%, rgba(14,16,19,0.85) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Typography + services composition — positioned over photo */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 'var(--max-width-content)',
          margin: '0 auto',
          width: '100%',
          padding: 'clamp(40px, 6vw, 64px) clamp(20px, 5vw, 72px)',
          boxSizing: 'border-box',
        }}
      >
        {/* Giant white headline */}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.5rem, 10vw, 8rem)',
            fontWeight: 300,
            lineHeight: 0.88,
            letterSpacing: '-0.035em',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            margin: '0 0 clamp(24px, 4vh, 40px)',
          }}
        >
          <span style={{ display: 'block' }}>WE BUILD</span>
          <span style={{ display: 'block' }}>COURTS.</span>
        </h2>

        {/* Thin gold rule — single brand accent */}
        <div
          style={{
            width: '100%',
            height: '1px',
            backgroundColor: 'var(--color-brand-gold)',
            marginBottom: 'clamp(16px, 2.5vh, 28px)',
          }}
        />

        {/* Services row + CTA */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'clamp(12px, 2vw, 20px)',
          }}
        >
          {/* Services list — mono small caps in one row */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'clamp(8px, 1.5vw, 16px)',
            }}
          >
            {SERVICES.map((svc, i) => (
              <React.Fragment key={svc}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(0.625rem, 1vw, 0.75rem)',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.75)',
                  }}
                >
                  {svc}
                </span>
                {i < SERVICES.length - 1 && (
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6rem',
                      color: 'rgba(255,255,255,0.3)',
                    }}
                  >
                    ·
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Single CTA */}
          <Link
            to="/courts"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.6875rem, 1.1vw, 0.8125rem)',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.9)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.45)',
              paddingBottom: '3px',
              minHeight: '44px',
              whiteSpace: 'nowrap',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.5')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            EXPLORE SERVICES →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CourtsSection;
