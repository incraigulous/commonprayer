import type { ReactNode, ElementType } from 'react'

type HeadingLevel = 'display' | 'office' | 'section'

interface SectionHeadingProps {
  children: ReactNode
  eyebrow?: ReactNode
  level?: HeadingLevel
  rule?: boolean
  center?: boolean
  as?: ElementType
  className?: string
}

const LEVEL_CLASSES: Record<HeadingLevel, string> = {
  display: 'text-[2.5rem] font-semibold',
  office: 'text-[1.875rem]',
  section: 'text-[1.5rem]',
}

export default function SectionHeading({
  children,
  eyebrow,
  level = 'section',
  rule = true,
  center = false,
  as: Tag = 'h2',
  className,
}: SectionHeadingProps) {
  return (
    <header
      className={[
        'mb-6',
        center ? 'text-center' : '',
        className ?? '',
      ].filter(Boolean).join(' ')}
    >
      {eyebrow && (
        <p className="font-sans text-xs uppercase tracking-caps text-accent mb-2 m-0">
          {eyebrow}
        </p>
      )}
      <Tag className={['font-display font-bold leading-[1.22] text-ink m-0', LEVEL_CLASSES[level]].join(' ')}>
        {children}
      </Tag>
      {rule && (
        <span
          className={[
            'block w-10 border-0 mt-3',
            'h-[1.5px] bg-accent',
            center ? 'mx-auto' : '',
          ].filter(Boolean).join(' ')}
          aria-hidden="true"
        />
      )}
    </header>
  )
}
