'use client';

interface ProductThumbnailProps {
  src: string;
  alt: string;
}

export function ProductThumbnail({ src, alt }: ProductThumbnailProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = '/images/products/oriental-sports/sg-scorer-classic.webp';
      }}
    />
  );
}
