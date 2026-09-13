import React from 'react';

interface MarqueeTickerProps {
  variant?: 'orange' | 'blue' | 'lime';
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({ variant = 'orange' }) => {
  const sports = [
    'CRICKET',
    'BADMINTON',
    'PICKLEBALL',
    'TENNIS',
    'FITNESS & GYM',
    'SQUASH',
    'TABLE TENNIS',
    'COURT CONSTRUCTION',
    'CAMP • PUNE',
  ];

  const bgColor =
    variant === 'orange'
      ? 'var(--color-tangerine)'
      : variant === 'blue'
      ? 'var(--color-electric-blue)'
      : 'var(--color-lime)';

  const textColor = variant === 'lime' ? '#171717' : '#FFFFFF';
  const starColor = variant === 'lime' ? 'var(--color-electric-blue)' : 'var(--color-lime)';

  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: textColor,
        padding: '14px 0',
        overflow: 'hidden',
        borderTop: '2px solid rgba(23,23,23,0.1)',
        borderBottom: '2px solid rgba(23,23,23,0.1)',
      }}
      aria-hidden="true"
    >
      <div className="marquee-container">
        <div className="marquee-content">
          {[...Array(3)].map((_, groupIdx) => (
            <React.Fragment key={groupIdx}>
              {sports.map((sport, idx) => (
                <span
                  key={`${groupIdx}-${idx}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '18px',
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 800,
                    fontSize: '0.9375rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  <span>{sport}</span>
                  <span style={{ color: starColor, fontSize: '1.1rem' }}>✦</span>
                </span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
