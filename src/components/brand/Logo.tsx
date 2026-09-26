import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  // 'light' is for light backgrounds. 'dark' needs the official reverse wordmark,
  // which has not been supplied yet, so it currently renders the standard wordmark.
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  linkToHome?: boolean;
}

// Official Oriental Sports artwork (extracted from the owner-supplied stacked master).
// Intrinsic pixel sizes keep the rendered aspect ratio exact.
const WORDMARK = { src: '/brand/oriental-sports-wordmark.png', width: 451, height: 90 };
const MONOGRAM = { src: '/brand/oriental-sports-monogram.png', width: 186, height: 147 };

export const Logo: React.FC<LogoProps> = ({
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
  // Wordmark by default; monogram alone when text is not shown
  const asset = showText ? WORDMARK : MONOGRAM;
  const aspectWidth = Math.round(h * (asset.width / asset.height));

  const logoImg = (
    <img
      src={asset.src}
      height={h}
      width={aspectWidth}
      className={`oriental-logo ${className}`}
      alt="Oriental Sports Pune Official Logo"
    />
  );

  if (linkToHome) {
    return (
      <Link
        to="/"
        className="inline-flex items-center text-decoration-none focus-visible-ring"
        title="Oriental Sports - Home"
      >
        {logoImg}
      </Link>
    );
  }

  return logoImg;
};
