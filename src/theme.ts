import { vars } from 'nativewind'
import { getSeasonAccentTones } from '@/liturgy/season-accent'
import type { AccentSeason } from '@/liturgy/season-accent'

export const lightTheme = vars({
  '--bg': '#ffffff',
  '--surface': '#ffffff',
  '--surface-sunk': '#f4f3f0',
  '--surface-raised': '#ffffff',
  '--surface-hover': '#efeeea',
  '--border': '#e4e2dc',
  '--border-strong': '#cecabf',
  '--hairline': 'rgba(42, 33, 20, 0.12)',
  '--text': '#241d12',
  '--text-muted': '#6b6150',
  '--text-subtle': '#9a8f77',
  '--text-inverse': '#ffffff',
  '--text-on-accent': '#f4f8f1',
  '--accent': '#5f7d53',
  '--accent-hover': '#7f9a72',
  '--accent-press': '#4a6540',
  '--accent-quiet': 'rgba(95, 125, 83, 0.12)',
  '--gilt': '#a9843a',
  '--gilt-quiet': 'rgba(169, 132, 58, 0.16)',
})

export const darkTheme = vars({
  '--bg': '#04070f',
  '--surface': '#121826',
  '--surface-sunk': '#0a0e1a',
  '--surface-raised': '#1a2130',
  '--surface-hover': '#212a3a',
  '--border': '#2a3446',
  '--border-strong': '#3a4658',
  '--hairline': 'rgba(236, 231, 219, 0.14)',
  '--text': '#ece7db',
  '--text-muted': '#9ca2ad',
  '--text-subtle': '#566073',
  '--text-inverse': '#04070f',
  '--text-on-accent': '#fdf1ec',
  '--accent': '#d65846',
  '--accent-hover': '#e27563',
  '--accent-press': '#bf4835',
  '--accent-quiet': 'rgba(214, 88, 70, 0.16)',
  '--gilt': '#c9a24b',
  '--gilt-quiet': 'rgba(201, 162, 75, 0.18)',
})

// Shared by useSeasonalTheme() (auto-detects today's season) and <Theme>
// (accepts explicit overrides) so both produce the exact same vars() shape.
export function computeThemeVars(colorScheme: 'light' | 'dark', season: AccentSeason) {
  const baseTheme = colorScheme === 'dark' ? darkTheme : lightTheme
  const tones = getSeasonAccentTones(season, colorScheme)

  return vars({
    '--bg': baseTheme['--bg'],
    '--surface': baseTheme['--surface'],
    '--surface-sunk': baseTheme['--surface-sunk'],
    '--surface-raised': baseTheme['--surface-raised'],
    '--surface-hover': baseTheme['--surface-hover'],
    '--border': baseTheme['--border'],
    '--border-strong': baseTheme['--border-strong'],
    '--hairline': baseTheme['--hairline'],
    '--text': baseTheme['--text'],
    '--text-muted': baseTheme['--text-muted'],
    '--text-subtle': baseTheme['--text-subtle'],
    '--text-inverse': baseTheme['--text-inverse'],
    '--text-on-accent': baseTheme['--text-on-accent'],
    '--gilt': tones.gilt,
    '--gilt-quiet': tones.giltQuiet,
    '--accent': tones.accent,
    '--accent-hover': tones.accentHover,
    '--accent-press': tones.accentPress,
    '--accent-quiet': tones.accentQuiet,
  })
}
