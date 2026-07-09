import { View, Text, Pressable } from 'react-native'
import type { ReactNode } from 'react'
import type { AccentSeason } from '@/liturgy/season-accent'
import type { ColorMode } from '@/types'

export type ThemeMode = 'system' | 'light' | 'dark'
export type ColorAuto = Extract<ColorMode, 'seasonal' | 'time'>
export type { ColorMode }
export type DisplaySize = 'sm' | 'md' | 'lg' | 'xl'

export const THEME_MODES: { id: ThemeMode; label: string }[] = [
  { id: 'system', label: 'System' },
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
]

export const COLOR_AUTO: { id: ColorAuto; label: string }[] = [
  { id: 'seasonal', label: 'Seasonal' },
  { id: 'time', label: 'Time of Day' },
]

export const COLOR_SEASONS: { id: AccentSeason; label: string }[] = [
  { id: 'advent', label: 'Advent' },
  { id: 'epiphany', label: 'Epiphany' },
  { id: 'lent', label: 'Lent' },
  { id: 'easter', label: 'Easter' },
  { id: 'pentecost', label: 'Pentecost' },
  { id: 'ordinary', label: 'Ordinary Time' },
]

export const SIZE_STEPS: { id: DisplaySize; label: string; glyphSize: number }[] = [
  { id: 'sm', label: 'Small', glyphSize: 14 },
  { id: 'md', label: 'Regular', glyphSize: 17 },
  { id: 'lg', label: 'Large', glyphSize: 20 },
  { id: 'xl', label: 'Extra large', glyphSize: 25 },
]

/** Mirrors ui-kit's DISPLAY_READING_SCALES / TypeScale's READING_SCALES. */
export const DISPLAY_READING_SCALES: Record<DisplaySize, number> = { sm: 0.9, md: 1, lg: 1.15, xl: 1.3 }

// Near-white in both themes (light/dark --text-on-accent are #f4f8f1 /
// #fdf1ec), so fixed white overlays stand in for the ui-kit's
// color-mix(var(--text-on-accent) X%) borders/fills without needing a
// literal on-accent hex threaded down to every border/fill here.
const LINE = 'rgba(255,255,255,0.34)'
const FILL = 'rgba(255,255,255,0.20)'

interface SegButtonProps {
  label: string
  active: boolean
  onPress: () => void
  isFirst: boolean
  serif?: boolean
  glyphSize?: number
}

function SegButton({ label, active, onPress, isFirst, serif, glyphSize }: SegButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      className="flex-1 items-center justify-center py-2.5"
      style={[{ borderLeftWidth: isFirst ? 0 : 1, borderLeftColor: LINE }, active ? { backgroundColor: FILL } : undefined]}
    >
      <Text
        className={['text-on-accent', serif ? 'font-serif' : ''].filter(Boolean).join(' ')}
        style={{ fontSize: glyphSize ?? 15, opacity: active ? 1 : 0.74, fontWeight: active ? '700' : '400' }}
      >
        {label}
      </Text>
    </Pressable>
  )
}

interface DisplayMenuProps {
  theme?: ThemeMode
  onThemeChange?: (mode: ThemeMode) => void
  color?: ColorMode
  onColorChange?: (mode: ColorMode) => void
  size?: DisplaySize
  onSizeChange?: (size: DisplaySize) => void
  /** Optional italic hint under the colour pills (e.g. the resolved season). */
  colorHint?: ReactNode
}

// The reading-display settings panel: Theme (System · Light · Dark), Color
// (Seasonal & Time-of-Day auto modes plus every liturgical season) and Text
// size. Presentational and fully controlled; the panel paints in the live
// season accent, so it previews the chosen colour. Drop it inside a popover
// or sheet of your own.
export default function DisplayMenu({
  theme = 'system',
  onThemeChange,
  color = 'seasonal',
  onColorChange,
  size = 'md',
  onSizeChange,
  colorHint,
}: DisplayMenuProps) {
  const colorOptions: { id: ColorMode; label: string }[] = [...COLOR_AUTO, ...COLOR_SEASONS]

  return (
    <View
      className="w-[300px] bg-accent rounded-2xl p-5"
      style={{ shadowColor: '#000', shadowOpacity: 0.28, shadowRadius: 20, shadowOffset: { width: 0, height: 8 }, elevation: 6 }}
      accessibilityRole="none"
    >
      <View className="gap-5">
        <View>
          <Text className="text-on-accent text-xs font-semibold tracking-[2px] uppercase mb-3" style={{ opacity: 0.74 }}>
            Theme
          </Text>
          <View className="flex-row rounded-full overflow-hidden" style={{ borderWidth: 1, borderColor: LINE }}>
            {THEME_MODES.map((t, i) => (
              <SegButton key={t.id} label={t.label} active={theme === t.id} onPress={() => onThemeChange?.(t.id)} isFirst={i === 0} />
            ))}
          </View>
        </View>

        <View>
          <Text className="text-on-accent text-xs font-semibold tracking-[2px] uppercase mb-3" style={{ opacity: 0.74 }}>
            Color
          </Text>
          <View className="flex-row flex-wrap gap-2.5">
            {colorOptions.map((c) => {
              const active = color === c.id
              return (
                <Pressable
                  key={c.id}
                  onPress={() => onColorChange?.(c.id)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  className="rounded-full px-4 py-2"
                  style={active ? { backgroundColor: FILL } : { borderWidth: 1, borderColor: LINE }}
                >
                  <Text className="text-on-accent" style={{ fontSize: 15, opacity: active ? 1 : 0.74, fontWeight: active ? '700' : '400' }}>
                    {c.label}
                  </Text>
                </Pressable>
              )
            })}
          </View>
          {colorHint ? (
            <Text className="font-serif italic text-on-accent mt-3" style={{ fontSize: 13, opacity: 0.74 }}>
              {colorHint}
            </Text>
          ) : null}
        </View>

        <View>
          <Text className="text-on-accent text-xs font-semibold tracking-[2px] uppercase mb-3" style={{ opacity: 0.74 }}>
            Text size
          </Text>
          <View className="flex-row rounded-full overflow-hidden" style={{ borderWidth: 1, borderColor: LINE }}>
            {SIZE_STEPS.map((s, i) => (
              <SegButton
                key={s.id}
                label="A"
                active={size === s.id}
                onPress={() => onSizeChange?.(s.id)}
                isFirst={i === 0}
                serif
                glyphSize={s.glyphSize}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  )
}
