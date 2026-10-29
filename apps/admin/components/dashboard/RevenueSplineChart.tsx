'use client';

import { useState, useMemo } from 'react';

interface OrderInput {
  total_amount: number;
  created_at?: string;
  status?: string;
}

interface DataPoint {
  month: string;
  value: number;
  label: string;
  sublabel?: string;
}

interface RevenueSplineChartProps {
  totalRevenue?: number;
  orders?: OrderInput[];
}

export function RevenueSplineChart({ totalRevenue = 0, orders = [] }: RevenueSplineChartProps) {
  const [timeRange, setTimeRange] = useState<'6m' | '30d'>('6m');
  const [activePointIndex, setActivePointIndex] = useState<number>(5);

  // Compute reference date from orders or current system time
  const refDate = useMemo(() => {
    if (orders.length > 0 && orders[0].created_at) {
      const d = new Date(orders[0].created_at);
      if (!isNaN(d.getTime())) return d;
    }
    return new Date();
  }, [orders]);

  // Compute real 6 months data points
  const sixMonthsData = useMemo<DataPoint[]>(() => {
    const monthsList: { key: string; monthName: string; year: number; fullLabel: string }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(refDate.getFullYear(), refDate.getMonth() - i, 1);
      const monthName = d.toLocaleString('en-US', { month: 'short' });
      const year = d.getFullYear();
      const key = `${year}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      monthsList.push({ key, monthName, year, fullLabel: `${monthName} ${year}` });
    }

    const monthlyTotals: Record<string, number> = {};
    for (const m of monthsList) {
      monthlyTotals[m.key] = 0;
    }

    for (const order of orders) {
      if (!order.created_at) continue;
      const od = new Date(order.created_at);
      if (isNaN(od.getTime())) continue;
      const key = `${od.getFullYear()}-${String(od.getMonth() + 1).padStart(2, '0')}`;
      if (monthlyTotals[key] !== undefined) {
        monthlyTotals[key] += Number(order.total_amount || 0);
      }
    }

    return monthsList.map((m) => {
      const val = monthlyTotals[m.key] || 0;
      return {
        month: m.monthName,
        value: val,
        label: `₹${val.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} · ${m.fullLabel}`,
        sublabel: m.fullLabel,
      };
    });
  }, [orders, refDate]);

  // Compute real 30 days (4 weeks) data points
  const thirtyDaysData = useMemo<DataPoint[]>(() => {
    const nowMs = refDate.getTime();
    const dayMs = 24 * 60 * 60 * 1000;
    const weekTotals = [0, 0, 0, 0];

    for (const order of orders) {
      if (!order.created_at) continue;
      const od = new Date(order.created_at);
      if (isNaN(od.getTime())) continue;
      const diffDays = Math.floor((nowMs - od.getTime()) / dayMs);
      if (diffDays >= 0 && diffDays < 30) {
        if (diffDays >= 22) weekTotals[0] += Number(order.total_amount || 0);
        else if (diffDays >= 15) weekTotals[1] += Number(order.total_amount || 0);
        else if (diffDays >= 7) weekTotals[2] += Number(order.total_amount || 0);
        else weekTotals[3] += Number(order.total_amount || 0);
      }
    }

    return [
      {
        month: 'W1',
        value: weekTotals[0],
        label: `₹${weekTotals[0].toLocaleString('en-IN')} · 22–30 days ago`,
      },
      {
        month: 'W2',
        value: weekTotals[1],
        label: `₹${weekTotals[1].toLocaleString('en-IN')} · 15–21 days ago`,
      },
      {
        month: 'W3',
        value: weekTotals[2],
        label: `₹${weekTotals[2].toLocaleString('en-IN')} · 8–14 days ago`,
      },
      {
        month: 'W4',
        value: weekTotals[3],
        label: `₹${weekTotals[3].toLocaleString('en-IN')} · Past 7 days`,
      },
    ];
  }, [orders, refDate]);

  const dataset = timeRange === '6m' ? sixMonthsData : thirtyDaysData;
  const safeActiveIndex = Math.min(activePointIndex, dataset.length - 1);
  const activePoint = dataset[safeActiveIndex];

  // Real trend calculation (no fake +18.4%)
  const currentMonthRevenue = sixMonthsData[sixMonthsData.length - 1]?.value || 0;
  const previousMonthRevenue = sixMonthsData[sixMonthsData.length - 2]?.value || 0;
  let trendBadgeText = 'Live intake';
  let isPositiveTrend = true;

  if (previousMonthRevenue > 0) {
    const diff = currentMonthRevenue - previousMonthRevenue;
    const pct = ((diff / previousMonthRevenue) * 100).toFixed(1);
    trendBadgeText = `${Number(pct) >= 0 ? '+' : ''}${pct}% MoM`;
    isPositiveTrend = Number(pct) >= 0;
  } else if (currentMonthRevenue > 0) {
    trendBadgeText = `${orders.length} order${orders.length > 1 ? 's' : ''} logged`;
    isPositiveTrend = true;
  } else if (totalRevenue > 0) {
    trendBadgeText = `${orders.length} verified order${orders.length > 1 ? 's' : ''}`;
    isPositiveTrend = true;
  } else {
    trendBadgeText = '0 active orders';
    isPositiveTrend = false;
  }

  // SVG Chart Geometry
  const width = 640;
  const height = 210;
  const paddingX = 40;
  const paddingTop = 25;
  const paddingBottom = 35;

  const chartW = width - paddingX * 2;
  const chartH = height - paddingTop - paddingBottom;

  const maxValInDataset = Math.max(...dataset.map((d) => d.value), 0);
  const maxValue =
    maxValInDataset > 0
      ? Math.max(Math.ceil((maxValInDataset * 1.3) / 1000) * 1000, 1000)
      : 5000;

  // Calculate points on SVG coordinate system
  const points = dataset.map((d, i) => {
    const x = paddingX + (i / Math.max(dataset.length - 1, 1)) * chartW;
    const y = paddingTop + chartH - (maxValue > 0 ? (d.value / maxValue) * chartH : 0);
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
  const baselineY = paddingTop + chartH;
  const areaPath =
    points.length > 0
      ? `${linePath} L ${points[points.length - 1].x} ${baselineY} L ${points[0].x} ${baselineY} Z`
      : '';

  // Dynamic gridline steps (4 clean divisions)
  const gridFractions = [0.25, 0.5, 0.75, 1.0];
  const gridValues = gridFractions.map((f) => {
    const val = Math.round((maxValue * f) / 100) * 100;
    return val;
  });

  const formatGridLabel = (val: number) => {
    if (val >= 1000) {
      const k = val / 1000;
      return `₹${k % 1 === 0 ? k : k.toFixed(1)}k`;
    }
    return `₹${val}`;
  };

  return (
    <div
      className="admin-card"
      style={{
        boxShadow: '0 8px 30px -4px rgba(17, 17, 17, 0.04)',
        position: 'relative',
        overflow: 'hidden',
        minWidth: 0,
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
                background: isPositiveTrend ? 'rgba(46, 107, 60, 0.10)' : 'rgba(255, 255, 255, 0.06)',
                color: isPositiveTrend ? 'var(--success)' : 'var(--muted)',
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              {trendBadgeText}
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

        {/* Time Filter Pills */}
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
              setActivePointIndex(sixMonthsData.length - 1);
            }}
            style={{
              padding: '5px 14px',
              borderRadius: 9999,
              fontSize: 12,
              fontWeight: 700,
              border: 'none',
              background: timeRange === '6m' ? 'var(--blood-crimson)' : 'transparent',
              color: timeRange === '6m' ? '#FFFFFF' : 'var(--muted)',
              cursor: 'pointer',
              minHeight: 28,
              boxShadow: timeRange === '6m' ? '0 2px 10px rgba(200, 16, 46, 0.4)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            Last 6 Months
          </button>
          <button
            type="button"
            onClick={() => {
              setTimeRange('30d');
              setActivePointIndex(thirtyDaysData.length - 1);
            }}
            style={{
              padding: '5px 14px',
              borderRadius: 9999,
              fontSize: 12,
              fontWeight: 700,
              border: 'none',
              background: timeRange === '30d' ? 'var(--blood-crimson)' : 'transparent',
              color: timeRange === '30d' ? '#FFFFFF' : 'var(--muted)',
              cursor: 'pointer',
              minHeight: 28,
              boxShadow: timeRange === '30d' ? '0 2px 10px rgba(200, 16, 46, 0.4)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            Last 30 Days
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
              <stop offset="0%" stopColor="#C8102E" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#C8102E" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#C8102E" stopOpacity="0.0" />
            </linearGradient>
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#C8102E" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* Dynamic Horizontal Grid lines */}
          {gridValues.map((val) => {
            const y = paddingTop + chartH - (val / maxValue) * chartH;
            return (
              <g key={val}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingX - 10}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="9.5"
                  fontWeight="700"
                  fill="rgba(255, 255, 255, 0.35)"
                  fontFamily="system-ui, sans-serif"
                >
                  {formatGridLabel(val)}
                </text>
              </g>
            );
          })}

          {/* Spline Area Fill */}
          {areaPath && <path d={areaPath} fill="url(#buyurRevenueGrad)" />}

          {/* Spline Crimson Line Stroke */}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke="#C8102E"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#goldGlow)"
            />
          )}

          {/* Interactive Dots & Month Labels */}
          {points.map((pt, idx) => {
            const isSelected = idx === safeActiveIndex;
            return (
              <g
                key={`${pt.month}-${idx}`}
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
                  fill={isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.45)'}
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
                      fill="#C8102E"
                      fillOpacity="0.3"
                    />
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="6"
                      fill="#FFFFFF"
                      stroke="#C8102E"
                      strokeWidth="3"
                    />
                  </g>
                ) : (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={pt.value > 0 ? '5' : '3.5'}
                    fill={pt.value > 0 ? '#C8102E' : '#141414'}
                    stroke="#C8102E"
                    strokeWidth="2"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Floating Dark Capsule Tooltip */}
        {activePoint && points[safeActiveIndex] && (
          <div
            style={{
              position: 'absolute',
              left: `${Math.min(90, Math.max(10, (points[safeActiveIndex].x / width) * 100))}%`,
              top: `${(points[safeActiveIndex].y / height) * 100}%`,
              transform:
                safeActiveIndex >= points.length - 2
                  ? 'translate(-88%, -130%)'
                  : safeActiveIndex <= 1
                  ? 'translate(-12%, -130%)'
                  : 'translate(-50%, -130%)',
              background: '#111111',
              color: '#FFFFFF',
              padding: '6px 12px',
              borderRadius: 9999,
              fontSize: 11.5,
              fontWeight: 800,
              boxShadow: '0 8px 24px -2px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              zIndex: 10,
              maxWidth: 'calc(100% - 20px)',
            }}
          >
            <span style={{ color: activePoint.value > 0 ? '#4ADE80' : 'var(--muted)' }}>●</span>
            <span>{activePoint.label}</span>
          </div>
        )}
      </div>
    </div>
  );
}
