import React, { useState } from 'react';
import { Order } from '../../types/auth';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';
import { STORE_INFO } from '../../data/storeInfo';
import {
  Package,
  CheckCircle2,
  Clock,
  Truck,
  ExternalLink,
  RotateCcw,
  FileText,
  MessageCircle,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface OrderTrackerProps {
  order: Order;
  defaultExpanded?: boolean;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({ order, defaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [copiedTracking, setCopiedTracking] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const { addToCart, openCart } = useCart();

  const handleCopyTracking = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (order.trackingNumber) {
      navigator.clipboard.writeText(order.trackingNumber);
      setCopiedTracking(true);
      setTimeout(() => setCopiedTracking(false), 2000);
    }
  };

  const handleReorder = (e: React.MouseEvent) => {
    e.stopPropagation();
    order.items.forEach((item) => {
      const prod = PRODUCTS.find((p) => p.id === item.productId || p.slug === item.productSlug);
      if (prod) {
        addToCart(prod, item.quantity, item.selectedVariant);
      }
    });
    openCart();
  };

  const statusColorMap: Record<Order['status'], { bg: string; text: string; border: string }> = {
    confirmed: { bg: 'var(--color-canvas-subtle, #F7F5EE)', text: 'var(--color-ink)', border: 'var(--color-brand-gold)' },
    processing: { bg: 'var(--color-canvas-subtle, #F7F5EE)', text: 'var(--color-ink)', border: 'var(--color-brand-gold-soft)' },
    shipped: { bg: 'var(--color-canvas-subtle, #F7F5EE)', text: 'var(--color-ink)', border: 'var(--color-brand-gold)' },
    out_for_delivery: { bg: 'var(--color-canvas-subtle, #F7F5EE)', text: 'var(--color-ink)', border: 'var(--color-brand-gold)' },
    delivered: { bg: 'var(--color-ink)', text: 'var(--color-canvas-base)', border: 'var(--color-ink)' },
    cancelled: { bg: '#F5F5F5', text: '#777777', border: '#DDDDDD' },
  };

  const currentStatusStyle = statusColorMap[order.status] || statusColorMap.delivered;

  const whatsappInquiryUrl = `https://wa.me/${STORE_INFO.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Hello Oriental Sports Camp Pune team! I'm inquiring about my order ${order.orderNumber} (₹${order.totalAmount.toLocaleString('en-IN')}). Could you assist with status updates?`
  )}`;

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '6px',
        border: '1px solid var(--color-ivory-border)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        overflow: 'hidden',
        transition: 'border-color 0.2s ease',
      }}
    >
      {/* Order Summary Header Bar */}
      <div
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid #F3F4F6',
          backgroundColor: '#FAFAFA',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>
              Order Placed
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827' }}>
              {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
          </div>

          <div style={{ height: '24px', width: '1px', backgroundColor: '#E5E7EB' }} className="desktop-only" />

          <div>
            <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>
              Total Amount
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--color-ink)' }}>
              ₹{order.totalAmount.toLocaleString('en-IN')}
            </div>
          </div>

          <div style={{ height: '24px', width: '1px', backgroundColor: '#E5E7EB' }} className="desktop-only" />

          <div>
            <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>
              Ship To
            </div>
            <div style={{ fontSize: '0.875rem', color: '#374151' }}>
              {order.shippingAddress.name} ({order.shippingAddress.locality})
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              padding: '4px 10px',
              borderRadius: '9999px',
              backgroundColor: currentStatusStyle.bg,
              color: currentStatusStyle.text,
              border: `1px solid ${currentStatusStyle.border}`,
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <CheckCircle2 size={13} />
            <span>{order.statusLabel}</span>
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              background: 'none',
              border: 'none',
              color: '#4B5563',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.8125rem',
              fontWeight: 600,
              padding: '4px 8px',
            }}
          >
            <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Main Order Content */}
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Package size={18} color="var(--color-brand-gold)" />
            <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--color-ink)' }}>
              {order.orderNumber}
            </span>
          </div>

          {order.trackingNumber && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', color: '#4B5563' }}>
              <span>Carrier: <strong>{order.carrier}</strong></span>
              <span>•</span>
              <span>AWB: <strong>{order.trackingNumber}</strong></span>
              <button
                type="button"
                onClick={handleCopyTracking}
                title="Copy tracking code"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: copiedTracking ? '#10B981' : '#6B7280',
                  padding: '2px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {copiedTracking ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          )}
        </div>

        {/* Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
          {order.items.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                paddingBottom: '14px',
                borderBottom: idx < order.items.length - 1 ? '1px solid #F3F4F6' : 'none',
              }}
            >
              <img
                src={item.productImage}
                alt={item.productName}
                style={{
                  width: '64px',
                  height: '64px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  backgroundColor: '#F3F4F6',
                }}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-ink)' }}>
                  {item.productName}
                </h4>
                {item.selectedVariant && (
                  <span style={{ fontSize: '0.75rem', color: '#6B7280', display: 'block', marginTop: '2px' }}>
                    Specification: {item.selectedVariant}
                  </span>
                )}
                <div style={{ fontSize: '0.8125rem', color: '#374151', marginTop: '4px' }}>
                  Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}
                </div>
              </div>
              <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: 'var(--color-ink)' }}>
                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
              </div>
            </div>
          ))}
        </div>

        {/* Action bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '16px',
            borderTop: '1px solid #F3F4F6',
          }}
        >
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleReorder}
              className="btn btn-outline-dark btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}
            >
              <RotateCcw size={14} />
              <span>BUY AGAIN</span>
            </button>

            <button
              type="button"
              onClick={() => setShowInvoiceModal(true)}
              className="btn btn-outline-dark btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}
            >
              <FileText size={14} />
              <span>TAX INVOICE</span>
            </button>
          </div>

          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-gold btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}
          >
            <MessageCircle size={14} />
            <span>CAMP STORE SUPPORT</span>
          </a>
        </div>

        {/* Expanded Tracking Timeline & Delivery Details */}
        {isExpanded && (
          <div
            style={{
              marginTop: '24px',
              paddingTop: '20px',
              borderTop: '1px dashed #E5E7EB',
              animation: 'fadeIn 0.2s ease-out',
            }}
          >
            <h5
              style={{
                fontSize: '0.8125rem',
                fontWeight: 800,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: 'var(--color-plate-gold)',
                marginBottom: '16px',
              }}
            >
              Live Dispatch & Restringing Progress
            </h5>

            {/* Timeline Stepper */}
            <div style={{ position: 'relative', paddingLeft: '28px', marginBottom: '24px' }}>
              <div
                style={{
                  position: 'absolute',
                  left: '11px',
                  top: '8px',
                  bottom: '8px',
                  width: '2px',
                  backgroundColor: '#E5E7EB',
                }}
              />

              {order.timeline.map((step, sIdx) => {
                const isPast = step.completed;
                const isCurr = step.current;

                return (
                  <div key={sIdx} style={{ position: 'relative', marginBottom: sIdx === order.timeline.length - 1 ? 0 : '20px' }}>
                    {/* Circle Node */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '-28px',
                        top: '2px',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: isCurr
                          ? 'var(--color-brand-gold)'
                          : isPast
                          ? 'var(--color-ink)'
                          : '#FFFFFF',
                        border: isCurr
                          ? '2px solid #FFFFFF'
                          : isPast
                          ? 'none'
                          : '2px solid #D1D5DB',
                        boxShadow: isCurr ? '0 0 0 3px rgba(201, 162, 39, 0.25)' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isPast ? 'var(--color-canvas-base)' : '#FFFFFF',
                      }}
                    >
                      {isPast ? <Check size={14} /> : isCurr ? <Clock size={13} /> : null}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.875rem', color: isCurr ? 'var(--color-brand-gold)' : '#111827' }}>
                          {step.title}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                          {step.date}
                        </span>
                      </div>
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.8125rem', color: '#4B5563', lineHeight: 1.4 }}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Delivery address & payment breakdown card */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '16px',
                backgroundColor: '#F9FAFB',
                padding: '16px',
                borderRadius: '4px',
                fontSize: '0.8125rem',
              }}
            >
              <div>
                <strong style={{ color: '#111827', display: 'block', marginBottom: '4px' }}>
                  Delivery Destination
                </strong>
                <div>{order.shippingAddress.name}</div>
                <div>{order.shippingAddress.street}</div>
                <div>{order.shippingAddress.locality}, {order.shippingAddress.city} - {order.shippingAddress.pincode}</div>
                <div>Phone: {order.shippingAddress.phone}</div>
              </div>

              <div>
                <strong style={{ color: '#111827', display: 'block', marginBottom: '4px' }}>
                  Payment & Invoice
                </strong>
                <div>Payment Mode: <strong>{order.paymentMethod}</strong></div>
                <div>Subtotal: ₹{order.subtotal.toLocaleString('en-IN')}</div>
                <div>GST (Included): ₹{order.tax.toLocaleString('en-IN')}</div>
                <div>Shipping: {order.shipping === 0 ? <span style={{ color: '#10B981', fontWeight: 700 }}>FREE Expedited</span> : `₹${order.shipping}`}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tax Invoice Modal */}
      {showInvoiceModal && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={() => setShowInvoiceModal(false)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '6px',
              maxWidth: '600px',
              width: '100%',
              padding: '24px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid var(--color-ink)', paddingBottom: '16px', marginBottom: '16px' }}>
              <div>
                <h3 className="font-display" style={{ margin: 0, fontSize: '1.375rem', color: 'var(--color-ink)' }}>
                  ORIENTAL SPORTS
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                  Shop 247, MG Road, New Modikhana, Camp, Pune - 411001
                </span>
                {/* GSTIN / CIN intentionally omitted: the previous values were placeholders, not
                    the business's registration numbers. Add the real ones before issuing invoices. */}
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ backgroundColor: 'var(--color-plate-gold)', color: 'var(--color-ink)', fontWeight: 800, fontSize: '0.6875rem', padding: '2px 8px', borderRadius: '2px' }}>
                  TAX INVOICE
                </span>
                <div style={{ fontSize: '0.875rem', fontWeight: 800, marginTop: '4px' }}>
                  {order.orderNumber}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                  Date: {order.date}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '16px', fontSize: '0.8125rem' }}>
              <strong>Billed To:</strong>
              <div>{order.shippingAddress.name}</div>
              <div>{order.shippingAddress.street}, {order.shippingAddress.locality}, {order.shippingAddress.city} - {order.shippingAddress.pincode}</div>
              <div>Phone: {order.shippingAddress.phone}</div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', marginBottom: '16px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F3F4F6', borderBottom: '1px solid #D1D5DB' }}>
                  <th style={{ textAlign: 'left', padding: '8px' }}>Description</th>
                  <th style={{ textAlign: 'center', padding: '8px' }}>Qty</th>
                  <th style={{ textAlign: 'right', padding: '8px' }}>Rate</th>
                  <th style={{ textAlign: 'right', padding: '8px' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((it, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #E5E7EB' }}>
                    <td style={{ padding: '8px' }}>
                      <strong>{it.productName}</strong>
                      {it.selectedVariant && <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>{it.selectedVariant}</div>}
                    </td>
                    <td style={{ textAlign: 'center', padding: '8px' }}>{it.quantity}</td>
                    <td style={{ textAlign: 'right', padding: '8px' }}>₹{it.price.toLocaleString('en-IN')}</td>
                    <td style={{ textAlign: 'right', padding: '8px' }}>₹{(it.price * it.quantity).toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} style={{ textAlign: 'right', padding: '8px', fontWeight: 700 }}>Total:</td>
                  <td style={{ textAlign: 'right', padding: '8px', fontWeight: 800, color: 'var(--color-ink)' }}>
                    ₹{order.totalAmount.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tfoot>
            </table>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => window.print()}
                className="btn btn-outline-dark btn-sm"
              >
                PRINT / SAVE PDF
              </button>
              <button
                type="button"
                onClick={() => setShowInvoiceModal(false)}
                className="btn btn-primary btn-sm"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
