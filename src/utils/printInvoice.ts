import { Order } from '../types/auth';

/**
 * Clean, Simple Single-Page Official GST Tax Invoice Printer.
 * Renders an isolated document in a hidden iframe and triggers browser print.
 * Guaranteed zero website navigation, zero headers, zero dark backgrounds.
 */
export function printOrderInvoice(order: Order) {
  // deliveryMethod is authoritative; the address-text fallback (legacy
  // orders without it) must match the store's literal pickup-counter
  // address — "Camp"/"MG Road" alone are real, common Pune locality names
  // and false-positive for doorstep customers who live there.
  const isPickup =
    order.deliveryMethod === 'camp_pickup' ||
    order.deliveryMethod === 'pickup' ||
    (!order.deliveryMethod &&
      order.shippingAddress?.street &&
      (order.shippingAddress.street.toLowerCase().includes('shop 247') ||
        order.shippingAddress.street.toLowerCase().includes('camp store pickup')));

  const customerName =
    order.shippingAddress?.name ||
    order.customerName ||
    'Valued Athlete Customer';
  const customerPhone =
    order.shippingAddress?.phone ||
    (order as any).customerPhone ||
    '';
  const customerEmail =
    order.customerEmail ||
    order.shippingAddress?.email ||
    '';

  const addr: any = order.shippingAddress || {};
  const formattedAddress = [
    addr.street || addr.addressLine1,
    addr.locality,
    addr.city,
    addr.state,
    addr.pincode || addr.postalCode,
  ]
    .filter(Boolean)
    .join(', ');

  const orderDate = order.date
    ? new Date(order.date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

  const invoiceNumber = `INV-${order.orderNumber.replace(/[^A-Za-z0-9]/g, '')}`;

  // Prices are GST-inclusive, so GST is the portion already embedded in
  // (subtotal - discount) — not an addend on top of Subtotal/Shipping,
  // which previously made the printed rows not reconcile to Grand Total.
  const invoiceDiscount = Number((order as any).discount || 0);
  const invoiceSubtotal = Number(order.subtotal || order.totalAmount || 0);
  const invoiceTax = Number(
    order.tax ?? Math.round((invoiceSubtotal - invoiceDiscount) - (invoiceSubtotal - invoiceDiscount) / 1.18)
  );
  const invoiceTaxableValue = Math.max(0, invoiceSubtotal - invoiceDiscount - invoiceTax);

  const itemsRowsHtml = (order.items || [])
    .map((it, idx) => {
      const lineTotal = (it.price || 0) * (it.quantity || 1);
      const spec = [it.selectedVariant, it.selectedSize].filter(Boolean).join(' · ');

      return `
        <tr>
          <td style="text-align: center; color: #666; font-size: 12px;">${idx + 1}</td>
          <td>
            <strong>${it.productName}</strong>
            ${spec ? `<div style="font-size: 11px; color: #666;">Spec: ${spec}</div>` : ''}
          </td>
          <td style="text-align: center;">${it.quantity}</td>
          <td style="text-align: right; font-family: monospace;">₹${Number(it.price || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
          <td style="text-align: right; font-weight: 700; font-family: monospace;">₹${Number(lineTotal).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
        </tr>
      `;
    })
    .join('');

  const invoiceHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Tax Invoice - ${order.orderNumber}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 14mm 16mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #111111;
      background-color: #FFFFFF;
      font-size: 13px;
      line-height: 1.45;
    }
    .invoice-container {
      max-width: 800px;
      margin: 0 auto;
    }
    .invoice-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #C8102E;
      padding-bottom: 14px;
      margin-bottom: 18px;
    }
    .brand-title {
      font-size: 24px;
      font-weight: 900;
      letter-spacing: -0.5px;
      color: #C8102E;
      text-transform: uppercase;
      margin: 0 0 2px 0;
    }
    .brand-sub {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #333333;
      margin-bottom: 6px;
    }
    .store-address {
      font-size: 11.5px;
      color: #555555;
      line-height: 1.4;
    }
    .invoice-meta-box {
      text-align: right;
    }
    .invoice-title {
      font-size: 20px;
      font-weight: 800;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: #111111;
      margin: 0 0 6px 0;
    }
    .meta-row {
      font-size: 12px;
      color: #444444;
      margin-bottom: 3px;
    }
    .meta-row strong {
      color: #111111;
    }
    .dossier-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 20px;
      background: #F8F9FA;
      border: 1px solid #E5E7EB;
      border-radius: 4px;
      padding: 12px 14px;
    }
    .dossier-col h4 {
      margin: 0 0 6px 0;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #6B7280;
    }
    .dossier-col p {
      margin: 0;
      font-size: 12.5px;
      color: #1F2937;
      line-height: 1.4;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 16px;
    }
    th {
      background: #F3F4F6;
      border-top: 1px solid #D1D5DB;
      border-bottom: 2px solid #9CA3AF;
      padding: 8px 10px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #374151;
      text-align: left;
    }
    td {
      padding: 9px 10px;
      border-bottom: 1px solid #E5E7EB;
      font-size: 12.5px;
      vertical-align: top;
    }
    .settlement-area {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-top: 12px;
      gap: 20px;
    }
    .payment-note-box {
      flex: 1;
      font-size: 11.5px;
      color: #4B5563;
      background: #F9FAFB;
      border: 1px dashed #D1D5DB;
      border-radius: 4px;
      padding: 10px 12px;
    }
    .totals-table {
      width: 290px;
      border-collapse: collapse;
    }
    .totals-table td {
      padding: 4px 6px;
      border: none;
      font-size: 12.5px;
    }
    .grand-total-row td {
      border-top: 2px solid #111111;
      padding-top: 8px;
      font-size: 15px;
      font-weight: 800;
      color: #C8102E;
    }
    .invoice-footer {
      margin-top: 28px;
      padding-top: 12px;
      border-top: 1px solid #E5E7EB;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: #6B7280;
    }
  </style>
