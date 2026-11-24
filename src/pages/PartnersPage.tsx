import React from 'react';
import { Seo } from '../components/seo/Seo';
import { PageHeader } from '../components/ui/PageHeader';
import { PartnerProfiles } from '../components/home/PartnerProfiles';
import { Reveal } from '../components/motion/Reveal';
import { STORE_INFO } from '../data/storeInfo';

export const PartnersPage: React.FC = () => (
  <div className="partners-page">
    <Seo
      title="Partner Brands | Oriental Sports Pune"
      description="The brands Oriental Sports Pune partners with for gym, fitness and sports equipment, with links to each brand's own website."
      canonicalPath="/partners"
    />
    <PageHeader
      crumbs={[{ label: 'Home', to: '/' }, { label: 'Partners' }]}
      title={['Partner', 'brands.']}
      lead="The brands we work with for gym, fitness and sports equipment. Each one makes its own range; the links go to the brand's own website."
    />

    <section className="container partners-section" aria-label="Partner brands">
      <PartnerProfiles />
    </section>

    <section className="container partners-how" aria-labelledby="partners-how-title">
      <Reveal>
        <h2 id="partners-how-title" className="display d-3">Buying from a partner brand</h2>
      </Reveal>
      <Reveal as="dl" className="partners-how-list" delay={0.08}>
        <div>
          <dt>Online</dt>
          <dd>Browse the shop and filter by brand. Items marked Enquire on WhatsApp are quoted by the store rather than added to the bag.</dd>
        </div>
        <div>
          <dt>In the store</dt>
          <dd>
            {STORE_INFO.addressLine1}, {STORE_INFO.locality}, {STORE_INFO.city}. Monday to Saturday {STORE_INFO.hours.weekdays}, Sunday {STORE_INFO.hours.sunday}.
          </dd>
        </div>
        <div>
          <dt>On WhatsApp</dt>
          <dd>
            Ask about a model, a price or whether something can be ordered in:{' '}
            <a href={`${STORE_INFO.whatsappUrl}a%20partner%20brand`} target="_blank" rel="noopener noreferrer">
              {STORE_INFO.displayPhone}
            </a>
            .
          </dd>
        </div>
      </Reveal>
    </section>
  </div>
);

export default PartnersPage;
