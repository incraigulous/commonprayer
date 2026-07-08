import { View, Text, Pressable, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { getDefaultOffice } from '@/liturgy/calendar'
import Icon from '@/components/ui/Icon'
import FloatingNav from '@/components/layout/FloatingNav'

const PSALM_GROUPS = [
  { label: 'Book I', range: [1, 41] },
  { label: 'Book II', range: [42, 72] },
  { label: 'Book III', range: [73, 89] },
  { label: 'Book IV', range: [90, 106] },
  { label: 'Book V', range: [107, 150] },
]

const NAV_ITEMS: { id: string; label: string; icon: 'home' | 'book-open' | 'book' | 'menu' }[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'office', label: 'Office', icon: 'book-open' },
  { id: 'psalter', label: 'Psalter', icon: 'book' },
  { id: 'more', label: 'More', icon: 'menu' },
]

export default function Psalter() {
  const router = useRouter()
  const insets = useSafeAreaInsets()

  const onNavigate = (id: string) => {
    if (id === 'psalter') return
    if (id === 'home') router.push('/')
    else if (id === 'more') router.push('/more')
    else if (id === 'office') router.push(`/${getDefaultOffice(new Date())}`)
  }

  return (
    <View className="flex-1 bg-bg">
      <View
        className="flex-row items-center gap-4 px-4 border-b border-border"
        style={{ paddingTop: insets.top + 16, paddingBottom: 16 }}
      >
        <Pressable onPress={() => router.back()} hitSlop={8} className="p-2 -ml-2">
          <Icon name="chevron-left" size={20} className="text-accent" />
        </Pressable>
        <Text className="text-lg font-display font-semibold text-ink">Psalter</Text>
      </View>

      <ScrollView className="px-4 py-4" contentContainerStyle={{ paddingBottom: insets.bottom + 88 }}>
        {PSALM_GROUPS.map((group) => (
          <View key={group.label} className="mb-6">
            <Text className="text-xs uppercase tracking-caps text-ink-subtle mb-3 px-1">{group.label}</Text>
            <View className="flex-row flex-wrap gap-2">
              {Array.from(
                { length: group.range[1] - group.range[0] + 1 },
                (_, i) => i + group.range[0]
              ).map((num) => (
                <Pressable
                  key={num}
                  onPress={() => router.push(`/psalter/${num}`)}
                  className="bg-surface rounded-lg py-3 items-center justify-center"
                  style={{ width: '18%' }}
                >
                  <Text className="text-ink font-medium">{num}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={{ position: 'absolute', left: 0, right: 0, bottom: insets.bottom + 16, alignItems: 'center' }}>
        <FloatingNav variant="solid" items={NAV_ITEMS} active="psalter" onChange={onNavigate} />
      </View>
    </View>
  )
}
