import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { View, ScrollView, Text, Animated, Platform, Pressable } from 'react-native'
import type { NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { getLiturgicalDay, formatDate } from '@/liturgy/calendar'
import { assembleOffice } from '@/liturgy/office'
import type { OfficeType } from '@/liturgy/office'
import { SEASON_GLASS, resolveColorMode } from '@/liturgy/season-accent'
import { useSettings } from '@/store/settings'
import DisplayMenu from '@/components/ui/DisplayMenu'
import type { DisplaySize } from '@/components/ui/DisplayMenu'
import Theme from '@/components/ui/Theme'
import type { ThemeMode } from '@/components/ui/Theme'
import SessionBar from '@/components/layout/SessionBar'
import Masthead from '@/components/prayer/Masthead'
import LiturgicalDocument from '@/components/prayer/LiturgicalDocument'
import FloatingNav from '@/components/layout/FloatingNav'
import Drawer from '@/components/layout/Drawer'
import type { LiturgicalDocument as LDocType } from '@/types'

const NAV_ITEMS: { id: string; label: string; icon: 'home' | 'book-open' | 'book' | 'menu' | 'settings' }[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'office', label: 'Office', icon: 'book-open' },
  { id: 'psalter', label: 'Psalter', icon: 'book' },
  { id: 'more', label: 'More', icon: 'menu' },
  { id: 'menu', label: 'Menu', icon: 'settings' },
]

const TRADITION: Record<OfficeType, string | undefined> = {
  morning: 'Matins',
  noon: 'Sext',
  evening: 'Vespers',
  compline: undefined,
}

interface OfficeSessionProps {
  office: OfficeType
  title: string
}

const SHOW_HIDE_THRESHOLD = 4 // px scroll delta before triggering show/hide
const BAR_HEIGHT = 72 // approximate SessionBar / FloatingNav dock height
const MASTHEAD_HEIGHT = 320

