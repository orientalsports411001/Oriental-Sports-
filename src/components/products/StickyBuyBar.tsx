import React from 'react';
import { ShoppingBag, MessageSquare } from 'lucide-react';
import { Product } from '../../types';

interface StickyBuyBarProps {
  product: Product;
  onAddToCart: () => void;
  onBuyNow: () => void;
  inStock: boolean;
}

export const StickyBuyBar: React.FC<StickyBuyBarProps> = ({
  product,
  onAddToCart,
  onBuyNow,
  inStock,
}) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'var(--bottom-nav-height)',
        left: 0,
        right: 0,
        backgroundColor: 'rgba(17, 17, 17, 0.96)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(201, 162, 39, 0.3)',
        padding: '12px 16px',
        zIndex: 55,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
      }}
      className="mobile-only-sticky-bar"
    >
      <div>
        <div style={{ fontSize: '0.6875rem', color: '#aaaaaa', textTransform: 'uppercase' }}>
          {product.brand}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '1.125rem',
            color: 'var(--color-plate-gold)',
          }}
        >
          ₹{product.price.toLocaleString('en-IN')}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', flex: 1, maxWidth: '280px' }}>
        <button
          type="button"
          onClick={onAddToCart}
          disabled={!inStock}
          className="btn btn-sm btn-outline-gold"
          style={{ flex: 1, padding: '10px 8px', fontSize: '0.75rem' }}
        >
          <ShoppingBag size={14} />
          <span>ADD</span>
        </button>

        <button
          type="button"
          onClick={onBuyNow}
          disabled={!inStock}
          className="btn btn-sm btn-gold"
          style={{ flex: 1.2, padding: '10px 8px', fontSize: '0.75rem' }}
        >
          <span>BUY NOW</span>
        </button>
      </div>
    </div>
  );
};
