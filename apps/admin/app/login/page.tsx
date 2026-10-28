'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('sending');
    setMessage(null);

    try {
      const supabase = createClient();
      const redirectTo =
        typeof window !== 'undefined'
          ? `${window.location.origin}${basePath}/auth/callback?next=${basePath}/dashboard`
          : undefined;

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirectTo },
      });

      if (error) {
        setStatus('error');
        setMessage(error.message);
        return;
      }
      setStatus('sent');
      setMessage(`Magic sign-in link sent to ${email}. Check your email inbox to access the operations console.`);
    } catch (err: any) {
      setStatus('error');
      setMessage(err?.message || 'Authentication failed. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    setStatus('sending');
    setMessage(null);
    try {
      const supabase = createClient();
      const redirectTo =
        typeof window !== 'undefined'
          ? `${window.location.origin}${basePath}/auth/callback?next=${basePath}/dashboard`
          : undefined;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        setStatus('error');
        setMessage(error.message);
      }
    } catch (err: any) {
      setStatus('error');
      setMessage(err?.message || 'Google sign-in initialization failed.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 16px',
        background: 'radial-gradient(ellipse at 50% 18%, rgba(200, 16, 46, 0.16), transparent 65%), #050505',
        color: '#FFFFFF',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: '#121212',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 20,
          padding: '36px 32px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7)',
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${basePath}/brand/oriental-sports-wordmark-white.png`}
            alt="Oriental Sports"
            style={{ height: 44, width: 'auto', objectFit: 'contain', margin: '0 auto 10px', display: 'block' }}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/brand/oriental-sports-wordmark-white.png';
            }}
          />
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#A3A3A3', marginTop: 10 }}>
            Camp Store Operations · Pune
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: 20, marginBottom: 24 }}>
          <h1 style={{ fontSize: 21, fontWeight: 800, marginBottom: 8, textAlign: 'center', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Administrator Access
          </h1>
          <p style={{ color: '#A3A3A3', fontSize: 13, margin: 0, textAlign: 'center', lineHeight: 1.5 }}>
            Sign in to manage catalog, equipment inventory, customer orders, and live store operations.
          </p>
        </div>

        {/* Google Sign-In Button */}
        <div style={{ marginBottom: 20 }}>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={status === 'sending'}
            style={{
              width: '100%',
              minHeight: 48,
              fontSize: 14,
              fontWeight: 600,
              background: '#FFFFFF',
              color: '#1F2937',
              borderRadius: 14,
              border: '1.5px solid #E5E7EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.25)',
              transition: 'all 0.18s ease',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.14z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>{status === 'sending' ? 'Connecting to Google...' : 'Continue with Google'}</span>
          </button>
        </div>

        <div style={{ position: 'relative', margin: '20px 0', textAlign: 'center' }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'rgba(255, 255, 255, 0.08)' }} />
          <span style={{ position: 'relative', background: '#121212', padding: '0 12px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#737373' }}>
            or receive magic link
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email" style={{ fontSize: 11, letterSpacing: '0.1em', color: '#A3A3A3', display: 'block', marginBottom: 6 }}>
            Store Manager Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="admin@orientalsports.in"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px',
              background: '#181818',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#FFFFFF',
              borderRadius: 12,
              boxSizing: 'border-box',
              outline: 'none',
              fontSize: 13,
            }}
          />

          <div style={{ marginTop: 16 }}>
            <button
              type="submit"
              className="secondary"
              disabled={status === 'sending' || !email.trim()}
              style={{
                width: '100%',
                minHeight: 44,
                fontSize: 13,
                background: '#1C1C1C',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                borderRadius: 9999,
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              {status === 'sending' ? 'Sending Magic Link...' : 'Email Sign-In Magic Link'}
            </button>
          </div>
        </form>

        {message && (
          <p
            style={{
              marginTop: 16,
              padding: '10px 14px',
              borderRadius: 10,
              fontSize: 12.5,
              background: status === 'error' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(34, 197, 94, 0.12)',
              border: `1px solid ${status === 'error' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`,
              color: status === 'error' ? '#EF4444' : '#22C55E',
              lineHeight: 1.4,
            }}
          >
            {message}
          </p>
        )}

        <div
          style={{
            marginTop: 24,
            paddingTop: 16,
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            fontSize: 11.5,
            color: '#737373',
            textAlign: 'center',
            lineHeight: 1.5,
          }}
        >
          Oriental Sports Pune · Camp Store Operations<br />
          Role-protected: Requires verified admin credentials.
        </div>
      </div>
    </div>
  );
}
