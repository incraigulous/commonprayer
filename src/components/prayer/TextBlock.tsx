import type { TextDoc } from '@/types'
import { useSettings } from '@/store/settings'
import { englishTitle, traditionalTitle } from '@/liturgy/canticle-titles'

interface TextBlockProps {
  doc: TextDoc
}

export default function TextBlock({ doc }: TextBlockProps) {
  const { style, value, response, dropCap, label } = doc
  const { settings } = useSettings()
  const title = label && (settings.officiantRole === 'lay' ? englishTitle(label) : traditionalTitle(label))

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
        return 'text-ink leading-relaxed mb-2'
      case 'canticle':
        return 'text-ink leading-relaxed mb-2'
      case 'creed':
        return 'text-ink leading-relaxed mb-2'
      default:
        return 'text-ink leading-relaxed mb-2 font-serif'
    }
  })()

  return (
    <div className={`my-4 ${containerClass}`}>
      {style === 'canticle' && title && (
        <p className="font-display font-semibold text-lg text-ink mb-2">
          {title}
        </p>
      )}

      {value.map((paragraph, i) => {
        const isFirst = i === 0
        const showDropCap = dropCap && isFirst

        if (showDropCap) {
          // Split off the first character for the drop cap
          const [firstChar, ...rest] = paragraph
          const remaining = rest.join('')
          return (
            <p key={i} className={`${paragraphClass} whitespace-pre-line`}>
              <span
                className="float-left font-initial font-normal text-drop-cap leading-none mr-1 pt-1 text-gilt select-none"
                aria-hidden="true"
              >
                {firstChar}
              </span>
              <span aria-label={paragraph}>{remaining}</span>
            </p>
          )
        }

        return (
          <p key={i} className={`${paragraphClass} whitespace-pre-line`}>
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
