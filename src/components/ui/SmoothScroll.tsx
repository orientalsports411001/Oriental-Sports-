import React, { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * SmoothScroll Provider (Lenis)
 * 
 * Provides buttery-smooth inertial scrolling physics for desktop.
 * Strictly degrades to 100% native momentum scrolling on:
 *   1. Touch devices (pointer: coarse)
 *   2. Mobile viewports (width <= 768px)
 *   3. Prefers-reduced-motion: reduce
 */
export const SmoothScroll: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check mobile / touch / reduced-motion constraints
    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) {
      // Degrade to native scroll — zero jank on mobile
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
