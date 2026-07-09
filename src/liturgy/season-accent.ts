import { sameDay, easter, addDays, getDefaultOffice } from '@/liturgy/calendar'
import type { LiturgicalDay, ColorMode } from '@/types'

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
  ordinary: { accent: '#037e69', accentHover: '#359787', accentPress: '#026454', accentQuiet: 'rgba(3, 126, 105, 0.14)' },
  epiphany: { accent: '#5f7d53', accentHover: '#7f9a72', accentPress: '#4a6540', accentQuiet: 'rgba(95, 125, 83, 0.14)' },
  advent: { accent: '#675889', accentHover: '#7d6f9c', accentPress: '#524570', accentQuiet: 'rgba(103, 88, 137, 0.14)' },
  lent: { accent: '#524570', accentHover: '#675889', accentPress: '#524570', accentQuiet: 'rgba(82, 69, 112, 0.14)' },
  christmas: { accent: '#a9843a', accentHover: '#c9a24b', accentPress: '#a9843a', accentQuiet: 'rgba(169, 132, 58, 0.16)' },
  easter: { accent: '#a9843a', accentHover: '#c9a24b', accentPress: '#a9843a', accentQuiet: 'rgba(169, 132, 58, 0.16)' },
  pentecost: { accent: '#bf4835', accentHover: '#d65846', accentPress: '#9c3626', accentQuiet: 'rgba(191, 72, 53, 0.14)' },
}

const DARK_SEASON_ACCENTS: Record<AccentSeason, SeasonAccentBase> = {
  ordinary: { accent: '#359787', accentHover: '#5bab9d', accentPress: '#037e69', accentQuiet: 'rgba(53, 151, 135, 0.16)' },
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

// Season → stained-glass mosaic palette (light → deep, monochromatic per
// season), for Masthead/Mosaic/StartScreen glass bands. Matches the ui-kit's
// per-season glass palettes exactly (see ui-kit stories/liturgy/Masthead.stories.jsx).
export const SEASON_GLASS: Record<AccentSeason, string[]> = {
  ordinary: ['#a9c19b', '#94ad87', '#7f9a72', '#5f7d53', '#4a6540', '#3c5334', '#8aa67d'],
  epiphany: ['#a9c19b', '#94ad87', '#7f9a72', '#5f7d53', '#4a6540', '#3c5334', '#8aa67d'],
  advent: ['#b3a7c9', '#9789b3', '#7d6f9c', '#675889', '#564a77', '#453a63', '#8b7daa'],
  lent: ['#b3a7c9', '#9789b3', '#7d6f9c', '#675889', '#524570', '#3f3459', '#8b7daa'],
  christmas: ['#ecd79c', '#e2c887', '#d3ad5c', '#c9a24b', '#a9843a', '#8a6b2e', '#dcc079'],
  easter: ['#ecd79c', '#e2c887', '#d3ad5c', '#c9a24b', '#a9843a', '#8a6b2e', '#dcc079'],
  pentecost: ['#f0b3a6', '#eca192', '#e27563', '#d65846', '#bf4835', '#9c3626', '#e9897a'],
}

// The four daily offices, dawn → night, each mapped to the season colour
// DisplayMenu's "Time of Day" auto mode paints it in: Morning→Easter
// (resurrection light), Noon→Ordinary (the working day), Evening→Pentecost
// ("at evening you hung upon the cross"), Compline→Lent (night watch &
// examen). Reuses the app's own getDefaultOffice() rather than re-deriving
// the hour thresholds a second time.
export const OFFICE_SEASON: Record<ReturnType<typeof getDefaultOffice>, AccentSeason> = {
  morning: 'easter',
  noon: 'ordinary',
  evening: 'pentecost',
  compline: 'lent',
}

export function timeOfDaySeason(date: Date = new Date()): AccentSeason {
  return OFFICE_SEASON[getDefaultOffice(date)]
}

// Resolves a user's ColorMode preference (DisplayMenu's Theme/Color control)
// to a concrete season: 'seasonal' follows the liturgical calendar (the
// long-standing app default), 'time' follows the clock (or, when `office`
// is given, that office's own fixed slot — e.g. reading Evening Prayer at
// 11pm still colors 'pentecost', not whatever the clock says right now),
// or the mode IS already one of the seven pinned seasons.
export function resolveColorMode(
  mode: ColorMode,
  day: LiturgicalDay,
  date: Date = new Date(),
  office?: ReturnType<typeof getDefaultOffice>,
): AccentSeason {
  if (mode === 'seasonal') return getAccentSeason(day)
  if (mode === 'time') return office ? OFFICE_SEASON[office] : timeOfDaySeason(date)
  return mode
}
