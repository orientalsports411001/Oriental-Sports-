import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_INFO } from '../data/storeInfo';
import { PageHeader } from '../components/ui/PageHeader';
import { Img } from '../components/ui/Img';

const PAYMENT_OPTIONS = [
  { value: 'UPI', label: 'UPI, once the store confirms' },
  { value: 'StorePay', label: 'Pay at the Camp store on pickup' },
  { value: 'COD', label: 'Cash on delivery (Pune)' },
];

/**
 * Bag & checkout. There is no payment or order backend, so "Place order" hands
 * the complete order to the store on WhatsApp and says so plainly. The bag is
 * kept until the customer clears it — nothing is lost if WhatsApp isn't sent.
 */
export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, subtotal, shipping, discount, promoCode, applyPromoCode, clearCart } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; success: boolean } | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<'pune-shipping' | 'camp-pickup'>('pune-shipping');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [handedOff, setHandedOff] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    pincode: '411001',
    paymentMethod: PAYMENT_OPTIONS[0].value,
  });

  const finalShipping = deliveryMethod === 'camp-pickup' ? 0 : shipping;
  const grandTotal = Math.max(0, subtotal - discount + finalShipping);
  const units = cart.reduce((s, i) => s + i.quantity, 0);

  const orderLines = () =>
    cart.map(
      (item, idx) =>
        `${idx + 1}. ${item.product.name}${item.selectedVariant ? ` (${item.selectedVariant})` : ''}${item.selectedSize ? ` [${item.selectedSize}]` : ''} x${item.quantity} = ₹${(item.product.price * item.quantity).toLocaleString('en-IN')}`,
    );

  const quickOrderUrl = () => {
    const text = `Hello Oriental Sports, I would like to place an order from your website:\n\n${orderLines().join('\n')}\n\nDelivery Method: ${deliveryMethod === 'camp-pickup' ? 'Store Pickup at Camp' : 'Pune Home Delivery'}\nSubtotal: ₹${subtotal.toLocaleString('en-IN')}\nTotal: ₹${grandTotal.toLocaleString('en-IN')}\n\nPlease confirm order processing.`;
    return `https://wa.me/919890990022?text=${encodeURIComponent(text)}`;
  };

  const fullOrderUrl = () => {
    const payment = PAYMENT_OPTIONS.find((p) => p.value === checkoutForm.paymentMethod)?.label ?? checkoutForm.paymentMethod;
    const text = [
      'Hello Oriental Sports, I would like to place this order:',
      '',
      ...orderLines(),
      '',
      `Delivery: ${deliveryMethod === 'camp-pickup' ? 'Pickup at the Camp store' : 'Delivery in Pune'}`,
      deliveryMethod === 'camp-pickup'
        ? checkoutForm.address ? `Pickup note: ${checkoutForm.address}` : ''
        : `Address: ${checkoutForm.address}, ${checkoutForm.pincode}`,
      `Payment: ${payment}`,
      discount > 0 ? `Promo: ${promoCode} (−₹${discount.toLocaleString('en-IN')})` : '',
      `Total: ₹${grandTotal.toLocaleString('en-IN')}`,
      '',
      `Name: ${checkoutForm.fullName}`,
      `Phone: ${checkoutForm.phone}`,
    ]
      .filter((l, i, a) => l !== '' || a[i - 1] !== '')
      .join('\n');
    return `https://wa.me/919890990022?text=${encodeURIComponent(text)}`;
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <PageHeader crumbs={[{ label: 'Home', to: '/' }, { label: 'Bag' }]} title={['Nothing in', 'the bag yet.']}>
          <div className="page-header-actions">
            <Link to="/shop" className="btn btn-primary">Shop gear <span className="btn-arrow" aria-hidden="true">→</span></Link>
            <Link to="/courts" className="btn btn-outline">Plan a court</Link>
          </div>
        </PageHeader>
      </div>
    );
  }

  if (handedOff) {
    return (
      <div className="cart-page">
        <PageHeader crumbs={[{ label: 'Home', to: '/' }, { label: 'Bag' }]} title={['Send it on', 'WhatsApp.']}>
          <div className="handoff">
            <p className="lead">
              Your order is written out in WhatsApp. Press <strong>send</strong> there to place it — the store will confirm stock,
              delivery and payment with you on {checkoutForm.phone || 'your number'}.
            </p>
            <div className="page-header-actions">
              <a href={fullOrderUrl()} target="_blank" rel="noreferrer" className="btn btn-primary">Open WhatsApp again</a>
              <button type="button" className="btn btn-outline" onClick={() => setHandedOff(false)}>Back to bag</button>
              <button
                type="button"
                className="link-arrow"
                onClick={() => {
                  clearCart();
                  setHandedOff(false);
                }}
              >
                Sent — clear my bag
              </button>
            </div>
          </div>
        </PageHeader>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Bag' }]}
        title={['Your bag']}
        lead={`${units} ${units === 1 ? 'item' : 'items'} · Free delivery in Pune on orders above ₹2,000`}
      />

      <div className="container cart-grid">
        <ul className="cart-lines" aria-label="Items in your bag">
          {cart.map((item, idx) => (
            <li key={`${item.product.id}-${item.selectedVariant}-${item.selectedSize}-${idx}`} className="cart-line">
              <Link to={`/product/${item.product.slug}`} className="cart-line-media" tabIndex={-1} aria-hidden="true">
                <Img image={item.product.images[0]} alt="" sizes="112px" />
              </Link>
              <div className="cart-line-body">
                <p className="label subtle">{item.product.categoryName}</p>
                <Link to={`/product/${item.product.slug}`} className="cart-line-name">{item.product.name}</Link>
                {(item.selectedVariant || item.selectedSize) && (
                  <p className="cart-line-options">
                    {[item.selectedVariant, item.selectedSize].filter(Boolean).join(' · ')}
                  </p>
                )}
                <div className="cart-line-foot">
                  <div className="qty qty-sm" role="group" aria-label={`Quantity of ${item.product.name}`}>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedVariant, item.selectedSize)}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <output>{item.quantity}</output>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedVariant, item.selectedSize)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="price">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              </div>
              <button
                type="button"
                className="cart-line-remove"
                onClick={() => removeFromCart(item.product.id, item.selectedVariant, item.selectedSize)}
                aria-label={`Remove ${item.product.name}`}
              >
                <Trash2 size={17} strokeWidth={1.8} />
              </button>
            </li>
          ))}
        </ul>

        <aside className="cart-summary" aria-label="Order summary">
          <h2 className="display d-3">Summary</h2>

          <fieldset className="cart-field">
            <legend className="field-label">Delivery</legend>
            <div className="cart-toggle">
              <button type="button" className="chip" aria-pressed={deliveryMethod === 'pune-shipping'} onClick={() => setDeliveryMethod('pune-shipping')}>
                Deliver in Pune
              </button>
              <button type="button" className="chip" aria-pressed={deliveryMethod === 'camp-pickup'} onClick={() => setDeliveryMethod('camp-pickup')}>
                Pick up at Camp
              </button>
            </div>
          </fieldset>

          <form
            className="cart-promo"
            onSubmit={(e) => {
              e.preventDefault();
              if (!inputCode) return;
              const res = applyPromoCode(inputCode);
              setPromoMessage({ text: res.message, success: res.success });
            }}
          >
            <label htmlFor="promo" className="visually-hidden">Promo code</label>
            <input id="promo" className="input" placeholder="Promo code" value={inputCode} onChange={(e) => setInputCode(e.target.value)} />
            <button type="submit" className="btn btn-outline btn-sm">Apply</button>
          </form>
          {promoMessage && (
            <p className={`cart-promo-msg ${promoMessage.success ? 'is-ok' : 'is-error'}`} role="status">{promoMessage.text}</p>
          )}

          <dl className="cart-totals">
            <div><dt>Subtotal</dt><dd>₹{subtotal.toLocaleString('en-IN')}</dd></div>
            {discount > 0 && (
              <div><dt>Promo ({promoCode})</dt><dd>−₹{discount.toLocaleString('en-IN')}</dd></div>
            )}
            <div><dt>{deliveryMethod === 'camp-pickup' ? 'Pickup' : 'Delivery'}</dt><dd>{finalShipping === 0 ? 'Free' : `₹${finalShipping}`}</dd></div>
            <div className="cart-total"><dt>Total</dt><dd>₹{grandTotal.toLocaleString('en-IN')}</dd></div>
          </dl>

          <button type="button" className="btn btn-primary btn-block btn-lg" onClick={() => setIsCheckoutOpen(true)}>
            Checkout <span className="btn-arrow" aria-hidden="true">→</span>
          </button>
          <a href={quickOrderUrl()} target="_blank" rel="noreferrer" className="link-arrow cart-quick">
            Or just send the list on WhatsApp <span className="btn-arrow" aria-hidden="true">→</span>
          </a>
          <p className="cart-note">
            Orders are confirmed by the store on WhatsApp — no payment is taken on this website. Questions? Call {STORE_INFO.displayPhone}.
          </p>
        </aside>
      </div>

      {isCheckoutOpen && (
        <div className="modal-backdrop" onClick={() => setIsCheckoutOpen(false)}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h2 id="checkout-title" className="display d-3">Your details</h2>
              <p className="muted">We’ll send your order to the store on WhatsApp.</p>
            </div>
            <form
              className="modal-body contact-form"
              onSubmit={(e) => {
                e.preventDefault();
                window.open(fullOrderUrl(), '_blank', 'noopener');
                setIsCheckoutOpen(false);
                setHandedOff(true);
              }}
            >
              <div className="field">
                <label className="field-label" htmlFor="co-name">Full name</label>
                <input id="co-name" className="input" required autoComplete="name" value={checkoutForm.fullName} onChange={(e) => setCheckoutForm({ ...checkoutForm, fullName: e.target.value })} />
              </div>
              <div className="contact-form-row">
                <div className="field">
                  <label className="field-label" htmlFor="co-phone">Phone</label>
                  <input id="co-phone" className="input" type="tel" required autoComplete="tel" value={checkoutForm.phone} onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })} />
                </div>
                <div className="field">
                  <label className="field-label" htmlFor="co-pin">Pincode</label>
                  <input id="co-pin" className="input" required inputMode="numeric" autoComplete="postal-code" value={checkoutForm.pincode} onChange={(e) => setCheckoutForm({ ...checkoutForm, pincode: e.target.value })} />
                </div>
              </div>
              <div className="field">
                <label className="field-label" htmlFor="co-address">
                  {deliveryMethod === 'camp-pickup' ? 'Pickup note (optional)' : 'Delivery address'}
                </label>
                <input
                  id="co-address"
                  className="input"
                  required={deliveryMethod === 'pune-shipping'}
                  autoComplete={deliveryMethod === 'pune-shipping' ? 'street-address' : 'off'}
                  placeholder={deliveryMethod === 'camp-pickup' ? 'e.g. Saturday around 5 PM' : 'Flat, building, street'}
                  value={checkoutForm.address}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                />
              </div>
              <div className="field">
                <label className="field-label" htmlFor="co-pay">How would you like to pay?</label>
                <select id="co-pay" className="select" value={checkoutForm.paymentMethod} onChange={(e) => setCheckoutForm({ ...checkoutForm, paymentMethod: e.target.value })}>
                  {PAYMENT_OPTIONS.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>
              <div className="modal-total">
                <span>Total</span>
                <strong>₹{grandTotal.toLocaleString('en-IN')}</strong>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setIsCheckoutOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Send order on WhatsApp</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
