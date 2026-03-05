import { cn } from '@/lib/utils';

interface AnimatedNumberProps {
  /** The value to display. Changing it triggers the slot animation. */
  value: string | number;
  className?: string;
}

/**
 * AnimatedNumber — Spell UI
 *
 * Replaces the displayed value with a slot-machine style animation:
 * old number blurs + slides up while new number reveals from below.
 * Uses React's key trick: changing `value` unmounts + remounts the span,
 * restarting the CSS animation from scratch each time.
 */
export function AnimatedNumber({ value, className }: AnimatedNumberProps) {
  return (
    // overflow-hidden clips the translateY slide without affecting layout
    <span className="overflow-hidden inline-flex">
      <span
        key={value}
        className={cn('inline-block animate-price-in', className)}
      >
        {value}
      </span>
    </span>
  );
}
