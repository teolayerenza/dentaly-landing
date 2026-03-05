import { TextMarquee } from '@/components/ui/text-marquee';

const STATS = [
  { icon: '🏥', text: '+500 clínicas activas' },
  { icon: '📅', text: '+10.000 turnos gestionados' },
  { icon: '⭐', text: '99% de satisfacción' },
  { icon: '⚡', text: 'Sin instalación requerida' },
  { icon: '🦷', text: 'Odontograma digital incluido' },
  { icon: '🇦🇷', text: 'Soporte local en Argentina' },
  { icon: '💰', text: 'Finanzas en tiempo real' },
  { icon: '📱', text: 'Funciona en cualquier dispositivo' },
];

export function StatsMarquee() {
  return (
    <section className="bg-brand-bg-mid border-y border-white/[0.06] py-4 overflow-hidden">
      <TextMarquee
        duration={32}
        itemClassName="text-white/50 text-sm font-medium"
        items={STATS.map(({ icon, text }) => (
          <span key={text} className="flex items-center gap-2">
            <span className="text-base">{icon}</span>
            <span>{text}</span>
            <span className="ml-6 text-brand-secondary/40 select-none">◆</span>
          </span>
        ))}
      />
    </section>
  );
}
