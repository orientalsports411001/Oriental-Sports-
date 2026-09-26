import React, { useState } from 'react';
import { STORE_INFO } from '../data/storeInfo';
import { PageHeader } from '../components/ui/PageHeader';
import { Reveal } from '../components/motion/Reveal';
import { useStoreStatus } from '../utils/storeHours';

const TOPICS = [
  'Sports equipment',
  'Court construction',
  'School, club or academy order',
  'Racquet stringing or bat service',
];

/**
 * There is no form backend, so the enquiry is handed to WhatsApp (or email)
 * with the message already written — the visitor always knows where it went.
 */
export const ContactPage: React.FC = () => {
  const status = useStoreStatus();
  const [form, setForm] = useState({ name: '', phone: '', email: '', topic: TOPICS[0], message: '' });
  const [sent, setSent] = useState(false);

  const body = () =>
    [
      `Hello Oriental Sports,`,
      ``,
      form.message,
      ``,
      `Topic: ${form.topic}`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : '',
    ]
      .filter((line, i, all) => line !== '' || all[i - 1] !== '')
      .join('\n');

  const whatsappHref = () => `https://wa.me/${STORE_INFO.phone.replace(/\D/g, '')}?text=${encodeURIComponent(body())}`;
  const mailHref = () =>
    `mailto:${STORE_INFO.email}?subject=${encodeURIComponent(`${form.topic} — ${form.name}`)}&body=${encodeURIComponent(body())}`;

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [key]: e.target.value });

  return (
    <div className="contact-page">
      <PageHeader
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
        title={['Talk to', 'the store.']}
        lead="Gear questions, bulk orders for schools and clubs, or a court you want built. Write it here and send it to us on WhatsApp or by email."
      />

      <section className="container contact-grid" aria-label="Send us a message">
        <Reveal className="contact-form-wrap">
          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              window.open(whatsappHref(), '_blank', 'noopener');
              setSent(true);
            }}
          >
            <div className="field">
              <label className="field-label" htmlFor="c-name">Name</label>
              <input id="c-name" className="input" required autoComplete="name" value={form.name} onChange={set('name')} />
            </div>
            <div className="contact-form-row">
              <div className="field">
                <label className="field-label" htmlFor="c-phone">Phone</label>
                <input id="c-phone" className="input" type="tel" required autoComplete="tel" inputMode="tel" value={form.phone} onChange={set('phone')} />
              </div>
              <div className="field">
                <label className="field-label" htmlFor="c-email">Email (optional)</label>
                <input id="c-email" className="input" type="email" autoComplete="email" value={form.email} onChange={set('email')} />
              </div>
            </div>
            <div className="field">
              <label className="field-label" htmlFor="c-topic">About</label>
              <select id="c-topic" className="select" value={form.topic} onChange={set('topic')}>
                {TOPICS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label className="field-label" htmlFor="c-message">Message</label>
              <textarea id="c-message" className="textarea" required rows={5} value={form.message} onChange={set('message')} />
            </div>

            <div className="contact-form-actions">
              <button type="submit" className="btn btn-primary">Send on WhatsApp</button>
              <a href={mailHref()} className="link-arrow">
                Send by email instead <span className="btn-arrow" aria-hidden="true">→</span>
              </a>
            </div>

            <p className="contact-form-note" role="status">
              {sent
                ? 'WhatsApp opened in a new tab with your message written out — press send there to reach us.'
                : 'Your message opens in WhatsApp (or your email app) ready to send. Nothing is stored on this website.'}
            </p>
          </form>
        </Reveal>

        <Reveal as="aside" className="contact-side" delay={0.1}>
          <p className={`store-status ${status.isOpen ? 'is-open' : ''}`}>
            <span className="status-dot" aria-hidden="true" />
            {status.label}
          </p>
          <dl className="store-hours">
            <div>
              <dt>Phone</dt>
              <dd><a href={`tel:${STORE_INFO.phone}`}>{STORE_INFO.displayPhone}</a></dd>
            </div>
            <div>
              <dt>WhatsApp</dt>
              <dd><a href={STORE_INFO.whatsappUrl} target="_blank" rel="noreferrer">Chat now</a></dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd><a href={`mailto:${STORE_INFO.email}`}>{STORE_INFO.email}</a></dd>
            </div>
            <div>
              <dt>Store</dt>
              <dd>{STORE_INFO.addressLine1}, {STORE_INFO.locality}</dd>
            </div>
          </dl>
          <p className="contact-side-note">
            Schools, colleges, academies and housing societies: tell us what you need and how many — we’ll put together a bulk order.
          </p>
        </Reveal>
      </section>
    </div>
  );
};

export default ContactPage;
