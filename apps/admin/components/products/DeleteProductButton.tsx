'use client';

import { useState, useTransition, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function DeleteProductButton({
  productId,
  productName,
  action,
}: {
  productId: string;
  productName: string;
  action: () => Promise<void>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Escape key closes modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isPending) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isPending]);

  const handleConfirmDelete = () => {
    startTransition(async () => {
      try {
        await action();
        setIsOpen(false);
      } catch (err) {
        console.error('Delete action failed:', err);
        setIsOpen(false);
      }
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        disabled={isPending}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--subtle)',
          fontSize: 12.5,
          fontWeight: 600,
          cursor: 'pointer',
          padding: '4px 8px',
          borderRadius: 6,
          boxShadow: 'none',
          minHeight: 'auto',
          transition: 'color 0.15s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#EF4444';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--subtle)';
        }}
      >
        Delete
      </button>

      {/* Clean, Perfectly Aligned Delete Modal */}
      <AnimatePresence>
        {isOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              textAlign: 'left',
            }}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => {
                if (!isPending) setIsOpen(false);
              }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
              }}
            />

            {/* Modal Box */}
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.15 }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 420,
                background: '#161618',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: 16,
                padding: '24px',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
                color: '#FFFFFF',
                textAlign: 'left',
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16, textAlign: 'left' }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: 'rgba(239, 68, 68, 0.12)',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#EF4444',
                    flexShrink: 0,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </div>

                <div style={{ flex: 1, textAlign: 'left' }}>
                  <h3
                    style={{
                      margin: '0 0 4px 0',
                      fontSize: 16,
                      fontWeight: 700,
                      color: '#FFFFFF',
                      textAlign: 'left',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Delete Product
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 13,
                      lineHeight: 1.45,
                      color: '#9CA3AF',
                      textAlign: 'left',
                    }}
                  >
                    Are you sure you want to delete <strong style={{ color: '#F3F4F6' }}>&ldquo;{productName}&rdquo;</strong>? This product will be delisted from the live website immediately.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: 10,
                  marginTop: 20,
                  paddingTop: 16,
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  textAlign: 'right',
                }}
              >
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={isPending}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#E5E7EB',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: isPending ? 'not-allowed' : 'pointer',
                    transition: 'all 0.12s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isPending) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                  }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  disabled={isPending}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 8,
                    background: isPending ? '#991B1B' : '#DC2626',
                    border: 'none',
                    color: '#FFFFFF',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: isPending ? 'not-allowed' : 'pointer',
                    boxShadow: '0 2px 10px rgba(220, 38, 38, 0.35)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    transition: 'all 0.12s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isPending) e.currentTarget.style.background = '#B91C1C';
                  }}
                  onMouseLeave={(e) => {
                    if (!isPending) e.currentTarget.style.background = isPending ? '#991B1B' : '#DC2626';
                  }}
                >
                  {isPending ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
