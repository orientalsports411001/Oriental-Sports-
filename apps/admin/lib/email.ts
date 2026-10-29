/**
 * Oriental Sports — Order Lifecycle Email Dispatcher
 * High-end Sports Editorial HTML email system using Resend API.
 * 
 * Aesthetic & Design Directives:
 * - Brand Colors: Crimson Red (#C8102E), Deep Black (#111111), Charcoal (#181818), White (#FFFFFF)
 * - Strict Anti-Slop: Meaningful sports equipment & workshop messaging
 * - Non-blocking: If RESEND_API_KEY is not configured, logs details and returns { success: true, simulated: true }
 */

export interface OrderEmailItem {
  product_name: string;
  price: number;
  quantity: number;
  selected_variant?: string;
  selected_size?: string;
}

export interface OrderEmailAddress {
  name?: string;
  fullName?: string;
  phone?: string;
  phoneNumber?: string;
  street?: string;
  addressLine1?: string;
  addressLine2?: string;
  apartment?: string;
  locality?: string;
  city?: string;
  state?: string;
  pincode?: string;
  postalCode?: string;
  country?: string;
}

export interface OrderEmailData {
  id?: string;
  order_number: string;
  status?: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  total_amount?: number;
  subtotal?: number;
  shipping?: number;
  tax?: number;
  payment_method?: string;
  tracking_number?: string | null;
  carrier?: string | null;
  created_at?: string;
  items?: OrderEmailItem[];
  shipping_address?: OrderEmailAddress;
}

export interface SendOrderEmailParams {
  order: OrderEmailData;
  stage?: string;
  trackingNumber?: string | null;
  carrier?: string | null;
  recipientEmail?: string;
  recipientName?: string;
}

export interface EmailSendResult {
  success: boolean;
  simulated?: boolean;
  messageId?: string;
  error?: string;
  stage?: string;
  recipient?: string;
  orderNumber?: string;
}

interface StageConfig {
  badge: string;
  headline: string;
  message: string;
  stepIndex: number; // 1 to 4
  accentColor: string;
}

/**
 * Stage-specific messaging and editorial tone
 */
export function getStageConfig(stage: string): StageConfig {
  const normalized = (stage || 'confirmed').toLowerCase().trim();

  switch (normalized) {
    case 'confirmed':
    case 'paid':
      return {
        badge: 'ORDER CONFIRMED',
        headline: 'Order Confirmed & Logged',
        message:
          'Your order has been placed and logged with our Camp Workshop. Master technicians have queued your equipment for pre-dispatch inspection and specification checks.',
        stepIndex: 1,
        accentColor: '#C8102E',
      };
    case 'processing':
      return {
        badge: 'WORKSHOP PREPARATION',
        headline: 'Workshop Inspection & Testing',
        message:
          'Equipment inspection, tension testing & packing in progress at Shop 247, MG Road. String tensions, bat knock balance, or racquet weight calibrations are being verified.',
        stepIndex: 2,
        accentColor: '#D97706',
      };
    case 'shipped':
      return {
        badge: 'DISPATCHED',
        headline: 'Dispatched via Courier',
        message:
          'Dispatched with carrier & tracking AWB. Your gear has cleared final packing and is en route for swift doorstep delivery.',
        stepIndex: 3,
        accentColor: '#C8102E',
      };
    case 'in_transit':
      return {
        badge: 'IN TRANSIT',
        headline: 'En Route to Delivery Location',
        message:
          'Your shipment is actively moving through the carrier logistics network. Real-time tracking is updated as the vehicle progresses.',
        stepIndex: 3,
        accentColor: '#2563EB',
      };
    case 'ready_for_pickup':
      return {
        badge: 'READY FOR COUNTER PICKUP',
        headline: 'Ready For Collection at Camp Counter',
        message:
          'Ready for instant collection at Camp Store counter. Please present your Order Number at Shop 247, MG Road, Camp, Pune.',
        stepIndex: 3,
        accentColor: '#059669',
      };
    case 'delivered':
      return {
        badge: 'DELIVERED & VERIFIED',
        headline: 'Equipment Delivered / Collected',
        message:
          'Equipment delivered / collected. All gear has reached your hands. Thank you for gearing up with Oriental Sports Pune — see you on the court!',
        stepIndex: 4,
        accentColor: '#10B981',
      };
    case 'cancelled':
      return {
        badge: 'ORDER CANCELLED',
        headline: 'Order Cancellation Recorded',
        message:
          'Your order has been cancelled. Any pre-authorized payment settlement will be refunded to your source account according to banking timelines.',
        stepIndex: 0,
        accentColor: '#EF4444',
      };
    default:
      return {
        badge: `ORDER ${normalized.toUpperCase()}`,
        headline: `Order Status: ${normalized.charAt(0).toUpperCase() + normalized.slice(1)}`,
        message: `Your Oriental Sports order has been updated to ${normalized}.`,
        stepIndex: 1,
        accentColor: '#C8102E',
      };
  }
}

