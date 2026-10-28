'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { DeleteProductButton } from './DeleteProductButton';

interface Category {
  slug: string;
  name: string;
}

interface ProductItem {
  id: string;
  name: string;
  slug: string;
  brand?: string;
  category_slug?: string;
  status: 'draft' | 'published' | 'archived';
  price: number;
  compare_at_price?: number | null;
  images?: string[];
  stock_quantity: number;
  low_stock_threshold: number;
  isCustom?: boolean;
}

interface ProductsCatalogViewProps {
  initialProducts: ProductItem[];
  initialCount: number;
  categories: Category[];
  totalCatalogValue: number;
  publishedCount: number;
  lowStockCount: number;
  deleteAction: (id: string) => Promise<void>;
}

export function ProductsCatalogView({
  initialProducts,
  initialCount,
  categories,
  totalCatalogValue: initialValue,
  publishedCount: initialPublished,
  lowStockCount: initialLowStock,
  deleteAction,
}: ProductsCatalogViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [customProducts, setCustomProducts] = useState<ProductItem[]>([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get('status') || '');
  const [showExportModal, setShowExportModal] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Load custom products from localStorage
  const loadCustomProducts = () => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem('os_custom_products');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const formatted: ProductItem[] = parsed.map((p: any) => ({
            id: p.id || `prod-os-${p.slug}`,
            name: p.name || 'Untitled Product',
            slug: p.slug || 'product',
            brand: p.brand || 'Oriental Sports',
            category_slug: p.category_slug || p.category || 'accessories',
            status: (p.status || 'published') as any,
            price: Number(p.price) || 0,
            compare_at_price: p.compare_at_price ? Number(p.compare_at_price) : null,
            images: Array.isArray(p.images) ? p.images : [],
            stock_quantity: Number(p.stock_quantity ?? 10),
            low_stock_threshold: Number(p.low_stock_threshold ?? 5),
            isCustom: true,
          }));
          setCustomProducts(formatted);
        }
      }
    } catch {}
  };

  useEffect(() => {
    loadCustomProducts();

    // Listen to storage events and BroadcastChannel
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'os_custom_products') {
        loadCustomProducts();
      }
    };
    window.addEventListener('storage', handleStorage);
    window.addEventListener('os_catalog_updated', loadCustomProducts);

    let bc: BroadcastChannel | null = null;
    try {
      bc = new BroadcastChannel('oriental_sports_catalog');
      bc.onmessage = () => loadCustomProducts();
    } catch {}

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('os_catalog_updated', loadCustomProducts);
      if (bc) bc.close();
    };
  }, []);

  // Merge custom products with server products (deduplicating by id and slug)
  const allMergedProducts = useMemo(() => {
    const customIds = new Set(customProducts.map((p) => p.id).concat(customProducts.map((p) => p.slug)));
    const serverFiltered = initialProducts.filter((p) => !customIds.has(p.id) && !customIds.has(p.slug));
    return [...customProducts, ...serverFiltered];
  }, [customProducts, initialProducts]);

  // Compute live metrics
  const totalSkus = allMergedProducts.length;
  const publishedCount = allMergedProducts.filter((p) => p.status === 'published').length;
  const lowStockCount = allMergedProducts.filter((p) => p.stock_quantity <= p.low_stock_threshold).length;
  const totalCatalogValue = allMergedProducts.reduce((acc, p) => acc + p.price * p.stock_quantity, 0);

  // Per category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of categories) {
      counts[c.slug] = 0;
    }
    for (const p of allMergedProducts) {
      const cat = p.category_slug || '';
      if (counts[cat] !== undefined) {
        counts[cat]++;
      }
    }
    return counts;
  }, [categories, allMergedProducts]);

  // Filter products based on active filters
  const filteredProducts = useMemo(() => {
    let list = allMergedProducts;

    if (selectedCategory) {
      list = list.filter((p) => p.category_slug === selectedCategory);
    }
    if (selectedStatus) {
      list = list.filter((p) => p.status === selectedStatus);
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.brand && p.brand.toLowerCase().includes(q)) ||
          p.slug.toLowerCase().includes(q)
      );
    }

    return list;
  }, [allMergedProducts, selectedCategory, selectedStatus, searchTerm]);

  // Update URL params smoothly
  const updateUrl = (category: string, status: string, q: string) => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (status) params.set('status', status);
    if (q) params.set('q', q);
    const newSearch = params.toString();
    const newUrl = `/products${newSearch ? `?${newSearch}` : ''}`;
    window.history.replaceState(null, '', newUrl);
  };

  const handleCategorySelect = (catSlug: string) => {
    const next = selectedCategory === catSlug ? '' : catSlug;
    setSelectedCategory(next);
    updateUrl(next, selectedStatus, searchTerm);
  };

  const handleStatusSelect = (stat: string) => {
    setSelectedStatus(stat);
    updateUrl(selectedCategory, stat, searchTerm);
  };

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    updateUrl(selectedCategory, selectedStatus, val);
  };

  const handleDeleteProduct = async (id: string) => {
    // If it's a custom product, delete from client localStorage
    try {
      const raw = localStorage.getItem('os_custom_products');
      if (raw) {
        const list = JSON.parse(raw);
        const filtered = list.filter((p: any) => p.id !== id && p.slug !== id);
        localStorage.setItem('os_custom_products', JSON.stringify(filtered));
        loadCustomProducts();
      }
    } catch {}

    // Call server action
    try {
      await deleteAction(id);
    } catch {}
  };

  const handleCopyCustomJson = () => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem('os_custom_products') || '[]';
      navigator.clipboard.writeText(raw);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2500);
    } catch {}
  };

  return (
    <div>
      {/* Metric Cards Ribbon */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            padding: '20px 24px',
            background: 'var(--paper)',
            borderRadius: 20,
            border: '1px solid var(--line)',
            boxShadow: '0 8px 24px -2px rgba(0, 0, 0, 0.35)',
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--subtle)', letterSpacing: '0.08em', marginBottom: 8 }}>
            Total Catalog
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--ink-heading)', letterSpacing: '-0.015em', lineHeight: 1.15, marginBottom: 4 }}>
            {totalSkus} Items
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>
            All sport disciplines
          </div>
        </div>

        <div
          style={{
            padding: '20px 24px',
            background: 'var(--paper)',
            borderRadius: 20,
            border: '1px solid var(--line)',
            boxShadow: '0 8px 24px -2px rgba(0, 0, 0, 0.35)',
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--subtle)', letterSpacing: '0.08em', marginBottom: 8 }}>
            Published & Live
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--success)', letterSpacing: '-0.015em', lineHeight: 1.15, marginBottom: 4 }}>
            {publishedCount} SKUs
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>
            Buyable on storefront
          </div>
        </div>

        <div
          style={{
            padding: '20px 24px',
            background: 'var(--paper)',
            borderRadius: 20,
            border: '1px solid var(--line)',
            boxShadow: '0 8px 24px -2px rgba(0, 0, 0, 0.35)',
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--subtle)', letterSpacing: '0.08em', marginBottom: 8 }}>
            Low Stock
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: lowStockCount > 0 ? '#FACC15' : 'var(--ink-heading)', letterSpacing: '-0.015em', lineHeight: 1.15, marginBottom: 4 }}>
            {lowStockCount} Products
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>
            Below reorder threshold
          </div>
        </div>

        <div
          style={{
            padding: '20px 24px',
            background: 'var(--paper)',
            borderRadius: 20,
            border: '1px solid var(--line)',
            boxShadow: '0 8px 24px -2px rgba(0, 0, 0, 0.35)',
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--subtle)', letterSpacing: '0.08em', marginBottom: 8 }}>
            Inventory Value
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--ink-heading)', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.015em', lineHeight: 1.15, marginBottom: 4 }}>
            ₹{totalCatalogValue.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>
            Warehouse equipment stock
          </div>
        </div>
      </div>

      {/* Custom Products Synced Notification Bar */}
      {customProducts.length > 0 && (
        <div
          style={{
            marginBottom: 20,
            padding: '12px 18px',
            background: 'rgba(234, 179, 8, 0.08)',
            border: '1px solid rgba(234, 179, 8, 0.3)',
            borderRadius: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            fontSize: 13,
            color: '#FACC15',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 15 }}>⚡</span>
            <span>
              <strong>{customProducts.length} custom product{customProducts.length > 1 ? 's' : ''}</strong> active & visible in your catalog.
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              type="button"
              onClick={handleCopyCustomJson}
              style={{
                padding: '6px 14px',
                borderRadius: 9999,
                background: copyFeedback ? '#22C55E' : 'rgba(255, 255, 255, 0.1)',
                color: copyFeedback ? '#000000' : '#FFFFFF',
                border: 'none',
                fontWeight: 600,
                fontSize: 12,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {copyFeedback ? '✓ Copied JSON!' : 'Copy Custom Products JSON'}
            </button>
          </div>
        </div>
      )}

      {/* Filter Tabs & Search Bar */}
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
            onClick={() => handleCategorySelect('')}
            style={{
              padding: '6px 14px',
              borderRadius: 9999,
              border: 'none',
              background: selectedCategory === '' ? 'var(--blood-crimson)' : 'rgba(255, 255, 255, 0.06)',
              color: selectedCategory === '' ? '#FFFFFF' : 'var(--muted)',
              boxShadow: selectedCategory === '' ? '0 2px 10px rgba(200, 16, 46, 0.4)' : 'none',
              fontSize: 12.5,
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
            }}
          >
            All ({totalSkus})
          </button>

          {categories.map((c) => {
            const isSelected = selectedCategory === c.slug;
            const count = categoryCounts[c.slug] || 0;
            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => handleCategorySelect(c.slug)}
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
                {c.name} {count > 0 ? `(${count})` : ''}
              </button>
            );
          })}
        </div>

        {/* Search & Status Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 260px', position: 'relative' }}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search equipment by title, brand, discipline..."
              style={{
                width: '100%',
                padding: '10px 16px',
                borderRadius: 12,
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--line)',
                color: 'var(--ink-heading)',
                fontSize: 13,
                outline: 'none',
              }}
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => handleStatusSelect(e.target.value)}
            style={{
              padding: '10px 16px',
              borderRadius: 12,
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--line)',
              color: 'var(--ink-heading)',
              fontSize: 13,
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="" style={{ background: '#111' }}>All Statuses</option>
            <option value="published" style={{ background: '#111' }}>Published</option>
            <option value="draft" style={{ background: '#111' }}>Draft</option>
            <option value="archived" style={{ background: '#111' }}>Archived</option>
          </select>
        </div>
      </div>

      {/* Clean Minimalist Products Table */}
      <div
        style={{
          background: 'var(--charcoal)',
          borderRadius: 20,
          border: '1px solid var(--line)',
          boxShadow: '0 8px 30px -4px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
        }}
      >
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <table style={{ margin: 0, width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <th style={{ padding: '14px 20px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--subtle)', background: 'transparent' }}>
                  Product
                </th>
                <th style={{ padding: '14px 20px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--subtle)', background: 'transparent' }}>
                  Discipline
                </th>
                <th style={{ padding: '14px 20px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--subtle)', background: 'transparent' }}>
                  Status
                </th>
                <th style={{ padding: '14px 20px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--subtle)', background: 'transparent' }}>
                  Price
                </th>
                <th style={{ padding: '14px 20px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--subtle)', background: 'transparent' }}>
                  Stock
                </th>
                <th style={{ textAlign: 'right', padding: '14px 20px', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--subtle)', background: 'transparent' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--muted)', fontSize: 14 }}>
                    No products found matching the selected filters.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const hasDiscount = p.compare_at_price && p.compare_at_price > p.price;
                  const isLow = p.stock_quantity <= p.low_stock_threshold;
                  const isOut = p.stock_quantity === 0;

                  return (
                    <tr
                      key={p.id}
                      style={{
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                        background: p.isCustom ? 'rgba(234, 179, 8, 0.02)' : 'transparent',
                      }}
                    >
                      {/* Product Name & Brand */}
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <Link
                                href={`/products/${p.id}/edit`}
                                style={{
                                  fontWeight: 700,
                                  fontSize: 14,
                                  color: 'var(--ink)',
                                  textDecoration: 'none',
                                }}
                              >
                                {p.name}
                              </Link>
                              {p.isCustom && (
                                <span
                                  style={{
                                    fontSize: 10,
                                    fontWeight: 700,
                                    padding: '2px 6px',
                                    borderRadius: 4,
                                    background: 'rgba(234, 179, 8, 0.2)',
                                    color: '#FACC15',
                                    letterSpacing: '0.04em',
                                  }}
                                >
                                  NEW UPLOAD
                                </span>
                              )}
                            </div>
                            <div style={{ fontSize: 12, color: 'var(--subtle)', marginTop: 2 }}>
                              {p.brand ? `${p.brand} · ` : ''}{p.category_slug || 'General'}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Discipline */}
                      <td style={{ padding: '16px 20px', fontSize: 13, color: 'var(--muted)', textTransform: 'capitalize' }}>
                        {p.category_slug || 'General'}
                      </td>

                      {/* Status Pill */}
                      <td style={{ padding: '16px 20px' }}>
                        <span
                          className={`badge ${p.status}`}
                          style={{
                            fontSize: 11,
                            padding: '3px 9px',
                            borderRadius: 9999,
                            fontWeight: 700,
                            textTransform: 'capitalize',
                          }}
                        >
                          {p.status}
                        </span>
                      </td>

                      {/* Price */}
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ fontWeight: 800, fontSize: 14, fontVariantNumeric: 'tabular-nums', color: 'var(--ink)' }}>
                          ₹{Number(p.price).toLocaleString('en-IN')}
                        </div>
                        {hasDiscount && (
                          <div style={{ fontSize: 11, color: 'var(--subtle)', textDecoration: 'line-through' }}>
                            ₹{Number(p.compare_at_price).toLocaleString('en-IN')}
                          </div>
                        )}
                      </td>

                      {/* Stock Quantity */}
                      <td style={{ padding: '16px 20px' }}>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: isOut ? 'var(--error)' : isLow ? 'var(--gold-ink)' : 'var(--ink)',
                          }}
                        >
                          {p.stock_quantity} in stock
                        </div>
                        {isLow && !isOut && (
                          <div style={{ fontSize: 11, color: 'var(--gold-ink)' }}>
                            Low threshold ({p.low_stock_threshold})
                          </div>
                        )}
                        {isOut && (
                          <div style={{ fontSize: 11, color: 'var(--error)' }}>
                            Out of stock
                          </div>
                        )}
                      </td>

                      {/* Actions */}
                      <td style={{ textAlign: 'right', padding: '16px 20px' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
                          <Link
                            href={`/products/${p.id}/edit`}
                            style={{
                              fontSize: 12.5,
                              fontWeight: 700,
                              color: 'var(--ink)',
                              textDecoration: 'none',
                            }}
                          >
                            Edit
                          </Link>

                          <DeleteProductButton
                            productId={p.id}
                            productName={p.name}
                            action={async () => {
                              await handleDeleteProduct(p.id);
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
