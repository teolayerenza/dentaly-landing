import { useState } from 'react';
import { Check, X, Zap } from 'lucide-react';
import { BlurReveal } from '@/components/ui/blur-reveal';
import { FlowButton } from '@/components/ui/flow-button';
import { AnimatedNumber } from '@/components/ui/animated-number';
import { AnimatedText } from '@/components/ui/animated-text';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  monthlyPrice: number | null;   // null = gratis
  annualMonthlyPrice: number | null;
  description: string;
  cta: string;
  ctaVariant: 'primary' | 'outline';
  highlighted: boolean;
  features: { text: string; included: boolean }[];
}

const PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    monthlyPrice: null,
    annualMonthlyPrice: null,
    description: 'Para probar Dentaly sin compromiso. Gratis para siempre.',
    cta: 'Empezar gratis',
    ctaVariant: 'outline',
    highlighted: false,
    features: [
      { text: '1 profesional', included: true },
      { text: 'Hasta 30 pacientes', included: true },
      { text: 'Agenda de turnos', included: true },
      { text: 'Fichas de pacientes', included: true },
      { text: 'Odontograma digital', included: true },
      { text: 'Finanzas básicas', included: true },
      { text: 'Profesionales ilimitados', included: false },
      { text: 'Control de inventario', included: false },
      { text: 'Reportes avanzados', included: false },
      { text: 'Soporte prioritario', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    badge: 'Más popular',
    monthlyPrice: 24000,
    annualMonthlyPrice: 20000,
    description: 'Para clínicas que quieren crecer sin límites.',
    cta: 'Solicitar demo',
    ctaVariant: 'primary',
    highlighted: true,
    features: [
      { text: 'Profesionales ilimitados', included: true },
      { text: 'Pacientes ilimitados', included: true },
      { text: 'Agenda completa', included: true },
      { text: 'Fichas de pacientes completas', included: true },
      { text: 'Odontograma digital completo', included: true },
      { text: 'Finanzas + reportes avanzados', included: true },
      { text: 'Control de inventario', included: true },
      { text: 'Obras sociales y tratamientos config.', included: true },
      { text: 'Acceso multi-dispositivo', included: true },
      { text: 'Soporte prioritario por WhatsApp', included: true },
    ],
  },
];

interface PricingProps {
  onDemoClick: () => void;
}

export function Pricing({ onDemoClick }: PricingProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);
  const [annual, setAnnual] = useState(true);

  return (
    <section id="precios" className="section-pad bg-brand-light">
      <div ref={ref} className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <BlurReveal inView={inView} delay={0} className="text-center mb-12">
          <span className="inline-block text-brand-primary text-sm font-semibold uppercase tracking-widest mb-3">
            Precios
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-gray-900 leading-tight">
            Simple y transparente
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-lg mx-auto">
            Sin sorpresas. Elegí el plan que mejor se adapte a tu clínica.
          </p>

          {/* Billing toggle */}
          <div className="mt-8 inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full p-1">
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                !annual ? 'bg-brand-primary text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
              )}
            >
              Mensual
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5',
                annual ? 'bg-brand-primary text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
              )}
            >
              Anual
              <span className="text-[10px] bg-brand-accent/20 text-brand-accent font-bold px-1.5 py-0.5 rounded-full">
                2 meses gratis
              </span>
            </button>
          </div>
        </BlurReveal>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {PLANS.map((plan, i) => (
            <BlurReveal key={plan.id} inView={inView} delay={150 + i * 100}>
              <PlanCard
                plan={plan}
                annual={annual}
                onDemoClick={onDemoClick}
              />
            </BlurReveal>
          ))}
        </div>

        {/* Bottom note */}
        <BlurReveal inView={inView} delay={400} className="mt-10 text-center">
          <p className="text-gray-400 text-sm">
            Precios en pesos argentinos (ARS). Sin permanencia mínima.{' '}
            <span className="text-gray-600 font-medium">Cancelás cuando quieras.</span>
          </p>
        </BlurReveal>
      </div>
    </section>
  );
}

