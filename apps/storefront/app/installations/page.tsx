import type { Metadata } from 'next';
import { CourtsPage } from '@/components/pages/CourtsPage';

export const metadata: Metadata = {
  title: 'Turnkey Sports & Wellness Installations | Oriental Sports Pune',
  description:
    'Turnkey sports infrastructure across Pune and Maharashtra — court construction (tennis, pickleball, padel, badminton), football & cricket turfs, gym fit-outs, and surface maintenance.',
  keywords: [
    'sports installations pune',
    'court installations pune',
    'turf installations pune',
    'gym installations pune',
    'padel court installation pune',
    'pickleball court construction pune',
    'sports infrastructure maharashtra',
    'sports flooring repair resurfacing pune',
  ],
};

export default function InstallationsPage() {
  return <CourtsPage />;
}
