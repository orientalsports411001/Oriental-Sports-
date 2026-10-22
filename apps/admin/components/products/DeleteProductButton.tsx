'use client';

import { useTransition } from 'react';

export function DeleteProductButton({
  productId,
  productName,
  action,
}: {
  productId: string;
  productName: string;
  action: () => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm(`Are you sure you want to delete or archive "${productName}"?`)) {
      startTransition(async () => {
        await action();
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
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
        e.currentTarget.style.color = '#B3261E';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--subtle)';
      }}
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
}
