import { useSettings } from '@/store/settings'

interface RubricProps {
  value: string[]
}

export default function Rubric({ value }: RubricProps) {
  const { settings } = useSettings()

  // Rubrics are directions to a priest/officiant leading the service aloud
  // ("The Officiant says", "Silence may be kept"). A lay reader doesn't need
  // stage directions read out — the surrounding section headings (e.g.
  // "Confession of Sin") already say what each part of the office is.
  if (settings.officiantRole === 'lay') {
    return null
  }

  return (
    <div className="my-3 space-y-1" role="note" aria-label="Liturgical direction">
      {value.map((paragraph, i) => (
        <p
          key={i}
          className="font-serif text-accent italic text-sm leading-relaxed whitespace-pre-line"
        >
          {paragraph}
        </p>
      ))}
    </div>
  )
}
