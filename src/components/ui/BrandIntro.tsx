import React, { useEffect, useState } from 'react';

/**
 * BrandIntro — once per session, ~1.1s, never blocks.
 * The official O/S monogram is uncovered through a circular mask on Ivory
 * Court (the monogram's black rings need a light ground), then the panel lifts
 * away. Tap to skip. Skipped entirely for prefers-reduced-motion.
 */
export const BrandIntro: React.FC = () => {
  const [phase, setPhase] = useState<'hidden' | 'in' | 'out'>(() => {
    if (typeof window === 'undefined') return 'hidden';
    let seen = false;
    try {
      seen = sessionStorage.getItem('oriental_intro_shown') === 'true';
    } catch {
      seen = true;
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return seen || reduced ? 'hidden' : 'in';
  });

  useEffect(() => {
    if (phase === 'hidden') return;
    try {
      sessionStorage.setItem('oriental_intro_shown', 'true');
    } catch {
      /* storage unavailable — intro simply shows again next time */
    }
    if (phase === 'in') {
      const t = window.setTimeout(() => setPhase('out'), 700);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setPhase('hidden'), 520);
    return () => window.clearTimeout(t);
  }, [phase]);

  if (phase === 'hidden') return null;

  return (
    <div
      className={`brand-intro ${phase === 'out' ? 'is-leaving' : ''}`}
      aria-hidden="true"
      onClick={() => setPhase('out')}
    >
      <img className="brand-intro-mark" src="/brand/oriental-sports-monogram.png" alt="" width={186} height={147} />
    </div>
  );
};

export default BrandIntro;
