import { useColorScheme } from 'react-native'
import { useSettings } from '@/store/settings'

// Resolves the effective color scheme, honoring an explicit user
// preference (settings.theme) over the OS setting.
export function useAppColorScheme(): 'light' | 'dark' {
  const systemScheme = useColorScheme()
  const theme = useSettings((s) => s.settings.theme)

  if (theme === 'light') return 'light'
  if (theme === 'dark') return 'dark'
  return systemScheme === 'dark' ? 'dark' : 'light'
}
