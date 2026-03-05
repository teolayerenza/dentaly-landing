import {
  CalendarDays,
  Users,
  TrendingUp,
  Package,
  Stethoscope,
  Building2,
} from 'lucide-react';
import { BlurReveal } from '@/components/ui/blur-reveal';
import { HighlightedText } from '@/components/ui/highlighted-text';
import { useInView } from '@/hooks/useInView';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: string;
  span?: 'normal' | 'wide';
}

const FEATURES: Feature[] = [
  {
    icon: <CalendarDays className="w-6 h-6" />,
    title: 'Agenda Inteligente',
    description:
      'Vista diaria y semanal de turnos. Agendá, reprogramá y cancelá en segundos. Con estados: Programado, En curso, Completado y Cancelado.',
    accent: '#005B7F',
    span: 'wide',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Fichas de Pacientes',
    description:
      'Historial clínico completo: datos generales, antecedentes, obra social, historial de citas y finanzas individuales por paciente.',
    accent: '#4DA0A0',
  },
  {
    icon: <Stethoscope className="w-6 h-6" />,
    title: 'Odontograma Digital',
    description:
      'Registrá el estado de cada pieza dental de forma visual e interactiva. Soporte para dentición permanente y temporaria.',
    accent: '#0A8FA8',
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Finanzas Integradas',
    description:
      'Controlá ingresos, egresos y balance diario. Reportes por profesional con gráficos en tiempo real.',
    accent: '#005B7F',
    span: 'wide',
  },
  {
    icon: <Package className="w-6 h-6" />,
    title: 'Control de Inventario',
    description:
      'Gestioná tu stock de insumos. Alertas de reposición cuando el stock cae por debajo del mínimo configurado.',
    accent: '#4DA0A0',
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: 'Multi-Profesional',
    description:
      'Gestioná múltiples odontólogos con sus especialidades y matrículas. Obras sociales y tratamientos configurables.',
    accent: '#0A8FA8',
  },
];

export function Features() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section id="funciones" className="section-pad bg-brand-light">
      <div ref={ref} className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <BlurReveal inView={inView} delay={0} className="text-center mb-14">
          <span className="inline-block text-brand-primary text-sm font-semibold uppercase tracking-widest mb-3">
            Funciones
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-gray-900 leading-tight">
            Todo lo que tu clínica necesita,{' '}
            <HighlightedText highlightClass="bg-brand-primary/10">
              en un solo lugar
            </HighlightedText>
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
            Sin módulos de pago adicionales, sin instalaciones complicadas. Todo incluido.
          </p>
        </BlurReveal>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <BlurReveal
              key={feature.title}
              inView={inView}
              delay={120 + i * 80}
              className={feature.span === 'wide' ? 'sm:col-span-2 lg:col-span-1' : ''}
            >
              <FeatureCard feature={feature} />
            </BlurReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-brand-primary/20 hover:shadow-lg hover:shadow-brand-primary/5 transition-all duration-300 overflow-hidden h-full">
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${feature.accent}, transparent)`,
        }}
      />

      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105"
        style={{ background: `${feature.accent}18`, color: feature.accent }}
      >
        {feature.icon}
      </div>

      <h3 className="font-display font-bold text-gray-900 text-[1.0625rem] mb-2">
        {feature.title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
    </div>
  );
}
