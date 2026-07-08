import { useEffect, useMemo, useRef } from 'react'
import { Animated, Pressable, Text, View } from 'react-native'
import type { ReactNode } from 'react'
import { getLiturgicalDay } from '@/liturgy/calendar'
import { resolveColorMode, getSeasonAccentTones } from '@/liturgy/season-accent'
import { useAppColorScheme } from '@/hooks/useAppColorScheme'
import { useSettings } from '@/store/settings'

interface SwitchProps {
  checked: boolean
  onChange: (v: boolean) => void
  label?: ReactNode
  help?: ReactNode
  disabled?: boolean
  /** Glyph shown in the thumb when on (e.g. a moon). */
  onGlyph?: ReactNode
  /** Glyph shown in the thumb when off (e.g. a sun). */
  offGlyph?: ReactNode
}

const TRACK_WIDTH = 44
const TRACK_HEIGHT = 26
const THUMB_SIZE = 22
const THUMB_INSET = 2
const THUMB_TRAVEL = TRACK_WIDTH - THUMB_SIZE - THUMB_INSET * 2

// A custom pill-track switch (not RN's native Switch) so the thumb can carry
// an optional glyph and the track can fill with the live season accent —
// neither is possible with the OS-native control. Matches ui-kit's Switch.jsx.
export default function Switch({ checked, onChange, label, help, disabled, onGlyph, offGlyph }: SwitchProps) {
  const colorScheme = useAppColorScheme()
  const isDark = colorScheme === 'dark'
  const colorMode = useSettings((s) => s.settings.colorMode)

  const accent = useMemo(() => {
    const day = getLiturgicalDay(new Date())
    const season = resolveColorMode(colorMode, day)
    return getSeasonAccentTones(season, isDark ? 'dark' : 'light').accent
  }, [isDark, colorMode])

  const progress = useRef(new Animated.Value(checked ? 1 : 0)).current
  useEffect(() => {
    Animated.timing(progress, { toValue: checked ? 1 : 0, duration: 160, useNativeDriver: false }).start()
  }, [checked, progress])

  const trackColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [isDark ? '#3a4658' : '#cecabf', accent],
  })
  const thumbTranslate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [THUMB_INSET, THUMB_INSET + THUMB_TRAVEL],
  })

  return (
    <Pressable
      disabled={disabled}
      onPress={() => onChange(!checked)}
      accessibilityRole="switch"
      accessibilityState={{ checked, disabled }}
      className="flex-row items-center justify-between gap-4 py-1"
      style={disabled ? { opacity: 0.5 } : undefined}
    >
      {(label || help) && (
        <View className="flex-1">
          {label ? <Text className="text-sm text-ink">{label}</Text> : null}
          {help ? <Text className="text-xs text-ink-muted mt-0.5">{help}</Text> : null}
        </View>
      )}
      <Animated.View
        style={{
          width: TRACK_WIDTH,
          height: TRACK_HEIGHT,
          borderRadius: TRACK_HEIGHT / 2,
          backgroundColor: trackColor,
          justifyContent: 'center',
        }}
      >
        <Animated.View
          style={{
            width: THUMB_SIZE,
            height: THUMB_SIZE,
            borderRadius: THUMB_SIZE / 2,
            backgroundColor: '#ffffff',
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{ translateX: thumbTranslate }],
          }}
        >
          {checked ? onGlyph : offGlyph}
        </Animated.View>
      </Animated.View>
    </Pressable>
  )
}
