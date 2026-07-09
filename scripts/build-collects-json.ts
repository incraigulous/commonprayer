// One-time extraction of BCP 1979 Rite II collects from the bcponline.org
// source HTML (scripts/bcp-seasonsc-source.html), writing src/content/collects.json
// in the key scheme src/liturgy/collects.ts expects. Run with:
//   npx tsx scripts/build-collects-json.ts
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const SRC = join(__dirname, 'bcp-seasonsc-source.html')
const OUT = join(__dirname, '..', 'src', 'content', 'collects.json')

const TITLE_TO_KEY: Record<string, string> = {
  'First Sunday of Advent': 'advent-1',
  'Second Sunday of Advent': 'advent-2',
  'Third Sunday of Advent': 'advent-3',
  'Fourth Sunday of Advent': 'advent-4',
  'The Nativity of Our Lord: Christmas Day': 'christmas-1',
  'First Sunday after Christmas Day': 'christmas-1-after',
  'Second Sunday after Christmas Day': 'christmas-2',
  'The Holy Name': 'holy-name',
  'The Epiphany': 'epiphany',
  'First Sunday after the Epiphany: The Baptism of our Lord': 'epiphany-1',
  'Second Sunday after the Epiphany': 'epiphany-2',
  'Third Sunday after the Epiphany': 'epiphany-3',
  'Fourth Sunday after the Epiphany': 'epiphany-4',
  'Fifth Sunday after the Epiphany': 'epiphany-5',
  'Sixth Sunday after the Epiphany': 'epiphany-6',
  'Seventh Sunday after the Epiphany': 'epiphany-7',
  'Eighth Sunday after the Epiphany': 'epiphany-8',
  'Last Sunday after the Epiphany': 'epiphany-last',
  'Ash Wednesday': 'ash-wednesday',
  'First Sunday in Lent': 'lent-1',
  'Second Sunday in Lent': 'lent-2',
  'Third Sunday in Lent': 'lent-3',
  'Fourth Sunday in Lent': 'lent-4',
  'Fifth Sunday in Lent': 'lent-5',
  'Sunday of the Passion: Palm Sunday': 'palm-sunday',
  'Monday in Holy Week': 'holy-week-monday',
  'Tuesday in Holy Week': 'holy-week-tuesday',
  'Wednesday in Holy Week': 'holy-week-wednesday',
  'Maundy Thursday': 'maundy-thursday',
  'Good Friday': 'good-friday',
  'Holy Saturday': 'holy-saturday',
  'Easter Day': 'easter-day',
  'Monday in Easter Week': 'easter-week-monday',
  'Tuesday in Easter Week': 'easter-week-tuesday',
  'Wednesday in Easter Week': 'easter-week-wednesday',
  'Thursday in Easter Week': 'easter-week-thursday',
  'Friday in Easter Week': 'easter-week-friday',
  'Saturday in Easter Week': 'easter-week-saturday',
  'Second Sunday of Easter': 'easter-2',
  'Third Sunday of Easter': 'easter-3',
  'Fourth Sunday of Easter': 'easter-4',
  'Fifth Sunday of Easter': 'easter-5',
  'Sixth Sunday of Easter': 'easter-6',
  'Ascension Day': 'ascension-day',
  'Seventh Sunday of Easter: The Sunday after Ascension Day': 'easter-7',
  'The Day of Pentecost: Whitsunday': 'pentecost',
  "First Sunday after Pentecost: Trinity Sunday": 'trinity-sunday',
}

for (let n = 1; n <= 29; n++) {
  TITLE_TO_KEY[`Proper ${n}`] = `proper-${n}`
}

function decodeEntities(s: string): string {
  return s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#8217;|&rsquo;/g, '’')
    .replace(/&#8216;|&lsquo;/g, '‘')
    .replace(/&#8220;|&ldquo;/g, '“')
    .replace(/&#8221;|&rdquo;/g, '”')
}

function stripTags(s: string): string {
  return s.replace(/<[^>]+>/g, '')
}

function plainText(raw: string): string {
  return decodeEntities(stripTags(raw.replace(/<br\/>/g, ' '))).replace(/\s+/g, ' ').trim()
}

function endsMidSentence(s: string): boolean {
  return s.length > 0 && !/[.!?"”’]$/.test(s)
}

interface CollectEntry {
  title: string
  text: string
}

// Sequential state machine over every <p>...</p> and <hr> in document order.
// A page-footer block is <p class="leftfoot|rightfoot">...</p><hr> (with
// surrounding <br/>s already irrelevant once we're iterating per-tag).
// It is pure noise: skip it. Everything else is either a heading paragraph
// (<strong>Title</strong> as the whole content), a preface/rubric note (skip),
// or collect body text — which may arrive as two fragments split by a
// footer block, joined here whenever the running text doesn't yet end in
// terminal punctuation.
function main() {
  const html = readFileSync(SRC, 'utf-8')

  const tagRe = /<p(?:\s+class="([^"]*)")?[^>]*>([\s\S]*?)<\/p>|<hr>/g
  const tokens: { kind: 'p' | 'hr'; raw: string; cls: string | null }[] = []
  let tm: RegExpExecArray | null
  while ((tm = tagRe.exec(html))) {
    if (tm[0] === '<hr>') tokens.push({ kind: 'hr', raw: '', cls: null })
    else tokens.push({ kind: 'p', raw: tm[2], cls: tm[1] ?? null })
  }

  const collects: Record<string, CollectEntry> = {}
  const unmapped: string[] = []

  let currentTitle: string | null = null
  let currentKey: string | null = null
  let bodyText = ''
  let awaitingBody = false // true once we've seen the heading, before we've captured any body text

  function flush() {
    if (currentKey && bodyText) {
      collects[currentKey] = { title: currentTitle!, text: bodyText }
    } else if (currentTitle && !currentKey) {
      unmapped.push(currentTitle)
    }
    currentTitle = null
    currentKey = null
    bodyText = ''
    awaitingBody = false
  }

  for (const tok of tokens) {
    if (tok.kind === 'hr') continue // page-rule itself carries no text
    if (tok.cls === 'leftfoot' || tok.cls === 'rightfoot') continue // page footer — noise
    if (tok.cls === 'rubric' || tok.cls === 'small' || tok.cls === 'topmenu') continue // directions, not the collect

    const strongMatch = tok.raw.match(/<strong>([^<]+)<\/strong>/)

    if (strongMatch) {
      // New heading — flush whatever collect we were building, start fresh.
      flush()
      currentTitle = decodeEntities(strongMatch[1]).trim()
      currentKey = TITLE_TO_KEY[currentTitle] ?? null
      awaitingBody = true
      continue
    }

    const text = plainText(tok.raw)
    if (!text) continue // blank <p><br/></p> spacer

    if (/^(Preface of|No Proper Preface)/i.test(text)) continue

    if (!currentTitle) continue // stray paragraph before the first heading

    if (awaitingBody) {
      bodyText = text
      awaitingBody = false
    } else if (endsMidSentence(bodyText)) {
      // Continuation fragment after a page break.
      bodyText = `${bodyText} ${text}`
    }
    // else: a second, unrelated <p> after a complete collect (shouldn't
    // normally happen before the next heading, but ignore defensively).
  }
  flush()

  writeFileSync(OUT, JSON.stringify(collects, null, 2))
  console.log(`Wrote ${Object.keys(collects).length} collects to ${OUT}`)
  if (unmapped.length) {
    console.log('Unmapped titles (skipped):', unmapped)
  }
}

main()
