'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SavedNotificationBannerProps {
  message?: string | null;
  error?: string | null;
}

export function SavedNotificationBanner({ message: initialMessage, error: initialError }: SavedNotificationBannerProps) {
  const [message, setMessage] = useState<string | null>(initialMessage || null);
  const [error, setError] = useState<string | null>(initialError || null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlSaved = params.get('saved');
      const urlError = params.get('error');

      if (urlSaved) setMessage(urlSaved);
      if (urlError) setError(urlError);

      // Clean the query parameters immediately so they never linger or stick on refresh
      if (urlSaved || urlError) {
        params.delete('saved');
        params.delete('error');
        const newSearch = params.toString();
        const newUrl = window.location.pathname + (newSearch ? `?${newSearch}` : '');
        window.history.replaceState({}, '', newUrl);
      }
    }
  }, []);

  // Auto-dismiss after 4.5 seconds
  useEffect(() => {
    if (!message && !error) return;

    const timer = setTimeout(() => {
      setMessage(null);
      setError(null);
    }, 4500);

    return () => clearTimeout(timer);
  }, [message, error]);

  return (
    <AnimatePresence>
      {(message || error) && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          style={{
            marginBottom: 20,
            padding: '12px 18px',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            background: error ? 'rgba(239, 68, 68, 0.14)' : 'rgba(34, 197, 94, 0.12)',
            border: `1px solid ${error ? 'rgba(239, 68, 68, 0.35)' : 'rgba(34, 197, 94, 0.35)'}`,
            color: error ? '#F87171' : '#4ADE80',
            fontSize: 13.5,
            fontWeight: 600,
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span>{error ? '✕' : '✓'}</span>
            <span>{error || message}</span>
          </div>

          <button
            type="button"
            onClick={() => {
              setMessage(null);
              setError(null);
            }}
            aria-label="Dismiss notification"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              fontSize: 14,
              padding: '2px 6px',
              borderRadius: 4,
              opacity: 0.7,
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

