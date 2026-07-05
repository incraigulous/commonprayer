type Tab = 'morning' | 'noon' | 'evening' | 'more'

interface TabBarProps {
  active: Tab
  onSelect: (tab: Tab) => void
}

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'morning', label: 'Morning', icon: '🌅' },
  { id: 'noon',    label: 'Noon',    icon: '☀️' },
  { id: 'evening', label: 'Evening', icon: '🌙' },
  { id: 'more',    label: 'More',    icon: '···' },
]

export default function TabBar({ active, onSelect }: TabBarProps) {
  return (
    <nav
      aria-label="Prayer offices"
      className="flex bg-gray-900 border-b border-gray-800 select-none"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            aria-current={isActive ? 'page' : undefined}
            className={[
              'relative flex flex-1 flex-col items-center justify-center gap-0.5',
              'py-2.5 px-1 text-xs font-medium transition-colors duration-150',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500',
              isActive
                ? 'text-white'
                : 'text-gray-400 hover:text-gray-200',
            ].join(' ')}
          >
            {/* Icon */}
            <span
              className={[
                'text-base leading-none',
                tab.id === 'more' ? 'text-lg tracking-widest font-bold' : '',
              ].join(' ')}
              aria-hidden="true"
            >
              {tab.icon}
            </span>

            {/* Label */}
            <span>{tab.label}</span>

            {/* Active indicator bar */}
            {isActive && (
              <span
                className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-rubric dark:bg-rubric-dark"
                aria-hidden="true"
              />
            )}
          </button>
        )
      })}
    </nav>
  )
}
