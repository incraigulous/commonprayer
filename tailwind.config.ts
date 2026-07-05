import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        rubric: '#c0392b',
        'rubric-dark': '#e74c3c',
        parchment: '#f5f0e8',
        ink: '#1a1a1a',
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'drop-cap': ['4.5rem', { lineHeight: '0.85' }],
      },
    },
  },
  plugins: [],
} satisfies Config
