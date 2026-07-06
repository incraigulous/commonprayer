import { useState, useEffect } from 'react'
import { View, Text, Pressable, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from '@/components/ui/Icon'

interface Prayer {
  category: string
  title: string
  text: string[]
}

interface PrayersData {
  prayers: Prayer[]
}

export default function PrayersThanksgivings() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const [data, setData] = useState<PrayersData | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [category, setCategory] = useState<string>('All')

  useEffect(() => {
    import('@/content/prayers-thanksgivings.json').then((m) => {
      setData(m.default as PrayersData)
    })
  }, [])

  const categories = data
    ? ['All', ...Array.from(new Set(data.prayers.map((p) => p.category)))]
    : []

  const filtered = data?.prayers.filter((p) => category === 'All' || p.category === category) ?? []

  return (
    <View className="flex-1 bg-bg">
      <View
        className="flex-row items-center gap-4 px-4 border-b border-border"
        style={{ paddingTop: insets.top + 16, paddingBottom: 16 }}
      >
        <Pressable onPress={() => router.back()} hitSlop={8} className="p-2 -ml-2">
          <Icon name="chevron-left" size={20} className="text-accent" />
        </Pressable>
        <Text className="text-lg font-display font-semibold text-ink">Prayers &amp; Thanksgivings</Text>
      </View>

      {categories.length > 1 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="border-b border-border"
          contentContainerStyle={{ flexDirection: 'row', gap: 8, paddingHorizontal: 16, paddingVertical: 12 }}
        >
          {categories.map((c) => (
            <Pressable
              key={c}
              onPress={() => setCategory(c)}
              className={[
                'px-3 py-1.5 rounded-full',
                c === category ? 'bg-accent' : 'bg-surface-hover',
              ].join(' ')}
            >
              <Text className={['text-sm font-medium', c === category ? 'text-white' : 'text-ink-muted'].join(' ')}>
                {c}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      )}

      <ScrollView className="px-4 py-4">
        {!data && (
          <View className="items-center py-8">
            <Text className="text-ink-subtle">Loading…</Text>
          </View>
        )}
        <View className="gap-2">
          {filtered.map((prayer, i) => (
            <View key={i} className="bg-surface rounded-xl overflow-hidden">
              <Pressable
                onPress={() => setExpanded(expanded === `${i}` ? null : `${i}`)}
                className="px-4 py-4 flex-row items-center justify-between"
              >
                <Text className="text-ink font-medium flex-1 pr-2">{prayer.title}</Text>
                <Text className="text-ink-subtle text-lg">{expanded === `${i}` ? '−' : '+'}</Text>
              </Pressable>
              {expanded === `${i}` && (
                <View className="px-4 pb-4 border-t border-border pt-3 gap-3">
                  {prayer.text.map((para, pi) => (
                    <Text key={pi} className="font-serif text-ink leading-relaxed">
                      {para}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}
