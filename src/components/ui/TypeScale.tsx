import { View, Pressable, Text } from 'react-native'
import type { FontSizePreference } from '@/types'

interface TypeScaleProps {
  value: FontSizePreference
  onChange: (value: FontSizePreference) => void
  invert?: boolean
  className?: string
}

const STEPS: { value: FontSizePreference; label: string; glyphSize: number }[] = [
  { value: 'small', label: 'Small', glyphSize: 14.4 },
  { value: 'default', label: 'Regular', glyphSize: 17.6 },
  { value: 'large', label: 'Large', glyphSize: 21.6 },
  { value: 'x-large', label: 'Extra large', glyphSize: 27.2 },
]

// A pill-shaped 4-step "A A A A" reading-size control, matching the
// ui-kit's TypeScale. `invert` flips it for use on a solid accent field.
export default function TypeScale({ value, onChange, invert, className }: TypeScaleProps) {
  return (
    <View
      role="radiogroup"
      accessibilityLabel="Reading text size"
      className={[
        'flex-row rounded-full border overflow-hidden',
        invert ? 'border-on-accent bg-black/10' : 'border-border-strong bg-surface',
        className ?? '',
      ].filter(Boolean).join(' ')}
    >
      {STEPS.map((step, i) => {
        const selected = value === step.value
        return (
          <Pressable
            key={step.value}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            accessibilityLabel={step.label}
            onPress={() => onChange(step.value)}
            className={[
              'flex-1 items-center justify-center py-2',
              i > 0 ? (invert ? 'border-l border-on-accent' : 'border-l border-border') : '',
              selected ? 'bg-accent' : '',
            ].filter(Boolean).join(' ')}
          >
            <Text
              className={[
                'font-serif leading-none',
                selected ? 'text-on-accent' : invert ? 'text-on-accent' : 'text-ink-muted',
              ].join(' ')}
              style={{ fontSize: step.glyphSize, opacity: selected ? 1 : invert ? 0.72 : 1 }}
            >
              A
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}
