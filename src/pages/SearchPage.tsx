import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { COURT_SERVICES } from '../data/courts';
import { ProductCard } from '../components/products/ProductCard';

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const normalized = query.toLowerCase().trim();

  const matchedProducts = normalized
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(normalized) ||
          p.category.toLowerCase().includes(normalized) ||
          p.brand.toLowerCase().includes(normalized) ||
          p.description.toLowerCase().includes(normalized)
      )
    : [];

  const matchedCourts = normalized
    ? COURT_SERVICES.filter(
        (c) =>
          c.name.toLowerCase().includes(normalized) ||
          c.sport.toLowerCase().includes(normalized)
      )
    : [];

  return (
    <div className="bg-ivory" style={{ minHeight: '80vh', paddingBottom: 'var(--space-4xl)' }}>
      {/* Search Header */}
      <div style={{ backgroundColor: 'var(--color-ink)', color: '#FFFFFF', padding: 'var(--space-2xl) 0' }}>
        <div className="container">
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-plate-gold)', textTransform: 'uppercase' }}>
            SEARCH RESULTS
          </span>
          <h1 className="font-display" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: '#FFFFFF', marginTop: '6px' }}>
            {query ? `Results for “${query}”` : 'Search Oriental Sports'}
          </h1>
          <span style={{ fontSize: '0.8125rem', color: '#B5AFA4' }}>
            Found {matchedProducts.length} equipment items & {matchedCourts.length} court services
          </span>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 'var(--space-2xl)' }}>
        {/* Court Services matches */}
        {matchedCourts.length > 0 && (
          <div style={{ marginBottom: '36px' }}>
            <h2 className="font-display" style={{ fontSize: '1.25rem', marginBottom: '12px' }}>
              MATCHING COURT SERVICES
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
              {matchedCourts.map((c) => (
                <div key={c.id} style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '2px', border: '1px solid #E2DCCF' }}>
                  <span className="badge badge-gold" style={{ marginBottom: '8px' }}>{c.sport}</span>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>{c.name}</h3>
                  <p style={{ fontSize: '0.8125rem', color: '#555', margin: '6px 0 12px' }}>{c.description}</p>
                  <Link to="/courts" className="btn btn-sm btn-outline-dark">
                    <span>VIEW COURT DETAILS</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Product Matches */}
        <div>
          <h2 className="font-display" style={{ fontSize: '1.25rem', marginBottom: '16px' }}>
            MATCHING GEAR & PRODUCTS ({matchedProducts.length})
          </h2>

          {matchedProducts.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 'var(--space-md)' }}>
              {matchedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div style={{ padding: '48px 16px', backgroundColor: '#FFFFFF', textAlign: 'center', borderRadius: '2px' }}>
              <p style={{ color: '#666', marginBottom: '16px' }}>
                No equipment matched your query.
              </p>
              <Link to="/shop" className="btn btn-primary btn-sm">
                BROWSE COMPLETE SHOP
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
