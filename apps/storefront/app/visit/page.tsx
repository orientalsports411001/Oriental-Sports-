import type { Metadata } from 'next';
import { VisitPage } from '@/components/pages/VisitPage';
import { STORE_INFO } from '@/data/storeInfo';
import { SITE_URL } from '@/lib/seo/constants';

export const metadata: Metadata = {
  title: 'Visit the Store',
  description: `Visit Oriental Sports at ${STORE_INFO.addressLine1}, ${STORE_INFO.addressLine2}, ${STORE_INFO.city} ${STORE_INFO.pincode}. Racquet stringing, bat knocking-in and gear advice, in person.`,
  alternates: { canonical: `${SITE_URL}/visit` },
};

export default function Page() {
  return <VisitPage />;
}
