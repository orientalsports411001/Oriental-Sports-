import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Check, MessageSquare, CreditCard, Store } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_INFO } from '../data/storeInfo';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    shipping,
    discount,
    total,
    promoCode,
    applyPromoCode,
    clearCart,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; success: boolean } | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<'pune-shipping' | 'camp-pickup'>('pune-shipping');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    pincode: '411001',
    paymentMethod: 'UPI',
  });

  const navigate = useNavigate();

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode) return;
    const res = applyPromoCode(inputCode);
    setPromoMessage({ text: res.message, success: res.success });
  };

  const finalShipping = deliveryMethod === 'camp-pickup' ? 0 : shipping;
  const grandTotal = Math.max(0, subtotal - discount + finalShipping);

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderComplete(true);
    setTimeout(() => {
      clearCart();
    }, 500);
  };

  const getWhatsAppOrderUrl = () => {
    const lines = cart.map(
      (item, idx) =>
        `${idx + 1}. ${item.product.name} ${item.selectedVariant ? `(${item.selectedVariant})` : ''} ${item.selectedSize ? `[${item.selectedSize}]` : ''} x${item.quantity} = ₹${(item.product.price * item.quantity).toLocaleString('en-IN')}`
    );
    const text = `Hello Oriental Sports, I would like to place an order from your website:\n\n${lines.join('\n')}\n\nDelivery Method: ${deliveryMethod === 'camp-pickup' ? 'Store Pickup at Camp' : 'Pune Home Delivery'}\nSubtotal: ₹${subtotal.toLocaleString('en-IN')}\nTotal: ₹${grandTotal.toLocaleString('en-IN')}\n\nPlease confirm order processing.`;
    return `https://wa.me/919890990022?text=${encodeURIComponent(text)}`;
  };

  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="bg-ivory" style={{ minHeight: '80vh', padding: 'clamp(64px, 10vw, 120px) 16px', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ maxWidth: '580px', margin: '0 auto', textAlign: 'center' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              border: '2px solid var(--color-ink)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              backgroundColor: '#FFFFFF',
              boxShadow: '4px 4px 0px #111111',
            }}
          >
            <CreditCard size={28} color="#111111" />
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-plate-gold)', display: 'block', marginBottom: '8px' }}>
            PUNE CAMP SPORTS HOUSE
          </span>
          <h1 className="font-display" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.25rem)', lineHeight: 1.0, marginBottom: '16px', color: 'var(--color-ink)' }}>
            YOUR SPORTS BAG IS EMPTY
          </h1>
          <p style={{ color: '#555555', fontSize: '1rem', lineHeight: 1.5, marginBottom: '32px' }}>
            Your gear roster is currently blank. Explore tournament-grade pickleball paddles, English willow bats, and precision-strung racquets.
          </p>
          <Link
            to="/shop"
            className="btn btn-primary btn-lg"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', boxShadow: '4px 4px 0px #C9A227' }}
          >
            <span>EXPLORE CATALOG</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="bg-ivory" style={{ minHeight: '80vh', padding: 'clamp(64px, 10vw, 120px) 16px', display: 'flex', alignItems: 'center' }}>
        <div
          className="container"
          style={{
            maxWidth: '580px',
            margin: '0 auto',
            backgroundColor: '#FFFFFF',
            padding: '48px 36px',
            border: '2px solid var(--color-ink)',
            boxShadow: '8px 8px 0px #111111',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              backgroundColor: 'var(--color-plate-gold)',
              color: '#111111',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              border: '2px solid #111111',
            }}
          >
            <Check size={36} strokeWidth={3} />
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-plate-gold)', display: 'block', marginBottom: '8px' }}>
            ORDER CONFIRMED
          </span>
          <h1 className="font-display" style={{ fontSize: '2.5rem', lineHeight: 1.05, marginBottom: '8px' }}>
            ORDER DISPATCH QUEUED
          </h1>
          <p style={{ color: 'var(--color-ink)', fontWeight: 800, fontSize: '0.9375rem', marginBottom: '16px', fontFamily: 'monospace' }}>
            ORDER #OS-PUNE-{Math.floor(100000 + Math.random() * 900000)}
          </p>
          <p style={{ color: '#555555', fontSize: '1rem', lineHeight: 1.5, marginBottom: '32px' }}>
            Thank you, <strong>{checkoutForm.fullName || 'Athlete'}</strong>. Our Camp store dispatch desk has received your request. Equipment inspection and preparation is in progress for <strong>{checkoutForm.phone}</strong>.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a
              href={`https://wa.me/919890990022?text=Hello%20Oriental%20Sports,%20I%20just%20placed%20an%20order%20for%20pickup/delivery%20under%20${encodeURIComponent(checkoutForm.fullName || 'Customer')}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-gold btn-lg"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '4px 4px 0px #111111' }}
            >
              <MessageSquare size={18} />
              <span>WHATSAPP DISPATCH DESK (+91 98909 90022)</span>
            </a>
            <Link to="/shop" className="btn btn-outline-dark btn-lg">
              <span>CONTINUE EXPLORING</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory" style={{ minHeight: '85vh', paddingBottom: 'var(--space-4xl)' }}>
      {/* Brutalist Hero Banner */}
      <div
        style={{
          backgroundColor: 'var(--color-ink)',
          color: '#FFFFFF',
          padding: 'clamp(48px, 6vw, 72px) 0 40px',
          borderBottom: '2px solid #C9A227',
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-plate-gold)' }}>
              ROSTER & CHECKOUT
            </span>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace' }}>
              CAMP DESK PUNE
            </span>
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: 0.95, color: '#FFFFFF', margin: 0 }}>
            YOUR SPORTS BAG.
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '14px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-plate-gold)' }}>
              {cart.reduce((s, i) => s + i.quantity, 0)} UNITS SELECTED
            </span>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
            <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>
              Complimentary Pune Delivery over ₹2,000
            </span>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 'clamp(32px, 5vw, 48px)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 'clamp(24px, 4vw, 48px)',
            alignItems: 'start',
          }}
        >
          {/* Left: Cart Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {cart.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedVariant}-${item.selectedSize}-${idx}`}
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '20px',
                  border: '1px solid #111111',
                  boxShadow: '4px 4px 0px #111111',
                  display: 'flex',
                  gap: '20px',
                }}
              >
                <div style={{ width: '100px', height: '100px', flexShrink: 0, backgroundColor: '#F6F3EA', border: '1px solid rgba(17,17,17,0.1)', overflow: 'hidden' }}>
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                      <div>
                        <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: 'var(--color-plate-gold)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '2px' }}>
                          {item.product.brand} • {item.product.categoryName}
                        </span>
                        <Link
                          to={`/product/${item.product.slug}`}
                          style={{ fontWeight: 800, fontSize: '1.0625rem', color: '#111111', lineHeight: 1.25, textDecoration: 'none' }}
                        >
                          {item.product.name}
                        </Link>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id, item.selectedVariant, item.selectedSize)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#888888',
                          cursor: 'pointer',
                          padding: '4px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {(item.selectedVariant || item.selectedSize) && (
                      <div style={{ fontSize: '0.75rem', color: '#666666', marginTop: '4px', display: 'flex', gap: '8px' }}>
                        {item.selectedVariant && <span style={{ backgroundColor: '#F6F3EA', padding: '2px 6px', border: '1px solid #E2DCCF' }}>Spec: {item.selectedVariant}</span>}
                        {item.selectedSize && <span style={{ backgroundColor: '#F6F3EA', padding: '2px 6px', border: '1px solid #E2DCCF' }}>Size: {item.selectedSize}</span>}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #F0ECE1' }}>
                    {/* Stepper with tactile click */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #111111', backgroundColor: '#FFFFFF' }}>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedVariant, item.selectedSize)}
                        style={{ padding: '6px 10px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span style={{ padding: '0 12px', fontWeight: 800, fontSize: '0.875rem', fontFamily: 'monospace' }}>
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedVariant, item.selectedSize)}
                        style={{ padding: '6px 10px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.6875rem', color: '#888888', display: 'block' }}>Line Total</span>
                      <span style={{ fontWeight: 900, fontSize: '1.1875rem', color: '#111111', fontFamily: 'var(--font-heading)' }}>
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Liquid Glass Order Summary & Checkout Card */}
          <div>
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                padding: '28px',
                border: '2px solid #111111',
                boxShadow: '6px 6px 0px #111111',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #111111' }}>
                <h2 className="font-display" style={{ fontSize: '1.375rem', margin: 0 }}>
                  ORDER SUMMARY
                </h2>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-plate-gold)', textTransform: 'uppercase' }}>
                  SECURE CHECKOUT
                </span>
              </div>

              {/* Delivery Option Selector */}
              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#555555', textTransform: 'uppercase', display: 'block', marginBottom: '8px', letterSpacing: '0.06em' }}>
                  Fulfillment Method:
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('pune-shipping')}
                    style={{
                      padding: '12px 10px',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      backgroundColor: deliveryMethod === 'pune-shipping' ? 'var(--color-ink)' : '#FFFFFF',
                      color: deliveryMethod === 'pune-shipping' ? '#FFFFFF' : '#111111',
                      border: '1px solid #111111',
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                  >
                    PUNE DELIVERY
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('camp-pickup')}
                    style={{
                      padding: '12px 10px',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      backgroundColor: deliveryMethod === 'camp-pickup' ? 'var(--color-ink)' : '#FFFFFF',
                      color: deliveryMethod === 'camp-pickup' ? '#FFFFFF' : '#111111',
                      border: '1px solid #111111',
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                  >
                    CAMP STORE PICKUP (FREE)
                  </button>
                </div>
              </div>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <input
                  type="text"
                  placeholder="PROMO (PUNEPLAY)"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  style={{ flex: 1, padding: '8px 12px', border: '1px solid #D1CBBF', fontSize: '0.8125rem', outline: 'none' }}
                />
                <button type="submit" className="btn btn-outline-dark btn-sm">
                  APPLY
                </button>
              </form>
              {promoMessage && (
                <div style={{ fontSize: '0.75rem', color: promoMessage.success ? '#2e7d32' : '#c62828', marginBottom: '12px' }}>
                  {promoMessage.text}
                </div>
              )}

              {/* Totals */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem', borderTop: '1px solid #EDE8DC', paddingTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#C9A227', fontWeight: 600 }}>
                    <span>Discount ({promoCode})</span>
                    <span>-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
                  <span>Fulfillment</span>
                  <span>{finalShipping === 0 ? <strong style={{ color: '#2e7d32' }}>FREE</strong> : `₹${finalShipping}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.25rem', color: '#111', borderTop: '1px solid #EDE8DC', paddingTop: '12px', marginTop: '4px' }}>
                  <span>Grand Total</span>
                  <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '24px' }}>
                <button
                  type="button"
                  onClick={() => setIsCheckoutModalOpen(true)}
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%' }}
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight size={18} />
                </button>

                <a
                  href={getWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-gold"
                  style={{ width: '100%', fontSize: '0.8125rem' }}
                >
                  <MessageSquare size={16} />
                  <span>ORDER VIA WHATSAPP (+91 98909 90022)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className="search-modal-backdrop open" onClick={() => setIsCheckoutModalOpen(false)}>
          <div className="search-modal-container" style={{ maxWidth: '540px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '24px', backgroundColor: '#111', color: '#FFF' }}>
              <h3 className="font-display" style={{ fontSize: '1.25rem', color: '#FFF' }}>
                COMPLETE YOUR ORDER
              </h3>
              <span style={{ fontSize: '0.8125rem', color: '#C9A227' }}>
                Oriental Sports • Camp, Pune
              </span>
            </div>

            <form onSubmit={handleConfirmOrder} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '4px' }}>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Deshpande"
                  value={checkoutForm.fullName}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, fullName: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #D1CBBF', borderRadius: '2px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '4px' }}>Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98..."
                    value={checkoutForm.phone}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #D1CBBF', borderRadius: '2px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '4px' }}>Pincode *</label>
                  <input
                    type="text"
                    required
                    value={checkoutForm.pincode}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, pincode: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #D1CBBF', borderRadius: '2px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '4px' }}>
                  {deliveryMethod === 'camp-pickup' ? 'Store Pickup Notes' : 'Delivery Address *'}
                </label>
                <input
                  type="text"
                  required={deliveryMethod === 'pune-shipping'}
                  placeholder={deliveryMethod === 'camp-pickup' ? 'e.g. Will pick up on Saturday 5 PM' : 'Flat, Building, Street in Pune'}
                  value={checkoutForm.address}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #D1CBBF', borderRadius: '2px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '4px' }}>Payment Method</label>
                <select
                  value={checkoutForm.paymentMethod}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, paymentMethod: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #D1CBBF', borderRadius: '2px', backgroundColor: '#FFF' }}
                >
                  <option value="UPI">UPI (Google Pay, PhonePe, Paytm)</option>
                  <option value="Card">Debit / Credit Card (Visa, RuPay, Mastercard)</option>
                  <option value="StorePay">Pay at Camp Store upon Pickup</option>
                  <option value="COD">Cash on Delivery (Pune)</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid #E2DCCF' }}>
                <span style={{ fontSize: '0.875rem', color: '#666' }}>Amount to Pay:</span>
                <strong style={{ fontSize: '1.25rem', color: '#111' }}>₹{grandTotal.toLocaleString('en-IN')}</strong>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setIsCheckoutModalOpen(false)}
                  className="btn btn-outline-dark"
                  style={{ flex: 1 }}
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 1.5 }}
                >
                  PLACE ORDER
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
