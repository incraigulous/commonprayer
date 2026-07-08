import { View, Text, Pressable } from 'react-native'
import Icon from '@/components/ui/Icon'
import type { IconName } from '@/components/ui/Icon'

export interface FloatingNavItem {
  id: string
  label: string
  icon: IconName
}

interface FloatingNavProps {
  items: FloatingNavItem[]
  active?: string
  onChange?: (id: string) => void
  /** @default 'glass' */
  variant?: 'glass' | 'solid'
}

// The app's floating pill tabs (Home · Office · Psalter · More): icon-over-
// label buttons in a rounded bar, meant to float over content rather than
// dock to the screen edge — NOT a persistent bottom tab bar. `glass` sits
// over full-bleed imagery; the ui-kit blurs it (backdrop-filter), but
// expo-blur isn't a dependency here, so this is a plain translucent dark
// fill instead (no blur). `solid` sits on a raised surface.
export default function FloatingNav({ items, active, onChange, variant = 'glass' }: FloatingNavProps) {
  return (
    <View
      className={[
        'flex-row rounded-full px-2.5 py-2 gap-0.5',
        variant === 'solid' ? 'bg-surface-raised border border-border' : '',
      ].filter(Boolean).join(' ')}
      style={variant === 'glass' ? { backgroundColor: 'rgba(14,18,32,0.72)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.14)' } : undefined}
    >
      {items.map((item) => {
        const isActive = item.id === active
        const color =
          variant === 'glass'
            ? isActive
              ? '#ffffff'
              : 'rgba(255,255,255,0.66)'
            : undefined
        return (
          <Pressable
            key={item.id}
            onPress={() => onChange?.(item.id)}
            className="flex-1 items-center gap-1 px-1 py-2"
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
          >
            <Icon
              name={item.icon}
              size={22}
              className={variant === 'solid' ? (isActive ? 'text-accent' : 'text-ink-subtle') : undefined}
              color={color}
            />
            <Text
              className={['font-sans text-[11px]', variant === 'solid' ? (isActive ? 'text-accent' : 'text-ink-subtle') : ''].filter(Boolean).join(' ')}
              style={color ? { color } : undefined}
            >
              {item.label}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}
