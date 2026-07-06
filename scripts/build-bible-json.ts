// One-time pre-processor: reads World English Bible USX files and writes
// compact per-book JSON ({ [chapter]: { [verse]: text } }) for the books
// actually cited by the Daily Office lectionary. Run with:
//   npx tsx scripts/build-bible-json.ts
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'
import { BOOK_FILES } from '../src/liturgy/bible-books'

const USX_DIR = join(__dirname, '..', 'bibles', 'world-english-bible', 'release', 'USX_1')
const OUT_DIR = join(__dirname, '..', 'src', 'content', 'bible', 'web')

function stripMarkup(xml: string): string {
  return xml
    // Footnotes and cross-reference notes — drop entirely, including content
    .replace(/<note\b[^>]*>[\s\S]*?<\/note>/g, '')
    // Word-level Strong's-number wrapper — keep inner text only
    .replace(/<char\b[^>]*>([\s\S]*?)<\/char>/g, '$1')
    // Any other inline markup (e.g. milestone tags) — drop the tag, keep nothing else present
    .replace(/<[^>]+>/g, '')
}

interface BookText {
  [chapter: string]: { [verse: string]: string }
}

function parseBook(usxPath: string): BookText {
  const xml = readFileSync(usxPath, 'utf-8')
  const book: BookText = {}

  let currentChapter = '0'
  // Split on verse/chapter markers, keeping the markers as their own tokens.
  const tokens = xml.split(/(<chapter[^>]*\/>|<verse[^>]*\/>)/g)

  let currentVerse: string | null = null
  let buffer = ''

  const flush = () => {
    if (currentVerse != null) {
      const text = stripMarkup(buffer).replace(/\s+/g, ' ').trim()
      if (text) {
        book[currentChapter] = book[currentChapter] || {}
        book[currentChapter][currentVerse] = text
      }
    }
    buffer = ''
  }

  for (const token of tokens) {
    const chapterMatch = token.match(/<chapter number="(\d+)"/)
    if (chapterMatch) {
      flush()
      currentChapter = chapterMatch[1]
      currentVerse = null
      continue
    }
    const verseStart = token.match(/<verse number="(\d+)"[^>]*sid=/)
    if (verseStart) {
      flush()
      currentVerse = verseStart[1]
      continue
    }
    const verseEnd = token.match(/<verse[^>]*eid=/)
    if (verseEnd) {
      flush()
      currentVerse = null
      continue
    }
    if (currentVerse != null) {
      buffer += token
    }
  }
  flush()

  return book
}

function main() {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })

  const uniqueCodes = Array.from(new Set(Object.values(BOOK_FILES)))
  let written = 0
  for (const code of uniqueCodes) {
    const usxPath = join(USX_DIR, `${code}.usx`)
    if (!existsSync(usxPath)) {
      console.warn(`Missing USX file for ${code}, skipping`)
      continue
    }
    const book = parseBook(usxPath)
    const outCode = code.split('_')[0]
    writeFileSync(join(OUT_DIR, `${outCode}.json`), JSON.stringify(book))
    written++
  }
  console.log(`Wrote ${written} book JSON files to ${OUT_DIR}`)
}

main()
