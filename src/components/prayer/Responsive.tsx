import { View, Text } from 'react-native'
import type { ResponsiveDoc } from '@/types'
import { useSettings } from '@/store/settings'
import { useFontScale } from '@/hooks/useFontScale'
import Callout from '@/components/prayer/Callout'

interface ResponsiveProps {
  doc: ResponsiveDoc
}

export default function Responsive({ doc }: ResponsiveProps) {
  const { settings } = useSettings()
  const showLabels = settings.officiantRole !== 'lay'
  const scale = useFontScale()

  if (doc.style === 'antiphon') {
    return (
      <Callout variant="refrain" title={doc.label ?? 'Antiphon'} className="my-4">
        {doc.value.map((line, i) => (
          <Text key={i} className="font-serif leading-relaxed text-ink" style={{ fontSize: 16 * scale }}>
            {line.text}
          </Text>
        ))}
      </Callout>
    )
  }

  return (
    <View className="my-4 gap-0.5">
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
              className={['flex-1 leading-relaxed text-ink', isResponse ? 'font-serif-bold' : 'font-serif'].join(' ')}
              style={{ fontSize: 16 * scale }}
            >
              {line.text}
            </Text>
          </View>
        )
      })}
    </View>
  )
}
