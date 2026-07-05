import type { ResponsiveDoc } from '@/types'
import { useSettings } from '@/store/settings'

interface ResponsiveProps {
  doc: ResponsiveDoc
}

// A versicle-and-response exchange (Officiant / People).
export default function Responsive({ doc }: ResponsiveProps) {
  const { settings } = useSettings()
  const showLabels = settings.officiantRole === 'priest'

  return (
    <div className="my-4 grid gap-2">
      {doc.value.map((line, i) => {
        const isResponse = line.label?.toLowerCase() === 'people' || line.bold
        return (
          <div
            key={i}
            className={
              showLabels
                ? 'grid grid-cols-[6.5rem_1fr] gap-3 items-baseline max-[32rem]:grid-cols-1 max-[32rem]:gap-0'
                : ''
            }
          >
            {/* Speaker label — small-caps rubric-red. Hidden for a lay reader
                praying alone: there's no second party to name as "People." */}
            {showLabels && (
              <span
                className="font-sans text-xs uppercase tracking-caps text-accent text-right leading-relaxed select-none max-[32rem]:text-left"
                aria-label={line.label}
              >
                {line.label ?? ''}
              </span>
            )}

            {/* Text */}
            <p
              className={[
                'font-serif leading-relaxed text-ink m-0',
                isResponse ? 'font-semibold' : '',
              ].join(' ')}
            >
              {line.text}
            </p>
          </div>
        )
      })}
    </div>
  )
}
