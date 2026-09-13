import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Navigation, Phone, Mail, MapPin } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { STORE_INFO } from '../../data/storeInfo';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: '#0A0A0A',
        color: '#FFFFFF',
        borderTop: '2px solid #222222',
        paddingTop: 'clamp(64px, 8vw, 100px)',
        paddingBottom: 'clamp(36px, 5vw, 48px)',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Oriental Sports Footer"
    >
      <div className="container">
        {/* Large Brutalist Interactive Header Banner */}
        <div
          style={{
            borderBottom: '2px solid #222222',
            paddingBottom: 'clamp(36px, 5vw, 64px)',
            marginBottom: 'clamp(36px, 5vw, 64px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(3rem, 11vw, 9.5rem)',
                lineHeight: 0.85,
                fontWeight: 900,
                color: '#FFFFFF',
                margin: 0,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
              }}
            >
              ORIENTAL
              <br />
              SPORTS.
            </h2>

            <div style={{ maxWidth: '360px' }}>
              <span
                className="font-mono"
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  color: '#C9A227',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                PUNE, MAHARASHTRA // ESTABLISHED HEADQUARTERS
              </span>
              <p style={{ fontSize: '0.9375rem', color: '#AAAAAA', lineHeight: 1.5, margin: '0 0 20px 0' }}>
                Pune’s dedicated sports house. Supplying tournament-grade gear to athletes and engineering championship court infrastructure across Maharashtra.
              </p>
              <a
                href={STORE_INFO.mapsUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="view"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  backgroundColor: '#161616',
                  border: '1px solid #333333',
                  color: '#FFFFFF',
                  fontSize: '0.8125rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#C9A227';
                  e.currentTarget.style.backgroundColor = '#C9A227';
                  e.currentTarget.style.color = '#0A0A0A';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#333333';
                  e.currentTarget.style.backgroundColor = '#161616';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
              >
                <Navigation size={15} />
                <span>GET DIRECTIONS TO CAMP STORE →</span>
              </a>
            </div>
          </div>
        </div>

        {/* Directory Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'clamp(32px, 4vw, 48px)',
            marginBottom: '64px',
          }}
        >
          {/* Column 1: Store & Workshop Details */}
          <div>
            <span
              className="font-mono"
              style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#C9A227',
                display: 'block',
                marginBottom: '16px',
              }}
            >
              CAMP WORKSHOP
            </span>
            <div style={{ fontSize: '0.875rem', color: '#CCCCCC', lineHeight: 1.6 }}>
              <div>Shop 247, MG Road</div>
              <div>New Modikhana, Camp</div>
              <div>Pune 411001, Maharashtra</div>
              <div style={{ marginTop: '12px' }}>
                <a
                  href={`tel:${STORE_INFO.phone}`}
                  className="font-mono"
                  style={{ color: '#FFFFFF', fontWeight: 700, textDecoration: 'none', display: 'block' }}
                >
                  {STORE_INFO.displayPhone}
                </a>
                <a
                  href={`mailto:${STORE_INFO.email}`}
                  style={{ color: '#888888', textDecoration: 'none', display: 'block', marginTop: '4px' }}
                >
                  {STORE_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Equipment Disciplines */}
          <div>
            <span
              className="font-mono"
              style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                display: 'block',
                marginBottom: '16px',
              }}
            >
              EQUIPMENT
            </span>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8125rem' }}>
              <li><Link to="/shop/pickleball" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Pickleball</Link></li>
              <li><Link to="/shop/cricket" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Cricket</Link></li>
              <li><Link to="/shop/badminton" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Badminton</Link></li>
              <li><Link to="/shop/volleyball" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Volleyball</Link></li>
              <li><Link to="/shop/tennis" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Tennis</Link></li>
              <li><Link to="/shop/squash" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Squash</Link></li>
              <li><Link to="/shop/fitness" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Fitness & Conditioning</Link></li>
            </ul>
          </div>

          {/* Column 3: Courts & Projects */}
          <div>
            <span
              className="font-mono"
              style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                display: 'block',
                marginBottom: '16px',
              }}
            >
              INFRASTRUCTURE
            </span>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8125rem' }}>
              <li><Link to="/courts" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Court Construction</Link></li>
              <li><Link to="/courts/projects" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Completed Pune Projects</Link></li>
              <li><Link to="/courts" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Acrylic Cushion Surfacing</Link></li>
              <li><Link to="/courts" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Multi-Sport Turf & Arenas</Link></li>
              <li><Link to="/courts" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Sports LED Floodlighting</Link></li>
            </ul>
          </div>

          {/* Column 4: House & Client Care */}
          <div>
            <span
              className="font-mono"
              style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                display: 'block',
                marginBottom: '16px',
              }}
            >
              THE HOUSE
            </span>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8125rem' }}>
              <li><Link to="/about" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Our Heritage</Link></li>
              <li><Link to="/visit" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Visit Camp Store</Link></li>
              <li><Link to="/contact" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Contact Team</Link></li>
              <li><Link to="/account" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Player Account</Link></li>
              <li><Link to="/wishlist" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Saved Gear</Link></li>
            </ul>
          </div>
        </div>

        {/* Sub-Footer Row */}
        <div
          style={{
            borderTop: '1px solid #1F1F1F',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.75rem',
            color: '#666666',
          }}
        >
          <div className="font-mono">
            © {new Date().getFullYear()} ORIENTAL SPORTS, PUNE. ALL RIGHTS RESERVED.
          </div>

          <div className="font-mono" style={{ display: 'flex', gap: '20px' }}>
            <span>GEAR. COURTS. PUNE.</span>
            <span>18.5204° N, 73.8567° E</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
