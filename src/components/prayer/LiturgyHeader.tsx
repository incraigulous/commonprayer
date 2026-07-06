import { View, Text } from 'react-native'
import { formatDate } from '@/liturgy/calendar'
import { getAccentSeason } from '@/liturgy/season-accent'
import type { LiturgicalDay } from '@/types'
import Badge from '@/components/ui/Badge'
import OrnamentalDivider from '@/components/prayer/OrnamentalDivider'

const SEASON_LABEL: Record<ReturnType<typeof getAccentSeason>, string> = {
  ordinary: 'Season after Pentecost',
  epiphany: 'Season after the Epiphany',
  advent: 'Advent',
  lent: 'Lent',
  christmas: 'Christmastide',
  easter: 'Eastertide',
  pentecost: 'The Day of Pentecost',
}

const SEASON_BADGE_VARIANT: Record<ReturnType<typeof getAccentSeason>, 'sage' | 'violet' | 'gilt' | 'rubric'> = {
  ordinary: 'sage',
  epiphany: 'sage',
  advent: 'violet',
  lent: 'violet',
  christmas: 'gilt',
  easter: 'gilt',
  pentecost: 'rubric',
}

interface LiturgyHeaderProps {
  date: Date
  day: LiturgicalDay
}

export default function LiturgyHeader({ date, day }: LiturgyHeaderProps) {
  const season = getAccentSeason(day)

  return (
    <View className="pt-6">
      <View className="items-center">
        <Text className="text-2xl font-display text-ink">{formatDate(date)}</Text>
        <Text className="text-ink-muted italic mt-1">{day.displayName}</Text>
        <View className="flex-row items-center gap-2 mt-3">
          {day.subtitle ? <Badge variant={SEASON_BADGE_VARIANT[season]}>{day.subtitle}</Badge> : null}
          <Badge>{SEASON_LABEL[season]}</Badge>
        </View>
      </View>
      <OrnamentalDivider glyph="fleuron" />
    </View>
  )
}
