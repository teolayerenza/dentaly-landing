/**
 * FlowButton — Spell UI inspired
 * Button with a shimmer flow on hover and optional pulse glow.
 */
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'ghost' | 'outline' | 'accent';
type Size = 'sm' | 'md' | 'lg';

interface FlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-brand-primary text-white hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/20',
  ghost:
    'bg-transparent text-white border border-white/20 hover:border-white/50 hover:bg-white/5',
  outline:
    'bg-transparent text-brand-primary border border-brand-primary/40 hover:border-brand-primary hover:bg-brand-primary/5',
  accent:
    'bg-brand-accent text-white hover:bg-brand-accent/90 shadow-lg shadow-brand-accent/20',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3.5 text-base gap-2',
};

export function FlowButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: FlowButtonProps) {
  return (
    <button
      className={cn(
        'relative overflow-hidden rounded-xl font-semibold',
        'inline-flex items-center justify-center',
        'transition-all duration-300',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50',
        'disabled:pointer-events-none disabled:opacity-50',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {/* Content */}
      <span className="relative z-10 flex items-center gap-[inherit]">{children}</span>

      {/* Shimmer flow overlay on hover */}
      <span
        aria-hidden
        className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)',
        }}
      />
    </button>
  );
}
