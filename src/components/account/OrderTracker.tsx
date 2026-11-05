import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Order } from '../../types/auth';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { PRODUCTS } from '../../data/products';
import { STORE_INFO } from '../../data/storeInfo';
import { generateOrderTimeline, getOrderStatusLabel } from '../../utils/orderTimeline';
import { printOrderInvoice } from '../../utils/printInvoice';
import { OrderStatusStepper } from '../orders/OrderStatusStepper';
import { FALLBACK_IMAGE } from '../../data/media';
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
  /** Shows a "Track Order" link to the single-order view at /account/orders/:id. Off when already rendering that focused view. */
  showTrackLink?: boolean;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({ order, defaultExpanded = false, showTrackLink = true }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [copiedTracking, setCopiedTracking] = useState(false);
  const [isLocalSyncing, setIsLocalSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  const { addToCart, openCart } = useCart();
  const { syncOrders, isSyncingOrders } = useAuth();

  const safeTotal = Number(order.totalAmount ?? (order as any).total_amount ?? 0);
  const safeSubtotal = Number(order.subtotal ?? (order as any).total_amount ?? safeTotal);
  const safeDiscount = Number(order.discount ?? 0);
  // Prices are GST-inclusive, so GST is the portion already embedded in
  // (subtotal - discount), not an extra 18% on top of it.
  const safeTax = Number(order.tax ?? Math.round((safeSubtotal - safeDiscount) - (safeSubtotal - safeDiscount) / 1.18));
  const safeTaxableValue = Math.max(0, safeSubtotal - safeDiscount - safeTax);
  const safeShipping = Number(order.shipping ?? 0);
  const safeItems = Array.isArray(order.items) ? order.items : [];
  const safeAddr: any = order.shippingAddress || (order as any).shipping_address || {};
  const safeCustomerName = safeAddr.name || safeAddr.fullName || order.customerName || (order as any).customer_name || 'Customer';
  const safeLocality = safeAddr.locality || safeAddr.city || 'Camp';
  const safeStreet = safeAddr.street || safeAddr.addressLine1 || 'Camp Flagship Store';
  const safeCity = safeAddr.city || 'Pune';
  const safePincode = safeAddr.pincode || safeAddr.postalCode || '411001';
  const safePhone = safeAddr.phone || (order as any).customerPhone || (order as any).customer_phone || '';

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
    safeItems.forEach((item) => {
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
      await syncOrders(safePhone || order.orderNumber);
      setSyncFeedback('Updated Just Now');
      setTimeout(() => setSyncFeedback(null), 3500);
    } catch (err: any) {
      setSyncFeedback(err?.code === 'SYNC_IN_PROGRESS' ? 'Already Syncing…' : 'Up to Date');
      setTimeout(() => setSyncFeedback(null), 3000);
    } finally {
      setIsLocalSyncing(false);
    }
  };

  const isPickup = Boolean(
    order.deliveryMethod === 'camp_pickup' ||
      order.deliveryMethod === 'pickup' ||
      (safeStreet.toLowerCase().includes('camp') ||
        safeStreet.toLowerCase().includes('pickup') ||
        safeStreet.toLowerCase().includes('shop 247') ||
        safeStreet.toLowerCase().includes('mg road'))
  );

  const effectiveTimeline = generateOrderTimeline(
    order.status || 'confirmed',
    order.date || new Date().toISOString(),
    order.updatedAt,
    order.trackingNumber,
    order.carrier,
    order.deliveryMethod,
    safeStreet
  );

  const activeLabel = order.statusLabel || getOrderStatusLabel(order.status || 'confirmed', isPickup);

  const statusColorMap: Record<string, { bg: string; text: string; border: string }> = {
    confirmed: { bg: 'rgba(59, 130, 246, 0.15)', text: '#60A5FA', border: 'rgba(59, 130, 246, 0.3)' },
    processing: { bg: 'rgba(245, 158, 11, 0.15)', text: '#FBBF24', border: 'rgba(245, 158, 11, 0.3)' },
    dispatched: { bg: 'rgba(200, 16, 46, 0.15)', text: '#FF4D6D', border: 'rgba(200, 16, 46, 0.3)' },
    shipped: { bg: 'rgba(200, 16, 46, 0.15)', text: '#FF4D6D', border: 'rgba(200, 16, 46, 0.3)' },
    in_transit: { bg: 'rgba(200, 16, 46, 0.18)', text: '#FF6B8B', border: 'rgba(200, 16, 46, 0.4)' },
    out_for_delivery: { bg: 'rgba(37, 99, 235, 0.18)', text: '#60A5FA', border: 'rgba(37, 99, 235, 0.4)' },
    ready_for_pickup: { bg: 'rgba(16, 185, 129, 0.15)', text: '#34D399', border: 'rgba(16, 185, 129, 0.35)' },
    delivered: { bg: 'rgba(16, 185, 129, 0.15)', text: '#34D399', border: 'rgba(16, 185, 129, 0.3)' },
    cancelled: { bg: 'rgba(107, 114, 128, 0.15)', text: '#9CA3AF', border: 'rgba(107, 114, 128, 0.3)' },
  };

  const currentStatusStyle = statusColorMap[order.status] || statusColorMap.confirmed;

  const whatsappInquiryUrl = `https://wa.me/${STORE_INFO.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Hello Oriental Sports Camp Pune team! I'm inquiring about my order ${order.orderNumber} (₹${safeTotal.toLocaleString('en-IN')}). Could you assist with status updates?`
  )}`;

  const isSyncBusy = isLocalSyncing;

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
              ₹{safeTotal.toLocaleString('en-IN')}
            </div>
          </div>

          <div style={{ height: '24px', width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.12)' }} className="desktop-only" />

          <div>
            <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {isPickup ? 'Collection Method' : 'Ship To'}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#D1D5DB' }}>
              {isPickup ? 'Camp Store Pickup' : `${safeCustomerName} (${safeLocality})`}
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
            {showTrackLink && (
              <Link
                to={`/account/orders/${order.id}`}
                onClick={(e) => e.stopPropagation()}
                style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FF4D6D', textDecoration: 'none' }}
              >
                Track Order →
              </Link>
            )}
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
          {safeItems.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                paddingBottom: '14px',
                borderBottom: idx < safeItems.length - 1 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
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
                onError={(e) => {
                  const el = e.currentTarget;
                  if (!el.dataset.fallback) {
                    el.dataset.fallback = '1';
                    el.src = FALLBACK_IMAGE;
                  }
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
                  Qty: {Number(item.quantity ?? 1)} × ₹{Number(item.price ?? 0).toLocaleString('en-IN')}
                </div>
              </div>
              <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: '#FFFFFF', whiteSpace: 'nowrap' }}>
                ₹{(Number(item.price ?? 0) * Number(item.quantity ?? 1)).toLocaleString('en-IN')}
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
              onClick={(e) => {
                e.stopPropagation();
                printOrderInvoice(order);
              }}
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
            <div style={{ marginBottom: '28px' }}>
              <OrderStatusStepper timeline={effectiveTimeline} />
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
                <div style={{ color: '#FFFFFF', fontWeight: 600 }}>{safeCustomerName}</div>
                <div style={{ color: '#D1D5DB', marginTop: '2px' }}>{safeStreet}</div>
                <div style={{ color: '#9CA3AF' }}>
                  {[safeLocality, safeCity].filter(Boolean).join(', ')} - {safePincode}
                </div>
                {safePhone && <div style={{ color: '#9CA3AF', marginTop: '4px' }}>Contact Phone: {safePhone}</div>}
              </div>

              <div>
                <strong style={{ color: '#FFFFFF', display: 'block', marginBottom: '6px', fontSize: '0.875rem' }}>
                  Payment & Invoice
                </strong>
                <div style={{ color: '#D1D5DB' }}>
                  Payment Mode: <strong style={{ color: '#FFFFFF' }}>{order.paymentMethod || 'Razorpay / Online'}</strong>
                </div>
                <div style={{ color: '#9CA3AF', marginTop: '2px' }}>
                  Taxable Value: ₹{safeTaxableValue.toLocaleString('en-IN')}
                </div>
                <div style={{ color: '#9CA3AF' }}>GST @ 18%: ₹{safeTax.toLocaleString('en-IN')}</div>
                {safeDiscount > 0 && (
                  <div style={{ color: '#10B981' }}>Discount: −₹{safeDiscount.toLocaleString('en-IN')}</div>
                )}
                <div style={{ color: '#9CA3AF' }}>
                  Shipping:{' '}
                  {safeShipping === 0 ? (
                    <span style={{ color: '#10B981', fontWeight: 700 }}>FREE Expedited</span>
                  ) : (
                    `₹${safeShipping}`
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
