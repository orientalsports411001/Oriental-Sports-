import type { Metadata } from 'next';
import { Suspense } from 'react';
import { OrderSuccessPage } from '@/components/pages/OrderSuccessPage';

export const metadata: Metadata = {
  title: 'Order Confirmed',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <OrderSuccessPage />
    </Suspense>
  );
}
