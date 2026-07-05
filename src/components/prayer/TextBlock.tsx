import type { TextDoc } from '@/types'

interface TextBlockProps {
  doc: TextDoc
}

export default function TextBlock({ doc }: TextBlockProps) {
  const { style, value, response, dropCap } = doc

  // Determine container / text classes by style
  const containerClass = (() => {
    switch (style) {
      case 'collect':
        return 'pl-6 pr-2'
      case 'canticle':
        return 'font-serif text-lg'
      case 'creed':
        return ''
      default:
        return 'font-serif'
    }
  })()

  const paragraphClass = (() => {
    switch (style) {
      case 'collect':
        return 'text-gray-100 leading-relaxed mb-2'
      case 'canticle':
        return 'text-gray-100 leading-relaxed mb-2'
      case 'creed':
        return 'text-gray-100 leading-relaxed mb-2'
      default:
        return 'text-gray-100 leading-relaxed mb-2 font-serif'
    }
  })()

  return (
    <div className={`my-4 ${containerClass}`}>
      {value.map((paragraph, i) => {
        const isFirst = i === 0
        const showDropCap = dropCap && isFirst

        if (showDropCap) {
          // Split off the first character for the drop cap
          const [firstChar, ...rest] = paragraph
          const remaining = rest.join('')
          return (
            <p key={i} className={paragraphClass}>
              <span
                className="float-left font-serif text-drop-cap leading-none mr-1 text-gray-100 select-none"
                aria-hidden="true"
              >
                {firstChar}
              </span>
              <span aria-label={paragraph}>{remaining}</span>
            </p>
          )
        }

        return (
          <p key={i} className={paragraphClass}>
            {paragraph}
          </p>
        )
      })}

      {response && (
        <p className={`${paragraphClass} font-bold mt-1`}>
          {response}
        </p>
      )}
    </div>
  )
}
