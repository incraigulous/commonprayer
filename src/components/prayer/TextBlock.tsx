import { View, Text } from 'react-native'
import type { TextDoc } from '@/types'
import { useFontScale } from '@/hooks/useFontScale'
import IlluminatedInitial from '@/components/prayer/IlluminatedInitial'

interface TextBlockProps {
  doc: TextDoc
}

// Splits on a trailing "Amen." (with or without preceding whitespace) so it
// can be rendered bold while the rest of the sentence stays regular weight.
function withBoldAmen(text: string): [string, string] {
  const match = text.match(/^(.*?)(\s*Amen\.?)$/s)
  if (!match) return [text, '']
  return [match[1], match[2]]
}

export default function TextBlock({ doc }: TextBlockProps) {
  const { style, value, response, dropCap, label } = doc
  const scale = useFontScale()

  const paragraphClass = 'text-ink leading-relaxed mb-2 font-serif'
  const paragraphStyle = { fontSize: 16 * scale }

  return (
    <View className="my-4">
      {style === 'canticle' && label && (
        <Text className="font-display font-semibold text-ink mb-2" style={{ fontSize: 18 * scale }}>{label}</Text>
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

        const [rest, amen] = withBoldAmen(paragraph)
        return (
          <Text key={i} className={paragraphClass} style={paragraphStyle}>
            {rest}
            {amen && <Text className="font-serif-bold">{amen}</Text>}
          </Text>
        )
      })}

      {response && (() => {
        const [rest, amen] = withBoldAmen(response)
        return (
          <Text className="text-ink leading-relaxed mb-2 font-serif-bold mt-1" style={paragraphStyle}>
            {rest}
            {amen}
          </Text>
        )
      })()}
    </View>
  )
}
