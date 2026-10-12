'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from '@/lib/router-shim';
import { motion, useReducedMotion } from 'framer-motion';
import { IMAGES, MediaImage } from '@/data/media';
import { STORE_INFO } from '@/data/storeInfo';
import { CATEGORIES } from '@/data/categories';
import { Img } from '../ui/Img';
import { RevealLines, EASE_OUT } from '../motion/Reveal';
import { useStoreStatus } from '@/utils/storeHours';

/**
 * HERO — three slides, each with its own composition.
 *  gear   → photograph, headline bottom-left
 *  courts → photograph, headline top-left over the evening sky
 *  store  → light editorial split: the address set as a shop sign
 *
 * The tab bar names all three offerings at once, so the first viewport
 * always says GEAR + COURTS + where to find us. Autoplay progress is a CSS
 * animation; its end event advances the slide, so hover/focus/pause stay in
 * sync without timers. Swipe, arrow keys and a pause button are supported.
 */

type Action = { label: string; to?: string; href?: string };

interface Slide {
  id: 'gear' | 'courts' | 'store';
  tab: string;
  tabNote: string;
  eyebrow: string;
  lines: string[];
  lead: string;
  image: MediaImage;
  primary: Action;
  secondary: Action;
}

const SLIDES: Slide[] = [
  {
    id: 'gear',
    tab: 'Gear',
    tabNote: 'Racquets, bats, paddles, fitness',
    eyebrow: 'Sports goods · MG Road, Camp',
    lines: ['Gear for', 'the game.'],
    lead: `Racquets, bats, paddles and fitness equipment across ${CATEGORIES.length} sports. Racquet stringing and bat knocking-in are done at the store.`,
    image: IMAGES.badmintonSmash,
    primary: { label: 'Shop gear', to: '/shop' },
    secondary: { label: 'Shop by sport', to: '/shop' },
  },
  {
    id: 'courts',
    tab: 'Courts',
    tabNote: 'Court construction across Pune',
    eyebrow: 'Court construction · Pune & Maharashtra',
    lines: ['Courts for', 'the city.'],
    lead: 'Turnkey court construction — surface, fencing, lighting and line marking — for clubs, schools, societies and homes.',
    image: IMAGES.courtDusk,
    primary: { label: 'Plan a court', to: '/courts' },
    secondary: { label: 'WhatsApp us', href: STORE_INFO.whatsappUrl },
  },
  {
    id: 'store',
    tab: 'Camp store',
    tabNote: `${STORE_INFO.addressLine1}`,
    eyebrow: 'Pune’s sports house',
    lines: ['Shop 247,', 'MG Road,', 'Camp.'],
    lead: 'Walk in, pick up the bat, feel the grip. The Camp store is where Pune’s players come to kit out.',
    image: IMAGES.athleteBatRacquet,
    primary: { label: 'Plan your visit', to: '/visit' },
    secondary: { label: 'Get directions', href: STORE_INFO.mapsUrl },
  },
];

const DURATION_MS = 7000;

const ActionLink: React.FC<{ action: Action; className: string; tabIndex?: number }> = ({ action, className, tabIndex }) =>
  action.to ? (
    <Link to={action.to} className={className} tabIndex={tabIndex}>
      {action.label} <span className="btn-arrow" aria-hidden="true">→</span>
    </Link>
  ) : (
    <a href={action.href} target="_blank" rel="noreferrer" className={className} tabIndex={tabIndex}>
      {action.label} <span className="btn-arrow" aria-hidden="true">→</span>
    </a>
  );

