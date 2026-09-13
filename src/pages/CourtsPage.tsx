import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, CheckCircle2, ArrowRight, MessageSquare, Phone, MapPin } from 'lucide-react';
import { COURT_SERVICES } from '../data/courts';
import { CourtCostEstimator } from '../components/courts/CourtCostEstimator';
import { ProjectGallery } from '../components/home/ProjectGallery';
import { STORE_INFO } from '../data/storeInfo';

export const CourtsPage: React.FC = () => {
  return (
    <div className="bg-ivory" style={{ minHeight: '80vh', paddingBottom: 'var(--space-4xl)' }}>
      {/* Hero */}
      <div
        style={{
          backgroundColor: 'var(--color-ink)',
          color: 'var(--color-ivory)',
          padding: 'clamp(48px, 8vw, 96px) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.35,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1627627256672-027a4613d028?auto=format&fit=crop&w=2000&q=80"
            alt="Courts and infrastructure"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(17,17,17,0.7) 0%, rgba(17,17,17,0.95) 85%)',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
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
              INFRASTRUCTURE DIVISION • PUNE
            </span>

            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(2.5rem, 6.5vw, 4.5rem)',
                lineHeight: 1.0,
                color: 'var(--color-pure-white)',
                marginBottom: '20px',
              }}
            >
              WE BUILD THE PLACE<br />
              <span style={{ color: 'var(--color-plate-gold)' }}>YOU PLAY.</span>
            </h1>

            <p style={{ color: '#E0DACF', fontSize: '1.125rem', lineHeight: 1.45, marginBottom: '32px' }}>
              Turn-key court engineering for clubs, private residences, educational institutions and commercial arenas across Pune and Western Maharashtra.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <a href="#court-estimator" className="btn btn-gold">
                <span>ESTIMATE COURT COST</span>
                <ArrowRight size={16} />
              </a>

              <a
                href={STORE_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-white"
              >
                <MessageSquare size={16} />
                <span>WHATSAPP CONSULTATION</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Disciplines Grid */}
      <div className="container" style={{ paddingTop: 'var(--space-3xl)' }}>
        <div style={{ marginBottom: 'var(--space-2xl)' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', marginBottom: '8px' }}>
            OUR COURT DISCIPLINES
          </h2>
          <p style={{ color: '#666', fontSize: '1rem' }}>
            From high-speed pickleball acrylic surfaces to all-weather synthetic turf setups.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-xl)' }}>
          {COURT_SERVICES.map((serv) => (
            <div
              key={serv.id}
              style={{
                backgroundColor: 'var(--color-pure-white)',
                border: '1px solid var(--color-ivory-border)',
                borderRadius: '2px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ position: 'relative', height: '220px' }}>
                <img
                  src={serv.heroImage}
                  alt={serv.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                  <span className="badge badge-gold">{serv.sport}</span>
                </div>
              </div>

              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: '8px' }}>
                    {serv.name}
                  </h3>
                  <p style={{ color: '#555555', fontSize: '0.875rem', lineHeight: 1.45, marginBottom: '16px' }}>
                    {serv.description}
                  </p>

                  <div style={{ marginBottom: '16px' }}>
                    <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#888888', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                      Available Surfaces:
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {serv.surfaceTypes.map((st, i) => (
                        <span key={i} style={{ fontSize: '0.75rem', padding: '2px 8px', backgroundColor: '#F6F3EA', borderRadius: '2px', border: '1px solid #E2DCCF' }}>
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ paddingTop: '16px', borderTop: '1px solid #E2DCCF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.6875rem', color: '#888888', display: 'block' }}>Typical Timeline</span>
                    <strong style={{ fontSize: '0.8125rem', color: '#111111' }}>{serv.leadTime}</strong>
                  </div>
                  <a
                    href="#court-estimator"
                    className="btn btn-sm btn-primary"
                  >
                    <span>ESTIMATE</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Estimator Section */}
        <div style={{ marginTop: 'var(--space-4xl)' }}>
          <CourtCostEstimator />
        </div>

        {/* Real Pune Projects Gallery */}
        <div style={{ marginTop: 'var(--space-4xl)' }}>
          <ProjectGallery />
        </div>
      </div>
    </div>
  );
};
