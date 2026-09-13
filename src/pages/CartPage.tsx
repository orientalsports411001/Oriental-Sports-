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
      <div className="bg-ivory" style={{ minHeight: '80vh', padding: '80px 16px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '480px', margin: '0 auto' }}>
          <h1 className="font-display" style={{ fontSize: '2rem', marginBottom: '12px' }}>
            YOUR SPORTS BAG IS EMPTY
          </h1>
          <p style={{ color: '#666', marginBottom: '24px' }}>
            Browse our match-tested racquets, willow bats, and court equipment.
          </p>
          <Link to="/shop" className="btn btn-primary">
            <span>EXPLORE SHOP</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="bg-ivory" style={{ minHeight: '80vh', padding: '80px 16px', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '520px', margin: '0 auto', backgroundColor: '#FFFFFF', padding: '40px', borderRadius: '2px', border: '1px solid #E2DCCF' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#C9A227', color: '#111111', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
            <Check size={32} strokeWidth={3} />
          </div>
          <h1 className="font-display" style={{ fontSize: '2rem', marginBottom: '8px' }}>
            ORDER CONFIRMED
          </h1>
          <p style={{ color: '#C9A227', fontWeight: 700, fontSize: '0.875rem', marginBottom: '16px' }}>
            ORDER #OS-PUNE-{Math.floor(100000 + Math.random() * 900000)}
          </p>
          <p style={{ color: '#555555', fontSize: '0.9375rem', lineHeight: 1.5, marginBottom: '28px' }}>
            Thank you, <strong>{checkoutForm.fullName || 'Valued Athlete'}</strong>. We have received your order. Our Camp store dispatch team will prepare your equipment and update you at <strong>{checkoutForm.phone}</strong>.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a
              href={`https://wa.me/919890990022?text=Hello%20Oriental%20Sports,%20I%20just%20placed%20order%20for%20pickup/delivery%20under%20${encodeURIComponent(checkoutForm.fullName || 'Customer')}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-gold"
            >
              <MessageSquare size={16} />
              <span>TRACK VIA WHATSAPP (+91 98909 90022)</span>
            </a>
            <Link to="/shop" className="btn btn-outline-dark">
              <span>CONTINUE SHOPPING</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory" style={{ minHeight: '80vh', paddingBottom: 'var(--space-4xl)' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'var(--color-ink)', color: '#FFFFFF', padding: 'var(--space-2xl) 0' }}>
        <div className="container">
          <h1 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: '#FFFFFF' }}>
            YOUR SPORTS BAG
          </h1>
          <span style={{ fontSize: '0.875rem', color: '#B5AFA4' }}>
            {cart.reduce((s, i) => s + i.quantity, 0)} Items Selected
          </span>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 'var(--space-2xl)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-2xl)',
          }}
        >
          {/* Left: Cart Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {cart.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedVariant}-${item.selectedSize}-${idx}`}
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '16px',
                  borderRadius: '2px',
                  border: '1px solid var(--color-ivory-border)',
                  display: 'flex',
                  gap: '16px',
                }}
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  style={{ width: '88px', height: '88px', objectFit: 'cover', borderRadius: '2px', backgroundColor: '#EDE8DC' }}
                />

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-plate-gold)', textTransform: 'uppercase' }}>
                        {item.product.brand}
                      </span>
                      <Link to={`/product/${item.product.slug}`} style={{ display: 'block', fontWeight: 700, fontSize: '1rem', color: '#111111' }}>
                        {item.product.name}
                      </Link>
                      {(item.selectedVariant || item.selectedSize) && (
                        <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '2px' }}>
                          {item.selectedVariant && <span>{item.selectedVariant}</span>}
                          {item.selectedVariant && item.selectedSize && <span> • </span>}
                          {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id, item.selectedVariant, item.selectedSize)}
                      style={{ color: '#888', padding: '4px' }}
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #C9A227', borderRadius: '2px' }}>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedVariant, item.selectedSize)}
                        style={{ padding: '4px 8px' }}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ padding: '0 8px', fontWeight: 700, fontSize: '0.875rem' }}>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedVariant, item.selectedSize)}
                        style={{ padding: '4px 8px' }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div style={{ fontWeight: 800, fontSize: '1.0625rem', color: '#111111' }}>
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Order Summary & Checkout */}
          <div>
            <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '2px', border: '1px solid var(--color-ivory-border)' }}>
              <h3 className="font-display" style={{ fontSize: '1.25rem', marginBottom: '16px' }}>
                ORDER SUMMARY
              </h3>

              {/* Delivery Option Selector */}
              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#666', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  Choose Fulfillment:
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('pune-shipping')}
                    style={{
                      padding: '10px 8px',
                      borderRadius: '2px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      backgroundColor: deliveryMethod === 'pune-shipping' ? 'var(--color-ink)' : '#F6F3EA',
                      color: deliveryMethod === 'pune-shipping' ? '#FFFFFF' : '#111111',
                      border: '1px solid var(--color-ivory-border)',
                      cursor: 'pointer',
                    }}
                  >
                    PUNE DELIVERY
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('camp-pickup')}
                    style={{
                      padding: '10px 8px',
                      borderRadius: '2px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      backgroundColor: deliveryMethod === 'camp-pickup' ? 'var(--color-ink)' : '#F6F3EA',
                      color: deliveryMethod === 'camp-pickup' ? '#FFFFFF' : '#111111',
                      border: '1px solid var(--color-ivory-border)',
                      cursor: 'pointer',
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
