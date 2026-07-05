type Glyph = 'cross' | 'latin' | 'fleuron' | 'diamond' | 'asterism' | 'none'
type Tone = 'gilt' | 'rubric'

const GLYPHS: Record<Glyph, string> = {
  cross: '✠',    // ✠ maltese cross
  latin: '†',    // †
  fleuron: '❦',  // ❦
  diamond: '❖',  // ❖
  asterism: '⁂', // ⁂
  none: '',
}

interface OrnamentalDividerProps {
  glyph?: Glyph
  tone?: Tone
  className?: string
}

export default function OrnamentalDivider({
  glyph = 'cross',
  tone = 'gilt',
  className,
}: OrnamentalDividerProps) {
  const mark = GLYPHS[glyph]
  const glyphColor = tone === 'rubric' ? 'text-accent' : 'text-gilt'
  const lineClass = glyph === 'none' ? 'border-t border-border' : 'border-t border-border-strong'

  return (
    <div
      className={['flex items-center gap-4 my-8', className ?? ''].filter(Boolean).join(' ')}
      role="separator"
    >
      <span className={['flex-1 h-0', lineClass].join(' ')} />
      {mark && (
        <span
          className={['font-display text-[1.15rem] leading-none', glyphColor].join(' ')}
          aria-hidden="true"
        >
          {mark}
        </span>
      )}
      <span className={['flex-1 h-0', lineClass].join(' ')} />
    </div>
  )
}
