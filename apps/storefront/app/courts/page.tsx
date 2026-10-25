import type { Metadata } from 'next';
import { CourtsPage } from '@/components/pages/CourtsPage';

export const metadata: Metadata = {
  title: 'Turnkey Court Construction & Padel Court Installation | Oriental Sports Pune',
  description: 'Turnkey court construction for padel courts, pickleball, tennis, badminton, and football turf across Pune and Maharashtra. Direct WhatsApp consultation and site surveys.',
  keywords: [
    'padel court installation pune',
    'padel ball court builder pune',
    'padel court contractors',
    'pickleball court construction pune',
    'tennis court construction pune',
    'badminton court flooring pune',
    'football turf construction',
    'sports infrastructure maharashtra',
  ],
};

export default function Page() {
  return <CourtsPage />;
}
