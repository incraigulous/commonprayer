import { useNavigate } from 'react-router-dom'
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

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
        checked ? 'bg-accent' : 'bg-border-strong'
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
    <div className="flex items-center justify-between py-4 border-b border-border">
      <div className="flex-1 pr-4">
        <div className="text-ink font-medium">{label}</div>
        {description && <div className="text-sm text-ink-muted mt-0.5">{description}</div>}
      </div>
      {right}
    </div>
  )
}

export default function SettingsPage() {
  const navigate = useNavigate()
  const { settings, update } = useSettings()

  return (
    <div className="min-h-dvh bg-bg">
      <header className="flex items-center gap-4 px-4 py-4 border-b border-border">
        <button onClick={() => navigate(-1)} className="text-accent p-2 -ml-2">
          <Icon name="chevron-left" size="1.25rem" />
        </button>
        <h1 className="text-lg font-display font-semibold text-ink">Settings</h1>
      </header>

      <div className="px-4 pb-8">
        <section className="mt-6 mb-2">
          <h2 className="text-xs uppercase tracking-caps text-ink-subtle mb-3">Appearance</h2>
          <div className="bg-surface rounded-xl overflow-hidden">
            {themes.map((t) => (
              <button
                key={t.value}
                onClick={() => update({ theme: t.value })}
                className={`w-full text-left px-4 py-3 capitalize border-b border-border last:border-0 transition-colors flex items-center justify-between ${
                  settings.theme === t.value
                    ? 'text-accent bg-accent-quiet'
                    : 'text-ink-muted hover:bg-surface-hover'
                }`}
              >
                {t.label}
                {settings.theme === t.value && <Icon name="check" size="1rem" />}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6 mb-2">
          <h2 className="text-xs uppercase tracking-caps text-ink-subtle mb-3">Version</h2>
          <div className="space-y-1">
            {versions.map((v) => (
              <button
                key={v.value}
                onClick={() => update({ version: v.value })}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between ${
                  settings.version === v.value
                    ? 'bg-accent-quiet text-accent'
                    : 'bg-surface text-ink-muted hover:bg-surface-hover'
                }`}
              >
                <span className={settings.version === v.value ? 'font-semibold' : ''}>{v.label}</span>
                {settings.version === v.value && <Icon name="check" size="1rem" />}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6 mb-2">
          <h2 className="text-xs uppercase tracking-caps text-ink-subtle mb-3">Officiant</h2>
          <div className="bg-surface rounded-xl overflow-hidden">
            {officiantRoles.map((r) => (
              <button
                key={r.value}
                onClick={() => update({ officiantRole: r.value })}
                className={`w-full text-left px-4 py-3 border-b border-border last:border-0 transition-colors ${
                  settings.officiantRole === r.value
                    ? 'bg-accent-quiet'
                    : 'hover:bg-surface-hover'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={settings.officiantRole === r.value ? 'font-semibold text-accent' : 'text-ink-muted'}>
                    {r.label}
                  </span>
                  {settings.officiantRole === r.value && <Icon name="check" size="1rem" className="text-accent" />}
                </div>
                <div className="text-sm text-ink-muted mt-0.5">{r.description}</div>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-xs uppercase tracking-caps text-ink-subtle mb-3">Preferences</h2>
          <div className="bg-surface rounded-xl px-4">
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
          <h2 className="text-xs uppercase tracking-caps text-ink-subtle mb-3">Angelus</h2>
          <div className="bg-surface rounded-xl overflow-hidden">
            {(['none', 'morning', 'noon', 'evening', 'all'] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => update({ angelus: opt })}
                className={`w-full text-left px-4 py-3 capitalize border-b border-border last:border-0 transition-colors flex items-center justify-between ${
                  settings.angelus === opt ? 'text-accent bg-accent-quiet' : 'text-ink-muted hover:bg-surface-hover'
                }`}
              >
                {opt === 'none' ? 'None' : opt.charAt(0).toUpperCase() + opt.slice(1)}
                {settings.angelus === opt && <Icon name="check" size="1rem" />}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
