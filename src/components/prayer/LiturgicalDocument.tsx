import { useState } from 'react'
import type {
  AnyDoc,
  TextDoc,
  RubricDoc,
  ResponsiveDoc,
  PsalmDoc,
  BibleReadingDoc,
  OptionDoc,
  LiturgyDoc,
  HeadingDoc,
} from '@/types'
import { useSettings } from '@/store/settings'

import TextBlock from '@/components/prayer/TextBlock'
import Rubric from '@/components/prayer/Rubric'
import Responsive from '@/components/prayer/Responsive'
import PsalmVerse from '@/components/prayer/PsalmVerse'
import VersionTabs from '@/components/prayer/VersionTabs'
import MeditateTimer from '@/components/prayer/MeditateTimer'
import SectionHeading from '@/components/prayer/SectionHeading'
import Scripture from '@/components/prayer/Scripture'
import Card from '@/components/ui/Card'

// Short, self-contained sections that benefit from a card boundary in the lay
// office — where there's no rubric preceding them to mark a new section.
// Long-running content (canticles, creeds, full psalms) is excluded; a card
// around a whole psalm would just be visual noise.
const BREAKOUT_TEXT_STYLES = new Set(['prayer', 'collect'])

// ──────────────────────────────────────────────────────────────────────────────
// Heading renderer
// ──────────────────────────────────────────────────────────────────────────────
function HeadingBlock({ doc }: { doc: HeadingDoc }) {
  const lines = doc.value ?? []
  if (lines.length === 0) return null

  return (
    <SectionHeading as="h2" level="office" eyebrow={lines.length > 1 ? lines.slice(1).join(' ') : undefined} className="my-6">
      {lines[0]}
    </SectionHeading>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// Bible reading renderer
// ──────────────────────────────────────────────────────────────────────────────
function BibleReading({ doc }: { doc: BibleReadingDoc }) {
  return (
    <Scripture cite={doc.citation}>
      {doc.value && doc.value.length > 0 ? (
        doc.value.map((paragraph, i) => <p key={i} className="m-0">{paragraph}</p>)
      ) : (
        <p className="m-0 italic text-ink-subtle text-sm">Reading: {doc.citation}</p>
      )}
    </Scripture>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// Option wrapper — manages selected index and delegates to VersionTabs
// ──────────────────────────────────────────────────────────────────────────────
function OptionBlock({
  doc,
  onOptionSelect,
}: {
  doc: OptionDoc
  onOptionSelect?: (idx: number) => void
}) {
  const [selected, setSelected] = useState<number>(doc.metadata.selected ?? 0)

  const handleSelect = (idx: number) => {
    setSelected(idx)
    onOptionSelect?.(idx)
  }

  // Build a working doc with the current selection reflected
  const workingDoc: OptionDoc = {
    ...doc,
    metadata: { ...doc.metadata, selected },
  }

  const child = doc.value[selected]

  return (
    <div>
      <VersionTabs doc={workingDoc} onSelect={handleSelect} />
      {child && (
        <LiturgicalDocument doc={child as AnyDoc} onOptionSelect={onOptionSelect} />
      )}
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// Detect meditation rubrics
// ──────────────────────────────────────────────────────────────────────────────
function hasMeditationCue(lines: string[]): boolean {
  const combined = lines.join(' ').toLowerCase()
  return combined.includes('meditat')
}

// ──────────────────────────────────────────────────────────────────────────────
// Main recursive renderer
// ──────────────────────────────────────────────────────────────────────────────
interface LiturgicalDocumentProps {
  doc: AnyDoc
  onOptionSelect?: (idx: number) => void
}

export default function LiturgicalDocument({
  doc,
  onOptionSelect,
}: LiturgicalDocumentProps) {
  const { settings } = useSettings()
  const useBreakoutCards = settings.officiantRole === 'lay'

  if (doc.hidden) return null

  switch (doc.type) {
    case 'liturgy': {
      const d = doc as LiturgyDoc
      return (
        <div>
          {d.value.map((child, i) => (
            <LiturgicalDocument
              key={i}
              doc={child as AnyDoc}
              onOptionSelect={onOptionSelect}
            />
          ))}
        </div>
      )
    }

    case 'text': {
      const d = doc as TextDoc
      if (useBreakoutCards && d.style && BREAKOUT_TEXT_STYLES.has(d.style)) {
        return (
          <Card variant="sunk" className="my-4 [&>div]:my-0">
            <TextBlock doc={d} />
          </Card>
        )
      }
      return <TextBlock doc={d} />
    }

    case 'rubric': {
      const d = doc as RubricDoc
      return (
        <>
          <Rubric value={d.value} />
          {hasMeditationCue(d.value) && <MeditateTimer />}
        </>
      )
    }

    case 'responsive': {
      const d = doc as ResponsiveDoc
      if (useBreakoutCards) {
        return (
          <Card variant="sunk" className="my-4 [&>div]:my-0">
            <Responsive doc={d} />
          </Card>
        )
      }
      return <Responsive doc={d} />
    }

    case 'psalm':
      return <PsalmVerse doc={doc as PsalmDoc} />

    case 'heading':
      return <HeadingBlock doc={doc as HeadingDoc} />

    case 'option': {
      const optDoc = doc as OptionDoc
      return (
        <OptionBlock
          key={optDoc.metadata.selected}
          doc={optDoc}
          onOptionSelect={onOptionSelect}
        />
      )
    }

    case 'bible-reading':
      return <BibleReading doc={doc as BibleReadingDoc} />

    case 'spacer':
      return <div className="h-6" aria-hidden="true" />

    default:
      return null
  }
}
