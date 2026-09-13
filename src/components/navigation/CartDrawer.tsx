import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Check } from 'lucide-react';
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
    shipping,
    discount,
    total,
    promoCode,
    applyPromoCode,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; success: boolean } | null>(null);
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode) return;
    const res = applyPromoCode(inputCode);
    setPromoMessage({ text: res.message, success: res.success });
  };

  const freeShippingThreshold = 2000;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);

  const generateWhatsAppOrderUrl = () => {
    const lines = cart.map(
      (item, idx) =>
        `${idx + 1}. ${item.product.name} ${item.selectedVariant ? `(${item.selectedVariant})` : ''} ${item.selectedSize ? `[${item.selectedSize}]` : ''} x${item.quantity} = ₹${(item.product.price * item.quantity).toLocaleString('en-IN')}`
    );
    const text = `Hello Oriental Sports, I would like to order the following items from your Camp store:\n\n${lines.join('\n')}\n\nEstimated Total: ₹${total.toLocaleString('en-IN')}\nPlease confirm availability and payment details.`;
    return `https://wa.me/${STORE_INFO.phone.replace('+', '')}?text=${encodeURIComponent(text)}`;
  };

  return (
    <>
      <div 
        className={`cart-drawer-backdrop ${isCartOpen ? 'open' : ''}`} 
        onClick={closeCart}
        aria-hidden="true" 
      />
      <aside 
        className={`cart-drawer-content ${isCartOpen ? 'open' : ''}`}
        aria-label="Shopping Bag Drawer"
      >
        {/* Header */}
        <div className="cart-drawer-header">
          <div>
            <h3 style={{ fontSize: '1.125rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              YOUR BAG ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#666666' }}>
              Oriental Sports • Pune
            </span>
          </div>
          <button
            type="button"
            onClick={closeCart}
            style={{ padding: '8px', color: '#111111' }}
            aria-label="Close Bag"
          >
            <X size={22} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div style={{ backgroundColor: '#EDE8DC', padding: '10px 16px', fontSize: '0.8125rem' }}>
          {amountNeeded > 0 ? (
            <div>
              Add <strong style={{ color: '#111111' }}>₹{amountNeeded.toLocaleString('en-IN')}</strong> more for <strong style={{ color: '#C9A227' }}>FREE Pune Delivery</strong>
              <div style={{ width: '100%', height: '4px', backgroundColor: '#ded9cc', borderRadius: '2px', marginTop: '6px', overflow: 'hidden' }}>
                <div style={{ width: `${progressPercent}%`, height: '100%', backgroundColor: '#C9A227', transition: 'width 0.3s ease' }} />
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#111111', fontWeight: 600 }}>
              <Check size={16} color="#C9A227" />
              <span>You qualify for FREE Delivery in Pune!</span>
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div className="cart-drawer-body">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 16px' }}>
              <p style={{ color: '#666666', marginBottom: '24px' }}>Your sports bag is empty.</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  closeCart();
                  navigate('/shop');
                }}
              >
                EXPLORE GEAR
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedVariant || ''}-${item.selectedSize || ''}-${idx}`}
                style={{
                  display: 'flex',
                  gap: '12px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid #E2DCCF',
                }}
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  style={{
                    width: '76px',
                    height: '76px',
                    objectFit: 'cover',
                    borderRadius: '2px',
                    backgroundColor: '#EDE8DC',
                  }}
                />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Link
                        to={`/product/${item.product.slug}`}
                        onClick={closeCart}
                        style={{
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          lineHeight: 1.25,
                          color: '#111111',
                        }}
                      >
                        {item.product.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id, item.selectedVariant, item.selectedSize)}
                        style={{ color: '#888888', padding: '2px' }}
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {(item.selectedVariant || item.selectedSize) && (
                      <div style={{ fontSize: '0.75rem', color: '#666666', marginTop: '4px' }}>
                        {item.selectedVariant && <span>{item.selectedVariant}</span>}
                        {item.selectedVariant && item.selectedSize && <span> • </span>}
                        {item.selectedSize && <span>{item.selectedSize}</span>}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                    {/* Quantity controls */}
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        border: '1px solid #C9A227',
                        borderRadius: '2px',
                        backgroundColor: '#FFFFFF',
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedVariant, item.selectedSize)}
                        style={{ padding: '4px 8px', color: '#111111' }}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ padding: '0 8px', fontSize: '0.8125rem', fontWeight: 700 }}>
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedVariant, item.selectedSize)}
                        style={{ padding: '4px 8px', color: '#111111' }}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: '#111111' }}>
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with totals and action buttons */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="PROMO CODE (Try PUNEPLAY)"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  border: '1px solid #D1CBBF',
                  fontSize: '0.8125rem',
                  textTransform: 'uppercase',
                  outline: 'none',
                }}
              />
              <button type="submit" className="btn btn-outline-dark btn-sm">
                APPLY
              </button>
            </form>
            {promoMessage && (
              <div
                style={{
                  fontSize: '0.75rem',
                  color: promoMessage.success ? '#2e7d32' : '#c62828',
                  marginTop: '-4px',
                }}
              >
                {promoMessage.text}
              </div>
            )}

            {/* Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666666' }}>
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#C9A227', fontWeight: 600 }}>
                  <span>Discount ({promoCode})</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666666' }}>
                <span>Shipping (Pune & India)</span>
                <span>{shipping === 0 ? <strong style={{ color: '#2e7d32' }}>FREE</strong> : `₹${shipping}`}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: 800,
                  fontSize: '1.125rem',
                  color: '#111111',
                  paddingTop: '8px',
                  borderTop: '1px solid #E2DCCF',
                }}
              >
                <span>Estimated Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <Link
              to="/cart"
              onClick={closeCart}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              <span>CHECKOUT</span>
              <ArrowRight size={16} />
            </Link>

            <a
              href={generateWhatsAppOrderUrl()}
              target="_blank"
              rel="noreferrer"
              className="btn btn-gold"
              style={{ width: '100%', fontSize: '0.8125rem' }}
            >
              ORDER VIA WHATSAPP (+91 98909 90022)
            </a>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.75rem', color: '#777777', marginTop: '4px' }}>
              <ShieldCheck size={14} color="#C9A227" />
              <span>Authentic Gear Guaranteed • Camp Store Pickup Available</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
