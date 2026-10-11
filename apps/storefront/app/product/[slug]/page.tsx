import { ProductDetailPage } from '@/components/pages/ProductDetailPage';
import { getProductBySlug, getProducts, getFeaturedProductsExcludingCategory } from '@/lib/supabase/queries';

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return <ProductDetailPage product={null} related={[]} />;
  }

  const sameCategory = (await getProducts({ categorySlug: product.category })).filter((p) => p.id !== product.id);
  const related = (
    sameCategory.length > 0 ? sameCategory : await getFeaturedProductsExcludingCategory(product.category, 8)
  )
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return <ProductDetailPage product={product} related={related} />;
}
