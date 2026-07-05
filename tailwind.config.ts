import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Design-system semantic tokens (src/styles/design-system/tokens/colors.css) —
        // these read live CSS custom properties, so they switch with the .dark class.
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-sunk': 'var(--surface-sunk)',
        'surface-raised': 'var(--surface-raised)',
        'surface-hover': 'var(--surface-hover)',
        border: 'var(--border)',
        'border-strong': 'var(--border-strong)',
        ink: 'var(--text)',
        'ink-muted': 'var(--text-muted)',
        'ink-subtle': 'var(--text-subtle)',
        'ink-inverse': 'var(--text-inverse)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'accent-press': 'var(--accent-press)',
        gilt: 'var(--gilt)',
        // Raw scales, for cases that need a specific step rather than the semantic alias
        'night-950': '#04070f',
        'night-900': '#0a0e1a',
        'night-850': '#121826',
        'night-800': '#1a2130',
        'night-750': '#212a3a',
        'night-700': '#2a3446',
        'night-600': '#3a4658',
        'night-500': '#566073',
        'night-400': '#9ca2ad',
        'night-300': '#c6cad2',
        vellum: '#ece7db',
        'vellum-50': '#faf6ec',
        'vellum-100': '#f4eede',
        'vellum-200': '#e9e0c9',
        rubric: {
          300: '#eca192',
          400: '#e27563',
          500: '#d65846',
          600: '#bf4835',
          700: '#9c3626',
          DEFAULT: '#d65846',
        },
        'rubric-dark': '#e74c3c',
        gold: {
          300: '#e2c887',
          400: '#d3ad5c',
          500: '#c9a24b',
          600: '#a9843a',
        },
        sage: '#7f9a72',
        violet: '#7d6f9c',
        parchment: '#f5f0e8',
      },
      fontFamily: {
        serif: ['EB Garamond', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        display: ['Cormorant Garamond', 'Georgia', '"Times New Roman"', 'serif'],
        initial: ['Goudy Initialen', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'drop-cap': ['4.5rem', { lineHeight: '0.85' }],
      },
      letterSpacing: {
        caps: '0.16em',
      },
    },
  },
  plugins: [],
} satisfies Config
