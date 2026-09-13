import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Layers, ShieldCheck, ArrowRight, MessageSquare, Phone, CheckCircle2 } from 'lucide-react';
import { COURT_PROJECTS } from '../data/courts';
import { STORE_INFO } from '../data/storeInfo';

export const CourtProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = COURT_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="container" style={{ padding: '80px 16px', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '16px' }}>Project Not Found</h1>
        <p style={{ color: '#666', marginBottom: '24px' }}>The requested court project could not be located.</p>
        <Link to="/courts/projects" className="btn btn-primary">
          BACK TO ALL PROJECTS
        </Link>
      </div>
    );
  }

  const getWhatsAppInquiryUrl = () => {
    const text = `Hello Oriental Sports, I saw your project "${project.title}" in ${project.location} on your website. I want to build a similar ${project.sport} court. Could you share details?`;
    return `https://wa.me/919890990022?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-ivory" style={{ minHeight: '80vh', paddingBottom: 'var(--space-4xl)' }}>
      {/* Hero Banner */}
      <div
        style={{
          position: 'relative',
          backgroundColor: 'var(--color-ink)',
          color: 'var(--color-ivory)',
          padding: 'clamp(48px, 8vw, 84px) 0',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, opacity: 0.35 }}>
          <img
            src={project.heroImage}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(17,17,17,0.7) 0%, rgba(17,17,17,0.95) 85%)',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '840px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px' }}>
              <span className="badge badge-gold">{project.sport}</span>
              <span className="badge badge-dark">{project.clientType} Project</span>
              <span style={{ fontSize: '0.8125rem', color: '#B5AFA4' }}>Commissioned {project.year}</span>
            </div>

            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(2.25rem, 5.5vw, 3.75rem)',
                lineHeight: 1.05,
                color: 'var(--color-pure-white)',
                marginBottom: '16px',
              }}
            >
              {project.title}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-plate-gold)', fontSize: '1rem', fontWeight: 600 }}>
              <MapPin size={18} />
              <span>{project.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 'var(--space-2xl)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(24px, 5vw, 48px)',
          }}
        >
          {/* Main Content Area */}
          <div>
            <h2 className="font-display" style={{ fontSize: '1.75rem', marginBottom: '16px' }}>
              PROJECT OVERVIEW
            </h2>
            <p style={{ color: '#444444', fontSize: '1.0625rem', lineHeight: 1.6, marginBottom: '24px' }}>
              {project.description}
            </p>

            {/* Scope of Work */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '1.125rem', fontFamily: 'var(--font-heading)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '16px' }}>
                Engineering Scope of Work
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {project.scope.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <CheckCircle2 size={18} color="#C9A227" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.9375rem', color: '#333333', lineHeight: 1.45 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Gallery Images */}
            {project.images && project.images.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '1.125rem', fontFamily: 'var(--font-heading)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '16px' }}>
                  Site Photography
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                  {project.images.map((img, idx) => (
                    <div key={idx} style={{ height: '220px', borderRadius: '2px', overflow: 'hidden', backgroundColor: '#DDD' }}>
                      <img src={img} alt={`${project.title} view ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Technical Specs & Inquiries */}
          <div>
            <div
              style={{
                backgroundColor: 'var(--color-pure-white)',
                border: '1px solid var(--color-ivory-border)',
                borderRadius: '2px',
                padding: '28px',
                marginBottom: '24px',
              }}
            >
              <h3 style={{ fontSize: '1.125rem', fontFamily: 'var(--font-heading)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '16px' }}>
                TECHNICAL DATA
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #EDE8DC', paddingBottom: '8px' }}>
                  <span style={{ color: '#666' }}>Sport</span>
                  <strong style={{ color: '#111' }}>{project.sport}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #EDE8DC', paddingBottom: '8px' }}>
                  <span style={{ color: '#666' }}>Surface</span>
                  <strong style={{ color: '#111' }}>{project.surface}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #EDE8DC', paddingBottom: '8px' }}>
                  <span style={{ color: '#666' }}>Client Category</span>
                  <strong style={{ color: '#111' }}>{project.clientType}</strong>
                </div>
                {Object.entries(project.specs).map(([k, v], i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #EDE8DC', paddingBottom: '8px' }}>
                    <span style={{ color: '#666' }}>{k}</span>
                    <strong style={{ color: '#111' }}>{v}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Consultation Action Box */}
            <div
              style={{
                backgroundColor: 'var(--color-ink)',
                color: 'var(--color-ivory)',
                border: '1px solid var(--color-plate-gold)',
                borderRadius: '2px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <h3 className="font-display" style={{ fontSize: '1.375rem', color: '#FFFFFF' }}>
                BUILD A COURT LIKE THIS
              </h3>
              <p style={{ color: '#D1CBBF', fontSize: '0.875rem', lineHeight: 1.45 }}>
                Connect with Oriental Sports engineers for an on-site soil and laser gradient assessment in Pune.
              </p>

              <Link
                to="/courts#court-estimator"
                className="btn btn-gold"
                style={{ width: '100%' }}
              >
                <span>REQUEST A COURT CONSULTATION</span>
                <ArrowRight size={16} />
              </Link>

              <a
                href={getWhatsAppInquiryUrl()}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-white"
                style={{ width: '100%' }}
              >
                <MessageSquare size={16} />
                <span>WHATSAPP US</span>
              </a>

              <a
                href={`tel:${STORE_INFO.phone}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  color: 'var(--color-plate-gold)',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  marginTop: '8px',
                }}
              >
                <Phone size={14} />
                <span>Direct Line: {STORE_INFO.displayPhone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
