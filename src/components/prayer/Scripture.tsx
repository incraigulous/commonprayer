import { View, Text } from 'react-native'
import type { ReactNode } from 'react'

interface ScriptureProps {
  children: ReactNode
  cite?: string
  variant?: 'quiet' | 'illuminated'
  mark?: boolean
  className?: string
}

export default function Scripture({
  children,
  cite,
  variant = 'quiet',
  mark = true,
  className,
}: ScriptureProps) {
  const isIlluminated = variant === 'illuminated'

  return (
    <View
      className={[
        'my-5',
        isIlluminated
          ? 'border border-gilt bg-gilt-quiet rounded-md py-4 px-5'
          : 'pl-5 pr-4 py-4 border-l-2 border-accent bg-surface-sunk rounded-r-md',
        className ?? '',
      ].filter(Boolean).join(' ')}
    >
      <View className="gap-3">
        {children}
      </View>

      {(cite || mark) && (
        <View className="flex-row items-center justify-between gap-3 mt-3">
          {cite ? (
            <Text className="font-sans text-xs uppercase tracking-caps text-ink-muted">
              {cite}
            </Text>
          ) : (
            <View />
          )}
          {mark && (
            <Text className="font-display text-gilt text-xl leading-none">✟</Text>
          )}
        </View>
      )}
    </View>
  )
}
