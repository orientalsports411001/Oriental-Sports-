import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, RotateCcw, ShieldCheck, FileText, ArrowLeft } from 'lucide-react';
import { STORE_INFO } from '../data/storeInfo';

export const ShippingPage: React.FC = () => {
  return (
    <div className="bg-ivory" style={{ minHeight: '80vh', padding: 'var(--space-3xl) 0' }}>
      <div className="container" style={{ maxWidth: '800px', backgroundColor: '#FFF', padding: 'clamp(24px, 5vw, 48px)', borderRadius: '2px', border: '1px solid #E2DCCF' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#C9A227', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '20px' }}>
          <ArrowLeft size={14} />
          <span>BACK TO HOME</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <Truck size={24} color="#C9A227" />
          <h1 className="font-display" style={{ fontSize: '2rem' }}>SHIPPING & DELIVERY POLICY</h1>
        </div>
        <div style={{ fontSize: '0.9375rem', color: '#444', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p>
            Oriental Sports ships sports equipment and recreation goods directly from our retail flagship store located at <strong>{STORE_INFO.addressLine1}, {STORE_INFO.addressLine2}, {STORE_INFO.locality}, {STORE_INFO.city} 411001</strong>.
          </p>
          <h3 style={{ fontSize: '1.125rem', color: '#111', marginTop: '12px' }}>1. Pune & PMRDA Local Deliveries</h3>
          <p>
            - Orders within Pune city limits above ₹2,000 qualify for <strong>FREE standard delivery</strong>. For orders below ₹2,000, a flat nominal delivery fee of ₹150 applies.<br />
            - Most orders placed before 2:00 PM are dispatched same-day from Camp. Standard delivery time is 24 to 48 hours across Pune, Kothrud, Baner, Wakad, Hadapsar, and Pimpri-Chinchwad.
          </p>
          <h3 style={{ fontSize: '1.125rem', color: '#111', marginTop: '12px' }}>2. Camp Store Click & Collect</h3>
          <p>
            You may choose <strong>Store Pickup</strong> during checkout. Your equipment will be prepared, bat-knocked or strung as requested, and held at our Camp store with zero shipping fees.
          </p>
          <h3 style={{ fontSize: '1.125rem', color: '#111', marginTop: '12px' }}>3. Pan-India Dispatches</h3>
          <p>
            Heavy items like table tennis tables, commercial dumbbells, and court netting are shipped via insured surface transport across Maharashtra and India with real-time tracking numbers provided.
          </p>
        </div>
      </div>
    </div>
  );
};

export const ReturnsPage: React.FC = () => {
  return (
    <div className="bg-ivory" style={{ minHeight: '80vh', padding: 'var(--space-3xl) 0' }}>
      <div className="container" style={{ maxWidth: '800px', backgroundColor: '#FFF', padding: 'clamp(24px, 5vw, 48px)', borderRadius: '2px', border: '1px solid #E2DCCF' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#C9A227', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '20px' }}>
          <ArrowLeft size={14} />
          <span>BACK TO HOME</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <RotateCcw size={24} color="#C9A227" />
          <h1 className="font-display" style={{ fontSize: '2rem' }}>RETURNS & REPLACEMENTS</h1>
        </div>
        <div style={{ fontSize: '0.9375rem', color: '#444', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p>
            At Oriental Sports, authentic gear and customer trust are our foundation. We inspect all racquets, bats, balls, and equipment prior to dispatch.
          </p>
          <h3 style={{ fontSize: '1.125rem', color: '#111', marginTop: '12px' }}>1. 7-Day Replacement Policy</h3>
          <p>
            If any product arrives damaged or with a verified manufacturing defect, notify us within 7 days of receipt with photos via WhatsApp at <strong>{STORE_INFO.displayPhone}</strong> or email <strong>{STORE_INFO.email}</strong>. We will arrange a free replacement or store credit.
          </p>
          <h3 style={{ fontSize: '1.125rem', color: '#111', marginTop: '12px' }}>2. Condition for Returns</h3>
          <p>
            Items must be unused, in original manufacturer packaging with plastic seals intact on bat and racquet handles. Custom-strung racquets and pre-knocked bats prepared to customer specifications cannot be refunded unless defective.
          </p>
          <h3 style={{ fontSize: '1.125rem', color: '#111', marginTop: '12px' }}>3. In-Store Exchanges</h3>
          <p>
            You can bring your equipment directly to our Camp store for quick in-person verification and exchange.
          </p>
        </div>
      </div>
    </div>
  );
};

export const PrivacyPage: React.FC = () => {
  return (
    <div className="bg-ivory" style={{ minHeight: '80vh', padding: 'var(--space-3xl) 0' }}>
      <div className="container" style={{ maxWidth: '800px', backgroundColor: '#FFF', padding: 'clamp(24px, 5vw, 48px)', borderRadius: '2px', border: '1px solid #E2DCCF' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#C9A227', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '20px' }}>
          <ArrowLeft size={14} />
          <span>BACK TO HOME</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <ShieldCheck size={24} color="#C9A227" />
          <h1 className="font-display" style={{ fontSize: '2rem' }}>PRIVACY POLICY</h1>
        </div>
        <div style={{ fontSize: '0.9375rem', color: '#444', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p>
            Oriental Sports respects the privacy of athletes, clubs, and customers who engage with our store and website.
          </p>
          <p>
            We collect contact details (such as name, phone number, delivery address, and email) solely to process orders, communicate dispatch details, and coordinate court construction site inspections.
          </p>
          <p>
            We never sell, trade, or distribute your private contact details to third-party marketing entities.
          </p>
        </div>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <div className="bg-ivory" style={{ minHeight: '80vh', padding: 'var(--space-3xl) 0' }}>
      <div className="container" style={{ maxWidth: '800px', backgroundColor: '#FFF', padding: 'clamp(24px, 5vw, 48px)', borderRadius: '2px', border: '1px solid #E2DCCF' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#C9A227', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '20px' }}>
          <ArrowLeft size={14} />
          <span>BACK TO HOME</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <FileText size={24} color="#C9A227" />
          <h1 className="font-display" style={{ fontSize: '2rem' }}>TERMS & CONDITIONS</h1>
        </div>
        <div style={{ fontSize: '0.9375rem', color: '#444', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p>
            By using this website or placing orders with Oriental Sports (Shop 247, MG Road, Camp, Pune 411001), you agree to these operational terms.
          </p>
          <p>
            - Product prices are quoted in Indian Rupees (INR) and are inclusive of standard GST where applicable.<br />
            - Court construction proposals and quotes are subject to physical site laser gradient inspection and final engineering agreement.<br />
            - All brand logos and original content are property of Oriental Sports.
          </p>
        </div>
      </div>
    </div>
  );
};
