import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';
import { ProductDetailPage } from '@/components/pages/ProductDetailPage';
import {
  getProductBySlug,
  getProducts,
  getFeaturedProductsExcludingCategory,
  getCurrentSlugByOldSlug,
  getCategoryBySlug,
} from '@/lib/supabase/queries';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE_URL, SITE_NAME } from '@/lib/seo/constants';
import type { Product } from '@/types';

export const dynamic = 'force-dynamic';

function fallbackTitle(product: Product): string {
  const parts = [product.name, product.brand].filter(Boolean);
  return `${parts.join(' | ')} | ${SITE_NAME}`;
}

function fallbackDescription(product: Product): string {
  if (product.description) return product.description.slice(0, 160);
  return `${product.name}${product.brand ? ` by ${product.brand}` : ''} — available at ${SITE_NAME}, Camp, Pune.`;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return {};

  const title = product.seoTitle || fallbackTitle(product);
  const description = product.seoDescription || fallbackDescription(product);
  const ogTitle = product.ogTitle || title;
  const ogDescription = product.ogDescription || description;
  const canonical = `${SITE_URL}/product/${product.slug}`;
  const image = product.images?.[0];

  return {
    // Absolute: the root layout's title template would otherwise append
    // " | Oriental Sports Pune" a second time, since both the fallback and
    // an admin-set seo_title already include the full branded title.
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName: SITE_NAME,
      type: 'website',
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    // Not a current slug — check if it's an old slug that moved, and
    // 301-redirect to where the product lives now instead of 404ing.
    const currentSlug = await getCurrentSlugByOldSlug(params.slug);
    if (currentSlug && currentSlug !== params.slug) {
      permanentRedirect(`/product/${currentSlug}`);
    }
    return <ProductDetailPage product={null} related={[]} />;
  }

  const sameCategory = (await getProducts({ categorySlug: product.category })).filter((p) => p.id !== product.id);
  const related = (
    sameCategory.length > 0 ? sameCategory : await getFeaturedProductsExcludingCategory(product.category, 8)
  )
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const category = await getCategoryBySlug(product.category);
  const availability = product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock';

  const productJsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || fallbackDescription(product),
    image: product.images,
    sku: product.sku || product.id,
    ...(product.brand ? { brand: { '@type': 'Brand', name: product.brand } } : {}),
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency || 'INR',
      availability,
      url: `${SITE_URL}/product/${product.slug}`,
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      ...(category
        ? [{ '@type': 'ListItem', position: 2, name: category.name, item: `${SITE_URL}/shop/${category.id}` }]
        : []),
      {
        '@type': 'ListItem',
        position: category ? 3 : 2,
        name: product.name,
        item: `${SITE_URL}/product/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={[productJsonLd, breadcrumbJsonLd]} />
      <ProductDetailPage product={product} related={related} />
    </>
  );
}
