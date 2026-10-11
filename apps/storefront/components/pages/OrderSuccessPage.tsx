'use client';

import React from 'react';
import { useSearchParams, Link, useNavigate } from '@/lib/router-shim';
import {
  CheckCircle2,
  Package,
  MapPin,
  Calendar,
  CreditCard,
  ArrowRight,
  Phone,
  Printer,
  ShoppingBag,
  ExternalLink,
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
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center', minHeight: '60vh' }}>
        <h1 className="display d-2" style={{ marginBottom: '16px' }}>No Active Order Found</h1>
        <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>
          It looks like you haven’t placed an order in this session, or your session expired.
        </p>
        <Link to="/shop" className="btn btn-primary">
          Explore Equipment <span className="btn-arrow" aria-hidden="true">→</span>
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="order-success-page" style={{ backgroundColor: 'var(--ivory)', minHeight: '100vh', padding: '48px 0 80px' }}>
      <div className="container" style={{ maxWidth: '880px', margin: '0 auto' }}>
        {/* Success Header Banner */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid var(--line)',
            borderRadius: '12px',
            padding: '36px 32px',
            marginBottom: '32px',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#e6f4ea',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              color: '#137333',
            }}
          >
            <CheckCircle2 size={36} />
          </div>

          <div
            style={{
              display: 'inline-block',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#137333',
              backgroundColor: '#e6f4ea',
              padding: '4px 12px',
              borderRadius: '999px',
              marginBottom: '12px',
            }}
          >
            Payment Verified via Razorpay
          </div>

          <h1 className="display d-2" style={{ margin: '0 0 10px', color: '#111111' }}>
            Thank You for Your Order
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.0625rem', maxWidth: '580px', margin: '0 auto 20px', lineHeight: 1.5 }}>
            Your order has been confirmed and logged with Oriental Sports Flagship Workshop. A confirmation invoice is ready.
          </p>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#f8f8f6',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '0.9375rem',
              fontWeight: 600,
              color: '#111111',
            }}
          >
            <span>Order Reference:</span>
            <span style={{ fontFamily: 'monospace', fontSize: '1.0625rem', letterSpacing: '0.05em', color: '#000' }}>
              {order.orderNumber}
            </span>
          </div>
        </div>

        {/* Order Details & Summary Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '32px',
          }}
        >
          {/* Shipping / Pickup Box */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--line)',
              borderRadius: '12px',
              padding: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: '#111' }}>
              <MapPin size={18} color="var(--primary)" />
              <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Delivery Address</h2>
            </div>
            <div style={{ fontSize: '0.9375rem', lineHeight: '1.6', color: '#333' }}>
              <p style={{ fontWeight: 600, margin: '0 0 4px', color: '#111' }}>{order.shippingAddress.name}</p>
              <p style={{ margin: '0 0 4px' }}>{order.shippingAddress.street}</p>
              <p style={{ margin: '0 0 4px' }}>
                {order.shippingAddress.locality}, {order.shippingAddress.city} – {order.shippingAddress.pincode}
              </p>
              <p style={{ margin: '0 0 4px', color: 'var(--muted)' }}>State: {order.shippingAddress.state}</p>
              <p style={{ margin: '8px 0 0', fontWeight: 500, color: '#111' }}>
                Phone: {order.shippingAddress.phone}
              </p>
            </div>
          </div>

          {/* Payment & Logistics Box */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--line)',
              borderRadius: '12px',
              padding: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: '#111' }}>
              <CreditCard size={18} color="#137333" />
              <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Payment & Dispatch</h2>
            </div>
            <div style={{ fontSize: '0.9375rem', lineHeight: '1.6', color: '#333' }}>
              <p style={{ margin: '0 0 8px' }}>
                <span style={{ color: 'var(--muted)' }}>Method: </span>
                <strong style={{ color: '#111' }}>{order.paymentMethod}</strong>
              </p>
              <p style={{ margin: '0 0 8px' }}>
                <span style={{ color: 'var(--muted)' }}>Status: </span>
                <span style={{ color: '#137333', fontWeight: 600 }}>Paid & Verified</span>
              </p>
              <p style={{ margin: '0 0 8px' }}>
                <span style={{ color: 'var(--muted)' }}>Fulfillment Hub: </span>
                <strong style={{ color: '#111' }}>{STORE_INFO.addressLine1}, {STORE_INFO.locality}</strong>
              </p>
              <p style={{ margin: '0', color: 'var(--muted)' }}>
                Courier: <strong>{order.carrier}</strong> ({order.trackingNumber})
              </p>
            </div>
          </div>
        </div>

        {/* Purchased Items List */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid var(--line)',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '32px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Package size={18} />
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: 0 }}>Items Purchased ({order.items.length})</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {order.items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '16px',
                  borderBottom: idx === order.items.length - 1 ? 'none' : '1px solid var(--line)',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      backgroundColor: '#f5f5f3',
                      flexShrink: 0,
                    }}
                  >
                    <Img
                      image={item.productImage}
                      alt={item.productName}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, margin: '0 0 4px', color: '#111' }}>
                      {item.productName}
                    </h3>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--muted)' }}>
                      {item.selectedVariant && <span>Variant: {item.selectedVariant} • </span>}
                      {item.selectedSize && <span>Size: {item.selectedSize} • </span>}
                      <span>Qty: {item.quantity}</span>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right', fontWeight: 700, fontSize: '1rem', color: '#111' }}>
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div
            style={{
              marginTop: '20px',
              paddingTop: '20px',
              borderTop: '2px solid var(--line)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--muted)' }}>
              <span>Subtotal</span>
              <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--muted)' }}>
              <span>Shipping</span>
              <span>{order.shipping === 0 ? 'FREE' : `₹${order.shipping.toLocaleString('en-IN')}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--muted)' }}>
              <span>GST (18% Included)</span>
              <span>₹{order.tax.toLocaleString('en-IN')}</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: '#111',
                paddingTop: '10px',
                borderTop: '1px solid var(--line)',
              }}
            >
              <span>Total Paid via Razorpay</span>
              <span style={{ color: '#137333' }}>₹{order.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link to="/account/orders" className="btn btn-primary btn-lg">
              View in My Orders <ArrowRight size={18} style={{ marginLeft: '6px' }} />
            </Link>
            <Link to="/shop" className="btn btn-secondary btn-lg">
              <ShoppingBag size={18} style={{ marginRight: '6px' }} /> Continue Shopping
            </Link>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="btn btn-ghost"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Printer size={16} /> Print Tax Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
