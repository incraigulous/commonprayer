import { create } from 'zustand'
import type { Settings } from '@/types'

const STORAGE_KEY = 'cp_settings'

const defaults: Settings = {
  version: 'rite-ii',
  vigil: false,
  angelus: 'none',
  gloriaPatri: false,
  minorFeastCollects: true,
  hasCompletedOnboarding: false,
}

function load(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaults
    return { ...defaults, ...JSON.parse(raw) }
  } catch {
    return defaults
  }
}

function persist(s: Settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
}

interface SettingsStore {
  settings: Settings
  update: (patch: Partial<Settings>) => void
  completeOnboarding: () => void
}

export const useSettings = create<SettingsStore>((set) => ({
  settings: load(),
  update(patch) {
    set((state) => {
      const next = { ...state.settings, ...patch }
      persist(next)
      return { settings: next }
    })
  },
  completeOnboarding() {
    set((state) => {
      const next = { ...state.settings, hasCompletedOnboarding: true }
      persist(next)
      return { settings: next }
    })
  },
}))
