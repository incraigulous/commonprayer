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
  const showLabels = settings.officiantRole === 'priest'
  const scale = useFontScale()

  const lines = doc.value.map((line, i) => {
    const isResponse = line.label?.toLowerCase() === 'people' || line.bold
    return (
      <View key={i} className={showLabels ? 'flex-row gap-3 items-start' : ''}>
        {showLabels && (
          <Text className="font-sans text-xs uppercase tracking-caps text-accent leading-relaxed w-24 text-right">
            {line.label ?? ''}
          </Text>
        )}
        <Text
          className={['flex-1 font-serif leading-relaxed text-ink', isResponse ? 'font-semibold' : ''].filter(Boolean).join(' ')}
          style={{ fontSize: 16 * scale }}
        >
          {line.text}
        </Text>
      </View>
    )
  })

  // A responsive-style antiphon (officiant/people, as opposed to TextBlock's
  // plain-verse antiphons) — no content uses this today, but it's a declared
  // style, so it gets the same featured treatment as everywhere else an
  // antiphon appears, rather than silently rendering as an undifferentiated
  // responsive dialogue.
  if (doc.style === 'antiphon') {
    return (
      <Callout variant="refrain" title="Antiphon" className="my-4">
        <View className="gap-2">{lines}</View>
      </Callout>
    )
  }

  return <View className="my-4 gap-2">{lines}</View>
}
