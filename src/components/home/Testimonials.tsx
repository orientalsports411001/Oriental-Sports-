import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS } from '../../data/testimonials';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const active = TESTIMONIALS[currentIndex];

  return (
    <section className="section-padding bg-white" aria-label="Client & Player Endorsements">
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '720px', marginBottom: 'var(--space-2xl)' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-ui)',
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-plate-gold)',
              marginBottom: '8px',
            }}
          >
            <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-plate-gold)' }} />
            <span>VOICES FROM THE COURT & FIELD</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display-xl)',
              fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: 'var(--color-ink)',
              margin: 0,
            }}
          >
            TRUSTED ACROSS PUNE
          </h2>
        </div>

        {/* Featured Testimonial Card */}
        <div
          style={{
            backgroundColor: 'var(--color-ivory)',
            border: '1px solid var(--color-ivory-border)',
            borderRadius: '2px',
            padding: 'clamp(28px, 5vw, 56px)',
            position: 'relative',
          }}
        >
          <Quote
            size={56}
            color="rgba(201, 162, 39, 0.2)"
            style={{ position: 'absolute', top: '28px', right: '28px' }}
          />

          <div style={{ maxWidth: '880px' }}>
            {/* Stars */}
            <div style={{ display: 'flex', gap: '4px', marginBottom: '24px' }}>
              {[...Array(active.rating)].map((_, i) => (
                <Star key={i} size={18} fill="#C9A227" stroke="#C9A227" />
              ))}
            </div>

            {/* Quote Body with AnimatePresence */}
            <AnimatePresence mode="wait">
              <motion.p
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)',
                  lineHeight: 1.4,
                  fontWeight: 600,
                  color: 'var(--color-ink)',
                  marginBottom: '32px',
                }}
              >
                “{active.quote}”
              </motion.p>
            </AnimatePresence>

            {/* Author Information */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-display-xl)', fontSize: '1.5rem', color: 'var(--color-ink)' }}>
                    {active.author.toUpperCase()}
                  </span>
                  <ShieldCheck size={16} color="#C9A227" />
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#666', fontFamily: 'var(--font-ui)' }}>
                  {active.role} • {active.location}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-plate-gold)', fontFamily: 'var(--font-ui)', fontWeight: 700, marginTop: '2px' }}>
                  Project: {active.sportOrProject}
                </div>
              </div>

              {/* Navigation Arrows */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem', fontWeight: 700, color: '#888', marginRight: '8px' }}>
                  0{currentIndex + 1} / 0{TESTIMONIALS.length}
                </span>
                <button
                  type="button"
                  onClick={handlePrev}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '2px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--color-ivory-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-ink)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '2px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--color-ivory-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-ink)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
