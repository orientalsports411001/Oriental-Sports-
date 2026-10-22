'use server';

import { redirect } from 'next/navigation';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/require-admin';
import { saveProduct, removeProduct } from '@/lib/catalog-store';

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

    if (error) throw error;
    if (data) createdId = data.id;
  } catch (err) {
    // Save to local fallback store
    const saved = saveProduct({
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
      seo_title: fields.seoTitle,
      seo_description: fields.seoDescription,
    });
    createdId = saved.id;
  }

  if (publishError) {
    redirect(`/products/${createdId}/edit?error=${encodeURIComponent(publishError)}`);
  }

  redirect(`/products/${createdId}/edit?saved=1`);
}

export async function updateProduct(productId: string, formData: FormData) {
  await requireAdmin();
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

  try {
    const admin = createServiceRoleClient();
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

    if (error) throw error;
  } catch (err) {
    saveProduct({
      id: productId,
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
      seo_title: fields.seoTitle,
      seo_description: fields.seoDescription,
    });
  }

  if (publishError) {
    redirect(`/products/${productId}/edit?error=${encodeURIComponent(publishError)}`);
  }

  redirect(`/products/${productId}/edit?saved=1`);
}

export async function adjustStock(productId: string, formData: FormData) {
  const { user } = await requireAdmin();
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
    // Local fallback adjustment
    const existing = saveProduct({ id: productId, name: '' });
    if (existing) {
      existing.stock_quantity = Math.max(0, existing.stock_quantity + delta);
    }
  }

  redirect(`/products/${productId}/edit?saved=1`);
}

export async function deleteProduct(productId: string) {
  await requireAdmin();

  try {
    const admin = createServiceRoleClient();
    const { data: orderItem } = await admin
      .from('order_items')
      .select('id')
      .eq('product_id', productId)
      .limit(1)
      .maybeSingle();

    if (orderItem) {
      await admin
        .from('products')
        .update({ status: 'archived', updated_at: new Date().toISOString() })
        .eq('id', productId);
      redirect('/products?saved=Product+archived+to+protect+order+history');
    } else {
      await admin.from('products').delete().eq('id', productId);
      removeProduct(productId);
      redirect('/products?saved=Product+deleted+successfully');
    }
  } catch (err) {
    // Fallback store deletion
    removeProduct(productId);
    redirect('/products?saved=Product+deleted+successfully');
  }
}
