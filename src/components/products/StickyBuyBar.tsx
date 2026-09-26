import React from 'react';
import { Product } from '../../types';

interface StickyBuyBarProps {
  product: Product;
  onAddToCart: () => void;
  onBuyNow: () => void;
  inStock: boolean;
}

/** Phones only: keeps price and the two purchase actions in thumb reach. */
export const StickyBuyBar: React.FC<StickyBuyBarProps> = ({ product, onAddToCart, onBuyNow, inStock }) => (
  <div className="sticky-buy" role="region" aria-label="Purchase">
    <div>
      <div className="sticky-buy-price">₹{product.price.toLocaleString('en-IN')}</div>
      <div className="sticky-buy-name">{product.name}</div>
    </div>
    <div className="sticky-buy-actions">
      <button type="button" onClick={onAddToCart} disabled={!inStock} className="btn btn-sm btn-outline">
        Add to bag
      </button>
      <button type="button" onClick={onBuyNow} disabled={!inStock} className="btn btn-sm btn-primary">
        Buy now
      </button>
    </div>
  </div>
);

export default StickyBuyBar;
