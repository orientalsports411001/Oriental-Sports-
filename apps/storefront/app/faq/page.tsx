import type { Metadata } from 'next';
import { FAQPageContent } from '@/components/pages/FAQPage';
import { FAQS } from '@/data/faqs';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE_URL } from '@/lib/seo/constants';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Answers about Oriental Sports Pune: store hours and location, delivery and pickup, returns, payment methods, racquet stringing, bat knocking-in and court construction.',
  alternates: { canonical: `${SITE_URL}/faq` },
};

export default function Page() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <FAQPageContent />
    </>
  );
}