function PlanCard({
  plan,
  annual,
  onDemoClick,
}: {
  plan: PricingPlan;
  annual: boolean;
  onDemoClick: () => void;
}) {
  const displayPrice = plan.monthlyPrice === null
    ? null
    : annual
    ? plan.annualMonthlyPrice
    : plan.monthlyPrice;

  const handleCTA = () => {
    if (plan.id === 'free') {
      window.open('https://app.dentaly.com.ar', '_blank', 'noopener');
    } else {
      onDemoClick();
    }
  };

  return (
    <div
      className={cn(
        'relative rounded-2xl p-7 flex flex-col gap-6 h-full transition-all duration-300',
        plan.highlighted
          ? 'bg-brand-primary text-white shadow-2xl shadow-brand-primary/30 scale-[1.02]'
          : 'bg-white border border-gray-200 hover:border-brand-primary/30 hover:shadow-lg hover:shadow-brand-primary/5'
      )}
    >
      {/* Popular badge */}
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 bg-brand-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            <Zap className="w-3 h-3" /> {plan.badge}
          </span>
        </div>
      )}

      {/* Plan name + price */}
      <div>
        <h3
          className={cn(
            'font-display font-bold text-xl mb-1',
            plan.highlighted ? 'text-white' : 'text-gray-900'
          )}
        >
          {plan.name}
        </h3>

        <div className="flex items-end gap-1.5 my-3">
          {displayPrice === null ? (
            <>
              <span
                className={cn(
                  'font-display font-extrabold text-4xl',
                  plan.highlighted ? 'text-white' : 'text-gray-900'
                )}
              >
                Gratis
              </span>
              <span className={cn('text-sm mb-1.5', plan.highlighted ? 'text-white/60' : 'text-gray-400')}>
                para siempre
              </span>
            </>
          ) : (
            <>
              <span className={cn('text-sm font-medium mb-3', plan.highlighted ? 'text-white/60' : 'text-gray-400')}>
                $
              </span>
              <AnimatedNumber
                value={displayPrice.toLocaleString('es-AR')}
                className={cn(
                  'font-display font-extrabold text-4xl tabular-nums',
                  plan.highlighted ? 'text-white' : 'text-gray-900'
                )}
              />
              <span className={cn('text-sm mb-1.5', plan.highlighted ? 'text-white/60' : 'text-gray-400')}>
                ARS/mes
              </span>
            </>
          )}
        </div>

        {plan.monthlyPrice !== null && (
          <div className="overflow-hidden">
            <AnimatedText
              value={annual
                ? 'Facturado anualmente · $240.000/año'
                : 'Pagando anual ahorrás 2 meses'}
              className={cn('text-xs', plan.highlighted ? 'text-white/60' : 'text-gray-400')}
            />
          </div>
        )}

        <p className={cn('text-sm mt-2', plan.highlighted ? 'text-white/70' : 'text-gray-500')}>
          {plan.description}
        </p>
      </div>

      {/* CTA */}
      <FlowButton
        variant={plan.highlighted ? 'accent' : 'outline'}
        className="w-full justify-center"
        onClick={handleCTA}
      >
        {plan.cta}
      </FlowButton>

      {/* Feature list */}
      <ul className="flex flex-col gap-2.5">
        {plan.features.map(({ text, included }) => (
          <li key={text} className="flex items-start gap-2.5 text-sm">
            {included ? (
              <Check
                className={cn('w-4 h-4 mt-0.5 flex-shrink-0', plan.highlighted ? 'text-brand-accent' : 'text-brand-primary')}
              />
            ) : (
              <X
                className={cn('w-4 h-4 mt-0.5 flex-shrink-0', plan.highlighted ? 'text-white/30' : 'text-gray-300')}
              />
            )}
            <span
              className={cn(
                included
                  ? plan.highlighted ? 'text-white/90' : 'text-gray-700'
                  : plan.highlighted ? 'text-white/35' : 'text-gray-400'
              )}
            >
              {text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
