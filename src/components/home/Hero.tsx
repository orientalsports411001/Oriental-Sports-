import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Wrench, Shield, Pause, Play } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';
import { BrandRings } from '../brand/BrandRings';
import { MEDIA } from '../../data/media';

interface HeroSlide {
  id: string;
  number: string;
  eyebrow: string;
  headlineWords: string[];
  highlightIndex: number;
  copy: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  image: string;
  alt: string;
  desktopPosition: string;
  mobilePosition: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-01',
    number: '01',
    eyebrow: "PUNE'S SPORTS HOUSE · EST. CAMP",
    headlineWords: ['GEAR.', 'COURTS.', 'PUNE.'],
    highlightIndex: 1, // COURTS.
    copy: "Pune's destination for sports equipment, racquet restringing, and sports court construction. Based at Shop 247, MG Road, Camp.",
    primaryCta: { label: 'SHOP GEAR', href: '/shop' },
    secondaryCta: { label: 'BUILD A COURT', href: '/courts' },
    image: MEDIA.heroSlide1, // Local photorealistic asset: Athlete with racket & bat on illuminated court
    alt: 'Athlete with racquet and bat standing on illuminated sports court during golden hour',
    desktopPosition: 'center 35%',
    mobilePosition: '68% 28%',
  },
  {
    id: 'slide-02',
    number: '02',
    eyebrow: 'PRO-GRADE EQUIPMENT · CRICKET TO PICKLEBALL',
    headlineWords: ['PLAY.', 'TRAIN.', 'PERFORM.'],
    highlightIndex: 1, // TRAIN.
    copy: 'Match-grade cricket willow, tour-level tennis racquets, tournament pickleball paddles, and athlete conditioning equipment ready at our Camp store.',
    primaryCta: { label: 'EXPLORE SPORTS', href: '/shop' },
    secondaryCta: { label: 'VISIT STORE', href: '/visit' },
    image: MEDIA.heroSlide2, // Local photorealistic asset: Mid-air badminton smash in arena spotlight
    alt: 'Dynamic athlete mid-air smash action under stadium spotlights',
    desktopPosition: 'center 25%',
    mobilePosition: '72% 20%',
  },
  {
    id: 'slide-03',
    number: '03',
    eyebrow: 'SPORTS INFRASTRUCTURE & CONSTRUCTION',
    headlineWords: ['WE BUILD.', 'YOU PLAY.'],
    highlightIndex: 1, // YOU PLAY.
    copy: 'Turnkey court construction, professional acrylic surfaces, and sports floodlighting for schools, clubs, and sports facilities in Pune.',
    primaryCta: { label: 'COURT CONSULTATION', href: '/courts' },
    secondaryCta: { label: 'VIEW PROJECTS', href: '/courts/projects' },
    image: MEDIA.heroSlide3, // Local photorealistic asset: Architectural championship court under dusk floodlights
    alt: 'Pristine newly constructed championship sports court illuminated at dusk with floodlights',
    desktopPosition: 'center 45%',
    mobilePosition: '62% 45%',
  },
];

