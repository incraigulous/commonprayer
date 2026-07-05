import { useNavigate } from 'react-router-dom'
import Icon from '@/components/ui/Icon'

const PSALM_GROUPS = [
  { label: 'Book I', range: [1, 41] },
  { label: 'Book II', range: [42, 72] },
  { label: 'Book III', range: [73, 89] },
  { label: 'Book IV', range: [90, 106] },
  { label: 'Book V', range: [107, 150] },
]

export default function Psalter() {
  const navigate = useNavigate()

  return (
    <div className="min-h-dvh bg-bg">
      <header className="flex items-center gap-4 px-4 py-4 border-b border-border">
        <button onClick={() => navigate(-1)} className="text-accent p-2 -ml-2">
          <Icon name="chevron-left" size="1.25rem" />
        </button>
        <h1 className="text-lg font-display font-semibold text-ink">Psalter</h1>
      </header>

      <div className="px-4 py-4">
        {PSALM_GROUPS.map((group) => (
          <section key={group.label} className="mb-6">
            <h2 className="text-xs uppercase tracking-caps text-ink-subtle mb-3 px-1">{group.label}</h2>
            <div className="grid grid-cols-5 gap-2">
              {Array.from(
                { length: group.range[1] - group.range[0] + 1 },
                (_, i) => i + group.range[0]
              ).map((num) => (
                <button
                  key={num}
                  onClick={() => navigate(`/psalter/${num}`)}
                  className="bg-surface hover:bg-surface-hover rounded-lg py-3 text-ink font-medium transition-colors"
                >
                  {num}
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
