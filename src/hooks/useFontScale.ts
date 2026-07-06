import { useSettings } from '@/store/settings'
import type { FontSizePreference } from '@/types'

// Matches ui-kit's READING_SCALES = { sm: 0.9, md: 1, lg: 1.15, xl: 1.3 }
const SCALE: Record<FontSizePreference, number> = {
  small: 0.9,
  default: 1,
  large: 1.15,
  'x-large': 1.3,
}

// Multiplier applied to liturgy text font sizes per the user's font-size setting.
export function useFontScale(): number {
  const fontSize = useSettings((s) => s.settings.fontSize)
  return SCALE[fontSize]
}
