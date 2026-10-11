import { CategoryPage } from '@/components/pages/CategoryPage';
import {
  getCategories,
  getCategoryBySlug,
  getProducts,
  getProductsBySubcategorySlug,
  getFeaturedProductsExcludingCategory,
} from '@/lib/supabase/queries';
import type { SportCategory } from '@/types';

export const dynamic = 'force-dynamic';

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

  return (
    <CategoryPage
      products={products}
      categories={categories}
      moreProducts={moreProducts}
      subAliasCategory={subAliasCategory}
    />
  );
}
