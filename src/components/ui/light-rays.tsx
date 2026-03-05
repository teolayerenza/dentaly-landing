/**
 * LightRays — Spell UI inspired
 * Decorative light rays emanating from the top using conic gradients.
 * Best used as an absolute backdrop in CTA sections.
 */
import { cn } from '@/lib/utils';

interface LightRaysProps {
  className?: string;
}

export function LightRays({ className }: LightRaysProps) {
  return (
    <div
      aria-hidden
      className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}
    >
      {/* Primary ray burst */}
      <div
        className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[180%] h-[120%] opacity-[0.12] animate-spin-very-slow"
        style={{
          background: `conic-gradient(
            from 0deg at 50% 0%,
            transparent 0deg,
            rgba(77,160,160,0.9) 8deg,
            transparent 16deg,
            transparent 36deg,
            rgba(0,91,127,0.7) 44deg,
            transparent 52deg,
            transparent 76deg,
            rgba(77,160,160,0.6) 84deg,
            transparent 92deg,
            transparent 120deg,
            rgba(0,91,127,0.5) 128deg,
            transparent 136deg,
            transparent 164deg,
            rgba(77,160,160,0.4) 172deg,
            transparent 180deg,
            transparent 360deg
          )`,
        }}
      />

      {/* Secondary ray burst (counter-rotation for depth) */}
      <div
        className="absolute -top-[5%] left-1/2 -translate-x-1/2 w-[150%] h-[100%] opacity-[0.07]"
        style={{
          background: `conic-gradient(
            from 30deg at 50% 0%,
            transparent 0deg,
            rgba(245,166,35,0.8) 6deg,
            transparent 12deg,
            transparent 60deg,
            rgba(245,166,35,0.5) 66deg,
            transparent 72deg,
            transparent 360deg
          )`,
          animation: 'spin-very-slow 60s linear infinite reverse',
        }}
      />

      {/* Center glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-[40%] bg-brand-primary/15 blur-3xl rounded-b-full" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-brand-bg to-transparent" />
    </div>
  );
}
