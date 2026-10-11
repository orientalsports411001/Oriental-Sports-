import { Suspense } from 'react';
import type { Metadata } from 'next';
import { SearchPage } from '@/components/pages/SearchPage';
import { getProducts } from '@/lib/supabase/queries';
import { SITE_URL } from '@/lib/seo/constants';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search the Oriental Sports catalogue for gear by name, brand or sport.',
  // The ?q= query is a live-typing filter, not a distinct page — canonicalize
  // to the clean path so result variants don't compete with it for indexing.
  alternates: { canonical: `${SITE_URL}/search` },
  robots: { index: false, follow: true },
};

export default async function Page() {
  const products = await getProducts();
  return (
    <Suspense fallback={null}>
      <SearchPage products={products} />
    </Suspense>
  );
}
