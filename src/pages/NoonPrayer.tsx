import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getLiturgicalDay, formatDate } from '@/liturgy/calendar'
import { assembleOffice } from '@/liturgy/office'
import { useSettings } from '@/store/settings'
import AppShell from '@/components/layout/AppShell'
import LiturgicalDocument from '@/components/prayer/LiturgicalDocument'
import type { LiturgicalDocument as LDocType } from '@/types'

export default function NoonPrayer() {
  const navigate = useNavigate()
  const { settings } = useSettings()
  const [documents, setDocuments] = useState<LDocType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const today = new Date()
  const day = getLiturgicalDay(today)

  useEffect(() => {
    assembleOffice('noon', day, settings)
      .then((office) => {
        setDocuments(office.documents)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [settings.version, settings.gloriaPatri])

  return (
    <AppShell
      title="Noonday Prayer"
      showTabs
      activeTab="noon"
      onTabChange={(tab) => {
        if (tab !== 'noon') navigate(`/${tab}`)
      }}
    >
      <div className="px-4 pb-8 max-w-2xl mx-auto">
        <div className="py-6 text-center border-b border-gray-800 mb-6">
          <h2 className="text-2xl font-serif text-gray-100">{formatDate(today)}</h2>
          <p className="text-gray-400 italic mt-1">{day.displayName}</p>
          {day.subtitle && <p className="text-gray-500 text-sm mt-0.5">({day.subtitle})</p>}
        </div>

        {loading && <div className="text-center py-12 text-gray-500">Loading…</div>}
        {error && <div className="text-center py-12 text-red-400">Could not load Noonday Prayer.</div>}

        {!loading && !error && documents.map((doc, i) => (
          <LiturgicalDocument key={i} doc={doc} />
        ))}
      </div>
    </AppShell>
  )
}
