import React, { useState, useEffect } from 'react';
import { X, Phone, Mail, ArrowRight, ShieldCheck, CheckCircle2, Sparkles, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

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
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'input' | 'otp'>('input');
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    if (isAuthModalOpen) {
      setError(null);
      setOtp('');
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

  if (!isAuthModalOpen) return null;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.length < 10) {
      setError('Please enter a valid 10-digit Indian mobile number');
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

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!otp || otp.trim().length < 4) {
      setError('Please enter the 6-digit verification code');
      return;
    }
    setIsSubmitting(true);
    try {
      const success = await verifyOtp(otp.trim(), {
        firstName: firstName.trim() || 'Sports',
        lastName: lastName.trim() || 'Athlete',
        email: email.trim() || undefined,
      });
      if (!success) {
        setError('Invalid OTP. Use demo code 123456');
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
    } catch {
      setError('Google sign-in could not be completed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const autoFillDemoOtp = () => {
    setOtp('123456');
  };

  return (
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
        padding: '16px',
        backgroundColor: 'rgba(10, 10, 10, 0.75)',
        backdropFilter: 'blur(6px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuthModal();
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '4px',
          maxWidth: '460px',
          width: '100%',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          overflow: 'hidden',
          position: 'relative',
          animation: 'fadeIn 0.2s ease-out',
        }}
      >
        {/* Top brand header */}
        <div
          style={{
            backgroundColor: 'var(--color-ink)',
            color: '#FFFFFF',
            padding: '24px',
            position: 'relative',
          }}
        >
          <button
            type="button"
            onClick={closeAuthModal}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'transparent',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.7)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span
              style={{
                backgroundColor: 'var(--color-plate-gold)',
                color: 'var(--color-ink)',
                fontSize: '0.625rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                padding: '2px 6px',
                borderRadius: '2px',
                textTransform: 'uppercase',
              }}
            >
              EST. 1974 • PUNE
            </span>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)' }}>
              ORIENTAL ATHLETE ID
            </span>
          </div>

          <h2
            className="font-display"
            style={{ fontSize: '1.5rem', margin: 0, color: '#FFFFFF', letterSpacing: '0.02em' }}
          >
            {step === 'otp' ? 'VERIFY OTP' : 'ATHLETE SIGN IN'}
          </h2>
          <p style={{ margin: '6px 0 0 0', fontSize: '0.8125rem', color: 'rgba(255, 255, 255, 0.7)' }}>
            {step === 'otp'
              ? `Enter 6-digit code sent to +91 ${pendingPhone || phoneNumber}`
              : 'Access your orders, stringing records, and turnkey court proposals'}
          </p>
        </div>

        {/* Body content */}
        <div style={{ padding: '24px' }}>
          {error && (
            <div
              style={{
                backgroundColor: '#FEE2E2',
                border: '1px solid #F87171',
                borderRadius: '4px',
                padding: '10px 14px',
                color: '#991B1B',
                fontSize: '0.8125rem',
                marginBottom: '16px',
              }}
            >
              {error}
            </div>
          )}

          {step === 'input' ? (
            <>
              {/* Method Switcher */}
              <div
                style={{
                  display: 'flex',
                  borderBottom: '1px solid #E5E7EB',
                  marginBottom: '20px',
                }}
              >
                <button
                  type="button"
                  onClick={() => setMode('phone')}
                  style={{
                    flex: 1,
                    padding: '10px 0',
                    border: 'none',
                    background: 'transparent',
                    borderBottom: mode === 'phone' ? '2px solid var(--color-electric-blue)' : '2px solid transparent',
                    color: mode === 'phone' ? 'var(--color-electric-blue)' : '#6B7280',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <Phone size={15} />
                  <span>Mobile OTP</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMode('email')}
                  style={{
                    flex: 1,
                    padding: '10px 0',
                    border: 'none',
                    background: 'transparent',
                    borderBottom: mode === 'email' ? '2px solid var(--color-electric-blue)' : '2px solid transparent',
                    color: mode === 'email' ? 'var(--color-electric-blue)' : '#6B7280',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <Mail size={15} />
                  <span>Email</span>
                </button>
              </div>

              {mode === 'phone' ? (
                <form onSubmit={handleSendOtp}>
                  <div style={{ marginBottom: '16px' }}>
                    <label
                      htmlFor="phone-input"
                      style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: 'var(--color-text-dark)',
                        marginBottom: '6px',
                      }}
                    >
                      Indian Mobile Number
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0 12px',
                          backgroundColor: '#F3F4F6',
                          border: '1px solid #D1D5DB',
                          borderRadius: '4px',
                          fontSize: '0.875rem',
                          fontWeight: 700,
                          color: '#374151',
                        }}
                      >
                        🇮🇳 +91
                      </div>
                      <input
                        id="phone-input"
                        type="tel"
                        placeholder="98230 45812"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        style={{
                          flex: 1,
                          height: '46px',
                          padding: '0 14px',
                          fontSize: '0.9375rem',
                          border: '1px solid #D1D5DB',
                          borderRadius: '4px',
                          outline: 'none',
                        }}
                        autoFocus
                        required
                      />
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '4px', display: 'block' }}>
                      Quick 1-tap OTP login for sports clubs and athletes.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                    style={{
                      width: '100%',
                      height: '46px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      fontWeight: 700,
                    }}
                  >
                    {isSubmitting ? (
                      <RefreshCw size={18} className="animate-spin" />
                    ) : (
                      <>
                        <span>GET OTP VIA SMS</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleEmailSignIn}>
                  <div style={{ marginBottom: '16px' }}>
                    <label
                      htmlFor="email-input"
                      style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: 'var(--color-text-dark)',
                        marginBottom: '6px',
                      }}
                    >
                      Email Address
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      placeholder="arjun.deshmukh@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        width: '100%',
                        height: '46px',
                        padding: '0 14px',
                        fontSize: '0.9375rem',
                        border: '1px solid #D1D5DB',
                        borderRadius: '4px',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                      autoFocus
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                    style={{
                      width: '100%',
                      height: '46px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      fontWeight: 700,
                    }}
                  >
                    {isSubmitting ? (
                      <RefreshCw size={18} className="animate-spin" />
                    ) : (
                      <>
                        <span>CONTINUE WITH EMAIL</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Social Login Divider */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: '20px 0',
                  gap: '12px',
                }}
              >
                <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E7EB' }} />
                <span style={{ fontSize: '0.75rem', color: '#9CA3AF', textTransform: 'uppercase' }}>
                  or continue with
                </span>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E7EB' }} />
              </div>

              {/* Google Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  height: '44px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D1D5DB',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#374151',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F9FAFB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
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
                <span>Continue with Google</span>
              </button>
            </>
          ) : (
            /* OTP Step */
            <form onSubmit={handleVerifyOtp}>
              {/* Quick Dev OTP Auto-fill Chip */}
              <div
                style={{
                  backgroundColor: 'rgba(36, 87, 255, 0.08)',
                  border: '1px dashed var(--color-electric-blue)',
                  borderRadius: '4px',
                  padding: '10px 12px',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} color="var(--color-electric-blue)" />
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-ink)' }}>
                    Demo code: <strong>123456</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={autoFillDemoOtp}
                  style={{
                    backgroundColor: 'var(--color-electric-blue)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '2px',
                    padding: '3px 8px',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Auto Fill
                </button>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label
                  htmlFor="otp-code"
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--color-text-dark)',
                    marginBottom: '6px',
                  }}
                >
                  6-Digit OTP Code
                </label>
                <input
                  id="otp-code"
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  style={{
                    width: '100%',
                    height: '50px',
                    textAlign: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    letterSpacing: '0.3em',
                    border: '1px solid #D1D5DB',
                    borderRadius: '4px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                  autoFocus
                  required
                />
              </div>

              {/* Optional Athlete Name for new users */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                  marginBottom: '16px',
                }}
              >
                <div>
                  <label
                    htmlFor="first-name-input"
                    style={{
                      display: 'block',
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      color: '#4B5563',
                      marginBottom: '4px',
                    }}
                  >
                    First Name (Optional)
                  </label>
                  <input
                    id="first-name-input"
                    type="text"
                    placeholder="Arjun"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={{
                      width: '100%',
                      height: '38px',
                      padding: '0 10px',
                      fontSize: '0.8125rem',
                      border: '1px solid #D1D5DB',
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="last-name-input"
                    style={{
                      display: 'block',
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      color: '#4B5563',
                      marginBottom: '4px',
                    }}
                  >
                    Last Name (Optional)
                  </label>
                  <input
                    id="last-name-input"
                    type="text"
                    placeholder="Deshmukh"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    style={{
                      width: '100%',
                      height: '38px',
                      padding: '0 10px',
                      fontSize: '0.8125rem',
                      border: '1px solid #D1D5DB',
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  height: '46px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontWeight: 700,
                }}
              >
                {isSubmitting ? (
                  <RefreshCw size={18} className="animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    <span>VERIFY & SIGN IN</span>
                  </>
                )}
              </button>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '16px',
                  fontSize: '0.8125rem',
                }}
              >
                <button
                  type="button"
                  onClick={() => setStep('input')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#6B7280',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    padding: 0,
                  }}
                >
                  Change number
                </button>

                {countdown > 0 ? (
                  <span style={{ color: '#9CA3AF' }}>Resend in {countdown}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setCountdown(30);
                      requestOtp(pendingPhone || phoneNumber);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-electric-blue)',
                      fontWeight: 700,
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </form>
          )}

          {/* Trust badges */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginTop: '20px',
              paddingTop: '16px',
              borderTop: '1px solid #F3F4F6',
              fontSize: '0.75rem',
              color: '#6B7280',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={14} color="#10B981" />
              <span>100% Genuine Gear</span>
            </div>
            <span>•</span>
            <div>Camp Store Pune Pickup Available</div>
          </div>
        </div>
      </div>
    </div>
  );
};
