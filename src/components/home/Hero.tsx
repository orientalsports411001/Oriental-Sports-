import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Truck, MapPin, Zap } from 'lucide-react';
import { MEDIA } from '../../data/media';

interface HeroSlide {
  id: string;
  number: string;
  categoryTag: string;
  tabTitle: string;
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
    tabTitle: 'PRO EQUIPMENT & GEAR',
    headlineWords: ['GEAR.', 'COURTS.', 'PUNE.'],
    copy: "Pune’s independent sports house. Curated match equipment for serious athletes, clubs, and court builders across Maharashtra.",
    primaryCta: { label: 'SHOP SPORTS GEAR', href: '/shop' },
    secondaryCta: { label: 'BUILD A COURT', href: '/courts' },
    image: MEDIA.heroSlide1,
    alt: 'Athletes with tournament equipment standing on illuminated court at dusk',
    accent: 'var(--color-electric-blue)',
  },
  {
    id: 'slide-02',
    number: '02',
    categoryTag: 'TOURNAMENT EQUIPMENT & SERVICES',
    tabTitle: 'TOURNAMENT PERFORMANCE',
    headlineWords: ['PLAY.', 'TRAIN.', 'PERFORM.'],
    copy: 'Curated English willow, high-modulus graphite badminton frames, raw carbon pickleball paddles, and master racket stringing in Camp.',
    primaryCta: { label: 'EXPLORE RACQUETS & BATS', href: '/shop' },
    secondaryCta: { label: 'VISIT CAMP STORE', href: '/visit' },
    image: MEDIA.heroSlide2,
    alt: 'Dynamic athlete executing powerful badminton smash under arena spotlights',
    accent: 'var(--color-plate-gold)',
  },
  {
    id: 'slide-03',
    number: '03',
    categoryTag: 'INFRASTRUCTURE DIVISION',
    tabTitle: 'COURT BUILD & RESURFACING',
    headlineWords: ['WE BUILD.', 'YOU', 'PLAY.'],
    copy: 'Turnkey sports surfaces, laser-guided sub-base grading, acrylic cushion courts, and sports floodlighting across Pune & PCMC.',
    primaryCta: { label: 'EXPLORE COURT PROJECTS', href: '/courts/projects' },
    secondaryCta: { label: 'REQUEST COURT QUOTE', href: '/courts' },
    image: MEDIA.heroSlide3,
    alt: 'Turnkey championship acrylic court illuminated at twilight',
    accent: 'var(--color-safety-orange)',
  },
];

const AUTOPLAY_MS = 6000;

const QUICK_CATEGORIES = [
  { label: 'Badminton', href: '/shop/badminton' },
  { label: 'Pickleball', href: '/shop/pickleball' },
  { label: 'Cricket', href: '/shop/cricket' },
  { label: 'Tennis', href: '/shop/tennis' },
  { label: 'Table Tennis', href: '/shop/table-tennis' },
  { label: 'Court Infrastructure', href: '/courts' },
];

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
    setMouseOffset({ x: x * 12, y: y * 12 });
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
      aria-label="Oriental Sports Store Showcase"
      style={{
        position: 'relative',
        backgroundColor: '#111111',
        minHeight: 'clamp(580px, 88vh, 800px)',
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
                ? `scale(1.04) translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`
                : 'scale(1.08) translate3d(0,0,0)',
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
                'linear-gradient(180deg, rgba(14,16,20,0.42) 0%, rgba(14,16,20,0.2) 30%, rgba(14,16,20,0.85) 80%, rgba(14,16,20,0.98) 100%)',
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

      {/* Desktop Discreet Side Edge Navigation Arrows */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous banner"
        className="hero-nav-arrow desktop-only"
        style={{
          position: 'absolute',
          left: '24px',
          top: '46%',
          zIndex: 6,
        }}
      >
        <ChevronLeft size={22} />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next banner"
        className="hero-nav-arrow desktop-only"
        style={{
          position: 'absolute',
          right: '24px',
          top: '46%',
          zIndex: 6,
        }}
      >
        <ChevronRight size={22} />
      </button>

      {/* Hero Colliding Typography & Commercial Actions */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 4,
          paddingTop: 'clamp(24px, 4vw, 48px)',
          paddingBottom: 'clamp(32px, 5vw, 56px)',
          maxWidth: '1200px',
        }}
      >
        <div style={{ maxWidth: '840px' }}>
          {/* Giant Colliding Typography */}
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(3.25rem, 8vw, 6.5rem)',
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
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              lineHeight: 1.45,
              color: '#EDE8DE',
              maxWidth: '580px',
              margin: '0 0 28px 0',
              textShadow: '0 2px 12px rgba(0,0,0,0.6)',
            }}
          >
            {activeSlide.copy}
          </p>

          {/* Primary & Secondary Commercial CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center', marginBottom: '24px' }}>
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

          {/* Quick Direct-Shop Category Access Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px',
              paddingTop: '8px',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'rgba(255, 255, 255, 0.75)',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginRight: '6px',
              }}
            >
              <Zap size={14} color="var(--color-plate-gold)" />
              <span>Direct Shop:</span>
            </div>

            {QUICK_CATEGORIES.map((cat) => (
              <Link
                key={cat.label}
                to={cat.href}
                className="hero-quick-chip"
                data-cursor="pointer"
              >
                {cat.label}
              </Link>
            ))}
          </div>

          {/* Trust Signals Strip */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '18px',
              marginTop: '16px',
              fontSize: '0.75rem',
              color: 'rgba(255, 255, 255, 0.65)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Truck size={13} color="var(--color-electric-blue)" />
              Same-Day Pune Dispatch
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={13} color="var(--color-plate-gold)" />
              100% Genuine Authorized Gear
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={13} color="var(--color-safety-orange)" />
              MG Road, Camp · Since 1974
            </span>
          </div>
        </div>
      </div>

      {/* Modern E-Commerce Progress Indicators & Slide Selector Rail */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          borderTop: '1px solid rgba(255, 255, 255, 0.14)',
          backgroundColor: 'rgba(10, 12, 16, 0.72)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <div className="container" style={{ padding: '14px 20px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              alignItems: 'center',
            }}
          >
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === currentIdx;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setCurrentIdx(idx)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '6px 0',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    transition: 'opacity 0.25s ease',
                    opacity: isActive ? 1 : 0.5,
                  }}
                  aria-label={`Switch to banner ${slide.tabTitle}`}
                >
                  {/* Progress Line Track */}
                  <div
                    style={{
                      width: '100%',
                      height: '3px',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '2px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      key={`progress-${idx}-${currentIdx}-${isPaused}`}
                      style={{
                        height: '100%',
                        backgroundColor: isActive ? slide.accent : 'transparent',
                        width: isActive ? '100%' : '0%',
                        animation: isActive && !isPaused ? `heroProgress ${AUTOPLAY_MS}ms linear forwards` : 'none',
                      }}
                    />
                  </div>

                  {/* Segment Details */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span
                      style={{
                        fontSize: 'clamp(0.6875rem, 1.1vw, 0.8125rem)',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {slide.tabTitle}
                    </span>
                    <span
                      style={{
                        fontSize: '0.6875rem',
                        fontFamily: 'var(--font-mono)',
                        color: isActive ? slide.accent : 'rgba(255, 255, 255, 0.4)',
                        fontWeight: 800,
                        marginLeft: '8px',
                      }}
                    >
                      0{idx + 1}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
