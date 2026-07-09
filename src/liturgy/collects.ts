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

  // Weekdays use the collect of the most recent Sunday (BCP 1979: "The
  // Collect ... is used ... on the weekdays following"), so compute the key
  // as of that Sunday rather than today.
  const dow = day.date.getDay()
  const mostRecentSunday = new Date(day.date.getTime() - dow * 86400000)

  if (day.season === 'pentecost' && day.proper) {
    return `proper-${day.proper}`
  }
  if (day.season === 'pentecost' && dow !== 0) {
    // Mid-week: rederive the governing Sunday's Proper number using the same
    // formula calendar.ts uses (Proper 1 = the Sunday closest to May 11).
    const year = mostRecentSunday.getFullYear()
    const dayOfYear = Math.floor((mostRecentSunday.getTime() - new Date(year, 0, 1).getTime()) / 86400000)
    const may8 = Math.floor((new Date(year, 4, 8).getTime() - new Date(year, 0, 1).getTime()) / 86400000)
    const weeksSinceMay8 = Math.floor((dayOfYear - may8) / 7)
    const proper = Math.max(1, Math.min(29, weeksSinceMay8 + 1))
    return `proper-${proper}`
  }

  if (day.season === 'advent') {
    const weekNum = Math.floor((mostRecentSunday.getTime() - day.seasonStart.getTime()) / (7 * 86400000))
    if (weekNum >= 0) return ADVENT_WEEK_KEYS[Math.min(weekNum, 3)]
  }

  if (day.season === 'epiphany' && mostRecentSunday >= day.seasonStart) {
    const weekNum = Math.ceil((mostRecentSunday.getTime() - day.seasonStart.getTime()) / (7 * 86400000))
    if (weekNum >= 1) return EPIPHANY_WEEK_KEYS[Math.min(weekNum - 1, EPIPHANY_WEEK_KEYS.length - 1)]
  }

  if (day.season === 'lent' && mostRecentSunday >= day.seasonStart) {
    const weekNum = Math.ceil((mostRecentSunday.getTime() - day.seasonStart.getTime()) / (7 * 86400000))
    if (weekNum >= 1) return LENT_WEEK_KEYS[Math.min(weekNum - 1, LENT_WEEK_KEYS.length - 1)]
  }

  if (day.season === 'easter') {
    const weekNum = Math.round((mostRecentSunday.getTime() - day.seasonStart.getTime()) / (7 * 86400000))
    if (weekNum <= 0) return 'easter-day'
    return EASTER_WEEK_KEYS[Math.min(weekNum - 1, EASTER_WEEK_KEYS.length - 1)]
  }

  return null
}

export function getCollectOfTheDay(day: LiturgicalDay): CollectEntry | null {
  const key = collectKeyFor(day)
  if (!key) return null
  const data = loadCollects()
  return data[key] ?? null
}
