import type { ReactNode } from 'react'

type TabsVariant = 'underline' | 'bar'

export interface TabItem {
  id: string
  label: string
  icon?: ReactNode
}

interface TabsProps {
  items: TabItem[]
  value?: string
  onChange?: (id: string) => void
  variant?: TabsVariant
  className?: string
  'aria-label'?: string
}

export default function Tabs({
  items,
  value,
  onChange,
  variant = 'underline',
  className,
  'aria-label': ariaLabel,
}: TabsProps) {
  const active = value ?? items[0]?.id

  if (variant === 'bar') {
    return (
      <nav
        role="tablist"
        aria-label={ariaLabel}
        className={[
          'flex bg-surface border-t border-border select-none',
          className ?? '',
        ].filter(Boolean).join(' ')}
      >
        {items.map((item) => {
          const isActive = item.id === active
          return (
            <button
              key={item.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => onChange?.(item.id)}
              className={[
                'relative flex flex-1 flex-col items-center justify-center gap-1',
                'py-2.5 px-1 -mt-px border-t-2 font-sans text-xs tracking-wide transition-colors duration-[120ms]',
                'focus:outline-none focus-visible:[box-shadow:var(--focus-ring)]',
                isActive
                  ? 'text-ink border-accent'
                  : 'text-ink-muted border-transparent hover:text-ink',
              ].join(' ')}
            >
              {item.icon != null && (
                <span
                  className={['flex text-[1.35rem]', isActive ? 'text-accent' : ''].filter(Boolean).join(' ')}
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
              )}
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>
    )
  }

  // underline variant
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={[
        'flex gap-5 border-b border-border',
        className ?? '',
      ].filter(Boolean).join(' ')}
    >
      {items.map((item) => {
        const isActive = item.id === active
        return (
          <button
            key={item.id}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => onChange?.(item.id)}
            className={[
              'appearance-none bg-transparent border-0 cursor-pointer',
              'font-display text-lg pb-3 -mb-px',
              'border-b-[1.5px]',
              'transition-[color,border-color] duration-[120ms]',
              'focus:outline-none focus-visible:[box-shadow:var(--focus-ring)]',
              isActive
                ? 'text-ink border-accent'
                : 'text-ink-muted border-transparent hover:text-ink',
            ].join(' ')}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
