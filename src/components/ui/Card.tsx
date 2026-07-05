import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  variant?: 'default' | 'sunk' | 'flat' | 'illuminated'
  eyebrow?: ReactNode
  title?: ReactNode
  className?: string
}

// A ruled parchment card — used in the lay office to give short, self-contained
// sections (a collect, the reconciliation prayer, a versicle exchange) a visual
// boundary that would otherwise come from the rubric preceding them.
export default function Card({ children, variant = 'default', eyebrow, title, className }: CardProps) {
  const bgClass = variant === 'sunk' ? 'bg-surface-sunk' : variant === 'flat' ? 'bg-transparent' : 'bg-surface-raised'
  const borderClass = variant === 'illuminated'
    ? 'border-[1.5px] border-gilt shadow-[inset_0_0_0_1px_var(--gilt-quiet)]'
    : 'border border-border'

  return (
    <div className={[bgClass, borderClass, 'rounded-lg p-5 text-ink', className ?? ''].join(' ')}>
      {eyebrow && (
        <div className="font-sans text-xs uppercase tracking-caps text-accent mb-2">
          {eyebrow}
        </div>
      )}
      {title && (
        <div className="font-display font-semibold text-xl leading-tight text-ink mb-3">
          {title}
        </div>
      )}
      <div className="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}
