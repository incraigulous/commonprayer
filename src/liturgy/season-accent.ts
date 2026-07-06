import { sameDay, easter, addDays } from '@/liturgy/calendar'
import type { LiturgicalDay } from '@/types'

export type AccentSeason = 'ordinary' | 'epiphany' | 'advent' | 'lent' | 'christmas' | 'easter' | 'pentecost'

// Maps the app's LiturgicalSeason (from getLiturgicalDay) to the ui-kit's
// seasonal accent vocabulary. The app's 'pentecost' season means "Season
// after Pentecost" (Ordinary Time), while the ui-kit's 'pentecost' means
// the feast day itself — which the app files under 'easter'.
export function getAccentSeason(day: LiturgicalDay): AccentSeason {
  if (day.season === 'holyweek') return 'lent'
  if (day.season === 'pentecost') return 'ordinary'
  if (day.season === 'easter') {
    const pentecostDate = addDays(easter(day.date.getFullYear()), 49)
    if (sameDay(day.date, pentecostDate)) return 'pentecost'
  }
  return day.season
}

interface SeasonAccentBase {
  accent: string
  accentHover: string
  accentPress: string
  accentQuiet: string
}

export interface AccentTones extends SeasonAccentBase {
  gilt: string
  giltQuiet: string
}

const LIGHT_GOLD = { gilt: '#a9843a', giltQuiet: 'rgba(169, 132, 58, 0.16)' }
const DARK_GOLD = { gilt: '#c9a24b', giltQuiet: 'rgba(201, 162, 75, 0.18)' }

// No gold except at the golden feasts — Christmas & Easter, whose season
// colour already IS gold. Every other season, "gilt" ornament recolors to
// match that season's own accent instead of a fixed gold.
const GOLD_SEASONS = new Set<AccentSeason>(['christmas', 'easter'])

const LIGHT_SEASON_ACCENTS: Record<AccentSeason, SeasonAccentBase> = {
  ordinary: { accent: '#5f7d53', accentHover: '#7f9a72', accentPress: '#4a6540', accentQuiet: 'rgba(95, 125, 83, 0.14)' },
  epiphany: { accent: '#5f7d53', accentHover: '#7f9a72', accentPress: '#4a6540', accentQuiet: 'rgba(95, 125, 83, 0.14)' },
  advent: { accent: '#675889', accentHover: '#7d6f9c', accentPress: '#524570', accentQuiet: 'rgba(103, 88, 137, 0.14)' },
  lent: { accent: '#524570', accentHover: '#675889', accentPress: '#524570', accentQuiet: 'rgba(82, 69, 112, 0.14)' },
  christmas: { accent: '#a9843a', accentHover: '#c9a24b', accentPress: '#a9843a', accentQuiet: 'rgba(169, 132, 58, 0.16)' },
  easter: { accent: '#a9843a', accentHover: '#c9a24b', accentPress: '#a9843a', accentQuiet: 'rgba(169, 132, 58, 0.16)' },
  pentecost: { accent: '#bf4835', accentHover: '#d65846', accentPress: '#9c3626', accentQuiet: 'rgba(191, 72, 53, 0.14)' },
}

const DARK_SEASON_ACCENTS: Record<AccentSeason, SeasonAccentBase> = {
  ordinary: { accent: '#7f9a72', accentHover: '#94ad87', accentPress: '#5f7d53', accentQuiet: 'rgba(127, 154, 114, 0.16)' },
  epiphany: { accent: '#7f9a72', accentHover: '#94ad87', accentPress: '#5f7d53', accentQuiet: 'rgba(127, 154, 114, 0.16)' },
  advent: { accent: '#7d6f9c', accentHover: '#9789b3', accentPress: '#675889', accentQuiet: 'rgba(125, 111, 156, 0.16)' },
  lent: { accent: '#675889', accentHover: '#7d6f9c', accentPress: '#524570', accentQuiet: 'rgba(103, 88, 137, 0.16)' },
  christmas: { accent: '#c9a24b', accentHover: '#d3ad5c', accentPress: '#a9843a', accentQuiet: 'rgba(201, 162, 75, 0.18)' },
  easter: { accent: '#c9a24b', accentHover: '#d3ad5c', accentPress: '#a9843a', accentQuiet: 'rgba(201, 162, 75, 0.18)' },
  pentecost: { accent: '#d65846', accentHover: '#e27563', accentPress: '#bf4835', accentQuiet: 'rgba(214, 88, 70, 0.16)' },
}

export function getSeasonAccentTones(season: AccentSeason, colorScheme: 'light' | 'dark'): AccentTones {
  const base = colorScheme === 'dark' ? DARK_SEASON_ACCENTS[season] : LIGHT_SEASON_ACCENTS[season]
  if (GOLD_SEASONS.has(season)) {
    const gold = colorScheme === 'dark' ? DARK_GOLD : LIGHT_GOLD
    return { ...base, ...gold }
  }
  return { ...base, gilt: base.accent, giltQuiet: base.accentQuiet }
}
