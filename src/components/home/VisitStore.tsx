import React from 'react';
import { MapPin, Phone, Mail, Navigation, Clock, Wrench, ArrowRight } from 'lucide-react';
import { STORE_INFO } from '../../data/storeInfo';
import { GlassPanel } from '../ui/GlassPanel';

export const VisitStore: React.FC = () => {
  return (
    <section
      style={{
        backgroundColor: '#F7F5EE', // Warm Ivory Base
        paddingTop: 'clamp(64px, 8vw, 110px)',
        paddingBottom: 'clamp(64px, 8vw, 110px)',
        borderBottom: '2px solid #111111',
      }}
      aria-label="Visit Oriental Sports Flagship Store in Camp, Pune"
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: 'clamp(32px, 5vw, 48px)',
            borderBottom: '2px solid #111111',
            paddingBottom: '20px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#C9A227',
                }}
              />
              <span
                className="font-mono"
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#111111',
                }}
              >
                PUNE HEADQUARTERS // CAMP WORKSHOP
              </span>
            </div>

            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.75rem)',
                lineHeight: 0.95,
                color: '#111111',
                margin: 0,
                letterSpacing: '-0.03em',
              }}
            >
              COME VISIT.
            </h2>
          </div>

          <div className="font-mono" style={{ fontSize: '0.8125rem', color: '#666666' }}>
            SHOP 247, MG ROAD, CAMP, PUNE 411001
          </div>
        </div>

        {/* Editorial Split Composition: Store Photography with Floating Glass Overlap */}
        <div
          style={{
            position: 'relative',
            border: '2px solid #111111',
            backgroundColor: '#111111',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,0.08)',
          }}
        >
          {/* Main Large Store Photograph */}
          <div
            style={{
              position: 'relative',
              minHeight: 'clamp(420px, 50vw, 560px)',
              overflow: 'hidden',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1600&q=80"
              alt="Oriental Sports Store equipment and racquet restringing bench at Camp, Pune"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80';
              }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.85) contrast(1.05)',
                transition: 'transform 0.6s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
            />

            {/* Gradient Overlay for Typography Contrast */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(90deg, rgba(17,17,17,0.7) 0%, rgba(17,17,17,0.2) 50%, rgba(17,17,17,0.85) 100%)',
              }}
            />

            {/* Left Edge: Brutalist Colliding Headline */}
            <div
              className="desktop-only"
              style={{
                position: 'absolute',
                bottom: '36px',
                left: '36px',
                zIndex: 2,
                color: '#FFFFFF',
                maxWidth: '480px',
              }}
            >
              <div
                className="font-mono"
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: '#C9A227',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}
              >
                EQUIPMENT LAB & WORKSHOP
              </div>
              <h3
                className="font-display"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  lineHeight: 1.0,
                  fontWeight: 900,
                  color: '#FFFFFF',
                  margin: '0 0 12px 0',
                }}
              >
                THE SPORTS HOUSE OF PUNE.
              </h3>
              <p style={{ fontSize: '0.9375rem', color: '#DDDDDD', lineHeight: 1.5, margin: 0 }}>
                Test paddles in-hand. Feel willow grain. Consult with technicians on string tensions, bat knocking, and court surface systems.
              </p>
            </div>
          </div>

          {/* Floating Liquid Glass Address & Details Card (Overlapping) */}
          <div
            style={{
              position: 'relative',
              backgroundColor: '#FFFFFF',
              borderTop: '2px solid #111111',
              padding: 'clamp(28px, 4vw, 44px)',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '32px',
                alignItems: 'center',
              }}
            >
              {/* Address & Direction */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <MapPin size={18} color="#2457FF" />
                  <span className="font-mono" style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#2457FF', letterSpacing: '0.12em' }}>
                    PHYSICAL LOCATION
                  </span>
                </div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#111111', margin: '0 0 6px 0' }}>
                  ORIENTAL SPORTS
                </h4>
                <p style={{ fontSize: '0.9375rem', color: '#555555', lineHeight: 1.5, margin: 0 }}>
                  247, MG Road, New Modikhana<br />
                  Camp, Pune 411001, Maharashtra
                </p>
              </div>

              {/* Working Hours & Telephone */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Clock size={16} color="#C9A227" />
                  <span className="font-mono" style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#111111', letterSpacing: '0.12em' }}>
                    STORE TIMINGS
                  </span>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#333333', lineHeight: 1.5, margin: '0 0 10px 0' }}>
                  <strong>Monday – Saturday:</strong> 10:00 AM – 8:30 PM<br />
                  <strong>Sunday:</strong> Closed for inventory & court builds
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={15} color="#111111" />
                  <a
                    href={`tel:${STORE_INFO.phone}`}
                    className="font-mono"
                    style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#111111', textDecoration: 'none' }}
                  >
                    {STORE_INFO.displayPhone}
                  </a>
                </div>
              </div>

              {/* Workshop Bench Capabilities */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Wrench size={16} color="#111111" />
                  <span className="font-mono" style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#111111', letterSpacing: '0.12em' }}>
                    ON-SITE WORKSHOP
                  </span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8125rem', color: '#555555' }}>
                  <li>✓ Electronic Racquet Restringing (Tennis/Badminton/Squash)</li>
                  <li>✓ English Willow Cricket Bat Knocking & Oiling</li>
                  <li>✓ Grip Customization & Overgrip Application</li>
                </ul>
              </div>

              {/* Direct CTAs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a
                  href={STORE_INFO.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="view"
                  style={{
                    padding: '14px 24px',
                    backgroundColor: '#111111',
                    color: '#FFFFFF',
                    fontSize: '0.8125rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#2457FF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#111111';
                  }}
                >
                  <Navigation size={16} />
                  <span>GET DIRECTIONS ON MAPS</span>
                </a>

                <a
                  href={`tel:${STORE_INFO.phone}`}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#FFFFFF',
                    color: '#111111',
                    border: '2px solid #111111',
                    fontSize: '0.8125rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#F7F5EE';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }}
                >
                  <Phone size={15} />
                  <span>CALL STORE (+91 98909 90022)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
