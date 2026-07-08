import { useMemo } from 'react'
import { computeThemeVars } from '@/theme'
import { getLiturgicalDay } from '@/liturgy/calendar'
import { resolveColorMode } from '@/liturgy/season-accent'
import { useAppColorScheme } from '@/hooks/useAppColorScheme'
import { useSettings } from '@/store/settings'

// The app-root convenience hook: the season resolved from the user's Color
// preference (seasonal calendar / time of day / a pinned season — see
// Settings' DisplayMenu), against their explicit theme preference (or the
// OS). For scoping a one-off subtree to an explicit theme/season/size
// instead, use <Theme>.
export function useSeasonalTheme() {
  const colorScheme = useAppColorScheme()
  const colorMode = useSettings((s) => s.settings.colorMode)

  return useMemo(() => {
    const day = getLiturgicalDay(new Date())
    const season = resolveColorMode(colorMode, day)
    return computeThemeVars(colorScheme, season)
  }, [colorScheme, colorMode])
}
