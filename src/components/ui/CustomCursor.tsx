import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<'default' | 'view' | 'add' | 'explore' | 'pointer'>('default');
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Detect cursor context from data attribute or element type
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor') as any;
        const text = cursorTarget.getAttribute('data-cursor-text') || '';
        setCursorState(type || 'pointer');
        setCursorText(text);
        return;
      }

      if (target.closest('button, a, input, select, [role="button"]')) {
        setCursorState('pointer');
        setCursorText('');
        return;
      }

      setCursorState('default');
      setCursorText('');
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const isExpanded = cursorState === 'view' || cursorState === 'add' || cursorState === 'explore';
  const size = isExpanded ? 72 : cursorState === 'pointer' ? 36 : 10;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 99999,
        transform: `translate3d(${pos.x - size / 2}px, ${pos.y - size / 2}px, 0)`,
        transition: 'width 0.22s ease-out, height 0.22s ease-out, background-color 0.2s ease, border-color 0.2s ease, transform 0.04s linear',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:
          cursorState === 'add'
            ? 'var(--color-electric-blue)'
            : cursorState === 'explore'
            ? 'var(--color-safety-orange)'
            : cursorState === 'view'
            ? 'rgba(17, 17, 17, 0.88)'
            : cursorState === 'pointer'
            ? 'rgba(201, 162, 39, 0.18)'
            : 'var(--color-ink)',
        border:
          cursorState === 'pointer'
            ? '1.5px solid var(--color-plate-gold)'
            : isExpanded
            ? '1px solid rgba(255, 255, 255, 0.3)'
            : 'none',
        backdropFilter: isExpanded ? 'blur(8px)' : 'none',
        boxShadow: isExpanded ? '0 12px 28px rgba(0,0,0,0.22)' : 'none',
      }}
    >
      {isExpanded && (
        <span
          style={{
            color: '#FFFFFF',
            fontSize: '0.625rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textAlign: 'center',
            lineHeight: 1.1,
            padding: '4px',
            userSelect: 'none',
          }}
        >
          {cursorText || (cursorState === 'view' ? 'VIEW →' : cursorState === 'add' ? 'ADD +' : 'EXPLORE')}
        </span>
      )}
    </div>
  );
};
