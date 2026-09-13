import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus, Check, ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { GlassPanel } from '../ui/GlassPanel';

interface ProductCardProps {
  product: Product;
  className?: string;
  variant?: 'standard' | 'editorial';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = '',
  variant = 'standard',
}) => {
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
    setTimeout(() => setJustAdded(false), 1600);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const primaryImage = product.images[0] || 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80';
  const secondaryImage = product.images[1] || primaryImage;
  const hasSecondaryImage = product.images.length > 1;

  const fallbackImage = 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80';

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <div
      className={`brutalist-product-card ${className}`}
      data-cursor="add"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        border: isHovered ? '1.5px solid #111111' : '1px solid #E5E0D5',
        borderRadius: '2px', // Brutalist micro-corner
        overflow: 'hidden',
        position: 'relative',
        transition: 'all 0.25s cubic-bezier(0.2, 0, 0, 1)',
        boxShadow: isHovered ? '0 12px 30px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.02)',
      }}
    >
      {/* Product Image Canvas with Hover Swap */}
      <Link
        to={`/product/${product.slug}`}
        style={{
          position: 'relative',
          display: 'block',
          width: '100%',
          aspectRatio: '1 / 1',
          overflow: 'hidden',
          backgroundColor: '#F7F5EE',
          textDecoration: 'none',
        }}
      >
        {/* Discount Glass Badge */}
        {discountPercent && (
          <GlassPanel
            variant="light"
            blur="10px"
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              zIndex: 3,
              padding: '4px 8px',
              fontSize: '0.6875rem',
              fontWeight: 800,
              color: '#FF5A1F',
              border: '1px solid rgba(255, 90, 31, 0.3)',
            }}
          >
            -{discountPercent}%
          </GlassPanel>
        )}

        {/* Wishlist Button with Tactile Bounce */}
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
            backgroundColor: isFavorited ? '#111111' : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isFavorited ? '#C9A227' : '#111111',
            zIndex: 4,
            border: '1px solid rgba(0,0,0,0.06)',
            transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={16}
            fill={isFavorited ? '#C9A227' : 'none'}
            style={{
              transform: isFavorited ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.2s ease',
            }}
          />
        </button>

        {/* Primary Product Image */}
        <img
          src={primaryImage}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: isHovered ? 'scale(1.06)' : 'scale(1)',
            opacity: isHovered && hasSecondaryImage ? 0 : 1,
            transition: 'transform 0.5s cubic-bezier(0.2, 0, 0, 1), opacity 0.35s ease',
          }}
        />

        {/* Secondary Angle Image */}
        {hasSecondaryImage && (
          <img
            src={secondaryImage}
            alt=""
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = fallbackImage;
            }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: isHovered ? 'scale(1.06)' : 'scale(1)',
              opacity: isHovered ? 1 : 0,
              transition: 'transform 0.5s cubic-bezier(0.2, 0, 0, 1), opacity 0.35s ease',
            }}
          />
        )}

        {/* Quick Add Tactile Slide-Up Overlay */}
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
            transition: 'transform 0.25s cubic-bezier(0.2, 0, 0, 1), opacity 0.2s ease',
          }}
        >
          <button
            type="button"
            onClick={handleQuickAdd}
            style={{
              width: '100%',
              padding: '12px 16px',
              backgroundColor: justAdded ? '#111111' : '#111111',
              color: justAdded ? '#D7FF00' : '#FFFFFF',
              border: justAdded ? '1px solid #D7FF00' : '1px solid #111111',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!justAdded) {
                e.currentTarget.style.backgroundColor = '#2457FF';
                e.currentTarget.style.borderColor = '#2457FF';
              }
            }}
            onMouseLeave={(e) => {
              if (!justAdded) {
                e.currentTarget.style.backgroundColor = '#111111';
                e.currentTarget.style.borderColor = '#111111';
              }
            }}
          >
            {justAdded ? (
              <>
                <Check size={15} color="#D7FF00" />
                <span>ADDED TO BAG</span>
              </>
            ) : (
              <>
                <Plus size={15} />
                <span>QUICK ADD TO BAG</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Product Information Panel */}
      <div
        style={{
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
          borderTop: '1px solid #F0EEE6',
        }}
      >
        <div>
          {/* Category kicker & Meta */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '6px',
            }}
          >
            <span
              className="font-mono"
              style={{
                fontSize: '0.6875rem',
                color: '#888888',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontWeight: 700,
              }}
            >
              {product.categoryName || product.category}
            </span>

            {product.rating && (
              <span
                className="font-mono"
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  color: '#111111',
                }}
              >
                ★ {product.rating.toFixed(1)}
              </span>
            )}
          </div>

          {/* Product Title */}
          <Link
            to={`/product/${product.slug}`}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.9375rem',
              fontWeight: 700,
              lineHeight: 1.3,
              color: '#111111',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textDecoration: 'none',
              marginBottom: '6px',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#2457FF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#111111';
            }}
          >
            {product.name}
          </Link>

          {/* Short Specs preview if available */}
          {product.description && (
            <p
              style={{
                fontSize: '0.78125rem',
                color: '#666666',
                lineHeight: 1.4,
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                margin: '0 0 12px 0',
              }}
            >
              {product.description}
            </p>
          )}
        </div>

        {/* Price & Mobile Add Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '10px',
            borderTop: '1px solid #F5F3EC',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span
              className="tabular-nums font-mono"
              style={{
                fontSize: '1.125rem',
                fontWeight: 800,
                color: '#111111',
                letterSpacing: '-0.02em',
              }}
            >
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span
                className="tabular-nums font-mono"
                style={{
                  fontSize: '0.78125rem',
                  color: '#999999',
                  textDecoration: 'line-through',
                }}
              >
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Mobile Direct Quick Add Button */}
          <button
            type="button"
            onClick={handleQuickAdd}
            className="mobile-only"
            style={{
              padding: '8px 12px',
              backgroundColor: justAdded ? '#111111' : '#111111',
              color: justAdded ? '#D7FF00' : '#FFFFFF',
              border: 'none',
              borderRadius: '2px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label={`Add ${product.name} to bag`}
          >
            {justAdded ? <Check size={15} color="#D7FF00" /> : <Plus size={15} />}
          </button>
        </div>
      </div>
    </div>
  );
};
