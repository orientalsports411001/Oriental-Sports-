'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Link } from '@/lib/router-shim';
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { IMAGES, MediaImage } from '@/data/media';
import { Img } from '../ui/Img';
import { EASE_OUT } from '../motion/Reveal';

/**
 * THE GAME IN MOTION — six sport photographs on a 3D orbit that turns as the
 * visitor scrolls through a pinned stage. Cards in front grow and stay sharp;
 * cards behind shrink and soften. The stage tilts a few px with the pointer.
 * Any photo opens full size, with a link to that sport's gear.
 *
 * Reduced motion: the orbit is replaced by a still grid of the same photos.
 */

interface OrbitItem {
  id: string;
  sport: string;
  image: MediaImage;
  link: { to: string; label: string };
  aspect: string;
  yOffset: number;
}

const ORBIT_ITEMS: OrbitItem[] = [
  { id: 'badminton', sport: 'Badminton', image: IMAGES.badmintonSmash, link: { to: '/shop/badminton', label: 'Shop badminton' }, aspect: '4 / 5', yOffset: -12 },
  { id: 'pickleball', sport: 'Pickleball', image: IMAGES.pickleballNet, link: { to: '/shop/pickleball', label: 'Shop pickleball' }, aspect: '16 / 11', yOffset: 24 },
  { id: 'cricket', sport: 'Cricket', image: IMAGES.cricketStadium, link: { to: '/shop/cricket', label: 'Shop cricket' }, aspect: '16 / 10', yOffset: -28 },
  { id: 'tennis', sport: 'Tennis', image: IMAGES.tennisClay, link: { to: '/shop/tennis', label: 'Shop tennis' }, aspect: '4 / 5', yOffset: 16 },
  { id: 'squash', sport: 'Squash', image: IMAGES.squashCourts, link: { to: '/shop/squash', label: 'Shop squash' }, aspect: '1 / 1', yOffset: -16 },
  { id: 'courts', sport: 'Courts', image: IMAGES.courtDusk, link: { to: '/courts', label: 'See court construction' }, aspect: '16 / 9', yOffset: 28 },
];

/** Radians the orbit turns across the whole scroll track (~1.1 revolutions). */
const TURN = Math.PI * 2.2;
/** CSS perspective of the orbit field, in px. */
const PERSPECTIVE = 1200;
/** Tallest card aspect (4:5) as height / width. */
const TALLEST = 1.25;

