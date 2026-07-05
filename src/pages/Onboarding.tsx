import { useState } from 'react'
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

  function finish() {
    completeOnboarding()
  }

  if (step === 0) {
    return (
      <div className="min-h-dvh bg-bg flex flex-col px-6 py-12">
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <h1 className="text-3xl font-display text-ink mb-2">Common Prayer</h1>
          <p className="text-ink-muted mb-10 text-lg">Daily prayer from the 1979 Book of Common Prayer</p>

          <h2 className="text-xl font-display font-semibold text-ink mb-1">Choose your version</h2>
          <p className="text-ink-muted text-sm mb-6">This can be changed anytime in Settings.</p>

          <div className="space-y-3">
            {versions.map((v) => (
              <button
                key={v.value}
                onClick={() => update({ version: v.value })}
                className={`w-full text-left px-4 py-4 rounded-xl border transition-colors ${
                  settings.version === v.value
                    ? 'border-accent bg-accent-quiet'
                    : 'border-border bg-surface hover:border-border-strong'
                }`}
              >
                <div className="font-semibold text-ink">{v.label}</div>
                <div className="text-sm text-ink-muted mt-0.5">{v.description}</div>
              </button>
            ))}
          </div>

          <button
            onClick={() => setStep(1)}
            className="mt-8 w-full bg-accent hover:opacity-90 text-white font-semibold py-4 rounded-xl transition-opacity"
          >
            Continue
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-bg flex flex-col px-6 py-12">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <h2 className="text-2xl font-display text-ink mb-2">A few options</h2>
        <p className="text-ink-muted mb-8">All can be changed in Settings.</p>

        <div className="space-y-6">
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
        </div>

        <button
          onClick={finish}
          className="mt-10 w-full bg-accent hover:opacity-90 text-white font-semibold py-4 rounded-xl transition-opacity"
        >
          Begin Praying
        </button>

        <button
          onClick={() => setStep(0)}
          className="mt-3 w-full text-ink-muted py-2 text-sm"
        >
          Back
        </button>
      </div>
    </div>
  )
}
