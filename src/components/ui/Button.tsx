import type { ReactNode, ElementType } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'gilt'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children?: ReactNode
  variant?: Variant
  size?: Size
  block?: boolean
  as?: ElementType
  href?: string
  className?: string
  onClick?: (e: React.MouseEvent) => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  'aria-label'?: string
  'aria-expanded'?: boolean | 'true' | 'false'
  'aria-controls'?: string
  'aria-pressed'?: boolean | 'true' | 'false'
  role?: string
  tabIndex?: number
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: [
    'bg-accent border-accent text-on-accent',
    'hover:bg-accent-hover hover:border-accent-hover',
    'active:bg-accent-press',
  ].join(' '),
  secondary: [
    'bg-transparent border-border-strong text-ink',
    'hover:border-ink hover:bg-surface-hover',
  ].join(' '),
  ghost: [
    'bg-transparent border-transparent text-ink-muted tracking-normal',
    'hover:text-ink hover:bg-surface-hover',
  ].join(' '),
  gilt: [
    'bg-transparent border-gilt text-gilt font-display tracking-caps uppercase',
    'hover:bg-gilt-quiet hover:text-gold-300',
  ].join(' '),
}

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'text-xs px-[0.8rem] py-[0.4rem]',
  md: 'text-sm px-5 py-2.5',
  lg: 'text-base px-[1.6rem] py-[0.8rem]',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  block = false,
  as,
  className,
  ...rest
}: ButtonProps) {
  const Tag = (as ?? (rest.href ? 'a' : 'button')) as ElementType
  return (
    <Tag
      className={[
        'inline-flex items-center justify-center gap-[0.5em]',
        'font-sans font-semibold leading-none whitespace-nowrap no-underline',
        'border rounded-md cursor-pointer',
        'tracking-[0.04em]',
        'transition-colors duration-[120ms]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
        'active:translate-y-px',
        'disabled:opacity-45 disabled:cursor-not-allowed disabled:translate-y-0',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        block ? 'flex w-full' : '',
        className ?? '',
      ].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </Tag>
  )
}
