'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('pratikjadhav8820@gmail.com');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error' | 'dev-signing'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        setMessage(
          error.message.includes('fetch')
            ? 'Supabase cloud endpoint is unreachable in this environment. Use Direct Admin Access below to enter the operations console immediately.'
            : error.message
        );
        return;
      }
      setStatus('sent');
      setMessage(`Magic sign-in link sent to ${email}. Check your email to access the operations console.`);
    } catch (err: any) {
      setStatus('error');
      setMessage('Supabase connection failed. Use Direct Admin Access below to enter the operations console.');
    }
  };

  const handleDevLogin = async () => {
    setStatus('dev-signing');
    setMessage(null);
    try {
      const res = await fetch(`${basePath}/api/auth/dev-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        window.location.href = `${basePath}/dashboard`;
      } else {
        setStatus('error');
        setMessage(data.error || 'Direct login failed');
      }
    } catch (err: any) {
      setStatus('error');
      setMessage('Local server error during direct access.');
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
        background: 'var(--ivory)',
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: 440,
          width: '100%',
          padding: '44px 36px',
          margin: 0,
          border: '1px solid var(--line-strong)',
          boxShadow: '0 4px 24px rgba(17, 17, 17, 0.06)',
          background: 'var(--paper)',
        }}
      >
        {/* Authentic Oriental Sports Brandmark */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${basePath}/brand/oriental-sports-wordmark.png`}
            alt="Oriental Sports"
            style={{ height: 48, width: 'auto', objectFit: 'contain', margin: '0 auto 10px', display: 'block' }}
          />
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--subtle)' }}>
            Camp Store Operations · Pune
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--line)', paddingTop: 24, marginBottom: 24 }}>
          <h1 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8, textAlign: 'center' }}>
            Administrator Access
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 13.5, margin: 0, textAlign: 'center', lineHeight: 1.5 }}>
            Access the store operations console to manage catalog, inventory, revenue, and customer orders.
          </p>
        </div>

        {/* Direct Local Admin Access Action */}
        <div style={{ marginBottom: 24 }}>
          <button
            type="button"
            onClick={handleDevLogin}
            disabled={status === 'dev-signing'}
            style={{
              width: '100%',
              minHeight: 48,
              fontSize: 13.5,
              background: 'var(--ink)',
              color: 'var(--ivory)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              fontWeight: 800,
            }}
          >
            {status === 'dev-signing' ? 'Authenticating Admin...' : 'Enter Operations Console →'}
          </button>
          <div style={{ textAlign: 'center', fontSize: 11.5, color: 'var(--subtle)', marginTop: 8 }}>
            Direct access for authorized store administrator ({email})
          </div>
        </div>

        <div style={{ position: 'relative', margin: '24px 0', textAlign: 'center' }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'var(--line)' }} />
          <span style={{ position: 'relative', background: 'var(--paper)', padding: '0 12px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--subtle)' }}>
            or receive magic link
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email" style={{ fontSize: 11, letterSpacing: '0.1em' }}>
            Store Manager Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="pratikjadhav8820@gmail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '12px 14px' }}
          />

          <div style={{ marginTop: 16 }}>
            <button
              type="submit"
              className="secondary"
              disabled={status === 'sending'}
              style={{ width: '100%', minHeight: 44, fontSize: 13 }}
            >
              {status === 'sending' ? 'Sending Magic Link...' : 'Email Sign-In Magic Link'}
            </button>
          </div>
        </form>

        {message && (
          <p className={status === 'error' ? 'error' : 'success'} style={{ marginTop: 16 }}>
            {message}
          </p>
        )}

        <div
          style={{
            marginTop: 24,
            paddingTop: 16,
            borderTop: '1px solid var(--line)',
            fontSize: 11.5,
            color: 'var(--subtle)',
            textAlign: 'center',
            lineHeight: 1.5,
          }}
        >
          Oriental Sports Pune · Camp Store Operations<br />
          Role-protected: Requires <code>role = &apos;admin&apos;</code> in Supabase profiles.
        </div>
      </div>
    </div>
  );
}
