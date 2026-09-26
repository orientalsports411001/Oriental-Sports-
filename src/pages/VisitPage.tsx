import React from 'react';
import { STORE_INFO } from '../data/storeInfo';
import { PageHeader } from '../components/ui/PageHeader';
import { Reveal } from '../components/motion/Reveal';
import { useStoreStatus } from '../utils/storeHours';

const AT_THE_COUNTER = [
  { name: 'Racquet stringing', note: 'Drop off badminton, tennis and squash racquets.' },
  { name: 'Bat knocking-in', note: 'New willow prepared before it meets a hard ball.' },
  { name: 'Gear advice', note: 'Grips, weights and sizes checked in person.' },
  { name: 'Court enquiries', note: 'Talk to us about a court you want built.' },
];

export const VisitPage: React.FC = () => {
  const status = useStoreStatus();

  return (
    <div className="visit-page">
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Visit' }]}
        title={['Shop 247,', 'MG Road, Camp.']}
        lead="Walk in to pick up gear, drop off racquets for stringing, or talk to us about a court."
      />

      <section className="container visit-grid" aria-label="Store details">
        <Reveal className="visit-details">
          <p className={`store-status store-status-lg ${status.isOpen ? 'is-open' : ''}`}>
            <span className="status-dot" aria-hidden="true" />
            {status.label}
          </p>

          <address className="visit-address">
            {STORE_INFO.name}
            <br />
            {STORE_INFO.addressLine1}
            <br />
            {STORE_INFO.addressLine2}
            <br />
            {STORE_INFO.city} {STORE_INFO.pincode}, Maharashtra
          </address>

          <dl className="store-hours">
            <div>
              <dt>Monday – Saturday</dt>
              <dd>{STORE_INFO.hours.weekdays}</dd>
            </div>
            <div>
              <dt>Sunday</dt>
              <dd>{STORE_INFO.hours.sunday}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd><a href={`tel:${STORE_INFO.phone}`}>{STORE_INFO.displayPhone}</a></dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd><a href={`mailto:${STORE_INFO.email}`}>{STORE_INFO.email}</a></dd>
            </div>
          </dl>

          <div className="store-actions">
            <a href={STORE_INFO.mapsUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
              Get directions <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
            <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
              WhatsApp the store
            </a>
          </div>
        </Reveal>

        <Reveal className="visit-map" delay={0.1}>
          <iframe
            title="Map showing Oriental Sports, Shop 247, MG Road, Camp, Pune"
            src="https://maps.google.com/maps?q=Shop+247,+MG+Road,+Camp,+Pune+411001&t=&z=16&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </section>

      <section className="container section visit-counter" aria-labelledby="counter-title">
        <Reveal as="p" className="eyebrow" id="counter-title">At the counter</Reveal>
        <ul className="counter-list">
          {AT_THE_COUNTER.map((item) => (
            <li key={item.name}>
              <span className="counter-name">{item.name}</span>
              <span className="counter-note">{item.note}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default VisitPage;