export const Hero: React.FC = () => {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const status = useStoreStatus();

  const autoplay = !reduced && !userPaused;
  const paused = !autoplay || hoverPaused || focusPaused;
  const slide = SLIDES[index];

  const go = useCallback((next: number) => {
    setIndex((next + SLIDES.length) % SLIDES.length);
  }, []);

  // Restrained pointer depth on fine pointers: the photograph drifts a few px.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reduced || !window.matchMedia('(pointer: fine)').matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--px', `${((e.clientX - r.left) / r.width - 0.5) * -14}px`);
        el.style.setProperty('--py', `${((e.clientY - r.top) / r.height - 0.5) * -10}px`);
      });
    };
    const onLeave = () => {
      el.style.setProperty('--px', '0px');
      el.style.setProperty('--py', '0px');
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [reduced]);

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    let next = -1;
    if (e.key === 'ArrowRight') next = (i + 1) % SLIDES.length;
    if (e.key === 'ArrowLeft') next = (i - 1 + SLIDES.length) % SLIDES.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = SLIDES.length - 1;
    if (next >= 0) {
      e.preventDefault();
      go(next);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`hero hero--${slide.id}`}
      aria-roledescription="carousel"
      aria-label="Oriental Sports — gear, courts and the Camp store"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHoverPaused(true)}
      onPointerLeave={() => setHoverPaused(false)}
      onFocus={() => setFocusPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocusPaused(false);
      }}
      onPointerDown={(e) => {
        if (e.pointerType !== 'mouse') pointerStart.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={(e) => {
        const start = pointerStart.current;
        pointerStart.current = null;
        if (!start) return;
        const dx = e.clientX - start.x;
        const dy = e.clientY - start.y;
        if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) go(index + (dx < 0 ? 1 : -1));
      }}
    >
      <h1 className="visually-hidden">Oriental Sports — sports goods and court construction, Camp, Pune</h1>

      {SLIDES.map((s, i) => {
        const active = i === index;
        return (
          <div
            key={s.id}
            id={`hero-slide-${s.id}`}
            className={`hero-slide hero-slide--${s.id} ${active ? 'is-active' : ''}`}
            role="tabpanel"
            aria-roledescription="slide"
            aria-label={`${s.tab}`}
            aria-hidden={!active}
            ref={(el) => {
              // Set the `inert` DOM property directly rather than as a JSX
              // attribute: React 18's HTMLAttributes types `inert` as a
              // boolean, but passing a boolean through JSX produces an
              // invalid-attribute warning (React only special-cases this in
              // React 19+). Setting the property imperatively avoids both
              // the type conflict and the warning while keeping inert slides
              // genuinely non-interactive/non-focusable for assistive tech.
              if (el) (el as HTMLDivElement & { inert: boolean }).inert = !active;
            }}
          >
            <div className="hero-media">
              <div className="hero-media-inner">
                <Img image={s.image} priority={i === 0} sizes={s.id === 'store' ? '(min-width: 1024px) 55vw, 100vw' : '100vw'} />
              </div>
            </div>

            {/* Every slide keeps its copy in the layout so the hero sizes to the
                tallest one and never changes height between slides. Remounting on
                activation replays the entrance; hidden slides render settled. */}
            <div className="hero-content container">
              <div className="hero-copy" key={active ? 'active' : 'idle'}>
                <motion.p
                  className="eyebrow hero-eyebrow"
                  initial={reduced || !active ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE_OUT }}
                >
                  {s.eyebrow}
                </motion.p>
                <RevealLines as="h2" immediate still={!active} lines={s.lines} className="display hero-title" delay={0.05} stagger={0.09} />
                <motion.div
                  className="hero-foot"
                  initial={reduced || !active ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.35, ease: EASE_OUT }}
                >
                  <p className="hero-lead">{s.lead}</p>
                  {s.id === 'store' && (
                    <p className={`store-status hero-status ${status.isOpen ? 'is-open' : ''}`}>
                      <span className="status-dot" aria-hidden="true" />
                      {status.label}
                    </p>
                  )}
                  <div className="hero-actions">
                    <ActionLink action={s.primary} className={`btn ${s.id === 'store' ? 'btn-primary' : 'btn-light'}`} />
                    <ActionLink action={s.secondary} className="link-arrow" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="hero-tabs container">
        <div className="hero-tablist" role="tablist" aria-label="Choose a highlight">
          {SLIDES.map((s, i) => {
            const active = i === index;
            return (
              <button
                key={s.id}
                ref={(el) => { tabRefs.current[i] = el; }}
                type="button"
                role="tab"
                id={`hero-tab-${s.id}`}
                aria-selected={active}
                aria-controls={`hero-slide-${s.id}`}
                tabIndex={active ? 0 : -1}
                className={`hero-tab ${active ? 'is-active' : ''}`}
                onClick={() => go(i)}
                onKeyDown={(e) => onTabKey(e, i)}
              >
                <span className="hero-tab-track" aria-hidden="true">
                  <span
                    key={`${s.id}-${index}`}
                    className="hero-tab-fill"
                    style={{
                      animationDuration: `${DURATION_MS}ms`,
                      animationPlayState: paused ? 'paused' : 'running',
                      ...(active && reduced ? { transform: 'scaleX(1)', animation: 'none' } : {}),
                    }}
                    onAnimationEnd={() => active && autoplay && go(index + 1)}
                  />
                </span>
                <span className="hero-tab-label">{s.tab}</span>
                <span className="hero-tab-note">{s.tabNote}</span>
              </button>
            );
          })}
        </div>
        {!reduced && (
          <button
            type="button"
            className="hero-pause"
            onClick={() => setUserPaused((p) => !p)}
            aria-label={userPaused ? 'Play slideshow' : 'Pause slideshow'}
          >
            {userPaused ? (
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 1l9 5-9 5z" fill="currentColor" /></svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 1h3v10H2zM7 1h3v10H7z" fill="currentColor" /></svg>
            )}
          </button>
        )}
      </div>
    </section>
  );
};

export default Hero;
