import { useMemo } from 'react'
import { AccessibilityInfo } from 'react-native'
import { useEffect, useState } from 'react'
import Svg, { Polygon, Defs, LinearGradient, Stop, Mask, Rect, G } from 'react-native-svg'
import Animated, { useAnimatedProps, useSharedValue, withDelay, withRepeat, withTiming, Easing } from 'react-native-reanimated'

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon)

// Deterministic PRNG so the glass pattern (and its shimmer timing) is stable
// across renders — matches ui-kit's Mosaic.jsx exactly.
function mulberry32(a: number) {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface Pane {
  points: string
  fill: string
  delay: number
  duration: number
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduced)
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduced)
    return () => sub.remove()
  }, [])
  return reduced
}

function ShimmerPane({ pane, animate, lead, strokeWidth }: { pane: Pane; animate: boolean; lead: string; strokeWidth: number }) {
  const opacity = useSharedValue(1)

  useEffect(() => {
    if (!animate) {
      opacity.value = withTiming(1, { duration: 200 })
      return
    }
    opacity.value = withDelay(
      pane.delay * 1000,
      withRepeat(
        withTiming(0.28, { duration: (pane.duration / 2) * 1000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true,
      ),
    )
  }, [animate, pane.delay, pane.duration, opacity])

  const animatedProps = useAnimatedProps(() => ({ opacity: opacity.value }))

  return (
    <AnimatedPolygon
      points={pane.points}
      fill={pane.fill}
      stroke={lead}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      animatedProps={animatedProps}
    />
  )
}

interface MosaicProps {
  /** Tile palette (light → deep). Falls back to a single neutral tile. */
  colors: string[]
  seed?: number
  cols?: number
  rows?: number
  width?: number
  height?: number
  animate?: boolean
  /**
   * Fade the panel up from its bottom edge (transparent at top, opaque at
   * foot). The ui-kit does this via a CSS mask-image on Mosaic's *container*
   * (see Masthead.jsx); RN has no such cross-element masking primitive, so
   * this is done with an SVG mask inside Mosaic itself instead — used by
   * Masthead's glass band.
   */
  fade?: boolean
  /** Leading (stroke) colour between panes. */
  lead?: string
  /** Leading (stroke) width. */
  strokeWidth?: number
}

// A vector stained-glass panel: a deterministic jittered quad mesh tinted
// from `colors`, leaded with a dark join, whose panes shimmer on slow,
// staggered cycles — like light shifting through old glass. Fills its
// container (width/height 100%); the caller sizes or clips it.
export default function Mosaic({
  colors,
  seed = 9,
  cols = 10,
  rows = 8,
  width = 420,
  height = 300,
  animate = true,
  fade = false,
  lead = 'rgba(26,18,10,.45)',
  strokeWidth = 1.2,
}: MosaicProps) {
  const reducedMotion = useReducedMotion()
  const shouldAnimate = animate && !reducedMotion

  const panes = useMemo<Pane[]>(() => {
    const palette = colors.length ? colors : ['#8a8a8a']
    const rand = mulberry32(seed)
    const pts: [number, number][][] = []
    for (let r = 0; r <= rows; r++) {
      pts[r] = []
      for (let c = 0; c <= cols; c++) {
        const jx = c === 0 || c === cols ? 0 : (rand() - 0.5) * (width / cols) * 0.72
        const jy = r === 0 || r === rows ? 0 : (rand() - 0.5) * (height / rows) * 0.72
        pts[r][c] = [(c * width) / cols + jx, (r * height) / rows + jy]
      }
    }
    const result: Pane[] = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const q = [pts[r][c], pts[r][c + 1], pts[r + 1][c + 1], pts[r + 1][c]]
        result.push({
          points: q.map((p) => p.join(',')).join(' '),
          fill: palette[Math.floor(rand() * palette.length)],
          delay: rand() * 4,
          duration: 2.8 + rand() * 2.7,
        })
      }
    }
    return result
  }, [colors, seed, cols, rows, width, height])

  const panels = panes.map((pane, i) => (
    <ShimmerPane key={i} pane={pane} animate={shouldAnimate} lead={lead} strokeWidth={strokeWidth} />
  ))

  return (
    <Svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" pointerEvents="none">
      {fade ? (
        <>
          <Defs>
            <LinearGradient id="mosaicFade" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#000" stopOpacity={0} />
              <Stop offset="0.4" stopColor="#000" stopOpacity={0.35} />
              <Stop offset="0.66" stopColor="#000" stopOpacity={0.8} />
              <Stop offset="1" stopColor="#000" stopOpacity={1} />
            </LinearGradient>
            <Mask id="mosaicFadeMask">
              <Rect x="0" y="0" width={width} height={height} fill="url(#mosaicFade)" />
            </Mask>
          </Defs>
          <G mask="url(#mosaicFadeMask)">{panels}</G>
        </>
      ) : (
        panels
      )}
    </Svg>
  )
}
