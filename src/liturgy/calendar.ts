import type { LiturgicalDay, LiturgicalSeason } from '@/types'

// Fixed feasts: [month (1-based), day, name]
const FIXED_FEASTS: [number, number, string][] = [
  [1, 1, 'The Holy Name of Our Lord Jesus Christ'],
  [1, 6, 'The Epiphany'],
  [2, 2, 'The Presentation of Our Lord Jesus Christ in the Temple'],
  [3, 19, 'Saint Joseph'],
  [3, 25, 'The Annunciation of Our Lord Jesus Christ to the Blessed Virgin Mary'],
  [6, 11, 'Saint Barnabas the Apostle'],
  [6, 24, 'The Nativity of Saint John the Baptist'],
  [6, 29, 'Saint Peter and Saint Paul, Apostles'],
  [7, 4, 'Independence Day'],
  [7, 22, 'Saint Mary Magdalene'],
  [7, 25, 'Saint James the Apostle'],
  [8, 6, 'The Transfiguration of Our Lord Jesus Christ'],
  [8, 15, 'Saint Mary the Virgin'],
  [8, 24, 'Saint Bartholomew the Apostle'],
  [9, 14, 'Holy Cross Day'],
  [9, 21, 'Saint Matthew, Apostle and Evangelist'],
  [9, 29, 'Saint Michael and All Angels'],
  [10, 18, 'Saint Luke the Evangelist'],
  [10, 23, 'Saint James of Jerusalem'],
  [10, 28, 'Saint Simon and Saint Jude, Apostles'],
  [11, 1, 'All Saints\' Day'],
  [11, 30, 'Saint Andrew the Apostle'],
  [12, 21, 'Saint Thomas the Apostle'],
  [12, 25, 'The Nativity of Our Lord Jesus Christ'],
  [12, 26, 'Saint Stephen, Deacon and Martyr'],
  [12, 27, 'Saint John, Apostle and Evangelist'],
  [12, 28, 'The Holy Innocents'],
]

function easter(year: number): Date {
  // Butcher's algorithm
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31)
  const day = ((h + l - 7 * m + 114) % 31) + 1
  return new Date(year, month - 1, day)
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

export function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
}

// Returns the most recent Sunday on or before `date`
function prevSunday(date: Date): Date {
  const d = new Date(date)
  d.setDate(d.getDate() - d.getDay())
  return d
}

// First Sunday of Advent: Sunday nearest Nov 30
function firstAdvent(year: number): Date {
  const nov30 = new Date(year, 10, 30)
  const dow = nov30.getDay()
  // Move to nearest Sunday
  const offset = dow <= 3 ? -dow : 7 - dow
  return addDays(nov30, offset)
}

