'use server';

import { redirect } from 'next/navigation';
import { createServiceRoleClient, createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/require-admin';

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

/** The SEO editor's per-image alt text, submitted as a JSON object string. */
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

/** The image gallery's url -> Cloudinary public_id map, submitted as a JSON object string. */
function parsePublicIdMap(value: string | null): Record<string, string> {
  return parseAltTextMap(value);
}

/**
 * Publish guard: name + price > 0 + category_slug + at least one image must
 * all be present before a product can be set to 'published'. If not, the
 * caller keeps/forces status back to 'draft' rather than silently writing a
 * half-valid published row.
 */
function validateForPublish(fields: {
  name: string;
  price: number;
  categorySlug: string;
  images: string[];
}): string | null {
  if (!fields.name.trim()) return 'Name is required to publish.';
  if (!(fields.price > 0)) return 'Price must be greater than 0 to publish.';
  if (!fields.categorySlug) return 'A category is required to publish.';
  if (fields.images.length === 0) return 'At least one image is required to publish.';
  return null;
}

function buildProductPayload(formData: FormData) {
  const name = String(formData.get('name') || '').trim();
  const slug = String(formData.get('slug') || '').trim();
  const categorySlug = String(formData.get('category_slug') || '').trim();
  const brand = String(formData.get('brand') || '').trim();
  const description = String(formData.get('description') || '').trim();
  const price = Number(formData.get('price') || 0);
  const compareAtPriceRaw = formData.get('compare_at_price');
  const compareAtPrice = compareAtPriceRaw ? Number(compareAtPriceRaw) : null;
  const images = parseLines(String(formData.get('images') || ''));
  const sizes = parseLines(String(formData.get('sizes') || ''));
  const variants = parseJsonArray(String(formData.get('variants') || ''));
  const stockQuantity = Number(formData.get('stock_quantity') || 0);
  const lowStockThreshold = Number(formData.get('low_stock_threshold') || 5);
  const requestedStatus = String(formData.get('status') || 'draft');

  const seoTitle = String(formData.get('seo_title') || '').trim();
  const seoDescription = String(formData.get('seo_description') || '').trim();
  const seoKeywords = parseLines(String(formData.get('seo_keywords') || ''));
  const ogTitle = String(formData.get('og_title') || '').trim();
  const ogDescription = String(formData.get('og_description') || '').trim();
  const imageAltText = parseAltTextMap(String(formData.get('image_alt_text') || ''));
  const cloudinaryPublicIds = parsePublicIdMap(String(formData.get('cloudinary_public_ids') || ''));

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
  await requireAdmin();
  const admin = createServiceRoleClient();
  const fields = buildProductPayload(formData);

  let status = fields.requestedStatus;
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
      sizes: fields.sizes,
      variants: fields.variants,
      stock_quantity: fields.stockQuantity,
      low_stock_threshold: fields.lowStockThreshold,
      status,
      seo_title: fields.seoTitle || null,
      seo_description: fields.seoDescription || null,
      seo_keywords: fields.seoKeywords,
      og_title: fields.ogTitle || null,
      og_description: fields.ogDescription || null,
      image_alt_text: fields.imageAltText,
      cloudinary_public_ids: fields.cloudinaryPublicIds,
    })
    .select('id')
    .single();

  if (error || !data) {
    redirect(`/products/new?error=${encodeURIComponent(error?.message || 'Could not create product')}`);
  }

  if (publishError) {
    redirect(`/products/${data.id}/edit?error=${encodeURIComponent(publishError)}`);
  }

  redirect('/products');
}

export async function updateProduct(productId: string, formData: FormData) {
  await requireAdmin();
  const admin = createServiceRoleClient();
  const fields = buildProductPayload(formData);

  let status = fields.requestedStatus;
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

  const { error } = await admin
    .from('products')
    .update({
      name: fields.name,
      slug: fields.slug,
      category_slug: fields.categorySlug || null,
      brand: fields.brand,
      description: fields.description,
      price: fields.price,
      compare_at_price: fields.compareAtPrice,
      images: fields.images,
      sizes: fields.sizes,
      variants: fields.variants,
      stock_quantity: fields.stockQuantity,
      low_stock_threshold: fields.lowStockThreshold,
      status,
      seo_title: fields.seoTitle || null,
      seo_description: fields.seoDescription || null,
      seo_keywords: fields.seoKeywords,
      og_title: fields.ogTitle || null,
      og_description: fields.ogDescription || null,
      image_alt_text: fields.imageAltText,
      cloudinary_public_ids: fields.cloudinaryPublicIds,
      updated_at: new Date().toISOString(),
    })
    .eq('id', productId);

  if (error) {
    redirect(`/products/${productId}/edit?error=${encodeURIComponent(error.message)}`);
  }

  if (publishError) {
    redirect(`/products/${productId}/edit?error=${encodeURIComponent(publishError)}`);
  }

  redirect(`/products/${productId}/edit?saved=1`);
}

/**
 * Stock adjustment — calls the atomic `adjust_product_stock` Postgres
 * function (one round trip, no read-then-write race) rather than reading
 * stock_quantity and writing it back from the client.
 */
export async function adjustStock(productId: string, formData: FormData) {
  const { user } = await requireAdmin();
  const admin = createServiceRoleClient();

  const delta = Number(formData.get('delta') || 0);
  const reason = String(formData.get('reason') || '').trim();

  if (!delta) {
    redirect(`/products/${productId}/edit?error=${encodeURIComponent('Adjustment delta cannot be zero.')}`);
  }

  const { error } = await admin.rpc('adjust_product_stock', {
    p_product_id: productId,
    p_delta: delta,
    p_reason: reason || null,
    p_created_by: user.id,
  });

  if (error) {
    redirect(`/products/${productId}/edit?error=${encodeURIComponent(error.message)}`);
  }

  redirect(`/products/${productId}/edit?saved=1`);
}
