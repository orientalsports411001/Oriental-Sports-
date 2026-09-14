import React, { useState, useEffect } from 'react';

/**
 * BrandIntro Component — Chapter 01 Arrival
 * 
 * Non-blocking brand ident overlay.
 * Uses the authentic Oriental O/S geometry as a precision mask.
 * Cached in sessionStorage to run once per browser session.
 * Skips immediately on tap/click or prefers-reduced-motion.
 */
export const BrandIntro: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const hasSeen = sessionStorage.getItem('oriental_intro_shown');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return !hasSeen && !prefersReducedMotion;
  });

  const [isExpanding, setIsExpanding] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const expandTimer = setTimeout(() => {
      setIsExpanding(true);
    }, 550);

    const finishTimer = setTimeout(() => {
      setIsVisible(false);
      try {
        sessionStorage.setItem('oriental_intro_shown', 'true');
      } catch {
        // Safe fallback
      }
    }, 1100);

    return () => {
      clearTimeout(expandTimer);
      clearTimeout(finishTimer);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      aria-hidden="true"
      onClick={() => setIsVisible(false)}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: isExpanding ? 'none' : 'auto',
        backgroundColor: '#111111',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isExpanding ? 0 : 1,
        transition: 'opacity 450ms cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          transform: isExpanding ? 'scale(1.15)' : 'scale(1)',
          opacity: isExpanding ? 0 : 1,
          transition: 'all 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Authentic O/S Geometry Ident */}
        <svg
          viewBox="0 0 120 120"
          width="76"
          height="76"
          style={{ overflow: 'visible' }}
        >
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="#F6F3EA"
            strokeWidth="3.5"
          />
          <circle
            cx="60"
            cy="60"
            r="42"
            fill="none"
            stroke="#C9A227"
            strokeWidth="2"
            strokeDasharray="3 4"
            opacity="0.85"
          />
          <circle
            cx="60"
            cy="60"
            r="32"
            fill="none"
            stroke="#F6F3EA"
            strokeWidth="2.8"
          />
          <text
            x="60"
            y="72"
            textAnchor="middle"
            fill="#C9A227"
            fontFamily="'Space Grotesk', -apple-system, sans-serif"
            fontWeight="900"
            fontSize="38"
            fontStyle="italic"
            letterSpacing="-0.02em"
          >
            S
          </text>
        </svg>

        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '12px',
              fontWeight: 800,
              letterSpacing: '0.24em',
              color: '#F6F3EA',
              textTransform: 'uppercase',
            }}
          >
            ORIENTAL SPORTS
          </div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '9px',
              fontWeight: 600,
              letterSpacing: '0.18em',
              color: '#C9A227',
              marginTop: '4px',
              textTransform: 'uppercase',
            }}
          >
            PUNE • EST. 1968
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandIntro;
