import React from 'react';
import { motion } from 'framer-motion';

interface BrandRingsProps {
  size?: number;
  className?: string;
  opacity?: number;
  style?: React.CSSProperties;
}

export const BrandRings: React.FC<BrandRingsProps> = ({
  size = 540,
  className = '',
  opacity = 0.15,
  style = {},
}) => {
  return (
    <div
      className={`brand-concentric-rings ${className}`}
      style={{
        width: size,
        height: size,
        pointerEvents: 'none',
        position: 'absolute',
        opacity,
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 200"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Ring - Slow clockwise rotation */}
        <motion.circle
          cx="100"
          cy="100"
          r="92"
          fill="none"
          stroke="#F6F3EA"
          strokeWidth="1.2"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
          style={{ transformOrigin: 'center' }}
        />

        {/* Middle Dashed Gold Ring - Counter-clockwise rotation */}
        <motion.circle
          cx="100"
          cy="100"
          r="74"
          fill="none"
          stroke="#C9A227"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 45, ease: 'linear' }}
          style={{ transformOrigin: 'center' }}
        />

        {/* Inner Solid Ring */}
        <circle
          cx="100"
          cy="100"
          r="54"
          fill="none"
          stroke="#F6F3EA"
          strokeWidth="1.2"
          strokeDasharray="1 3"
        />

        {/* Center Accent Ring */}
        <circle
          cx="100"
          cy="100"
          r="34"
          fill="none"
          stroke="#C9A227"
          strokeWidth="0.8"
          opacity="0.8"
        />
      </svg>
    </div>
  );
};
