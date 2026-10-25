import type { Metadata } from 'next';
import '../styles/tokens.css';
import '../styles/global.css';
import '../styles/navigation.css';
import '../styles/components.css';
import '../styles/home.css';
import '../styles/pages.css';
import '../styles/checkout.css';
import '../styles/auth-modal.css';
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
