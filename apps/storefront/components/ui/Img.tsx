'use client';

import React from 'react';
import { FALLBACK_IMAGE, MediaImage } from '@/data/media';

interface ImgProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  image: MediaImage | string;
  /** Load immediately (above the fold). Defaults to lazy. */
  priority?: boolean;
  /** Override the image's own focal point. */
  position?: string;
}

/**
 * Responsive image with focal point, lazy loading and a local fallback.
 * Always fills its parent (object-fit: cover) — size the wrapper, not the img.
 */
export const Img: React.FC<ImgProps> = ({
  image,
  priority = false,
  position,
  sizes = '100vw',
  alt,
  style,
  onError,
  ...rest
}) => {
  const media: MediaImage = typeof image === 'string' ? { src: image, alt: alt ?? '' } : image;

  return (
    <img
      src={media.src}
      srcSet={media.srcSet}
      sizes={media.srcSet ? sizes : undefined}
      alt={alt ?? media.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      {...(priority ? ({ fetchPriority: 'high' } as any) : {})}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: position ?? media.position ?? 'center',
        ...style,
      }}
      onError={(e) => {
        const el = e.currentTarget;
        if (!el.dataset.fallback) {
          el.dataset.fallback = '1';
          el.removeAttribute('srcset');
          el.src = FALLBACK_IMAGE;
        }
        onError?.(e);
      }}
      {...rest}
    />
  );
};

export default Img;
