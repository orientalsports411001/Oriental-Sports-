'use client';

import React from 'react';
import { Link } from '@/lib/router-shim';
import { Product } from '@/types';
import { ProductCard } from '../products/ProductCard';
import { Reveal, RevealLines, Stagger, StaggerItem } from '../motion/Reveal';

/**
 * GEAR — "On the wall at Camp".
 * Desktop: sticky chapter column + 2×2 studio-shot products.
 * Mobile: chapter intro, then a swipeable rail with the next card peeking.
 *
 * `products` is fetched server-side (see app/page.tsx, via
 * lib/supabase/queries.ts#getFeaturedProducts) and passed down as a prop —
 * this component itself stays a client component for the motion wrappers.
 */
interface GearEditProps {
  products: Product[];
}

const SERVICES = [
  { name: 'Racquet stringing', note: 'Badminton, tennis and squash' },
  { name: 'Bat knocking-in', note: 'New willow prepared for the hard ball' },
  { name: 'Fitting advice', note: 'Grips, weights and sizes, in person' },
];

export const GearEdit: React.FC<GearEditProps> = ({ products }) => (
  <section className="gear-edit section bg-stone" aria-labelledby="gear-edit-title">
    <div className="container gear-grid">
      <div className="gear-intro">
        <div className="gear-intro-sticky">
          <Reveal as="p" className="eyebrow">Gear</Reveal>
          <RevealLines as="h2" id="gear-edit-title" lines={['On the wall', 'at Camp.']} className="display d-1 chapter-title" />
          <Reveal as="p" className="lead" delay={0.1}>
            A short edit from the store floor: a match bat, two racquets and a paddle, in stock at the Camp store.
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="service-list" aria-label="In-store services">
              {SERVICES.map((s) => (
                <li key={s.name}>
                  <span className="service-name">{s.name}</span>
                  <span className="service-note">{s.note}</span>
                </li>
              ))}
            </ul>
            <Link to="/shop" className="btn btn-primary gear-cta">
              Shop all gear <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </div>

      <Stagger as="ul" className="gear-products" stagger={0.08} amount={0.1}>
        {products.map((product) => (
          <StaggerItem as="li" key={product.id} className="gear-product">
            <ProductCard product={product} sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 78vw" />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  </section>
);

export default GearEdit;
