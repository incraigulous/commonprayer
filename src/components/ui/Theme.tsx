import { useMemo } from 'react'
import { View, useColorScheme } from 'react-native'
import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import { computeThemeVars } from '@/theme'
import { getLiturgicalDay } from '@/liturgy/calendar'
import { resolveColorMode } from '@/liturgy/season-accent'
import type { AccentSeason } from '@/liturgy/season-accent'
import { ReadingScaleContext } from '@/hooks/useFontScale'
import { useSettings } from '@/store/settings'

export type ThemeMode = 'system' | 'light' | 'dark'
export type DisplaySize = 'sm' | 'md' | 'lg' | 'xl'

const READING_SCALES: Record<DisplaySize, number> = { sm: 0.9, md: 1, lg: 1.15, xl: 1.3 }

interface ThemeProps {
  /** @default 'system' — resolved against the OS colour scheme directly. */
  theme?: ThemeMode
  /** Omit to auto-detect today's actual liturgical season. */
  season?: AccentSeason
  /** Reading-text scale override for this subtree only. Omit to inherit. */
  size?: DisplaySize
  className?: string
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

// Theme — a nestable stand-in for what the app does at its root
// (useSeasonalTheme() + a vars() View): wrap a subtree to scope it to an
// explicit theme/season/size, rather than always following the app-wide
// setting. Mirrors the ui-kit's <Theme> — same idea (data-theme/data-season
// there is vars() + context here, since RN has no CSS attribute cascade).
export default function Theme({ theme = 'system', season, size, className, style, children }: ThemeProps) {
  const osScheme = useColorScheme()
  const resolvedScheme: 'light' | 'dark' = theme === 'system' ? (osScheme === 'dark' ? 'dark' : 'light') : theme
  const colorMode = useSettings((s) => s.settings.colorMode)

  const resolvedSeason = useMemo(
    () => season ?? resolveColorMode(colorMode, getLiturgicalDay(new Date())),
    [season, colorMode],
  )

  const themeVars = useMemo(
    () => computeThemeVars(resolvedScheme, resolvedSeason),
    [resolvedScheme, resolvedSeason],
  )

  const content = (
    <View className={className} style={[themeVars, style]}>
      {children}
    </View>
  )

  if (size) {
    return (
      <ReadingScaleContext.Provider value={READING_SCALES[size]}>
        {content}
      </ReadingScaleContext.Provider>
    )
  }

  return content
}
