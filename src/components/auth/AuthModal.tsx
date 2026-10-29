import React, { useState, useEffect, useRef } from 'react';
import { X, Phone, Mail, ArrowRight, ShieldCheck, CheckCircle2, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/auth-modal.css';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    authModalView,
    closeAuthModal,
    requestOtp,
    verifyOtp,
    signInWithGoogle,
    signInWithEmail,
    pendingPhone,
    setPendingPhone,
    devOtpCode,
  } = useAuth();

  const [mode, setMode] = useState<'phone' | 'email'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'input' | 'otp'>('input');
  const [countdown, setCountdown] = useState(30);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (isAuthModalOpen) {
      setError(null);
      setOtpDigits(['', '', '', '', '', '']);
      if (authModalView === 'otp') {
        setStep('otp');
      } else {
        setStep('input');
      }
    }
  }, [isAuthModalOpen, authModalView]);

  useEffect(() => {
    let timer: any;
    if (step === 'otp' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((c) => c - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  // Focus first OTP cell on entering OTP step
  useEffect(() => {
    if (step === 'otp' && otpInputRefs.current[0]) {
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 100);
    }
  }, [step]);

  if (!isAuthModalOpen) return null;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setIsSubmitting(true);
    try {
      const success = await requestOtp(cleaned);
      if (success) {
        setStep('otp');
        setCountdown(30);
      } else {
        setError('Failed to send OTP. Please try again.');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (!cleaned) {
      const newDigits = [...otpDigits];
      newDigits[index] = '';
      setOtpDigits(newDigits);
      return;
    }

    // If pasted multiple digits
    if (cleaned.length > 1) {
      const pasteDigits = cleaned.slice(0, 6).split('');
      const newDigits = [...otpDigits];
      for (let i = 0; i < 6; i++) {
        newDigits[i] = pasteDigits[i] || '';
      }
      setOtpDigits(newDigits);
      const nextIdx = Math.min(pasteDigits.length, 5);
      otpInputRefs.current[nextIdx]?.focus();
      return;
    }

    // Single digit
    const newDigits = [...otpDigits];
    newDigits[index] = cleaned[0];
    setOtpDigits(newDigits);

    // Auto advance
    if (index < 5 && cleaned[0]) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const fullOtp = otpDigits.join('');
    if (fullOtp.length < 4) {
      setError('Please enter the 6-digit verification code');
      return;
    }
    setIsSubmitting(true);
    try {
      const success = await verifyOtp(fullOtp, {
        firstName: firstName.trim() || 'Sports',
        lastName: lastName.trim() || 'Athlete',
        email: email.trim() || undefined,
      });
      if (!success) {
        setError('Invalid OTP code. For demo use: 123456');
      }
    } catch {
      setError('Authentication failed. Please verify the code.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setIsSubmitting(true);
    try {
      const success = await signInWithEmail(email);
      if (!success) {
        setError('Sign in failed. Please try again.');
      }
    } catch {
      setError('Error signing in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(err?.message || 'Google sign-in could not be completed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const autoFillDemoOtp = () => {
    setOtpDigits(['1', '2', '3', '4', '5', '6']);
  };

  const displayPhone = pendingPhone || phoneNumber || '98765 43210';

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
        {/* Close Button */}
        <button
          type="button"
          onClick={closeAuthModal}
          className="auth-close-btn"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        <div className="auth-modal-body">
          {/* Brand Header */}
          <div className="auth-header">
            <div className="auth-brand-badge">
              <div className="auth-brand-logo-icon">OS</div>
              <span className="auth-brand-label">Oriental Sports</span>
            </div>

            <h2 className="auth-title">
              {step === 'otp' ? 'Verify Mobile Number' : 'Sign In or Create Account'}
            </h2>
            <p className="auth-subtitle">
              {step === 'otp' ? (
                <span>
                  Enter the 6-digit code sent to{' '}
                  <strong style={{ color: '#111827' }}>+91 {displayPhone}</strong>
                </span>
              ) : (
                'Access your orders, saved addresses, and express athletic gear checkout.'
              )}
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="auth-error-alert">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {step === 'input' ? (
            <>
              {/* Method Switcher */}
              <div className="auth-method-switcher">
                <button
                  type="button"
                  onClick={() => setMode('phone')}
                  className={`auth-method-tab ${mode === 'phone' ? 'active' : ''}`}
                >
                  <Phone size={15} />
                  <span>Mobile OTP</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMode('email')}
                  className={`auth-method-tab ${mode === 'email' ? 'active' : ''}`}
                >
                  <Mail size={15} />
                  <span>Email</span>
                </button>
              </div>

              {mode === 'phone' ? (
                <form onSubmit={handleSendOtp}>
                  <div className="auth-field-group">
                    <label htmlFor="phone-input" className="auth-field-label">
                      Mobile Number
                    </label>
                    <div className="auth-phone-input-wrap">
                      <div className="auth-country-code">
                        <span>🇮🇳</span>
                        <span>+91</span>
                      </div>
                      <input
                        id="phone-input"
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="auth-phone-input"
                        autoFocus
                        required
                      />
                    </div>
                    <span className="auth-field-hint">
                      We'll send a 6-digit one-time code to verify your phone.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="auth-submit-btn"
                  >
                    {isSubmitting ? (
                      <RefreshCw size={18} className="animate-spin" />
                    ) : (
                      <>
                        <span>Continue with OTP</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleEmailSignIn}>
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
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="auth-submit-btn"
                  >
                    {isSubmitting ? (
                      <RefreshCw size={18} className="animate-spin" />
                    ) : (
                      <>
                        <span>Continue with Email</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Social Login Divider */}
              <div className="auth-divider">
                <div className="auth-divider-line" />
                <span className="auth-divider-text">or continue with</span>
                <div className="auth-divider-line" />
              </div>

              {/* Google Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
                className="auth-google-btn"
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
                <span>Continue with Google</span>
              </button>
            </>
          ) : (
            /* OTP Step */
            <form onSubmit={handleVerifyOtp}>
              {/* Quick Dev Code Helper */}
              <div className="auth-otp-helper">
                <div className="auth-otp-helper-left">
                  <Sparkles size={14} color="#6366F1" />
                  <span>Demo test code: <strong>123456</strong></span>
                </div>
                <button
                  type="button"
                  onClick={autoFillDemoOtp}
                  className="auth-otp-helper-btn"
                >
                  Auto-fill
                </button>
              </div>

              {/* 6 Digit Cells */}
              <div className="auth-field-group">
                <label className="auth-field-label">Verification Code</label>
                <div className="auth-otp-grid">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (otpInputRefs.current[idx] = el)}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="auth-otp-cell"
                      autoComplete="one-time-code"
                      required
                    />
                  ))}
                </div>
              </div>

              {/* Optional Athlete Name for new users */}
              <div className="auth-field-group">
                <label className="auth-field-label">Your Name (Optional)</label>
                <div className="auth-name-grid">
                  <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="auth-name-cell"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="auth-name-cell"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="auth-submit-btn"
              >
                {isSubmitting ? (
                  <RefreshCw size={18} className="animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Verify & Continue</span>
                  </>
                )}
              </button>

              <div className="auth-otp-actions">
                <button
                  type="button"
                  onClick={() => setStep('input')}
                  className="auth-link-btn"
                >
                  Change phone number
                </button>

                {countdown > 0 ? (
                  <span className="auth-countdown-text">Resend in {countdown}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setCountdown(30);
                      requestOtp(pendingPhone || phoneNumber);
                    }}
                    className="auth-resend-btn"
                  >
                    Resend code
                  </button>
                )}
              </div>
            </form>
          )}

          {/* Bottom Legal & Security Notice */}
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
              <div>Official Oriental Sports Pune Store</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
