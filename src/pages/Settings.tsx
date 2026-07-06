import { View, Text, Pressable, ScrollView, Switch } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSettings } from '@/store/settings'
import type { LiturgicalVersion, OfficiantRole, ThemePreference } from '@/types'
import Icon from '@/components/ui/Icon'

const versions: { value: LiturgicalVersion; label: string }[] = [
  { value: 'rite-ii', label: 'Rite II' },
  { value: 'rite-i', label: 'Rite I' },
  { value: 'eow', label: 'Enriching Our Worship' },
  { value: 'daily-devotions', label: 'Daily Devotions' },
]

const themes: { value: ThemePreference; label: string }[] = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

const officiantRoles: { value: OfficiantRole; label: string; description: string }[] = [
  { value: 'lay', label: 'Lay Reader or Deacon', description: 'Uses the reconciliation prayer in place of the Absolution' },
  { value: 'priest', label: 'Priest', description: 'Uses the Absolution' },
]

function Row({
  label,
  description,
  value,
  onChange,
}: {
  label: string
  description?: string
  value: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <View className="flex-row items-center justify-between py-4 border-b border-border">
      <View className="flex-1 pr-4">
        <Text className="text-ink font-medium">{label}</Text>
        {description ? <Text className="text-sm text-ink-muted mt-0.5">{description}</Text> : null}
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: '#3a4658', true: '#bf4835' }}
        thumbColor="#ffffff"
      />
    </View>
  )
}

export default function SettingsPage() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { settings, update } = useSettings()

  return (
    <View className="flex-1 bg-bg">
      <View
        className="flex-row items-center gap-4 px-4 border-b border-border"
        style={{ paddingTop: insets.top + 16, paddingBottom: 16 }}
      >
        <Pressable onPress={() => router.back()} hitSlop={8} className="p-2 -ml-2">
          <Icon name="chevron-left" size={20} className="text-accent" />
        </Pressable>
        <Text className="text-lg font-display font-semibold text-ink">Settings</Text>
      </View>

      <ScrollView className="px-4 pb-8">
        <View className="mt-6 mb-2">
          <Text className="text-xs uppercase tracking-caps text-ink-subtle mb-3">Appearance</Text>
          <View className="bg-surface rounded-xl overflow-hidden">
            {themes.map((t, idx) => (
              <Pressable
                key={t.value}
                onPress={() => update({ theme: t.value })}
                className={[
                  'px-4 py-3 flex-row items-center justify-between',
                  settings.theme === t.value ? 'bg-accent-quiet' : '',
                  idx < themes.length - 1 ? 'border-b border-border' : '',
                ].filter(Boolean).join(' ')}
              >
                <Text className={settings.theme === t.value ? 'text-accent' : 'text-ink-muted'}>
                  {t.label}
                </Text>
                {settings.theme === t.value && <Icon name="check" size={16} className="text-accent" />}
              </Pressable>
            ))}
          </View>
        </View>

        <View className="mt-6 mb-2">
          <Text className="text-xs uppercase tracking-caps text-ink-subtle mb-3">Version</Text>
          <View className="gap-1">
            {versions.map((v) => (
              <Pressable
                key={v.value}
                onPress={() => update({ version: v.value })}
                className={[
                  'px-4 py-3 rounded-lg flex-row items-center justify-between',
                  settings.version === v.value ? 'bg-accent-quiet' : 'bg-surface',
                ].join(' ')}
              >
                <Text className={[settings.version === v.value ? 'font-semibold text-accent' : 'text-ink-muted'].join(' ')}>
                  {v.label}
                </Text>
                {settings.version === v.value && <Icon name="check" size={16} className="text-accent" />}
              </Pressable>
            ))}
          </View>
        </View>

        <View className="mt-6 mb-2">
          <Text className="text-xs uppercase tracking-caps text-ink-subtle mb-3">Officiant</Text>
          <View className="bg-surface rounded-xl overflow-hidden">
            {officiantRoles.map((r, idx) => (
              <Pressable
                key={r.value}
                onPress={() => update({ officiantRole: r.value })}
                className={[
                  'px-4 py-3',
                  settings.officiantRole === r.value ? 'bg-accent-quiet' : '',
                  idx < officiantRoles.length - 1 ? 'border-b border-border' : '',
                ].filter(Boolean).join(' ')}
              >
                <View className="flex-row items-center justify-between">
                  <Text className={settings.officiantRole === r.value ? 'font-semibold text-accent' : 'text-ink-muted'}>
                    {r.label}
                  </Text>
                  {settings.officiantRole === r.value && <Icon name="check" size={16} className="text-accent" />}
                </View>
                <Text className="text-sm text-ink-muted mt-0.5">{r.description}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View className="mt-6">
          <Text className="text-xs uppercase tracking-caps text-ink-subtle mb-3">Preferences</Text>
          <View className="bg-surface rounded-xl px-4">
            <Row
              label="Vigil Office"
              description="Add a Vigil reading before Morning Prayer"
              value={settings.vigil}
              onChange={(v) => update({ vigil: v })}
            />
            <Row
              label="Gloria Patri after each Psalm"
              value={settings.gloriaPatri}
              onChange={(v) => update({ gloriaPatri: v })}
            />
            <Row
              label="Collects for minor feasts"
              value={settings.minorFeastCollects}
              onChange={(v) => update({ minorFeastCollects: v })}
            />
          </View>
        </View>

        <View className="mt-6">
          <Text className="text-xs uppercase tracking-caps text-ink-subtle mb-3">Angelus</Text>
          <View className="bg-surface rounded-xl overflow-hidden">
            {(['none', 'morning', 'noon', 'evening', 'all'] as const).map((opt, idx, arr) => (
              <Pressable
                key={opt}
                onPress={() => update({ angelus: opt })}
                className={[
                  'px-4 py-3 flex-row items-center justify-between',
                  settings.angelus === opt ? 'bg-accent-quiet' : '',
                  idx < arr.length - 1 ? 'border-b border-border' : '',
                ].filter(Boolean).join(' ')}
              >
                <Text className={settings.angelus === opt ? 'text-accent' : 'text-ink-muted'}>
                  {opt === 'none' ? 'None' : opt.charAt(0).toUpperCase() + opt.slice(1)}
                </Text>
                {settings.angelus === opt && <Icon name="check" size={16} className="text-accent" />}
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
