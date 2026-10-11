import Razorpay from 'razorpay';

/**
 * Server-only Razorpay SDK instance. `RAZORPAY_KEY_SECRET` must never be
 * exposed to the client — it is only read here, inside Route Handlers.
 */
export function getRazorpayInstance() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error('RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET are not configured.');
  }

  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}
