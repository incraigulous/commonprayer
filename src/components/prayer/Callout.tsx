import { View, Text } from 'react-native'
import type { ReactNode } from 'react'

type CalloutVariant = 'note' | 'prayer' | 'blessing' | 'refrain'

const GLYPHS: Record<CalloutVariant, string> = {
  prayer: '✟',
  blessing: '✠',
  note: '✵',
  refrain: '❧',
}

interface CalloutProps {
  children: ReactNode
  variant?: CalloutVariant
  title?: string
  glyph?: string
  className?: string
}

const CONTAINER_CLASSES: Record<CalloutVariant, string> = {
  note: 'border border-border bg-surface-raised rounded-lg py-4 px-5',
  prayer: 'border border-gilt bg-surface-raised rounded-lg py-4 px-5',
  blessing: 'border border-gilt bg-gilt-quiet rounded-lg py-4 px-5 items-center',
  refrain: 'border-l-2 border-accent pl-4',
}

const HEAD_CLASSES: Record<CalloutVariant, string> = {
  note: 'text-ink-muted',
  prayer: 'text-gilt',
  blessing: 'text-gilt',
  refrain: 'text-accent',
}

export default function Callout({ children, variant = 'note', title, glyph, className }: CalloutProps) {
  const mark = glyph ?? GLYPHS[variant]

  return (
    <View className={[CONTAINER_CLASSES[variant], className ?? ''].filter(Boolean).join(' ')}>
      {title && (
        <View className="flex-row items-center gap-2 mb-2">
          {mark ? (
            <Text className={['font-display text-base leading-none', HEAD_CLASSES[variant]].join(' ')}>
              {mark}
            </Text>
          ) : null}
          <Text className={['font-sans text-xs uppercase tracking-caps', HEAD_CLASSES[variant]].join(' ')}>
            {title}
          </Text>
        </View>
      )}
      <View>{children}</View>
    </View>
  )
}
