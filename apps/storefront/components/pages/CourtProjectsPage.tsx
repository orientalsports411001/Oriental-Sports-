'use client';

import React, { useState } from 'react';
import { Link } from '@/lib/router-shim';
import { COURT_PROJECTS } from '@/data/courts';
import { PageHeader } from '@/components/ui/PageHeader';
import { Img } from '@/components/ui/Img';

export const CourtProjectsPage: React.FC = () => {
  const [filterSport, setFilterSport] = useState<string>('all');
  const sports = ['all', ...new Set(COURT_PROJECTS.map((p) => p.sport))];
  const filtered = filterSport === 'all' ? COURT_PROJECTS : COURT_PROJECTS.filter((p) => p.sport === filterSport);

  return (
    <div className="projects-page">
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Courts', to: '/courts' }, { label: 'Projects' }]}
        title={['Courts in', 'play.']}
        lead="Courts we have built for clubs, homes and commercial venues around Pune."
      />

      <div className="container projects-body">
        <div className="filter-chips projects-filter" role="group" aria-label="Filter by sport">
          {sports.map((sp) => (
            <button key={sp} type="button" className="chip" aria-pressed={filterSport === sp} onClick={() => setFilterSport(sp)}>
              {sp === 'all' ? 'All sports' : sp}
            </button>
          ))}
        </div>

        <ul className="project-grid">
          {filtered.map((proj) => (
            <li key={proj.id} className="project-card">
              <Link to={`/courts/${proj.slug}`} className="project-card-link">
                <span className="project-card-media">
                  <Img image={proj.heroImage} alt="" sizes="(min-width: 768px) 45vw, 100vw" />
                </span>
                <span className="label subtle">{proj.sport} · {proj.location} · {proj.year}</span>
                <span className="project-card-title">{proj.title}</span>
                <span className="project-card-surface">{proj.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourtProjectsPage;
