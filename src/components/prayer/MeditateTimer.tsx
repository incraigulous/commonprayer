import { useState, useEffect, useRef, useCallback } from 'react'
import Icon from '@/components/ui/Icon'

interface MeditateTimerProps {
  defaultMinutes?: number
}

type TimerState = 'idle' | 'setup' | 'running' | 'done'

function playBell() {
  try {
    const ctx = new AudioContext()

    // Create a simple bell tone using oscillators
    const createTone = (freq: number, startTime: number, duration: number, gain: number) => {
      const osc = ctx.createOscillator()
      const gainNode = ctx.createGain()

      osc.connect(gainNode)
      gainNode.connect(ctx.destination)

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, startTime)

      gainNode.gain.setValueAtTime(0, startTime)
      gainNode.gain.linearRampToValueAtTime(gain, startTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration)

      osc.start(startTime)
      osc.stop(startTime + duration)
    }

    const now = ctx.currentTime
    createTone(880, now, 3.0, 0.3)
    createTone(1108, now + 0.05, 2.5, 0.15)
    createTone(1320, now + 0.1, 2.0, 0.1)

    // Clean up context after bell fades
    setTimeout(() => ctx.close(), 4000)
  } catch {
    // AudioContext not available — silently skip
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

  // Clean up on unmount
  useEffect(() => () => clearTimer(), [clearTimer])

  if (state === 'idle') {
    return (
      <div className="my-3">
        <button
          onClick={() => setState('setup')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full
            bg-surface-hover hover:bg-border-strong text-ink-muted hover:text-ink
            text-xs font-sans uppercase tracking-caps transition-colors
            focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Icon name="bell" size="1rem" />
          Meditate for {minutes} min
        </button>
      </div>
    )
  }

  if (state === 'setup') {
    return (
      <div className="my-3 inline-flex flex-col gap-3 bg-surface-sunk rounded-xl p-4">
        <p className="text-xs uppercase tracking-caps text-ink-muted font-sans">
          Set meditation duration
        </p>

        {/* Duration picker */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMinutes((m) => Math.max(1, m - 1))}
            aria-label="Decrease duration"
            className="w-8 h-8 rounded-full bg-surface-hover text-ink text-lg flex items-center justify-center hover:bg-border-strong transition-colors"
          >
            −
          </button>
          <span className="font-serif text-2xl text-ink w-20 text-center">
            {minutes} min
          </span>
          <button
            onClick={() => setMinutes((m) => Math.min(20, m + 1))}
            aria-label="Increase duration"
            className="w-8 h-8 rounded-full bg-surface-hover text-ink text-lg flex items-center justify-center hover:bg-border-strong transition-colors"
          >
            +
          </button>
        </div>

        {/* Quick presets */}
        <div className="flex gap-2 flex-wrap">
          {[1, 3, 5, 10, 15, 20].map((m) => (
            <button
              key={m}
              onClick={() => setMinutes(m)}
              className={[
                'px-2.5 py-1 rounded-full text-xs font-sans transition-colors',
                minutes === m
                  ? 'bg-accent text-white'
                  : 'bg-surface-hover text-ink-muted hover:bg-border-strong hover:text-ink',
              ].join(' ')}
            >
              {m}m
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => startTimer(minutes * 60)}
            className="flex-1 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Begin
          </button>
          <button
            onClick={() => setState('idle')}
            className="px-4 py-2 rounded-lg bg-surface-hover text-ink-muted text-sm hover:bg-border-strong transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  if (state === 'running') {
    const total = minutes * 60
    const elapsed = total - remaining
    const progress = total > 0 ? elapsed / total : 0
    const circumference = 2 * Math.PI * 36

    return (
      <div className="my-3 inline-flex flex-col items-center gap-3 bg-surface-sunk rounded-xl p-5">
        {/* Circular progress */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 80 80" aria-hidden="true">
            <circle
              cx="40" cy="40" r="36"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-border-strong"
            />
            <circle
              cx="40" cy="40" r="36"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              className="text-accent transition-all duration-1000"
            />
          </svg>
          <span
            className="absolute font-sans text-lg font-semibold text-ink tabular-nums"
            aria-live="polite"
            aria-label={`${formatTime(remaining)} remaining`}
          >
            {formatTime(remaining)}
          </span>
        </div>

        <p className="text-xs text-ink-subtle font-sans">
          {minutes} minute meditation
        </p>

        <button
          onClick={handleStop}
          className="px-5 py-2 rounded-lg bg-surface-hover text-ink-muted text-sm hover:bg-border-strong transition-colors"
        >
          Stop
        </button>
      </div>
    )
  }

  // done
  return (
    <div className="my-3 inline-flex flex-col items-center gap-3 bg-surface-sunk rounded-xl p-5">
      <Icon name="bell" size="1.75rem" className="text-gilt" />
      <p className="text-sm text-ink font-serif italic">
        May your prayers be heard.
      </p>
      <button
        onClick={() => setState('idle')}
        className="px-5 py-2 rounded-lg bg-surface-hover text-ink-muted text-sm hover:bg-border-strong transition-colors"
      >
        Done
      </button>
    </div>
  )
}
