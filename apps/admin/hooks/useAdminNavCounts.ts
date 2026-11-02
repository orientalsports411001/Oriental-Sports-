'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function useAdminNavCounts(initialProducts: number, initialOrders: number) {
  const [productsCount, setProductsCount] = useState(initialProducts);
  const [ordersCount, setOrdersCount] = useState(initialOrders);
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
      const urls = [`${basePath}/api/products/count`, '/api/products/count', '/admin/api/products/count'];
      for (const url of urls) {
        try {
          const res = await fetch(url, { cache: 'no-store' });
          if (!res.ok) continue;
          const data = await res.json();
          if (cancelled) return;
          if (typeof data.productsCount === 'number') setProductsCount(data.productsCount);
          if (typeof data.ordersCount === 'number') setOrdersCount(data.ordersCount);
          return;
        } catch {}
      }
    };

    void load();

    const onUpdate = () => {
      void load();
    };

    window.addEventListener('os_catalog_updated', onUpdate);
    window.addEventListener('focus', onUpdate);

    let bc: BroadcastChannel | null = null;
    try {
      bc = new BroadcastChannel('oriental_sports_catalog');
      bc.onmessage = onUpdate;
    } catch {}

    return () => {
      cancelled = true;
      window.removeEventListener('os_catalog_updated', onUpdate);
      window.removeEventListener('focus', onUpdate);
      bc?.close();
    };
  }, [pathname]);

  return { productsCount, ordersCount };
}
