import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { MEDIA } from '../../data/media';

export const CourtsSection: React.FC = () => {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-tangerine)',
        color: '#FFFFFF',
        paddingTop: 'clamp(56px, 7vw, 96px)',
        paddingBottom: 'clamp(56px, 7vw, 96px)',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Build A Court Infrastructure"
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
          {/* Left Column: Punchy Headline, Copy, Action Buttons */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 14px',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '9999px',
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-lime)',
                marginBottom: '16px',
              }}
            >
              <span>✦ INFRASTRUCTURE & CONSTRUCTION</span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 7.5vw, 5.75rem)',
                lineHeight: 0.9,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                margin: '0 0 24px 0',
              }}
            >
              WE BUILD<br />
              THE PLACE<br />
              <span style={{ color: 'var(--color-lime)' }}>YOU PLAY.</span>
            </h2>

            <p
              style={{
                fontSize: 'clamp(1.0625rem, 2vw, 1.25rem)',
                lineHeight: 1.5,
                color: '#FFF3EB',
                fontFamily: 'var(--font-sans)',
                fontWeight: 500,
                maxWidth: '520px',
                marginBottom: '28px',
              }}
            >
              Turnkey court setup for pickleball, tennis, badminton, and multi-sport facilities in Pune. From on-site evaluation to tournament surfaces and sports floodlighting.
            </p>

            {/* Quick Feature Tags */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                marginBottom: '36px',
              }}
            >
              {['Regulation Layouts', 'Acrylic Cushion Surfaces', 'Sports Floodlighting', 'Camp Headquartered'].map(
                (item) => (
                  <div
                    key={item}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: 'rgba(255, 255, 255, 0.18)',
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      fontSize: '0.8125rem',
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 700,
                    }}
                  >
                    <CheckCircle2 size={13} color="var(--color-lime)" />
                    <span>{item}</span>
                  </div>
                )
              )}
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
              <Link
                to="/courts"
                className="btn btn-navy"
                style={{
                  backgroundColor: 'var(--color-dark-navy)',
                  color: '#FFFFFF',
                  padding: '16px 32px',
                  fontSize: '0.9375rem',
                  textDecoration: 'none',
                }}
              >
                <span>COURT CONSULTATION →</span>
              </Link>

              <Link
                to="/courts/projects"
                className="btn btn-outline-white"
                style={{
                  padding: '16px 32px',
                  fontSize: '0.9375rem',
                  textDecoration: 'none',
                }}
              >
                <span>VIEW PROJECTS →</span>
              </Link>
            </div>
          </div>

          {/* Right Column: One Big, Beautiful Court Photograph */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.28)',
                border: '4px solid rgba(255, 255, 255, 0.2)',
                backgroundColor: '#1E2333',
                position: 'relative',
              }}
            >
              <img
                src={MEDIA.heroSlide3}
                alt="Newly constructed championship sports court in Pune under dusk floodlights"
                loading="lazy"
                style={{
                  width: '100%',
                  height: 'clamp(360px, 45vw, 480px)',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, transparent 50%, rgba(14, 19, 38, 0.85) 100%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  right: '24px',
                  color: '#FFFFFF',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.6875rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    color: 'var(--color-lime)',
                    textTransform: 'uppercase',
                  }}
                >
                  PUNE & MAHARASHTRA BUILDS
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    marginTop: '2px',
                  }}
                >
                  Turnkey Court Construction & Setup
                </div>
              </div>
            </div>

            {/* Playful Floating Badge */}
            <div
              style={{
                position: 'absolute',
                top: '-12px',
                right: '24px',
                backgroundColor: 'var(--color-lime)',
                color: '#171717',
                padding: '8px 18px',
                borderRadius: '9999px',
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: '0.75rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              }}
            >
              EST. CAMP, PUNE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
