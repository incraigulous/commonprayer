import { View, Text, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from '@/components/ui/Icon'
import type { IconName } from '@/components/ui/Icon'

interface SessionBarProps {
  /** Centred title. Omit for a bare bar (back + AA only). */
  title?: string
  /** Lead-control icon — a back chevron or a close. @default 'chevron-left' */
  leadIcon?: Extract<IconName, 'chevron-left' | 'x'>
  onBack?: () => void
  onTextSize?: () => void
  /** @default true */
  showTextSize?: boolean
  /** Draw the bottom hairline. @default true */
  hairline?: boolean
  /** Render with no background — for use over a Masthead or other fill
   * content, where the bar floats over the content instead of docking
   * above it. Icons/text switch to the on-accent color. @default false */
  floating?: boolean
}

// The office reading-view top bar: a back/close control on the left, the
// "AA" text-size control on the right, and an optional centred title.
// Presentational — pairs with the step Tabs directly beneath it.
export default function SessionBar({
  title,
  leadIcon = 'chevron-left',
  onBack,
  onTextSize,
  showTextSize = true,
  hairline = true,
  floating = false,
}: SessionBarProps) {
  const insets = useSafeAreaInsets()
  const textClass = floating ? 'text-on-accent' : 'text-ink'

  return (
    <View
      className={['flex-row items-center gap-2 px-2', floating ? '' : 'bg-bg', hairline ? 'border-b border-hairline' : ''].filter(Boolean).join(' ')}
      style={{ paddingTop: insets.top + 10, paddingBottom: 10 }}
    >
      <Pressable onPress={onBack} hitSlop={8} className="p-1.5 rounded-md active:bg-surface-hover">
        <Icon name={leadIcon} size={24} className={textClass} />
      </Pressable>

      {title ? (
        <Text
          numberOfLines={1}
          className={['flex-1 text-center font-display font-semibold text-lg', textClass].join(' ')}
        >
          {title}
        </Text>
      ) : (
        <View className="flex-1" />
      )}

      {showTextSize ? (
        <Pressable onPress={onTextSize} hitSlop={8} className="p-1.5 rounded-md active:bg-surface-hover">
          <Text className={['font-serif leading-none', floating ? 'text-on-accent' : 'text-accent'].join(' ')}>
            <Text style={{ fontSize: 15 }}>A</Text>
            <Text style={{ fontSize: 22, fontWeight: '600' }}>A</Text>
          </Text>
        </Pressable>
      ) : (
        <View className="w-9" />
      )}
    </View>
  )
}
