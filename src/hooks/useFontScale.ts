import { createContext, useContext } from 'react'
import { useSettings } from '@/store/settings'
import type { FontSizePreference } from '@/types'

// Matches ui-kit's READING_SCALES = { sm: 0.9, md: 1, lg: 1.15, xl: 1.3 }
const SCALE: Record<FontSizePreference, number> = {
  small: 0.9,
  default: 1,
  large: 1.15,
  'x-large': 1.3,
}

// RN has no CSS cascade for a --reading-scale custom property, so a <Theme
// size="lg"> subtree override is threaded through context instead — null
// means "no override here", fall back to the global settings preference.
export const ReadingScaleContext = createContext<number | null>(null)

// Multiplier applied to liturgy text font sizes per the user's font-size
// setting, or the nearest <Theme size> override if one wraps this subtree.
export function useFontScale(): number {
  const override = useContext(ReadingScaleContext)
  const fontSize = useSettings((s) => s.settings.fontSize)
  return override ?? SCALE[fontSize]
}
