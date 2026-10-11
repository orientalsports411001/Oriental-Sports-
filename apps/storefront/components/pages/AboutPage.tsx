'use client';

import React from 'react';
import { Link } from '@/lib/router-shim';
import { BRAND_STORY, STORE_INFO } from '@/data/storeInfo';
import { CATEGORIES } from '@/data/categories';
import { IMAGES } from '@/data/media';
import { PageHeader } from '@/components/ui/PageHeader';
import { Img } from '@/components/ui/Img';
import { ImageReveal, Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';

const PILLARS = [
  {
    name: 'The Camp store',
    text: `Match gear across ${CATEGORIES.length} sports, racquet stringing, bat knocking-in and advice in person.`,
    link: { to: '/shop', label: 'Shop gear' },
  },
  {
    name: 'Court construction',
    text: 'Turnkey courts for clubs, schools, societies and homes: surface, fencing, lighting and line marking.',
    link: { to: '/courts', label: 'See courts' },
  },
  {
    name: 'Schools, clubs & academies',
    text: 'Team kit and bulk equipment orders for institutions across Pune.',
    link: { to: '/contact', label: 'Get in touch' },
  },
];

export const AboutPage: React.FC = () => {
  const [first, ...rest] = BRAND_STORY.narrative;

  return (
    <div className="about-page">
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
        title={['Rooted in Camp.', 'Built for the game.']}
        lead={BRAND_STORY.subheadline}
      />

      <ImageReveal className="about-band">
        <Img image={IMAGES.athleteBatRacquet} sizes="100vw" />
      </ImageReveal>

      <section className="container section about-story" aria-label="Our story">
        <Reveal as="p" className="about-lede">{first}</Reveal>
        <div className="about-body">
          {rest.map((p, i) => (
            <Reveal as="p" key={p.slice(0, 24)} delay={0.08 * (i + 1)}>{p}</Reveal>
          ))}
        </div>
      </section>

      <section className="container about-pillars" aria-labelledby="pillars-title">
        <Reveal as="p" className="eyebrow" id="pillars-title">What we do</Reveal>
        <Stagger as="ul" className="pillar-list">
          {PILLARS.map((p) => (
            <StaggerItem as="li" key={p.name} className="pillar">
              <h2 className="display d-2 pillar-name">{p.name}</h2>
              <p className="pillar-text">{p.text}</p>
              <Link to={p.link.to} className="link-arrow">
                {p.link.label} <span className="btn-arrow" aria-hidden="true">→</span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="container contact-band" aria-label="Visit">
        <Reveal>
          <p className="display d-2">Come and see us.</p>
          <p className="lead">{STORE_INFO.addressLine1}, {STORE_INFO.addressLine2}, {STORE_INFO.city} {STORE_INFO.pincode}.</p>
        </Reveal>
        <Reveal className="contact-band-actions" delay={0.1}>
          <Link to="/visit" className="btn btn-primary">Plan your visit <span className="btn-arrow" aria-hidden="true">→</span></Link>
          <a href={`tel:${STORE_INFO.phone}`} className="btn btn-outline">Call {STORE_INFO.displayPhone}</a>
        </Reveal>
      </section>
    </div>
  );
};

export default AboutPage;
