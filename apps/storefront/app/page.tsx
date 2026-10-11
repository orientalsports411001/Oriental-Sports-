import { HomePage } from '@/components/pages/HomePage';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE_URL, SITE_NAME } from '@/lib/seo/constants';
import { STORE_INFO } from '@/data/storeInfo';
import { getFeaturedProducts } from '@/lib/supabase/queries';

export default async function Page() {
  const gearEditProducts = await getFeaturedProducts(4);

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportingGoodsStore',
    name: SITE_NAME,
    url: SITE_URL,
    telephone: STORE_INFO.displayPhone,
    email: STORE_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${STORE_INFO.addressLine1}, ${STORE_INFO.addressLine2}`,
      addressLocality: STORE_INFO.city,
      postalCode: STORE_INFO.pincode,
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
  };

  return (
    <>
      <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
      <HomePage gearEditProducts={gearEditProducts} />
    </>
  );
}
