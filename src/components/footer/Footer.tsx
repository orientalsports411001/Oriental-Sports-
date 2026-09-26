import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../brand/Logo';
import { STORE_INFO } from '../../data/storeInfo';
import { CATEGORIES } from '../../data/categories';
import { useStoreStatus } from '../../utils/storeHours';

const COLUMNS: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: 'Shop',
    links: [
      { label: 'All gear', to: '/shop' },
      ...CATEGORIES.slice(0, 7).map((c) => ({ label: c.name, to: `/shop/${c.id}` })),
    ],
  },
  {
    title: 'Courts',
    links: [
      { label: 'Court construction', to: '/courts' },
      { label: 'Cost estimate', to: '/courts#court-estimator' },
      { label: 'Court projects', to: '/courts/projects' },
    ],
  },
  {
    title: 'Oriental Sports',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Visit the store', to: '/visit' },
      { label: 'Contact', to: '/contact' },
      { label: 'Account', to: '/account' },
      { label: 'Wishlist', to: '/wishlist' },
    ],
  },
];

const LEGAL = [
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
  { label: 'Shipping', to: '/shipping' },
  { label: 'Returns', to: '/returns' },
];

/**
 * Footer: the store's facts on the left (who, where, when, how to reach us),
 * site links on the right. Hours and contact use the same hairline fact table
 * as the Visit page, so the two read as one system.
 */
export const Footer: React.FC = () => {
  const status = useStoreStatus();

  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="container footer-main">
        <div className="footer-store">
          <div className="footer-id">
            <Logo size="md" className="footer-logo" />
            <address className="footer-address">
              {STORE_INFO.addressLine1}
              <br />
              {STORE_INFO.addressLine2}
              <br />
              {STORE_INFO.city} {STORE_INFO.pincode}, Maharashtra
            </address>
            <div className="footer-visit">
              <p className={`store-status footer-status ${status.isOpen ? 'is-open' : ''}`}>
                <span className="status-dot" aria-hidden="true" />
                {status.label}
              </p>
              <a href={STORE_INFO.mapsUrl} target="_blank" rel="noreferrer" className="link-arrow">
                Directions <span className="btn-arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <dl className="store-hours footer-facts">
            <div>
              <dt>Mon – Sat</dt>
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
              <dt>WhatsApp</dt>
              <dd><a href={STORE_INFO.whatsappUrl} target="_blank" rel="noreferrer">Message the store</a></dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd><a href={`mailto:${STORE_INFO.email}`}>{STORE_INFO.email}</a></dd>
            </div>
          </dl>
        </div>

        <div className="footer-nav">
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title} className="footer-col">
              <h2 className="footer-heading">{col.title}</h2>
              <ul>
                {col.links.map((l) => (
                  <li key={l.to + l.label}>
                    <Link to={l.to} className="footer-link">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="container footer-base">
        <p>© {new Date().getFullYear()} Oriental Sports, Camp, Pune</p>
        <nav aria-label="Legal" className="footer-legal">
          {LEGAL.map((l) => (
            <Link key={l.to} to={l.to} className="footer-link">{l.label}</Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
