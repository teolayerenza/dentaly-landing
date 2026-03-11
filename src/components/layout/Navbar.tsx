import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FlowButton } from '@/components/ui/flow-button';

interface NavbarProps {
  onDemoClick: () => void;
}

const NAV_LINKS = [
  { label: 'Funciones', href: '#funciones' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Precios', href: '#precios' },
  { label: 'FAQ', href: '#faq' },
];

export function Navbar({ onDemoClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close mobile menu on resize to desktop */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-brand-bg/90 backdrop-blur-xl border-b border-white/[0.07] py-3 shadow-xl shadow-black/20'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">

        {/* ── Logo ── */}
        <a href="#" className="flex items-center gap-2.5 group flex-shrink-0">
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center transition-colors group-hover:bg-brand-primary-l">
            <svg viewBox="0 0 120 120" className="w-[18px] h-[18px]" fill="white">
              <path d="M30 38 C30 28 36 20 46 18 C50 17 53 20 60 20 C67 20 70 17 74 18 C84 20 90 28 90 38 C90 50 86 60 83 70 C80 80 79 92 75 98 C73 101 70 102 68 100 C65 97 64 90 60 90 C56 90 55 97 52 100 C50 102 47 101 45 98 C41 92 40 80 37 70 C34 60 30 50 30 38 Z" />
            </svg>
          </div>
          <span className="font-display font-bold text-[1.15rem] text-white tracking-tight">
            Dentaly
          </span>
        </a>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-white/65 hover:text-white text-[0.875rem] font-medium transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* ── Desktop CTAs ── */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://app.dentaly.com.ar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white text-sm font-medium transition-colors"
          >
            Iniciar sesión
          </a>
          <FlowButton size="sm" onClick={onDemoClick}>
            Solicitar demo
          </FlowButton>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300',
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="bg-brand-bg/95 backdrop-blur-xl border-t border-white/[0.07] px-6 pt-4 pb-6 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="py-2.5 text-white/75 hover:text-white text-base font-medium transition-colors border-b border-white/[0.05] last:border-0"
            >
              {label}
            </a>
          ))}
          <div className="pt-4 flex flex-col gap-2.5">
            <a
              href="https://app.dentaly.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/55 text-sm font-medium text-center py-1"
            >
              Iniciar sesión
            </a>
            <FlowButton
              className="w-full justify-center"
              onClick={() => { setMobileOpen(false); onDemoClick(); }}
            >
              Solicitar demo gratuita
            </FlowButton>
          </div>
        </div>
      </div>
    </header>
  );
}
