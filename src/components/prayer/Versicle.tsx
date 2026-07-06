import { View, Text } from 'react-native'
import { useFontScale } from '@/hooks/useFontScale'

interface VersiculeLine {
  by: string
  text: string
  response?: boolean
}

interface VersicleProps {
  lines: VersiculeLine[]
  className?: string
}

export default function Versicle({ lines, className }: VersicleProps) {
  const scale = useFontScale()

  return (
    <View className={['gap-2 my-4', className ?? ''].filter(Boolean).join(' ')}>
      {lines.map((ln, i) => (
        <View key={i} className="flex-row gap-3 items-baseline">
          <Text className="font-sans text-xs uppercase tracking-caps text-accent w-24 text-right leading-relaxed">
            {ln.by}
          </Text>
          <Text
            className={['flex-1 font-serif leading-relaxed text-ink', ln.response ? 'font-semibold' : ''].filter(Boolean).join(' ')}
            style={{ fontSize: 16 * scale }}
          >
            {ln.text}
          </Text>
        </View>
      ))}
    </View>
  )
}
