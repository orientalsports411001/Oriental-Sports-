import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PRODUCTS, getLiveProducts } from '../data/products';
import type { Product } from '../types';
import { COURT_SERVICES } from '../data/courts';
import { ProductCard } from '../components/products/ProductCard';
import { PageHeader } from '../components/ui/PageHeader';

const POPULAR = ['Pickleball', 'Cricket bat', 'Badminton', 'Tennis', 'Court'];

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(query);
  const [filterType, setFilterType] = useState<'all' | 'products' | 'courts'>('all');
  const [allProducts, setAllProducts] = useState<Product[]>(() => getLiveProducts());

  useEffect(() => {
    const handleUpdate = () => setAllProducts(getLiveProducts());
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('os_catalog_updated', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('os_catalog_updated', handleUpdate);
    };
  }, []);

  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const matches = (...fields: string[]) =>
    terms.length === 0 || terms.every((t) => fields.some((f) => f && f.toLowerCase().includes(t)));

  const matchedProducts = allProducts.filter((p) => {
    const variantNames = p.variants ? p.variants.map((v) => v.name).join(' ') : '';
    const specValues = p.specs ? Object.values(p.specs).join(' ') : '';
    return matches(
      p.name,
      p.category,
      p.categoryName,
      p.subcategoryName || '',
      p.brand,
      p.description,
      p.productType,
      variantNames,
      specValues,
    );
  });
  const matchedCourts = COURT_SERVICES.filter((c) => matches(c.name, c.sport, c.description, 'court'));
  const total = matchedProducts.length + matchedCourts.length;

  const run = (q: string) => {
    const v = q.trim();
    if (v) setSearchParams({ q: v });
  };

  return (
    <div className="search-page">
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Search' }]}
        title={[query ? `“${query}”` : 'Find gear & courts']}
      >
        <form
          className="search-form"
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            run(searchInput);
          }}
        >
          <label htmlFor="search-page-input" className="visually-hidden">Search products and courts</label>
          <input
            id="search-page-input"
            className="input"
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Try “paddle”, “willow” or “tennis court”"
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </form>
        <div className="search-popular">
          <span className="label subtle">Popular</span>
          {POPULAR.map((term) => (
            <button key={term} type="button" className="chip" onClick={() => { setSearchInput(term); run(term); }}>
              {term}
            </button>
          ))}
        </div>
      </PageHeader>

      {query && (
        <div className="container search-results">
          <div className="filter-chips search-tabs" role="group" aria-label="Show">
            <button type="button" className="chip" aria-pressed={filterType === 'all'} onClick={() => setFilterType('all')}>
              All <span className="chip-count">{total}</span>
            </button>
            <button type="button" className="chip" aria-pressed={filterType === 'products'} onClick={() => setFilterType('products')}>
              Gear <span className="chip-count">{matchedProducts.length}</span>
            </button>
            <button type="button" className="chip" aria-pressed={filterType === 'courts'} onClick={() => setFilterType('courts')}>
              Courts <span className="chip-count">{matchedCourts.length}</span>
            </button>
          </div>

          {(filterType === 'all' || filterType === 'courts') && matchedCourts.length > 0 && (
            <section aria-labelledby="court-results" className="search-block">
              <h2 id="court-results" className="display d-3">Courts</h2>
              <ul className="search-court-list">
                {matchedCourts.map((c) => (
                  <li key={c.id}>
                    <Link to={`/courts#${c.slug}`} className="search-court">
                      <span className="search-court-name">{c.name}</span>
                      <span className="muted">{c.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {(filterType === 'all' || filterType === 'products') && (
            <section aria-labelledby="gear-results" className="search-block">
              <h2 id="gear-results" className="display d-3">Gear</h2>
              {matchedProducts.length > 0 ? (
                <ul className="product-grid">
                  {matchedProducts.map((p) => (
                    <li key={p.id}>
                      <ProductCard product={p} />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="empty-state">
                  <p className="muted">No gear matches “{query}” online. Try a broader word, or ask the store — not everything is listed here.</p>
                  <Link to="/shop" className="btn btn-primary">Browse all gear</Link>
                </div>
              )}
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
