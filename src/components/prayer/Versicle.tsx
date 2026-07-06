interface VersiculeLine {
  by: string
  text: string
  response?: boolean
}

interface VersicleProps {
  lines: VersiculeLine[]
  className?: string
}

export default function Versicle({ lines, className }: VersicleProps) {
  return (
    <div className={['grid gap-2 my-4', className ?? ''].filter(Boolean).join(' ')}>
      {lines.map((ln, i) => (
        <div
          key={i}
          className="grid grid-cols-[6.5rem_1fr] gap-3 items-baseline max-[32rem]:grid-cols-1 max-[32rem]:gap-0"
        >
          <span
            className="font-sans text-xs uppercase tracking-caps text-accent text-right leading-relaxed select-none max-[32rem]:text-left"
            aria-label={ln.by}
          >
            {ln.by}
          </span>
          <p className={['font-serif text-base leading-[1.5] text-ink m-0', ln.response ? 'font-semibold' : ''].filter(Boolean).join(' ')}>
            {ln.text}
          </p>
        </div>
      ))}
    </div>
  )
}
