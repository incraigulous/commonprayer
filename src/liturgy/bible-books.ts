// Citation book-abbreviation (as used in src/content/lectionary/*.json) ->
// USX filename (without .usx). Covers every distinct prefix found in
// year-one.json and year-two.json, including the Apocrypha citations.
export const BOOK_FILES: Record<string, string> = {
  gen: 'GEN', exod: 'EXO', lev: 'LEV', num: 'NUM', deut: 'DEU',
  josh: 'JOS', judg: 'JDG', ruth: 'RUT',
  '1sam': '1SA', '2sam': '2SA', '1kgs': '1KI', '2kgs': '2KI',
  '1chr': '1CH', '2chr': '2CH', ezra: 'EZR', neh: 'NEH', esth: 'EST',
  job: 'JOB', prov: 'PRO', eccles: 'ECC', ecc: 'ECC',
  isa: 'ISA', jer: 'JER', lam: 'LAM', ezek: 'EZK', dan: 'DAN',
  hos: 'HOS', joel: 'JOL', amos: 'AMO', obad: 'OBA', jonah: 'JON',
  mic: 'MIC', nah: 'NAM', hab: 'HAB', zeph: 'ZEP', hag: 'HAG',
  zech: 'ZEC', mal: 'MAL',
  matt: 'MAT', mark: 'MRK', luke: 'LUK', john: 'JHN', acts: 'ACT',
  rom: 'ROM', '1cor': '1CO', '2cor': '2CO', gal: 'GAL', eph: 'EPH',
  phil: 'PHP', col: 'COL', '1thess': '1TH', '2thess': '2TH',
  '1tim': '1TI', '2tim': '2TI', titus: 'TIT', phlm: 'PHM', heb: 'HEB',
  james: 'JAS', jas: 'JAS', '1pet': '1PE', '2pet': '2PE',
  '1john': '1JN', '2john': '2JN', '3john': '3JN', jude: 'JUD', rev: 'REV',
  // Apocrypha
  '1macc': '1MA', '2macc': '2MA', sir: 'SIR', wis: 'WIS', bar: 'BAR_LjeInBar',
}

export function normalizeKey(prefix: string): string {
  return prefix.toLowerCase().replace(/\s+/g, '')
}

// Single-chapter books are sometimes cited by verse alone (e.g. "Jude 17–25"
// rather than "Jude 1:17–25") — always chapter 1 when there's no colon.
export const SINGLE_CHAPTER_BOOKS = new Set(['obad', '2john', '3john', 'phlm', 'jude'])
