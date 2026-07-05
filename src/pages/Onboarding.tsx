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
      <div className="min-h-dvh bg-gray-950 flex flex-col px-6 py-12">
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <h1 className="text-3xl font-serif text-gray-100 mb-2">Common Prayer</h1>
          <p className="text-gray-400 mb-10 text-lg">Daily prayer from the 1979 Book of Common Prayer</p>

          <h2 className="text-xl font-semibold text-gray-200 mb-1">Choose your version</h2>
          <p className="text-gray-400 text-sm mb-6">This can be changed anytime in Settings.</p>

          <div className="space-y-3">
            {versions.map((v) => (
              <button
                key={v.value}
                onClick={() => update({ version: v.value })}
                className={`w-full text-left px-4 py-4 rounded-xl border transition-colors ${
                  settings.version === v.value
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-700 bg-gray-900 hover:border-gray-500'
                }`}
              >
                <div className="font-semibold text-gray-100">{v.label}</div>
                <div className="text-sm text-gray-400 mt-0.5">{v.description}</div>
              </button>
            ))}
          </div>

          <button
            onClick={() => setStep(1)}
            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-gray-950 flex flex-col px-6 py-12">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <h2 className="text-2xl font-serif text-gray-100 mb-2">A few options</h2>
        <p className="text-gray-400 mb-8">All can be changed in Settings.</p>

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
          className="mt-10 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-colors"
        >
          Begin Praying
        </button>

        <button
          onClick={() => setStep(0)}
          className="mt-3 w-full text-gray-400 py-2 text-sm"
        >
          Back
        </button>
      </div>
    </div>
  )
}
