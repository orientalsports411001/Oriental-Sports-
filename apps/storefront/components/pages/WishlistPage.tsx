'use client';

import React, { useState } from 'react';
import { Link } from '@/lib/router-shim';
import {
  Heart,
  ShoppingBag,
  Trash2,
  X,
  Check,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { PRODUCTS } from '@/data/products';
import { Img } from '@/components/ui/Img';
import { ProductCard } from '@/components/products/ProductCard';

const imageFor = (src: string, alt: string) => {
  if (src.startsWith('/images/') && src.endsWith('.webp')) {
    const small = src.replace(/\.webp$/, '-sm.webp');
    return { src, srcSet: `${small} 560w, ${src} 1024w`, alt };
  }
  if (src.includes('images.unsplash.com')) {
    const base = src.split('?')[0];
    const at = (w: number) => `${base}?auto=format&fit=crop&w=${w}&h=${w}&q=72`;
    return { src, srcSet: `${at(480)} 480w, ${at(800)} 800w, ${at(1100)} 1100w`, alt };
  }
  return { src, alt };
};

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart, openCart } = useCart();
  const { isAuthenticated, openAuthModal, signInWithGoogle } = useAuth();
  const [movingId, setMovingId] = useState<string | null>(null);
  const [moveAllStatus, setMoveAllStatus] = useState<string | null>(null);

  // Find products that match wishlist IDs or slugs
  const wishlistedProducts = React.useMemo(() => {
    return PRODUCTS.filter((p) => wishlist.includes(p.id) || wishlist.includes(p.slug));
  }, [wishlist]);

  // Recommended products for empty state or bottom drawer
  const recommendedProducts = React.useMemo(() => {
    return PRODUCTS.filter((p) => !wishlist.includes(p.id) && !wishlist.includes(p.slug)).slice(0, 4);
  }, [wishlist]);

  // Handle move single item to bag
  const handleMoveToBag = (product: (typeof PRODUCTS)[0]) => {
    addToCart(product, 1);
    setMovingId(product.id);
    setTimeout(() => {
      setMovingId(null);
      openCart();
    }, 600);
  };

  // Handle Move All to Bag
  const handleMoveAllToBag = () => {
    wishlistedProducts.forEach((product) => {
      if (product.inStock) {
        addToCart(product, 1);
      }
    });
    setMoveAllStatus('Added to Bag!');
    setTimeout(() => {
      setMoveAllStatus(null);
      openCart();
    }, 800);
  };

  // Clear all wishlist
  const handleClearAll = () => {
    wishlist.forEach((id) => toggleWishlist(id));
  };

  return (
    <div className="wishlist-page-container" style={{ minHeight: '80vh', backgroundColor: '#050505', color: '#FFFFFF', paddingBottom: '80px' }}>
      {/* Top Breadcrumb & Header Section */}
      <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', backgroundColor: '#0B0B0B', padding: '28px 0' }}>
        <div className="container">
          <nav aria-label="Breadcrumb" style={{ marginBottom: '16px' }}>
            <ol style={{ display: 'flex', gap: '8px', alignItems: 'center', margin: 0, padding: 0, listStyle: 'none', fontSize: '0.8125rem', color: '#9CA3AF' }}>
              <li>
                <Link href="/" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Home</Link>
              </li>
              <li>/</li>
              <li style={{ color: '#FFFFFF', fontWeight: 600 }}>My Wishlist</li>
            </ol>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(200, 16, 46, 0.15)',
                  border: '1px solid rgba(200, 16, 46, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#C8102E',
                }}
              >
                <Heart size={20} fill="#C8102E" />
              </div>
              <div>
                <h1 className="font-display" style={{ margin: 0, fontSize: '1.75rem', letterSpacing: '-0.02em', color: '#FFFFFF' }}>
                  MY WISHLIST
                </h1>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#9CA3AF' }}>
                  {wishlistedProducts.length === 1
                    ? '1 sports item saved'
                    : `${wishlistedProducts.length} sports items saved`}
                </p>
              </div>
            </div>

            {/* Quick Bulk Actions when wishlist has items */}
            {wishlistedProducts.length > 0 && (
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={handleClearAll}
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#9CA3AF',
                    padding: '8px 14px',
                    borderRadius: '4px',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#F87171';
                    e.currentTarget.style.borderColor = 'rgba(248, 113, 113, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#9CA3AF';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  }}
                >
                  <Trash2 size={14} />
                  <span>Clear All</span>
                </button>

                <button
                  type="button"
                  onClick={handleMoveAllToBag}
                  style={{
                    backgroundColor: '#C8102E',
                    border: 'none',
                    color: '#FFFFFF',
                    padding: '8px 18px',
                    borderRadius: '4px',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(200, 16, 46, 0.3)',
                  }}
                >
                  {moveAllStatus ? <Check size={15} /> : <ShoppingBag size={15} />}
                  <span>{moveAllStatus || 'MOVE ALL TO BAG'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '28px' }}>
        {/* Guest User Sync Banner */}
        {!isAuthenticated && (
          <div
            style={{
              backgroundColor: '#121212',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              padding: '14px 20px',
              marginBottom: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9CA3AF',
                }}
              >
                <ShieldCheck size={18} color="#C8102E" />
              </div>
              <div>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#FFFFFF', display: 'block' }}>
                  Sync your wishlist across devices
                </span>
                <span style={{ fontSize: '0.8125rem', color: '#9CA3AF' }}>
                  Sign in with your mobile number to get instant stock alerts and access your gear anywhere.
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => signInWithGoogle()}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: 'none',
                  color: '#1F2937',
                  padding: '8px 14px',
                  borderRadius: '4px',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.14z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>Continue with Google</span>
              </button>
              <button
                type="button"
                onClick={() => openAuthModal('phone')}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  padding: '8px 14px',
                  borderRadius: '4px',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Sign In with Mobile
              </button>
            </div>
          </div>
        )}

        {/* ================= STATE 1: WISHLIST HAS PRODUCTS ================= */}
        {wishlistedProducts.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '20px',
              marginBottom: '50px',
            }}
          >
            {wishlistedProducts.map((product) => {
              const basePrice = product.price;
              const originalPrice = product.originalPrice || (basePrice > 1000 ? Math.round(basePrice * 1.18) : undefined);
              const discount = originalPrice && originalPrice > basePrice
                ? Math.round(((originalPrice - basePrice) / originalPrice) * 100)
                : null;
              const isMoving = movingId === product.id;
              const brandName = product.brand || product.categoryName || 'Oriental Sports';

              return (
                <div
                  key={product.id}
                  style={{
                    backgroundColor: '#121212',
                    borderRadius: '6px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    transition: 'transform 0.2s ease, border-color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Top Remove Control */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={`Remove ${product.name} from wishlist`}
                    title="Remove from wishlist"
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      zIndex: 2,
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0, 0, 0, 0.65)',
                      backdropFilter: 'blur(4px)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s ease, color 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(200, 16, 46, 0.9)';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.65)';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                  >
                    <X size={16} />
                  </button>

                  {/* Top Badges */}
                  <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 2 }}>
                    {!product.inStock ? (
                      <span
                        style={{
                          backgroundColor: 'rgba(239, 68, 68, 0.9)',
                          color: '#FFFFFF',
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '3px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                        }}
                      >
                        Out of Stock
                      </span>
                    ) : discount && discount >= 15 ? (
                      <span
                        style={{
                          backgroundColor: '#C8102E',
                          color: '#FFFFFF',
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '3px',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {discount}% OFF
                      </span>
                    ) : null}
                  </div>

                  {/* Product Media */}
                  <Link
                    href={`/product/${product.slug}`}
                    style={{
                      display: 'block',
                      aspectRatio: '1 / 1',
                      backgroundColor: '#181818',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <Img
                      image={imageFor(product.images[0], product.name)}
                      alt={product.name}
                      sizes="(min-width: 1440px) 25vw, (min-width: 1024px) 33vw, 50vw"
                    />
                  </Link>

                  {/* Product Details */}
                  <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          color: '#9CA3AF',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {brandName}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.75rem', color: '#F59E0B' }}>
                        <span>★</span>
                        <span style={{ color: '#D1D5DB', fontWeight: 600 }}>{product.rating || 4.6}</span>
                      </div>
                    </div>

                    <h2
                      style={{
                        margin: '0 0 10px',
                        fontSize: '0.9375rem',
                        fontWeight: 600,
                        lineHeight: '1.35',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        minHeight: '2.7em',
                      }}
                    >
                      <Link
                        href={`/product/${product.slug}`}
                        style={{ color: '#FFFFFF', textDecoration: 'none' }}
                      >
                        {product.name}
                      </Link>
                    </h2>

                    {/* Price Block */}
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '14px', marginTop: 'auto' }}>
                      <span style={{ fontSize: '1.125rem', fontWeight: 800, color: '#FFFFFF' }}>
                        ₹{basePrice.toLocaleString('en-IN')}
                      </span>
                      {originalPrice && originalPrice > basePrice && (
                        <s style={{ fontSize: '0.8125rem', color: '#6B7280' }}>
                          ₹{originalPrice.toLocaleString('en-IN')}
                        </s>
                      )}
                      {discount && (
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34D399' }}>
                          ({discount}% OFF)
                        </span>
                      )}
                    </div>

                    {/* Direct Move to Bag Action */}
                    <button
                      type="button"
                      disabled={!product.inStock || isMoving}
                      onClick={() => handleMoveToBag(product)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '4px',
                        backgroundColor: isMoving ? '#10B981' : product.inStock ? '#C8102E' : '#262626',
                        color: product.inStock ? '#FFFFFF' : '#6B7280',
                        border: 'none',
                        fontWeight: 700,
                        fontSize: '0.8125rem',
                        cursor: product.inStock ? 'pointer' : 'not-allowed',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        letterSpacing: '0.03em',
                        transition: 'background-color 0.2s ease',
                      }}
                    >
                      {isMoving ? (
                        <>
                          <Check size={16} />
                          <span>ADDED TO BAG</span>
                        </>
                      ) : product.inStock ? (
                        <>
                          <ShoppingBag size={16} />
                          <span>MOVE TO BAG</span>
                        </>
                      ) : (
                        <span>OUT OF STOCK</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ================= STATE 2: EMPTY WISHLIST ================= */
          <div
            style={{
              backgroundColor: '#121212',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              padding: '60px 24px',
              textAlign: 'center',
              maxWidth: '680px',
              margin: '0 auto 60px',
            }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: 'rgba(200, 16, 46, 0.1)',
                border: '1px solid rgba(200, 16, 46, 0.25)',
                color: '#C8102E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <Heart size={34} strokeWidth={1.75} />
            </div>

            <h2 className="font-display" style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#FFFFFF' }}>
              YOUR WISHLIST IS EMPTY
            </h2>
            <p style={{ fontSize: '0.9375rem', color: '#9CA3AF', maxWidth: '440px', margin: '0 auto 28px', lineHeight: '1.5' }}>
              Explore our commercial catalog and tap the heart on any sports gear, racket, or footwear to save it here for later.
            </p>

            <Link
              href="/shop"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#C8102E',
                color: '#FFFFFF',
                padding: '12px 28px',
                borderRadius: '4px',
                fontWeight: 700,
                fontSize: '0.875rem',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                boxShadow: '0 4px 14px rgba(200, 16, 46, 0.35)',
              }}
            >
              <span>EXPLORE SPORTS GEAR</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {/* ================= TRENDING GEAR IN PUNE ================= */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Zap size={16} color="#C8102E" />
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#C8102E', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  POPULAR IN PUNE
                </span>
              </div>
              <h3 className="font-display" style={{ margin: 0, fontSize: '1.375rem', color: '#FFFFFF' }}>
                RECOMMENDED SPORTS EQUIPMENT
              </h3>
            </div>

            <Link
              href="/shop"
              style={{
                fontSize: '0.8125rem',
                fontWeight: 700,
                color: '#C8102E',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span>VIEW FULL STORE</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '20px',
            }}
          >
            {recommendedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
