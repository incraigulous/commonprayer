import { View, Text, Pressable, ImageBackground } from 'react-native'
import type { ReactNode } from 'react'
import type { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native'
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg'
import Mosaic from '@/components/prayer/Mosaic'

function Scrim() {
  return (
    <Svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} pointerEvents="none">
      <Defs>
        <LinearGradient id="startScrim" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#08090c" stopOpacity={0.14} />
          <Stop offset="0.26" stopColor="#08090c" stopOpacity={0} />
          <Stop offset="0.6" stopColor="#08090c" stopOpacity={0} />
          <Stop offset="1" stopColor="#08090c" stopOpacity={0.34} />
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill="url(#startScrim)" />
    </Svg>
  )
}

interface StartScreenProps {
  /** Background image behind the card. */
  image?: ImageSourcePropType
  /** Small caps date above the title. */
  date?: string
  /** The day's theme — the large display heading in the arch. */
  title: string
  /** Italic sub-line under the title (e.g. office · series). */
  subtitle?: string
  buttonLabel?: string
  onBegin?: () => void
  /** Button background colour. Defaults to the live season accent. */
  accent?: string
  /** Button text colour. */
  textColor?: string
  /** Draw the decorative leaded-glass lines inside the arch. @default true */
  glassLines?: boolean
  /** Content floated over the image above the card (e.g. a period switcher). */
  top?: ReactNode
  /** Extra content rendered inside the arch, under the button. */
  children?: ReactNode
  style?: StyleProp<ViewStyle>
}

// The office entry screen: a full-bleed image behind a chapel-arch card with
// the date, the day's theme, the office name, and a Begin button. Fills its
// container. The ui-kit's arch card uses backdrop-filter: blur() for a
// frosted-glass look — expo-blur isn't a dependency here, so the card is a
// plain, slightly more opaque dark card instead (no blur), same colours
// otherwise.
export default function StartScreen({
  image,
  date,
  title,
  subtitle,
  buttonLabel = 'Begin',
  onBegin,
  accent,
  textColor = '#ffffff',
  glassLines = true,
  top,
  children,
  style,
}: StartScreenProps) {
  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      className="flex-1 overflow-hidden"
      style={style}
      imageStyle={{ width: '100%', height: '100%' }}
    >
      <Scrim />
      <View className="flex-1 items-center justify-center px-6 py-7">
        {top ? <View className="absolute top-6 left-6 right-6">{top}</View> : null}

        <View
          className="relative overflow-hidden items-center px-8"
          style={{
            width: '84%',
            maxWidth: 300,
            paddingTop: 46,
            paddingBottom: 36,
            backgroundColor: 'rgba(12,16,28,0.55)',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.22)',
            borderTopLeftRadius: 150,
            borderTopRightRadius: 150,
            borderBottomLeftRadius: 36,
            borderBottomRightRadius: 36,
          }}
        >
          {glassLines ? (
            <View className="absolute inset-0" style={{ opacity: 0.16 }} pointerEvents="none">
              <Mosaic colors={['transparent']} lead="rgba(255,255,255,.3)" cols={4} rows={6} seed={7} />
            </View>
          ) : null}

          <View className="items-center">
            {date ? (
              <Text className="font-sans text-xs tracking-[3px] uppercase text-white text-center mb-4" style={{ opacity: 0.82 }}>
                {date}
              </Text>
            ) : null}
            <Text
              className="font-display font-semibold text-white text-center"
              style={{ fontSize: 30, lineHeight: 33, letterSpacing: -0.3 }}
            >
              {title}
            </Text>
            {subtitle ? (
              <Text className="font-serif italic text-white text-center mt-4 mb-6" style={{ fontSize: 15, lineHeight: 21, opacity: 0.86 }}>
                {subtitle}
              </Text>
            ) : null}

            <Pressable
              onPress={onBegin}
              className={['rounded-full px-11 py-4', accent ? '' : 'bg-accent'].filter(Boolean).join(' ')}
              style={accent ? { backgroundColor: accent } : undefined}
            >
              <Text
                className="font-sans font-bold tracking-[2px] uppercase text-center"
                style={{ fontSize: 14, color: textColor }}
              >
                {buttonLabel}
              </Text>
            </Pressable>
            {children}
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}
