import { useMemo } from 'react'
import { View, Text, ScrollView, Pressable } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { getPsalmSections } from '@/liturgy/psalter'
import Icon from '@/components/ui/Icon'

export default function PsalmDetail() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { num } = useLocalSearchParams<{ num: string }>()
  const sections = useMemo(() => (num ? getPsalmSections(String(num)) : []), [num])

  return (
    <View className="flex-1 bg-bg">
      <View
        className="flex-row items-center gap-4 px-4 border-b border-border"
        style={{ paddingTop: insets.top + 16, paddingBottom: 16 }}
      >
        <Pressable onPress={() => router.push('/psalter')} hitSlop={8} className="p-2 -ml-2">
          <Icon name="chevron-left" size={20} className="text-accent" />
        </Pressable>
        <Text className="text-lg font-display font-semibold text-ink">Psalm {num}</Text>
      </View>

      <ScrollView className="px-4 py-6">
        {sections.length === 0 && (
          <View className="items-center py-8">
            <Text className="text-red-600">Could not find Psalm {num}.</Text>
          </View>
        )}

        {sections.map((section, si) => (
          <View key={si} className="mb-6">
            {section.localname ? (
              <Text className="text-ink-subtle italic text-sm mb-3">{section.localname}</Text>
            ) : null}
            {section.value.map((verse) => (
              <View key={verse.number} className="mb-3 flex-row gap-3">
                <Text className="text-ink-subtle text-sm w-6 text-right mt-0.5">{verse.number}</Text>
                <View className="flex-1">
                  <Text className="font-serif text-ink leading-relaxed">{verse.verse}</Text>
                  {verse.halfverse ? (
                    <Text className="font-serif text-ink leading-relaxed pl-4">{verse.halfverse}</Text>
                  ) : null}
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
