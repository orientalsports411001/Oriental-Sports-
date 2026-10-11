import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Oriental Sports Admin',
  description: 'Internal admin tool for Oriental Sports Pune — products, inventory, and order management.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
