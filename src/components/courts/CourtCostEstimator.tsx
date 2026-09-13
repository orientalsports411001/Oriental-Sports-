import React, { useState } from 'react';
import { Calculator, ArrowRight, MessageSquare, CheckCircle2 } from 'lucide-react';
import { STORE_INFO } from '../../data/storeInfo';

interface SportPricing {
  basePerCourt: number;
  surfaces: { name: string; multiplier: number }[];
  lightingCost: number;
  fencingCost: number;
}

const PRICING_MODEL: Record<string, SportPricing> = {
  Pickleball: {
    basePerCourt: 480000,
    surfaces: [
      { name: '5-Coat Hard Acrylic System', multiplier: 1.0 },
      { name: '8-Coat Premium Cushion Acrylic', multiplier: 1.35 },
      { name: 'Interlocking PP Weather-Tiles', multiplier: 1.15 },
    ],
    lightingCost: 120000,
    fencingCost: 95000,
  },
  Tennis: {
    basePerCourt: 1250000,
    surfaces: [
      { name: 'Plexipave All-Weather Acrylic (Pace 3)', multiplier: 1.0 },
      { name: '8-Layer Multi-Cushion ITF System', multiplier: 1.4 },
      { name: 'Synthetic Turf / Sand Infill', multiplier: 1.2 },
    ],
    lightingCost: 280000,
    fencingCost: 220000,
  },
  Badminton: {
    basePerCourt: 550000,
    surfaces: [
      { name: '5.0mm BWF Textured PVC Mat', multiplier: 1.0 },
      { name: 'Sprung Teak Wood Flooring System', multiplier: 1.85 },
      { name: 'Cushioned Polyurethane Floor', multiplier: 1.3 },
    ],
    lightingCost: 90000,
    fencingCost: 0,
  },
  'Turf & Multi-sport': {
    basePerCourt: 900000,
    surfaces: [
      { name: '50mm Monofilament Football Grass', multiplier: 1.0 },
      { name: '15mm Multi-Box Cricket Turf', multiplier: 0.9 },
      { name: 'Heavy-Duty Hybrid Arena Turf', multiplier: 1.25 },
    ],
    lightingCost: 240000,
    fencingCost: 260000,
  },
  Squash: {
    basePerCourt: 1900000,
    surfaces: [
      { name: 'Hard Plaster & 12mm Glass Back Wall', multiplier: 1.0 },
      { name: 'High Impact Ceramic Wall System', multiplier: 1.3 },
    ],
    lightingCost: 110000,
    fencingCost: 0,
  },
};

