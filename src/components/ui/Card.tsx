import { View, Text } from 'react-native'
import type { ReactNode } from 'react'
import Eyebrow from '@/components/ui/Eyebrow'

interface CardProps {
  children: ReactNode
  variant?: 'default' | 'sunk' | 'flat' | 'illuminated'
  eyebrow?: ReactNode
  title?: ReactNode
  className?: string
}

export default function Card({ children, variant = 'default', eyebrow, title, className }: CardProps) {
  const bgClass =
    variant === 'sunk'
      ? 'bg-surface-sunk'
      : variant === 'flat'
      ? 'bg-transparent'
      : 'bg-surface-raised'

  const borderClass =
    variant === 'illuminated'
      ? 'border border-gilt'
      : 'border border-border'

  return (
    <View className={[bgClass, borderClass, 'rounded-lg p-5', className ?? ''].join(' ')}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {title && (
        <Text className="font-display font-semibold text-xl text-ink mb-3">
          {String(title)}
        </Text>
      )}
      <View>{children}</View>
    </View>
  )
}
