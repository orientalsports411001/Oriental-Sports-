import { NextRequest, NextResponse } from 'next/server';
import { getSeoProvider, generateAlgorithmicSeoSuggestions } from '@/lib/ai/seo-provider';

export async function POST(req: NextRequest) {
  try {
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

    const provider = getSeoProvider();
    const result = await provider.generateSeoSuggestions(sanitizedInput);

    if (result.ok) {
      return NextResponse.json({ ok: true, suggestions: result.suggestions });
    }

    // Fallback to verified algorithmic suggestions
    return NextResponse.json({
      ok: true,
      suggestions: generateAlgorithmicSeoSuggestions(sanitizedInput),
    });
  } catch (err: any) {
    console.error('[API /api/seo/generate error]:', err);
    try {
      const body = await req.json().catch(() => ({}));
      const fallback = generateAlgorithmicSeoSuggestions({
        name: String(body?.name || 'Athletic Gear').trim(),
        brand: body?.brand || null,
        categoryName: body?.categoryName || null,
        description: body?.description || null,
        price: Number(body?.price) || 0,
        sizes: [],
        variants: [],
        imageUrls: [],
      });
      return NextResponse.json({ ok: true, suggestions: fallback });
    } catch {
      return NextResponse.json({ ok: false, error: err?.message || 'Server error' }, { status: 500 });
    }
  }
}

