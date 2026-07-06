import type { ReactNode } from 'react'

type CalloutVariant = 'note' | 'prayer' | 'blessing' | 'refrain'

const GLYPHS: Record<CalloutVariant, string> = {
  prayer: '✟',
  blessing: '✠',
  note: '✵',
  refrain: '❧',
}

interface CalloutProps {
  children: ReactNode
  variant?: CalloutVariant
  title?: string
  glyph?: string
  className?: string
}

const CONTAINER_CLASSES: Record<CalloutVariant, string> = {
  note: 'border border-border bg-surface-raised rounded-lg py-4 px-5',
  prayer: 'border border-gilt bg-surface-raised rounded-lg shadow-[inset_0_0_0_1px_var(--gilt-quiet)] py-4 px-5',
  blessing: 'border border-gilt bg-gilt-quiet rounded-lg text-center py-4 px-5',
  refrain: 'border-0 border-l-[1.5px] border-accent bg-transparent rounded-none pl-4',
}

const HEAD_CLASSES: Record<CalloutVariant, string> = {
  note: 'text-ink-muted',
  prayer: 'text-gold-300',
  blessing: 'text-gold-300 justify-center',
  refrain: 'text-accent',
}

export default function Callout({
  children,
  variant = 'note',
  title,
  glyph,
  className,
}: CalloutProps) {
  const mark = glyph ?? GLYPHS[variant]
  return (
    <aside className={[CONTAINER_CLASSES[variant], className ?? ''].filter(Boolean).join(' ')}>
      {title && (
        <p
          className={[
            'flex items-center gap-[0.5em] mb-2 m-0',
            'font-sans text-xs uppercase tracking-caps',
            HEAD_CLASSES[variant],
          ].join(' ')}
        >
          {mark && (
            <span className="font-display text-[1.1em] leading-none" aria-hidden="true">
              {mark}
            </span>
          )}
          {title}
        </p>
      )}
      <div className="font-serif text-base leading-[1.68] text-ink [&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {children}
      </div>
    </aside>
  )
}
