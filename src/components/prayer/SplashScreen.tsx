import { useEffect } from 'react'
import { View, Text, AccessibilityInfo } from 'react-native'
import { useState } from 'react'
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import Svg, { Defs, LinearGradient, RadialGradient, Stop, Rect } from 'react-native-svg'
import Mosaic from '@/components/prayer/Mosaic'

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduced)
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduced)
    return () => sub.remove()
  }, [])
  return reduced
}

// A rise-in-on-mount piece: fades and lifts into place once, after `delay`.
function RiseIn({ delay, enter, children }: { delay: number; enter: boolean; children: React.ReactNode }) {
  const progress = useSharedValue(enter ? 0 : 1)
  useEffect(() => {
    if (enter) progress.value = withDelay(delay, withTiming(1, { duration: 700 }))
  }, [enter, delay, progress])
  const style = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * 10 }],
  }))
  return <Animated.View style={style}>{children}</Animated.View>
}

interface SplashScreenProps {
  word?: string
  subtitle?: string
  glyph?: string
  background?: string
  /** Cross / rule / byline colour. Defaults to the live gilt token. */
  gilt?: string
  /** Wordmark colour. */
  wordColor?: string
  /** Leading-line colour of the background mosaic. */
  lead?: string
  /** Play the one-shot rise-in entrance. @default true */
  enter?: boolean
}

// The app-open lockup: a gilt cross, thin rule, the wordmark and a
// small-caps byline on a deep ground. Fills its container — overlay it
// full-screen above the app on launch, then fade it out once mounted.
export default function SplashScreen({
  word = 'Prayer Book',
  subtitle = 'by Via Media',
  glyph = '✝',
  background = '#f5f4f1',
  gilt,
  wordColor,
  lead = 'rgba(26,18,10,.5)',
  enter = true,
}: SplashScreenProps) {
  const reducedMotion = useReducedMotion()
  const glow = useSharedValue(0)

  useEffect(() => {
    if (reducedMotion) return
    glow.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1300, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1300, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    )
  }, [reducedMotion, glow])

  const glowStyle = useAnimatedStyle(() => ({
    opacity: 0.55 + glow.value * 0.45,
    transform: [{ translateY: -glow.value * 2 }],
  }))

  const giltStyle = { color: gilt ?? '#a9843a' }
  const giltBgStyle = { backgroundColor: gilt ?? '#a9843a' }
  const wordClass = wordColor ? '' : 'text-ink'
  const wordStyle = wordColor ? { color: wordColor } : undefined

  return (
    <View className="flex-1 items-center justify-center overflow-hidden" style={{ backgroundColor: background, gap: 22 }}>
      <View className="absolute inset-0" style={{ opacity: 0.07 }} pointerEvents="none">
        <Mosaic colors={['transparent']} lead={lead} strokeWidth={0.4} cols={8} rows={14} seed={11} width={420} height={720} />
      </View>

      <Svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} pointerEvents="none">
        <Defs>
          <LinearGradient id="splashMosaicFade" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={background} stopOpacity={0} />
            <Stop offset="0.7" stopColor={background} stopOpacity={0.6} />
            <Stop offset="1" stopColor={background} stopOpacity={1} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#splashMosaicFade)" />
      </Svg>

      <Svg width="100%" height="100%" style={{ position: 'absolute', top: '-20%', left: '-20%', right: '-20%', bottom: '-20%' }} pointerEvents="none">
        <Defs>
          <RadialGradient id="splashWash" cx="50%" cy="42%" r="55%">
            <Stop offset="0" stopColor={gilt ?? '#a9843a'} stopOpacity={0.16} />
            <Stop offset="1" stopColor={gilt ?? '#a9843a'} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#splashWash)" />
      </Svg>

      <RiseIn delay={0} enter={enter}>
        <Animated.Text style={[{ fontSize: 40, lineHeight: 40, textAlign: 'center' }, giltStyle, glowStyle]}>
          {glyph}
        </Animated.Text>
      </RiseIn>

      <RiseIn delay={80} enter={enter}>
        <View style={[{ width: 44, height: 1, opacity: 0.4 }, giltBgStyle]} />
      </RiseIn>

      <RiseIn delay={140} enter={enter}>
        <Text className={['font-display font-semibold text-center', wordClass].filter(Boolean).join(' ')} style={[{ fontSize: 30 }, wordStyle]}>
          {word}
        </Text>
      </RiseIn>

      <RiseIn delay={240} enter={enter}>
        <Text
          className="font-sans text-xs uppercase tracking-[4px] text-center"
          style={[{ opacity: 0.62 }, giltStyle]}
        >
          {subtitle}
        </Text>
      </RiseIn>
    </View>
  )
}