/**
 * Format currency in Indian Rupees format (₹)
 */
function formatINR(val?: number): string {
  const num = typeof val === 'number' && !isNaN(val) ? val : 0;
  return `₹${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Build the High-End Sports Editorial HTML Email Template
 */
export function generateOrderEmailHtml(params: SendOrderEmailParams): string {
  const { order } = params;
  const stage = (params.stage || order.status || 'confirmed').toLowerCase();
  const stageConfig = getStageConfig(stage);

  const orderNumber = order.order_number || 'OS-ORDER';
  const customerName =
    params.recipientName ||
    order.customer_name ||
    order.shipping_address?.name ||
    order.shipping_address?.fullName ||
    'Valued Athlete';

  const trackingNumber = params.trackingNumber || order.tracking_number;
  const carrier = params.carrier || order.carrier;
  const hasTracking = Boolean(trackingNumber || carrier);

  const items = order.items && order.items.length > 0 ? order.items : [];
  const addr = order.shipping_address || {};
  const isPickup =
    addr.street?.toLowerCase().includes('camp store') ||
    addr.addressLine1?.toLowerCase().includes('camp store') ||
    addr.street?.toLowerCase().includes('mg road') ||
    stage === 'ready_for_pickup';

  const orderDate = order.created_at
    ? new Date(order.created_at).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  // Progress steps builder
  const steps = [
    { num: 1, label: 'Confirmed' },
    { num: 2, label: 'Workshop' },
    { num: 3, label: isPickup ? 'Ready Pickup' : 'Dispatched' },
    { num: 4, label: 'Delivered' },
  ];

  const stepsHtml = steps
    .map((s) => {
      const isCompleted = stageConfig.stepIndex > s.num;
      const isCurrent = stageConfig.stepIndex === s.num;
      const dotColor = isCurrent ? '#C8102E' : isCompleted ? '#FFFFFF' : '#444444';
      const textColor = isCurrent ? '#FFFFFF' : isCompleted ? '#CCCCCC' : '#777777';
      const fontWeight = isCurrent ? '700' : '500';

      return `
        <td align="center" style="width: 25%; padding: 0 4px;">
          <div style="width: 14px; height: 14px; border-radius: 50%; background-color: ${dotColor}; margin: 0 auto 6px auto; border: 2px solid #111111;"></div>
          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: ${textColor}; font-weight: ${fontWeight}; display: block; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            ${s.label}
          </span>
        </td>
      `;
    })
    .join('');

  // Item rows builder
  const itemsHtml = items
    .map((it, idx) => {
      const lineTotal = (it.price || 0) * (it.quantity || 1);
      const variant = [it.selected_variant, it.selected_size].filter(Boolean).join(' · ');
      const bgColor = idx % 2 === 0 ? '#181818' : '#141414';

      return `
        <tr style="background-color: ${bgColor}; border-bottom: 1px solid #222222;">
          <td style="padding: 12px 14px; color: #FFFFFF; font-size: 13px; font-weight: 600; line-height: 1.4; vertical-align: top; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            ${it.product_name}
            ${
              variant
                ? `<div style="font-size: 11px; color: #888888; font-weight: 400; margin-top: 3px;">Spec: ${variant}</div>`
                : ''
            }
          </td>
          <td align="center" style="padding: 12px 8px; color: #CCCCCC; font-size: 13px; font-weight: 500; vertical-align: top;">
            ${it.quantity}
          </td>
          <td align="right" style="padding: 12px 8px; color: #CCCCCC; font-size: 13px; font-family: monospace; vertical-align: top;">
            ${formatINR(it.price)}
          </td>
          <td align="right" style="padding: 12px 14px; color: #FFFFFF; font-size: 13px; font-weight: 700; font-family: monospace; vertical-align: top;">
            ${formatINR(lineTotal)}
          </td>
        </tr>
      `;
    })
    .join('');

  const streetAddress = [
    addr.street || addr.addressLine1 || '',
    addr.apartment || addr.addressLine2 || '',
  ]
    .filter(Boolean)
    .join(', ');

  const cityStatePin = [
    addr.locality,
    addr.city ? `${addr.city}` : '',
    addr.state,
    addr.pincode || addr.postalCode,
  ]
    .filter(Boolean)
    .join(', ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Oriental Sports Order ${orderNumber}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0A0A0A; color: #E5E5E5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; line-height: 1.5;">
  <div style="background-color: #0A0A0A; padding: 24px 12px;">
    <!-- Main Email Container -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #111111; border: 1px solid #222222; border-top: 4px solid #C8102E;">
      
      <!-- Brand Header -->
      <tr>
        <td style="padding: 24px 28px; background-color: #141414; border-bottom: 1px solid #222222;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="left" style="vertical-align: middle;">
                <div style="font-size: 20px; font-weight: 900; letter-spacing: 0.1em; color: #FFFFFF; text-transform: uppercase;">
                  ORIENTAL<span style="color: #C8102E;">.</span>SPORTS
                </div>
                <div style="font-size: 11px; letter-spacing: 0.12em; color: #888888; text-transform: uppercase; margin-top: 4px;">
                  Shop 247 MG Road · Camp, Pune · Equipment & Courts
                </div>
              </td>
              <td align="right" style="vertical-align: middle;">
                <div style="display: inline-block; background-color: #1F1F1F; border: 1px solid #333333; padding: 6px 12px; font-size: 12px; font-weight: 700; color: #FFFFFF; font-family: monospace; letter-spacing: 0.05em;">
                  ${orderNumber}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Hero Status Banner -->
      <tr>
        <td style="padding: 28px 28px 20px 28px; background-color: #141414; border-bottom: 1px solid #222222;">
          <!-- Stage Badge -->
          <div style="display: inline-block; background-color: ${stageConfig.accentColor}; color: #FFFFFF; font-size: 10px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; padding: 4px 10px; border-radius: 2px; margin-bottom: 12px;">
            ${stageConfig.badge}
          </div>
          
          <h1 style="margin: 0 0 10px 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em; color: #FFFFFF; line-height: 1.2;">
            ${stageConfig.headline}
          </h1>

          <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.6; color: #CCCCCC;">
            Hello <strong>${customerName}</strong>,<br>
            ${stageConfig.message}
          </p>

          <!-- Timeline Stepper (Only for active flows) -->
          ${
            stageConfig.stepIndex > 0
              ? `
          <div style="margin-top: 22px; padding: 16px 12px; background-color: #0E0E0E; border: 1px solid #1E1E1E;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                ${stepsHtml}
              </tr>
            </table>
          </div>
          `
              : ''
          }
        </td>
      </tr>

      <!-- Tracking / Logistics Box (if shipped or carrier provided) -->
      ${
        hasTracking
          ? `
      <tr>
        <td style="padding: 18px 28px; background-color: #161616; border-bottom: 1px solid #262626;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align: middle;">
                <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #888888; font-weight: 700; display: block; margin-bottom: 4px;">
                  Logistics & Shipment Dispatch
                </span>
                <div style="font-size: 14px; color: #FFFFFF; font-weight: 600;">
                  Carrier: <span style="color: #FFFFFF; font-weight: 700;">${carrier || 'DTDC Express Pune'}</span>
                </div>
                ${
                  trackingNumber
                    ? `
                <div style="font-size: 13px; color: #CCCCCC; margin-top: 2px;">
                  AWB / Tracking: <span style="font-family: monospace; color: #FFFFFF; font-weight: 700; background-color: #222222; padding: 2px 6px; border: 1px solid #333333;">${trackingNumber}</span>
                </div>
                `
                    : ''
                }
              </td>
            </tr>
          </table>
        </td>
      </tr>
      `
          : ''
      }

      <!-- Itemized Ordered Gear -->
      <tr>
        <td style="padding: 24px 28px; background-color: #111111;">
          <div style="font-size: 12px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #888888; margin-bottom: 12px;">
            Equipment Verification & Order Items (${items.length})
          </div>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #222222; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #181818; border-bottom: 1px solid #2A2A2A;">
                <th align="left" style="padding: 10px 14px; font-size: 11px; font-weight: 700; color: #888888; text-transform: uppercase; letter-spacing: 0.08em;">
                  Item
                </th>
                <th align="center" style="padding: 10px 8px; font-size: 11px; font-weight: 700; color: #888888; text-transform: uppercase; letter-spacing: 0.08em;">
                  Qty
                </th>
                <th align="right" style="padding: 10px 8px; font-size: 11px; font-weight: 700; color: #888888; text-transform: uppercase; letter-spacing: 0.08em;">
                  Price
                </th>
                <th align="right" style="padding: 10px 14px; font-size: 11px; font-weight: 700; color: #888888; text-transform: uppercase; letter-spacing: 0.08em;">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              ${
                itemsHtml ||
                `
              <tr>
                <td colspan="4" style="padding: 16px; text-align: center; color: #888888; font-size: 13px;">
                  Oriental Sports Equipment Package
                </td>
              </tr>
              `
              }
            </tbody>
          </table>
        </td>
      </tr>

      <!-- Financial Breakdown & Address Grid -->
      <tr>
        <td style="padding: 0 28px 24px 28px; background-color: #111111;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <!-- Delivery / Pickup Address -->
              <td width="55%" style="vertical-align: top; padding-right: 16px;">
                <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #888888; margin-bottom: 8px;">
                  ${isPickup ? 'Store Collection Desk' : 'Shipping Destination'}
                </div>
                <div style="font-size: 13px; line-height: 1.5; color: #CCCCCC; background-color: #161616; border: 1px solid #222222; padding: 14px;">
                  <strong style="color: #FFFFFF; display: block; margin-bottom: 2px;">
                    ${addr.name || customerName}
                  </strong>
                  ${streetAddress ? `<div>${streetAddress}</div>` : ''}
                  ${cityStatePin ? `<div>${cityStatePin}</div>` : ''}
                  ${
                    order.customer_phone || addr.phone
                      ? `<div style="margin-top: 6px; color: #AAAAAA; font-size: 12px;">Contact: ${order.customer_phone || addr.phone}</div>`
                      : ''
                  }
                </div>
              </td>

              <!-- Financial Summary -->
              <td width="45%" style="vertical-align: top;">
                <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #888888; margin-bottom: 8px;">
                  Payment Summary
                </div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px; color: #CCCCCC; background-color: #161616; border: 1px solid #222222; padding: 12px 14px;">
                  <tr>
                    <td style="padding: 4px 0; color: #888888;">Subtotal</td>
                    <td align="right" style="padding: 4px 0; font-family: monospace; color: #FFFFFF;">
                      ${formatINR(order.subtotal || order.total_amount)}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #888888;">GST (18%)</td>
                    <td align="right" style="padding: 4px 0; font-family: monospace; color: #FFFFFF;">
                      ${formatINR(order.tax || 0)}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #888888;">Delivery</td>
                    <td align="right" style="padding: 4px 0; font-family: monospace; color: #FFFFFF;">
                      ${order.shipping && order.shipping > 0 ? formatINR(order.shipping) : 'FREE'}
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" style="border-top: 1px solid #2E2E2E; padding-top: 8px; margin-top: 4px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="font-size: 14px; font-weight: 800; color: #FFFFFF;">Grand Total</td>
                          <td align="right" style="font-size: 16px; font-weight: 800; color: #FFFFFF; font-family: monospace;">
                            ${formatINR(order.total_amount)}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Camp Pune Workshop Contact & WhatsApp Support CTA -->
      <tr>
        <td style="padding: 24px 28px; background-color: #161616; border-top: 1px solid #222222; border-bottom: 1px solid #222222;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align: middle; padding-right: 16px;">
                <div style="font-size: 13px; font-weight: 800; letter-spacing: 0.05em; color: #FFFFFF; text-transform: uppercase;">
                  Camp Pune Workshop & Help Desk
                </div>
                <div style="font-size: 12px; color: #AAAAAA; margin-top: 4px; line-height: 1.4;">
                  Shop 247, MG Road, Camp, Pune 411001<br>
                  Hours: Mon–Sat 10:30 AM – 8:30 PM · Sun 11:00 AM – 6:00 PM
                </div>
              </td>
              <td align="right" style="vertical-align: middle;">
                <a href="https://wa.me/919890990022?text=Hello%20Oriental%20Sports,%20inquiring%20about%20Order%20${encodeURIComponent(orderNumber)}" 
                   target="_blank"
                   style="display: inline-block; background-color: #C8102E; color: #FFFFFF; font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none; padding: 10px 16px; border-radius: 2px;">
                  WhatsApp Help Desk
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Editorial Footer -->
      <tr>
        <td style="padding: 24px 28px; background-color: #0E0E0E; text-align: center; color: #666666; font-size: 11px; line-height: 1.6;">
          <div style="font-weight: 700; color: #888888; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">
            ORIENTAL SPORTS PUNE · ESTABLISHED CAMP HEADQUARTERS
          </div>
          Authentic sports campaign · Professional electronic tension stringing · Turnkey court infrastructure.<br>
          For questions or custom string specifications, email <a href="mailto:oriental_sports@outlook.com" style="color: #888888; text-decoration: underline;">oriental_sports@outlook.com</a> or call <span style="color: #CCCCCC;">+91 98909 90022</span>.
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`;
}

