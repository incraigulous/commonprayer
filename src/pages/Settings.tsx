import { useNavigate } from 'react-router-dom'
import { useSettings } from '@/store/settings'
import type { LiturgicalVersion } from '@/types'

const versions: { value: LiturgicalVersion; label: string }[] = [
  { value: 'rite-ii', label: 'Rite II' },
  { value: 'rite-i', label: 'Rite I' },
  { value: 'eow', label: 'Enriching Our Worship' },
  { value: 'daily-devotions', label: 'Daily Devotions' },
]

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
        checked ? 'bg-blue-600' : 'bg-gray-600'
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

function Row({ label, description, right }: { label: string; description?: string; right: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-800">
      <div className="flex-1 pr-4">
        <div className="text-gray-100 font-medium">{label}</div>
        {description && <div className="text-sm text-gray-400 mt-0.5">{description}</div>}
      </div>
      {right}
    </div>
  )
}

export default function SettingsPage() {
  const navigate = useNavigate()
  const { settings, update } = useSettings()

  return (
    <div className="min-h-dvh bg-gray-950">
      <header className="flex items-center gap-4 px-4 py-4 border-b border-gray-800">
        <button onClick={() => navigate(-1)} className="text-blue-400 text-lg p-2 -ml-2">
          ←
        </button>
        <h1 className="text-lg font-semibold text-gray-100">Settings</h1>
      </header>

      <div className="px-4 pb-8">
        <section className="mt-6 mb-2">
          <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-3">Version</h2>
          <div className="space-y-1">
            {versions.map((v) => (
              <button
                key={v.value}
                onClick={() => update({ version: v.value })}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  settings.version === v.value
                    ? 'bg-blue-600/20 text-blue-300'
                    : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
                }`}
              >
                <span className={settings.version === v.value ? 'font-semibold' : ''}>{v.label}</span>
                {settings.version === v.value && <span className="float-right">✓</span>}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-3">Preferences</h2>
          <div className="bg-gray-900 rounded-xl px-4">
            <Row
              label="Vigil Office"
              description="Add a Vigil reading before Morning Prayer"
              right={<Toggle checked={settings.vigil} onChange={(v) => update({ vigil: v })} />}
            />
            <Row
              label="Gloria Patri after each Psalm"
              right={<Toggle checked={settings.gloriaPatri} onChange={(v) => update({ gloriaPatri: v })} />}
            />
            <Row
              label="Collects for minor feasts"
              right={<Toggle checked={settings.minorFeastCollects} onChange={(v) => update({ minorFeastCollects: v })} />}
            />
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-3">Angelus</h2>
          <div className="bg-gray-900 rounded-xl overflow-hidden">
            {(['none', 'morning', 'noon', 'evening', 'all'] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => update({ angelus: opt })}
                className={`w-full text-left px-4 py-3 capitalize border-b border-gray-800 last:border-0 transition-colors ${
                  settings.angelus === opt ? 'text-blue-300 bg-blue-600/10' : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                {opt === 'none' ? 'None' : opt.charAt(0).toUpperCase() + opt.slice(1)}
                {settings.angelus === opt && <span className="float-right text-blue-400">✓</span>}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
