import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Calendar, Layers } from 'lucide-react';
import { COURT_PROJECTS } from '../data/courts';

export const CourtProjectsPage: React.FC = () => {
  const [filterSport, setFilterSport] = useState<string>('all');

  const sports = ['all', ...new Set(COURT_PROJECTS.map((p) => p.sport))];

  const filtered = filterSport === 'all'
    ? COURT_PROJECTS
    : COURT_PROJECTS.filter((p) => p.sport === filterSport);

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
            EXECUTION PORTFOLIO
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
            COURT PROJECTS IN PUNE
          </h1>
          <p style={{ color: '#C5BFB3', maxWidth: '640px', fontSize: '1rem' }}>
            Verified sports surfaces, pickleball arenas, championship tennis hardcourts and rooftop turf facilities across Pune.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 'var(--space-2xl)' }}>
        {/* Sport Filter Tabs */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {sports.map((sp) => (
            <button
              key={sp}
              type="button"
              onClick={() => setFilterSport(sp)}
              style={{
                padding: '8px 16px',
                fontSize: '0.8125rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                borderRadius: '2px',
                backgroundColor: filterSport === sp ? 'var(--color-ink)' : 'var(--color-pure-white)',
                color: filterSport === sp ? 'var(--color-pure-white)' : 'var(--color-ink)',
                border: '1px solid var(--color-ivory-border)',
                cursor: 'pointer',
                textTransform: 'uppercase',
              }}
            >
              {sp === 'all' ? 'All Projects' : sp}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 'clamp(24px, 3vw, 36px)',
          }}
        >
          {filtered.map((proj) => (
            <div
              key={proj.id}
              style={{
                backgroundColor: 'var(--color-pure-white)',
                border: '2px solid #111111',
                boxShadow: '6px 6px 0px #111111',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '240px', borderBottom: '2px solid #111111', overflow: 'hidden' }}>
                <img
                  src={proj.heroImage}
                  alt={proj.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                  <span className="badge badge-dark" style={{ border: '1px solid rgba(255,255,255,0.3)', boxShadow: '2px 2px 0px #111111' }}>{proj.sport}</span>
                </div>
                <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                  <span className="badge badge-gold" style={{ boxShadow: '2px 2px 0px #111111' }}>{proj.clientType}</span>
                </div>
              </div>

              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-plate-gold)', fontSize: '0.8125rem', fontWeight: 800, marginBottom: '6px' }}>
                    <MapPin size={14} />
                    <span>{proj.location}</span>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem', lineHeight: 1.2, marginBottom: '8px', color: '#111111' }}>
                    {proj.title}
                  </h3>

                  <p style={{ color: '#444444', fontSize: '0.9375rem', lineHeight: 1.45, marginBottom: '16px' }}>
                    {proj.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8125rem', color: '#555555', marginBottom: '20px', padding: '10px 12px', backgroundColor: '#F6F3EA', border: '1px solid #111111' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Layers size={14} color="#C9A227" />
                      <span style={{ fontWeight: 700 }}>{proj.surface}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Calendar size={14} color="#C9A227" />
                      <span>Commissioned: <strong>{proj.year}</strong></span>
                    </div>
                  </div>
                </div>

                <div style={{ paddingTop: '16px', borderTop: '2px solid #111111' }}>
                  <Link
                    to={`/courts/${proj.slug}`}
                    className="btn btn-primary"
                    style={{ width: '100%', boxShadow: '3px 3px 0px #C9A227' }}
                  >
                    <span>VIEW CASE STUDY</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
