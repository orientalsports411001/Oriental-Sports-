'use client';

import React from 'react';
import { IMAGES } from '@/data/media';
import { Img } from '@/components/ui/Img';
import { Reveal, ImageReveal } from '@/components/motion/Reveal';

interface InstallationCategory {
  id: string;
  badge: string;
  titlePrefix: string;
  titleMain: string;
  description: string;
  image: any;
  disciplines: string[];
  inquiryService: string;
}

const CATEGORIES: InstallationCategory[] = [
  {
    id: 'courts',
    badge: 'Civic & Club Courts',
    titlePrefix: 'Court',
    titleMain: 'Installations',
    description:
      'Turnkey court construction engineered to international regulation standards. We design, grade, surface, fence, and light tournament-grade playing surfaces with high shock absorption and all-weather resilience.',
    image: IMAGES.courtInstallHero,
    disciplines: [
      'Pickleball Courts (USAPA Layout)',
      'Padel Courts (10m × 20m FIP Panoramic)',
      'Tennis Courts (Multi-Layer Cushion Acrylic)',
      'Badminton Halls (BWF Vinyl & Sprung Teak)',
      'Squash Courts (High-Impact Plaster & Glass)',
      'Table Tennis Hall Setups',
    ],
    inquiryService: 'Court',
  },
  {
    id: 'turf',
    badge: 'All-Weather Arenas',
    titlePrefix: 'Turf',
    titleMain: 'Installations',
    description:
      'High-performance monofilament sports turf systems for outdoor grounds, rooftop arenas, and enclosed multi-sport play zones with heavy-duty ball containment netting.',
    image: IMAGES.turfInstallHero,
    disciplines: [
      '5-a-Side & 7-a-Side Football Turfs',
      'Box Cricket Arenas & Pitch Turf',
      'High-Tensile Ball Containment Netting',
      'Multi-Sport Community Playgrounds',
    ],
    inquiryService: 'Football Turf',
  },
  {
    id: 'gym',
    badge: 'Strength & Conditioning',
    titlePrefix: 'Gym',
    titleMain: 'Installations',
    description:
      'End-to-end commercial gymnasium planning and fit-out for residential societies, athletic clubs, universities, and corporate campuses. Complete equipment supply, layout planning, and high-density flooring.',
    image: IMAGES.gymInstallHero,
    disciplines: [
      'Commercial Fitness Centers & Gym Layouts',
      'Residential Society & Club Gymnasiums',
      'High-Density Shock-Absorbing Rubber Flooring',
      'Cardio & Strength Machine Fit-Out',
    ],
    inquiryService: 'Gym Facility',
  },
  {
    id: 'maintenance',
    badge: 'Restoration & Upgrades',
    titlePrefix: 'Repair &',
    titleMain: 'Maintenance',
    description:
      'Comprehensive restoration of existing sports facilities. We repair sub-base cracks, apply fresh acrylic color wear coats, repaint regulation line markings, and upgrade obsolete fixtures to tournament LED floodlights.',
    image: IMAGES.maintenanceInstallHero,
    disciplines: [
      'Acrylic Court Crack Repair & Resurfacing',
      'Precision Federation Line Re-marking',
      'Chainlink Fencing & Enclosure Netting Renewal',
      '300+ Lux Tournament LED Floodlight Retrofits',
    ],
    inquiryService: 'Court Maintenance',
  },
];

export const InstallationsShowcase: React.FC = () => {
  return (
    <section className="installations-showcase-section" aria-label="Turnkey sports installations">
      {/* Overview & Value Pillars (SCS Sports style) */}
      <div className="container installations-showcase-header">
        <Reveal>
          <p className="installations-showcase-eyebrow">
            Maharashtra Infrastructure Partner
          </p>
          <h2 className="display installations-showcase-title">
            Turnkey Sports &amp; Wellness Infrastructure
          </h2>
          <p className="installations-showcase-lead">
            <strong style={{ color: '#FFFFFF' }}>Oriental Sports</strong> is a complete sports and wellness infrastructure partner, specializing in the design and execution of world-class tennis courts, pickleball courts, padel arenas, indoor badminton halls, football turfs, and modern gym facilities.
          </p>
        </Reveal>

        {/* 4 Pillars Grid with Entrance Motion */}
        <div className="installations-pillars-grid">
          <Reveal delay={0.05} className="installations-pillar-card">
            <h3>All-In-One Execution</h3>
            <p>From initial topographical survey and civil earthwork to certified line markings and lighting handover.</p>
          </Reveal>

          <Reveal delay={0.1} className="installations-pillar-card">
            <h3>Multi-Sport Mastery</h3>
            <p>Specialized in-house teams across acrylic courts, padel cages, synthetic turfs, and commercial gym fit-outs.</p>
          </Reveal>

          <Reveal delay={0.15} className="installations-pillar-card">
            <h3>International Standards</h3>
            <p>Surfaces and dimensional layouts strictly aligned with USAPA, FIP, ITF, BWF, and FIFA playing geometry.</p>
          </Reveal>

          <Reveal delay={0.2} className="installations-pillar-card">
            <h3>Built for Longevity</h3>
            <p>Engineered with dual-plane drainage gradients and UV-stable polymers to withstand intensive Indian climates.</p>
          </Reveal>
        </div>
      </div>

      {/* 4 Installation Showcase Blocks */}
      <div className="container installations-cards-list">
        {CATEGORIES.map((cat, idx) => {
          const isFlipped = idx % 2 === 1;
          const whatsappUrl = `https://wa.me/919890990022?text=${encodeURIComponent(`Hi Oriental Sports, I want to install a ${cat.inquiryService}.`)}`;

          return (
            <article
              key={cat.id}
              id={cat.id}
              className={`installations-card ${isFlipped ? 'is-flipped' : ''}`}
            >
              {/* Media Column with Scroll Reveal Wipe & Settle Effect */}
              <ImageReveal className="installations-card-media" delay={0.1}>
                <Img image={cat.image} alt={cat.titleMain} sizes="(min-width: 1024px) 50vw, 100vw" />
              </ImageReveal>

              {/* Content Column with Fade Up Reveal */}
              <Reveal className="installations-card-body" delay={0.18}>
                <p className="installations-card-badge">{cat.badge}</p>
                <h3 className="display installations-card-title">
                  <span className="title-prefix">{cat.titlePrefix} </span>
                  <span>{cat.titleMain}</span>
                </h3>
                <p className="installations-card-desc">{cat.description}</p>

                {/* Disciplines / Features list with lightning icon */}
                <ul className="installations-disciplines-list">
                  {cat.disciplines.map((d) => (
                    <li key={d} className="installations-discipline-item">
                      <span className="lightning-icon" aria-hidden="true">⚡</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                {/* Direct Action with Arrow Motion & Hover Glow */}
                <div>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="installations-cta-btn"
                  >
                    <span>Discuss {cat.titlePrefix} Project</span>
                    <span className="btn-arrow" aria-hidden="true">→</span>
                  </a>
                </div>
              </Reveal>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default InstallationsShowcase;
