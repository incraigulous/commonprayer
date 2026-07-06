import { View, Text } from 'react-native'

export default function Wordmark() {
  return (
    <View className="items-center">
      <Text className="font-display text-gilt text-xl mb-1.5">✕</Text>
      <Text className="font-display font-semibold text-ink text-4xl leading-none">Common Prayer</Text>
      <View className="w-11 h-px bg-accent my-3.5" />
      <Text
        className="text-ink-muted text-xs uppercase pl-1"
        style={{ letterSpacing: 6.4 }}
      >
        Via Media
      </Text>
    </View>
  )
}
