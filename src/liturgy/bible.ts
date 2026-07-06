import { BOOK_FILES, normalizeKey, SINGLE_CHAPTER_BOOKS } from './bible-books'

type BookText = Record<string, Record<string, string>>

// Metro requires statically-analyzable require() calls — no dynamic paths —
// so every pre-processed book JSON needs its own literal require() here.
// Regenerate this list (and the JSON files) via `npx tsx scripts/build-bible-json.ts`.
const BOOK_LOADERS: Record<string, () => BookText> = {
  '1CH': () => require('../content/bible/web/1CH.json'),
  '1CO': () => require('../content/bible/web/1CO.json'),
  '1JN': () => require('../content/bible/web/1JN.json'),
  '1KI': () => require('../content/bible/web/1KI.json'),
  '1MA': () => require('../content/bible/web/1MA.json'),
  '1PE': () => require('../content/bible/web/1PE.json'),
  '1SA': () => require('../content/bible/web/1SA.json'),
  '1TH': () => require('../content/bible/web/1TH.json'),
  '1TI': () => require('../content/bible/web/1TI.json'),
  '2CH': () => require('../content/bible/web/2CH.json'),
  '2CO': () => require('../content/bible/web/2CO.json'),
  '2JN': () => require('../content/bible/web/2JN.json'),
  '2KI': () => require('../content/bible/web/2KI.json'),
  '2MA': () => require('../content/bible/web/2MA.json'),
  '2PE': () => require('../content/bible/web/2PE.json'),
  '2SA': () => require('../content/bible/web/2SA.json'),
  '2TH': () => require('../content/bible/web/2TH.json'),
  '2TI': () => require('../content/bible/web/2TI.json'),
  '3JN': () => require('../content/bible/web/3JN.json'),
  'ACT': () => require('../content/bible/web/ACT.json'),
  'AMO': () => require('../content/bible/web/AMO.json'),
  'BAR': () => require('../content/bible/web/BAR.json'),
  'COL': () => require('../content/bible/web/COL.json'),
  'DAN': () => require('../content/bible/web/DAN.json'),
  'DEU': () => require('../content/bible/web/DEU.json'),
  'ECC': () => require('../content/bible/web/ECC.json'),
  'EPH': () => require('../content/bible/web/EPH.json'),
  'EST': () => require('../content/bible/web/EST.json'),
  'EXO': () => require('../content/bible/web/EXO.json'),
  'EZK': () => require('../content/bible/web/EZK.json'),
  'EZR': () => require('../content/bible/web/EZR.json'),
  'GAL': () => require('../content/bible/web/GAL.json'),
  'GEN': () => require('../content/bible/web/GEN.json'),
  'HAB': () => require('../content/bible/web/HAB.json'),
  'HAG': () => require('../content/bible/web/HAG.json'),
  'HEB': () => require('../content/bible/web/HEB.json'),
  'HOS': () => require('../content/bible/web/HOS.json'),
  'ISA': () => require('../content/bible/web/ISA.json'),
  'JAS': () => require('../content/bible/web/JAS.json'),
  'JDG': () => require('../content/bible/web/JDG.json'),
  'JER': () => require('../content/bible/web/JER.json'),
  'JHN': () => require('../content/bible/web/JHN.json'),
  'JOB': () => require('../content/bible/web/JOB.json'),
  'JOL': () => require('../content/bible/web/JOL.json'),
  'JON': () => require('../content/bible/web/JON.json'),
  'JOS': () => require('../content/bible/web/JOS.json'),
  'JUD': () => require('../content/bible/web/JUD.json'),
  'LAM': () => require('../content/bible/web/LAM.json'),
  'LEV': () => require('../content/bible/web/LEV.json'),
  'LUK': () => require('../content/bible/web/LUK.json'),
  'MAL': () => require('../content/bible/web/MAL.json'),
  'MAT': () => require('../content/bible/web/MAT.json'),
  'MIC': () => require('../content/bible/web/MIC.json'),
  'MRK': () => require('../content/bible/web/MRK.json'),
  'NAM': () => require('../content/bible/web/NAM.json'),
  'NEH': () => require('../content/bible/web/NEH.json'),
  'NUM': () => require('../content/bible/web/NUM.json'),
  'OBA': () => require('../content/bible/web/OBA.json'),
  'PHM': () => require('../content/bible/web/PHM.json'),
  'PHP': () => require('../content/bible/web/PHP.json'),
  'PRO': () => require('../content/bible/web/PRO.json'),
  'REV': () => require('../content/bible/web/REV.json'),
  'ROM': () => require('../content/bible/web/ROM.json'),
  'RUT': () => require('../content/bible/web/RUT.json'),
  'SIR': () => require('../content/bible/web/SIR.json'),
  'TIT': () => require('../content/bible/web/TIT.json'),
  'WIS': () => require('../content/bible/web/WIS.json'),
  'ZEC': () => require('../content/bible/web/ZEC.json'),
  'ZEP': () => require('../content/bible/web/ZEP.json'),
}

