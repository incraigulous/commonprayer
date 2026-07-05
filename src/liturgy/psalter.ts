import type { PsalmSection } from '@/types'
import psalterData from '../content/psalter-bcp1979.json'

interface RawPsalmVerse {
  number: number
  verse: string
  halfverse?: string
}

interface RawPsalmSection {
  label: string | null
  verses: RawPsalmVerse[]
}

interface RawPsalm {
  number: number
  latin: string | null
  sections: RawPsalmSection[]
}

const psalms = psalterData as Record<string, RawPsalm>

// Parse a single reference like "18" or "18:1-20" into a psalm number and optional verse range
function parseRef(ref: string): { number: number; start?: number; end?: number } {
  const [numPart, rangePart] = ref.split(':')
  const number = Number(numPart)
  if (!rangePart) return { number }
  const [start, end] = rangePart.split('-').map(Number)
  return { number, start, end: end ?? start }
}

// Look up the pointed 1979 BCP text for a psalm reference (e.g. "23" or "119:1-32")
export function getPsalmSections(ref: string): PsalmSection[] {
  const { number, start, end } = parseRef(ref)
  const psalm = psalms[String(number)]
  if (!psalm) return []

  return psalm.sections
    .map((section) => ({
      localname: section.label ?? undefined,
      value: section.verses
        .filter((v) => (start === undefined ? true : v.number >= start && v.number <= end!))
        .map((v) => ({
          number: v.number,
          verse: v.verse,
          halfverse: v.halfverse,
        })),
    }))
    .filter((section) => section.value.length > 0)
}
