import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, X, ArrowUpDown } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from '../components/products/ProductCard';
import { SportCategory } from '../types';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') as SportCategory | null;

  const [selectedCategory, setSelectedCategory] = useState<SportCategory | 'all'>(
    categoryParam || 'all'
  );
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync category param
  const handleCategoryChange = (cat: SportCategory | 'all') => {
    setSelectedCategory(cat);
    if (cat === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      if (inStockOnly && !product.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategory, inStockOnly, sortBy]);

  return (
    <div className="bg-ivory" style={{ minHeight: '80vh', paddingBottom: 'var(--space-4xl)' }}>
      {/* Category Hero / Header */}
      <div
        style={{
          backgroundColor: 'var(--color-ink)',
          color: 'var(--color-ivory)',
          padding: 'var(--space-3xl) 0',
          borderBottom: '1px solid rgba(246, 243, 234, 0.08)',
        }}
      >
        <div className="container">
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-plate-gold)',
              display: 'block',
              marginBottom: '8px',
            }}
          >
            THE ATHLETIC CATALOG
          </span>
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              color: 'var(--color-pure-white)',
              lineHeight: 1.05,
              marginBottom: '12px',
            }}
          >
            SPORTS GEAR & EQUIPMENT
          </h1>
          <p style={{ color: '#C5BFB3', maxWidth: '600px', fontSize: '1rem' }}>
            Tournament racquets, handcrafted cricket willow, pickleball carbon paddles, and institutional fitness gear in Pune.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 'var(--space-xl)' }}>
        {/* Filter Controls Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            paddingBottom: '16px',
            marginBottom: '24px',
            borderBottom: '1px solid var(--color-ivory-border)',
          }}
        >
          {/* Mobile Filter Drawer Trigger */}
          <button
            type="button"
            className="btn btn-outline-dark btn-sm mobile-only-block"
            onClick={() => setIsMobileFilterOpen(true)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <SlidersHorizontal size={14} />
            <span>FILTER & SORT</span>
          </button>

          {/* Desktop Categories Pills */}
          <div className="desktop-only" style={{ flexWrap: 'wrap', gap: '6px' }}>
            <button
              type="button"
              onClick={() => handleCategoryChange('all')}
              style={{
                padding: '6px 12px',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                borderRadius: '2px',
                backgroundColor: selectedCategory === 'all' ? 'var(--color-ink)' : 'var(--color-pure-white)',
                color: selectedCategory === 'all' ? 'var(--color-pure-white)' : 'var(--color-ink)',
                border: '1px solid var(--color-ivory-border)',
                cursor: 'pointer',
              }}
            >
              ALL ({PRODUCTS.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  borderRadius: '2px',
                  backgroundColor: selectedCategory === cat.id ? 'var(--color-plate-gold)' : 'var(--color-pure-white)',
                  color: 'var(--color-ink)',
                  border: '1px solid var(--color-ivory-border)',
                  cursor: 'pointer',
                }}
              >
                {cat.name.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Sort Dropdown & Product Count */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.8125rem', color: '#666666' }}>
              Showing {filteredProducts.length} items
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ArrowUpDown size={14} color="#C9A227" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                style={{
                  padding: '6px 10px',
                  fontSize: '0.8125rem',
                  backgroundColor: 'var(--color-pure-white)',
                  border: '1px solid var(--color-ivory-border)',
                  borderRadius: '2px',
                  color: 'var(--color-ink)',
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 'var(--space-md)',
            }}
          >
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '64px 16px', backgroundColor: '#FFFFFF', borderRadius: '2px' }}>
            <p style={{ color: '#666666', marginBottom: '16px' }}>
              No products found for the selected filter.
            </p>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => {
                setSelectedCategory('all');
                setInStockOnly(false);
              }}
            >
              RESET FILTERS
            </button>
          </div>
        )}
      </div>

      {/* Mobile Filter Bottom Sheet */}
      {isMobileFilterOpen && (
        <div
          className="search-modal-backdrop open"
          onClick={() => setIsMobileFilterOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px',
              padding: '24px',
              maxHeight: '80vh',
              overflowY: 'auto',
              boxShadow: '0 -8px 32px rgba(0,0,0,0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.125rem', fontFamily: 'var(--font-heading)' }}>
                FILTER & SORT
              </h3>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                style={{ padding: '4px' }}
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>

            {/* Sport Categories in mobile sheet */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#C9A227', textTransform: 'uppercase', marginBottom: '10px' }}>
                Select Sport
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => {
                    handleCategoryChange('all');
                    setIsMobileFilterOpen(false);
                  }}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '2px',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    backgroundColor: selectedCategory === 'all' ? '#111111' : '#F6F3EA',
                    color: selectedCategory === 'all' ? '#FFFFFF' : '#111111',
                    border: '1px solid #E2DCCF',
                  }}
                >
                  ALL SPORTS
                </button>
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      handleCategoryChange(c.id);
                      setIsMobileFilterOpen(false);
                    }}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '2px',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      backgroundColor: selectedCategory === c.id ? '#C9A227' : '#F6F3EA',
                      color: '#111111',
                      border: '1px solid #E2DCCF',
                    }}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={() => setIsMobileFilterOpen(false)}
            >
              APPLY & VIEW ({filteredProducts.length} PRODUCTS)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
