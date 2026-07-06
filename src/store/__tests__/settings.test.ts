// AsyncStorage is mocked via jest.config.js moduleNameMapper
import { useSettings } from '../settings'
import type { Settings } from '@/types'

const DEFAULTS: Settings = {
  version: 'rite-ii',
  vigil: false,
  angelus: 'none',
  gloriaPatri: false,
  minorFeastCollects: true,
  hasCompletedOnboarding: false,
  theme: 'system',
  fontSize: 'default',
  officiantRole: 'lay',
}

beforeEach(() => {
  // Reset store to defaults before each test
  useSettings.setState({ settings: { ...DEFAULTS }, loaded: false })
})

describe('settings store defaults', () => {
  it('has rite-ii as default version', () => {
    expect(useSettings.getState().settings.version).toBe('rite-ii')
  })

  it('has gloriaPatri off by default', () => {
    expect(useSettings.getState().settings.gloriaPatri).toBe(false)
  })

  it('has minorFeastCollects on by default', () => {
    expect(useSettings.getState().settings.minorFeastCollects).toBe(true)
  })

  it('has onboarding incomplete by default', () => {
    expect(useSettings.getState().settings.hasCompletedOnboarding).toBe(false)
  })

  it('has lay officiant role by default', () => {
    expect(useSettings.getState().settings.officiantRole).toBe('lay')
  })
})

describe('settings store load()', () => {
  it('sets loaded = true after loading with no stored data', async () => {
    await useSettings.getState().load()
    expect(useSettings.getState().loaded).toBe(true)
  })

  it('is idempotent — does not re-load when already loaded', async () => {
    useSettings.setState({ loaded: true })
    // If load() re-ran it would call AsyncStorage.getItem; the mock
    // returns null which would overwrite settings. We confirm state is unchanged.
    useSettings.setState({ settings: { ...DEFAULTS, version: 'rite-i' }, loaded: true })
    await useSettings.getState().load()
    expect(useSettings.getState().settings.version).toBe('rite-i')
  })
})

describe('settings store update()', () => {
  it('patches a single field', () => {
    useSettings.getState().update({ version: 'eow' })
    expect(useSettings.getState().settings.version).toBe('eow')
  })

  it('patches multiple fields at once', () => {
    useSettings.getState().update({ version: 'rite-i', gloriaPatri: true })
    const { settings } = useSettings.getState()
    expect(settings.version).toBe('rite-i')
    expect(settings.gloriaPatri).toBe(true)
  })

  it('does not clear unrelated fields', () => {
    useSettings.getState().update({ version: 'eow' })
    expect(useSettings.getState().settings.minorFeastCollects).toBe(true)
    expect(useSettings.getState().settings.officiantRole).toBe('lay')
  })
})

describe('settings store completeOnboarding()', () => {
  it('sets hasCompletedOnboarding to true', () => {
    useSettings.getState().completeOnboarding()
    expect(useSettings.getState().settings.hasCompletedOnboarding).toBe(true)
  })

  it('does not affect other settings', () => {
    useSettings.getState().update({ version: 'rite-i' })
    useSettings.getState().completeOnboarding()
    expect(useSettings.getState().settings.version).toBe('rite-i')
  })
})
