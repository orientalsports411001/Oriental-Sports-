'use client';

/**
 * Next.js Error Boundary for the products section.
 * Catches any unhandled Server Component render errors and shows
 * a clean recovery UI instead of the generic red digest banner.
 */
export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ padding: '32px 24px' }}>
      <div
        style={{
          padding: '24px 28px',
          background: '#FFF5F5',
          border: '1px solid rgba(179, 38, 30, 0.2)',
          borderRadius: 16,
          maxWidth: 600,
        }}
      >
        <h2 style={{ fontSize: 18, fontWeight: 800, color: '#B3261E', margin: '0 0 8px' }}>
          Something went wrong
        </h2>
        <p style={{ fontSize: 13.5, color: '#5F5F5F', margin: '0 0 16px', lineHeight: 1.5 }}>
          {error?.message && !error.message.includes('digest')
            ? error.message
            : 'A server error occurred while loading this page. This is usually a temporary connectivity issue with the database.'}
        </p>
        {error?.digest && (
          <p style={{ fontSize: 11, color: '#999', margin: '0 0 16px', fontFamily: 'monospace' }}>
            Digest: {error.digest}
          </p>
        )}
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={reset}
            style={{
              padding: '10px 20px',
              fontSize: 13,
              fontWeight: 700,
              borderRadius: 9999,
              background: '#111',
              color: '#FFF',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Try Again
          </button>
          <a
            href="/products"
            style={{
              padding: '10px 20px',
              fontSize: 13,
              fontWeight: 700,
              borderRadius: 9999,
              background: '#FFF',
              color: '#111',
              border: '1px solid #DDD',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            Back to Products
          </a>
        </div>
      </div>
    </div>
  );
}

