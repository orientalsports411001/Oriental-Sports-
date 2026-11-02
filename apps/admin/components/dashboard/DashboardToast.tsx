'use client';

import { useEffect, useState } from 'react';

export function DashboardToast({ message: initialMessage }: { message?: string }) {
  const [toastText, setToastText] = useState<string | null>(null);

  useEffect(() => {
    let msg: string | null = null;

    if (typeof window !== 'undefined') {
      // 1. Prioritize one-time session flash toast
      try {
        const flash = sessionStorage.getItem('os_admin_flash_toast');
        if (flash) {
          msg = flash;
          sessionStorage.removeItem('os_admin_flash_toast');
        }
      } catch {}

      // 2. If URL had searchParams ?saved=, use it once and IMMEDIATELY clean the address bar
      if (!msg && initialMessage) {
        msg = initialMessage;
      }

      if (window.location.search.includes('saved=')) {
        try {
          const url = new URL(window.location.href);
          url.searchParams.delete('saved');
          const cleanPath = url.pathname + (url.search ? url.search : '');
          window.history.replaceState({}, '', cleanPath);
        } catch {}
      }
    }

    if (msg) {
      setToastText(msg);
      // Auto dismiss after 4 seconds
      const timer = setTimeout(() => {
        setToastText(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [initialMessage]);

  if (!toastText) return null;

  return (
    <div
      style={{
        padding: '14px 20px',
        borderRadius: 14,
        background: 'rgba(46, 107, 60, 0.22)',
        border: '1px solid rgba(74, 222, 128, 0.45)',
        color: '#4ADE80',
        fontSize: 14,
        fontWeight: 700,
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        boxShadow: '0 4px 16px rgba(46, 107, 60, 0.2)',
        animation: 'fadeIn 0.25s ease-out',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 18, lineHeight: 1 }}>✓</span>
        <span>{toastText}</span>
      </div>
      <button
        type="button"
        onClick={() => setToastText(null)}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#4ADE80',
          cursor: 'pointer',
          fontSize: 16,
          lineHeight: 1,
          padding: '2px 6px',
          borderRadius: 6,
          opacity: 0.8,
        }}
        title="Dismiss"
      >
        ✕
      </button>
    </div>
  );
}
