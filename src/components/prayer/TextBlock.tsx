import { View, Text } from 'react-native'
import type { TextDoc } from '@/types'
import { useSettings } from '@/store/settings'
import { useFontScale } from '@/hooks/useFontScale'
import { englishTitle, traditionalTitle } from '@/liturgy/canticle-titles'
import IlluminatedInitial from '@/components/prayer/IlluminatedInitial'
import Callout from '@/components/prayer/Callout'

interface TextBlockProps {
  doc: TextDoc
}

export default function TextBlock({ doc }: TextBlockProps) {
  const { style, value, response, dropCap, label } = doc
  const { settings } = useSettings()
  const scale = useFontScale()
  const title = label && (settings.officiantRole === 'lay' ? englishTitle(label) : traditionalTitle(label))

  const paragraphClass = 'text-ink leading-relaxed mb-2 font-serif'
  const paragraphStyle = { fontSize: 16 * scale }

  const paragraphs = value.map((paragraph, i) => {
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
  })

  const responseNode = response && (
    <Text className={`${paragraphClass} font-bold mt-1`} style={paragraphStyle}>{response}</Text>
  )

  // "The Blessing" — the office's closing benediction — and antiphons (a
  // refrain framing a psalm/canticle, sung before and after it) are featured
  // liturgical moments, not routine body text: set apart in Callout, same as
  // the ui-kit's own DailyOffice template and Callout story examples.
  if (style === 'blessing') {
    return (
      <Callout variant="blessing" title="The Blessing" className="my-4">
        {paragraphs}
        {responseNode}
      </Callout>
    )
  }

  if (style === 'antiphon') {
    return (
      <Callout variant="refrain" title="Antiphon" className="my-4">
        {paragraphs}
        {responseNode}
      </Callout>
    )
  }

  return (
    <View className="my-4">
      {style === 'canticle' && title && (
        <Text className="font-display font-semibold text-ink mb-2" style={{ fontSize: 18 * scale }}>{title}</Text>
      )}
      {paragraphs}
      {responseNode}
    </View>
  )
}