export const CourtCostEstimator: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<string>('Pickleball');
  const [selectedSurfaceIndex, setSelectedSurfaceIndex] = useState<number>(1);
  const [numCourts, setNumCourts] = useState<number>(2);
  const [includeLighting, setIncludeLighting] = useState<boolean>(true);
  const [includeFencing, setIncludeFencing] = useState<boolean>(true);
  const [locationPincode, setLocationPincode] = useState<string>('Pune (PMRDA)');

  const model = PRICING_MODEL[selectedSport] || PRICING_MODEL.Pickleball;
  const currentSurface = model.surfaces[selectedSurfaceIndex] || model.surfaces[0];

  // Calculate estimated total
  const surfaceCost = model.basePerCourt * currentSurface.multiplier * numCourts;
  const lightingTotal = includeLighting ? model.lightingCost * numCourts : 0;
  const fencingTotal = includeFencing ? model.fencingCost * numCourts : 0;
  const grandTotal = surfaceCost + lightingTotal + fencingTotal;

  const lowEstimate = Math.round(grandTotal * 0.95);
  const highEstimate = Math.round(grandTotal * 1.08);

  const getWhatsAppEstimatorUrl = () => {
    const text = `Hello Oriental Sports, I configured a court estimate on your website:\n\n• Sport: ${selectedSport}\n• Courts: ${numCourts}\n• Surface: ${currentSurface.name}\n• Lighting: ${includeLighting ? 'Yes' : 'No'}\n• Fencing/Netting: ${includeFencing ? 'Yes' : 'No'}\n• Location: ${locationPincode}\n• Estimated Range: ₹${(lowEstimate / 100000).toFixed(2)}L – ₹${(highEstimate / 100000).toFixed(2)}L\n\nI would like to schedule a site consultation.`;
    return `https://wa.me/919890990022?text=${encodeURIComponent(text)}`;
  };

  return (
    <div
      style={{
        backgroundColor: '#121212',
        color: '#FAF8F5',
        border: '1px solid rgba(201, 162, 39, 0.4)',
        borderRadius: '2px',
        padding: 'clamp(24px, 5vw, 40px)',
      }}
      id="court-estimator"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <Calculator size={18} color="var(--color-plate-gold)" />
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-plate-gold)',
          }}
        >
          INTERACTIVE COURT CONFIGURATOR
        </span>
      </div>

      <h3
        className="font-display"
        style={{
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          color: '#FFFFFF',
          marginBottom: '8px',
        }}
      >
        ESTIMATE YOUR COURT BUILD
      </h3>
      <p style={{ color: '#DDD6C9', fontSize: '0.9375rem', marginBottom: '28px', maxWidth: '640px', lineHeight: 1.5 }}>
        Select your sport, surface tier, and infrastructure requirements to calculate an initial budgetary estimate calibrated for Pune & Maharashtra site conditions.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--space-2xl)',
        }}
      >
        {/* Left: Configuration Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Step 1: Select Sport */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-plate-gold)', marginBottom: '8px' }}>
              1. Select Sport Discipline
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {Object.keys(PRICING_MODEL).map((sport) => {
                const isSelected = selectedSport === sport;
                return (
                  <button
                    key={sport}
                    type="button"
                    onClick={() => {
                      setSelectedSport(sport);
                      setSelectedSurfaceIndex(0);
                    }}
                    style={{
                      padding: '10px 16px',
                      fontSize: '0.875rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      borderRadius: '2px',
                      backgroundColor: isSelected ? 'var(--color-plate-gold)' : 'rgba(255,255,255,0.08)',
                      color: isSelected ? '#111111' : '#FAF8F5',
                      border: isSelected ? '1px solid var(--color-plate-gold)' : '1px solid rgba(255,255,255,0.25)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {sport}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Surface System */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-plate-gold)', marginBottom: '8px' }}>
              2. Surface Specification
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {model.surfaces.map((surf, idx) => {
                const isSelected = selectedSurfaceIndex === idx;
                return (
                  <label
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      backgroundColor: isSelected ? 'rgba(201, 162, 39, 0.18)' : 'rgba(255,255,255,0.05)',
                      border: isSelected ? '1px solid var(--color-plate-gold)' : '1px solid rgba(255,255,255,0.18)',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      color: '#FAF8F5',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <input
                      type="radio"
                      name="surface"
                      checked={isSelected}
                      onChange={() => setSelectedSurfaceIndex(idx)}
                      style={{ accentColor: '#C9A227', width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    <span style={{ color: isSelected ? 'var(--color-plate-gold)' : '#FAF8F5', fontWeight: isSelected ? 700 : 500 }}>
                      {surf.name}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Step 3: Number of Courts */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-plate-gold)' }}>
                3. Number of Courts
              </label>
              <span style={{ fontWeight: 800, color: '#FFFFFF', fontSize: '1.125rem' }}>
                {numCourts} {numCourts === 1 ? 'Court' : 'Courts'}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="8"
              value={numCourts}
              onChange={(e) => setNumCourts(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: '#C9A227', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#B5AFA4', marginTop: '6px', fontWeight: 600 }}>
              <span>1 Court</span>
              <span>4 Courts</span>
              <span>8 Courts</span>
            </div>
          </div>

          {/* Step 4: Add-ons */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-plate-gold)', marginBottom: '8px' }}>
              4. Turnkey Infrastructure Options
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.875rem', cursor: 'pointer', color: '#FAF8F5' }}>
                <input
                  type="checkbox"
                  checked={includeLighting}
                  onChange={(e) => setIncludeLighting(e.target.checked)}
                  style={{ accentColor: '#C9A227', width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span style={{ color: '#FAF8F5', fontWeight: 500 }}>LED Sports Floodlighting (300–400 Lux Tournament standard)</span>
              </label>

              {model.fencingCost > 0 && (
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.875rem', cursor: 'pointer', color: '#FAF8F5' }}>
                  <input
                    type="checkbox"
                    checked={includeFencing}
                    onChange={(e) => setIncludeFencing(e.target.checked)}
                    style={{ accentColor: '#C9A227', width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <span style={{ color: '#FAF8F5', fontWeight: 500 }}>Galvanized Chain-link Fencing / High-Mast Netting</span>
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Right: Calculated Estimate & Booking Card */}
        <div
          style={{
            backgroundColor: '#181818',
            border: '1px solid var(--color-plate-gold)',
            borderRadius: '2px',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-plate-gold)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              INDICATIVE BUDGET ESTIMATE
            </span>

            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 4.5vw, 2.75rem)',
                fontWeight: 800,
                color: 'var(--color-pure-white)',
                margin: '12px 0',
              }}
            >
              ₹{(lowEstimate / 100000).toFixed(2)}L – ₹{(highEstimate / 100000).toFixed(2)}L*
            </div>

            <div style={{ fontSize: '0.8125rem', color: '#B5AFA4', marginBottom: '20px', lineHeight: 1.4 }}>
              *Turnkey estimate for {numCourts} {selectedSport} court(s) with {currentSurface.name}. Actual pricing varies with sub-base soil stability, civil gradient, and site access across Pune / PMRDA.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '2px', marginBottom: '24px', fontSize: '0.8125rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#EAE5D9' }}>
                <CheckCircle2 size={14} color="#C9A227" />
                <span>Laser gradient civil sub-base inspection</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#EAE5D9' }}>
                <CheckCircle2 size={14} color="#C9A227" />
                <span>USAPA / ITF / BWF compliant line marking</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#EAE5D9' }}>
                <CheckCircle2 size={14} color="#C9A227" />
                <span>Official heavy-duty net fixtures included</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a
              href={getWhatsAppEstimatorUrl()}
              target="_blank"
              rel="noreferrer"
              className="btn btn-gold"
              style={{ width: '100%' }}
            >
              <MessageSquare size={16} />
              <span>DISCUSS ON WHATSAPP (+91 98909 90022)</span>
            </a>

            <a
              href={`tel:${STORE_INFO.phone}`}
              className="btn btn-outline-white btn-sm"
              style={{ width: '100%' }}
            >
              <span>CALL FOR ON-SITE CONSULTATION</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
