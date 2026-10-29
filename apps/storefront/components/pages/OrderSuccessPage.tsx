'use client';

import React from 'react';
import { useSearchParams, Link, useNavigate } from '@/lib/router-shim';
import {
  CheckCircle2,
  Package,
  MapPin,
  CreditCard,
  ArrowRight,
  Printer,
  ShoppingBag,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Order } from '@/types/auth';
import { STORE_INFO } from '@/data/storeInfo';
import { Img } from '@/components/ui/Img';

export const OrderSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Order was just written server-side (see /api/razorpay/verify); we only
  // have its order number, so look it up from the signed-in user's orders
  // (loaded from Supabase), falling back to their most recent order.
  const orderNumber = searchParams.get('order');
  const order: Order | undefined =
    (orderNumber && user?.orders?.find((o) => o.orderNumber === orderNumber)) || user?.orders?.[0];

  if (!order) {
    return (
      <div className="order-success-page">
        <div className="order-success-container">
          <div className="order-success-empty">
            <h1 className="order-success-empty-title">No Active Order Found</h1>
            <p className="order-success-empty-desc">
              It looks like you haven’t placed an order in this session, or your session expired.
            </p>
            <Link to="/shop" className="order-btn-primary">
              <span>Explore Equipment</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="order-success-page">
      <div className="order-success-container">
        {/* 1. Success Hero Banner */}
        <section className="order-success-hero">
          <div className="order-success-icon-wrap" aria-hidden="true">
            <CheckCircle2 size={36} />
          </div>

          <div className="order-success-status-pill">
            <ShieldCheck size={13} />
            <span>Payment Verified via Razorpay</span>
          </div>

          <h1 className="order-success-title">
            Thank You for Your Order
          </h1>

          <p className="order-success-desc">
            Your order has been confirmed and logged with Oriental Sports Flagship Workshop. A confirmation invoice is ready.
          </p>

          <div className="order-success-reference-chip">
            <span>Order Reference:</span>
            <span className="order-success-ref-num">{order.orderNumber}</span>
          </div>
        </section>

        {/* 2. Order Metadata Grid */}
        <div className="order-success-grid">
          {/* Shipping / Pickup Box */}
          <div className="order-success-card">
            <div className="order-success-card-header">
              <MapPin size={18} color="var(--blood-crimson, #c8102e)" />
              <h2 className="order-success-card-title">Delivery Address</h2>
            </div>
            <div className="order-success-card-content">
              <p className="order-success-customer-name">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.locality}, {order.shippingAddress.city} – {order.shippingAddress.pincode}
              </p>
              <p>
                <span className="order-success-label">State: </span>
                <span className="order-success-strong">{order.shippingAddress.state}</span>
              </p>
              <p style={{ marginTop: '8px' }}>
                <span className="order-success-label">Phone: </span>
                <span className="order-success-strong">{order.shippingAddress.phone}</span>
              </p>
            </div>
          </div>

          {/* Payment & Logistics Box */}
          <div className="order-success-card">
            <div className="order-success-card-header">
              <CreditCard size={18} color="var(--blood-crimson, #c8102e)" />
              <h2 className="order-success-card-title">Payment & Dispatch</h2>
            </div>
            <div className="order-success-card-content">
              <p>
                <span className="order-success-label">Method: </span>
                <strong className="order-success-strong">{order.paymentMethod}</strong>
              </p>
              <p>
                <span className="order-success-label">Status: </span>
                <span className="order-status-badge">PAID & VERIFIED</span>
              </p>
              <p>
                <span className="order-success-label">Fulfillment Hub: </span>
                <strong className="order-success-strong">{STORE_INFO.addressLine1}, {STORE_INFO.locality}</strong>
              </p>
              <p>
                <span className="order-success-label">Courier: </span>
                <strong className="order-success-strong">{order.carrier}</strong> ({order.trackingNumber})
              </p>
            </div>
          </div>
        </div>

        {/* 3. Purchased Items Section */}
        <section className="order-success-items-card">
          <div className="order-success-card-header">
            <Package size={18} color="var(--blood-crimson, #c8102e)" />
            <h2 className="order-success-card-title">Items Purchased ({order.items.length})</h2>
          </div>

          <div className="order-success-items-list">
            {order.items.map((item, idx) => (
              <div key={idx} className="order-success-item-row">
                <div className="order-success-item-lhs">
                  <div className="order-success-item-img">
                    <Img
                      image={item.productImage}
                      alt={item.productName}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <h3 className="order-success-item-title">{item.productName}</h3>
                    <div className="order-success-item-meta">
                      {item.selectedVariant && <span>Variant: {item.selectedVariant} • </span>}
                      {item.selectedSize && <span>Size: {item.selectedSize} • </span>}
                      <span>Qty: {item.quantity}</span>
                    </div>
                  </div>
                </div>

                <div className="order-success-item-price">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="order-success-breakdown">
            <div className="order-success-breakdown-row">
              <span className="order-success-label">Subtotal</span>
              <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="order-success-breakdown-row">
              <span className="order-success-label">Shipping</span>
              <span>
                {order.shipping === 0 ? (
                  <span className="order-success-free-badge">FREE</span>
                ) : (
                  `₹${order.shipping.toLocaleString('en-IN')}`
                )}
              </span>
            </div>
            <div className="order-success-breakdown-row">
              <span className="order-success-label">GST (18% Included)</span>
              <span>₹{order.tax.toLocaleString('en-IN')}</span>
            </div>
            <div className="order-success-total-row">
              <span className="order-success-total-label">Total Paid via Razorpay</span>
              <span className="order-success-total-val">₹{order.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </section>

        {/* 4. Action Controls */}
        <div className="order-success-actions">
          <div className="order-success-actions-left">
            <Link to="/account" className="order-btn-primary">
              <span>View in My Orders</span>
              <ArrowRight size={17} />
            </Link>
            <Link to="/shop" className="order-btn-secondary">
              <ShoppingBag size={17} />
              <span>Continue Shopping</span>
            </Link>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="order-btn-ghost"
          >
            <Printer size={16} />
            <span>Print Tax Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
