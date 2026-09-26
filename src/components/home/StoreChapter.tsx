import React from 'react';
import { Link } from 'react-router-dom';
import { STORE_INFO } from '../../data/storeInfo';
import { useStoreStatus } from '../../utils/storeHours';
import { Reveal, RevealLines } from '../motion/Reveal';

/**
 * STORE — the address set like a shop sign. Deliberately typographic: there is
 * no photograph of the store, so none is implied. "MG Road" carries the broken
 * gold underline from the official wordmark.
 */
export const StoreChapter: React.FC = () => {
  const status = useStoreStatus();

  return (
    <section className="store-chapter section" aria-labelledby="store-title">
      <div className="container store-grid">
        <div className="store-sign">
          <Reveal as="p" className="eyebrow">Visit the store</Reveal>
          <RevealLines
            as="h2"
            id="store-title"
            className="display d-1 store-address"
            lines={[
              'Shop 247,',
              <span className="store-underline">MG Road,</span>,
              'Camp, Pune.',
            ]}
          />
          <Reveal as="p" className="store-sub" delay={0.1}>
            {STORE_INFO.addressLine2}, {STORE_INFO.city} {STORE_INFO.pincode}
          </Reveal>
        </div>

        <Reveal className="store-info" delay={0.1}>
          <p className={`store-status store-status-lg ${status.isOpen ? 'is-open' : ''}`}>
            <span className="status-dot" aria-hidden="true" />
            {status.label}
          </p>

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
          </dl>

          <div className="store-actions">
            <a href={STORE_INFO.mapsUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
              Get directions <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
            <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
              WhatsApp the store
            </a>
          </div>

          <p className="store-note">
            Schools, clubs and academies: ask about team kit and bulk equipment orders.{' '}
            <Link to="/contact">Get in touch</Link>.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default StoreChapter;
