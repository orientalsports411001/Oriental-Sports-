import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, ShieldCheck } from 'lucide-react';
import { STORE_INFO } from '../../data/storeInfo';
import { MEDIA } from '../../data/media';
import { MagneticButton } from '../ui/MagneticButton';

export const PuneCampStory: React.FC = () => {
  return (
    <section className="section-padding bg-ivory" aria-label="Camp Heritage & Pune Story">
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(32px, 6vw, 64px)',
            alignItems: 'center',
          }}
        >
          {/* Left: Editorial Narrative */}
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
                marginBottom: '10px',
              }}
            >
              <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-plate-gold)' }} />
              <span>THE PUNE HERITAGE</span>
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#444444', fontSize: '1.0625rem', lineHeight: 1.6, fontFamily: 'var(--font-heading)' }}>
              <p>
                Located at <strong>{STORE_INFO.addressLine1}</strong> in <strong>{STORE_INFO.locality}, {STORE_INFO.city}</strong>, Oriental Sports stands at the historic heart of Pune’s sporting tradition.
              </p>
              <p>
                From school championships at St. Vincent’s and Hutchings to weekend games at Deccan Gymkhana, Poona Club, and NDA, our Camp store has been the first stop where athletes test their bats, calibrate racquet string tension, and procure match-grade equipment.
              </p>
              <p>
                That physical retail craft fuels our infrastructure division—building tournament-standard courts across Maharashtra with the exact standard we bring to every piece of equipment on our shelves.
              </p>
            </div>

            <div style={{ marginTop: '36px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <MagneticButton
                variant="primary"
                size="md"
                onClick={() => (window.location.href = '/visit')}
              >
                <span>VISIT THE CAMP STORE</span>
                <ArrowRight size={16} />
              </MagneticButton>

              <a
                href={STORE_INFO.mapsUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  fontSize: '0.8125rem',
                  color: 'var(--color-ink)',
                  textTransform: 'uppercase',
                }}
              >
                <MapPin size={16} color="var(--color-plate-gold)" />
                <span>DIRECTIONS TO MG ROAD</span>
              </a>
            </div>
          </div>

          {/* Right: Architectural Photographic Composition */}
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
                alt="Oriental Sports Pune cricket and field equipment"
                style={{
                  width: '100%',
                  height: '500px',
                  objectFit: 'cover',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 40%, rgba(17,17,17,0.9) 100%)',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: '28px',
                  left: '28px',
                  right: '28px',
                  color: 'var(--color-pure-white)',
                  zIndex: 2,
                }}
              >
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-ui)', color: 'var(--color-plate-gold)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  THE PHYSICAL RETAIL HOUSE
                </div>
                <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display-xl)', color: '#FFFFFF', margin: '4px 0' }}>
                  SHOP 247, MG ROAD, CAMP, PUNE 411001
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#D1CBBF', fontFamily: 'var(--font-ui)' }}>
                  Monday – Saturday 10:30 AM to 8:30 PM • Sunday 11:00 AM to 6:00 PM
                </div>
              </div>
            </div>

            {/* Corner Badge */}
            <div
              style={{
                position: 'absolute',
                top: '-16px',
                right: '-16px',
                backgroundColor: 'var(--color-plate-gold)',
                color: 'var(--color-ink)',
                padding: '12px 18px',
                borderRadius: '2px',
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              }}
              className="desktop-only"
            >
              PHYSICAL SPORTS HOUSE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