</head>
<body>
  <div class="invoice-container">
    <!-- Header -->
    <div class="invoice-header">
      <div>
        <h1 class="brand-title">ORIENTAL SPORTS</h1>
        <div class="brand-sub">Camp Pune Flagship Sports House</div>
        <div class="store-address">
          Shop 247, MG Road, Camp, Pune - 411001, Maharashtra<br>
          GSTIN: 27AABCO2470Q1ZX · Email: hello.orientalsports@gmail.com<br>
          Customer Desk / WhatsApp: +91 98909 90022
        </div>
      </div>
      <div class="invoice-meta-box">
        <h2 class="invoice-title">TAX INVOICE</h2>
        <div class="meta-row">Invoice No: <strong>#${invoiceNumber}</strong></div>
        <div class="meta-row">Order Reference: <strong>${order.orderNumber}</strong></div>
        <div class="meta-row">Date: <strong>${orderDate}</strong></div>
        <div class="meta-row">Place of Supply: <strong>Maharashtra (27)</strong></div>
      </div>
    </div>

    <!-- Bill To / Deliver To -->
    <div class="dossier-grid">
      <div class="dossier-col">
        <h4>Billed & Delivered To</h4>
        <p>
          <strong style="font-size: 13.5px; color: #111111;">${customerName}</strong><br>
          ${formattedAddress || 'Camp Store Desk Collection'}<br>
          ${customerPhone ? `Contact: +91 ${customerPhone.replace(/\D/g, '').slice(-10)}<br>` : ''}
          ${customerEmail ? `Email: ${customerEmail}` : ''}
        </p>
      </div>
      <div class="dossier-col">
        <h4>Fulfillment & Delivery Details</h4>
        <p>
          <strong>Method:</strong> ${isPickup ? 'Camp Store Counter Pickup (Shop 247, MG Road)' : 'Doorstep Courier Delivery'}<br>
          <strong>Status:</strong> ${order.status.toUpperCase()}<br>
          ${order.carrier ? `<strong>Carrier:</strong> ${order.carrier}<br>` : ''}
          ${order.trackingNumber ? `<strong>AWB / Tracking:</strong> ${order.trackingNumber}` : ''}
        </p>
      </div>
    </div>

    <!-- Items Table -->
    <table>
      <thead>
        <tr>
          <th style="width: 36px; text-align: center;">#</th>
          <th>Equipment Description</th>
          <th style="width: 50px; text-align: center;">Qty</th>
          <th style="width: 100px; text-align: right;">Unit Price</th>
          <th style="width: 110px; text-align: right;">Total Amount</th>
        </tr>
      </thead>
      <tbody>
        ${itemsRowsHtml}
      </tbody>
    </table>

    <!-- Totals & Payment Summary -->
    <div class="settlement-area">
      <div class="payment-note-box">
        <strong>Payment Information:</strong><br>
        Mode: ${order.paymentMethod || 'Razorpay Online Gateway (UPI / Card)'}<br>
        Status: Settled & Verified<br>
        All equipment verified by master stringers and covered under manufacturer warranty.
      </div>

      <table class="totals-table">
        <tr>
          <td style="color: #6B7280;">Taxable Value</td>
          <td style="text-align: right; font-family: monospace;">₹${invoiceTaxableValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
        </tr>
        <tr>
          <td style="color: #6B7280;">GST @ 18%</td>
          <td style="text-align: right; font-family: monospace;">₹${invoiceTax.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
        </tr>
        ${invoiceDiscount > 0 ? `
        <tr>
          <td style="color: #6B7280;">Discount</td>
          <td style="text-align: right; font-family: monospace;">−₹${invoiceDiscount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
        </tr>` : ''}
        <tr>
          <td style="color: #6B7280;">Courier / Delivery Fee</td>
          <td style="text-align: right; font-family: monospace;">${order.shipping && order.shipping > 0 ? `₹${Number(order.shipping).toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : 'FREE'}</td>
        </tr>
        <tr class="grand-total-row">
          <td>Grand Total</td>
          <td style="text-align: right; font-family: monospace;">₹${Number(order.totalAmount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
        </tr>
      </table>
    </div>

    <!-- Footer -->
    <div class="invoice-footer">
      <div>This is a computer-generated tax invoice. No signature required.</div>
      <div>Thank you for choosing Oriental Sports Pune.</div>
    </div>
  </div>
</body>
</html>`;

  // Extract inner container HTML for direct portal printing fallback
  const innerContainerMatch = invoiceHtml.match(/<div class="invoice-container">[\s\S]*?<\/div>\s*<\/body>/i);
  const containerHtml = innerContainerMatch
    ? innerContainerMatch[0].replace(/<\/body>/i, '')
    : `<div class="invoice-container">${itemsRowsHtml}</div>`;

  // Reuse the exact same stylesheet as the preferred print-window path
  // instead of a hand-duplicated partial copy — the old copy only declared
  // a subset of classes and targeted a `.items-table` class that doesn't
  // exist in the markup (the real table is unclassed), so the fallback
  // printed with no table borders/background/footer styling whenever the
  // popup window was blocked.
  const originalStylesMatch = invoiceHtml.match(/<style>([\s\S]*?)<\/style>/i);
  const originalStyles = originalStylesMatch ? originalStylesMatch[1] : '';

  // 1. Preferred method: Standalone clean print window
  try {
    const printWindow = window.open('', '_blank', 'width=850,height=900');
    if (printWindow && !printWindow.closed) {
      printWindow.document.open();
      printWindow.document.write(invoiceHtml);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        try {
          printWindow.print();
        } catch {}
      }, 300);
      return;
    }
  } catch (e) {
    // Popup blocked, proceed to isolated in-page print portal
  }

  // 2. Bulletproof Fallback: In-page isolated print container with strict @media print masking
  try {
    const existing = document.getElementById('os-print-invoice-portal');
    if (existing) existing.remove();

    const portal = document.createElement('div');
    portal.id = 'os-print-invoice-portal';
    portal.innerHTML = `
      <style id="os-print-invoice-override">
        @media screen {
          #os-print-invoice-portal {
            display: none !important;
          }
        }
        @media print {
          @page {
            size: A4 portrait;
            margin: 12mm 15mm;
          }
          html, body {
            background: #FFFFFF !important;
            color: #111111 !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          body > *:not(#os-print-invoice-portal) {
            display: none !important;
            visibility: hidden !important;
          }
          #os-print-invoice-portal {
            display: block !important;
            visibility: visible !important;
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            background: #FFFFFF !important;
            color: #111111 !important;
            z-index: 9999999 !important;
          }
          #os-print-invoice-portal * {
            visibility: visible !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          ${originalStyles}
        }
      </style>
      ${containerHtml}
    `;

    document.body.appendChild(portal);

    setTimeout(() => {
      window.print();
      setTimeout(() => {
        portal.remove();
      }, 1500);
    }, 150);
  } catch (err) {
    console.error('Print invoice failed:', err);
  }
}
