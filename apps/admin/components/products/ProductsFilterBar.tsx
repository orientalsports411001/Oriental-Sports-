'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

interface Category {
  slug: string;
  name: string;
}

interface ProductsFilterBarProps {
  categories: Category[];
  totalCount: number;
}

export function ProductsFilterBar({ categories, totalCount }: ProductsFilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentQ = searchParams.get('q') || '';
  const currentStatus = searchParams.get('status') || '';
  const currentCategory = searchParams.get('category') || '';

  const [searchTerm, setSearchTerm] = useState(currentQ);

  const applyFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete('page');

    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilter('q', searchTerm);
  };

  const clearAll = () => {
    setSearchTerm('');
    startTransition(() => {
      router.push('/products');
    });
  };

  const hasActiveFilters = Boolean(currentQ || currentStatus || currentCategory);

  return (
    <div style={{ marginBottom: 20 }}>
      {/* Category Tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          overflowX: 'auto',
          paddingBottom: 12,
          scrollbarWidth: 'none',
        }}
      >
        <button
          type="button"
          onClick={() => applyFilter('category', '')}
          style={{
            padding: '6px 14px',
            borderRadius: 9999,
            border: 'none',
            background: currentCategory === '' ? 'var(--blood-crimson)' : 'rgba(255, 255, 255, 0.06)',
            color: currentCategory === '' ? '#FFFFFF' : 'var(--muted)',
            boxShadow: currentCategory === '' ? '0 2px 10px rgba(200, 16, 46, 0.4)' : 'none',
            fontSize: 12.5,
            fontWeight: 700,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.15s ease',
          }}
        >
          All ({totalCount})
        </button>

        {categories.map((c) => {
          const isSelected = currentCategory === c.slug;
          return (
            <button
              key={c.slug}
              type="button"
              onClick={() => applyFilter('category', isSelected ? '' : c.slug)}
              style={{
                padding: '6px 14px',
                borderRadius: 9999,
                border: 'none',
                background: isSelected ? 'var(--blood-crimson)' : 'rgba(255, 255, 255, 0.06)',
                color: isSelected ? '#FFFFFF' : 'var(--muted)',
                boxShadow: isSelected ? '0 2px 10px rgba(200, 16, 46, 0.4)' : 'none',
                fontSize: 12.5,
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              {c.name}
            </button>
          );
        })}
      </div>

      {/* Simple Minimalist Search & Filter Strip */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <form
          onSubmit={handleSearchSubmit}
          style={{ flex: 1, minWidth: 260 }}
        >
          <input
            type="text"
            placeholder="Search equipment by title, brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 16px',
              fontSize: 13,
              borderRadius: 12,
              border: '1px solid rgba(255, 255, 255, 0.12)',
              background: '#161616',
              color: '#FFFFFF',
              outline: 'none',
            }}
          />
        </form>

        <select
          value={currentStatus}
          onChange={(e) => applyFilter('status', e.target.value)}
          style={{
            height: 40,
            padding: '0 16px',
            fontSize: 12.5,
            fontWeight: 600,
            borderRadius: 12,
            border: '1px solid rgba(255, 255, 255, 0.12)',
            background: '#161616',
            color: '#FFFFFF',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <option value="">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearAll}
            style={{
              height: 40,
              padding: '0 16px',
              fontSize: 12,
              fontWeight: 700,
              borderRadius: 12,
              border: '1px solid rgba(255, 255, 255, 0.12)',
              background: '#222222',
              color: '#FFFFFF',
              cursor: 'pointer',
              boxShadow: 'none',
            }}
          >
            Reset
          </button>
        )}

        {isPending && (
          <span style={{ fontSize: 11.5, color: 'var(--subtle)', fontWeight: 600 }}>
            Updating...
          </span>
        )}
      </div>
    </div>
  );
}
