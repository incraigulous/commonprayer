import { useState, useEffect, useMemo } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { getLiturgicalDay, formatDate } from '@/liturgy/calendar'
import { assembleOffice, type OfficeType } from '@/liturgy/office'
import { useSettings } from '@/store/settings'
import AppShell, { useScrollHeader } from '@/components/layout/AppShell'
import LiturgicalDocument from '@/components/prayer/LiturgicalDocument'
import type { LiturgicalDocument as LDocType } from '@/types'

interface Props {
  office?: OfficeType
}

export default function EveningPrayer({ office = 'evening' }: Props) {
  const title = office === 'compline' ? 'Compline' : 'Evening Prayer'
  return (
    <AppShell title={title}>
      <EveningPrayerContent office={office} title={title} />
    </AppShell>
  )
}

interface ContentProps {
  office: OfficeType
  title: string
}

function EveningPrayerContent({ office, title }: ContentProps) {
  const { settings } = useSettings()
  const { onScroll, scrollEventThrottle, headerHeight } = useScrollHeader()
  const [documents, setDocuments] = useState<LDocType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const today = useMemo(() => new Date(), [])
  const day = useMemo(() => getLiturgicalDay(today), [today])

  useEffect(() => {
    assembleOffice(office, day, settings)
      .then((assembled) => {
        setDocuments(assembled.documents)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [office, day, settings.version, settings.gloriaPatri, settings.officiantRole])

  return (
    <ScrollView
      className="flex-1"
      onScroll={onScroll}
      scrollEventThrottle={scrollEventThrottle}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32, paddingTop: headerHeight }}
    >
      <View className="py-6 items-center border-b border-border mb-6">
        <Text className="text-2xl font-display text-ink">{formatDate(today)}</Text>
        <Text className="text-ink-muted italic mt-1">{day.displayName}</Text>
        {day.subtitle ? <Text className="text-ink-subtle text-sm mt-0.5">({day.subtitle})</Text> : null}
      </View>

      {loading && (
        <View className="items-center py-12">
          <Text className="text-ink-subtle">Loading…</Text>
        </View>
      )}

      {error && (
        <View className="items-center py-12">
          <Text className="text-red-600">Could not load {title}.</Text>
        </View>
      )}

      {!loading && !error && documents.map((doc, i) => (
        <LiturgicalDocument key={i} doc={doc} />
      ))}
    </ScrollView>
  )
}
