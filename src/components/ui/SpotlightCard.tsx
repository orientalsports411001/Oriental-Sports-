import React, { useRef, useState } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  borderColor?: string;
}

/**
 * SpotlightCard — Cult UI & 21st.dev inspired interactive card.
 * Tracks pointer movement on desktop and renders a restrained radial
 * crimson / blood-red light sheen across the surface and border.
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
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
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
          opacity,
          transition: 'opacity 350ms cubic-bezier(0.16, 1, 0.3, 1)',
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
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
          opacity,
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
