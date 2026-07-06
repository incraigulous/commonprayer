import { useMemo } from 'react'
import { getLiturgicalDay } from '@/liturgy/calendar'
import { getAccentSeason, type AccentSeason } from '@/liturgy/season-accent'
import { useSettings } from '@/store/settings'

// Resolves the effective accent season, honoring an explicit user override
// (settings.accentOverride) over today's actual liturgical season.
export function useAccentSeason(): AccentSeason {
  const override = useSettings((s) => s.settings.accentOverride)

  return useMemo(() => {
    if (override !== 'seasonal') return override
    return getAccentSeason(getLiturgicalDay(new Date()))
  }, [override])
}
