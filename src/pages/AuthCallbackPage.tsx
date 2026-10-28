import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export const AuthCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, signInWithDemo } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      navigate('/account', { replace: true });
      return;
    }

    const processAuth = async () => {
      try {
        if (!isSupabaseConfigured()) {
          setErrorMsg('Supabase is not configured.');
          return;
        }

        const getParam = (key: string): string | null => {
          const searchParams = new URLSearchParams(window.location.search);
          const val = searchParams.get(key);
          if (val) return val;
          const hash = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : window.location.hash;
          const hashParams = new URLSearchParams(hash);
          return hashParams.get(key);
        };

        const code = getParam('code');
        const authError = getParam('error_description') || getParam('error');

        if (authError) {
          setErrorMsg(authError);
          return;
        }

        if (code) {
          try {
            const { error } = await supabase.auth.exchangeCodeForSession(code);
            if (error && !error.message.includes('already')) {
              console.warn('Code exchange message:', error.message);
            }
          } catch (e) {
            // May have already been exchanged by initAuthListener
          }
        }

        // Check if session exists after exchange or implicit flow
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          navigate('/account', { replace: true });
        } else {
          // If no session after 2 seconds, redirect
          const timer = setTimeout(() => {
            navigate('/account', { replace: true });
          }, 2000);
          return () => clearTimeout(timer);
        }
      } catch (err: any) {
        setErrorMsg(err?.message || 'Authentication failed. Please try again.');
      }
    };

    processAuth();
  }, [user, navigate]);

  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      {errorMsg ? (
        <div style={{ maxWidth: '420px', background: 'rgba(200, 16, 46, 0.1)', border: '1px solid var(--crimson)', padding: '24px', borderRadius: '12px' }}>
          <h2 style={{ color: '#FFFFFF', fontSize: '1.25rem', marginBottom: '8px' }}>Sign-in Notice</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '16px' }}>{errorMsg}</p>
          <button
            onClick={() => navigate('/account', { replace: true })}
            className="btn btn-primary"
            style={{ padding: '8px 20px', fontSize: '0.875rem' }}
          >
            Return to Account
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '3px solid rgba(255, 255, 255, 0.15)',
              borderTopColor: 'var(--crimson)',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }}
          />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ color: '#FFFFFF', fontSize: '1.0625rem', fontWeight: 600 }}>Connecting your Google account...</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>Syncing with Oriental Sports member portal</p>
        </div>
      )}
    </div>
  );
};

export default AuthCallbackPage;
