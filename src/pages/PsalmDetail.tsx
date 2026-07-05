import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import type { PsalmDoc } from '@/types'

interface BibleVerse {
  verse: number
  text: string
}

interface BibleApiResponse {
  verses: BibleVerse[]
}

function toPsalmDoc(num: number, data: BibleApiResponse): PsalmDoc {
  return {
    type: 'psalm',
    label: `Psalm ${num}`,
    value: [
      {
        number: num,
        value: data.verses.map((v) => ({
          number: v.verse,
          verse: v.text.trim().replace(/\s+/g, ' '),
        })),
      },
    ],
  }
}

export default function PsalmDetail() {
  const navigate = useNavigate()
  const { num } = useParams<{ num: string }>()
  const [psalm, setPsalm] = useState<PsalmDoc | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError(false)
      setPsalm(null)
      try {
        const res = await fetch(`https://bible-api.com/psalm+${num}?translation=kjv`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data: BibleApiResponse = await res.json()
        setPsalm(toPsalmDoc(Number(num), data))
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [num])

  return (
    <div className="min-h-dvh bg-gray-950">
      <header className="flex items-center gap-4 px-4 py-4 border-b border-gray-800">
        <button onClick={() => navigate('/psalter')} className="text-blue-400 text-lg p-2 -ml-2">←</button>
        <h1 className="text-lg font-semibold text-gray-100">Psalm {num}</h1>
      </header>

      <div className="px-4 py-6 max-w-2xl mx-auto">
        {loading && <p className="text-gray-500 text-center py-8">Loading…</p>}
        {error && (
          <p className="text-red-400 text-center py-8">
            Could not load Psalm {num}. Check your connection and try again.
          </p>
        )}
        {psalm && psalm.value.map((section, si) => (
          <div key={si} className="mb-6">
            {section.localname && (
              <p className="text-gray-500 italic text-sm mb-3">{section.localname}</p>
            )}
            {section.value.map((verse) => (
              <div key={verse.number} className="mb-3 flex gap-3">
                <span className="text-gray-600 text-sm w-6 flex-shrink-0 text-right mt-0.5">{verse.number}</span>
                <div className="font-serif text-gray-200 leading-relaxed">
                  <span>{verse.verse}</span>
                  {verse.halfverse && (
                    <>
                      <span className="text-gray-500"> *</span>
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
