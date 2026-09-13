import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, CheckCircle, Layers, Sparkles, Building2, Phone } from 'lucide-react';
import { GlassPanel } from '../ui/GlassPanel';
import { COURT_PROJECTS } from '../../data/courts';

export const CourtsSection: React.FC = () => {
  const [activeProjectIdx, setActiveProjectIdx] = useState<number>(0);

  // 4 real verified court projects across Pune
  const verifiedProjects = COURT_PROJECTS.slice(0, 4);
  const currentProject = verifiedProjects[activeProjectIdx] || verifiedProjects[0];

  return (
    <section
      style={{
        backgroundColor: '#080808',
        color: '#FFFFFF',
        paddingTop: 'clamp(64px, 8vw, 110px)',
        paddingBottom: 'clamp(64px, 8vw, 110px)',
        borderBottom: '2px solid #222222',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Sports Infrastructure and Court Building"
    >
      <div className="container">
        {/* Editorial Brutalist Header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            alignItems: 'flex-end',
            marginBottom: 'clamp(36px, 6vw, 56px)',
            borderBottom: '1px solid #222222',
            paddingBottom: '28px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#C9A227', // Brand Gold
                }}
              />
              <span
                className="font-mono"
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#C9A227',
                }}
              >
                INFRASTRUCTURE // PUNE, MAHARASHTRA
              </span>
            </div>

            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.75rem, 7vw, 5.5rem)',
                lineHeight: 0.9,
                fontWeight: 900,
                color: '#FFFFFF',
                margin: 0,
                letterSpacing: '-0.03em',
              }}
            >
              WE BUILD
              <br />
              COURTS.
            </h2>
          </div>

          <div>
            <p
              style={{
                fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)',
                color: '#AAAAAA',
                lineHeight: 1.6,
                maxWidth: '520px',
                margin: '0 0 24px 0',
              }}
            >
              From professional acrylic cushion surfaces to turnkey fencing, floodlighting, and tournament markings—Oriental Sports builds the venues Pune plays in.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                to="/courts"
                data-cursor="explore"
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#C9A227',
                  color: '#080808',
                  fontSize: '0.8125rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#C9A227';
                }}
              >
                <span>START COURT INQUIRY</span>
                <ArrowRight size={15} />
              </Link>

              <Link
                to="/courts/projects"
                data-cursor="explore"
                style={{
                  padding: '12px 20px',
                  backgroundColor: 'transparent',
                  color: '#FFFFFF',
                  border: '1px solid #333333',
                  fontSize: '0.8125rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#FFFFFF';
                  e.currentTarget.style.backgroundColor = '#161616';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#333333';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <span>VIEW ALL PROJECTS ({COURT_PROJECTS.length})</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Project Selector Rail */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '12px',
            marginBottom: '32px',
          }}
        >
          {verifiedProjects.map((project, idx) => {
            const isSelected = activeProjectIdx === idx;
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => setActiveProjectIdx(idx)}
                style={{
                  padding: '14px 18px',
                  backgroundColor: isSelected ? '#1A1A1A' : '#111111',
                  border: isSelected ? '1.5px solid #C9A227' : '1px solid #222222',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      color: isSelected ? '#C9A227' : '#666666',
                    }}
                  >
                    PROJ // 0{idx + 1}
                  </span>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '0.6875rem',
                      color: '#888888',
                      textTransform: 'uppercase',
                    }}
                  >
                    {project.sport}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: isSelected ? '#FFFFFF' : '#CCCCCC',
                  }}
                >
                  {project.location.split(',')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Big Architectural Showcase Frame */}
        <div
          style={{
            position: 'relative',
            minHeight: '560px',
            border: '2px solid #262626',
            overflow: 'hidden',
            backgroundColor: '#111111',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          }}
        >
          {/* Main Full-Bleed Court Image */}
          <img
            src={currentProject.heroImage}
            alt={currentProject.title}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1200&q=80';
            }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.85) contrast(1.05)',
              transition: 'transform 0.8s cubic-bezier(0.2, 0, 0, 1)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
          />

          {/* Contrast Gradient Shroud */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(8,8,8,0.2) 0%, rgba(8,8,8,0.4) 50%, rgba(8,8,8,0.92) 100%)',
            }}
          />

          {/* Floating Liquid Glass Technical Specs Panel (Right) */}
          <div
            className="court-specs-overlay"
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              maxWidth: '380px',
              width: 'calc(100% - 48px)',
              zIndex: 3,
            }}
          >
            <GlassPanel
              variant="dark"
              blur="20px"
              style={{
                padding: '24px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Layers size={15} color="#C9A227" />
                <span className="font-mono" style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#C9A227', letterSpacing: '0.12em' }}>
                  SPECIFICATION AUDIT
                </span>
              </div>

              <h4
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  margin: '0 0 6px 0',
                }}
              >
                {currentProject.title}
              </h4>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: '#BBBBBB', marginBottom: '16px' }}>
                <MapPin size={14} color="#C9A227" />
                <span>{currentProject.location}</span>
              </div>

              {/* Verified Scope Breakdown */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px', marginBottom: '16px' }}>
                <div className="font-mono" style={{ fontSize: '0.6875rem', color: '#888888', marginBottom: '8px', textTransform: 'uppercase' }}>
                  VERIFIED BUILD SCOPE:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', fontSize: '0.8125rem', color: '#E5E0D5' }}>
                    <span style={{ width: '5px', height: '5px', backgroundColor: '#C9A227', display: 'inline-block' }} />
                    <span><strong>Surface:</strong> {currentProject.surface}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', fontSize: '0.8125rem', color: '#E5E0D5' }}>
                    <span style={{ width: '5px', height: '5px', backgroundColor: '#C9A227', display: 'inline-block' }} />
                    <span><strong>Turnkey:</strong> Laser-guided grading, fencing & line marking</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', fontSize: '0.8125rem', color: '#E5E0D5' }}>
                    <span style={{ width: '5px', height: '5px', backgroundColor: '#C9A227', display: 'inline-block' }} />
                    <span><strong>Execution:</strong> Dedicated Pune on-site engineering team</span>
                  </div>
                </div>
              </div>

              <Link
                to="/courts"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '10px',
                  backgroundColor: 'rgba(201, 162, 39, 0.2)',
                  border: '1px solid #C9A227',
                  color: '#FFFFFF',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#C9A227';
                  e.currentTarget.style.color = '#000000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(201, 162, 39, 0.2)';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
              >
                <span>REQUEST SITE CONSULTATION</span>
                <ArrowRight size={14} />
              </Link>
            </GlassPanel>
          </div>

          {/* Bottom Left: Huge Colliding Location Typography */}
          <div
            style={{
              position: 'absolute',
              bottom: '28px',
              left: '28px',
              zIndex: 2,
              maxWidth: '600px',
            }}
          >
            <span
              className="font-mono"
              style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                color: '#C9A227',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '6px',
              }}
            >
              PROJECT 0{activeProjectIdx + 1} // {currentProject.sport}
            </span>
            <h3
              className="font-display"
              style={{
                fontSize: 'clamp(1.75rem, 4.5vw, 3.25rem)',
                lineHeight: 1.05,
                fontWeight: 900,
                color: '#FFFFFF',
                margin: '0 0 10px 0',
                letterSpacing: '-0.02em',
                textShadow: '0 2px 12px rgba(0,0,0,0.8)',
              }}
            >
              {currentProject.title}
            </h3>
            <p
              style={{
                fontSize: '0.9375rem',
                color: '#CCCCCC',
                lineHeight: 1.5,
                margin: 0,
                maxWidth: '480px',
                textShadow: '0 1px 8px rgba(0,0,0,0.8)',
              }}
            >
              {currentProject.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
