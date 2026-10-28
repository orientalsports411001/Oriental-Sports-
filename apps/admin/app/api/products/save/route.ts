import { NextResponse } from 'next/server';
import { saveProduct } from '@/lib/catalog-store';

function getLatestNonEmpty(formData: FormData, key: string): string {
  const all = formData.getAll(key);
  for (let i = all.length - 1; i >= 0; i--) {
    const val = String(all[i] || '').trim();
    if (val) return val;
  }
  return '';
}

function parseLines(value: string | null): string[] {
  if (!value) return [];
  return value
    .split('\n')
    .map((v) => v.trim())
    .filter(Boolean);
}

function parseImages(formData: FormData): string[] {
  const imagesJson = formData.get('images_json');
  if (typeof imagesJson === 'string' && imagesJson.trim()) {
    try {
      const parsed = JSON.parse(imagesJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.filter((x) => typeof x === 'string' && x.trim());
      }
    } catch {}
  }

  const imagesRaw = formData.get('images');
  if (typeof imagesRaw === 'string' && imagesRaw.trim()) {
    try {
      const parsed = JSON.parse(imagesRaw);
      if (Array.isArray(parsed)) return parsed.filter((x) => typeof x === 'string' && x.trim());
    } catch {
      return parseLines(imagesRaw);
    }
  }

  return ['/images/products/cricket_bat_willow.webp'];
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const productId = getLatestNonEmpty(formData, 'productId') || getLatestNonEmpty(formData, 'id');
    const name = getLatestNonEmpty(formData, 'name');
    const slug = getLatestNonEmpty(formData, 'slug') || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const categorySlug = getLatestNonEmpty(formData, 'category_slug') || 'cricket';
    const brand = getLatestNonEmpty(formData, 'brand') || 'Oriental Sports';
    const description = getLatestNonEmpty(formData, 'description');
    const price = Number(getLatestNonEmpty(formData, 'price') || 0);
    const compareAtPriceRaw = getLatestNonEmpty(formData, 'compare_at_price');
    const compareAtPrice = compareAtPriceRaw ? Number(compareAtPriceRaw) : null;
    const stockQuantity = Number(getLatestNonEmpty(formData, 'stock_quantity') || 10);
    const lowStockThreshold = Number(getLatestNonEmpty(formData, 'low_stock_threshold') || 5);
    const status = (getLatestNonEmpty(formData, 'status') || 'published') as 'draft' | 'published' | 'archived';
    const images = parseImages(formData);
    const seoTitle = getLatestNonEmpty(formData, 'seo_title') || `${name} | Oriental Sports Pune`;
    const seoDescription = getLatestNonEmpty(formData, 'seo_description') || description.slice(0, 160);

    if (!name || name.length < 3) {
      return NextResponse.json({ success: false, error: 'Product title must be at least 3 characters.' }, { status: 400 });
    }
    if (!(price > 0)) {
      return NextResponse.json({ success: false, error: 'Price must be greater than 0.' }, { status: 400 });
    }

    const saved = saveProduct({
      id: productId || undefined,
      name,
      slug,
      brand,
      category_slug: categorySlug,
      description,
      price,
      compare_at_price: compareAtPrice,
      images,
      status,
      stock_quantity: stockQuantity,
      low_stock_threshold: lowStockThreshold,
      seo_title: seoTitle,
      seo_description: seoDescription,
    });

    const targetId = saved.id || saved.slug || slug;
    return NextResponse.json({
      success: true,
      product: saved,
      redirectUrl: `/products/${targetId}/edit?saved=Product+saved+successfully`,
    });
  } catch (err: any) {
    console.error('API /api/products/save error:', err);
    return NextResponse.json({ success: false, error: err?.message || 'Failed to save product.' }, { status: 500 });
  }
}
