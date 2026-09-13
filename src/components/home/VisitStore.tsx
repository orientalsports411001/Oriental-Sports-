import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, ArrowRight } from 'lucide-react';
import { STORE_INFO } from '../../data/storeInfo';

export const VisitStore: React.FC = () => {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-cream-bg)',
        color: 'var(--color-text-dark)',
        paddingTop: 'clamp(56px, 7vw, 96px)',
        paddingBottom: 'clamp(56px, 7vw, 96px)',
        borderTop: '2px solid rgba(23, 23, 23, 0.08)',
        position: 'relative',
      }}
      aria-label="Visit Oriental Sports Store in Camp, Pune"
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Store Information */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 14px',
                backgroundColor: 'var(--color-lime)',
                color: '#171717',
                borderRadius: '9999px',
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '14px',
              }}
            >
              <span>✦ THE PHYSICAL STORE</span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 7.5vw, 5.5rem)',
                lineHeight: 0.9,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                margin: '0 0 20px 0',
                color: 'var(--color-text-dark)',
              }}
            >
              COME<br />
              PLAY<br />
              <span style={{ color: 'var(--color-electric-blue)' }}>IRL.</span>
            </h2>

            <p
              style={{
                fontSize: '1.125rem',
                lineHeight: 1.5,
                color: '#555555',
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                maxWidth: '480px',
                marginBottom: '28px',
              }}
            >
              Test bats, check racquet balances, talk court builds with our team, or get same-day electronic stringing in Camp, Pune.
            </p>

            {/* Address & Hours Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid rgba(23, 23, 23, 0.1)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                marginBottom: '28px',
              }}
            >
              <div style={{ marginBottom: '16px' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: 'var(--color-electric-blue)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: '4px',
                  }}
                >
                  ORIENTAL SPORTS
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    fontSize: '1.0625rem',
                    color: 'var(--color-text-dark)',
                    lineHeight: 1.4,
                  }}
                >
                  Shop 247, MG Road, New Modikhana, Camp<br />
                  Pune — 411001
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.875rem',
                  fontFamily: 'var(--font-sans)',
                  color: '#555',
                  paddingTop: '12px',
                  borderTop: '1px solid rgba(23, 23, 23, 0.08)',
                }}
              >
                <Clock size={16} color="var(--color-electric-blue)" />
                <span>
                  <strong>Mon–Sat:</strong> 10:30 AM — 8:30 PM &nbsp;•&nbsp; <strong>Sun:</strong> 11:00 AM — 6:00 PM
                </span>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
              <a
                href={STORE_INFO.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-blue"
                style={{ padding: '14px 26px' }}
              >
                <MapPin size={16} />
                <span>GET DIRECTIONS →</span>
              </a>

              <a
                href={`tel:${STORE_INFO.phone}`}
                className="btn btn-outline-dark"
                style={{ padding: '14px 22px' }}
              >
                <Phone size={16} />
                <span>CALL NOW</span>
              </a>

              <a
                href={STORE_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-lime"
                style={{ padding: '14px 22px' }}
              >
                <MessageSquare size={16} />
                <span>WHATSAPP</span>
              </a>
            </div>
          </div>

          {/* Right Column: Actual Interactive Google Map Embed */}
          <div>
            <div
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.08)',
                border: '3px solid #FFFFFF',
                backgroundColor: '#EDE8DE',
                height: '460px',
                position: 'relative',
              }}
            >
              <iframe
                title="Oriental Sports Shop 247 MG Road Camp Pune Google Map"
                src="https://maps.google.com/maps?q=Shop+247,+MG+Road,+Camp,+Pune+411001&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Map Floating Location Pill */}
              <a
                href={STORE_INFO.mapsUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.96)',
                  backdropFilter: 'blur(8px)',
                  padding: '12px 18px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textDecoration: 'none',
                  color: 'var(--color-text-dark)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: '0.8125rem' }}>
                    ORIENTAL SPORTS CAMP
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#666' }}>
                    Shop 247, MG Road, Camp, Pune 411001
                  </div>
                </div>
                <span
                  style={{
                    backgroundColor: 'var(--color-electric-blue)',
                    color: '#FFFFFF',
                    padding: '6px 12px',
                    borderRadius: '9999px',
                    fontSize: '0.6875rem',
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 700,
                  }}
                >
                  OPEN IN MAPS →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
