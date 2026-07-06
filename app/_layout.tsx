import { useEffect } from 'react'
import { View, useColorScheme } from 'react-native'
import { Stack, useRouter, useSegments } from 'expo-router'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import '../src/global.css'
import { lightTheme, darkTheme } from '../src/theme'
import { useSettings } from '../src/store/settings'

SplashScreen.preventAutoHideAsync()

function RootLayoutNav() {
  const colorScheme = useColorScheme()
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme
  const { settings, loaded: settingsLoaded } = useSettings()
  const router = useRouter()
  const segments = useSegments()

  useEffect(() => {
    if (!settingsLoaded) return
    const inOnboarding = segments[0] === 'onboarding'
    if (!settings.hasCompletedOnboarding && !inOnboarding) {
      router.replace('/onboarding')
    } else if (settings.hasCompletedOnboarding && inOnboarding) {
      router.replace('/')
    }
  }, [settingsLoaded, settings.hasCompletedOnboarding, segments, router])

  return (
    <View style={[theme, { flex: 1 }]}>
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
        <Stack.Screen name="compline" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </View>
  )
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    EBGaramond: require('../public/fonts/EBGaramond-Regular.ttf'),
    'EBGaramond-Italic': require('../public/fonts/EBGaramond-Italic.ttf'),
    'EBGaramond-SemiBold': require('../public/fonts/EBGaramond-SemiBold.ttf'),
    CormorantGaramond: require('../public/fonts/CormorantGaramond-Regular.ttf'),
    'CormorantGaramond-SemiBold': require('../public/fonts/CormorantGaramond-SemiBold.ttf'),
    'CormorantGaramond-Bold': require('../public/fonts/CormorantGaramond-Bold.ttf'),
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
