import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { BlurReveal } from '@/components/ui/blur-reveal';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: '¿Necesito instalar algo para usar Dentaly?',
    answer:
      'No. Dentaly funciona 100% desde el navegador web. Solo ingresás a la URL desde tu computadora, tablet o celular y empezás a usar la aplicación. Sin instalaciones, sin actualizaciones manuales.',
  },
  {
    question: '¿El plan Free es realmente gratuito para siempre?',
    answer:
      'Sí. El plan Free no tiene fecha de vencimiento. Podés usar Dentaly de forma completamente gratuita con 1 profesional y hasta 30 pacientes activos, sin límite de tiempo.',
  },
  {
    question: '¿Mis datos y los de mis pacientes están seguros?',
    answer:
      'Utilizamos conexiones cifradas (HTTPS) y seguimos las mejores prácticas de seguridad web. Tus datos y los de tus pacientes permanecen en tu sesión y nunca se comparten con terceros.',
  },
  {
    question: '¿Puedo usar Dentaly desde el celular?',
    answer:
      'Absolutamente. La interfaz de Dentaly es totalmente responsive y funciona en cualquier dispositivo: computadora, tablet y celular. Gestioná tu clínica desde donde estés.',
  },
  {
    question: '¿Cuántos profesionales puede tener mi clínica?',
    answer:
      'El plan Free incluye 1 profesional. Con el plan Pro tenés profesionales ilimitados: podés agregar toda tu staff odontológica con sus especialidades, matrículas y asignación de turnos.',
  },
  {
    question: '¿Puedo migrar mis datos desde Bilog u otro sistema?',
    answer:
      'Sí. Te asistimos con el proceso de migración de datos desde Bilog u otros sistemas de gestión dental. Contactate con nuestro equipo para coordinar el proceso sin interrumpir tu clínica.',
  },
  {
    question: '¿Cómo es el soporte técnico?',
    answer:
      'El plan Free cuenta con soporte por WhatsApp en horario comercial (Lun–Vie 9 a 18hs). El plan Pro incluye soporte prioritario con tiempos de respuesta reducidos.',
  },
  {
    question: '¿Puedo cancelar mi suscripción cuando quiero?',
    answer:
      'Sí. No hay permanencia mínima ni contratos anuales forzosos. Podés cancelar tu suscripción Pro en cualquier momento desde el panel de configuración de tu cuenta.',
  },
];

export function FAQ() {
  const { ref, inView } = useInView<HTMLDivElement>(0.08);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="section-pad bg-white">
      <div ref={ref} className="max-w-3xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <BlurReveal inView={inView} delay={0} className="text-center mb-12">
          <span className="inline-block text-brand-primary text-sm font-semibold uppercase tracking-widest mb-3">
            FAQ
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-gray-900 leading-tight">
            Preguntas frecuentes
          </h2>
          <p className="mt-4 text-gray-500 text-lg max-w-lg mx-auto">
            Respondemos las dudas más comunes antes de que las tengas.
          </p>
        </BlurReveal>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {FAQ_ITEMS.map((item, i) => (
            <BlurReveal key={i} inView={inView} delay={60 + i * 60}>
              <FAQAccordionItem
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            </BlurReveal>
          ))}
        </div>

        {/* Still have questions */}
        <BlurReveal inView={inView} delay={700} className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            ¿Tenés alguna otra pregunta?{' '}
            <a
              href="https://wa.me/5492213033623?text=Hola%2C+tengo+una+consulta+sobre+Dentaly"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary font-medium hover:underline"
            >
              Escribinos por WhatsApp →
            </a>
          </p>
        </BlurReveal>
      </div>
    </section>
  );
}

function FAQAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        'border rounded-xl overflow-hidden transition-all duration-200',
        isOpen
          ? 'border-brand-primary/30 shadow-sm shadow-brand-primary/5'
          : 'border-gray-100 hover:border-gray-200'
      )}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-gray-50/50 transition-colors"
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            'font-semibold text-[0.9375rem] transition-colors',
            isOpen ? 'text-brand-primary' : 'text-gray-800'
          )}
        >
          {item.question}
        </span>
        <ChevronDown
          className={cn(
            'w-4 h-4 flex-shrink-0 text-gray-400 transition-transform duration-200',
            isOpen && 'rotate-180 text-brand-primary'
          )}
        />
      </button>

      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-60' : 'max-h-0'
        )}
      >
        <p className="px-5 pb-4 pt-0 text-gray-500 text-sm leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  );
}
