import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <main
      style={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px 24px',
        backgroundColor: 'var(--color-canvas-base)',
      }}
    >
      <div
        style={{
          maxWidth: '480px',
          textAlign: 'center',
          backgroundColor: 'var(--color-canvas-pure)',
          border: '1px solid var(--color-border-subtle)',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(36px, 6vw, 56px) 32px',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-canvas-surface)',
            border: '1px solid var(--color-border-subtle)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            color: 'var(--color-ink)',
          }}
        >
          <Compass size={28} strokeWidth={1.5} />
        </div>

        <span
          style={{
            display: 'block',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-plate-gold)',
            marginBottom: '8px',
          }}
        >
          404 ERROR
        </span>

        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            lineHeight: 1.05,
            marginBottom: '14px',
            color: 'var(--color-ink)',
          }}
        >
          LOST THE BALL?
        </h1>

        <p
          style={{
            color: 'var(--color-ink-muted)',
            fontSize: '0.9375rem',
            lineHeight: 1.5,
            marginBottom: '32px',
          }}
        >
          The court line or sports gear you are looking for isn't here, or has been relocated in our Camp catalog.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/shop" className="btn btn-primary btn-pill">
            <span>BACK TO SHOP</span>
          </Link>
          <Link to="/" className="btn btn-secondary btn-pill">
            <ArrowLeft size={16} />
            <span>HOME</span>
          </Link>
        </div>
      </div>
    </main>
  );
};
