import { useState, useEffect, useMemo } from 'react'
import { View, Text, ScrollView, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { getLiturgicalDay, formatDate } from '@/liturgy/calendar'
import { getDailyReadings } from '@/liturgy/lectionary'
import type { DailyReadings as DR } from '@/types'
import Icon from '@/components/ui/Icon'

export default function DailyReadings() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const [date] = useState(new Date())
  const [readings, setReadings] = useState<DR | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const day = useMemo(() => getLiturgicalDay(date), [date])

  useEffect(() => {
    getDailyReadings(day)
      .then((r) => {
        setReadings(r)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [day])

  return (
    <View className="flex-1 bg-bg">
      <View
        className="flex-row items-center gap-4 px-4 border-b border-border"
        style={{ paddingTop: insets.top + 16, paddingBottom: 16 }}
      >
        <Pressable onPress={() => router.back()} hitSlop={8} className="p-2 -ml-2">
          <Icon name="chevron-left" size={20} className="text-accent" />
        </Pressable>
        <Text className="text-lg font-display font-semibold text-ink">Daily Readings</Text>
      </View>

      <ScrollView className="px-4 py-6">
        <Text className="text-xl font-display text-ink mb-1">{formatDate(date)}</Text>
        <Text className="text-ink-muted italic mb-6">{day.displayName}</Text>

        {loading && (
          <View className="items-center py-8">
            <Text className="text-ink-subtle">Loading…</Text>
          </View>
        )}
        {error && (
          <View className="items-center py-8">
            <Text className="text-red-600">Could not load readings.</Text>
          </View>
        )}

        {!loading && !error && !readings && (
          <View className="items-center py-8">
            <Text className="text-ink-subtle">No lectionary data available for this date.</Text>
          </View>
        )}

        {readings && (
          <View className="gap-6">
            <View>
              <Text className="text-xs uppercase tracking-caps text-ink-subtle mb-4">Morning</Text>
              <ReadingSection label="Psalms" refs={readings.morning.psalms} />
              <ReadingItem label="Old Testament" citation={readings.morning.ot} />
              <ReadingItem label="New Testament" citation={readings.morning.nt} />
            </View>
            <View>
              <Text className="text-xs uppercase tracking-caps text-ink-subtle mb-4">Evening</Text>
              <ReadingSection label="Psalms" refs={readings.evening.psalms} />
              <ReadingItem label="Old Testament" citation={readings.evening.ot} />
              <ReadingItem label="New Testament" citation={readings.evening.nt} />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  )
}

function ReadingSection({ label, refs }: { label: string; refs: string[] }) {
  return (
    <View className="bg-surface rounded-xl px-4 py-3 mb-2">
      <Text className="text-xs text-ink-subtle mb-1">{label}</Text>
      <Text className="text-ink font-medium">{refs.join(', ')}</Text>
    </View>
  )
}

function ReadingItem({ label, citation }: { label: string; citation: string }) {
  return (
    <View className="bg-surface rounded-xl px-4 py-3 mb-2">
      <Text className="text-xs text-ink-subtle mb-1">{label}</Text>
      <Text className="text-ink font-medium">{citation}</Text>
    </View>
  )
}
