import { openDB, type DBSchema, type IDBPDatabase } from 'idb'
import { create } from 'zustand'
import type { PrayerItem, Favorite } from '@/types'

interface CpDB extends DBSchema {
  'prayer-items': {
    key: string
    value: PrayerItem
  }
  favorites: {
    key: string
    value: Favorite
  }
}

let db: IDBPDatabase<CpDB> | null = null

async function getDB() {
  if (!db) {
    db = await openDB<CpDB>('commonprayer', 1, {
      upgrade(database) {
        database.createObjectStore('prayer-items', { keyPath: 'id' })
        database.createObjectStore('favorites', { keyPath: 'id' })
      },
    })
  }
  return db
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
    const database = await getDB()
    const [prayerItems, favorites] = await Promise.all([
      database.getAll('prayer-items'),
      database.getAll('favorites'),
    ])
    set({ prayerItems, favorites, loaded: true })
  },

  async addPrayerItem(text) {
    const item: PrayerItem = { id: crypto.randomUUID(), text, createdAt: Date.now() }
    const database = await getDB()
    await database.put('prayer-items', item)
    set((s) => ({ prayerItems: [...s.prayerItems, item] }))
  },

  async removePrayerItem(id) {
    const database = await getDB()
    await database.delete('prayer-items', id)
    set((s) => ({ prayerItems: s.prayerItems.filter((p) => p.id !== id) }))
  },

  async addFavorite(fav) {
    const item: Favorite = { ...fav, id: crypto.randomUUID(), createdAt: Date.now() }
    const database = await getDB()
    await database.put('favorites', item)
    set((s) => ({ favorites: [...s.favorites, item] }))
  },

  async removeFavorite(id) {
    const database = await getDB()
    await database.delete('favorites', id)
    set((s) => ({ favorites: s.favorites.filter((f) => f.id !== id) }))
  },
}))
