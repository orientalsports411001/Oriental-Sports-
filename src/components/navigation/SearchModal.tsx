import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Sparkles, Layers, ShieldCheck, Flame } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { CATEGORIES } from '../../data/categories';
import { COURT_SERVICES, COURT_PROJECTS } from '../../data/courts';
import { GlassPanel } from '../ui/GlassPanel';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 60);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const filteredProducts = normalizedQuery
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(normalizedQuery) ||
          p.category.toLowerCase().includes(normalizedQuery) ||
          p.brand.toLowerCase().includes(normalizedQuery) ||
          p.description.toLowerCase().includes(normalizedQuery)
      ).slice(0, 5)
    : [];

  const filteredCourts = normalizedQuery
    ? COURT_PROJECTS.filter(
        (c) =>
          c.title.toLowerCase().includes(normalizedQuery) ||
          c.sport.toLowerCase().includes(normalizedQuery) ||
          c.location.toLowerCase().includes(normalizedQuery)
      ).slice(0, 3)
    : [];

  const handleSelectProduct = (slug: string) => {
    onClose();
    navigate(`/product/${slug}`);
  };

  const handleSelectCourt = (slug: string) => {
    onClose();
    navigate(`/courts/projects`);
  };

  const handleViewAllSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const quickShortcuts = [
    { label: 'Toray Raw Carbon', q: 'carbon' },
    { label: 'Grade 1 Cricket Willow', q: 'cricket' },
    { label: 'Badminton Frames', q: 'badminton' },
    { label: 'Pickleball Outdoor Balls', q: 'balls' },
    { label: 'Pune Court Projects', q: 'pickleball' },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(8, 8, 8, 0.82)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 'clamp(20px, 6vw, 60px) 16px',
        overflowY: 'auto',
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search Oriental Sports"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          backgroundColor: '#111111',
          border: '1.5px solid #333333',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(36, 87, 255, 0.15)',
          overflow: 'hidden',
          animation: 'fadeIn 0.2s ease-out forwards',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Bar */}
        <form
          onSubmit={handleViewAllSearch}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '18px 24px',
            borderBottom: '1px solid #222222',
            backgroundColor: '#161616',
          }}
        >
          <Search size={22} color="#2457FF" style={{ marginRight: '14px', flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="search"
            placeholder="Search sports gear, raw carbon, cricket willow, courts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '1.0625rem',
              fontWeight: 600,
              fontFamily: 'var(--font-sans)',
              color: '#FFFFFF',
              backgroundColor: 'transparent',
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              style={{ color: '#888888', padding: '6px', marginRight: '10px', background: 'none', border: 'none', cursor: 'pointer' }}
              aria-label="Clear query"
            >
              <X size={18} />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="font-mono"
            style={{
              fontSize: '0.6875rem',
              fontWeight: 800,
              color: '#999999',
              backgroundColor: '#222222',
              border: '1px solid #333333',
              padding: '5px 9px',
              cursor: 'pointer',
              letterSpacing: '0.08em',
            }}
          >
            ESC
          </button>
        </form>

        {/* Results / Suggestions Container */}
        <div style={{ maxHeight: '460px', overflowY: 'auto', padding: '20px 24px' }}>
          {normalizedQuery ? (
            <div>
              {/* Product Results */}
              {filteredProducts.length > 0 && (
                <div style={{ marginBottom: '24px' }}>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      letterSpacing: '0.14em',
                      color: '#2457FF',
                      textTransform: 'uppercase',
                      marginBottom: '12px',
                    }}
                  >
                    EQUIPMENT & GEAR ({filteredProducts.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {filteredProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => handleSelectProduct(p.slug)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px',
                          padding: '10px 14px',
                          backgroundColor: '#161616',
                          border: '1px solid #242424',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#202020';
                          e.currentTarget.style.borderColor = '#2457FF';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#161616';
                          e.currentTarget.style.borderColor = '#242424';
                        }}
                      >
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          style={{
                            width: '48px',
                            height: '48px',
                            objectFit: 'cover',
                            backgroundColor: '#222222',
                            border: '1px solid #333333',
                          }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#FFFFFF' }}>
                            {p.name}
                          </div>
                          <div className="font-mono" style={{ fontSize: '0.75rem', color: '#999999', marginTop: '2px' }}>
                            {p.categoryName || p.category} • <strong style={{ color: '#D7FF00' }}>₹{p.price.toLocaleString('en-IN')}</strong>
                          </div>
                        </div>
                        <ArrowRight size={15} color="#2457FF" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Court Results */}
              {filteredCourts.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      letterSpacing: '0.14em',
                      color: '#C9A227',
                      textTransform: 'uppercase',
                      marginBottom: '12px',
                    }}
                  >
                    COURT INFRASTRUCTURE ({filteredCourts.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {filteredCourts.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => handleSelectCourt(c.slug)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 14px',
                          backgroundColor: '#161616',
                          border: '1px solid #242424',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#202020';
                          e.currentTarget.style.borderColor = '#C9A227';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#161616';
                          e.currentTarget.style.borderColor = '#242424';
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#FFFFFF' }}>
                            {c.title}
                          </div>
                          <div className="font-mono" style={{ fontSize: '0.75rem', color: '#888888', marginTop: '2px' }}>
                            {c.sport} • {c.location}
                          </div>
                        </div>
                        <ArrowRight size={15} color="#C9A227" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results Fallback */}
              {filteredProducts.length === 0 && filteredCourts.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px 16px' }}>
                  <p style={{ color: '#888888', fontSize: '0.9375rem', marginBottom: '20px' }}>
                    No equipment or court builds found matching "{query}".
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      navigate('/shop');
                    }}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#2457FF',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    EXPLORE ALL GEAR
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div
                className="font-mono"
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  color: '#888888',
                  textTransform: 'uppercase',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Flame size={14} color="#FF5A1F" />
                <span>POPULAR EQUIPMENT & SEARCH SHORTCUTS</span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
                {quickShortcuts.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setQuery(item.q)}
                    style={{
                      padding: '8px 14px',
                      backgroundColor: '#1C1C1C',
                      border: '1px solid #2B2B2B',
                      color: '#DDDDDD',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.18s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#2457FF';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#2B2B2B';
                      e.currentTarget.style.color = '#DDDDDD';
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Physical Workshop Flagship Note */}
              <div
                style={{
                  padding: '14px 18px',
                  backgroundColor: 'rgba(201, 162, 39, 0.1)',
                  border: '1px solid rgba(201, 162, 39, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <ShieldCheck size={18} color="#C9A227" style={{ flexShrink: 0 }} />
                <div style={{ fontSize: '0.8125rem', color: '#CCCCCC', lineHeight: 1.4 }}>
                  Looking for custom racquet restringing or bat oiling? Visit our workshop at <strong>Shop 247, MG Road, Camp, Pune</strong>.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
