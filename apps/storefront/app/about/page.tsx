import type { Metadata } from 'next';
import { AboutPage } from '@/components/pages/AboutPage';
import { SITE_URL } from '@/lib/seo/constants';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Oriental Sports is a sports goods store at Shop 247, MG Road, Camp, Pune — plus turnkey court construction covering surface, fencing, lighting and line marking across Maharashtra.',
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function Page() {
  return <AboutPage />;
}
