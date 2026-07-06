import { View, Text, Pressable, ScrollView } from 'react-native'
import type { ReactNode } from 'react'

export interface TabItem {
  id: string
  label: string
  icon?: ReactNode
}

type TabsVariant = 'underline' | 'bar'

interface TabsProps {
  items: TabItem[]
  value?: string
  onChange?: (id: string) => void
  variant?: TabsVariant
  className?: string
}

export default function Tabs({ items, value, onChange, variant = 'underline', className }: TabsProps) {
  const active = value ?? items[0]?.id

  if (variant === 'bar') {
    return (
      <View className={['flex-row bg-surface border-t border-border', className ?? ''].filter(Boolean).join(' ')}>
        {items.map((item) => {
          const isActive = item.id === active
          return (
            <Pressable
              key={item.id}
              onPress={() => onChange?.(item.id)}
              className={[
                'flex-1 items-center justify-center py-2.5 gap-1',
                'border-t-2',
                isActive ? 'border-accent' : 'border-transparent',
              ].join(' ')}
            >
              {item.icon}
              <Text className={['font-sans text-xs tracking-wide', isActive ? 'text-ink' : 'text-ink-muted'].join(' ')}>
                {item.label}
              </Text>
            </Pressable>
          )
        })}
      </View>
    )
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className={['border-b border-border', className ?? ''].filter(Boolean).join(' ')}
    >
      <View className="flex-row gap-5 px-1">
        {items.map((item) => {
          const isActive = item.id === active
          return (
            <Pressable
              key={item.id}
              onPress={() => onChange?.(item.id)}
              className={[
                'pb-3 border-b-2',
                isActive ? 'border-accent' : 'border-transparent',
              ].join(' ')}
            >
              <Text className={['font-display text-lg', isActive ? 'text-ink' : 'text-ink-muted'].join(' ')}>
                {item.label}
              </Text>
            </Pressable>
          )
        })}
      </View>
    </ScrollView>
  )
}
