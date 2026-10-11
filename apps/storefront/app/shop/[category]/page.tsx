import type { Metadata } from 'next';
import { CategoryPage } from '@/components/pages/CategoryPage';
import {
  getCategories,
  getCategoryBySlug,
  getProducts,
  getProductsBySubcategorySlug,
  getFeaturedProductsExcludingCategory,
} from '@/lib/supabase/queries';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE_URL, SITE_NAME } from '@/lib/seo/constants';
import type { SportCategory } from '@/types';

export const dynamic = 'force-dynamic';

async function resolveCategory(categorySlug: string) {
  let directCategory = await getCategoryBySlug(categorySlug);
  if (directCategory) return directCategory;
  const subAliasProducts = await getProductsBySubcategorySlug(categorySlug);
  if (subAliasProducts.length === 0) return null;
  return getCategoryBySlug(subAliasProducts[0].category);
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const category = await resolveCategory(params.category);
  if (!category) return {};

  const title = category.seoTitle || `${category.name} | ${SITE_NAME}`;
  const description =
    category.seoDescription || category.tagline || category.description || `Shop ${category.name} at ${SITE_NAME}.`;
  const canonical = `${SITE_URL}/shop/${category.id}`;

  return {
    // Absolute: title already includes the branded suffix (either from
    // category.seoTitle set by the admin editor, or our own fallback),
    // so the root layout's template must not append it a second time.
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, siteName: SITE_NAME, type: 'website' },
  };
}

export default async function Page({ params }: { params: { category: string } }) {
  const { category } = params;
  const categories = await getCategories();

  // Try a direct category match first (e.g. /shop/cricket).
  let directCategory = await getCategoryBySlug(category);
  let subAliasCategory: SportCategory | undefined;

  if (!directCategory) {
    // Fall back to a subcategory alias (e.g. /shop/commercial-treadmills -> gym-equipment).
    const subAliasProducts = await getProductsBySubcategorySlug(category);
    if (subAliasProducts.length === 0) {
      return (
        <CategoryPage
          products={[]}
          categories={categories}
        />
      );
    }
    subAliasCategory = subAliasProducts[0].category;
    directCategory = await getCategoryBySlug(subAliasCategory);
  }

  if (!directCategory) {
    return <CategoryPage products={[]} categories={categories} />;
  }

  const [products, moreProducts] = await Promise.all([
    getProducts({ categorySlug: directCategory.id }),
    getFeaturedProductsExcludingCategory(directCategory.id),
  ]);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: directCategory.name, item: `${SITE_URL}/shop/${directCategory.id}` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <CategoryPage
        products={products}
        categories={categories}
        moreProducts={moreProducts}
        subAliasCategory={subAliasCategory}
      />
    </>
  );
}
