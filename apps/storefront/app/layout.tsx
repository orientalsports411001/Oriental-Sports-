import type { Metadata } from 'next';
import '../styles/tokens.css';
import '../styles/global.css';
import '../styles/navigation.css';
import '../styles/components.css';
import '../styles/home.css';
import '../styles/pages.css';
import '../styles/checkout.css';
import '../styles/auth-modal.css';
import '../styles/order-success.css';
import { Providers } from './providers';
import { AppShell } from './app-shell';
import { Analytics } from '@/components/analytics/Analytics';
import { SITE_URL } from '@/lib/seo/constants';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Oriental Sports Pune',
    template: '%s | Oriental Sports Pune',
  },
  description: 'Turnkey court construction, surface systems, fencing, lighting and line marking, plus a Camp flagship sports store in Pune.',
  keywords: [
    'sports store Pune',
    'sports shop Pune',
    'Camp Pune',
    'cricket bats Pune',
    'badminton rackets Pune',
    'tennis rackets Pune',
    'football shoes Pune',
    'pickleball paddles India',
    'table tennis Pune',
    'gym equipment Pune',
    'sports court construction Pune',
    'padel court construction India',
    'pickleball court construction',
    'tennis court construction Pune',
    'badminton court flooring',
    'artificial turf Pune',
    'court lighting and line marking',
    'racket stringing Pune',
  ],
  authors: [{ name: 'Oriental Sports Pune' }],
  creator: 'Oriental Sports Pune',
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Oriental Sports Pune',
    url: SITE_URL,
    title: 'Oriental Sports Pune',
    description: 'Turnkey court construction, surface systems, fencing, lighting and line marking, plus a Camp flagship sports store in Pune.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oriental Sports Pune',
    description: 'Turnkey court construction and a Camp flagship sports store in Pune.',
  },
  icons: { icon: '/favicon.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Analytics />
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
