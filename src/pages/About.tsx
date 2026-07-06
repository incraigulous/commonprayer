import { View, Text, Pressable, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from '@/components/ui/Icon'

export default function About() {
  const router = useRouter()
  const insets = useSafeAreaInsets()

  return (
    <View className="flex-1 bg-bg">
      <View
        className="flex-row items-center gap-4 px-4 border-b border-border"
        style={{ paddingTop: insets.top + 16, paddingBottom: 16 }}
      >
        <Pressable onPress={() => router.back()} hitSlop={8} className="p-2 -ml-2">
          <Icon name="chevron-left" size={20} className="text-accent" />
        </Pressable>
        <Text className="text-lg font-display font-semibold text-ink">About</Text>
      </View>

      <ScrollView className="px-6 py-8">
        <Text className="text-2xl font-display text-ink mb-1">Via Media</Text>
        <Text className="text-ink-muted text-sm mb-6">Daily prayer from the 1979 Book of Common Prayer</Text>

        <View className="gap-4">
          <Text className="font-serif text-ink leading-relaxed">
            Via Media ("the middle way") is a nonprofit organization dedicated to making the rich tradition of Anglican daily prayer accessible to all Christians.
          </Text>
          <Text className="font-serif text-ink leading-relaxed">
            This app provides the Daily Office from the 1979 Book of Common Prayer — Morning Prayer, Noonday Prayer, Evening Prayer, and Compline — along with the Psalter and lectionary readings.
          </Text>
          <Text className="font-serif text-ink leading-relaxed">
            The Book of Common Prayer (1979) is in the public domain and is the primary prayer book of The Episcopal Church.
          </Text>
        </View>

        <View className="mt-8 pt-6 border-t border-border">
          <Text className="text-ink-subtle text-xs text-center">
            Via Media · Version 0.1.0
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}
