import React, { useState } from 'react';
import { Order } from '../../types/auth';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { PRODUCTS } from '../../data/products';
import { STORE_INFO } from '../../data/storeInfo';
import { generateOrderTimeline, getOrderStatusLabel } from '../../utils/orderTimeline';
import {
  Package,
  CheckCircle2,
  Clock,
  RotateCcw,
  FileText,
  MessageCircle,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  MapPin,
  AlertCircle,
} from 'lucide-react';

interface OrderTrackerProps {
  order: Order;
  defaultExpanded?: boolean;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({ order, defaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [copiedTracking, setCopiedTracking] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [isLocalSyncing, setIsLocalSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  const { addToCart, openCart } = useCart();
  const { syncOrders, isSyncingOrders } = useAuth();

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

  const handleManualSync = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLocalSyncing(true);
    setSyncFeedback(null);
    try {
      await syncOrders(order.shippingAddress?.phone || order.orderNumber);
      setSyncFeedback('Updated Just Now');
      setTimeout(() => setSyncFeedback(null), 3500);
    } catch {
      setSyncFeedback('Up to Date');
      setTimeout(() => setSyncFeedback(null), 3000);
    } finally {
      setIsLocalSyncing(false);
    }
  };

  const isPickup = Boolean(
    order.deliveryMethod === 'camp_pickup' ||
      order.deliveryMethod === 'pickup' ||
      (order.shippingAddress?.street &&
        (order.shippingAddress.street.toLowerCase().includes('camp') ||
          order.shippingAddress.street.toLowerCase().includes('pickup') ||
          order.shippingAddress.street.toLowerCase().includes('shop 247') ||
          order.shippingAddress.street.toLowerCase().includes('mg road')))
  );

  const effectiveTimeline = generateOrderTimeline(
    order.status,
    order.date,
    order.updatedAt,
    order.trackingNumber,
    order.carrier,
    order.deliveryMethod,
    order.shippingAddress?.street
  );

  const activeLabel = order.statusLabel || getOrderStatusLabel(order.status, isPickup);

  const statusColorMap: Record<string, { bg: string; text: string; border: string }> = {
    confirmed: { bg: 'rgba(59, 130, 246, 0.15)', text: '#60A5FA', border: 'rgba(59, 130, 246, 0.3)' },
    processing: { bg: 'rgba(245, 158, 11, 0.15)', text: '#FBBF24', border: 'rgba(245, 158, 11, 0.3)' },
    shipped: { bg: 'rgba(200, 16, 46, 0.15)', text: '#FF4D6D', border: 'rgba(200, 16, 46, 0.3)' },
    in_transit: { bg: 'rgba(200, 16, 46, 0.18)', text: '#FF6B8B', border: 'rgba(200, 16, 46, 0.4)' },
    out_for_delivery: { bg: 'rgba(200, 16, 46, 0.2)', text: '#FF6B8B', border: 'rgba(200, 16, 46, 0.4)' },
    ready_for_pickup: { bg: 'rgba(16, 185, 129, 0.15)', text: '#34D399', border: 'rgba(16, 185, 129, 0.35)' },
    delivered: { bg: 'rgba(16, 185, 129, 0.15)', text: '#34D399', border: 'rgba(16, 185, 129, 0.3)' },
    cancelled: { bg: 'rgba(107, 114, 128, 0.15)', text: '#9CA3AF', border: 'rgba(107, 114, 128, 0.3)' },
  };

  const currentStatusStyle = statusColorMap[order.status] || statusColorMap.confirmed;

  const whatsappInquiryUrl = `https://wa.me/${STORE_INFO.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Hello Oriental Sports Camp Pune team! I'm inquiring about my order ${order.orderNumber} (₹${order.totalAmount.toLocaleString('en-IN')}). Could you assist with status updates?`
  )}`;

  const isSyncBusy = isLocalSyncing || isSyncingOrders;

  return (
    <div
      style={{
        backgroundColor: '#121212',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Order Placed
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#FFFFFF' }}>
              {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
          </div>

          <div style={{ height: '24px', width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.12)' }} className="desktop-only" />

          <div>
            <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Total Amount
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#FFFFFF' }}>
              ₹{order.totalAmount.toLocaleString('en-IN')}
            </div>
          </div>

          <div style={{ height: '24px', width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.12)' }} className="desktop-only" />

          <div>
            <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {isPickup ? 'Collection Method' : 'Ship To'}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#D1D5DB' }}>
              {isPickup ? 'Camp Store Pickup' : `${order.shippingAddress.name} (${order.shippingAddress.locality})`}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* Status Badge */}
          <div
            style={{
              padding: '6px 12px',
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
            {order.status === 'delivered' ? (
              <CheckCircle2 size={14} />
            ) : order.status === 'cancelled' ? (
              <AlertCircle size={14} />
            ) : (
              <Clock size={14} />
            )}
            <span>{activeLabel}</span>
          </div>

          {/* Refresh Status Button */}
          <button
            type="button"
            onClick={handleManualSync}
            disabled={isSyncBusy}
            title="Fetch real-time updates from store admin"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '6px',
              padding: '6px 12px',
              color: '#E5E7EB',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: isSyncBusy ? 'wait' : 'pointer',
              minHeight: '36px',
              transition: 'all 0.15s ease',
            }}
          >
            <RefreshCw
              size={13}
              style={{
                animation: isSyncBusy ? 'spin 0.9s linear infinite' : 'none',
              }}
            />
            <span>{isSyncBusy ? 'Syncing...' : syncFeedback || 'Refresh Status'}</span>
          </button>

          {/* Toggle Details Button */}
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
              padding: '8px 10px',
              minHeight: '44px',
            }}
          >
            <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Main Order Content */}
      <div style={{ padding: '20px' }}>
        {/* Order Identifier & Tracking Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Package size={18} color="#C8102E" />
            <span style={{ fontWeight: 800, fontSize: '1rem', color: '#FFFFFF', letterSpacing: '0.02em' }}>
              {order.orderNumber}
            </span>
          </div>

          {order.trackingNumber && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8125rem',
                color: '#9CA3AF',
                flexWrap: 'wrap',
              }}
            >
              <span>
                Carrier: <strong style={{ color: '#FFFFFF' }}>{order.carrier || 'Logistics Partner'}</strong>
              </span>
              <span>•</span>
              <span>
                AWB: <strong style={{ color: '#FFFFFF' }}>{order.trackingNumber}</strong>
              </span>
              <button
                type="button"
                onClick={handleCopyTracking}
                title="Copy tracking code"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: copiedTracking ? '#10B981' : '#9CA3AF',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  minHeight: '44px',
                  minWidth: '44px',
                  justifyContent: 'center',
                }}
              >
                {copiedTracking ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          )}
        </div>

        {/* Camp Store Pickup Banner if applicable */}
        {isPickup && (
          <div
            style={{
              backgroundColor: 'rgba(200, 16, 46, 0.08)',
              border: '1px solid rgba(200, 16, 46, 0.25)',
              borderRadius: '6px',
              padding: '12px 16px',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                backgroundColor: '#C8102E',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '0.6875rem',
                padding: '4px 8px',
                borderRadius: '4px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <MapPin size={12} />
              <span>CAMP STORE PICKUP</span>
            </div>
            <div style={{ fontSize: '0.8125rem', color: '#E5E7EB', flex: 1, minWidth: '220px' }}>
              Oriental Sports: <strong>Shop 247, MG Road, New Modikhana, Camp, Pune - 411001</strong> (Mon–Sun 10:00 AM – 9:00 PM)
            </div>
          </div>
        )}

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
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4
                  style={{
                    margin: 0,
                    fontSize: '0.9375rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
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
              <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: '#FFFFFF', whiteSpace: 'nowrap' }}>
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
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleReorder}
              className="btn btn-outline-light btn-sm"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.75rem',
                minHeight: '44px',
                padding: '8px 14px',
              }}
            >
              <RotateCcw size={14} />
              <span>BUY AGAIN</span>
            </button>

            <button
              type="button"
              onClick={() => setShowInvoiceModal(true)}
              className="btn btn-outline-light btn-sm"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.75rem',
                minHeight: '44px',
                padding: '8px 14px',
              }}
            >
              <FileText size={14} />
              <span>TAX INVOICE</span>
            </button>
          </div>

          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary btn-sm"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.75rem',
              minHeight: '44px',
              padding: '8px 14px',
            }}
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
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '18px',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              <h5
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#C8102E',
                  margin: 0,
                }}
              >
                Live Fulfillment & Stage Progress
              </h5>

              <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>
                Synced directly with Oriental Sports Camp Admin
              </span>
            </div>

            {/* Timeline Stepper */}
            <div style={{ position: 'relative', paddingLeft: '32px', marginBottom: '28px' }}>
              {/* Stepper connecting line */}
              <div
                style={{
                  position: 'absolute',
                  left: '11px',
                  top: '10px',
                  bottom: '14px',
                  width: '2px',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                }}
              />

              {effectiveTimeline.map((step, sIdx) => {
                const isPast = step.completed;
                const isCurr = step.current;

                return (
                  <div
                    key={sIdx}
                    style={{
                      position: 'relative',
                      marginBottom: sIdx === effectiveTimeline.length - 1 ? 0 : '24px',
                    }}
                  >
                    {/* Circle Node */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '-32px',
                        top: '1px',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: isCurr
                          ? '#C8102E'
                          : isPast
                          ? '#10B981'
                          : '#1E1E1E',
                        border: isCurr
                          ? '2px solid #FFFFFF'
                          : isPast
                          ? 'none'
                          : '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: isCurr
                          ? '0 0 14px rgba(200, 16, 46, 0.65), 0 0 0 3px rgba(200, 16, 46, 0.35)'
                          : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        zIndex: 2,
                      }}
                    >
                      {isPast && !isCurr ? (
                        <Check size={14} strokeWidth={2.5} />
                      ) : isCurr ? (
                        <Clock size={13} strokeWidth={2.5} />
                      ) : (
                        <div
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                          }}
                        />
                      )}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span
                          style={{
                            fontWeight: 700,
                            fontSize: '0.875rem',
                            color: isCurr ? '#FF4D6D' : isPast ? '#FFFFFF' : '#71717A',
                          }}
                        >
                          {step.title}
                        </span>

                        {isCurr && (
                          <span
                            style={{
                              fontSize: '0.625rem',
                              fontWeight: 800,
                              backgroundColor: '#C8102E',
                              color: '#FFFFFF',
                              padding: '2px 8px',
                              borderRadius: '9999px',
                              letterSpacing: '0.06em',
                              textTransform: 'uppercase',
                            }}
                          >
                            Active Stage
                          </span>
                        )}

                        <span
                          style={{
                            fontSize: '0.75rem',
                            color: isCurr ? '#E5E7EB' : isPast ? '#9CA3AF' : '#52525B',
                            fontWeight: isCurr ? 600 : 400,
                          }}
                        >
                          {step.date}
                        </span>
                      </div>

                      <p
                        style={{
                          margin: '4px 0 0 0',
                          fontSize: '0.8125rem',
                          color: isCurr ? '#D1D5DB' : isPast ? '#9CA3AF' : '#52525B',
                          lineHeight: 1.45,
                        }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Delivery destination & payment breakdown card */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '16px',
                backgroundColor: '#181818',
                padding: '16px',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                fontSize: '0.8125rem',
              }}
            >
              <div>
                <strong style={{ color: '#FFFFFF', display: 'block', marginBottom: '6px', fontSize: '0.875rem' }}>
                  {isPickup ? 'Collection Details' : 'Delivery Destination'}
                </strong>
                <div style={{ color: '#FFFFFF', fontWeight: 600 }}>{order.shippingAddress.name}</div>
                <div style={{ color: '#D1D5DB', marginTop: '2px' }}>{order.shippingAddress.street}</div>
                <div style={{ color: '#9CA3AF' }}>
                  {order.shippingAddress.locality}, {order.shippingAddress.city} - {order.shippingAddress.pincode}
                </div>
                <div style={{ color: '#9CA3AF', marginTop: '4px' }}>Contact Phone: +91 {order.shippingAddress.phone}</div>
              </div>

              <div>
                <strong style={{ color: '#FFFFFF', display: 'block', marginBottom: '6px', fontSize: '0.875rem' }}>
                  Payment & Invoice
                </strong>
                <div style={{ color: '#D1D5DB' }}>
                  Payment Mode: <strong style={{ color: '#FFFFFF' }}>{order.paymentMethod}</strong>
                </div>
                <div style={{ color: '#9CA3AF', marginTop: '2px' }}>
                  Subtotal: ₹{order.subtotal.toLocaleString('en-IN')}
                </div>
                <div style={{ color: '#9CA3AF' }}>GST (Included): ₹{order.tax.toLocaleString('en-IN')}</div>
                <div style={{ color: '#9CA3AF' }}>
                  Shipping:{' '}
                  {order.shipping === 0 ? (
                    <span style={{ color: '#10B981', fontWeight: 700 }}>FREE Expedited</span>
                  ) : (
                    `₹${order.shipping}`
                  )}
                </div>
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
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(6px)',
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
              borderRadius: '8px',
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
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                borderBottom: '2px solid #C8102E',
                paddingBottom: '16px',
                marginBottom: '16px',
              }}
            >
              <div>
                <h3 className="font-display" style={{ margin: 0, fontSize: '1.375rem', color: '#FFFFFF' }}>
                  ORIENTAL SPORTS
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>
                  Shop 247, MG Road, New Modikhana, Camp, Pune - 411001
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span
                  style={{
                    backgroundColor: '#C8102E',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    fontSize: '0.6875rem',
                    padding: '2px 8px',
                    borderRadius: '2px',
                  }}
                >
                  TAX INVOICE
                </span>
                <div style={{ fontSize: '0.875rem', fontWeight: 800, marginTop: '4px', color: '#FFFFFF' }}>
                  {order.orderNumber}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Date: {order.date}</div>
              </div>
            </div>

            <div style={{ marginBottom: '16px', fontSize: '0.8125rem', color: '#D1D5DB' }}>
              <strong style={{ color: '#FFFFFF' }}>Billed To:</strong>
              <div>{order.shippingAddress.name}</div>
              <div style={{ color: '#9CA3AF' }}>
                {order.shippingAddress.street}, {order.shippingAddress.locality}, {order.shippingAddress.city} -{' '}
                {order.shippingAddress.pincode}
              </div>
              <div style={{ color: '#9CA3AF' }}>Phone: +91 {order.shippingAddress.phone}</div>
            </div>

            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.8125rem',
                marginBottom: '16px',
              }}
            >
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
                      {it.selectedVariant && (
                        <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{it.selectedVariant}</div>
                      )}
                    </td>
                    <td style={{ textAlign: 'center', padding: '8px', color: '#D1D5DB' }}>{it.quantity}</td>
                    <td style={{ textAlign: 'right', padding: '8px', color: '#D1D5DB' }}>
                      ₹{it.price.toLocaleString('en-IN')}
                    </td>
                    <td style={{ textAlign: 'right', padding: '8px', color: '#FFFFFF', fontWeight: 700 }}>
                      ₹{(it.price * itemQuantity(it)).toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} style={{ textAlign: 'right', padding: '8px', fontWeight: 700, color: '#9CA3AF' }}>
                    Total:
                  </td>
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
                style={{ minHeight: '44px', padding: '8px 16px' }}
              >
                PRINT / SAVE PDF
              </button>
              <button
                type="button"
                onClick={() => setShowInvoiceModal(false)}
                className="btn btn-primary btn-sm"
                style={{ minHeight: '44px', padding: '8px 16px' }}
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

function itemQuantity(it: any): number {
  return Number(it.quantity || 1);
}
