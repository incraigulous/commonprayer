import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

interface Prayer {
  category: string
  title: string
  text: string[]
}

interface PrayersData {
  prayers: Prayer[]
}

export default function PrayersThanksgivings() {
  const navigate = useNavigate()
  const [data, setData] = useState<PrayersData | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [category, setCategory] = useState<string>('All')

  useEffect(() => {
    import('@/content/prayers-thanksgivings.json').then((m) => {
      setData(m.default as PrayersData)
    })
  }, [])

  const categories = data
    ? ['All', ...Array.from(new Set(data.prayers.map((p) => p.category)))]
    : []

  const filtered = data?.prayers.filter((p) => category === 'All' || p.category === category) ?? []

  return (
    <div className="min-h-dvh bg-gray-950">
      <header className="flex items-center gap-4 px-4 py-4 border-b border-gray-800">
        <button onClick={() => navigate(-1)} className="text-blue-400 text-lg p-2 -ml-2">←</button>
        <h1 className="text-lg font-semibold text-gray-100">Prayers &amp; Thanksgivings</h1>
      </header>

      {categories.length > 1 && (
        <div className="flex gap-2 px-4 py-3 overflow-x-auto border-b border-gray-800">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                c === category ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="px-4 py-4 max-w-2xl mx-auto">
        {!data && <p className="text-gray-500 text-center py-8">Loading…</p>}
        <div className="space-y-2">
          {filtered.map((prayer, i) => (
            <div key={i} className="bg-gray-900 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === `${i}` ? null : `${i}`)}
                className="w-full text-left px-4 py-4 flex items-center justify-between"
              >
                <span className="text-gray-200 font-medium">{prayer.title}</span>
                <span className="text-gray-500 text-lg ml-2">{expanded === `${i}` ? '−' : '+'}</span>
              </button>
              {expanded === `${i}` && (
                <div className="px-4 pb-4 border-t border-gray-800 pt-3">
                  {prayer.text.map((para, pi) => (
                    <p key={pi} className="font-serif text-gray-200 leading-relaxed mb-3 last:mb-0">
                      {para}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
