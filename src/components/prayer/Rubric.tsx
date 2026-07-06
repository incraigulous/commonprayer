import { View, Text } from 'react-native'
import { useSettings } from '@/store/settings'
import { useAppColorScheme } from '@/hooks/useAppColorScheme'
import { useFontScale } from '@/hooks/useFontScale'

interface RubricProps {
  value: string[]
}

// Rubric red is fixed and never follows the seasonal accent — per the
// design system's own rule, red is for instruction, never the words you pray.
export default function Rubric({ value }: RubricProps) {
  const { settings } = useSettings()
  const colorScheme = useAppColorScheme()
  const scale = useFontScale()
  const rubricColor = colorScheme === 'dark' ? 'text-rubric-500' : 'text-rubric-600'

  if (settings.officiantRole === 'lay') return null
  // Deacons see rubrics like a priest would, even though they use the
  // lay/deacon reconciliation prayer in place of the priestly Absolution.

  return (
    <View className="my-3 gap-1">
      {value.map((paragraph, i) => (
        <Text
          key={i}
          className={`font-serif ${rubricColor} italic leading-relaxed`}
          style={{ fontSize: 14 * scale }}
        >
          {paragraph}
        </Text>
      ))}
    </View>
  )
}
