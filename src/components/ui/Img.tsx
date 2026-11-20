import React from 'react';
import { FALLBACK_IMAGE, MediaImage } from '../../data/media';
import { getOptimizedImageUrl, generateSrcSet, isCloudinaryUrl } from '../../lib/cloudinary';

interface ImgProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  image: MediaImage | string;
  /** Load immediately (above the fold). Defaults to lazy. */
  priority?: boolean;
  /** Override the image's own focal point. */
  position?: string;
  /**
   * How the image fills its box. Defaults to 'cover' (crops to fill, the
   * existing behaviour everywhere). Set from a product's own `imageFit` —
   * admin picks this per product so a tall/narrow photo (a racket, a rod)
   * can show 'contain' (whole photo, letterboxed) instead of being cropped.
   * 'fill' stretches to the box and will distort a photo whose proportions
   * don't match it; it exists because it was asked for, not because it's
   * usually the right choice.
   */
  objectFit?: 'cover' | 'contain' | 'fill';
}

/**
 * Responsive image with focal point, lazy loading, Cloudinary auto-scaling, and a local fallback.
 * Fills its parent — size the wrapper, not the img. object-fit defaults to
 * 'cover' and can be overridden per image via the `objectFit` prop.
 */
export const Img: React.FC<ImgProps> = ({
  image,
  priority = false,
  position,
  objectFit = 'cover',
  sizes = '100vw',
  alt,
  style,
  onError,
  ...rest
}) => {
  const media: MediaImage = typeof image === 'string' ? { src: image, alt: alt ?? '' } : image;

  const isCloudinary = isCloudinaryUrl(media.src);

  // If Cloudinary URL and no custom srcSet is provided, generate responsive auto-scaling srcset
  const resolvedSrc = isCloudinary && !media.srcSet
    ? getOptimizedImageUrl(media.src, { width: priority ? 1200 : 800 })
    : media.src;

  const resolvedSrcSet = media.srcSet || (isCloudinary ? generateSrcSet(media.src) : undefined);

  return (
    <img
      src={resolvedSrc}
      srcSet={resolvedSrcSet}
      sizes={resolvedSrcSet ? sizes : undefined}
      alt={alt ?? media.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      // React 18 warns on camelCase fetchPriority; the lowercase attribute passes through.
      {...(priority ? { fetchpriority: 'high' } : {})}
      style={{
        width: '100%',
        height: '100%',
        objectFit,
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
