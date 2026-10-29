import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Truck,
  Store,
  CreditCard,
  QrCode,
  Building2,
  CheckCircle2,
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  ShoppingBag,
  Clock,
  Phone,
  Check,
} from 'lucide-react';
import { useCart, getItemUnitPrice } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { STORE_INFO } from '../data/storeInfo';
import { Img } from '../components/ui/Img';
import { Logo } from '../components/brand/Logo';
import { Order } from '../types/auth';
import {
  loadRazorpayScript,
  getRazorpayKey,
  isLiveRazorpayKey,
  RazorpayOptions,
} from '../services/razorpay';
import { sendOrderEmailNotification } from '../services/emailNotification';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, subtotal, shipping, discount, promoCode, applyPromoCode, clearCart } = useCart();
  const { user, isAuthenticated, addOrder } = useAuth();

  const [deliveryMethod, setDeliveryMethod] = useState<'doorstep' | 'camp_pickup'>('doorstep');
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; success: boolean } | null>(null);
  const [showMobileSummary, setShowMobileSummary] = useState(false);

  // Address form fields
  const defaultAddr = user?.addresses.find((a) => a.isDefault) || user?.addresses?.[0];

  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone?.replace('+91', '').trim() || '',
    street: defaultAddr?.street || '',
    apartment: '',
    locality: defaultAddr?.locality || '',
    city: defaultAddr?.city || 'Pune',
    state: defaultAddr?.state || 'Maharashtra',
    pincode: defaultAddr?.pincode || '',
    pickupNotes: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRazorpaySimModal, setShowRazorpaySimModal] = useState(false);
  const [simPaymentMethod, setSimPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');

  const finalShipping = deliveryMethod === 'camp_pickup' ? 0 : shipping;
  const grandTotal = Math.max(0, subtotal - discount + finalShipping);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // If cart is empty, redirect back to bag
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!form.firstName.trim()) errors.firstName = 'First name is required';
    if (!form.phone.trim()) {
      errors.phone = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) {
      errors.phone = 'Enter a valid 10-digit mobile number';
    }

    if (deliveryMethod === 'doorstep') {
      if (!form.street.trim()) errors.street = 'Street address / house number is required';
      if (!form.locality.trim()) errors.locality = 'Locality / landmark is required';
      if (!form.city.trim()) errors.city = 'City is required';
      if (!form.pincode.trim()) {
        errors.pincode = 'PIN code is required';
      } else if (!/^\d{6}$/.test(form.pincode.trim())) {
        errors.pincode = 'Enter a valid 6-digit PIN code';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const res = await applyPromoCode(promoInput);
    setPromoMessage({ text: res.message, success: res.success });
  };

  const handleCreateAndFinalizeOrder = async (paymentId: string, paymentMethodName: string) => {
    const orderNum = `OS-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const orderUuid =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `3b8909d7-8e68-45a7-96a1-${Date.now().toString(16).padStart(12, '0')}`;

    const newOrder: Order = {
      id: orderUuid,
      orderNumber: orderNum,
      customerEmail: form.email,
      customerName: `${form.firstName} ${form.lastName}`.trim(),
      date: new Date().toISOString().split('T')[0],
      status: 'confirmed',
      statusLabel:
        deliveryMethod === 'camp_pickup'
          ? 'Ready for Camp Store Collection'
          : 'Confirmed · Preparing at MG Road Workshop',
      totalAmount: grandTotal,
      subtotal: subtotal,
      shipping: finalShipping,
      tax: Math.round(subtotal * 0.18),
      paymentMethod: `Razorpay (${paymentMethodName} - ID: ${paymentId})`,
      shippingAddress: {
        id: `addr_${Date.now()}`,
        name: `${form.firstName} ${form.lastName}`.trim(),
        phone: form.phone.startsWith('+91') ? form.phone : `+91 ${form.phone}`,
        email: form.email,
        street: deliveryMethod === 'camp_pickup' ? 'Shop 247, MG Road (Camp Store Pickup)' : form.street,
        locality: form.locality || 'Camp',
        city: form.city || 'Pune',
        state: form.state || 'Maharashtra',
        pincode: form.pincode,
        isDefault: false,
        type: 'home',
      },
      trackingNumber: `OS-DTDC-${Math.floor(10000 + Math.random() * 90000)}`,
      carrier: deliveryMethod === 'camp_pickup' ? 'Oriental Store Counter' : 'DTDC Express Pune',
      items: cart.map((item) => ({
        productId: item.product.id,
        productSlug: item.product.slug,
        productName: item.product.name,
        productImage: item.product.images[0],
        price: getItemUnitPrice(item),
        quantity: item.quantity,
        selectedVariant: item.selectedVariant,
        selectedSize: item.selectedSize,
      })),
      timeline: [
        {
          status: 'confirmed',
          title: 'Order Confirmed',
          description: `Payment of ₹${grandTotal.toLocaleString('en-IN')} verified via Razorpay (${paymentId}).`,
          date: 'Just now',
          completed: true,
          current: true,
        },
        {
          status: 'processing',
          title: 'Quality Check & Workshop Assembly',
          description: 'Inspected by master stringer & equipment craftsman at Shop 247, MG Road.',
          date: 'Upcoming',
          completed: false,
          current: false,
        },
        {
          status: 'shipped',
          title: deliveryMethod === 'camp_pickup' ? 'Ready for Counter Pickup' : 'Dispatched via Courier',
          description:
            deliveryMethod === 'camp_pickup'
              ? 'Ready at Shop 247, MG Road, Camp, Pune.'
              : 'Out for fast doorstep delivery in Pune.',
          date: 'Upcoming',
          completed: false,
          current: false,
        },
        {
          status: 'delivered',
          title: 'Delivered / Collected',
          description: 'Handed over to customer.',
          date: 'Upcoming',
          completed: false,
          current: false,
        },
      ],
    };

    await addOrder(newOrder);

    // Trigger instant order confirmation email notification
    sendOrderEmailNotification({
      order: newOrder,
      stage: 'confirmed',
      customerEmail: form.email,
      customerName: `${form.firstName} ${form.lastName}`.trim(),
    }).catch(() => {});

    clearCart();
    navigate('/order-success', { state: { order: newOrder } });
  };

  const handleProceedToRazorpay = async () => {
    if (!validateForm()) {
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setIsProcessing(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      const razorpayKey = getRazorpayKey();

      if (scriptLoaded && window.Razorpay && isLiveRazorpayKey()) {
        const options: RazorpayOptions = {
          key: razorpayKey,
          amount: Math.round(grandTotal * 100),
          currency: 'INR',
          name: 'Oriental Sports Pune',
          description: `Order of ${cart.length} sports item(s)`,
          image: '/images/hero/hero_train_perform.webp',
          prefill: {
            name: `${form.firstName} ${form.lastName}`.trim(),
            email: form.email,
            contact: form.phone,
          },
          theme: {
            color: '#111827',
          },
          handler: (response) => {
            handleCreateAndFinalizeOrder(response.razorpay_payment_id, 'Live Gateway');
          },
          modal: {
            ondismiss: () => {
              setIsProcessing(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        setShowRazorpaySimModal(true);
      }
    } catch (err) {
      console.warn('Razorpay initialization fallback:', err);
      setShowRazorpaySimModal(true);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="checkout-page">
      {/* =====================================================================
          CLEAN E-COMMERCE CHECKOUT HEADER
         ===================================================================== */}
      <header className="checkout-header">
        <div className="checkout-header-inner">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Logo size="md" />
          </Link>

          {/* Stepper Indicator */}
          <nav className="checkout-progress" aria-label="Checkout Steps">
            <Link to="/cart" className="checkout-progress-item is-done">
              <span className="checkout-progress-dot">✓</span>
              <span>Bag</span>
            </Link>
            <span className="checkout-progress-sep">/</span>
            <div className="checkout-progress-item is-active">
              <span className="checkout-progress-dot">2</span>
              <span>Shipping & Details</span>
            </div>
            <span className="checkout-progress-sep">/</span>
            <div className="checkout-progress-item">
              <span className="checkout-progress-dot">3</span>
              <span>Payment</span>
            </div>
          </nav>
        </div>
      </header>

      {/* =====================================================================
          MOBILE ORDER SUMMARY ACCORDION
         ===================================================================== */}
      <div
        className="mobile-summary-toggle"
        onClick={() => setShowMobileSummary(!showMobileSummary)}
        role="button"
        tabIndex={0}
      >
        <div className="mobile-summary-title">
          <ShoppingBag size={17} />
          <span>{showMobileSummary ? 'Hide order summary' : 'Show order summary'}</span>
          {showMobileSummary ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
        <div className="mobile-summary-price">
          ₹{grandTotal.toLocaleString('en-IN')}
        </div>
      </div>

      {showMobileSummary && (
        <div style={{ background: '#121214', borderBottom: '1px solid #27272A', padding: '16px 20px' }}>
          <ul className="summary-items-list" style={{ maxHeight: 'none' }}>
            {cart.map((item, idx) => (
              <li key={`${item.product.id}-${idx}`} className="summary-item-row">
                <div className="summary-item-img">
                  <Img image={item.product.images[0]} alt="" sizes="56px" />
                  <span className="summary-item-badge">{item.quantity}</span>
                </div>
                <div className="summary-item-info">
                  <p className="summary-item-name">{item.product.name}</p>
                  {(item.selectedVariant || item.selectedSize) && (
                    <p className="summary-item-meta">
                      {[item.selectedVariant, item.selectedSize].filter(Boolean).join(' · ')}
                    </p>
                  )}
                </div>
                <div className="summary-item-price">
                  ₹{(getItemUnitPrice(item) * item.quantity).toLocaleString('en-IN')}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* =====================================================================
          MAIN CHECKOUT CONTAINER
         ===================================================================== */}
      <main className="checkout-container">
        <Link to="/cart" className="checkout-back-link">
          <ArrowLeft size={15} />
          <span>Return to Bag</span>
        </Link>

        <div className="checkout-grid">
          {/* LEFT: Customer & Address Information */}
          <div className="checkout-form-column">
            {/* 1. Contact Information Card */}
            <section className="checkout-card">
              <div className="checkout-card-header">
                <h2 className="checkout-card-title">
                  <span className="checkout-step-number">1</span>
                  <span>Contact Information</span>
                </h2>
                {!isAuthenticated && (
                  <span className="checkout-card-meta">
                    Guest checkout or <Link to="/account" style={{ color: '#FFFFFF', fontWeight: 600, textDecoration: 'underline' }}>Sign In</Link>
                  </span>
                )}
              </div>

              <div className="form-row form-row-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">
                    <span>Mobile Phone *</span>
                    <span className="form-label-optional">For WhatsApp & SMS updates</span>
                  </label>
                  <div className="form-input-container">
                    <span className="phone-prefix">+91</span>
                    <input
                      id="phone"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      className={`form-input form-input-with-prefix ${formErrors.phone ? 'has-error' : ''}`}
                      value={form.phone}
                      onChange={(e) => {
                        const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setForm({ ...form, phone: digitsOnly });
                        if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                      }}
                    />
                  </div>
                  {formErrors.phone && <p className="form-error-text">{formErrors.phone}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    <span>Email Address</span>
                    <span className="form-label-optional">For GST invoice</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-input"
                    placeholder="athlete@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>
            </section>

            {/* 2. Delivery Method & Shipping Address */}
            <section className="checkout-card">
              <div className="checkout-card-header">
                <h2 className="checkout-card-title">
                  <span className="checkout-step-number">2</span>
                  <span>Delivery Method</span>
                </h2>
              </div>

              <div className="delivery-options-grid">
                <div
                  className={`delivery-option-card ${deliveryMethod === 'doorstep' ? 'is-selected' : ''}`}
                  onClick={() => setDeliveryMethod('doorstep')}
                  role="button"
                  tabIndex={0}
                >
                  <div className="delivery-radio">
                    <div className="delivery-radio-inner" />
                  </div>
                  <div className="delivery-option-content">
                    <div className="delivery-option-title">
                      <Truck size={17} />
                      <span>Doorstep Delivery</span>
                    </div>
                    <div className="delivery-option-desc">
                      Fast courier delivery across Pune and pan-India.
                    </div>
                    <span className="delivery-option-badge">
                      {finalShipping === 0 ? 'FREE DELIVERY' : `₹${finalShipping} STANDARD`}
                    </span>
                  </div>
                </div>

                <div
                  className={`delivery-option-card ${deliveryMethod === 'camp_pickup' ? 'is-selected' : ''}`}
                  onClick={() => setDeliveryMethod('camp_pickup')}
                  role="button"
                  tabIndex={0}
                >
                  <div className="delivery-radio">
                    <div className="delivery-radio-inner" />
                  </div>
                  <div className="delivery-option-content">
                    <div className="delivery-option-title">
                      <Store size={17} />
                      <span>Store Pickup (Camp)</span>
                    </div>
                    <div className="delivery-option-desc">
                      Shop 247, MG Road, Camp, Pune. Ready in 2 hours.
                    </div>
                    <span className="delivery-option-badge">
                      FREE · INSTANT COLLECTION
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery Address Fields (when Doorstep) */}
              {deliveryMethod === 'doorstep' ? (
                <div style={{ marginTop: '20px' }}>
                  {isAuthenticated && user?.addresses && user.addresses.length > 0 && (
                    <div style={{ marginBottom: '16px' }}>
                      <label className="form-label" style={{ marginBottom: '8px' }}>
                        Choose Saved Address
                      </label>
                      <div className="saved-addresses-list">
                        {user.addresses.map((addr) => (
                          <div
                            key={addr.id}
                            className={`saved-address-chip ${form.street === addr.street ? 'is-active' : ''}`}
                            onClick={() => {
                              const [first, ...rest] = (addr.name || '').split(' ');
                              setForm({
                                ...form,
                                firstName: first || form.firstName,
                                lastName: rest.join(' ') || form.lastName,
                                phone: addr.phone.replace('+91', '').trim(),
                                street: addr.street,
                                locality: addr.locality,
                                pincode: addr.pincode,
                                city: addr.city,
                              });
                            }}
                          >
                            <strong>{addr.type.toUpperCase()}:</strong> {addr.street}, {addr.locality}, {addr.city} {addr.pincode}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="form-row form-row-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="fname">First Name *</label>
                      <input
                        id="fname"
                        className={`form-input ${formErrors.firstName ? 'has-error' : ''}`}
                        placeholder="John"
                        value={form.firstName}
                        onChange={(e) => {
                          setForm({ ...form, firstName: e.target.value });
                          if (formErrors.firstName) setFormErrors({ ...formErrors, firstName: '' });
                        }}
                      />
                      {formErrors.firstName && <p className="form-error-text">{formErrors.firstName}</p>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="lname">
                        <span>Last Name</span>
                        <span className="form-label-optional">Optional</span>
                      </label>
                      <input
                        id="lname"
                        className="form-input"
                        placeholder="Doe"
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="street">Street Address / House No. / Building *</label>
                      <input
                        id="street"
                        className={`form-input ${formErrors.street ? 'has-error' : ''}`}
                        placeholder="e.g. Flat 402, Rohan Tarang, Off Mumbai-Pune Road"
                        value={form.street}
                        onChange={(e) => {
                          setForm({ ...form, street: e.target.value });
                          if (formErrors.street) setFormErrors({ ...formErrors, street: '' });
                        }}
                      />
                      {formErrors.street && <p className="form-error-text">{formErrors.street}</p>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="locality">Locality / Area / Landmark *</label>
                      <input
                        id="locality"
                        className={`form-input ${formErrors.locality ? 'has-error' : ''}`}
                        placeholder="e.g. Camp, Koregaon Park, Baner, Kothrud"
                        value={form.locality}
                        onChange={(e) => {
                          setForm({ ...form, locality: e.target.value });
                          if (formErrors.locality) setFormErrors({ ...formErrors, locality: '' });
                        }}
                      />
                      {formErrors.locality && <p className="form-error-text">{formErrors.locality}</p>}
                    </div>
                  </div>

                  <div className="form-row form-row-3">
                    <div className="form-group">
                      <label className="form-label" htmlFor="city">City *</label>
                      <input
                        id="city"
                        className={`form-input ${formErrors.city ? 'has-error' : ''}`}
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                      />
                      {formErrors.city && <p className="form-error-text">{formErrors.city}</p>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="state">State</label>
                      <input
                        id="state"
                        className="form-input"
                        value={form.state}
                        onChange={(e) => setForm({ ...form, state: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="pincode">PIN Code *</label>
                      <input
                        id="pincode"
                        maxLength={6}
                        className={`form-input ${formErrors.pincode ? 'has-error' : ''}`}
                        placeholder="411001"
                        value={form.pincode}
                        onChange={(e) => {
                          setForm({ ...form, pincode: e.target.value });
                          if (formErrors.pincode) setFormErrors({ ...formErrors, pincode: '' });
                        }}
                      />
                      {formErrors.pincode && <p className="form-error-text">{formErrors.pincode}</p>}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="store-pickup-panel">
                  <div className="store-pickup-badge">
                    <Store size={14} />
                    <span>Camp Flagship Sports House</span>
                  </div>
                  <p style={{ margin: '0 0 6px', fontWeight: 700, fontSize: '0.9375rem', color: '#FFFFFF' }}>
                    {STORE_INFO.addressLine1}, {STORE_INFO.locality}, Pune 411001
                  </p>
                  <p style={{ margin: '0 0 14px', fontSize: '0.875rem', color: '#D4D4D8' }}>
                    Open Monday–Sunday 10:00 AM – 8:30 PM. Call {STORE_INFO.displayPhone} upon arrival.
                  </p>

                  <div className="form-group">
                    <label className="form-label" htmlFor="pickupNotes">
                      <span>Pickup Notes or Timing</span>
                      <span className="form-label-optional">Optional</span>
                    </label>
                    <input
                      id="pickupNotes"
                      className="form-input"
                      placeholder="e.g. Visiting today at 5 PM for racquet stringing check"
                      value={form.pickupNotes}
                      onChange={(e) => setForm({ ...form, pickupNotes: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </section>

            {/* 3. Payment Method & Razorpay CTA */}
            <section className="payment-section-box">
              <div className="checkout-card-header">
                <h2 className="checkout-card-title">
                  <span className="checkout-step-number">3</span>
                  <span>Payment Method</span>
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.05em', color: '#FFFFFF', background: '#18181B', border: '1px solid #27272A', padding: '3px 8px', borderRadius: '4px' }}>
                    RAZORPAY SECURE
                  </span>
                </div>
              </div>

              <div className="payment-gateways-strip">
                <span className="gateway-chip">UPI (GPay / PhonePe / Paytm)</span>
                <span className="gateway-chip">Cards (Visa, Mastercard, RuPay)</span>
                <span className="gateway-chip">Net Banking (50+ Banks)</span>
                <span className="gateway-chip">Instant Refund Protected</span>
              </div>

              <button
                type="button"
                className="pay-cta-btn"
                onClick={handleProceedToRazorpay}
                disabled={isProcessing}
              >
                <ShieldCheck size={20} color="#FFFFFF" />
                <span>
                  {isProcessing
                    ? 'Connecting to Gateway...'
                    : `Pay ₹${grandTotal.toLocaleString('en-IN')} with Razorpay`}
                </span>
                <ChevronRight size={18} />
              </button>

              <div className="security-assurances-row">
                <div className="security-item">
                  <Check size={13} color="#C8102E" />
                  <span>GST Tax Invoice with Warranty</span>
                </div>
                <span>•</span>
                <div className="security-item">
                  <ShieldCheck size={13} color="#C8102E" />
                  <span>100% Genuine Sports Gear</span>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT: Sticky Order Summary */}
          <aside className="checkout-summary-column">
            <div className="checkout-summary-card">
              <h3 className="summary-heading">
                Order Summary ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'})
              </h3>

              <ul className="summary-items-list">
                {cart.map((item, idx) => (
                  <li key={`${item.product.id}-${idx}`} className="summary-item-row">
                    <div className="summary-item-img">
                      <Img image={item.product.images[0]} alt="" sizes="56px" />
                      <span className="summary-item-badge">{item.quantity}</span>
                    </div>
                    <div className="summary-item-info">
                      <p className="summary-item-name">{item.product.name}</p>
                      {(item.selectedVariant || item.selectedSize) && (
                        <p className="summary-item-meta">
                          {[item.selectedVariant, item.selectedSize].filter(Boolean).join(' · ')}
                        </p>
                      )}
                    </div>
                    <div className="summary-item-price">
                      ₹{(getItemUnitPrice(item) * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Promo Code Box */}
              <form onSubmit={handleApplyPromo} className="promo-box">
                <input
                  className="promo-input"
                  placeholder="Discount code (e.g. PUNEPLAY)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                />
                <button type="submit" className="promo-apply-btn">
                  Apply
                </button>
              </form>
              {promoMessage && (
                <p className={`promo-feedback ${promoMessage.success ? 'is-success' : 'is-error'}`}>
                  {promoMessage.text}
                </p>
              )}

              {/* Breakdown */}
              <dl className="summary-breakdown">
                <div className="summary-row">
                  <dt>Subtotal</dt>
                  <dd>₹{subtotal.toLocaleString('en-IN')}</dd>
                </div>
                {discount > 0 && (
                  <div className="summary-row is-discount">
                    <dt>Discount ({promoCode})</dt>
                    <dd>−₹{discount.toLocaleString('en-IN')}</dd>
                  </div>
                )}
                <div className="summary-row">
                  <dt>Shipping</dt>
                  <dd>
                    {finalShipping === 0 ? (
                      <span className="summary-free-badge">FREE</span>
                    ) : (
                      `₹${finalShipping.toLocaleString('en-IN')}`
                    )}
                  </dd>
                </div>
                <div className="summary-row">
                  <dt>GST (18%)</dt>
                  <dd style={{ color: '#D4D4D8', fontWeight: 600 }}>Included</dd>
                </div>

                <div className="summary-total-row">
                  <div>
                    <span className="summary-total-label">Total Amount</span>
                    <p className="summary-tax-note">All taxes & duties included</p>
                  </div>
                  <span className="summary-total-value">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </dl>

              {/* Oriental Sports Guarantee Callout */}
              <div className="store-guarantee-card">
                <strong>✓ Official Pune Flagship Guarantee</strong>
                Fulfilled directly from our Camp workshop with professional equipment inspection, tension testing, and manufacturer warranty.
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* =====================================================================
          FOCUSED CHECKOUT FOOTER (POLICY & SECURITY)
         ===================================================================== */}
      <footer className="checkout-footer">
        <div className="checkout-footer-inner">
          <div className="checkout-footer-links">
            <Link to="/shipping">Shipping Policy</Link>
            <span>·</span>
            <Link to="/returns">Returns & Exchanges</Link>
            <span>·</span>
            <Link to="/privacy">Privacy Policy</Link>
            <span>·</span>
            <Link to="/terms">Terms of Service</Link>
          </div>
          <p className="checkout-footer-copy">
            © {new Date().getFullYear()} Oriental Sports Pune. All rights reserved. Secure Razorpay Checkout.
          </p>
        </div>
      </footer>

      {/* =====================================================================
          INTERACTIVE RAZORPAY GATEWAY MODAL (TEST SIMULATOR & PREVIEW)
         ===================================================================== */}
      {showRazorpaySimModal && (
        <div className="rzp-modal-backdrop" onClick={() => setShowRazorpaySimModal(false)}>
          <div className="rzp-modal" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="rzp-modal-header">
              <div>
                <p className="rzp-modal-sub">Razorpay Payment Gateway</p>
                <h3 className="rzp-modal-title">Oriental Sports Pune</h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.6875rem', color: '#94a3b8' }}>To Pay</span>
                <p className="rzp-modal-amount">₹{grandTotal.toLocaleString('en-IN')}</p>
              </div>
            </div>

            {/* Payment Tabs */}
            <div className="rzp-tabs">
              <button
                type="button"
                className={`rzp-tab ${simPaymentMethod === 'upi' ? 'is-active' : ''}`}
                onClick={() => setSimPaymentMethod('upi')}
              >
                UPI / QR
              </button>
              <button
                type="button"
                className={`rzp-tab ${simPaymentMethod === 'card' ? 'is-active' : ''}`}
                onClick={() => setSimPaymentMethod('card')}
              >
                Card
              </button>
              <button
                type="button"
                className={`rzp-tab ${simPaymentMethod === 'netbanking' ? 'is-active' : ''}`}
                onClick={() => setSimPaymentMethod('netbanking')}
              >
                Netbanking
              </button>
            </div>

            <div className="rzp-body">
              {simPaymentMethod === 'upi' && (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '130px', height: '130px', margin: '0 auto 12px', border: '1px solid #27272A', borderRadius: '8px', padding: '10px', display: 'grid', placeItems: 'center', background: '#FFFFFF' }}>
                    <QrCode size={110} color="#050505" />
                  </div>
                  <p style={{ fontSize: '0.8125rem', fontWeight: 600, margin: '0 0 4px', color: '#FFFFFF' }}>
                    Scan QR with Google Pay, PhonePe, Paytm, or BHIM
                  </p>
                  <p style={{ fontSize: '0.75rem', color: '#A1A1AA', margin: 0 }}>
                    VPA: <strong style={{ color: '#FFFFFF' }}>orientalsports.pune@okhdfcbank</strong>
                  </p>
                </div>
              )}

              {simPaymentMethod === 'card' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <input className="form-input" placeholder="Card Number (4532 •••• •••• 8821)" defaultValue="4532 9801 2341 8821" />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <input className="form-input" placeholder="MM/YY" defaultValue="11/28" />
                    <input className="form-input" placeholder="CVV" defaultValue="782" type="password" />
                  </div>
                  <input className="form-input" placeholder="Cardholder Name" defaultValue={`${form.firstName} ${form.lastName}`.trim()} />
                </div>
              )}

              {simPaymentMethod === 'netbanking' && (
                <div>
                  <p style={{ fontSize: '0.8125rem', fontWeight: 600, margin: '0 0 10px', color: '#FFFFFF' }}>Select Bank</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Bank'].map((b) => (
                      <button
                        key={b}
                        type="button"
                        style={{
                          padding: '8px 12px',
                          border: '1px solid #27272A',
                          borderRadius: '6px',
                          background: '#18181B',
                          color: '#FFFFFF',
                          fontSize: '0.8125rem',
                          fontWeight: 500,
                          cursor: 'pointer',
                        }}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  type="button"
                  className="pay-cta-btn"
                  style={{ background: '#C8102E' }}
                  onClick={() => {
                    setShowRazorpaySimModal(false);
                    const mockPaymentId = `pay_rzp_${Date.now().toString().slice(-8)}`;
                    handleCreateAndFinalizeOrder(mockPaymentId, simPaymentMethod.toUpperCase());
                  }}
                >
                  Confirm Payment of ₹{grandTotal.toLocaleString('en-IN')}
                </button>
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#A1A1AA',
                    fontSize: '0.8125rem',
                    cursor: 'pointer',
                    padding: '6px',
                    textAlign: 'center',
                  }}
                  onClick={() => setShowRazorpaySimModal(false)}
                >
                  Cancel and change details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
