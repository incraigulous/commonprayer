import type { LiturgicalDay, DailyReadings } from '@/types'
import { addDays, easter, firstAdvent } from './calendar'

// Lectionary data follows the reubenlillie/daily-office JSON format.
// Data: github.com/reubenlillie/daily-office (MIT license)

interface RLEntry {
  year: string
  season: string
  week?: string
  day: string
  title?: string
  psalms: { morning?: string[]; evening?: string[] }
  lessons: {
    first?: string
    second?: string
    gospel?: string
    morning?: { first?: string; second?: string; gospel?: string }
    evening?: { first?: string; second?: string }
  }
}

type YearIndex = Map<string, RLEntry>

let yearOneIndex: YearIndex | null = null
let yearTwoIndex: YearIndex | null = null

function buildIndex(entries: RLEntry[]): YearIndex {
  const map = new Map<string, RLEntry>()
  for (const entry of entries) {
    const key = `${entry.season}::${entry.week ?? ''}::${entry.day}`
    map.set(key, entry)
  }
  return map
}

function loadYear(year: 'one' | 'two'): YearIndex {
  if (year === 'one') {
    if (!yearOneIndex) yearOneIndex = buildIndex(require('../content/lectionary/year-one.json') as RLEntry[])
    return yearOneIndex
  }
  if (!yearTwoIndex) yearTwoIndex = buildIndex(require('../content/lectionary/year-two.json') as RLEntry[])
  return yearTwoIndex
}


const DOW = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function getLookupKey(date: Date): { season: string; week: string; day: string } | null {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const dom = date.getDate()
  const dow = DOW[date.getDay()]
  const ts = date.getTime()

  const easterDate = easter(year)
  const ashWed = addDays(easterDate, -46)
  const palmSunday = addDays(easterDate, -7)
  const pentecostDate = addDays(easterDate, 49)
  const trinitySunday = addDays(pentecostDate, 7)
  const advent1 = firstAdvent(year)

  // Christmas octave: Dec 25 – Jan 5
  if ((month === 12 && dom >= 25) || (month === 1 && dom <= 5)) {
    const dayStr = month === 12 ? `Dec ${dom}` : `Jan ${dom}`
    return { season: 'Christmas', week: 'Christmas Day and Following', day: dayStr }
  }

  // Epiphany octave: Jan 6–12 (fixed date entries in reubenlillie data)
  if (month === 1 && dom >= 6 && dom <= 12) {
    return { season: 'Epiphany', week: 'The Epiphany and Following', day: `Jan ${dom}` }
  }

  // Advent
  if (ts >= advent1.getTime()) {
    const weekNum = Math.min(4, Math.floor((ts - advent1.getTime()) / (7 * 86400000)) + 1)
    return { season: 'Advent', week: `Week of ${weekNum} Advent`, day: dow }
  }

  // Holy Week (Palm Sunday through Holy Saturday)
  if (ts >= palmSunday.getTime() && ts < easterDate.getTime()) {
    return { season: 'Lent', week: 'Holy Week', day: dow }
  }

  // Easter Week (Easter Day through the following Saturday)
  if (ts >= easterDate.getTime() && ts < addDays(easterDate, 7).getTime()) {
    return { season: 'Easter', week: 'Easter Week', day: dow }
  }

  // Pentecost Sunday (in reubenlillie Easter season as week='Pentecost')
  if (ts >= pentecostDate.getTime() && ts < addDays(pentecostDate, 1).getTime()) {
    return { season: 'Easter', week: 'Pentecost', day: 'Sunday' }
  }

  // Eve of Trinity (Saturday of Pentecost week) + Trinity Sunday
  const eveOfTrinityTs = addDays(pentecostDate, 6).getTime()
  if (ts >= eveOfTrinityTs && ts <= trinitySunday.getTime()) {
    return { season: 'The Season after Pentecost', week: '', day: dow }
  }

  // Season after Pentecost weekdays (Proper 1–29)
  // Proper 1 starts the Monday after Trinity Sunday.
  // Week runs Monday–Saturday; the Sunday begins the NEXT proper.
  if (ts > trinitySunday.getTime() && ts < advent1.getTime()) {
    // Find the Sunday at or before this date
    const prevSundayTs = ts - date.getDay() * 86400000
    // Proper for the Sunday at the start of this week (Mon–Sat) = previous Sunday's proper
    // For Sunday itself, use that date directly.
    const sundayDate = new Date(Math.floor(prevSundayTs / 86400000) * 86400000)
    const dayOfYear = Math.floor((sundayDate.getTime() - new Date(year, 0, 1).getTime()) / 86400000)
    const may8DayOfYear = Math.floor((new Date(year, 4, 8).getTime() - new Date(year, 0, 1).getTime()) / 86400000)
    const proper = Math.max(1, Math.min(29, Math.floor((dayOfYear - may8DayOfYear) / 7) + 1))
    return { season: 'The Season after Pentecost', week: `Proper ${proper}`, day: dow }
  }

  // Ash Wednesday and following three days (Wed–Sat)
  if (ts >= ashWed.getTime() && ts < addDays(ashWed, 4).getTime()) {
    return { season: 'Lent', week: 'Ash Wednesday and Following', day: dow }
  }

  // Lent proper weeks
  const firstLentSunday = addDays(ashWed, 4)
  if (ts >= firstLentSunday.getTime() && ts < palmSunday.getTime()) {
    // "Week of Last Epiphany" doesn't apply here — that's Epiphany side.
    // Determine week of Lent 1–5.
    const weekNum = Math.min(5, Math.floor((ts - firstLentSunday.getTime()) / (7 * 86400000)) + 1)
    return { season: 'Lent', week: `Week of ${weekNum} Lent`, day: dow }
  }

  // Epiphany season (Jan 13 to Ash Wednesday)
  const jan13 = new Date(year, 0, 13)
  if (ts >= jan13.getTime() && ts < ashWed.getTime()) {
    const jan13dow = jan13.getDay()
    const firstEpiphSunday = addDays(jan13, (7 - jan13dow) % 7)

    // Days between Jan 13 and the first Epiphany Sunday (if any)
    if (ts < firstEpiphSunday.getTime()) {
      return { season: 'Epiphany', week: 'The Epiphany and Following', day: dow }
    }

    // Last Epiphany week = the week containing the Sunday before Ash Wednesday
    const lastEpiphSunday = addDays(ashWed, -ashWed.getDay())
    if (ts >= lastEpiphSunday.getTime()) {
      return { season: 'Epiphany', week: 'Week of Last Epiphany', day: dow }
    }

    const weekNum = Math.floor((ts - firstEpiphSunday.getTime()) / (7 * 86400000)) + 1
    return { season: 'Epiphany', week: `Week of ${weekNum} Epiphany`, day: dow }
  }

  // Easter weeks 2–7 (after Easter Week, before Pentecost eve)
  if (ts >= addDays(easterDate, 7).getTime() && ts < eveOfTrinityTs) {
    const weekNum = Math.floor((ts - easterDate.getTime()) / (7 * 86400000)) + 1
    return { season: 'Easter', week: `Week of ${weekNum} Easter`, day: dow }
  }

  return null
}

