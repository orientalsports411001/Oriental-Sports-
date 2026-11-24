import React from 'react';
import { PARTNER_BRANDS } from '../../data/partnerBrands';
import { Reveal, RevealLines } from '../motion/Reveal';
import { PartnerCards } from './PartnerCards';

/**
 * PARTNER BRANDS — logo plates that link out to each brand's own site.
 * The logos are dark artwork, so each sits on a flat ivory plate (the same
 * cream as the studio product shots) rather than being recoloured.
 */
export const PartnerBrands: React.FC = () => {
  if (PARTNER_BRANDS.length === 0) return null;

  return (
    <section className="partner-brands is-dark" aria-labelledby="partner-brands-title">
      <div className="container partner-grid">
        <div className="partner-intro">
          <RevealLines
            as="h2"
            id="partner-brands-title"
            lines={['Partner', 'brands.']}
            className="display d-2 partner-title"
          />
          <Reveal as="p" className="partner-lead" delay={0.1}>
            Select a logo to visit the brand&rsquo;s own website.
          </Reveal>
        </div>

        <PartnerCards />
      </div>
    </section>
  );
};

export default PartnerBrands;
