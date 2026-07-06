import { Pressable, Text, type PressableProps } from 'react-native'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'gilt'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends Omit<PressableProps, 'children'> {
  children?: ReactNode
  variant?: Variant
  size?: Size
  block?: boolean
  className?: string
}

const VARIANT_BASE: Record<Variant, string> = {
  primary: 'bg-accent border border-accent',
  secondary: 'bg-transparent border border-border-strong',
  ghost: 'bg-transparent border border-transparent',
  gilt: 'bg-transparent border border-gilt',
}

const VARIANT_TEXT: Record<Variant, string> = {
  primary: 'text-on-accent font-semibold',
  secondary: 'text-ink font-semibold',
  ghost: 'text-ink-muted font-semibold',
  gilt: 'text-gilt font-display tracking-caps uppercase',
}

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'px-3 py-1.5',
  md: 'px-5 py-2.5',
  lg: 'px-6 py-3',
}

const SIZE_TEXT: Record<Size, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  block = false,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      className={[
        'flex-row items-center justify-center rounded-md',
        VARIANT_BASE[variant],
        SIZE_CLASSES[size],
        block ? 'w-full' : '',
        disabled ? 'opacity-45' : '',
        className ?? '',
      ].filter(Boolean).join(' ')}
      {...rest}
    >
      {typeof children === 'string' ? (
        <Text
          className={[VARIANT_TEXT[variant], SIZE_TEXT[size]].join(' ')}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  )
}
