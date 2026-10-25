import React, { useEffect } from 'react';

/**
 * Universal Analytics integration for Google Analytics (GA4) and Microsoft Clarity.
 * Configured via environment variables:
 * - VITE_GA_MEASUREMENT_ID: e.g. "G-XXXXXXXXXX"
 * - VITE_CLARITY_PROJECT_ID: e.g. "xxxxxxxxx"
 *
 * Gracefully no-ops when keys are absent, ensuring zero console errors or failed network calls.
 */
export const Analytics: React.FC = () => {
  useEffect(() => {
    const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    const clarityId = import.meta.env.VITE_CLARITY_PROJECT_ID;

    // 1. Google Analytics 4 (gtag.js)
    if (gaId && typeof window !== 'undefined' && !document.getElementById('ga-script')) {
      const script = document.createElement('script');
      script.id = 'ga-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', gaId, { page_path: window.location.pathname });
    }

    // 2. Microsoft Clarity
    if (clarityId && typeof window !== 'undefined' && !document.getElementById('clarity-script')) {
      (function (c: any, l: any, a: any, r: any, i: any) {
        c[a] =
          c[a] ||
          function () {
            (c[a].q = c[a].q || []).push(arguments);
          };
        const t = l.createElement(r);
        t.async = 1;
        t.id = 'clarity-script';
        t.src = 'https://www.clarity.ms/tag/' + i;
        const y = l.getElementsByTagName(r)[0];
        if (y && y.parentNode) {
          y.parentNode.insertBefore(t, y);
        } else {
          l.head.appendChild(t);
        }
      })(window, document, 'clarity', 'script', clarityId);
    }
  }, []);

  return null;
};

// Global typing declarations for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    clarity?: (...args: any[]) => void;
  }
}

export default Analytics;
