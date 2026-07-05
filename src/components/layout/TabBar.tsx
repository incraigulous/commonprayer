import Icon, { type IconName } from '@/components/ui/Icon'

type Tab = 'morning' | 'noon' | 'evening' | 'more'

interface TabBarProps {
  active: Tab
  onSelect: (tab: Tab) => void
}

const tabs: { id: Tab; label: string; icon: IconName }[] = [
  { id: 'morning', label: 'Morning', icon: 'sunrise' },
  { id: 'noon',    label: 'Noon',    icon: 'sun' },
  { id: 'evening', label: 'Evening', icon: 'moon' },
  { id: 'more',    label: 'More',    icon: 'more-horizontal' },
]

export default function TabBar({ active, onSelect }: TabBarProps) {
  return (
    <nav
      aria-label="Prayer offices"
      className="flex bg-surface border-t border-border select-none"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            aria-current={isActive ? 'page' : undefined}
            className={[
              'relative flex flex-1 flex-col items-center justify-center gap-1',
              'py-2.5 px-1 -mt-px border-t-2 font-sans text-xs tracking-wide transition-colors duration-150',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent',
              isActive
                ? 'text-ink border-accent'
                : 'text-ink-muted border-transparent hover:text-ink',
            ].join(' ')}
          >
            <Icon name={tab.icon} size="1.35rem" className={isActive ? 'text-accent' : undefined} />
            <span>{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
