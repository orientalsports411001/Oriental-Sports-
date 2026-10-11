import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Img } from '../ui/Img';

interface ProductCardProps {
  product: Product;
  className?: string;
  /** Hint for srcset selection — how wide the card renders. */
  sizes?: string;
}

/** Local studio shots ship a -sm.webp twin; build a srcset when one exists. */
const imageFor = (src: string, alt: string) => {
  if (src.startsWith('/images/') && src.endsWith('.webp')) {
    const small = src.replace(/\.webp$/, '-sm.webp');
    return { src, srcSet: `${small} 560w, ${src} 1024w`, alt };
  }
  if (src.includes('images.unsplash.com')) {
    const base = src.split('?')[0];
    const at = (w: number) => `${base}?auto=format&fit=crop&w=${w}&h=${w}&q=72`;
    return { src: at(800), srcSet: `${at(480)} 480w, ${at(800)} 800w, ${at(1100)} 1100w`, alt };
  }
  return { src, alt };
};

/**
 * Product card — flat and photography-first. The image sits on the studio
 * "stage" tone; details stack below with no card chrome. Add-to-bag is always
 * visible (no hover-only actions), wishlist is a 44px icon button.
 */
export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = '',
  sizes = '(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 80vw',
}) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [justAdded, setJustAdded] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(0);
  const saved = isInWishlist(product.id);

  const hasVariants = product.variants && product.variants.length > 0;
  const currentVariant = hasVariants ? product.variants![selectedVariantIndex] : null;

  const currentPrice =
    currentVariant?.price !== undefined
      ? currentVariant.price
      : product.price + (currentVariant?.priceDelta || 0);

  const currentOriginalPrice = currentVariant?.originalPrice || product.originalPrice;
  const discount =
    currentOriginalPrice && currentOriginalPrice > currentPrice
      ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)
      : null;

  const handleAdd = () => {
    addToCart(
      product,
      1,
      currentVariant?.name,
      product.sizes?.[selectedVariantIndex] || product.sizes?.[0]
    );
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <article className={`product-card ${className}`}>
      <Link to={`/product/${product.slug}`} className="product-card-media" tabIndex={-1} aria-hidden="true">
        <Img image={imageFor(product.images[0], '')} alt="" sizes={sizes} />
        {!product.inStock && <span className="badge badge-dark product-card-flag">Sold out</span>}
        {product.badge && product.inStock && (
          <span className="badge product-card-flag" style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
            {product.badge}
          </span>
        )}
      </Link>

      <button
        type="button"
        className={`product-card-save ${saved ? 'is-saved' : ''}`}
        onClick={() => toggleWishlist(product.id)}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
      >
        <Heart size={18} strokeWidth={1.8} fill={saved ? 'currentColor' : 'none'} />
      </button>

      <div className="product-card-body">
        <div className="product-card-meta-line" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <p className="label subtle">{[product.brand, product.categoryName].filter(Boolean).join(' · ')}</p>
          {product.quantityUnit && <span style={{ fontSize: '0.6875rem', color: 'var(--subtle)' }}>{product.quantityUnit}</span>}
        </div>

        <h3 className="product-card-title">
          <Link to={`/product/${product.slug}`}>{product.name}</Link>
        </h3>

        {/* Variant chips if multiple sizes or models exist */}
        {hasVariants && product.variants!.length > 1 && (
          <div
            className="product-card-variants"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', margin: '8px 0 10px' }}
            role="group"
            aria-label="Available sizes and variants"
          >
            {product.variants!.map((v, i) => (
              <button
                key={v.id}
                type="button"
                className={`active-pill ${selectedVariantIndex === i ? '' : 'inactive'}`}
                style={{
                  minHeight: '24px',
                  padding: '0 6px',
                  fontSize: '0.6875rem',
                  background: selectedVariantIndex === i ? 'var(--ink)' : 'var(--paper)',
                  color: selectedVariantIndex === i ? 'var(--paper)' : 'var(--ink)',
                  borderColor: selectedVariantIndex === i ? 'var(--ink)' : 'var(--line-strong)',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedVariantIndex(i);
                }}
                aria-pressed={selectedVariantIndex === i}
              >
                {v.name}
              </button>
            ))}
          </div>
        )}

        <div className="product-card-foot">
          <p className="product-card-price">
            {product.priceLabel && <span className="label subtle" style={{ marginRight: '6px' }}>{product.priceLabel}</span>}
            <span className="price">₹{currentPrice.toLocaleString('en-IN')}</span>
            {discount && (
              <>
                <s className="price-was">₹{currentOriginalPrice!.toLocaleString('en-IN')}</s>
                <span className="price-off">{discount}% off</span>
              </>
            )}
          </p>
          <button
            type="button"
            className={`product-card-add ${justAdded ? 'is-added' : ''}`}
            onClick={handleAdd}
            disabled={!product.inStock}
            aria-label={`Add ${product.name} to bag`}
          >
            <span aria-hidden="true">{justAdded ? 'Added' : '+ Add'}</span>
          </button>
        </div>
        <span className="visually-hidden" role="status">{justAdded ? `${product.name} added to bag` : ''}</span>
      </div>
    </article>
  );
};

export default ProductCard;
