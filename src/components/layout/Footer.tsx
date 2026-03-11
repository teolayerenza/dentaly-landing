const LINKS = {
  Producto: [
    { label: 'Funciones', href: '#funciones' },
    { label: 'Cómo funciona', href: '#como-funciona' },
    { label: 'Precios', href: '#precios' },
    { label: 'FAQ', href: '#faq' },
  ],
  Empresa: [
    { label: 'Acerca de', href: '#' },
    { label: 'Contacto', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  Legal: [
    { label: 'Términos de servicio', href: '#' },
    { label: 'Política de privacidad', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-brand-bg text-white/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 120 120" className="w-4 h-4" fill="white">
                  <path d="M30 38 C30 28 36 20 46 18 C50 17 53 20 60 20 C67 20 70 17 74 18 C84 20 90 28 90 38 C90 50 86 60 83 70 C80 80 79 92 75 98 C73 101 70 102 68 100 C65 97 64 90 60 90 C56 90 55 97 52 100 C50 102 47 101 45 98 C41 92 40 80 37 70 C34 60 30 50 30 38 Z" />
                </svg>
              </div>
              <span className="font-display font-bold text-white text-lg">dentaly</span>
            </a>
            <p className="text-sm leading-relaxed max-w-[220px]">
              El sistema de gestión dental del siglo XXI para clínicas argentinas.
            </p>
            <p className="text-xs mt-4 flex items-center gap-1.5">
              <span className="text-base">🇦🇷</span>
              Hecho con ❤️ en Argentina
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold text-sm mb-4">{title}</h3>
              <ul className="flex flex-col gap-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm hover:text-white transition-colors duration-200"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Dentaly. Todos los derechos reservados.
          </p>
          <p className="text-xs">
            Construido con Vite + React + Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
