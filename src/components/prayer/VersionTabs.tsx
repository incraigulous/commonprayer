import { View, Text, Pressable, ScrollView } from 'react-native'
import type { OptionDoc } from '@/types'

interface VersionTabsProps {
  doc: OptionDoc
  onSelect: (idx: number) => void
}

export default function VersionTabs({ doc, onSelect }: VersionTabsProps) {
  const labels = doc.metadata.label ?? doc.value.map((_, i) => `Option ${i + 1}`)
  const selected = doc.metadata.selected ?? 0

  if (labels.length <= 1) return null

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mb-3"
    >
      <View className="flex-row gap-1 flex-wrap">
        {labels.map((label, i) => {
          const isActive = i === selected
          return (
            <Pressable
              key={i}
              onPress={() => onSelect(i)}
              className={[
                'px-3 py-1 rounded-full',
                isActive ? 'bg-accent' : 'bg-surface-hover',
              ].join(' ')}
            >
              <Text className={['text-xs font-medium', isActive ? 'text-on-accent' : 'text-ink-muted'].join(' ')}>
                {label}
              </Text>
            </Pressable>
          )
        })}
      </View>
    </ScrollView>
  )
}
