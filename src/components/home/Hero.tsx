import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { RevealLines, EASE_OUT } from '../motion/Reveal';

/**
 * HERO — single full-bleed video, no carousel.
 * Was a 5-slide rotating carousel (tennis/table-tennis/cricket/courts/store,
 * each with its own CTA); simplified down to just the one licensed video the
 * user supplied, playing on loop, with a short text overlay and no links —
 * explicitly requested: no other slides, no redirects, just video and text.
 */

const VIDEO_SRC = '/videos/tennis-hero.webm';
const VIDEO_POSTER = '/images/hero/hero_tennis_video_poster.webp';

export const Hero: React.FC = () => {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Restrained pointer depth on fine pointers: the video drifts a few px.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reduced || !window.matchMedia('(pointer: fine)').matches) return;
    let raf = 0;
    let rect: DOMRect | null = null;
    const onEnter = () => {
      rect = el.getBoundingClientRect();
    };
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!rect) rect = el.getBoundingClientRect();
        el.style.setProperty('--px', `${((e.clientX - rect.left) / rect.width - 0.5) * -14}px`);
        el.style.setProperty('--py', `${((e.clientY - rect.top) / rect.height - 0.5) * -10}px`);
      });
    };
    const onLeave = () => {
      rect = null;
      el.style.setProperty('--px', '0px');
      el.style.setProperty('--py', '0px');
    };
    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [reduced]);

  return (
    <section ref={sectionRef} className="hero hero--single" aria-label="Oriental Sports">
      <div className="hero-slide hero-slide--tennis is-active">
        <div className="hero-media">
          <div className="hero-media-inner">
            {reduced ? (
              <img src={VIDEO_POSTER} alt="" className="hero-video-fallback" />
            ) : (
              <video
                className="hero-video"
                autoPlay
                loop
                muted
                playsInline
                poster={VIDEO_POSTER}
                preload="metadata"
                aria-hidden="true"
              >
                <source src={VIDEO_SRC} type="video/webm" />
              </video>
            )}
          </div>
        </div>

        <div className="hero-content container">
          <div className="hero-copy">
            <motion.p
              className="eyebrow hero-eyebrow"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
            >
              Sports goods · MG Road, Camp
            </motion.p>
            <RevealLines
              as="h1"
              immediate
              lines={['Strung for', 'the serve.']}
              className="display hero-title"
              delay={0.05}
              stagger={0.09}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
