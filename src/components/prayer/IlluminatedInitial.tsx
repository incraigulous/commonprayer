import { View, Text } from 'react-native'
import type { ReactNode } from 'react'

interface IlluminatedInitialProps {
  letter: string
  children: ReactNode
  variant?: 'gilt' | 'rubric' | 'ink'
  className?: string
}

const CAP_COLOR: Record<'gilt' | 'rubric' | 'ink', string> = {
  gilt: 'text-gilt',
  rubric: 'text-accent',
  ink: 'text-ink',
}

// React Native doesn't support CSS float, so we use a flex row with
// a large first letter and wrap the rest of the text beside it.
export default function IlluminatedInitial({
  letter,
  children,
  variant = 'gilt',
  className,
}: IlluminatedInitialProps) {
  const capColor = CAP_COLOR[variant]

  return (
    <View className={['flex-row items-start', className ?? ''].filter(Boolean).join(' ')}>
      <Text
        className={['font-display text-5xl leading-none mr-1', capColor].join(' ')}
        style={{ lineHeight: 44 }}
        accessibilityElementsHidden
      >
        {letter}
      </Text>
      <Text className="flex-1 font-serif text-ink leading-relaxed text-base">
        {typeof children === 'string' ? children : children}
      </Text>
    </View>
  )
}
