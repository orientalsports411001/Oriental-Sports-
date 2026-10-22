'use client';

import { useState } from 'react';

export function MiniCalendarWidget() {
  const [selectedDay, setSelectedDay] = useState<number>(23);

  // October 2026 calendar structure
  // Oct 1, 2026 is Thursday (Index 4: Su=0, Mo=1, Tu=2, We=3, Th=4, Fr=5, Sa=6)
  const startDayOffset = 4;
  const daysInMonth = 31;
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Event dots on specific dates
  const eventDays = [5, 12, 18, 20, 22, 23, 27];

  const calendarCells = [];
  // Empty leading cells
  for (let i = 0; i < startDayOffset; i++) {
    calendarCells.push(null);
  }
  // Month days
  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push(d);
  }

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: 24,
        padding: '24px',
        boxShadow: '0 8px 30px -4px rgba(17, 17, 17, 0.04)',
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
            October, 2026
          </div>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--subtle)', letterSpacing: '0.04em' }}>
            CAMP PUNE LOGISTICS
          </div>
        </div>

        {/* Prev / Next Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button
            type="button"
            aria-label="Previous Month"
            style={{
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
            }}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next Month"
            style={{
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
            }}
          >
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
        {daysOfWeek.map((dow, idx) => (
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

          const isSelected = day === selectedDay;
          const hasEvent = eventDays.includes(day);

          return (
            <button
              key={`day-${day}`}
              type="button"
              onClick={() => setSelectedDay(day)}
              style={{
                height: 32,
                borderRadius: '50%',
                border: 'none',
                background: isSelected ? 'var(--ink)' : 'transparent',
                color: isSelected ? '#FFFFFF' : 'var(--ink)',
                fontWeight: isSelected ? 900 : hasEvent ? 700 : 500,
                fontSize: 12,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
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
                    width: 3.5,
                    height: 3.5,
                    borderRadius: '50%',
                    background: 'var(--ink)',
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
          border: '1px solid rgba(17, 17, 17, 0.05)',
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
          <span style={{ fontSize: 11.5, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink)' }}>
            Dispatches on Oct {selectedDay}
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 800,
              padding: '2px 7px',
              borderRadius: 9999,
              background: 'var(--ink)',
              color: 'var(--ivory)',
            }}
          >
            2 Active
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div
            style={{
              fontSize: 12,
              color: 'var(--ink)',
              padding: '6px 0',
              borderBottom: '1px solid rgba(17,17,17,0.06)',
            }}
          >
            <div style={{ fontWeight: 800, lineHeight: 1.2 }}>Shivajinagar District Club</div>
            <div style={{ fontSize: 10.5, color: 'var(--subtle)' }}>OS-9281 · Acrylic Court System · ₹15,490</div>
          </div>

          <div
            style={{
              fontSize: 12,
              color: 'var(--ink)',
              paddingTop: 2,
            }}
          >
            <div style={{ fontWeight: 800, lineHeight: 1.2 }}>Kothrud Arena Academy</div>
            <div style={{ fontSize: 10.5, color: 'var(--subtle)' }}>OS-9282 · Li-Ning Windstorm · ₹6,349</div>
          </div>
        </div>
      </div>
    </div>
  );
}
