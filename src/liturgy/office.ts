import type { LiturgyDoc, LiturgicalDocument, OptionDoc, PsalmSection, Settings } from '@/types'
import type { LiturgicalDay } from '@/types'
import { dailyPsalmCycle } from './calendar'
import { getPsalmSections } from './psalter'
import { getOpeningSentence } from './opening-sentences'
import { getCollectOfTheDay } from './collects'
import { getDailyReadings } from './lectionary'
import { getPassageText } from './bible'

export type OfficeType = 'morning' | 'noon' | 'evening' | 'compline'

// Load office content JSON via require() so this works in both Metro and Jest (CJS)
function loadOfficeContent(office: OfficeType, version: string): LiturgyDoc {
  const v = version === 'rite-i' ? 'rite-i' : 'rite-ii'
  if (office === 'noon') return require('../content/noonday-prayer.json') as LiturgyDoc
  if (office === 'compline') return require('../content/compline.json') as LiturgyDoc
  if (office === 'morning' && v === 'rite-i') return require('../content/morning-prayer-rite-i.json') as LiturgyDoc
  if (office === 'morning') return require('../content/morning-prayer-rite-ii.json') as LiturgyDoc
  if (office === 'evening' && v === 'rite-i') return require('../content/evening-prayer-rite-i.json') as LiturgyDoc
  return require('../content/evening-prayer-rite-ii.json') as LiturgyDoc
}

// Resolve any option documents to the user's preferred version index
function resolveOptions(docs: LiturgicalDocument[], settings: Settings): LiturgicalDocument[] {
  return docs.map((doc) => {
    if (doc.type === 'option') {
      const opt = doc as OptionDoc
      let selected = opt.metadata?.selected ?? 0
      if (opt.metadata?.basedOn && opt.metadata.basedOnValues) {
        const idx = opt.metadata.basedOnValues.indexOf(settings[opt.metadata.basedOn])
        if (idx !== -1) selected = idx
      }
      const resolved = resolveOptions([opt.value[selected]], settings)
      return resolved[0]
    }
    if (doc.type === 'liturgy') {
      const lDoc = doc as LiturgyDoc
      return { ...lDoc, value: resolveOptions(lDoc.value, settings) }
    }
    return doc
  })
}

// Insert Gloria Patri after each psalm section if setting is on
function maybeInsertGloriaPatri(docs: LiturgicalDocument[], settings: Settings): LiturgicalDocument[] {
  if (!settings.gloriaPatri) return docs
  const gloria: LiturgicalDocument = {
    type: 'text',
    style: 'prayer',
    value: [
      'Glory to the Father, and to the Son, and to the Holy Spirit: *',
      'as it was in the beginning, is now, and will be for ever. Amen.',
    ],
  }
  const result: LiturgicalDocument[] = []
  for (const doc of docs) {
    result.push(doc)
    if (doc.type === 'psalm') result.push(gloria)
  }
  return result
}

export interface AssembledOffice {
  title: string
  day: LiturgicalDay
  documents: LiturgicalDocument[]
}

export async function assembleOffice(
  office: OfficeType,
  day: LiturgicalDay,
  settings: Settings,
): Promise<AssembledOffice> {
  const content = loadOfficeContent(office, settings.version)
  let docs = content.value as LiturgicalDocument[]

  // Drop the leading office-name heading — the top bar and masthead
  // already name the office, so repeating it in the body is redundant.
  if (docs[0]?.type === 'heading') {
    docs = docs.slice(1)
  }

  // Resolve version options
  docs = resolveOptions(docs, settings)

  // Insert psalm cycle — replace any psalm-lookup placeholder
  docs = docs.map((doc) => {
    if (doc.type === 'psalm' && (doc.metadata as Record<string, unknown>)?.lookup === 'daily-cycle') {
      const cycle = dailyPsalmCycle(day.date)
      const psalmRefs = office === 'evening' ? cycle.evening : cycle.morning
      const sections: PsalmSection[] = psalmRefs.flatMap((ref) => getPsalmSections(ref))
      return {
        ...doc,
        label: `Psalm${psalmRefs.length > 1 ? 's' : ''} ${psalmRefs.join(', ')}`,
        metadata: { ...doc.metadata as Record<string, unknown>, refs: psalmRefs },
        value: sections,
      }
    }
    return doc
  })

  // Insert the seasonal opening sentence — replace any opening-sentence placeholder
  if (office === 'morning' || office === 'evening') {
    const sentence = getOpeningSentence(office, day.season, day.date, day.seasonStart)
    docs = docs.map((doc) => {
      if (doc.type === 'bible-reading' && (doc.metadata as Record<string, unknown>)?.lookup === 'opening-sentence') {
        if (sentence.response) {
          return {
            type: 'responsive',
            style: 'responsive',
            value: [
              { label: 'Officiant', text: sentence.text },
              { label: 'People', text: sentence.response, bold: true },
            ],
          } as LiturgicalDocument
        }
        return {
          ...doc,
          citation: sentence.citation ?? '',
          value: [sentence.text],
        }
      }
      return doc
    })
  }

  // Insert the Collect of the Day — replace any collect-of-the-day placeholder
  docs = docs.map((doc) => {
    if (doc.type === 'text' && (doc.metadata as Record<string, unknown>)?.lookup === 'collect-of-the-day') {
      const collect = getCollectOfTheDay(day)
      if (!collect) return doc
      return {
        ...doc,
        label: collect.title,
        value: [collect.text],
      }
    }
    return doc
  })

  // Insert the daily lectionary lessons — replace any daily-lectionary placeholder
  const readings = getDailyReadings(day)
  docs = docs.map((doc) => {
    const meta = doc.metadata as Record<string, unknown> | undefined
    if (doc.type === 'bible-reading' && meta?.lookup === 'daily-lectionary') {
      const part = meta.part as 'morning-ot' | 'morning-nt' | 'evening-ot' | 'evening-nt' | undefined
      const citation =
        part === 'morning-ot' ? readings?.morning.ot :
        part === 'morning-nt' ? readings?.morning.nt :
        part === 'evening-ot' ? readings?.evening.ot :
        part === 'evening-nt' ? readings?.evening.nt :
        undefined
      const passage = citation ? getPassageText(citation) : null
      if (!passage) return doc
      return {
        ...doc,
        citation: doc.citation ? `${doc.citation} · ${passage.citation}` : passage.citation,
        value: passage.paragraphs,
      }
    }
    return doc
  })

  // Apply Gloria Patri
  docs = maybeInsertGloriaPatri(docs, settings)

  const titles: Record<OfficeType, string> = {
    morning: 'Morning Prayer',
    noon: 'Noonday Prayer',
    evening: 'Evening Prayer',
    compline: 'Compline',
  }

  return { title: titles[office], day, documents: docs }
}
