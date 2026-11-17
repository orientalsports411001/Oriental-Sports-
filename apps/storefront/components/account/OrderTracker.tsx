'use client';

import React, { useState } from 'react';
import { Order } from '@/types/auth';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { STORE_INFO } from '@/data/storeInfo';
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
  AlertCircle,
  XCircle,
  X,
} from 'lucide-react';

interface OrderTrackerProps {
  order: Order;
  defaultExpanded?: boolean;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({ order, defaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [copiedTracking, setCopiedTracking] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showConfirmCancelModal, setShowConfirmCancelModal] = useState(false);
  const [showBlockedCancelModal, setShowBlockedCancelModal] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);
  const [cancelSuccessFeedback, setCancelSuccessFeedback] = useState<string | null>(null);

  const { addToCart, openCart } = useCart();
  const { cancelOrder } = useAuth();

  const isShippedOrDispatched = (status?: string) => {
    const s = (status || order.status || '').toLowerCase().trim();
    return ['dispatched', 'shipped', 'in_transit', 'out_for_delivery', 'delivered', 'ready_for_pickup'].includes(s);
  };

  const handleCancelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCancelError(null);
    if (isShippedOrDispatched(order.status)) {
      setShowBlockedCancelModal(true);
    } else {
      setShowConfirmCancelModal(true);
    }
  };

  const handleConfirmCancel = async () => {
    setIsCancelling(true);
    setCancelError(null);
    try {
      const res = await cancelOrder(order.orderNumber || order.id);
      if (res.success) {
        setShowConfirmCancelModal(false);
        setCancelSuccessFeedback('Order cancelled successfully.');
        setTimeout(() => setCancelSuccessFeedback(null), 4000);
      } else if (res.error === 'no_cancel_after_shipping') {
        setShowConfirmCancelModal(false);
        setShowBlockedCancelModal(true);
      } else {
        setCancelError(res.error || 'Failed to cancel order.');
      }
    } catch (err: any) {
      setCancelError(err?.message || 'Network error while cancelling order.');
    } finally {
      setIsCancelling(false);
    }
  };

  const handleCopyTracking = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (order.trackingNumber) {
      navigator.clipboard.writeText(order.trackingNumber);
      setCopiedTracking(true);
      setTimeout(() => setCopiedTracking(false), 2000);
    }
  };

  const [isReordering, setIsReordering] = useState(false);

  // "Buy again" needs full Product objects (variants, images, slug) to hand
  // to addToCart — order.items only carries a point-in-time snapshot
  // (name/image/price at purchase time), so the current catalogue is looked
  // up by id via the by-ids route handler rather than the static
  // data/products.ts array, which would miss anything added after launch
  // and could resurrect a now-archived product.
  const handleReorder = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const productIds = order.items.map((item) => item.productId).filter(Boolean);
    if (productIds.length === 0) return;

    setIsReordering(true);
    try {
      const res = await fetch('/api/products/by-ids', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: productIds }),
      });
      const data = res.ok ? await res.json() : { products: [] };
      const products: Product[] = Array.isArray(data.products) ? data.products : [];
      const productById = new Map(products.map((p) => [p.id, p]));

      order.items.forEach((item) => {
        const prod = productById.get(item.productId);
        if (prod) {
          addToCart(prod, item.quantity, item.selectedVariant);
        }
      });
      if (productById.size > 0) openCart();
    } finally {
      setIsReordering(false);
    }
  };

  const statusColorMap: Record<Order['status'], { bg: string; text: string; border: string }> = {
    confirmed: { bg: 'rgba(59, 130, 246, 0.15)', text: '#60A5FA', border: 'rgba(59, 130, 246, 0.3)' },
    processing: { bg: 'rgba(245, 158, 11, 0.15)', text: '#FBBF24', border: 'rgba(245, 158, 11, 0.3)' },
    shipped: { bg: 'rgba(200, 16, 46, 0.15)', text: '#FF4D6D', border: 'rgba(200, 16, 46, 0.3)' },
    out_for_delivery: { bg: 'rgba(200, 16, 46, 0.2)', text: '#FF6B8B', border: 'rgba(200, 16, 46, 0.4)' },
    delivered: { bg: 'rgba(16, 185, 129, 0.15)', text: '#34D399', border: 'rgba(16, 185, 129, 0.3)' },
    cancelled: { bg: 'rgba(107, 114, 128, 0.15)', text: '#9CA3AF', border: 'rgba(107, 114, 128, 0.3)' },
  };

  const currentStatusStyle = statusColorMap[order.status] || statusColorMap.delivered;

  const whatsappInquiryUrl = `https://wa.me/${STORE_INFO.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Hello Oriental Sports Camp Pune team! I'm inquiring about my order ${order.orderNumber} (₹${order.totalAmount.toLocaleString('en-IN')}). Could you assist with status updates?`
  )}`;

  return (
    <div
      style={{
        backgroundColor: '#121212',
        borderRadius: '6px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        overflow: 'hidden',
        transition: 'border-color 0.2s ease',
      }}
    >
      {/* Order Summary Header Bar */}
      <div
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: '#181818',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase' }}>
              Order Placed
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#FFFFFF' }}>
              {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
          </div>

          <div style={{ height: '24px', width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.12)' }} className="desktop-only" />

          <div>
            <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase' }}>
              Total Amount
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#FFFFFF' }}>
              ₹{order.totalAmount.toLocaleString('en-IN')}
            </div>
          </div>

          <div style={{ height: '24px', width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.12)' }} className="desktop-only" />

          <div>
            <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase' }}>
              Ship To
            </div>
            <div style={{ fontSize: '0.875rem', color: '#D1D5DB' }}>
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
              color: '#9CA3AF',
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
            <Package size={18} color="#C8102E" />
            <span style={{ fontWeight: 800, fontSize: '1rem', color: '#FFFFFF' }}>
              {order.orderNumber}
            </span>
          </div>

          {order.trackingNumber && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', color: '#9CA3AF' }}>
              <span>Carrier: <strong style={{ color: '#FFFFFF' }}>{order.carrier}</strong></span>
              <span>•</span>
              <span>AWB: <strong style={{ color: '#FFFFFF' }}>{order.trackingNumber}</strong></span>
              <button
                type="button"
                onClick={handleCopyTracking}
                title="Copy tracking code"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: copiedTracking ? '#10B981' : '#9CA3AF',
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
                borderBottom: idx < order.items.length - 1 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
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
                  backgroundColor: '#1E1E1E',
                }}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 700, color: '#FFFFFF' }}>
                  {item.productName}
                </h4>
                {item.selectedVariant && (
                  <span style={{ fontSize: '0.75rem', color: '#9CA3AF', display: 'block', marginTop: '2px' }}>
                    Specification: {item.selectedVariant}
                  </span>
                )}
                <div style={{ fontSize: '0.8125rem', color: '#D1D5DB', marginTop: '4px' }}>
                  Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}
                </div>
              </div>
              <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: '#FFFFFF' }}>
                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
              </div>
            </div>
          ))}
        </div>

        {/* Cancellation Success Feedback */}
        {cancelSuccessFeedback && (
          <div
            style={{
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '6px',
              padding: '10px 14px',
              marginBottom: '14px',
              fontSize: '0.8125rem',
              color: '#34D399',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Check size={16} />
            <span>{cancelSuccessFeedback}</span>
          </div>
        )}

        {/* Action bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleReorder}
              disabled={isReordering}
              className="btn btn-outline-light btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', opacity: isReordering ? 0.6 : 1 }}
            >
              <RotateCcw size={14} />
              <span>{isReordering ? 'ADDING…' : 'BUY AGAIN'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowInvoiceModal(true)}
              className="btn btn-outline-light btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}
            >
              <FileText size={14} />
              <span>TAX INVOICE</span>
            </button>

            {/* Cancel Order Action */}
            {order.status === 'cancelled' ? (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  color: '#9CA3AF',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '4px',
                  padding: '8px 12px',
                  minHeight: '44px',
                }}
              >
                <XCircle size={14} color="#9CA3AF" />
                <span>CANCELLED</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={handleCancelClick}
                className="btn btn-outline-danger btn-sm"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  minHeight: '44px',
                  padding: '8px 14px',
                  color: '#EF4444',
                  backgroundColor: 'rgba(239, 68, 68, 0.06)',
                  border: '1px solid rgba(239, 68, 68, 0.35)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <XCircle size={14} />
                <span>CANCEL ORDER</span>
              </button>
            )}
          </div>

          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary btn-sm"
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
              borderTop: '1px dashed rgba(255, 255, 255, 0.15)',
              animation: 'fadeIn 0.2s ease-out',
            }}
          >
            <h5
              style={{
                fontSize: '0.8125rem',
                fontWeight: 800,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: '#C8102E',
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
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
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
                          ? '#C8102E'
                          : isPast
                          ? '#C8102E'
                          : '#1E1E1E',
                        border: isCurr
                          ? '2px solid #FFFFFF'
                          : isPast
                          ? 'none'
                          : '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: isCurr ? '0 0 0 3px rgba(200, 16, 46, 0.35)' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                      }}
                    >
                      {isPast ? <Check size={14} /> : isCurr ? <Clock size={13} /> : null}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.875rem', color: isCurr ? '#C8102E' : '#FFFFFF' }}>
                          {step.title}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>
                          {step.date}
                        </span>
                      </div>
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.8125rem', color: '#A3A3A3', lineHeight: 1.4 }}>
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
                backgroundColor: '#181818',
                padding: '16px',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                fontSize: '0.8125rem',
              }}
            >
              <div>
                <strong style={{ color: '#FFFFFF', display: 'block', marginBottom: '4px' }}>
                  Delivery Destination
                </strong>
                <div style={{ color: '#D1D5DB' }}>{order.shippingAddress.name}</div>
                <div style={{ color: '#9CA3AF' }}>{order.shippingAddress.street}</div>
                <div style={{ color: '#9CA3AF' }}>{order.shippingAddress.locality}, {order.shippingAddress.city} - {order.shippingAddress.pincode}</div>
                <div style={{ color: '#9CA3AF' }}>Phone: +91 {order.shippingAddress.phone}</div>
              </div>

              <div>
                <strong style={{ color: '#FFFFFF', display: 'block', marginBottom: '4px' }}>
                  Payment & Invoice
                </strong>
                <div style={{ color: '#D1D5DB' }}>Payment Mode: <strong style={{ color: '#FFFFFF' }}>{order.paymentMethod}</strong></div>
                <div style={{ color: '#9CA3AF' }}>Subtotal: ₹{order.subtotal.toLocaleString('en-IN')}</div>
                <div style={{ color: '#9CA3AF' }}>GST (Included): ₹{order.tax.toLocaleString('en-IN')}</div>
                <div style={{ color: '#9CA3AF' }}>Shipping: {order.shipping === 0 ? <span style={{ color: '#10B981', fontWeight: 700 }}>FREE Expedited</span> : `₹${order.shipping}`}</div>
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
            backgroundColor: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={() => setShowInvoiceModal(false)}
        >
          <div
            style={{
              backgroundColor: '#161616',
              borderRadius: '6px',
              maxWidth: '600px',
              width: '100%',
              padding: '24px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.6)',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #C8102E', paddingBottom: '16px', marginBottom: '16px' }}>
              <div>
                <h3 className="font-display" style={{ margin: 0, fontSize: '1.375rem', color: '#FFFFFF' }}>
                  ORIENTAL SPORTS
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>
                  Shop 247, MG Road, New Modikhana, Camp, Pune - 411001
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ backgroundColor: '#C8102E', color: '#FFFFFF', fontWeight: 800, fontSize: '0.6875rem', padding: '2px 8px', borderRadius: '2px' }}>
                  TAX INVOICE
                </span>
                <div style={{ fontSize: '0.875rem', fontWeight: 800, marginTop: '4px', color: '#FFFFFF' }}>
                  {order.orderNumber}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>
                  Date: {order.date}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '16px', fontSize: '0.8125rem', color: '#D1D5DB' }}>
              <strong style={{ color: '#FFFFFF' }}>Billed To:</strong>
              <div>{order.shippingAddress.name}</div>
              <div style={{ color: '#9CA3AF' }}>{order.shippingAddress.street}, {order.shippingAddress.locality}, {order.shippingAddress.city} - {order.shippingAddress.pincode}</div>
              <div style={{ color: '#9CA3AF' }}>Phone: +91 {order.shippingAddress.phone}</div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', marginBottom: '16px' }}>
              <thead>
                <tr style={{ backgroundColor: '#202020', borderBottom: '1px solid rgba(255, 255, 255, 0.15)' }}>
                  <th style={{ textAlign: 'left', padding: '8px', color: '#FFFFFF' }}>Description</th>
                  <th style={{ textAlign: 'center', padding: '8px', color: '#FFFFFF' }}>Qty</th>
                  <th style={{ textAlign: 'right', padding: '8px', color: '#FFFFFF' }}>Rate</th>
                  <th style={{ textAlign: 'right', padding: '8px', color: '#FFFFFF' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((it, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <td style={{ padding: '8px', color: '#FFFFFF' }}>
                      <strong>{it.productName}</strong>
                      {it.selectedVariant && <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{it.selectedVariant}</div>}
                    </td>
                    <td style={{ textAlign: 'center', padding: '8px', color: '#D1D5DB' }}>{it.quantity}</td>
                    <td style={{ textAlign: 'right', padding: '8px', color: '#D1D5DB' }}>₹{it.price.toLocaleString('en-IN')}</td>
                    <td style={{ textAlign: 'right', padding: '8px', color: '#FFFFFF', fontWeight: 700 }}>₹{(it.price * it.quantity).toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} style={{ textAlign: 'right', padding: '8px', fontWeight: 700, color: '#9CA3AF' }}>Total:</td>
                  <td style={{ textAlign: 'right', padding: '8px', fontWeight: 800, color: '#FFFFFF' }}>
                    ₹{order.totalAmount.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tfoot>
            </table>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => window.print()}
                className="btn btn-outline-light btn-sm"
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

      {/* Confirmation Modal: Pre-shipping cancellation */}
      {showConfirmCancelModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cancel-confirm-title"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '16px',
          }}
          onClick={() => !isCancelling && setShowConfirmCancelModal(false)}
        >
          <div
            style={{
              backgroundColor: '#181818',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '8px',
              width: '100%',
              maxWidth: '460px',
              padding: '24px',
              color: '#FFFFFF',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#EF4444',
                  }}
                >
                  <AlertCircle size={20} />
                </div>
                <div>
                  <h3 id="cancel-confirm-title" style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 800 }}>
                    Cancel Order?
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: '#9CA3AF', fontFamily: 'monospace' }}>
                    {order.orderNumber}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => !isCancelling && setShowConfirmCancelModal(false)}
                disabled={isCancelling}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9CA3AF',
                  cursor: isCancelling ? 'not-allowed' : 'pointer',
                  padding: '4px',
                  minHeight: '44px',
                  minWidth: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={18} />
              </button>
            </div>

            <p style={{ fontSize: '0.875rem', color: '#D1D5DB', lineHeight: 1.5, margin: '0 0 16px 0' }}>
              Are you sure you want to cancel this order? It hasn't shipped yet, so we will immediately stop workshop preparation and update the order status to Cancelled.
            </p>

            {cancelError && (
              <div
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '6px',
                  padding: '10px 12px',
                  marginBottom: '16px',
                  fontSize: '0.8125rem',
                  color: '#F87171',
                }}
              >
                {cancelError}
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setShowConfirmCancelModal(false)}
                disabled={isCancelling}
                className="btn btn-outline-light btn-sm"
                style={{
                  minHeight: '44px',
                  padding: '10px 18px',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  cursor: isCancelling ? 'not-allowed' : 'pointer',
                }}
              >
                Keep Order
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                disabled={isCancelling}
                className="btn btn-danger btn-sm"
                style={{
                  minHeight: '44px',
                  padding: '10px 20px',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  backgroundColor: '#DC2626',
                  borderColor: '#DC2626',
                  color: '#FFFFFF',
                  cursor: isCancelling ? 'wait' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                {isCancelling ? 'Cancelling...' : 'Yes, Cancel Order'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blocked Modal: Post-shipping restriction */}
      {showBlockedCancelModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cancel-blocked-title"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '16px',
          }}
          onClick={() => setShowBlockedCancelModal(false)}
        >
          <div
            style={{
              backgroundColor: '#181818',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '8px',
              width: '100%',
              maxWidth: '480px',
              padding: '24px',
              color: '#FFFFFF',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(245, 158, 11, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#F59E0B',
                  }}
                >
                  <Truck size={20} />
                </div>
                <div>
                  <h3 id="cancel-blocked-title" style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 800 }}>
                    Cancellation Not Available
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: '#9CA3AF', fontFamily: 'monospace' }}>
                    {order.orderNumber}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowBlockedCancelModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9CA3AF',
                  cursor: 'pointer',
                  padding: '4px',
                  minHeight: '44px',
                  minWidth: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                borderRadius: '6px',
                padding: '12px 14px',
                marginBottom: '16px',
                fontSize: '0.875rem',
                lineHeight: 1.5,
                color: '#FEF3C7',
              }}
            >
              <strong style={{ display: 'block', marginBottom: '2px', color: '#FBBF24' }}>
                No cancellations after shipping
              </strong>
              This order has already been dispatched with <strong>{order.carrier || 'DTDC Express Pune'}</strong>{order.trackingNumber ? ` (AWB: ${order.trackingNumber})` : ''} and is currently in transit.
            </div>

            <p style={{ fontSize: '0.8125rem', color: '#9CA3AF', lineHeight: 1.5, margin: '0 0 20px 0' }}>
              Per Oriental Sports dispatch policy, shipments cannot be intercepted or cancelled once handed over to the courier. If you need a replacement, return, or stringing modification upon delivery, please contact our Camp Store team.
            </p>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setShowBlockedCancelModal(false)}
                className="btn btn-outline-light btn-sm"
                style={{
                  minHeight: '44px',
                  padding: '10px 18px',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                }}
              >
                Understood
              </button>
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-sm"
                style={{
                  minHeight: '44px',
                  padding: '10px 18px',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <MessageCircle size={14} />
                <span>Camp Store Support</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
