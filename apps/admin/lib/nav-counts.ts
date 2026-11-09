import { revalidatePath } from 'next/cache';
import { getCachedOrdersAsync, getCachedProductsAsync, getLiveSupabaseProducts } from '@/lib/catalog-store';
import { createServiceRoleClient } from '@/lib/supabase/server';

function uniqueProductCount(
  cached: { id?: string; slug?: string }[],
  dbProducts: { id?: string; slug?: string }[]
): number {
  const seen = new Set<string>();
  let count = 0;

  const add = (id?: string | null, slug?: string | null) => {
    const idKey = id ? `id:${id}` : '';
    const slugKey = slug ? `slug:${slug}` : '';
    if ((idKey && seen.has(idKey)) || (slugKey && seen.has(slugKey))) return;
    if (idKey) seen.add(idKey);
    if (slugKey) seen.add(slugKey);
    count += 1;
  };

  for (const p of cached) add(p.id, p.slug);
  for (const p of dbProducts) add(p.id, p.slug);
  return count;
}

async function resolveProductsCount(cachedProducts: { id?: string; slug?: string }[]): Promise<number> {
  // getLiveSupabaseProducts() is memoized per-request (see catalog-store.ts) —
  // the dashboard/products pages already need this exact same full-table
  // read, so this no longer costs its own Supabase round trip.
  const dbProducts = await getLiveSupabaseProducts();
  if (dbProducts.length > 0) {
    return uniqueProductCount(cachedProducts, dbProducts);
  }

  // Direct PostgREST fallback — only when the primary read above genuinely
  // came back empty/failed, not just whenever the merged count happens to
  // equal the cached length (that's the common, successful case, and used
  // to trigger a second full-table fetch on every single page load).
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tvfzfvurqewgvnnhhhad.supabase.co';
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_WAr2l8gZ0bvYJSY0x1murQ_OGSoDB50';
    const res = await fetch(`${url}/rest/v1/products?select=id,slug`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      cache: 'no-store',
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return uniqueProductCount(cachedProducts, data);
      }
    }
  } catch {}

  return cachedProducts.length;
}

async function resolveOrdersCount(cachedCount: number): Promise<number> {
  try {
    const admin = createServiceRoleClient();
    const { count: dbOrdersCount } = await admin.from('orders').select('id', { count: 'exact', head: true });
    if (typeof dbOrdersCount === 'number') {
      return Math.max(cachedCount, dbOrdersCount);
    }
  } catch {}
  return cachedCount;
}

export async function getAdminNavCounts(): Promise<{ productsCount: number; ordersCount: number }> {
  const [cachedProducts, cachedOrders] = await Promise.all([getCachedProductsAsync(), getCachedOrdersAsync()]);

  const [productsCount, ordersCount] = await Promise.all([
    resolveProductsCount(cachedProducts),
    resolveOrdersCount(cachedOrders.length),
  ]);

  return { productsCount, ordersCount };
}

export function revalidateAdminNav() {
  revalidatePath('/', 'layout');
  revalidatePath('/dashboard', 'layout');
  revalidatePath('/products', 'layout');
  revalidatePath('/dashboard');
  revalidatePath('/products');
}
