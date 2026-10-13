import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { STORE_INFO } from '../data/storeInfo';
import { ProductCard } from '../components/products/ProductCard';
import { PageHeader } from '../components/ui/PageHeader';
import { SportCategory, ProductType } from '../types';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'rating';

const SORTS: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'Featured Gear' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'rating', label: 'Top Rated' },
];

const PRICE_RANGES = [
  { id: 'all', label: 'All Prices', min: 0, max: Infinity },
  { id: 'under-1k', label: 'Under ₹1,000', min: 0, max: 1000 },
  { id: '1k-3k', label: '₹1,000 – ₹3,000', min: 1000, max: 3000 },
  { id: '3k-6k', label: '₹3,000 – ₹6,000', min: 3000, max: 6000 },
  { id: '6k-15k', label: '₹6,000 – ₹15,000', min: 6000, max: 15000 },
  { id: 'above-15k', label: 'Above ₹15,000', min: 15000, max: Infinity },
];

const CRICKET_BAT_SIZES = ['Size 3', 'Size 4', 'Size 5', 'Size 6', 'Size F', 'Standard'];

function FilterSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="filter-section">
      <button
        className="filter-section-header"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        type="button"
      >
        <span>{title}</span>
        <svg
          className={`filter-chevron ${open ? 'is-open' : ''}`}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && <div className="filter-section-body">{children}</div>}
    </div>
  );
}

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const selectedCategory = (searchParams.get('category') as SportCategory | null) ?? 'all';
  const selectedSubcategory = searchParams.get('subcategory') ?? 'all';
  const selectedBrand = searchParams.get('brand') ?? 'all';
  const selectedBatSize = searchParams.get('batSize') ?? 'all';
  const selectedPrice = searchParams.get('price') ?? 'all';
  const searchQuery = searchParams.get('q') ?? '';
  const sortBy = (searchParams.get('sort') as SortKey | null) ?? 'featured';

  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const update = useCallback(
    (key: string, value: string | null) => {
      const next = new URLSearchParams(searchParams);
      if (value === null || value === 'all' || value === '') next.delete(key);
      else next.set(key, value);
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  const clearAll = useCallback(() => {
    setSearchParams({}, { replace: true });
    setLocalSearch('');
  }, [setSearchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    update('q', localSearch.trim());
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (selectedSubcategory !== 'all') count++;
    if (selectedBrand !== 'all') count++;
    if (selectedBatSize !== 'all') count++;
    if (selectedPrice !== 'all') count++;
    if (searchQuery.trim()) count++;
    return count;
  }, [selectedCategory, selectedSubcategory, selectedBrand, selectedBatSize, selectedPrice, searchQuery]);

  // Compute available subcategories and brands based on current category selection
  const relevantProducts = useMemo(() => {
    return selectedCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const availableSubcategories = useMemo(() => {
    const map = new Map<string, string>();
    relevantProducts.forEach((p) => {
      if (p.subcategory && p.subcategoryName) {
        map.set(p.subcategory, p.subcategoryName);
      }
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [relevantProducts]);

  const availableBrands = useMemo(() => {
    const set = new Set<string>();
    relevantProducts.forEach((p) => {
      if (p.brand) set.add(p.brand);
    });
    return Array.from(set).sort();
  }, [relevantProducts]);

  const categoryCounts = useMemo(() => {
    const map = new Map<string, number>();
    PRODUCTS.forEach((p) => map.set(p.category, (map.get(p.category) ?? 0) + 1));
    return map;
  }, []);

  const subcategoryCounts = useMemo(() => {
    const map = new Map<string, number>();
    relevantProducts.forEach((p) => {
      if (p.subcategory) map.set(p.subcategory, (map.get(p.subcategory) ?? 0) + 1);
    });
    return map;
  }, [relevantProducts]);

  const brandCounts = useMemo(() => {
    const map = new Map<string, number>();
    relevantProducts.forEach((p) => {
      if (p.brand) map.set(p.brand, (map.get(p.brand) ?? 0) + 1);
    });
    return map;
  }, [relevantProducts]);

  const priceCounts = useMemo(() => {
    const map = new Map<string, number>();
    PRICE_RANGES.forEach((r) => {
      if (r.id === 'all') {
        map.set('all', relevantProducts.length);
      } else {
        const count = relevantProducts.filter((p) => p.price >= r.min && p.price < r.max).length;
        map.set(r.id, count);
      }
    });
    return map;
  }, [relevantProducts]);

  const priceRange = useMemo(
    () => PRICE_RANGES.find((r) => r.id === selectedPrice) ?? PRICE_RANGES[0],
    [selectedPrice],
  );

  const products = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedSubcategory !== 'all' && p.subcategory !== selectedSubcategory) return false;
      if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;
      
      // Cricket bat size filter
      if (selectedBatSize !== 'all') {
        const hasMatchingSize =
          p.sizes?.includes(selectedBatSize) ||
          p.variants?.some((v) => v.name.includes(selectedBatSize));
        if (!hasMatchingSize) return false;
      }

      if (p.price < priceRange.min || p.price >= priceRange.max) return false;

      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          (p.subcategoryName && p.subcategoryName.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q) ||
          (p.specs && Object.values(p.specs).some((v) => v.toLowerCase().includes(q))) ||
          (p.variants && p.variants.some((v) => v.name.toLowerCase().includes(q)));
        if (!matches) return false;
      }

      return true;
    });

    list = [...list].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });

    return list;
  }, [selectedCategory, selectedSubcategory, selectedBrand, selectedBatSize, priceRange, searchQuery, sortBy]);

  const categoriesWithStock = CATEGORIES.filter((c) => categoryCounts.has(c.id));

  const FilterContent = (
    <>
      {/* Clear all */}
      {activeFilterCount > 0 && (
        <div className="filter-clear-row">
          <span className="filter-active-label">{activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active</span>
          <button type="button" className="filter-clear-btn" onClick={clearAll}>
            Clear all
          </button>
        </div>
      )}

      {/* Sport / Category */}
      <FilterSection title="Sport Category">
        <div className="filter-radio-group">
          <label className={`filter-radio ${selectedCategory === 'all' ? 'is-checked' : ''}`}>
            <input
              type="radio"
              name="category"
              value="all"
              checked={selectedCategory === 'all'}
              onChange={() => {
                update('category', null);
                update('subcategory', null);
                update('brand', null);
                update('batSize', null);
              }}
            />
            <span>All Sports</span>
            <span className="filter-count">{PRODUCTS.length}</span>
          </label>
          {categoriesWithStock.map((c) => (
            <label key={c.id} className={`filter-radio ${selectedCategory === c.id ? 'is-checked' : ''}`}>
              <input
                type="radio"
                name="category"
                value={c.id}
                checked={selectedCategory === c.id}
                onChange={() => {
                  update('category', c.id);
                  update('subcategory', null);
                  update('brand', null);
                  update('batSize', null);
                }}
              />
              <span>{c.name}</span>
              <span className="filter-count">{categoryCounts.get(c.id)}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Subcategory */}
      {availableSubcategories.length > 1 && (
        <FilterSection title="Subcategory">
          <div className="filter-radio-group">
            <label className={`filter-radio ${selectedSubcategory === 'all' ? 'is-checked' : ''}`}>
              <input
                type="radio"
                name="subcategory"
                value="all"
                checked={selectedSubcategory === 'all'}
                onChange={() => update('subcategory', null)}
              />
              <span>All Subcategories</span>
              <span className="filter-count">{relevantProducts.length}</span>
            </label>
            {availableSubcategories.map((sub) => (
              <label key={sub.id} className={`filter-radio ${selectedSubcategory === sub.id ? 'is-checked' : ''}`}>
                <input
                  type="radio"
                  name="subcategory"
                  value={sub.id}
                  checked={selectedSubcategory === sub.id}
                  onChange={() => update('subcategory', sub.id)}
                />
                <span>{sub.name}</span>
                <span className="filter-count">{subcategoryCounts.get(sub.id) ?? 0}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Brand */}
      {availableBrands.length > 1 && (
        <FilterSection title="Brand">
          <div className="filter-radio-group">
            <label className={`filter-radio ${selectedBrand === 'all' ? 'is-checked' : ''}`}>
              <input
                type="radio"
                name="brand"
                value="all"
                checked={selectedBrand === 'all'}
                onChange={() => update('brand', null)}
              />
              <span>All Brands</span>
              <span className="filter-count">{relevantProducts.length}</span>
            </label>
            {availableBrands.map((b) => (
              <label key={b} className={`filter-radio ${selectedBrand === b ? 'is-checked' : ''}`}>
                <input
                  type="radio"
                  name="brand"
                  value={b}
                  checked={selectedBrand === b}
                  onChange={() => update('brand', b)}
                />
                <span>{b}</span>
                <span className="filter-count">{brandCounts.get(b) ?? 0}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Bat Size filter (when cricket is active) */}
      {(selectedCategory === 'cricket' || selectedCategory === 'all') && (
        <FilterSection title="Bat Size" defaultOpen={selectedCategory === 'cricket'}>
          <div className="filter-radio-group">
            <label className={`filter-radio ${selectedBatSize === 'all' ? 'is-checked' : ''}`}>
              <input
                type="radio"
                name="batSize"
                value="all"
                checked={selectedBatSize === 'all'}
                onChange={() => update('batSize', null)}
              />
              <span>All Sizes</span>
            </label>
            {CRICKET_BAT_SIZES.map((sz) => {
              const count = relevantProducts.filter(
                (p) => p.sizes?.includes(sz) || p.variants?.some((v) => v.name.includes(sz))
              ).length;
              return (
                <label key={sz} className={`filter-radio ${selectedBatSize === sz ? 'is-checked' : ''}`}>
                  <input
                    type="radio"
                    name="batSize"
                    value={sz}
                    checked={selectedBatSize === sz}
                    onChange={() => update('batSize', sz)}
                  />
                  <span>{sz}</span>
                  <span className="filter-count">{count}</span>
                </label>
              );
            })}
          </div>
        </FilterSection>
      )}

      {/* Price Range */}
      <FilterSection title="Price Range">
        <div className="filter-radio-group">
          {PRICE_RANGES.map((r) => (
            <label key={r.id} className={`filter-radio ${selectedPrice === r.id ? 'is-checked' : ''}`}>
              <input
                type="radio"
                name="price"
                value={r.id}
                checked={selectedPrice === r.id || (r.id === 'all' && selectedPrice === 'all')}
                onChange={() => update('price', r.id === 'all' ? null : r.id)}
              />
              <span>{r.label}</span>
              <span className="filter-count">{priceCounts.get(r.id) ?? 0}</span>
            </label>
          ))}
        </div>
      </FilterSection>
    </>
  );

  return (
    <div className="shop-page">
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Products & Equipment' }]}
        title={['Sports equipment', 'catalog']}
        lead={`Verified bats, racquets, footballs, shuttlecocks, and court gear across ${CATEGORIES.length} disciplines. Fulfilled directly from our MG Road, Camp store.`}
        aside={
          <a href={STORE_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="link-arrow">
            Ask on WhatsApp <span className="btn-arrow" aria-hidden="true">→</span>
          </a>
        }
      />

      {/* Category Fast-Rail */}
      <nav className="container" aria-label="Category quick navigation" style={{ paddingBlock: '12px 20px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '4px' }}>
          <button
            type="button"
            className="chip"
            aria-pressed={selectedCategory === 'all'}
            onClick={() => {
              update('category', null);
              update('subcategory', null);
              update('brand', null);
              update('batSize', null);
            }}
          >
            All Sports ({PRODUCTS.length})
          </button>
          {categoriesWithStock.map((c) => (
            <button
              key={c.id}
              type="button"
              className="chip"
              aria-pressed={selectedCategory === c.id}
              onClick={() => {
                update('category', selectedCategory === c.id ? null : c.id);
                update('subcategory', null);
                update('brand', null);
                update('batSize', null);
              }}
            >
              {c.name} ({categoryCounts.get(c.id) ?? 0})
            </button>
          ))}
        </div>
      </nav>

      {/* Sticky toolbar */}
      <div className="shop-toolbar">
        <div className="container shop-toolbar-inner">
          <div className="shop-toolbar-left">
            {/* Mobile filter trigger */}
            <button
              type="button"
              className="shop-filter-btn"
              onClick={() => setDrawerOpen(true)}
              aria-haspopup="dialog"
              aria-label="Open filters"
            >
              <SlidersHorizontal size={15} />
              Filters
              {activeFilterCount > 0 && (
                <span className="shop-filter-badge">{activeFilterCount}</span>
              )}
            </button>

            {/* Live Search Form */}
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', position: 'relative', minWidth: '160px', maxWidth: '280px', flex: 1 }}>
              <input
                type="search"
                placeholder="Search gear, brand..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                onBlur={() => update('q', localSearch.trim())}
                style={{
                  width: '100%',
                  height: '36px',
                  padding: '0 30px 0 32px',
                  fontSize: '0.8125rem',
                  border: '1.5px solid var(--line-strong)',
                  borderRadius: '9999px',
                  background: 'var(--paper)',
                  color: 'var(--ink)',
                  outline: 'none',
                }}
              />
              <Search size={14} style={{ position: 'absolute', left: '11px', color: 'var(--muted)', pointerEvents: 'none' }} />
              {localSearch && (
                <button
                  type="button"
                  onClick={() => {
                    setLocalSearch('');
                    update('q', null);
                  }}
                  style={{
                    position: 'absolute',
                    right: '8px',
                    background: 'none',
                    border: 'none',
                    color: 'var(--muted)',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </form>

            {/* Active filter pills */}
            <div className="shop-active-pills">
              {selectedCategory !== 'all' && (
                <button type="button" className="active-pill" onClick={() => { update('category', null); update('subcategory', null); }}>
                  {CATEGORIES.find((c) => c.id === selectedCategory)?.name}
                  <X size={11} />
                </button>
              )}
              {selectedSubcategory !== 'all' && (
                <button type="button" className="active-pill" onClick={() => update('subcategory', null)}>
                  {availableSubcategories.find((s) => s.id === selectedSubcategory)?.name || selectedSubcategory}
                  <X size={11} />
                </button>
              )}
              {selectedBrand !== 'all' && (
                <button type="button" className="active-pill" onClick={() => update('brand', null)}>
                  {selectedBrand}
                  <X size={11} />
                </button>
              )}
              {selectedBatSize !== 'all' && (
                <button type="button" className="active-pill" onClick={() => update('batSize', null)}>
                  {selectedBatSize}
                  <X size={11} />
                </button>
              )}
              {selectedPrice !== 'all' && (
                <button type="button" className="active-pill" onClick={() => update('price', null)}>
                  {PRICE_RANGES.find((r) => r.id === selectedPrice)?.label}
                  <X size={11} />
                </button>
              )}
            </div>
          </div>

          <div className="shop-toolbar-right">
            <span className="shop-result-count">{products.length} {products.length === 1 ? 'item' : 'items'}</span>
            <label className="sort-control" aria-label="Sort products">
              <select
                className="select"
                value={sortBy}
                onChange={(e) => update('sort', e.target.value === 'featured' ? null : e.target.value)}
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      {/* Main shop layout */}
      <div className="container shop-layout">
        {/* Sidebar — desktop only */}
        <aside className="shop-sidebar" aria-label="Product filters">
          <div className="shop-sidebar-inner">
            <div className="shop-sidebar-head">
              <span className="shop-sidebar-title">Filters</span>
              {activeFilterCount > 0 && (
                <button type="button" className="filter-clear-btn" onClick={clearAll}>
                  Clear all
                </button>
              )}
            </div>
            {FilterContent}
          </div>
        </aside>

        {/* Product grid */}
        <section className="shop-results" aria-live="polite" aria-label="Products">
          {products.length > 0 ? (
            <>
              {selectedCategory !== 'all' && (
                <p className="results-count">
                  {products.length} {products.length === 1 ? 'product' : 'products'} in{' '}
                  {CATEGORIES.find((c) => c.id === selectedCategory)?.name} ·{' '}
                  <Link to={`/shop/${selectedCategory}`}>
                    About {CATEGORIES.find((c) => c.id === selectedCategory)?.name.toLowerCase()} at the Camp store
                  </Link>
                </p>
              )}
              <ul className="product-grid">
                {products.map((p) => (
                  <li key={p.id}>
                    <ProductCard product={p} />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="empty-state">
              <p className="display d-3">Nothing found.</p>
              <p className="muted">Try adjusting your search or clearing your active filters.</p>
              <button type="button" className="btn btn-primary" onClick={clearAll}>
                Clear all filters
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="filter-drawer-overlay" onClick={() => setDrawerOpen(false)} aria-hidden="true" />
      )}
      <div
        className={`filter-drawer ${drawerOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Product filters"
      >
        <div className="filter-drawer-head">
          <span className="shop-sidebar-title">Filters ({activeFilterCount})</span>
          <button
            type="button"
            className="filter-drawer-close"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close filters"
          >
            <X size={20} />
          </button>
        </div>
        <div className="filter-drawer-body">
          {FilterContent}
        </div>
        <div className="filter-drawer-foot">
          <button type="button" className="btn btn-primary" style={{ width: '100%' }} onClick={() => setDrawerOpen(false)}>
            View {products.length} {products.length === 1 ? 'item' : 'items'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
