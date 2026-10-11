import { Suspense } from 'react';
import { SearchPage } from '@/components/pages/SearchPage';
import { getProducts } from '@/lib/supabase/queries';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const products = await getProducts();
  return (
    <Suspense fallback={null}>
      <SearchPage products={products} />
    </Suspense>
  );
}
