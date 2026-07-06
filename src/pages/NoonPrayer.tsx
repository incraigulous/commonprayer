import { useState, useEffect, useMemo } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { getLiturgicalDay } from '@/liturgy/calendar'
import { assembleOffice } from '@/liturgy/office'
import { useSettings } from '@/store/settings'
import AppShell, { useScrollHeader } from '@/components/layout/AppShell'
import LiturgicalDocument from '@/components/prayer/LiturgicalDocument'
import LiturgyHeader from '@/components/prayer/LiturgyHeader'
import type { LiturgicalDocument as LDocType } from '@/types'

export default function NoonPrayer() {
  return (
    <AppShell title="Noonday Prayer">
      <NoonPrayerContent />
    </AppShell>
  )
}

function NoonPrayerContent() {
  const { settings } = useSettings()
  const { onScroll, scrollEventThrottle, headerHeight } = useScrollHeader()
  const [documents, setDocuments] = useState<LDocType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const today = useMemo(() => new Date(), [])
  const day = useMemo(() => getLiturgicalDay(today), [today])

  useEffect(() => {
    assembleOffice('noon', day, settings)
      .then((office) => {
        setDocuments(office.documents)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day, settings.version, settings.gloriaPatri, settings.officiantRole])

  return (
    <ScrollView
      className="flex-1"
      onScroll={onScroll}
      scrollEventThrottle={scrollEventThrottle}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32, paddingTop: headerHeight }}
    >
      <LiturgyHeader date={today} day={day} />

      {loading && (
        <View className="items-center py-12">
          <Text className="text-ink-subtle">Loading…</Text>
        </View>
      )}

      {error && (
        <View className="items-center py-12">
          <Text className="text-red-600">Could not load Noonday Prayer.</Text>
        </View>
      )}

      {!loading && !error && documents.map((doc, i) => (
        <LiturgicalDocument key={i} doc={doc} />
      ))}
    </ScrollView>
  )
}
