import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus, Check } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = '',
}) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [justAdded, setJustAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const isFavorited = isInWishlist(product.id);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -2.5;
    const rotateY = ((x - centerX) / centerX) * 2.5;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

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

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <div
      ref={cardRef}
      className={`product-card ${className}`}
      data-cursor="add"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        border: isHovered ? '1.5px solid var(--color-ink)' : '1px solid #E5E0D5',
        borderRadius: 'var(--radius-xs)',
        overflow: 'hidden',
        position: 'relative',
        transition: 'border-color 0.22s ease-out, box-shadow 0.22s ease-out, transform 0.15s ease-out',
        boxShadow: isHovered ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
        transform: tilt.rotateX !== 0 || tilt.rotateY !== 0
          ? `perspective(1000px) rotateX(${tilt.rotateX.toFixed(2)}deg) rotateY(${tilt.rotateY.toFixed(2)}deg) translateY(-2px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Product Image Canvas */}
      <Link
        to={`/product/${product.slug}`}
        style={{
          position: 'relative',
          display: 'block',
          width: '100%',
          aspectRatio: '1 / 1',
          overflow: 'hidden',
          backgroundColor: '#FAF8F5',
          textDecoration: 'none',
        }}
      >
        {/* Discount Badge */}
        {discountPercent && (
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              zIndex: 3,
              padding: '4px 8px',
              fontSize: '0.6875rem',
              fontWeight: 800,
              color: 'var(--color-brand-gold)',
              backgroundColor: 'var(--color-ink)',
              borderRadius: 'var(--radius-xs)',
              lineHeight: 1,
            }}
          >
            -{discountPercent}%
          </div>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: isFavorited ? 'var(--color-ink)' : 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isFavorited ? 'var(--color-plate-gold)' : 'var(--color-ink)',
            zIndex: 4,
            border: '1px solid rgba(0,0,0,0.08)',
            transition: 'transform 0.2s ease, background-color 0.2s ease',
          }}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={17}
            fill={isFavorited ? 'var(--color-plate-gold)' : 'none'}
          />
        </button>

        {/* Primary Image */}
        <img
          src={primaryImage}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80';
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            opacity: isHovered && hasSecondaryImage ? 0 : 1,
            transition: 'transform 0.4s ease, opacity 0.3s ease',
          }}
        />

        {/* Secondary Image for Desktop Hover */}
        {hasSecondaryImage && (
          <img
            src={secondaryImage}
            alt=""
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80';
            }}
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

        {/* Desktop Quick Add Slide-Up Overlay */}
        <div
          className="desktop-only"
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            right: '10px',
            zIndex: 3,
            transform: isHovered ? 'translateY(0)' : 'translateY(40px)',
            opacity: isHovered ? 1 : 0,
            transition: 'transform 0.22s ease, opacity 0.2s ease',
          }}
        >
          <button
            type="button"
            onClick={handleQuickAdd}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: justAdded ? 'var(--color-brand-gold)' : 'var(--color-ink)',
              color: justAdded ? 'var(--color-ink)' : 'var(--color-canvas-base)',
              border: 'none',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer',
              minHeight: '44px',
              borderRadius: 'var(--radius-xs)',
              transition: 'all 0.18s ease',
            }}
            onMouseEnter={(e) => {
              if (!justAdded) {
                e.currentTarget.style.backgroundColor = 'var(--color-brand-gold)';
                e.currentTarget.style.color = 'var(--color-ink)';
              }
            }}
            onMouseLeave={(e) => {
              if (!justAdded) {
                e.currentTarget.style.backgroundColor = 'var(--color-ink)';
                e.currentTarget.style.color = 'var(--color-canvas-base)';
              }
            }}
          >
            {justAdded ? (
              <>
                <Check size={16} color="var(--color-ink)" />
                <span>ADDED TO BAG</span>
              </>
            ) : (
              <>
                <Plus size={16} />
                <span>QUICK ADD</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Product Details Block */}
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
          {/* Category & Rating */}
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
                color: '#777777',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
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
                  color: 'var(--color-ink)',
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
              color: 'var(--color-ink)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textDecoration: 'none',
              marginBottom: '6px',
              minHeight: 'auto',
            }}
          >
            {product.name}
          </Link>
        </div>

        {/* Pricing & Mobile Quick Add Touch Target */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '10px',
            borderTop: '1px solid #F6F3EA',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span
              className="tabular-nums font-mono"
              style={{
                fontSize: '1.125rem',
                fontWeight: 800,
                color: 'var(--color-ink)',
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

          {/* Mobile Direct Add Button (>=44px touch target) */}
          <button
            type="button"
            onClick={handleQuickAdd}
            className="mobile-only"
            style={{
              padding: '8px 14px',
              backgroundColor: 'var(--color-ink)',
              color: justAdded ? 'var(--color-brand-gold)' : 'var(--color-canvas-base)',
              border: 'none',
              borderRadius: 'var(--radius-xs)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '44px',
              minWidth: '44px',
            }}
            aria-label={`Add ${product.name} to bag`}
          >
            {justAdded ? <Check size={16} color="var(--color-brand-gold)" /> : <Plus size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};
