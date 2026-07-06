import type { ReactNode } from 'react'

interface IlluminatedInitialProps {
  letter: string
  children: ReactNode
  variant?: 'gilt' | 'rubric' | 'ink'
  boxed?: boolean
  className?: string
}

const CAP_COLOR: Record<'gilt' | 'rubric' | 'ink', string> = {
  gilt: 'text-gilt',
  rubric: 'text-accent',
  ink: 'text-ink',
}

export default function IlluminatedInitial({
  letter,
  children,
  variant = 'gilt',
  boxed = false,
  className,
}: IlluminatedInitialProps) {
  const capColor = CAP_COLOR[variant]

  const capClass = boxed
    ? [
        'flex items-center justify-center float-left',
        'w-[1.5em] h-[1.5em] mr-[0.35em] my-[0.08em]',
        'font-initial text-[2.5em] leading-none',
        'border-2 rounded-sm select-none',
        variant === 'rubric'
          ? 'border-accent bg-accent-quiet'
          : 'border-gilt bg-gilt-quiet shadow-[inset_0_0_0_1px_var(--gilt-quiet)]',
        capColor,
      ].filter(Boolean).join(' ')
    : [
        'float-left font-initial text-drop-cap leading-[0.72]',
        'mr-[0.12em] mt-[0.04em] select-none',
        capColor,
      ].filter(Boolean).join(' ')

  return (
    <p className={['m-0', className ?? ''].filter(Boolean).join(' ')}>
      <span className={capClass} aria-hidden="true">{letter}</span>
      {children}
    </p>
  )
}