const bookCache = new Map<string, BookText | null>()

function loadBook(fileCode: string): BookText | null {
  const outCode = fileCode.split('_')[0]
  if (bookCache.has(outCode)) return bookCache.get(outCode)!
  let data: BookText | null = null
  try {
    data = BOOK_LOADERS[outCode]?.() ?? null
  } catch {
    data = null
  }
  bookCache.set(outCode, data)
  return data
}

interface VerseRange {
  bookKey: string
  startChapter: number
  startVerse: number
  endChapter: number
  endVerse: number
}

const RANGE_RE = /^(\d+):(\d+)(?:[–-](?:(\d+):)?(\d+))?$/

// Parses one comma/semicolon-separated segment of a citation, given the book
// and the chapter that was in effect before this segment (for segments like
// "18–23" that omit the book/chapter entirely).
function parseSegment(
  bookKey: string,
  segment: string,
  defaultChapter: number | null,
): VerseRange | null {
  const cleaned = segment
    .replace(/[()]/g, '') // parenthetical optional verses — treat as included
    .replace(/(\d)[ab]\b/g, '$1') // verse-letter suffixes (2a, 10b) — verse-level granularity only
    .trim()

  const withChapter = cleaned.match(RANGE_RE)
  if (withChapter) {
    const [, startCh, startV, endCh, endV] = withChapter
    const startChapter = Number(startCh)
    const startVerse = Number(startV)
    const endChapter = endCh != null ? Number(endCh) : startChapter
    const endVerse = endV != null ? Number(endV) : startVerse
    return { bookKey, startChapter, startVerse, endChapter, endVerse }
  }

  // A bare verse or verse range with no chapter number, e.g. "18–23" as a
  // continuation of the previous segment's chapter.
  if (defaultChapter != null) {
    const bare = cleaned.match(/^(\d+)(?:[–-](\d+))?$/)
    if (bare) {
      const [, startV, endV] = bare
      return {
        bookKey,
        startChapter: defaultChapter,
        startVerse: Number(startV),
        endChapter: defaultChapter,
        endVerse: endV != null ? Number(endV) : Number(startV),
      }
    }
  }

  return null
}

// Parses citations like "Isa 1:1–9", "2 Pet 3:1-10", "Luke 20:41–21:4",
// "Isa 5:8–12, 18–23", "Gal 3:23–29; 4:4–7", "2 Pet 2:1–10a". Segments that
// can't be parsed are dropped; the caller gets whatever segments did parse.
function parseCitation(citation: string): VerseRange[] | null {
  const bookMatch = citation.match(/^(\d?\s?[A-Za-z]+)\.?\s+(.+)$/)
  if (!bookMatch) return null

  const [, rawBook, rest] = bookMatch
  const bookKey = normalizeKey(rawBook)
  if (!(bookKey in BOOK_FILES)) return null

  const segments = rest.split(/[,;]/).map((s) => s.trim()).filter(Boolean)
  const ranges: VerseRange[] = []
  let lastChapter: number | null = SINGLE_CHAPTER_BOOKS.has(bookKey) ? 1 : null

  for (const segment of segments) {
    const range = parseSegment(bookKey, segment, lastChapter)
    if (!range) continue
    ranges.push(range)
    lastChapter = range.endChapter
  }

  return ranges.length > 0 ? ranges : null
}

export interface Passage {
  citation: string
  paragraphs: string[]
}

// Resolves a lectionary citation string to WEB Bible text. Returns null if
// the citation can't be parsed at all, or resolves to no verses.
export function getPassageText(citation: string): Passage | null {
  const ranges = parseCitation(citation)
  if (!ranges) return null

  const fileCode = BOOK_FILES[ranges[0].bookKey]
  const book = loadBook(fileCode)
  if (!book) return null

  const paragraphs: string[] = []
  for (const ref of ranges) {
    for (let ch = ref.startChapter; ch <= ref.endChapter; ch++) {
      const chapter = book[String(ch)]
      if (!chapter) continue
      const vStart = ch === ref.startChapter ? ref.startVerse : 1
      const vEnd = ch === ref.endChapter ? ref.endVerse : Infinity
      for (const [vNum, text] of Object.entries(chapter).sort((a, b) => Number(a[0]) - Number(b[0]))) {
        const v = Number(vNum)
        if (v >= vStart && v <= vEnd) paragraphs.push(text)
      }
    }
  }

  if (paragraphs.length === 0) return null
  return { citation, paragraphs }
}
