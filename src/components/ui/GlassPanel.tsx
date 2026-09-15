import React from 'react';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'light' | 'dark' | 'ivory' | 'gold';
  blur?: 'sm' | 'md' | 'lg' | string;
  border?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  variant = 'light',
  blur = 'md',
  border = true,
  children,
  className = '',
  style = {},
  ...props
}) => {
  const blurVal =
    blur === 'sm'
      ? '12px'
      : blur === 'lg'
      ? '24px'
      : blur === 'md'
      ? '18px'
      : blur;

  const bgStyles = {
    light: 'rgba(255, 255, 255, 0.22)',
    dark: 'rgba(23, 24, 26, 0.75)',
    ivory: 'rgba(250, 247, 242, 0.85)',
    gold: 'rgba(201, 162, 39, 0.18)',
  };

  const borderStyles = {
    light: '1px solid rgba(255, 255, 255, 0.32)',
    dark: '1px solid rgba(255, 255, 255, 0.14)',
    ivory: '1px solid var(--color-border-subtle)',
    gold: '1px solid rgba(201, 162, 39, 0.45)',
  };

  return (
    <div
      className={`glass-panel ${className}`}
      style={{
        backgroundColor: bgStyles[variant],
        backdropFilter: `blur(${blurVal})`,
        WebkitBackdropFilter: `blur(${blurVal})`,
        border: border ? borderStyles[variant] : 'none',
        borderRadius: 'var(--radius-lg)',
        boxShadow:
          variant === 'dark'
            ? '0 20px 48px -12px rgba(0, 0, 0, 0.35)'
            : '0 16px 36px -8px rgba(17, 17, 17, 0.12)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
