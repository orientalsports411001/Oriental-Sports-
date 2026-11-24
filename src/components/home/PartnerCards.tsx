import React from 'react';
import { PARTNER_BRANDS } from '../../data/partnerBrands';
import { Stagger, StaggerItem } from '../motion/Reveal';

/** Logo plates for every partner brand; each links to the brand's own site. */
export const PartnerCards: React.FC = () => (
  <Stagger as="ul" className="partner-list" stagger={0.08} amount={0.1}>
    {PARTNER_BRANDS.map((brand) => (
      <StaggerItem as="li" key={brand.id} className="partner-item">
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
      </StaggerItem>
    ))}
  </Stagger>
);

export default PartnerCards;
