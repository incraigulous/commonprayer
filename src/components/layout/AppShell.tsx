import React, { useState, useRef, useCallback, useContext, createContext } from 'react'
import { View, Text, Pressable, Animated } from 'react-native'
import type { NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Drawer from '@/components/layout/Drawer'
import Icon from '@/components/ui/Icon'
import AppearancePopover from '@/components/ui/AppearancePopover'

// --- Scroll-header context ------------------------------------------------
// Lets child ScrollViews attach onScroll without prop-drilling.

interface ScrollHeaderCtx {
  onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void
  scrollEventThrottle: number
  headerHeight: number
}

const ScrollHeaderContext = createContext<ScrollHeaderCtx>({
  onScroll: () => {},
  scrollEventThrottle: 16,
  headerHeight: 0,
})

export function useScrollHeader(): ScrollHeaderCtx {
  return useContext(ScrollHeaderContext)
}

// --- Component ------------------------------------------------------------

const SHOW_HIDE_THRESHOLD = 4 // px delta before triggering show/hide

interface AppShellProps {
  title: string
  children: React.ReactNode
  rightAction?: React.ReactNode
}

export default function AppShell({ title, children, rightAction }: AppShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [appearanceOpen, setAppearanceOpen] = useState(false)
  const insets = useSafeAreaInsets()

  // Header height — seeded from safe area + known bar height so the first
  // render already has a reasonable paddingTop in child ScrollViews.
  const [headerHeight, setHeaderHeight] = useState(insets.top + 48)
  const headerHeightRef = useRef(insets.top + 48)

  const translateY = useRef(new Animated.Value(0)).current
  const lastScrollY = useRef(0)
  const isShowing = useRef(true)

  const onScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = Math.max(0, e.nativeEvent.contentOffset.y)
    const delta = y - lastScrollY.current

    if (delta > SHOW_HIDE_THRESHOLD && y > headerHeightRef.current && isShowing.current) {
      // Scrolling down past the fold → hide
      isShowing.current = false
      Animated.spring(translateY, {
        toValue: -headerHeightRef.current,
        useNativeDriver: true,
        tension: 120,
        friction: 22,
      }).start()
    } else if (delta < -SHOW_HIDE_THRESHOLD && !isShowing.current) {
      // Any upward scroll → show immediately
      isShowing.current = true
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 120,
        friction: 22,
      }).start()
    }

    lastScrollY.current = y
  }, [translateY])

  const onHeaderLayout = useCallback((e: { nativeEvent: { layout: { height: number } } }) => {
    const h = e.nativeEvent.layout.height
    headerHeightRef.current = h
    setHeaderHeight(h)
  }, [])

  return (
    <View className="flex-1 bg-bg">
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Content fills the full screen; ScrollViews use paddingTop from context */}
      <ScrollHeaderContext.Provider value={{ onScroll, scrollEventThrottle: 16, headerHeight }}>
        <View className="flex-1">
          {children}
        </View>
      </ScrollHeaderContext.Provider>

      {/* Header — absolute so hiding it doesn't shift content layout */}
      <Animated.View
        onLayout={onHeaderLayout}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transform: [{ translateY }],
        }}
      >
        <View
          className="flex-row items-center bg-accent border-b border-accent-press"
          style={{ paddingTop: insets.top }}
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
      </Animated.View>
    </View>
  )
}