/**
 * Build plain text version for strict text clients
 */
export function generateOrderEmailText(params: SendOrderEmailParams): string {
  const { order } = params;
  const stage = (params.stage || order.status || 'confirmed').toLowerCase();
  const stageConfig = getStageConfig(stage);
  const orderNumber = order.order_number || 'OS-ORDER';
  const customerName = params.recipientName || order.customer_name || 'Athlete Customer';
  const trackingNumber = params.trackingNumber || order.tracking_number;
  const carrier = params.carrier || order.carrier;

  let text = `ORIENTAL SPORTS PUNE\n`;
  text += `Shop 247, MG Road, Camp, Pune - 411001\n`;
  text += `==============================================\n\n`;
  text += `ORDER ${orderNumber} — ${stageConfig.badge}\n\n`;
  text += `Hello ${customerName},\n\n`;
  text += `${stageConfig.headline}\n`;
  text += `${stageConfig.message}\n\n`;

  if (trackingNumber || carrier) {
    text += `LOGISTICS & DISPATCH:\n`;
    if (carrier) text += `- Carrier: ${carrier}\n`;
    if (trackingNumber) text += `- Tracking AWB: ${trackingNumber}\n`;
    text += `\n`;
  }

  if (order.items && order.items.length > 0) {
    text += `ITEMS ORDERED:\n`;
    order.items.forEach((it) => {
      text += `- ${it.product_name} x ${it.quantity} @ ₹${it.price}\n`;
    });
    text += `\n`;
  }

  text += `TOTAL: ₹${order.total_amount || 0}\n`;
  text += `PAYMENT: ${order.payment_method || 'Verified Online / UPI'}\n\n`;
  text += `----------------------------------------------\n`;
  text += `Camp Flagship Desk: Shop 247 MG Road, Camp, Pune\n`;
  text += `WhatsApp / Phone: +91 98909 90022\n`;
  text += `Email: oriental_sports@outlook.com\n`;

  return text;
}

