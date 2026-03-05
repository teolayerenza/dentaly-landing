/**
 * BlurReveal — Spell UI inspired
 * Content animates from blurred/offset to clear when inView is true.
 */
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BlurRevealProps {
  children: ReactNode;
  className?: string;
  /** Whether the element is visible (from useInView or mounted state) */
  inView?: boolean;
  /** Delay in ms before the animation starts */
  delay?: number;
  /** Animation duration in ms */
  duration?: number;
}

export function BlurReveal({
  children,
  className,
  inView = false,
  delay = 0,
  duration = 650,
}: BlurRevealProps) {
  return (
    <div
      className={cn(
        'transition-[opacity,transform,filter]',
        inView ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-5 blur-sm',
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {children}
    </div>
  );
}
