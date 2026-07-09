import { Text } from 'react-native'
import type { ReactNode } from 'react'
import { useFontScale } from '@/hooks/useFontScale'

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

// React Native doesn't support CSS float, so the initial letter is nested
// inside the same Text as the paragraph — RN wraps nested Text inline,
// letting the body copy flow underneath the cap instead of beside it.
export default function IlluminatedInitial({
  letter,
  children,
  variant = 'gilt',
  className,
}: IlluminatedInitialProps) {
  const capColor = CAP_COLOR[variant]
  const scale = useFontScale()

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
