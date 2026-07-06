import { useMemo } from 'react'
import { vars } from 'nativewind'
import { lightTheme, darkTheme } from '@/theme'
import { getLiturgicalDay } from '@/liturgy/calendar'
import { getAccentSeason, getSeasonAccentTones } from '@/liturgy/season-accent'
import { useAppColorScheme } from '@/hooks/useAppColorScheme'

export function useSeasonalTheme() {
  const colorScheme = useAppColorScheme()
  const isDark = colorScheme === 'dark'

  return useMemo(() => {
    const baseTheme = isDark ? darkTheme : lightTheme
    const day = getLiturgicalDay(new Date())
    const season = getAccentSeason(day)
    const tones = getSeasonAccentTones(season, isDark ? 'dark' : 'light')

    return vars({
      '--bg': baseTheme['--bg'],
      '--surface': baseTheme['--surface'],
      '--surface-sunk': baseTheme['--surface-sunk'],
      '--surface-raised': baseTheme['--surface-raised'],
      '--surface-hover': baseTheme['--surface-hover'],
      '--border': baseTheme['--border'],
      '--border-strong': baseTheme['--border-strong'],
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
  }, [isDark])
}
