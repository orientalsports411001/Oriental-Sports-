import React, { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Filter, ShieldCheck, Compass } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { COURT_SERVICES } from '../data/courts';
import { ProductCard } from '../components/products/ProductCard';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(query);
  const [filterType, setFilterType] = useState<'all' | 'products' | 'courts'>('all');

  const normalized = query.toLowerCase().trim();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    }
  };

  const matchedProducts = normalized
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(normalized) ||
          p.category.toLowerCase().includes(normalized) ||
          p.categoryName.toLowerCase().includes(normalized) ||
          p.brand.toLowerCase().includes(normalized) ||
          p.description.toLowerCase().includes(normalized)
      )
    : [];

  const matchedCourts = normalized
    ? COURT_SERVICES.filter(
        (c) =>
          c.name.toLowerCase().includes(normalized) ||
          c.sport.toLowerCase().includes(normalized) ||
          c.description.toLowerCase().includes(normalized)
      )
    : [];

  const totalMatches = matchedProducts.length + matchedCourts.length;

  return (
    <div className="bg-ivory" style={{ minHeight: '85vh', paddingBottom: 'var(--space-4xl)' }}>
      {/* Search Header with Brutalist Search Input */}
      <div
        style={{
          backgroundColor: 'var(--color-ink)',
          color: '#FFFFFF',
          padding: 'clamp(48px, 6vw, 80px) 0 40px',
          borderBottom: '2px solid #C9A227',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '800px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-plate-gold)' }}>
                DISCOVERY LOG
              </span>
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace' }}>
                {totalMatches} MATCHES LOCATED
              </span>
            </div>

            <h1 className="font-display" style={{ fontSize: 'clamp(2.25rem, 5.5vw, 3.75rem)', lineHeight: 0.95, color: '#FFFFFF', margin: '0 0 20px 0' }}>
              {query ? `SEARCH: “${query.toUpperCase()}”` : 'EXPLORE CATALOG & COURTS'}
            </h1>

            {/* In-Page Brutalist Search Form */}
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '8px', maxWidth: '600px' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Search
                  size={18}
                  style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }}
                />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search pickleball paddles, cricket bats, court builds..."
                  style={{
                    width: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    color: '#FFFFFF',
                    padding: '14px 16px 14px 44px',
                    fontSize: '0.9375rem',
                    outline: 'none',
                    borderRadius: '0px',
                  }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-gold"
                style={{ borderRadius: '0px', padding: '0 24px', fontWeight: 800, textTransform: 'uppercase' }}
              >
                <span>SEARCH</span>
              </button>
            </form>

            {/* Quick Filter Shortcut Chips */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Popular:
              </span>
              {['Pickleball', 'Cricket', 'Badminton', 'Acrylic Court', 'Toray Carbon'].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    setSearchInput(term);
                    setSearchParams({ q: term });
                  }}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#FFFFFF',
                    padding: '4px 10px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                  }}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 'clamp(32px, 5vw, 48px)' }}>
        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '32px', borderBottom: '2px solid #111111', paddingBottom: '12px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setFilterType('all')}
            style={{
              padding: '8px 16px',
              backgroundColor: filterType === 'all' ? '#111111' : '#FFFFFF',
              color: filterType === 'all' ? '#FFFFFF' : '#111111',
              border: '1px solid #111111',
              fontSize: '0.8125rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            ALL MATCHES ({totalMatches})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('products')}
            style={{
              padding: '8px 16px',
              backgroundColor: filterType === 'products' ? '#111111' : '#FFFFFF',
              color: filterType === 'products' ? '#FFFFFF' : '#111111',
              border: '1px solid #111111',
              fontSize: '0.8125rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            EQUIPMENT ({matchedProducts.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('courts')}
            style={{
              padding: '8px 16px',
              backgroundColor: filterType === 'courts' ? '#111111' : '#FFFFFF',
              color: filterType === 'courts' ? '#FFFFFF' : '#111111',
              border: '1px solid #111111',
              fontSize: '0.8125rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            COURT SERVICES ({matchedCourts.length})
          </button>
        </div>

        {/* Matching Court Services Section */}
        {(filterType === 'all' || filterType === 'courts') && matchedCourts.length > 0 && (
          <div style={{ marginBottom: '44px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Compass size={18} color="var(--color-plate-gold)" />
              <h2 className="font-display" style={{ fontSize: '1.375rem', margin: 0 }}>
                MATCHING COURT ENGINEERING ({matchedCourts.length})
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
              {matchedCourts.map((c) => (
                <div
                  key={c.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    padding: '24px',
                    border: '1px solid #111111',
                    boxShadow: '4px 4px 0px #111111',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span className="badge badge-gold" style={{ marginBottom: '10px' }}>{c.sport}</span>
                    <h3 style={{ fontSize: '1.1875rem', fontWeight: 800, margin: '0 0 8px 0', color: '#111111' }}>{c.name}</h3>
                    <p style={{ fontSize: '0.875rem', color: '#555555', margin: '0 0 16px 0', lineHeight: 1.45 }}>{c.description}</p>
                  </div>
                  <Link
                    to="/courts"
                    className="btn btn-outline-dark btn-sm"
                    style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <span>VIEW COURT BLUEPRINTS</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Product Matches Section */}
        {(filterType === 'all' || filterType === 'products') && (
          <div>
            <h2 className="font-display" style={{ fontSize: '1.375rem', marginBottom: '16px' }}>
              MATCHING EQUIPMENT ({matchedProducts.length})
            </h2>

            {matchedProducts.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 'clamp(16px, 2vw, 24px)' }}>
                {matchedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div
                style={{
                  padding: '64px 20px',
                  backgroundColor: '#FFFFFF',
                  textAlign: 'center',
                  border: '1px solid #111111',
                  boxShadow: '4px 4px 0px #111111',
                }}
              >
                <h3 className="font-display" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
                  NO EQUIPMENT MATCHED “{query}”
                </h3>
                <p style={{ color: '#666666', marginBottom: '24px', maxWidth: '440px', margin: '0 auto 24px auto' }}>
                  Check spelling or try broader terms like “paddle”, “bat”, “ball”, or browse our complete Pune shop catalog.
                </p>
                <Link to="/shop" className="btn btn-primary btn-lg">
                  <span>EXPLORE COMPLETE SHOP</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

