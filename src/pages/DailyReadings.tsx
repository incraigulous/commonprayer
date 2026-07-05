import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { getLiturgicalDay, formatDate } from '@/liturgy/calendar'
import { getDailyReadings } from '@/liturgy/lectionary'
import type { DailyReadings as DR } from '@/types'

export default function DailyReadings() {
  const navigate = useNavigate()
  const [date] = useState(new Date())
  const [readings, setReadings] = useState<DR | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const day = useMemo(() => getLiturgicalDay(date), [date])

  useEffect(() => {
    getDailyReadings(day)
      .then((r) => {
        setReadings(r)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [day])

  return (
    <div className="min-h-dvh bg-gray-950">
      <header className="flex items-center gap-4 px-4 py-4 border-b border-gray-800">
        <button onClick={() => navigate(-1)} className="text-blue-400 text-lg p-2 -ml-2">←</button>
        <h1 className="text-lg font-semibold text-gray-100">Daily Readings</h1>
      </header>

      <div className="px-4 py-6 max-w-2xl mx-auto">
        <h2 className="text-xl font-serif text-gray-100 mb-1">{formatDate(date)}</h2>
        <p className="text-gray-400 italic mb-6">{day.displayName}</p>

        {loading && <p className="text-gray-500 text-center py-8">Loading…</p>}
        {error && <p className="text-red-400 text-center py-8">Could not load readings.</p>}

        {!loading && !error && !readings && (
          <p className="text-gray-500 text-center py-8">No lectionary data available for this date.</p>
        )}

        {readings && (
          <div className="space-y-6">
            <section>
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Morning</h3>
              <ReadingSection label="Psalms" refs={readings.morning.psalms} />
              <ReadingItem label="Old Testament" citation={readings.morning.ot} />
              <ReadingItem label="New Testament" citation={readings.morning.nt} />
            </section>
            <section>
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Evening</h3>
              <ReadingSection label="Psalms" refs={readings.evening.psalms} />
              <ReadingItem label="Old Testament" citation={readings.evening.ot} />
              <ReadingItem label="New Testament" citation={readings.evening.nt} />
            </section>
          </div>
        )}
      </div>
    </div>
  )
}

function ReadingSection({ label, refs }: { label: string; refs: string[] }) {
  return (
    <div className="bg-gray-900 rounded-xl px-4 py-3 mb-2">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="text-gray-200 font-medium">{refs.join(', ')}</div>
    </div>
  )
}

function ReadingItem({ label, citation }: { label: string; citation: string }) {
  return (
    <div className="bg-gray-900 rounded-xl px-4 py-3 mb-2">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="text-gray-200 font-medium">{citation}</div>
    </div>
  )
}
