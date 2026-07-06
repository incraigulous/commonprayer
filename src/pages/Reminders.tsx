import { useState, useEffect } from 'react'
import { View, Text, Pressable, ScrollView, TextInput } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'
import Toggle from '@/components/ui/Toggle'
import Icon from '@/components/ui/Icon'

interface Reminder {
  id: string
  office: 'morning' | 'noon' | 'evening' | 'compline'
  time: string
  enabled: boolean
}

const OFFICES = [
  { key: 'morning' as const, label: 'Morning Prayer', defaultTime: '07:00' },
  { key: 'noon' as const, label: 'Noonday Prayer', defaultTime: '12:00' },
  { key: 'evening' as const, label: 'Evening Prayer', defaultTime: '18:00' },
  { key: 'compline' as const, label: 'Compline', defaultTime: '21:00' },
]

const STORAGE_KEY = 'cp_reminders'

export default function Reminders() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [permissionStatus, setPermissionStatus] = useState<'granted' | 'denied' | 'undetermined'>('undetermined')

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((val) => {
      if (val) {
        try { setReminders(JSON.parse(val)) } catch { /* ignore */ }
      }
    })
    Notifications.getPermissionsAsync().then(({ status }) => {
      setPermissionStatus(status as 'granted' | 'denied' | 'undetermined')
    })
  }, [])

  async function requestPermission() {
    const { status } = await Notifications.requestPermissionsAsync()
    setPermissionStatus(status as 'granted' | 'denied' | 'undetermined')
  }

  async function saveReminders(next: Reminder[]) {
    setReminders(next)
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  function toggle(office: Reminder['office']) {
    const existing = reminders.find((r) => r.office === office)
    let next: Reminder[]
    if (existing) {
      next = reminders.map((r) =>
        r.office === office ? { ...r, enabled: !r.enabled } : r
      )
    } else {
      const defaultTime = OFFICES.find((o) => o.key === office)?.defaultTime ?? '08:00'
      next = [
        ...reminders,
        { id: `${office}-${Date.now()}`, office, time: defaultTime, enabled: true },
      ]
    }
    saveReminders(next)
  }

  function updateTime(office: Reminder['office'], time: string) {
    const next = reminders.map((r) => (r.office === office ? { ...r, time } : r))
    saveReminders(next)
  }

  return (
    <View className="flex-1 bg-bg">
      <View
        className="flex-row items-center gap-4 px-4 border-b border-border"
        style={{ paddingTop: insets.top + 16, paddingBottom: 16 }}
      >
        <Pressable onPress={() => router.back()} hitSlop={8} className="p-2 -ml-2">
          <Icon name="chevron-left" size={20} className="text-accent" />
        </Pressable>
        <Text className="text-lg font-display font-semibold text-ink">Reminders</Text>
      </View>

      <ScrollView className="px-4 py-6">
        {permissionStatus !== 'granted' && (
          <View className="bg-surface border border-border rounded-xl px-4 py-4 mb-6">
            <Text className="text-ink-muted text-sm mb-3">
              Enable notifications to receive daily reminders to pray.
            </Text>
            <Pressable
              onPress={requestPermission}
              className="bg-accent px-4 py-2 rounded-lg self-start"
            >
              <Text className="text-white text-sm font-medium">Enable Notifications</Text>
            </Pressable>
          </View>
        )}

        <View className="gap-3">
          {OFFICES.map((office) => {
            const reminder = reminders.find((r) => r.office === office.key)
            const enabled = reminder?.enabled ?? false
            const time = reminder?.time ?? office.defaultTime
            return (
              <View key={office.key} className="bg-surface rounded-xl px-4 py-4">
                <Toggle
                  id={`reminder-${office.key}`}
                  checked={enabled}
                  onChange={() => toggle(office.key)}
                  label={office.label}
                />
                {enabled && (
                  <View className="mt-3 flex-row items-center gap-2">
                    <Text className="text-sm text-ink-muted">Time:</Text>
                    <TextInput
                      value={time}
                      onChangeText={(val) => updateTime(office.key, val)}
                      placeholder="HH:MM"
                      placeholderTextColor="#9a8f77"
                      className="bg-surface-sunk text-ink rounded px-2 py-1 text-sm border border-border"
                    />
                  </View>
                )}
              </View>
            )
          })}
        </View>

        <Text className="text-ink-subtle text-xs text-center mt-6">
          Reminders use the system notification scheduler and will appear even when the app is not open.
        </Text>
      </ScrollView>
    </View>
  )
}
