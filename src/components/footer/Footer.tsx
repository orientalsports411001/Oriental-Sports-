import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, MessageSquare, ArrowUpRight } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { STORE_INFO } from '../../data/storeInfo';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: '#0a0a0a',
        color: 'var(--color-ivory)',
        borderTop: '1px solid rgba(246, 243, 234, 0.08)',
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
                fontSize: '0.875rem',
                color: '#B5AFA4',
                lineHeight: 1.5,
                marginBottom: '20px',
              }}
            >
              Pune’s sports house. Gear for the game. Courts for the city. Handcrafted equipment and turnkey athletic infrastructure.
            </p>

            <div
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '0.8125rem',
                letterSpacing: '0.12em',
                color: 'var(--color-plate-gold)',
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
                fontSize: '0.875rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-pure-white)',
                marginBottom: '16px',
              }}
            >
              SHOP GEAR
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem' }}>
              <li>
                <Link to="/shop?category=pickleball" style={{ color: '#AAAAAA', transition: 'color 0.2s' }}>
                  Pickleball Paddles & Nets
                </Link>
              </li>
              <li>
                <Link to="/shop?category=cricket" style={{ color: '#AAAAAA', transition: 'color 0.2s' }}>
                  English & Kashmir Willow Bats
                </Link>
              </li>
              <li>
                <Link to="/shop?category=tennis" style={{ color: '#AAAAAA', transition: 'color 0.2s' }}>
                  Tour Tennis Racquets & Balls
                </Link>
              </li>
              <li>
                <Link to="/shop?category=badminton" style={{ color: '#AAAAAA', transition: 'color 0.2s' }}>
                  Badminton Racquets & Shuttles
                </Link>
              </li>
              <li>
                <Link to="/shop?category=fitness" style={{ color: '#AAAAAA', transition: 'color 0.2s' }}>
                  Fitness & Strength Equipment
                </Link>
              </li>
              <li>
                <Link to="/shop?category=recreation" style={{ color: '#AAAAAA', transition: 'color 0.2s' }}>
                  Birch Carrom & Recreation
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
                fontSize: '0.875rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-pure-white)',
                marginBottom: '16px',
              }}
            >
              COURTS & BUILD
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem' }}>
              <li>
                <Link to="/courts" style={{ color: '#AAAAAA', transition: 'color 0.2s' }}>
                  Court Construction Services
                </Link>
              </li>
              <li>
                <Link to="/courts/pickleball-court-construction" style={{ color: '#AAAAAA', transition: 'color 0.2s' }}>
                  Pickleball Court Setup
                </Link>
              </li>
              <li>
                <Link to="/courts/tennis-court-construction" style={{ color: '#AAAAAA', transition: 'color 0.2s' }}>
                  Tennis Court Resurfacing
                </Link>
              </li>
              <li>
                <Link to="/courts/football-cricket-multisport-turf" style={{ color: '#AAAAAA', transition: 'color 0.2s' }}>
                  Multi-Sport Synthetic Turf
                </Link>
              </li>
              <li>
                <Link to="/courts/projects" style={{ color: '#AAAAAA', transition: 'color 0.2s' }}>
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
                fontSize: '0.875rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-pure-white)',
                marginBottom: '16px',
              }}
            >
              THE CAMP STORE
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#B5AFA4' }}>
                <MapPin size={16} color="var(--color-plate-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Shop 247, MG Road, New Modikhana, Camp, Pune 411001</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} color="var(--color-plate-gold)" />
                <a href={`tel:${STORE_INFO.phone}`} style={{ color: '#FFFFFF', fontWeight: 600 }}>
                  {STORE_INFO.displayPhone}
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} color="var(--color-plate-gold)" />
                <a href={`mailto:${STORE_INFO.email}`} style={{ color: '#AAAAAA' }}>
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
                    gap: '6px',
                    color: 'var(--color-plate-gold)',
                    fontWeight: 700,
                    fontSize: '0.8125rem',
                    textTransform: 'uppercase',
                  }}
                >
                  <MessageSquare size={14} />
                  <span>WhatsApp Inquiry</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Large Subtle ORIENTAL SPORTS Typographic Element */}
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 'clamp(2.5rem, 10vw, 8.5rem)',
            lineHeight: 0.85,
            color: 'rgba(255, 255, 255, 0.03)',
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
            fontSize: '0.75rem',
            color: '#777777',
          }}
        >
          <div>
            © {new Date().getFullYear()} Oriental Sports, Pune. All rights reserved.
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <Link to="/about" style={{ color: '#888888' }}>About the House</Link>
            <Link to="/visit" style={{ color: '#888888' }}>Camp Store</Link>
            <Link to="/shipping" style={{ color: '#888888' }}>Shipping Policy</Link>
            <Link to="/returns" style={{ color: '#888888' }}>Returns Policy</Link>
            <Link to="/privacy" style={{ color: '#888888' }}>Privacy</Link>
            <Link to="/terms" style={{ color: '#888888' }}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
