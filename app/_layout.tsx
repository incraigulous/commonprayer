import { useEffect } from 'react'
import { View } from 'react-native'
import { Stack, Redirect, useSegments } from 'expo-router'
import { useFonts } from 'expo-font'
import {
  EBGaramond_400Regular,
  EBGaramond_400Regular_Italic,
  EBGaramond_600SemiBold,
} from '@expo-google-fonts/eb-garamond'
import {
  CormorantGaramond_400Regular,
  CormorantGaramond_600SemiBold,
  CormorantGaramond_700Bold,
} from '@expo-google-fonts/cormorant-garamond'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import '../src/global.css'
import { useSeasonalTheme } from '../src/hooks/useSeasonalTheme'
import { useAppColorScheme } from '../src/hooks/useAppColorScheme'
import { useSettings } from '../src/store/settings'

SplashScreen.preventAutoHideAsync()

function RootLayoutNav() {
  const colorScheme = useAppColorScheme()
  const theme = useSeasonalTheme()
  const { settings, loaded: settingsLoaded } = useSettings()
  const segments = useSegments()

  if (settingsLoaded) {
    const inOnboarding = segments[0] === 'onboarding'
    if (!settings.hasCompletedOnboarding && !inOnboarding) {
      return <Redirect href="/onboarding" />
    }
    if (settings.hasCompletedOnboarding && inOnboarding) {
      return <Redirect href="/" />
    }
  }

  return (
    <View style={[theme, { flex: 1 }]}>
      <View className="flex-1 w-full max-w-3xl self-center">
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="psalter/index" options={{ headerShown: false }} />
          <Stack.Screen name="psalter/[num]" options={{ headerShown: false }} />
          <Stack.Screen name="daily-readings" options={{ headerShown: false }} />
          <Stack.Screen name="prayers" options={{ headerShown: false }} />
          <Stack.Screen name="prayer-list" options={{ headerShown: false }} />
          <Stack.Screen name="favorites" options={{ headerShown: false }} />
          <Stack.Screen name="reminders" options={{ headerShown: false }} />
          <Stack.Screen name="settings" options={{ headerShown: false }} />
          <Stack.Screen name="about" options={{ headerShown: false }} />
        </Stack>
      </View>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </View>
  )
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    EBGaramond: EBGaramond_400Regular,
    'EBGaramond-Italic': EBGaramond_400Regular_Italic,
    'EBGaramond-SemiBold': EBGaramond_600SemiBold,
    CormorantGaramond: CormorantGaramond_400Regular,
    'CormorantGaramond-SemiBold': CormorantGaramond_600SemiBold,
    'CormorantGaramond-Bold': CormorantGaramond_700Bold,
    GoudyInitialen: require('../public/fonts/GoudyInitialen.ttf'),
  })

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) return null

  return (
    <SafeAreaProvider>
      <RootLayoutNav />
    </SafeAreaProvider>
  )
}
