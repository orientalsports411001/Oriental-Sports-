import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';
import { BrandRings } from '../brand/BrandRings';
import { MEDIA } from '../../data/media';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll driven animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Scale and shift image as user scrolls
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.85], [0.45, 0.15]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const ringsScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        backgroundColor: 'var(--color-ink)',
        color: 'var(--color-ivory)',
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: 'clamp(32px, 6vw, 64px)',
        paddingBottom: 'clamp(48px, 8vw, 84px)',
      }}
      aria-label="Oriental Sports Hero Showcase"
    >
      {/* Background Editorial Visual with Scroll-driven Parallax Expansion */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          scale: imageScale,
          opacity: imageOpacity,
          zIndex: 1,
          willChange: 'transform, opacity',
        }}
      >
        <img
          src={MEDIA.heroSports}
          alt="High performance tennis and court action"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 35%',
            filter: 'contrast(1.1) brightness(0.95)',
          }}
        />
      </motion.div>

      {/* Cinematic Vignette & Radial Dark Gradient to keep typography ultra crisp */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background:
            'radial-gradient(ellipse at 25% 45%, rgba(17,17,17,0.4) 0%, rgba(17,17,17,0.85) 60%, #111111 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Kinetic Brand Rings System in Background */}
      <motion.div
        style={{
          position: 'absolute',
          right: '-6%',
          top: '8%',
          zIndex: 2,
          scale: ringsScale,
        }}
        className="desktop-only"
      >
        <BrandRings size={680} opacity={0.18} />
      </motion.div>

      {/* Main Container Content with Staggered Entrance */}
      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <motion.div style={{ y: textY, maxWidth: '860px' }}>
          {/* Eyebrow Label with Animated Pulse Dot */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              backgroundColor: 'rgba(201, 162, 39, 0.12)',
              border: '1px solid rgba(201, 162, 39, 0.35)',
              borderRadius: '2px',
              marginBottom: '20px',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-plate-gold)',
                boxShadow: '0 0 8px var(--color-plate-gold)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-plate-gold)',
              }}
            >
              PUNE’S SPORTS HOUSE • EST. CAMP
            </span>
          </motion.div>

          {/* Signature Kinetic Headline: GEAR. COURTS. PUNE. */}
          <h1
            style={{
              fontFamily: 'var(--font-display-xl)',
              fontSize: 'clamp(3.5rem, 11.5vw, 8.5rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.035em',
              textTransform: 'uppercase',
              margin: '0 0 24px 0',
              fontWeight: 900,
            }}
          >
            {/* Word 1: GEAR. */}
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <motion.span
                initial={{ y: '100%', rotateX: -25 }}
                animate={{ y: '0%', rotateX: 0 }}
                transition={{ duration: 0.65, delay: 0.2, type: 'spring', damping: 18 }}
                style={{ display: 'inline-block', color: 'var(--color-pure-white)' }}
              >
                GEAR.
              </motion.span>
            </span>

            {/* Word 2: COURTS. */}
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <motion.span
                initial={{ y: '100%', rotateX: -25 }}
                animate={{ y: '0%', rotateX: 0 }}
                transition={{ duration: 0.65, delay: 0.36, type: 'spring', damping: 18 }}
                style={{
                  display: 'inline-block',
                  color: 'var(--color-plate-gold)',
                  textShadow: '0 0 35px rgba(201, 162, 39, 0.3)',
                }}
              >
                COURTS.
              </motion.span>
            </span>

            {/* Word 3: PUNE. */}
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <motion.span
                initial={{ y: '100%', rotateX: -25 }}
                animate={{ y: '0%', rotateX: 0 }}
                transition={{ duration: 0.65, delay: 0.52, type: 'spring', damping: 18 }}
                style={{ display: 'inline-block', color: 'var(--color-pure-white)' }}
              >
                PUNE.
              </motion.span>
            </span>
          </h1>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.68 }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.0625rem, 2.2vw, 1.375rem)',
              color: 'var(--color-ivory)',
              lineHeight: 1.45,
              maxWidth: '540px',
              marginBottom: '36px',
              opacity: 0.95,
            }}
          >
            Everything you need to play, train and build. Match equipment for every sport. Certified courts engineered for Pune.
          </motion.p>

          {/* Magnetic CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.82 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              alignItems: 'center',
            }}
          >
            <MagneticButton
              variant="gold"
              size="lg"
              onClick={() => (window.location.href = '/shop')}
            >
              <span>SHOP GEAR</span>
              <ArrowRight size={18} />
            </MagneticButton>

            <MagneticButton
              variant="outline-white"
              size="lg"
              onClick={() => (window.location.href = '/courts')}
            >
              <span>BUILD A COURT</span>
              <Compass size={18} />
            </MagneticButton>
          </motion.div>

          {/* Athletic Credibility Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'clamp(16px, 4vw, 32px)',
              marginTop: '56px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(246, 243, 234, 0.12)',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.8125rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#D1CBBF' }}>
              <ShieldCheck size={16} color="var(--color-plate-gold)" />
              <span>Shop 247, MG Road, Camp</span>
            </div>
            <div style={{ color: '#D1CBBF' }}>
              <strong style={{ color: '#FFF' }}>9 Sports</strong> Disciplines
            </div>
            <div style={{ color: '#D1CBBF' }}>
              <strong style={{ color: '#FFF' }}>USAPA & ITF</strong> Certified Surfaces
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
