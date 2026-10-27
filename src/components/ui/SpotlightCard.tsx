import React, { useRef } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  borderColor?: string;
}

/**
 * SpotlightCard — Cult UI & 21st.dev inspired interactive card.
 * High-performance hardware-accelerated CSS variables without React re-renders.
 */
export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(200, 16, 46, 0.16)',
  borderColor = 'rgba(200, 16, 46, 0.35)',
  style,
  ...props
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = () => {
    if (divRef.current) {
      rectRef.current = divRef.current.getBoundingClientRect();
      divRef.current.style.setProperty('--spotlight-opacity', '1');
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = divRef.current;
    if (!el) return;
    if (!rectRef.current) rectRef.current = el.getBoundingClientRect();
    const x = e.clientX - rectRef.current.left;
    const y = e.clientY - rectRef.current.top;
    el.style.setProperty('--spotlight-x', `${x}px`);
    el.style.setProperty('--spotlight-y', `${y}px`);
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    if (divRef.current) {
      divRef.current.style.setProperty('--spotlight-opacity', '0');
    }
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`spotlight-card ${className}`}
      style={{
        position: 'relative',
        borderRadius: 'var(--r-1)',
        backgroundColor: 'var(--surface-card)',
        border: '1px solid var(--border-color)',
        overflow: 'hidden',
        transition: 'border-color 280ms ease, transform 280ms cubic-bezier(0.16, 1, 0.3, 1)',
        ...style,
      }}
      {...props}
    >
      <div
        className="spotlight-sheen"
        aria-hidden="true"
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          inset: 0,
          opacity: 'var(--spotlight-opacity, 0)',
          transition: 'opacity 350ms cubic-bezier(0.16, 1, 0.3, 1)',
          background: `radial-gradient(600px circle at var(--spotlight-x, 0px) var(--spotlight-y, 0px), ${spotlightColor}, transparent 70%)`,
          zIndex: 1,
        }}
      />
      <div
        className="spotlight-border-sheen"
        aria-hidden="true"
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          inset: 0,
          opacity: 'var(--spotlight-opacity, 0)',
          transition: 'opacity 350ms cubic-bezier(0.16, 1, 0.3, 1)',
          border: `1px solid ${borderColor}`,
          borderRadius: 'inherit',
          zIndex: 2,
        }}
      />
      <div style={{ position: 'relative', zIndex: 3 }}>
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;
