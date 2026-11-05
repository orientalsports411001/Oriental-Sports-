import React from 'react';
import { Check } from 'lucide-react';
import { TrackingStep } from '../../types/auth';

interface OrderStatusStepperProps {
  timeline: TrackingStep[];
  /** Hide each step's description line for a tighter, more minimal stepper. */
  compact?: boolean;
}

/** Clean vertical order-status stepper: check circle + title + date per stage, shared by OrderTracker, OrderSuccessPage and the single-order track view. */
export const OrderStatusStepper: React.FC<OrderStatusStepperProps> = ({ timeline, compact = false }) => {
  return (
    <div style={{ position: 'relative', paddingLeft: '32px' }}>
      <div
        style={{
          position: 'absolute',
          left: '11px',
          top: '10px',
          bottom: '14px',
          width: '2px',
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
        }}
      />

      {timeline.map((step, idx) => {
        const isPast = step.completed;
        const isCurr = step.current;

        return (
          <div
            key={idx}
            style={{
              position: 'relative',
              marginBottom: idx === timeline.length - 1 ? 0 : compact ? '20px' : '24px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: '-32px',
                top: '1px',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: isCurr ? '#C8102E' : isPast ? '#10B981' : 'transparent',
                border: isCurr ? '2px solid #FFFFFF' : isPast ? 'none' : '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: isCurr ? '0 0 0 3px rgba(200, 16, 46, 0.3)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                zIndex: 2,
              }}
            >
              {isPast && <Check size={14} strokeWidth={3} />}
            </div>

            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  color: isPast || isCurr ? '#FFFFFF' : '#6B7280',
                }}
              >
                {step.title}
              </div>
              <div style={{ fontSize: '0.75rem', color: isPast || isCurr ? '#9CA3AF' : '#52525B', marginTop: '2px' }}>
                {step.date}
              </div>
              {!compact && step.description && (
                <p style={{ margin: '4px 0 0 0', fontSize: '0.8125rem', color: '#A3A3A3', lineHeight: 1.4 }}>
                  {step.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
