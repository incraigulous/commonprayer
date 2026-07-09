import { useState } from 'react'
import { View, Text, Pressable, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSettings } from '@/store/settings'
import Switch from '@/components/ui/Switch'
import Wordmark from '@/components/ui/Wordmark'
import Button from '@/components/ui/Button'
import SectionHeading from '@/components/prayer/SectionHeading'
import Theme from '@/components/ui/Theme'
import type { LiturgicalVersion, OfficiantRole } from '@/types'

const versions: { value: LiturgicalVersion; label: string; description: string }[] = [
  { value: 'rite-ii', label: 'Rite II', description: 'Contemporary language — recommended for most users' },
  { value: 'rite-i', label: 'Rite I', description: 'Traditional language ("thee", "thy")' },
  { value: 'eow', label: 'Enriching Our Worship', description: 'Expansive language with inclusive imagery for God' },
  { value: 'daily-devotions', label: 'Daily Devotions', description: 'Shorter form for morning, noon, evening, and close of day' },
]

const officiantRoles: { value: OfficiantRole; label: string; description: string }[] = [
  { value: 'lay', label: 'Lay Reader or Deacon', description: 'Uses the reconciliation prayer in place of the Absolution' },
  { value: 'priest', label: 'Priest', description: 'Uses the Absolution' },
]

export default function Onboarding() {
  const { settings, update, completeOnboarding } = useSettings()
  const [step, setStep] = useState(0)

  if (step === 0) {
    return (
      <Theme season="easter" className="flex-1">
        <SafeAreaView className="flex-1 bg-bg">
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 48 }}
          >
            <View className="items-center mb-10">
              <Wordmark />
            </View>

            <SectionHeading level="section">Choose your version</SectionHeading>
            <Text className="text-ink-muted text-sm mb-6 -mt-4">This can be changed anytime in Settings.</Text>

            <View className="gap-3">
              {versions.map((v) => (
                <Pressable
                  key={v.value}
                  onPress={() => update({ version: v.value })}
                  className={[
                    'w-full px-4 py-4 rounded-xl border',
                    settings.version === v.value
                      ? 'border-accent bg-accent-quiet'
                      : 'border-border bg-surface',
                  ].join(' ')}
                >
                  <Text className="font-semibold text-ink">{v.label}</Text>
                  <Text className="text-sm text-ink-muted mt-0.5">{v.description}</Text>
                </Pressable>
              ))}
            </View>

            <Button variant="primary" size="lg" block className="mt-8" onPress={() => setStep(1)}>
              Continue
            </Button>
          </ScrollView>
        </SafeAreaView>
      </Theme>
    )
  }

  return (
    <Theme season="easter" className="flex-1">
      <SafeAreaView className="flex-1 bg-bg">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 48 }}
        >
          <SectionHeading level="office">A few options</SectionHeading>
          <Text className="text-ink-muted mb-8 -mt-4">All can be changed in Settings.</Text>

          <View className="gap-6">
            <View>
              <Text className="font-semibold text-ink mb-3">Officiant</Text>
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
                    <Text className={settings.officiantRole === r.value ? 'font-semibold text-accent' : 'text-ink-muted'}>
                      {r.label}
                    </Text>
                    <Text className="text-sm text-ink-muted mt-0.5">{r.description}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
            <Switch
              checked={settings.gloriaPatri}
              onChange={(v) => update({ gloriaPatri: v })}
              label="Gloria Patri after each Psalm"
              help='Adds "Glory to the Father..." after psalms'
            />
            <Switch
              checked={settings.minorFeastCollects}
              onChange={(v) => update({ minorFeastCollects: v })}
              label="Collects for minor feasts"
              help="Include proper collects for lesser feasts"
            />
          </View>

          <Button variant="primary" size="lg" block className="mt-10" onPress={() => completeOnboarding()}>
            Begin Praying
          </Button>

          <Button variant="ghost" block className="mt-3" onPress={() => setStep(0)}>
            Back
          </Button>
        </ScrollView>
      </SafeAreaView>
    </Theme>
  )
}
