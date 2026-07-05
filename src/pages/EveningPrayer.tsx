import { useState, useEffect } from 'react'
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

  const today = new Date()
  const day = getLiturgicalDay(today)

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
  }, [office, settings.version, settings.gloriaPatri])

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
        <div className="py-6 text-center border-b border-gray-800 mb-6">
          <h2 className="text-2xl font-serif text-gray-100">{formatDate(today)}</h2>
          <p className="text-gray-400 italic mt-1">{day.displayName}</p>
          {day.subtitle && <p className="text-gray-500 text-sm mt-0.5">({day.subtitle})</p>}
        </div>

        {loading && <div className="text-center py-12 text-gray-500">Loading…</div>}
        {error && <div className="text-center py-12 text-red-400">Could not load {title}.</div>}

        {!loading && !error && documents.map((doc, i) => (
          <LiturgicalDocument key={i} doc={doc} />
        ))}
      </div>
    </AppShell>
  )
}
