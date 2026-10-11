import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ShopPage } from '@/components/pages/ShopPage';
import { getProducts, getCategories } from '@/lib/supabase/queries';
import { SITE_URL } from '@/lib/seo/constants';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Shop All Sports Equipment',
  description:
    'Browse the full Oriental Sports catalogue: cricket, badminton, football, fitness and more, from the Camp, Pune store.',
  // Filter/sort/search query params (?category=, ?sort=, ?q=, …) don't earn
  // their own URL in search results — canonicalize to the clean path.
  alternates: { canonical: `${SITE_URL}/shop` },
};

export default async function Page() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  return (
    <Suspense fallback={null}>
      <ShopPage products={products} categories={categories} />
    </Suspense>
  );
}
