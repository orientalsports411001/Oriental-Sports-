import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { MEDIA } from '../../data/media';
import { GlassPanel } from '../ui/GlassPanel';
import { MagneticButton } from '../ui/MagneticButton';

interface HeroSlide {
  id: string;
  number: string;
  categoryTag: string;
  headlineWords: [string, string, string];
  copy: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image: string;
  alt: string;
  accent: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-01',
    number: '01',
    categoryTag: 'PUNE’S SPORTS HOUSE · EST. CAMP',
    headlineWords: ['GEAR.', 'COURTS.', 'PUNE.'],
    copy: "Pune’s independent sports house. Gear for the game. Courts for the city. Based at Shop 247, MG Road, Camp.",
    primaryCta: { label: 'SHOP SPORTS', href: '/shop' },
    secondaryCta: { label: 'BUILD A COURT', href: '/courts' },
    image: MEDIA.heroSlide1,
    alt: 'Athletes with tournament equipment standing on illuminated court at dusk',
    accent: 'var(--color-electric-blue)',
  },
  {
    id: 'slide-02',
    number: '02',
    categoryTag: 'TOURNAMENT EQUIPMENT & SERVICES',
    headlineWords: ['PLAY.', 'TRAIN.', 'PERFORM.'],
    copy: 'Curated English willow, high-modulus graphite badminton frames, raw carbon pickleball paddles, and master stringing in Camp.',
    primaryCta: { label: 'EXPLORE GEAR', href: '/shop' },
    secondaryCta: { label: 'VISIT STORE', href: '/visit' },
    image: MEDIA.heroSlide2,
    alt: 'Dynamic athlete executing powerful badminton smash under arena spotlights',
    accent: 'var(--color-plate-gold)',
  },
  {
    id: 'slide-03',
    number: '03',
    categoryTag: 'INFRASTRUCTURE DIVISION',
    headlineWords: ['WE BUILD.', 'YOU', 'PLAY.'],
    copy: 'Turnkey sports surfaces, laser-guided sub-base grading, acrylic cushion courts, and sports floodlighting across Pune.',
    primaryCta: { label: 'EXPLORE PROJECTS', href: '/courts/projects' },
    secondaryCta: { label: 'COURT SETUP', href: '/courts' },
    image: MEDIA.heroSlide3,
    alt: 'Turnkey championship acrylic court illuminated at twilight',
    accent: 'var(--color-safety-orange)',
  },
];

const AUTOPLAY_MS = 5500;

export const Hero: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const activeSlide = HERO_SLIDES[currentIdx];

  const nextSlide = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIdx((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Autoplay loop with hover/focus pause
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide, currentIdx]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Subtle 3D mouse parallax on hero imagery
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 14, y: y * 14 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
    setIsPaused(false);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.targetTouches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (!touchStartX.current) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (diff > 50) nextSlide();
        if (diff < -50) prevSlide();
        touchStartX.current = null;
      }}
      aria-roledescription="carousel"
      aria-label="Oriental Sports Hero Showcase"
      style={{
        position: 'relative',
        backgroundColor: '#111111',
        minHeight: 'clamp(540px, 86vh, 760px)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Background Images with 3D Parallax Tilt */}
      {HERO_SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          style={{
            position: 'absolute',
            inset: '-20px',
            opacity: idx === currentIdx ? 1 : 0,
            transform:
              idx === currentIdx
                ? `scale(1.05) translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`
                : 'scale(1.1) translate3d(0,0,0)',
            transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.15s ease-out',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 32%',
            }}
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1800&q=85';
            }}
          />
          {/* Multi-layered cinematic gradient: deep at bottom and sides, clear in center */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(17,17,17,0.35) 0%, rgba(17,17,17,0.2) 30%, rgba(17,17,17,0.85) 85%, rgba(17,17,17,0.96) 100%)',
            }}
          />
        </div>
      ))}

      {/* Top Metadata Rail */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 4,
          paddingTop: 'clamp(20px, 3vw, 32px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#FFFFFF',
          fontSize: '0.6875rem',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: activeSlide.accent, fontWeight: 800 }}>
            {activeSlide.number} / 03
          </span>
          <span style={{ color: 'rgba(255,255,255,0.7)' }}>{activeSlide.categoryTag}</span>
        </div>
        <div className="desktop-only" style={{ color: 'rgba(255,255,255,0.5)' }}>
          SPORT / EQUIPMENT / INFRASTRUCTURE
        </div>
      </div>

      {/* Hero Colliding Typography & Editorial Content */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 4,
          paddingBottom: 'clamp(32px, 6vw, 64px)',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'flex-end',
          gap: '32px',
        }}
      >
        <div style={{ maxWidth: '820px' }}>
          {/* Giant Colliding Typography */}
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(3.25rem, 8.5vw, 6.75rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.04em',
              color: '#FFFFFF',
              margin: '0 0 20px 0',
              textShadow: '0 4px 24px rgba(0,0,0,0.5)',
            }}
          >
            {activeSlide.headlineWords[0]}<br />
            {activeSlide.headlineWords[1]}<br />
            <span style={{ color: activeSlide.accent }}>{activeSlide.headlineWords[2]}</span>
          </h1>

          {/* Editorial Copy */}
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              lineHeight: 1.45,
              color: '#EDE8DE',
              maxWidth: '560px',
              margin: '0 0 32px 0',
              textShadow: '0 2px 12px rgba(0,0,0,0.6)',
            }}
          >
            {activeSlide.copy}
          </p>

          {/* Magnetic Action Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
            <Link
              to={activeSlide.primaryCta.href}
              className="btn btn-cobalt btn-lg"
              data-cursor="pointer"
              style={{
                borderRadius: 'var(--radius-pill)',
                padding: '16px 36px',
                fontWeight: 800,
                fontSize: '0.9375rem',
                letterSpacing: '0.04em',
              }}
            >
              <span>{activeSlide.primaryCta.label}</span>
              <ArrowRight size={18} />
            </Link>

            {activeSlide.secondaryCta && (
              <Link
                to={activeSlide.secondaryCta.href}
                className="btn btn-glass btn-lg"
                data-cursor="pointer"
                style={{
                  borderRadius: 'var(--radius-pill)',
                  padding: '16px 32px',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                }}
              >
                <span>{activeSlide.secondaryCta.label}</span>
              </Link>
            )}
          </div>
        </div>

        {/* Floating Liquid Glass Control Rail */}
        <div style={{ alignSelf: 'flex-end' }}>
          <GlassPanel
            variant="dark"
            style={{
              padding: '12px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              borderRadius: 'var(--radius-pill)',
            }}
          >
            <div style={{ display: 'flex', gap: '6px' }}>
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setCurrentIdx(idx)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-pill)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    fontWeight: 800,
                    backgroundColor: idx === currentIdx ? activeSlide.accent : 'rgba(255, 255, 255, 0.15)',
                    color: idx === currentIdx ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                    transition: 'all var(--transition-fast)',
                  }}
                  data-cursor="pointer"
                  aria-label={`Go to hero slide ${s.number}`}
                >
                  {s.number}
                </button>
              ))}
            </div>

            <div style={{ width: '1px', height: '20px', backgroundColor: 'rgba(255,255,255,0.2)' }} />

            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                type="button"
                onClick={prevSlide}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                }}
                aria-label="Previous hero slide"
                data-cursor="pointer"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                }}
                aria-label="Next hero slide"
                data-cursor="pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
};
