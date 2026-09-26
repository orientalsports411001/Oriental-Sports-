import React from 'react';
import { Link } from 'react-router-dom';
import { COURT_PROJECTS } from '../../data/courts';
import { Img } from '../ui/Img';
import { Reveal, RevealLines, Stagger, StaggerItem } from '../motion/Reveal';

/** Court projects — each card is a single link to its case study. */
export const ProjectGallery: React.FC = () => (
  <section className="projects section" aria-labelledby="projects-title">
    <div className="container">
      <header className="chapter-head">
        <div>
          <Reveal as="p" className="eyebrow">Projects</Reveal>
          <RevealLines as="h2" id="projects-title" lines={['Courts in', 'play.']} className="display d-1 chapter-title" />
        </div>
        <Reveal className="chapter-aside" delay={0.1}>
          <Link to="/courts/projects" className="link-arrow">
            All projects <span className="btn-arrow" aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </header>

      <Stagger as="ul" className="project-grid" stagger={0.08} amount={0.1}>
        {COURT_PROJECTS.map((proj) => (
          <StaggerItem as="li" key={proj.id} className="project-card">
            <Link to={`/courts/${proj.slug}`} className="project-card-link">
              <span className="project-card-media">
                <Img image={proj.heroImage} alt="" sizes="(min-width: 1024px) 45vw, 100vw" />
              </span>
              <span className="label subtle">{proj.sport} · {proj.location}</span>
              <span className="project-card-title">{proj.title}</span>
              <span className="project-card-surface">{proj.surface}</span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  </section>
);

export default ProjectGallery;
