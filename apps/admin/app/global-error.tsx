'use client';

/**
 * Root-level error boundary for the entire admin app.
 * Catches Server Component render errors that bubble past section-level boundaries.
 */
export default function AdminRootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#FAFAF8' }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 32,
          }}
        >
          <div
            style={{
              maxWidth: 480,
              width: '100%',
              padding: '36px 32px',
              background: '#FFF',
              border: '1px solid #EEE',
              borderRadius: 20,
              boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
            <h1 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 8px', color: '#111' }}>
              Admin Console Error
            </h1>
            <p style={{ fontSize: 14, color: '#666', margin: '0 0 24px', lineHeight: 1.6 }}>
              {error?.message && !error.message.includes('digest')
                ? error.message
                : 'A server error occurred. This may be a temporary database or authentication issue.'}
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button
                onClick={reset}
                style={{
                  padding: '12px 24px',
                  fontSize: 14,
                  fontWeight: 700,
                  borderRadius: 9999,
                  background: '#111',
                  color: '#FFF',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Retry
              </button>
              <a
                href="/login"
                style={{
                  padding: '12px 24px',
                  fontSize: 14,
                  fontWeight: 700,
                  borderRadius: 9999,
                  background: '#FFF',
                  color: '#111',
                  border: '1px solid #DDD',
                  textDecoration: 'none',
                }}
              >
                Sign In Again
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
