import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  Truck,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Store,
} from 'lucide-react';
import { useCart, getItemUnitPrice } from '../context/CartContext';
import { STORE_INFO } from '../data/storeInfo';
import { PageHeader } from '../components/ui/PageHeader';
import { Img } from '../components/ui/Img';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    shipping,
    discount,
    promoCode,
    applyPromoCode,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; success: boolean } | null>(null);

  const grandTotal = Math.max(0, subtotal - discount + shipping);
  const units = cart.reduce((s, i) => s + i.quantity, 0);

  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = await applyPromoCode(inputCode.trim());
    setPromoMessage({ text: res.message, success: res.success });
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page" style={{ minHeight: '70vh' }}>
        <PageHeader crumbs={[{ label: 'Home', to: '/' }, { label: 'Bag' }]} title={['Nothing in', 'the bag yet.']}>
          <div className="page-header-actions">
            <Link to="/shop" className="btn btn-primary">
              Shop gear <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
            <Link to="/courts" className="btn btn-outline">Plan a court</Link>
            <Link to="/account" className="btn btn-outline">My Account</Link>
          </div>
        </PageHeader>
      </div>
    );
  }

  return (
    <div className="cart-page" style={{ minHeight: '80vh', paddingBottom: '80px' }}>
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Bag' }]}
        title={['Your bag']}
        lead={`${units} ${units === 1 ? 'item' : 'items'} · Fast delivery across Pune and pan-India with Razorpay security`}
      />

      <div className="container cart-grid">
        <ul className="cart-lines" aria-label="Items in your bag">
          {cart.map((item, idx) => (
            <li key={`${item.product.id}-${item.selectedVariant}-${item.selectedSize}-${idx}`} className="cart-line">
              <Link to={`/product/${item.product.slug}`} className="cart-line-media" tabIndex={-1} aria-hidden="true">
                <Img image={item.product.images[0]} alt="" sizes="112px" />
              </Link>
              <div className="cart-line-body">
                <div className="cart-line-head">
                  <h2 className="cart-line-title">
                    <Link to={`/product/${item.product.slug}`}>{item.product.name}</Link>
                  </h2>
                  <span className="cart-line-price">
                    ₹{(getItemUnitPrice(item) * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="cart-line-meta">
                  <span className="badge">{item.product.categoryName}</span>
                  {item.selectedVariant ? <span className="meta-sep">· {item.selectedVariant}</span> : null}
                  {item.selectedSize ? <span className="meta-sep">· Size: {item.selectedSize}</span> : null}
                  <span className="meta-sep">· ₹{getItemUnitPrice(item).toLocaleString('en-IN')} each</span>
                </div>

                <div className="cart-line-actions">
                  <div className="qty-control" role="group" aria-label={`Quantity for ${item.product.name}`}>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedVariant, item.selectedSize)}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="qty-value" aria-live="polite">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedVariant, item.selectedSize)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    type="button"
                    className="cart-remove-btn"
                    onClick={() => removeFromCart(item.product.id, item.selectedVariant, item.selectedSize)}
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="cart-summary" aria-label="Order summary">
          <h2 className="display d-3">Summary</h2>

          {/* Promo code field */}
          <form onSubmit={handleApplyPromo} className="promo-form" style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Discount Code (e.g. ORIENTAL10)"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  border: '1px solid var(--line)',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                }}
              />
              <button type="submit" className="btn btn-secondary" style={{ padding: '0 16px' }}>
                Apply
              </button>
            </div>
            {promoMessage && (
              <p
                style={{
                  margin: '8px 0 0',
                  fontSize: '0.8125rem',
                  color: promoMessage.success ? '#137333' : '#c5221f',
                  fontWeight: 500,
                }}
              >
                {promoMessage.text}
              </p>
            )}
          </form>

          <dl className="summary-list">
            <div className="summary-row">
              <dt>Subtotal</dt>
              <dd>₹{subtotal.toLocaleString('en-IN')}</dd>
            </div>
            {discount > 0 && (
              <div className="summary-row" style={{ color: '#137333' }}>
                <dt>Discount ({promoCode})</dt>
                <dd>−₹{discount.toLocaleString('en-IN')}</dd>
              </div>
            )}
            <div className="summary-row">
              <dt>Shipping</dt>
              <dd>
                {shipping === 0 ? (
                  <span className="free-shipping">FREE</span>
                ) : (
                  `₹${shipping.toLocaleString('en-IN')}`
                )}
              </dd>
            </div>
            <div className="summary-row">
              <dt>GST (18%)</dt>
              <dd>Included</dd>
            </div>
            <div className="summary-row summary-total">
              <dt>Total</dt>
              <dd>₹{grandTotal.toLocaleString('en-IN')}</dd>
            </div>
          </dl>

          <Link
            to="/checkout"
            className="btn btn-primary btn-block btn-lg"
            style={{ textAlign: 'center', textDecoration: 'none', marginBottom: '16px' }}
          >
            Proceed to Checkout <span className="btn-arrow" aria-hidden="true">→</span>
          </Link>

          <div
            style={{
              padding: '16px',
              backgroundColor: '#f8f8f6',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              color: 'var(--muted)',
              lineHeight: 1.5,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', color: '#111', fontWeight: 600 }}>
              <ShieldCheck size={16} color="#137333" />
              <span>Next Step: Address & Razorpay</span>
            </div>
            <p style={{ margin: 0 }}>
              You will enter your delivery address and contact details on the next page before paying securely via Razorpay (UPI, Cards, Net Banking).
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CartPage;
