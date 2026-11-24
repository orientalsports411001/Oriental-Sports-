import React from 'react';
import { Seo } from '../components/seo/Seo';
import { PageHeader } from '../components/ui/PageHeader';
import { PartnerCards } from '../components/home/PartnerCards';

export const PartnersPage: React.FC = () => (
  <div className="partners-page">
    <Seo
      title="Partner Brands | Oriental Sports Pune"
      description="Brands Oriental Sports Pune partners with. Select a logo to visit the brand's own website."
      canonicalPath="/partners"
    />
    <PageHeader
      crumbs={[{ label: 'Home', to: '/' }, { label: 'Partners' }]}
      title={['Partner', 'brands.']}
      lead="Select a logo to visit the brand's own website."
    />
    <section className="container partners-section" aria-label="Partner brands">
      <PartnerCards />
    </section>
  </div>
);

export default PartnersPage;
