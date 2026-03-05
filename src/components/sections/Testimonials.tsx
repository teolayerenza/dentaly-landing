import { Star, Quote } from 'lucide-react';
import { BlurReveal } from '@/components/ui/blur-reveal';
import { useInView } from '@/hooks/useInView';

interface Testimonial {
  name: string;
  role: string;
  clinic: string;
  city: string;
  quote: string;
  avatar: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Dra. María González',
    role: 'Directora médica',
    clinic: 'Clínica DentalPro',
    city: 'Buenos Aires',
    quote:
      'Antes perdíamos horas organizando los turnos del día. Con Dentaly, en 10 minutos tenemos toda la agenda lista. Un cambio radical en nuestra clínica.',
    avatar: 'MG',
    rating: 5,
  },
  {
    name: 'Dr. Facundo Ríos',
    role: 'Odontólogo independiente',
    clinic: 'Consultorio Privado',
    city: 'Córdoba',
    quote:
      'El odontograma digital es lo que más me sorprendió. Ya no necesito papel para llevar los registros y puedo ver el historial completo del paciente en segundos.',
    avatar: 'FR',
    rating: 5,
  },
  {
    name: 'Florencia Paz',
    role: 'Administradora',
    clinic: 'OralPro Centro',
    city: 'Rosario',
    quote:
      'El módulo de finanzas ordenó la caja de la clínica. Ahora veo en tiempo real cuánto ingresó cada profesional y a fin de mes el cierre es instantáneo.',
    avatar: 'FP',
    rating: 5,
  },
];

const AVATAR_BG = ['#005B7F', '#4DA0A0', '#0A8FA8'] as const;

export function Testimonials() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section className="section-pad bg-white">
      <div ref={ref} className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <BlurReveal inView={inView} delay={0} className="text-center mb-14">
          <span className="inline-block text-brand-primary text-sm font-semibold uppercase tracking-widest mb-3">
            Testimonios
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-gray-900 leading-tight">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-lg mx-auto">
            Profesionales de todo el país ya confían en Dentaly para gestionar su clínica.
          </p>
        </BlurReveal>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <BlurReveal key={t.name} inView={inView} delay={120 + i * 110}>
              <TestimonialCard testimonial={t} avatarBg={AVATAR_BG[i]} />
            </BlurReveal>
          ))}
        </div>

        {/* Bottom trust line */}
        <BlurReveal inView={inView} delay={500} className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            <span className="font-semibold text-brand-primary">+500 clínicas</span> de todo el país ya trabajan con Dentaly.{' '}
            <span className="text-brand-accent font-medium">⭐ 4.9/5</span> de calificación promedio.
          </p>
        </BlurReveal>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial: t,
  avatarBg,
}: {
  testimonial: Testimonial;
  avatarBg: string;
}) {
  return (
    <div className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-brand-primary/20 hover:shadow-lg hover:shadow-brand-primary/5 transition-all duration-300 flex flex-col gap-5 h-full">
      {/* Stars */}
      <div className="flex gap-0.5">
        {[...Array(t.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-brand-accent text-brand-accent" />
        ))}
      </div>

      {/* Quote */}
      <div className="relative flex-1">
        <Quote className="absolute -top-1 -left-1 w-5 h-5 text-brand-primary/20 rotate-180" />
        <p className="text-gray-600 text-[0.9375rem] leading-relaxed pl-4">&ldquo;{t.quote}&rdquo;</p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
          style={{ background: avatarBg }}
        >
          {t.avatar}
        </div>
        <div>
          <p className="text-gray-900 font-semibold text-sm">{t.name}</p>
          <p className="text-gray-400 text-xs">
            {t.role} · {t.clinic}, {t.city}
          </p>
        </div>
      </div>
    </div>
  );
}
