import { useNavigate, useParams } from 'react-router-dom'
import { useMemo } from 'react'
import { getPsalmSections } from '@/liturgy/psalter'
import Icon from '@/components/ui/Icon'

export default function PsalmDetail() {
  const navigate = useNavigate()
  const { num } = useParams<{ num: string }>()
  const sections = useMemo(() => (num ? getPsalmSections(num) : []), [num])

  return (
    <div className="min-h-dvh bg-bg">
      <header className="flex items-center gap-4 px-4 py-4 border-b border-border">
        <button onClick={() => navigate('/psalter')} className="text-accent p-2 -ml-2">
          <Icon name="chevron-left" size="1.25rem" />
        </button>
        <h1 className="text-lg font-display font-semibold text-ink">Psalm {num}</h1>
      </header>

      <div className="px-4 py-6 max-w-2xl mx-auto">
        {sections.length === 0 && (
          <p className="text-red-600 dark:text-red-400 text-center py-8">
            Could not find Psalm {num}.
          </p>
        )}
        {sections.map((section, si) => (
          <div key={si} className="mb-6">
            {section.localname && (
              <p className="text-ink-subtle italic text-sm mb-3">{section.localname}</p>
            )}
            {section.value.map((verse) => (
              <div key={verse.number} className="mb-3 flex gap-3">
                <span className="text-ink-subtle text-sm w-6 flex-shrink-0 text-right mt-0.5">{verse.number}</span>
                <div className="font-serif text-ink leading-relaxed">
                  <span>{verse.verse}</span>
                  {verse.halfverse && (
                    <>
                      <br />
                      <span className="pl-4">{verse.halfverse}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
