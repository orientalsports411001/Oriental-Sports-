import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { CATEGORIES } from '../../data/categories';
import { COURT_SERVICES } from '../../data/courts';

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
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

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
    ? COURT_SERVICES.filter(
        (c) =>
          c.name.toLowerCase().includes(normalizedQuery) ||
          c.sport.toLowerCase().includes(normalizedQuery) ||
          c.surfaceTypes.some((s) => s.toLowerCase().includes(normalizedQuery))
      ).slice(0, 3)
    : [];

  const handleSelectProduct = (slug: string) => {
    onClose();
    navigate(`/product/${slug}`);
  };

  const handleSelectCategory = (categoryId: string) => {
    onClose();
    navigate(`/shop?category=${categoryId}`);
  };

  const handleSelectCourt = (slug: string) => {
    onClose();
    navigate(`/courts/${slug}`);
  };

  const handleViewAllSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="search-modal-backdrop open" onClick={onClose} role="dialog" aria-modal="true">
      <div className="search-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Search Input Bar */}
        <form onSubmit={handleViewAllSearch} style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #E2DCCF' }}>
          <Search size={22} color="#C9A227" style={{ marginRight: '12px', flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="search"
            placeholder="Search gear, racquets, cricket bats, courts (e.g. pickleball, tennis)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '1rem',
              fontFamily: 'var(--font-sans)',
              color: '#111111',
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              style={{ color: '#888888', padding: '4px', marginRight: '8px' }}
              aria-label="Clear input"
            >
              <X size={18} />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            style={{ color: '#555555', padding: '4px' }}
            aria-label="Close search"
          >
            <X size={22} />
          </button>
        </form>

        {/* Content area */}
        <div style={{ maxHeight: '65vh', overflowY: 'auto', padding: '20px' }}>
          {/* Quick Category Suggestions */}
          {!normalizedQuery && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, color: '#C9A227', textTransform: 'uppercase', marginBottom: '12px' }}>
                <Sparkles size={14} />
                <span>POPULAR SPORTS IN PUNE</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {CATEGORIES.slice(0, 6).map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleSelectCategory(cat.id)}
                    style={{
                      padding: '8px 14px',
                      backgroundColor: '#F6F3EA',
                      border: '1px solid #E2DCCF',
                      borderRadius: '2px',
                      fontSize: '0.8125rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 600,
                      color: '#111111',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #EDE8DC' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#888888', textTransform: 'uppercase' }}>
                  EXPLORE INFRASTRUCTURE
                </span>
                <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      navigate('/courts');
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      backgroundColor: '#F6F3EA',
                      border: '1px solid #E2DCCF',
                      borderRadius: '2px',
                      color: '#111111',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      textAlign: 'left',
                    }}
                  >
                    <span>Pickleball, Tennis & Turf Court Construction</span>
                    <ArrowRight size={16} color="#C9A227" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Search results */}
          {normalizedQuery && (
            <div>
              {/* Matching Products */}
              {filteredProducts.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#C9A227', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
                    EQUIPMENT & GEAR ({filteredProducts.length})
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {filteredProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => handleSelectProduct(p.slug)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '8px 12px',
                          borderRadius: '2px',
                          cursor: 'pointer',
                          backgroundColor: '#FAF8F4',
                          border: '1px solid #EAE5D9',
                        }}
                      >
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '2px' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#111111' }}>{p.name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#666666' }}>
                            {p.categoryName} • {p.brand}
                          </div>
                        </div>
                        <div style={{ fontWeight: 800, color: '#111111', fontSize: '0.875rem' }}>
                          ₹{p.price.toLocaleString('en-IN')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matching Court Services */}
              {filteredCourts.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#C9A227', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
                    COURTS & INFRASTRUCTURE ({filteredCourts.length})
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {filteredCourts.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => handleSelectCourt(c.slug)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '10px 12px',
                          borderRadius: '2px',
                          cursor: 'pointer',
                          backgroundColor: '#111111',
                          color: '#F6F3EA',
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#FFFFFF' }}>{c.name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#C9A227' }}>
                            {c.sport} • {c.estimatedPriceRange}
                          </div>
                        </div>
                        <ArrowRight size={16} color="#C9A227" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredProducts.length === 0 && filteredCourts.length === 0 && (
                <div style={{ textAlign: 'center', padding: '32px 16px' }}>
                  <p style={{ color: '#666666', marginBottom: '12px' }}>
                    No exact matches found for "{query}".
                  </p>
                  <p style={{ fontSize: '0.8125rem', color: '#888888' }}>
                    Try searching for Cricket, Tennis, Pickleball, Badminton, or visit our Camp store.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {normalizedQuery && (
          <div style={{ padding: '12px 20px', borderTop: '1px solid #E2DCCF', backgroundColor: '#F9F8F5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: '#666666' }}>
              Press Enter to see all results
            </span>
            <button
              type="button"
              onClick={handleViewAllSearch}
              className="btn btn-primary btn-sm"
            >
              SEARCH ALL
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
