/**
 * TextMarquee — Spell UI inspired
 * Continuous horizontal marquee for stats, logos, or trust signals.
 */
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TextMarqueeProps {
  items: ReactNode[];
  /** Duration in seconds for one full loop (default: 28) */
  duration?: number;
  /** Reverse direction */
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
}

export function TextMarquee({
  items,
  duration = 28,
  reverse = false,
  className,
  itemClassName,
}: TextMarqueeProps) {
  const track = (
    <div
      className={cn(
        'flex shrink-0 items-center gap-8',
        reverse ? 'animate-marquee [animation-direction:reverse]' : 'animate-marquee'
      )}
      style={{ animationDuration: `${duration}s` }}
      aria-hidden
    >
      {items.map((item, i) => (
        <span
          key={i}
          className={cn('whitespace-nowrap flex items-center gap-2', itemClassName)}
        >
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn('flex overflow-hidden gap-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]', className)}
    >
      {track}
      {/* Duplicate for seamless loop */}
      {track}
    </div>
  );
}
