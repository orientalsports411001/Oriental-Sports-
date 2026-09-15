import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { MEDIA } from '../../data/media';

interface ServiceItem {
  id: string;
  num: string;
  name: string;
  desc: string;
  image: string;
  alt: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'surface',
    num: '01',
    name: 'SURFACE',
    desc: 'Cushion acrylic, modular sports tiles, sprung timber & synthetic turf',
    image: '/images/courts/court_tournament_net.jpg',
    alt: 'Regulation tournament court surface systems, line markings & hardware, Pune',
  },
  {
    id: 'lighting',
    num: '02',
    name: 'LIGHTING',
    desc: 'All-weather sports floodlighting & glare-free arena placement',
    image: MEDIA.heroSlide3, // Authentic twilight floodlit court in Pune
    alt: 'High-output sports court floodlighting installation at night, Pune',
  },
  {
    id: 'netting',
    num: '03',
    name: 'NETTING',
    desc: 'High-tensile perimeter containment netting & tournament hardware',
    image: '/images/courts/court_tournament_net.jpg',
    alt: 'Tournament net hardware, tension cabling & boundary line marking',
  },
  {
    id: 'structure',
    num: '04',
    name: 'STRUCTURE',
    desc: 'Sub-base grading, drainage integration & galvanized perimeter fencing',
    image: '/images/courts/court_indoor_facility.jpg',
    alt: 'Indoor architectural sports facility, sprung hardwood timber & structural enclosure',
  },
];

