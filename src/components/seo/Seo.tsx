import { useEffect } from 'react';

const SITE_URL = 'https://www.orientalsports.in';
const SITE_NAME = 'Oriental Sports';

interface SeoProps {
  /** Full page title, e.g. "SG Scorer Classic Cricket Bat | Oriental Sports Pune". */
  title: string;
  /** ~150-160 chars, specific to this page — never the generic site description. */
  description: string;
  /** Defaults to the current URL path. Pass explicitly when a route has query
   *  params that shouldn't be part of the canonical (e.g. /search?q=...). */
  canonicalPath?: string;
  /** One or more JSON-LD structured-data objects (Product, BreadcrumbList, ...). */
  jsonLd?: object | object[];
  /** Social preview image; defaults to the site's standard OG image if unset. */
  image?: string;
}

function upsertMeta(selector: string, build: () => HTMLMetaElement, content: string) {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = build();
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Per-page SEO: title, description, canonical URL, Open Graph tags, and
 * structured data. This is a client-side SPA with no per-route server
 * render, so every route previously shipped the exact same static title and
 * description from index.html — Google treats that as duplicate content
 * across the whole site and largely stops indexing pages past the first.
 * Google's crawler does execute JavaScript before indexing, so values set
 * here are what it actually sees; this mounts as early as possible on each
 * page (top of the component, before any loading state) so a slow data
 * fetch never delays it.
 */
export function Seo({ title, description, canonicalPath, jsonLd, image }: SeoProps) {
  useEffect(() => {
    document.title = title;

    upsertMeta(
      'meta[name="description"]',
      () => { const m = document.createElement('meta'); m.setAttribute('name', 'description'); return m; },
      description
    );

    const path = canonicalPath ?? (window.location.pathname + window.location.search);
    const canonicalUrl = `${SITE_URL}${path}`;

    let canon = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canon) {
      canon = document.createElement('link');
      canon.setAttribute('rel', 'canonical');
      document.head.appendChild(canon);
    }
    canon.setAttribute('href', canonicalUrl);

    const og: [string, string][] = [
      ['og:title', title],
      ['og:description', description],
      ['og:url', canonicalUrl],
      ['og:site_name', SITE_NAME],
      ...(image ? ([['og:image', image]] as [string, string][]) : []),
    ];
    for (const [prop, content] of og) {
      upsertMeta(
        `meta[property="${prop}"]`,
        () => { const m = document.createElement('meta'); m.setAttribute('property', prop); return m; },
        content
      );
    }

    const scripts: HTMLScriptElement[] = [];
    if (jsonLd) {
      for (const item of Array.isArray(jsonLd) ? jsonLd : [jsonLd]) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(item);
        script.setAttribute('data-seo-injected', 'true');
        document.head.appendChild(script);
        scripts.push(script);
      }
    }

    return () => {
      scripts.forEach((s) => s.remove());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, canonicalPath, image, JSON.stringify(jsonLd)]);

  return null;
}
