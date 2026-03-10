import { useEffect, useState } from 'react';
import { ArrowRight, ChevronRight, CreditCard, Star } from 'lucide-react';
import { AnimatedGradient } from '@/components/ui/animated-gradient';
import { ShimmerText } from '@/components/ui/shimmer-text';
import { BlurReveal } from '@/components/ui/blur-reveal';
import { FlowButton } from '@/components/ui/flow-button';
import screenshotDashboard from '@/assets/screenshots/dashboard.png';

interface HeroProps {
  onDemoClick: () => void;
}

/* Avatar initials + colors for social proof row */
const AVATARS = [
  { initial: 'M', bg: '#1A7A85' },
  { initial: 'F', bg: '#0D6B73' },
  { initial: 'J', bg: '#2B9EA5' },
  { initial: 'V', bg: '#005B7F' },
];

export function Hero({ onDemoClick }: HeroProps) {
  /* Use mounted state so hero animates on load without needing IntersectionObserver */
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(id);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16 md:pb-20">
      {/* ── Background ── */}
      <AnimatedGradient />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-center">

          {/* ── LEFT: Text ── */}
          <div className="flex flex-col items-start gap-5 lg:gap-6">

            {/* Badge */}
            <BlurReveal inView={mounted} delay={0}>
              <div className="inline-flex items-center gap-2 bg-white/[0.09] backdrop-blur-sm border border-white/[0.15] rounded-full px-4 py-1.5">
                <span className="text-[1rem] leading-none">🇦🇷</span>
                <span className="text-white/85 text-[0.8125rem] font-medium">
                  Hecho para clínicas argentinas
                </span>
              </div>
            </BlurReveal>

            {/* Headline */}
            <BlurReveal inView={mounted} delay={120}>
              <h1 className="font-display text-[2.6rem] sm:text-5xl lg:text-[3.4rem] xl:text-[3.75rem] font-extrabold text-white leading-[1.08] tracking-tight">
                El software dental que{' '}
                <br className="hidden sm:block" />
                <ShimmerText>tu clínica merece</ShimmerText>
              </h1>
            </BlurReveal>

            {/* Sub */}
            <BlurReveal inView={mounted} delay={250}>
              <p className="text-white/60 text-[1.0625rem] sm:text-lg leading-relaxed max-w-[520px]">
                Gestioná turnos, pacientes, finanzas e inventario desde cualquier
                dispositivo.{' '}
                <span className="text-white/90 font-medium">
                  Sin instalaciones, sin complicaciones.
                </span>
              </p>
            </BlurReveal>

            {/* CTAs */}
            <BlurReveal inView={mounted} delay={370}>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <FlowButton
                  variant="primary"
                  size="lg"
                  onClick={onDemoClick}
                  className="animate-pulse-glow group"
                >
                  Solicitar demo gratuita
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </FlowButton>
                <FlowButton
                  variant="ghost"
                  size="lg"
                  onClick={() => {
                    document.getElementById('precios')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group"
                >
                  <CreditCard className="w-4 h-4" />
                  Ver planes y precios
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </FlowButton>
              </div>
            </BlurReveal>

            {/* Social proof */}
            <BlurReveal inView={mounted} delay={490}>
              <div className="flex items-center gap-3 pt-1">
                <div className="flex -space-x-2">
                  {AVATARS.map(({ initial, bg }) => (
                    <div
                      key={initial}
                      className="w-8 h-8 rounded-full border-[2px] border-brand-bg flex items-center justify-center text-[0.65rem] font-bold text-white flex-shrink-0"
                      style={{ background: bg }}
                    >
                      {initial}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-brand-accent text-brand-accent" />
                    ))}
                  </div>
                  <span className="text-white/45 text-xs">+500 clínicas confían en Dentaly</span>
                </div>
              </div>
            </BlurReveal>
          </div>

          {/* ── RIGHT: Browser mockup (desktop only) ── */}
          <BlurReveal inView={mounted} delay={180} className="hidden lg:block">
            <div className="relative animate-float">
              {/* Glow halo */}
              <div className="absolute -inset-10 bg-brand-primary/[0.22] blur-3xl rounded-full -z-10" />
              <div className="absolute -inset-4 bg-brand-secondary/[0.1] blur-2xl rounded-2xl -z-10" />

              {/* Browser chrome */}
              <div className="bg-[#111B27] rounded-2xl overflow-hidden border border-white/[0.09] shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
                {/* Title bar */}
                <div className="flex items-center gap-3 px-4 py-3 bg-[#0A1420] border-b border-white/[0.05]">
                  <div className="flex gap-1.5">
                    <div className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]" />
                    <div className="w-[10px] h-[10px] rounded-full bg-[#FFBD2E]" />
                    <div className="w-[10px] h-[10px] rounded-full bg-[#28C840]" />
                  </div>
                  <div className="flex-1 mx-3">
                    <div className="bg-white/[0.06] rounded-lg px-3 py-1 text-[11px] text-white/30 text-center font-mono tracking-wide">
                      🔒 app.dentaly.com.ar
                    </div>
                  </div>
                  <div className="w-4" /> {/* spacer */}
                </div>

                {/* Screenshot */}
                <img
                  src={screenshotDashboard}
                  alt="Panel de control de Dentaly — software odontológico"
                  className="w-full block"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
            </div>
          </BlurReveal>
        </div>

        {/* ── Mobile mockup (below text) ── */}
        <BlurReveal inView={mounted} delay={550} className="lg:hidden mt-10">
          <div className="relative max-w-lg mx-auto">
            <div className="absolute -inset-6 bg-brand-primary/[0.18] blur-2xl rounded-3xl -z-10" />
            <div className="bg-[#111B27] rounded-xl overflow-hidden border border-white/[0.09] shadow-2xl">
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-[#0A1420] border-b border-white/[0.05]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                </div>
                <div className="flex-1 mx-2">
                  <div className="bg-white/[0.06] rounded px-2 py-0.5 text-[10px] text-white/30 text-center font-mono">
                    🔒 app.dentaly.com.ar
                  </div>
                </div>
              </div>
              <img
                src={screenshotDashboard}
                alt="Panel de control de Dentaly"
                className="w-full block"
                loading="lazy"
              />
            </div>
          </div>
        </BlurReveal>
      </div>

      {/* ── Scroll hint ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-30">
        <div className="w-px h-7 bg-gradient-to-b from-transparent to-white" />
        <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" />
      </div>
    </section>
  );
}
