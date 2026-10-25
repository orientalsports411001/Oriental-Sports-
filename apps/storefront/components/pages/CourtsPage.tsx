'use client';

import React from 'react';
import { COURT_SERVICES } from '@/data/courts';
import { IMAGES, MediaImage } from '@/data/media';
import { STORE_INFO } from '@/data/storeInfo';
import { CourtServiceInquiry } from '@/components/courts/CourtServiceInquiry';
import { InstallationsShowcase } from '@/components/courts/InstallationsShowcase';
import { BuildSteps } from '@/components/courts/BuildSteps';
import { ProjectGallery } from '@/components/home/ProjectGallery';
import { PageHeader } from '@/components/ui/PageHeader';
import { Img } from '@/components/ui/Img';
import { ImageReveal, Reveal } from '@/components/motion/Reveal';

const COURT_ART: Record<string, MediaImage> = {
  Pickleball: IMAGES.pickleballNet,
  Padel: IMAGES.surfaceBlueLines,
  Tennis: IMAGES.surfaceNet,
  Badminton: IMAGES.badmintonHall,
  'Turf & Multi-sport': IMAGES.turfFootball,
  Squash: IMAGES.squashCourts,
};

export const CourtsPage: React.FC = () => (
  <div className="courts-page">
    <PageHeader
      crumbs={[{ label: 'Home', to: '/' }, { label: 'Installations' }]}
      eyebrow="Sports & Wellness Infrastructure · Pune & Maharashtra"
      title={['Turnkey', 'Installations.']}
      lead="Complete sports and wellness infrastructure partner — court construction, multi-sport turfs, gym fit-outs, and professional maintenance across Maharashtra."
      image={IMAGES.courtDusk}
      video="/videos/courts-hero.webm"
    >
      <Reveal className="page-header-actions" delay={0.25}>
        <a href="#court-inquiry" className="btn btn-light">
          Inquire about a project <span className="btn-arrow" aria-hidden="true">→</span>
        </a>
        <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-outline-light">
          WhatsApp us
        </a>
      </Reveal>
    </PageHeader>

    {/* SCS Sports Inspired Installations Showcase */}
    <InstallationsShowcase />

    <section className="container section court-services" aria-label="Detailed technical specifications">
      <Reveal style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 72px)' }}>
        <p style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: 'clamp(0.875rem, 1.1vw, 1.0625rem)',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: '#C8102E',
          margin: '0 0 16px',
        }}>
          Technical Specifications
        </p>
        <h2 className="display" style={{
          fontSize: 'clamp(2.4rem, 5.5vw, 4.25rem)',
          lineHeight: 0.95,
          fontWeight: 900,
          letterSpacing: '-0.01em',
          color: '#FFFFFF',
          margin: '0 auto',
          maxWidth: '24ch',
          textWrap: 'balance',
        }}>
          Individual Sport Disciplines &amp; Surface Systems
        </h2>
      </Reveal>
      {COURT_SERVICES.map((service, i) => (
        <article key={service.id} id={service.slug} className={`court-service ${i % 2 ? 'is-flipped' : ''}`}>
          <ImageReveal className="court-service-media">
            <Img image={COURT_ART[service.sport] ?? service.heroImage} alt="" sizes="(min-width: 1024px) 50vw, 100vw" />
          </ImageReveal>
          <Reveal className="court-service-body">
            <p className="eyebrow">{service.sport}</p>
            <h2 className="display d-2 court-service-title">{service.name}</h2>
            <p className="court-service-desc">{service.description}</p>
            <dl className="court-service-facts">
              <div>
                <dt>Surfaces</dt>
                <dd>{service.surfaceTypes.join(' · ')}</dd>
              </div>
              <div>
                <dt>Typical build</dt>
                <dd>{service.leadTime}</dd>
              </div>
              <div>
                <dt>Pricing</dt>
                <dd>{service.estimatedPriceRange}</dd>
              </div>
            </dl>
            <ul className="dash-list">
              {service.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <a
              href={`https://wa.me/919890990022?text=${encodeURIComponent(`Hi Oriental Sports, I want to install a ${service.sport === 'Padel' ? 'Padel Court' : service.sport === 'Turf & Multi-sport' ? 'Football Turf' : `${service.sport} Court`}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow"
            >
              Inquire about {service.sport.toLowerCase()} installation <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
          </Reveal>
        </article>
      ))}
    </section>

    <section className="on-dark courts-sequence" aria-label="What a build covers">
      <div className="container">
        <BuildSteps />
      </div>
    </section>

    <section id="court-inquiry" className="container section inquiry-section" aria-label="Court installation inquiry">
      <CourtServiceInquiry />
    </section>

    <ProjectGallery />

    <section className="container contact-band" aria-label="Talk to us about a court">
      <Reveal>
        <p className="display d-2">Got a space in mind?</p>
        <p className="lead">Tell us the sport and the size of the site. We’ll call back and arrange a visit.</p>
      </Reveal>
      <Reveal className="contact-band-actions" delay={0.1}>
        <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
          WhatsApp {STORE_INFO.displayPhone}
        </a>
        <a href={`mailto:${STORE_INFO.email}`} className="btn btn-outline">Email us</a>
      </Reveal>
    </section>
  </div>
);

export default CourtsPage;
