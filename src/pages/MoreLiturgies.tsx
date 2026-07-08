import { View, Text, Pressable, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { getDefaultOffice } from '@/liturgy/calendar'
import Icon from '@/components/ui/Icon'
import FloatingNav from '@/components/layout/FloatingNav'

const LITURGIES = [
  { key: 'compline', label: 'Compline', description: 'The office at the close of day' },
  { key: 'penitential', label: 'A Penitential Order', description: 'BCP pp. 319–321', comingSoon: true },
  { key: 'eucharist', label: 'Holy Eucharist', description: 'BCP pp. 322–395', comingSoon: true },
  { key: 'marriage', label: 'Celebration and Blessing of a Marriage', description: 'BCP pp. 422–432', comingSoon: true },
  { key: 'burial', label: 'Burial of the Dead', description: 'BCP pp. 469–507', comingSoon: true },
  { key: 'ministration', label: 'Ministration to the Sick', description: 'BCP pp. 453–461', comingSoon: true },
]

const NAV_ITEMS: { id: string; label: string; icon: 'home' | 'book-open' | 'book' | 'menu' }[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'office', label: 'Office', icon: 'book-open' },
  { id: 'psalter', label: 'Psalter', icon: 'book' },
  { id: 'more', label: 'More', icon: 'menu' },
]

export default function MoreLiturgies() {
  const router = useRouter()
  const insets = useSafeAreaInsets()

  const onNavigate = (id: string) => {
    if (id === 'more') return
    if (id === 'home') router.push('/')
    else if (id === 'psalter') router.push('/psalter')
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
        <Text className="text-lg font-display font-semibold text-ink">Other Liturgies</Text>
      </View>

      <ScrollView className="px-4 py-4" contentContainerStyle={{ paddingBottom: insets.bottom + 88 }}>
        <View className="gap-2">
          {LITURGIES.map((l) => (
            <Pressable
              key={l.key}
              disabled={!!l.comingSoon}
              onPress={() => { if (!l.comingSoon) router.push('/compline') }}
              className={['bg-surface rounded-xl px-4 py-4', l.comingSoon ? 'opacity-50' : ''].filter(Boolean).join(' ')}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1 pr-3">
                  <Text className="text-ink font-medium">{l.label}</Text>
                  <Text className="text-sm text-ink-subtle mt-0.5">{l.description}</Text>
                </View>
                {l.comingSoon ? (
                  <View className="bg-surface-hover rounded-full px-2 py-0.5">
                    <Text className="text-xs text-ink-muted">Soon</Text>
                  </View>
                ) : (
                  <Icon name="chevron-right" size={18} className="text-ink-subtle" />
                )}
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <View style={{ position: 'absolute', left: 0, right: 0, bottom: insets.bottom + 16, alignItems: 'center' }}>
        <FloatingNav variant="solid" items={NAV_ITEMS} active="more" onChange={onNavigate} />
      </View>
    </View>
  )
}
