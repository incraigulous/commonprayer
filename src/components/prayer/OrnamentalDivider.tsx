import { View, Text } from 'react-native'

type Glyph = 'cross' | 'latin' | 'fleuron' | 'diamond' | 'asterism' | 'none'
type Tone = 'gilt' | 'rubric'

const GLYPHS: Record<Glyph, string> = {
  cross: '✠',
  latin: '†',
  fleuron: '❦',
  diamond: '❖',
  asterism: '⁂',
  none: '',
}

interface OrnamentalDividerProps {
  glyph?: Glyph
  tone?: Tone
  className?: string
}

export default function OrnamentalDivider({
  glyph = 'cross',
  tone = 'gilt',
  className,
}: OrnamentalDividerProps) {
  const mark = GLYPHS[glyph]
  const glyphColor = tone === 'rubric' ? 'text-accent' : 'text-gilt'
  // 'none' dims the rule to a plain hairline instead of the stronger border.
  const lineColor = glyph === 'none' ? 'bg-hairline' : 'bg-border-strong'

  return (
    <View
      className={['flex-row items-center gap-4 my-8', className ?? ''].filter(Boolean).join(' ')}
      accessibilityRole="none"
    >
      <View className={['flex-1 h-px', lineColor].join(' ')} />
      {mark ? (
        <Text className={['font-display text-lg leading-none', glyphColor].join(' ')}>
          {mark}
        </Text>
      ) : null}
      <View className={['flex-1 h-px', lineColor].join(' ')} />
    </View>
  )
}
