import React, { useRef, useState } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  spotlightColor?: string;
  onClick?: () => void;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  style = {},
  spotlightColor = 'rgba(201, 162, 39, 0.12)',
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      className={`spotlight-card ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: -200, y: -200 });
      }}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Dynamic Cursor Spotlight Layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 75%)`,
          transition: 'opacity 0.25s ease',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
      <div style={{ position: 'relative', zIndex: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
};
