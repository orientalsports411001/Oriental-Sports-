import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion, Variants } from 'framer-motion';
import { CATEGORIES } from '../../data/categories';

// Display the 7 core sports
const SPORT_DISCIPLINES = CATEGORIES.slice(0, 7);

const EASE_EDITORIAL = [0.16, 1, 0.3, 1] as const;

export const ShopBySport: React.FC = () => {
  const isReducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(SPORT_DISCIPLINES[0]?.id ?? '');
  const [direction, setDirection] = useState<number>(1);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouchDevice(
        window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window
      );
    }
  }, []);

  const activeIndex = SPORT_DISCIPLINES.findIndex(c => c.id === activeId);
  const activeCat = SPORT_DISCIPLINES[activeIndex] ?? SPORT_DISCIPLINES[0];

  const handleSelectSport = (id: string) => {
    if (id === activeId) return;
    const newIndex = SPORT_DISCIPLINES.findIndex(c => c.id === id);
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveId(id);
  };

  // Subtle 2.5D mouse parallax for image frame
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion || isTouchDevice || !imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
    const yRatio = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: xRatio * 16, y: yRatio * 12 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  // Cinematic masked image transition variants
  const imageVariants: Variants = {
    enter: (dir: number) => ({
      clipPath: dir > 0 ? 'inset(0% 0% 100% 0%)' : 'inset(100% 0% 0% 0%)',
      scale: 1.06,
      y: dir > 0 ? 24 : -24,
      opacity: 0.8,
    }),
    center: {
      clipPath: 'inset(0% 0% 0% 0%)',
      scale: 1.0,
      y: 0,
      opacity: 1,
      transition: {
        clipPath: { duration: 0.68, ease: EASE_EDITORIAL },
        scale: { duration: 0.78, ease: EASE_EDITORIAL },
        y: { duration: 0.68, ease: EASE_EDITORIAL },
        opacity: { duration: 0.4, ease: 'easeOut' },
      },
    },
    exit: (dir: number) => ({
      clipPath: dir > 0 ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
      scale: 0.96,
      y: dir > 0 ? -20 : 20,
      opacity: 0.3,
      transition: {
        clipPath: { duration: 0.55, ease: EASE_EDITORIAL },
        scale: { duration: 0.6, ease: EASE_EDITORIAL },
        y: { duration: 0.55, ease: EASE_EDITORIAL },
        opacity: { duration: 0.35, ease: 'easeIn' },
      },
    }),
  };

  const reducedMotionVariants: Variants = {
    enter: { opacity: 0 },
    center: { opacity: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <section
      ref={containerRef}
      aria-label="Sports Index — Pro Equipment Disciplines"
      style={{
        backgroundColor: 'var(--color-canvas-base)',
        padding: 'clamp(80px, 12vw, 150px) 0',
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        className="sport-index-container"
        style={{
          maxWidth: 'var(--max-width-content)',
          margin: '0 auto',
          padding: '0 clamp(20px, 5vw, 72px)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
          gap: 'clamp(40px, 6vw, 96px)',
          alignItems: 'center',
        }}
      >
        {/* ────────────────────────────────────────────────────────
            LEFT — EDITORIAL TYPOGRAPHIC DISCIPLINE LIST
        ──────────────────────────────────────────────────────── */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* Eyebrow label */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: 'clamp(24px, 3.5vh, 40px)',
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
              DISCIPLINES · PRO ARCHIVE
            </span>
          </div>

          {/* Interactive Sport Items */}
          <nav aria-label="Discipline Selector" style={{ display: 'flex', flexDirection: 'column' }}>
            {SPORT_DISCIPLINES.map((cat, i) => {
              const isActive = cat.id === activeId;
              return (
                <Link
                  key={cat.id}
                  to={`/shop/${cat.id}`}
                  onMouseEnter={() => handleSelectSport(cat.id)}
                  onFocus={() => handleSelectSport(cat.id)}
                  onClick={(e) => {
                    // On touch devices, first tap activates the sport to view image transition; second tap navigates
                    if (isTouchDevice && !isActive) {
                      e.preventDefault();
                      handleSelectSport(cat.id);
                    }
                  }}
                  aria-current={isActive ? 'true' : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'clamp(14px, 2vh, 22px) 0',
                    borderBottom:
                      i < SPORT_DISCIPLINES.length - 1
                        ? '1px solid var(--color-border-subtle)'
                        : 'none',
                    textDecoration: 'none',
                    position: 'relative',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                >
                  {/* Active Indicator & Name */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <motion.div
                      style={{
                        width: '4px',
                        height: 'clamp(20px, 3vw, 32px)',
                        backgroundColor: 'var(--color-brand-gold)',
                        borderRadius: '2px',
                        transformOrigin: 'center',
                      }}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        scaleY: isActive ? 1 : 0,
                      }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    />

                    <motion.span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(2.25rem, 5.2vw, 4.5rem)',
                        fontWeight: 800,
                        letterSpacing: '-0.035em',
                        textTransform: 'uppercase',
                        color: 'var(--color-ink)',
                        lineHeight: 0.95,
                        display: 'inline-block',
                      }}
                      animate={{
                        x: isReducedMotion ? 0 : isActive ? 8 : 0,
                        opacity: isActive ? 1 : 0.24,
                      }}
                      transition={{
                        x: { type: 'spring', stiffness: 380, damping: 28 },
                        opacity: { duration: 0.24 },
                      }}
                    >
                      {cat.name}
                    </motion.span>
                  </div>

                  {/* Real Product Count with Animated Vertical Flip */}
                  <div
                    style={{
                      overflow: 'hidden',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.span
                          key={`${cat.id}-${cat.itemCount}`}
                          initial={isReducedMotion ? { opacity: 1 } : { y: 16, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={isReducedMotion ? { opacity: 0 } : { y: -16, opacity: 0 }}
                          transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 'clamp(0.6875rem, 1vw, 0.8125rem)',
                            fontWeight: 700,
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: 'var(--color-brand-gold)',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {cat.itemCount} GEAR ITEMS →
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* ────────────────────────────────────────────────────────
            RIGHT — CINEMATIC MASKED PHOTOGRAPHIC CANVAS
            Responsive 2.5D mouse depth & directional reveal
        ──────────────────────────────────────────────────────── */}
        <div
          ref={imageContainerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="sport-image-wrapper"
          style={{
            position: 'relative',
            aspectRatio: '3 / 4',
            width: '100%',
            maxWidth: '540px',
            margin: '0 auto',
            overflow: 'hidden',
            backgroundColor: 'var(--color-ink)',
            boxShadow: '0 24px 48px -12px rgba(17, 17, 17, 0.08)',
          }}
        >
          {/* Animated Image Stack */}
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeCat.id}
              custom={direction}
              variants={isReducedMotion ? reducedMotionVariants : imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                willChange: 'transform, clip-path, opacity',
              }}
            >
              <motion.img
                src={activeCat.image}
                alt={`${activeCat.name} equipment and match action`}
                animate={{
                  x: isReducedMotion ? 0 : mouseOffset.x,
                  y: isReducedMotion ? 0 : mouseOffset.y,
                }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                  transformOrigin: 'center center',
                }}
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=900&q=80';
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Deep Vignette Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(17,17,17,0.1) 0%, transparent 45%, rgba(17,17,17,0.72) 100%)',
              pointerEvents: 'none',
              zIndex: 3,
            }}
          />

          {/* Top Discipline Index Tag */}
          <div
            style={{
              position: 'absolute',
              top: 'clamp(16px, 2.5vw, 24px)',
              left: 'clamp(16px, 2.5vw, 24px)',
              zIndex: 4,
              pointerEvents: 'none',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                backgroundColor: 'rgba(17, 17, 17, 0.55)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-xs)',
              }}
            >
              PUNE ARCHIVE · {activeCat.name.toUpperCase()}
            </span>
          </div>

          {/* Bottom Editorial Caption */}
          <div
            style={{
              position: 'absolute',
              bottom: 'clamp(18px, 3vw, 28px)',
              left: 'clamp(18px, 3vw, 28px)',
              right: 'clamp(18px, 3vw, 28px)',
              zIndex: 4,
              pointerEvents: 'none',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCat.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'var(--color-brand-gold)',
                    marginBottom: '4px',
                  }}
                >
                  SPECIFICATIONS & MATCH GEAR
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.8125rem',
                    lineHeight: 1.35,
                    color: 'rgba(255,255,255,0.92)',
                    fontWeight: 500,
                  }}
                >
                  {activeCat.tagline}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          RESPONSIVE ADAPTATIONS (MOBILE OPTIMIZED)
      ──────────────────────────────────────────────────────── */}
      <style>{`
        @media (max-width: 900px) {
          .sport-index-container {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .sport-image-wrapper {
            order: -1;
            aspect-ratio: 16 / 10 !important;
            max-width: 100% !important;
          }
        }

        @media (max-width: 480px) {
          .sport-image-wrapper {
            aspect-ratio: 4 / 3 !important;
          }
          nav[aria-label="Discipline Selector"] a {
            padding: 12px 0 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ShopBySport;
