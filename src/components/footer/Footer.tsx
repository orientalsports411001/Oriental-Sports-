import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from 'lucide-react';
import { STORE_INFO } from '../../data/storeInfo';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: '#0A0A0A',
        color: '#FFFFFF',
        borderTop: '2px solid #222222',
        paddingTop: 'clamp(56px, 7vw, 96px)',
        paddingBottom: 'clamp(32px, 4vw, 48px)',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        boxSizing: 'border-box',
      }}
      aria-label="Oriental Sports Footer"
    >
      <div className="container">
        {/* Large Editorial Brand Header */}
        <div
          style={{
            borderBottom: '2px solid #222222',
            paddingBottom: 'clamp(32px, 5vw, 56px)',
            marginBottom: 'clamp(32px, 5vw, 56px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.75rem, 10vw, 8.5rem)',
                lineHeight: 0.88,
                fontWeight: 900,
                color: '#FFFFFF',
                margin: 0,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
              }}
            >
              ORIENTAL<br />
              SPORTS.
            </h2>

            <div style={{ maxWidth: '360px' }}>
              <span
                className="font-mono"
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: 'var(--color-plate-gold)',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                PUNE SPORTS HOUSE • SINCE 1974
              </span>
              <p style={{ fontSize: '0.9375rem', color: '#AAAAAA', lineHeight: 1.5, margin: '0 0 16px 0' }}>
                Supplying tournament equipment to athletes and constructing sports court infrastructure across Pune and Maharashtra.
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
                  padding: '10px 18px',
                  backgroundColor: '#161616',
                  border: '1px solid #333333',
                  color: '#FFFFFF',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all var(--transition-fast)',
                  minHeight: '44px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-plate-gold)';
                  e.currentTarget.style.backgroundColor = 'var(--color-plate-gold)';
                  e.currentTarget.style.color = '#0A0A0A';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#333333';
                  e.currentTarget.style.backgroundColor = '#161616';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
              >
                <Navigation size={14} />
                <span>CAMP STORE DIRECTIONS</span>
              </a>
            </div>
          </div>
        </div>

        {/* Directory Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'clamp(28px, 4vw, 44px)',
            marginBottom: '48px',
          }}
        >
          {/* Column 1: Store & Workshop Details */}
          <div>
            <span
              className="font-mono"
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-plate-gold)',
                display: 'block',
                marginBottom: '14px',
              }}
            >
              CAMP WORKSHOP
            </span>
            <div style={{ fontSize: '0.875rem', color: '#CCCCCC', lineHeight: 1.6 }}>
              <div>Shop 247, MG Road</div>
              <div>New Modikhana, Camp</div>
              <div>Pune 411001, Maharashtra</div>
              <div style={{ marginTop: '10px' }}>
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
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                display: 'block',
                marginBottom: '14px',
              }}
            >
              EQUIPMENT
            </span>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8125rem' }}>
              <li><Link to="/shop/pickleball" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Pickleball</Link></li>
              <li><Link to="/shop/cricket" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Cricket</Link></li>
              <li><Link to="/shop/badminton" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Badminton</Link></li>
              <li><Link to="/shop/volleyball" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Volleyball</Link></li>
              <li><Link to="/shop/tennis" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Tennis</Link></li>
              <li><Link to="/shop/squash" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Squash</Link></li>
            </ul>
          </div>

          {/* Column 3: Courts & Projects */}
          <div>
            <span
              className="font-mono"
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                display: 'block',
                marginBottom: '14px',
              }}
            >
              INFRASTRUCTURE
            </span>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8125rem' }}>
              <li><Link to="/courts" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Court Construction</Link></li>
              <li><Link to="/courts/projects" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Pune Court Projects</Link></li>
              <li><Link to="/courts" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Acrylic Cushion Surfacing</Link></li>
              <li><Link to="/courts" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Multi-Sport Turf</Link></li>
              <li><Link to="/courts" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Floodlighting & Fencing</Link></li>
            </ul>
          </div>

          {/* Column 4: The House */}
          <div>
            <span
              className="font-mono"
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                display: 'block',
                marginBottom: '14px',
              }}
            >
              THE HOUSE
            </span>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8125rem' }}>
              <li><Link to="/about" style={{ color: '#AAAAAA', textDecoration: 'none' }}>About Heritage</Link></li>
              <li><Link to="/visit" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Visit Camp Store</Link></li>
              <li><Link to="/contact" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Contact Us</Link></li>
              <li><Link to="/account" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Athlete Account</Link></li>
              <li><Link to="/wishlist" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Wishlist</Link></li>
            </ul>
          </div>
        </div>

        {/* Sub-Footer Row */}
        <div
          style={{
            borderTop: '1px solid #1F1F1F',
            paddingTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.75rem',
            color: '#666666',
          }}
        >
          <div className="font-mono">
            © {new Date().getFullYear()} ORIENTAL SPORTS, PUNE. ALL RIGHTS RESERVED.
          </div>

          <div className="font-mono" style={{ display: 'flex', gap: '16px' }}>
            <span>GEAR. COURTS. PUNE.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
