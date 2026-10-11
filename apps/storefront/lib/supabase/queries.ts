import 'server-only';
import { createClient } from './server';
import type { CategoryInfo } from '@/data/categories';
import type { Product } from '@/types';

/**
 * Server-only product/category reads, backed by Postgres (via Supabase) —
 * see supabase/migrations/20261011090000_init_schema.sql. The static arrays
 * in data/products.ts, data/gymProducts.ts and data/categories.ts are the
 * one-time input for scripts/seed-supabase.mjs only; nothing in the render
 * path should import them. If the database is unreachable (e.g. local
 * Supabase/Docker isn't running yet), these helpers fail soft and return an
 * empty list rather than throwing, so pages still render (with their
 * existing "nothing found" empty states) instead of 500ing.
 */

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  category_slug: string | null;
  brand: string | null;
  description: string | null;
  price: number | string;
  compare_at_price: number | string | null;
  images: string[] | null;
  variants: Product['variants'] | null;
  sizes: string[] | null;
  in_stock: boolean;
  rating: number | string | null;
  review_count: number | null;
  tags: string[] | null;
  metadata: Record<string, any> | null;
  created_at: string;
  updated_at: string;
};

type CategoryRow = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  image: string | null;
  sort_order: number | null;
  metadata: Record<string, any> | null;
};

function rowToProduct(row: ProductRow): Product {
  const meta = row.metadata ?? {};
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: (row.category_slug ?? meta.category ?? 'accessories') as Product['category'],
    categoryName: meta.categoryName ?? row.category_slug ?? '',
    subcategory: meta.subcategory,
    subcategoryName: meta.subcategoryName,
    productType: meta.productType ?? 'accessory',
    brand: row.brand ?? '',
    price: Number(row.price),
    originalPrice: row.compare_at_price != null ? Number(row.compare_at_price) : undefined,
    currency: meta.currency ?? 'INR',
    quantityUnit: meta.quantityUnit,
    priceLabel: meta.priceLabel,
    availabilityNote: meta.availabilityNote,
    color: meta.color,
    rating: row.rating != null ? Number(row.rating) : 0,
    reviewsCount: row.review_count ?? 0,
    badge: meta.badge,
    images: row.images ?? [],
    gallery: meta.gallery,
    description: row.description ?? '',
    features: meta.features ?? [],
    specs: meta.specs ?? {},
    variants: row.variants ?? undefined,
    sizes: row.sizes ?? undefined,
    inStock: row.in_stock,
    isFeatured: meta.isFeatured ?? false,
    sku: meta.sku,
    seoTitle: meta.seoTitle,
    seoDescription: meta.seoDescription,
    shopifyId: meta.shopifyId,
    shopifyVariantId: meta.shopifyVariantId,
    handle: meta.handle,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function rowToCategory(row: CategoryRow): CategoryInfo {
  const meta = row.metadata ?? {};
  return {
    id: row.slug as CategoryInfo['id'],
    name: row.name,
    tagline: meta.tagline ?? '',
    description: row.description ?? '',
    image: row.image ?? '',
    itemCount: meta.itemCount ?? 0,
    featuredEquipments: meta.featuredEquipments ?? [],
  };
}

export async function getCategories(): Promise<CategoryInfo[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('categories')
      .select('id, slug, name, description, image, sort_order, metadata')
      .order('sort_order', { ascending: true });
    if (error || !data) return [];
    return (data as CategoryRow[]).map(rowToCategory);
  } catch {
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<CategoryInfo | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('categories')
      .select('id, slug, name, description, image, sort_order, metadata')
      .eq('slug', slug)
      .maybeSingle();
    if (error || !data) return null;
    return rowToCategory(data as CategoryRow);
  } catch {
    return null;
  }
}

export async function getProducts(filters?: { categorySlug?: string }): Promise<Product[]> {
  try {
    const supabase = await createClient();
    let query = supabase
      .from('products')
      .select(
        'id, slug, name, category_slug, brand, description, price, compare_at_price, images, variants, sizes, in_stock, rating, review_count, tags, metadata, created_at, updated_at'
      )
      // Defense in depth alongside the RLS policy from the admin_foundation
      // migration (which already restricts anon/authenticated selects to
      // status = 'published') — explicit here so this stays true even if a
      // future policy change loosens RLS.
      .eq('status', 'published');
    if (filters?.categorySlug) {
      query = query.eq('category_slug', filters.categorySlug);
    }
    const { data, error } = await query.order('created_at', { ascending: true });
    if (error || !data) return [];
    return (data as ProductRow[]).map(rowToProduct);
  } catch {
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select(
        'id, slug, name, category_slug, brand, description, price, compare_at_price, images, variants, sizes, in_stock, rating, review_count, tags, metadata, created_at, updated_at'
      )
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle();
    if (error || !data) return null;
    return rowToProduct(data as ProductRow);
  } catch {
    return null;
  }
}

/** Featured products from other categories — used to fill out a thin category page. */
export async function getFeaturedProductsExcludingCategory(categorySlug: string, limit = 4): Promise<Product[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select(
        'id, slug, name, category_slug, brand, description, price, compare_at_price, images, variants, sizes, in_stock, rating, review_count, tags, metadata, created_at, updated_at'
      )
      .neq('category_slug', categorySlug)
      .eq('status', 'published')
      .contains('metadata', { isFeatured: true })
      .limit(limit);
    if (error || !data) return [];
    return (data as ProductRow[]).map(rowToProduct);
  } catch {
    return [];
  }
}

/** Products that also carry a subcategory matching the given slug — used by /shop/[category] when the segment is actually a subcategory alias (e.g. /shop/commercial-treadmills). */
export async function getProductsBySubcategorySlug(subcategorySlug: string): Promise<Product[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select(
        'id, slug, name, category_slug, brand, description, price, compare_at_price, images, variants, sizes, in_stock, rating, review_count, tags, metadata, created_at, updated_at'
      )
      .eq('status', 'published')
      .contains('metadata', { subcategory: subcategorySlug });
    if (error || !data) return [];
    return (data as ProductRow[]).map(rowToProduct);
  } catch {
    return [];
  }
}
