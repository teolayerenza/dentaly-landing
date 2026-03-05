import { ArrowRight } from 'lucide-react';
import { LightRays } from '@/components/ui/light-rays';
import { BlurReveal } from '@/components/ui/blur-reveal';
import { FlowButton } from '@/components/ui/flow-button';
import { useInView } from '@/hooks/useInView';

interface FinalCTAProps {
  onDemoClick: () => void;
}

export function FinalCTA({ onDemoClick }: FinalCTAProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <section className="relative overflow-hidden bg-brand-bg py-24 lg:py-32">
      {/* Light rays background */}
      <LightRays />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center">

        <BlurReveal inView={inView} delay={0}>
          <span className="inline-flex items-center gap-2 bg-white/[0.08] border border-white/[0.12] rounded-full px-4 py-1.5 text-white/70 text-sm mb-6">
            <span className="text-base">🚀</span>
            Sin tarjeta de crédito requerida
          </span>
        </BlurReveal>

        <BlurReveal inView={inView} delay={100}>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.1] tracking-tight mb-5">
            ¿Listo para modernizar
            <br className="hidden sm:block" />
            <span className="text-brand-secondary"> tu clínica?</span>
          </h2>
        </BlurReveal>

        <BlurReveal inView={inView} delay={200}>
          <p className="text-white/55 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            Unite a las clínicas argentinas que ya trabajan de manera inteligente.
            Empezá gratis hoy, sin compromisos.
          </p>
        </BlurReveal>

        <BlurReveal inView={inView} delay={300}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              onClick={() =>
                window.open('https://app.dentaly.com.ar', '_blank', 'noopener')
              }
            >
              Empezar gratis ahora
            </FlowButton>
          </div>
        </BlurReveal>

        <BlurReveal inView={inView} delay={420}>
          <p className="mt-8 text-white/30 text-sm">
            Más de 500 clínicas confían en Dentaly ·{' '}
            <span className="text-brand-accent">⭐ 4.9/5</span> de satisfacción
          </p>
        </BlurReveal>
      </div>
    </section>
  );
}
