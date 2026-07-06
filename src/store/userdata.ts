import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import type { PrayerItem, Favorite } from '@/types'

const PRAYER_ITEMS_KEY = 'cp_prayer_items'
const FAVORITES_KEY = 'cp_favorites'

async function loadItems<T>(key: string): Promise<T[]> {
  try {
    const raw = await AsyncStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T[]) : []
  } catch {
    return []
  }
}

async function saveItems<T>(key: string, items: T[]): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(items))
  } catch {
    // Storage write failed — state still updates in memory; persist is best-effort
  }
}

interface UserDataStore {
  prayerItems: PrayerItem[]
  favorites: Favorite[]
  loaded: boolean
  load: () => Promise<void>
  addPrayerItem: (text: string) => Promise<void>
  removePrayerItem: (id: string) => Promise<void>
  addFavorite: (fav: Omit<Favorite, 'id' | 'createdAt'>) => Promise<void>
  removeFavorite: (id: string) => Promise<void>
}

export const useUserData = create<UserDataStore>((set, get) => ({
  prayerItems: [],
  favorites: [],
  loaded: false,

  async load() {
    if (get().loaded) return
    const [prayerItems, favorites] = await Promise.all([
      loadItems<PrayerItem>(PRAYER_ITEMS_KEY),
      loadItems<Favorite>(FAVORITES_KEY),
    ])
    set({ prayerItems, favorites, loaded: true })
  },

  async addPrayerItem(text) {
    const item: PrayerItem = {
      id: Math.random().toString(36).slice(2),
      text,
      createdAt: Date.now(),
    }
    const next = [...get().prayerItems, item]
    set({ prayerItems: next })
    await saveItems(PRAYER_ITEMS_KEY, next)
  },

  async removePrayerItem(id) {
    const next = get().prayerItems.filter((p) => p.id !== id)
    set({ prayerItems: next })
    await saveItems(PRAYER_ITEMS_KEY, next)
  },

  async addFavorite(fav) {
    const item: Favorite = {
      ...fav,
      id: Math.random().toString(36).slice(2),
      createdAt: Date.now(),
    }
    const next = [...get().favorites, item]
    set({ favorites: next })
    await saveItems(FAVORITES_KEY, next)
  },

  async removeFavorite(id) {
    const next = get().favorites.filter((f) => f.id !== id)
    set({ favorites: next })
    await saveItems(FAVORITES_KEY, next)
  },
}))
