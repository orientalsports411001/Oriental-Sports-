import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Star, Check, Plus } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Img } from '../ui/Img';
import { isCloudinaryUrl, getOptimizedImageUrl, generateSrcSet } from '../../lib/cloudinary';

interface ProductCardProps {
  product: Product;
  className?: string;
  /** Hint for srcset selection — how wide the card renders. */
  sizes?: string;
}

/** Local studio shots ship a -sm.webp twin; Cloudinary shots get auto-scaled srcset. */
const imageFor = (src: string, alt: string) => {
  if (isCloudinaryUrl(src)) {
    return {
      src: getOptimizedImageUrl(src, { width: 800 }),
      srcSet: generateSrcSet(src),
      alt,
    };
  }
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

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = '',
  sizes = '(min-width: 1440px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 30vw, 46vw',
}) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  const [justAdded, setJustAdded] = useState(false);
  const saved = isInWishlist(product.id);

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) {
      return;
    }
    navigate(`/product/${product.slug}`);
  };

  const basePrice = product.price;
  const originalPrice = product.originalPrice || (basePrice > 1000 ? Math.round(basePrice * 1.18) : undefined);
  const discount =
    originalPrice && originalPrice > basePrice
      ? Math.round(((originalPrice - basePrice) / originalPrice) * 100)
      : null;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    window.setTimeout(() => {
      setJustAdded(false);
    }, 1800);
  };

  // Clean size summary for resting card (subtle, clean, not bulky buttons)
  const sizeSummary = React.useMemo(() => {
    if (product.sizes && product.sizes.length > 0) {
      if (product.sizes.length <= 4) {
        return product.sizes.map((s) => s.replace(/^Size\s*/i, '')).join(', ');
      }
      return `${product.sizes[0].replace(/^Size\s*/i, '')} - ${product.sizes[product.sizes.length - 1].replace(/^Size\s*/i, '')} (${product.sizes.length} sizes)`;
    }
    if (product.variants && product.variants.length > 1) {
      if (product.variants.length <= 4) {
        return product.variants.map((v) => v.name.replace(/^Size\s*/i, '')).join(', ');
      }
      return `${product.variants.length} options`;
    }
    return null;
  }, [product.sizes, product.variants]);

  // Clean brand and product title
  const brandName = product.brand || product.categoryName || 'Oriental Sports';
  let displayName = product.name;
  if (product.brand && displayName.toLowerCase().startsWith(product.brand.toLowerCase())) {
    displayName = displayName.slice(product.brand.length).trim().replace(/^[-–·:]\s*/, '');
  }

  const rating = product.rating || 4.6;
  const reviewsCount = product.reviewsCount || Math.floor((product.price % 37) + 14);

  return (
    <article
      className={`ecom-card ${className}`}
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      {/* Media & Interactive Quick Actions */}
      <div className="ecom-card-media-wrap">
        <Link to={`/product/${product.slug}`} className="ecom-card-media" tabIndex={-1} aria-hidden="true">
          <Img image={imageFor(product.images[0], product.name)} alt={product.name} sizes={sizes} />
        </Link>

        {/* Top Badges */}
        <div className="ecom-card-badges-top">
          {!product.inStock ? (
            <span className="ecom-badge ecom-badge-soldout">Sold out</span>
          ) : product.badge ? (
            <span className="ecom-badge ecom-badge-accent">{product.badge}</span>
          ) : discount && discount >= 15 ? (
            <span className="ecom-badge ecom-badge-deal">{discount}% OFF</span>
          ) : (
            <span />
          )}

          {/* Wishlist Heart */}
          <button
            type="button"
            className={`ecom-card-wishlist ${saved ? 'is-saved' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            aria-pressed={saved}
            aria-label={saved ? `Remove from wishlist` : `Add to wishlist`}
          >
            <Heart size={16} strokeWidth={2} fill={saved ? '#C8102E' : 'none'} color={saved ? '#C8102E' : '#FFFFFF'} />
          </button>
        </div>

        {/* Rating Badge (Myntra / Flipkart style) */}
        <div className="ecom-card-rating-badge">
          <span>{rating.toFixed(1)}</span>
          <Star size={10} fill="#F59E0B" color="#F59E0B" />
          <span className="ecom-rating-sep">|</span>
          <span className="ecom-rating-count">{reviewsCount}</span>
        </div>
      </div>

      {/* Card Info Section */}
      <div className="ecom-card-info">
        <div className="ecom-card-header-row">
          <span className="ecom-card-brand">{brandName}</span>
          {product.quantityUnit && <span className="ecom-card-unit">{product.quantityUnit}</span>}
        </div>

        <h3 className="ecom-card-title">
          <Link to={`/product/${product.slug}`} title={product.name}>
            {displayName}
          </Link>
        </h3>

        {/* Size summary hint (subtle text, never bulky buttons) */}
        {sizeSummary && <div className="ecom-card-sizes-hint">Sizes: {sizeSummary}</div>}

        {/* Pricing Row + Direct Add Action */}
        <div className="ecom-card-bottom-row">
          <div className="ecom-card-pricing">
            <span className="ecom-price-current">₹{basePrice.toLocaleString('en-IN')}</span>
            {originalPrice && originalPrice > basePrice && (
              <>
                <s className="ecom-price-original">₹{originalPrice.toLocaleString('en-IN')}</s>
                <span className="ecom-price-discount">{discount}% off</span>
              </>
            )}
          </div>

          {/* Clean E-Commerce Add Button */}
          <button
            type="button"
            className={`ecom-card-add-btn ${justAdded ? 'is-added' : ''}`}
            onClick={handleAdd}
            disabled={!product.inStock}
            aria-label={justAdded ? 'Added to cart' : 'Add to cart'}
          >
            {justAdded ? <Check size={13} strokeWidth={2.5} /> : <Plus size={13} strokeWidth={2.5} />}
            <span>{justAdded ? 'Added' : 'Add'}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
