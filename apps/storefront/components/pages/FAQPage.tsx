'use client';

import React from 'react';
import { FAQS } from '@/data/faqs';
import { PageHeader } from '@/components/ui/PageHeader';

export const FAQPageContent: React.FC = () => (
  <div className="policy-page">
    <PageHeader crumbs={[{ label: 'Home', to: '/' }, { label: 'FAQ' }]} title={['Frequently asked questions']} />
    <div className="container">
      <div className="prose" style={{ maxWidth: '48em', margin: '0 auto' }}>
        {FAQS.map(({ q, a }) => (
          <details key={q} style={{ marginBottom: '0.5em' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 700 }}>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </div>
  </div>
);
