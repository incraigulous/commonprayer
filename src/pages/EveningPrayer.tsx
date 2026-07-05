import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { getLiturgicalDay, formatDate } from '@/liturgy/calendar'
import { assembleOffice, type OfficeType } from '@/liturgy/office'
import { useSettings } from '@/store/settings'
import AppShell from '@/components/layout/AppShell'
import LiturgicalDocument from '@/components/prayer/LiturgicalDocument'
import type { LiturgicalDocument as LDocType } from '@/types'

interface Props {
  office?: OfficeType
}

export default function EveningPrayer({ office = 'evening' }: Props) {
  const navigate = useNavigate()
  const { settings } = useSettings()
  const [documents, setDocuments] = useState<LDocType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const today = useMemo(() => new Date(), [])
  const day = useMemo(() => getLiturgicalDay(today), [today])

  const title = office === 'compline' ? 'Compline' : 'Evening Prayer'
  const activeTab = office === 'compline' ? 'more' : 'evening'

  useEffect(() => {
    assembleOffice(office, day, settings)
      .then((assembled) => {
        setDocuments(assembled.documents)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  // assembleOffice only reads settings.version, settings.gloriaPatri, and
  // settings.officiantRole; adding the full settings object would cause
  // re-runs on every unrelated setting change.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [office, day, settings.version, settings.gloriaPatri, settings.officiantRole])

  return (
    <AppShell
      title={title}
      showTabs={office !== 'compline'}
      activeTab={activeTab}
      onTabChange={(tab) => {
        if (tab !== activeTab) navigate(`/${tab}`)
      }}
    >
      <div className="px-4 pb-8 max-w-2xl mx-auto">
        <div className="py-6 text-center border-b border-border mb-6">
          <h2 className="text-2xl font-display text-ink">{formatDate(today)}</h2>
          <p className="text-ink-muted italic mt-1">{day.displayName}</p>
          {day.subtitle && <p className="text-ink-subtle text-sm mt-0.5">({day.subtitle})</p>}
        </div>

        {loading && <div className="text-center py-12 text-ink-subtle">Loading…</div>}
        {error && <div className="text-center py-12 text-red-600 dark:text-red-400">Could not load {title}.</div>}

        {!loading && !error && documents.map((doc, i) => (
          <LiturgicalDocument key={i} doc={doc} />
        ))}
      </div>
    </AppShell>
  )
}