// --- Convert reubenlillie entry to our DailyReadings type ---

function toDailyReadings(entry: RLEntry): DailyReadings {
  const { lessons, psalms } = entry
  let mOt = '', mNt = '', eOt = '', eNt = ''

  if (lessons.morning) {
    mOt = lessons.morning.first ?? ''
    mNt = lessons.morning.second ?? lessons.morning.gospel ?? ''
  }
  if (lessons.evening) {
    eOt = lessons.evening.first ?? ''
    eNt = lessons.evening.second ?? ''
  }
  // Shared lessons (no morning/evening split)
  if (!lessons.morning && !lessons.evening) {
    mOt = eOt = lessons.first ?? ''
    mNt = eNt = lessons.second ?? lessons.gospel ?? ''
  }

  return {
    morning: { psalms: psalms.morning ?? [], ot: mOt, nt: mNt },
    evening: { psalms: psalms.evening ?? [], ot: eOt, nt: eNt },
  }
}

export function getDailyReadings(day: LiturgicalDay): DailyReadings | null {
  const lookup = getLookupKey(day.date)
  if (!lookup) return null

  const index = loadYear(day.dailyLectionaryYear)
  const entry = index.get(`${lookup.season}::${lookup.week}::${lookup.day}`)
  if (!entry) return null

  return toDailyReadings(entry)
}

// Noonday psalm options per BCP 1979 p. 772
export const NOONDAY_PSALMS = ['119:105-112', '121', '126']
