import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Wrench, Pause, Play } from 'lucide-react';
import { MEDIA } from '../../data/media';

interface HeroSlide {
  id: string;
  number: string;
  eyebrow: string;
  headlineWords: string[];
  highlightIndex: number;
  highlightColor: string;
  copy: string;
  primaryCta: { label: string; href: string; color: string };
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
    highlightColor: 'var(--color-electric-blue)',
    copy: "Pune's independent destination for sports gear, racquet restringing, and sports court construction. Based at Shop 247, MG Road, Camp.",
    primaryCta: { label: 'SHOP THE GEAR →', href: '/shop', color: 'btn-blue' },
    secondaryCta: { label: 'BUILD A COURT →', href: '/courts' },
    image: MEDIA.heroSlide1, // Athlete on illuminated championship court
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
    highlightColor: 'var(--color-tangerine)',
    copy: 'Curated cricket willow, tour-level tennis racquets, tournament pickleball paddles, and athletic conditioning equipment ready at our Camp store.',
    primaryCta: { label: 'EXPLORE SPORTS →', href: '/shop', color: 'btn-orange' },
    secondaryCta: { label: 'VISIT STORE →', href: '/visit' },
    image: MEDIA.heroSlide2, // Mid-air badminton smash
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
    highlightColor: 'var(--color-lime)',
    copy: 'Turnkey court construction, professional acrylic surfaces, and sports floodlighting for schools, clubs, and sports facilities in Pune.',
    primaryCta: { label: 'COURT CONSULTATION →', href: '/courts', color: 'btn-blue' },
    secondaryCta: { label: 'VIEW PROJECTS →', href: '/courts/projects' },
    image: MEDIA.heroSlide3, // Championship court under dusk lights
    alt: 'Pristine newly constructed championship sports court illuminated at dusk with floodlights',
    desktopPosition: 'center 45%',
    mobilePosition: '62% 45%',
  },
];

