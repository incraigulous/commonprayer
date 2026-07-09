import { Text } from 'react-native'
import type { ReactNode } from 'react'

interface EyebrowProps {
  children: ReactNode
  className?: string
}

// Small-caps label above a heading or card title — the manuscript's rubric
// tag (e.g. "Morning Prayer", "The Collect"). Always the live accent color.
export default function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <Text className={['font-sans text-xs uppercase tracking-caps text-accent mb-2', className ?? ''].filter(Boolean).join(' ')}>
      {String(children)}
    </Text>
  )
}
