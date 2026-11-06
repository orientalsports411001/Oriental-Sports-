'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';

/** Manual refresh + a 20s auto-refresh poll for the orders list (a Server Component page, so this re-fetches via router.refresh() rather than a client-side API call). */
export function RefreshOrdersButton() {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = () => {
    setIsRefreshing(true);
    router.refresh();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  useEffect(() => {
    const interval = setInterval(() => router.refresh(), 20000);
    return () => clearInterval(interval);
  }, [router]);

  return (
    <>
      <style>{`@keyframes os-refresh-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <button
        type="button"
        onClick={refresh}
        disabled={isRefreshing}
        title="Check for new or updated orders"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '8px 14px',
          fontSize: 12.5,
          fontWeight: 700,
          borderRadius: 8,
          background: 'rgba(255, 255, 255, 0.05)',
          color: 'var(--muted)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          cursor: isRefreshing ? 'wait' : 'pointer',
        }}
      >
        <RefreshCw size={13} style={{ animation: isRefreshing ? 'os-refresh-spin 0.8s linear infinite' : 'none' }} />
        <span>{isRefreshing ? 'Refreshing…' : 'Refresh'}</span>
      </button>
    </>
  );
}
