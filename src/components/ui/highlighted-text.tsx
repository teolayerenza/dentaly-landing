/**
 * HighlightedText — Spell UI inspired
 * Inline text with a semi-transparent background highlight.
 */
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface HighlightedTextProps {
  children: ReactNode;
  className?: string;
  /** Tailwind background color class (e.g. 'bg-brand-accent/20') */
  highlightClass?: string;
}

export function HighlightedText({
  children,
  className,
  highlightClass = 'bg-brand-accent/20',
}: HighlightedTextProps) {
  return (
    <span className={cn('relative inline-block', className)}>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className={cn(
          'absolute inset-x-[-3px] bottom-[1px] h-[45%] rounded-sm -z-0',
          highlightClass
        )}
      />
    </span>
  );
}
