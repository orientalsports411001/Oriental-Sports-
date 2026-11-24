import React from 'react';
import { Link } from 'react-router-dom';
import { PARTNER_BRANDS } from '../../data/partnerBrands';
import { STORE_INFO } from '../../data/storeInfo';
import { Reveal } from '../motion/Reveal';

/** One row per partner: logo plate on one side, what the brand makes and where to find it on the other. */
export const PartnerProfiles: React.FC = () => (
  <ul className="partner-profiles">
    {PARTNER_BRANDS.map((brand) => (
      <li key={brand.id} className="partner-profile">
        <Reveal>
          <a className="partner-card" href={brand.url} target="_blank" rel="noopener noreferrer">
            <span className="partner-logo">
              <img
                src={brand.logo}
                srcSet={`${brand.logoSmall} 450w, ${brand.logo} 900w`}
                sizes="min(340px, calc(100vw - 88px))"
                width={brand.logoWidth}
                height={brand.logoHeight}
                alt={brand.name}
                loading="lazy"
                decoding="async"
              />
            </span>
            <span className="partner-meta">
              <span className="partner-url">{brand.displayUrl}</span>
              <span className="partner-arrow" aria-hidden="true">↗</span>
              <span className="visually-hidden"> (opens in a new tab)</span>
            </span>
          </a>
        </Reveal>

        <Reveal className="partner-profile-text" delay={0.08}>
          <h2 className="display d-3 partner-profile-name">{brand.name}</h2>
          <p className="partner-profile-summary">{brand.summary}</p>
          <p className="partner-profile-links">
            {brand.shopBrand ? (
              <Link to={`/shop?brand=${encodeURIComponent(brand.shopBrand)}`} className="link-arrow">
                See {brand.name} in the shop <span className="btn-arrow" aria-hidden="true">→</span>
              </Link>
            ) : (
              <a
                href={`${STORE_INFO.whatsappUrl}${encodeURIComponent(brand.name + ' equipment')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow"
              >
                Ask the store about {brand.name} <span className="btn-arrow" aria-hidden="true">→</span>
              </a>
            )}
          </p>
        </Reveal>
      </li>
    ))}
  </ul>
);

export default PartnerProfiles;
