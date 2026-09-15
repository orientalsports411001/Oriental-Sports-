import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useSpring, AnimatePresence } from 'framer-motion';

/**
 * ORBITAL GALLERY — "THE GAME IN MOTION"
 *
 * Visual Architecture:
 * - Pinned 220vh scroll track with a sticky 100vh 3D perspective stage.
 * - 6 physical sports photographs arranged on an elliptical 3D orbit in space.
 * - True Camera Depth of Field:
 *     Foreground: scale 1.28–1.38, crisp (blur 0), high z-index (20), dominant.
 *     Midground: scale 1.0, clean, transitioning.
 *     Background: scale 0.72, opacity 0.45, camera blur (2–3px), low z-index.
 * - Restrained 2.5D mouse parallax camera tilt on desktop.
 * - Click-to-expand editorial preview with minimal dark glass overlay.
 * - Seamless hand-off: At p > 0.88, stage gracefully lifts and clears ivory canvas for Toray T700.
 * - Mobile: Dynamic responsive radii ensuring zero horizontal scroll overflow.
 */

interface OrbitItem {
  id: string;
  name: string;
  discipline: string;
  image: string;
  aspect: string;
  baseAngle: number;
  yOffset: number;
  spec: string;
}

const ORBIT_ITEMS: OrbitItem[] = [
  {
    id: 'orbit-badminton',
    name: 'CHAMPIONSHIP SMASH',
    discipline: 'BADMINTON',
    image: '/images/hero/hero_train_perform.jpg',
    aspect: '4 / 5',
    baseAngle: 0,
    yOffset: -12,
    spec: 'Aero-Speed Carbon Frame · 4U',
  },
  {
    id: 'orbit-pickleball',
    name: 'TOURNAMENT DINK',
    discipline: 'PICKLEBALL',
    image: '/images/categories/pickleball_category.jpg',
    aspect: '16 / 11',
    baseAngle: (Math.PI * 2) / 6,
    yOffset: 24,
    spec: 'Toray T700 Raw Carbon · 16mm',
  },
  {
    id: 'orbit-cricket',
    name: 'MATCH STADIUM',
    discipline: 'CRICKET',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=85',
    aspect: '16 / 10',
    baseAngle: ((Math.PI * 2) / 6) * 2,
    yOffset: -28,
    spec: 'Grade 1 English Willow · Pune Standard',
  },
  {
    id: 'orbit-tennis',
    name: 'TOUR ALL-COURT',
    discipline: 'TENNIS',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1200&q=85',
    aspect: '4 / 5',
    baseAngle: ((Math.PI * 2) / 6) * 3,
    yOffset: 16,
    spec: 'Tour Pro 300g Graphite Frame',
  },
  {
    id: 'orbit-squash',
    name: 'GLASS COURT SPEED',
    discipline: 'SQUASH',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1200&q=85',
    aspect: '1 / 1',
    baseAngle: ((Math.PI * 2) / 6) * 4,
    yOffset: -16,
    spec: 'Aerodynamic High-Velocity Frame',
  },
  {
    id: 'orbit-courts',
    name: 'TWILIGHT INFRASTRUCTURE',
    discipline: 'COURT ARCHITECTURE',
    image: '/images/hero/hero_court_build.jpg',
    aspect: '16 / 9',
    baseAngle: ((Math.PI * 2) / 6) * 5,
    yOffset: 28,
    spec: 'Turnkey Multi-Sport Surface Construction',
  },
];

