import { useMemo, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { getLiturgicalDay, formatDate, getDefaultOffice } from '@/liturgy/calendar'
import { getSeasonAccentTones, getAccentSeason, OFFICE_SEASON } from '@/liturgy/season-accent'
import type { AccentSeason } from '@/liturgy/season-accent'
import { useAppColorScheme } from '@/hooks/useAppColorScheme'
import { useSettings } from '@/store/settings'
import Theme from '@/components/ui/Theme'
import StartScreen from '@/components/prayer/StartScreen'
import ActionMenu from '@/components/ui/ActionMenu'
import FloatingNav from '@/components/layout/FloatingNav'
import Drawer from '@/components/layout/Drawer'
import Icon from '@/components/ui/Icon'

type PeriodId = ReturnType<typeof getDefaultOffice>

const PERIODS: { id: PeriodId; label: string; office: string; route: '/morning' | '/noon' | '/evening' | '/compline'; image: number }[] = [
  { id: 'morning', label: 'Morning', office: 'Morning Prayer', route: '/morning', image: require('../../assets/images/morning.jpg') },
  { id: 'noon', label: 'Noon', office: 'Noonday Prayer', route: '/noon', image: require('../../assets/images/noon.jpg') },
  { id: 'evening', label: 'Evening', office: 'Evening Prayer', route: '/evening', image: require('../../assets/images/evening.jpg') },
  { id: 'compline', label: 'Night', office: 'Compline', route: '/compline', image: require('../../assets/images/night.jpg') },
]

// The active pill shares the screen's one resolved `season` (so it always
// matches the Begin button below); inactive pills preview their own
// time-of-day season as a small dot, just for visual variety among options.
function PeriodSwitcher({ active, season, onSelect }: { active: PeriodId; season: AccentSeason; onSelect: (id: PeriodId) => void }) {
  const colorScheme = useAppColorScheme()
  const activeTones = getSeasonAccentTones(season, colorScheme)

  return (
    <View className="flex-row bg-white rounded-full p-1 gap-1" style={{ shadowColor: '#000', shadowOpacity: 0.28, shadowRadius: 20, shadowOffset: { width: 0, height: 8 }, elevation: 6 }}>
      {PERIODS.map((p) => {
        const isActive = p.id === active
        const dotTones = getSeasonAccentTones(OFFICE_SEASON[p.id], colorScheme)
        return (
          <Pressable
            key={p.id}
            onPress={() => onSelect(p.id)}
            className="flex-1 flex-row items-center justify-center gap-1.5 rounded-full py-2.5"
            style={isActive ? { backgroundColor: activeTones.accent } : undefined}
          >
            {!isActive && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: dotTones.accent }} />}
            <Text style={{ fontFamily: 'System', fontWeight: '700', fontSize: 13, color: isActive ? '#ffffff' : '#1a2233' }}>
              {p.label}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}

const NAV_ITEMS: { id: string; label: string; icon: 'home' | 'book-open' | 'book' | 'menu' }[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'office', label: 'Office', icon: 'book-open' },
  { id: 'psalter', label: 'Psalter', icon: 'book' },
  { id: 'more', label: 'More', icon: 'menu' },
]

// The Home screen: replaces the old (tabs) bottom-bar navigator entirely.
// A single StartScreen with a period switcher; "Begin" pushes a full-screen,
// chrome-free office reading session. FloatingNav (glass) and the Drawer
// (hamburger) cover the rest of the app's navigation from here — there is no
// persistent bottom bar.
export default function Home() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { settings } = useSettings()
  const [period, setPeriod] = useState<PeriodId>(() => getDefaultOffice(new Date()))
  const [drawerOpen, setDrawerOpen] = useState(false)

  const today = useMemo(() => new Date(), [])
  const day = useMemo(() => getLiturgicalDay(today), [today])
  const current = PERIODS.find((p) => p.id === period) ?? PERIODS[0]
  // 'time' mode follows whichever period is selected on the switcher (not
  // strictly the literal clock) so previewing a different period actually
  // recolors the screen — matching the click-through prototype's Home screen.
  const season = settings.colorMode === 'time' ? OFFICE_SEASON[period] : settings.colorMode === 'seasonal' ? getAccentSeason(day) : settings.colorMode

  const onNavigate = (id: string) => {
    if (id === 'home') return
    if (id === 'psalter') router.push('/psalter')
    else if (id === 'more' || id === 'office') router.push('/more')
  }

  return (
    <Theme season={season} className="flex-1">
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <StartScreen
        image={current.image}
        date={formatDate(today)}
        title={current.office}
        subtitle={day.displayName}
        onBegin={() => router.push(current.route)}
        top={<PeriodSwitcher active={period} season={season} onSelect={setPeriod} />}
      />

      <View style={{ position: 'absolute', top: insets.top + 12, left: 16 }}>
        <Pressable
          onPress={() => setDrawerOpen(true)}
          accessibilityRole="button"
          accessibilityLabel="Menu"
          className="w-11 h-11 rounded-full items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.32)' }}
        >
          <Icon name="menu" size={20} color="#ffffff" />
        </Pressable>
      </View>

      <View style={{ position: 'absolute', right: 20, bottom: insets.bottom + 108 }}>
        <ActionMenu
          items={[
            { icon: 'share-2', label: 'Share' },
            { icon: 'pencil', label: 'Note' },
            { icon: 'bell', label: 'Remind', onPress: () => router.push('/reminders') },
          ]}
        />
      </View>

      <View style={{ position: 'absolute', left: 0, right: 0, bottom: insets.bottom + 20, alignItems: 'center' }}>
        <View style={{ width: '86%' }}>
          <FloatingNav variant="glass" items={NAV_ITEMS} active="home" onChange={onNavigate} />
        </View>
      </View>
    </Theme>
  )
}
