import { useEffect, useRef } from 'react'
import { Animated, Pressable, Text, View } from 'react-native'
import TypeScale from '@/components/ui/TypeScale'
import { useSettings } from '@/store/settings'
import type { AccentOverride, ThemePreference } from '@/types'

interface AppearancePopoverProps {
  open: boolean
  onClose: () => void
}

const THEMES: { value: ThemePreference; label: string }[] = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

const ACCENT_OVERRIDES: { value: AccentOverride; label: string }[] = [
  { value: 'seasonal', label: 'Seasonal' },
  { value: 'advent', label: 'Advent' },
  { value: 'christmas', label: 'Christmas' },
  { value: 'epiphany', label: 'Epiphany' },
  { value: 'lent', label: 'Lent' },
  { value: 'easter', label: 'Easter' },
  { value: 'pentecost', label: 'Pentecost' },
  { value: 'ordinary', label: 'Ordinary Time' },
]

export default function AppearancePopover({ open, onClose }: AppearancePopoverProps) {
  const { settings, update } = useSettings()
  const translateY = useRef(new Animated.Value(-8)).current
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: open ? 0 : -8,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: open ? 1 : 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start()
  }, [open, translateY, opacity])

  if (!open) return null

  return (
    <>
      <Pressable
        onPress={onClose}
        style={{ position: 'absolute', top: -1000, bottom: -1000, left: -1000, right: -1000, zIndex: 30 }}
      />
      <Animated.View
        style={{
          position: 'absolute',
          top: '100%',
          right: 12,
          marginTop: 8,
          width: 244,
          zIndex: 40,
          opacity,
          transform: [{ translateY }],
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 16,
          elevation: 8,
        }}
        className="bg-accent rounded-xl p-4"
      >
        <Text
          className="font-sans text-on-accent uppercase tracking-caps mb-3"
          style={{ fontSize: 11, opacity: 0.82 }}
        >
          Theme
        </Text>
        <View className="flex-row rounded-full border border-on-accent bg-black/10 overflow-hidden">
          {THEMES.map((t, i) => {
            const selected = settings.theme === t.value
            return (
              <Pressable
                key={t.value}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
                onPress={() => update({ theme: t.value })}
                className={[
                  'flex-1 items-center py-2',
                  i > 0 ? 'border-l border-on-accent' : '',
                  selected ? 'bg-white/20' : '',
                ].filter(Boolean).join(' ')}
              >
                <Text
                  className="font-sans text-xs text-on-accent"
                  style={{ opacity: selected ? 1 : 0.72, fontWeight: selected ? '600' : '400' }}
                >
                  {t.label}
                </Text>
              </Pressable>
            )
          })}
        </View>

        <Text
          className="font-sans text-on-accent uppercase tracking-caps mt-4 mb-3"
          style={{ fontSize: 11, opacity: 0.82 }}
        >
          Color
        </Text>
        <View className="flex-row flex-wrap gap-1.5">
          {ACCENT_OVERRIDES.map((a) => {
            const selected = settings.accentOverride === a.value
            return (
              <Pressable
                key={a.value}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
                onPress={() => update({ accentOverride: a.value })}
                className={[
                  'px-2.5 py-1.5 rounded-full border border-on-accent',
                  selected ? 'bg-white/20' : '',
                ].filter(Boolean).join(' ')}
              >
                <Text
                  className="font-sans text-xs text-on-accent"
                  style={{ opacity: selected ? 1 : 0.72, fontWeight: selected ? '600' : '400' }}
                >
                  {a.label}
                </Text>
              </Pressable>
            )
          })}
        </View>

        <Text
          className="font-sans text-on-accent uppercase tracking-caps mt-4 mb-3"
          style={{ fontSize: 11, opacity: 0.82 }}
        >
          Text Size
        </Text>
        <TypeScale value={settings.fontSize} onChange={(v) => update({ fontSize: v })} invert />
      </Animated.View>
    </>
  )
}
