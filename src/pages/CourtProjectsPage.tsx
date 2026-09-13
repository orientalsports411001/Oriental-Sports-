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
            gap: 'var(--space-xl)',
          }}
        >
          {filtered.map((proj) => (
            <div
              key={proj.id}
              style={{
                backgroundColor: 'var(--color-pure-white)',
                border: '1px solid var(--color-ivory-border)',
                borderRadius: '2px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '240px' }}>
                <img
                  src={proj.heroImage}
                  alt={proj.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                  <span className="badge badge-dark">{proj.sport}</span>
                </div>
                <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                  <span className="badge badge-gold">{proj.clientType}</span>
                </div>
              </div>

              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-plate-gold)', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '6px' }}>
                    <MapPin size={14} />
                    <span>{proj.location}</span>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem', lineHeight: 1.25, marginBottom: '8px' }}>
                    {proj.title}
                  </h3>

                  <p style={{ color: '#555555', fontSize: '0.875rem', lineHeight: 1.45, marginBottom: '16px' }}>
                    {proj.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8125rem', color: '#666', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Layers size={14} color="#C9A227" />
                      <span>{proj.surface}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={14} color="#C9A227" />
                      <span>Commissioned: {proj.year}</span>
                    </div>
                  </div>
                </div>

                <div style={{ paddingTop: '16px', borderTop: '1px solid #E2DCCF' }}>
                  <Link
                    to={`/courts/${proj.slug}`}
                    className="btn btn-primary"
                    style={{ width: '100%' }}
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
