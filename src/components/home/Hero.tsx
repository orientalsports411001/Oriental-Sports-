import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { MEDIA } from '../../data/media';

interface HeroSlide {
  id: string;
  categoryTag: string;
  headline: string;
  copy: string;
  cta: { label: string; href: string };
  image: string;
  alt: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-01',
    categoryTag: 'RACQUET SPORTS • PUNE',
    headline: 'PLAY. TRAIN. PERFORM.',
    copy: 'Curated match equipment, high-modulus frames, and precision stringing for competitive athletes across Maharashtra.',
    cta: { label: 'SHOP RACQUET SPORTS', href: '/shop' },
    image: MEDIA.heroSlide1,
    alt: 'Athletes with tournament equipment on illuminated sports court in Pune',
  },
  {
    id: 'slide-02',
    categoryTag: 'GRADE 1 WILLOW • CRICKET',
    headline: 'PRECISION IN EVERY STROKE.',
    copy: 'Handcrafted English willow clefts, moulded protective gear, and match balls tailored for Indian pitch conditions.',
    cta: { label: 'SHOP CRICKET', href: '/shop/cricket' },
    image: MEDIA.heroSlide2,
    alt: 'Dynamic athlete executing precision stroke under stadium floodlights',
  },
  {
    id: 'slide-03',
    categoryTag: 'SPORTS INFRASTRUCTURE',
    headline: 'WE BUILD COURTS.',
    copy: 'Turnkey sports surfaces, sub-base civil engineering, and tournament acrylic court systems across Pune & PCMC.',
    cta: { label: 'EXPLORE COURT SERVICES', href: '/courts' },
    image: MEDIA.heroSlide3,
    alt: 'Championship court surface illuminated at twilight',
  },
];

const AUTOPLAY_MS = 8000;

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

  // Autoplay timer
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

  // Restrained 2.5D subconscious parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 6, y: y * 4 });
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
      aria-label="Oriental Sports Campaign Showcase"
      style={{
        position: 'relative',
        backgroundColor: '#0E1013',
        minHeight: 'clamp(580px, 86vh, 840px)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Background Photography Canvas with Subtle Parallax */}
      {HERO_SLIDES.map((slide, idx) => {
        const isActive = idx === currentIdx;
        return (
          <div
            key={slide.id}
            aria-hidden={!isActive}
            style={{
              position: 'absolute',
              inset: '-10px',
              opacity: isActive ? 1 : 0,
              transform: isActive
                ? `scale(1.02) translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`
                : 'scale(1.05) translate3d(0,0,0)',
              transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s ease-out',
              zIndex: 1,
              pointerEvents: 'none',
              willChange: 'transform, opacity',
            }}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 35%',
              }}
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1800&q=85';
              }}
            />
            {/* Cinematic Editorial Atmosphere Gradient */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(14,16,19,0.3) 0%, rgba(14,16,19,0.15) 30%, rgba(14,16,19,0.7) 70%, rgba(14,16,19,0.95) 100%)',
              }}
            />
          </div>
        );
      })}

      {/* Campaign Content Layer */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 4,
          paddingBottom: 'clamp(40px, 6vw, 64px)',
          transform: `translate3d(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px, 0)`,
          transition: 'transform 0.4s ease-out',
        }}
      >
        <div style={{ maxWidth: '820px' }}>
          {/* Subtle Tagline */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: 'rgba(255, 255, 255, 0.82)',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            <span>{activeSlide.categoryTag}</span>
          </div>

          {/* Large Confident Campaign Display Headline */}
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(3rem, 7.5vw, 6.25rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.04em',
              color: '#FFFFFF',
              margin: '0 0 20px 0',
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
          >
            {activeSlide.headline}
          </h1>

          {/* Editorial Paragraph */}
          <p
            style={{
              fontSize: 'clamp(0.9375rem, 1.4vw, 1.125rem)',
              lineHeight: 1.5,
              color: '#EDE8DE',
              maxWidth: '560px',
              margin: '0 0 32px 0',
              fontWeight: 400,
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            {activeSlide.copy}
          </p>

          {/* Single High-Contrast CTA */}
          <div>
            <Link
              to={activeSlide.cta.href}
              className="btn btn-white"
              style={{
                fontWeight: 800,
                letterSpacing: '0.04em',
                padding: '16px 36px',
                fontSize: '0.875rem',
              }}
            >
              <span>{activeSlide.cta.label}</span>
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>

        {/* Quiet Slide Indicators */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: 'clamp(32px, 5vw, 48px)',
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
                  padding: '8px 0',
                  cursor: 'pointer',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                aria-label={`Go to slide ${idx + 1}`}
              >
                <div
                  style={{
                    width: isActive ? '48px' : '20px',
                    height: '2px',
                    backgroundColor: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.35)',
                    transition: 'all 0.35s ease',
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
