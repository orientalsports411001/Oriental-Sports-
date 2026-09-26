import React from 'react';
import { Link } from 'react-router-dom';
import { MediaImage } from '../../data/media';
import { Img } from './Img';
import { Reveal, RevealLines } from '../motion/Reveal';

interface Crumb {
  label: string;
  to?: string;
}

interface PageHeaderProps {
  eyebrow?: string;
  /** One entry per display line. */
  title: string[];
  lead?: React.ReactNode;
  crumbs?: Crumb[];
  /** With an image the header becomes a full-bleed photographic band. */
  image?: MediaImage;
  aside?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Page header shared by every inner page, so the site speaks one language:
 * breadcrumbs, a condensed display title and a lead. Pass `eyebrow` only
 * when it states a fact the breadcrumb and title don't (sport · location).
 */
export const PageHeader: React.FC<PageHeaderProps> = ({ eyebrow, title, lead, crumbs, image, aside, children }) => {
  const crumbTrail = crumbs && crumbs.length > 0 && (
    <nav aria-label="Breadcrumb" className="crumbs">
      <ol>
        {crumbs.map((c, i) => (
          <li key={c.label}>
            {c.to && i < crumbs.length - 1 ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );

  if (image) {
    return (
      <header className="page-header page-header--image on-dark">
        <div className="page-header-media" aria-hidden="true">
          <Img image={image} alt="" priority sizes="100vw" />
        </div>
        <div className="container page-header-inner">
          {crumbTrail}
          <div className="page-header-copy">
            {eyebrow && <Reveal as="p" className="eyebrow">{eyebrow}</Reveal>}
            <RevealLines as="h1" immediate lines={title} className="display d-1 page-title" />
            {lead && <Reveal as="p" className="page-lead" delay={0.15}>{lead}</Reveal>}
            {children}
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="page-header">
      <div className="container">
        {crumbTrail}
        <div className="page-header-grid">
          <div className="page-header-copy">
            {eyebrow && <Reveal as="p" className="eyebrow">{eyebrow}</Reveal>}
            <RevealLines as="h1" immediate lines={title} className="display d-1 page-title" />
          </div>
          {(lead || aside) && (
            <Reveal className="page-header-aside" delay={0.12}>
              {lead && <p className="lead">{lead}</p>}
              {aside}
            </Reveal>
          )}
        </div>
        {children}
      </div>
    </header>
  );
};

export default PageHeader;
