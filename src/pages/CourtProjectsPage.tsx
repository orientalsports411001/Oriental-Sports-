import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowUpRight, Layers, Calendar } from 'lucide-react';
import { COURT_PROJECTS } from '../data/courts';

/**
 * CourtProjectsPage — Architectural Sports Infrastructure Portfolio.
 *
 * Design Direction:
 * - Cosmos-style editorial canvas with asymmetric masonry rhythm.
 * - Clean architectural framing, restrained typography, zero brutalist fake badges.
 * - Canonical tokens only: #FAF7F2 ivory, #17181A ink, #C9A227 gold.
 */
export const CourtProjectsPage: React.FC = () => {
  const [filterSport, setFilterSport] = useState<string>('all');

  const sports = ['all', ...new Set(COURT_PROJECTS.map((p) => p.sport))];

  const filtered = filterSport === 'all'
    ? COURT_PROJECTS
    : COURT_PROJECTS.filter((p) => p.sport === filterSport);

  return (
    <div
      style={{
        backgroundColor: 'var(--color-canvas-base)',
        minHeight: '100vh',
        color: 'var(--color-ink)',
        paddingBottom: 'clamp(80px, 10vw, 140px)',
      }}
    >
      {/* Portfolio Masthead */}
      <header
        style={{
          backgroundColor: 'var(--color-ink)',
          color: 'var(--color-canvas-base)',
          padding: 'clamp(64px, 8vw, 110px) 0 clamp(48px, 6vw, 80px)',
          borderBottom: '1px solid #222222',
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                backgroundColor: 'var(--color-brand-gold)',
                borderRadius: '50%',
              }}
            />
            <span
              className="font-mono"
              style={{
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(250, 247, 242, 0.7)',
              }}
            >
              INFRASTRUCTURE & SURFACING // PUNE
            </span>
          </div>

          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(2.75rem, 6.5vw, 5.25rem)',
              color: 'var(--color-canvas-base)',
              lineHeight: 0.94,
              letterSpacing: '-0.035em',
              textTransform: 'uppercase',
              margin: '0 0 16px 0',
              maxWidth: '900px',
            }}
          >
            COMMISSIONED COURTS
          </h1>

          <p
            style={{
              color: 'rgba(250, 247, 242, 0.75)',
              maxWidth: '620px',
              fontSize: 'clamp(0.9375rem, 1.2vw, 1.0625rem)',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Turnkey sports facility design, ITF & USAPA multi-layer acrylic court systems,
            championship pickleball complexes, and multi-sport turf installations across Pune.
          </p>
        </div>
      </header>

      {/* Main Canvas */}
      <main className="container" style={{ paddingTop: 'clamp(32px, 4vw, 56px)' }}>
        {/* Disciplines Filter Bar */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: 'clamp(32px, 4vw, 48px)',
            alignItems: 'center',
          }}
        >
          {sports.map((sp) => {
            const isActive = filterSport === sp;
            return (
              <button
                key={sp}
                type="button"
                onClick={() => setFilterSport(sp)}
                style={{
                  padding: '10px 18px',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: isActive ? 'var(--color-ink)' : '#FFFFFF',
                  color: isActive ? 'var(--color-canvas-base)' : 'var(--color-ink)',
                  border: isActive ? '1px solid var(--color-ink)' : '1px solid var(--color-border-subtle)',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  minHeight: '44px',
                  transition: 'all 0.18s ease',
                }}
              >
                {sp === 'all' ? 'All Disciplines' : sp}
              </button>
            );
          })}
        </div>

        {/* Asymmetric Editorial Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 'clamp(28px, 3.5vw, 44px)',
          }}
        >
          {filtered.map((proj) => (
            <Link
              key={proj.id}
              to={`/courts/${proj.slug}`}
              data-cursor="view"
              style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-xs)',
                overflow: 'hidden',
                textDecoration: 'none',
                color: 'var(--color-ink)',
                transition: 'border-color 0.22s ease, transform 0.22s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-ink)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
                e.currentTarget.style.transform = 'translateY(0px)';
              }}
            >
              {/* Photo Canvas */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 10',
                  overflow: 'hidden',
                  backgroundColor: '#111111',
                }}
              >
                <img
                  src={proj.heroImage}
                  alt={proj.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />

                {/* Subdued Discipline Tag */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: 'rgba(23, 24, 26, 0.85)',
                    backdropFilter: 'blur(6px)',
                    color: 'var(--color-canvas-base)',
                    padding: '4px 10px',
                    fontSize: '0.6875rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    borderRadius: 'var(--radius-xs)',
                  }}
                >
                  {proj.sport}
                </div>

                {/* Client / Venue Tag */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: 'rgba(23, 24, 26, 0.85)',
                    backdropFilter: 'blur(6px)',
                    color: 'var(--color-brand-gold)',
                    padding: '4px 10px',
                    fontSize: '0.6875rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    borderRadius: 'var(--radius-xs)',
                  }}
                >
                  {proj.clientType}
                </div>
              </div>

              {/* Details Section */}
              <div
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: 'var(--color-ink-subtle)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                    }}
                  >
                    <MapPin size={13} color="var(--color-brand-gold)" />
                    <span>{proj.location}</span>
                  </div>

                  <h2
                    className="font-display"
                    style={{
                      fontSize: '1.375rem',
                      fontWeight: 800,
                      lineHeight: 1.2,
                      margin: '0 0 10px 0',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {proj.title}
                  </h2>

                  <p
                    style={{
                      color: '#555555',
                      fontSize: '0.875rem',
                      lineHeight: 1.55,
                      margin: '0 0 20px 0',
                    }}
                  >
                    {proj.description}
                  </p>
                </div>

                {/* Metadata Strip */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      backgroundColor: 'var(--color-canvas-subtle, #F7F5EE)',
                      borderRadius: 'var(--radius-xs)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--color-ink)',
                      marginBottom: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Layers size={14} color="var(--color-brand-gold)" />
                      <span style={{ fontWeight: 700 }}>{proj.surface}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-ink-subtle)' }}>
                      <Calendar size={13} />
                      <span>{proj.year}</span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '12px',
                      borderTop: '1px solid var(--color-border-subtle)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    <span>EXPLORE PROJECT CASE</span>
                    <ArrowUpRight size={16} color="var(--color-brand-gold)" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CourtProjectsPage;
