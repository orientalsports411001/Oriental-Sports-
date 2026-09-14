import React, { useState } from 'react';
import { FALLBACK_IMAGE } from '../../data/media';

interface EditorialImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  aspectRatio?: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
  zoomOnHover?: boolean;
}

export const EditorialImage: React.FC<EditorialImageProps> = ({
  src,
  alt,
  fallbackSrc = FALLBACK_IMAGE,
  aspectRatio,
  className = '',
  style = {},
  loading = 'lazy',
  zoomOnHover = false,
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`editorial-image-wrapper ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#111111',
        aspectRatio,
        ...style,
      }}
    >
      <img
        src={imgSrc}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setImgSrc(fallbackSrc);
        }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: isLoaded ? 1 : 0.6,
          transform: zoomOnHover ? 'scale(1)' : undefined,
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
        }}
      />
    </div>
  );
};

export default EditorialImage;
