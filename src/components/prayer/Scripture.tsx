import type { ReactNode } from 'react'

interface ScriptureProps {
  children: ReactNode
  cite?: string
  variant?: 'quiet' | 'illuminated'
  mark?: boolean
  className?: string
}

export default function Scripture({
  children,
  cite,
  variant = 'quiet',
  mark = true,
  className,
}: ScriptureProps) {
  const isIlluminated = variant === 'illuminated'
  return (
    <figure
      className={[
        'relative my-5',
        isIlluminated
          ? 'border border-gilt border-l-[1.5px] rounded-md shadow-[inset_0_0_0_1px_var(--gilt-quiet)] py-4 px-5'
          : 'pl-5 pr-4 py-4 border-l-[1.5px] border-accent bg-surface-sunk rounded-r-md',
        className ?? '',
      ].filter(Boolean).join(' ')}
    >
      <blockquote className="font-serif text-lg leading-relaxed text-ink m-0 space-y-3">
        {children}
      </blockquote>
      {(cite || mark) && (
        <figcaption className="flex items-center justify-between gap-3 mt-3">
          {cite
            ? <cite className="font-sans text-xs uppercase tracking-caps text-ink-muted not-italic">{cite}</cite>
            : <span />
          }
          {mark && (
            <span className="font-display text-gilt text-xl leading-none" aria-hidden="true">✟</span>
          )}
        </figcaption>
      )}
    </figure>
  )
}
