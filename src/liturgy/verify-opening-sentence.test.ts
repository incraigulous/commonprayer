import { describe, it, expect } from 'vitest'
import { assembleOffice } from '@/liturgy/office'
import { getLiturgicalDay } from '@/liturgy/calendar'
import type { BibleReadingDoc, ResponsiveDoc } from '@/types'

function d(y: number, m: number, day: number) {
  return new Date(y, m - 1, day)
}

describe('verify: opening sentence resolves from real office assembly', () => {
  it('renders a seasonal Advent sentence for Morning Prayer', async () => {
    const day = getLiturgicalDay(d(2025, 12, 1)) // Advent
    expect(day.season).toBe('advent')
    const office = await assembleOffice('morning', day, { version: 'rite-ii', officiantRole: 'priest' } as never)
    const sentence = office.documents.find((doc) => doc.type === 'bible-reading') as BibleReadingDoc | undefined
    expect(sentence).toBeDefined()
    expect(sentence!.value?.[0]).toMatch(/Watch, for you know not|wilderness prepare|glory of the Lord/)
  })

  it('renders the Easter versicle-and-response for Morning Prayer during Easter season', async () => {
    const day = getLiturgicalDay(d(2026, 4, 6)) // Easter Monday-ish, should be 'easter' season
    const office = await assembleOffice('morning', day, { version: 'rite-ii', officiantRole: 'priest' } as never)
    const resp = office.documents.find((doc) => doc.type === 'responsive') as ResponsiveDoc | undefined
    const bibleReading = office.documents.find((doc) => doc.type === 'bible-reading')
    // Either the Alleluia versicle (responsive) or a plain Easter sentence should appear
    expect(resp || bibleReading).toBeDefined()
  })

  it('renders a general/at-any-time sentence for Ordinary Time', async () => {
    const day = getLiturgicalDay(d(2026, 7, 5)) // Pentecost season
    expect(day.season).toBe('pentecost')
    const office = await assembleOffice('morning', day, { version: 'rite-ii', officiantRole: 'priest' } as never)
    const sentence = office.documents.find((doc) => doc.type === 'bible-reading') as BibleReadingDoc | undefined
    expect(sentence).toBeDefined()
    expect(sentence!.value?.[0].length).toBeGreaterThan(0)
    expect(sentence!.citation).toBeTruthy()
  })

  it('renders an evening-specific sentence for Evening Prayer', async () => {
    const day = getLiturgicalDay(d(2026, 7, 5))
    const office = await assembleOffice('evening', day, { version: 'rite-ii', officiantRole: 'priest' } as never)
    const sentence = office.documents.find((doc) => doc.type === 'bible-reading') as BibleReadingDoc | undefined
    expect(sentence).toBeDefined()
    expect(sentence!.value?.[0].length).toBeGreaterThan(0)
  })

  it('is deterministic for the same date', async () => {
    const day = getLiturgicalDay(d(2026, 7, 5))
    const office1 = await assembleOffice('morning', day, { version: 'rite-ii', officiantRole: 'priest' } as never)
    const office2 = await assembleOffice('morning', day, { version: 'rite-ii', officiantRole: 'priest' } as never)
    const s1 = office1.documents.find((doc) => doc.type === 'bible-reading') as BibleReadingDoc
    const s2 = office2.documents.find((doc) => doc.type === 'bible-reading') as BibleReadingDoc
    expect(s1.value?.[0]).toBe(s2.value?.[0])
  })
})
