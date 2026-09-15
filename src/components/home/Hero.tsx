import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MEDIA } from '../../data/media';
import { MagneticButton } from '../ui/MagneticButton';

/**
 * HERO — Art-Directed Editorial Sports Canvas.
 *
 * Core Brand Positioning: "GEAR. COURTS. PUNE."
 *
 * Visual Mechanics:
 * - Clear vertical separation: Headline sits in upper canvas, CTA group securely in lower band (no overlapping text).
 * - Clean editorial typography without artificial trailing dots on every word.
 * - Single-discipline authentic sport photography (badminton championship smash) with video-ready architecture.
 * - Reduced motion & touch bypass on magnetic physics and kinetic reveal.
 */
export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const isReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const el = heroRef.current;
    if (!el || isReducedMotion) return;
    el.style.opacity = '0';
    const t = setTimeout(() => {
      el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
      el.style.opacity = '1';
    }, 100);
    return () => clearTimeout(t);
  }, [isReducedMotion]);

  // Clean words without awkward per-word periods
  const words = ['GEAR', 'COURTS', 'PUNE'];

  return (
    <section
      ref={heroRef}
      aria-label="Oriental Sports — Gear. Courts. Pune."
      style={{
        position: 'relative',
        minHeight: 'calc(100dvh - var(--header-height-desktop, 72px))',
        backgroundColor: 'var(--color-canvas-base)',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {/* ATHLETE PHOTOGRAPH & VIDEO FALLBACK CANVAS
          z-index: 2 — sits in front of the typography base.
          Left-edge gradient fades to ivory so overlapping type remains legible. */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: 'clamp(260px, 54%, 880px)',
          zIndex: 2,
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={MEDIA.heroSlide1}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 18%',
            display: 'block',
          }}
        >
          <source src="/videos/hero_court_reel.mp4" type="video/mp4" />
          <img
            src={MEDIA.heroSlide1}
            alt="Badminton athlete mid-smash on championship court"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 18%',
              display: 'block',
            }}
            onError={(e) => {
              e.currentTarget.src = MEDIA.heroSlide3;
            }}
          />
        </video>

        {/* Gradient: image fades into canvas at left edge where type overlaps */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, var(--color-canvas-base) 0%, rgba(250,247,242,0.85) 15%, rgba(250,247,242,0.3) 35%, transparent 55%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* EYEBROW — category context, top left */}
      <div
        className="hero-eyebrow"
        style={{
          position: 'absolute',
          top: 'clamp(24px, 3.8vh, 44px)',
          left: 'clamp(20px, 4vw, 64px)',
          zIndex: 4,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.625rem',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--color-ink-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            backgroundColor: 'var(--color-brand-gold)',
            borderRadius: '50%',
            display: 'inline-block',
          }}
        />
        <span>EQUIPMENT & COURT INFRASTRUCTURE · PUNE</span>
      </div>

      {/* GIANT HEADLINE — z-index: 3
          Positioned clearly in upper canvas so words NEVER collide with CTA buttons below. */}
      <h1
        style={{
          position: 'absolute',
          top: 'clamp(80px, 12.5vh, 130px)',
          left: 'clamp(20px, 4vw, 64px)',
          right: 0,
          margin: 0,
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3.5rem, 12vw, 9.75rem)',
          fontWeight: 800,
          lineHeight: 0.88,
          letterSpacing: '-0.04em',
          textTransform: 'uppercase',
          color: 'var(--color-ink)',
          zIndex: 3,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {words.map((word, idx) => (
          <span
            key={word}
            style={{
              display: 'block',
              overflow: 'hidden',
            }}
          >
            <motion.span
              style={{ display: 'block', willChange: 'transform, opacity' }}
              initial={isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: '85%' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: isReducedMotion ? 0 : 0.7,
                delay: isReducedMotion ? 0 : 0.15 + idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h1>

      {/* CTA GROUP — bottom left anchor with dedicated vertical clearance */}
      <div
        className="hero-cta-group"
        style={{
          position: 'absolute',
          bottom: 'clamp(32px, 5.5vh, 56px)',
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Link to="/shop" style={{ textDecoration: 'none' }} data-cursor="view">
            <MagneticButton
              variant="primary"
              size="md"
              ariaLabel="Explore Sports Gear"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.6875rem, 1.1vw, 0.8125rem)',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '12px 22px',
                borderRadius: 'var(--radius-xs)',
                cursor: 'pointer',
              }}
            >
              EXPLORE GEAR →
            </MagneticButton>
          </Link>

          <Link
            to="/courts"
            data-cursor="view"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.6875rem, 1.1vw, 0.8125rem)',
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
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.5')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            TURNKEY COURTS →
          </Link>
        </div>
      </div>

      {/* RESPONSIVE CSS */}
      <style>{`
        @media (max-width: 767px) {
          section[aria-label="Oriental Sports — Gear. Courts. Pune."] {
            min-height: calc(100dvh - var(--header-height-mobile, 60px) - var(--bottom-nav-height, 60px)) !important;
          }
          /* On mobile: image canvas becomes full-bleed background */
          section[aria-label="Oriental Sports — Gear. Courts. Pune."] > div:first-child {
            width: 100% !important;
            right: 0 !important;
            z-index: 1 !important;
          }
          /* Heavier left fade on mobile to keep ivory zone for type readability */
          section[aria-label="Oriental Sports — Gear. Courts. Pune."] > div:first-child > div {
            background: linear-gradient(
              to right,
              var(--color-canvas-base) 0%,
              rgba(250,247,242,0.94) 25%,
              rgba(250,247,242,0.7) 60%,
              rgba(250,247,242,0.3) 100%
            ) !important;
          }
          /* Headline: sits cleanly in upper half on mobile */
          section[aria-label="Oriental Sports — Gear. Courts. Pune."] > h1 {
            top: 24% !important;
            font-size: clamp(3.25rem, 15vw, 5.25rem) !important;
            line-height: 0.9 !important;
          }
          .hero-eyebrow {
            top: 18px !important;
          }
          /* Position CTA securely above the fixed mobile bottom bar */
          .hero-cta-group {
            bottom: 24px !important;
          }
        }

        @media (max-width: 430px) {
          section[aria-label="Oriental Sports — Gear. Courts. Pune."] > h1 {
            font-size: clamp(2.85rem, 14vw, 4.25rem) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
