import React from 'react';
import { Phone, MessageSquare, MapPin, ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import { STORE_INFO } from '../../data/storeInfo';
import { MEDIA } from '../../data/media';
import { MagneticButton } from '../ui/MagneticButton';

export const PuneCampStory: React.FC = () => {
  return (
    <section
      className="section-padding bg-ivory"
      style={{
        borderBottom: '1px solid var(--color-ivory-border)',
        backgroundColor: '#F6F3EA',
      }}
      aria-label="Camp Heritage and Pune Sports House"
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(32px, 6vw, 64px)',
            alignItems: 'center',
          }}
        >
          {/* LEFT: EDITORIAL NARRATIVE */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-ui)',
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-plate-gold)',
                marginBottom: '12px',
              }}
            >
              <span
                style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-plate-gold)' }}
              />
              <span>PUNE'S SPORTS HOUSE</span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display-xl)',
                fontSize: 'clamp(3.25rem, 8vw, 5.5rem)',
                lineHeight: 0.88,
                letterSpacing: '-0.035em',
                textTransform: 'uppercase',
                color: 'var(--color-ink)',
                margin: '0 0 24px 0',
              }}
            >
              ROOTED IN CAMP.<br />
              <span style={{ color: 'var(--color-plate-gold)' }}>BUILT FOR THE GAME.</span>
            </h2>

            {/* Factual Address Display */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-ivory-border)',
                borderLeft: '4px solid var(--color-plate-gold)',
                padding: '16px 20px',
                borderRadius: '2px',
                marginBottom: '24px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6875rem',
                  fontWeight: 800,
                  color: 'var(--color-plate-gold)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}
              >
                FLAGSHIP STORE ADDRESS
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display-xl)',
                  fontSize: '1.5rem',
                  color: 'var(--color-ink)',
                  lineHeight: 1.1,
                }}
              >
                SHOP 247, MG ROAD, NEW MODIKHANA, CAMP, PUNE 411001
              </div>
              <div
                style={{
                  fontSize: '0.8125rem',
                  color: '#666',
                  fontFamily: 'var(--font-ui)',
                  marginTop: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Clock size={13} color="var(--color-plate-gold)" />
                <span>Monday – Saturday 10:30 AM to 8:30 PM • Sunday 11:00 AM to 6:00 PM</span>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                color: '#444444',
                fontSize: '1.0625rem',
                lineHeight: 1.6,
                fontFamily: 'var(--font-heading)',
              }}
            >
              <p>
                From school tournaments at St. Vincent’s and Hutchings to weekend competition at Deccan Gymkhana, Poona Club, and NDA, our Camp store has been the first stop where Pune’s athletes test bat balances, calibrate racquet string tension, and procure match-grade equipment.
              </p>
              <p>
                That physical retail knowledge fuels our court construction division—engineering tournament-grade acrylic surfaces, floodlights, and synthetic turfs across Maharashtra with the exact standard we bring to every piece of equipment on our shelves.
              </p>
            </div>

            {/* 3 ACTION BUTTONS: Call, WhatsApp, Directions */}
            <div
              style={{
                marginTop: '32px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                alignItems: 'center',
              }}
            >
              {/* WhatsApp Button */}
              <a
                href={STORE_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-gold"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  minHeight: '46px',
                  padding: '12px 20px',
                  textDecoration: 'none',
                }}
                aria-label="WhatsApp Oriental Sports"
              >
                <MessageSquare size={16} />
                <span>WHATSAPP US</span>
              </a>

              {/* Direct Call Button */}
              <a
                href={`tel:${STORE_INFO.phone}`}
                className="btn btn-outline-dark"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  minHeight: '46px',
                  padding: '12px 20px',
                  textDecoration: 'none',
                }}
                aria-label="Call Oriental Sports"
              >
                <Phone size={16} />
                <span>CALL: {STORE_INFO.displayPhone}</span>
              </a>

              {/* Directions Button */}
              <a
                href={STORE_INFO.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-dark"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  minHeight: '46px',
                  padding: '12px 20px',
                  textDecoration: 'none',
                }}
                aria-label="Get Directions to MG Road Camp Store"
              >
                <MapPin size={16} color="var(--color-plate-gold)" />
                <span>GET DIRECTIONS</span>
              </a>
            </div>
          </div>

          {/* RIGHT: PHOTOGRAPHIC ARCHITECTURAL COMPOSITION */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                width: '100%',
                borderRadius: '2px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-card)',
                backgroundColor: 'var(--color-ink)',
                position: 'relative',
              }}
            >
              <img
                src={MEDIA.puneCampExterior}
                alt="Oriental Sports Camp Pune retail store and gear showcase"
                style={{
                  width: '100%',
                  height: '480px',
                  objectFit: 'cover',
                  filter: 'contrast(1.08) brightness(0.92)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, transparent 40%, rgba(17,17,17,0.92) 100%)',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  right: '24px',
                  color: 'var(--color-pure-white)',
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    fontSize: '0.6875rem',
                    fontFamily: 'var(--font-ui)',
                    color: 'var(--color-plate-gold)',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  THE PHYSICAL RETAIL HOUSE
                </div>
                <div
                  style={{
                    fontSize: '1.375rem',
                    fontFamily: 'var(--font-display-xl)',
                    color: '#FFFFFF',
                    margin: '4px 0',
                  }}
                >
                  SHOP 247, MG ROAD, NEW MODIKHANA, CAMP, PUNE 411001
                </div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: '#D1CBBF',
                    fontFamily: 'var(--font-ui)',
                  }}
                >
                  Near Shivaji Market / East Street Junction • In-Store Racquet Stringing Counter
                </div>
              </div>
            </div>

            {/* Corner Badge */}
            <div
              style={{
                position: 'absolute',
                top: '-14px',
                right: '-14px',
                backgroundColor: 'var(--color-plate-gold)',
                color: 'var(--color-ink)',
                padding: '10px 16px',
                borderRadius: '2px',
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: '0.6875rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
              }}
              className="desktop-only"
            >
              ESTABLISHED IN CAMP, PUNE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
