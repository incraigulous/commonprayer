// Traditional BCP English titles for canticles that are otherwise labeled by
// their Latin incipit. Used to avoid showing Latin-only titles to lay users
// unfamiliar with liturgical Latin.
const ENGLISH_TITLES: Record<string, string> = {
  'Magnificat': 'Song of Mary',
  'Nunc Dimittis': 'Song of Simeon',
  'Benedictus': 'Song of Zechariah',
  'Venite': 'Come, Let Us Sing to the Lord',
  'Jubilate': 'Be Joyful in the Lord',
  'Cantate Domino': 'Sing to the Lord a New Song',
  'Deus Misereatur': 'May God Be Merciful to Us',
  'Te Deum Laudamus': 'We Praise You, O God',
  'Benedictus es, Domine': 'A Song of Creation',
}

// English title for a canticle label, given as it appears in content
// (e.g. "Magnificat", or already-paired forms like "Magnificat (Song of Mary)").
export function englishTitle(label: string): string {
  const parenMatch = label.match(/^(.*?)\s*\(([^)]+)\)\s*$/)
  if (parenMatch) {
    const [, latin, english] = parenMatch
    return ENGLISH_TITLES[latin.trim()] ?? english.trim()
  }
  return ENGLISH_TITLES[label] ?? label
}

// Traditional form as the BCP prints it: Latin incipit with its English title.
export function traditionalTitle(label: string): string {
  const parenMatch = label.match(/^(.*?)\s*\(([^)]+)\)\s*$/)
  if (parenMatch) return label
  const english = ENGLISH_TITLES[label]
  return english ? `${label} · ${english}` : label
}
