/**
 * Razorpay Payment Gateway Client & SDK Loader.
 *
 * Integrates official Razorpay checkout (https://checkout.razorpay.com/v1/checkout.js)
 * with graceful fallback simulation when API keys are being configured in development.
 */

export interface RazorpayOptions {
  key?: string;
  amount: number; // in paise (e.g. 18499 * 100)
  currency: string; // 'INR'
  name: string; // 'Oriental Sports Pune'
  description: string;
  image?: string;
  order_id?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id?: string;
    razorpay_signature?: string;
  }) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => {
      open: () => void;
      on: (event: string, callback: (response: any) => void) => void;
    };
  }
}

const RAZORPAY_SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js';

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = RAZORPAY_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const getRazorpayKey = (): string => {
  return import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_orientalsports';
};

export const isLiveRazorpayKey = (): boolean => {
  const key = getRazorpayKey();
  return Boolean(key) && !key.includes('test_oriental');
};
