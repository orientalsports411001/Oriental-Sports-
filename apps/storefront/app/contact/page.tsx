import type { Metadata } from 'next';
import { ContactPage } from '@/components/pages/ContactPage';
import { SITE_URL } from '@/lib/seo/constants';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Oriental Sports Pune about sports equipment, court construction, or a school, club or academy order.',
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function Page() {
  return <ContactPage />;
}
