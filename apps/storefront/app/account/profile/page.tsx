import type { Metadata } from 'next';
import { AccountPage } from '@/components/pages/AccountPage';

export const metadata: Metadata = {
  title: 'Your Profile',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AccountPage tab="profile" />;
}
