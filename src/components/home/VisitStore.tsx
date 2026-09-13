import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, Mail, ExternalLink } from 'lucide-react';
import { STORE_INFO } from '../../data/storeInfo';
import { MEDIA } from '../../data/media';
import { MagneticButton } from '../ui/MagneticButton';

export const VisitStore: React.FC = () => {
  return (
    <section className="section-padding bg-ivory" aria-label="Visit Oriental Sports Store in Camp Pune">
      <div className="container">
        <div
          style={{
            backgroundColor: 'var(--color-ink)',
            color: 'var(--color-ivory)',
            borderRadius: '2px',
            overflow: 'hidden',
            border: '1px solid rgba(246, 243, 234, 0.08)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            }}
          >
            {/* Store Information Details */}
            <div style={{ padding: 'clamp(28px, 5vw, 56px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
                    marginBottom: '12px',
                  }}
                >
                  <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-plate-gold)' }} />
                  <span>THE PHYSICAL STORE</span>
                </div>

                <h2
                  style={{
                    fontFamily: 'var(--font-display-xl)',
                    fontSize: 'clamp(2.75rem, 6vw, 4.25rem)',
                    lineHeight: 0.9,
                    letterSpacing: '-0.03em',
                    textTransform: 'uppercase',
                    color: 'var(--color-pure-white)',
                    margin: '0 0 24px 0',
                  }}
                >
                  VISIT ORIENTAL SPORTS
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '36px' }}>
                  {/* Address */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '2px',
                        backgroundColor: 'rgba(201, 162, 39, 0.12)',
                        border: '1px solid rgba(201, 162, 39, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-plate-gold)',
                        flexShrink: 0,
                      }}
                    >
                      <MapPin size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, color: 'var(--color-pure-white)', fontSize: '1.0625rem' }}>
                        {STORE_INFO.name}
                      </div>
                      <div style={{ color: '#C5BFB3', fontSize: '0.9375rem', lineHeight: 1.45, fontFamily: 'var(--font-heading)' }}>
                        {STORE_INFO.addressLine1}, {STORE_INFO.addressLine2}<br />
                        {STORE_INFO.locality}, {STORE_INFO.city} – {STORE_INFO.pincode}
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '2px',
                        backgroundColor: 'rgba(201, 162, 39, 0.12)',
                        border: '1px solid rgba(201, 162, 39, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-plate-gold)',
                        flexShrink: 0,
                      }}
                    >
                      <Phone size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-ui)', color: '#888', textTransform: 'uppercase', fontWeight: 600 }}>
                        Call The Store
                      </div>
                      <a
                        href={`tel:${STORE_INFO.phone}`}
                        style={{ color: 'var(--color-pure-white)', fontWeight: 800, fontSize: '1.125rem', fontFamily: 'var(--font-ui)' }}
                      >
                        {STORE_INFO.displayPhone}
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '2px',
                        backgroundColor: 'rgba(201, 162, 39, 0.12)',
                        border: '1px solid rgba(201, 162, 39, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-plate-gold)',
                        flexShrink: 0,
                      }}
                    >
                      <Clock size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-ui)', color: '#888', textTransform: 'uppercase', fontWeight: 600 }}>
                        Store Timings
                      </div>
                      <div style={{ color: 'var(--color-pure-white)', fontSize: '0.9375rem', fontWeight: 700 }}>
                        Monday – Saturday: {STORE_INFO.hours.weekdays}
                      </div>
                      <div style={{ color: '#AAA', fontSize: '0.8125rem' }}>
                        Sunday: {STORE_INFO.hours.sunday}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: GET DIRECTIONS, CALL, WHATSAPP */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  paddingTop: '24px',
                  borderTop: '1px solid rgba(246, 243, 234, 0.1)',
                }}
              >
                <MagneticButton
                  variant="gold"
                  size="md"
                  onClick={() => window.open(STORE_INFO.mapsUrl, '_blank')}
                  style={{ width: '100%' }}
                >
                  <MapPin size={16} />
                  <span>GET DIRECTIONS (GOOGLE MAPS)</span>
                </MagneticButton>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <MagneticButton
                    variant="outline-white"
                    size="sm"
                    onClick={() => (window.location.href = `tel:${STORE_INFO.phone}`)}
                    style={{ flex: 1 }}
                  >
                    <Phone size={15} />
                    <span>CALL STORE</span>
                  </MagneticButton>

                  <MagneticButton
                    variant="outline-white"
                    size="sm"
                    onClick={() => window.open(STORE_INFO.whatsappUrl, '_blank')}
                    style={{ flex: 1 }}
                  >
                    <MessageSquare size={15} />
                    <span>WHATSAPP</span>
                  </MagneticButton>
                </div>
              </div>
            </div>

            {/* Simulated Live Map Visual Card */}
            <div
              style={{
                position: 'relative',
                minHeight: '420px',
                backgroundColor: '#1C1C1C',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderLeft: '1px solid rgba(246, 243, 234, 0.08)',
              }}
            >
              <img
                src={MEDIA.puneCampMapContext}
                alt="Pune Camp city street and map context"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.35,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle, rgba(17,17,17,0.3) 0%, rgba(17,17,17,0.92) 100%)',
                }}
              />

              {/* Floating Map Pin Marker Box */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  backgroundColor: '#111111',
                  border: '1px solid var(--color-plate-gold)',
                  padding: '28px',
                  borderRadius: '2px',
                  maxWidth: '340px',
                  textAlign: 'center',
                  boxShadow: '0 12px 36px rgba(0,0,0,0.6)',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-plate-gold)',
                    color: 'var(--color-ink)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 14px auto',
                    boxShadow: '0 0 20px rgba(201, 162, 39, 0.4)',
                  }}
                >
                  <MapPin size={24} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display-xl)', fontSize: '1.75rem', color: '#FFFFFF', margin: '0 0 4px 0' }}>
                  SHOP 247, MG ROAD
                </h3>
                <p style={{ color: '#C9A227', fontSize: '0.8125rem', fontFamily: 'var(--font-ui)', fontWeight: 700, marginBottom: '18px' }}>
                  NEW MODIKHANA, CAMP, PUNE
                </p>
                <MagneticButton
                  variant="gold"
                  size="sm"
                  onClick={() => window.open(STORE_INFO.mapsUrl, '_blank')}
                  style={{ width: '100%' }}
                >
                  <span>LAUNCH LIVE NAVIGATION</span>
                  <ExternalLink size={14} />
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
