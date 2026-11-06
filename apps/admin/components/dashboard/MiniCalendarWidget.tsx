'use client';

import { useMemo, useState, type CSSProperties } from 'react';
import Link from 'next/link';

export interface CalendarDispatchOrder {
  id: string;
  order_number: string;
  customer_name: string;
  total_amount: number;
  status: string;
  /** ISO timestamp the order reached its current dispatch stage (falls back to placed-on date). */
  date: string;
}

interface MiniCalendarWidgetProps {
  dispatches: CalendarDispatchOrder[];
}

const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTH_LABELS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

function dateKey(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

export function MiniCalendarWidget({ dispatches }: MiniCalendarWidgetProps) {
  // Real "today", computed once per mount — not a hardcoded date.
  const [today] = useState(() => new Date());
  const [viewYear, setViewYear] = useState(() => today.getFullYear());
  const [viewMonth, setViewMonth] = useState(() => today.getMonth()); // 0-indexed
  const [selectedDate, setSelectedDate] = useState(() => dateKey(today));

  const dispatchesByDay = useMemo(() => {
    const map = new Map<string, CalendarDispatchOrder[]>();
    for (const d of dispatches) {
      const parsed = new Date(d.date);
      if (Number.isNaN(parsed.getTime())) continue;
      const key = dateKey(parsed);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(d);
    }
    return map;
  }, [dispatches]);

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const startDayOffset = new Date(viewYear, viewMonth, 1).getDay();
  const todayKey = dateKey(today);

  const calendarCells: (number | null)[] = [];
  for (let i = 0; i < startDayOffset; i++) calendarCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d);

  const goToMonth = (deltaMonths: number) => {
    const d = new Date(viewYear, viewMonth + deltaMonths, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  };

  const selectedDispatches = dispatchesByDay.get(selectedDate) || [];
  const selectedDateObj = new Date(`${selectedDate}T00:00:00`);

  const navButtonStyle: CSSProperties = {
    width: 28,
    height: 28,
    borderRadius: '50%',
    background: 'var(--stone)',
    border: 'none',
    padding: 0,
    display: 'grid',
    placeItems: 'center',
    color: 'var(--ink)',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 700,
  };

  return (
    <div
      className="admin-card"
      style={{
        boxShadow: '0 8px 30px -4px rgba(17, 17, 17, 0.04)',
        minWidth: 0,
      }}
    >
      {/* Month Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 18,
        }}
      >
        <div>
          <div style={{ fontSize: 16, fontWeight: 900, color: 'var(--ink)' }}>
            {MONTH_LABELS[viewMonth]}, {viewYear}
          </div>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--subtle)', letterSpacing: '0.04em' }}>
            CAMP PUNE LOGISTICS
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button type="button" aria-label="Previous Month" onClick={() => goToMonth(-1)} style={navButtonStyle}>
            ‹
          </button>
          <button type="button" aria-label="Next Month" onClick={() => goToMonth(1)} style={navButtonStyle}>
            ›
          </button>
        </div>
      </div>

      {/* Days of Week Header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          textAlign: 'center',
          marginBottom: 8,
        }}
      >
        {WEEKDAY_LABELS.map((dow, idx) => (
          <div
            key={idx}
            style={{
              fontSize: 10.5,
              fontWeight: 800,
              color: 'var(--subtle)',
              padding: '4px 0',
            }}
          >
            {dow}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px 2px',
          textAlign: 'center',
          marginBottom: 20,
        }}
      >
        {calendarCells.map((day, idx) => {
          if (!day) {
            return <div key={`empty-${idx}`} style={{ height: 32 }} />;
          }

          const key = `${viewYear}-${pad2(viewMonth + 1)}-${pad2(day)}`;
          const isSelected = key === selectedDate;
          const isToday = key === todayKey;
          const hasEvent = dispatchesByDay.has(key);

          return (
            <button
              key={`day-${day}`}
              type="button"
              onClick={() => setSelectedDate(key)}
              style={{
                height: 32,
                borderRadius: '50%',
                border: isToday && !isSelected ? '1px solid var(--blood-crimson)' : 'none',
                background: isSelected ? 'var(--blood-crimson)' : 'transparent',
                color: isSelected ? '#FFFFFF' : 'var(--ink)',
                fontWeight: isSelected ? 700 : hasEvent ? 600 : 500,
                fontSize: 12,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: isSelected ? '0 2px 10px rgba(200, 16, 46, 0.45)' : 'none',
                transition: 'all 0.15s ease',
                padding: 0,
              }}
            >
              <span>{day}</span>
              {hasEvent && !isSelected && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 2,
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    background: 'var(--blood-crimson)',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Day Agenda / Dispatch Widget */}
      <div
        style={{
          padding: '14px 16px',
          borderRadius: 18,
          background: 'var(--stone)',
          border: '1px solid var(--line)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)' }}>
            Dispatches on {MONTH_LABELS[selectedDateObj.getMonth()].slice(0, 3)} {selectedDateObj.getDate()}
          </span>
          {selectedDispatches.length > 0 && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                padding: '2px 7px',
                borderRadius: 9999,
                background: 'rgba(38, 41, 46, 0.08)',
                color: 'var(--ink-heading)',
              }}
            >
              {selectedDispatches.length} Active
            </span>
          )}
        </div>

        {selectedDispatches.length === 0 ? (
          <p style={{ margin: 0, fontSize: 12, color: 'var(--subtle)' }}>
            No orders reached a dispatch stage on this day.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {selectedDispatches.map((d, idx) => (
              <Link
                key={d.id}
                href={`/orders/${d.id}`}
                style={{
                  fontSize: 12,
                  color: 'var(--ink)',
                  padding: '6px 0',
                  textDecoration: 'none',
                  display: 'block',
                  borderBottom: idx < selectedDispatches.length - 1 ? '1px solid rgba(38, 41, 46, 0.06)' : 'none',
                }}
              >
                <div style={{ fontWeight: 600, lineHeight: 1.2, color: 'var(--ink-heading)' }}>{d.customer_name}</div>
                <div style={{ fontSize: 10.5, color: 'var(--subtle)' }}>
                  {d.order_number} · {d.status.replace(/_/g, ' ')} · ₹{d.total_amount.toLocaleString('en-IN')}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
