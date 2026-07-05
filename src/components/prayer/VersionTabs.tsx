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
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
              isActive
                ? 'bg-rubric dark:bg-rubric-dark text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200',
            ].join(' ')}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
