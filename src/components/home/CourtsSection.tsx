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
    image: MEDIA.heroSlide3,
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

// Clamp utility — keeps motion within safe bounds regardless of scroll value
function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

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

  const p = scrollProgress;

  // ─── Image layer motion ────────────────────────────────────────────────────
  // Scale: subtle zoom from 1.0 → 1.12 (stays inside container)
  const imageScale = prefersReducedMotion ? 1.0 : 1.0 + p * 0.12;
  // Parallax Y: moves image up slightly as user scrolls — clamped to safe range
  const imageTranslateY = prefersReducedMotion ? 0 : clamp(p * -24, -24, 0);

  // Mouse parallax — small, never causes overflow
  const mouseImgX = prefersReducedMotion ? 0 : clamp(mousePos.x * 8, -8, 8);
  const mouseImgY = prefersReducedMotion ? 0 : clamp(mousePos.y * 6, -6, 6);
  const mouseTextX = prefersReducedMotion ? 0 : clamp(mousePos.x * -4, -4, 4);
  const mouseTextY = prefersReducedMotion ? 0 : clamp(mousePos.y * -3, -3, 3);

  // ─── Typography motion — STRICTLY BOUNDED ─────────────────────────────────
  // "WE" lifts upward — max 5vh upward motion, never exits its row
  const weTranslateY = prefersReducedMotion ? 0 : clamp(-p * 40, -40, 0);
  // "BUILD" shifts right — max 4vw, stays within container
  const buildTranslateX = prefersReducedMotion ? 0 : clamp(p * 32, 0, 32);
  // "COURTS." anchors, very slight downward drift + micro scale
  const courtsScale = prefersReducedMotion ? 1 : clamp(1 + p * 0.03, 1, 1.03);
  const courtsTranslateY = prefersReducedMotion ? 0 : clamp(p * 10, 0, 10);

  // Typography master opacity: crisp from 0–35%, fades to 0 by 85%
  const typoMasterOpacity = prefersReducedMotion
    ? 1
    : p < 0.35
    ? 1
    : clamp(1 - (p - 0.35) * 2.2, 0, 1);

  // Services: fade in from 35%, slide up from below
  const servicesOpacity = prefersReducedMotion
    ? 1
    : p < 0.32
    ? 0
    : clamp((p - 0.32) * 3.2, 0, 1);
  const servicesTranslateY = prefersReducedMotion
    ? 0
    : clamp((0.6 - p) * 30, 0, 30);

  // Secondary image layer cross-fade
  const secondaryOpacity = prefersReducedMotion
    ? p > 0.45 || isHoveringService ? 1 : 0
    : isHoveringService
    ? 0.9
    : p < 0.38
    ? 0
    : clamp((p - 0.38) * 2.5, 0, 0.9);

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
        height: '200vh',
        backgroundColor: '#0E1013',
        color: '#FFFFFF',
        // NO overflow:hidden on the outer section — allows sticky to work correctly
      }}
    >
      {/* ─── Pinned Viewport (sticky frame) ─────────────────────────────────── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          // overflow:hidden here is safe — it's the sticky frame, not the outer scroll container
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        {/* ── LAYER 1: Base architectural photograph ──────────────────────── */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          <img
            src={MEDIA.heroSlide3}
            alt="Oriental Sports court engineering Pune"
            style={{
              position: 'absolute',
              // Slight oversizing so scale/translate never shows edges
              inset: '-6%',
              width: '112%',
              height: '112%',
              objectFit: 'cover',
              objectPosition: 'center 45%',
              transform: `scale(${imageScale}) translate3d(${mouseImgX}px, ${imageTranslateY + mouseImgY}px, 0)`,
              transition: prefersReducedMotion
                ? 'none'
                : 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'block',
              filter: 'brightness(0.90) contrast(1.05)',
            }}
          />
        </div>

        {/* ── LAYER 2: Secondary surface cross-dissolve ───────────────────── */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
            opacity: secondaryOpacity,
            transition: prefersReducedMotion
              ? 'opacity 0.3s ease'
              : 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 2,
          }}
        >
          <img
            src={activeImage}
            alt={activeAlt}
            style={{
              position: 'absolute',
              inset: '-6%',
              width: '112%',
              height: '112%',
              objectFit: 'cover',
              objectPosition: 'center 40%',
              transform: `scale(${clamp(imageScale * 1.02, 1, 1.20)}) translate3d(${mouseImgX}px, ${imageTranslateY + mouseImgY}px, 0)`,
              transition: prefersReducedMotion ? 'none' : 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'block',
              filter: 'brightness(0.85) contrast(1.08)',
            }}
          />
        </div>

        {/* ── LAYER 3: Atmospheric vignette — darkens edges for editorial depth */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            // Stronger bottom darkness to ensure bottom content always readable
            background: `
              radial-gradient(ellipse 80% 70% at 50% 40%, rgba(14,16,19,0.10) 0%, rgba(14,16,19,0.55) 100%),
              linear-gradient(to bottom, rgba(14,16,19,0.60) 0%, rgba(14,16,19,0.05) 30%, rgba(14,16,19,0.05) 60%, rgba(14,16,19,0.85) 100%)
            `,
            pointerEvents: 'none',
            zIndex: 3,
          }}
        />

        {/* ── LAYER 4: Section header strip ───────────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            display: 'flex',
            justifyContent: 'center',
            boxSizing: 'border-box',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 'var(--max-width-content, 1400px)',
              padding: 'clamp(20px, 3.5vh, 36px) clamp(20px, 4vw, 56px) 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              boxSizing: 'border-box',
              pointerEvents: 'auto',
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
                  flexShrink: 0,
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
          </div>
        </div>

        {/* ── LAYER 5: Monumental typography — WE / BUILD / COURTS. ─────────
          CRITICAL LAYOUT RULE:
          - The typography block is positioned in the center-left of the viewport
          - Each word is rendered in a normal flow (NOT absolute) inside a flex column
          - Transforms are layered ON TOP via transform: translate3d() — they do NOT
            change the layout box
          - The flex column has explicit minHeight so it never collapses
          - No negative lineHeight that causes words to visually overlap at rest
        ─────────────────────────────────────────────────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            // Positioned in the upper-left/center zone — gives services room at bottom
            // 18vh on a 695px screen = 125px; on 900px = 162px
            top: 'clamp(80px, 14vh, 140px)',
            left: 0,
            right: 0,
            zIndex: 8,
            // overflow:hidden ensures animated words never escape this layout zone
            overflow: 'hidden',
            pointerEvents: 'none',
            opacity: typoMasterOpacity,
            transform: `translate3d(${mouseTextX}px, ${mouseTextY}px, 0)`,
            transition: prefersReducedMotion
              ? 'none'
              : 'opacity 0.25s linear, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 'var(--max-width-content, 1400px)',
              margin: '0 auto',
              padding: '0 clamp(20px, 4vw, 56px)',
              boxSizing: 'border-box',
            }}
          >
            {/*
              Each word is display:block in normal flow — they stack vertically with
              REAL spacing between them (lineHeight 1.0 + explicit margin).
              Transforms only apply cosmetic motion, they never collapse the layout gap.
            */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(2px, 0.5vh, 6px)',
                userSelect: 'none',
              }}
            >
              {/* Word 1: WE */}
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-display)',
                  // min(vw, vh) ensures text fits in both dimensions
                  // At 1536x695: min(7vw=107px, 9vh=62px) = 62px — stays within layout box
                  fontSize: 'clamp(2.5rem, min(7vw, 9vh), 6.5rem)',
                  fontWeight: 800,
                  lineHeight: 1.0,
                  letterSpacing: '-0.04em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  // Bounded upward motion: max 40px lift
                  transform: `translate3d(0, ${weTranslateY}px, 0)`,
                  transition: prefersReducedMotion ? 'none' : 'transform 0.12s linear',
                  willChange: 'transform',
                }}
              >
                WE
              </span>

              {/* Word 2: BUILD */}
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, min(7vw, 9vh), 6.5rem)',
                  fontWeight: 800,
                  lineHeight: 1.0,
                  letterSpacing: '-0.04em',
                  textTransform: 'uppercase',
                  color: 'var(--color-brand-gold)',
                  // Bounded rightward motion: max 32px shift
                  transform: `translate3d(${buildTranslateX}px, 0, 0)`,
                  transition: prefersReducedMotion ? 'none' : 'transform 0.12s linear',
                  willChange: 'transform',
                }}
              >
                BUILD
              </span>

              {/* Word 3: COURTS. — slightly larger, anchoring the composition */}
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-display)',
                  // COURTS is slightly larger — architectural anchor
                  fontSize: 'clamp(2.8rem, min(8vw, 10.5vh), 7.5rem)',
                  fontWeight: 900,
                  lineHeight: 1.0,
                  letterSpacing: '-0.05em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  textShadow: '0 4px 24px rgba(0,0,0,0.5)',
                  // Bounded scale + downward drift; transformOrigin left keeps alignment
                  transform: `scale(${courtsScale}) translate3d(0, ${courtsTranslateY}px, 0)`,
                  transformOrigin: 'left center',
                  transition: prefersReducedMotion ? 'none' : 'transform 0.12s linear',
                  willChange: 'transform',
                }}
              >
                COURTS.
              </span>
            </div>
          </div>
        </div>

        {/* ── LAYER 6: Services + CTA — anchored to BOTTOM of sticky frame ── */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 12,
            opacity: servicesOpacity,
            transform: `translate3d(0, ${servicesTranslateY}px, 0)`,
            transition: prefersReducedMotion
              ? 'none'
              : 'opacity 0.25s ease, transform 0.25s ease',
            pointerEvents: p > 0.32 || prefersReducedMotion ? 'auto' : 'none',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 'var(--max-width-content, 1400px)',
              margin: '0 auto',
              padding: '0 clamp(20px, 4vw, 56px) clamp(32px, 5vh, 56px)',
              boxSizing: 'border-box',
            }}
          >
            {/* Gold rule separating photography/typography zone from service data */}
            <div
              style={{
                width: '100%',
                height: '1px',
                backgroundColor: 'rgba(201, 162, 39, 0.40)',
                marginBottom: 'clamp(12px, 2vh, 20px)',
                transform: `scaleX(${clamp(0.2 + p * 0.8, 0.2, 1)})`,
                transformOrigin: 'left',
                transition: 'transform 0.2s ease',
              }}
            />

            {/* Service grid + CTA */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
                gap: 'clamp(20px, 3vw, 48px)',
                alignItems: 'end',
              }}
              className="courts-service-grid"
            >
              {/* Left: Editorial service list */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0,
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
                        gap: 'clamp(8px, 1.5vw, 20px)',
                        padding: 'clamp(6px, 1vh, 10px) 0',
                        borderBottom: isActive
                          ? '1px solid rgba(201, 162, 39, 0.8)'
                          : '1px solid rgba(255, 255, 255, 0.10)',
                        cursor: 'pointer',
                        transition: 'border-color 0.25s ease',
                        outline: 'none',
                        minHeight: '44px',
                        boxSizing: 'border-box',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'clamp(0.625rem, 0.75vw, 0.75rem)',
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          color: isActive ? 'var(--color-brand-gold)' : 'rgba(255,255,255,0.35)',
                          transition: 'color 0.25s ease',
                          flexShrink: 0,
                        }}
                      >
                        [{svc.num}]
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(0.875rem, 1.1vw, 1.125rem)',
                          fontWeight: isActive ? 700 : 400,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.55)',
                          transition: 'color 0.25s ease, font-weight 0.25s ease',
                          flexShrink: 0,
                        }}
                      >
                        {svc.name}
                      </span>
                      <span
                        className="svc-desc-text"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'clamp(0.625rem, 0.8vw, 0.75rem)',
                          color: isActive ? 'rgba(255,255,255,0.80)' : 'rgba(255,255,255,0.30)',
                          lineHeight: 1.4,
                          transition: 'color 0.25s ease',
                          // Hidden on mobile, visible md+
                          display: 'none',
                        }}
                      >
                        {svc.desc}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Right: Summary + CTA */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '10px',
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'clamp(0.5625rem, 0.7vw, 0.6875rem)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.45)',
                      display: 'block',
                      marginBottom: '4px',
                    }}
                  >
                    VERIFIED INSTALLATIONS · PUNE
                  </span>
                  <p
                    className="courts-verified-list"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'clamp(0.625rem, 0.85vw, 0.8125rem)',
                      lineHeight: 1.5,
                      color: 'rgba(255, 255, 255, 0.65)',
                      margin: 0,
                    }}
                  >
                    Koregaon Park Pickleball · Deccan Gymkhana Tennis · Baner Multi-Sport Turf · Camp Badminton
                  </p>
                </div>

                {/* CTA Button */}
                <Link
                  to="/courts"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '14px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(0.6875rem, 0.9vw, 0.875rem)',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#FFFFFF',
                    backgroundColor: 'rgba(201, 162, 39, 0.12)',
                    border: '1px solid var(--color-brand-gold)',
                    padding: '11px 22px',
                    textDecoration: 'none',
                    minHeight: '48px',
                    minWidth: '200px',
                    justifyContent: 'space-between',
                    boxSizing: 'border-box',
                    transition: 'background-color 0.3s ease, color 0.3s ease',
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
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Responsive CSS ────────────────────────────────────────────────── */}
      <style>{`
        /* Show service descriptions on md+ */
        @media (min-width: 768px) {
          .svc-desc-text {
            display: block !important;
          }
        }

        /* Tablet: stack service grid vertically */
        @media (max-width: 767px) {
          .courts-service-grid {
            grid-template-columns: 1fr !important;
            gap: clamp(16px, 3vh, 24px) !important;
          }
          .courts-verified-list {
            display: none !important;
          }
        }

        /* Fix the header strip centering — position:absolute + left:50% + translateX trick */
        #courts-section [data-courts-header] {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
        }
      `}</style>
    </section>
  );
};

export default CourtsSection;
