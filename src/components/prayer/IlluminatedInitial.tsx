import { Platform, Text, View } from 'react-native'
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

// On web, react-native-web passes the `float` style through to real CSS, so
// the cap can float beside 2-3 lines of body text the way a printed drop
// cap does. Native RN has no float — there, the cap renders inline before
// the paragraph, wrapping to its own line instead of beside the text.
export default function IlluminatedInitial({
  letter,
  children,
  variant = 'accent',
  className,
}: IlluminatedInitialProps) {
  const capColor = CAP_COLOR[variant]
  const scale = useFontScale()

  if (Platform.OS === 'web') {
    return (
      <View className={className}>
        <Text
          className={['font-initial leading-none mr-1', capColor].join(' ')}
          // @ts-expect-error -- float is web-only, passed through by react-native-web
          style={{ fontSize: 64, fontWeight: '400', float: 'left', lineHeight: 0.72 }}
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

  return (
    <Text className={['font-serif text-ink leading-relaxed', className ?? ''].filter(Boolean).join(' ')} style={{ fontSize: 16 * scale }}>
      <Text
        className={['font-initial leading-none mr-1', capColor].join(' ')}
        style={{ fontSize: 80, fontWeight: '400', verticalAlign: 'top' }}
        accessibilityElementsHidden
      >
        {letter}
      </Text>
      {typeof children === 'string' ? children : children}
    </Text>
  )
}
