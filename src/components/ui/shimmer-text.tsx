/**
 * ShimmerText — Spell UI inspired
 * Text with an animated shimmer sweep. Uses background-clip: text.
 */
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ShimmerTextProps {
  children: ReactNode;
  className?: string;
  /** Color stop at the shimmer peak (default: white) */
  peakColor?: string;
}

export function ShimmerText({ children, className, peakColor = '#ffffff' }: ShimmerTextProps) {
  return (
    <span
      className={cn('animate-shimmer-text', className)}
      style={
        peakColor !== '#ffffff'
          ? {
              backgroundImage: `linear-gradient(
                110deg,
                #4DA0A0 0%,
                #4DA0A0 35%,
                ${peakColor} 50%,
                #4DA0A0 65%,
                #4DA0A0 100%
              )`,
              backgroundSize: '250% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'shimmer 4s linear infinite',
            }
          : undefined
      }
    >
      {children}
    </span>
  );
}
