import React from 'react';
import { COURT_SERVICES } from '../data/courts';
import { IMAGES, MediaImage } from '../data/media';
import { STORE_INFO } from '../data/storeInfo';
import { CourtCostEstimator } from '../components/courts/CourtCostEstimator';
import { BuildSteps } from '../components/courts/BuildSteps';
import { ProjectGallery } from '../components/home/ProjectGallery';
import { PageHeader } from '../components/ui/PageHeader';
import { Img } from '../components/ui/Img';
import { ImageReveal, Reveal } from '../components/motion/Reveal';

const COURT_ART: Record<string, MediaImage> = {
  Pickleball: IMAGES.pickleballNet,
  Tennis: IMAGES.surfaceNet,
  Badminton: IMAGES.badmintonHall,
  'Turf & Multi-sport': IMAGES.turfFootball,
  Squash: IMAGES.squashCourts,
};

export const CourtsPage: React.FC = () => (
  <div className="courts-page">
    <PageHeader
      crumbs={[{ label: 'Home', to: '/' }, { label: 'Courts' }]}
      eyebrow="Court construction · Pune & Maharashtra"
      title={['We build', 'courts.']}
      lead="Turnkey court construction, surface systems, fencing, lighting and line marking — for clubs, schools, residential societies and homes."
      image={IMAGES.courtDusk}
    >
      <Reveal className="page-header-actions" delay={0.25}>
        <a href="#court-estimator" className="btn btn-light">
          Estimate your court <span className="btn-arrow" aria-hidden="true">→</span>
        </a>
        <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-outline-light">
          WhatsApp us
        </a>
      </Reveal>
    </PageHeader>

    <section className="container section court-services" aria-label="Courts we build">
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
            <a href="#court-estimator" className="link-arrow">
              Estimate a {service.sport.toLowerCase()} court <span className="btn-arrow" aria-hidden="true">→</span>
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

    <section id="court-estimator" className="container section estimator-section" aria-label="Court cost estimate">
      <CourtCostEstimator />
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
