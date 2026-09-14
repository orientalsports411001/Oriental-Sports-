import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Navigation, ArrowRight } from 'lucide-react';
import { STORE_INFO } from '../../data/storeInfo';
import { MEDIA } from '../../data/media';

export const VisitStore: React.FC = () => {
  return (
    <section className="editorial-section" style={{ backgroundColor: 'var(--color-canvas-surface)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: 'clamp(36px, 6vw, 64px)' }}>
          <span className="section-label">PUNE CAMP FLAGSHIP</span>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2.5rem, 6.5vw, 5rem)',
              color: 'var(--color-ink)',
            }}
          >
            ESTABLISHED IN CAMP.
          </h2>
        </div>

        {/* Editorial Destination Spread */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(28px, 6vw, 72px)',
            alignItems: 'center',
          }}
        >
          {/* Left: Authentic Store Imagery */}
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              aspectRatio: '16 / 11',
              backgroundColor: '#111111',
              boxShadow: 'var(--shadow-subtle)',
            }}
          >
            <img
              src={MEDIA.heroSlide1}
              alt="Oriental Sports Store MG Road Camp Pune"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80';
              }}
            />
          </div>

          {/* Right: Clean Quiet Store Details & Direct Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: 'var(--color-ink-muted)',
                  textTransform: 'uppercase',
                }}
              >
                SINCE 1968 • PUNE, MAHARASHTRA
              </span>
              <h3
                className="font-display"
                style={{
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                  color: 'var(--color-ink)',
                  marginTop: '8px',
                  marginBottom: '16px',
                }}
              >
                ORIENTAL SPORTS
              </h3>
              <p
                style={{
                  fontSize: '1rem',
                  color: 'var(--color-ink-muted)',
                  lineHeight: 1.6,
                  maxWidth: '460px',
                }}
              >
                {STORE_INFO.addressLine1}, {STORE_INFO.addressLine2}, {STORE_INFO.city} {STORE_INFO.pincode}
                <br />
                Mon–Sat: {STORE_INFO.hours.weekdays} | Sun: {STORE_INFO.hours.sunday}
              </p>
            </div>

            {/* Direct Action Links */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                alignItems: 'center',
                paddingTop: '16px',
                borderTop: '1px solid var(--color-border-subtle)',
              }}
            >
              <Link to="/visit" className="btn btn-primary">
                <span>VISIT STORE</span>
                <ArrowRight size={16} />
              </Link>

              <a
                href={`tel:${STORE_INFO.phone}`}
                className="btn btn-outline"
                aria-label={`Call Oriental Sports at ${STORE_INFO.phone}`}
              >
                <Phone size={15} />
                <span>CALL DIRECT</span>
              </a>

              <a
                href={STORE_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                aria-label="Get Google Maps directions to Oriental Sports Camp"
              >
                <Navigation size={15} />
                <span>DIRECTIONS</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitStore;
