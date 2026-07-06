import { View, Text } from 'react-native'
import type { ReactNode } from 'react'

type BadgeVariant = 'default' | 'rubric' | 'gilt' | 'sage' | 'violet' | 'solid'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  default: 'border-border-strong',
  rubric: 'bg-rubric-500/10 border-rubric-500',
  gilt: 'border-gold-500',
  sage: 'border-sage',
  violet: 'border-violet',
  solid: 'bg-accent border-accent',
}

const TEXT_CLASSES: Record<BadgeVariant, string> = {
  default: 'text-ink-muted',
  rubric: 'text-rubric-500',
  gilt: 'text-gold-300',
  sage: 'text-sage',
  violet: 'text-violet',
  solid: 'text-on-accent',
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <View
      className={[
        'flex-row items-center self-start',
        'px-2 py-0.5 rounded-full border',
        VARIANT_CLASSES[variant],
        className ?? '',
      ].filter(Boolean).join(' ')}
    >
      <Text
        className={[
          'font-sans text-xs font-semibold tracking-caps uppercase',
          TEXT_CLASSES[variant],
        ].join(' ')}
      >
        {String(children)}
      </Text>
    </View>
  )
}
