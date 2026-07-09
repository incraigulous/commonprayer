import { useState } from 'react'
import { View } from 'react-native'
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
import { useFontScale } from '@/hooks/useFontScale'

import TextBlock from '@/components/prayer/TextBlock'
import Rubric from '@/components/prayer/Rubric'
import Responsive from '@/components/prayer/Responsive'
import PsalmVerse from '@/components/prayer/PsalmVerse'
import VersionTabs from '@/components/prayer/VersionTabs'
import MeditateTimer from '@/components/prayer/MeditateTimer'
import SectionHeading from '@/components/prayer/SectionHeading'
import Scripture from '@/components/prayer/Scripture'
import IlluminatedInitial from '@/components/prayer/IlluminatedInitial'
import Card from '@/components/ui/Card'
import { Text } from 'react-native'

function HeadingBlock({ doc }: { doc: HeadingDoc }) {
  const lines = doc.value ?? []
  if (lines.length === 0) return null
  return (
    <SectionHeading level="office" eyebrow={lines.length > 1 ? lines.slice(1).join(' ') : undefined} className="my-6">
      {lines[0]}
    </SectionHeading>
  )
}

function BibleReading({ doc }: { doc: BibleReadingDoc }) {
  const scale = useFontScale()
  const isOpeningSentence = !doc.label

  if (isOpeningSentence) {
    return (
      <View className="my-4">
        {doc.value && doc.value.length > 0 ? (
          <IlluminatedInitial letter={doc.value[0]?.[0] ?? ''}>
            {doc.value[0]?.slice(1)}
          </IlluminatedInitial>
        ) : (
          <Text className="font-serif italic text-ink-subtle" style={{ fontSize: 18 * scale }}>Reading: {doc.citation}</Text>
        )}
        {doc.citation && (
          <Text className="font-sans text-xs uppercase tracking-caps text-ink-muted mt-2">{doc.citation}</Text>
        )}
      </View>
    )
  }

  return (
    <Scripture variant="quiet" cite={doc.citation} citePosition="top" footer={doc.label}>
      {doc.value && doc.value.length > 0 ? (
        doc.value.map((paragraph, i) => (
          <Text key={i} className="font-serif leading-relaxed text-ink" style={{ fontSize: 18 * scale }}>{paragraph}</Text>
        ))
      ) : (
        <Text className="font-serif italic text-ink-subtle" style={{ fontSize: 18 * scale }}>Reading: {doc.citation}</Text>
      )}
    </Scripture>
  )
}

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

  const workingDoc: OptionDoc = { ...doc, metadata: { ...doc.metadata, selected } }
  const child = doc.value[selected]

  return (
    <View>
      <VersionTabs doc={workingDoc} onSelect={handleSelect} />
      {child && (
        <LiturgicalDocument doc={child as AnyDoc} onOptionSelect={onOptionSelect} />
      )}
    </View>
  )
}

function hasMeditationCue(lines: string[]): boolean {
  return lines.join(' ').toLowerCase().includes('meditat')
}

interface LiturgicalDocumentProps {
  doc: AnyDoc
  onOptionSelect?: (idx: number) => void
}

export default function LiturgicalDocument({ doc, onOptionSelect }: LiturgicalDocumentProps) {
  if (doc.hidden) return null

  switch (doc.type) {
    case 'liturgy': {
      const d = doc as LiturgyDoc
      return (
        <View>
          {d.value.map((child, i) => (
            <LiturgicalDocument key={i} doc={child as AnyDoc} onOptionSelect={onOptionSelect} />
          ))}
        </View>
      )
    }

    case 'text': {
      const d = doc as TextDoc
      if (d.style === 'collect' && d.label) {
        return (
          <Card variant="illuminated" eyebrow={d.label} glyph="❖" className="my-4">
            <TextBlock doc={d} />
          </Card>
        )
      }
      if (d.label === "The Lord's Prayer") {
        return (
          <Card variant="sunk" eyebrow={d.label} glyph="❖" className="my-4">
            <TextBlock doc={d} />
          </Card>
        )
      }
      return <TextBlock doc={d} />
    }

    case 'rubric': {
      const d = doc as RubricDoc
      return (
        <View>
          <Rubric value={d.value} />
          {hasMeditationCue(d.value) && <MeditateTimer />}
        </View>
      )
    }

    case 'responsive': {
      const d = doc as ResponsiveDoc
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
      return <View className="h-6" />

    default:
      return null
  }
}
