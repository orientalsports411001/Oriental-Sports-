import React from 'react';
import { NavLink } from 'react-router-dom';
import { STORE_INFO } from '../data/storeInfo';
import { PageHeader } from '../components/ui/PageHeader';

const POLICIES = [
  { to: '/shipping', label: 'Shipping' },
  { to: '/returns', label: 'Returns' },
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
];

/** Shared reading layout for the four policies. Policy wording is unchanged. */
const PolicyLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="policy-page">
    <PageHeader crumbs={[{ label: 'Home', to: '/' }, { label: title }]} title={[title]} />
    <div className="container policy-grid">
      <nav aria-label="Policies" className="policy-nav">
        {POLICIES.map((p) => (
          <NavLink key={p.to} to={p.to} className={({ isActive }) => `policy-link ${isActive ? 'active' : ''}`}>
            {p.label}
          </NavLink>
        ))}
      </nav>
      <div className="prose">{children}</div>
    </div>
  </div>
);

export const ShippingPage: React.FC = () => (
  <PolicyLayout title="Shipping & delivery">
    <p>
      Oriental Sports ships sports equipment and recreation goods directly from our retail flagship store located at <strong>{STORE_INFO.addressLine1}, {STORE_INFO.addressLine2}, {STORE_INFO.locality}, {STORE_INFO.city} 411001</strong>.
    </p>
    <h2>1. Pune & PMRDA Local Deliveries</h2>
    <p>
      - Orders within Pune city limits above ₹2,000 qualify for <strong>FREE standard delivery</strong>. For orders below ₹2,000, a flat nominal delivery fee of ₹150 applies.<br />
      - Most orders placed before 2:00 PM are dispatched same-day from Camp. Standard delivery time is 24 to 48 hours across Pune, Kothrud, Baner, Wakad, Hadapsar, and Pimpri-Chinchwad.
    </p>
    <h2>2. Camp Store Click & Collect</h2>
    <p>
      You may choose <strong>Store Pickup</strong> during checkout. Your equipment will be prepared, bat-knocked or strung as requested, and held at our Camp store with zero shipping fees.
    </p>
    <h2>3. Pan-India Dispatches</h2>
    <p>
      Heavy items like table tennis tables, commercial dumbbells, and court netting are shipped via insured surface transport across Maharashtra and India with real-time tracking numbers provided.
    </p>
  </PolicyLayout>
);

export const ReturnsPage: React.FC = () => (
  <PolicyLayout title="Returns & replacements">
    <p>
      At Oriental Sports, authentic gear and customer trust are our foundation. We inspect all racquets, bats, balls, and equipment prior to dispatch.
    </p>
    <h2>1. 7-Day Replacement Policy</h2>
    <p>
      If any product arrives damaged or with a verified manufacturing defect, notify us within 7 days of receipt with photos via WhatsApp at <strong>{STORE_INFO.displayPhone}</strong> or email <strong>{STORE_INFO.email}</strong>. We will arrange a free replacement or store credit.
    </p>
    <h2>2. Condition for Returns</h2>
    <p>
      Items must be unused, in original manufacturer packaging with plastic seals intact on bat and racquet handles. Custom-strung racquets and pre-knocked bats prepared to customer specifications cannot be refunded unless defective.
    </p>
    <h2>3. In-Store Exchanges</h2>
    <p>You can bring your equipment directly to our Camp store for quick in-person verification and exchange.</p>
  </PolicyLayout>
);

export const PrivacyPage: React.FC = () => (
  <PolicyLayout title="Privacy policy">
    <p>Oriental Sports respects the privacy of athletes, clubs, and customers who engage with our store and website.</p>
    <p>
      We collect contact details (such as name, phone number, delivery address, and email) solely to process orders, communicate dispatch details, and coordinate court construction site inspections.
    </p>
    <p>We never sell, trade, or distribute your private contact details to third-party marketing entities.</p>
  </PolicyLayout>
);

export const TermsPage: React.FC = () => (
  <PolicyLayout title="Terms & conditions">
    <p>
      By using this website or placing orders with Oriental Sports (Shop 247, MG Road, Camp, Pune 411001), you agree to these operational terms.
    </p>
    <p>
      - Product prices are quoted in Indian Rupees (INR) and are inclusive of standard GST where applicable.<br />
      - Court construction proposals and quotes are subject to physical site laser gradient inspection and final engineering agreement.<br />
      - All brand logos and original content are property of Oriental Sports.
    </p>
  </PolicyLayout>
);
