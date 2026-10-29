'use client';

import { useState } from 'react';
import Link from 'next/link';

export interface LowStockItem {
  id: string;
  name: string;
  slug?: string;
  stock_quantity: number;
  low_stock_threshold: number;
  status?: string;
}

interface LowStockCardProps {
  items: LowStockItem[];
}

export function LowStockCard({ items }: LowStockCardProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'critical' | 'warning'>('all');

  const criticalItems = items.filter((p) => p.stock_quantity === 0);
  const warningItems = items.filter((p) => p.stock_quantity > 0 && p.stock_quantity <= p.low_stock_threshold);

  const displayedItems =
    activeTab === 'critical'
      ? criticalItems
      : activeTab === 'warning'
      ? warningItems
      : items;

  return (
    <div
      className="admin-card"
      style={{
        boxShadow: '0 8px 30px -4px rgba(17, 17, 17, 0.04)',
        minWidth: 0,
      }}
    >
      {/* Header with Title and Prominent Catalog Filter Link */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 8,
          marginBottom: 16,
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: 14.5, fontWeight: 800, color: 'var(--ink-heading)' }}>
            Low Stock Warnings
          </h3>
          <p style={{ margin: '2px 0 0', fontSize: 11.5, color: 'var(--muted)' }}>
            Inventory at or below reorder threshold
          </p>
        </div>

        <Link
          href="/products?filter=low_stock"
          style={{
            fontSize: 11.5,
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: 9999,
            background: 'rgba(212, 248, 0, 0.12)',
            color: '#D4F800',
            border: '1px solid rgba(212, 248, 0, 0.3)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          Catalog Filter →
        </Link>
      </div>

      {/* Interactive Stock Filter Tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          marginBottom: 14,
          background: 'rgba(255, 255, 255, 0.04)',
          padding: 4,
          borderRadius: 12,
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          style={{
            flex: 1,
            padding: '6px 8px',
            borderRadius: 8,
            border: 'none',
            background: activeTab === 'all' ? 'var(--blood-crimson)' : 'transparent',
            color: activeTab === 'all' ? '#FFFFFF' : 'var(--muted)',
            fontSize: 11.5,
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            whiteSpace: 'nowrap',
          }}
        >
          All ({items.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('critical')}
          style={{
            flex: 1,
            padding: '6px 8px',
            borderRadius: 8,
            border: 'none',
            background: activeTab === 'critical' ? 'var(--blood-crimson)' : 'transparent',
            color: activeTab === 'critical' ? '#FFFFFF' : criticalItems.length > 0 ? 'var(--error)' : 'var(--muted)',
            fontSize: 11.5,
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            whiteSpace: 'nowrap',
          }}
        >
          Critical ({criticalItems.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('warning')}
          style={{
            flex: 1,
            padding: '6px 8px',
            borderRadius: 8,
            border: 'none',
            background: activeTab === 'warning' ? 'var(--blood-crimson)' : 'transparent',
            color: activeTab === 'warning' ? '#FFFFFF' : 'var(--muted)',
            fontSize: 11.5,
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            whiteSpace: 'nowrap',
          }}
        >
          Warning ({warningItems.length})
        </button>
      </div>

      {/* Items List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {displayedItems.length === 0 ? (
          <div
            style={{
              padding: '24px 12px',
              textAlign: 'center',
              color: 'var(--muted)',
              fontSize: 12.5,
              background: 'var(--stone)',
              borderRadius: 14,
            }}
          >
            {activeTab === 'critical'
              ? 'No zero-stock items currently! Stock is healthy.'
              : activeTab === 'warning'
              ? 'No items currently in low warning range.'
              : 'All products are above minimum inventory levels.'}
          </div>
        ) : (
          displayedItems.slice(0, 5).map((p) => {
            const isOut = p.stock_quantity === 0;

            return (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  background: 'var(--stone)',
                  borderRadius: 14,
                  gap: 12,
                }}
              >
                <div style={{ minWidth: 0, flex: 1 }}>
                  <Link
                    href={`/products/${p.id}/edit`}
                    style={{
                      fontSize: 12.5,
                      fontWeight: 700,
                      color: 'var(--ink)',
                      display: 'block',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      textDecoration: 'none',
                    }}
                  >
                    {p.name}
                  </Link>
                  <div style={{ fontSize: 10.5, color: 'var(--subtle)', display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                    <span>Threshold: {p.low_stock_threshold} units</span>
                    {isOut && (
                      <span
                        style={{
                          color: 'var(--error)',
                          fontWeight: 700,
                          fontSize: 9.5,
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                        }}
                      >
                        ● Out of Stock
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 900,
                      color: isOut ? 'var(--error)' : '#D4F800',
                      display: 'block',
                    }}
                  >
                    {p.stock_quantity} in stock
                  </span>
                  <Link
                    href={`/products/${p.id}/edit`}
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: 'var(--ink)',
                      textDecoration: 'underline',
                    }}
                  >
                    Restock →
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Prominent Footer Link */}
      {items.length > 0 && (
        <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <Link
            href="/products?filter=low_stock"
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: 'var(--ink)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>View all {items.length} items in catalog</span>
            <span style={{ color: '#D4F800' }}>→</span>
          </Link>
        </div>
      )}
    </div>
  );
}
