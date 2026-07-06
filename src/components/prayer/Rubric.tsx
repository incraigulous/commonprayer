import { View, Text } from 'react-native'
import { useSettings } from '@/store/settings'

interface RubricProps {
  value: string[]
}

export default function Rubric({ value }: RubricProps) {
  const { settings } = useSettings()

  if (settings.officiantRole === 'lay') return null

  return (
    <View className="my-3 gap-1">
      {value.map((paragraph, i) => (
        <Text
          key={i}
          className="font-serif text-accent italic text-sm leading-relaxed"
        >
          {paragraph}
        </Text>
      ))}
    </View>
  )
}
