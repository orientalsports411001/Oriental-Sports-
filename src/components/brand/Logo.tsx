import React from 'react';
import { Link } from 'react-router-dom';

export interface LogoProps {
  /**
   * 'dark' (default): crisp reverse white text for dark/obsidian backgrounds.
   * 'light': authentic original black & red artwork for light surfaces.
   * 'badge': original artwork housed in a crisp white rounded badge container.
   */
  variant?: 'light' | 'dark' | 'badge';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  linkToHome?: boolean;
}

// Official Oriental Sports artwork.
const WORDMARK_LIGHT = { src: '/brand/oriental-sports-wordmark.png', width: 921, height: 274 };
const WORDMARK_DARK = { src: '/brand/oriental-sports-wordmark-white.png', width: 921, height: 274 };
const MONOGRAM_LIGHT = { src: '/brand/oriental-sports-monogram.png', width: 921, height: 274 };
const MONOGRAM_DARK = { src: '/brand/oriental-sports-monogram-white.png', width: 921, height: 274 };

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
  showText = true,
  className = '',
  linkToHome = true,
}) => {
  // Height scale (header wordmark height per brand guidance: 36–40px)
  const heights = {
    sm: 32,
    md: 40,
    lg: 56,
  };

  const h = heights[size];
  const isDark = variant === 'dark';
  const isBadge = variant === 'badge';

  const asset = showText
    ? (isDark ? WORDMARK_DARK : WORDMARK_LIGHT)
    : (isDark ? MONOGRAM_DARK : MONOGRAM_LIGHT);

  const aspectWidth = Math.round(h * (asset.width / asset.height));

  const imgElement = (
    <img
      src={asset.src}
      height={h}
      width={aspectWidth}
      className={`oriental-logo ${className}`}
      alt="Oriental Sports Pune Official Logo"
    />
  );

  const content = isBadge ? (
    <span className="logo-badge">
      {imgElement}
    </span>
  ) : (
    imgElement
  );

  if (linkToHome) {
    return (
      <Link
        to="/"
        className="inline-flex items-center text-decoration-none focus-visible-ring"
        title="Oriental Sports - Home"
      >
        {content}
      </Link>
    );
  }

  return content;
};
