import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { COURT_SERVICES } from '../../data/courts';
import { IMAGES, MediaImage } from '../../data/media';
import { STORE_INFO } from '../../data/storeInfo';
import { Img } from '../ui/Img';
import { Reveal, RevealLines, Stagger, StaggerItem } from '../motion/Reveal';
import { BuildSteps } from '../courts/BuildSteps';
import { MagneticButton } from '../ui/MagneticButton';

/**
 * COURTS — the night-court chapter.
 * 1. Full-bleed court at dusk, "We build courts." with a restrained scroll drift.
 * 2. Sticky call to action beside the court types we build (from COURT_SERVICES).
 * 3. What a build covers (shared BuildSteps).
 */

const COURT_ART: Record<string, MediaImage> = {
  Pickleball: IMAGES.pickleballPaddles,
  Tennis: IMAGES.surfaceNet,
  Badminton: IMAGES.badmintonHall,
  'Turf & Multi-sport': IMAGES.turfFootball,
  Squash: IMAGES.squashCourts,
};



export const CourtsChapter: React.FC = () => {
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start end', 'end start'] });
  const drift = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);

  return (
    <section className="courts-chapter on-dark" aria-labelledby="courts-title">
      <div className="courts-hero" ref={heroRef}>
        <div className="courts-hero-media" aria-hidden="true">
          <motion.div className="courts-hero-drift" style={reduced ? undefined : { y: drift }}>
            <Img image={IMAGES.surfaceBlueLines} alt="" sizes="100vw" />
          </motion.div>
        </div>
        <div className="container courts-hero-copy">
          <Reveal as="p" className="eyebrow">Courts</Reveal>
          <RevealLines as="h2" id="courts-title" lines={['We build', 'courts.']} className="display d-hero courts-title" />
          <Reveal as="p" className="courts-lead" delay={0.15}>
            Turnkey court construction, surface systems, fencing, lighting and line marking — for clubs, schools,
            residential societies and homes across Pune and Maharashtra.
          </Reveal>
        </div>
      </div>

      <div className="container courts-body">
        <div className="courts-aside">
          <div className="courts-aside-sticky">
            <RevealLines as="h3" lines={['From bare ground', 'to first serve.']} className="display d-2" />
            <Reveal as="p" className="courts-aside-text" delay={0.1}>
              One team from the first site visit to handover. Tell us the sport, the space and how you play — we’ll
              come and look.
            </Reveal>
            <Reveal className="courts-actions" delay={0.15}>
              <MagneticButton strength={12}>
                <Link to="/courts" className="btn btn-primary">
                  Plan your court <span className="btn-arrow" aria-hidden="true">→</span>
                </Link>
              </MagneticButton>
              <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-outline-light">
                WhatsApp us
              </a>
            </Reveal>
          </div>
        </div>

        <Stagger as="ul" className="court-types" stagger={0.07} amount={0.05}>
          {COURT_SERVICES.map((service) => (
            <StaggerItem as="li" key={service.id}>
              <Link to={`/courts#${service.slug}`} className="court-type">
                <span className="court-type-media">
                  <Img image={COURT_ART[service.sport] ?? service.heroImage} alt="" sizes="(min-width: 1024px) 22vw, 100vw" />
                </span>
                <span className="court-type-text">
                  <span className="court-type-name">{service.sport}</span>
                  <span className="court-type-surfaces">{service.surfaceTypes.join(' · ')}</span>
                  <span className="court-type-time">Typical build: {service.leadTime.toLowerCase()}</span>
                </span>
                <span className="court-type-arrow" aria-hidden="true">→</span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <div className="container courts-steps">
        <BuildSteps />
      </div>
    </section>
  );
};

export default CourtsChapter;
