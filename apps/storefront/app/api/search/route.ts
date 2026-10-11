import { NextResponse } from 'next/server';
import { searchProducts } from '@/lib/supabase/queries';

/**
 * Backs the live-typing search modal — looks up published products by name/
 * brand/description via Postgres `ilike`. Kept as a route handler (rather
 * than letting the client import `lib/supabase/queries.ts` directly) because
 * that file is server-only.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') ?? '';
  const limitParam = Number(searchParams.get('limit'));
  const limit = Number.isFinite(limitParam) && limitParam > 0 ? Math.min(limitParam, 20) : 8;

  const products = await searchProducts(q, limit);
  return NextResponse.json({ products });
}
