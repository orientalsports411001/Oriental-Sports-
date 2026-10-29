import Link from 'next/link';

export default function NotAuthorizedPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 16px',
        background: 'radial-gradient(ellipse at 50% 18%, rgba(220, 38, 38, 0.16), transparent 65%), #050505',
        color: '#FFFFFF',
        fontFamily: 'inherit',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 440,
          background: '#0D0D10',
          border: '1px solid rgba(220, 38, 38, 0.4)',
          borderRadius: 20,
          padding: '40px 32px',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'rgba(220, 38, 38, 0.12)',
            border: '1.5px solid rgba(220, 38, 38, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            color: '#EF4444',
            fontSize: 24,
          }}
        >
          🛡️
        </div>

        <span
          style={{
            display: 'inline-block',
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#EF4444',
            background: 'rgba(220, 38, 38, 0.12)',
            padding: '4px 12px',
            borderRadius: 9999,
            marginBottom: 12,
            border: '1px solid rgba(220, 38, 38, 0.3)',
          }}
        >
          Access Restricted
        </span>

        <h1
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: '#FFFFFF',
            margin: '0 0 10px',
            letterSpacing: '-0.02em',
          }}
        >
          Only Admin Can Log In
        </h1>

        <p
          style={{
            fontSize: 13.5,
            color: '#A3A3A3',
            lineHeight: 1.6,
            margin: '0 0 24px',
          }}
        >
          Only the verified store owner (
          <strong style={{ color: '#FFFFFF' }}>hello.orientalsports@gmail.com</strong>) is authorized
          to access the Oriental Sports Management Console. Other accounts cannot log in.
        </p>

        <Link
          href="/login"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            minHeight: 46,
            borderRadius: 12,
            background: '#DC2626',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: 13,
            textDecoration: 'none',
            letterSpacing: '0.02em',
            transition: 'background 0.15s ease',
          }}
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
