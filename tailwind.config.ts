import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        /* ── Brand tokens ─────────────────────────────── */
        'brand-bg':        '#070D14',   /* Hero / dark section background  */
        'brand-bg-mid':    '#0A1628',   /* Mid-dark sections               */
        'brand-primary':   '#005B7F',   /* hsl(192 100% 19.6%) – main teal */
        'brand-primary-l': '#0A8FA8',   /* Lighter teal for gradients      */
        'brand-secondary': '#4DA0A0',   /* hsl(182 30% 49%) – mid teal     */
        'brand-accent':    '#F5A623',   /* hsl(37 95% 55%) – orange        */
        'brand-light':     '#F0F6F8',   /* Light section backgrounds       */
        'brand-border':    'rgba(0,91,127,0.15)',
      },
      /* ── Custom keyframes ──────────────────────────── */
      keyframes: {
        /* Floating gradient orbs in hero */
        'orb-1': {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)' },
          '33%':      { transform: 'translate(5%, -8%) scale(1.08)' },
          '66%':      { transform: 'translate(-4%, 5%) scale(0.96)' },
        },
        'orb-2': {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)' },
          '33%':      { transform: 'translate(-6%, 6%) scale(1.05)' },
          '66%':      { transform: 'translate(4%, -4%) scale(1.1)' },
        },
        'orb-3': {
          '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)' },
          '50%':      { transform: 'translate(-50%, -50%) scale(1.2)' },
        },
        /* Shimmer sweep used in ShimmerText */
        shimmer: {
          '0%':   { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        /* Continuous horizontal marquee */
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-100%)' },
        },
        /* Gentle float for browser mockup */
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        /* Slow rotation for LightRays */
        'spin-very-slow': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        /* Fade + slide up (scroll-triggered via class) */
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        /* Pulse glow for primary buttons */
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0,91,127,0)' },
          '50%':      { boxShadow: '0 0 24px 4px rgba(0,91,127,0.4)' },
        },
        /* Accordion */
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
      },
      animation: {
        'orb-1':          'orb-1 9s ease-in-out infinite',
        'orb-2':          'orb-2 12s ease-in-out infinite',
        'orb-3':          'orb-3 7s ease-in-out infinite',
        shimmer:          'shimmer 4s linear infinite',
        marquee:          'marquee 28s linear infinite',
        float:            'float 5s ease-in-out infinite',
        'spin-very-slow': 'spin-very-slow 40s linear infinite',
        'fade-up':        'fade-up 0.6s ease-out both',
        'pulse-glow':     'pulse-glow 2.5s ease-in-out infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
