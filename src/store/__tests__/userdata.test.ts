// AsyncStorage is mocked via jest.config.js moduleNameMapper
import { useUserData } from '../userdata'

beforeEach(() => {
  useUserData.setState({ prayerItems: [], favorites: [], loaded: false })
})

describe('userdata store load()', () => {
  it('sets loaded = true after loading with no stored data', async () => {
    await useUserData.getState().load()
    expect(useUserData.getState().loaded).toBe(true)
  })

  it('starts with empty arrays', async () => {
    await useUserData.getState().load()
    expect(useUserData.getState().prayerItems).toEqual([])
    expect(useUserData.getState().favorites).toEqual([])
  })

  it('is idempotent when already loaded', async () => {
    useUserData.setState({ loaded: true, prayerItems: [{ id: 'x', text: 'test', createdAt: 1 }], favorites: [] })
    await useUserData.getState().load()
    // State unchanged since we skip load when already loaded
    expect(useUserData.getState().prayerItems).toHaveLength(1)
  })
})

describe('userdata store prayer items', () => {
  it('addPrayerItem() adds an item with a generated id', async () => {
    await useUserData.getState().addPrayerItem('For the sick')
    const { prayerItems } = useUserData.getState()
    expect(prayerItems).toHaveLength(1)
    expect(prayerItems[0].text).toBe('For the sick')
    expect(typeof prayerItems[0].id).toBe('string')
    expect(prayerItems[0].id.length).toBeGreaterThan(0)
  })

  it('addPrayerItem() records a createdAt timestamp', async () => {
    const before = Date.now()
    await useUserData.getState().addPrayerItem('For peace')
    const after = Date.now()
    const item = useUserData.getState().prayerItems[0]
    expect(item.createdAt).toBeGreaterThanOrEqual(before)
    expect(item.createdAt).toBeLessThanOrEqual(after)
  })

  it('addPrayerItem() supports adding multiple items', async () => {
    await useUserData.getState().addPrayerItem('First')
    await useUserData.getState().addPrayerItem('Second')
    expect(useUserData.getState().prayerItems).toHaveLength(2)
  })

  it('removePrayerItem() removes item by id', async () => {
    await useUserData.getState().addPrayerItem('Remove me')
    const { prayerItems } = useUserData.getState()
    await useUserData.getState().removePrayerItem(prayerItems[0].id)
    expect(useUserData.getState().prayerItems).toHaveLength(0)
  })

  it('removePrayerItem() only removes the targeted item', async () => {
    await useUserData.getState().addPrayerItem('Keep me')
    await useUserData.getState().addPrayerItem('Remove me')
    const { prayerItems } = useUserData.getState()
    const removeId = prayerItems[1].id
    await useUserData.getState().removePrayerItem(removeId)
    const remaining = useUserData.getState().prayerItems
    expect(remaining).toHaveLength(1)
    expect(remaining[0].text).toBe('Keep me')
  })

  it('removePrayerItem() is a no-op for an unknown id', async () => {
    await useUserData.getState().addPrayerItem('Keep me')
    await useUserData.getState().removePrayerItem('nonexistent-id')
    expect(useUserData.getState().prayerItems).toHaveLength(1)
  })
})

describe('userdata store favorites', () => {
  it('addFavorite() adds an item with a generated id and createdAt', async () => {
    await useUserData.getState().addFavorite({ text: 'Lord have mercy', liturgy: 'morning', section: 'Kyrie' })
    const { favorites } = useUserData.getState()
    expect(favorites).toHaveLength(1)
    expect(favorites[0].text).toBe('Lord have mercy')
    expect(favorites[0].liturgy).toBe('morning')
    expect(typeof favorites[0].id).toBe('string')
    expect(favorites[0].createdAt).toBeGreaterThan(0)
  })

  it('removeFavorite() removes item by id', async () => {
    await useUserData.getState().addFavorite({ text: 'Grant us thy peace', liturgy: 'evening', section: 'Collect' })
    const { favorites } = useUserData.getState()
    await useUserData.getState().removeFavorite(favorites[0].id)
    expect(useUserData.getState().favorites).toHaveLength(0)
  })

  it('removeFavorite() only removes the targeted favorite', async () => {
    await useUserData.getState().addFavorite({ text: 'Keep', liturgy: 'morning', section: 'Opening' })
    await useUserData.getState().addFavorite({ text: 'Remove', liturgy: 'evening', section: 'Closing' })
    const removeId = useUserData.getState().favorites[1].id
    await useUserData.getState().removeFavorite(removeId)
    expect(useUserData.getState().favorites).toHaveLength(1)
    expect(useUserData.getState().favorites[0].text).toBe('Keep')
  })
})
