import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { saveProduct } from '@/lib/catalog-store';
import { createServiceRoleClient } from '@/lib/supabase/server';

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
      if (Array.isArray(parsed) && parsed.length > 0) return parsed.filter((x) => typeof x === 'string' && x.trim());
    } catch {
      const lines = parseLines(imagesRaw);
      if (lines.length > 0) return lines;
    }
  }

  return ['/images/products/cricket_bat_willow.webp'];
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const productId = getLatestNonEmpty(formData, 'productId') || getLatestNonEmpty(formData, 'id');
    const originalSlug = getLatestNonEmpty(formData, 'originalSlug');
    const name = getLatestNonEmpty(formData, 'name') || 'Untitled Product';
    const slug =
      getLatestNonEmpty(formData, 'slug') ||
      originalSlug ||
      name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') ||
      `prod-${Date.now()}`;
    const categorySlug = getLatestNonEmpty(formData, 'category_slug') || 'cricket';
    const brand = getLatestNonEmpty(formData, 'brand') || 'Oriental Sports';
    const description = getLatestNonEmpty(formData, 'description') || '';
    const price = Number(getLatestNonEmpty(formData, 'price')) || 0;
    const compareAtPriceRaw = getLatestNonEmpty(formData, 'compare_at_price');
    const compareAtPrice = compareAtPriceRaw ? Number(compareAtPriceRaw) : null;
    const stockQuantity = Number(getLatestNonEmpty(formData, 'stock_quantity')) || 10;
    const lowStockThreshold = Number(getLatestNonEmpty(formData, 'low_stock_threshold')) || 5;
    const status = (getLatestNonEmpty(formData, 'status') || 'published') as 'draft' | 'published' | 'archived';
    const images = parseImages(formData);
    const seoTitle = getLatestNonEmpty(formData, 'seo_title') || `${name} | Oriental Sports Pune`;
    const seoDescription =
      getLatestNonEmpty(formData, 'seo_description') ||
      (description ? description.slice(0, 160) : `${name} available at Oriental Sports Pune.`);

    // Update in-place in catalog-store (matches by id, originalSlug, or slug)
    const saved = saveProduct({
      id: productId || undefined,
      originalSlug: originalSlug || undefined,
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

    // In Supabase, if productId is provided, update by id first before attempting slug conflict
    try {
      const admin = createServiceRoleClient();
      const isUuid = productId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(productId);

      const supaPayload = {
        name: saved.name,
        slug: saved.slug,
        category_slug: saved.category_slug,
        brand: saved.brand,
        description: saved.description,
        price: saved.price,
        compare_at_price: saved.compare_at_price,
        images: saved.images,
        in_stock: saved.status === 'published' && (saved.stock_quantity ?? 1) > 0,
        metadata: {
          status: saved.status,
          stock_quantity: saved.stock_quantity,
          low_stock_threshold: saved.low_stock_threshold,
          seo_title: saved.seo_title,
          seo_description: saved.seo_description,
        },
        updated_at: new Date().toISOString(),
      };

      let updated = false;
      if (isUuid) {
        const { error, data } = await admin
          .from('products')
          .update(supaPayload)
          .eq('id', productId)
          .select('id');
        if (!error && data && data.length > 0) {
          updated = true;
        }
      }
      if (!updated && (originalSlug || productId)) {
        const matchSlug = originalSlug || productId;
        const { error, data } = await admin
          .from('products')
          .update(supaPayload)
          .eq('slug', matchSlug)
          .select('id');
        if (!error && data && data.length > 0) {
          updated = true;
        }
      }
      if (!updated && saved.slug) {
        const { error, data } = await admin
          .from('products')
          .update(supaPayload)
          .eq('slug', saved.slug)
          .select('id');
        if (!error && data && data.length > 0) {
          updated = true;
        }
      }
      if (!updated) {
        await admin.from('products').upsert(
          {
            ...supaPayload,
            ...(isUuid ? { id: productId } : {}),
          },
          { onConflict: 'slug' }
        );
      }
    } catch (e) {
      // Supabase update notice / fallback
    }

    const targetId = saved.id || saved.slug || slug;
    try {
      revalidatePath('/products');
      revalidatePath(`/products/${targetId}/edit`);
    } catch {}

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
