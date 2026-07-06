import openingSentencesData from '../content/opening-sentences.json'
import type { LiturgicalSeason } from '@/types'

interface RawSentence {
  text: string
  citation?: string
  response?: string
}

interface OpeningSentencesData {
  morning: Record<string, RawSentence[]>
  evening: Record<string, RawSentence[]>
}

const data = openingSentencesData as OpeningSentencesData

function daysSince(start: Date, date: Date): number {
  const startMidnight = new Date(start.getFullYear(), start.getMonth(), start.getDate())
  const dateMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  return Math.round((dateMidnight.getTime() - startMidnight.getTime()) / 86400000)
}

// The BCP keys opening sentences by season for Morning Prayer; Evening
// Prayer reuses Morning's seasonal sentences when it has none of its own for
// that season. Sentences advance sequentially — one per day within the
// season — and restart at the top of the list each time the season recurs,
// rather than picking pseudo-randomly.
export function getOpeningSentence(
  office: 'morning' | 'evening',
  season: LiturgicalSeason,
  date: Date,
  seasonStart: Date,
): RawSentence {
  const seasonal = data[office][season]
  const pool = seasonal && seasonal.length > 0 ? seasonal : data.morning[season]
  const dayIndex = Math.max(0, daysSince(seasonStart, date))
  return pool[dayIndex % pool.length]
}
