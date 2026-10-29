/**
 * Cloudinary Media Helper & Scaled URL Generator for Admin
 *
 * Client-safe utilities for generating optimized thumbnails, previews, and responsive
 * URLs without exposing server secrets.
 */

export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  quality?: string | number;
  format?: string;
  crop?: string;
  dpr?: string | number;
}

export const DEFAULT_RESPONSIVE_WIDTHS = [320, 480, 640, 768, 1024, 1280, 1536];

const CLOUDINARY_HOST = 'res.cloudinary.com';
const UPLOAD_MARKER = '/image/upload/';

export function isCloudinaryUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== 'string') return false;
  return url.includes(CLOUDINARY_HOST);
}

function isCloudinaryTransformSegment(segment: string): boolean {
  if (!segment) return false;
  if (/^v\d+$/.test(segment)) return false;
  if (segment.includes(',')) return true;
  return /^(w|h|c|f|q|dpr|b|e|g|r|o|z|a|t|co|fl)_[a-zA-Z0-9_.:-]+$/.test(segment);
}

function buildTransformString(options?: CloudinaryTransformOptions): string {
  const parts: string[] = [];

  const format = options?.format || 'auto';
  parts.push(`f_${format}`);

  const quality = options?.quality !== undefined ? options.quality : 'auto';
  parts.push(`q_${quality}`);

  const crop = options?.crop || (options?.width || options?.height ? 'limit' : undefined);
  if (crop) {
    parts.push(`c_${crop}`);
  }

  if (options?.width && options.width > 0) {
    parts.push(`w_${Math.round(options.width)}`);
  }
  if (options?.height && options.height > 0) {
    parts.push(`h_${Math.round(options.height)}`);
  }
  if (options?.dpr) {
    parts.push(`dpr_${options.dpr}`);
  }

  return parts.join(',');
}

export function getOptimizedImageUrl(src: string, options?: CloudinaryTransformOptions): string {
  if (!src || typeof src !== 'string') return '';

  if (isCloudinaryUrl(src)) {
    const markerIndex = src.indexOf(UPLOAD_MARKER);
    if (markerIndex === -1) return src;

    const prefix = src.slice(0, markerIndex + UPLOAD_MARKER.length);
    const rest = src.slice(markerIndex + UPLOAD_MARKER.length);
    const segments = rest.split('/');

    let remainingPath = rest;
    if (segments.length > 0 && isCloudinaryTransformSegment(segments[0])) {
      remainingPath = segments.slice(1).join('/');
    }

    const transform = buildTransformString(options);
    return `${prefix}${transform}/${remainingPath}`;
  }

  if (src.includes('images.unsplash.com')) {
    const [baseUrl] = src.split('?');
    const width = options?.width || 800;
    const quality = typeof options?.quality === 'number' ? options.quality : 75;
    return `${baseUrl}?auto=format&fit=crop&w=${Math.round(width)}&q=${quality}`;
  }

  return src;
}

export function generateSrcSet(
  src: string,
  widths: number[] = DEFAULT_RESPONSIVE_WIDTHS
): string {
  if (!src || typeof src !== 'string') return '';

  if (isCloudinaryUrl(src)) {
    return widths
      .map((w) => `${getOptimizedImageUrl(src, { width: w })} ${w}w`)
      .join(', ');
  }

  if (src.includes('images.unsplash.com')) {
    const [baseUrl] = src.split('?');
    return widths
      .map((w) => `${baseUrl}?auto=format&fit=crop&w=${w}&q=75 ${w}w`)
      .join(', ');
  }

  return '';
}
