'use server';

import { requireAdmin } from '@/lib/require-admin';
import { getSeoProvider, type SeoSuggestions } from '@/lib/ai/seo-provider';

export type GenerateSeoResult =
  | { ok: true; suggestions: SeoSuggestions }
  | { ok: false; error: string };

/**
 * Simple in-memory debounce: blocks repeat "Generate" clicks for the same
 * product within MIN_INTERVAL_MS. Module-level Map survives across requests
 * within one server process — not durable/distributed, but this doesn't need
 * to be sophisticated, just not literally unlimited. Client also disables
 * the button while a request is in flight, but that alone isn't trustworthy.
 */
const lastGeneratedAt = new Map<string, number>();
const MIN_INTERVAL_MS = 15_000;

function rateLimitKey(productId: string | null | undefined, userId: string) {
  return `${userId}:${productId || 'new'}`;
}

/**
 * Server Action backing the "Generate SEO with AI" button. Never writes to
 * the database and never changes product status — it only returns
 * suggestions for the client to apply to the (unsaved) form state. The admin
 * still has to submit the normal product save action for anything to
 * persist.
 */
export async function generateSeoSuggestionsAction(
  productId: string | null,
  input: {
    name: string;
    brand: string;
    categoryName: string;
    description: string;
    price: number;
    sizes: string[];
    variants: unknown[];
    imageUrls: string[];
  }
): Promise<GenerateSeoResult> {
  const { user } = await requireAdmin();

  const key = rateLimitKey(productId, user.id);
  const now = Date.now();
  const last = lastGeneratedAt.get(key);
  if (last && now - last < MIN_INTERVAL_MS) {
    const waitSeconds = Math.ceil((MIN_INTERVAL_MS - (now - last)) / 1000);
    return { ok: false, error: `Please wait ${waitSeconds}s before generating again for this product.` };
  }
  lastGeneratedAt.set(key, now);

  if (!input.name.trim()) {
    return { ok: false, error: 'Add a product name before generating SEO suggestions.' };
  }

  const provider = getSeoProvider();
  const result = await provider.generateSeoSuggestions({
    name: input.name,
    brand: input.brand || null,
    categoryName: input.categoryName || null,
    description: input.description || null,
    price: input.price,
    sizes: input.sizes,
    variants: input.variants,
    imageUrls: input.imageUrls,
  });

  if (!result.ok) {
    lastGeneratedAt.delete(key);
    return { ok: false, error: result.error.message };
  }

  return { ok: true, suggestions: result.suggestions };
}
