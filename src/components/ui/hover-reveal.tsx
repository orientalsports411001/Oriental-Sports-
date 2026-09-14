import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface HoverRevealProps {
  children: React.ReactNode;
  revealContent?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  dataCursor?: string;
}

export const HoverReveal: React.FC<HoverRevealProps> = ({
  children,
  revealContent,
  className = '',
  style = {},
  dataCursor = 'pointer',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      data-cursor={dataCursor}
      className={`hover-reveal-container ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        ...style,
      }}
    >
      {/* Primary Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>

      {/* Dynamic Hover Spotlight/Reveal Layer */}
      {revealContent && isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute',
            top: coords.y - 60,
            left: coords.x - 60,
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 1,
            background: 'radial-gradient(circle, rgba(201, 162, 39, 0.25) 0%, transparent 70%)',
          }}
        >
          {revealContent}
        </motion.div>
      )}
    </div>
  );
};

export default HoverReveal;
