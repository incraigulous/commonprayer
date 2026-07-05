import { useNavigate } from 'react-router-dom'
import Icon from '@/components/ui/Icon'

const LITURGIES = [
  { key: 'compline', label: 'Compline', description: 'The office at the close of day' },
  { key: 'penitential', label: 'A Penitential Order', description: 'BCP pp. 319–321', comingSoon: true },
  { key: 'eucharist', label: 'Holy Eucharist', description: 'BCP pp. 322–395', comingSoon: true },
  { key: 'marriage', label: 'Celebration and Blessing of a Marriage', description: 'BCP pp. 422–432', comingSoon: true },
  { key: 'burial', label: 'Burial of the Dead', description: 'BCP pp. 469–507', comingSoon: true },
  { key: 'ministration', label: 'Ministration to the Sick', description: 'BCP pp. 453–461', comingSoon: true },
]

export default function MoreLiturgies() {
  const navigate = useNavigate()

  return (
    <div className="min-h-dvh bg-bg">
      <header className="flex items-center gap-4 px-4 py-4 border-b border-border">
        <button onClick={() => navigate(-1)} className="text-accent p-2 -ml-2">
          <Icon name="chevron-left" size="1.25rem" />
        </button>
        <h1 className="text-lg font-display font-semibold text-ink">Other Liturgies</h1>
      </header>

      <div className="px-4 py-4 max-w-lg mx-auto space-y-2">
        {LITURGIES.map((l) => (
          <button
            key={l.key}
            disabled={l.comingSoon}
            onClick={() => l.comingSoon ? undefined : navigate(`/compline`)}
            className={`w-full text-left bg-surface rounded-xl px-4 py-4 transition-colors ${
              l.comingSoon ? 'opacity-50' : 'hover:bg-surface-hover'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-ink font-medium">{l.label}</div>
                <div className="text-sm text-ink-subtle mt-0.5">{l.description}</div>
              </div>
              {l.comingSoon ? (
                <span className="text-xs bg-surface-hover text-ink-muted px-2 py-0.5 rounded-full">Soon</span>
              ) : (
                <Icon name="chevron-right" size="1.1rem" className="text-ink-subtle" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
