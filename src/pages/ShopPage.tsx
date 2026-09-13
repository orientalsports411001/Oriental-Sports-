import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, ArrowUpDown, Sparkles } from 'lucide-react';
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
    <div style={{ backgroundColor: '#F7F5EE', minHeight: '85vh', paddingBottom: '80px' }}>
      {/* Editorial Catalog Banner */}
      <div
        style={{
          backgroundColor: '#0A0A0A',
          color: '#FFFFFF',
          padding: 'clamp(56px, 7vw, 90px) 0',
          borderBottom: '2px solid #222222',
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ width: '8px', height: '8px', backgroundColor: '#2457FF' }} />
            <span
              className="font-mono"
              style={{
                fontWeight: 800,
                fontSize: '0.75rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#888888',
              }}
            >
              EQUIPMENT CATALOG // PUNE SPORTS HOUSE
            </span>
          </div>

          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(2.75rem, 6.5vw, 4.75rem)',
              color: '#FFFFFF',
              lineHeight: 0.95,
              marginBottom: '14px',
              letterSpacing: '-0.03em',
            }}
          >
            SPORTS GEAR & EQUIPMENT
          </h1>
          <p style={{ color: '#AAAAAA', maxWidth: '640px', fontSize: '1.0625rem', lineHeight: 1.5, margin: 0 }}>
            Tournament racquets, raw carbon pickleball paddles, handcrafted English willow cricket bats, and institutional equipment in Camp, Pune.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '32px' }}>
        {/* Filter Controls Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            paddingBottom: '20px',
            marginBottom: '32px',
            borderBottom: '2px solid #111111',
          }}
        >
          {/* Mobile Filter Drawer Trigger */}
          <button
            type="button"
            className="mobile-only"
            onClick={() => setIsMobileFilterOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              backgroundColor: '#111111',
              color: '#FFFFFF',
              fontSize: '0.8125rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              border: 'none',
            }}
          >
            <SlidersHorizontal size={15} />
            <span>FILTER & SORT</span>
          </button>

          {/* Desktop Categories Pills */}
          <div className="desktop-only" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <button
              type="button"
              onClick={() => handleCategoryChange('all')}
              style={{
                padding: '8px 16px',
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                backgroundColor: selectedCategory === 'all' ? '#111111' : '#FFFFFF',
                color: selectedCategory === 'all' ? '#FFFFFF' : '#111111',
                border: selectedCategory === 'all' ? '2px solid #111111' : '1px solid #D8D4C8',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
              }}
            >
              ALL GEAR ({PRODUCTS.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                style={{
                  padding: '8px 16px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  backgroundColor: selectedCategory === cat.id ? '#111111' : '#FFFFFF',
                  color: selectedCategory === cat.id ? '#FFFFFF' : '#111111',
                  border: selectedCategory === cat.id ? '2px solid #111111' : '1px solid #D8D4C8',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort Dropdown & Product Count */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: '#666666' }}>
              SHOWING {filteredProducts.length} ITEMS
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowUpDown size={14} color="#111111" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="font-mono"
                style={{
                  padding: '8px 12px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D8D4C8',
                  color: '#111111',
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                <option value="featured">SORT: FEATURED</option>
                <option value="price-asc">PRICE: LOW TO HIGH</option>
                <option value="price-desc">PRICE: HIGH TO LOW</option>
                <option value="rating">HIGHEST RATED</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
              gap: '24px',
            }}
          >
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 20px', backgroundColor: '#FFFFFF', border: '1px solid #E5E0D5' }}>
            <p style={{ color: '#666666', fontSize: '1rem', marginBottom: '20px' }}>
              No sports equipment found matching the selected filter criteria.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setInStockOnly(false);
              }}
              style={{
                padding: '12px 24px',
                backgroundColor: '#111111',
                color: '#FFFFFF',
                fontSize: '0.8125rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              RESET ALL FILTERS
            </button>
          </div>
        )}
      </div>

      {/* Mobile Filter Sheet */}
      {isMobileFilterOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'flex-end',
          }}
          onClick={() => setIsMobileFilterOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            style={{
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderTop: '2px solid #111111',
              padding: '24px',
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 className="font-display" style={{ fontSize: '1.25rem', margin: 0 }}>
                FILTER & SORT
              </h3>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <span className="font-mono" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#2457FF', textTransform: 'uppercase', marginBottom: '12px' }}>
                SELECT SPORT DISCIPLINE:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => {
                    handleCategoryChange('all');
                    setIsMobileFilterOpen(false);
                  }}
                  style={{
                    padding: '8px 14px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    backgroundColor: selectedCategory === 'all' ? '#111111' : '#F7F5EE',
                    color: selectedCategory === 'all' ? '#FFFFFF' : '#111111',
                    border: '1px solid #D8D4C8',
                  }}
                >
                  ALL GEAR
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
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      backgroundColor: selectedCategory === c.id ? '#2457FF' : '#F7F5EE',
                      color: selectedCategory === c.id ? '#FFFFFF' : '#111111',
                      border: '1px solid #D8D4C8',
                    }}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(false)}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#111111',
                color: '#FFFFFF',
                fontSize: '0.8125rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                border: 'none',
              }}
            >
              VIEW ({filteredProducts.length} PRODUCTS)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
