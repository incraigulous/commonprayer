import { describe, it, expect } from 'vitest'
import { getLiturgicalDay } from './calendar'

function d(y: number, m: number, day: number) {
  return new Date(y, m - 1, day)
}

describe('getLiturgicalDay — season classification', () => {
  it('classifies Christmas Day correctly (not Advent)', () => {
    const day = getLiturgicalDay(d(2024, 12, 25))
    expect(day.season).toBe('christmas')
    expect(day.displayName).toBe('The Nativity of Our Lord Jesus Christ') // fixed feast
  })

  it('classifies Dec 26 as Christmas season (not Advent)', () => {
    const day = getLiturgicalDay(d(2024, 12, 26))
    expect(day.season).toBe('christmas')
  })

  it('classifies Dec 31 as Christmas season (not Advent)', () => {
    const day = getLiturgicalDay(d(2024, 12, 31))
    expect(day.season).toBe('christmas')
  })

  it('classifies Jan 1 as Christmas season', () => {
    const day = getLiturgicalDay(d(2025, 1, 1))
    expect(day.season).toBe('christmas')
  })

  it('classifies Jan 5 as Christmas season (last day of octave)', () => {
    const day = getLiturgicalDay(d(2025, 1, 5))
    expect(day.season).toBe('christmas')
  })

  it('classifies Jan 6 (Epiphany) as epiphany', () => {
    const day = getLiturgicalDay(d(2025, 1, 6))
    expect(day.season).toBe('epiphany')
  })

  it('classifies Advent 1 correctly', () => {
    // Advent 1 2024 = Dec 1 (nearest Sunday to Nov 30)
    const day = getLiturgicalDay(d(2024, 12, 1))
    expect(day.season).toBe('advent')
    expect(day.displayName).toBe('First Sunday of Advent')
  })

  it('classifies Dec 24 as Advent (not Christmas)', () => {
    const day = getLiturgicalDay(d(2024, 12, 24))
    expect(day.season).toBe('advent')
  })

  it('classifies Easter Day correctly', () => {
    // Easter 2025 = April 20
    const day = getLiturgicalDay(d(2025, 4, 20))
    expect(day.season).toBe('easter')
    expect(day.displayName).toBe('Easter Day')
  })

  it('classifies Ash Wednesday correctly', () => {
    // Ash Wednesday 2025 = March 5
    const day = getLiturgicalDay(d(2025, 3, 5))
    expect(day.season).toBe('lent')
    expect(day.displayName).toBe('Ash Wednesday')
  })

  it('classifies Palm Sunday correctly', () => {
    // Palm Sunday 2025 = April 13
    const day = getLiturgicalDay(d(2025, 4, 13))
    expect(day.season).toBe('holyweek')
    expect(day.displayName).toBe('Palm Sunday')
  })

  it('classifies Pentecost correctly', () => {
    // Pentecost 2025 = June 8
    const day = getLiturgicalDay(d(2025, 6, 8))
    expect(day.season).toBe('easter')
    expect(day.displayName).toBe('The Day of Pentecost')
  })

  it('classifies a Season after Pentecost Sunday with proper', () => {
    // July 6, 2025 = Sixth Sunday after Pentecost, Proper 9
    const day = getLiturgicalDay(d(2025, 7, 6))
    expect(day.season).toBe('pentecost')
    expect(day.subtitle).toMatch(/Proper \d+/)
  })
})

describe('getLiturgicalDay — Lent Sunday numbering', () => {
  // Ash Wednesday 2025 = March 5
  // First Sunday of Lent = March 9 (4 days later)
  it('first Sunday of Lent is labeled "First Sunday in Lent"', () => {
    const day = getLiturgicalDay(d(2025, 3, 9))
    expect(day.season).toBe('lent')
    expect(day.displayName).toBe('First Sunday in Lent')
  })

  it('second Sunday of Lent is labeled "Second Sunday in Lent"', () => {
    const day = getLiturgicalDay(d(2025, 3, 16))
    expect(day.season).toBe('lent')
    expect(day.displayName).toBe('Second Sunday in Lent')
  })

  it('fifth Sunday of Lent is labeled "Fifth Sunday in Lent"', () => {
    const day = getLiturgicalDay(d(2025, 4, 6))
    expect(day.season).toBe('lent')
    expect(day.displayName).toBe('Fifth Sunday in Lent')
  })
})

describe('getLiturgicalDay — plan verification date', () => {
  // July 5, 2026 = The Sixth Sunday after Pentecost, Proper 9
  it('July 5 2026 is Sixth Sunday after Pentecost', () => {
    const day = getLiturgicalDay(d(2026, 7, 5))
    expect(day.season).toBe('pentecost')
    expect(day.displayName).toContain('Sixth')
    expect(day.subtitle).toBe('Proper 9')
  })
})

describe('getLiturgicalDay — fixed feasts', () => {
  it('Nov 1 is All Saints Day', () => {
    const day = getLiturgicalDay(d(2025, 11, 1))
    expect(day.holy).toBe("All Saints' Day")
  })

  it('Dec 28 is Holy Innocents', () => {
    const day = getLiturgicalDay(d(2025, 12, 28))
    expect(day.holy).toBe('The Holy Innocents')
    expect(day.season).toBe('christmas')
  })
})

describe('getLiturgicalDay — lectionary years', () => {
  it('odd year is Year One for daily lectionary', () => {
    expect(getLiturgicalDay(d(2025, 6, 1)).dailyLectionaryYear).toBe('one')
  })

  it('even year is Year Two for daily lectionary', () => {
    expect(getLiturgicalDay(d(2026, 6, 1)).dailyLectionaryYear).toBe('two')
  })
})
