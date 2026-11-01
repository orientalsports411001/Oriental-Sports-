'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ShieldAlert, X, Loader2 } from 'lucide-react';

function LoginForm() {
  const searchParams = useSearchParams();
  const [isConnecting, setIsConnecting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showDeniedModal, setShowDeniedModal] = useState(false);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  const handleDismissDeniedModal = () => {
    setShowDeniedModal(false);
    if (typeof window !== 'undefined') {
      try {
        window.history.replaceState({}, '', window.location.pathname);
      } catch {}
    }
  };

  // Check URL params for unauthorized or error state on mount
  useEffect(() => {
    const errorParam = searchParams.get('error');
    const unauthorizedParam = searchParams.get('unauthorized');

    if (unauthorizedParam === '1') {
      setShowDeniedModal(true);
      setMessage(errorParam || 'Access restricted: Administrator privileges required.');
      // Strip error params immediately from URL so reloading the page won't reopen the modal
      if (typeof window !== 'undefined') {
        try {
          window.history.replaceState({}, '', window.location.pathname);
        } catch {}
      }
    } else if (errorParam) {
      setMessage(errorParam);
      if (typeof window !== 'undefined') {
        try {
          window.history.replaceState({}, '', window.location.pathname);
        } catch {}
      }
    }
  }, [searchParams]);

  const handleGoogleSignIn = async () => {
    setIsConnecting(true);
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
        setIsConnecting(false);
        setMessage(error.message);
      }
    } catch (err: any) {
      setIsConnecting(false);
      setMessage(err?.message || 'Google sign-in initialization failed.');
    }
  };

  return (
    <>
      {/* =====================================================================
          ACCESS DENIED POPUP MODAL (Triggers ONLY if unauthorized non-admin attempts login)
         ===================================================================== */}
      {showDeniedModal && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
            backgroundColor: 'rgba(0, 0, 0, 0.88)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
          onClick={handleDismissDeniedModal}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 420,
              backgroundColor: '#0D0D10',
              border: '1.5px solid #DC2626',
              borderRadius: 20,
              padding: '32px 28px',
              boxShadow: '0 25px 70px -10px rgba(220, 38, 38, 0.4), 0 20px 40px rgba(0, 0, 0, 0.9)',
              color: '#FFFFFF',
              textAlign: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleDismissDeniedModal}
              aria-label="Close message"
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                background: 'rgba(255, 255, 255, 0.06)',
                border: 'none',
                borderRadius: '50%',
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#A3A3A3',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <X size={16} />
            </button>

            {/* Shield Warning Icon */}
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'rgba(220, 38, 38, 0.14)',
                border: '2px solid rgba(220, 38, 38, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 18px',
                color: '#EF4444',
              }}
            >
              <ShieldAlert size={34} />
            </div>

            {/* Pill Badge */}
            <span
              style={{
                display: 'inline-block',
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#EF4444',
                background: 'rgba(220, 38, 38, 0.14)',
                padding: '4px 12px',
                borderRadius: 9999,
                marginBottom: 12,
                border: '1px solid rgba(220, 38, 38, 0.4)',
              }}
            >
              Access Denied
            </span>

            {/* Modal Heading */}
            <h2
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: '#FFFFFF',
                margin: '0 0 10px',
                letterSpacing: '-0.02em',
              }}
            >
              Only Admin Can Log In
            </h2>

            {/* Modal Body */}
            <p
              style={{
                fontSize: 13,
                color: '#A3A3A3',
                lineHeight: 1.55,
                margin: '0 0 20px',
              }}
            >
              This account does not have administrator privileges.
              Only verified store administrators are authorized to sign in to the operations console.
            </p>

            {/* Action Button */}
            <button
              type="button"
              onClick={() => {
                handleDismissDeniedModal();
                handleGoogleSignIn();
              }}
              style={{
                width: '100%',
                minHeight: 44,
                borderRadius: 12,
                background: '#DC2626',
                border: 'none',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                letterSpacing: '0.02em',
                boxShadow: '0 4px 14px rgba(220, 38, 38, 0.35)',
                transition: 'background 0.15s ease',
              }}
            >
              Sign In with Authorized Account
            </button>
          </div>
        </div>
      )}

      {/* Main Login Card */}
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: '#121212',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 20,
          padding: '40px 32px',
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

        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: 20, marginBottom: 28 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, textAlign: 'center', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Administrator Access
          </h1>
          <p style={{ color: '#A3A3A3', fontSize: 13, margin: 0, textAlign: 'center', lineHeight: 1.5 }}>
            Role-gated operations console. Authorized store personnel only.
          </p>
        </div>

        {/* Google Sign-In Button */}
        <div style={{ marginBottom: 12 }}>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isConnecting}
            style={{
              width: '100%',
              minHeight: 52,
              fontSize: 14.5,
              fontWeight: 700,
              background: '#FFFFFF',
              color: '#1F2937',
              borderRadius: 14,
              border: '1.5px solid #E5E7EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              cursor: isConnecting ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.18s ease',
              opacity: isConnecting ? 0.8 : 1,
            }}
          >
            {isConnecting ? (
              <>
                <Loader2 size={18} className="animate-spin" style={{ color: '#1F2937' }} />
                <span>Connecting to Google...</span>
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24">
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
                <span>Continue with Google</span>
              </>
            )}
          </button>
          <div style={{ fontSize: 11.5, color: '#737373', textAlign: 'center', marginTop: 10 }}>
            Sign in with your verified administrator account
          </div>
        </div>

        {message && (
          <p
            style={{
              marginTop: 18,
              padding: '12px 14px',
              borderRadius: 12,
              fontSize: 12.5,
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#EF4444',
              lineHeight: 1.45,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8,
            }}
          >
            <ShieldAlert size={16} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>{message}</span>
          </p>
        )}

        <div
          style={{
            marginTop: 28,
            paddingTop: 18,
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            fontSize: 11.5,
            color: '#737373',
            textAlign: 'center',
            lineHeight: 1.5,
          }}
        >
          Oriental Sports Pune · Camp Store Operations<br />
          Protected System · Authorized Access Only
        </div>
      </div>
    </>
  );
}

export default function LoginPage() {
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
      <Suspense fallback={<div style={{ color: '#A3A3A3' }}>Loading operations console...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