export const CourtsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [isHoveringService, setIsHoveringService] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Scroll handler with requestAnimationFrame
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const totalScroll = rect.height - window.innerHeight;
            if (totalScroll > 0) {
              const rawProgress = -rect.top / totalScroll;
              const progress = Math.max(0, Math.min(1, rawProgress));
              setScrollProgress(progress);

              // Progressive service illumination if user is not hovering manually
              if (!isHoveringService) {
                if (progress < 0.52) {
                  setActiveServiceIndex(0);
                } else if (progress < 0.68) {
                  setActiveServiceIndex(1);
                } else if (progress < 0.84) {
                  setActiveServiceIndex(2);
                } else {
                  setActiveServiceIndex(3);
                }
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHoveringService]);

  // Subtle mouse movement for 2.5D camera float
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    },
    [prefersReducedMotion]
  );

  // Motion derivations
  const p = scrollProgress;

  // Background camera travel calculations
  // Scale from 1.04 to 1.20 giving the physical sensation of moving deeper into the court
  const imageScale = prefersReducedMotion ? 1.04 : 1.04 + p * 0.16;
  const imageTranslateY = prefersReducedMotion ? 0 : p * -30;
  
  // Parallax offsets from mouse
  const mouseImgX = prefersReducedMotion ? 0 : mousePos.x * 12;
  const mouseImgY = prefersReducedMotion ? 0 : mousePos.y * 8;
  const mouseTextX = prefersReducedMotion ? 0 : mousePos.x * -7;
  const mouseTextY = prefersReducedMotion ? 0 : mousePos.y * -5;

  // Typography displacement
  // "WE" lifts upward
  const weTranslateY = prefersReducedMotion ? 0 : -p * 110;
  // "BUILD" shifts laterally
  const buildTranslateX = prefersReducedMotion ? 0 : p * 50;
  // "COURTS." anchors and slightly scales
  const courtsScale = prefersReducedMotion ? 1 : 1 + p * 0.04;
  const courtsTranslateY = prefersReducedMotion ? 0 : p * 12;

  // Typography opacity: dominant in Phase A (0.0 - 0.4), recedes gently as services engage
  const typoMasterOpacity = prefersReducedMotion
    ? 1
    : p < 0.38
    ? 1
    : Math.max(0.2, 1 - (p - 0.38) * 1.8);

  // Services strip: hidden at 0%, cleanly glides in around 35%-50% scroll
  const servicesOpacity = prefersReducedMotion
    ? 1
    : p < 0.32
    ? 0
    : Math.min(1, (p - 0.32) * 3.2);
  const servicesTranslateY = prefersReducedMotion
    ? 0
    : Math.max(0, (0.6 - p) * 40);

  // Secondary tactical court layer cross-fade & mask
  const secondaryOpacity = prefersReducedMotion
    ? (p > 0.45 || isHoveringService ? 1 : 0)
    : isHoveringService
    ? 0.95
    : p < 0.38
    ? 0
    : Math.min(0.9, (p - 0.38) * 2.5);

  // Active court image: Either default Pune twilight court or the service-specific view
  const activeImage = SERVICES[activeServiceIndex]?.image || MEDIA.heroSlide3;
  const activeAlt = SERVICES[activeServiceIndex]?.alt || 'Sports court engineering Pune';

  return (
    <section
      id="courts-section"
      aria-label="Oriental Sports Court Construction"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        width: '100%',
        height: '240vh', // Generous scroll track for cinematic pacing
        backgroundColor: '#0E1013',
        color: '#FFFFFF',
      }}
    >
      {/* Pinned Architectural Viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
          perspective: '1200px',
        }}
      >
        {/* Layer 1: Base Architectural Photograph (The Pune Twilight Floodlit Arena) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          <img
            src={MEDIA.heroSlide3}
            alt="Oriental Sports court engineering Pune"
            style={{
              position: 'absolute',
              inset: '-5%',
              width: '110%',
              height: '110%',
              objectFit: 'cover',
              objectPosition: 'center 45%',
              transform: `scale(${imageScale}) translate3d(${mouseImgX}px, ${imageTranslateY + mouseImgY}px, 0)`,
              transition: prefersReducedMotion ? 'none' : 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'block',
              filter: 'brightness(0.92) contrast(1.05)',
            }}
          />
        </div>

        {/* Layer 2: Secondary Tactile Court Layer (Smooth Cross-dissolve into Playing Surface) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
            opacity: secondaryOpacity,
            transition: prefersReducedMotion
              ? 'opacity 0.3s ease'
              : 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <img
            src={activeImage}
            alt={activeAlt}
            style={{
              position: 'absolute',
              inset: '-5%',
              width: '110%',
              height: '110%',
              objectFit: 'cover',
              objectPosition: 'center 40%',
              transform: `scale(${imageScale * 1.02}) translate3d(${mouseImgX * 1.08}px, ${imageTranslateY * 0.9 + mouseImgY}px, 0)`,
              transition: prefersReducedMotion ? 'none' : 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'block',
              filter: 'brightness(0.88) contrast(1.08)',
            }}
          />
        </div>

        {/* Cinematic Atmospheric Vignette & Contrast Veil */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(14,16,19,0.2) 0%, rgba(14,16,19,0.55) 75%, rgba(14,16,19,0.92) 100%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Top Architectural Header Strip (clearing sticky site navbar) */}
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            width: '100%',
            maxWidth: 'var(--max-width-content)',
            margin: '0 auto',
            padding: 'clamp(76px, 10vh, 96px) clamp(20px, 4vw, 56px) 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            boxSizing: 'border-box',
          }}
        >
          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.6875rem, 0.85vw, 0.8125rem)',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-brand-gold)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-brand-gold)',
                }}
              />
              INFRASTRUCTURE STUDIO · PUNE
            </span>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.75rem, 0.95vw, 0.875rem)',
                color: 'rgba(255, 255, 255, 0.65)',
                margin: '4px 0 0',
                letterSpacing: '0.02em',
              }}
            >
              Turnkey court engineering, surface systems & sports facilities
            </p>
          </div>

          {/* Quick Scope Indicator */}
          <div
            style={{
              textAlign: 'right',
              display: 'none',
            }}
            className="md-block-indicator"
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.5)',
              }}
            >
              PROJECT SCOPE: COMPLETE TURNKEY
            </span>
          </div>
        </div>

        {/* Center: Monumental Physical Typography: WE BUILD COURTS. */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            maxWidth: 'var(--max-width-content)',
            margin: '0 auto',
            padding: 'clamp(14px, 2.5vh, 28px) clamp(20px, 4vw, 56px)',
            boxSizing: 'border-box',
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            opacity: typoMasterOpacity,
            transform: `translate3d(${mouseTextX}px, ${mouseTextY}px, 0)`,
            transition: prefersReducedMotion
              ? 'none'
              : 'opacity 0.2s linear, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              lineHeight: 0.88,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              userSelect: 'none',
            }}
          >
            {/* Word 1: WE */}
            <span
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.8rem, 8vw, 7rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                transform: `translate3d(0, ${weTranslateY}px, 0)`,
                transition: prefersReducedMotion ? 'none' : 'transform 0.1s linear',
                willChange: 'transform',
              }}
            >
              WE
            </span>

            {/* Word 2: BUILD */}
            <span
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.8rem, 8vw, 7rem)',
                fontWeight: 800,
                color: 'var(--color-brand-gold)',
                transform: `translate3d(${buildTranslateX}px, 0, 0)`,
                transition: prefersReducedMotion ? 'none' : 'transform 0.1s linear',
                willChange: 'transform',
              }}
            >
              BUILD
            </span>

            {/* Word 3: COURTS. */}
            <span
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3.2rem, 9vw, 8rem)',
                fontWeight: 900,
                color: '#FFFFFF',
                transform: `scale(${courtsScale}) translate3d(0, ${courtsTranslateY}px, 0)`,
                transformOrigin: 'left bottom',
                transition: prefersReducedMotion ? 'none' : 'transform 0.1s linear',
                willChange: 'transform',
                textShadow: '0 8px 32px rgba(0,0,0,0.6)',
              }}
            >
              COURTS.
            </span>
          </div>
        </div>

        {/* Bottom Section: Progressively Revealed Editorial Services Strip + CTA */}
        <div
          style={{
            position: 'relative',
            zIndex: 4,
            width: '100%',
            maxWidth: 'var(--max-width-content)',
            margin: '0 auto',
            // Generous bottom padding to clear both desktop borders and mobile bottom nav (70px+)
            padding: '0 clamp(20px, 4vw, 56px) clamp(72px, 11vh, 92px)',
            boxSizing: 'border-box',
            opacity: servicesOpacity,
            transform: `translate3d(0, ${servicesTranslateY}px, 0)`,
            transition: prefersReducedMotion ? 'none' : 'opacity 0.25s ease, transform 0.25s ease',
            pointerEvents: p > 0.32 || prefersReducedMotion ? 'auto' : 'none',
          }}
        >
          {/* Subtle Top Gold Divider */}
          <div
            style={{
              width: '100%',
              height: '1px',
              backgroundColor: 'rgba(201, 162, 39, 0.45)',
              marginBottom: 'clamp(12px, 1.8vh, 18px)',
              transform: `scaleX(${Math.min(1, 0.2 + p * 0.8)})`,
              transformOrigin: 'left',
              transition: 'transform 0.2s ease',
            }}
          />

          {/* Service Editorial Grid + CTA Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(16px, 2.5vw, 36px)',
              alignItems: 'end',
            }}
          >
            {/* Left: Editorial Services List */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(4px, 0.8vh, 8px)',
              }}
            >
              {SERVICES.map((svc, idx) => {
                const isActive = activeServiceIndex === idx;

                return (
                  <div
                    key={svc.id}
                    data-service={svc.id}
                    onMouseEnter={() => {
                      setIsHoveringService(true);
                      setActiveServiceIndex(idx);
                    }}
                    onMouseLeave={() => {
                      setIsHoveringService(false);
                    }}
                    onClick={() => {
                      setActiveServiceIndex(idx);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setActiveServiceIndex(idx);
                      }
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      padding: '4px 0',
                      borderBottom: isActive
                        ? '1px solid var(--color-brand-gold)'
                        : '1px solid rgba(255, 255, 255, 0.12)',
                      cursor: 'pointer',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      outline: 'none',
                      minHeight: '44px', // Touch target adherence
                      boxSizing: 'border-box',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          color: isActive ? 'var(--color-brand-gold)' : 'rgba(255,255,255,0.4)',
                          transition: 'color 0.25s ease',
                        }}
                      >
                        [{svc.num}]
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(0.95rem, 1.25vw, 1.1875rem)',
                          fontWeight: isActive ? 700 : 400,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
                          transform: isActive ? 'translateX(4px)' : 'translateX(0)',
                          transition: 'all 0.25s ease',
                        }}
                      >
                        {svc.name}
                      </span>
                    </div>

                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'clamp(0.6875rem, 0.85vw, 0.75rem)',
                        color: isActive ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.35)',
                        textAlign: 'right',
                        maxWidth: '280px',
                        display: 'none',
                        transition: 'color 0.25s ease',
                      }}
                      className="svc-desc-text"
                    >
                      {svc.desc}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Right: Architectural Summary + CTA Button */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '12px',
              }}
            >
              <div style={{ maxWidth: '380px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.5)',
                    display: 'block',
                    marginBottom: '2px',
                  }}
                >
                  VERIFIED INSTALLATIONS · PUNE
                </span>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(0.6875rem, 0.9vw, 0.8125rem)',
                    lineHeight: 1.45,
                    color: 'rgba(255, 255, 255, 0.7)',
                    margin: 0,
                  }}
                >
                  Koregaon Park Pickleball · Deccan Gymkhana Tennis · Baner Multi-Sport Turf · Camp Badminton
                </p>
              </div>

              {/* Single Architectural CTA */}
              <Link
                to="/courts"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '14px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.75rem, 1vw, 0.875rem)',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  backgroundColor: 'rgba(201, 162, 39, 0.12)',
                  border: '1px solid var(--color-brand-gold)',
                  padding: '12px 24px',
                  textDecoration: 'none',
                  minHeight: '48px', // Touch target compliance
                  minWidth: '220px',
                  justifyContent: 'space-between',
                  boxSizing: 'border-box',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'var(--color-brand-gold)';
                  e.currentTarget.style.color = '#111111';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(201, 162, 39, 0.12)';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
              >
                <span>BUILD YOUR COURT</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .md-block-indicator {
            display: block !important;
          }
          .svc-desc-text {
            display: inline-block !important;
          }
        }
      `}</style>
    </section>
  );
};

export default CourtsSection;
