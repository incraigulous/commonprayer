import { Text } from 'react-native'
import type { ReactNode } from 'react'
import type { StyleProp, TextStyle } from 'react-native'

const BOLD_RUN = /\*\*(.+?)\*\*/g

// Splits a string on **bold** runs into nested <Text> pieces — RN's <Text>
// allows nesting, so these compose inline with whatever <Text> they're
// dropped into (paragraph, drop cap, response line, …). A lone `*` (the
// liturgical pointing mark, e.g. "Holy Spirit: *") is left as a literal
// character since the regex only matches paired asterisks.
export function inlineRuns(source: string): ReactNode[] {
  const parts: { text: string; bold: boolean }[] = []
  let lastIndex = 0
  for (const match of source.matchAll(BOLD_RUN)) {
    const index = match.index ?? 0
    if (index > lastIndex) parts.push({ text: source.slice(lastIndex, index), bold: false })
    parts.push({ text: match[1], bold: true })
    lastIndex = index + match[0].length
  }
  if (lastIndex < source.length) parts.push({ text: source.slice(lastIndex), bold: false })
  if (parts.length === 0) parts.push({ text: source, bold: false })

  return parts.map((part, i) => (
    <Text key={i} style={part.bold ? { fontWeight: '700' } : undefined}>
      {part.text}
    </Text>
  ))
}

interface InlineTextProps {
  /** Source string — wrap a run in **double asterisks** to bold it. */
  children: string
  className?: string
  style?: StyleProp<TextStyle>
}

// <Text> wrapper for a full paragraph/line that may contain **bold** runs.
export default function InlineText({ children, className, style }: InlineTextProps) {
  return (
    <Text className={className} style={style}>
      {inlineRuns(children)}
    </Text>
  )
}
