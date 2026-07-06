import { View, Text } from 'react-native'
import type { ResponsiveDoc } from '@/types'
import { useSettings } from '@/store/settings'

interface ResponsiveProps {
  doc: ResponsiveDoc
}

export default function Responsive({ doc }: ResponsiveProps) {
  const { settings } = useSettings()
  const showLabels = settings.officiantRole === 'priest'

  return (
    <View className="my-4 gap-2">
      {doc.value.map((line, i) => {
        const isResponse = line.label?.toLowerCase() === 'people' || line.bold
        return (
          <View key={i} className={showLabels ? 'flex-row gap-3 items-start' : ''}>
            {showLabels && (
              <Text
                className="font-sans text-xs uppercase tracking-caps text-accent leading-relaxed w-24 text-right"
              >
                {line.label ?? ''}
              </Text>
            )}
            <Text
              className={[
                'flex-1 font-serif leading-relaxed text-ink',
                isResponse ? 'font-semibold' : '',
              ].filter(Boolean).join(' ')}
            >
              {line.text}
            </Text>
          </View>
        )
      })}
    </View>
  )
}
