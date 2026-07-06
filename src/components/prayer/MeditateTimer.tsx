import { useState, useEffect, useRef, useCallback } from 'react'
import { View, Text, Pressable } from 'react-native'
import * as Haptics from 'expo-haptics'
import Svg, { Circle } from 'react-native-svg'
import Icon from '@/components/ui/Icon'
import Button from '@/components/ui/Button'

interface MeditateTimerProps {
  defaultMinutes?: number
}

type TimerState = 'idle' | 'setup' | 'running' | 'done'

async function playBell() {
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    // Second pulse after 1s for a bell-like feel
    setTimeout(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }, 1000)
  } catch {
    // Haptics not available — silently skip
  }
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function MeditateTimer({ defaultMinutes = 5 }: MeditateTimerProps) {
  const [state, setState] = useState<TimerState>('idle')
  const [minutes, setMinutes] = useState(defaultMinutes)
  const [remaining, setRemaining] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const startTimer = useCallback((totalSeconds: number) => {
    setRemaining(totalSeconds)
    setState('running')
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!)
          intervalRef.current = null
          playBell()
          setState('done')
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [])

  const handleStop = useCallback(() => {
    clearTimer()
    setState('idle')
    setRemaining(0)
  }, [clearTimer])

  useEffect(() => () => clearTimer(), [clearTimer])

  if (state === 'idle') {
    return (
      <View className="my-3">
        <Pressable
          onPress={() => setState('setup')}
          className="flex-row items-center gap-2 px-4 py-2 rounded-full bg-surface-hover self-start"
        >
          <Icon name="bell" size={16} />
          <Text className="text-xs font-sans uppercase tracking-caps text-ink-muted">
            Meditate for {minutes} min
          </Text>
        </Pressable>
      </View>
    )
  }

  if (state === 'setup') {
    return (
      <View className="my-3 bg-surface-sunk rounded-xl p-4 gap-3 self-start">
        <Text className="text-xs uppercase tracking-caps text-ink-muted font-sans">
          Set meditation duration
        </Text>

        <View className="flex-row items-center gap-3">
          <Pressable
            onPress={() => setMinutes((m) => Math.max(1, m - 1))}
            accessibilityLabel="Decrease duration"
            className="w-8 h-8 rounded-full bg-surface-hover items-center justify-center"
          >
            <Text className="text-ink text-lg">−</Text>
          </Pressable>
          <Text className="font-serif text-2xl text-ink w-20 text-center">{minutes} min</Text>
          <Pressable
            onPress={() => setMinutes((m) => Math.min(20, m + 1))}
            accessibilityLabel="Increase duration"
            className="w-8 h-8 rounded-full bg-surface-hover items-center justify-center"
          >
            <Text className="text-ink text-lg">+</Text>
          </Pressable>
        </View>

        <View className="flex-row gap-2 flex-wrap">
          {[1, 3, 5, 10, 15, 20].map((m) => (
            <Pressable
              key={m}
              onPress={() => setMinutes(m)}
              className={['px-2.5 py-1 rounded-full', minutes === m ? 'bg-accent' : 'bg-surface-hover'].join(' ')}
            >
              <Text className={['text-xs font-sans', minutes === m ? 'text-white' : 'text-ink-muted'].join(' ')}>
                {m}m
              </Text>
            </Pressable>
          ))}
        </View>

        <View className="flex-row gap-2">
          <Button variant="primary" size="sm" className="flex-1" onPress={() => startTimer(minutes * 60)}>
            Begin
          </Button>
          <Button variant="ghost" size="sm" onPress={() => setState('idle')}>
            Cancel
          </Button>
        </View>
      </View>
    )
  }

  if (state === 'running') {
    const total = minutes * 60
    const elapsed = total - remaining
    const progress = total > 0 ? elapsed / total : 0
    const radius = 36
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference * (1 - progress)

    return (
      <View className="my-3 items-center gap-3 bg-surface-sunk rounded-xl p-5 self-start">
        <View className="w-24 h-24 items-center justify-center">
          <Svg width={96} height={96} viewBox="0 0 80 80" style={{ transform: [{ rotate: '-90deg' }] }}>
            <Circle cx={40} cy={40} r={radius} stroke="#3a4658" strokeWidth={4} fill="none" />
            <Circle
              cx={40}
              cy={40}
              r={radius}
              stroke="#d65846"
              strokeWidth={4}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </Svg>
          <Text
            className="absolute font-sans text-lg font-semibold text-ink"
            accessibilityLiveRegion="polite"
            accessibilityLabel={`${formatTime(remaining)} remaining`}
          >
            {formatTime(remaining)}
          </Text>
        </View>

        <Text className="text-xs text-ink-subtle font-sans">{minutes} minute meditation</Text>

        <Pressable onPress={handleStop} className="px-5 py-2 rounded-lg bg-surface-hover">
          <Text className="text-ink-muted text-sm">Stop</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View className="my-3 items-center gap-3 bg-surface-sunk rounded-xl p-5 self-start">
      <Icon name="bell" size={28} className="text-gilt" />
      <Text className="text-sm text-ink font-serif italic">May your prayers be heard.</Text>
      <Pressable onPress={() => setState('idle')} className="px-5 py-2 rounded-lg bg-surface-hover">
        <Text className="text-ink-muted text-sm">Done</Text>
      </Pressable>
    </View>
  )
}
