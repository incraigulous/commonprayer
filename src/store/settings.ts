import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { Settings } from '@/types'

const STORAGE_KEY = 'cp_settings'

const defaults: Settings = {
  version: 'rite-ii',
  vigil: false,
  angelus: 'none',
  gloriaPatri: false,
  minorFeastCollects: true,
  colorMode: 'seasonal',
  hasCompletedOnboarding: false,
  theme: 'system',
  fontSize: 'default',
  officiantRole: 'lay',
}

interface SettingsStore {
  settings: Settings
  loaded: boolean
  update: (patch: Partial<Settings>) => void
  completeOnboarding: () => void
  reset: () => void
  load: () => Promise<void>
}

export const useSettings = create<SettingsStore>((set, get) => ({
  settings: defaults,
  loaded: false,

  async load() {
    if (get().loaded) return
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY)
      const loaded = raw ? { ...defaults, ...JSON.parse(raw) } : defaults
      set({ settings: loaded, loaded: true })
    } catch {
      set({ settings: defaults, loaded: true })
    }
  },

  update(patch) {
    set((state) => {
      const next = { ...state.settings, ...patch }
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {})
      return { settings: next }
    })
  },

  completeOnboarding() {
    set((state) => {
      const next = { ...state.settings, hasCompletedOnboarding: true }
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {})
      return { settings: next }
    })
  },

  reset() {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaults)).catch(() => {})
    set({ settings: defaults })
  },
}))

// Initialize on import
useSettings.getState().load()
