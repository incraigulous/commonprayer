import { View, Text } from 'react-native'
import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import Mosaic from '@/components/prayer/Mosaic'

interface MastheadProps {
  /** The office name — the centred page heading (e.g. "Evening Prayer"). */
  office: string
  /** Traditional name shown smaller under the title (e.g. "Vespers", "Compline"). */
  tradition?: string
  /** Long-form date shown above the title. */
  date?: string
  /** Appointed readings, rendered as "Readings · A · B". */
  readings?: string[]
  /** Opening sentence/couplet, shown above the fold under the title. */
  opening?: string | string[]
  /** Background colour. Pass an explicit value (with a matching `colors`
   * palette) to pin a colour instead of following the live season accent. */
  fill?: string
  /** Text colour on the fill. */
  textColor?: string
  /** Stained-glass tile palette (light → deep). Omit for a plain colour block. */
  colors?: string[]
  seed?: number
  /** Shimmer the glass panes (honours the OS reduce-motion setting). */
  animateGlass?: boolean
  /** Extra content rendered under the readings line. */
  children?: ReactNode
  style?: StyleProp<ViewStyle>
  /** Reserve this much space at the top of the block (e.g. for a floating
   * bar rendered over the Masthead) so the centred content doesn't sit
   * underneath it. */
  topInset?: number
}

// The full-bleed opening of a daily office: a solid colour-of-the-day block
// with the date, the office name, and the appointed readings, and a
// shimmering stained-glass Mosaic fading up from its foot. Fills its
// container's height, so the office content scrolls up from beneath it.
//
// fill/textColor default to the live season accent via the `bg-accent` /
// `text-on-accent` Tailwind classes (which NativeWind resolves through its
// vars()-driven cascade) — a literal `var(--accent)` string in a raw `style`
// prop would NOT resolve, since only className-driven styles go through
// NativeWind's compiler. Pass explicit fill/textColor (+ a matching `colors`
// palette) to pin a colour instead.
export default function Masthead({
  office,
  tradition,
  date,
  readings,
  opening,
  fill,
  textColor,
  colors,
  seed = 9,
  animateGlass = true,
  children,
  style,
  topInset = 0,
}: MastheadProps) {
  const list = Array.isArray(readings) ? readings.filter(Boolean) : []
  const lines = Array.isArray(opening) ? opening.filter(Boolean) : opening ? [opening] : []
  const glass = Array.isArray(colors) && colors.length ? colors : null

  const textClass = textColor ? '' : 'text-on-accent'
  const textStyle = textColor ? { color: textColor } : undefined

  return (
    <View
      className={['flex-1 overflow-hidden', fill ? '' : 'bg-accent'].filter(Boolean).join(' ')}
      style={[fill ? { backgroundColor: fill } : undefined, style]}
    >
      <View className="flex-1 justify-center items-center px-6 py-10" style={topInset ? { paddingTop: topInset } : undefined}>
        {date ? (
          <Text
            className={['font-sans text-xs font-semibold tracking-[3px] uppercase mb-4 text-center', textClass].filter(Boolean).join(' ')}
            style={[{ opacity: 0.82 }, textStyle]}
          >
            {date}
          </Text>
        ) : null}
        <Text
          className={['font-display font-semibold text-center', textClass].filter(Boolean).join(' ')}
          style={[{ fontSize: 40, lineHeight: 44, letterSpacing: -0.5 }, textStyle]}
        >
          {office}
        </Text>
        {tradition ? (
          <Text
            className={['font-sans text-xs font-semibold tracking-[2px] uppercase mt-2.5 text-center', textClass].filter(Boolean).join(' ')}
            style={[{ opacity: 0.72 }, textStyle]}
          >
            {tradition}
          </Text>
        ) : null}
        {lines.length ? (
          <View className="mt-6">
            {lines.map((line, i) => (
              <Text
                key={i}
                className={['font-serif italic text-center', textClass].filter(Boolean).join(' ')}
                style={[{ fontSize: 18, lineHeight: 25, opacity: i > 0 ? 0.82 : 1 }, textStyle]}
              >
                {line}
              </Text>
            ))}
          </View>
        ) : null}
        {list.length ? (
          <Text
            className={['font-sans text-xs font-semibold tracking-[1.5px] uppercase mt-5 text-center', textClass].filter(Boolean).join(' ')}
            style={[{ opacity: 0.72 }, textStyle]}
          >
            Readings · {list.join(' · ')}
          </Text>
        ) : null}
        {children}
      </View>

      {glass ? (
        <View className="absolute left-0 right-0 bottom-0 w-full" style={{ height: '20%', minHeight: 160 }} pointerEvents="none">
          <Mosaic colors={glass} seed={seed} animate={animateGlass} fade width={420} height={420} cols={12} rows={5} />
        </View>
      ) : null}
    </View>
  )
}
