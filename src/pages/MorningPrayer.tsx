import { useState, useEffect, useMemo } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { getLiturgicalDay, formatDate } from '@/liturgy/calendar'
import { assembleOffice } from '@/liturgy/office'
import { useSettings } from '@/store/settings'
import AppShell from '@/components/layout/AppShell'
import LiturgicalDocument from '@/components/prayer/LiturgicalDocument'
import type { LiturgicalDocument as LDocType } from '@/types'

export default function MorningPrayer() {
  const { settings } = useSettings()
  const [documents, setDocuments] = useState<LDocType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const today = useMemo(() => new Date(), [])
  const day = useMemo(() => getLiturgicalDay(today), [today])

  useEffect(() => {
    assembleOffice('morning', day, settings)
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
    <AppShell title="Morning Prayer">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
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
            <Text className="text-red-600">Could not load Morning Prayer. Please check your connection.</Text>
          </View>
        )}

        {!loading && !error && documents.map((doc, i) => (
          <LiturgicalDocument key={i} doc={doc} />
        ))}
      </ScrollView>
    </AppShell>
  )
}
