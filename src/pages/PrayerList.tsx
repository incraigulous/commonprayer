import { useState, useEffect } from 'react'
import { View, Text, Pressable, ScrollView, TextInput } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useUserData } from '@/store/userdata'
import Icon from '@/components/ui/Icon'

export default function PrayerList() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { prayerItems, loaded, load, addPrayerItem, removePrayerItem } = useUserData()
  const [text, setText] = useState('')
  const [adding, setAdding] = useState(false)

  useEffect(() => { load() }, [load])

  async function handleAdd() {
    const trimmed = text.trim()
    if (!trimmed) return
    try {
      await addPrayerItem(trimmed)
      setText('')
      setAdding(false)
    } catch {
      // keep form open so user can retry
    }
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
        <Text className="text-lg font-display font-semibold text-ink flex-1">Prayer List</Text>
        <Pressable onPress={() => setAdding(true)}>
          <Text className="text-accent font-medium">Add</Text>
        </Pressable>
      </View>

      <ScrollView className="px-4 py-6">
        <Text className="text-ink-muted text-sm mb-6">
          Your prayer intentions will appear during the Daily Office under Prayers &amp; Thanksgivings.
        </Text>

        {adding && (
          <View className="bg-surface rounded-xl p-4 mb-4">
            <TextInput
              autoFocus
              value={text}
              onChangeText={setText}
              placeholder="Enter a prayer intention..."
              placeholderTextColor="#9a8f77"
              className="text-ink text-base"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
            <View className="flex-row gap-3 mt-3 justify-end">
              <Pressable onPress={() => { setAdding(false); setText('') }} className="px-4 py-2">
                <Text className="text-ink-muted">Cancel</Text>
              </Pressable>
              <Pressable
                onPress={handleAdd}
                disabled={!text.trim()}
                className={['bg-accent px-4 py-2 rounded-lg', !text.trim() ? 'opacity-40' : ''].filter(Boolean).join(' ')}
              >
                <Text className="text-white font-medium">Add</Text>
              </Pressable>
            </View>
          </View>
        )}

        {!loaded && (
          <View className="items-center py-8">
            <Text className="text-ink-subtle">Loading…</Text>
          </View>
        )}

        {loaded && prayerItems.length === 0 && !adding && (
          <View className="items-center py-12">
            <Text className="text-ink-subtle">No prayer intentions yet.</Text>
            <Pressable onPress={() => setAdding(true)} className="mt-4">
              <Text className="text-accent">Add one</Text>
            </Pressable>
          </View>
        )}

        <View className="gap-2">
          {prayerItems.map((item) => (
            <View key={item.id} className="flex-row items-start gap-3 bg-surface rounded-xl px-4 py-3">
              <Text className="flex-1 text-ink">{item.text}</Text>
              <Pressable onPress={() => removePrayerItem(item.id)} hitSlop={8}>
                <Text className="text-ink-subtle text-lg leading-none mt-0.5">×</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}
