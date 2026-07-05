import type { OptionDoc } from '@/types'

interface VersionTabsProps {
  doc: OptionDoc
  onSelect: (idx: number) => void
}

export default function VersionTabs({ doc, onSelect }: VersionTabsProps) {
  const labels = doc.metadata.label ?? doc.value.map((_, i) => `Option ${i + 1}`)
  const selected = doc.metadata.selected ?? 0

  if (labels.length <= 1) return null

  return (
    <div
      className="flex gap-1 flex-wrap mb-3"
      role="tablist"
      aria-label="Versions"
    >
      {labels.map((label, i) => {
        const isActive = i === selected
        return (
          <button
            key={i}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(i)}
            className={[
              'px-3 py-1 rounded-full text-xs font-medium transition-colors duration-150',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
              isActive
                ? 'bg-accent text-white'
                : 'bg-surface-hover text-ink-muted hover:bg-border-strong hover:text-ink',
            ].join(' ')}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