// The daily-office reading view: SessionBar (back/close + AA) + Masthead,
// with the same FloatingNav bar as Home beneath the reading content. Both
// bars float over the content and hide on scroll-down, reappearing on any
// scroll-up — same behavior as the app's earlier "smart header".
export default function OfficeSession({ office, title }: OfficeSessionProps) {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { settings, update } = useSettings()
  const [documents, setDocuments] = useState<LDocType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [pastMasthead, setPastMasthead] = useState(false)

  const topTranslateY = useRef(new Animated.Value(0)).current
  const bottomTranslateY = useRef(new Animated.Value(0)).current
  const lastScrollY = useRef(0)
  const isShowing = useRef(true)

  const handleScrollY = useCallback((y: number) => {
    const delta = y - lastScrollY.current

    if (delta > SHOW_HIDE_THRESHOLD && y > BAR_HEIGHT && isShowing.current) {
      isShowing.current = false
      Animated.spring(topTranslateY, { toValue: -(insets.top + BAR_HEIGHT), useNativeDriver: true, tension: 120, friction: 22 }).start()
      Animated.spring(bottomTranslateY, { toValue: insets.bottom + BAR_HEIGHT, useNativeDriver: true, tension: 120, friction: 22 }).start()
    } else if (delta < -SHOW_HIDE_THRESHOLD && !isShowing.current) {
      isShowing.current = true
      Animated.spring(topTranslateY, { toValue: 0, useNativeDriver: true, tension: 120, friction: 22 }).start()
      Animated.spring(bottomTranslateY, { toValue: 0, useNativeDriver: true, tension: 120, friction: 22 }).start()
    }

    lastScrollY.current = y
    setPastMasthead(y > MASTHEAD_HEIGHT - insets.top - 44)
  }, [insets.top, insets.bottom, topTranslateY, bottomTranslateY])

  const onScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    handleScrollY(Math.max(0, e.nativeEvent.contentOffset.y))
  }, [handleScrollY])

  // On web, scroll the actual browser window/document rather than an inner
  // RN ScrollView — matches how a normal web page behaves. Native always
  // uses the ScrollView below, which already fills the full viewport.
  // react-native-web's reset sets body/#root to overflow: hidden, assuming
  // an inner ScrollView always owns scrolling — relax just that (not
  // height, which the root layout's web min-height: 100vh already handles)
  // for the lifetime of this screen.
  useEffect(() => {
    if (Platform.OS !== 'web') return
    const targets = [document.body, document.getElementById('root')].filter(
      (el): el is HTMLElement => el != null,
    )
    const prev = targets.map((el) => el.style.overflow)
    targets.forEach((el) => { el.style.overflow = 'visible' })

    const onWindowScroll = () => handleScrollY(Math.max(0, window.scrollY))
    window.addEventListener('scroll', onWindowScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onWindowScroll)
      targets.forEach((el, i) => { el.style.overflow = prev[i] })
    }
  }, [handleScrollY])

  const today = useMemo(() => new Date(), [])
  const day = useMemo(() => getLiturgicalDay(today), [today])
  const season = resolveColorMode(settings.colorMode, day, today, office)

  useEffect(() => {
    assembleOffice(office, day, settings)
      .then((result) => {
        setDocuments(result.documents)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [office, day, settings.version, settings.gloriaPatri, settings.officiantRole])

  // Settings-store-backed display preferences, matching what DisplayMenu
  // (Theme / Color / Text size) expects to control.
  const displayTheme: ThemeMode = settings.theme
  const displaySize: DisplaySize = settings.fontSize === 'small' ? 'sm' : settings.fontSize === 'large' ? 'lg' : settings.fontSize === 'x-large' ? 'xl' : 'md'

  const onNavigate = (id: string) => {
    if (id === 'office') return
    if (id === 'menu') setDrawerOpen(true)
    else if (id === 'home') router.push('/')
    else if (id === 'psalter') router.push('/psalter')
    else if (id === 'more') router.push('/more')
  }

  const content = (
    <>
      <View style={{ height: 320 }}>
        <Masthead
          office={title}
          tradition={TRADITION[office]}
          date={formatDate(today)}
          colors={SEASON_GLASS[season]}
          topInset={insets.top + 44}
        />
      </View>

      <View className="px-4">
        {loading && (
          <View className="items-center py-12">
            <Text className="text-ink-subtle">Loading…</Text>
          </View>
        )}

        {error && (
          <View className="items-center py-12">
            <Text className="text-red-600">Could not load {title}. Please check your connection.</Text>
          </View>
        )}

        {!loading && !error && documents.map((doc, i) => (
          <LiturgicalDocument key={i} doc={doc} />
        ))}
      </View>
    </>
  )

  return (
    <Theme theme={displayTheme} season={season} size={displaySize} className={Platform.OS === 'web' ? undefined : 'flex-1'}>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {Platform.OS === 'web' ? (
        <View style={{ paddingBottom: BAR_HEIGHT + 16 }}>
          {content}
        </View>
      ) : (
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: insets.bottom + BAR_HEIGHT + 16 }} onScroll={onScroll} scrollEventThrottle={16}>
          {content}
        </ScrollView>
      )}

      {/* 'fixed' pins to the viewport regardless of scroll position — needed
          on web since the page can now scroll taller than the viewport.
          Native has no separate scroll container to escape, so 'absolute'
          (relative to the full-height ScrollView) already stays put on screen. */}
      <Animated.View style={{ position: Platform.OS === 'web' ? 'fixed' : 'absolute', top: 0, left: 0, right: 0, zIndex: 10, transform: [{ translateY: topTranslateY }] }}>
        <SessionBar
          leadIcon="x"
          onBack={() => (router.canGoBack() ? router.back() : router.replace('/'))}
          onTextSize={() => setMenuOpen((o) => !o)}
          hairline={pastMasthead}
          floating={!pastMasthead}
        />
      </Animated.View>

      {menuOpen && (
        <>
          <Pressable
            onPress={() => setMenuOpen(false)}
            style={{ position: Platform.OS === 'web' ? 'fixed' : 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 19 }}
          />
          <View style={{ position: Platform.OS === 'web' ? 'fixed' : 'absolute', top: insets.top + 60, right: 12, zIndex: 20 }}>
            <DisplayMenu
              theme={settings.theme}
              onThemeChange={(mode) => update({ theme: mode })}
              color={settings.colorMode}
              onColorChange={(mode) => update({ colorMode: mode })}
              size={displaySize}
              onSizeChange={(size) => update({ fontSize: size === 'sm' ? 'small' : size === 'lg' ? 'large' : size === 'xl' ? 'x-large' : 'default' })}
            />
          </View>
        </>
      )}

      <Animated.View style={{ position: Platform.OS === 'web' ? 'fixed' : 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10, transform: [{ translateY: bottomTranslateY }] }}>
        <View className="px-4 pb-2 pt-1 bg-bg border-t border-hairline" style={{ paddingBottom: insets.bottom + 8 }}>
          <FloatingNav variant="solid" items={NAV_ITEMS} active="office" onChange={onNavigate} />
        </View>
      </Animated.View>
    </Theme>
  )
}
