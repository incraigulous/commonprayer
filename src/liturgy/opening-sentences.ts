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

// Deterministic pick so the same day always shows the same sentence
// (rather than a different one on every reload).
function pick<T>(items: T[], seed: number): T {
  return items[seed % items.length]
}

function dateSeed(date: Date): number {
  return date.getFullYear() * 372 + date.getMonth() * 31 + date.getDate()
}

// The BCP keys opening sentences by season for Morning Prayer; Evening
// Prayer reuses Morning's seasonal sentences or its own general list.
// "Trinity Sunday" and "All Saints" have their own BCP sentences but aren't
// tracked as distinct seasons in this app's calendar model, so they fall
// back to the season's general sentence, same as any other day.
export function getOpeningSentence(
  office: 'morning' | 'evening',
  season: LiturgicalSeason,
  date: Date,
): RawSentence {
  const seasonal = data[office][season]
  const pool = seasonal && seasonal.length > 0 ? seasonal : data[office].general
  return pick(pool, dateSeed(date))
}
