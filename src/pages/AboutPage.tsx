import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, MapPin, Hammer, ShoppingBag, Award, Activity } from 'lucide-react';
import { BRAND_STORY, STORE_INFO } from '../data/storeInfo';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-ivory" style={{ minHeight: '85vh', paddingBottom: 'var(--space-4xl)' }}>
      {/* Editorial Header */}
      <div
        style={{
          backgroundColor: 'var(--color-ink)',
          color: 'var(--color-ivory)',
          padding: 'clamp(64px, 8vw, 108px) 0 56px',
          position: 'relative',
          borderBottom: '2px solid #C9A227',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '880px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-plate-gold)',
                }}
              >
                THE ARCHIVE & MISSION
              </span>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace' }}>
                CAMP • PUNE
              </span>
            </div>

            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(2.75rem, 7vw, 5.25rem)',
                lineHeight: 0.92,
                color: 'var(--color-pure-white)',
                marginBottom: '24px',
                letterSpacing: '-0.02em',
              }}
            >
              GEAR FOR THE ATHLETE.<br />
              <span style={{ color: 'var(--color-plate-gold)' }}>COURTS FOR THE CITY.</span>
            </h1>

            <p style={{ color: '#D5CFBF', fontSize: 'clamp(1.0625rem, 2vw, 1.25rem)', lineHeight: 1.5, margin: 0, maxWidth: '680px' }}>
              From Shop 247 on MG Road in Camp to championship arenas across Western Maharashtra, Oriental Sports represents Pune’s enduring athletic discipline.
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 'clamp(40px, 6vw, 64px)' }}>
        {/* Narrative Columns with Asymmetric Brutalist Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 'clamp(32px, 5vw, 64px)',
            marginBottom: 'var(--space-4xl)',
          }}
        >
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-plate-gold)', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              CHAPTER 01
            </span>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', lineHeight: 1.05, marginBottom: '24px', color: '#111111' }}>
              AUTHENTIC ROOTS IN CAMP
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: '#333333', lineHeight: 1.65, fontSize: '1.0625rem' }}>
              {BRAND_STORY.narrative.map((p, idx) => (
                <p key={idx} style={{ margin: 0 }}>{p}</p>
              ))}
            </div>

            <div style={{ marginTop: '36px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link to="/visit" className="btn btn-primary btn-lg" style={{ boxShadow: '4px 4px 0px #C9A227' }}>
                <span>VISIT CAMP STORE</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/courts" className="btn btn-outline-dark btn-lg">
                <span>EXPLORE COURTS</span>
              </Link>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* The Two Pillars Brutalist Card */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                padding: '36px',
                border: '2px solid #111111',
                boxShadow: '8px 8px 0px #111111',
              }}
            >
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-plate-gold)', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                DIVISION BLUEPRINT
              </span>
              <h3 className="font-display" style={{ fontSize: '1.75rem', lineHeight: 1.1, marginBottom: '24px', color: '#111111' }}>
                THE TWO ORIENTAL PILLARS
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '48px', height: '48px', backgroundColor: '#111111', color: '#C9A227', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #111111' }}>
                    <ShoppingBag size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.125rem', fontWeight: 800, margin: '0 0 6px 0', color: '#111111' }}>
                      01. THE SPORTS HOUSE (MG ROAD)
                    </h4>
                    <p style={{ fontSize: '0.9375rem', color: '#444444', lineHeight: 1.5, margin: 0 }}>
                      Authentic match gear, Yonex electronic racquet restringing, English willow bat knocking, and test-in-hand consultation.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '48px', height: '48px', backgroundColor: '#111111', color: 'var(--color-brand-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #111111' }}>
                    <Hammer size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.125rem', fontWeight: 800, margin: '0 0 6px 0', color: '#111111' }}>
                      02. COURT INFRASTRUCTURE DIVISION
                    </h4>
                    <p style={{ fontSize: '0.9375rem', color: '#444444', lineHeight: 1.5, margin: 0 }}>
                      Turnkey sports facility design, laser grading, ITF & USAPA multi-layer acrylic surfacing, synthetic turf, and floodlighting across Pune.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pune Headquarters Glass Box */}
            <div
              style={{
                padding: '28px',
                backgroundColor: '#FFFFFF',
                border: '2px solid #111111',
                boxShadow: '4px 4px 0px #111111',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-plate-gold)', fontSize: '0.8125rem', fontWeight: 800, marginBottom: '6px' }}>
                <MapPin size={18} />
                <span>PUNE HEADQUARTERS</span>
              </div>
              <div style={{ fontWeight: 800, fontSize: '1.1875rem', color: '#111111' }}>
                {STORE_INFO.name}
              </div>
              <div style={{ fontSize: '0.9375rem', color: '#555555', marginTop: '4px', lineHeight: 1.4 }}>
                {STORE_INFO.addressLine1}, {STORE_INFO.addressLine2}, {STORE_INFO.locality}, {STORE_INFO.city} 411001
              </div>
              <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #E8E3D5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href={`tel:${STORE_INFO.phone}`} style={{ color: '#111111', fontWeight: 800, fontSize: '0.875rem', textDecoration: 'none' }}>
                  📞 {STORE_INFO.displayPhone}
                </a>
                <Link to="/visit" style={{ color: 'var(--color-plate-gold)', fontWeight: 800, fontSize: '0.8125rem', textDecoration: 'underline' }}>
                  View Workshop & Hours →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

