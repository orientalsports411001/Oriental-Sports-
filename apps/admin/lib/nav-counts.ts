import { revalidatePath } from 'next/cache';
import { getCachedOrders, getCachedProducts } from '@/lib/catalog-store';
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

export async function getAdminNavCounts(): Promise<{ productsCount: number; ordersCount: number }> {
  const cachedProducts = getCachedProducts();
  let productsCount = cachedProducts.length;
  let ordersCount = getCachedOrders().length;

  try {
    const admin = createServiceRoleClient();
    const { data: dbProducts } = await admin.from('products').select('id, slug');
    if (Array.isArray(dbProducts) && dbProducts.length > 0) {
      productsCount = uniqueProductCount(cachedProducts, dbProducts);
    }
  } catch {}

  // Direct PostgREST fallback if client failed or returned 131
  if (productsCount === cachedProducts.length) {
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
          productsCount = uniqueProductCount(cachedProducts, data);
        }
      }
    } catch {}
  }

  try {
    const admin = createServiceRoleClient();
    const { count: dbOrdersCount } = await admin.from('orders').select('id', { count: 'exact', head: true });
    if (typeof dbOrdersCount === 'number' && dbOrdersCount > 0) {
      ordersCount = dbOrdersCount;
    }
  } catch {}

  return { productsCount, ordersCount };
}

export function revalidateAdminNav() {
  revalidatePath('/', 'layout');
  revalidatePath('/dashboard', 'layout');
  revalidatePath('/products', 'layout');
  revalidatePath('/dashboard');
  revalidatePath('/products');
}
