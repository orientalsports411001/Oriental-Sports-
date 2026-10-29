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
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get('status') || '');
  const [showOnlyLowStock, setShowOnlyLowStock] = useState(searchParams.get('filter') === 'low_stock');

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
    // 1. Remove from client localStorage
    try {
      const raw = localStorage.getItem('os_custom_products');
      if (raw) {
        const list = JSON.parse(raw);
        const filtered = list.filter((p: any) => p.id !== id && p.slug !== id);
        localStorage.setItem('os_custom_products', JSON.stringify(filtered));
        loadCustomProducts();
      }
    } catch {}

    // 2. Register in deleted blacklist so it is excluded from view
    try {
      const delRaw = localStorage.getItem('os_deleted_products') || '[]';
      const delList = JSON.parse(delRaw);
      if (!delList.includes(id)) {
        delList.push(id);
        localStorage.setItem('os_deleted_products', JSON.stringify(delList));
      }
    } catch {}

    // 3. Broadcast deletion event
    try {
      const bc = new BroadcastChannel('oriental_sports_catalog');
      bc.postMessage({ type: 'PRODUCT_DELETED', id });
      bc.close();
    } catch {}

    // 4. Delete from live Supabase directly
    try {
      const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tvfzfvurqewgvnnhhhad.supabase.co';
      const supaKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_WAr2l8gZ0bvYJSY0x1murQ_OGSoDB50';
      if (supaUrl && supaKey) {
        fetch(`${supaUrl}/rest/v1/products?or=(id.eq.${id},slug.eq.${id})`, {
          method: 'DELETE',
          headers: {
            apikey: supaKey,
            Authorization: `Bearer ${supaKey}`,
          },
        }).catch(() => {});
      }
    } catch {}

    // 5. Call server action
    try {
      await deleteAction(id);
    } catch {}
  };

  const handleSetVisibilityAndStock = async (
    productId: string,
    targetStatus: 'published' | 'draft' | 'archived',
    newStock?: number
  ) => {
    if (togglingId) return;
    setTogglingId(productId);

    // 1. Optimistic update in customProducts state
    setCustomProducts((prev) => {
      const idx = prev.findIndex((p) => p.id === productId || p.slug === productId);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = {
          ...copy[idx],
          status: targetStatus,
          ...(newStock !== undefined ? { stock_quantity: newStock } : {}),
        };
        return copy;
      }
      const original = initialProducts.find((p) => p.id === productId || p.slug === productId);
      if (original) {
        return [
          {
            ...original,
            status: targetStatus,
            ...(newStock !== undefined ? { stock_quantity: newStock } : {}),
            isCustom: true,
          },
          ...prev,
        ];
      }
      return prev;
    });

    // 2. Persist to localStorage
    try {
      const raw = localStorage.getItem('os_custom_products');
      const list = raw ? JSON.parse(raw) : [];
      const idx = list.findIndex((p: any) => p.id === productId || p.slug === productId);
      if (idx >= 0) {
        list[idx].status = targetStatus;
        if (newStock !== undefined) list[idx].stock_quantity = newStock;
      } else {
        const orig = initialProducts.find((p) => p.id === productId || p.slug === productId);
        if (orig) {
          list.unshift({
            ...orig,
            status: targetStatus,
            ...(newStock !== undefined ? { stock_quantity: newStock } : {}),
          });
        }
      }
      localStorage.setItem('os_custom_products', JSON.stringify(list));
    } catch {}

    // 3. Broadcast update to other tabs & storefront
    try {
      const bc = new BroadcastChannel('oriental_sports_catalog');
      bc.postMessage({
        type: 'PRODUCT_STATUS_TOGGLED',
        productId,
        status: targetStatus,
        stockQuantity: newStock,
      });
      bc.close();
    } catch {}

    // 4. Send to server API
    try {
      await fetch('/api/products/toggle-visibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          status: targetStatus,
          stockQuantity: newStock,
        }),
      });
    } catch {}

    setTogglingId(null);
  };

  const handleToggleVisibility = async (productId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'published' ? 'draft' : 'published';
    await handleSetVisibilityAndStock(productId, nextStatus);
  };

  const handleRestockAndShow = async (productId: string) => {
    const promptVal = window.prompt('Enter restock quantity units to make product live:', '10');
    if (promptVal === null) return;
    const parsed = parseInt(promptVal, 10);
    const validQty = isNaN(parsed) || parsed <= 0 ? 10 : parsed;
    await handleSetVisibilityAndStock(productId, 'published', validQty);
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

                      {/* Actions with 1-Click Show/Hide and Restock */}
                      <td style={{ textAlign: 'right', padding: '16px 20px' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', flexWrap: 'wrap', gap: 8 }}>
                          {/* Out of Stock Quick Actions */}
                          {isOut && p.status === 'published' && (
                            <button
                              type="button"
                              onClick={() => handleSetVisibilityAndStock(p.id, 'draft')}
                              disabled={togglingId === p.id}
                              title="Hide out-of-stock item from customer storefront"
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                padding: '4px 9px',
                                borderRadius: 8,
                                background: 'rgba(239, 68, 68, 0.12)',
                                color: '#FF6B6B',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.15s ease',
                              }}
                            >
                              Hide Out of Stock
                            </button>
                          )}

                          {isOut && (p.status === 'draft' || p.status === 'archived') && (
                            <button
                              type="button"
                              onClick={() => handleRestockAndShow(p.id)}
                              disabled={togglingId === p.id}
                              title="Restock units and make live on storefront"
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                padding: '4px 9px',
                                borderRadius: 8,
                                background: 'rgba(212, 248, 0, 0.12)',
                                color: '#D4F800',
                                border: '1px solid rgba(212, 248, 0, 0.35)',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.15s ease',
                              }}
                            >
                              + Restock & Show
                            </button>
                          )}

                          {/* 1-Click Show / Hide Button */}
                          {p.status === 'published' ? (
                            <button
                              type="button"
                              onClick={() => handleToggleVisibility(p.id, p.status)}
                              disabled={togglingId === p.id}
                              title="Hide product from storefront"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 5,
                                padding: '5px 11px',
                                fontSize: 12,
                                fontWeight: 600,
                                borderRadius: 8,
                                background: 'rgba(255, 255, 255, 0.05)',
                                color: 'var(--muted)',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                              }}
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                <line x1="1" y1="1" x2="23" y2="23"></line>
                              </svg>
                              Hide
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleToggleVisibility(p.id, p.status)}
                              disabled={togglingId === p.id}
                              title="Publish and make visible on customer storefront"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 5,
                                padding: '5px 11px',
                                fontSize: 12,
                                fontWeight: 700,
                                borderRadius: 8,
                                background: 'rgba(34, 197, 94, 0.12)',
                                color: 'var(--success)',
                                border: '1px solid rgba(34, 197, 94, 0.3)',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                              }}
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                              </svg>
                              Show
                            </button>
                          )}

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

