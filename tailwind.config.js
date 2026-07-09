/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Semantic tokens — resolved via CSS custom properties set by ThemeProvider
        // (NativeWind varWs() API cascades these from the root View)
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-sunk': 'var(--surface-sunk)',
        'surface-raised': 'var(--surface-raised)',
        'surface-hover': 'var(--surface-hover)',
        border: 'var(--border)',
        'border-strong': 'var(--border-strong)',
        hairline: 'var(--hairline)',
        ink: 'var(--text)',
        'ink-muted': 'var(--text-muted)',
        'ink-subtle': 'var(--text-subtle)',
        'ink-inverse': 'var(--text-inverse)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'accent-press': 'var(--accent-press)',
        gilt: 'var(--gilt)',
        'gilt-quiet': 'var(--gilt-quiet)',
        'accent-quiet': 'var(--accent-quiet)',
        'on-accent': 'var(--text-on-accent)',
        // Raw scales for direct use
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
        serif: ['EBGaramond', 'Georgia', 'Cambria', 'serif'],
        display: ['CormorantGaramond', 'Georgia', 'serif'],
        sans: ['System', '-apple-system', 'sans-serif'],
        initial: ['GoudyInitialen', 'CormorantGaramond', 'Georgia', 'serif'],
      },
      // Matches ui-kit/tokens/typography.css's --text-* scale exactly (rem
      // values there × the 16px root, converted to px since NativeWind
      // resolves fontSize on native rather than through CSS custom props).
      fontSize: {
        xs: ['13px', { lineHeight: '1.4' }],     // captions, page refs
        sm: ['15px', { lineHeight: '1.4' }],      // metadata, UI labels
        base: ['17px', { lineHeight: '1.68' }],   // liturgical body
        lg: ['20px', { lineHeight: '1.4' }],       // lead / emphasis
        xl: ['24px', { lineHeight: '1.22' }],      // section heading
        '2xl': ['30px', { lineHeight: '1.22' }],   // office title
        '3xl': ['40px', { lineHeight: '1.12' }],   // day / date
        '4xl': ['52px', { lineHeight: '1.12' }],   // display
        '5xl': ['72px', { lineHeight: '1.12' }],   // hero display
      },
      letterSpacing: {
        caps: '0.16em',
      },
    },
  },
  plugins: [],
}
