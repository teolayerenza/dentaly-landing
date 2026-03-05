/**
 * WordsStagger — Spell UI inspired
 * Each word fades + slides into view with a configurable stagger delay.
 */
import { cn } from '@/lib/utils';

interface WordsStaggerProps {
  text: string;
  className?: string;
  wordClassName?: string;
  inView?: boolean;
  delayStart?: number;
  staggerMs?: number;
  duration?: number;
}

export function WordsStagger({
  text,
  className,
  wordClassName,
  inView = false,
  delayStart = 0,
  staggerMs = 70,
  duration = 500,
}: WordsStaggerProps) {
  const words = text.split(' ');

  return (
    <span className={cn('inline', className)}>
      {words.map((word, i) => (
        <span
          key={i}
          className={cn(
            'inline-block transition-[opacity,transform,filter]',
            inView
              ? 'opacity-100 translate-y-0 blur-0'
              : 'opacity-0 translate-y-3 blur-[3px]',
            wordClassName
          )}
          style={{
            transitionDuration: `${duration}ms`,
            transitionDelay: `${delayStart + i * staggerMs}ms`,
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {word}
          {i < words.length - 1 ? '\u00a0' : ''}
        </span>
      ))}
    </span>
  );
}
