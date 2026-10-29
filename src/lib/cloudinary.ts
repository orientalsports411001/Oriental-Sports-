/**
 * Cloudinary Media Helper & Responsive Auto-Scaling
 *
 * Provides intelligent URL transformation and responsive srcSet generation for
 * Cloudinary-hosted product photography, with full compatibility for local catalog
 * WebP shots and Unsplash photography.
 *
 * Cloudinary format/quality/scaling flags:
 *   - f_auto: Serves AVIF/WebP automatically based on client browser support
 *   - q_auto: Intelligent perceptual compression with zero visible artifacting
 *   - c_limit: Downscales to target width/height without enlarging smaller assets
 *   - w_<width>: Pixel-width bounding box for responsive breakpoints
 */

export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  quality?: string | number; // e.g. 'auto', 'auto:eco', 'auto:best', 80
  format?: string;          // e.g. 'auto', 'webp', 'avif'
  crop?: string;            // e.g. 'limit', 'fill', 'fit', 'scale', 'thumb'
  dpr?: string | number;    // e.g. 'auto', 1, 2
}

/** Standard responsive image breakpoint widths (mobile, tablet, desktop, 2K/retina) */
export const DEFAULT_RESPONSIVE_WIDTHS = [320, 480, 640, 768, 1024, 1280, 1536];

const CLOUDINARY_HOST = 'res.cloudinary.com';
const UPLOAD_MARKER = '/image/upload/';

/**
 * Checks whether an image source URL points to Cloudinary CDN.
 */
export function isCloudinaryUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== 'string') return false;
  return url.includes(CLOUDINARY_HOST);
}

/**
 * Checks whether a URL segment represents existing Cloudinary transformation parameters.
 */
function isCloudinaryTransformSegment(segment: string): boolean {
  if (!segment) return false;
  // Version segment e.g. v1729000000 or v1
  if (/^v\d+$/.test(segment)) return false;
  // If segment has comma-separated params or contains known Cloudinary parameter keys
  if (segment.includes(',')) return true;
  return /^(w|h|c|f|q|dpr|b|e|g|r|o|z|a|t|co|fl)_[a-zA-Z0-9_.:-]+$/.test(segment);
}

/**
 * Builds the Cloudinary transformation parameter string based on provided options.
 * Defaults to `f_auto,q_auto` with `c_limit` if width or height is specified.
 */
function buildTransformString(options?: CloudinaryTransformOptions): string {
  const parts: string[] = [];

  // Format: default to f_auto
  const format = options?.format || 'auto';
  parts.push(`f_${format}`);

  // Quality: default to q_auto
  const quality = options?.quality !== undefined ? options.quality : 'auto';
  parts.push(`q_${quality}`);

  // Crop mode: default to c_limit when dimensions are provided to avoid distortion/upscaling
  const crop = options?.crop || (options?.width || options?.height ? 'limit' : undefined);
  if (crop) {
    parts.push(`c_${crop}`);
  }

  // Dimensions
  if (options?.width && options.width > 0) {
    parts.push(`w_${Math.round(options.width)}`);
  }
  if (options?.height && options.height > 0) {
    parts.push(`h_${Math.round(options.height)}`);
  }

  // DPR
  if (options?.dpr) {
    parts.push(`dpr_${options.dpr}`);
  }

  return parts.join(',');
}

/**
 * Generates an optimal, scaled and format-compressed image delivery URL.
 *
 * If `src` is a Cloudinary URL:
 *   Inserts or replaces the transformation segment (`f_auto,q_auto,w_<width>,c_limit`).
 * If `src` is an Unsplash URL:
 *   Applies Unsplash query parameters `?auto=format&fit=crop&w=<width>&q=<quality>`.
 * If `src` is a local asset or data URL:
 *   Returns the original source untouched.
 */
export function getOptimizedImageUrl(src: string, options?: CloudinaryTransformOptions): string {
  if (!src || typeof src !== 'string') return '';

  // Cloudinary URL optimization
  if (isCloudinaryUrl(src)) {
    const markerIndex = src.indexOf(UPLOAD_MARKER);
    if (markerIndex === -1) {
      // Fallback for non-standard path
      return src;
    }

    const prefix = src.slice(0, markerIndex + UPLOAD_MARKER.length);
    const rest = src.slice(markerIndex + UPLOAD_MARKER.length);
    const segments = rest.split('/');

    let remainingPath = rest;
    if (segments.length > 0 && isCloudinaryTransformSegment(segments[0])) {
      // Existing transformation segment found; replace with fresh requested transform
      remainingPath = segments.slice(1).join('/');
    }

    const transform = buildTransformString(options);
    return `${prefix}${transform}/${remainingPath}`;
  }

  // Unsplash image optimization
  if (src.includes('images.unsplash.com')) {
    const [baseUrl] = src.split('?');
    const width = options?.width || 1200;
    const quality = typeof options?.quality === 'number' ? options.quality : 75;
    return `${baseUrl}?auto=format&fit=crop&w=${Math.round(width)}&q=${quality}`;
  }

  // Local or data URL
  return src;
}

/**
 * Generates a responsive `srcSet` attribute string for an image source across screen sizes.
 *
 * @param src Image source URL (Cloudinary, Unsplash, or local WebP path)
 * @param widths Breakpoint widths to render (defaults to [320, 480, 640, 768, 1024, 1280, 1536])
 * @returns srcSet string (e.g. "url1 320w, url2 480w, ...") or empty string if not applicable
 */
export function generateSrcSet(
  src: string,
  widths: number[] = DEFAULT_RESPONSIVE_WIDTHS
): string {
  if (!src || typeof src !== 'string') return '';

  // Cloudinary image srcSet
  if (isCloudinaryUrl(src)) {
    return widths
      .map((w) => `${getOptimizedImageUrl(src, { width: w })} ${w}w`)
      .join(', ');
  }

  // Unsplash image srcSet
  if (src.includes('images.unsplash.com')) {
    const [baseUrl] = src.split('?');
    return widths
      .map((w) => `${baseUrl}?auto=format&fit=crop&w=${w}&q=75 ${w}w`)
      .join(', ');
  }

  // Local studio WebP twin (-sm.webp convention)
  if (src.startsWith('/images/') && src.endsWith('.webp') && !src.endsWith('-sm.webp')) {
    const smallTwin = src.replace(/\.webp$/, '-sm.webp');
    return `${smallTwin} 560w, ${src} 1024w`;
  }

  return '';
}
