import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';
import { BrandRings } from '../brand/BrandRings';

export const FinalCTA: React.FC = () => {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-ink)',
        color: 'var(--color-ivory)',
        paddingTop: 'clamp(64px, 10vw, 112px)',
        paddingBottom: 'clamp(64px, 10vw, 112px)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(246, 243, 234, 0.08)',
      }}
      aria-label="Ready to Play Call To Action"
    >
      {/* Centered Kinetic Brand Concentric Rings Background */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <BrandRings size={780} opacity={0.14} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          {/* Eyebrow */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              backgroundColor: 'rgba(201, 162, 39, 0.12)',
              border: '1px solid rgba(201, 162, 39, 0.3)',
              borderRadius: '2px',
              marginBottom: '24px',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-plate-gold)' }} />
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-plate-gold)',
              }}
            >
              GEAR. COURTS. PUNE.
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display-xl)',
              fontSize: 'clamp(3.5rem, 11vw, 7.5rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.035em',
              textTransform: 'uppercase',
              color: 'var(--color-pure-white)',
              margin: '0 0 24px 0',
            }}
          >
            READY TO PLAY?
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)',
              color: 'var(--color-ivory)',
              lineHeight: 1.45,
              marginBottom: '40px',
              opacity: 0.95,
              maxWidth: '560px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Gear up with tournament equipment. Build your court with certified surfaces. Visit Oriental Sports in Camp, Pune.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <MagneticButton
              variant="gold"
              size="lg"
              onClick={() => (window.location.href = '/shop')}
            >
              <span>SHOP GEAR</span>
              <ArrowRight size={18} />
            </MagneticButton>

            <MagneticButton
              variant="outline-white"
              size="lg"
              onClick={() => (window.location.href = '/courts')}
            >
              <span>BUILD A COURT</span>
              <Compass size={18} />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};
