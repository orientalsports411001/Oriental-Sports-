'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

/**
 * Magic-link sign-in, same method Stage 1's storefront uses
 * (supabase.auth.signInWithOtp — see apps/storefront/context/AuthContext.tsx).
 * After the user clicks the emailed link, Supabase sets a session cookie and
 * the (admin) route group's server-side guard (lib/require-admin.ts) decides
 * whether that session is actually an admin.
 */
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setMessage(null);

    const supabase = createClient();
    const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : undefined;
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
    setMessage(`Magic link sent to ${email}. Check your inbox to finish signing in.`);
  };

  return (
    <div style={{ maxWidth: 360, margin: '80px auto' }}>
      <h1>Oriental Sports Admin</h1>
      <p>Sign in with a magic link. Admin access is granted separately — see docs/ADMIN_SETUP.md.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%' }}
        />
        <div style={{ marginTop: 16 }}>
          <button type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Send magic link'}
          </button>
        </div>
      </form>
      {message && <p className={status === 'error' ? 'error' : 'success'}>{message}</p>}
    </div>
  );
}
