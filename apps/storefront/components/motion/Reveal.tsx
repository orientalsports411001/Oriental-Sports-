'use client';

import React from 'react';
import { motion, useInView, useReducedMotion, Variants } from 'framer-motion';

/**
 * Motion primitives for Oriental Sports (patterns after motion-primitives:
 * InView, TextEffect per-line, AnimatedGroup). Built on framer-motion, which
 * the project already ships. All of them render static content when the
 * visitor prefers reduced motion.
 *
 * Timing: fast start, controlled settle — cubic-bezier(0.16, 1, 0.3, 1).
 */

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

type Tag = keyof JSX.IntrinsicElements;

const motionTag = (as: Tag) => (motion as unknown as Record<string, React.ElementType>)[as as string] ?? motion.div;

interface RevealProps {
  as?: Tag;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  /** Distance travelled upward, in px. */
  y?: number;
  duration?: number;
  /** Fraction of the element that must be visible to trigger. */
  amount?: number;
  id?: string;
}

/** Fade + rise when the element enters the viewport (once). */
export const Reveal: React.FC<RevealProps> = ({
  as = 'div',
  children,
  className,
  style,
  delay = 0,
  y = 24,
  duration = 0.8,
  amount = 0.25,
  id,
}) => {
  const reduced = useReducedMotion();
  const Comp = motionTag(as);
  if (reduced) {
    const Static = as as React.ElementType;
    return <Static className={className} style={style} id={id}>{children}</Static>;
  }
  return (
    <Comp
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      {children}
    </Comp>
  );
};

interface RevealLinesProps {
  as?: Tag;
  lines: React.ReactNode[];
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of on scroll (hero, slide changes). */
  immediate?: boolean;
  lineClassName?: string;
  id?: string;
  /** Render the settled state with no animation (e.g. a hidden carousel slide). */
  still?: boolean;
}

/** Headline lines rising out of a mask, one after another. */
export const RevealLines: React.FC<RevealLinesProps> = ({
  as = 'h2',
  lines,
  className,
  style,
  delay = 0,
  stagger = 0.08,
  immediate = false,
  lineClassName,
  id,
  still = false,
}) => {
  const reduced = useReducedMotion() || still;
  const ref = React.useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const Tag = as as React.ElementType;
  const play = immediate || inView;

  return (
    <Tag ref={ref} id={id} className={className} style={style}>
      {lines.map((line, i) => (
        <span key={i} className={lineClassName} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.06em', marginBottom: '-0.06em' }}>
          {reduced ? (
            <span style={{ display: 'block' }}>{line}</span>
          ) : (
            <motion.span
              style={{ display: 'block', willChange: 'transform' }}
              initial={{ y: '108%' }}
              animate={play ? { y: '0%' } : { y: '108%' }}
              transition={{ duration: 0.9, delay: delay + i * stagger, ease: EASE_OUT }}
            >
              {line}
            </motion.span>
          )}
        </span>
      ))}
    </Tag>
  );
};

interface ImageRevealProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}

/**
 * Photograph uncovered from the bottom edge while it settles from a slight zoom.
 * The observed wrapper is never clipped: Chrome's IntersectionObserver treats a
 * fully clip-pathed target as invisible, so the clip lives on an inner layer.
 */
export const ImageReveal: React.FC<ImageRevealProps> = ({ children, className, style, delay = 0 }) => {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  if (reduced) return <div className={className} style={style}>{children}</div>;
  return (
    <div ref={ref} className={className} style={{ ...style, overflow: 'hidden' }}>
      <motion.div
        style={{ width: '100%', height: '100%' }}
        initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        animate={inView ? { clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
        transition={{ duration: 1.1, delay, ease: EASE_OUT }}
      >
        <motion.div
          style={{ width: '100%', height: '100%' }}
          initial={{ scale: 1.12 }}
          animate={inView ? { scale: 1 } : undefined}
          transition={{ duration: 1.4, delay, ease: EASE_OUT }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};

const groupVariants: Variants = {
  hidden: {},
  visible: (stagger: number) => ({ transition: { staggerChildren: stagger } }),
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

interface StaggerProps {
  as?: Tag;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  stagger?: number;
  amount?: number;
}

/** Container whose <StaggerItem> children arrive in sequence. */
export const Stagger: React.FC<StaggerProps> = ({ as = 'div', children, className, style, stagger = 0.07, amount = 0.2 }) => {
  const reduced = useReducedMotion();
  const Comp = motionTag(as);
  if (reduced) {
    const Static = as as React.ElementType;
    return <Static className={className} style={style}>{children}</Static>;
  }
  return (
    <Comp
      className={className}
      style={style}
      variants={groupVariants}
      custom={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </Comp>
  );
};

export const StaggerItem: React.FC<{ as?: Tag; children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({
  as = 'div',
  children,
  className,
  style,
}) => {
  const reduced = useReducedMotion();
  const Comp = motionTag(as);
  if (reduced) {
    const Static = as as React.ElementType;
    return <Static className={className} style={style}>{children}</Static>;
  }
  return (
    <Comp className={className} style={style} variants={itemVariants}>
      {children}
    </Comp>
  );
};
