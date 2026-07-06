import { useEffect } from 'react'
import { View, Text, Pressable, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useUserData } from '@/store/userdata'
import Icon from '@/components/ui/Icon'

export default function Favorites() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { favorites, loaded, load, removeFavorite } = useUserData()

  useEffect(() => { load() }, [load])

  return (
    <View className="flex-1 bg-bg">
      <View
        className="flex-row items-center gap-4 px-4 border-b border-border"
        style={{ paddingTop: insets.top + 16, paddingBottom: 16 }}
      >
        <Pressable onPress={() => router.back()} hitSlop={8} className="p-2 -ml-2">
          <Icon name="chevron-left" size={20} className="text-accent" />
        </Pressable>
        <Text className="text-lg font-display font-semibold text-ink">Favorites</Text>
      </View>

      <ScrollView className="px-4 py-6">
        {!loaded && (
          <View className="items-center py-8">
            <Text className="text-ink-subtle">Loading…</Text>
          </View>
        )}

        {loaded && favorites.length === 0 && (
          <View className="items-center py-12">
            <Text className="text-ink-subtle">No favorites yet.</Text>
            <Text className="text-ink-subtle text-sm mt-2">
              Long-press any prayer text to save it here.
            </Text>
          </View>
        )}

        <View className="gap-3">
          {favorites.map((fav) => (
            <View key={fav.id} className="bg-surface rounded-xl px-4 py-4">
              <Text className="text-xs text-ink-subtle uppercase tracking-caps mb-1">{fav.liturgy}</Text>
              <Text className="text-ink font-serif leading-relaxed">{fav.text}</Text>
              <Pressable onPress={() => removeFavorite(fav.id)} hitSlop={8} className="mt-2 self-start">
                <Text className="text-xs text-ink-subtle">Remove</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}
