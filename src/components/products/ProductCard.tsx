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
      className={`product-card ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        border: isHovered
          ? '2px solid var(--color-electric-blue)'
          : '1px solid rgba(23, 23, 23, 0.1)',
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        transition: 'all 0.25s ease',
        boxShadow: isHovered
          ? '0 12px 32px rgba(36, 87, 255, 0.12)'
          : '0 2px 10px rgba(0, 0, 0, 0.04)',
        transform: isHovered ? 'translateY(-3px)' : 'none',
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
          backgroundColor: '#F5F3EF',
          textDecoration: 'none',
        }}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            opacity: isHovered && hasSecondaryImage ? 0 : 1,
            transition: 'transform 0.4s ease, opacity 0.3s ease',
          }}
        />

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
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              opacity: isHovered ? 1 : 0,
              transition: 'transform 0.4s ease, opacity 0.3s ease',
            }}
          />
        )}

        {/* Badge */}
        {product.badge && (
          <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 3 }}>
            <span
              style={{
                backgroundColor: 'var(--color-lime)',
                color: '#171717',
                padding: '4px 10px',
                borderRadius: '9999px',
                fontSize: '0.6875rem',
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                letterSpacing: '0.04em',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
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
            color: isFavorited ? 'var(--color-tangerine)' : '#555555',
            zIndex: 3,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            transition: 'transform 0.2s ease',
            transform: isFavorited ? 'scale(1.1)' : 'scale(1)',
            border: 'none',
          }}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={16} fill={isFavorited ? 'var(--color-tangerine)' : 'none'} />
        </button>

        {/* Desktop Quick-Add Hover Overlay */}
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
            transition: 'transform 0.25s ease, opacity 0.2s ease',
          }}
        >
          <button
            type="button"
            onClick={handleQuickAdd}
            className={`btn ${justAdded ? 'btn-lime' : 'btn-blue'}`}
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
                <span>QUICK ADD</span>
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
          {/* Category Tag */}
          <div
            style={{
              fontSize: '0.6875rem',
              color: 'var(--color-electric-blue)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              fontWeight: 800,
              fontFamily: 'var(--font-ui)',
              marginBottom: '4px',
            }}
          >
            {product.category}
          </div>

          {/* Title */}
          <Link
            to={`/product/${product.slug}`}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.0625rem',
              fontWeight: 700,
              color: 'var(--color-text-dark)',
              textDecoration: 'none',
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              marginBottom: '8px',
            }}
          >
            {product.name}
          </Link>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', color: 'var(--color-tangerine)' }}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  fill={i < Math.floor(product.rating) ? 'var(--color-tangerine)' : 'none'}
                  stroke="var(--color-tangerine)"
                />
              ))}
            </div>
            <span style={{ fontSize: '0.75rem', color: '#666', fontFamily: 'var(--font-ui)', fontWeight: 600 }}>
              {product.rating.toFixed(1)}
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
            borderTop: '1px solid rgba(23, 23, 23, 0.08)',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: '1.1875rem',
                color: 'var(--color-text-dark)',
                letterSpacing: '-0.02em',
                fontVariantNumeric: 'tabular-nums',
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

          {/* Mobile visible Quick Add Button */}
          <div className="mobile-only-block">
            <button
              type="button"
              onClick={handleQuickAdd}
              className={`btn btn-sm ${justAdded ? 'btn-lime' : 'btn-blue'}`}
              style={{ padding: '7px 14px', borderRadius: '9999px' }}
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
