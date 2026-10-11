/**
 * Canonical origin for the storefront, used to build absolute URLs for
 * canonicals, Open Graph tags, JSON-LD and the sitemap. Set
 * NEXT_PUBLIC_SITE_URL in production; falls back to the production domain
 * so metadata is still well-formed in local/dev builds without the env var.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://orientalsports.in').replace(/\/+$/, '');

export const SITE_NAME = 'Oriental Sports Pune';
