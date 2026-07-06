import { useMemo } from 'react'
import { View } from 'react-native'
import { Tabs } from 'expo-router'
import { Sunrise, Sun, Moon, MoonStar, MoreHorizontal } from 'lucide-react-native'
import { getSeasonAccentTones } from '@/liturgy/season-accent'
import { useAppColorScheme } from '@/hooks/useAppColorScheme'
import { useAccentSeason } from '@/hooks/useAccentSeason'
import { lightTheme, darkTheme } from '@/theme'

export default function TabsLayout() {
  const colorScheme = useAppColorScheme()
  const isDark = colorScheme === 'dark'
  const season = useAccentSeason()

  const { bgColor, borderColor, activeColor, inactiveColor } = useMemo(() => {
    const tones = getSeasonAccentTones(season, isDark ? 'dark' : 'light')
    const textOnAccent = (isDark ? darkTheme : lightTheme)['--text-on-accent']
    return {
      bgColor: tones.accent,
      borderColor: tones.accentPress,
      activeColor: textOnAccent,
      inactiveColor: `${textOnAccent}ad`,
    }
  }, [isDark, season])

  function withActiveIndicator(focused: boolean, icon: React.ReactNode) {
    return (
      <View
        style={{
          borderTopWidth: 2,
          borderTopColor: focused ? activeColor : 'transparent',
          paddingTop: 4,
          width: 40,
          alignItems: 'center',
        }}
      >
        {icon}
      </View>
    )
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: {
          backgroundColor: bgColor,
          borderTopColor: borderColor,
          borderTopWidth: 1,
        },
        tabBarLabelPosition: 'below-icon',
        tabBarLabelStyle: {
          fontFamily: 'System',
          fontSize: 11,
          letterSpacing: 0.3,
        },
      }}
    >
      <Tabs.Screen
        name="morning"
        options={{
          title: 'Morning',
          tabBarIcon: ({ color, size, focused }) =>
            withActiveIndicator(focused, <Sunrise size={size} color={color} strokeWidth={1.75} />),
        }}
      />
      <Tabs.Screen
        name="noon"
        options={{
          title: 'Noon',
          tabBarIcon: ({ color, size, focused }) =>
            withActiveIndicator(focused, <Sun size={size} color={color} strokeWidth={1.75} />),
        }}
      />
      <Tabs.Screen
        name="evening"
        options={{
          title: 'Evening',
          tabBarIcon: ({ color, size, focused }) =>
            withActiveIndicator(focused, <Moon size={size} color={color} strokeWidth={1.75} />),
        }}
      />
      <Tabs.Screen
        name="compline"
        options={{
          title: 'Compline',
          tabBarIcon: ({ color, size, focused }) =>
            withActiveIndicator(focused, <MoonStar size={size} color={color} strokeWidth={1.75} />),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color, size, focused }) =>
            withActiveIndicator(focused, <MoreHorizontal size={size} color={color} strokeWidth={1.75} />),
        }}
      />
    </Tabs>
  )
}
