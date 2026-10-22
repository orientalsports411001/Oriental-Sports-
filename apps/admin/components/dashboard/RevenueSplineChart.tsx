'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';


interface DataPoint {
  month: string;
  value: number;
  label: string;
}

const sixMonthsData: DataPoint[] = [
  { month: 'May', value: 18200, label: '₹18,200 · May 2026' },
  { month: 'Jun', value: 24500, label: '₹24,500 · Jun 2026' },
  { month: 'Jul', value: 21800, label: '₹21,800 · Jul 2026' },
  { month: 'Aug', value: 31400, label: '₹31,400 · Aug 2026' },
  { month: 'Sep', value: 36900, label: '₹36,900 · Sep 2026' },
  { month: 'Oct', value: 40136, label: '₹40,136 · Oct 2026 (Peak)' },
];

const thirtyDaysData: DataPoint[] = [
  { month: 'W1', value: 7200, label: '₹7,200 · Oct 1-7' },
  { month: 'W2', value: 9800, label: '₹9,800 · Oct 8-14' },
  { month: 'W3', value: 14600, label: '₹14,600 · Oct 15-21' },
  { month: 'W4', value: 8536, label: '₹8,536 · Oct 22-28' },
];

export function RevenueSplineChart({ totalRevenue = 40136 }: { totalRevenue?: number }) {
  const [timeRange, setTimeRange] = useState<'6m' | '30d'>('6m');
  const [activePointIndex, setActivePointIndex] = useState<number>(5); // Default to latest

  const dataset = timeRange === '6m' ? sixMonthsData : thirtyDaysData;
  const activePoint = dataset[Math.min(activePointIndex, dataset.length - 1)];

  // SVG Chart Geometry
  const width = 640;
  const height = 210;
  const paddingX = 40;
  const paddingTop = 25;
  const paddingBottom = 35;

  const chartW = width - paddingX * 2;
  const chartH = height - paddingTop - paddingBottom;

  const maxValue = 45000;

  // Calculate points
  const points = dataset.map((d, i) => {
    const x = paddingX + (i / (dataset.length - 1)) * chartW;
    const y = paddingTop + chartH - (d.value / maxValue) * chartH;
    return { x, y, ...d };
  });

  // Construct smooth cubic bezier spline curve
  const makeSplinePath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return '';
    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const cx1 = p0.x + (p1.x - p0.x) * 0.5;
      const cy1 = p0.y;
      const cx2 = p0.x + (p1.x - p0.x) * 0.5;
      const cy2 = p1.y;
      path += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p1.x} ${p1.y}`;
    }
    return path;
  };

  const linePath = makeSplinePath(points);
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${paddingTop + chartH} L ${points[0].x} ${paddingTop + chartH} Z`;

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: 24,
        padding: '24px 28px',
        boxShadow: '0 8px 30px -4px rgba(17, 17, 17, 0.04)',
        position: 'relative',
      }}
    >
      {/* Top Header of Chart */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 16,
          marginBottom: 16,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--subtle)',
              }}
            >
              Revenue Analytics
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '2px 8px',
                borderRadius: 9999,
                background: 'rgba(46, 107, 60, 0.10)',
                color: 'var(--success)',
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              +18.4%
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: 'var(--ink-heading)',
                letterSpacing: '-0.015em',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              ₹{totalRevenue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span style={{ fontSize: 12.5, color: 'var(--muted)', fontWeight: 500 }}>
              Gross intake (Camp Pune)
            </span>
          </div>
        </div>

        {/* Time Filter Pills (Calm White Segmented Control) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            padding: 3,
            background: 'var(--stone)',
            borderRadius: 9999,
          }}
        >
          <button
            type="button"
            onClick={() => {
              setTimeRange('6m');
              setActivePointIndex(5);
            }}
            style={{
              padding: '5px 14px',
              borderRadius: 9999,
              fontSize: 12,
              fontWeight: 600,
              border: 'none',
              background: timeRange === '6m' ? '#FFFFFF' : 'transparent',
              color: timeRange === '6m' ? 'var(--ink-heading)' : 'var(--muted)',
              cursor: 'pointer',
              minHeight: 28,
              boxShadow: timeRange === '6m' ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            Last 6 Months
          </button>
          <button
            type="button"
            onClick={() => {
              setTimeRange('30d');
              setActivePointIndex(3);
            }}
            style={{
              padding: '5px 14px',
              borderRadius: 9999,
              fontSize: 12,
              fontWeight: 600,
              border: 'none',
              background: timeRange === '30d' ? '#FFFFFF' : 'transparent',
              color: timeRange === '30d' ? 'var(--ink-heading)' : 'var(--muted)',
              cursor: 'pointer',
              minHeight: 28,
              boxShadow: timeRange === '30d' ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            30 Days
          </button>
        </div>
      </div>

      {/* SVG Spline Curve Area */}
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="buyurRevenueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C9A227" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#C9A227" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#C9A227" stopOpacity="0.0" />
            </linearGradient>
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#C9A227" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Horizontal Grid lines */}
          {[10000, 20000, 30000, 40000].map((val) => {
            const y = paddingTop + chartH - (val / maxValue) * chartH;
            return (
              <g key={val}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="rgba(17, 17, 17, 0.06)"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingX - 10}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="9.5"
                  fontWeight="700"
                  fill="rgba(17, 17, 17, 0.35)"
                  fontFamily="system-ui, sans-serif"
                >
                  ₹{val / 1000}k
                </text>
              </g>
            );
          })}

          {/* Spline Area Fill */}
          <path d={areaPath} fill="url(#buyurRevenueGrad)" />

          {/* Spline Golden Line Stroke */}
          <path
            d={linePath}
            fill="none"
            stroke="#C9A227"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#goldGlow)"
          />

          {/* Interactive Interactive Dots & Month Labels */}
          {points.map((pt, idx) => {
            const isSelected = idx === activePointIndex;
            return (
              <g
                key={pt.month}
                style={{ cursor: 'pointer' }}
                onClick={() => setActivePointIndex(idx)}
                onMouseEnter={() => setActivePointIndex(idx)}
              >
                {/* Hit area */}
                <rect
                  x={pt.x - 20}
                  y={paddingTop}
                  width={40}
                  height={chartH + paddingBottom}
                  fill="transparent"
                />

                {/* X-axis tick label */}
                <text
                  x={pt.x}
                  y={height - 10}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight={isSelected ? '800' : '600'}
                  fill={isSelected ? '#111111' : 'rgba(17, 17, 17, 0.45)'}
                  fontFamily="system-ui, sans-serif"
                >
                  {pt.month}
                </text>

                {/* Point Node */}
                {isSelected ? (
                  <g>
                    {/* Pulsing ring */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="12"
                      fill="#C9A227"
                      fillOpacity="0.25"
                    />
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="6"
                      fill="#111111"
                      stroke="#C9A227"
                      strokeWidth="3"
                    />
                  </g>
                ) : (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="4"
                    fill="#FFFFFF"
                    stroke="#C9A227"
                    strokeWidth="2.5"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Floating Dark Capsule Tooltip (Buyur style!) */}
        {activePoint && points[activePointIndex] && (
          <div
            style={{
              position: 'absolute',
              left: `${(points[activePointIndex].x / width) * 100}%`,
              top: `${(points[activePointIndex].y / height) * 100}%`,
              transform: 'translate(-50%, -130%)',
              background: '#111111',
              color: '#FFFFFF',
              padding: '6px 12px',
              borderRadius: 9999,
              fontSize: 11.5,
              fontWeight: 800,
              boxShadow: '0 8px 24px -2px rgba(0,0,0,0.3)',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              zIndex: 10,
            }}
          >
            <span style={{ color: 'var(--gold-hi)' }}>●</span>
            <span>{activePoint.label}</span>
          </div>
        )}
      </div>
    </div>
  );
}
