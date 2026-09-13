import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react';
import { STORE_INFO } from '../data/storeInfo';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    inquiryType: 'Gear & Equipment',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-ivory" style={{ minHeight: '80vh', paddingBottom: 'var(--space-4xl)' }}>
      {/* Header */}
      <div
        style={{
          backgroundColor: 'var(--color-ink)',
          color: 'var(--color-ivory)',
          padding: 'var(--space-3xl) 0',
          borderBottom: '1px solid rgba(246, 243, 234, 0.08)',
        }}
      >
        <div className="container">
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-plate-gold)',
              display: 'block',
              marginBottom: '8px',
            }}
          >
            CONNECT WITH ORIENTAL SPORTS
          </span>
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              color: 'var(--color-pure-white)',
              lineHeight: 1.05,
              marginBottom: '12px',
            }}
          >
            CONTACT & INQUIRIES
          </h1>
          <p style={{ color: '#C5BFB3', maxWidth: '640px', fontSize: '1rem' }}>
            Equipment inquiries, institutional school/club procurement, or turn-key court construction estimates in Pune.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 'var(--space-2xl)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-3xl)',
          }}
        >
          {/* Left: Contact Form */}
          <div style={{ backgroundColor: '#FFFFFF', padding: 'clamp(24px, 5vw, 40px)', borderRadius: '2px', border: '1px solid var(--color-ivory-border)' }}>
            <h2 className="font-display" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
              SEND AN INQUIRY
            </h2>
            <p style={{ color: '#666', fontSize: '0.875rem', marginBottom: '24px' }}>
              We typically respond within 2 to 4 business hours.
            </p>

            {submitted ? (
              <div style={{ backgroundColor: '#EDE8DC', padding: '24px', borderRadius: '2px', border: '1px solid #C9A227' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#111111', fontWeight: 800, marginBottom: '8px' }}>
                  <CheckCircle2 size={20} color="#C9A227" />
                  <span>INQUIRY RECEIVED</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#555555', lineHeight: 1.45, marginBottom: '16px' }}>
                  Thank you, {formData.name}. Our team at the Camp store will reach out to you at {formData.phone || formData.email}.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn btn-outline-dark btn-sm"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rohan Joshi"
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #D1CBBF', borderRadius: '2px', fontSize: '0.9375rem', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98..."
                      style={{ width: '100%', padding: '10px 14px', border: '1px solid #D1CBBF', borderRadius: '2px', fontSize: '0.9375rem', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="rohan@example.com"
                      style={{ width: '100%', padding: '10px 14px', border: '1px solid #D1CBBF', borderRadius: '2px', fontSize: '0.9375rem', outline: 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                    Inquiry Nature
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #D1CBBF', borderRadius: '2px', fontSize: '0.9375rem', outline: 'none', backgroundColor: '#FFF' }}
                  >
                    <option value="Gear & Equipment">Sports Equipment / Retail Order</option>
                    <option value="Court Construction">Court Construction & Surfacing (Pickleball/Tennis/Turf)</option>
                    <option value="Institutional Procurement">School / College / Club Institutional Procurement</option>
                    <option value="Racquet Stringing">Racquet Stringing & Custom Bat Services</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about requirements, sport, preferred timelines..."
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #D1CBBF', borderRadius: '2px', fontSize: '0.9375rem', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '8px' }}>
                  <span>SUBMIT INQUIRY</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>

          {/* Right: Direct Information Channels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ backgroundColor: '#111111', color: '#FFFFFF', padding: '32px', borderRadius: '2px', border: '1px solid var(--color-plate-gold)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-plate-gold)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                DIRECT CONTACT
              </span>
              <h3 className="font-display" style={{ fontSize: '1.5rem', marginBottom: '16px' }}>
                SPEAK DIRECTLY TO OUR CAMP STORE
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.9375rem', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Phone size={18} color="var(--color-plate-gold)" />
                  <a href={`tel:${STORE_INFO.phone}`} style={{ color: '#FFFFFF', fontWeight: 700 }}>
                    {STORE_INFO.displayPhone}
                  </a>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Mail size={18} color="var(--color-plate-gold)" />
                  <a href={`mailto:${STORE_INFO.email}`} style={{ color: '#EAE5D9' }}>
                    {STORE_INFO.email}
                  </a>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <MapPin size={18} color="var(--color-plate-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ color: '#C5BFB3', fontSize: '0.875rem' }}>
                    {STORE_INFO.addressLine1}, {STORE_INFO.addressLine2}, {STORE_INFO.locality}, {STORE_INFO.city} 411001
                  </span>
                </div>
              </div>

              <a
                href={STORE_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-gold"
                style={{ width: '100%' }}
              >
                <MessageSquare size={16} />
                <span>CHAT ON WHATSAPP</span>
              </a>
            </div>

            <div style={{ backgroundColor: '#EDE8DC', padding: '24px', borderRadius: '2px', border: '1px solid #E2DCCF' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
                INSTITUTIONAL & BULK PROCUREMENT
              </h4>
              <p style={{ fontSize: '0.8125rem', color: '#555555', lineHeight: 1.45 }}>
                Specialized rates and GST invoicing for schools, colleges, sports academies and housing societies across Pune, Pimpri-Chinchwad, and PMRDA.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