export const OrbitalGallery: React.FC = () => {
  const isReducedMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<OrbitItem | null>(null);
  const [mouseCoord, setMouseCoord] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouchDevice(
        window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window
      );
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  // Smooth scroll progression with organic inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  // Handoff to Toray T700: stage gracefully lifts and clears
  const stageOpacity = useTransform(smoothProgress, [0.88, 0.98], [1, 0]);
  const stageY = useTransform(smoothProgress, [0.88, 0.98], [0, -40]);

  // 2.5D Camera mouse tilt
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isReducedMotion || isTouchDevice || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseCoord({ x: x * 14, y: y * 9 });
  };

  const handleMouseLeave = () => {
    setMouseCoord({ x: 0, y: 0 });
  };

  const isMobile = windowWidth <= 480;
  const isTablet = windowWidth <= 900;
  const xRadius = isMobile ? windowWidth * 0.28 : isTablet ? 240 : 420;
  const zRadius = isMobile ? 180 : isTablet ? 240 : 320;

  return (
    <section
      ref={trackRef}
      aria-label="The Game in Motion — Spatial Sports Archive"
      style={{
        position: 'relative',
        backgroundColor: 'var(--color-canvas-base)',
        height: isReducedMotion ? 'auto' : '220vh',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* STICKY 100VH 3D SPATIAL STAGE */}
      <motion.div
        ref={stageRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          position: isReducedMotion ? 'relative' : 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(20px, 3.5vh, 48px) clamp(16px, 4vw, 72px)',
          boxSizing: 'border-box',
          perspective: '1200px',
          opacity: isReducedMotion ? 1 : stageOpacity,
          y: isReducedMotion ? 0 : stageY,
        }}
      >
        {/* ── TOP EDITORIAL HEADER ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            zIndex: 30,
            pointerEvents: 'none',
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
              THE GAME IN MOTION · SPATIAL ARCHIVE
            </span>
          </div>

          <span
            className="orbit-desktop-hint"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5625rem',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-ink-subtle)',
              opacity: 0.65,
            }}
          >
            SCROLL TO ORBIT · CLICK TO EXPAND
          </span>
        </div>

        {/* ── 3D ORBITAL ENVIRONMENT ── */}
        <motion.div
          className="orbit-canvas"
          style={{
            position: 'absolute',
            inset: 0,
            transformStyle: 'preserve-3d',
            pointerEvents: 'none',
            x: isReducedMotion ? 0 : mouseCoord.x,
            y: isReducedMotion ? 0 : mouseCoord.y,
          }}
        >
          {ORBIT_ITEMS.map((item, idx) => (
            <OrbitingCard
              key={item.id}
              item={item}
              index={idx}
              total={ORBIT_ITEMS.length}
              progress={smoothProgress}
              xRadius={xRadius}
              zRadius={zRadius}
              isReducedMotion={Boolean(isReducedMotion)}
              isHovered={hoveredId === item.id}
              onHover={() => setHoveredId(item.id)}
              onLeave={() => setHoveredId(null)}
              onClick={() => setExpandedItem(item)}
            />
          ))}
        </motion.div>

        {/* ── BOTTOM QUIET COORDINATE BAR ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            zIndex: 30,
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5625rem',
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--color-ink-subtle)',
            }}
          >
            CAMP · PUNE · ESTABLISHED ARCHIVE
          </span>

          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5625rem',
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--color-brand-gold)',
            }}
          >
            06 DISCIPLINE FRAMES
          </span>
        </div>
      </motion.div>

      {/* ── EXPANDED EDITORIAL PREVIEW MODAL (LIGHTBOX) ── */}
      <AnimatePresence>
        {expandedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedItem(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999,
              backgroundColor: 'rgba(17, 17, 17, 0.85)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(20px, 4vw, 60px)',
              cursor: 'zoom-out',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                maxWidth: '820px',
                width: '100%',
                backgroundColor: 'var(--color-ink)',
                overflow: 'hidden',
                boxShadow: '0 32px 64px -16px rgba(0,0,0,0.5)',
                cursor: 'default',
              }}
            >
              <img
                src={expandedItem.image}
                alt={expandedItem.name}
                style={{
                  width: '100%',
                  maxHeight: '75vh',
                  objectFit: 'contain',
                  display: 'block',
                  backgroundColor: '#0a0a0a',
                }}
              />

              <div
                style={{
                  padding: '16px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'var(--color-ink)',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--color-brand-gold)',
                    }}
                  >
                    {expandedItem.discipline} · {expandedItem.name}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8125rem',
                      color: 'rgba(255,255,255,0.7)',
                      marginTop: '2px',
                    }}
                  >
                    {expandedItem.spec}
                  </div>
                </div>

                <button
                  onClick={() => setExpandedItem(null)}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    padding: '8px 14px',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                  }}
                >
                  CLOSE [ESC]
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .orbit-desktop-hint {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

interface OrbitingCardProps {
  item: OrbitItem;
  index: number;
  total: number;
  progress: any;
  xRadius: number;
  zRadius: number;
  isReducedMotion: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}

const OrbitingCard: React.FC<OrbitingCardProps> = ({
  item,
  index,
  total,
  progress,
  xRadius,
  zRadius,
  isReducedMotion,
  isHovered,
  onHover,
  onLeave,
  onClick,
}) => {
  // Compute 3D position based on scroll progress:
  // Orbit rotates ~1.3 full revolutions through the 220vh track
  const x = useTransform(progress, (p: number) => {
    if (isReducedMotion) return (index - total / 2) * 120;
    const angle = item.baseAngle + p * Math.PI * 2.2;
    return Math.cos(angle) * xRadius;
  });

  const z = useTransform(progress, (p: number) => {
    if (isReducedMotion) return 0;
    const angle = item.baseAngle + p * Math.PI * 2.2;
    return Math.sin(angle) * zRadius;
  });

  const y = useTransform(progress, (p: number) => {
    if (isReducedMotion) return item.yOffset * 4;
    const angle = item.baseAngle + p * Math.PI * 2.2;
    return item.yOffset + Math.sin(angle * 1.5) * 60;
  });

  // Dynamic Scale: Foreground items expand (1.32), background items recede (0.72)
  const scale = useTransform(z, (depth: number) => {
    if (isReducedMotion) return 1;
    const norm = (depth + zRadius) / (zRadius * 2);
    return 0.72 + norm * 0.6;
  });

  // Camera Depth of Field Blur: Background items blur slightly (2.5px), foreground is 0px
  const filter = useTransform(z, (depth: number) => {
    if (isReducedMotion) return 'none';
    if (depth > 0) return 'blur(0px)';
    const blurAmount = Math.abs(depth / zRadius) * 2.5;
    return `blur(${blurAmount.toFixed(1)}px)`;
  });

  // Strict zIndex layering: Foreground items ALWAYS render on top
  const zIndex = useTransform(z, (depth: number) => {
    return Math.round(10 + (depth / zRadius) * 10);
  });

  const opacity = useTransform(progress, (p: number) => {
    if (p > 0.88) {
      return 1 - (p - 0.88) * 8;
    }
    return 1;
  });

  const rotateY = useTransform(x, (xPos: number) => {
    if (isReducedMotion) return 0;
    return -(xPos / xRadius) * 14;
  });

  const rotateZ = useTransform(x, (xPos: number) => {
    if (isReducedMotion) return 0;
    return (xPos / xRadius) * 4;
  });

  return (
    <motion.div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        x,
        y,
        z,
        zIndex,
        scale: isHovered ? 1.08 : scale,
        opacity,
        filter,
        rotateY,
        rotateZ,
        pointerEvents: 'auto',
        transformOrigin: 'center center',
        cursor: 'zoom-in',
        willChange: 'transform, opacity, filter',
      }}
      className="orbit-card-anchor"
    >
      <div
        style={{
          position: 'relative',
          width: 'clamp(180px, 20vw, 320px)',
          aspectRatio: item.aspect,
          overflow: 'hidden',
          backgroundColor: 'var(--color-ink)',
          boxShadow: isHovered
            ? '0 32px 64px -12px rgba(17, 17, 17, 0.32), 0 0 0 1.5px var(--color-brand-gold)'
            : '0 20px 40px -12px rgba(17, 17, 17, 0.16)',
          transform: 'translate(-50%, -50%)',
          transition: 'box-shadow 0.3s ease, border 0.3s ease',
        }}
      >
        <img
          src={item.image}
          alt={item.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            filter: isHovered ? 'brightness(1.05)' : 'brightness(0.95)',
            transition: 'filter 0.3s ease',
          }}
          loading="lazy"
        />

        {/* Feathered Dark Vignette at bottom */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, transparent 45%, rgba(17, 17, 17, 0.72) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Tiny Editorial Discipline Badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '12px',
            right: '12px',
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5625rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
            }}
          >
            {item.discipline}
          </span>

          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-brand-gold)',
            }}
          >
            ARCHIVE
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default OrbitalGallery;
