import { Suspense } from 'react';
import { OrderSuccessPage } from '@/components/pages/OrderSuccessPage';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <OrderSuccessPage />
    </Suspense>
  );
}
