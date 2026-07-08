import { useEffect, useMemo, useRef, useState } from 'react'
import { View, ScrollView, Text } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
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
import TabsRow from '@/components/ui/Tabs'
import Masthead from '@/components/prayer/Masthead'
import LiturgicalDocument from '@/components/prayer/LiturgicalDocument'
import type { LiturgicalDocument as LDocType, HeadingDoc } from '@/types'

const TRADITION: Record<OfficeType, string | undefined> = {
  morning: 'Matins',
  noon: 'Sext',
  evening: 'Vespers',
  compline: undefined,
}

interface Step {
  key: string
  label: string
  startIndex: number
}

function useSteps(documents: LDocType[]): Step[] {
  return useMemo(() => {
    const steps: Step[] = [{ key: 'opening', label: 'Opening', startIndex: 0 }]
    documents.forEach((doc, i) => {
      if (doc.type === 'heading') {
        const label = (doc as HeadingDoc).value?.[0]
        if (label) steps.push({ key: `h${i}`, label, startIndex: i })
      }
    })
    // An "Opening" step with nothing in it (a heading right at the top) is
    // just noise — drop it rather than show an empty first tab.
    if (steps.length > 1 && steps[1].startIndex === 0) steps.shift()
    return steps
  }, [documents])
}

interface OfficeSessionProps {
  office: OfficeType
  title: string
}

// The daily-office reading view: SessionBar (back/close + AA) + step Tabs +
// Masthead, replacing the old AppShell scroll-hiding header. Full-screen and
// chrome-free otherwise — there is no bottom bar during a session.
export default function OfficeSession({ office, title }: OfficeSessionProps) {
  const router = useRouter()
  const { settings, update } = useSettings()
  const [documents, setDocuments] = useState<LDocType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  const scrollRef = useRef<ScrollView>(null)
  const stepOffsets = useRef<number[]>([])

  const today = useMemo(() => new Date(), [])
  const day = useMemo(() => getLiturgicalDay(today), [today])
  const season = resolveColorMode(settings.colorMode, day, today)

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

  const steps = useSteps(documents)
  const groups = useMemo(() => {
    return steps.map((step, i) => {
      const end = i + 1 < steps.length ? steps[i + 1].startIndex : documents.length
      return { ...step, docs: documents.slice(step.startIndex, end) }
    })
  }, [steps, documents])

  const handleStepLayout = (index: number) => (e: LayoutChangeEvent) => {
    stepOffsets.current[index] = e.nativeEvent.layout.y
  }

  const scrollToStep = (index: number) => {
    setActiveStep(index)
    const y = stepOffsets.current[index] ?? 0
    scrollRef.current?.scrollTo({ y: Math.max(0, y - 8), animated: true })
  }

  // Settings-store-backed display preferences, matching what DisplayMenu
  // (Theme / Color / Text size) expects to control.
  const displayTheme: ThemeMode = settings.theme
  const displaySize: DisplaySize = settings.fontSize === 'small' ? 'sm' : settings.fontSize === 'large' ? 'lg' : settings.fontSize === 'x-large' ? 'xl' : 'md'

  return (
    <Theme theme={displayTheme} season={season} size={displaySize} className="flex-1">
      <SessionBar leadIcon="x" onBack={() => router.back()} onTextSize={() => setMenuOpen((o) => !o)} />

      {groups.length > 1 && (
        <View className="border-b border-hairline px-3">
          <TabsRow
            items={groups.map((g) => ({ id: g.key, label: g.label }))}
            value={groups[activeStep]?.key}
            onChange={(id) => {
              const i = groups.findIndex((g) => g.key === id)
              if (i >= 0) scrollToStep(i)
            }}
          />
        </View>
      )}

      {menuOpen && (
        <View style={{ position: 'absolute', top: 60, right: 12, zIndex: 20 }}>
          <DisplayMenu
            theme={settings.theme}
            onThemeChange={(mode) => update({ theme: mode })}
            color={settings.colorMode}
            onColorChange={(mode) => update({ colorMode: mode })}
            size={displaySize}
            onSizeChange={(size) => update({ fontSize: size === 'sm' ? 'small' : size === 'lg' ? 'large' : size === 'xl' ? 'x-large' : 'default' })}
          />
        </View>
      )}

      <ScrollView ref={scrollRef} className="flex-1" contentContainerStyle={{ paddingBottom: 48 }}>
        <View style={{ height: 320 }}>
          <Masthead office={title} tradition={TRADITION[office]} date={formatDate(today)} colors={SEASON_GLASS[season]} />
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

          {!loading && !error && groups.map((group, i) => (
            <View key={group.key} onLayout={handleStepLayout(i)}>
              {group.docs.map((doc, j) => (
                <LiturgicalDocument key={j} doc={doc} />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </Theme>
  )
}
