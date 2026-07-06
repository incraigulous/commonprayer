import { useState } from 'react'
import { View, Text, Pressable, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSettings } from '@/store/settings'
import Toggle from '@/components/ui/Toggle'
import type { LiturgicalVersion } from '@/types'

const versions: { value: LiturgicalVersion; label: string; description: string }[] = [
  { value: 'rite-ii', label: 'Rite II', description: 'Contemporary language — recommended for most users' },
  { value: 'rite-i', label: 'Rite I', description: 'Traditional language ("thee", "thy")' },
  { value: 'eow', label: 'Enriching Our Worship', description: 'Expansive language with inclusive imagery for God' },
  { value: 'daily-devotions', label: 'Daily Devotions', description: 'Shorter form for morning, noon, evening, and close of day' },
]

export default function Onboarding() {
  const { settings, update, completeOnboarding } = useSettings()
  const [step, setStep] = useState(0)

  if (step === 0) {
    return (
      <SafeAreaView className="flex-1 bg-bg">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 48 }}
        >
          <Text className="text-3xl font-display text-ink mb-2">Common Prayer</Text>
          <Text className="text-ink-muted mb-10 text-lg">Daily prayer from the 1979 Book of Common Prayer</Text>

          <Text className="text-xl font-display font-semibold text-ink mb-1">Choose your version</Text>
          <Text className="text-ink-muted text-sm mb-6">This can be changed anytime in Settings.</Text>

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

          <Pressable
            onPress={() => setStep(1)}
            className="mt-8 w-full bg-accent items-center py-4 rounded-xl"
          >
            <Text className="text-white font-semibold text-base">Continue</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 48 }}
      >
        <Text className="text-2xl font-display text-ink mb-2">A few options</Text>
        <Text className="text-ink-muted mb-8">All can be changed in Settings.</Text>

        <View className="gap-6">
          <Toggle
            id="onboarding-gloria"
            checked={settings.gloriaPatri}
            onChange={(v) => update({ gloriaPatri: v })}
            label="Gloria Patri after each Psalm"
            description='Adds "Glory to the Father..." after psalms'
          />
          <Toggle
            id="onboarding-minor-feasts"
            checked={settings.minorFeastCollects}
            onChange={(v) => update({ minorFeastCollects: v })}
            label="Collects for minor feasts"
            description="Include proper collects for lesser feasts"
          />
        </View>

        <Pressable
          onPress={() => completeOnboarding()}
          className="mt-10 w-full bg-accent items-center py-4 rounded-xl"
        >
          <Text className="text-white font-semibold text-base">Begin Praying</Text>
        </Pressable>

        <Pressable
          onPress={() => setStep(0)}
          className="mt-3 w-full items-center py-2"
        >
          <Text className="text-ink-muted text-sm">Back</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}
