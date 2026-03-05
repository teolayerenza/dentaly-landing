# 🦷 DENTALY — Landing Page

**DENTALY Landing** es la página de presentación y captación de usuarios del sistema de gestión dental Dentaly. Diseñada con foco en conversión, presenta el producto, sus funcionalidades, precios y testimonios, con un CTA principal que conecta directamente con el equipo vía WhatsApp.

> **Estado del Proyecto:** 🚀 En Producción (v1.0.0)
> **URL en vivo:** [https://teolayerenza.github.io/dentaly-landing/](https://teolayerenza.github.io/dentaly-landing/)
> **App del producto:** [https://teolayerenza.github.io/dentaly-care-hub/](https://teolayerenza.github.io/dentaly-care-hub/)

---

## 🚀 Secciones de la Landing

### 🏠 Hero
Above the fold de alto impacto con gradiente animado, headline con efecto shimmer, captura real del dashboard y CTAs principales: *Solicitar demo* y *Empezar gratis*.

### 📊 Stats Strip
Marquee continuo con estadísticas clave: clínicas activas, turnos gestionados, satisfacción y soporte local.

### ⚡ Funciones
Grilla bento de 6 cards con las funcionalidades principales: Agenda, Fichas de Pacientes, Odontograma Digital, Finanzas, Inventario y gestión Multi-Profesional.

### 🔢 Cómo Funciona
Flujo visual de 3 pasos para comenzar: Crear cuenta → Configurar clínica → Empezar a gestionar.

### 💻 Showcase del Producto
Mockup de browser con 6 tabs navegables usando capturas reales del sistema:
- Dashboard · Agenda · Pacientes · Finanzas · Odontograma · Ficha Paciente

### ⭐ Testimonios
3 tarjetas de clínicas argentinas con nombre, rol y cita destacada.

### 💰 Precios
Comparativa Free vs. Pro ($20.000 ARS/mes) con toggle mensual/anual y detalle de funcionalidades incluidas.

### ❓ FAQ
Accordion con 8 preguntas frecuentes orientadas a reducir objeciones de conversión.

### 🚀 CTA Final
Sección de cierre con fondo de rayos de luz animados y doble CTA.

---

## 🛠️ Stack Tecnológico

- **Core:** [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/) + [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **UI & Animaciones:** [Spell UI](https://spell.sh/) (componentes copy-paste)
- **Iconografía:** [Lucide React](https://lucide.dev/)
- **Formularios:** [React Hook Form](https://react-hook-form.com/)
- **Deploy:** [GitHub Pages](https://pages.github.com/) vía [GitHub Actions](https://github.com/features/actions)

---

## 🎨 Componentes Spell UI incluidos

| Componente | Uso |
|---|---|
| `AnimatedGradient` | Fondo animado con orbs en el Hero |
| `ShimmerText` | Headline con efecto shimmer |
| `BlurReveal` | Animaciones de entrada scroll-triggered |
| `TextMarquee` | Stats strip continuo |
| `FlowButton` | Botones CTA con shimmer en hover |
| `LightRays` | Fondo decorativo en sección Final CTA |
| `WordsStagger` | Texto con aparición por palabras |
| `HighlightedText` | Palabras clave resaltadas en features |

---

## 📂 Estructura del Proyecto

```text
src/
├── assets/
│   └── screenshots/    # Capturas reales del sistema Dentaly
├── components/
│   ├── layout/         # Navbar y Footer
│   ├── sections/       # Hero, Features, Pricing, FAQ, etc.
│   ├── shared/         # DemoModal (form → WhatsApp)
│   └── ui/             # Componentes Spell UI
├── hooks/              # useInView (scroll-triggered animations)
├── lib/                # Utilidades (cn helper)
├── App.tsx
└── main.tsx
```

---

## 🖥️ Comandos

```bash
npm run dev      # Servidor de desarrollo en http://localhost:5173
npm run build    # Build de producción
npm run preview  # Preview del build de producción
```

> El deploy a GitHub Pages se hace automáticamente vía **GitHub Actions** al hacer `push` a `main`.

---

## ⚙️ Configuración

El único cambio necesario antes de producción es el número de WhatsApp en:

```ts
// src/components/shared/DemoModal.tsx — línea 14
const WHATSAPP_NUMBER = 'TU_NUMERO_AQUI';
// Formato: código de país + número sin + ni espacios
// Ejemplo Argentina: '5491123456789'
```
