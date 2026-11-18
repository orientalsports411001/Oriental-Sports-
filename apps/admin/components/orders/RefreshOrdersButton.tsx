'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

/** Manual refresh + realtime push (orders broadcast) plus a 60s fallback poll for the orders list (a Server Component page, so this re-fetches via router.refresh() rather than a client-side API call). */
export function RefreshOrdersButton() {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = () => {
    setIsRefreshing(true);
    router.refresh();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  useEffect(() => {
    const interval = setInterval(() => router.refresh(), 60000);
    let supabase: ReturnType<typeof createClient> | null = null;
    let channel: ReturnType<ReturnType<typeof createClient>['channel']> | null = null;
    try {
      supabase = createClient();
      channel = supabase
        .channel('oriental_sports_sync_orders_list')
        .on('broadcast', { event: 'order_created' }, () => router.refresh())
        .on('broadcast', { event: 'order_updated' }, () => router.refresh())
        .subscribe();
    } catch {}
    return () => {
      clearInterval(interval);
      if (supabase && channel) supabase.removeChannel(channel);
    };
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
