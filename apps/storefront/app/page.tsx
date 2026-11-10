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
    logo: `${SITE_URL}/brand/oriental-sports-wordmark.png`,
    image: `${SITE_URL}/brand/oriental-sports-wordmark.png`,
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
    // Mirrors STORE_INFO.hours / STORE_SCHEDULE (data/storeInfo.ts) — update both together.
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:30',
        closes: '20:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '11:00',
        closes: '18:00',
      },
    ],
    paymentAccepted: 'Cards, UPI, Net Banking, Wallets',
    areaServed: {
      '@type': 'City',
      name: 'Pune',
    },
    additionalType: 'https://schema.org/SportsActivityLocation',
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
      <HomePage gearEditProducts={gearEditProducts} />
    </>
  );
}
