import { UserPlus, Settings, Rocket } from 'lucide-react';
import { BlurReveal } from '@/components/ui/blur-reveal';
import { useInView } from '@/hooks/useInView';

const STEPS = [
  {
    number: '01',
    icon: <UserPlus className="w-6 h-6" />,
    title: 'Creá tu cuenta gratis',
    description:
      'Sin tarjeta de crédito. Ingresá con tu email y en menos de un minuto tenés acceso a tu clínica digital.',
  },
  {
    number: '02',
    icon: <Settings className="w-6 h-6" />,
    title: 'Configurá tu clínica',
    description:
      'Agregá tus profesionales, obras sociales, especialidades y tratamientos. Personalizable al 100% a tu flujo de trabajo.',
  },
  {
    number: '03',
    icon: <Rocket className="w-6 h-6" />,
    title: 'Empezá a gestionar',
    description:
      'Cargá pacientes, agendá turnos y controlá tus finanzas desde cualquier dispositivo. Sin curva de aprendizaje.',
  },
];

export function HowItWorks() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section id="como-funciona" className="section-pad bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <BlurReveal inView={inView} delay={0} className="text-center mb-14 lg:mb-20">
          <span className="inline-block text-brand-primary text-sm font-semibold uppercase tracking-widest mb-3">
            Cómo funciona
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-gray-900 leading-tight">
            Empezá a usar Dentaly
            <br />
            <span className="text-brand-primary">en minutos</span>
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-lg mx-auto">
            Tres pasos simples para transformar la gestión de tu clínica dental.
          </p>
        </BlurReveal>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-[42px] left-[calc(16.66%+40px)] right-[calc(16.66%+40px)] h-px bg-gradient-to-r from-brand-primary/20 via-brand-primary/60 to-brand-primary/20" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {STEPS.map((step, i) => (
              <BlurReveal key={step.number} inView={inView} delay={100 + i * 150}>
                <Step step={step} />
              </BlurReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({ step }: { step: (typeof STEPS)[0] }) {
  return (
    <div className="flex flex-col items-center text-center md:items-start md:text-left">
      {/* Step circle + number */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-brand-primary/[0.07] border border-brand-primary/20 flex items-center justify-center text-brand-primary">
          {step.icon}
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-primary text-white text-[10px] font-bold flex items-center justify-center shadow-md">
          {step.number.slice(-1)}
        </div>
      </div>

      <span className="text-brand-primary/50 text-xs font-bold tracking-widest mb-2">
        PASO {step.number}
      </span>
      <h3 className="font-display font-bold text-gray-900 text-xl mb-3">{step.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
    </div>
  );
}
