'use server';

import { checkAdmin } from '@/lib/require-admin';
import { getSeoProvider, generateAlgorithmicSeoSuggestions, type SeoSuggestions } from '@/lib/ai/seo-provider';

export type GenerateSeoResult =
  | { ok: true; suggestions: SeoSuggestions }
  | { ok: false; error: string };

/**
 * In-memory debounce to protect against accidental rapid clicks.
 */
const lastGeneratedAt = new Map<string, number>();
const MIN_INTERVAL_MS = 2_000; // 2s debounce

function rateLimitKey(productId: string | null | undefined, userId: string) {
  return `${userId}:${productId || 'new'}`;
}

/**
 * Server Action backing the "Generate SEO" button in the admin product editor.
 * Resilient against network drops, missing API keys, or invalid inputs.
 */
export async function generateSeoSuggestionsAction(
  productId: string | null,
  input: {
    name?: string;
    brand?: string | null;
    categoryName?: string | null;
    description?: string | null;
    price?: number;
    sizes?: string[];
    variants?: unknown[];
    imageUrls?: string[];
  }
): Promise<GenerateSeoResult> {
  try {
    // 1. Safe admin session check without redirecting (prevents Next.js RPC crash)
    const adminCheck = await checkAdmin();
    if (!adminCheck.ok) {
      return { ok: false, error: adminCheck.error };
    }

    const { user } = adminCheck;
    const key = rateLimitKey(productId, user.id);
    const now = Date.now();
    const last = lastGeneratedAt.get(key);
    if (last && now - last < MIN_INTERVAL_MS) {
      const waitSeconds = Math.ceil((MIN_INTERVAL_MS - (now - last)) / 1000);
      return { ok: false, error: `Please wait ${waitSeconds}s before generating again.` };
    }
    lastGeneratedAt.set(key, now);

    // 2. Input sanitization
    const safeName = (input?.name || '').trim();
    if (!safeName) {
      return { ok: false, error: 'Add a product name before generating SEO suggestions.' };
    }

    const sanitizedInput = {
      name: safeName,
      brand: input?.brand ? String(input.brand).trim() : null,
      categoryName: input?.categoryName ? String(input.categoryName).trim() : null,
      description: input?.description ? String(input.description).trim() : null,
      price: Number(input?.price) || 0,
      sizes: Array.isArray(input?.sizes) ? input.sizes : [],
      variants: Array.isArray(input?.variants) ? input.variants : [],
      imageUrls: Array.isArray(input?.imageUrls) ? input.imageUrls.filter((u) => typeof u === 'string') : [],
    };

    // 3. Provider execution with fallback guarantee
    const provider = getSeoProvider();
    const result = await provider.generateSeoSuggestions(sanitizedInput);

    if (!result.ok) {
      // If AI provider failed, smoothly return verified algorithmic suggestions
      return {
        ok: true,
        suggestions: generateAlgorithmicSeoSuggestions(sanitizedInput),
      };
    }

    return { ok: true, suggestions: result.suggestions };
  } catch (err: any) {
    console.error('[generateSeoSuggestionsAction] Unexpected server error:', err);
    // Never crash or throw an unhandled digest exception in production:
    // Generate clean editorial fallback so the store manager is never blocked.
    try {
      const fallbackSuggestions = generateAlgorithmicSeoSuggestions({
        name: (input?.name || 'Athletic Gear').trim(),
        brand: input?.brand || null,
        categoryName: input?.categoryName || null,
        description: input?.description || null,
        price: Number(input?.price) || 0,
        sizes: Array.isArray(input?.sizes) ? input.sizes : [],
        variants: Array.isArray(input?.variants) ? input.variants : [],
        imageUrls: Array.isArray(input?.imageUrls) ? input.imageUrls : [],
      });
      return { ok: true, suggestions: fallbackSuggestions };
    } catch {
      return {
        ok: false,
        error: err?.message || 'Failed to generate SEO suggestions. Please try again.',
      };
    }
  }
}
