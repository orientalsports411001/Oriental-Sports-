import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, MessageSquare, ArrowUpRight } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { STORE_INFO } from '../../data/storeInfo';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-dark-navy)',
        color: 'var(--color-pure-white)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Footer"
    >
      <div className="container" style={{ paddingTop: 'var(--space-4xl)', paddingBottom: 'var(--space-2xl)' }}>
        {/* Main 4-Column Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-3xl)',
            marginBottom: 'var(--space-3xl)',
          }}
        >
          {/* Column 1: Brand & Positioning */}
          <div style={{ maxWidth: '340px' }}>
            <div style={{ marginBottom: '20px' }}>
              <Logo variant="dark" size="md" />
            </div>

            <p
              style={{
                fontSize: '0.9375rem',
                color: '#A0ADC9',
                lineHeight: 1.6,
                marginBottom: '20px',
              }}
            >
              Pune’s sports house since 1960. Authentic tournament-grade sports gear and turnkey athletic court construction.
            </p>

            <div
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '0.8125rem',
                letterSpacing: '0.12em',
                color: 'var(--color-ink)',
                background: 'var(--color-lime)',
                padding: '6px 14px',
                borderRadius: 'var(--radius-pill)',
                textTransform: 'uppercase',
              }}
            >
              GEAR. COURTS. PUNE.
            </div>
          </div>

          {/* Column 2: Shop Links */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '0.9375rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-pure-white)',
                marginBottom: '18px',
              }}
            >
              SHOP GEAR
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9375rem' }}>
              <li>
                <Link to="/shop?category=pickleball" style={{ color: '#BAC7E5', textDecoration: 'none', transition: 'color 0.2s' }}>
                  Pickleball Paddles & Balls
                </Link>
              </li>
              <li>
                <Link to="/shop?category=cricket" style={{ color: '#BAC7E5', textDecoration: 'none', transition: 'color 0.2s' }}>
                  English & Kashmir Willow Bats
                </Link>
              </li>
              <li>
                <Link to="/shop?category=tennis" style={{ color: '#BAC7E5', textDecoration: 'none', transition: 'color 0.2s' }}>
                  Tour Tennis Racquets & Balls
                </Link>
              </li>
              <li>
                <Link to="/shop?category=badminton" style={{ color: '#BAC7E5', textDecoration: 'none', transition: 'color 0.2s' }}>
                  Badminton Racquets & Shuttles
                </Link>
              </li>
              <li>
                <Link to="/shop?category=fitness" style={{ color: '#BAC7E5', textDecoration: 'none', transition: 'color 0.2s' }}>
                  Fitness & Strength Equipment
                </Link>
              </li>
              <li>
                <Link to="/shop?category=recreation" style={{ color: '#BAC7E5', textDecoration: 'none', transition: 'color 0.2s' }}>
                  Carrom & Recreation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Courts & Projects */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '0.9375rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-pure-white)',
                marginBottom: '18px',
              }}
            >
              COURTS & BUILD
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9375rem' }}>
              <li>
                <Link to="/courts" style={{ color: '#BAC7E5', textDecoration: 'none', transition: 'color 0.2s' }}>
                  Court Construction Services
                </Link>
              </li>
              <li>
                <Link to="/courts/pickleball-court-construction" style={{ color: '#BAC7E5', textDecoration: 'none', transition: 'color 0.2s' }}>
                  Pickleball Court Setup
                </Link>
              </li>
              <li>
                <Link to="/courts/tennis-court-construction" style={{ color: '#BAC7E5', textDecoration: 'none', transition: 'color 0.2s' }}>
                  Tennis Court Resurfacing
                </Link>
              </li>
              <li>
                <Link to="/courts/football-cricket-multisport-turf" style={{ color: '#BAC7E5', textDecoration: 'none', transition: 'color 0.2s' }}>
                  Multi-Sport Synthetic Turf
                </Link>
              </li>
              <li>
                <Link to="/courts/projects" style={{ color: '#BAC7E5', textDecoration: 'none', transition: 'color 0.2s' }}>
                  Pune Project Portfolio
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Camp Store Contact */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '0.9375rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-pure-white)',
                marginBottom: '18px',
              }}
            >
              THE CAMP STORE
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9375rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: '#BAC7E5' }}>
                <MapPin size={18} color="var(--color-lime)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Shop 247, MG Road, New Modikhana, Camp, Pune 411001</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={18} color="var(--color-lime)" />
                <a href={`tel:${STORE_INFO.phone}`} style={{ color: '#FFFFFF', fontWeight: 600, textDecoration: 'none' }}>
                  {STORE_INFO.displayPhone}
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={18} color="var(--color-lime)" />
                <a href={`mailto:${STORE_INFO.email}`} style={{ color: '#BAC7E5', textDecoration: 'none' }}>
                  {STORE_INFO.email}
                </a>
              </div>

              <div style={{ paddingTop: '8px' }}>
                <a
                  href={STORE_INFO.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'var(--color-ink)',
                    background: 'var(--color-lime)',
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-pill)',
                    fontWeight: 700,
                    fontSize: '0.8125rem',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    letterSpacing: '0.05em',
                  }}
                >
                  <MessageSquare size={15} />
                  <span>WhatsApp Inquiry</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Large Subtle ORIENTAL SPORTS Typographic Element */}
        <div
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 900,
            fontSize: 'clamp(2.5rem, 11vw, 9rem)',
            lineHeight: 0.85,
            color: 'rgba(255, 255, 255, 0.04)',
            userSelect: 'none',
            pointerEvents: 'none',
            textAlign: 'center',
            letterSpacing: '-0.03em',
            margin: 'var(--space-2xl) 0',
          }}
          aria-hidden="true"
        >
          ORIENTAL SPORTS
        </div>

        {/* Bottom Legal, Policies & Copyright */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            paddingTop: 'var(--space-xl)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            fontSize: '0.8125rem',
            color: '#8091B0',
          }}
        >
          <div>
            © {new Date().getFullYear()} Oriental Sports, Camp, Pune. All rights reserved.
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <Link to="/about" style={{ color: '#8091B0', textDecoration: 'none' }}>About the House</Link>
            <Link to="/visit" style={{ color: '#8091B0', textDecoration: 'none' }}>Camp Store</Link>
            <Link to="/shipping" style={{ color: '#8091B0', textDecoration: 'none' }}>Shipping Policy</Link>
            <Link to="/returns" style={{ color: '#8091B0', textDecoration: 'none' }}>Returns Policy</Link>
            <Link to="/privacy" style={{ color: '#8091B0', textDecoration: 'none' }}>Privacy</Link>
            <Link to="/terms" style={{ color: '#8091B0', textDecoration: 'none' }}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
