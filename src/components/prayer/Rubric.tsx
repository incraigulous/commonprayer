interface RubricProps {
  value: string[]
}

export default function Rubric({ value }: RubricProps) {
  return (
    <div className="my-3 space-y-1" role="note" aria-label="Liturgical direction">
      {value.map((paragraph, i) => (
        <p
          key={i}
          className="text-rubric dark:text-rubric-dark italic text-sm leading-relaxed"
        >
          {paragraph}
        </p>
      ))}
    </div>
  )
}
