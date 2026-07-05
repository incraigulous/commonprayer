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

import TextBlock from '@/components/prayer/TextBlock'
import Rubric from '@/components/prayer/Rubric'
import Responsive from '@/components/prayer/Responsive'
import PsalmVerse from '@/components/prayer/PsalmVerse'
import VersionTabs from '@/components/prayer/VersionTabs'
import MeditateTimer from '@/components/prayer/MeditateTimer'

// ──────────────────────────────────────────────────────────────────────────────
// Heading renderer (inline — simple, no separate file needed)
// ──────────────────────────────────────────────────────────────────────────────
function HeadingBlock({ doc }: { doc: HeadingDoc }) {
  const lines = doc.value ?? []
  if (lines.length === 0) return null

  return (
    <header className="my-6">
      {lines.map((line, i) => (
        <h2
          key={i}
          className={[
            'font-serif font-semibold text-gray-100',
            i === 0 ? 'text-2xl' : 'text-base text-gray-400 mt-1',
          ].join(' ')}
        >
          {line}
        </h2>
      ))}
      {/* Decorative rule */}
      <div className="mt-2 h-px w-12 bg-rubric dark:bg-rubric-dark" aria-hidden="true" />
    </header>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// Bible reading renderer (inline)
// ──────────────────────────────────────────────────────────────────────────────
function BibleReading({ doc }: { doc: BibleReadingDoc }) {
  return (
    <div className="my-4 rounded-lg bg-gray-900 border border-gray-800 p-4">
      <p className="text-xs uppercase tracking-widest font-sans text-gray-500 mb-2">
        Reading
      </p>
      <p className="font-serif text-lg font-semibold text-gray-100 mb-3">
        {doc.citation}
      </p>
      {doc.value && doc.value.length > 0 ? (
        <div className="space-y-2">
          {doc.value.map((paragraph, i) => (
            <p key={i} className="font-serif text-gray-200 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      ) : (
        <p className="font-serif text-gray-500 italic text-sm">
          Reading: {doc.citation}
        </p>
      )}
    </div>
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

    case 'text':
      return <TextBlock doc={doc as TextDoc} />

    case 'rubric': {
      const d = doc as RubricDoc
      return (
        <>
          <Rubric value={d.value} />
          {hasMeditationCue(d.value) && <MeditateTimer />}
        </>
      )
    }

    case 'responsive':
      return <Responsive doc={doc as ResponsiveDoc} />

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
