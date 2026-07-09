import { View, Text } from 'react-native'
import type { PsalmDoc } from '@/types'
import Scripture from '@/components/prayer/Scripture'
import { useFontScale } from '@/hooks/useFontScale'

interface PsalmVerseProps {
  doc: PsalmDoc
}

export default function PsalmVerse({ doc }: PsalmVerseProps) {
  const scale = useFontScale()

  return (
    <Scripture variant="quiet">
      {doc.label && (
        <Text className="font-display font-semibold text-ink mb-1" style={{ fontSize: 20 * scale }}>{doc.label}</Text>
      )}
      {doc.value.map((section, si) => (
        <View key={si}>
          {(section.label || section.localname) && (
            <Text className="font-sans text-xs uppercase tracking-caps text-ink-subtle mb-3">
              {section.localname ?? section.label}
            </Text>
          )}

          <View>
            {section.value.map((verse) => (
              <View key={verse.number} className="flex-row gap-3 items-start">
                <View className="flex-1">
                  <Text className="font-serif text-ink leading-relaxed" style={{ fontSize: 16 * scale }}>{verse.verse}</Text>
                  {verse.halfverse && (
                    <Text className="font-serif text-ink leading-relaxed pl-6 mt-0.5" style={{ fontSize: 16 * scale }}>
                      {verse.halfverse}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}
    </Scripture>
  )
}
