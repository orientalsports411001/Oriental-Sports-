import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  to?: string;
  variant?: 'gold' | 'primary' | 'outline-white' | 'outline-dark' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  style = {},
  type = 'button',
  disabled = false,
}) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device to avoid unnatural cursor magnetic pulls on phones
    if (typeof window !== 'undefined') {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouchDevice || !buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Pull factor: responsive, subtle (0.28x distance)
    const distanceX = (clientX - centerX) * 0.28;
    const distanceY = (clientY - centerY) * 0.28;
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Base class mapping
  const variantClasses = {
    gold: 'btn-gold',
    primary: 'btn-primary',
    'outline-white': 'btn-outline-white',
    'outline-dark': 'btn-outline-dark',
    ghost: 'btn-ghost',
  };

  const sizeClasses = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
  };

  const motionProps = isTouchDevice
    ? {}
    : {
        animate: { x: position.x, y: position.y },
        transition: { type: 'spring' as const, damping: 15, stiffness: 200, mass: 0.2 },
      };

  const combinedClass = `btn ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <motion.a
        ref={buttonRef as any}
        href={href}
        className={combinedClass}
        style={{ ...style, position: 'relative', overflow: 'hidden' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...motionProps}
      >
        {/* Subtle interior gold sheen on hover */}
        <span
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
            transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
            transition: 'transform 0.6s ease',
            pointerEvents: 'none',
          }}
        />
        <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          {children}
        </span>
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef as any}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClass}
      style={{ ...style, position: 'relative', overflow: 'hidden' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...motionProps}
    >
      <span
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
          transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
          transition: 'transform 0.6s ease',
          pointerEvents: 'none',
        }}
      />
      <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        {children}
      </span>
    </motion.button>
  );
};
