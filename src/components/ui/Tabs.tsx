import { View, Text, Pressable, ScrollView } from 'react-native'

export interface TabItem {
  id: string
  label: string
}

interface TabsProps {
  items: TabItem[]
  value?: string
  onChange?: (id: string) => void
  className?: string
}

// The in-office step tabs (Opening · Psalm · Scripture …): a horizontal-
// scrolling row, each active tab carrying its own accent underline.
// Matches ui-kit's Tabs.jsx — there is no bottom-bar variant.
export default function Tabs({ items, value, onChange, className }: TabsProps) {
  const active = value ?? items[0]?.id

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className={className}
    >
      <View className="flex-row gap-5 px-1">
        {items.map((item) => {
          const isActive = item.id === active
          return (
            <Pressable
              key={item.id}
              onPress={() => onChange?.(item.id)}
              className={['pb-3 border-b-2', isActive ? 'border-accent' : 'border-transparent'].join(' ')}
            >
              <Text className={['font-sans text-sm font-semibold', isActive ? 'text-accent' : 'text-ink-subtle'].join(' ')}>
                {item.label}
              </Text>
            </Pressable>
          )
        })}
      </View>
    </ScrollView>
  )
}
