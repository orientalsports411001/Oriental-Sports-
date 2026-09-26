import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { COURT_PROJECTS } from '../data/courts';
import { STORE_INFO } from '../data/storeInfo';
import { PageHeader } from '../components/ui/PageHeader';
import { Img } from '../components/ui/Img';
import { Reveal } from '../components/motion/Reveal';

export const CourtProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = COURT_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="container section empty-state">
        <h1 className="display d-2">Project not found</h1>
        <Link to="/courts/projects" className="btn btn-primary">All projects</Link>
      </div>
    );
  }

  const whatsapp = () => {
    const text = `Hello Oriental Sports, I saw your project "${project.title}" in ${project.location} on your website. I want to build a similar ${project.sport} court. Could you share details?`;
    return `https://wa.me/919890990022?text=${encodeURIComponent(text)}`;
  };

  const gallery = [...new Set(project.images ?? [])].filter((img) => img !== project.heroImage);

  return (
    <div className="project-page">
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Courts', to: '/courts' }, { label: 'Projects', to: '/courts/projects' }, { label: project.title }]}
        eyebrow={`${project.sport} · ${project.location}`}
        title={[project.title]}
        image={{ src: project.heroImage, alt: '' }}
      />

      <section className="container section project-body">
        <Reveal className="project-main">
          <p className="about-lede">{project.description}</p>
          <h2 className="label muted project-subhead">Scope of work</h2>
          <ul className="dash-list">
            {project.scope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="aside" className="project-facts" delay={0.1}>
          <dl className="court-service-facts">
            <div><dt>Sport</dt><dd>{project.sport}</dd></div>
            <div><dt>Surface</dt><dd>{project.surface}</dd></div>
            <div><dt>Client</dt><dd>{project.clientType}</dd></div>
            <div><dt>Year</dt><dd>{project.year}</dd></div>
            {Object.entries(project.specs).map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </Reveal>
      </section>

      {gallery.length > 0 && (
        <section className="container project-gallery" aria-label="Photographs">
          {gallery.map((img) => (
            <div key={img} className="project-gallery-item">
              <Img image={img} alt="" sizes="(min-width: 768px) 50vw, 100vw" />
            </div>
          ))}
        </section>
      )}

      <section className="container contact-band" aria-label="Build a court like this">
        <Reveal>
          <p className="display d-2">Want a court like this?</p>
          <p className="lead">Tell us about your site. We’ll visit, measure and quote.</p>
        </Reveal>
        <Reveal className="contact-band-actions" delay={0.1}>
          <a href={whatsapp()} target="_blank" rel="noreferrer" className="btn btn-primary">WhatsApp us</a>
          <Link to="/courts#court-estimator" className="btn btn-outline">Estimate the cost</Link>
          <a href={`tel:${STORE_INFO.phone}`} className="link-arrow">Call {STORE_INFO.displayPhone}</a>
        </Reveal>
      </section>
    </div>
  );
};

export default CourtProjectDetailPage;
