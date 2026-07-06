// Mock nativewind so vars() returns the input object directly — the
// CSS variable keys are what we care about, not the RN style wrapper.
jest.mock('nativewind', () => ({
  vars: (obj: Record<string, string>) => obj,
}))

import { lightTheme, darkTheme } from './theme'

const REQUIRED_VARS = [
  '--bg',
  '--surface',
  '--surface-sunk',
  '--surface-raised',
  '--surface-hover',
  '--border',
  '--border-strong',
  '--text',
  '--text-muted',
  '--text-subtle',
  '--text-inverse',
  '--text-on-accent',
  '--accent',
  '--accent-hover',
  '--accent-press',
  '--accent-quiet',
  '--gilt',
  '--gilt-quiet',
] as const

describe('lightTheme', () => {
  it.each(REQUIRED_VARS)('defines %s', (key) => {
    expect(lightTheme).toHaveProperty(key)
    expect((lightTheme as Record<string, string>)[key]).toBeTruthy()
  })

  it('has a warm background color', () => {
    expect((lightTheme as Record<string, string>)['--bg']).toBe('#faf6ec')
  })

  it('has the correct accent color', () => {
    expect((lightTheme as Record<string, string>)['--accent']).toBe('#bf4835')
  })
})

describe('darkTheme', () => {
  it.each(REQUIRED_VARS)('defines %s', (key) => {
    expect(darkTheme).toHaveProperty(key)
    expect((darkTheme as Record<string, string>)[key]).toBeTruthy()
  })

  it('has a dark background color', () => {
    expect((darkTheme as Record<string, string>)['--bg']).toBe('#04070f')
  })

  it('has the correct dark accent color', () => {
    expect((darkTheme as Record<string, string>)['--accent']).toBe('#d65846')
  })
})

describe('theme contrast', () => {
  it('light and dark backgrounds are different', () => {
    expect((lightTheme as Record<string, string>)['--bg']).not.toBe(
      (darkTheme as Record<string, string>)['--bg']
    )
  })

  it('light and dark text colors are different', () => {
    expect((lightTheme as Record<string, string>)['--text']).not.toBe(
      (darkTheme as Record<string, string>)['--text']
    )
  })

  it('light theme background is lighter than dark theme background', () => {
    // Simple heuristic: light bg starts with #f which is brighter than dark bg #0
    const lightBg = (lightTheme as Record<string, string>)['--bg']
    const darkBg = (darkTheme as Record<string, string>)['--bg']
    expect(lightBg.charAt(1)).toMatch(/[a-f]/i) // starts high
    expect(darkBg.charAt(1)).toBe('0')           // starts low
  })
})
