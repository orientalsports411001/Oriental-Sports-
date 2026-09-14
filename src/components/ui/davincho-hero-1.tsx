import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

interface DavinchoHeroProps {
  children: React.ReactNode;
  backgroundImage: string;
  altText: string;
  className?: string;
  parallaxIntensity?: number;
}

/**
 * Davincho Hero Primitive (Adapted for Oriental Sports)
 * 
 * Mechanics:
 * - Scroll position -> useScroll -> useTransform -> Image Y translation (smooth parallax).
 * - Mouse pointer coordinates -> direct spring physics -> Subtle 2.5D depth layer offset.
 * - Hardware accelerated transforms with willChange.
 */
export const DavinchoHero: React.FC<DavinchoHeroProps> = ({
  children,
  backgroundImage,
  altText,
  className = '',
  parallaxIntensity = 40,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', `${parallaxIntensity}%`]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.2]);

  // Pointer Parallax (2.5D Spring Physics)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 12);
    mouseY.set(y * 10);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`davincho-hero-container ${className}`}
      style={{
        position: 'relative',
        minHeight: 'clamp(600px, 92vh, 840px)',
        overflow: 'hidden',
        backgroundColor: '#0E1013',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Parallax Background Layer */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-20px',
          y: imageY,
          scale: imageScale,
          x: springX,
          zIndex: 1,
          willChange: 'transform',
        }}
      >
        <img
          src={backgroundImage}
          alt={altText}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 35%',
          }}
          onError={(e) => {
            e.currentTarget.src =
              'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'800\' height=\'600\' viewBox=\'0 0 800 600\'%3E%3Crect width=\'800\' height=\'600\' fill=\'%23111111\'/%3E%3Ctext x=\'400\' y=\'310\' fill=\'%23C9A227\' font-family=\'sans-serif\' font-size=\'24\' font-weight=\'900\' text-anchor=\'middle\'%3EORIENTAL SPORTS%3C/text%3E%3C/svg%3E';
          }}
        />
        {/* Cinematic Vignette Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(14,16,19,0.4) 0%, rgba(14,16,19,0.2) 30%, rgba(14,16,19,0.85) 75%, rgba(14,16,19,0.98) 100%)',
          }}
        />
      </motion.div>

      {/* Foreground Content Layer with Independent Spring Rate */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          opacity: contentOpacity,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default DavinchoHero;