const AUTOPLAY_DURATION_MS = 5500;

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const prefersReducedMotion = useReducedMotion();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchStartTimeRef = useRef<number>(0);

  // Parallax scroll effects across hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const scrollTranslateY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textTranslateY = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const ringsRotate = useTransform(scrollYProgress, [0, 1], [0, 16]);
  const ringsTranslateY = useTransform(scrollYProgress, [0, 1], [0, 35]);

  const slide = HERO_SLIDES[currentSlide];

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const goToSlide = (idx: number) => {
    if (idx === currentSlide) return;
    setDirection(idx > currentSlide ? 1 : -1);
    setCurrentSlide(idx);
  };

  // Autoplay loop with pause on hover/touch
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const timer = setInterval(() => {
      handleNext();
    }, AUTOPLAY_DURATION_MS);
    return () => clearInterval(timer);
  }, [isPaused, handleNext, prefersReducedMotion, currentSlide]);

  // Keyboard navigation support (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only react if not in an input/textarea
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch & Pointer Swipe Gesture Handling for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    touchStartTimeRef.current = Date.now();
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;
    const duration = Date.now() - touchStartTimeRef.current;

    // Minimum swipe distance threshold (40px) and ensure horizontal movement dominates
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2 && duration < 800) {
      if (deltaX < 0) {
        handleNext(); // Swipe Left -> Next
      } else {
        handlePrev(); // Swipe Right -> Previous
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
    setIsPaused(false);
  };

  return (
    <section
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="hero-editorial-section"
      style={{
        position: 'relative',
        backgroundColor: 'var(--color-ink)',
        color: 'var(--color-ivory)',
        minHeight: 'clamp(580px, 82svh, 940px)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: 'clamp(32px, 5vw, 68px)',
        paddingBottom: 'clamp(48px, 7vw, 92px)',
        userSelect: 'none',
      }}
      aria-label="Oriental Sports Hero Editorial Carousel"
    >
      {/* BACKGROUND EDITORIAL VISUAL (Visible Photography + Controlled Gradients) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          overflow: 'hidden',
          backgroundColor: '#111111',
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={slide.id}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
            transition={{
              duration: prefersReducedMotion ? 0.35 : 0.85,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              willChange: 'transform, opacity',
            }}
          >
            <motion.div
              style={{
                width: '100%',
                height: '100%',
                scale: scrollScale,
                y: scrollTranslateY,
              }}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                loading="eager"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: slide.desktopPosition,
                  filter: 'contrast(1.08) brightness(0.96)',
                }}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Controlled Dual-Layer Gradient: 65–75% of Photography Remains Vividly Visible */}
        {/* Layer 1: Left-to-right gradient giving solid reading contrast behind text on left 35%, fading to sheer over the athlete/court */}
        <div
          className="desktop-only"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            background:
              'linear-gradient(to right, rgba(14, 14, 14, 0.88) 0%, rgba(14, 14, 14, 0.62) 36%, rgba(14, 14, 14, 0.22) 72%, rgba(14, 14, 14, 0.08) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Layer 2: Mobile vertical gradient preserving athlete in upper half, grounding typography at bottom */}
        <div
          className="mobile-only-block"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            background:
              'linear-gradient(to top, rgba(14, 14, 14, 0.95) 0%, rgba(14, 14, 14, 0.65) 48%, rgba(14, 14, 14, 0.2) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Layer 3: Soft bottom edge grounding */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '70px',
            background: 'linear-gradient(to top, #111111 0%, transparent 100%)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Kinetic Brand Rings System in Background */}
      <motion.div
        style={{
          position: 'absolute',
          right: '-5%',
          top: '8%',
          zIndex: 2,
          rotate: ringsRotate,
          y: ringsTranslateY,
          pointerEvents: 'none',
        }}
        className="desktop-only"
        aria-hidden="true"
      >
        <BrandRings size={680} opacity={0.16} />
      </motion.div>

      {/* MAIN CONTAINER CONTENT WITH CHOREOGRAPHED KINETIC ENTRANCE */}
      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <motion.div style={{ y: textTranslateY, maxWidth: '860px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: prefersReducedMotion ? 0 : 0.08,
                    delayChildren: 0.04,
                  },
                },
                exit: {
                  opacity: 0,
                  transition: { duration: 0.22 },
                },
              }}
            >
              {/* 1. EYEBROW WITH LIVE INDICATOR */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                  exit: { opacity: 0, y: -8, transition: { duration: 0.18 } },
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '6px 14px',
                  backgroundColor: 'rgba(201, 162, 39, 0.14)',
                  border: '1px solid rgba(201, 162, 39, 0.4)',
                  borderRadius: '2px',
                  marginBottom: 'clamp(14px, 2.5vw, 22px)',
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
                  {slide.eyebrow}
                </span>
              </motion.div>

              {/* 2. KINETIC HEADLINE (Masked Word Reveal with Athletic Condensed Scale) */}
              <h1
                style={{
                  fontFamily: 'var(--font-display-xl)',
                  fontSize: 'clamp(3.25rem, 10.5vw, 8rem)',
                  lineHeight: 0.88,
                  letterSpacing: '-0.035em',
                  textTransform: 'uppercase',
                  margin: '0 0 clamp(16px, 2.5vw, 26px) 0',
                  color: 'var(--color-pure-white)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {slide.headlineWords.map((word, wIdx) => {
                  const isGold = wIdx === slide.highlightIndex;
                  return (
                    <span
                      key={word}
                      style={{
                        display: 'block',
                        overflow: 'hidden',
                        lineHeight: 0.9,
                      }}
                    >
                      <motion.span
                        variants={{
                          hidden: { y: '105%', opacity: 0 },
                          visible: {
                            y: '0%',
                            opacity: 1,
                            transition: {
                              duration: prefersReducedMotion ? 0.2 : 0.65,
                              ease: [0.16, 1, 0.3, 1],
                            },
                          },
                          exit: {
                            y: '-100%',
                            opacity: 0,
                            transition: { duration: 0.22 },
                          },
                        }}
                        style={{
                          display: 'inline-block',
                          color: isGold ? 'var(--color-plate-gold)' : 'var(--color-pure-white)',
                          textShadow: isGold
                            ? '0 0 32px rgba(201, 162, 39, 0.3)'
                            : '0 2px 18px rgba(0,0,0,0.6)',
                        }}
                      >
                        {word}
                      </motion.span>
                    </span>
                  );
                })}
              </h1>

              {/* 3. SUPPORTING EDITORIAL COPY */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                  },
                  exit: { opacity: 0, y: -10, transition: { duration: 0.18 } },
                }}
                style={{
                  fontSize: 'clamp(0.95rem, 2vw, 1.1875rem)',
                  lineHeight: 1.5,
                  color: '#E0DACF',
                  maxWidth: '580px',
                  marginBottom: 'clamp(24px, 3.5vw, 36px)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 400,
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                }}
              >
                {slide.copy}
              </motion.p>

              {/* 4. PRIMARY & SECONDARY ACTION BUTTONS */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                  },
                  exit: { opacity: 0, y: -8, transition: { duration: 0.18 } },
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '14px',
                  marginBottom: 'clamp(24px, 3.5vw, 36px)',
                }}
              >
                <MagneticButton
                  variant="gold"
                  size="lg"
                  onClick={() => (window.location.href = slide.primaryCta.href)}
                >
                  <span>{slide.primaryCta.label}</span>
                  <ArrowRight size={18} />
                </MagneticButton>

                <MagneticButton
                  variant="outline-white"
                  size="lg"
                  onClick={() => (window.location.href = slide.secondaryCta.href)}
                >
                  <span>{slide.secondaryCta.label}</span>
                </MagneticButton>
              </motion.div>

              {/* 5. AUTHENTIC STORE SIGNALS (Confirmed Facts Only) */}
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.5 } },
                  exit: { opacity: 0 },
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 'clamp(14px, 2.5vw, 28px)',
                  paddingTop: '18px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.15)',
                  fontSize: '0.8125rem',
                  color: '#C7C2B6',
                  fontFamily: 'var(--font-ui)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={15} color="var(--color-plate-gold)" />
                  <span>Shop 247, MG Road, Camp, Pune</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Wrench size={15} color="var(--color-plate-gold)" />
                  <span>In-Store Racquet Stringing Counter</span>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* 6. SLIDE CONTROLS: PROGRESS BAR, SLIDE NUMBERS, & MANUAL NAV BUTTONS */}
      <div
        className="hero-controls-bar"
        style={{
          position: 'absolute',
          bottom: 'clamp(16px, 2.5vw, 28px)',
          left: 0,
          right: 0,
          zIndex: 10,
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          {/* Left: Interactive Slide Progress Steps */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {HERO_SLIDES.map((s, idx) => {
              const isActive = idx === currentSlide;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'transparent',
                    border: 'none',
                    padding: '8px 4px',
                    cursor: 'pointer',
                    color: isActive ? 'var(--color-plate-gold)' : '#999',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    minWidth: '44px',
                    minHeight: '44px',
                    textAlign: 'left',
                  }}
                  aria-label={`Go to slide ${idx + 1}: ${s.headlineWords.join(' ')}`}
                >
                  <span>{s.number}</span>
                  {/* Progress Pill Bar */}
                  <div
                    style={{
                      width: isActive ? '52px' : '22px',
                      height: '3px',
                      backgroundColor: 'rgba(255, 255, 255, 0.25)',
                      borderRadius: '2px',
                      overflow: 'hidden',
                      position: 'relative',
                      transition: 'width 0.35s ease',
                    }}
                  >
                    {isActive && (
                      <motion.div
                        key={`bar-${currentSlide}-${isPaused}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration: prefersReducedMotion || isPaused ? 0 : AUTOPLAY_DURATION_MS / 1000,
                          ease: 'linear',
                        }}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: 'var(--color-plate-gold)',
                          transformOrigin: 'left',
                          boxShadow: '0 0 8px var(--color-plate-gold)',
                        }}
                      />
                    )}
                  </div>
                </button>
              );
            })}

            {/* Play/Pause Autoplay Indicator Toggle */}
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              style={{
                background: 'transparent',
                border: 'none',
                color: isPaused ? 'var(--color-plate-gold)' : '#888',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                marginLeft: '4px',
              }}
              title={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
              aria-label={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
            >
              {isPaused ? <Play size={13} /> : <Pause size={13} />}
            </button>
          </div>

          {/* Right: Manual Slide Switchers (>= 44x44px Tap Targets) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                color: '#AAA',
                marginRight: '8px',
                fontVariantNumeric: 'tabular-nums',
              }}
              className="desktop-only"
            >
              {slide.number} / 03
            </span>

            <button
              type="button"
              onClick={handlePrev}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '2px',
                backgroundColor: 'rgba(20, 20, 20, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: 'var(--color-ivory)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              aria-label="Previous Slide"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-plate-gold)';
                e.currentTarget.style.color = 'var(--color-plate-gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.color = 'var(--color-ivory)';
              }}
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '2px',
                backgroundColor: 'rgba(20, 20, 20, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: 'var(--color-ivory)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              aria-label="Next Slide"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-plate-gold)';
                e.currentTarget.style.color = 'var(--color-plate-gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.color = 'var(--color-ivory)';
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
