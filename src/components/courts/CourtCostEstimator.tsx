import React, { useEffect, useRef, useState } from 'react';
import { STORE_INFO } from '../../data/storeInfo';

/** Animate a number toward its target (skipped for reduced motion). */
const useAnimatedNumber = (targetValue: number, durationMs = 400) => {
  const [displayValue, setDisplayValue] = useState(targetValue);
  const currentRef = useRef(targetValue);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(targetValue);
      currentRef.current = targetValue;
      return;
    }
    const startVal = currentRef.current;
    const diff = targetValue - startVal;
    if (Math.abs(diff) < 0.001) return;
    let frame = 0;
    let start: number | null = null;
    const step = (now: number) => {
      if (start === null) start = now;
      const progress = Math.min((now - start) / durationMs, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayValue(startVal + diff * ease);
      if (progress < 1) frame = requestAnimationFrame(step);
      else currentRef.current = targetValue;
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [targetValue, durationMs]);

  return displayValue;
};

interface SportPricing {
  basePerCourt: number;
  surfaces: { name: string; multiplier: number }[];
  lightingCost: number;
  fencingCost: number;
}

/**
 * Indicative pricing model. Surface names are kept plain on purpose — no
 * invented coat counts, lux levels or certifications. The owner should confirm
 * these rupee figures before they are relied on.
 */
const PRICING_MODEL: Record<string, SportPricing> = {
  Pickleball: {
    basePerCourt: 480000,
    surfaces: [
      { name: 'Hard acrylic', multiplier: 1.0 },
      { name: 'Cushioned acrylic', multiplier: 1.35 },
      { name: 'Modular sports tiles', multiplier: 1.15 },
    ],
    lightingCost: 120000,
    fencingCost: 95000,
  },
  Tennis: {
    basePerCourt: 1250000,
    surfaces: [
      { name: 'Hard court acrylic', multiplier: 1.0 },
      { name: 'Cushioned acrylic', multiplier: 1.4 },
      { name: 'Synthetic grass', multiplier: 1.2 },
    ],
    lightingCost: 280000,
    fencingCost: 220000,
  },
  Badminton: {
    basePerCourt: 550000,
    surfaces: [
      { name: 'PVC sports mat', multiplier: 1.0 },
      { name: 'Timber sports floor', multiplier: 1.85 },
      { name: 'Polyurethane floor', multiplier: 1.3 },
    ],
    lightingCost: 90000,
    fencingCost: 0,
  },
  'Turf & Multi-sport': {
    basePerCourt: 900000,
    surfaces: [
      { name: 'Football turf', multiplier: 1.0 },
      { name: 'Box cricket turf', multiplier: 0.9 },
      { name: 'Multi-sport turf', multiplier: 1.25 },
    ],
    lightingCost: 240000,
    fencingCost: 260000,
  },
  Squash: {
    basePerCourt: 1900000,
    surfaces: [
      { name: 'Plaster walls, glass back wall', multiplier: 1.0 },
      { name: 'Panel wall system', multiplier: 1.3 },
    ],
    lightingCost: 110000,
    fencingCost: 0,
  },
};

const lakh = (v: number) => `₹${v.toFixed(1)}L`;

