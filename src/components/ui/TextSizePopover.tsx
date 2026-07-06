import { useEffect, useRef } from 'react'
import { Animated, Pressable, Text } from 'react-native'
import TypeScale from '@/components/ui/TypeScale'
import { useSettings } from '@/store/settings'

interface TextSizePopoverProps {
  open: boolean
  onClose: () => void
}

export default function TextSizePopover({ open, onClose }: TextSizePopoverProps) {
  const { settings, update } = useSettings()
  const translateY = useRef(new Animated.Value(-8)).current
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: open ? 0 : -8,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: open ? 1 : 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start()
  }, [open, translateY, opacity])

  if (!open) return null

  return (
    <>
      <Pressable
        onPress={onClose}
        style={{ position: 'absolute', top: -1000, bottom: -1000, left: -1000, right: -1000, zIndex: 30 }}
      />
      <Animated.View
        style={{
          position: 'absolute',
          top: '100%',
          right: 12,
          marginTop: 8,
          width: 244,
          zIndex: 40,
          opacity,
          transform: [{ translateY }],
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 16,
          elevation: 8,
        }}
        className="bg-accent rounded-xl p-4"
      >
        <Text
          className="font-sans text-on-accent uppercase tracking-caps mb-3"
          style={{ fontSize: 11, opacity: 0.82 }}
        >
          Text Size
        </Text>
        <TypeScale value={settings.fontSize} onChange={(v) => update({ fontSize: v })} invert />
        <Text className="font-serif text-on-accent mt-3.5" style={{ fontSize: 18, lineHeight: 27 }}>
          Grace to you and peace from God our Father.
        </Text>
      </Animated.View>
    </>
  )
}
