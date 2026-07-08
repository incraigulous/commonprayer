import { View, Text } from 'react-native'
import { useFontScale } from '@/hooks/useFontScale'

type RubricVariant = 'default' | 'sm' | 'heading'

interface RubricProps {
  value: string[]
  variant?: RubricVariant
  center?: boolean
}

// The rubric — the red-letter instruction to the worshipper. Presentational
// only: colour follows the live --accent (which the ui-kit's own brand-rubric
// card confirms is *not* a fixed hex — rubric red is simply --accent's
// un-seasoned default; it recolors with the season like everything else).
// Deciding *whether* to show rubrics (the lay-officiant policy) is the
// caller's job, not this component's — see LiturgicalDocument.tsx.
export default function Rubric({ value, variant = 'default', center = false }: RubricProps) {
  const scale = useFontScale()

  if (variant === 'heading') {
    return (
      <View className={['gap-1', center ? 'items-center' : ''].filter(Boolean).join(' ')}>
        {value.map((paragraph, i) => (
          <Text key={i} className="font-sans text-xs font-semibold uppercase tracking-caps text-accent">
            {paragraph}
          </Text>
        ))}
      </View>
    )
  }

  const baseSize = variant === 'sm' ? 13 : 14

  return (
    <View className={['my-3 gap-1', center ? 'items-center' : ''].filter(Boolean).join(' ')}>
      {value.map((paragraph, i) => (
        <Text
          key={i}
          className={['font-serif text-accent italic leading-relaxed', center ? 'text-center' : ''].filter(Boolean).join(' ')}
          style={{ fontSize: baseSize * scale }}
        >
          {paragraph}
        </Text>
      ))}
    </View>
  )
}
