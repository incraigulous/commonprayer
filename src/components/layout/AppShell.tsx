import React, { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Drawer from '@/components/layout/Drawer'
import Icon from '@/components/ui/Icon'

interface AppShellProps {
  title: string
  children: React.ReactNode
  rightAction?: React.ReactNode
}

export default function AppShell({ title, children, rightAction }: AppShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const insets = useSafeAreaInsets()

  return (
    <View className="flex-1 bg-bg">
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Header */}
      <View
        className="flex-row items-center bg-surface border-b border-border"
        style={{ paddingTop: insets.top }}
      >
        <Pressable
          onPress={() => setDrawerOpen(true)}
          accessibilityLabel="Open navigation menu"
          hitSlop={8}
          className="p-3"
        >
          <Icon name="menu" size={24} />
        </Pressable>

        <View className="flex-1 items-center">
          <Text
            className="text-base font-display font-semibold text-ink tracking-wide"
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>

        <View className="w-12 items-center">
          {rightAction ?? null}
        </View>
      </View>

      {/* Main content */}
      <View className="flex-1">
        {children}
      </View>
    </View>
  )
}