const AUTOPLAY_DURATION_MS = 5500;

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchStartTimeRef = useRef<number>(0);

  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const scrollTranslateY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const textTranslateY = useTransform(scrollYProgress, [0, 1], [0, 35]);

  const slide = HERO_SLIDES[currentSlide];

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const goToSlide = (idx: number) => {
    if (idx === currentSlide) return;
    setCurrentSlide(idx);
  };

  // Autoplay loop with pause on hover/interaction
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const timer = setInterval(() => {
      handleNext();
    }, AUTOPLAY_DURATION_MS);
    return () => clearInterval(timer);
  }, [isPaused, handleNext, prefersReducedMotion, currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) return;
      if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch Swipe for Mobile
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

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2 && duration < 800) {
      if (deltaX < 0) handleNext();
      else handlePrev();
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
      style={{
        position: 'relative',
        backgroundColor: 'var(--color-cream-bg)',
        color: '#FFFFFF',
        minHeight: 'clamp(560px, 80svh, 880px)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: 'clamp(28px, 4vw, 56px)',
        paddingBottom: 'clamp(44px, 6vw, 84px)',
      }}
      aria-label="Oriental Sports Hero Editorial Showcase"
    >
      {/* Background Editorial Visual with Smooth Transitions */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          overflow: 'hidden',
          backgroundColor: '#1E2333',
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={slide.id}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.05 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.03 }}
            transition={{
              duration: prefersReducedMotion ? 0.3 : 0.8,
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
                  filter: 'contrast(1.06) brightness(0.95)',
                }}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Controlled Gradient Overlays (Ensuring 70%+ Image Visibility) */}
        <div
          className="desktop-only"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            background:
              'linear-gradient(to right, rgba(14, 19, 38, 0.88) 0%, rgba(14, 19, 38, 0.60) 38%, rgba(14, 19, 38, 0.20) 70%, rgba(14, 19, 38, 0.05) 100%)',
            pointerEvents: 'none',
          }}
        />

        <div
          className="mobile-only-block"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            background:
              'linear-gradient(to top, rgba(14, 19, 38, 0.95) 0%, rgba(14, 19, 38, 0.60) 50%, rgba(14, 19, 38, 0.15) 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Main Container Content */}
      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <motion.div style={{ y: textTranslateY, maxWidth: '840px' }}>
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
                    staggerChildren: prefersReducedMotion ? 0 : 0.07,
                    delayChildren: 0.03,
                  },
                },
                exit: {
                  opacity: 0,
                  transition: { duration: 0.2 },
                },
              }}
            >
              {/* Eyebrow Badge */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                  exit: { opacity: 0, y: -6 },
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  backgroundColor: 'rgba(255, 255, 255, 0.18)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '9999px',
                  marginBottom: 'clamp(14px, 2.5vw, 20px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-lime)',
                    boxShadow: '0 0 8px var(--color-lime)',
                  }}
                  aria-hidden="true"
                />
                <span
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 800,
                    fontSize: '0.75rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#FFFFFF',
                  }}
                >
                  {slide.eyebrow}
                </span>
              </motion.div>

              {/* Headline with Staggered Word Reveal */}
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3.25rem, 9.5vw, 7.5rem)',
                  lineHeight: 0.92,
                  letterSpacing: '-0.03em',
                  textTransform: 'uppercase',
                  margin: '0 0 clamp(16px, 2.5vw, 24px) 0',
                  color: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {slide.headlineWords.map((word, wIdx) => {
                  const isHighlighted = wIdx === slide.highlightIndex;
                  return (
                    <span
                      key={word}
                      style={{
                        display: 'block',
                        overflow: 'hidden',
                        lineHeight: 0.92,
                      }}
                    >
                      <motion.span
                        variants={{
                          hidden: { y: '105%', opacity: 0 },
                          visible: {
                            y: '0%',
                            opacity: 1,
                            transition: {
                              duration: prefersReducedMotion ? 0.2 : 0.6,
                              ease: [0.16, 1, 0.3, 1],
                            },
                          },
                          exit: {
                            y: '-100%',
                            opacity: 0,
                            transition: { duration: 0.2 },
                          },
                        }}
                        style={{
                          display: 'inline-block',
                          color: isHighlighted ? slide.highlightColor : '#FFFFFF',
                          textShadow: '0 2px 16px rgba(0,0,0,0.5)',
                        }}
                      >
                        {word}
                      </motion.span>
                    </span>
                  );
                })}
              </h1>

              {/* Supporting Copy */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  exit: { opacity: 0, y: -8 },
                }}
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.1875rem)',
                  lineHeight: 1.5,
                  color: '#F0ECE1',
                  maxWidth: '560px',
                  marginBottom: 'clamp(24px, 3.5vw, 32px)',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 500,
                  textShadow: '0 1px 8px rgba(0,0,0,0.6)',
                }}
              >
                {slide.copy}
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  exit: { opacity: 0, y: -6 },
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '14px',
                  marginBottom: 'clamp(24px, 3.5vw, 32px)',
                }}
              >
                <a
                  href={slide.primaryCta.href}
                  className={`btn ${slide.primaryCta.color}`}
                  style={{
                    padding: '14px 28px',
                    fontSize: '0.9375rem',
                  }}
                >
                  <span>{slide.primaryCta.label}</span>
                </a>

                <a
                  href={slide.secondaryCta.href}
                  className="btn btn-outline-white"
                  style={{
                    padding: '14px 28px',
                    fontSize: '0.9375rem',
                  }}
                >
                  <span>{slide.secondaryCta.label}</span>
                </a>
              </motion.div>

              {/* Grounded Store Signals */}
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
                  gap: 'clamp(14px, 2.5vw, 24px)',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                  fontSize: '0.8125rem',
                  color: '#E6E1D8',
                  fontFamily: 'var(--font-ui)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={14} color="var(--color-lime)" />
                  <span>Shop 247, MG Road, Camp, Pune</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Wrench size={14} color="var(--color-lime)" />
                  <span>In-Store Racquet Stringing Counter</span>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Slide Controls Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(16px, 2.5vw, 24px)',
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
            gap: '12px',
          }}
        >
          {/* Slide Indicator Buttons with Progress Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
                    color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.8125rem',
                    fontWeight: 800,
                    minWidth: '44px',
                    minHeight: '44px',
                  }}
                  aria-label={`Slide ${idx + 1}`}
                >
                  <span>{s.number}</span>
                  <div
                    style={{
                      width: isActive ? '48px' : '18px',
                      height: '4px',
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      borderRadius: '9999px',
                      overflow: 'hidden',
                      position: 'relative',
                      transition: 'width 0.3s ease',
                    }}
                  >
                    {isActive && (
                      <motion.div
                        key={`hero-progress-${currentSlide}-${isPaused}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration: prefersReducedMotion || isPaused ? 0 : AUTOPLAY_DURATION_MS / 1000,
                          ease: 'linear',
                        }}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: 'var(--color-lime)',
                          transformOrigin: 'left',
                        }}
                      />
                    )}
                  </div>
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: 'none',
                color: '#FFFFFF',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                marginLeft: '4px',
              }}
              aria-label={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
            >
              {isPaused ? <Play size={13} /> : <Pause size={13} />}
            </button>
          </div>

          {/* Manual Chevrons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.8125rem',
                fontWeight: 700,
                color: 'rgba(255, 255, 255, 0.7)',
                marginRight: '8px',
              }}
              className="desktop-only"
            >
              0{currentSlide + 1} / 03
            </span>

            <button
              type="button"
              onClick={handlePrev}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.18)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              aria-label="Previous Slide"
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-electric-blue)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)')}
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.18)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              aria-label="Next Slide"
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-electric-blue)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)')}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
