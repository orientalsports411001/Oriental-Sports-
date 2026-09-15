import React, { useRef, useState } from 'react';

export interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-dark' | 'outline-white' | 'gold' | string;
  size?: 'sm' | 'md' | 'lg' | string;
  dataCursor?: string;
  ariaLabel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 14,
  className = '',
  style = {},
  variant,
  size = 'md',
  dataCursor = 'pointer',
  ariaLabel,
  onClick,
  ...props
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(pointer: coarse)').matches) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    }

    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    setOffset({ x: deltaX * strength, y: deltaY * strength });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  // Base variant styling mapped strictly to tokens
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--color-ink)',
          color: '#FFFFFF',
          border: '1.5px solid var(--color-ink)',
        };
      case 'gold':
        return {
          backgroundColor: 'var(--color-brand-gold)',
          color: 'var(--color-ink)',
          border: '1.5px solid var(--color-brand-gold)',
        };
      case 'outline':
      case 'outline-dark':
        return {
          backgroundColor: 'transparent',
          color: 'var(--color-ink)',
          border: '1.5px solid var(--color-ink)',
        };
      case 'outline-white':
        return {
          backgroundColor: 'transparent',
          color: '#FFFFFF',
          border: '1.5px solid rgba(255, 255, 255, 0.4)',
        };
      case 'secondary':
        return {
          backgroundColor: 'var(--color-canvas-surface)',
          color: 'var(--color-ink)',
          border: '1.5px solid var(--color-border-medium)',
        };
      default:
        return {};
    }
  };

  const getSizeStyles = (): React.CSSProperties => {
    switch (size) {
      case 'sm':
        return { padding: '8px 18px', fontSize: '0.75rem' };
      case 'lg':
        return { padding: '16px 36px', fontSize: '0.9375rem' };
      case 'md':
      default:
        return { padding: '12px 26px', fontSize: '0.8125rem' };
    }
  };

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`magnetic-btn ${className}`}
      data-cursor={dataCursor}
      aria-label={ariaLabel}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        minHeight: '44px',
        borderRadius: 'var(--radius-none)',
        willChange: 'transform',
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: offset.x === 0 ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, border-color 0.2s ease' : 'transform 0.08s linear',
        ...getVariantStyles(),
        ...getSizeStyles(),
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default MagneticButton;
