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
import { useFontScale } from '@/hooks/useFontScale'

import TextBlock from '@/components/prayer/TextBlock'
import Rubric from '@/components/prayer/Rubric'
import Responsive from '@/components/prayer/Responsive'
import PsalmVerse from '@/components/prayer/PsalmVerse'
import VersionTabs from '@/components/prayer/VersionTabs'
import MeditateTimer from '@/components/prayer/MeditateTimer'
import SectionHeading from '@/components/prayer/SectionHeading'
import Scripture from '@/components/prayer/Scripture'
import { Text } from 'react-native'

function HeadingBlock({ doc }: { doc: HeadingDoc }) {
  const value =  doc.value ?? []
  let lines: Array<string> = []
  let eyebrow = undefined
  let classNames = ""
    if (doc.style === "eyebrow") {
          eyebrow = value.join(' ')
          classNames = "mt-6"
    } else {
          lines = value
          eyebrow = lines.length > 1 ? lines.slice(1).join(' ') : undefined
          classNames = "my-6"
    }
  return (
    <SectionHeading level="office" eyebrow={eyebrow} className={classNames}>
      {lines[0] ?? null}
    </SectionHeading>
  )
}

function BibleReading({ doc }: { doc: BibleReadingDoc }) {
  const scale = useFontScale()
  return (
    <Scripture variant="quiet" cite={doc.citation}>
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
  const { settings } = useSettings()

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
      return <TextBlock doc={d} />
    }

    case 'rubric': {
      const d = doc as RubricDoc
      // Rubrics tell the officiant what to do; a lay person praying alone
      // doesn't need the stage directions. Rubric itself is purely
      // presentational — this policy lives at the call site.
      if (settings.officiantRole === 'lay') return null
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

    case 'eyebrow':
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
