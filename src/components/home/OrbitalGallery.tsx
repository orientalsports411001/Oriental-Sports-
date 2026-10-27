import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
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
import { IMAGES, MediaImage } from '../../data/media';
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
  { id: 'badminton', sport: 'Badminton', image: IMAGES.badmintonSmash, link: { to: '/shop/badminton', label: 'Shop badminton' }, aspect: '9 / 11', yOffset: -10 },
  { id: 'pickleball', sport: 'Pickleball', image: IMAGES.pickleballNet, link: { to: '/shop/pickleball', label: 'Shop pickleball' }, aspect: '9 / 11', yOffset: 14 },
  { id: 'cricket', sport: 'Cricket', image: IMAGES.cricketStadium, link: { to: '/shop/cricket', label: 'Shop cricket' }, aspect: '9 / 11', yOffset: -14 },
  { id: 'tennis', sport: 'Tennis', image: IMAGES.tennisClay, link: { to: '/shop/tennis', label: 'Shop tennis' }, aspect: '9 / 11', yOffset: 12 },
  { id: 'squash', sport: 'Squash', image: IMAGES.squashCourts, link: { to: '/shop/squash', label: 'Shop squash' }, aspect: '9 / 11', yOffset: -8 },
  { id: 'courts', sport: 'Courts', image: IMAGES.courtDusk, link: { to: '/courts', label: 'See court construction' }, aspect: '9 / 11', yOffset: 16 },
];

/** Radians the orbit turns across the whole scroll track (~1.1 revolutions). */
const TURN = Math.PI * 2.2;
/** CSS perspective of the orbit field, in px. */
const PERSPECTIVE = 1200;
/** Card aspect ratio (9:11 story) as height / width (11 / 9 ≈ 1.222). */
const TALLEST = 11 / 9;

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
  const stageRectRef = useRef<DOMRect | null>(null);

  const onPointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') {
      stageRectRef.current = e.currentTarget.getBoundingClientRect();
    }
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== 'mouse') return;
    if (!stageRectRef.current) stageRectRef.current = e.currentTarget.getBoundingClientRect();
    const r = stageRectRef.current;
    tiltX.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    tiltY.set(((e.clientY - r.top) / r.height - 0.5) * 9);
  };
  const onPointerLeave = () => {
    stageRectRef.current = null;
    tiltX.set(0);
    tiltY.set(0);
  };

  const xRadius = width <= 480
    ? Math.round(width * 0.28)
    : width <= 768
      ? Math.round(width * 0.3)
      : width <= 1024
        ? 320
        : width <= 1440
          ? 440
          : 490;

  const zRadius = width <= 480 ? 140 : width <= 900 ? 200 : 260;

  // Size cards generously in 9:11 story proportion so they feel bold and editorial
  // while ensuring the front card fits gracefully inside the stage.
  const yAmp = Math.min(26, fieldH * 0.045);
  const swing = (18 / 60) * yAmp + yAmp;
  const frontScale = 1.16 * (PERSPECTIVE / (PERSPECTIVE - zRadius));
  const heightCap = ((fieldH / 2 - swing - 14) * 2) / (TALLEST * frontScale);
  const widthCap = width <= 480
    ? Math.min(Math.max(160, width * 0.44), 190)
    : width <= 768
      ? Math.min(Math.max(200, width * 0.32), 250)
      : width <= 1024
        ? Math.min(Math.max(250, width * 0.28), 290)
        : width <= 1440
          ? Math.min(Math.max(290, width * 0.22), 330)
          : 350;
  const cardW = Math.round(Math.max(140, Math.min(widthCap, heightCap)));

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
          onPointerEnter={onPointerEnter}
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
    <Img image={item.image} alt="" sizes="(min-width: 1200px) 480px, (min-width: 768px) 360px, 260px" />
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

  // Depth: front cards grow to ~1.16, back cards recede gracefully to ~0.84 and soften via opacity (compositor thread).
  const scale = useTransform(z, (d) => 0.84 + ((d + zRadius) / (zRadius * 2)) * 0.32);
  const opacity = useTransform(z, (d) => 0.55 + ((d + zRadius) / (zRadius * 2)) * 0.45);
  const zIndex = useTransform(z, (d) => Math.round(10 + (d / zRadius) * 10));
  const rotateY = useTransform(x, (v) => -(v / xRadius) * 12);
  const rotateZ = useTransform(x, (v) => (v / xRadius) * 3);

  return (
    <motion.li className="orbit-anchor" style={{ x, y, z, zIndex, scale, opacity, rotateY, rotateZ }}>
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
