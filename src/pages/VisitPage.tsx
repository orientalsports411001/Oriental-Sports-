import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, ArrowRight, Wrench, Shield } from 'lucide-react';
import { STORE_INFO } from '../data/storeInfo';

export const VisitPage: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-cream-bg)',
        color: 'var(--color-text-dark)',
        minHeight: '85vh',
        paddingBottom: 'clamp(56px, 7vw, 96px)',
      }}
    >
      {/* Hero: Warm Cream Background with Playful Typography */}
      <div
        style={{
          paddingTop: 'clamp(40px, 6vw, 72px)',
          paddingBottom: 'clamp(32px, 5vw, 48px)',
        }}
      >
        <div className="container">
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
              marginBottom: '16px',
            }}
          >
            <span>✦ THE PHYSICAL STORE</span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.5rem, 9vw, 6.5rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.035em',
              textTransform: 'uppercase',
              color: 'var(--color-text-dark)',
              margin: '0 0 20px 0',
            }}
          >
            COME<br />
            PLAY<br />
            <span style={{ color: 'var(--color-electric-blue)' }}>IRL.</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.0625rem, 2vw, 1.25rem)',
              lineHeight: 1.5,
              color: '#555555',
              fontFamily: 'var(--font-sans)',
              fontWeight: 500,
              maxWidth: '580px',
            }}
          >
            Visit our Camp sports house to test bat balances, check racquet string tension, speak with our court builders, or pick up tournament gear in person.
          </p>
        </div>
      </div>

      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'start',
          }}
        >
          {/* Left: Confirmed Store Information */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Address Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: '32px',
                border: '1px solid rgba(23, 23, 23, 0.1)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: 'var(--color-electric-blue)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}
              >
                FLAGSHIP STORE LOCATION
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.75rem',
                  lineHeight: 1.1,
                  color: 'var(--color-text-dark)',
                  margin: '0 0 12px 0',
                }}
              >
                ORIENTAL SPORTS
              </h2>

              <p
                style={{
                  fontSize: '1.125rem',
                  lineHeight: 1.5,
                  color: '#333333',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  margin: '0 0 20px 0',
                }}
              >
                Shop 247, MG Road<br />
                New Modikhana, Camp<br />
                Pune — 411001
              </p>

              {/* Operating Hours */}
              <div
                style={{
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(23, 23, 23, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 800,
                    fontSize: '0.75rem',
                    color: 'var(--color-tangerine)',
                    textTransform: 'uppercase',
                  }}
                >
                  <Clock size={16} />
                  <span>STORE HOURS</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9375rem', color: '#444' }}>
                  <span>Monday – Saturday:</span>
                  <strong>10:30 AM — 8:30 PM</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9375rem', color: '#444' }}>
                  <span>Sunday:</span>
                  <strong>11:00 AM — 6:00 PM</strong>
                </div>
              </div>

              {/* In-Store Services */}
              <div
                style={{
                  marginTop: '20px',
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(23, 23, 23, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: '#555' }}>
                  <Wrench size={15} color="var(--color-electric-blue)" />
                  <span>Professional In-Store Racquet Stringing Counter</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: '#555' }}>
                  <MapPin size={15} color="var(--color-tangerine)" />
                  <span>Court Consultation Desk for Schools & Clubs</span>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <a
                href={STORE_INFO.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-blue"
                style={{ padding: '16px 28px', flex: 1 }}
              >
                <MapPin size={18} />
                <span>GET DIRECTIONS →</span>
              </a>

              <a
                href={`tel:${STORE_INFO.phone}`}
                className="btn btn-outline-dark"
                style={{ padding: '16px 24px' }}
              >
                <Phone size={18} />
                <span>CALL: {STORE_INFO.displayPhone}</span>
              </a>

              <a
                href={STORE_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-lime"
                style={{ padding: '16px 24px' }}
              >
                <MessageSquare size={18} />
                <span>WHATSAPP</span>
              </a>
            </div>
          </div>

          {/* Right: Actual Interactive Google Map Embed */}
          <div>
            <div
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 48px rgba(0, 0, 0, 0.08)',
                border: '4px solid #FFFFFF',
                backgroundColor: '#EDE8DE',
                height: '520px',
                position: 'relative',
              }}
            >
              <iframe
                title="Oriental Sports Google Maps Location"
                src="https://maps.google.com/maps?q=Shop+247,+MG+Road,+Camp,+Pune+411001&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Bottom Quick Directions Bar */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '18px',
                  left: '18px',
                  right: '18px',
                  backgroundColor: '#FFFFFF',
                  padding: '14px 20px',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: '0.875rem' }}>
                    Shop 247, MG Road, Camp
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#666' }}>
                    Pune 411001 • Open Today
                  </div>
                </div>

                <a
                  href={STORE_INFO.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-blue btn-sm"
                  style={{ textDecoration: 'none' }}
                >
                  <span>DIRECTIONS →</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
