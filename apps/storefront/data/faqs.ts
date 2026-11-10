import { STORE_INFO } from '@/data/storeInfo';
import { CATEGORIES } from '@/data/categories';

export const FAQS = [
  {
    q: 'Where is Oriental Sports located?',
    a: `Oriental Sports is at ${STORE_INFO.addressLine1}, ${STORE_INFO.addressLine2}, ${STORE_INFO.city} ${STORE_INFO.pincode} — in Camp, Pune.`,
  },
  {
    q: 'What are your store hours?',
    a: `Open Monday to Saturday, ${STORE_INFO.hours.weekdays}, and Sunday, ${STORE_INFO.hours.sunday}.`,
  },
  {
    q: 'What sports equipment do you sell?',
    a: `Gear across ${CATEGORIES.length} sports: ${CATEGORIES.map((c) => c.name).join(', ')}.`,
  },
  {
    q: 'Do you build sports courts?',
    a: 'Yes. Oriental Sports builds turnkey courts — surface, fencing, lighting and line marking — for clubs, schools, housing societies and homes across Pune and Maharashtra.',
  },
  {
    q: 'Do you string racquets or knock in cricket bats?',
    a: 'Yes, both are done in person at the Camp store, so a racquet or bat leaves ready to play.',
  },
  {
    q: 'How much does delivery cost in Pune?',
    a: 'Free standard delivery on orders above ₹2,000 within Pune city limits. Orders below ₹2,000 have a flat ₹150 delivery fee. Most orders placed before 2:00 PM are dispatched the same day, with delivery in 24 to 48 hours across Pune, Kothrud, Baner, Wakad, Hadapsar and Pimpri-Chinchwad.',
  },
  {
    q: 'Can I pick up my order in store instead?',
    a: 'Yes — choose Store Pickup at checkout. Your equipment is prepared, bat-knocked or strung as requested, and held at the Camp store with zero shipping fees.',
  },
  {
    q: 'Do you ship outside Pune?',
    a: 'Yes, heavy items like table tennis tables, commercial dumbbells and court netting ship via insured surface transport across Maharashtra and India, with a tracking number provided.',
  },
  {
    q: 'What is your return policy?',
    a: `If a product arrives damaged or with a verified manufacturing defect, contact us within 7 days of receipt with photos via WhatsApp at ${STORE_INFO.displayPhone} or email ${STORE_INFO.email}, and we arrange a free replacement or store credit. Items must be unused and in original packaging with seals intact; custom-strung racquets and pre-knocked bats cannot be returned unless defective.`,
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Online payment via Razorpay — cards, UPI, net banking and wallets.',
  },
] as const;
