import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

// Must match the durations in tailwind.config.ts
const EXIT_MS  = 180;
const ENTER_MS = 280;

interface AnimatedTextProps {
  /** The text to display. Changing it triggers exit → enter animation. */
  value: string;
  className?: string;
}

/**
 * AnimatedText — Spell UI
 *
 * Transitions between two text values with a roll-up + blur effect.
 *   Exit  → current text slides up + blurs to invisible  (180ms ease-in)
 *   Enter → new text rises from below, blur to clear      (280ms ease-out)
 *
 * Uses setTimeout (not onAnimationEnd) for reliability:
 * the transition timing is always deterministic regardless of CSS load order.
 */
export function AnimatedText({ value, className }: AnimatedTextProps) {
  const [displayed, setDisplayed] = useState(value);
  const [phase, setPhase]         = useState<'idle' | 'exit' | 'enter'>('idle');
  const timerRef                  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender             = useRef(true);

  useEffect(() => {
    // Don't animate on initial mount — just show the value
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Cancel any in-progress transition before starting a new one
    if (timerRef.current) clearTimeout(timerRef.current);

    // Phase 1 — exit: current text blurs upward out
    setPhase('exit');

    // Phase 2 — after exit completes: swap text + enter
    timerRef.current = setTimeout(() => {
      setDisplayed(value);
      setPhase('enter');

      // Phase 3 — after enter completes: back to idle
      timerRef.current = setTimeout(() => {
        setPhase('idle');
      }, ENTER_MS);
    }, EXIT_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span
      className={cn(
        'inline-block',
        phase === 'exit'  && 'animate-text-out',
        phase === 'enter' && 'animate-text-in',
        className,
      )}
    >
      {displayed}
    </span>
  );
}
