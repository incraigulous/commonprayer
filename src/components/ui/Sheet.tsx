import React, { useEffect, useRef } from 'react'
import { Animated, Modal, Pressable, View, Text, ScrollView, Dimensions } from 'react-native'
import { useOverlayBehavior } from '@/hooks/useOverlayBehavior'
import Icon from '@/components/ui/Icon'

const SCREEN_HEIGHT = Dimensions.get('window').height

interface SheetProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}

export default function Sheet({ open, onClose, children, title }: SheetProps) {
  useOverlayBehavior(open, onClose)
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: open ? 0 : SCREEN_HEIGHT,
      duration: 280,
      useNativeDriver: true,
    }).start()
  }, [open, translateY])

  return (
    <Modal
      visible={open}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* Backdrop */}
      <Pressable
        onPress={onClose}
        className="absolute inset-0 bg-black/60"
      />

      {/* Panel */}
      <Animated.View
        style={{
          transform: [{ translateY }],
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          maxHeight: SCREEN_HEIGHT * 0.9,
        }}
        className="bg-surface rounded-t-2xl"
      >
        {/* Drag handle */}
        <View className="items-center pt-3 pb-1">
          <View className="w-10 h-1 rounded-full bg-border-strong" />
        </View>

        {title && (
          <View className="flex-row items-center justify-between px-5 pt-2 pb-3 border-b border-border">
            <Text className="text-lg font-display font-semibold text-ink">{title}</Text>
            <Pressable
              onPress={onClose}
              className="p-1 rounded-full"
              hitSlop={8}
            >
              <Icon name="x" size={20} />
            </Pressable>
          </View>
        )}

        <ScrollView className="px-5 py-4" bounces={false}>
          {children}
        </ScrollView>
      </Animated.View>
    </Modal>
  )
}
