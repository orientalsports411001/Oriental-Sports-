import React, { useEffect, useState } from 'react';

/**
 * CustomCursor Component
 * 
 * Editorial cursor follower strictly enabled on desktop pointer devices only.
 * Morphing states:
 *   - default: precise 8px ink dot
 *   - pointer (links/buttons): expanding gold ring
 *   - add: pill with "ADD" badge
 *   - view: pill with "VIEW" badge
 * 
 * Disabled on touch screens (pointer: coarse) and prefers-reduced-motion.
 */
export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'add' | 'view'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || reducedMotion) {
      setIsTouchDevice(true);
      return;
    }

    setIsTouchDevice(false);

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const val = cursorTarget.getAttribute('data-cursor');
        if (val === 'add') {
          setCursorType('add');
          return;
        }
        if (val === 'view') {
          setCursorType('view');
          return;
        }
        if (val === 'pointer') {
          setCursorType('pointer');
          return;
        }
      }

      if (target.closest('a, button, [role="button"], input, select, textarea, .product-card, .spotlight-card')) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  const isBadge = cursorType === 'add' || cursorType === 'view';
  const isPointer = cursorType === 'pointer';

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        willChange: 'transform',
        transition: 'opacity 0.2s ease',
      }}
    >
      {/* Follower Badge / Dot */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: isBadge ? '56px' : isPointer ? '36px' : '9px',
          height: isBadge ? '24px' : isPointer ? '36px' : '9px',
          borderRadius: isBadge ? 'var(--radius-pill)' : '50%',
          backgroundColor: isBadge
            ? 'var(--color-brand-gold)'
            : isPointer
            ? 'transparent'
            : 'var(--color-ink)',
          border: isPointer
            ? '1.5px solid var(--color-brand-gold)'
            : 'none',
          color: 'var(--color-ink)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.625rem',
          fontWeight: 800,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          boxShadow: isBadge
            ? '0 4px 14px rgba(201, 162, 39, 0.4)'
            : 'none',
          transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, transform 0.1s ease-out',
        }}
      >
        {isBadge && (cursorType === 'add' ? 'ADD' : 'VIEW')}
      </div>
    </div>
  );
};

export default CustomCursor;
