import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark'; // 'light' is for light backgrounds (dark text), 'dark' is for dark backgrounds (white/ivory text)
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  linkToHome?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  size = 'md',
  showText = true,
  className = '',
  linkToHome = true,
}) => {
  // Height scale
  const heights = {
    sm: 32,
    md: 42,
    lg: 56,
  };

  const h = heights[size];
  // Calculate proportional width based on whether text is shown (320px allows generous room for SPORTS without clipping)
  const viewBoxWidth = showText ? 320 : 64;
  const aspectWidth = showText ? Math.round(h * (320 / 64)) : h;

  const isDarkBg = variant === 'dark';

  // Ring colors
  const outerRingColor = isDarkBg ? '#F6F3EA' : '#111111';
  const midRingColor = '#C9A227'; // Brushed plate gold
  const innerRingColor = isDarkBg ? '#F6F3EA' : '#111111';
  const sColor = '#C9A227'; // Brushed gold S
  const orientalColor = isDarkBg ? '#FFFFFF' : '#111111';
  const sportsColor = '#C9A227'; // Gold italic Sports
  const underlineColor = '#C9A227';

  const logoSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${viewBoxWidth} 64`}
      height={h}
      width={aspectWidth}
      className={`oriental-logo ${className}`}
      role="img"
      aria-label="Oriental Sports Pune Official Logo"
    >
      {/* --- MONOGRAM (Left) --- */}
      <g id="oriental-monogram" transform="translate(32, 32)">
        {/* Outer concentric O ring */}
        <circle
          cx="0"
          cy="0"
          r="29"
          fill="none"
          stroke={outerRingColor}
          strokeWidth="3.2"
        />
        {/* Middle gold concentric ring */}
        <circle
          cx="0"
          cy="0"
          r="23"
          fill="none"
          stroke={midRingColor}
          strokeWidth="2"
          strokeDasharray="1.5 2.5"
          opacity="0.85"
        />
        {/* Inner concentric ring */}
        <circle
          cx="0"
          cy="0"
          r="17"
          fill="none"
          stroke={innerRingColor}
          strokeWidth="2.8"
        />
        {/* Brushed Gold S */}
        <text
          x="0"
          y="10"
          textAnchor="middle"
          fill={sColor}
          fontFamily="'Outfit', -apple-system, sans-serif"
          fontWeight="900"
          fontSize="28"
          fontStyle="italic"
          letterSpacing="-0.02em"
        >
          S
        </text>
      </g>

      {/* --- LOGOTYPE (Right) --- */}
      {showText && (
        <g id="oriental-logotype" transform="translate(74, 0)">
          {/* Automatic Typographic Flow */}
          <text
            x="0"
            y="35"
            fontFamily="'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            fontSize="26"
            letterSpacing="-0.01em"
          >
            <tspan fill={orientalColor} fontWeight="900">ORIENTAL </tspan>
            <tspan fill={sportsColor} fontWeight="800" fontStyle="italic">SPORTS</tspan>
          </text>

          {/* Gold Underline */}
          <rect
            x="0"
            y="43"
            width="220"
            height="3"
            rx="1.5"
            fill={underlineColor}
          />

          {/* Subtle Pune Heritage Tagline */}
          <text
            x="1"
            y="56"
            fill={isDarkBg ? 'rgba(246, 243, 234, 0.6)' : 'rgba(17, 17, 17, 0.65)'}
            fontFamily="'Inter', sans-serif"
            fontWeight="600"
            fontSize="8"
            letterSpacing="0.22em"
          >
            PUNE • EST. CAMP
          </text>
        </g>
      )}
    </svg>
  );

  if (linkToHome) {
    return (
      <Link
        to="/"
        className="inline-flex items-center text-decoration-none focus-visible-ring"
        title="Oriental Sports - Home"
      >
        {logoSvg}
      </Link>
    );
  }

  return logoSvg;
};
