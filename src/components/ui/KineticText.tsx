import React from 'react';
import { motion, Variants } from 'framer-motion';

interface KineticTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
  highlightWord?: string;
  highlightClass?: string;
  style?: React.CSSProperties;
}

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  className = '',
  delay = 0,
  as = 'h1',
  highlightWord,
  highlightClass = 'text-gold',
  style = {},
}) => {
  const words = text.split(' ');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      y: '105%',
      opacity: 0,
      rotateX: -20,
    },
    visible: {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 140,
      },
    },
  };

  const Component = motion[as];

  return (
    <Component
      className={className}
      style={{
        ...style,
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
        lineHeight: 0.95,
      }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      {words.map((word, i) => {
        const isHighlight =
          highlightWord &&
          word.toLowerCase().replace(/[^a-z]/g, '') ===
            highlightWord.toLowerCase().replace(/[^a-z]/g, '');

        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              verticalAlign: 'top',
              marginRight: '0.22em',
            }}
          >
            <motion.span
              variants={wordVariants}
              style={{
                display: 'inline-block',
                willChange: 'transform, opacity',
              }}
              className={isHighlight ? highlightClass : ''}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </Component>
  );
};
