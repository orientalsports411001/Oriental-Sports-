import { Suspense } from 'react';
import { ShopPage } from '@/components/pages/ShopPage';
import { getProducts, getCategories } from '@/lib/supabase/queries';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  return (
    <Suspense fallback={null}>
      <ShopPage products={products} categories={categories} />
    </Suspense>
  );
}
