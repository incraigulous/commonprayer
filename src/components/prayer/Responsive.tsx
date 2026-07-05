import type { ResponsiveDoc } from '@/types'

interface ResponsiveProps {
  doc: ResponsiveDoc
}

export default function Responsive({ doc }: ResponsiveProps) {
  return (
    <div className="my-4 space-y-1 font-serif">
      {doc.value.map((line, i) => (
        <div key={i} className="flex items-baseline gap-2">
          {/* Label column — fixed width, small italic, muted */}
          <span
            className="flex-shrink-0 w-20 text-xs italic text-gray-500 dark:text-gray-500 text-right leading-relaxed"
            aria-label={line.label}
          >
            {line.label ?? ''}
          </span>

          {/* Text — responses are indented */}
          <span
            className={[
              'flex-1 leading-relaxed text-gray-100',
              line.bold ? 'font-bold pl-8' : '',
            ].join(' ')}
          >
            {line.text}
          </span>
        </div>
      ))}
    </div>
  )
}
