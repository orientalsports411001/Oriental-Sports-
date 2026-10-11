import { NextResponse } from 'next/server';
import { getProductsByIds } from '@/lib/supabase/queries';

/**
 * Resolves a list of product ids to full, published product objects.
 * Used by client components (wishlist tab, order "buy again") that only
 * hold ids — `lib/supabase/queries.ts` is server-only, so it can't be
 * imported from those components directly.
 */
export async function POST(req: Request) {
  let body: { ids?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const ids = Array.isArray(body.ids) ? body.ids.filter((id): id is string => typeof id === 'string') : [];
  if (ids.length === 0) {
    return NextResponse.json({ products: [] });
  }

  const products = await getProductsByIds(ids);
  return NextResponse.json({ products });
}
