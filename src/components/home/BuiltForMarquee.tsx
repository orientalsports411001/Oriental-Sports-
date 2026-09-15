import React from 'react';

/**
 * BuiltForMarquee — Infinite Disciplines & Craft Strip.
 *
 * Strict anti-slop compliance:
 * - Zero fabricated client claims (no fake institution partnerships).
 * - Focused on verified disciplines, surfaces, workshop craft, and Pune infrastructure.
 * - Hardware-accelerated CSS marquee with hover-pause.
 * - Explicit prefers-reduced-motion fallback (stops animation cleanly).
 */
export const BuiltForMarquee: React.FC = () => {
  const items = [
    'CRICKET',
    'TENNIS',
    'PICKLEBALL',
    'BADMINTON',
    'SQUASH',
    'TABLE TENNIS',
    'MULTI-SPORT TURF',
    'ACRYLIC SURFACES',
    'FLOODLIGHTING SYSTEMS',
    'MASTER STRINGING',
    'CAMP WORKSHOP',
    'PUNE',
  ];

  return (
    <aside
      aria-label="Sports Disciplines & Infrastructure Services"
      className="built-for-marquee"
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: 'var(--color-ink)',
        color: 'var(--color-canvas-base)',
        borderTop: '1px solid #222222',
        borderBottom: '1px solid #222222',
        padding: '16px 0',
        display: 'flex',
        alignItems: 'center',
        userSelect: 'none',
      }}
    >
      <div className="marquee-track">
        {/* Loop duplicated twice for seamless infinite scroll */}
        {[0, 1].map((copyIndex) => (
          <div
            key={copyIndex}
            className="marquee-group"
            aria-hidden={copyIndex === 1}
            style={{
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
              whiteSpace: 'nowrap',
            }}
          >
            {items.map((item, idx) => (
              <span
                key={idx}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.6875rem, 0.95vw, 0.8125rem)',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--color-canvas-base)',
                  padding: '0 20px',
                }}
              >
                <span>{item}</span>
                <span
                  style={{
                    display: 'inline-block',
                    marginLeft: '20px',
                    color: 'var(--color-brand-gold)',
                    fontSize: '0.75em',
                  }}
                >
                  ◆
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        .built-for-marquee .marquee-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: marquee-slide 32s linear infinite;
        }

        .built-for-marquee:hover .marquee-track {
          animation-play-state: paused;
        }

        @keyframes marquee-slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .built-for-marquee .marquee-track {
            animation: none !important;
            transform: none !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
            width: 100% !important;
          }
          .built-for-marquee .marquee-group:last-child {
            display: none !important;
          }
        }
      `}</style>
    </aside>
  );
};

export default BuiltForMarquee;
