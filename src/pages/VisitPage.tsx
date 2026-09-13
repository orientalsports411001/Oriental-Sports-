import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, Navigation, Car, Bus, ArrowUpRight } from 'lucide-react';
import { STORE_INFO } from '../data/storeInfo';

export const VisitPage: React.FC = () => {
  return (
    <div className="bg-ivory" style={{ minHeight: '80vh', paddingBottom: 'var(--space-4xl)' }}>
      {/* Header */}
      <div
        style={{
          backgroundColor: 'var(--color-ink)',
          color: 'var(--color-ivory)',
          padding: 'var(--space-3xl) 0',
          borderBottom: '1px solid rgba(246, 243, 234, 0.08)',
        }}
      >
        <div className="container">
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-plate-gold)',
              display: 'block',
              marginBottom: '8px',
            }}
          >
            THE PHYSICAL STORE
          </span>
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              color: 'var(--color-pure-white)',
              lineHeight: 1.05,
              marginBottom: '12px',
            }}
          >
            VISIT ORIENTAL SPORTS
          </h1>
          <p style={{ color: '#C5BFB3', maxWidth: '640px', fontSize: '1rem' }}>
            Shop 247, MG Road, New Modikhana, Camp, Pune 411001. Test your equipment in hand, inspect bat clefts, or speak with our court builders in person.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 'var(--space-2xl)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-2xl)',
          }}
        >
          {/* Left: Location & Contact Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Address & Hours */}
            <div style={{ backgroundColor: 'var(--color-pure-white)', padding: '28px', borderRadius: '2px', border: '1px solid var(--color-ivory-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-plate-gold)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                <MapPin size={16} />
                <span>EXACT ADDRESS</span>
              </div>
              <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: '6px' }}>
                {STORE_INFO.name}
              </h2>
              <p style={{ color: '#555555', fontSize: '0.9375rem', lineHeight: 1.5, marginBottom: '20px' }}>
                {STORE_INFO.addressLine1}, {STORE_INFO.addressLine2}<br />
                {STORE_INFO.locality}, {STORE_INFO.city} – {STORE_INFO.pincode}<br />
                Maharashtra, India
              </p>

              <div style={{ paddingTop: '16px', borderTop: '1px solid #E2DCCF' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-plate-gold)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                  <Clock size={16} />
                  <span>STORE HOURS</span>
                </div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#111111' }}>
                  Monday – Saturday: {STORE_INFO.hours.weekdays}
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#666666' }}>
                  Sunday: {STORE_INFO.hours.sunday}
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href={STORE_INFO.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-gold btn-lg"
                style={{ width: '100%' }}
              >
                <Navigation size={18} />
                <span>OPEN IN GOOGLE MAPS</span>
              </a>

              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href={`tel:${STORE_INFO.phone}`}
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  <Phone size={16} />
                  <span>CALL {STORE_INFO.displayPhone}</span>
                </a>
                <a
                  href={STORE_INFO.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-dark"
                  style={{ flex: 1 }}
                >
                  <MessageSquare size={16} />
                  <span>WHATSAPP</span>
                </a>
              </div>
            </div>

            {/* Getting Here: Parking & Landmarks */}
            <div style={{ backgroundColor: '#EDE8DC', padding: '24px', borderRadius: '2px', border: '1px solid #E2DCCF' }}>
              <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-heading)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px' }}>
                GETTING TO THE CAMP STORE
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.875rem', color: '#444444' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Car size={18} color="#C9A227" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Parking:</strong> On-street parking available along MG Road & East Street during designated hours. Two-wheeler parking directly outside.
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Bus size={18} color="#C9A227" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Transit:</strong> Minutes from Pune Railway Station (approx. 2.5 km) and Swargate Bus Stand (approx. 3 km).
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Store Map & In-Store Experience */}
          <div>
            <div
              style={{
                backgroundColor: '#111111',
                color: '#FFFFFF',
                borderRadius: '2px',
                overflow: 'hidden',
                border: '1px solid var(--color-plate-gold)',
                marginBottom: '24px',
              }}
            >
              <div style={{ position: 'relative', height: '280px' }}>
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
                  alt="MG Road Camp Pune surroundings"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle, rgba(17,17,17,0.3) 0%, rgba(17,17,17,0.9) 100%)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    width: '90%',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-plate-gold)',
                      color: 'var(--color-ink)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px auto',
                    }}
                  >
                    <MapPin size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '4px' }}>
                    Shop 247, MG Road
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: '#C9A227' }}>
                    Camp, Pune 411001
                  </p>
                </div>
              </div>

              <div style={{ padding: '24px' }}>
                <h4 style={{ fontSize: '1rem', textTransform: 'uppercase', color: 'var(--color-plate-gold)', marginBottom: '8px' }}>
                  IN-STORE SERVICES AT CAMP
                </h4>
                <ul style={{ paddingLeft: '20px', fontSize: '0.875rem', color: '#D1CBBF', lineHeight: 1.6 }}>
                  <li>Electronic Racquet Stringing (Tennis, Badminton, Squash)</li>
                  <li>Custom Cricket Bat Knocking & Extratec Protection</li>
                  <li>Pickleball Paddle Demo Testing & Grip Fitting</li>
                  <li>Blueprints & Surface Samples for Court Construction</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
