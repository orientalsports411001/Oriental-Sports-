'use client';

import React, { useState, useEffect } from 'react';
import { X, Mail, ArrowRight, ShieldCheck, CheckCircle2, RefreshCw, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

/**
 * Real Supabase magic-link sign-in. Replaces the old fake OTP/Google/email
 * flows — one simple, real method: Supabase sends an email with a sign-in
 * link, clicking it completes the session via Supabase Auth.
 */
export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, signInWithMagicLink, magicLinkSent } = useAuth();

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthModalOpen) {
      setError(null);
    }
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await signInWithMagicLink(email.trim());
      if (!res.success) {
        setError(res.message);
      }
    } catch {
      setError('Could not send the sign-in link. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="auth-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuthModal();
      }}
    >
      <div className="auth-modal-container">
        <button type="button" onClick={closeAuthModal} className="auth-close-btn" aria-label="Close dialog">
          <X size={18} />
        </button>

        <div className="auth-modal-body">
          <div className="auth-header">
            <div className="auth-brand-badge">
              <div className="auth-brand-logo-icon">OS</div>
              <span className="auth-brand-label">Oriental Sports</span>
            </div>

            <h2 className="auth-title">{magicLinkSent ? 'Check your inbox' : 'Sign In or Create Account'}</h2>
            <p className="auth-subtitle">
              {magicLinkSent ? (
                <span>
                  We sent a sign-in link to <strong style={{ color: '#111827' }}>{email}</strong>. Open it on this
                  device to finish signing in.
                </span>
              ) : (
                'Access your orders, saved addresses, and express athletic gear checkout.'
              )}
            </p>
          </div>

          {error && (
            <div className="auth-error-alert">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {!magicLinkSent ? (
            <form onSubmit={handleSendMagicLink}>
              <div className="auth-field-group">
                <label htmlFor="email-input" className="auth-field-label">
                  Email Address
                </label>
                <div className="auth-text-input-wrap">
                  <Mail size={18} />
                  <input
                    id="email-input"
                    type="email"
                    placeholder="athlete@orientalsports.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="auth-text-input"
                    autoFocus
                    required
                  />
                </div>
                <span className="auth-field-hint">We'll email you a secure link — no password needed.</span>
              </div>

              <button type="submit" disabled={isSubmitting} className="auth-submit-btn">
                {isSubmitting ? (
                  <RefreshCw size={18} className="animate-spin" />
                ) : (
                  <>
                    <span>Send Magic Link</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="auth-field-group" style={{ textAlign: 'center' }}>
              <CheckCircle2 size={32} color="#10B981" style={{ margin: '0 auto 8px' }} />
              <button type="button" className="auth-link-btn" onClick={() => setEmail('')}>
                Use a different email
              </button>
            </div>
          )}

          <div className="auth-footer-notice">
            <p className="auth-terms-text">
              By continuing, you agree to Oriental Sports{' '}
              <a href="/terms" onClick={(e) => { e.preventDefault(); closeAuthModal(); window.location.href = '/terms'; }}>
                Terms
              </a>{' '}
              and{' '}
              <a href="/privacy" onClick={(e) => { e.preventDefault(); closeAuthModal(); window.location.href = '/privacy'; }}>
                Privacy Policy
              </a>.
            </p>
            <div className="auth-trust-badges">
              <div className="auth-trust-item">
                <ShieldCheck size={14} color="#10B981" />
                <span>256-Bit SSL Encrypted</span>
              </div>
              <span>•</span>
              <div>Official Oriental Sports Pune Store</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