export function getLiturgicalDay(date: Date): LiturgicalDay {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const easterDate = easter(year)
  const ashWednesday = addDays(easterDate, -46)
  const palmSunday = addDays(easterDate, -7)
  const ascension = addDays(easterDate, 39)
  const pentecost = addDays(easterDate, 49)
  const advent1 = firstAdvent(year)
  const christmas = new Date(year, 11, 25)
  const epiphany = new Date(year, 0, 6)

  // Check for fixed feasts first
  const fixedFeast = FIXED_FEASTS.find(([m, d]) => m === month && d === day)

  let season: LiturgicalSeason
  let seasonStart: Date
  let displayName: string
  let subtitle: string | undefined
  let proper: number | undefined

  // Determine season — Christmas must precede Advent since Advent starts Nov 27–Dec 3
  // and Christmas Day (Dec 25) satisfies date >= advent1.
  if (date >= christmas || (month === 1 && day < 6)) {
    season = 'christmas'
    seasonStart = month === 1 ? new Date(year - 1, 11, 25) : christmas
    if (sameDay(date, christmas)) {
      displayName = 'Christmas Day'
    } else if (date.getDay() === 0) {
      displayName = 'First Sunday after Christmas Day'
    } else {
      displayName = 'Christmas Season'
    }
  } else if (date >= epiphany && month === 1) {
    season = 'epiphany'
    seasonStart = epiphany
    displayName = sameDay(date, epiphany) ? 'The Epiphany' : 'The Season after Epiphany'
  } else if (month <= 5 && date < ashWednesday && date >= addDays(epiphany, 1)) {
    // After Epiphany, before Ash Wednesday
    season = 'epiphany'
    seasonStart = epiphany
    if (date.getDay() === 0) {
      const weeksAfter = Math.ceil((date.getTime() - epiphany.getTime()) / (7 * 86400000))
      const ordinals = ['', 'First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth']
      displayName = `${ordinals[Math.min(weeksAfter, 8)] ?? weeksAfter + 'th'} Sunday after the Epiphany`
    } else {
      displayName = 'The Season after Epiphany'
    }
  } else if (date >= ashWednesday && date < palmSunday) {
    season = 'lent'
    seasonStart = ashWednesday
    if (sameDay(date, ashWednesday)) {
      displayName = 'Ash Wednesday'
    } else if (date.getDay() === 0) {
      // Ash Wednesday is always a Wednesday; first Sunday is 4 days later.
      // ceil(4/7)=1, ceil(11/7)=2, … gives correct 1-based week number.
      const weekNum = Math.ceil((date.getTime() - ashWednesday.getTime()) / (7 * 86400000))
      const ordinals = ['First', 'Second', 'Third', 'Fourth', 'Fifth']
      displayName = `${ordinals[Math.min(weekNum - 1, 4)] ?? weekNum + 'th'} Sunday in Lent`
    } else {
      displayName = 'Lent'
    }
  } else if (date >= palmSunday && date < easterDate) {
    season = 'holyweek'
    seasonStart = palmSunday
    if (sameDay(date, palmSunday)) displayName = 'Palm Sunday'
    else if (sameDay(date, addDays(easterDate, -3))) displayName = 'Maundy Thursday'
    else if (sameDay(date, addDays(easterDate, -2))) displayName = 'Good Friday'
    else if (sameDay(date, addDays(easterDate, -1))) displayName = 'Holy Saturday'
    else displayName = 'Holy Week'
  } else if (date >= easterDate && date <= pentecost) {
    season = 'easter'
    seasonStart = easterDate
    if (sameDay(date, easterDate)) {
      displayName = 'Easter Day'
    } else if (sameDay(date, pentecost)) {
      displayName = 'The Day of Pentecost'
    } else if (sameDay(date, ascension)) {
      displayName = 'Ascension Day'
    } else if (date.getDay() === 0) {
      const weekNum = Math.round((date.getTime() - easterDate.getTime()) / (7 * 86400000))
      const ordinals = ['', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh']
      displayName = `${ordinals[Math.min(weekNum, 6)] ?? weekNum + 'th'} Sunday of Easter`
    } else {
      displayName = 'Eastertide'
    }
  } else if (date >= advent1) {
    season = 'advent'
    seasonStart = advent1
    const weekNum = Math.floor((date.getTime() - advent1.getTime()) / (7 * 86400000))
    const sundayNames = ['First', 'Second', 'Third', 'Fourth']
    if (date.getDay() === 0) {
      displayName = `${sundayNames[Math.min(weekNum, 3)]} Sunday of Advent`
    } else {
      displayName = 'Advent'
    }
  } else {
    // Pentecost season (Season after Pentecost)
    season = 'pentecost'
    seasonStart = addDays(pentecost, 1)
    if (sameDay(date, addDays(pentecost, 7))) {
      displayName = 'Trinity Sunday'
    } else if (date.getDay() === 0) {
      // Calculate proper number. Proper 1 = Sunday closest to May 11
      // BCP 1979: The Sundays after Pentecost use Propers 1–29
      // Proper N is assigned to the Sunday falling between specific dates
      const dayOfYear = Math.floor((date.getTime() - new Date(year, 0, 1).getTime()) / 86400000)
      // May 8 = proper 1 start (roughly); each proper is 7 days
      const may8 = Math.floor((new Date(year, 4, 8).getTime() - new Date(year, 0, 1).getTime()) / 86400000)
      const weeksSinceMay8 = Math.floor((dayOfYear - may8) / 7)
      proper = Math.max(1, Math.min(29, weeksSinceMay8 + 1))
      const ordinals: Record<number, string> = {
        1: 'First', 2: 'Second', 3: 'Third', 4: 'Fourth', 5: 'Fifth',
        6: 'Sixth', 7: 'Seventh', 8: 'Eighth', 9: 'Ninth', 10: 'Tenth',
        11: 'Eleventh', 12: 'Twelfth', 13: 'Thirteenth', 14: 'Fourteenth',
        15: 'Fifteenth', 16: 'Sixteenth', 17: 'Seventeenth', 18: 'Eighteenth',
        19: 'Nineteenth', 20: 'Twentieth', 21: 'Twenty-first', 22: 'Twenty-second',
        23: 'Twenty-third', 24: 'Twenty-fourth', 25: 'Twenty-fifth',
        26: 'Twenty-sixth', 27: 'Twenty-seventh', 28: 'Twenty-eighth', 29: 'Twenty-ninth',
      }
      const weekAfterPentecost = Math.round((date.getTime() - pentecost.getTime()) / (7 * 86400000))
      displayName = `The ${ordinals[weekAfterPentecost] ?? weekAfterPentecost + 'th'} Sunday after Pentecost`
      subtitle = proper ? `Proper ${proper}` : undefined
    } else {
      displayName = 'Season after Pentecost'
    }
  }

  // Override displayName with fixed feast if applicable
  const holy = fixedFeast ? fixedFeast[2] : undefined
  if (holy) displayName = holy

  // Sunday lectionary year: Year A when year % 3 === 1
  const sundayLectionaryYear = (['A', 'B', 'C'] as const)[(year % 3 + 2) % 3]

  // Daily Office lectionary year: Year One = odd year
  const dailyLectionaryYear: 'one' | 'two' = year % 2 === 1 ? 'one' : 'two'

  // Week of year for psalm cycle (1-indexed)
  const jan1 = new Date(year, 0, 1)
  const weekOfYear = Math.ceil(((date.getTime() - jan1.getTime()) / 86400000 + jan1.getDay() + 1) / 7)

  return {
    date,
    season,
    seasonStart,
    weekOfYear,
    proper,
    sundayLectionaryYear,
    dailyLectionaryYear,
    holy,
    displayName,
    subtitle,
  }
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

// Returns [morning psalms, evening psalms] based on 30-day BCP cycle
// Day 1-30, using date.getDate() for the cycle day
export function dailyPsalmCycle(date: Date): { morning: string[]; evening: string[] } {
  // BCP 1979 30-day psalm cycle (abbreviated — full cycle below)
  const cycle: { morning: string[]; evening: string[] }[] = [
    { morning: ['1', '2', '3', '4', '5'], evening: ['6', '7', '8'] },
    { morning: ['9', '10', '11'], evening: ['12', '13', '14'] },
    { morning: ['15', '16', '17'], evening: ['18:1-20', '18:21-50'] },
    { morning: ['19', '20', '21'], evening: ['22', '23'] },
    { morning: ['24', '25', '26'], evening: ['27', '28', '29'] },
    { morning: ['30', '31'], evening: ['32', '33'] },
    { morning: ['34', '35'], evening: ['36', '37:1-26'] },
    { morning: ['37:27-42', '38'], evening: ['39', '40', '41'] },
    { morning: ['42', '43', '44'], evening: ['45', '46', '47', '48'] },
    { morning: ['49', '50'], evening: ['51', '52', '53', '54', '55'] },
    { morning: ['56', '57', '58'], evening: ['59', '60', '61', '62'] },
    { morning: ['63', '64', '65'], evening: ['66', '67'] },
    { morning: ['68'], evening: ['69', '70'] },
    { morning: ['71', '72'], evening: ['73', '74'] },
    { morning: ['75', '76', '77'], evening: ['78:1-39'] },
    { morning: ['78:40-72'], evening: ['79', '80'] },
    { morning: ['81', '82', '83', '84', '85'], evening: ['86', '87', '88'] },
    { morning: ['89:1-18'], evening: ['89:19-52'] },
    { morning: ['90', '91', '92'], evening: ['93', '94'] },
    { morning: ['95', '96', '97'], evening: ['98', '99', '100', '101'] },
    { morning: ['102', '103'], evening: ['104'] },
    { morning: ['105'], evening: ['106'] },
    { morning: ['107:1-32'], evening: ['107:33-43', '108', '109'] },
    { morning: ['110', '111', '112', '113'], evening: ['114', '115', '116', '117', '118'] },
    { morning: ['119:1-32'], evening: ['119:33-72'] },
    { morning: ['119:73-104'], evening: ['119:105-144'] },
    { morning: ['119:145-176'], evening: ['120', '121', '122', '123', '124', '125', '126', '127', '128', '129', '130'] },
    { morning: ['131', '132', '133', '134', '135', '136'], evening: ['137', '138', '139'] },
    { morning: ['140', '141', '142', '143'], evening: ['144', '145'] },
    { morning: ['146', '147'], evening: ['148', '149', '150'] },
  ]
  const idx = (date.getDate() - 1) % 30
  return cycle[idx]
}

export function getDefaultOffice(now: Date): 'morning' | 'noon' | 'evening' | 'compline' {
  const h = now.getHours()
  if (h < 9) return 'morning'
  if (h < 13) return 'noon'
  if (h < 20) return 'evening'
  return 'compline'
}

export { prevSunday, addDays, easter, firstAdvent }
