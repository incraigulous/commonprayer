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
import { Text } from 'react-native'

const BREAKOUT_TEXT_STYLES = new Set(['prayer', 'collect'])

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
  return (
    <Scripture cite={doc.citation}>
      {doc.value && doc.value.length > 0 ? (
        doc.value.map((paragraph, i) => (
          <Text key={i} className="font-serif text-lg leading-relaxed text-ink">{paragraph}</Text>
        ))
      ) : (
        <Text className="font-serif text-lg italic text-ink-subtle">Reading: {doc.citation}</Text>
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
  const { settings } = useSettings()
  const useBreakoutCards = settings.officiantRole === 'lay'

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
      if (useBreakoutCards && d.style && BREAKOUT_TEXT_STYLES.has(d.style)) {
        return (
          <Card variant="sunk" className="my-4">
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
      if (useBreakoutCards) {
        return (
          <Card variant="sunk" className="my-4">
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
      return <View className="h-6" />

    default:
      return null
  }
}
