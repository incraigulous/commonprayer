import { View, Text } from 'react-native'
import type { TextDoc } from '@/types'
import { useSettings } from '@/store/settings'
import { useFontScale } from '@/hooks/useFontScale'
import { englishTitle, traditionalTitle } from '@/liturgy/canticle-titles'
import IlluminatedInitial from '@/components/prayer/IlluminatedInitial'

interface TextBlockProps {
  doc: TextDoc
}

export default function TextBlock({ doc }: TextBlockProps) {
  const { style, value, response, dropCap, label } = doc
  const { settings } = useSettings()
  const scale = useFontScale()
  const title = label && (settings.officiantRole === 'lay' ? englishTitle(label) : traditionalTitle(label))

  const containerClass = (() => {
    switch (style) {
      case 'canticle': return ''
      default: return ''
    }
  })()

  const paragraphClass = 'text-ink leading-relaxed mb-2 font-serif'
  const paragraphStyle = { fontSize: 16 * scale }

  return (
    <View className={['my-4', containerClass].filter(Boolean).join(' ')}>
      {style === 'canticle' && title && (
        <Text className="font-display font-semibold text-ink mb-2" style={{ fontSize: 18 * scale }}>{title}</Text>
      )}

      {value.map((paragraph, i) => {
        const isFirst = i === 0
        const showDropCap = dropCap && isFirst

        if (showDropCap) {
          const [firstChar, ...rest] = paragraph
          return (
            <IlluminatedInitial key={i} letter={firstChar ?? ''} className={paragraphClass}>
              {rest.join('')}
            </IlluminatedInitial>
          )
        }

        return (
          <Text key={i} className={paragraphClass} style={paragraphStyle}>
            {paragraph}
          </Text>
        )
      })}

      {response && (
        <Text className={`${paragraphClass} font-bold mt-1`} style={paragraphStyle}>{response}</Text>
      )}
    </View>
  )
}
