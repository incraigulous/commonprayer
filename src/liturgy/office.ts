import type { LiturgyDoc, LiturgicalDocument, OptionDoc, Settings } from '@/types'
import type { LiturgicalDay } from '@/types'
import { dailyPsalmCycle } from './calendar'

export type OfficeType = 'morning' | 'noon' | 'evening' | 'compline'

// Dynamically import office content JSON
async function loadOfficeContent(office: OfficeType, version: string): Promise<LiturgyDoc> {
  let mod: unknown
  if (office === 'noon') {
    mod = await import('../content/noonday-prayer.json')
  } else if (office === 'compline') {
    mod = await import('../content/compline.json')
  } else {
    const v = version === 'rite-i' ? 'rite-i' : 'rite-ii'
    mod = await import(`../content/${office}-prayer-${v}.json`)
  }
  return (mod as { default: LiturgyDoc }).default
}

// Resolve any option documents to the user's preferred version index
function resolveOptions(docs: LiturgicalDocument[], settings: Settings): LiturgicalDocument[] {
  return docs.map((doc) => {
    if (doc.type === 'option') {
      const opt = doc as OptionDoc
      const selected = opt.metadata?.selected ?? 0
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
  const content = await loadOfficeContent(office, settings.version)
  let docs = content.value as LiturgicalDocument[]

  // Resolve version options
  docs = resolveOptions(docs, settings)

  // Insert psalm cycle — replace any psalm-lookup placeholder
  docs = docs.map((doc) => {
    if (doc.type === 'psalm' && (doc.metadata as Record<string, unknown>)?.lookup === 'daily-cycle') {
      const cycle = dailyPsalmCycle(day.date)
      const psalmRefs = office === 'evening' ? cycle.evening : cycle.morning
      return {
        ...doc,
        label: `Psalm${psalmRefs.length > 1 ? 's' : ''} ${psalmRefs.join(', ')}`,
        metadata: { ...doc.metadata as Record<string, unknown>, refs: psalmRefs },
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
