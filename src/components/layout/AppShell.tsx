import React, { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Drawer from '@/components/layout/Drawer'
import Icon from '@/components/ui/Icon'
import TextSizePopover from '@/components/ui/TextSizePopover'

interface AppShellProps {
  title: string
  children: React.ReactNode
  rightAction?: React.ReactNode
}

export default function AppShell({ title, children, rightAction }: AppShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [typeOpen, setTypeOpen] = useState(false)
  const insets = useSafeAreaInsets()

  return (
    <View className="flex-1 bg-bg">
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Header — filled with the seasonal accent */}
      <View
        className="flex-row items-center bg-accent border-b border-accent-press"
        style={{ paddingTop: insets.top }}
      >
        <Pressable
          onPress={() => setDrawerOpen(true)}
          accessibilityLabel="Open navigation menu"
          hitSlop={8}
          className="p-3"
        >
          <Icon name="menu" size={24} className="text-on-accent" />
        </Pressable>

        <View className="flex-1 items-center">
          <Text
            className="text-base font-display font-semibold text-on-accent tracking-wide"
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>

        <View className="w-12 items-center" style={{ position: 'relative' }}>
          {rightAction ?? (
            <>
              <Pressable
                onPress={() => setTypeOpen((o) => !o)}
                accessibilityLabel="Text size"
                accessibilityState={{ expanded: typeOpen }}
                hitSlop={8}
                className="p-3"
              >
                <Text className="font-serif text-on-accent text-base leading-none">A</Text>
              </Pressable>
              <TextSizePopover open={typeOpen} onClose={() => setTypeOpen(false)} />
            </>
          )}
        </View>
      </View>

      {/* Main content */}
      <View className="flex-1">
        {children}
      </View>
    </View>
  )
}
