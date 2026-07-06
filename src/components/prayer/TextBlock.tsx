import { View, Text } from 'react-native'
import type { TextDoc } from '@/types'
import { useSettings } from '@/store/settings'
import { englishTitle, traditionalTitle } from '@/liturgy/canticle-titles'
import IlluminatedInitial from '@/components/prayer/IlluminatedInitial'

interface TextBlockProps {
  doc: TextDoc
}

export default function TextBlock({ doc }: TextBlockProps) {
  const { style, value, response, dropCap, label } = doc
  const { settings } = useSettings()
  const title = label && (settings.officiantRole === 'lay' ? englishTitle(label) : traditionalTitle(label))

  const containerClass = (() => {
    switch (style) {
      case 'collect': return 'pl-6 pr-2'
      case 'canticle': return ''
      default: return ''
    }
  })()

  const paragraphClass = 'text-ink leading-relaxed mb-2 font-serif text-base'

  return (
    <View className={['my-4', containerClass].filter(Boolean).join(' ')}>
      {style === 'canticle' && title && (
        <Text className="font-display font-semibold text-lg text-ink mb-2">{title}</Text>
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
          <Text key={i} className={paragraphClass}>
            {paragraph}
          </Text>
        )
      })}

      {response && (
        <Text className={`${paragraphClass} font-bold mt-1`}>{response}</Text>
      )}
    </View>
  )
}
