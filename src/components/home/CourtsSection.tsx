import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { MEDIA } from '../../data/media';

interface CourtService {
  id: string;
  name: string;
  description: string;
  image: string;
}

const COURT_SERVICES: CourtService[] = [
  {
    id: 'surfaces',
    name: 'SURFACE SYSTEMS',
    description: 'All-weather acrylic cushion, interlocking modular polypropylene, and certified synthetic grass engineered for Indian climate resilience.',
    image: MEDIA.courtStage02Surfaces,
  },
  {
    id: 'lighting',
    name: 'COURT LIGHTING',
    description: 'Uniform asymmetrical LED floodlighting systems engineered to minimize glare while delivering tournament-level illumination.',
    image: MEDIA.courtStage03Lighting,
  },
  {
    id: 'fencing',
    name: 'FENCING & ENCLOSURES',
    description: 'Heavy-gauge galvanized chain-link fencing, custom rebound mesh, and wind-screen systems built for club and institutional permanence.',
    image: MEDIA.courtStage04Infrastructure,
  },
  {
    id: 'lines',
    name: 'LINE MARKING',
    description: 'Precision boundary line marking according to international governing body dimensions for tennis, pickleball, badminton, and basketball.',
    image: MEDIA.courtStage01Grading,
  },
  {
    id: 'turnkey',
    name: 'TURNKEY EXECUTION',
    description: 'End-to-end site excavation, laser sub-base leveling, drainage engineering, and complete court handover across Maharashtra.',
    image: MEDIA.courtProjectBaner,
  },
];

export const CourtsSection: React.FC = () => {
  const [activeServiceId, setActiveServiceId] = useState<string>('surfaces');

  const activeService = COURT_SERVICES.find((s) => s.id === activeServiceId) || COURT_SERVICES[0];

  return (
    <section className="editorial-section" style={{ backgroundColor: 'var(--color-canvas-base)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: 'clamp(36px, 6vw, 64px)' }}>
          <span className="section-label">INFRASTRUCTURE STUDIO</span>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2.5rem, 6.5vw, 5rem)',
              color: 'var(--color-ink)',
            }}
          >
            WE BUILD COURTS.
          </h2>
        </div>

        {/* Architectural Studio Spread */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(28px, 6vw, 72px)',
            alignItems: 'center',
          }}
        >
          {/* Left: Quiet Service Index */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {COURT_SERVICES.map((service, idx) => {
              const isCurrent = service.id === activeServiceId;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActiveServiceId(service.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    paddingTop: 'clamp(14px, 2vw, 20px)',
                    paddingBottom: 'clamp(14px, 2vw, 20px)',
                    borderBottom: '1px solid var(--color-border-subtle)',
                    textAlign: 'left',
                    color: isCurrent ? 'var(--color-ink)' : 'var(--color-ink-muted)',
                    opacity: isCurrent ? 1 : 0.4,
                    transition: 'all var(--transition-normal)',
                  }}
                  aria-label={`Select court service: ${service.name}`}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: isCurrent ? 'var(--color-ink)' : 'var(--color-ink-subtle)',
                      }}
                    >
                      0{idx + 1}
                    </span>
                    <span
                      className="font-display"
                      style={{
                        fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)',
                        fontWeight: 800,
                      }}
                    >
                      {service.name}
                    </span>
                  </div>

                  <ArrowRight
                    size={18}
                    style={{
                      opacity: isCurrent ? 1 : 0,
                      transform: isCurrent ? 'translateX(0)' : 'translateX(-8px)',
                      transition: 'all var(--transition-fast)',
                    }}
                  />
                </button>
              );
            })}

            <div style={{ marginTop: '36px' }}>
              <Link to="/courts" className="btn btn-primary">
                <span>BUILD A COURT WITH US</span>
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          {/* Right: Large Architectural Photography Frame */}
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
              src={activeService.image}
              alt={activeService.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease-out',
              }}
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1200&q=80';
              }}
            />
            {/* Subtle Text Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(17,17,17,0.02) 0%, rgba(17,17,17,0.85) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 'clamp(20px, 4vw, 32px)',
                left: 'clamp(20px, 4vw, 32px)',
                right: 'clamp(20px, 4vw, 32px)',
                color: '#FFFFFF',
              }}
            >
              <h3
                className="font-display"
                style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  color: '#FFFFFF',
                  marginBottom: '8px',
                }}
              >
                {activeService.name}
              </h3>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: '#EDE8DE',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {activeService.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourtsSection;
