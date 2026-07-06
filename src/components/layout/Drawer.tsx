import React, { useEffect, useRef } from 'react'
import { Animated, Dimensions, Modal, Pressable, View, Text, ScrollView } from 'react-native'
import { Link, usePathname } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useOverlayBehavior } from '@/hooks/useOverlayBehavior'
import { useSeasonalTheme } from '@/hooks/useSeasonalTheme'
import Icon, { type IconName } from '@/components/ui/Icon'

const DRAWER_WIDTH = Math.min(288, Dimensions.get('window').width * 0.85)

interface DrawerProps {
  open: boolean
  onClose: () => void
}

const navLinks: { to: string; label: string; icon: IconName }[] = [
  { to: '/prayer-list',    label: 'Prayer List',             icon: 'hand-heart' },
  { to: '/psalter',        label: 'Psalter',                 icon: 'book-open' },
  { to: '/daily-readings', label: 'Daily Readings',          icon: 'calendar' },
  { to: '/prayers',        label: 'Prayers & Thanksgivings', icon: 'cross' },
  { to: '/favorites',      label: 'Favorites',               icon: 'star' },
  { to: '/reminders',      label: 'Reminders',               icon: 'bell' },
  { to: '/settings',       label: 'Settings',                icon: 'settings' },
  { to: '/about',          label: 'About',                   icon: 'info' },
]

export default function Drawer({ open, onClose }: DrawerProps) {
  const pathname = usePathname()
  const insets = useSafeAreaInsets()
  const theme = useSeasonalTheme()
  useOverlayBehavior(open, onClose)

  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: open ? 0 : -DRAWER_WIDTH,
        duration: 280,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: open ? 1 : 0,
        duration: 280,
        useNativeDriver: true,
      }),
    ]).start()
  }, [open, translateX, opacity])

  // Close when route changes
  useEffect(() => {
    if (open) onClose()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <Modal
      visible={open}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={[theme, { flex: 1 }]}>
        {/* Backdrop */}
        <Animated.View
          style={{ opacity }}
          className="absolute inset-0 bg-black/60"
          pointerEvents={open ? 'auto' : 'none'}
        >
          <Pressable className="flex-1" onPress={onClose} />
        </Animated.View>

        {/* Drawer panel — filled with the seasonal accent */}
        <Animated.View
          style={{
            transform: [{ translateX }],
            width: DRAWER_WIDTH,
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
          }}
          className="bg-accent flex-col"
        >
          {/* App name header */}
          <View
            className="flex-row items-center justify-between px-5 pb-4 border-b border-accent-press"
            style={{ paddingTop: insets.top + 16 }}
          >
            <View>
              <Text className="text-xs uppercase tracking-widest text-on-accent mb-0.5" style={{ opacity: 0.7 }}>The</Text>
              <Text className="text-xl font-display font-semibold text-on-accent leading-tight">
                Common Prayer
              </Text>
              <Text className="text-xs text-on-accent mt-0.5" style={{ opacity: 0.7 }}>Book of Common Prayer, 1979</Text>
            </View>
            <Pressable onPress={onClose} hitSlop={8} className="p-1.5 rounded-full">
              <Icon name="x" size={20} className="text-on-accent" />
            </Pressable>
          </View>

          {/* Nav links */}
          <ScrollView className="flex-1 py-3" bounces={false}>
            {navLinks.map((link) => {
              const isActive = pathname === link.to
              return (
                <Link key={link.to} href={link.to as never} asChild>
                  <Pressable
                    className={[
                      'flex-row items-center gap-3 px-5 py-3',
                      'border-l-2',
                      isActive
                        ? 'bg-black/10 border-on-accent'
                        : 'border-transparent',
                    ].join(' ')}
                  >
                    <Icon
                      name={link.icon}
                      size={18}
                      className="text-on-accent"
                      style={isActive ? undefined : { opacity: 0.7 }}
                    />
                    <Text
                      className={['text-sm text-on-accent', isActive ? 'font-semibold' : ''].filter(Boolean).join(' ')}
                      style={isActive ? undefined : { opacity: 0.7 }}
                    >
                      {link.label}
                    </Text>
                  </Pressable>
                </Link>
              )
            })}
          </ScrollView>

          {/* Footer */}
          <View
            className="px-5 py-4 border-t border-accent-press items-center"
            style={{ paddingBottom: insets.bottom + 16 }}
          >
            <Text className="text-xs text-on-accent" style={{ opacity: 0.7 }}>Common Prayer · Via Media</Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  )
}
