import React from 'react';

interface MarqueeTickerProps {
  items?: string[];
  speed?: number; // seconds for full cycle
  className?: string;
}

const DEFAULT_ITEMS = [
  'PUNE’S SPORTS HOUSE',
  'SHOP 247 MG ROAD, CAMP',
  'PROFESSIONAL RACQUET STRINGING',
  'TURNKEY SPORTS COURT INFRASTRUCTURE',
  'GENUINE BRAND WILLOW & GEAR',
  'DELIVERY ACROSS PUNE & PCMC',
];

/**
 * MarqueeTicker — 21st.dev & Skiper UI inspired continuous sports editorial ticker.
 * Uses hardware-accelerated CSS keyframe transforms for 60fps scrolling.
 */
export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({
  items = DEFAULT_ITEMS,
  speed = 28,
  className = '',
}) => {
  return (
    <div
      className={`marquee-ticker ${className}`}
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        backgroundColor: 'var(--surface-black)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        padding: '10px 0',
        display: 'flex',
        alignItems: 'center',
        userSelect: 'none',
      }}
      aria-label="Oriental Sports live announcements"
    >
      <div
        className="marquee-track"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '28px',
          animation: `marqueeScroll ${speed}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {[...items, ...items, ...items].map((item, idx) => (
          <span
            key={idx}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '24px',
              fontFamily: 'var(--font)',
              fontStretch: 'var(--stretch-display)',
              fontSize: '0.8125rem',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
            }}
          >
            <span>{item}</span>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--blood-crimson)',
                boxShadow: '0 0 8px var(--blood-crimson)',
                display: 'inline-block',
              }}
              aria-hidden="true"
            />
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeTicker;
