import { View, Text } from 'react-native'
import type { ReactNode } from 'react'
import Eyebrow from '@/components/ui/Eyebrow'

type HeadingLevel = 'display' | 'office' | 'section'

interface SectionHeadingProps {
  children: ReactNode
  eyebrow?: ReactNode
  level?: HeadingLevel
  rule?: boolean
  center?: boolean
  className?: string
}

const LEVEL_SIZE: Record<HeadingLevel, string> = {
  display: 'text-4xl',
  office: 'text-3xl',
  section: 'text-2xl',
}

export default function SectionHeading({
  children,
  eyebrow,
  level = 'section',
  rule = false,
  center = false,
  className,
}: SectionHeadingProps) {
  return (
    <View className={[center ? 'items-center' : '', className ?? ''].filter(Boolean).join(' ')}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {children && (
          <Text className={['font-display font-bold leading-tight text-ink', LEVEL_SIZE[level]].join(' ')}>
              {String(children)}
          </Text>
      )}
      {rule && (
        <View
          className={['w-10 h-0.5 bg-accent mt-3', center ? 'self-center' : ''].filter(Boolean).join(' ')}
        />
      )}
    </View>
  )
}
