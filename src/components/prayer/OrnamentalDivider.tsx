import { View, Text } from 'react-native'
import { useAppColorScheme } from '@/hooks/useAppColorScheme'

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
  const colorScheme = useAppColorScheme()
  const mark = GLYPHS[glyph]
  const rubricColor = colorScheme === 'dark' ? 'text-rubric-500' : 'text-rubric-600'
  const glyphColor = tone === 'rubric' ? rubricColor : 'text-gilt'

  return (
    <View
      className={['flex-row items-center gap-4 my-8', className ?? ''].filter(Boolean).join(' ')}
      accessibilityRole="none"
    >
      <View className="flex-1 h-px bg-border-strong" />
      {mark ? (
        <Text className={['font-display text-lg leading-none', glyphColor].join(' ')}>
          {mark}
        </Text>
      ) : null}
      <View className="flex-1 h-px bg-border-strong" />
    </View>
  )
}
