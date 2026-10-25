'use client';

import React, { useState } from 'react';
import { STORE_INFO } from '@/data/storeInfo';

export interface ServiceOption {
  id: string;
  name: string;
  subtitle: string;
}

export const COURT_INQUIRY_SERVICES: ServiceOption[] = [
  { id: 'pickleball', name: 'Pickleball Court', subtitle: 'USAPA regulation layout, cushion acrylic or modular tiles' },
  { id: 'padel', name: 'Padel Court', subtitle: '10m × 20m FIP panoramic glass, steel cage & textured turf' },
  { id: 'badminton', name: 'Badminton Court', subtitle: 'Indoor hall sprung teak wood or BWF-grade PVC vinyl mats' },
  { id: 'tennis', name: 'Tennis Court', subtitle: 'Championship multi-layer acrylic cushion or hard court system' },
  { id: 'football-turf', name: 'Football Turf', subtitle: 'All-weather monofilament synthetic turf with box containment' },
  { id: 'sports-ground', name: 'Sports Ground', subtitle: 'Multi-sport arenas, running tracks & community play infrastructure' },
];

export const CourtServiceInquiry: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>(COURT_INQUIRY_SERVICES[0].name);

  // WhatsApp click-to-chat URL using exact verified phone and requested template
  const rawMessage = `Hi Oriental Sports, I want to install a ${selectedService}.`;
  const whatsappUrl = `https://wa.me/919890990022?text=${encodeURIComponent(rawMessage)}`;

  return (
    <div
      id="court-inquiry"
      className="court-inquiry-box"
      style={{
        backgroundColor: '#0F0F0F',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '8px',
        padding: '36px 28px',
        maxWidth: '920px',
        margin: '0 auto',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <p
          style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#C8102E',
            margin: '0 0 8px',
          }}
        >
          Direct Project Inquiry
        </p>
        <h2
          className="display"
          style={{
            fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
            margin: '0 0 12px',
            color: '#FFFFFF',
            lineHeight: 1.15,
          }}
        >
          Plan Your Court Build
        </h2>
        <p
          style={{
            fontSize: '0.9375rem',
            color: '#9CA3AF',
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: 1.5,
          }}
        >
          Select the sports infrastructure service you require. We will initiate your site consultation directly on WhatsApp with our Pune engineering team.
        </p>
      </div>

      {/* Service Selection Grid */}
      <fieldset style={{ border: 'none', padding: 0, margin: '0 0 28px' }}>
        <legend className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden' }}>
          Select Court Service
        </legend>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '12px',
          }}
        >
          {COURT_INQUIRY_SERVICES.map((service) => {
            const isSelected = selectedService === service.name;
            return (
              <label
                key={service.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '16px 18px',
                  borderRadius: '6px',
                  border: isSelected ? '1px solid #C8102E' : '1px solid rgba(255, 255, 255, 0.1)',
                  backgroundColor: isSelected ? 'rgba(200, 16, 46, 0.08)' : '#161616',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s ease, background-color 0.15s ease',
                  minHeight: '44px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span
                    style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: isSelected ? '#FFFFFF' : '#E5E7EB',
                    }}
                  >
                    {service.name}
                  </span>
                  <input
                    type="radio"
                    name="court-service-choice-storefront"
                    value={service.name}
                    checked={isSelected}
                    onChange={() => setSelectedService(service.name)}
                    style={{ accentColor: '#C8102E', width: '18px', height: '18px' }}
                  />
                </div>
                <span
                  style={{
                    fontSize: '0.8125rem',
                    color: '#9CA3AF',
                    lineHeight: 1.35,
                  }}
                >
                  {service.subtitle}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Inquiry Summary & Action */}
      <div
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '18px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: '#161616',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '4px',
            padding: '10px 18px',
            fontSize: '0.875rem',
            color: '#D1D5DB',
            maxWidth: '560px',
            width: '100%',
          }}
        >
          <span style={{ color: '#9CA3AF', marginRight: '6px' }}>WhatsApp message:</span>
          <strong style={{ color: '#FFFFFF' }}>“{rawMessage}”</strong>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 32px',
              backgroundColor: '#C8102E',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.9375rem',
              letterSpacing: '0.04em',
              textDecoration: 'none',
              borderRadius: '4px',
              minHeight: '44px',
              boxShadow: '0 4px 16px rgba(200, 16, 46, 0.35)',
            }}
          >
            <span>Discuss Your Project on WhatsApp</span>
            <span aria-hidden="true">→</span>
          </a>

          <a
            href={`tel:${STORE_INFO.phone}`}
            className="btn btn-outline"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 24px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '0.875rem',
              textDecoration: 'none',
              borderRadius: '4px',
              minHeight: '44px',
            }}
          >
            <span>Call Studio: {STORE_INFO.displayPhone}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CourtServiceInquiry;
