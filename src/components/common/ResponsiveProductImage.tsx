import React, { useState } from 'react';
import { getOptimizedImageUrl, generateSrcSet, isCloudinaryUrl } from '../../lib/cloudinary';
import { FALLBACK_IMAGE } from '../../data/media';

export interface ResponsiveProductImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'sizes'> {
  /** Source URL: Cloudinary URL, Unsplash URL, or local path e.g. /images/products/... */
  src: string;
  /** Accessible alternative text */
  alt: string;
  /** Responsive sizes attribute string matching layout columns */
  sizes?: string;
  /** When true, marks image as high priority (above-the-fold hero / primary PDP image) */
  priority?: boolean;
  /** Preferred width for the primary src fallback */
  targetWidth?: number;
  /** Aspect ratio CSS rule (e.g. '1 / 1' or '4 / 3') */
  aspectRatio?: string | number;
  /** Object fit mode */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  /** Focal point position */
  position?: string;
  /** Fallback image path when primary image fails to load */
  fallbackSrc?: string;
}

/**
 * ResponsiveProductImage
 *
 * Automatically scales Cloudinary and catalog product photography according to
 * client viewport size and screen pixel density (Retina / 2x / 3x).
 *
 * Uses native browser responsive srcset selection with f_auto (AVIF/WebP) and
 * q_auto compression, with graceful fallback to local product assets.
 */
export const ResponsiveProductImage: React.FC<ResponsiveProductImageProps> = ({
  src,
  alt,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority = false,
  targetWidth,
  aspectRatio,
  objectFit = 'cover',
  position = 'center',
  fallbackSrc = FALLBACK_IMAGE,
  className = '',
  style,
  onError,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);

  // If already errored, deliver the fallback image directly
  const effectiveSrc = hasError ? fallbackSrc : src;
  const isCloudinary = isCloudinaryUrl(effectiveSrc);

  // Base optimized src (for browsers not reading srcset or fallback)
  const resolvedSrc = isCloudinary
    ? getOptimizedImageUrl(effectiveSrc, { width: targetWidth || (priority ? 1200 : 800) })
    : effectiveSrc;

  // Responsive srcSet for screen-size auto-scaling
  const resolvedSrcSet = hasError ? undefined : generateSrcSet(effectiveSrc) || undefined;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError) {
      setHasError(true);
    }
    onError?.(e);
  };

  return (
    <img
      src={resolvedSrc}
      srcSet={resolvedSrcSet}
      sizes={resolvedSrcSet ? sizes : undefined}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      {...(priority ? { fetchpriority: 'high' } : {})}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        objectFit,
        objectPosition: position,
        ...(aspectRatio ? { aspectRatio: String(aspectRatio) } : {}),
        ...style,
      }}
      onError={handleImageError}
      {...rest}
    />
  );
};

export default ResponsiveProductImage;
