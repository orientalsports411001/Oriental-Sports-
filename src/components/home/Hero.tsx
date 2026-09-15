import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { MEDIA } from '../../data/media';
import { MagneticButton } from '../ui/MagneticButton';

/**
 * HERO — PHASE 1: MASTER MOTION & EDITORIAL REDESIGN
 *
 * Design Language:
 * - Single art-directed visual canvas (NO 50/50 SaaS split).
 * - Photography bleeds behind and around the enormous typography.
 * - Words: PLAY. TRAIN. PERFORM. with masked editorial reveals.
 * - Choreographed entrance:
 *     1. Quiet/clean initial canvas
 *     2. Photography enters with subtle scale and lateral drift
 *     3. Typography reveals sequentially through overflow-hidden masks
 *     4. Subtle 2.5D depth settles into an ultra-quiet, razor-clean resting state
 * - Full support for prefers-reduced-motion and touch-screen devices.
 */

const WORDS = ['PLAY.', 'TRAIN.', 'PERFORM.'];

export const Hero: React.FC = () => {
  const isReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouchDevice(
        window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window
      );
    }
  }, []);

  // Restrained 2.5D mouse parallax — only active on desktop when motion is allowed
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isReducedMotion || isTouchDevice || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
    const yRatio = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: xRatio, y: yRatio });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Oriental Sports — Play. Train. Perform."
      style={{
        position: 'relative',
        minHeight: 'calc(100dvh - var(--header-height-desktop, 72px))',
        backgroundColor: 'var(--color-canvas-base)',
        overflow: 'hidden',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        padding: 'clamp(20px, 3.5vh, 44px) clamp(20px, 4.5vw, 72px) clamp(28px, 4.5vh, 52px)',
      }}
    >
      {/* ────────────────────────────────────────────────────────
          UNIFIED CANVAS PHOTOGRAPHY — BLEEDS BEHIND & AROUND TYPE
          Z-Index: 1 (Behind typography & CTAs)
      ──────────────────────────────────────────────────────── */}
      <motion.div
        className="hero-media-canvas"
        initial={isReducedMotion ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 1.06, x: 24 }}
        animate={{
          opacity: 1,
          scale: 1,
          x: isReducedMotion ? 0 : mousePos.x * 14,
          y: isReducedMotion ? 0 : mousePos.y * 10,
        }}
        transition={{
          opacity: { duration: isReducedMotion ? 0 : 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
          scale: { duration: isReducedMotion ? 0 : 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
          x: { duration: isReducedMotion ? 0 : 0.6, ease: 'easeOut' },
          y: { duration: isReducedMotion ? 0 : 0.6, ease: 'easeOut' },
        }}
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: 'clamp(320px, 58%, 940px)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <img
          src={MEDIA.heroSlide1}
          alt="Badminton champion athlete mid-smash in arena"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 20%',
            display: 'block',
          }}
          onError={(e) => {
            e.currentTarget.src = MEDIA.heroSlide3;
          }}
        />

        {/* Feathered gradient masks: blends image organically into the ivory canvas */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, var(--color-canvas-base) 0%, rgba(246,243,234,0.92) 18%, rgba(246,243,234,0.4) 42%, transparent 68%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, var(--color-canvas-base) 0%, transparent 14%, transparent 86%, var(--color-canvas-base) 100%)',
          }}
        />
      </motion.div>

      {/* ────────────────────────────────────────────────────────
          TOP BAR — EYEBROW & ARCHITECTURAL METADATA
          Z-Index: 3
      ──────────────────────────────────────────────────────── */}
      <motion.div
        className="hero-eyebrow-bar"
        initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: isReducedMotion ? 0 : 0.7,
          delay: isReducedMotion ? 0 : 0.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          zIndex: 3,
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              width: '6px',
              height: '6px',
              backgroundColor: 'var(--color-brand-gold)',
              borderRadius: '50%',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.625rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-ink-subtle)',
            }}
          >
            EQUIPMENT & COURT INFRASTRUCTURE · PUNE
          </span>
        </div>

        <div
          className="hero-est-badge"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--color-ink-subtle)',
          }}
        >
          EST. CAMP
        </div>
      </motion.div>

      {/* ────────────────────────────────────────────────────────
          CENTER — ENORMOUS CINEMATIC TYPOGRAPHY
          PLAY. TRAIN. PERFORM.
          Z-Index: 2 (Overlaps athlete photographic canvas)
      ──────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          margin: 'clamp(24px, 4vh, 48px) 0',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.75rem, 13vw, 10.25rem)',
            fontWeight: 800,
            lineHeight: 0.86,
            letterSpacing: '-0.04em',
            textTransform: 'uppercase',
            color: 'var(--color-ink)',
          }}
        >
          {WORDS.map((word, idx) => (
            <span
              key={word}
              style={{
                display: 'block',
                overflow: 'hidden',
                paddingBottom: '0.04em',
              }}
            >
              <motion.span
                style={{
                  display: 'block',
                  willChange: 'transform, opacity',
                }}
                initial={isReducedMotion ? { y: 0, opacity: 1 } : { y: '105%', opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  x: isReducedMotion ? 0 : mousePos.x * -6,
                }}
                transition={{
                  y: {
                    duration: isReducedMotion ? 0 : 0.85,
                    delay: isReducedMotion ? 0 : 0.28 + idx * 0.14,
                    ease: [0.16, 1, 0.3, 1],
                  },
                  opacity: {
                    duration: isReducedMotion ? 0 : 0.85,
                    delay: isReducedMotion ? 0 : 0.28 + idx * 0.14,
                    ease: [0.16, 1, 0.3, 1],
                  },
                  x: { duration: isReducedMotion ? 0 : 0.5, ease: 'easeOut' },
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>
      </div>

      {/* ────────────────────────────────────────────────────────
          BOTTOM BAR — ARCHITECTURAL RULE & PRIMARY ACTIONS
          Z-Index: 3
      ──────────────────────────────────────────────────────── */}
      <motion.div
        className="hero-bottom-bar"
        initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: isReducedMotion ? 0 : 0.75,
          delay: isReducedMotion ? 0 : 0.75,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          zIndex: 3,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {/* Subtle Gold Hairline */}
        <div
          style={{
            width: 'clamp(36px, 4vw, 64px)',
            height: '1.5px',
            backgroundColor: 'var(--color-brand-gold)',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          {/* Action Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <Link to="/shop" style={{ textDecoration: 'none' }} data-cursor="view">
              <MagneticButton
                variant="primary"
                size="md"
                ariaLabel="Explore Pro Sports Gear"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.6875rem, 1.1vw, 0.8125rem)',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '13px 24px',
                  borderRadius: 'var(--radius-xs)',
                  cursor: 'pointer',
                  backgroundColor: 'var(--color-ink)',
                  color: 'var(--color-canvas-base)',
                  border: '1px solid var(--color-ink)',
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
                gap: '8px',
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
                transition: 'opacity 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.55';
                e.currentTarget.style.borderColor = 'var(--color-brand-gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.borderColor = 'var(--color-ink)';
              }}
            >
              TURNKEY COURTS →
            </Link>
          </div>

          {/* Quiet Narrative Tag */}
          <div
            className="hero-narrative-tag"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.625rem',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-ink-subtle)',
            }}
          >
            PUNE SPORTS ARCHIVE & INFRASTRUCTURE
          </div>
        </div>
      </motion.div>

      {/* ────────────────────────────────────────────────────────
          RESPONSIVE ADAPTATIONS (ZERO HORIZONTAL OVERFLOW)
      ──────────────────────────────────────────────────────── */}
      <style>{`
        @media (max-width: 767px) {
          section[aria-label="Oriental Sports — Play. Train. Perform."] {
            min-height: calc(100dvh - var(--header-height-mobile, 60px) - var(--bottom-nav-height, 60px)) !important;
            padding: 16px 20px 24px !important;
          }
          .hero-media-canvas {
            width: 100% !important;
            right: 0 !important;
            opacity: 0.85 !important;
          }
          .hero-media-canvas > div:first-of-type {
            background: linear-gradient(
              to right,
              var(--color-canvas-base) 0%,
              rgba(246,243,234,0.95) 28%,
              rgba(246,243,234,0.65) 65%,
              rgba(246,243,234,0.3) 100%
            ) !important;
          }
          .hero-est-badge,
          .hero-narrative-tag {
            display: none !important;
          }
          section[aria-label="Oriental Sports — Play. Train. Perform."] h1 {
            font-size: clamp(3.15rem, 15.5vw, 5.5rem) !important;
            line-height: 0.88 !important;
          }
        }

        @media (max-width: 360px) {
          section[aria-label="Oriental Sports — Play. Train. Perform."] h1 {
            font-size: 2.85rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;

