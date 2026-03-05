import { useState } from 'react';
import { BlurReveal } from '@/components/ui/blur-reveal';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

import screenshotDashboard from '@/assets/screenshots/dashboard.png';
import screenshotAgenda from '@/assets/screenshots/agenda.png';
import screenshotPacientes from '@/assets/screenshots/pacientes.png';
import screenshotFinanzas from '@/assets/screenshots/finanzas.png';
import screenshotOdontograma from '@/assets/screenshots/odontograma.png';
import screenshotFichaPaciente from '@/assets/screenshots/ficha-paciente.png';

interface Tab {
  id: string;
  label: string;
  emoji: string;
  description: string;
  image: string;
  imageAlt: string;
}

const TABS: Tab[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    emoji: '🏠',
    description:
      'Resumen diario: turnos del día, próxima cita, ingresos y pacientes totales de un vistazo. Más los recordatorios de stock bajo.',
    image: screenshotDashboard,
    imageAlt: 'Panel de control principal de Dentaly',
  },
  {
    id: 'agenda',
    label: 'Agenda',
    emoji: '📅',
    description:
      'Vista cronológica de los turnos del día. Navegá por días, cambiá estados con un clic y agendá nuevas citas al instante.',
    image: screenshotAgenda,
    imageAlt: 'Agenda de turnos de Dentaly',
  },
  {
    id: 'pacientes',
    label: 'Pacientes',
    emoji: '👥',
    description:
      'Listado completo con búsqueda instantánea por nombre, DNI o email. Accedé a la ficha clínica completa en un clic.',
    image: screenshotPacientes,
    imageAlt: 'Lista de pacientes en Dentaly',
  },
  {
    id: 'finanzas',
    label: 'Finanzas',
    emoji: '💰',
    description:
      'Ingresos, egresos y balance neto con gráficos por profesional. Tomá decisiones basadas en datos reales de tu clínica.',
    image: screenshotFinanzas,
    imageAlt: 'Módulo de finanzas de Dentaly',
  },
  {
    id: 'odontograma',
    label: 'Odontograma',
    emoji: '🦷',
    description:
      'Odontograma digital interactivo por paciente. Registrá el estado de cada pieza dental. Dentición permanente y temporaria.',
    image: screenshotOdontograma,
    imageAlt: 'Odontograma digital interactivo de Dentaly',
  },
  {
    id: 'ficha',
    label: 'Ficha Paciente',
    emoji: '📋',
    description:
      'Ficha clínica completa por paciente: datos generales, obra social, antecedentes, grupo sanguíneo y contacto de emergencia. Todo en un solo lugar.',
    image: screenshotFichaPaciente,
    imageAlt: 'Ficha de paciente completa en Dentaly',
  },
];

export function Showcase() {
  const { ref, inView } = useInView<HTMLDivElement>(0.08);
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  const active = TABS.find((t) => t.id === activeTab) ?? TABS[0];

  return (
    <section className="section-pad bg-brand-light">
      <div ref={ref} className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <BlurReveal inView={inView} delay={0} className="text-center mb-12">
          <span className="inline-block text-brand-primary text-sm font-semibold uppercase tracking-widest mb-3">
            El producto
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-gray-900 leading-tight">
            Una interfaz pensada para{' '}
            <span className="text-brand-primary">el día a día</span>
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
            Limpia, rápida y sin curva de aprendizaje. Mirá cómo funciona en la práctica.
          </p>
        </BlurReveal>

        {/* Tab bar */}
        <BlurReveal inView={inView} delay={100}>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                  tab.id === activeTab
                    ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-primary/30 hover:text-brand-primary'
                )}
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </BlurReveal>

        {/* Tab description */}
        <BlurReveal inView={inView} delay={150} className="text-center mb-6">
          <p className="text-gray-500 text-base max-w-lg mx-auto transition-all duration-300">
            {active.description}
          </p>
        </BlurReveal>

        {/* Browser mockup */}
        <BlurReveal inView={inView} delay={200}>
          <div className="relative max-w-5xl mx-auto">
            {/* Glow */}
            <div className="absolute -inset-6 bg-brand-primary/10 blur-3xl rounded-3xl -z-10" />

            <div className="bg-[#111B27] rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_24px_64px_rgba(0,0,0,0.18)]">
              {/* Chrome bar */}
              <div className="flex items-center gap-3 px-4 py-3 bg-[#0A1420] border-b border-white/[0.05]">
                <div className="flex gap-1.5">
                  <div className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]" />
                  <div className="w-[10px] h-[10px] rounded-full bg-[#FFBD2E]" />
                  <div className="w-[10px] h-[10px] rounded-full bg-[#28C840]" />
                </div>
                <div className="flex-1 mx-3">
                  <div className="bg-white/[0.06] rounded-md px-3 py-1 text-[11px] text-white/30 text-center font-mono">
                    🔒 app.dentaly.com.ar
                  </div>
                </div>
              </div>

              {/* Screenshot — key forces re-render on tab change */}
              <img
                key={active.id}
                src={active.image}
                alt={active.imageAlt}
                className="w-full block transition-opacity duration-300"
                loading="lazy"
              />
            </div>
          </div>
        </BlurReveal>
      </div>
    </section>
  );
}
