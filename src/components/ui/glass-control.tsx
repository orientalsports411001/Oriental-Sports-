import React from 'react';

interface GlassControlProps {
  children: React.ReactNode;
  variant?: 'dark' | 'light';
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  role?: string;
  ariaLabel?: string;
}

export const GlassControl: React.FC<GlassControlProps> = ({
  children,
  variant = 'dark',
  className = '',
  style = {},
  onClick,
  role,
  ariaLabel,
}) => {
  const isDark = variant === 'dark';

  return (
    <div
      onClick={onClick}
      role={role}
      aria-label={ariaLabel}
      className={`glass-control ${className}`}
      style={{
        backgroundColor: isDark ? 'rgba(12, 14, 18, 0.82)' : 'rgba(246, 243, 234, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(17, 17, 17, 0.14)',
        boxShadow: isDark
          ? '0 12px 32px -8px rgba(0, 0, 0, 0.5)'
          : '0 8px 24px -6px rgba(17, 17, 17, 0.08)',
        borderRadius: 'var(--radius-sm)',
        color: isDark ? '#FFFFFF' : 'var(--color-ink)',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default GlassControl;
