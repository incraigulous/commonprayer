import type { PsalmDoc } from '@/types'

interface PsalmVerseProps {
  doc: PsalmDoc
}

export default function PsalmVerse({ doc }: PsalmVerseProps) {
  return (
    <article className="my-4">
      {/* Psalm label/heading */}
      {doc.label && (
        <h2 className="font-serif text-xl font-semibold text-gray-100 mb-3">
          {doc.label}
        </h2>
      )}

      {doc.value.map((section, si) => (
        <section key={si} className="mb-6">
          {/* Section heading (e.g. "Part I", antiphon label, etc.) */}
          {(section.label || section.localname) && (
            <h3 className="font-sans text-xs uppercase tracking-widest text-gray-500 mb-3">
              {section.localname ?? section.label}
            </h3>
          )}

          <div className="space-y-3 font-serif">
            {section.value.map((verse) => (
              <div key={verse.number} className="flex gap-3 items-start">
                {/* Verse number */}
                <span
                  className="flex-shrink-0 text-xs text-gray-500 font-sans tabular-nums pt-0.5 w-5 text-right select-none"
                  aria-label={`Verse ${verse.number}`}
                >
                  {verse.number}
                </span>

                {/* Verse text + halfverse */}
                <div className="flex-1">
                  <span className="text-gray-100 leading-relaxed">
                    {verse.verse}
                  </span>

                  {verse.halfverse && (
                    <span className="block pl-6 text-gray-100 leading-relaxed mt-0.5">
                      <span
                        className="text-gray-500 mr-1 select-none"
                        aria-hidden="true"
                      >
                        *
                      </span>
                      {verse.halfverse}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </article>
  )
}
