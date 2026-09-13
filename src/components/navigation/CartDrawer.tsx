import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Check, ShoppingBag, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { STORE_INFO } from '../../data/storeInfo';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
  } = useCart();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 2000;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);

  const handleCheckout = () => {
    closeCart();
    navigate('/cart');
  };

  return (
    <>
      {/* Liquid Glass Backdrop */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          backgroundColor: 'rgba(8, 8, 8, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          transition: 'opacity 0.3s ease',
        }}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Slide-out Brutalist Glass Drawer */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '460px',
          zIndex: 9999,
          backgroundColor: '#0F0F0F',
          borderLeft: '2px solid #262626',
          boxShadow: '-16px 0 50px rgba(0, 0, 0, 0.8)',
          display: 'flex',
          flexDirection: 'column',
          color: '#FFFFFF',
          animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
        aria-label="Shopping Bag Drawer"
      >
        {/* Drawer Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
            borderBottom: '1px solid #222222',
            backgroundColor: '#141414',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShoppingBag size={18} color="#C9A227" />
              <h3
                className="font-display"
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  margin: 0,
                  letterSpacing: '-0.01em',
                }}
              >
                YOUR BAG ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h3>
            </div>
            <span className="font-mono" style={{ fontSize: '0.6875rem', color: '#888888', marginTop: '2px', display: 'block' }}>
              PUNE SPORTS HOUSE // CAMP DISPATCH
            </span>
          </div>

          <button
            type="button"
            onClick={closeCart}
            style={{
              padding: '6px',
              backgroundColor: '#222222',
              border: '1px solid #333333',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Close Bag"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Pune Delivery Progress Rail */}
        <div
          style={{
            backgroundColor: '#181818',
            padding: '14px 24px',
            borderBottom: '1px solid #222222',
          }}
        >
          {amountNeeded > 0 ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '0.75rem' }}>
                <span style={{ color: '#AAAAAA', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Truck size={14} color="#C9A227" />
                  <span>Free Delivery in Pune</span>
                </span>
                <span className="font-mono" style={{ fontWeight: 800, color: '#D7FF00' }}>
                  Add ₹{amountNeeded.toLocaleString('en-IN')}
                </span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '4px',
                  backgroundColor: '#2A2A2A',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${progressPercent}%`,
                    height: '100%',
                    backgroundColor: '#C9A227',
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#D7FF00', fontSize: '0.8125rem', fontWeight: 800 }}>
              <Check size={16} />
              <span>FREE EXPEDITE DISPATCH IN PUNE QUALIFIED!</span>
            </div>
          )}
        </div>

        {/* Bag Item List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 16px', margin: 'auto' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  backgroundColor: '#1E1E1E',
                  border: '1px solid #333333',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto',
                  color: '#666666',
                }}
              >
                <ShoppingBag size={24} />
              </div>
              <h4 style={{ fontSize: '1.125rem', color: '#FFFFFF', marginBottom: '8px' }}>
                Your sports bag is empty
              </h4>
              <p style={{ color: '#777777', fontSize: '0.875rem', marginBottom: '24px' }}>
                Explore tournament racquets, raw carbon paddles, and cricket willow.
              </p>
              <Link
                to="/shop"
                onClick={closeCart}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  backgroundColor: '#2457FF',
                  color: '#FFFFFF',
                  fontSize: '0.8125rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                <span>SHOP SPORTS CATALOG</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedVariant || ''}-${item.selectedSize || ''}`}
                style={{
                  display: 'flex',
                  gap: '14px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid #1E1E1E',
                }}
              >
                {/* Thumbnail */}
                <Link
                  to={`/product/${item.product.slug}`}
                  onClick={closeCart}
                  style={{
                    width: '76px',
                    height: '76px',
                    backgroundColor: '#1A1A1A',
                    border: '1px solid #2A2A2A',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Link>

                {/* Details */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                      <Link
                        to={`/product/${item.product.slug}`}
                        onClick={closeCart}
                        style={{
                          fontSize: '0.875rem',
                          fontWeight: 700,
                          color: '#FFFFFF',
                          lineHeight: 1.3,
                          textDecoration: 'none',
                        }}
                      >
                        {item.product.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id, item.selectedVariant, item.selectedSize)}
                        style={{ color: '#666666', background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}
                        aria-label="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    {(item.selectedVariant || item.selectedSize) && (
                      <div className="font-mono" style={{ fontSize: '0.6875rem', color: '#888888', marginTop: '4px' }}>
                        {item.selectedVariant} {item.selectedSize && `• ${item.selectedSize}`}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                    {/* Stepper */}
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        border: '1px solid #333333',
                        backgroundColor: '#161616',
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedVariant, item.selectedSize)}
                        style={{ padding: '4px 8px', color: '#DDDDDD', background: 'none', border: 'none', cursor: 'pointer' }}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="font-mono" style={{ padding: '0 8px', fontSize: '0.8125rem', fontWeight: 800, color: '#FFFFFF' }}>
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedVariant, item.selectedSize)}
                        style={{ padding: '4px 8px', color: '#DDDDDD', background: 'none', border: 'none', cursor: 'pointer' }}
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <div className="font-mono" style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#FFFFFF' }}>
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Subtotal & Checkout */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '20px 24px',
              backgroundColor: '#141414',
              borderTop: '1px solid #222222',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span className="font-mono" style={{ fontSize: '0.8125rem', color: '#888888', textTransform: 'uppercase' }}>
                ESTIMATED SUBTOTAL
              </span>
              <span className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FFFFFF' }}>
                ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#2457FF',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '0.8125rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1C44CC')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2457FF')}
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              onClick={closeCart}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: 'transparent',
                color: '#AAAAAA',
                border: '1px solid #333333',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              CONTINUE BROWSING
            </button>
          </div>
        )}
      </aside>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
};
