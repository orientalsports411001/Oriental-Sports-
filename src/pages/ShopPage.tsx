import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { STORE_INFO } from '../data/storeInfo';
import { ProductCard } from '../components/products/ProductCard';
import { PageHeader } from '../components/ui/PageHeader';
import { SportCategory } from '../types';

type SortKey = 'featured' | 'price-asc' | 'price-desc';

const SORTS: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price, low to high' },
  { value: 'price-desc', label: 'Price, high to low' },
];

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selected = (searchParams.get('category') as SportCategory | null) ?? 'all';
  const sortBy = (searchParams.get('sort') as SortKey | null) ?? 'featured';

  const update = (key: string, value: string | null) => {
    const next = new URLSearchParams(searchParams);
    if (value === null) next.delete(key);
    else next.set(key, value);
    setSearchParams(next, { replace: true });
  };

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    PRODUCTS.forEach((p) => map.set(p.category, (map.get(p.category) ?? 0) + 1));
    return map;
  }, []);

  const products = useMemo(
    () =>
      PRODUCTS.filter((p) => selected === 'all' || p.category === selected).sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }),
    [selected, sortBy],
  );

  const categoriesWithStock = CATEGORIES.filter((c) => counts.has(c.id));

  return (
    <div className="shop-page">
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Shop' }]}
        title={['All gear']}
        lead={`Racquets, bats, paddles, tables and fitness equipment across ${CATEGORIES.length} sports. Can’t see what you need? Ask the Camp store.`}
        aside={
          <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="link-arrow">
            Ask on WhatsApp <span className="btn-arrow" aria-hidden="true">→</span>
          </a>
        }
      />

      <div className="filter-bar">
        <div className="container filter-bar-inner">
          <div className="filter-chips" role="group" aria-label="Filter by sport">
            <button type="button" className="chip" aria-pressed={selected === 'all'} onClick={() => update('category', null)}>
              All <span className="chip-count">{PRODUCTS.length}</span>
            </button>
            {categoriesWithStock.map((c) => (
              <button
                key={c.id}
                type="button"
                className="chip"
                aria-pressed={selected === c.id}
                onClick={() => update('category', c.id)}
              >
                {c.name} <span className="chip-count">{counts.get(c.id)}</span>
              </button>
            ))}
          </div>
          <label className="sort-control">
            <span className="visually-hidden">Sort products</span>
            <select className="select" value={sortBy} onChange={(e) => update('sort', e.target.value === 'featured' ? null : e.target.value)}>
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <section className="container shop-results" aria-live="polite" aria-label="Products">
        <p className="results-count">
          {products.length} {products.length === 1 ? 'product' : 'products'}
          {selected !== 'all' && (
            <>
              {' '}in {CATEGORIES.find((c) => c.id === selected)?.name} ·{' '}
              <Link to={`/shop/${selected}`}>About {CATEGORIES.find((c) => c.id === selected)?.name.toLowerCase()} at the store</Link>
            </>
          )}
        </p>

        {products.length > 0 ? (
          <ul className="product-grid">
            {products.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state">
            <p className="display d-3">Nothing here yet.</p>
            <p className="muted">This sport isn’t listed online. The Camp store can help.</p>
            <button type="button" className="btn btn-primary" onClick={() => update('category', null)}>
              Show all gear
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ShopPage;
