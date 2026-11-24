import crypto from 'crypto';

/**
 * Server-only Cashfree Payment Gateway client. Talks to the REST API
 * directly (no SDK dependency). `CASHFREE_SECRET_KEY` must never reach the
 * browser — it is only read here, inside Route Handlers.
 *
 * Pinned to API version 2025-01-01 so a Cashfree-side default change can't
 * silently alter response shapes under us.
 */

const API_VERSION = '2025-01-01';
const REQUEST_TIMEOUT_MS = 15_000;

export type CashfreeMode = 'sandbox' | 'production';

export class CashfreeNotConfiguredError extends Error {
  constructor() {
    super('CASHFREE_APP_ID / CASHFREE_SECRET_KEY are not configured.');
    this.name = 'CashfreeNotConfiguredError';
  }
}

export function getCashfreeMode(): CashfreeMode {
  return process.env.CASHFREE_ENV === 'production' ? 'production' : 'sandbox';
}

export function isCashfreeConfigured(): boolean {
  return Boolean(process.env.CASHFREE_APP_ID && process.env.CASHFREE_SECRET_KEY);
}

function baseUrl(): string {
  return getCashfreeMode() === 'production'
    ? 'https://api.cashfree.com/pg'
    : 'https://sandbox.cashfree.com/pg';
}

async function cashfreeFetch<T>(path: string, init?: { method?: 'GET' | 'POST'; body?: unknown }): Promise<T> {
  const appId = process.env.CASHFREE_APP_ID;
  const secret = process.env.CASHFREE_SECRET_KEY;
  if (!appId || !secret) throw new CashfreeNotConfiguredError();

  const res = await fetch(`${baseUrl()}${path}`, {
    method: init?.method ?? 'GET',
    headers: {
      'x-client-id': appId,
      'x-client-secret': secret,
      'x-api-version': API_VERSION,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: init?.body ? JSON.stringify(init.body) : undefined,
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    cache: 'no-store',
  });

  const text = await res.text();
  let json: any = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    // non-JSON error body; fall through to the generic error below
  }

  if (!res.ok) {
    const message = json?.message || `Cashfree request failed (${res.status})`;
    const err = new Error(message) as Error & { status?: number; code?: string };
    err.status = res.status;
    err.code = json?.code;
    throw err;
  }

  return json as T;
}

// ---------------------------------------------------------------------------
// Orders
// ---------------------------------------------------------------------------

export interface CashfreeOrder {
  cf_order_id: string | number;
  order_id: string;
  order_amount: number;
  order_currency: string;
  /** ACTIVE | PAID | EXPIRED | TERMINATED | TERMINATION_REQUESTED */
  order_status: string;
  payment_session_id: string;
}

export interface CreateCashfreeOrderInput {
  orderId: string;
  amountRupees: number;
  customerId: string;
  customerPhone: string; // 10 digits, no country code
  customerEmail?: string;
  customerName?: string;
  returnUrl: string;
  /** Must be https — omit for local http development. */
  notifyUrl?: string;
}

export async function createCashfreeOrder(input: CreateCashfreeOrderInput): Promise<CashfreeOrder> {
  return cashfreeFetch<CashfreeOrder>('/orders', {
    method: 'POST',
    body: {
      order_id: input.orderId,
      order_amount: input.amountRupees,
      order_currency: 'INR',
      customer_details: {
        customer_id: input.customerId,
        customer_phone: input.customerPhone,
        ...(input.customerEmail ? { customer_email: input.customerEmail } : {}),
        ...(input.customerName ? { customer_name: input.customerName } : {}),
      },
      order_meta: {
        return_url: input.returnUrl,
        ...(input.notifyUrl ? { notify_url: input.notifyUrl } : {}),
      },
    },
  });
}

export function getCashfreeOrder(orderId: string): Promise<CashfreeOrder> {
  return cashfreeFetch<CashfreeOrder>(`/orders/${encodeURIComponent(orderId)}`);
}

interface CashfreePayment {
  cf_payment_id: string | number;
  /** SUCCESS | NOT_ATTEMPTED | FAILED | USER_DROPPED | VOID | CANCELLED | PENDING */
  payment_status: string;
  payment_amount: number;
  payment_currency: string;
}

function getCashfreePayments(orderId: string): Promise<CashfreePayment[]> {
  return cashfreeFetch<CashfreePayment[]>(`/orders/${encodeURIComponent(orderId)}/payments`);
}

export type CashfreeConfirmation =
  | { state: 'paid'; paymentId: string }
  | { state: 'pending' } // order still ACTIVE: customer hasn't completed (or is mid-payment)
  | { state: 'failed'; reason: string } // expired / terminated
  | { state: 'mismatch'; reason: string }; // paid, but amount/currency isn't what we asked for

/**
 * Asks Cashfree directly whether an order was paid. This — never the browser
 * callback or a webhook body — is what authorizes finalizing an order.
 * `expectedAmountRupees` is OUR stored total, so a tampered or mismatched
 * Cashfree order can't finalize a different-priced order.
 */
export async function confirmCashfreePayment(
  orderId: string,
  expectedAmountRupees: number
): Promise<CashfreeConfirmation> {
  const order = await getCashfreeOrder(orderId);

  if (order.order_status === 'ACTIVE') return { state: 'pending' };
  if (order.order_status !== 'PAID') {
    return { state: 'failed', reason: `order_${String(order.order_status).toLowerCase()}` };
  }

  if (order.order_currency !== 'INR') {
    return { state: 'mismatch', reason: 'currency_mismatch' };
  }
  // Compare in paise to avoid float noise.
  if (Math.round(Number(order.order_amount) * 100) !== Math.round(expectedAmountRupees * 100)) {
    return { state: 'mismatch', reason: 'amount_mismatch' };
  }

  const payments = await getCashfreePayments(orderId);
  const success = payments.find((p) => p.payment_status === 'SUCCESS');
  if (!success) {
    // PAID without a SUCCESS payment row shouldn't happen; treat as not yet
    // confirmable so the caller retries rather than finalizing blind.
    return { state: 'pending' };
  }

  return { state: 'paid', paymentId: String(success.cf_payment_id) };
}

// ---------------------------------------------------------------------------
// Webhook signature
// ---------------------------------------------------------------------------

/**
 * Cashfree signs webhooks as base64(HMAC-SHA256(timestamp + rawBody)) keyed
 * with the client secret, sent in `x-webhook-signature` alongside
 * `x-webhook-timestamp`. Must be computed over the RAW body, unparsed.
 */
export function verifyCashfreeWebhookSignature(
  rawBody: string,
  signature: string,
  timestamp: string
): boolean {
  const secret = process.env.CASHFREE_SECRET_KEY;
  if (!secret) return false;

  const expected = crypto.createHmac('sha256', secret).update(timestamp + rawBody).digest('base64');

  const a = Buffer.from(signature, 'utf8');
  const b = Buffer.from(expected, 'utf8');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Cashfree requires a bare 10-digit Indian mobile number. Returns null if we can't produce one. */
export function normalizeIndianMobile(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const digits = raw.replace(/\D/g, '');
  const local = digits.length > 10 ? digits.slice(-10) : digits;
  return /^[6-9]\d{9}$/.test(local) ? local : null;
}
