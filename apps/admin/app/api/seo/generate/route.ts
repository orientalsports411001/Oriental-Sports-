import { NextRequest, NextResponse } from 'next/server';
import { getSeoProvider, generateAlgorithmicSeoSuggestions } from '@/lib/ai/seo-provider';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const name = String(body.name || '').trim();

  if (!name) {
    return NextResponse.json({ ok: false, error: 'Product name is required.' }, { status: 400 });
  }

  const sanitizedInput = {
    name,
    brand: body.brand ? String(body.brand).trim() : null,
    categoryName: body.categoryName ? String(body.categoryName).trim() : null,
    description: body.description ? String(body.description).trim() : null,
    price: Number(body.price) || 0,
    sizes: Array.isArray(body.sizes) ? body.sizes : [],
    variants: Array.isArray(body.variants) ? body.variants : [],
    imageUrls: Array.isArray(body.imageUrls) ? body.imageUrls.filter((u: any) => typeof u === 'string') : [],
  };

  try {
    const provider = getSeoProvider();
    const result = await provider.generateSeoSuggestions(sanitizedInput);

    if (result.ok) {
      return NextResponse.json({ ok: true, suggestions: result.suggestions });
    }

    // Fallback to verified algorithmic suggestions — still uses the real
    // parsed product name, not a placeholder.
    return NextResponse.json({
      ok: true,
      suggestions: generateAlgorithmicSeoSuggestions(sanitizedInput),
      usedFallback: true,
    });
  } catch (err: any) {
    console.error('[API /api/seo/generate error]:', err);
    // The request body was already consumed above, so the fallback reuses
    // sanitizedInput (which has the real product name) instead of trying
    // to re-read req.json(), which would always resolve empty here.
    const fallback = generateAlgorithmicSeoSuggestions(sanitizedInput);
    return NextResponse.json({ ok: true, suggestions: fallback, usedFallback: true });
  }
}
