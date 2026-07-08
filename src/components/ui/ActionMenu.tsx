import { useState } from 'react'
import { Pressable, View } from 'react-native'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import Icon from '@/components/ui/Icon'
import type { IconName } from '@/components/ui/Icon'

export interface ActionMenuItem {
  icon: IconName
  label: string
  onPress?: () => void
}

interface ActionMenuProps {
  items: ActionMenuItem[]
  /** Icon shown in the main button. @default 'plus' */
  mainIcon?: IconName
  mainLabel?: string
}

function Item({ item, open }: { item: ActionMenuItem; open: boolean }) {
  const style = useAnimatedStyle(() => ({
    opacity: withTiming(open ? 1 : 0, { duration: 180 }),
    transform: [
      { translateY: withTiming(open ? 0 : 14, { duration: 220 }) },
      { scale: withTiming(open ? 1 : 0.7, { duration: 220 }) },
    ],
  }))

  return (
    <Animated.View style={style} pointerEvents={open ? 'auto' : 'none'}>
      <Pressable
        onPress={() => item.onPress?.()}
        accessibilityRole="button"
        accessibilityLabel={item.label}
        className="w-[46px] h-[46px] rounded-full bg-surface-raised items-center justify-center"
        style={{ shadowColor: '#000', shadowOpacity: 0.32, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 4 }}
      >
        <Icon name={item.icon} size={18} className="text-ink" />
      </Pressable>
    </Animated.View>
  )
}

// A floating action button that expands into a short stack of icon items —
// used for quick actions over an office reading (Share / Note / Remind).
// Self-managed open state. Inline by default — position it yourself (e.g.
// absolutely, inset from a corner) to float it over a screen.
export default function ActionMenu({ items, mainIcon = 'plus', mainLabel = 'Actions' }: ActionMenuProps) {
  const [open, setOpen] = useState(false)

  const mainStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: withTiming(open ? '45deg' : '0deg', { duration: 250 }) }],
  }))

  return (
    <View className="items-center gap-3">
      {[...items].reverse().map((item) => (
        <Item key={item.label} item={item} open={open} />
      ))}
      <Animated.View style={mainStyle}>
        <Pressable
          onPress={() => setOpen((o) => !o)}
          accessibilityRole="button"
          accessibilityLabel={mainLabel}
          accessibilityState={{ expanded: open }}
          className="w-14 h-14 rounded-full bg-accent items-center justify-center"
          style={{ shadowColor: '#000', shadowOpacity: 0.4, shadowRadius: 14, shadowOffset: { width: 0, height: 6 }, elevation: 6 }}
        >
          <Icon name={mainIcon} size={24} className="text-on-accent" />
        </Pressable>
      </Animated.View>
    </View>
  )
}
