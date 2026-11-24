import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { saveProduct, unmarkProductsDeleted, getStorefrontMetadata, getRowMetadata } from '@/lib/catalog-store';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { broadcastRealtimeEvent } from '@/lib/supabase/broadcast';
import { revalidateAdminNav } from '@/lib/nav-counts';

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

type SpecRow = { label: string; value: string };

/** Specification rows from the form: trimmed, blanks dropped, sane limits. `undefined` means the form did not send any. */
function parseSpecRows(formData: FormData): SpecRow[] | undefined {
  const raw = formData.get('specs_json');
  if (typeof raw !== 'string' || !raw.trim()) return undefined;
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return undefined;
    return parsed
      .map((r: any) => ({ label: String(r?.label ?? '').trim().slice(0, 80), value: String(r?.value ?? '').trim().slice(0, 400) }))
      .filter((r: SpecRow) => r.label && r.value)
      .slice(0, 60);
  } catch {
    return undefined;
  }
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
    const stockQuantityRaw = getLatestNonEmpty(formData, 'stock_quantity');
    const stockQuantity = stockQuantityRaw ? Number(stockQuantityRaw) : 10;
    const lowStockThreshold = Number(getLatestNonEmpty(formData, 'low_stock_threshold')) || 5;
    const status = (getLatestNonEmpty(formData, 'status') || 'published') as 'draft' | 'published' | 'archived';
    const imageFitRaw = getLatestNonEmpty(formData, 'image_fit');
    const imageFit: 'cover' | 'contain' | 'fill' =
      imageFitRaw === 'contain' || imageFitRaw === 'fill' ? imageFitRaw : 'cover';
    const videoUrl = getLatestNonEmpty(formData, 'video_url') || null;
    const videoPublicId = getLatestNonEmpty(formData, 'video_public_id') || null;
    const specSheetUrl = getLatestNonEmpty(formData, 'spec_sheet_url') || null;
    const specSheetPublicId = getLatestNonEmpty(formData, 'spec_sheet_public_id') || null;
    const images = parseImages(formData);
    // "Enquire on WhatsApp" instead of Add to bag, ticked per product.
    const enquireWhatsapp = getLatestNonEmpty(formData, 'enquire_whatsapp') === '1';
    const specRows = parseSpecRows(formData);
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
      image_fit: imageFit,
      video_url: videoUrl,
      video_public_id: videoPublicId,
      spec_sheet_url: specSheetUrl,
      spec_sheet_public_id: specSheetPublicId,
      seo_title: seoTitle,
      seo_description: seoDescription,
    });

    const isUuid = Boolean(productId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(productId));

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
        image_fit: saved.image_fit,
        video_url: saved.video_url,
        video_public_id: saved.video_public_id,
        spec_sheet_url: saved.spec_sheet_url,
        spec_sheet_public_id: saved.spec_sheet_public_id,
        seo_title: saved.seo_title,
        seo_description: saved.seo_description,
        enquire_whatsapp: enquireWhatsapp,
      } as Record<string, any>,
      updated_at: new Date().toISOString(),
    };

    // Keep a seeded built-in product's full original record through the edit.
    const preservedStorefront = await getStorefrontMetadata([productId, originalSlug, saved.slug]);
    if (preservedStorefront) (supaPayload.metadata as any).storefront = preservedStorefront;

    // Specifications: use what the form sent; if it sent none (untouched), keep what is stored.
    if (specRows !== undefined) {
      supaPayload.metadata.spec_rows = specRows;
    } else {
      const existing = await getRowMetadata([productId, originalSlug, saved.slug]);
      if (Array.isArray(existing?.spec_rows)) supaPayload.metadata.spec_rows = existing!.spec_rows;
    }

    // Sync to Supabase (SDK -> REST fallback so uploads/edits ALWAYS reach Supabase)
    let supabaseSynced = false;
    let dbProductId = isUuid ? productId : '';

    try {
      const admin = createServiceRoleClient();
      let updated = false;
      if (isUuid) {
        const { error, data } = await admin
          .from('products')
          .update(supaPayload)
          .eq('id', productId)
          .select('id');
        if (!error && data && data.length > 0) {
          updated = true;
          dbProductId = data[0].id;
        }
      }
      if (!updated && (originalSlug || (!isUuid && productId))) {
        const matchSlug = originalSlug || productId;
        const { error, data } = await admin
          .from('products')
          .update(supaPayload)
          .eq('slug', matchSlug)
          .select('id');
        if (!error && data && data.length > 0) {
          updated = true;
          dbProductId = data[0].id;
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
          dbProductId = data[0].id;
        }
      }
      if (!updated) {
        const { error: upsertErr, data: upserted } = await admin
          .from('products')
          .upsert(
            {
              ...supaPayload,
              ...(isUuid ? { id: productId } : {}),
            },
            { onConflict: 'slug' }
          )
          .select('id');
        if (!upsertErr) {
          updated = true;
          if (upserted && upserted[0]?.id) dbProductId = upserted[0].id;
        } else {
          console.error('[products/save] Supabase SDK upsert error:', upsertErr.message);
        }
      }
      supabaseSynced = updated;
    } catch (e: any) {
      console.warn('[products/save] Supabase SDK unavailable, falling back to REST:', e?.message || e);
    }

    if (!supabaseSynced) {
      try {
        const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tvfzfvurqewgvnnhhhad.supabase.co';
        const supaKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_WAr2l8gZ0bvYJSY0x1murQ_OGSoDB50';
        const headers = {
          apikey: supaKey,
          Authorization: `Bearer ${supaKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        };

        const lookupFilters = [
          isUuid ? `id=eq.${encodeURIComponent(productId)}` : null,
          originalSlug ? `slug=eq.${encodeURIComponent(originalSlug)}` : null,
          !isUuid && productId ? `slug=eq.${encodeURIComponent(productId)}` : null,
          saved.slug ? `slug=eq.${encodeURIComponent(saved.slug)}` : null,
        ].filter(Boolean) as string[];

        let existingId: string | null = null;
        for (const f of lookupFilters) {
          const res = await fetch(`${supaUrl}/rest/v1/products?${f}&select=id&limit=1`, { headers, cache: 'no-store' });
          if (res.ok) {
            const rows = await res.json();
            if (Array.isArray(rows) && rows[0]?.id) {
              existingId = rows[0].id;
              break;
            }
          }
        }

        if (existingId) {
          const patchRes = await fetch(`${supaUrl}/rest/v1/products?id=eq.${encodeURIComponent(existingId)}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify(supaPayload),
          });
          if (patchRes.ok) {
            supabaseSynced = true;
            dbProductId = existingId;
          }
        } else {
          const postRes = await fetch(`${supaUrl}/rest/v1/products`, {
            method: 'POST',
            headers,
            body: JSON.stringify(supaPayload),
          });
          if (postRes.ok) {
            const inserted = await postRes.json();
            supabaseSynced = true;
            if (Array.isArray(inserted) && inserted[0]?.id) {
              dbProductId = inserted[0].id;
            }
          } else {
            console.error('[products/save] REST POST failed:', postRes.status, await postRes.text().catch(() => ''));
          }
        }
      } catch (restErr: any) {
        console.error('[products/save] REST fallback error:', restErr?.message || restErr);
      }
    }

    const finalProduct = dbProductId ? { ...saved, id: dbProductId } : saved;
    const targetId = dbProductId || saved.slug || slug;

    // Remove any prior deletion tombstone so a re-created slug immediately appears live
    await unmarkProductsDeleted([dbProductId, saved.id, saved.slug, originalSlug]);

    try {
      revalidateAdminNav();
      revalidatePath('/products');
      revalidatePath(`/products/${targetId}/edit`);
    } catch {}

    // Broadcast realtime update on oriental_sports_sync channel
    await broadcastRealtimeEvent('product_updated', {
      product: finalProduct,
      productId: targetId,
      slug: saved.slug,
      status: saved.status,
      stock_quantity: saved.stock_quantity,
    });

    return NextResponse.json({
      success: true,
      product: finalProduct,
      supabaseSynced,
      redirectUrl: supabaseSynced
        ? `/products/${targetId}/edit?saved=Product+saved+successfully`
        : `/products/${targetId}/edit?saved=Product+saved+locally%2C+but+live+site+sync+failed+%E2%80%94+retry+shortly`,
    });
  } catch (err: any) {
    console.error('API /api/products/save error:', err);
    return NextResponse.json({ success: false, error: err?.message || 'Failed to save product.' }, { status: 500 });
  }
}
