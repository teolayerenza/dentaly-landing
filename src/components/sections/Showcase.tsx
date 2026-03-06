import { useState, useRef, useEffect } from 'react';
import { BlurReveal } from '@/components/ui/blur-reveal';
import { AnimatedText } from '@/components/ui/animated-text';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

import screenshotDashboard    from '@/assets/screenshots/dashboard.png';
import screenshotAgenda       from '@/assets/screenshots/agenda.png';
import screenshotPacientes    from '@/assets/screenshots/pacientes.png';
import screenshotFinanzas     from '@/assets/screenshots/finanzas.png';
import screenshotOdontograma  from '@/assets/screenshots/odontograma.png';
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
      'Datos generales, obra social, antecedentes y contacto de emergencia. La historia clínica de cada paciente, siempre a mano.',
    image: screenshotFichaPaciente,
    imageAlt: 'Ficha de paciente completa en Dentaly',
  },
];

// Durations must match tailwind.config.ts animation durations
const EXIT_MS  = 180;
const ENTER_MS = 320;

export function Showcase() {
  const { ref, inView } = useInView<HTMLDivElement>(0.08);

  // activeIndex  → tab the user clicked (updates immediately for tab highlight)
  // shownIndex   → tab whose image/description is currently rendered
  // phase        → 'idle' | 'exit' | 'enter'
  // direction    → 'left' (going to lower index) | 'right' (going to higher index)
  const [activeIndex,  setActiveIndex]  = useState(0);
  const [shownIndex,   setShownIndex]   = useState(0);
  const [phase,        setPhase]        = useState<'idle' | 'exit' | 'enter'>('idle');
  const [direction,    setDirection]    = useState<'left' | 'right'>('right');

  const timerRef      = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRef    = useRef(0); // always holds the latest requested index

  // Preload all screenshots on mount so images are ready instantly
  useEffect(() => {
    TABS.forEach((tab) => {
      const img = new Image();
      img.src = tab.image;
    });
  }, []);

  const handleTabClick = (newIndex: number) => {
    if (newIndex === activeIndex) return;

    const dir: 'left' | 'right' = newIndex > activeIndex ? 'right' : 'left';
    pendingRef.current = newIndex;
    setActiveIndex(newIndex);
    setDirection(dir);

    if (timerRef.current) clearTimeout(timerRef.current);

    setPhase('exit');
    timerRef.current = setTimeout(() => {
      setShownIndex(pendingRef.current);
      setPhase('enter');
      timerRef.current = setTimeout(() => {
        setPhase('idle');
      }, ENTER_MS);
    }, EXIT_MS);
  };

  const shown = TABS[shownIndex];

  // Image animation class based on current phase + direction
  const imgClass = cn(
    'w-full block',
    phase === 'exit'  && direction === 'right' && 'animate-showcase-out-left',
    phase === 'exit'  && direction === 'left'  && 'animate-showcase-out-right',
    phase === 'enter' && direction === 'right' && 'animate-showcase-in-right',
    phase === 'enter' && direction === 'left'  && 'animate-showcase-in-left',
  );

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
            {TABS.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(i)}
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                  tab.id === TABS[activeIndex].id
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

        {/* Tab description — fixed height prevents layout shift between tabs */}
        <BlurReveal inView={inView} delay={150} className="text-center mb-6">
          <div className="overflow-hidden h-12 flex items-center justify-center">
            <AnimatedText
              value={shown.description}
              className="text-gray-500 text-base max-w-lg mx-auto"
            />
          </div>
        </BlurReveal>

        {/* Browser mockup */}
        <BlurReveal inView={inView} delay={200}>
          <div className="relative max-w-5xl mx-auto">
            {/* Glow */}
            <div className="absolute -inset-6 bg-brand-primary/10 blur-3xl rounded-3xl -z-10" />

            <div className="bg-[#111B27] rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_24px_64px_rgba(0,0,0,0.18)]">
              {/* Chrome / macOS bar */}
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

              {/* Screenshot with directional slide — overflow-hidden clips the slide */}
              <div className="overflow-hidden">
                <img
                  src={shown.image}
                  alt={shown.imageAlt}
                  className={imgClass}
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </BlurReveal>

      </div>
    </section>
  );
}
