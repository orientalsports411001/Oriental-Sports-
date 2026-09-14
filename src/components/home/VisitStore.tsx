import React from 'react';
import { Link } from 'react-router-dom';
import { MEDIA } from '../../data/media';

export const VisitStore: React.FC = () => {
  return (
    <section
      aria-label="Visit Oriental Sports — Camp, Pune"
      style={{
        backgroundColor: 'var(--color-canvas-base)',
        padding: 'clamp(80px, 12vw, 160px) 0',
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--max-width-content)',
          margin: '0 auto',
          padding: '0 clamp(20px, 5vw, 72px)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0,38%) minmax(0,1fr)',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'center',
        }}
      >
        {/* LEFT — typographic address composition */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Tiny eyebrow — only one on this page */}
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.625rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-ink-subtle)',
              marginBottom: 'clamp(20px, 3vh, 32px)',
            }}
          >
            PUNE'S SPORTS FLAGSHIP
          </div>

          {/* Address as giant editorial type — varying weights */}
          <address
            style={{
              fontStyle: 'normal',
              marginBottom: 'clamp(24px, 4vh, 40px)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 6.5vw, 5.5rem)',
                fontWeight: 800,
                lineHeight: 0.88,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                color: 'var(--color-ink)',
              }}
            >
              <span style={{ display: 'block' }}>SHOP 247</span>
              <span style={{ display: 'block' }}>MG ROAD</span>
              <span
                style={{
                  display: 'block',
                  fontWeight: 300,
                  opacity: 0.7,
                }}
              >
                CAMP, PUNE
              </span>
            </div>
          </address>

          {/* Thin charcoal divider */}
          <div
            style={{
              width: 'clamp(48px, 6vw, 80px)',
              height: '1.5px',
              backgroundColor: 'var(--color-ink)',
              marginBottom: 'clamp(24px, 4vh, 40px)',
              opacity: 0.25,
            }}
          />

          {/* Two text-link CTAs */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {[
              { label: 'VISIT STORE', href: '/visit' },
              { label: 'GET DIRECTIONS', href: 'https://maps.google.com/?q=MG+Road+Camp+Pune', external: true },
            ].map(({ label, href, external }) => (
              external ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(0.6875rem, 1.1vw, 0.8125rem)',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--color-ink)',
                    textDecoration: 'none',
                    borderBottom: '1.5px solid var(--color-border-medium)',
                    paddingBottom: '3px',
                    alignSelf: 'flex-start',
                    minHeight: '44px',
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.4')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  {label} →
                </a>
              ) : (
                <Link
                  key={label}
                  to={href}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(0.6875rem, 1.1vw, 0.8125rem)',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--color-ink)',
                    textDecoration: 'none',
                    borderBottom: '1.5px solid var(--color-ink)',
                    paddingBottom: '3px',
                    alignSelf: 'flex-start',
                    minHeight: '44px',
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.4')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  {label} →
                </Link>
              )
            ))}
          </div>
        </div>

        {/* RIGHT — store photograph, rectangular, no border-radius */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            aspectRatio: '4 / 3',
            backgroundColor: '#111',
          }}
        >
          <img
            src={MEDIA.puneCampExterior}
            alt="Oriental Sports flagship store interior, Camp, Pune"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
            onError={e => {
              e.currentTarget.src =
                'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1200&q=85';
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default VisitStore;
