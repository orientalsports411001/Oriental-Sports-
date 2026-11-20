'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { checkAdmin } from '@/lib/require-admin';
import { saveProduct, removeProduct, getCachedProducts, unmarkProductsDeleted, getStorefrontMetadata } from '@/lib/catalog-store';
import { broadcastRealtimeEvent } from '@/lib/supabase/broadcast';
import { revalidateAdminNav } from '@/lib/nav-counts';

function parseLines(value: string | null): string[] {
  if (!value) return [];
  return value
    .split('\n')
    .map((v) => v.trim())
    .filter(Boolean);
}

function parseJsonArray(value: string | null): unknown[] {
  if (!value || !value.trim()) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function parseAltTextMap(value: string | null): Record<string, string> {
  if (!value || !value.trim()) return {};
  try {
    const parsed = JSON.parse(value);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof v === 'string' && v.trim()) out[k] = v;
    }
    return out;
  } catch {
    return {};
  }
}

function parsePublicIdMap(value: string | null): Record<string, string> {
  return parseAltTextMap(value);
}

function parseImages(formData: FormData): string[] {
  const imagesJson = formData.get('images_json');
  if (typeof imagesJson === 'string' && imagesJson.trim()) {
    try {
      const parsed = JSON.parse(imagesJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.filter((x) => typeof x === 'string' && x.trim());
      }
    } catch {
      // ignore
    }
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

  return [];
}

function parseSizes(formData: FormData): string[] {
  const raw = formData.get('sizes') || formData.get('available_sizes');
  return parseLines(typeof raw === 'string' ? raw : null);
}

function parseVariants(formData: FormData): unknown[] {
  const raw = formData.get('variants_json') || formData.get('variants');
  return parseJsonArray(typeof raw === 'string' ? raw : null);
}

function getLatestNonEmpty(formData: FormData, key: string): string {
  const all = formData.getAll(key);
  for (let i = all.length - 1; i >= 0; i--) {
    const val = String(all[i] || '').trim();
    if (val) return val;
  }
  return '';
}

function validateForPublish(fields: {
  name: string;
  price: number;
  categorySlug: string;
  images: string[];
}): string | null {
  if (!fields.name.trim()) return 'Name is required to publish.';
  if (!(fields.price > 0)) return 'Price must be greater than 0 to publish.';
  if (!fields.categorySlug) return 'A sport discipline / category is required to publish.';
  if (fields.images.length === 0) return 'At least one product image is required to publish.';
  return null;
}

/**
 * Helper: check if an error is a Next.js redirect (NEXT_REDIRECT).
 */
function isRedirectError(err: unknown): boolean {
  if (err && typeof err === 'object' && 'digest' in err) {
    const digest = (err as { digest?: string }).digest;
    return typeof digest === 'string' && digest.startsWith('NEXT_REDIRECT');
  }
  return false;
}

/**
 * Safe admin check for Server Actions.
 */
async function ensureAdmin() {
  const result = await checkAdmin();
  if (!result.ok) {
    redirect('/login');
  }
  return { user: result.user, profile: result.profile };
}

function buildProductPayload(formData: FormData) {
  const name = getLatestNonEmpty(formData, 'name');
  const slug = getLatestNonEmpty(formData, 'slug');
  const categorySlug = getLatestNonEmpty(formData, 'category_slug');
  const brand = getLatestNonEmpty(formData, 'brand');
  const description = getLatestNonEmpty(formData, 'description');
  const price = Number(getLatestNonEmpty(formData, 'price') || 0);
  const compareAtPriceRaw = getLatestNonEmpty(formData, 'compare_at_price');
  const compareAtPrice = compareAtPriceRaw ? Number(compareAtPriceRaw) : null;
  const images = parseImages(formData);
  const sizes = parseSizes(formData);
  const variants = parseVariants(formData);
  const stockQuantity = Number(getLatestNonEmpty(formData, 'stock_quantity') || 0);
  const lowStockThreshold = Number(getLatestNonEmpty(formData, 'low_stock_threshold') || 5);
  const requestedStatus = getLatestNonEmpty(formData, 'status') || 'published';
  const imageFitRaw = getLatestNonEmpty(formData, 'image_fit');
  const imageFit: 'cover' | 'contain' | 'fill' =
    imageFitRaw === 'contain' || imageFitRaw === 'fill' ? imageFitRaw : 'cover';

  const seoTitle = getLatestNonEmpty(formData, 'seo_title');
  const seoDescription = getLatestNonEmpty(formData, 'seo_description');
  const seoKeywords = parseLines(getLatestNonEmpty(formData, 'seo_keywords'));
  const ogTitle = getLatestNonEmpty(formData, 'og_title');
  const ogDescription = getLatestNonEmpty(formData, 'og_description');
  const imageAltText = parseAltTextMap(getLatestNonEmpty(formData, 'image_alt_text'));
  const cloudinaryPublicIds = parsePublicIdMap(getLatestNonEmpty(formData, 'cloudinary_public_ids'));

  return {
    name,
    slug,
    categorySlug,
    brand,
    description,
    price,
    compareAtPrice,
    images,
    sizes,
    variants,
    stockQuantity,
    lowStockThreshold,
    requestedStatus,
    imageFit,
    seoTitle,
    seoDescription,
    seoKeywords,
    ogTitle,
    ogDescription,
    imageAltText,
    cloudinaryPublicIds,
  };
}

export async function createProduct(formData: FormData) {
  await ensureAdmin();
  const fields = buildProductPayload(formData);

  let status = fields.requestedStatus as 'draft' | 'published' | 'archived';
  let publishError: string | null = null;
  if (status === 'published') {
    publishError = validateForPublish({
      name: fields.name,
      price: fields.price,
      categorySlug: fields.categorySlug,
      images: fields.images,
    });
    if (publishError) status = 'draft';
  }

  let createdId = '';

  try {
    const admin = createServiceRoleClient();
    const { data, error } = await admin
      .from('products')
      .insert({
        name: fields.name,
        slug: fields.slug,
        category_slug: fields.categorySlug || null,
        brand: fields.brand,
        description: fields.description,
        price: fields.price,
        compare_at_price: fields.compareAtPrice,
        images: fields.images,
        in_stock: status === 'published' && (fields.stockQuantity ?? 1) > 0,
        sizes: fields.sizes,
        variants: fields.variants,
        metadata: {
          status,
          stock_quantity: fields.stockQuantity,
          low_stock_threshold: fields.lowStockThreshold,
      image_fit: fields.imageFit,
          seo_title: fields.seoTitle || null,
          seo_description: fields.seoDescription || null,
          seo_keywords: fields.seoKeywords,
          og_title: fields.ogTitle || null,
          og_description: fields.ogDescription || null,
          image_alt_text: fields.imageAltText,
          cloudinary_public_ids: fields.cloudinaryPublicIds,
        },
      })
      .select('id')
      .single();

    if (error) throw error;
    if (data) createdId = data.id;
  } catch (err) {
    if (isRedirectError(err)) throw err;
    console.warn('[createProduct] Supabase insert notice, attempting REST fallback:', err);
    try {
      const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tvfzfvurqewgvnnhhhad.supabase.co';
      const supaKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_WAr2l8gZ0bvYJSY0x1murQ_OGSoDB50';
      const res = await fetch(`${supaUrl}/rest/v1/products`, {
        method: 'POST',
        headers: {
          apikey: supaKey,
          Authorization: `Bearer ${supaKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify({
          name: fields.name,
          slug: fields.slug,
          category_slug: fields.categorySlug || null,
          brand: fields.brand,
          description: fields.description,
          price: fields.price,
          compare_at_price: fields.compareAtPrice,
          images: fields.images,
          in_stock: status === 'published' && (fields.stockQuantity ?? 1) > 0,
          sizes: fields.sizes,
          variants: fields.variants,
          metadata: {
            status,
            stock_quantity: fields.stockQuantity,
            low_stock_threshold: fields.lowStockThreshold,
      image_fit: fields.imageFit,
            seo_title: fields.seoTitle || null,
            seo_description: fields.seoDescription || null,
            seo_keywords: fields.seoKeywords,
            og_title: fields.ogTitle || null,
            og_description: fields.ogDescription || null,
            image_alt_text: fields.imageAltText,
            cloudinary_public_ids: fields.cloudinaryPublicIds,
          },
        }),
      });
      if (res.ok) {
        const inserted = await res.json();
        if (Array.isArray(inserted) && inserted[0]?.id) {
          createdId = inserted[0].id;
        }
      }
    } catch (restErr) {
      console.warn('[createProduct] REST fallback insert notice:', restErr);
    }
  }

  if (!createdId) {
    const saved = saveProduct({
      id: createdId,
      name: fields.name,
      slug: fields.slug,
      brand: fields.brand,
      category_slug: fields.categorySlug,
      description: fields.description,
      price: fields.price,
      compare_at_price: fields.compareAtPrice,
      images: fields.images,
      status,
      stock_quantity: fields.stockQuantity,
      low_stock_threshold: fields.lowStockThreshold,
      image_fit: fields.imageFit,
      seo_title: fields.seoTitle,
      seo_description: fields.seoDescription,
    });
    createdId = saved.id;
  }

  // If this slug/id was previously deleted, remove its tombstone so it appears on both admin and storefront
  await unmarkProductsDeleted([createdId, fields.slug]);
  await broadcastRealtimeEvent('product_updated', { productId: createdId, slug: fields.slug });
  revalidateAdminNav();
  revalidatePath('/products');

  if (publishError) {
    redirect(`/products/${createdId}/edit?error=${encodeURIComponent(publishError)}`);
  }

  redirect(`/products/${createdId}/edit?saved=Product+created+successfully`);
}

export async function updateProduct(productId: string, formData: FormData) {
  await ensureAdmin();
  const fields = buildProductPayload(formData);
  const originalSlug = getLatestNonEmpty(formData, 'originalSlug');

  let status = fields.requestedStatus as 'draft' | 'published' | 'archived';
  let publishError: string | null = null;
  if (status === 'published') {
    publishError = validateForPublish({
      name: fields.name,
      price: fields.price,
      categorySlug: fields.categorySlug,
      images: fields.images,
    });
    if (publishError) status = 'draft';
  }

  const updatePayload = {
    name: fields.name,
    slug: fields.slug,
    category_slug: fields.categorySlug || null,
    brand: fields.brand,
    description: fields.description,
    price: fields.price,
    compare_at_price: fields.compareAtPrice,
    images: fields.images,
    in_stock: status === 'published' && (fields.stockQuantity ?? 1) > 0,
    sizes: fields.sizes,
    variants: fields.variants,
    metadata: {
      status,
      stock_quantity: fields.stockQuantity,
      low_stock_threshold: fields.lowStockThreshold,
      image_fit: fields.imageFit,
      seo_title: fields.seoTitle || null,
      seo_description: fields.seoDescription || null,
      seo_keywords: fields.seoKeywords,
      og_title: fields.ogTitle || null,
      og_description: fields.ogDescription || null,
      image_alt_text: fields.imageAltText,
      cloudinary_public_ids: fields.cloudinaryPublicIds,
    },
    updated_at: new Date().toISOString(),
  };

  // Keep a seeded built-in product's full original record through the edit.
  const preservedStorefront = await getStorefrontMetadata([productId, originalSlug, fields.slug]);
  if (preservedStorefront) (updatePayload.metadata as any).storefront = preservedStorefront;

  let targetEditId = productId;

  try {
    const admin = createServiceRoleClient();
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(productId);

    let existingId: string | null = null;

    if (isUuid) {
      const { data: byId } = await admin.from('products').select('id').eq('id', productId).maybeSingle();
      if (byId?.id) existingId = byId.id;
    }

    if (!existingId && originalSlug) {
      const { data: byOrigSlug } = await admin.from('products').select('id').eq('slug', originalSlug).maybeSingle();
      if (byOrigSlug?.id) existingId = byOrigSlug.id;
    }

    if (!existingId && productId) {
      const { data: bySlug } = await admin.from('products').select('id').eq('slug', productId).maybeSingle();
      if (bySlug?.id) existingId = bySlug.id;
    }

    if (!existingId && fields.slug) {
      const { data: byFieldSlug } = await admin.from('products').select('id').eq('slug', fields.slug).maybeSingle();
      if (byFieldSlug?.id) existingId = byFieldSlug.id;
    }

    if (existingId) {
      const { error } = await admin
        .from('products')
        .update(updatePayload)
        .eq('id', existingId);
      if (error) throw error;
      targetEditId = existingId;
    } else {
      const insertData: any = {
        ...updatePayload,
        slug: fields.slug,
      };
      if (isUuid) insertData.id = productId;
      const { data: inserted, error } = await admin
        .from('products')
        .insert(insertData)
        .select('id')
        .single();
      if (error) throw error;
      if (inserted?.id) targetEditId = inserted.id;
    }
  } catch (err) {
    if (isRedirectError(err)) throw err;
    console.warn('[updateProduct] Database update notice, attempting REST fallback:', err);
    try {
      const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tvfzfvurqewgvnnhhhad.supabase.co';
      const supaKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_WAr2l8gZ0bvYJSY0x1murQ_OGSoDB50';
      const headers = {
        apikey: supaKey,
        Authorization: `Bearer ${supaKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      };
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(productId);
      const lookupFilters = [
        isUuid ? `id=eq.${encodeURIComponent(productId)}` : null,
        originalSlug ? `slug=eq.${encodeURIComponent(originalSlug)}` : null,
        !isUuid && productId ? `slug=eq.${encodeURIComponent(productId)}` : null,
        fields.slug ? `slug=eq.${encodeURIComponent(fields.slug)}` : null,
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
        await fetch(`${supaUrl}/rest/v1/products?id=eq.${encodeURIComponent(existingId)}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify(updatePayload),
        });
        targetEditId = existingId;
      } else {
        const insertRes = await fetch(`${supaUrl}/rest/v1/products`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ ...updatePayload, slug: fields.slug }),
        });
        if (insertRes.ok) {
          const inserted = await insertRes.json();
          if (Array.isArray(inserted) && inserted[0]?.id) {
            targetEditId = inserted[0].id;
          }
        }
      }
    } catch (restErr) {
      console.warn('[updateProduct] REST fallback notice:', restErr);
    }
  }

  targetEditId = targetEditId || fields.slug || productId;

  await broadcastRealtimeEvent('product_updated', { productId: targetEditId, slug: fields.slug });
  revalidateAdminNav();
  revalidatePath('/products');
  revalidatePath(`/products/${targetEditId}/edit`);

  if (publishError) {
    redirect(`/products/${targetEditId}/edit?error=${encodeURIComponent(publishError)}`);
  }
  redirect(`/products/${targetEditId}/edit?saved=Product+saved+successfully`);
}

export async function toggleProductVisibility(productId: string, currentStatus: string) {
  await ensureAdmin();

  const newStatus: 'published' | 'draft' = currentStatus === 'published' ? 'draft' : 'published';
  const inStock = newStatus === 'published';

  const cached = getCachedProducts().find((p) => p.id === productId || p.slug === productId);
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(productId);
  const targetSlug = cached?.slug || (!isUuid ? productId : undefined);

  // Update in Supabase (SDK -> REST fallback)
  let updatedInSupabase = false;
  try {
    const admin = createServiceRoleClient();
    const { data: existing } = await (isUuid
      ? admin.from('products').select('id, metadata').eq('id', productId).maybeSingle()
      : admin.from('products').select('id, metadata').eq('slug', targetSlug || productId).maybeSingle());

    if (existing) {
      const updatedMetadata = {
        ...(existing.metadata || {}),
        status: newStatus,
      };
      const { error } = await admin
        .from('products')
        .update({ in_stock: inStock, metadata: updatedMetadata, updated_at: new Date().toISOString() })
        .eq('id', existing.id);
      if (!error) updatedInSupabase = true;
    }
  } catch (err) {
    console.warn('[toggleProductVisibility] Supabase SDK notice:', err);
  }

  if (!updatedInSupabase) {
    try {
      const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tvfzfvurqewgvnnhhhad.supabase.co';
      const supaKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_WAr2l8gZ0bvYJSY0x1murQ_OGSoDB50';
      const headers = {
        apikey: supaKey,
        Authorization: `Bearer ${supaKey}`,
        'Content-Type': 'application/json',
      };
      const filter = isUuid
        ? `id=eq.${encodeURIComponent(productId)}`
        : `slug=eq.${encodeURIComponent(targetSlug || productId)}`;
      const lookup = await fetch(`${supaUrl}/rest/v1/products?${filter}&select=id,metadata&limit=1`, {
        headers,
        cache: 'no-store',
      });
      const rows = lookup.ok ? await lookup.json() : [];
      if (Array.isArray(rows) && rows[0]?.id) {
        const updatedMetadata = { ...(rows[0].metadata || {}), status: newStatus };
        await fetch(`${supaUrl}/rest/v1/products?id=eq.${encodeURIComponent(rows[0].id)}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify({
            in_stock: inStock,
            metadata: updatedMetadata,
            updated_at: new Date().toISOString(),
          }),
        });
      } else if (cached) {
        // Base static product toggled for the first time — persist override row in Supabase
        await fetch(`${supaUrl}/rest/v1/products`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            name: cached.name,
            slug: cached.slug,
            category_slug: cached.category_slug || 'accessories',
            brand: cached.brand || 'Oriental Sports',
            description: cached.description || '',
            price: Number(cached.price || 0),
            compare_at_price: cached.compare_at_price ?? null,
            images: cached.images || [],
            in_stock: inStock,
            metadata: {
              status: newStatus,
              stock_quantity: Number(cached.stock_quantity ?? 10),
              low_stock_threshold: Number(cached.low_stock_threshold ?? 5),
            },
          }),
        });
      }
    } catch {}
  }

  await broadcastRealtimeEvent('product_updated', {
    productId,
    status: newStatus,
  });

  revalidateAdminNav();
  revalidatePath('/products');
  return { success: true, status: newStatus };
}

