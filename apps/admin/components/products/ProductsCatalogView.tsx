'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { DeleteProductButton } from './DeleteProductButton';
import { createClient } from '@/lib/supabase/client';

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

  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get('status') || '');
  const [showOnlyLowStock, setShowOnlyLowStock] = useState(searchParams.get('filter') === 'low_stock');

  // Keep internal state aligned with server props
  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  // Subscribe to Supabase Realtime channel oriental_sports_sync and postgres_changes on products
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel('oriental_sports_sync')
      .on('broadcast', { event: 'product_updated' }, (msg: any) => {
        const item = msg?.payload?.product;
        if (item) {
          const mapped: ProductItem = {
            id: item.id || `prod-os-${item.slug}`,
            name: item.name || 'Untitled Product',
            slug: item.slug || 'product',
            brand: item.brand || 'Oriental Sports',
            category_slug: item.category_slug || 'accessories',
            status: item.metadata?.status ?? item.status ?? 'published',
            price: Number(item.price) || 0,
            compare_at_price: item.compare_at_price ? Number(item.compare_at_price) : null,
            images: Array.isArray(item.images) ? item.images : [],
            stock_quantity: Number(item.metadata?.stock_quantity ?? item.stock_quantity ?? 50),
            low_stock_threshold: Number(item.metadata?.low_stock_threshold ?? item.low_stock_threshold ?? 5),
          };
          setProducts((prev) => {
            const idx = prev.findIndex((p) => p.id === mapped.id || p.slug === mapped.slug);
            if (idx >= 0) {
              const copy = [...prev];
              copy[idx] = { ...copy[idx], ...mapped };
              return copy;
            } else {
              return [mapped, ...prev];
            }
          });
        }
        router.refresh();
      })
      .on('broadcast', { event: 'product_deleted' }, (msg: any) => {
        const targetId = msg?.payload?.productId;
        if (targetId) {
          setProducts((prev) => prev.filter((p) => p.id !== targetId && p.slug !== targetId));
        }
        router.refresh();
      })
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        (payload: any) => {
          if (payload.eventType === 'DELETE') {
            const oldId = payload.old?.id;
            const oldSlug = payload.old?.slug;
            setProducts((prev) => prev.filter((p) => p.id !== oldId && p.slug !== oldSlug));
          } else if (payload.new) {
            const newItem = payload.new;
            const mappedItem: ProductItem = {
              id: newItem.id,
              name: newItem.name || 'Product',
              slug: newItem.slug,
              brand: newItem.brand || 'Oriental Sports',
              category_slug: newItem.category_slug || 'accessories',
              price: Number(newItem.price) || 0,
              compare_at_price: newItem.compare_at_price ? Number(newItem.compare_at_price) : null,
              images: Array.isArray(newItem.images) ? newItem.images : [],
              status: newItem.metadata?.status ?? (newItem.in_stock === false ? 'draft' : 'published'),
              stock_quantity: Number(newItem.metadata?.stock_quantity ?? 50),
              low_stock_threshold: Number(newItem.metadata?.low_stock_threshold ?? 5),
            };
            setProducts((prev) => {
              const idx = prev.findIndex((p) => p.id === mappedItem.id || p.slug === mappedItem.slug);
              if (idx >= 0) {
                const copy = [...prev];
                copy[idx] = { ...copy[idx], ...mappedItem };
                return copy;
              } else {
                return [mappedItem, ...prev];
              }
            });
          }
          router.refresh();
        }
      )
      .subscribe();

    // BroadcastChannel fallback for multi-tab sync
    let bc: BroadcastChannel | null = null;
    try {
      bc = new BroadcastChannel('oriental_sports_catalog');
      bc.onmessage = () => {
        router.refresh();
      };
    } catch {}

    return () => {
      supabase.removeChannel(channel);
      if (bc) bc.close();
    };
  }, [router]);

  const allMergedProducts = products;

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

    if (showOnlyLowStock) {
      list = list.filter((p) => p.stock_quantity <= p.low_stock_threshold);
    }
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
  }, [allMergedProducts, showOnlyLowStock, selectedCategory, selectedStatus, searchTerm]);

  // Update URL params smoothly
  const updateUrl = (category: string, status: string, q: string, lowStock: boolean) => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (status) params.set('status', status);
    if (q) params.set('q', q);
    if (lowStock) params.set('filter', 'low_stock');
    const newSearch = params.toString();
    const newUrl = `/products${newSearch ? `?${newSearch}` : ''}`;
    window.history.replaceState(null, '', newUrl);
  };

  const handleCategorySelect = (catSlug: string) => {
    const next = selectedCategory === catSlug ? '' : catSlug;
    setSelectedCategory(next);
    updateUrl(next, selectedStatus, searchTerm, showOnlyLowStock);
  };

  const handleStatusSelect = (stat: string) => {
    setSelectedStatus(stat);
    updateUrl(selectedCategory, stat, searchTerm, showOnlyLowStock);
  };

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    updateUrl(selectedCategory, selectedStatus, val, showOnlyLowStock);
  };

  const toggleLowStockFilter = () => {
    const next = !showOnlyLowStock;
    setShowOnlyLowStock(next);
    updateUrl(selectedCategory, selectedStatus, searchTerm, next);
  };

  const handleDeleteProduct = async (id: string) => {
    // 1. Optimistic removal from state
    setProducts((prev) => prev.filter((p) => p.id !== id && p.slug !== id));

    // 2. Clean up from localStorage if present
    try {
      localStorage.removeItem('os_custom_products');
    } catch {}

    // 3. Broadcast deletion event
    try {
      const bc = new BroadcastChannel('oriental_sports_catalog');
      bc.postMessage({ type: 'PRODUCT_DELETED', id });
      bc.close();
    } catch {}

    // 4. Call server action
    try {
      await deleteAction(id);
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
          onClick={toggleLowStockFilter}
          title="Click to toggle Low Stock filter"
          style={{
            padding: '20px 24px',
            background: showOnlyLowStock ? 'rgba(212, 248, 0, 0.08)' : 'var(--paper)',
            borderRadius: 20,
            border: showOnlyLowStock ? '1px solid #D4F800' : '1px solid var(--line)',
            boxShadow: showOnlyLowStock ? '0 0 20px rgba(212, 248, 0, 0.2)' : '0 8px 24px -2px rgba(0, 0, 0, 0.35)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: showOnlyLowStock ? '#D4F800' : 'var(--subtle)', letterSpacing: '0.08em' }}>
              Low Stock
            </div>
            {showOnlyLowStock && (
              <span style={{ fontSize: 10, fontWeight: 800, padding: '2px 7px', borderRadius: 9999, background: '#D4F800', color: '#111' }}>
                FILTER ACTIVE
              </span>
            )}
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: lowStockCount > 0 ? '#D4F800' : 'var(--ink-heading)', letterSpacing: '-0.015em', lineHeight: 1.15, marginBottom: 4 }}>
            {lowStockCount} Products
          </div>
          <div style={{ fontSize: 12, color: showOnlyLowStock ? 'var(--ink)' : 'var(--muted)' }}>
            {showOnlyLowStock ? 'Showing low stock items only (Click to clear)' : 'Below reorder threshold (Click to filter)'}
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

        {/* Search, Low Stock Pill & Status Filters */}
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

          {/* Dedicated Low Stock Filter Button/Pill */}
          <button
            type="button"
            onClick={toggleLowStockFilter}
            style={{
              padding: '10px 16px',
              borderRadius: 12,
              border: showOnlyLowStock ? '1px solid #D4F800' : '1px solid var(--line)',
              background: showOnlyLowStock ? '#D4F800' : 'rgba(255, 255, 255, 0.04)',
              color: showOnlyLowStock ? '#111111' : 'var(--ink)',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap',
              boxShadow: showOnlyLowStock ? '0 2px 14px rgba(212, 248, 0, 0.35)' : 'none',
            }}
          >
            <span>Low Stock ({lowStockCount})</span>
            {showOnlyLowStock && <span style={{ fontSize: 11, opacity: 0.8 }}>✕</span>}
          </button>

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
                      }}
                    >
                      {/* Product Name & Brand */}
                      <td style={{ padding: '16px 20px' }}>
                        <div>
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
                          <div style={{ fontSize: 12, color: 'var(--subtle)', marginTop: 2 }}>
                            {p.brand ? `${p.brand} · ` : ''}{p.category_slug || 'General'}
                          </div>
                        </div>
                      </td>

                      {/* Discipline */}
                      <td style={{ padding: '16px 20px', fontSize: 13, color: 'var(--muted)', textTransform: 'capitalize' }}>
                        {p.category_slug || 'General'}
                      </td>

                      {/* Status Badge */}
                      <td style={{ padding: '16px 20px' }}>
                        <span
                          className={`badge ${p.status}`}
                          style={{
                            fontSize: 11,
                            padding: '4px 10px',
                            borderRadius: 9999,
                            fontWeight: 800,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            background:
                              p.status === 'published'
                                ? 'rgba(34, 197, 94, 0.15)'
                                : p.status === 'draft'
                                ? 'rgba(255, 255, 255, 0.08)'
                                : 'rgba(239, 68, 68, 0.15)',
                            color:
                              p.status === 'published'
                                ? 'var(--success)'
                                : p.status === 'draft'
                                ? 'var(--muted)'
                                : 'var(--error)',
                            border:
                              p.status === 'published'
                                ? '1px solid rgba(34, 197, 94, 0.3)'
                                : p.status === 'draft'
                                ? '1px solid rgba(255, 255, 255, 0.14)'
                                : '1px solid rgba(239, 68, 68, 0.3)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 5,
                          }}
                        >
                          {p.status === 'published' ? '● Published' : p.status === 'draft' ? '○ Hidden' : 'Archived'}
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
                            color: isOut ? 'var(--error)' : isLow ? '#D4F800' : 'var(--ink)',
                          }}
                        >
                          {p.stock_quantity} in stock
                        </div>
                        {isLow && !isOut && (
                          <div style={{ fontSize: 11, color: '#D4F800', fontWeight: 600 }}>
                            Low threshold ({p.low_stock_threshold})
                          </div>
                        )}
                        {isOut && (
                          <div style={{ fontSize: 11, color: 'var(--error)', fontWeight: 700 }}>
                            Out of stock
                          </div>
                        )}
                      </td>

                      {/* Actions */}
                      <td style={{ textAlign: 'right', padding: '16px 20px' }}>
                        <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'flex-end', flexWrap: 'wrap', gap: 8 }}>
                          <Link
                            href={`/products/${p.id}/edit`}
                            style={{
                              fontSize: 12,
                              fontWeight: 700,
                              color: 'var(--ink)',
                              textDecoration: 'none',
                              padding: '5px 10px',
                              borderRadius: 8,
                              background: 'rgba(255, 255, 255, 0.04)',
                              border: '1px solid var(--line)',
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

