import type { Metadata } from 'next';
import { AccountPage } from '@/components/pages/AccountPage';

export const metadata: Metadata = {
  title: 'Log In',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AccountPage tab="login" />;
}
