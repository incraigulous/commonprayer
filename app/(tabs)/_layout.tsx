import { Tabs } from 'expo-router'
import { useColorScheme } from 'react-native'
import { Sunrise, Sun, Moon, MoreHorizontal } from 'lucide-react-native'

export default function TabsLayout() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  const activeColor = isDark ? '#d65846' : '#bf4835'
  const inactiveColor = isDark ? '#9ca2ad' : '#6b6150'
  const bgColor = isDark ? '#121826' : '#fffdf6'
  const borderColor = isDark ? '#2a3446' : '#e0d5bd'

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
          tabBarIcon: ({ color, size }) => <Sunrise size={size} color={color} strokeWidth={1.75} />,
        }}
      />
      <Tabs.Screen
        name="noon"
        options={{
          title: 'Noon',
          tabBarIcon: ({ color, size }) => <Sun size={size} color={color} strokeWidth={1.75} />,
        }}
      />
      <Tabs.Screen
        name="evening"
        options={{
          title: 'Evening',
          tabBarIcon: ({ color, size }) => <Moon size={size} color={color} strokeWidth={1.75} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color, size }) => <MoreHorizontal size={size} color={color} strokeWidth={1.75} />,
        }}
      />
    </Tabs>
  )
}
