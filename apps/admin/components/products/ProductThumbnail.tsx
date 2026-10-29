'use client';

import { getOptimizedImageUrl } from '@/lib/cloudinary-url';

interface ProductThumbnailProps {
  src: string;
  alt: string;
}

export function ProductThumbnail({ src, alt }: ProductThumbnailProps) {
  // Scale down Cloudinary images to 160x160 thumbnails with auto-format (AVIF/WebP) and compression
  const optimizedSrc = getOptimizedImageUrl(src, { width: 160, height: 160, crop: 'limit' });

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={optimizedSrc}
      alt={alt}
      loading="lazy"
      decoding="async"
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = '/images/products/oriental-sports/sg-scorer-classic.webp';
      }}
    />
  );
}
