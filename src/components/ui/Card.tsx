import { View, Text } from 'react-native'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  variant?: 'default' | 'sunk' | 'flat' | 'illuminated'
  eyebrow?: ReactNode
  glyph?: string
  title?: ReactNode
  className?: string
}

export default function Card({ children, variant = 'default', eyebrow, glyph, title, className }: CardProps) {
  const bgClass =
    variant === 'illuminated' || variant === 'sunk'
      ? 'bg-gilt-quiet'
      : variant === 'flat'
      ? 'bg-transparent'
      : 'bg-surface-raised'

  const borderClass =
    variant === 'illuminated'
      ? 'border border-gilt'
      : 'border border-border'

  return (
    <View className={[bgClass, borderClass, 'rounded-lg p-5', className ?? ''].join(' ')}>
      {eyebrow && (
        <View className="flex-row items-center gap-3 mb-2">
          {glyph && <Text className="font-display text-gilt text-base leading-none">{glyph}</Text>}
          <Text className="font-sans text-xs uppercase tracking-caps text-accent">
            {String(eyebrow)}
          </Text>
        </View>
      )}
      {title && (
        <Text className="font-display font-semibold text-xl text-ink mb-3">
          {String(title)}
        </Text>
      )}
      <View>{children}</View>
    </View>
  )
}
