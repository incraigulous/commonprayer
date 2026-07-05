import type { ReactNode } from 'react'

type BadgeVariant = 'default' | 'rubric' | 'gilt' | 'sage' | 'violet' | 'solid'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  default: 'border-border-strong text-ink-muted',
  rubric: 'text-accent border-accent bg-accent-quiet',
  gilt: 'text-gold-300 border-gold-500 bg-gilt-quiet',
  sage: 'text-sage border-sage bg-sage/[0.14]',
  violet: 'text-violet border-violet bg-violet/[0.18]',
  solid: 'text-on-accent bg-accent border-accent',
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-[0.4em]',
        'font-sans text-xs font-semibold tracking-caps uppercase',
        'px-[0.7em] py-[0.28em] rounded-full',
        'border leading-none whitespace-nowrap',
        VARIANT_CLASSES[variant],
        className ?? '',
      ].filter(Boolean).join(' ')}
    >
      {children}
    </span>
  )
}
