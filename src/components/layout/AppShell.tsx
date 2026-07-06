import React, { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Drawer from '@/components/layout/Drawer'
import Icon from '@/components/ui/Icon'
import AppearancePopover from '@/components/ui/AppearancePopover'

interface AppShellProps {
  title: string
  children: React.ReactNode
  rightAction?: React.ReactNode
}

export default function AppShell({ title, children, rightAction }: AppShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [appearanceOpen, setAppearanceOpen] = useState(false)
  const insets = useSafeAreaInsets()

  return (
    <View className="flex-1 bg-bg">
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Header — filled with the seasonal accent */}
      <View
        className="flex-row items-center bg-accent border-b border-accent-press"
        style={{ paddingTop: insets.top, zIndex: 50, elevation: 50 }}
      >
        <Pressable
          onPress={() => setDrawerOpen((o) => !o)}
          accessibilityLabel={drawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
          accessibilityState={{ expanded: drawerOpen }}
          hitSlop={8}
          className="p-3"
        >
          <Icon name={drawerOpen ? 'x' : 'menu'} size={24} className="text-on-accent" />
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
                onPress={() => setAppearanceOpen((o) => !o)}
                accessibilityLabel="Appearance"
                accessibilityState={{ expanded: appearanceOpen }}
                hitSlop={8}
                className="p-3"
              >
                <Text className="font-serif text-on-accent text-base leading-none">A</Text>
              </Pressable>
              <AppearancePopover open={appearanceOpen} onClose={() => setAppearanceOpen(false)} />
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
