import { View, Text, Pressable, ScrollView, Alert, Platform } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSettings } from '@/store/settings'
import type { LiturgicalVersion, OfficiantRole } from '@/types'
import { getLiturgicalDay } from '@/liturgy/calendar'
import { timeOfDaySeason } from '@/liturgy/season-accent'
import Icon from '@/components/ui/Icon'
import Switch from '@/components/ui/Switch'
import DisplayMenu, { COLOR_SEASONS } from '@/components/ui/DisplayMenu'
import type { DisplaySize } from '@/components/ui/DisplayMenu'

const versions: { value: LiturgicalVersion; label: string }[] = [
  { value: 'rite-ii', label: 'Rite II' },
  { value: 'rite-i', label: 'Rite I' },
  { value: 'eow', label: 'Enriching Our Worship' },
  { value: 'daily-devotions', label: 'Daily Devotions' },
]

const officiantRoles: { value: OfficiantRole; label: string; description: string }[] = [
  { value: 'lay', label: 'Lay Reader or Deacon', description: 'Uses the reconciliation prayer in place of the Absolution' },
  { value: 'priest', label: 'Priest', description: 'Uses the Absolution' },
]

const SIZE_TO_SETTING: Record<DisplaySize, 'small' | 'default' | 'large' | 'x-large'> = {
  sm: 'small',
  md: 'default',
  lg: 'large',
  xl: 'x-large',
}
const SETTING_TO_SIZE: Record<'small' | 'default' | 'large' | 'x-large', DisplaySize> = {
  small: 'sm',
  default: 'md',
  large: 'lg',
  'x-large': 'xl',
}

export default function SettingsPage() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { settings, update, reset } = useSettings()

  const handleReset = () => {
    const message = 'This restores all settings to their defaults and shows onboarding again. This cannot be undone.'
    // Alert.alert is a silent no-op on react-native-web — fall back to the
    // browser's own confirm dialog there.
    if (Platform.OS === 'web') {
      if (window.confirm(`Reset Settings\n\n${message}`)) reset()
      return
    }
    Alert.alert('Reset Settings', message, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: reset },
    ])
  }

  const today = new Date()
  const day = getLiturgicalDay(today)
  const colorHint =
    settings.colorMode === 'time'
      ? `Now · ${timeOfDaySeason(today)}`
      : settings.colorMode === 'seasonal'
        ? `Following the calendar · ${day.displayName}`
        : COLOR_SEASONS.find((s) => s.id === settings.colorMode)?.label

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
        <View className="mt-6 mb-2 items-center">
          <Text className="text-xs uppercase tracking-caps text-ink-subtle mb-3 self-start">Display</Text>
          <DisplayMenu
            theme={settings.theme}
            onThemeChange={(mode) => update({ theme: mode })}
            color={settings.colorMode}
            onColorChange={(mode) => update({ colorMode: mode })}
            size={SETTING_TO_SIZE[settings.fontSize]}
            onSizeChange={(size) => update({ fontSize: SIZE_TO_SETTING[size] })}
            colorHint={colorHint}
          />
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
            <View className="py-4 border-b border-border">
              <Switch
                label="Vigil Office"
                help="Add a Vigil reading before Morning Prayer"
                checked={settings.vigil}
                onChange={(v) => update({ vigil: v })}
              />
            </View>
            <View className="py-4 border-b border-border">
              <Switch
                label="Gloria Patri after each Psalm"
                checked={settings.gloriaPatri}
                onChange={(v) => update({ gloriaPatri: v })}
              />
            </View>
            <View className="py-4">
              <Switch
                label="Collects for minor feasts"
                checked={settings.minorFeastCollects}
                onChange={(v) => update({ minorFeastCollects: v })}
              />
            </View>
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

        <View className="mt-6">
          <Text className="text-xs uppercase tracking-caps text-ink-subtle mb-3">Advanced</Text>
          <Pressable
            onPress={handleReset}
            className="bg-surface rounded-xl px-4 py-3"
          >
            <Text className="font-semibold text-red-600">Reset Settings</Text>
            <Text className="text-sm text-ink-muted mt-0.5">Restore defaults and show onboarding again</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  )
}
