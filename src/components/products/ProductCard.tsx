import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Plus, Check } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [justAdded, setJustAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultVariant = product.variants?.[0]?.name;
    const defaultSize = product.sizes?.[0];
    addToCart(product, 1, defaultVariant, defaultSize);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const hasSecondaryImage = product.images.length > 1;

  return (
    <div
      className={`athletic-product-card ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--color-ivory-border)',
        borderRadius: '2px',
        overflow: 'hidden',
        position: 'relative',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: isHovered ? '0 12px 32px rgba(0,0,0,0.08)' : 'none',
        borderColor: isHovered ? 'var(--color-plate-gold)' : 'var(--color-ivory-border)',
      }}
    >
      {/* Product Image Area */}
      <Link
        to={`/product/${product.slug}`}
        style={{
          position: 'relative',
          display: 'block',
          width: '100%',
          aspectRatio: '1 / 1',
          overflow: 'hidden',
          backgroundColor: '#EDE8DC',
        }}
      >
        {/* Primary Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: isHovered ? 'scale(1.07)' : 'scale(1)',
            opacity: isHovered && hasSecondaryImage ? 0 : 1,
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
          }}
        />

        {/* Secondary Image for crossfade if available */}
        {hasSecondaryImage && (
          <img
            src={product.images[1]}
            alt=""
            loading="lazy"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: isHovered ? 'scale(1.07)' : 'scale(1)',
              opacity: isHovered ? 1 : 0,
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
            }}
          />
        )}

        {/* Badge */}
        {product.badge && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              zIndex: 3,
            }}
          >
            <span
              className="badge badge-gold"
              style={{
                fontFamily: 'var(--font-ui)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              }}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Favorite Wishlist Button */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isFavorited ? '#C9A227' : '#555555',
            zIndex: 3,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease',
            transform: isFavorited ? 'scale(1.1)' : 'scale(1)',
          }}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={16} fill={isFavorited ? '#C9A227' : 'none'} />
        </button>

        {/* Desktop Quick-Add Floating Overlay Action */}
        <div
          className="desktop-only"
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            right: '12px',
            zIndex: 3,
            transform: isHovered ? 'translateY(0)' : 'translateY(48px)',
            opacity: isHovered ? 1 : 0,
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease',
          }}
        >
          <button
            type="button"
            onClick={handleQuickAdd}
            className={`btn ${justAdded ? 'btn-gold' : 'btn-primary'}`}
            style={{ width: '100%', padding: '10px', fontSize: '0.8125rem' }}
          >
            {justAdded ? (
              <>
                <Check size={14} />
                <span>ADDED TO BAG</span>
              </>
            ) : (
              <>
                <Plus size={14} />
                <span>QUICK ADD TO BAG</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Card Content */}
      <div
        style={{
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <div>
          {/* Eyebrow */}
          <div
            style={{
              fontSize: '0.6875rem',
              fontFamily: 'var(--font-ui)',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-plate-gold)',
              marginBottom: '6px',
            }}
          >
            {product.categoryName} • {product.brand}
          </div>

          {/* Name */}
          <Link
            to={`/product/${product.slug}`}
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '1rem',
              lineHeight: 1.25,
              color: 'var(--color-ink)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              marginBottom: '8px',
              textDecoration: 'none',
              transform: isHovered ? 'translateY(-1px)' : 'none',
              transition: 'transform 0.2s ease',
            }}
          >
            {product.name}
          </Link>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', color: '#C9A227' }}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  fill={i < Math.floor(product.rating) ? '#C9A227' : 'none'}
                  stroke="#C9A227"
                />
              ))}
            </div>
            <span style={{ fontSize: '0.75rem', color: '#666', fontFamily: 'var(--font-ui)', fontWeight: 600 }}>
              {product.rating.toFixed(1)} ({product.reviewsCount})
            </span>
          </div>
        </div>

        {/* Pricing & Mobile Quick Add */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '12px',
            borderTop: '1px solid var(--color-ivory-border)',
            position: 'relative',
          }}
        >
          {/* Animated Gold Bottom Border on Hover */}
          <div
            style={{
              position: 'absolute',
              top: -1,
              left: 0,
              width: isHovered ? '100%' : '0%',
              height: '1px',
              backgroundColor: 'var(--color-plate-gold)',
              transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />

          <div>
            <div
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: '1.1875rem',
                color: 'var(--color-ink)',
                letterSpacing: '-0.02em',
              }}
            >
              ₹{product.price.toLocaleString('en-IN')}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div
                style={{
                  fontSize: '0.75rem',
                  color: '#888',
                  textDecoration: 'line-through',
                  fontFamily: 'var(--font-ui)',
                }}
              >
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </div>
            )}
          </div>

          {/* Mobile visible Add Button */}
          <div className="mobile-only-block">
            <button
              type="button"
              onClick={handleQuickAdd}
              className={`btn btn-sm ${justAdded ? 'btn-gold' : 'btn-primary'}`}
              style={{ padding: '8px 14px' }}
              aria-label={`Add ${product.name} to bag`}
            >
              {justAdded ? <Check size={14} /> : <Plus size={14} />}
              <span>{justAdded ? 'ADDED' : 'ADD'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
