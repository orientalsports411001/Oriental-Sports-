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

const CLOUDINARY_HOST = 'res.cloudinary.com';
/** Widths offered in the generated srcset for a Cloudinary-hosted image without one of its own. */
const CLOUDINARY_WIDTHS = [400, 800, 1200, 1600];

function isCloudinaryUrl(src: string): boolean {
  return src.includes(CLOUDINARY_HOST);
}

/**
 * Inserts an `f_auto,q_auto,w_<width>` transformation right after
 * `/upload/` in a Cloudinary delivery URL, so the browser gets a
 * format/quality-optimized asset at roughly the size it needs instead of
 * the untransformed original. Local `/images/...` paths never pass through
 * here — they already carry a hand-built srcSet via data/media.ts.
 */
function cloudinaryTransform(src: string, width?: number): string {
  const marker = '/upload/';
  const idx = src.indexOf(marker);
  if (idx === -1) return src;
  const transform = width ? `f_auto,q_auto,w_${width}/` : 'f_auto,q_auto/';
  return src.slice(0, idx + marker.length) + transform + src.slice(idx + marker.length);
}

function cloudinarySrcSet(src: string): string {
  return CLOUDINARY_WIDTHS.map((w) => `${cloudinaryTransform(src, w)} ${w}w`).join(', ');
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

  // Cloudinary-hosted images (admin-uploaded product photos) get an
  // f_auto,q_auto transformation plus a generated srcset when they don't
  // already carry one. Local "/images/..." catalog photos are untouched.
  const isCloudinary = isCloudinaryUrl(media.src);
  const resolvedSrc = isCloudinary && !media.srcSet ? cloudinaryTransform(media.src) : media.src;
  const resolvedSrcSet = media.srcSet || (isCloudinary ? cloudinarySrcSet(media.src) : undefined);

  return (
    <img
      src={resolvedSrc}
      srcSet={resolvedSrcSet}
      sizes={resolvedSrcSet ? sizes : undefined}
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
