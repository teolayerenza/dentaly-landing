/**
 * AnimatedGradient — Spell UI inspired
 * Dark mesh background with floating teal orbs for hero sections.
 */
import { cn } from '@/lib/utils';

interface AnimatedGradientProps {
  className?: string;
}

export function AnimatedGradient({ className }: AnimatedGradientProps) {
  return (
    <div
      aria-hidden
      className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}
    >
      {/* Base dark background */}
      <div className="absolute inset-0 bg-brand-bg" />

      {/* Orb 1 — top-left teal */}
      <div
        className="absolute -top-[20%] -left-[15%] w-[65%] h-[65%] rounded-full bg-brand-primary/[0.18] blur-[100px] animate-orb-1"
      />

      {/* Orb 2 — bottom-right secondary teal */}
      <div
        className="absolute -bottom-[20%] -right-[15%] w-[60%] h-[60%] rounded-full bg-brand-secondary/[0.14] blur-[100px] animate-orb-2"
      />

      {/* Orb 3 — center glow */}
      <div
        className="absolute top-1/2 left-1/2 w-[40%] h-[40%] rounded-full bg-brand-primary/[0.08] blur-[80px] animate-orb-3"
      />

      {/* Subtle dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Bottom fade to white for section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-bg via-brand-bg/60 to-transparent" />
    </div>
  );
}
