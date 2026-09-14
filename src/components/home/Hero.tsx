import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MEDIA } from '../../data/media';

export const Hero: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);

  // Subtle scroll-reveal on mount
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(32px)';
    const t = setTimeout(() => {
      el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      aria-label="Oriental Sports — Play. Train. Perform."
      style={{
        position: 'relative',
        minHeight: '100dvh',
        backgroundColor: 'var(--color-canvas-base)',
        display: 'grid',
        gridTemplateColumns: '1fr',
        overflow: 'hidden',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* ── DESKTOP: split grid ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,56%)',
          minHeight: '100dvh',
          position: 'relative',
        }}
      >
        {/* LEFT — ivory canvas + giant typographic composition */}
        <div
          style={{
            backgroundColor: 'var(--color-canvas-base)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: 'clamp(20px, 5vw, 72px)',
            paddingRight: '0',
            paddingTop: 'clamp(80px, 12vh, 120px)',
            paddingBottom: 'clamp(48px, 8vh, 80px)',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* Tiny category label */}
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.625rem, 1vw, 0.75rem)',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--color-ink-subtle)',
              marginBottom: 'clamp(20px, 3vh, 32px)',
            }}
          >
            RACQUET SPORTS · PUNE
          </div>

          {/* Giant stacked headline — the primary composition */}
          <div ref={textRef}>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(4.5rem, 11vw, 9.5rem)',
                fontWeight: 800,
                lineHeight: 0.88,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                color: 'var(--color-ink)',
                margin: 0,
                display: 'block',
              }}
            >
              <span style={{ display: 'block' }}>PLAY.</span>
              <span style={{ display: 'block' }}>TRAIN.</span>
              <span style={{ display: 'block' }}>PERFORM.</span>
            </h1>

            {/* Thin gold rule — single brand accent moment */}
            <div
              style={{
                width: 'clamp(40px, 5vw, 64px)',
                height: '1.5px',
                backgroundColor: 'var(--color-brand-gold)',
                margin: 'clamp(24px, 4vh, 40px) 0',
              }}
            />

            {/* Single CTA — underlined inline link */}
            <Link
              to="/shop"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-ink)',
                textDecoration: 'none',
                borderBottom: '1.5px solid var(--color-ink)',
                paddingBottom: '3px',
                transition: 'opacity 0.2s ease',
                minHeight: '44px',
                alignSelf: 'flex-start',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.5')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              SHOP RACQUET SPORTS
              <span style={{ fontSize: '1.1em' }}>→</span>
            </Link>
          </div>
        </div>

        {/* RIGHT — sports photograph, edge-to-edge */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: '100dvh',
          }}
        >
          <img
            src={MEDIA.heroSlide2}
            alt="Athlete performing a powerful smash on a sports court"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 25%',
            }}
            onError={e => {
              e.currentTarget.src =
                'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1400&q=85';
            }}
          />
          {/* Subtle left-edge gradient so type reads over the photo where they overlap */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, var(--color-canvas-base) 0%, transparent 18%)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      {/* ── MOBILE override: stacked full-bleed ── */}
      <style>{`
        @media (max-width: 767px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-left {
            position: relative;
            z-index: 3;
            padding: 100px 20px 40px !important;
            background: transparent !important;
          }
          .hero-right {
            position: fixed;
            inset: 0;
            z-index: 0 !important;
          }
          .hero-right::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, rgba(250,247,242,0.35) 0%, rgba(250,247,242,0.55) 60%, rgba(250,247,242,0.95) 100%);
          }
          .hero-section { background: var(--color-canvas-base) !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