/**
 * Primary Email Dispatcher
 * Sends via Resend API using fetch.
 * If RESEND_API_KEY is not configured, logs clearly in server console
 * and returns { success: true, simulated: true }.
 */
export async function sendOrderStatusEmail(
  params: SendOrderEmailParams
): Promise<EmailSendResult> {
  const { order } = params;
  const stage = (params.stage || order.status || 'confirmed').toLowerCase();
  const orderNumber = order.order_number || 'OS-ORDER';

  const recipientEmail =
    params.recipientEmail ||
    order.customer_email ||
    (order.shipping_address as any)?.email;

  if (!recipientEmail || !recipientEmail.includes('@')) {
    console.warn(
      `[Email Dispatcher] Skipped email for order ${orderNumber}: No recipient email found.`
    );
    return {
      success: false,
      error: 'Missing recipient email address',
      orderNumber,
      stage,
    };
  }

  const stageConfig = getStageConfig(stage);
  const subject = `[${orderNumber}] ${stageConfig.headline} — Oriental Sports Camp Pune`;
  const htmlContent = generateOrderEmailHtml(params);
  const textContent = generateOrderEmailText(params);

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail =
    process.env.RESEND_FROM_EMAIL?.trim() || 'Oriental Sports <orders@orientalsports.in>';

  // Simulated Mode if API key is not yet set up
  if (!apiKey) {
    console.log('----------------------------------------------------');
    console.log('[ORIENTAL SPORTS EMAIL DISPATCHER — SIMULATED MODE]');
    console.log(`  To:      ${recipientEmail}`);
    console.log(`  From:    ${fromEmail}`);
    console.log(`  Subject: ${subject}`);
    console.log(`  Stage:   ${stage.toUpperCase()}`);
    console.log(`  Order:   ${orderNumber}`);
    console.log(`  Status:  ${stageConfig.headline}`);
    if (params.trackingNumber || order.tracking_number) {
      console.log(`  Tracking:${params.carrier || order.carrier} - ${params.trackingNumber || order.tracking_number}`);
    }
    console.log('  Notice:  RESEND_API_KEY is not set. Real email skipped safely.');
    console.log('----------------------------------------------------');

    return {
      success: true,
      simulated: true,
      stage,
      recipient: recipientEmail,
      orderNumber,
    };
  }

  // Real Resend API dispatch
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [recipientEmail],
        subject,
        html: htmlContent,
        text: textContent,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const errMsg = data?.message || data?.error || `Resend API returned HTTP ${res.status}`;
      console.error(`[Email Dispatcher] Resend error for order ${orderNumber}:`, errMsg);
      return {
        success: false,
        error: errMsg,
        orderNumber,
        stage,
        recipient: recipientEmail,
      };
    }

    console.log(
      `[Email Dispatcher] Successfully sent email to ${recipientEmail} for order ${orderNumber} (${stage}) [Resend ID: ${data?.id}]`
    );

    return {
      success: true,
      simulated: false,
      messageId: data?.id,
      stage,
      recipient: recipientEmail,
      orderNumber,
    };
  } catch (err: any) {
    console.error(`[Email Dispatcher] Network / Fetch error for order ${orderNumber}:`, err?.message || err);
    return {
      success: false,
      error: err?.message || 'Network error calling Resend API',
      orderNumber,
      stage,
      recipient: recipientEmail,
    };
  }
}

