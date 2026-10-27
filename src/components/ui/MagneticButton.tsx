import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  as?: any;
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
}

/**
 * MagneticButton — Motion Primitives inspired spring physics button.
 * Subtle cursor attraction on desktop with restrained displacement,
 * maintaining high accessibility and zero layout shift.
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 16,
  className = '',
  as,
  ...props
}) => {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rectRef = useRef<DOMRect | null>(null);

  const springConfig = { stiffness: 220, damping: 18, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseEnter = () => {
    if (ref.current) rectRef.current = ref.current.getBoundingClientRect();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches)) return;
    if (!ref.current) return;
    if (!rectRef.current) rectRef.current = ref.current.getBoundingClientRect();
    const { clientX, clientY } = e;
    const { left, top, width, height } = rectRef.current;
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    x.set((distanceX / width) * strength);
    y.set((distanceY / height) * strength);
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    x.set(0);
    y.set(0);
  };

  const Component = as || 'button';

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-block', position: 'relative' }}
    >
      <motion.div style={{ x: springX, y: springY }}>
        <Component className={className} {...props}>
          {children}
        </Component>
      </motion.div>
    </div>
  );
};

export default MagneticButton;
