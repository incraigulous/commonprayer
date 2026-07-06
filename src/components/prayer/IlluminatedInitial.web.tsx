import { Text, View } from 'react-native'
import type { ReactNode } from 'react'
import { useFontScale } from '@/hooks/useFontScale'

interface IlluminatedInitialProps {
  letter: string
  children: ReactNode
  variant?: 'accent' | 'gilt' | 'rubric' | 'ink'
  className?: string
}

const CAP_COLOR: Record<'accent' | 'gilt' | 'rubric' | 'ink', string> = {
  accent: 'text-accent',
  gilt: 'text-gilt',
  rubric: 'text-accent',
  ink: 'text-ink',
}

// Web-only: a true CSS float lets the paragraph wrap around the full
// height of the initial, matching print-manuscript drop caps. Native
// (iOS/Android) falls back to IlluminatedInitial.tsx's inline-nested Text,
// since RN's layout engine has no float equivalent.
export default function IlluminatedInitial({
  letter,
  children,
  variant = 'accent',
  className,
}: IlluminatedInitialProps) {
  const capColor = CAP_COLOR[variant]
  const scale = useFontScale()

  return (
    <View className={className}>
      <Text
        className={['font-initial leading-none mr-2', capColor].join(' ')}
        style={{
          fontSize: 80,
          fontWeight: '400',
          lineHeight: 64,
          // @ts-expect-error web-only CSS property, passed through by react-native-web
          float: 'left',
        }}
        accessibilityElementsHidden
      >
        {letter}
      </Text>
      <Text className="font-serif text-ink leading-relaxed" style={{ fontSize: 16 * scale }}>
        {children}
      </Text>
    </View>
  )
}
