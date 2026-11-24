import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PARTNER_BRANDS, PartnerBrand } from '../../data/partnerBrands';

/** Width of one logo plate plus its gap at the widest breakpoint. Only used to size the loop. */
const SLOT_PX = 260;
/** Each half of the loop must be wider than the widest container (1440px) so no gap ever shows. */
const MIN_GROUP_PX = 1700;
const SPEED_PX_PER_S = 40;

const Chip: React.FC<{ brand: PartnerBrand; isCopy: boolean }> = ({ brand, isCopy }) => (
  <li className={`partner-chip-item${isCopy ? ' is-copy' : ''}`} aria-hidden={isCopy || undefined}>
    <a
      className="partner-chip"
      href={brand.url}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={isCopy ? -1 : undefined}
    >
      <img
        src={brand.logo}
        srcSet={`${brand.logoSmall} 450w, ${brand.logo} 900w`}
        sizes="170px"
        width={brand.logoWidth}
        height={brand.logoHeight}
        alt={isCopy ? '' : brand.name}
        loading="eager"
        decoding="async"
        draggable={false}
        // low priority: this strip is below the fold. Lowercase attribute because React 18 warns on fetchPriority.
        {...{ fetchpriority: 'low' }}
      />
      {!isCopy && <span className="visually-hidden"> (opens {brand.displayUrl} in a new tab)</span>}
    </a>
  </li>
);

/**
 * PARTNER BRANDS — a small strip of logos that scrolls sideways. Each logo
 * opens the brand's own website. The strip pauses on hover or keyboard focus;
 * with reduced motion it is a still row instead. It only moves while it is on
 * screen, so it starts from the first logo each time.
 * Only the first copy of each logo is exposed to keyboard and screen readers.
 */
export const PartnerBrands: React.FC = () => {
  const [onScreen, setOnScreen] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setOnScreen(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (PARTNER_BRANDS.length === 0) return null;

  const sets = Math.max(1, Math.ceil(MIN_GROUP_PX / (PARTNER_BRANDS.length * SLOT_PX)));
  const duration = Math.round((PARTNER_BRANDS.length * sets * SLOT_PX) / SPEED_PX_PER_S);

  const group = (groupIndex: number) => (
    <ul className="partner-group" aria-hidden={groupIndex > 0 || undefined}>
      {Array.from({ length: sets }).flatMap((_, setIndex) =>
        PARTNER_BRANDS.map((brand) => (
          <Chip key={`${groupIndex}-${setIndex}-${brand.id}`} brand={brand} isCopy={groupIndex > 0 || setIndex > 0} />
        ))
      )}
    </ul>
  );

  return (
    <section className="partner-brands is-dark" aria-labelledby="partner-brands-title">
      <div className="container">
        <div className="partner-head">
          <h2 id="partner-brands-title" className="display d-4 partner-title">Partner brands</h2>
          <div className="partner-controls">
            <Link to="/partners" className="link-arrow">
              All partners <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div
          ref={marqueeRef}
          className={`partner-marquee${onScreen ? '' : ' is-paused'}`}
          style={{ '--partner-duration': `${duration}s` } as React.CSSProperties}
        >
          <div className="partner-track">
            {group(0)}
            {group(1)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerBrands;