export const OrbitalGallery: React.FC = () => {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<OrbitItem | null>(null);
  const [width, setWidth] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1440));
  const fieldRef = useRef<HTMLDivElement>(null);
  const [fieldH, setFieldH] = useState(600);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const el = fieldRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setFieldH(entry.contentRect.height));
    ro.observe(el);
    return () => ro.disconnect();
  }, [reduced]);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 24, restDelta: 0.001 });



  // Restrained pointer tilt (fine pointers only), sprung so it never jitters.
  const tiltX = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    tiltX.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    tiltY.set(((e.clientY - r.top) / r.height - 0.5) * 9);
  };
  const onPointerLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const xRadius = width <= 480 ? width * 0.28 : width <= 900 ? 240 : 420;
  const zRadius = width <= 480 ? 180 : width <= 900 ? 240 : 320;

  // Size the cards so the front one — scaled 1.32x and brought forward by
  // the perspective — never leaves the field and never reaches the heading.
  const yAmp = Math.min(60, fieldH * 0.07);
  const swing = (28 / 60) * yAmp + yAmp;
  const frontScale = 1.32 * (PERSPECTIVE / (PERSPECTIVE - zRadius));
  const heightCap = ((fieldH / 2 - swing - 8) * 2) / (TALLEST * frontScale);
  const widthCap = Math.min(Math.max(150, width * 0.19), 300);
  const cardW = Math.round(Math.max(110, Math.min(widthCap, heightCap)));

  const head = (
    <header className="orbit-head">
      <h2 id="orbit-title" className="display d-2">
        The game
        <br />
        in motion.
      </h2>
      <p className="orbit-hint">
        {reduced ? 'Select a photo to open it.' : 'Scroll to turn the gallery. Select a photo to open it.'}
      </p>
    </header>
  );

  return (
    <section ref={trackRef} className={`orbit ${reduced ? 'orbit--still' : ''}`} aria-labelledby="orbit-title">
      {reduced ? (
        <div className="container orbit-still">
          {head}
          <ul className="orbit-grid">
            {ORBIT_ITEMS.map((item) => (
              <li key={item.id}>
                <OrbitCardFace item={item} onOpen={() => setOpen(item)} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div
          className="orbit-stage"
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
        >
          <div className="container orbit-stage-head">{head}</div>
          <div className="orbit-field" ref={fieldRef} style={{ '--orbit-card-w': `${cardW}px` } as React.CSSProperties}>
            <motion.ul className="orbit-canvas" style={{ x: tiltX, y: tiltY }}>
              {ORBIT_ITEMS.map((item, i) => (
                <OrbitCard
                  key={item.id}
                  item={item}
                  baseAngle={(Math.PI * 2 * i) / ORBIT_ITEMS.length}
                  progress={progress}
                  xRadius={xRadius}
                  zRadius={zRadius}
                  yAmp={yAmp}
                  onOpen={() => setOpen(item)}
                />
              ))}
            </motion.ul>
          </div>
        </div>
      )}

      <AnimatePresence>{open && <OrbitLightbox item={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
};

/* ---- Card ---------------------------------------------------------------- */

const OrbitCardFace: React.FC<{ item: OrbitItem; onOpen: () => void }> = ({ item, onOpen }) => (
  <button
    type="button"
    className="orbit-card"
    style={{ '--aspect': item.aspect } as React.CSSProperties}
    onClick={onOpen}
    aria-label={`Open photo: ${item.sport}`}
    data-orbit-id={item.id}
  >
    <Img image={item.image} alt="" sizes="(min-width: 900px) 320px, 240px" />
    <span className="orbit-card-label">{item.sport}</span>
  </button>
);

interface OrbitCardProps {
  item: OrbitItem;
  baseAngle: number;
  progress: MotionValue<number>;
  xRadius: number;
  zRadius: number;
  /** Vertical swing in px; the card's own offset scales with it. */
  yAmp: number;
  onOpen: () => void;
}

const OrbitCard: React.FC<OrbitCardProps> = ({ item, baseAngle, progress, xRadius, zRadius, yAmp, onOpen }) => {
  const angle = useTransform(progress, (p) => baseAngle + p * TURN);
  const x = useTransform(angle, (a) => Math.cos(a) * xRadius);
  const z = useTransform(angle, (a) => Math.sin(a) * zRadius);
  const y = useTransform(angle, (a) => (item.yOffset / 60) * yAmp + Math.sin(a * 1.5) * yAmp);

  // Depth: front cards grow to ~1.32, back cards recede to 0.72 and soften.
  const scale = useTransform(z, (d) => 0.72 + ((d + zRadius) / (zRadius * 2)) * 0.6);
  const filter = useTransform(z, (d) => (d >= 0 ? 'blur(0px)' : `blur(${(Math.abs(d / zRadius) * 2.5).toFixed(1)}px)`));
  const zIndex = useTransform(z, (d) => Math.round(10 + (d / zRadius) * 10));
  const rotateY = useTransform(x, (v) => -(v / xRadius) * 14);
  const rotateZ = useTransform(x, (v) => (v / xRadius) * 4);

  return (
    <motion.li className="orbit-anchor" style={{ x, y, z, zIndex, scale, filter, rotateY, rotateZ }}>
      <OrbitCardFace item={item} onOpen={onOpen} />
    </motion.li>
  );
};

/* ---- Lightbox ------------------------------------------------------------ */

const OrbitLightbox: React.FC<{ item: OrbitItem; onClose: () => void }> = ({ item, onClose }) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      root.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      opener?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="orbit-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.sport} photo`}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.figure
        className="orbit-lightbox-panel"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.94, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.94, y: 16 }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
      >
        <div className="orbit-lightbox-media">
          <Img image={item.image} sizes="(min-width: 900px) 820px, 100vw" style={{ objectFit: 'contain' }} />
        </div>
        <figcaption className="orbit-lightbox-bar">
          <span className="orbit-lightbox-text">
            <span className="orbit-lightbox-sport">{item.sport}</span>
            <span className="orbit-lightbox-alt">{item.image.alt}</span>
          </span>
          <span className="orbit-lightbox-actions">
            <Link to={item.link.to} className="link-arrow" onClick={onClose}>
              {item.link.label} <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
            <button ref={closeRef} type="button" className="orbit-lightbox-close" onClick={onClose}>
              Close
            </button>
          </span>
        </figcaption>
      </motion.figure>
    </motion.div>
  );
};

export default OrbitalGallery;
