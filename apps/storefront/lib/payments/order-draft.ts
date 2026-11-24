import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Provider-independent half of "start a checkout": turn a client cart
 * (product ids + quantities only — never prices) into server-priced totals
 * and an items snapshot. Shared by /api/razorpay/create-order and
 * /api/cashfree/create-order so the two providers can never disagree on
 * pricing, shipping or tax. The snapshot is what finalize_paid_order*
 * later uses to decrement stock and write order_items.
 */

export interface CartLine {
  productId: string;
  quantity: number;
  selectedVariant?: string | null;
  selectedSize?: string | null;
}

export interface CreateOrderBody {
  items: CartLine[];
  deliveryMethod?: 'doorstep' | 'camp_pickup';
  shippingAddress?: Record<string, unknown>;
}

export interface OrderDraft {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  deliveryMethod: 'doorstep' | 'camp_pickup';
  itemsSnapshot: Array<Record<string, unknown>>;
}

export type OrderDraftResult =
  | { ok: true; draft: OrderDraft }
  | { ok: false; status: number; error: string };

export async function buildOrderDraft(
  supabase: SupabaseClient,
  body: CreateOrderBody
): Promise<OrderDraftResult> {
  const items = Array.isArray(body.items) ? body.items : [];
  if (items.length === 0) {
    return { ok: false, status: 400, error: 'Cart is empty' };
  }

  const productIds = items.map((i) => i.productId);
  const { data: products, error } = await supabase
    .from('products')
    .select('id, slug, name, images, price, in_stock, stock_quantity')
    .in('id', productIds);

  if (error) {
    return { ok: false, status: 500, error: 'Failed to look up products' };
  }

  const productById = new Map((products ?? []).map((p: any) => [p.id, p]));

  let subtotal = 0;
  const itemsSnapshot: Array<Record<string, unknown>> = [];

  for (const line of items) {
    const product = productById.get(line.productId);
    if (!product) {
      return { ok: false, status: 400, error: `Unknown product: ${line.productId}` };
    }
    if (!product.in_stock) {
      return { ok: false, status: 400, error: `${product.name} is out of stock` };
    }
    const qty = Math.max(1, Math.floor(line.quantity || 1));
    // Early, non-authoritative check — the authoritative, race-safe check is
    // the atomic decrement inside finalize_paid_order* at payment time.
    if (product.stock_quantity !== null && product.stock_quantity < qty) {
      return { ok: false, status: 409, error: `${product.name} does not have enough stock` };
    }
    subtotal += Number(product.price) * qty;
    itemsSnapshot.push({
      productId: product.id,
      productSlug: product.slug,
      productName: product.name,
      productImage: product.images?.[0] ?? null,
      price: Number(product.price),
      quantity: qty,
      selectedVariant: line.selectedVariant ?? null,
      selectedSize: line.selectedSize ?? null,
    });
  }

  const deliveryMethod = body.deliveryMethod === 'camp_pickup' ? 'camp_pickup' : 'doorstep';
  const shipping = deliveryMethod === 'camp_pickup' || subtotal >= 2000 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const total = Math.round(subtotal + shipping + tax);

  return { ok: true, draft: { subtotal, shipping, tax, total, deliveryMethod, itemsSnapshot } };
}

export function generateOrderNumber(): string {
  return `OS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
}
