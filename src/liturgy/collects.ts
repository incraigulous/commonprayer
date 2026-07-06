import type { LiturgicalDay } from '@/types'

interface CollectEntry {
  title: string
  text: string
}

let collectsData: Record<string, CollectEntry> | null = null

function loadCollects(): Record<string, CollectEntry> {
  if (!collectsData) {
    try {
      collectsData = require('../content/collects.json') as Record<string, CollectEntry>
    } catch {
      collectsData = {}
    }
  }
  return collectsData
}

const EPIPHANY_WEEK_KEYS = ['epiphany-1', 'epiphany-2', 'epiphany-3', 'epiphany-4', 'epiphany-5', 'epiphany-6', 'epiphany-7', 'epiphany-last']
const LENT_WEEK_KEYS = ['lent-1', 'lent-2', 'lent-3', 'lent-4', 'lent-5']
const EASTER_WEEK_KEYS = ['easter-2', 'easter-3', 'easter-4', 'easter-5', 'easter-6', 'easter-7']
const ADVENT_WEEK_KEYS = ['advent-1', 'advent-2', 'advent-3', 'advent-4']

// Derives the collects.json key for a given liturgical day. Mirrors the
// same season/week-number logic calendar.ts uses to build displayName,
// so the two stay in sync without duplicating date math here.
function collectKeyFor(day: LiturgicalDay): string | null {
  if (day.holy) {
    if (day.holy === 'Christmas Day') return 'christmas-1'
    if (day.holy === 'The Epiphany') return 'epiphany'
    if (day.holy === 'Ash Wednesday') return 'ash-wednesday'
    if (day.holy === 'Palm Sunday') return 'palm-sunday'
    if (day.holy === 'Maundy Thursday') return 'maundy-thursday'
    if (day.holy === 'Good Friday') return 'good-friday'
    if (day.holy === 'Holy Saturday') return 'holy-saturday'
    if (day.holy === 'Easter Day') return 'easter-day'
    if (day.holy === 'Ascension Day') return 'ascension-day'
    if (day.holy === 'The Day of Pentecost') return 'pentecost'
    if (day.holy === 'Trinity Sunday') return 'trinity-sunday'
    if (day.holy === 'First Sunday after Christmas Day') return 'christmas-2'
  }

  if (day.season === 'pentecost' && day.proper) {
    return `proper-${day.proper}`
  }

  const isSunday = day.date.getDay() === 0

  if (day.season === 'advent' && isSunday) {
    const weekNum = Math.floor((day.date.getTime() - day.seasonStart.getTime()) / (7 * 86400000))
    return ADVENT_WEEK_KEYS[Math.min(weekNum, 3)]
  }

  if (day.season === 'epiphany' && isSunday) {
    const weekNum = Math.ceil((day.date.getTime() - day.seasonStart.getTime()) / (7 * 86400000))
    return EPIPHANY_WEEK_KEYS[Math.min(weekNum - 1, EPIPHANY_WEEK_KEYS.length - 1)]
  }

  if (day.season === 'lent' && isSunday) {
    const weekNum = Math.ceil((day.date.getTime() - day.seasonStart.getTime()) / (7 * 86400000))
    return LENT_WEEK_KEYS[Math.min(weekNum - 1, LENT_WEEK_KEYS.length - 1)]
  }

  if (day.season === 'easter' && isSunday) {
    const weekNum = Math.round((day.date.getTime() - day.seasonStart.getTime()) / (7 * 86400000))
    if (weekNum <= 0) return 'easter-day'
    return EASTER_WEEK_KEYS[Math.min(weekNum - 1, EASTER_WEEK_KEYS.length - 1)]
  }

  // Weekdays fall back to the most recent Sunday's collect for the season —
  // there is no separate daily collect outside of Lent/Holy Week ferias.
  return null
}

export function getCollectOfTheDay(day: LiturgicalDay): CollectEntry | null {
  const key = collectKeyFor(day)
  if (!key) return null
  const data = loadCollects()
  return data[key] ?? null
}
