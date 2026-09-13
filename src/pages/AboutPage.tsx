import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, MapPin, Hammer, ShoppingBag } from 'lucide-react';
import { BRAND_STORY, STORE_INFO } from '../data/storeInfo';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-ivory" style={{ minHeight: '80vh', paddingBottom: 'var(--space-4xl)' }}>
      {/* Editorial Header */}
      <div
        style={{
          backgroundColor: 'var(--color-ink)',
          color: 'var(--color-ivory)',
          padding: 'clamp(56px, 8vw, 96px) 0',
          position: 'relative',
          borderBottom: '1px solid rgba(246, 243, 234, 0.08)',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '800px' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-plate-gold)',
                display: 'block',
                marginBottom: '12px',
              }}
            >
              THE HOUSE OF ORIENTAL SPORTS
            </span>

            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.25rem)',
                lineHeight: 1.02,
                color: 'var(--color-pure-white)',
                marginBottom: '20px',
              }}
            >
              GEAR FOR THE GAME.<br />
              <span style={{ color: 'var(--color-plate-gold)' }}>COURTS FOR THE CITY.</span>
            </h1>

            <p style={{ color: '#C5BFB3', fontSize: '1.125rem', lineHeight: 1.5 }}>
              From Shop 247 on MG Road in Camp to championship arenas across Maharashtra, we represent Pune’s enduring athletic heritage.
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 'var(--space-3xl)' }}>
        {/* Narrative Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-3xl)',
            marginBottom: 'var(--space-4xl)',
          }}
        >
          <div>
            <h2 className="font-display" style={{ fontSize: '1.75rem', marginBottom: '20px' }}>
              OUR ROOTS IN CAMP
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#444444', lineHeight: 1.6, fontSize: '1rem' }}>
              {BRAND_STORY.narrative.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div style={{ marginTop: '28px' }}>
              <Link to="/visit" className="btn btn-primary">
                <span>VISIT OUR CAMP STORE</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div>
            <div style={{ backgroundColor: '#EDE8DC', padding: '32px', borderRadius: '2px', border: '1px solid #E2DCCF', marginBottom: '24px' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '16px' }}>
                THE TWO ORIENTAL PILLARS
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '2px', backgroundColor: '#111111', color: '#C9A227', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '4px' }}>1. THE EQUIPMENT HOUSE</h4>
                    <p style={{ fontSize: '0.875rem', color: '#555555', lineHeight: 1.45 }}>
                      Retail gear, digital restringing, bat knocking, and equipment testing in hand on MG Road.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '2px', backgroundColor: '#111111', color: '#C9A227', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Hammer size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '4px' }}>2. SPORTS INFRASTRUCTURE</h4>
                    <p style={{ fontSize: '0.875rem', color: '#555555', lineHeight: 1.45 }}>
                      Full-scale court design, laser grading, acrylic surfacing, turf fields and tournament floodlighting.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #E2DCCF', borderRadius: '2px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#C9A227', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '4px' }}>
                <MapPin size={16} />
                <span>PUNE HEADQUARTERS</span>
              </div>
              <div style={{ fontWeight: 800, fontSize: '1.0625rem', color: '#111111' }}>
                {STORE_INFO.name}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#666', marginTop: '2px' }}>
                {STORE_INFO.addressLine1}, {STORE_INFO.addressLine2}, {STORE_INFO.locality}, {STORE_INFO.city} 411001
              </div>
              <div style={{ marginTop: '12px' }}>
                <a href={`tel:${STORE_INFO.phone}`} style={{ color: '#111111', fontWeight: 700, fontSize: '0.875rem' }}>
                  Phone: {STORE_INFO.displayPhone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