export async function restockProduct(productId: string, newStock: number) {
  await ensureAdmin();

  const quantity = Math.max(0, Number(newStock) || 0);
  const status: 'published' | 'draft' = quantity > 0 ? 'published' : 'draft';

  const cached = getCachedProducts().find((p) => p.id === productId || p.slug === productId);
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(productId);
  const targetSlug = cached?.slug || (!isUuid ? productId : undefined);

  // Update in Supabase (SDK -> REST fallback)
  let updatedInSupabase = false;
  try {
    const admin = createServiceRoleClient();
    const { data: existing } = await (isUuid
      ? admin.from('products').select('id, metadata').eq('id', productId).maybeSingle()
      : admin.from('products').select('id, metadata').eq('slug', targetSlug || productId).maybeSingle());

    if (existing) {
      const updatedMetadata = {
        ...(existing.metadata || {}),
        stock_quantity: quantity,
        ...(quantity > 0 ? { status: 'published' } : {}),
      };
      const { error } = await admin
        .from('products')
        .update({ in_stock: quantity > 0, metadata: updatedMetadata, updated_at: new Date().toISOString() })
        .eq('id', existing.id);
      if (!error) updatedInSupabase = true;
    }
  } catch (err) {
    console.warn('[restockProduct] Supabase SDK notice:', err);
  }

  if (!updatedInSupabase) {
    try {
      const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tvfzfvurqewgvnnhhhad.supabase.co';
      const supaKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_WAr2l8gZ0bvYJSY0x1murQ_OGSoDB50';
      const headers = {
        apikey: supaKey,
        Authorization: `Bearer ${supaKey}`,
        'Content-Type': 'application/json',
      };
      const filter = isUuid
        ? `id=eq.${encodeURIComponent(productId)}`
        : `slug=eq.${encodeURIComponent(targetSlug || productId)}`;
      const lookup = await fetch(`${supaUrl}/rest/v1/products?${filter}&select=id,metadata&limit=1`, {
        headers,
        cache: 'no-store',
      });
      const rows = lookup.ok ? await lookup.json() : [];
      if (Array.isArray(rows) && rows[0]?.id) {
        const updatedMetadata = {
          ...(rows[0].metadata || {}),
          stock_quantity: quantity,
          ...(quantity > 0 ? { status: 'published' } : {}),
        };
        await fetch(`${supaUrl}/rest/v1/products?id=eq.${encodeURIComponent(rows[0].id)}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify({
            in_stock: quantity > 0,
            metadata: updatedMetadata,
            updated_at: new Date().toISOString(),
          }),
        });
      } else if (cached) {
        await fetch(`${supaUrl}/rest/v1/products`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            name: cached.name,
            slug: cached.slug,
            category_slug: cached.category_slug || 'accessories',
            brand: cached.brand || 'Oriental Sports',
            description: cached.description || '',
            price: Number(cached.price || 0),
            compare_at_price: cached.compare_at_price ?? null,
            images: cached.images || [],
            in_stock: quantity > 0,
            metadata: {
              status: quantity > 0 ? 'published' : status,
              stock_quantity: quantity,
              low_stock_threshold: Number(cached.low_stock_threshold ?? 5),
            },
          }),
        });
      }
    } catch {}
  }

  await broadcastRealtimeEvent('product_updated', {
    productId,
    stock_quantity: quantity,
    status: quantity > 0 ? 'published' : 'draft',
  });

  revalidateAdminNav();
  revalidatePath('/products');
  return { success: true, stock_quantity: quantity, status: quantity > 0 ? 'published' : 'draft' };
}

export async function adjustStock(productId: string, formData: FormData) {
  const { user } = await ensureAdmin();
  const delta = Number(formData.get('delta') || 0);
  const reason = String(formData.get('reason') || '').trim();

  if (!delta) {
    redirect(`/products/${productId}/edit?error=${encodeURIComponent('Adjustment delta cannot be zero.')}`);
  }

  try {
    const admin = createServiceRoleClient();
    const { error } = await admin.rpc('adjust_product_stock', {
      p_product_id: productId,
      p_delta: delta,
      p_reason: reason || null,
      p_created_by: user.id,
    });
    if (error) throw error;
  } catch (err) {
    if (isRedirectError(err)) throw err;
    // Local fallback adjustment
    const existing = saveProduct({ id: productId, name: '' });
    if (existing) {
      existing.stock_quantity = Math.max(0, existing.stock_quantity + delta);
    }
  }

  redirect(`/products/${productId}/edit?saved=Stock+adjusted+successfully`);
}

export async function deleteProduct(productId: string) {
  await ensureAdmin();

  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(productId);
  const cached = getCachedProducts().find((p) => p.id === productId || p.slug === productId);
  let slug = cached?.slug || (!isUuid ? productId : undefined);
  let uuidId = isUuid ? productId : (cached?.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(cached.id) ? cached.id : null);

  const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tvfzfvurqewgvnnhhhad.supabase.co';
  const supaKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_WAr2l8gZ0bvYJSY0x1murQ_OGSoDB50';

  // Resolve both id and slug from Supabase if either is missing (e.g. cold serverless instance)
  if (!slug || !uuidId) {
    try {
      const filter = isUuid
        ? `id=eq.${encodeURIComponent(productId)}`
        : `slug=eq.${encodeURIComponent(slug || productId)}`;
      const lookupRes = await fetch(`${supaUrl}/rest/v1/products?${filter}&select=id,slug&limit=1`, {
        headers: { apikey: supaKey, Authorization: `Bearer ${supaKey}` },
        cache: 'no-store',
      });
      if (lookupRes.ok) {
        const rows = await lookupRes.json();
        if (Array.isArray(rows) && rows[0]) {
          if (rows[0].id && !uuidId) uuidId = rows[0].id;
          if (rows[0].slug && !slug) slug = rows[0].slug;
        }
      }
    } catch {}
  }

  let shouldArchive = false;

  // 1. Check order history safely without crashing on non-UUID product_id
  if (uuidId) {
    try {
      const admin = createServiceRoleClient();
      const { data: orderItem } = await admin
        .from('order_items')
        .select('id')
        .eq('product_id', uuidId)
        .limit(1)
        .maybeSingle();
      if (orderItem) {
        shouldArchive = true;
      }
    } catch {
      // REST fallback check
      try {
        const res = await fetch(`${supaUrl}/rest/v1/order_items?product_id=eq.${uuidId}&select=id&limit=1`, {
          headers: { apikey: supaKey, Authorization: `Bearer ${supaKey}` },
        });
        if (res.ok) {
          const items = await res.json();
          if (Array.isArray(items) && items.length > 0) {
            shouldArchive = true;
          }
        }
      } catch {}
    }
  }

  // 2. Either Archive or Delete in Supabase
  if (shouldArchive) {
    // The live products table has no `status` column: status lives in
    // metadata (that is where the storefront and admin both read it).
    const patchHeaders = {
      apikey: supaKey,
      Authorization: `Bearer ${supaKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    };
    const filters = [
      uuidId ? `id=eq.${uuidId}` : null,
      slug ? `slug=eq.${encodeURIComponent(slug)}` : null,
    ].filter(Boolean) as string[];
    for (const filter of filters) {
      try {
        const cur = await fetch(`${supaUrl}/rest/v1/products?${filter}&select=id,metadata`, {
          headers: { apikey: supaKey, Authorization: `Bearer ${supaKey}` },
          cache: 'no-store',
        });
        const rows = cur.ok ? await cur.json() : [];
        for (const row of Array.isArray(rows) ? rows : []) {
          await fetch(`${supaUrl}/rest/v1/products?id=eq.${row.id}`, {
            method: 'PATCH',
            headers: patchHeaders,
            body: JSON.stringify({
              in_stock: false,
              metadata: { ...(row.metadata || {}), status: 'archived' },
              updated_at: new Date().toISOString(),
            }),
          });
        }
      } catch {}
    }
  } else {
    // Delete in Supabase: try admin client first
    try {
      const admin = createServiceRoleClient();
      if (uuidId) await admin.from('products').delete().eq('id', uuidId);
      if (slug) await admin.from('products').delete().eq('slug', slug);
    } catch {}

    // Guarantee deletion via direct Supabase REST DELETE (with anon or service key)
    const deleteHeaders = { apikey: supaKey, Authorization: `Bearer ${supaKey}` };
    const deletePromises: Promise<any>[] = [];
    if (slug) {
      deletePromises.push(
        fetch(`${supaUrl}/rest/v1/products?slug=eq.${encodeURIComponent(slug)}`, { method: 'DELETE', headers: deleteHeaders }).catch(() => {})
      );
    }
    if (uuidId) {
      deletePromises.push(
        fetch(`${supaUrl}/rest/v1/products?id=eq.${uuidId}`, { method: 'DELETE', headers: deleteHeaders }).catch(() => {})
      );
    }
    if (productId && !isUuid && productId !== slug) {
      deletePromises.push(
        fetch(`${supaUrl}/rest/v1/products?slug=eq.${encodeURIComponent(productId)}`, { method: 'DELETE', headers: deleteHeaders }).catch(() => {})
      );
    }
    await Promise.all(deletePromises);
  }

  // 2b. Never report success unless the row is actually gone / archived.
  // (A delete the database silently ignores is what made products "come back".)
  try {
    const checks = [
      uuidId ? `id=eq.${uuidId}` : null,
      slug ? `slug=eq.${encodeURIComponent(slug)}` : null,
    ].filter(Boolean) as string[];
    for (const filter of checks) {
      const res = await fetch(`${supaUrl}/rest/v1/products?${filter}&select=id,metadata`, {
        headers: { apikey: supaKey, Authorization: `Bearer ${supaKey}` },
        cache: 'no-store',
      });
      if (!res.ok) continue;
      const rows = await res.json();
      const stillThere = Array.isArray(rows) && rows.length > 0;
      if (stillThere && !shouldArchive) {
        console.error('[deleteProduct] Row still present after delete:', filter);
        redirect('/products?error=Delete+failed:+the+database+did+not+remove+this+product.+Check+SUPABASE_SERVICE_ROLE_KEY+in+Vercel.');
      }
    }
  } catch (err: any) {
    if (err?.digest?.startsWith?.('NEXT_REDIRECT')) throw err;
  }

  // 3. Mark in catalog-store and durable Cloudinary tombstones
  await removeProduct(productId);
  if (slug && slug !== productId) {
    await removeProduct(slug);
  }

  await broadcastRealtimeEvent('product_deleted', { productId, slug });

  revalidateAdminNav();
  revalidatePath('/products');

  if (shouldArchive) {
    redirect('/products?saved=Product+archived+to+protect+order+history');
  }
  redirect('/products?saved=Product+deleted+successfully');
}
