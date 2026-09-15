import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, ArrowRight, Wrench, Shield, Compass, Navigation } from 'lucide-react';
import { STORE_INFO } from '../data/storeInfo';

export const VisitPage: React.FC = () => {
  return (
    <div className="bg-ivory" style={{ minHeight: '85vh', paddingBottom: 'var(--space-4xl)' }}>
      {/* Brutalist Editorial Header */}
      <div
        style={{
          backgroundColor: 'var(--color-ink)',
          color: '#FFFFFF',
          padding: 'clamp(56px, 8vw, 96px) 0 48px',
          borderBottom: '2px solid #C9A227',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '840px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-plate-gold)' }}>
                THE CAMP FLAGSHIP
              </span>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace' }}>
                18.5204° N, 73.8567° E
              </span>
            </div>

            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(3rem, 8vw, 5.5rem)',
                lineHeight: 0.92,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                marginBottom: '20px',
              }}
            >
              VISIT THE<br />
              <span style={{ color: 'var(--color-plate-gold)' }}>HOUSE OF SPORTS.</span>
            </h1>

            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.5, maxWidth: '640px', margin: 0 }}>
              Shop 247 on MG Road in Camp. Step inside to calibrate racquet string tensions on electronic clamps, test balance points on English willow, and consult with our turnkey court engineers.
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 'clamp(36px, 6vw, 64px)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'start',
          }}
        >
          {/* Left: Confirmed Store Card with Liquid Glass Layers */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* Primary Address & Workshop Card */}
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: 'var(--color-plate-gold)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  PUNE HEADQUARTERS
                </span>
                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 800,
                    padding: '3px 8px',
                    backgroundColor: '#111111',
                    color: 'var(--color-brand-gold)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  ESTABLISHED CAMP
                </span>
              </div>

              <h2
                className="font-display"
                style={{
                  fontSize: '2rem',
                  lineHeight: 1.05,
                  color: 'var(--color-ink)',
                  margin: '0 0 12px 0',
                }}
              >
                ORIENTAL SPORTS
              </h2>

              <p
                style={{
                  fontSize: '1.1875rem',
                  lineHeight: 1.4,
                  color: '#222222',
                  fontWeight: 700,
                  margin: '0 0 24px 0',
                }}
              >
                Shop 247, MG Road<br />
                New Modikhana, Camp<br />
                Pune, Maharashtra 411001
              </p>

              {/* Operating Hours Table */}
              <div
                style={{
                  paddingTop: '20px',
                  borderTop: '2px solid #111111',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: 800,
                    fontSize: '0.75rem',
                    color: '#111111',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  <Clock size={16} color="var(--color-plate-gold)" />
                  <span>STORE & WORKSHOP SCHEDULE</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9375rem', color: '#333', borderBottom: '1px solid #EAE5D8', paddingBottom: '6px' }}>
                  <span style={{ fontWeight: 600 }}>Monday – Saturday:</span>
                  <strong style={{ fontFamily: 'monospace', color: '#111' }}>10:30 AM — 8:30 PM</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9375rem', color: '#333' }}>
                  <span style={{ fontWeight: 600 }}>Sunday:</span>
                  <strong style={{ fontFamily: 'monospace', color: '#111' }}>11:00 AM — 6:00 PM</strong>
                </div>
              </div>

              {/* In-Store Workshop Capabilities */}
              <div
                style={{
                  marginTop: '24px',
                  paddingTop: '20px',
                  borderTop: '1px solid #EAE5D8',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  On-Site Craft Services
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', color: '#222' }}>
                  <Wrench size={16} color="var(--color-plate-gold)" />
                  <span><strong>Electronic Stringing Desk:</strong> Constant-pull Yonex & Victor tensions</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', color: '#222' }}>
                  <Shield size={16} color="var(--color-plate-gold)" />
                  <span><strong>Willow Knocking Bench:</strong> Oil treatment, edge pressing & scuff sheet fitting</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', color: '#222' }}>
                  <Compass size={16} color="var(--color-plate-gold)" />
                  <span><strong>Court Engineering Consultation:</strong> Physical surface samples & technical blueprints</span>
                </div>
              </div>
            </div>

            {/* Direct Action Tactical Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <a
                href={STORE_INFO.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-lg"
                style={{ flex: '1 1 200px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '4px 4px 0px #C9A227' }}
              >
                <Navigation size={18} />
                <span>GET DIRECTIONS →</span>
              </a>

              <a
                href={`tel:${STORE_INFO.phone}`}
                className="btn btn-outline-dark btn-lg"
                style={{ flex: '1 1 180px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Phone size={18} />
                <span>CALL: {STORE_INFO.displayPhone}</span>
              </a>

              <a
                href={STORE_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-gold btn-lg"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '4px 4px 0px #111111' }}
              >
                <MessageSquare size={18} />
                <span>WHATSAPP WORKSHOP CONSULTATION</span>
              </a>
            </div>
          </div>

          {/* Right: Interactive Map with Brutalist Frame */}
          <div>
            <div
              style={{
                border: '2px solid #111111',
                boxShadow: '8px 8px 0px #111111',
                backgroundColor: '#EDE8DE',
                height: '540px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <iframe
                title="Oriental Sports Google Maps Location"
                src="https://maps.google.com/maps?q=Shop+247,+MG+Road,+Camp,+Pune+411001&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Bottom Floating Glass Card */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  padding: '16px 20px',
                  border: '1px solid #111111',
                  boxShadow: '4px 4px 0px #111111',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: '#111111' }}>
                    Shop 247, MG Road, Camp
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#666666' }}>
                    Pune 411001 • In-Store Restringing Counter Active
                  </div>
                </div>

                <a
                  href={STORE_INFO.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary btn-sm"
                  style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>OPEN MAP</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

