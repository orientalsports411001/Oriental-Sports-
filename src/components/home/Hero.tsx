import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MEDIA } from '../../data/media';

/**
 * HERO — Full canvas editorial composition.
 *
 * Principle (DsCool / Supply reference):
 *   Typography fills the ENTIRE canvas at ~17vw.
 *   Athlete image floats WITHIN the typographic composition.
 *   The athlete stands IN FRONT OF the letters (image z-index > type z-index).
 *   A left-edge gradient on the image lets the type read through where they overlap.
 *
 * Result:
 *   "PLAY." — fully on ivory, clean
 *   "TRAIN." — slightly enters image zone, reads through gradient
 *   "PERFORM." — extends deepest into image, partial overlap with athlete
 *   → Each word overlaps the photograph a different amount. Intentional asymmetry.
 */
export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.style.opacity = '0';
    const t = setTimeout(() => {
      el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
      el.style.opacity = '1';
    }, 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      ref={heroRef}
      aria-label="Oriental Sports — Play. Train. Perform."
      style={{
        position: 'relative',
        minHeight: 'calc(100dvh - var(--header-height-desktop, 72px))',
        backgroundColor: 'var(--color-canvas-base)',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {/* ATHLETE PHOTOGRAPH
          z-index: 2 — sits IN FRONT OF the type.
          Left-edge gradient fades to ivory so overlapping type remains legible.
          The athlete physically exists within the typographic canvas. */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: 'clamp(260px, 56%, 900px)',
          zIndex: 2,
        }}
      >
        <img
          src={MEDIA.heroSlide2}
          alt="Athlete mid-smash on a championship court"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 18%',
            display: 'block',
          }}
          onError={e => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1400&q=85';
          }}
        />
        {/* Gradient: image fades into canvas at left edge where type overlaps */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, var(--color-canvas-base) 0%, rgba(250,247,242,0.75) 12%, rgba(250,247,242,0.25) 28%, transparent 50%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* GIANT HEADLINE — z-index: 3 (in front of athlete photo)
          17vw → at 1440px = ~245px cap height per word.
          Each word extends into the photo zone a different distance:
          PLAY.     ~60% of viewport
          TRAIN.    ~72% of viewport
          PERFORM.  ~88% of viewport
          This creates the editorial overlap cascade. */}
      <h1
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-51%)',
          left: 'clamp(20px, 4vw, 64px)',
          right: 0,
          margin: 0,
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(4.25rem, 17vw, 17rem)',
          fontWeight: 800,
          lineHeight: 0.86,
          letterSpacing: '-0.045em',
          textTransform: 'uppercase',
          color: 'var(--color-ink)',
          zIndex: 3,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <span style={{ display: 'block' }}>PLAY.</span>
        <span style={{ display: 'block' }}>TRAIN.</span>
        <span style={{ display: 'block' }}>PERFORM.</span>
      </h1>

      {/* EYEBROW — category context, top left */}
      <div
        className="hero-eyebrow"
        style={{
          position: 'absolute',
          top: 'clamp(24px, 4vh, 48px)',
          left: 'clamp(20px, 4vw, 64px)',
          zIndex: 4,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.625rem',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--color-ink-subtle)',
        }}
      >
        RACQUET SPORTS · PUNE
      </div>

      {/* CTA — bottom left anchor */}
      <div
        className="hero-cta-group"
        style={{
          position: 'absolute',
          bottom: 'clamp(28px, 5vh, 56px)',
          left: 'clamp(20px, 4vw, 64px)',
          zIndex: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        {/* Single gold hairline */}
        <div
          style={{
            width: 'clamp(28px, 3.5vw, 52px)',
            height: '1.5px',
            backgroundColor: 'var(--color-brand-gold)',
          }}
        />
        <Link
          to="/shop"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.6875rem, 1.1vw, 0.875rem)',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-ink)',
            textDecoration: 'none',
            borderBottom: '1.5px solid var(--color-ink)',
            paddingBottom: '3px',
            minHeight: '44px',
            transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.4')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          SHOP RACQUET SPORTS
          <span>→</span>
        </Link>
      </div>

      {/* MOBILE STYLES */}
      <style>{`
        @media (max-width: 767px) {
          section[aria-label="Oriental Sports — Play. Train. Perform."] {
            min-height: calc(100dvh - var(--header-height-mobile, 60px) - var(--bottom-nav-height, 60px)) !important;
          }
          /* On mobile: image becomes full-bleed background */
          section[aria-label="Oriental Sports — Play. Train. Perform."] > div:first-child {
            width: 100% !important;
            right: 0 !important;
            z-index: 1 !important;
          }
          /* Heavier left fade on mobile to keep ivory zone for type readability */
          section[aria-label="Oriental Sports — Play. Train. Perform."] > div:first-child > div {
            background: linear-gradient(
              to right,
              var(--color-canvas-base) 0%,
              rgba(250,247,242,0.92) 20%,
              rgba(250,247,242,0.65) 50%,
              rgba(250,247,242,0.3) 100%
            ) !important;
          }
          /* Type: stays in front on mobile, centered comfortably */
          section[aria-label="Oriental Sports — Play. Train. Perform."] > h1 {
            top: 48% !important;
            font-size: clamp(3.75rem, 18vw, 6.5rem) !important;
          }
          /* Eyebrow placement */
          .hero-eyebrow {
            top: 20px !important;
          }
          /* Position CTA securely above the fixed mobile bottom bar */
          .hero-cta-group {
            bottom: 24px !important;
          }
        }

        @media (max-width: 430px) {
          /* Extra small: make type fill comfortably on smallest phones */
          section[aria-label="Oriental Sports — Play. Train. Perform."] > h1 {
            font-size: clamp(3.25rem, 18vw, 4.75rem) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
