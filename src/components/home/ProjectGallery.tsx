import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Eye, X, Calendar, Layers } from 'lucide-react';
import { COURT_PROJECTS } from '../../data/courts';
import { CourtProject } from '../../types';
import { MagneticButton } from '../ui/MagneticButton';
import { SpotlightCard } from '../ui/SpotlightCard';

export const ProjectGallery: React.FC = () => {
  const [activeModalProject, setActiveModalProject] = useState<CourtProject | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHoveringGallery, setIsHoveringGallery] = useState(false);
  const isFinePointer = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isFinePointer) return;
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section className="section-padding bg-ivory" aria-label="Completed Sports Projects in Pune">
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: 'var(--space-3xl)',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-ui)',
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-plate-gold)',
                marginBottom: '8px',
              }}
            >
              <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-plate-gold)' }} />
              <span>PUNE & MAHARASHTRA PORTFOLIO</span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display-xl)',
                fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
                lineHeight: 0.9,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                color: 'var(--color-ink)',
                margin: 0,
              }}
            >
              RECENT PROJECTS
            </h2>
          </div>

          <MagneticButton
            variant="outline-dark"
            size="sm"
            onClick={() => (window.location.href = '/courts/projects')}
          >
            <span>VIEW ALL PORTFOLIO</span>
            <ArrowRight size={15} color="var(--color-plate-gold)" />
          </MagneticButton>
        </div>

        {/* Asymmetrical Architectural Portfolio Layout */}
        <div
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHoveringGallery(true)}
          onMouseLeave={() => setIsHoveringGallery(false)}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'var(--space-lg)',
            position: 'relative',
          }}
        >
          {/* Subtle Desktop-Only Cursor Badge (21st.dev cursor pattern) */}
          {isFinePointer && isHoveringGallery && (
            <motion.div
              style={{
                position: 'fixed',
                left: cursorPos.x + 14,
                top: cursorPos.y + 14,
                pointerEvents: 'none',
                zIndex: 99,
                backgroundColor: 'var(--color-ink)',
                color: 'var(--color-plate-gold)',
                border: '1px solid var(--color-plate-gold)',
                padding: '6px 12px',
                borderRadius: '2px',
                fontSize: '0.6875rem',
                fontFamily: 'var(--font-ui)',
                fontWeight: 700,
                letterSpacing: '0.1em',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              <span>VIEW PROJECT</span>
              <ArrowRight size={12} />
            </motion.div>
          )}

          {COURT_PROJECTS.map((proj, idx) => {
            // Asymmetric spans: 0 is 7-col, 1 is 5-col, 2 is 5-col, 3 is 7-col
            const colSpan = idx % 3 === 0 ? 'span 7' : 'span 5';

            return (
              <div
                key={proj.id}
                style={{
                  gridColumn: 'span 12',
                }}
                className={idx % 3 === 0 ? 'bento-span-7' : 'bento-span-5'}
              >
                <SpotlightCard
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--color-ivory-border)',
                    borderRadius: '2px',
                    height: '100%',
                  }}
                  spotlightColor="rgba(201, 162, 39, 0.15)"
                >
                  {/* Image Container with Hover Pan */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '320px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      backgroundColor: '#111',
                    }}
                    onClick={() => setActiveModalProject(proj)}
                  >
                    <img
                      src={proj.heroImage}
                      alt={proj.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                      className="product-card-img"
                    />

                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(180deg, transparent 40%, rgba(17,17,17,0.85) 100%)',
                      }}
                    />

                    {/* Top Badges */}
                    <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px', zIndex: 3 }}>
                      <span className="badge badge-dark" style={{ fontFamily: 'var(--font-ui)' }}>{proj.sport}</span>
                      <span className="badge badge-gold" style={{ fontFamily: 'var(--font-ui)' }}>{proj.clientType}</span>
                    </div>

                    {/* Bottom overlay info */}
                    <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', zIndex: 3 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-plate-gold)', fontFamily: 'var(--font-ui)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '4px' }}>
                        <MapPin size={13} />
                        <span>{proj.location}</span>
                      </div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-display-xl)',
                          fontSize: '1.75rem',
                          lineHeight: 0.95,
                          color: '#FFFFFF',
                          margin: 0,
                        }}
                      >
                        {proj.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Details Footer */}
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: '#555',
                        lineHeight: 1.45,
                        fontFamily: 'var(--font-heading)',
                        marginBottom: '16px',
                      }}
                    >
                      {proj.description}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--color-ivory-border)' }}>
                      <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-ui)', color: '#888' }}>
                        {proj.surface}
                      </span>
                      <Link
                        to={`/courts/${proj.slug}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontFamily: 'var(--font-ui)',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          color: 'var(--color-ink)',
                          textTransform: 'uppercase',
                        }}
                      >
                        <span>VIEW CASE STUDY</span>
                        <ArrowRight size={13} color="var(--color-plate-gold)" />
                      </Link>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox / Project Details Modal */}
      {activeModalProject && (
        <div
          className="search-modal-backdrop open"
          onClick={() => setActiveModalProject(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="search-modal-container"
            style={{ maxWidth: '840px', maxHeight: '90vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ position: 'relative' }}>
              <img
                src={activeModalProject.heroImage}
                alt={activeModalProject.title}
                style={{ width: '100%', height: '360px', objectFit: 'cover' }}
              />
              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(17, 17, 17, 0.85)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: '1px solid var(--color-plate-gold)',
                }}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '28px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                <span className="badge badge-gold" style={{ fontFamily: 'var(--font-ui)' }}>{activeModalProject.sport}</span>
                <span style={{ fontSize: '0.8125rem', color: '#666', fontFamily: 'var(--font-ui)' }}>{activeModalProject.location}</span>
              </div>

              <h2 style={{ fontFamily: 'var(--font-display-xl)', fontSize: '2.5rem', lineHeight: 0.95, margin: '12px 0' }}>
                {activeModalProject.title}
              </h2>

              <p style={{ color: '#444', fontSize: '1rem', lineHeight: 1.55, marginBottom: '24px', fontFamily: 'var(--font-heading)' }}>
                {activeModalProject.description}
              </p>

              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-plate-gold)', marginBottom: '10px' }}>
                  Execution Scope
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {activeModalProject.scope.map((s, idx) => (
                    <div key={idx} style={{ fontSize: '0.875rem', color: '#333' }}>
                      • {s}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', paddingTop: '20px', borderTop: '1px solid #E2DCCF' }}>
                <Link
                  to={`/courts/${activeModalProject.slug}`}
                  onClick={() => setActiveModalProject(null)}
                  className="btn btn-primary"
                >
                  <span>FULL CASE STUDY</span>
                  <ArrowRight size={15} />
                </Link>
                <a
                  href={`https://wa.me/919890990022?text=Hello%20Oriental%20Sports,%20I%20saw%20your%20project%20${encodeURIComponent(activeModalProject.title)}%20and%20want%20to%20consult%20for%20my%20facility`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-gold"
                >
                  <span>INQUIRE ABOUT SIMILAR BUILD</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