export const CourtCostEstimator: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<string>('Pickleball');
  const [selectedSurfaceIndex, setSelectedSurfaceIndex] = useState<number>(0);
  const [numCourts, setNumCourts] = useState<number>(2);
  const [includeLighting, setIncludeLighting] = useState<boolean>(true);
  const [includeFencing, setIncludeFencing] = useState<boolean>(true);

  const model = PRICING_MODEL[selectedSport] || PRICING_MODEL.Pickleball;
  const surface = model.surfaces[selectedSurfaceIndex] || model.surfaces[0];

  const surfaceCost = model.basePerCourt * surface.multiplier * numCourts;
  const lightingTotal = includeLighting ? model.lightingCost * numCourts : 0;
  const fencingTotal = includeFencing && model.fencingCost > 0 ? model.fencingCost * numCourts : 0;
  const grandTotal = surfaceCost + lightingTotal + fencingTotal;

  const lowEstimate = Math.round(grandTotal * 0.95);
  const highEstimate = Math.round(grandTotal * 1.08);
  const animatedLow = useAnimatedNumber(lowEstimate / 100000);
  const animatedHigh = useAnimatedNumber(highEstimate / 100000);

  const whatsappUrl = () => {
    const text = `Hello Oriental Sports, I configured a court estimate on your website:\n\n• Sport: ${selectedSport}\n• Courts: ${numCourts}\n• Surface: ${surface.name}\n• Lighting: ${includeLighting ? 'Yes' : 'No'}\n• Fencing/Netting: ${fencingTotal > 0 ? 'Yes' : 'No'}\n• Estimated Range: ₹${(lowEstimate / 100000).toFixed(2)}L – ₹${(highEstimate / 100000).toFixed(2)}L\n\nI would like to schedule a site visit.`;
    return `https://wa.me/919890990022?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="estimator on-dark">
      <div className="estimator-head">
        <p className="eyebrow">Court cost estimate</p>
        <h2 className="display d-2">What will my court cost?</h2>
        <p className="estimator-intro">
          An indicative range to plan with. Soil, levels and access change the real number — we confirm it after a site visit.
        </p>
      </div>

      <div className="estimator-grid">
        <div className="estimator-controls">
          <fieldset className="estimator-field">
            <legend>Sport</legend>
            <div className="estimator-chips">
              {Object.keys(PRICING_MODEL).map((sport) => (
                <button
                  key={sport}
                  type="button"
                  className="chip chip-dark"
                  aria-pressed={selectedSport === sport}
                  onClick={() => {
                    setSelectedSport(sport);
                    setSelectedSurfaceIndex(0);
                  }}
                >
                  {sport}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="estimator-field">
            <legend>Surface</legend>
            <div className="estimator-options">
              {model.surfaces.map((surf, idx) => (
                <label key={surf.name} className={`estimator-option ${selectedSurfaceIndex === idx ? 'is-selected' : ''}`}>
                  <input
                    type="radio"
                    name="surface"
                    checked={selectedSurfaceIndex === idx}
                    onChange={() => setSelectedSurfaceIndex(idx)}
                  />
                  <span>{surf.name}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="estimator-field">
            <label htmlFor="court-count" className="estimator-legend-row">
              <span>Number of courts</span>
              <output htmlFor="court-count">{numCourts}</output>
            </label>
            <input
              id="court-count"
              type="range"
              min={1}
              max={8}
              value={numCourts}
              onChange={(e) => setNumCourts(parseInt(e.target.value, 10))}
              className="estimator-range"
            />
          </div>

          <fieldset className="estimator-field">
            <legend>Also include</legend>
            <label className="estimator-check">
              <input type="checkbox" checked={includeLighting} onChange={(e) => setIncludeLighting(e.target.checked)} />
              <span>Floodlighting</span>
            </label>
            {model.fencingCost > 0 && (
              <label className="estimator-check">
                <input type="checkbox" checked={includeFencing} onChange={(e) => setIncludeFencing(e.target.checked)} />
                <span>Perimeter fencing and netting</span>
              </label>
            )}
          </fieldset>
        </div>

        <div className="estimator-result" aria-live="polite">
          <p className="label">Indicative range</p>
          <p className="estimator-figure">
            {lakh(animatedLow)} <span aria-hidden="true">–</span><span className="visually-hidden">to</span> {lakh(animatedHigh)}
          </p>
          <p className="estimator-summary">
            {numCourts} {selectedSport.toLowerCase()} {numCourts === 1 ? 'court' : 'courts'}, {surface.name.toLowerCase()}
            {includeLighting ? ', floodlit' : ''}
            {fencingTotal > 0 ? ', fenced' : ''}.
          </p>
          <div className="estimator-actions">
            <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="btn btn-gold btn-block">
              Send this to us on WhatsApp
            </a>
            <a href={`tel:${STORE_INFO.phone}`} className="btn btn-outline-light btn-block">
              Call {STORE_INFO.displayPhone}
            </a>
          </div>
          <p className="estimator-note">Figures in lakh rupees (₹1L = ₹1,00,000). Not a quotation.</p>
        </div>
      </div>
    </div>
  );
};

export default CourtCostEstimator;
